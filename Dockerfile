FROM node:carbon

ENV PORT=3000
ENV "NODE_ENV"="producao"
ENV "JWT_KEY"="secrettest"
ENV "DO_JWT_VALIDATION"="false"
ENV "MONGODB_URI"="mongodb://mongodb/martan"

LABEL maintainer="Andre Papazoglu"

COPY ./build /home/nodeApiTs
COPY ./package.json /home/nodeApiTs

WORKDIR /home/nodeApiTs

RUN npm install

EXPOSE $PORT

## THE LIFE SAVER
ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.2.1/wait /wait
RUN chmod +x /wait

## Launch the wait tool and then your application
CMD /wait && node index.js