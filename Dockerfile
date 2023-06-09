FROM node:latest
WORKDIR /root/app
COPY data /root/app
COPY package.json package-lock.json data /root/app/

RUN npm i 

ENTRYPOINT [ "node", "app.js" ]