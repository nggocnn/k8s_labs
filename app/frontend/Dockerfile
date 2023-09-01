FROM node:18-alpine as build-stage

WORKDIR /frontend

COPY package*.json .

RUN npm install

COPY . .

ARG BACKEND_SERVICE

ARG BACKEND_PORT

ENV REACT_APP_API_URL=http://$BACKEND_SERVICE:$BACKEND_PORT

RUN npm run build


FROM nginx:1.19.0 as deploy-stage

COPY --from=build-stage /frontend/build /usr/share/nginx/html

CMD [ "nginx", "-g", "daemon off;"]