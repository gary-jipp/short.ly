# Short.LY Express API

## endpoints
- `GET /api/uls`
- `POST /api/uls/`
- `PUT /api/uls/:id`
- `DELETE /api/uls/:id`


## Development build & run
1. Copy `.env.example` to `.env` (defaults to values in `.env.example` if no `.env` used)
2. Postgres database must be running with seeds (see `README.md` in `database` root dir)
3. Edit `.env` to match your database config if using an `.env` file
4. Install and start Application
```
npm install
npm run local
```

## Build docker container
```
docker build . -t shortly-api
or
podman build . -t shortly-api
```

## Run container
Uses default environment settings (see `.env.example`)
```
# In network host mode for running on local dev environment
docker run -d --replace --network=host --name=shortly-api shortly-api

# with mapped ports for production
docker run -d -p8000:80  --name=shortly-apishortly-api
```

## Run container with custom environment
```
podman run -d --replace --network=host --name=shortly-api \
  -e API_PORT=8000 \
  -e DB_PASSWORD=password \
   shortly-api
```

## Container Notes:
- the above assumes you are using Windows WSL or Linux.
- podman is generally a better choice than docker, but either works
- can use host network mode to make inter-container networking easier
- we usually never use host networking in production but makes local running easier
- could also create a custom network for containers
- container networking is a larger topic outside the scope of this project


## Development Notes:
- Using Express Router for `/api/url`
- Inject Pool into routers at runtime so `new Pool()` is only called once
- Avoided comments for "obvious" code. That can be a matter of opinion tho
- Long URLS that do not return 2xx are rejected. eg: https://example.com/test
-