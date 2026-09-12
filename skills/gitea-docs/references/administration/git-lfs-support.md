---
date: "2019-10-06T08:00:00+05:00"
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

> **note**: LFS server support needs at least Git v2.1.2 installed on the server

# Git LFS Pure SSH protocol

The LFS Pure SSH protocol supports making LFS connections purely over SSH
(without having to expose an HTTP endpoint for the Gitea server).
Support for it can be enabled with the config option `server.LFS_ALLOW_PURE_SSH`:

```ini
[server]
LFS_ALLOW_PURE_SSH = true
```

> **note**: The option is currently set to default false due to an open bug in the `git-lfs`
client that causes SSH transfers to hang: https://github.com/git-lfs/git-lfs/pull/5816
This can be worked around on all the client machines by setting the git config:
`git config --global lfs.ssh.automultiplex false`

# Changing LFS files through the API

The [contents API](https://docs.gitea.com/api/operations/repo-change-files/)
works on LFS tracked files as well: send the file content as usual and Gitea
stores it as an LFS object and commits a pointer file, as long as the path is
matched by a `filter=lfs` rule in `.gitattributes`.

What is easy to get wrong is the `sha` of the file being changed, which
`PUT`/`DELETE /repos/{owner}/{repo}/contents/{filepath}` and
`POST /repos/{owner}/{repo}/contents` require for an existing file. Gitea
compares it with the ID of the blob the commit has at that path, and for an LFS
tracked file that blob is the **pointer file**, not the content:

- use the `sha` returned by
  [`GET /repos/{owner}/{repo}/contents/{filepath}`](https://docs.gitea.com/api/operations/repo-get-contents/)
- do not use `lfs_oid` from the same response, which identifies the LFS object,
  and do not use a checksum of the file itself

Sending anything else fails with `sha does not match`, even though the request
looks correct.
