# Build  React App using node Alpine
FROM node:alpine AS build

WORKDIR /app

# install & build
COPY package.json package-lock.json .
RUN npm install
COPY . .
RUN npm run build

# Create nginx container wth built App
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 8080

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
