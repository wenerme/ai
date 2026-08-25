---
description: "Stash can be controlled through the stash:// and clash:// URL schemas. Covers the available commands and the encoding required for parameters."
---

# URL Schema

Stash supports using URL Schema `stash://` and `clash://` to control Stash, and the included URL **needs to be encoded.**

### link.stash.ws
In addition to the above URL Schema, Stash also supports using the standard URL `https://link.stash.ws` to control, with the format of `https://link.stash.ws/command/url`, and the included URL **does not contain Schema and does not need to be encoded.**

Taking the one-click installation of BoxJS as an example,

Original URL: `https://raw.githubusercontent.com/chavyleung/scripts/master/box/rewrite/boxjs.rewrite.stash.stoverride`

One-click installation URL: `https://link.stash.ws/install-override/raw.githubusercontent.com/chavyleung/scripts/master/box/rewrite/boxjs.rewrite.stash.stoverride`

> [!NOTE]
> The default remote URL Schema is HTTPS. If you need to use HTTP, please add the parameter `?scheme=http`.

> [!NOTE]
> If the remote URL cannot be accessed, the link will return `404`.

## Import Configuration File

- `stash://install-config?url=${url-encoded}`
- `clash://install-config?url=${url-encoded}`
- `https://link.stash.ws/install-config/example.com/stash.yaml`

## Import Remote Override

- `stash://install-override?url=${url-encoded}`
- `clash://install-override?url=${url-encoded}`
- `https://link.stash.ws/install-override/example.com/stash.stoverride`

## Import Icon Set

- `stash://install-icon-set?url=${url-encoded}`
- `clash://install-icon-set?url=${url-encoded}`
- `https://link.stash.ws/install-icon-set/example.com/stash.json`

## Turn On/Off Stash

### Start Stash
- `stash://start`
- `clash://start`
- `https://link.stash.ws/start`

### Stop Stash
- `stash://stop`
- `clash://stop`
- `https://link.stash.ws/stop`

### Toggle On/Off
- `stash://toggle`
- `clash://toggle`
- `https://link.stash.ws/toggle`
