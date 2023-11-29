from typing import List
from typing import Optional
from sqlalchemy import ForeignKey
from sqlalchemy import String
from sqlalchemy.orm import DeclarativeBase
from sqlalchemy.orm import Mapped
from sqlalchemy.orm import mapped_column
from sqlalchemy.orm import relationship
from sqlalchemy import create_engine

import os

SQLITE_DB_PATH = "running"


class Base(DeclarativeBase):
    pass


class User(Base):
    __tablename__ = "user"
    id: Mapped[int] = mapped_column(primary_key=True)


engine = create_engine(f"sqlite:///{SQLITE_DB_PATH}/database.db")

if __name__ == "__main__":
    os.makedirs(SQLITE_DB_PATH)
    Base.metadata.create_all(engine)
