FROM node:latest
WORKDIR /root/app/
ADD /data ./data/
ADD /dist ./dist/
ADD /img ./img/
COPY package.json package-lock.json data ./

RUN npm i

ENTRYPOINT [ "node", "app.js" ]