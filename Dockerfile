FROM node:latest
WORKDIR /root/app/
ADD /data ./
ADD /dist ./
COPY package.json package-lock.json data ./

RUN npm i

ENTRYPOINT [ "node", "app.js" ]