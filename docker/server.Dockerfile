FROM node:24-alpine

WORKDIR /app

COPY package.json ./
COPY client/package.json client/package.json
COPY server/package.json server/package.json

RUN npm install --workspace server

COPY server ./server

WORKDIR /app/server

EXPOSE 5000

CMD ["npm", "run", "dev"]
