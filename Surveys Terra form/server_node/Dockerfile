FROM node:latest
WORKDIR /app
COPY . .
RUN npm i
COPY . .
EXPOSE 6022
CMD [ "npm", "start" ]