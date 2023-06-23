FROM node:18

WORKDIR /front

COPY package*.json /front

COPY . /front/

RUN npm install

EXPOSE 3000

CMD ["npm","start"]
