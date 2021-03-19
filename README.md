# Node sample

### How to run (without Docker)
#### PostgreSQL, MongoDB, RabbitMQ
```bash
> chmod u+x run_services.sh
> ./run_services.sh -dev
```

#### Configuration
1)  Copy .env.example as .env
    ```bash
    > cp .env.example .env
    ```
2)  Set variables in .env

#### Server
```bash
> npm install
> npm run migrate
> npm run seeders
> npm start
```

### How to run (with Docker)
#### Configuration
1)  Copy .env.example as .env
    ```bash
    > cp .env.example .env
    ```
2)  Set variables in .env

#### Server and services
```bash
> ./run_services.sh -prod
```

### How to run tests
#### PostgreSQL, MongoDB, RabbitMQ
```bash
> chmod u+x run_services.sh
> ./run_services.sh -test
```

#### Configuration
1)  Copy .env.example as .env
    ```bash
    > cp .env.example .env
    ```
2)  Set variables in .env

#### Tests
```bash
> npm install
> npm run migrate
> npm run seeders
> npm run test
```

### Stop services and server
```bash
> docker-compose down
```