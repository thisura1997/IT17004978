#docker file defining
#Here we mainly declare all the required commands to be called in files and performed by the docker

FROM node:14-alpine
ENV NODE_ENV=production

#work directory configuration
WORKDIR /usr/src/app

COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]

#run commands for NPM installation
RUN npm install --production --silent && mv node_modules ../
COPY . .
EXPOSE 8080
RUN chown -R node /usr/src/app
USER node

#start of the new instance
CMD ["npm", "start"]
