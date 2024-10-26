FROM node:22

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

ENV MONGODB_URI=mongodb://mongo:27017/fireflies

CMD ["npm", "start"]
