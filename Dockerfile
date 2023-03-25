FROM node:18
WORKDIR /src
COPY package*.json ./src/
RUN npm install
COPY . /
EXPOSE 3000
CMD ["npm", "start"]