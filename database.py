from sqlalchemy import ForeignKey
from sqlalchemy.orm import DeclarativeBase, Session, Mapped, mapped_column
from sqlalchemy import create_engine

import os

SQLITE_DB_PATH = "running"

# Provide some more useful metadata when debugging, like:
# what does this string contain again? oh, raw html.
RawHtml = str
ItemId = int


class Base(DeclarativeBase):
    pass


class User(Base):
    __tablename__ = "user"
    id: Mapped[ItemId] = mapped_column(primary_key=True)


class Task(Base):
    __tablename__ = "task"
    id: Mapped[ItemId] = mapped_column(primary_key=True)
    hint: Mapped[RawHtml] = mapped_column(nullable=True)


class Completions(Base):
    __tablename__ = "completion"
    user_id: Mapped[ItemId] = mapped_column(ForeignKey("user.id"), primary_key=True)
    task_id: Mapped[ItemId] = mapped_column(ForeignKey("task.id"), primary_key=True)


engine = create_engine(f"sqlite:///{SQLITE_DB_PATH}/database.db")


def get_session():
    return Session(engine)


if __name__ == "__main__":
    os.makedirs(SQLITE_DB_PATH, exist_ok=True)
    Base.metadata.create_all(engine)
