from sqlalchemy import text

from app.database.connection import engine

try:
    with engine.connect() as conn:
        result = conn.execute(text("SELECT DATABASE()"))
        print("✅ Connected!")
        print("Database:", result.scalar())

except Exception as e:
    print("❌ Connection failed")
    print(e)