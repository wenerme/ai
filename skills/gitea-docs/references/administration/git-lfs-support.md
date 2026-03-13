---
date: "2019-10-06T08:00:00+05:00"
slug: "git-lfs-setup"
sidebar_position: 12
aliases:
  - /en-us/git-lfs-setup
---

# Git LFS setup

To use Gitea's built-in LFS support, you must update the `app.ini` file:

```ini
[server]
; Enables git-lfs support. true or false, default is false.
LFS_START_SERVER = true

[lfs]
; Where your lfs files reside, default is data/lfs.
PATH = /home/gitea/data/lfs
```

:::note
LFS server support needs at least Git v2.1.2 installed on the server
:::

# Git LFS Pure SSH protocol

The LFS Pure SSH protocol supports making LFS connections purely over SSH
(without having to expose an HTTP endpoint for the Gitea server).
Support for it can be enabled with the config option `server.LFS_ALLOW_PURE_SSH`:

```ini
[server]
LFS_ALLOW_PURE_SSH = true
```

:::note
The option is currently set to default false due to an open bug in the `git-lfs`
client that causes SSH transfers to hang: https://github.com/git-lfs/git-lfs/pull/5816
This can be worked around on all the client machines by setting the git config:
`git config --global lfs.ssh.automultiplex false`
:::
