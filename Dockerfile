FROM node:16

WORKDIR /ssr
COPY ./package*.json ./
RUN npm install
COPY ./ ./
RUN npm test
EXPOSE 5173
CMD [ "npm" ,"run", "start" ]
