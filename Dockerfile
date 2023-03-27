FROM node:18
WORKDIR /src
COPY package.json /src/
COPY package-lock.json /src/
COPY . .
RUN npm install
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]