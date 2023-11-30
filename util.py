from flask import request
from sqlalchemy import select

import database as db


def make_new_user():
    user_id = -1
    with db.get_session() as session:
        new_user = db.User()
        session.add(new_user)
        session.commit()
        user_id = new_user.id
    return user_id


def get_make_user(req: request):
    try:
        user_id = int(req.cookies.get("scvgr_user_id", "-1"))
    except:
        print("invalid cookie! handle this error better")
        return (-1, False)

    if user_id < 0:
        # missing or invalid user id, make a new user
        return (make_new_user(), True)
    else:
        return (user_id, False)


def get_hints(user_id):
    results = []
    with db.get_session() as session:
        stmt = select(db.Task.hint).where(
            ~db.Task.completions.any(db.Completion.user_id == user_id)
        )
        results = [data[0] for data in session.execute(stmt).all()]
    return results


def get_tasks(user_id):
    results = []
    with db.get_session() as session:
        stmt = select(db.Task.task).where(
            db.Task.completions.any(db.Completion.user_id == user_id)
        )
        results = [data[0] for data in session.execute(stmt).all()]
    return results
