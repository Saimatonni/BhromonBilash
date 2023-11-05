# Stage 1 - the build process
FROM node:16.17-bullseye
LABEL maintainer=shahrear@zoopsign.com

# Setting the base folder where all files related to app lives
WORKDIR /app
COPY package*.json ./
RUN npm install

# first set aside prod dependencies so we can copy in to the prod image
# RUN yarn install --production=true
COPY . .

# RUN yarn run validate
EXPOSE 3000
# This command is a final feedback to show what is the eventual folder
# structure inside the docker container that we have just build
RUN ls -al
# This is where magic happens, through this command you give access of
# your great ideas to the world to make it a better place :sunglasses:
CMD ["npm", "run", "start"]