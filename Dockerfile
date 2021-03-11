# pulling in official base image
FROM node:12-alpine
# FROM node:14-slim

RUN mkdir -p /src/app

# set working directory
WORKDIR /src/app

# add node modules bin to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY package.json ./
COPY package-lock.json ./
# add the app (copy contents over)
COPY . /src/app

RUN npm install

# # what port the container will show the outside world
EXPOSE 3000

# start the app
CMD ["npm", "start"]

# TO BUILD
# docker build -t advenew .

# TO RUN
# docker run -it -d --rm -p 80:3000 -v $(pwd):/advenew-v1 -e CHOKIDAR_USEPOLLING=true --name hp advenew
