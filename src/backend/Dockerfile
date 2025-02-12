FROM docker.io/node:alpine as build
WORKDIR /app

# install & cache packages layer
COPY package*.json tsconfig.json .
RUN npm install --omit=dev
RUN npm install --save-dev typescript

# Copy & build (reduce re-installs)
COPY . .
RUN npm run build

# Runtime image
FROM  docker.io/node:alpine

COPY --from=build /app/package*.json ./
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/build ./build

# Start app
CMD ["node", "build/server.js"]
