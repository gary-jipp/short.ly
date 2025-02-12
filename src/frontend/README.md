# ShortLY  React Front End

This application requires the API application to be running.
See the `README.md` in backend for running  API

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
docker run -d --rm --name=shortly -p8080:80 shortly
or
podman run -d --rm --name=shortly -p8080:80 shortly
```


## Notes:
- `nginx.conf` file used for docker container.  API_URL is parameter to docker build
- Some UI edge cases need improvements
- Promises used instead of await for easier debugging
- error handling is still crude
- Some Types are incomplete