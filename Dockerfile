FROM node:9.11.1-alpine

WORKDIR /usr/src

COPY package.json .
RUN npm install --quiet

ENV PATH /usr/src/node_modules/.bin:$PATH

COPY . .

CMD ["npm", "start"]
