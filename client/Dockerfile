FROM node:8-alpine

RUN mkdir -p /client
WORKDIR /client
COPY . ./

EXPOSE 3000

RUN npm install -g create-react-app
RUN npm install

CMD ["npm", "start"]