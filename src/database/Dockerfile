FROM docker.io/postgres:alpine

# Default environment variables (can override at runtime)
ENV POSTGRES_DB=shortly \
    POSTGRES_USER=postgres \
    POSTGRES_PASSWORD=password

# Copy schema and seed files into the image
COPY schema.sql /docker-entrypoint-initdb.d/01_schema.sql
COPY seeds.sql /docker-entrypoint-initdb.d/02_seeds.sql
RUN chmod 644 /docker-entrypoint-initdb.d/*.sql
