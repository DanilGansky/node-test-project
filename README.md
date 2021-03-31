# Node sample

### How to run (without Docker)
#### Setup third-party services
Before running this app you should create `Mailtrap` and `Twilio` accounts.

#### Twilio:
1. In `Twilio` dashboard you should create phone number which will be used for SMS sending.
2. Copy from the dashboard your `ACCOUNT SID`, `AUTH TOKEN`, `PHONE NUMBER` to `.env`

#### Mailtrap
1. After creating your `Mailtrap` account, you should copy from the dashboard your `USER ID`, `USER PASSWORD` to `.env`

#### PostgreSQL, MongoDB, RabbitMQ
```bash
$ chmod u+x run_services.sh
$ ./run_services.sh -dev
```

#### Configuration
1)  Copy `.env.example` as `.env`
    ```bash
    $ cp .env.example .env
    ```
2)  Set variables in `.env`

#### Server
```bash
$ npm install
$ npm run migrate
$ npm run seeders
$ npm start
```

### How to run (with Docker)
#### Configuration
1)  Copy `.env.example` as `.env`
    ```bash
    $ cp .env.example .env
    ```
2)  Set variables in `.env`

#### Server and services
```bash
$ ./run_services.sh -prod
```

### How to run tests
#### PostgreSQL, MongoDB, RabbitMQ
```bash
$ chmod u+x run_services.sh
$ ./run_services.sh -test
```

#### Configuration
1)  Copy `.env.example` as `.env`
    ```bash
    $ cp .env.example .env
    ```
2)  Set variables in `.env`

#### Tests
```bash
$ npm install
$ npm run migrate
$ npm run seeders
$ npm run test
```

### Stop services and server
```bash
$ docker-compose down
```