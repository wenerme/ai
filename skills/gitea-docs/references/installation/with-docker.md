---
date: "2020-03-19T19:27:00+02:00"
slug: "install-with-docker"
sidebar_position: 70
aliases:
  - /en-us/install-with-docker
---

# Installation with Docker

Gitea provides automatically updated Docker images within its Docker Hub organization. It is
possible to always use the latest stable tag or to use another service that handles updating
Docker images.

This reference setup guides users through the setup based on docker `compose`-plugin, but the installation
of the docker `compose`-plugin is out of scope of this documentation. To install the docker `compose`-plugin itself, follow
the official [install instructions](https://docs.docker.com/compose/install/).

## Basics

The most simple setup just creates a volume and a network and starts the `docker.gitea.com/gitea:latest`
image as a service. Since there is no database available, one can be initialized using SQLite3.
Create a directory like `gitea` and paste the following content into a file named `docker-compose.yml`.
Note that the volume should be owned by the user/group with the UID/GID specified in the config file.
If you don't give the volume correct permissions, the container may not start.
For a stable release you can use `:latest`, `:1` or specify a certain release like `:@dockerVersion@`, but if you'd like to use the latest development version of Gitea then you could use the `:nightly` tag. If you'd like to run the latest commit from a release branch you can use the `:1.x-nightly` tag, where x is the minor version of Gitea. (e.g. `:1.16-nightly`)

```yaml
networks:
  gitea:
    external: false

services:
  server:
    image: docker.gitea.com/gitea:@dockerVersion@
    container_name: gitea
    environment:
      - USER_UID=1000
      - USER_GID=1000
    restart: always
    networks:
      - gitea
    volumes:
      - ./gitea:/data
      - /etc/timezone:/etc/timezone:ro
      - /etc/localtime:/etc/localtime:ro
    ports:
      - "3000:3000"
      - "222:22"
```

## Ports

To bind the integrated OpenSSH daemon and the webserver on a different port, adjust
the port section. It's common to just change the host port and keep the ports within
the container like they are.

```diff
networks:
  gitea:
    external: false

services:
  server:
    image: docker.gitea.com/gitea:@dockerVersion@
    container_name: gitea
    environment:
      - USER_UID=1000
      - USER_GID=1000
    restart: always
    networks:
      - gitea
    volumes:
      - ./gitea:/data
      - /etc/timezone:/etc/timezone:ro
      - /etc/localtime:/etc/localtime:ro
    ports:
-     - "3000:3000"
-     - "222:22"
+     - "8080:3000"
+     - "2221:22"
```

## Databases

### MySQL database

To start Gitea in combination with a MySQL database, apply these changes to the
`docker-compose.yml` file created above.

```diff
networks:
  gitea:
    external: false

services:
  server:
    image: docker.gitea.com/gitea:@dockerVersion@
    container_name: gitea
    environment:
      - USER_UID=1000
      - USER_GID=1000
+      - GITEA__database__DB_TYPE=mysql
+      - GITEA__database__HOST=db:3306
+      - GITEA__database__NAME=gitea
+      - GITEA__database__USER=gitea
+      - GITEA__database__PASSWD=gitea
    restart: always
    networks:
      - gitea
    volumes:
      - ./gitea:/data
      - /etc/timezone:/etc/timezone:ro
      - /etc/localtime:/etc/localtime:ro
    ports:
      - "3000:3000"
      - "222:22"
+    depends_on:
+      - db
+
+  db:
+    image: docker.io/library/mysql:8
+    restart: always
+    environment:
+      - MYSQL_ROOT_PASSWORD=gitea
+      - MYSQL_USER=gitea
+      - MYSQL_PASSWORD=gitea
+      - MYSQL_DATABASE=gitea
+    networks:
+      - gitea
+    volumes:
+      - ./mysql:/var/lib/mysql
```

### PostgreSQL database

To start Gitea in combination with a PostgreSQL database, apply these changes to
the `docker-compose.yml` file created above.

```diff
networks:
  gitea:
    external: false

services:
  server:
    image: docker.gitea.com/gitea:@dockerVersion@
    container_name: gitea
    environment:
      - USER_UID=1000
      - USER_GID=1000
+      - GITEA__database__DB_TYPE=postgres
+      - GITEA__database__HOST=db:5432
+      - GITEA__database__NAME=gitea
+      - GITEA__database__USER=gitea
+      - GITEA__database__PASSWD=gitea
    restart: always
    networks:
      - gitea
    volumes:
      - ./gitea:/data
      - /etc/timezone:/etc/timezone:ro
      - /etc/localtime:/etc/localtime:ro
    ports:
      - "3000:3000"
      - "222:22"
+    depends_on:
+      - db
+
+  db:
+    image: docker.io/library/postgres:14
+    restart: always
+    environment:
+      - POSTGRES_USER=gitea
+      - POSTGRES_PASSWORD=gitea
+      - POSTGRES_DB=gitea
+    networks:
+      - gitea
+    volumes:
+      - ./postgres:/var/lib/postgresql/data
```

## Named volumes

To use named volumes instead of host volumes, define and use the named volume
within the `docker-compose.yml` configuration. This change will automatically
create the required volume. You don't need to worry about permissions with
named volumes; Docker will deal with that automatically.

```diff
networks:
  gitea:
    external: false

+volumes:
+  gitea:
+    driver: local
+
services:
  server:
    image: docker.gitea.com/gitea:@dockerVersion@
    container_name: gitea
    restart: always
    networks:
      - gitea
    volumes:
-      - ./gitea:/data
+      - gitea:/data
      - /etc/timezone:/etc/timezone:ro
      - /etc/localtime:/etc/localtime:ro
    ports:
      - "3000:3000"
      - "222:22"
```

MySQL or PostgreSQL containers will need to be created separately.

## Startup

:::note
From July 2023 Compose V1 stopped receiving updates. It's also no longer available in new releases of Docker Desktop.

Compose V2 is included with all currently supported versions of Docker Desktop. Please use V2 to do below operations.
:::

To start this setup based on the docker `compose`-plugin, execute `docker compose up -d`,
to launch Gitea in the background. Using `docker compose ps` will show if Gitea
started properly. Logs can be viewed with `docker compose logs`.

To shut down the setup, execute `docker compose down`. This will stop
and kill the containers. The volumes will still exist.

:::note
If using a non-3000 port on http, change app.ini to match
`LOCAL_ROOT_URL = http://localhost:3000/`.
:::

## Installation

After starting the Docker setup via the docker `compose`-plugin, Gitea should be available using a
favorite browser to finalize the installation. Visit http://server-ip:3000 and follow the
installation wizard. If the database was started with the docker `compose`-plugin setup as
documented above, please note that `db` must be used as the database hostname.

## Configure the user inside Gitea using environment variables

- `USER`: **git**: The username of the user that runs Gitea within the container.
- `USER_UID`: **1000**: The UID (Unix user ID) of the user that runs Gitea within the container. Match this to the UID of the owner of the `/data` volume if using host volumes (this is not necessary with named volumes).
- `USER_GID`: **1000**: The GID (Unix group ID) of the user that runs Gitea within the container. Match this to the GID of the owner of the `/data` volume if using host volumes (this is not necessary with named volumes).

## Customization

Customization files described [here](../administration/customizing-gitea.md) should
be placed in `/data/gitea` directory. If using host volumes, it's quite easy to access these
files; for named volumes, this is done through another container or by direct access at
`/var/lib/docker/volumes/gitea_gitea/_data`. The configuration file will be saved at
`/data/gitea/conf/app.ini` after the installation.

Example: Analogous to the non-docker-installation customization linked above, you can create a `/public` folder within `/data/gitea` and place your custom `robots.txt` there which will then be served normally.

## Upgrading

:::warning
Make sure you have volumed data to somewhere outside Docker container
:::

To upgrade your installation to the latest release:

```bash
# Edit `docker-compose.yml` to update the version, if you have one specified
# Pull new images
docker compose pull
# Start a new container, automatically removes old one
docker compose up -d
```

## Managing Deployments With Environment Variables

In addition to the environment variables above, any settings in `app.ini` can be set
or overridden with an environment variable of the form: `GITEA__SECTION_NAME__KEY_NAME`.
These settings are applied each time the docker container starts, and won't be passed into Gitea's sub-processes.
Full information [here](https://github.com/go-gitea/gitea/tree/master/contrib/environment-to-ini).

These environment variables can be passed to the docker container in `docker-compose.yml`.
The following example will enable an smtp mail server if the required env variables
`GITEA__mailer__FROM`, `GITEA__mailer__HOST`, `GITEA__mailer__PASSWD` are set on the host
or in a `.env` file in the same directory as `docker-compose.yml`.

The settings can be also set or overridden with the content of a file by defining an environment variable of the form:
`GITEA__section_name__KEY_NAME__FILE` that points to a file.

```yaml
...
services:
  server:
    environment:
      - GITEA__mailer__ENABLED=true
      - GITEA__mailer__FROM=${GITEA__mailer__FROM:?GITEA__mailer__FROM not set}
      - GITEA__mailer__PROTOCOL=smtps
      - GITEA__mailer__SMTP_ADDR=${GITEA__mailer__SMTP_ADDR:?GITEA__mailer__SMTP_ADDR not set}
      - GITEA__mailer__SMTP_PORT=${GITEA__mailer__SMTP_PORT:?GITEA__mailer__SMTP_PORT not set}
      - GITEA__mailer__USER=${GITEA__mailer__USER:-apikey}
      - GITEA__mailer__PASSWD="""${GITEA__mailer__PASSWD:?GITEA__mailer__PASSWD not set}"""
```

Gitea will generate new secrets/tokens for every new installation automatically and write them into the app.ini. If you want to set the secrets/tokens manually, you can use the following docker commands to use of Gitea's built-in [generate utility functions](../administration/command-line.md#generate). Do not lose/change your SECRET_KEY after the installation, otherwise the encrypted data can not be decrypted anymore.

The following commands will output a new `SECRET_KEY` and `INTERNAL_TOKEN` to `stdout`, which you can then place in your environment variables.

```bash
docker run -it --rm docker.gitea.com/gitea:1 gitea generate secret SECRET_KEY
docker run -it --rm docker.gitea.com/gitea:1 gitea generate secret INTERNAL_TOKEN
```

```yaml
...
services:
  server:
    environment:
      - GITEA__security__SECRET_KEY=[value returned by generate secret SECRET_KEY]
      - GITEA__security__INTERNAL_TOKEN=[value returned by generate secret INTERNAL_TOKEN]
```

### SSH with multiple IP addresses
This assumes that the host machine has more than one reachable IP address: `192.168.1.1` (host) `192.168.1.2` (gitea)
On the host machine, configure SSHD in `/etc/ssh/sshd_config` to listen on one IP address `ListenAddress 192.168.1.1`. In the compose file the SSH port forwarding then needs to be changed to `"192.168.1.2:22:22"`. The port forwarding needs to be adjusted similarily for all other forwarded ports to avoid problems with DNS.
