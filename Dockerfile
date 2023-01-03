# User a Docker image as a base
FROM node:alpine
WORKDIR "/app"

# Download and Install dependencies
COPY ./package.json ./
RUN apk add --no-cache bash git openssh
RUN npm install
COPY ./src ./src
COPY ./public ./public
COPY ./webpack.config.js ./webpack.config.js
EXPOSE 3000
RUN apk update
RUN apk --no-cache add curl
RUN apk --no-cache add tcptraceroute
CMD ["npm", "run", "start"]