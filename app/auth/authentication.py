from pwdlib import PasswordHash


password_hasher = PasswordHash.recommended()


def get_password_hash(password: str) -> str:
    """
    Hash a plain-text password using the recommended
    password hashing algorithm.
    """
    return password_hasher.hash(password)


def verify_password(
    plain_password: str,
    hashed_password: str,
) -> bool:
    """
    Verify that a plain-text password matches the
    stored password hash.
    """
    return password_hasher.verify(
        plain_password,
        hashed_password,
    )