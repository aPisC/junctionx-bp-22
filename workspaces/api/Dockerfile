# Install lib dependencies
FROM mcr.microsoft.com/vscode/devcontainers/typescript-node:16 as build-libs
WORKDIR /src

COPY lib lib
COPY package.json .

RUN yarn
RUN yarn workspaces run build


# Install package dependencies for api
FROM build-libs as dependencies
WORKDIR /src

COPY workspaces/api/*.json workspaces/api/
RUN yarn


# Development image
FROM dependencies as development
WORKDIR /src/workspaces/api

COPY workspaces/api . 
CMD yarn dev
# CMD yarn dev


# Build and create package
FROM development as build
WORKDIR /src/workspaces/api
RUN yarn pkg 


# Create runtime image
FROM node:16 as runtime
WORKDIR /app

RUN yarn add sqlite3 mysql
COPY --from=build /src/workspaces/api/bin .

CMD /app/api
