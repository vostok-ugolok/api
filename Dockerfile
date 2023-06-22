FROM node:latest
WORKDIR /root/app/
ADD data ./data/
ADD dist ./
ADD img ./img/
COPY package.json package-lock.json ./

RUN npm i

ENTRYPOINT [ "node", "app.js" ]