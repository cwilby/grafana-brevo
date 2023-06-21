FROM node:lts-hydrogen
WORKDIR /usr/app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 32012
CMD ["npm", "start"]