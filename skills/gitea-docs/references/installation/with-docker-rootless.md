---
date: "2020-02-09T20:00:00+02:00"
aliases:
  - /en-us/install-with-docker-rootless
---

# Installation with Docker (rootless)

## Relation to rootful image

* Rootless image doesn't require "root" privilege on the host, while it may have stricter UID/GID requirement.
* Rootless image must use its bulitin SSH server, while the rootful one must its managed standalone OpenSSH server.
* The volume mapping and directory layout is different between them.

Except the differences above, the rootless image shares the same mechanism with rootful image,
including: port mapping, custimzation, upgrading, environment variables, etc.
Read more in "[Installation with Docker (rootful)](./with-docker.md)"

ATTENTION: the rootful/rootless images are not compatible with the other.
If you have chosen one, you should always use the same one,
don't switch to the other one by changing the compose file's `image` value.

## Basics

The most simple setup just creates a volume and a network and starts the `docker.gitea.com/gitea:latest-rootless`
image as a service. Since there is no database available, one can be initialized using SQLite3.

Create a directory for `data` and `config`:

```sh
mkdir -p gitea/{data,config}
cd gitea
touch docker-compose.yml
```

Then paste the following content into a file named `docker-compose.yml`:

```yaml
services:
  server:
    image: docker.gitea.com/gitea:@dockerVersion@-rootless
    restart: always
    volumes:
      - ./data:/var/lib/gitea
      - ./config:/etc/gitea
      - /etc/timezone:/etc/timezone:ro
      - /etc/localtime:/etc/localtime:ro
    ports:
      - "3000:3000"
      - "2222:2222"
```

Note that the volume should be owned by the user/group with the UID/GID specified in the config file. By default Gitea in docker will use uid:1000 gid:1000. If needed you can set ownership on those folders with the command:

```sh
sudo chown 1000:1000 config/ data/
```

> If you don't give the volume correct permissions, the container may present the following errors in the logs:

```sh
server-1  | 2026-03-11T12:57:50.794102045Z mkdir: can't create directory '/var/lib/gitea/git': Permission denied
server-1  | 2026-03-11T12:57:50.796198843Z /var/lib/gitea/git is not writable
server-1  | 2026-03-11T12:57:50.796235667Z docker setup failed
```

For a stable release you could use `:latest-rootless`, `:1-rootless` or specify a certain release like `:@dockerVersion@-rootless`, but if you'd like to use the latest development version then `:nightly-rootless` would be an appropriate tag. If you'd like to run the latest commit from a release branch you can use the `:1.x-nightly-rootless` tag, where x is the minor version of Gitea. (e.g. `:1.16-nightly-rootless`)

## Named volumes

To use named volumes instead of host volumes, define and use the named volume
within the `docker-compose.yml` configuration. This change will automatically
create the required volume. You don't need to worry about permissions with
named volumes; Docker will deal with that automatically.

```diff
+volumes:
+  gitea-data:
+    driver: local
+  gitea-config:
+    driver: local
+
services:
  server:
    image: docker.gitea.com/gitea:@dockerVersion@-rootless
    restart: always
    volumes:
-      - ./data:/var/lib/gitea
+      - gitea-data:/var/lib/gitea
-      - ./config:/etc/gitea
+      - gitea-config:/etc/gitea
      - /etc/timezone:/etc/timezone:ro
      - /etc/localtime:/etc/localtime:ro
    ports:
      - "3000:3000"
      - "2222:2222"
```

MySQL or PostgreSQL containers will need to be created separately.

## Custom user

You can choose to use a custom user (following --user flag definition https://docs.docker.com/engine/reference/run/#user).
As an example to clone the host user `git` definition use the command `id -u git` and add it to `docker-compose.yml` file:
Please make sure that the mounted folders are writable by the user.

```diff
services:
  server:
    image: docker.gitea.com/gitea:@dockerVersion@-rootless
    restart: always
+    user: 1001
    volumes:
      - ./data:/var/lib/gitea
      - ./config:/etc/gitea
      - /etc/timezone:/etc/timezone:ro
      - /etc/localtime:/etc/localtime:ro
    ports:
      - "3000:3000"
      - "2222:2222"
```
