# ShortLY  React Front End

This application requires the API application to be running.
See the `README.md` in backend for running the API locally or in a container

## Development build & run
```
npm install
npm run dev
```

## Build docker container
```
docker build . -t shortly
or
podman build . -t shortly
```

## Build with Args
```
docker build . -t shortly --build-arg API_URL=http://localhost:8000 --build-arg PORT=8080
# note: these are the defaults
```

## Run container
```
# In network host mode for running on local envrionment
podman run -d --replace  --network=host --name=shortly shortly

# with mapped ports for production
docker run -d --replace  -p8080:80  --name=shortly shortly
```

## Browse to the Application
http://localhost:8080


## Container Notes:
- the above assumes you are using Windows WSL or Linux.
- podman is generally a better choice than docker, but either works
- `nginx.conf` file used for docker container.
- `API_URL` & `PORT` are parameters to the docker build
- can use host network mode to make inter-container networknig easier
- could also create a custom network for containers
- can also use `host.docker.internal` the `API_URL` hostname (`host.containers.internal` for podman)


## Development Notes:
- Some UI edge cases need improvements
- Promises used instead of await for easier debugging
- error handling is still crude
- Some Types are incomplete