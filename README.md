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

## Scalability

The API service and the Json-server (DB) have already been containerised. This gives us the flexibility to run the application on any OS assuming the Docker runtime has been installed.

However, a single container handling a large number of HTTP calls wouldn’t work. The container would eventually crash. This is where a container orchestration tool such as Kubernetes becomes really useful. 

The declarative state model that Kubernetes offers would also allow us to specify exactly what we want and it would ensure the system continues to look that way. We might have several pods that run the API service and a few pods that host the Json-server. Essentially one docker container per pod and either use, Kubernetes Ingress or some other load balancer tool such as NGINX to round-robin external calls to your service. If a container goes down, another one spawns up to take its place.

Additionally, I designed the API service using the DAO pattern. The method calls used by the rest of the application to access the data would not be affected. The DB method implementations currently use API calls to access the data hosted on the Json-server. But this could easily be replaced with actual database calls.

This ability to decouple the API service from the DB provides a degree of flexibility when it comes to implementation and choosing the database technology. We could use MongoDB, MySQL etc or some cloud solution such as DynamoDB or GCloud Datastore.
