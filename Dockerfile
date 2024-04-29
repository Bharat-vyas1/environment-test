FROM node:18.16
WORKDIR /code
RUN apt-get update && apt-get install -y vim
COPY package.json /code
RUN npm install
COPY . /code
RUN npm run build
ENTRYPOINT [ "/bin/bash", "/code/entrypoint.sh" ]
CMD ["npm", "run" , "start:prod"]
# END
