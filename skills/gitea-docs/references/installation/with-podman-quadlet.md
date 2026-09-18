---
date: "2026-09-03T20:00:00+02:00"
aliases:
  - /en-us/install-with-podman-quadlet
---

# Installation with Podman Quadlet

Similarly to [Docker](with-docker.md), [Podman](https://podman.io/) can be used to deploy Gitea.

This reference setup guides users through the setup based on Podman Quadlet.
Podman Quadlet is the native integration of Podman through systemd.

To learn more about Podman Quadlet, see [systemd units using Podman Quadlet](https://docs.podman.io/en/latest/markdown/podman-systemd.unit.5.html).

This setup installs the quadlets in `~/.config/containers/systemd/`, the directory for rootless quadlets, and uses the rootless images.
If you install them in a rootful directory such as `/etc/containers/systemd/`, use the rootful images instead.

## Basics

Since Podman v6.0 a single `gitea.quadlets` file can hold multiple quadlets separated by the `---` delimiter.

Paste the following content into a file named `gitea.quadlets`

```ini
# FileName=gitea-data
[Volume]
VolumeName=gitea-data
---
# FileName=gitea-config
[Volume]
VolumeName=gitea-config
---
# FileName=gitea
[Container]
PublishPort=2222:2222
PublishPort=3000:3000
Image=docker.gitea.com/gitea:@dockerVersion@-rootless
ContainerName=gitea
Mount=type=volume,src=gitea-data.volume,destination=/var/lib/gitea
Mount=type=volume,src=gitea-config.volume,destination=/etc/gitea

[Service]
Restart=always

[Install]
# Start with the user session
WantedBy=default.target
```

You can run the installation command

```sh
$ podman quadlet install ./gitea.quadlets --application=gitea
/home/user/.config/containers/systemd/gitea/gitea-data.volume
/home/user/.config/containers/systemd/gitea/gitea-config.volume
/home/user/.config/containers/systemd/gitea/gitea.container
```

The `--application=gitea` flag allows us to tell podman to group the quadlets together, this can help for managing and organizing the quadlets files.

You can validate the quadlets are properly installed by looking at the list command

```sh
$ podman quadlet list
NAME                 UNIT NAME                    PATH ON DISK                                                     STATUS         APPLICATION  POD
gitea-config.volume  gitea-config-volume.service  /home/user/.config/containers/systemd/gitea/gitea-config.volume  active/exited  gitea
gitea-data.volume    gitea-data-volume.service    /home/user/.config/containers/systemd/gitea/gitea-data.volume    active/exited  gitea
gitea.container      gitea.service                /home/user/.config/containers/systemd/gitea/gitea.container      failed/failed  gitea
```

You can start the application by running `systemctl --user start gitea` command.

`WantedBy=default.target` starts the service when the user session starts.
Rootless user services do not run without a session, so to start Gitea at boot, enable lingering for the user with `loginctl enable-linger $USER`.

## Databases

### PostgreSQL database

To start Gitea in combination with a PostgreSQL database, apply these changes to the
`gitea.quadlets` file created above.

To start Gitea with a database, we need to create a network, so the database and Gitea container can communicate.

```diff
# FileName=gitea-data
[Volume]
VolumeName=gitea-data
---
# FileName=gitea-config
[Volume]
VolumeName=gitea-config
---
+ # FileName=gitea-postgres-data
+ [Volume]
+ VolumeName=gitea-postgres-data
+ ---
+ # FileName=gitea
+ [Network]
+ NetworkName=gitea
+ ---
+ # FileName=gitea-postgres
+ [Container]
+ Image=docker.io/library/postgres:18
+ ContainerName=gitea-postgres
+ Network=gitea.network
+ Mount=type=volume,src=gitea-postgres-data.volume,destination=/var/lib/postgresql
+ Environment=POSTGRES_USER=gitea
+ Environment=POSTGRES_PASSWORD=gitea
+ Environment=POSTGRES_DB=gitea
+
+ [Service]
+ Restart=always
+
+ [Install]
+ # Start with the user session
+ WantedBy=default.target
+ ---
# FileName=gitea
+ [Unit]
+ Requires=gitea-postgres.service
+ After=gitea-postgres.service
+
[Container]
PublishPort=2222:2222
PublishPort=3000:3000
Image=docker.gitea.com/gitea:@dockerVersion@-rootless
ContainerName=gitea
Mount=type=volume,src=gitea-data.volume,destination=/var/lib/gitea
Mount=type=volume,src=gitea-config.volume,destination=/etc/gitea
+ Network=gitea.network
+ Environment=GITEA__database__DB_TYPE=postgres
+ Environment=GITEA__database__HOST=gitea-postgres:5432
+ Environment=GITEA__database__NAME=gitea
+ Environment=GITEA__database__USER=gitea
+ Environment=GITEA__database__PASSWD=gitea

[Service]
Restart=always

[Install]
# Start with the user session
WantedBy=default.target
```

## Logs

As systemd manages the container we can use `journalctl` to access the logs

```sh
$ journalctl --user --follow --unit=gitea.service
gitea[5967]: 2026/09/03 14:50:42 cmd/web.go:263:runWeb() [I] Starting Gitea on PID: 2
gitea[5967]: 2026/09/03 14:50:42 cmd/web.go:115:showWebStartupMessage() [I] Gitea version: 1.27.3 built with go1.26.7-X:jsonv2 : bindata, timetzdata,
gitea[5967]: 2026/09/03 14:50:42 cmd/web.go:116:showWebStartupMessage() [I] * RunMode: prod
gitea[5967]: 2026/09/03 14:50:42 cmd/web.go:117:showWebStartupMessage() [I] * AppPath: /usr/local/bin/gitea
gitea[5967]: 2026/09/03 14:50:42 cmd/web.go:118:showWebStartupMessage() [I] * WorkPath: /var/lib/gitea
gitea[5967]: 2026/09/03 14:50:42 cmd/web.go:119:showWebStartupMessage() [I] * CustomPath: /var/lib/gitea/custom
gitea[5967]: 2026/09/03 14:50:42 cmd/web.go:120:showWebStartupMessage() [I] * ConfigFile: /etc/gitea/app.ini
gitea[5967]: 2026/09/03 14:50:42 cmd/web.go:121:showWebStartupMessage() [I] Prepare to run install page
gitea[5967]: 2026/09/03 14:50:42 cmd/web.go:329:listen() [I] Listen: http://0.0.0.0:3000
gitea[5967]: 2026/09/03 14:50:42 cmd/web.go:333:listen() [I] AppURL(ROOT_URL): http://localhost:3000/
gitea[5967]: 2026/09/03 14:50:42 modules/graceful/server.go:52:NewServer() [I] Starting new Web server: tcp:0.0.0.0:3000 on PID: 2
```
