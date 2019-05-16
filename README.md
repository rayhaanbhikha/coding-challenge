# coding-challenge

This api service has been dockerised and will rely on two docker containers. One container will host the api service whilst the other container will act as data store. Currently I am using a Json-server, to mock any database calls the api service will make.

I have also provided swagger documentation, which will provide more information on how to use this API service. You will find this on `/docs` endpoint once the application is running.

## Installation

### Docker installation
To run this api service locally, you will need to have docker installed on your machine.

Navigate to the applications directory and run the following command. Ensure ports `8080` and `3000` are not being used as the containers will bind to these ports on your local machine.

```bash
$ docker-compose up --build -d
```

The API service can be accessed on `http://localhost:8080`. Swagger documentation can be accessed on `/docs`.

The Json-server (proxy database) can be accessed on `http://localhost:3000/api`


### Normal installation

#### API server

To run this api service locally you will need `Node.js` installed on your machine. Having `Yarn` installed on your machine is also preferable but `npm` will also suffice (but the commands below will be different slightly).

To start the api service, navigate to the applications directory and run the following commands:

```sh
    #  install npm modules
    $ yarn install --production

    # start the application
    $ yarn start

```
The API service will then be accessible on `http://localhost:8080`.

#### Json-server (mock)

You will need `Json-server` installed on your machine. This can be done via npm.

Navigate to the Json-server directory and run the following script:

```sh
    $ sh startDB.sh
```

The Json-server will then be accessible on `http://localhost:3000`.