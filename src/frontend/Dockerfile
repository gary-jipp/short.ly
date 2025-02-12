# Build  React App using node Alpine
FROM docker.io/node:alpine AS build

WORKDIR /app

# install & cache packages layer
COPY package.json package-lock.json .
RUN npm install

# copy source & build
COPY . .
RUN npm run build

# Create nginx container wth built App
FROM docker.io/nginx:alpine
ARG API_URL=http://localhost:8000
ARG PORT=8080

RUN echo $API_URL
COPY --from=build /app/dist /usr/share/nginx/html

# Copy the custom nginx.conf file & edit with args
COPY nginx.conf /etc/nginx/conf.d/default.conf
RUN sed -i "s|API_URL|$API_URL|g" /etc/nginx/conf.d/default.conf \
  && sed -i "s|LISTEN_PORT|$PORT|g" /etc/nginx/conf.d/default.conf

RUN cat /etc/nginx/conf.d/default.conf
# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
