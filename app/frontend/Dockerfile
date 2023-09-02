FROM node:18-alpine as build-stage

WORKDIR /frontend

COPY package*.json .

RUN npm install

COPY . .

RUN npm run build


FROM nginx:1.19.0 as deploy-stage

COPY --from=build-stage /frontend/build /usr/share/nginx/html

CMD [ "nginx", "-g", "daemon off;"]