FROM node:22

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

ENV API_URL=http://api:8080  

CMD ["npm", "start"]