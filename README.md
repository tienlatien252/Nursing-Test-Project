## Simple Docker
Read [this](https://docs.docker.com/engine/reference/builder/) for more information

1. #### Build Docker image

    $ docker build -t \<DockerImageName\>/\<Tag\> \<PathToTheDockerfile\> 

1. #### Run the image

    $ docker run --name \<DockerContainerName\> \<DockerImageName\>/\<Tag\> -p \<OutsidePort\>:\<InsidePort\>

1. #### List images

    $ docker images

1. #### List containers

    $ docker ps -a

1. #### Stop the container

    $ docker stop  \<DockerContainerName\>

1. #### Remove the container

    $ docker rm  \<DockerContainerName\>

1. #### Remove images

    $ docker rmi \<DockerImageName\>

### How to run backend Node.js application using Docker (http//:localhost:5000)

1. #### Build the Docker image:

    $ docker build -t backend ./backend

1. #### Run the image

    $ docker run --rm --name backend-node -p 5000:3000 -d backend

### How to run frontend React.js application using Docker (http//:localhost:3000)

1. #### Build the Docker image:

    $ docker build -t frontend ./frontend

1. #### Run the image

    $ docker run -it --rm --name frontend-react -p 3000:3000 -d frontend