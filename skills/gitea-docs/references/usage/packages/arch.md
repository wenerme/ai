---
date: "2023-05-15T00:00:00+00:00"
slug: "arch"
sidebar_position: 5
---

# Arch package registry

Publish [Arch](https://archlinux.org/packages/) packages for your user or organization. The registry can act as a fully working [Arch linux mirror](https://wiki.archlinux.org/title/mirrors) connected directly in `/etc/pacman.conf`.

## Requirements

To work with the Arch registry, you need to use a HTTP client like `curl` to upload and a package manager like `pacman` to consume packages.

The following examples use `pacman`.

## Configuring the package registry

Before you can use the package registry, you need to download the package verification key and add the registry to the pacman config.

Download the package verification key.
```sh
wget https://gitea.example.com/api/packages/{owner}/arch/repository.key
```

Display the id the key (the long line with hex characters).
```sh
gpg --show-keys repository.key
```

Add the key to pacman and sign it (use the key id from the previous step).
```sh
pacman-key --add repository.key
pacman-key --lsign-key {key id}
```

Now add the registry configuration to `/etc/pacman.conf`.
```conf
[{repository}]
SigLevel = Required
Server = https://gitea.example.com/api/packages/{owner}/arch/$repo/$arch
```

| Placeholder    | Description |
| -------------- | ----------- |
| `owner`        | The owner of the packages. |
| `repository`   | The repository to use. |

Consult the owners package overview to see what `repository` and `architecture` is available.

If the registry is private, provide credentials in the url. You can use a password or a [personal access token](development/api-usage.md#authentication):

```
[{repository}]
SigLevel = Required
Server = https://{username}:{your_password_or_token}@gitea.example.com/api/packages/{owner}/arch/$repo/$arch
```

## Publish a package

To publish an Arch package, perform a HTTP `PUT` operation with the package content in the request body.

```
PUT https://gitea.example.com/api/packages/{owner}/arch/{repository}
```

| Parameter    | Description |
| ------------ | ----------- |
| `owner`      | The owner of the package. |
| `repository` | The repository can be used to group packages or just `core` or similar. |

Example request using HTTP Basic authentication:

```shell
curl --user your_username:your_password_or_token \
     --upload-file path/to/file.pkg.tar.zst \
     https://gitea.example.com/api/packages/testuser/arch/core
```

If you are using 2FA or OAuth use a [personal access token](development/api-usage.md#authentication) instead of the password.

You cannot publish a file with the same name twice to a package. You must delete the existing package file first.

The server responds with the following HTTP Status codes.

| HTTP Status Code  | Meaning |
| ----------------- | ------- |
| `201 Created`     | The package has been published. |
| `400 Bad Request` | Something of the package is invalid. The error message contains more information. |
| `409 Conflict`    | A package file with the same combination of parameters exist already in the package. |

## Install packages

To install a package run the pacman sync command:

```sh
pacman -Sy {package_name}
```

| Parameter      | Description |
| -------------- | ----------- |
| `package_name` | The package name. |

## Delete a package

To delete an Arch package perform a HTTP `DELETE` operation. This will delete the package version too if there is no file left.

```
DELETE https://gitea.example.com/api/packages/{owner}/arch/{repository}/{package_name}/{package_version}/{architecture}
```

| Parameter         | Description |
| ----------------- | ----------- |
| `owner`           | The owner of the package. |
| `repository`      | The repository to use. |
| `architecture`    | The package architecture. |
| `package_name`    | The package name. |
| `package_version` | The package version. |


Example request using HTTP Basic authentication:

```shell
curl --user your_username:your_token_or_password -X DELETE \
     https://gitea.example.com/api/packages/testuser/arch/core/test-package/1.0.0/x86-64
```

The server responds with the following HTTP Status codes.

| HTTP Status Code  | Meaning |
| ----------------- | ------- |
| `204 No Content`  | Success |
| `404 Not Found`   | The package or file was not found. |
