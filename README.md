# PowerBI - Power Business Inteligence

## Configure Development Ambient

</br>

## Getting Start

---

### Install NodeJs 18.12.1 LTS on Ubuntu 22.04 (https://nodejs.org/en/download/package-manager/#debian-and-ubuntu-based-linux-distributions)

```
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash - &&\
sudo apt-get install -y nodejs
```

### Install Docker (https://docs.docker.com/engine/install/ubuntu/)

- Uninstall old versions

```
sudo apt-get remove docker docker-engine docker.io containerd runc
```

- Set up the repository

  1 - Update the apt package index and install packages to allow apt to use a repository over HTTPS:

  ```
    $ sudo apt-get update
    $ sudo apt-get install \
          ca-certificates \
          curl \
          gnupg \
          lsb-release
  ```

  2 - Add Docker’s official GPG key:

  ```
  $ sudo mkdir -p /etc/apt/keyrings
  $ curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg

  ```

  3 - Use the following command to set up the repository:

  ```
    echo \
    "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
    $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

  ```

- Install Docker Engine

  1 - Update the apt package index:

  ```
  $  sudo apt-get update
  ```

  2 - Install Docker Engine, containerd, and Docker Compose.

  To install the latest version, run:

  ```
  $  sudo apt-get install docker-ce docker-ce-cli containerd.io docker-compose-plugin
  ```

  3 - Verify that the Docker Engine installation is successful by running the hello-world image:

  ```
  $ sudo docker run hello-world
  ```

  4 - Check docker-compese instalation

  ```
  $ docker-compose --version
  ```

- Clone Repository from github (https://github.com/rgranvilla/power-bi-server)

  1 - make dir to app (example below)

  ```
  $ mkdir app
  ```

  2 - access dir app

  ```
  $ cd app
  ```

  3 - clone repository

  ```
  $ git clone git@github.com:rgranvilla/power-bi-server.git
  ```

  4 - install dependencies

  ```
  $ yarn
  ```

  5 - copy .env.example

  ```
  $ cp .env.example .env
  ```

  6 - set environment value on .env

  ```
  ## API URLs
  FORGOT_MAIL_URL=
  APP_API_URL=

  ## AWS Credentials
  AWS_BUCKET=
  AWS_BUCKET_REGION=
  AWS_BUCKET_URL=AWS_ACCESS_KEY_ID=
  AWS_SECRET_ACCESS_KEY=
  AWS_REGION=

  ##Storage
  ## values = 'local' or 's3'
  disk=local

  ##Email
  ## values = 'ethereal' or 'ses'
  MAIL_PROVIDER=

  ```

  7 - set values on docker-compose.yml

  ```
  version: '3.7'

  services:
  database:
    image: postgres
    container_name: dbpowerbi
    restart: always
    ports:
      - XXXXX:5432
    environment:
      - POSTGRES_USER=
      - POSTGRES_PASSWORD=
      - POSTGRES_DB=
    volumes:
      - pgdata:/data/postgres
  app:
    build: .
    container_name: powerbi_app
    restart: always
    ports:
      - XXXXX:3333
    volumes:
      - .:/usr/app
    links:
      - database
    depends_on:
      - database

  volumes:
  pgdata:
    driver: local

  ```

  8 - set values on /src/shared/infra/typeorm/index.ts

  ```
  import { DataSource } from "typeorm";

  ...

  const dataSource = new DataSource({
    type: "postgres",
    port: xxxxx,
    username: "xxxxxx",
    password: "xxxxxx",
    ...
  });

  export function createConnection(host = "database"): Promise<DataSource> {
    return dataSource.setOptions({ host }).initialize();
  }

  export default dataSource;

  ```

## Run migrations

1 - run migrations

```
$ yarn typeorm migration:run -d src/shared/infra/typeorm/index.ts
```

2 - run seed admin

```
$ yarn seed:admin
```

## Prepere Insomnia

Open Insomnia and import Insomnia_2022-11-14.json from root dir.

1 - on Authenticate[admin] send json body

```
{
	  "email": "suporte@devtrails.com.br",
	  "password": "admin"
}
```

2 - take response token value, press crtl+e, and put copied value to token

3 - Now you can import all data.

    1 - First Import Neighborhoods
    2 - Second Import Populations
    3 - Third Import Competitors
    4 - Than Import Flow Events

4 - Test all routes

## Access Documentation

After create a docker, access "http://localhost:3333/api-docs/#/"
