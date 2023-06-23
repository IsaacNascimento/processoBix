# Define a imagem base
FROM python:3.9

# Define o diretório de trabalho dentro do container
WORKDIR /app

# Copia o arquivo requirements.txt para o diretório de trabalho
COPY requirements.txt .

RUN python3 -m venv venv

# Instala as dependências do projeto
RUN /bin/bash -c "source venv/bin/activate"
# RUN pip install -r requirements.txt

# Copia o restante do código fonte para o diretório de trabalho
COPY . .

RUN /bin/bash -c "source venv/bin/activate && python3 -m pip install Django"
RUN "python3 -m pip install djangorestframework"

# Define o comando a ser executado quando o container for iniciado
# CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
CMD ["/bin/bash", "-c", "source venv/bin/activate && python3 manage.py runserver 0.0.0.0:8000"]
