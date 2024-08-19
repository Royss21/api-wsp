
###########################################
#STAGE  LOCAL
#Se usara el SO para correr node
FROM node:22.0-alpine3.18 as dev
#ubicar dentro del folder
WORKDIR /usr/src/app
#copiar el archivo al folder ubicado arriba
COPY package.json ./
#instalar dependencias
RUN npm install
COPY . .
#levantar el proyecto en modo desarrollo
CMD [ "npm","run","start:dev" ]


############################################################
######### TENER CUIDADO AL CAMBIAR LA CONFIGURACION ########
###########################################################

#STAGE PARA DEPENDENCIAS DESARROLLO
FROM node:22.0-alpine3.18 as dev-deps
WORKDIR /usr/src/app
COPY package.json ./
RUN npm install --frozen-lockfile


###########################################
#STAGE PARA CONSTRUIR EL PROYECTO
FROM node:22.0-alpine3.18 as builder
WORKDIR /usr/src/app
COPY --from=dev-deps /usr/src/app/node_modules ./node_modules
COPY . .
#RUN yarn test
RUN npm run build


###########################################
#STAGE PARA DEPENDENCIAS PRODUCCION
FROM node:22.0-alpine3.18 as prod-deps
WORKDIR /usr/src/app
COPY package.json ./
RUN npm install --prod --frozen-lockfile


###########################################
#STAGE PARA PRODUCCION
FROM node:22.0-alpine3.18 as prod
EXPOSE 3000
WORKDIR /usr/src/app
COPY --from=prod-deps /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/dist ./dist
COPY assets/ /usr/src/app/assets
CMD [ "node","dist/main.js"]

###########################################################
###########################################################
###########################################################
