# Install lib dependencies
FROM mcr.microsoft.com/vscode/devcontainers/typescript-node:16 as build-libs
WORKDIR /src

COPY lib lib
COPY package.json .

RUN yarn
RUN yarn workspaces run build


# Install package dependencies for app
FROM build-libs as dependencies
WORKDIR /src

COPY workspaces/app/*.json workspaces/app/
RUN yarn


# Development image
FROM dependencies as development
WORKDIR /src/workspaces/app

COPY workspaces/app . 
CMD yarn dev


# Build and create package
FROM development as build
WORKDIR /src/workspaces/app
RUN yarn build 


# Create runtime image
FROM node:16 as runtime
WORKDIR /app

RUN yarn add serve
COPY --from=build /src/workspaces/app/dist dist
CMD yarn serve -p 8080 -n dist/ 
