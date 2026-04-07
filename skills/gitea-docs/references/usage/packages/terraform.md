---
date: "2026-03-04T00:00:00+00:00"
---

# Terraform State Registry

Publish terraform states to sync it between multiple users or CI system.

## Requirements

To work with the Terraform State registry, you need to use [Terraform](https://www.terraform.io/) or [OpenTofu](https://opentofu.org/).

## Configuring the package registry

To use the Gitea Terraform State registry, you need to configure the `http` backend in your Terraform configuration.

```hcl
terraform {
  backend "http" {
    address        = "https://gitea.example.com/api/packages/{owner}/terraform/state/{name}"
    lock_address   = "https://gitea.example.com/api/packages/{owner}/terraform/state/{name}/lock"
    unlock_address = "https://gitea.example.com/api/packages/{owner}/terraform/state/{name}/lock"
    lock_method    = "POST"
    unlock_method  = "DELETE"
    username       = "{username}"
    password       = "{password_or_token}"
  }
}
```

| Placeholder | Description |
| ----------- | ----------- |
| `owner`     | The owner of the state (user or organization). |
| `name`      | The name of the state. |
| `username`  | Your Gitea username. |
| `password`  | Your Gitea password or [personal access token](development/api-usage.md#authentication). |

If you are using 2FA or OAuth use a [personal access token](development/api-usage.md#authentication) instead of the password.

## Initialize the backend

After configuring the backend, you can initialize it with:

```shell
terraform init
```

Terraform will prompt you to migrate your state if you already have one locally.

## State Locking

Gitea supports state locking to prevent concurrent modifications. The `lock_address` and `unlock_address` should point to the `/lock` sub-route of your state URL.

- **Locking**: Performed via a `POST` request to `{address}/lock`.
- **Unlocking**: Performed via a `DELETE` request to `{address}/lock`.

Terraform handles these requests automatically when configured as shown above.

## Encrypted state

The state registry supports [encrypted state](https://opentofu.org/docs/language/state/encryption/).

## State Versions and Management

Gitea keeps track of your Terraform state versions. You can use the API to retrieve or delete specific versions.

### Fetch state

To fetch the latest version of a state:

```shell
curl --user {username}:{password_or_token} \
     https://gitea.example.com/api/packages/{owner}/terraform/state/{name}
```

To fetch a specific version by its serial number:

```shell
curl --user {username}:{password_or_token} \
     https://gitea.example.com/api/packages/{owner}/terraform/state/{name}/versions/{serial}
```

### Delete state

To delete the entire state and all its versions:

```shell
curl --user {username}:{password_or_token} -X DELETE \
     https://gitea.example.com/api/packages/{owner}/terraform/state/{name}
```

To delete a specific version by its serial number:

```shell
curl --user {username}:{password_or_token} -X DELETE \
     https://gitea.example.com/api/packages/{owner}/terraform/state/{name}/versions/{serial}
```
