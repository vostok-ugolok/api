FROM node:latest
WORKDIR /root/app/
COPY data ./
COPY dist ./
COPY img ./
COPY package.json package-lock.json data ./

RUN npm i

ENTRYPOINT [ "node", "app.js" ]