# ShortLY URL Shortener

Simple URL shortener App.  React front end, Node-express & Postgress back end

## Features
- Creates and saves a shortened Web Addresses for any valid website
- Shortened URL's are saved in a database
- The URL ID (the shorten code) is always unique
- When the shortened URL is accessed, the broweser is redirected to the stored URL
- Only Valid URL's are accepted.  Invalid URL's will display an error if added
- Users can add, delete and modify Short URL's
- Users can easily copy the shortURL to the clipboard by clicking the copy button
- If an invalid Short Url is accessed, a 404 Not Found Page is displayed
- The visits count is displayed for each Short URL
- There is no auth or accounts.  (Note: auth should be external. eg: keycloak)
- The Application is deployed as configurable Docker containers.

## Build and Run

### Docker Compose
You can use docker-compose (or podman compose) to build and run the app containers.

##### Required:
- Linux environment:  Windows WSL, Linux, etc
- Docker or Podman installed (podman comamnds are identical to docker)

##### Steps:
1. Build and Run the application:  `docker compose up -d`
2. Browse to the application: http://localhost:8080
3. Stop the application:  `docker compose down`


## Containers
1. Database - `shortly-db`
2. API App - `shortly.api`
3. Portal - `shortly`

### Development
Refer to the `README.md` in each of the application directories
- backend
- database
- frontend

### Development Notes / TODO's
- UI needs work.
- should save record ID not record on click
- some types are incomplete
- Promise code is inconsistent between FE & BE
- use more custom hooks for component logic
- Split conditonal rendering UI into child components
- using props instead of destructure on purpose so can use for teaching guide later
- Still not bad for only 2 days start-finish