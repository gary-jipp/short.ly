# Short.LY Database

## Description
Docker/Podman postgres container for use with the shortly API.

## Build docker container
```
docker build . -t shortly-db
or
podman build . -t shortly-db
```

## Default settings
- `POSTGRES_DB=shortly `
- `POSTGRES_USER=postgres `
- `POSTGRES_PASSWORD=password`
All of these can be changed with environment variables at runtime

## Run container
```
# In network host mode for running on local dev environment
podman run -d --replace --network=host --name=shortly-db shortly-db

# with mapped ports for production
docker run -d -p8000:80  --name=shortly-dbshortly-db
```

## Run container with custom environment
```
podman run -d --replace --network=host --name=shortly-db \
  -e POSTGRES_USER=postgres\
   shortly-db
```

## Container Notes:
- the above assumes you are using Windows WSL or Linux.
- podman is generally a better choice than docker, but either works
- can use host network mode to make inter-container networking easier
- we usually never use host networking in production but makes local running easier
- could also create a custom network for containers
- container networking is a larger topic outside the scope of this project
- Remember, cannot run 2 containers that use the same ports at the same time
