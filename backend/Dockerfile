# # Define a imagem base
FROM python:3.11

ENV PYTHONUNBUFFERED=1

WORKDIR /code

COPY requirements.txt requirements.txt

RUN pip3 install -r requirements.txt

COPY . .

EXPOSE 8000

CMD ["/bin/bash", "-c", "source venv/bin/activate && python3 manage.py runserver 0.0.0.0:8000"]



