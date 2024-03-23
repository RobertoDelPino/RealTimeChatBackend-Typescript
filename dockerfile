FROM node:18.13.0-alpine
WORKDIR /app
COPY package*.json .
RUN npm install
COPY . .
EXPOSE 3000
RUN npm uninstall bcrypt
RUN npm install bcrypt
ENTRYPOINT ["npm", "run", "dev"]