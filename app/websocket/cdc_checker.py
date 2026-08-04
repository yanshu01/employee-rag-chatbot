import logging
from sqlalchemy import text
from app.config import settings
from app.database.connection import engine

logger = logging.getLogger("cdc_checker")


def inspect_cdc_capability() -> dict:
    """
    Analyzes current database server configuration to determine if MySQL Binary Logging (CDC)
    is active and supported, or if fallback SQLAlchemy ORM Event Listeners + Polling Sync is required.
    """
    cdc_status = {
        "engine": "sqlite" if (settings.db_host == "sqlite" or settings.db_name.endswith(".db")) else "mysql",
        "cdc_available": False,
        "reason": ""
    }

    if cdc_status["engine"] == "sqlite":
        cdc_status["reason"] = "SQLite database engine in use. MySQL Binlog CDC is unavailable on SQLite. Utilizing SQLAlchemy ORM Event Broadcasting & Active Client Polling Fallback."
        logger.info(f"CDC Status: {cdc_status['reason']}")
        return cdc_status

    # Test MySQL binlog configuration
    try:
        with engine.connect() as conn:
            result = conn.execute(text("SHOW GLOBAL VARIABLES LIKE 'log_bin'")).fetchone()
            if result and str(result[1]).upper() in ("ON", "1", "TRUE"):
                cdc_status["cdc_available"] = True
                cdc_status["reason"] = "MySQL Binary Logging (log_bin=ON) is enabled. CDC Event Sync supported."
            else:
                cdc_status["reason"] = "MySQL server log_bin variable is OFF. Utilizing SQLAlchemy ORM Event Broadcasting fallback."
    except Exception as exc:
        cdc_status["reason"] = f"Unable to query MySQL server binlog status ({exc}). Utilizing SQLAlchemy ORM Event Broadcasting fallback."

    logger.info(f"CDC Status: {cdc_status['reason']}")
    return cdc_status
