FROM python:3.11
LABEL authors="rando"

RUN pip install pipenv
RUN git clone https://github.com/The-Randalorian/HCI_Project.git
WORKDIR HCI_Project
RUN pipenv install --deploy

ENTRYPOINT ["pipenv", "run", "python", "app.py"]