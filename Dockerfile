FROM node:11

WORKDIR /usr/src/sample

ADD . .

RUN npm install

CMD ["npm", "start"]