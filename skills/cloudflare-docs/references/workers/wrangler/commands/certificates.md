---
title: Certificates
description: Wrangler commands for managing mTLS and CA certificates, for use standalone or with Hyperdrive.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Certificates

Use these commands to manage certificates for mTLS connections.

The `mtls-certificate` commands manage client certificates for Worker subrequests. The `cert` commands manage both mTLS client certificates and Certificate Authority (CA) chain certificates, primarily for use with [Hyperdrive](https://developers.cloudflare.com/workers/wrangler/commands/hyperdrive/) configurations.

---

## `mtls-certificate`

Manage client certificates used for mTLS connections in subrequests.

These certificates can be used in [mtls\_certificate bindings](https://developers.cloudflare.com/workers/runtime-apis/bindings/mtls), which allow a Worker to present the certificate when establishing a connection with an origin that requires client authentication (mTLS).

### `mtls-certificate upload`

Upload an mTLS certificate

* [  npm ](#tab-panel-10001)
* [  pnpm ](#tab-panel-10002)
* [  yarn ](#tab-panel-10003)

Terminal window

```

npx wrangler mtls-certificate upload


```

Terminal window

```

pnpm wrangler mtls-certificate upload


```

Terminal window

```

yarn wrangler mtls-certificate upload


```

* `--cert` ` string ` required  
The path to a certificate file (.pem) containing a chain of certificates to upload
* `--key` ` string ` required  
The path to a file containing the private key for your leaf certificate
* `--name` ` string `  
The name for the certificate

Global flags

* `--v` ` boolean ` alias: --version  
Show version number
* `--cwd` ` string `  
Run as if Wrangler was started in the specified directory instead of the current working directory
* `--config` ` string ` alias: --c  
Path to Wrangler configuration file
* `--env` ` string ` alias: --e  
Environment to use for operations, and for selecting .env and .dev.vars files
* `--env-file` ` string `  
Path to an .env file to load - can be specified multiple times - values from earlier files are overridden by values in later files
* `--experimental-provision` ` boolean ` aliases: --x-provision default: true  
Experimental: Enable automatic resource provisioning
* `--experimental-auto-create` ` boolean ` alias: --x-auto-create default: true  
Automatically provision draft bindings with new resources

The following is an example of using the `upload` command to upload an mTLS certificate.

Terminal window

```

npx wrangler mtls-certificate upload --cert cert.pem --key key.pem --name my-origin-cert


```

```

Uploading mTLS Certificate my-origin-cert...

Success! Uploaded mTLS Certificate my-origin-cert

ID: 99f5fef1-6cc1-46b8-bd79-44a0d5082b8d

Issuer: CN=my-secured-origin.com,OU=my-team,O=my-org,L=San Francisco,ST=California,C=US

Expires: 1/01/2025


```

You can then add this certificate as a [binding](https://developers.cloudflare.com/workers/runtime-apis/bindings/) in your [Wrangler configuration file](https://developers.cloudflare.com/workers/wrangler/configuration/):

* [  wrangler.jsonc ](#tab-panel-10022)
* [  wrangler.toml ](#tab-panel-10023)

JSONC

```

{

  "mtls_certificates": [

    {

      "binding": "MY_CERT",

      "certificate_id": "99f5fef1-6cc1-46b8-bd79-44a0d5082b8d",

    },

  ],

}


```

TOML

```

[[mtls_certificates]]

binding = "MY_CERT"

certificate_id = "99f5fef1-6cc1-46b8-bd79-44a0d5082b8d"


```

Note that the certificate and private keys must be in separate (typically `.pem`) files when uploading.

### `mtls-certificate list`

List uploaded mTLS certificates

* [  npm ](#tab-panel-10004)
* [  pnpm ](#tab-panel-10005)
* [  yarn ](#tab-panel-10006)

Terminal window

```

npx wrangler mtls-certificate list


```

Terminal window

```

pnpm wrangler mtls-certificate list


```

Terminal window

```

yarn wrangler mtls-certificate list


```

Global flags

* `--v` ` boolean ` alias: --version  
Show version number
* `--cwd` ` string `  
Run as if Wrangler was started in the specified directory instead of the current working directory
* `--config` ` string ` alias: --c  
Path to Wrangler configuration file
* `--env` ` string ` alias: --e  
Environment to use for operations, and for selecting .env and .dev.vars files
* `--env-file` ` string `  
Path to an .env file to load - can be specified multiple times - values from earlier files are overridden by values in later files
* `--experimental-provision` ` boolean ` aliases: --x-provision default: true  
Experimental: Enable automatic resource provisioning
* `--experimental-auto-create` ` boolean ` alias: --x-auto-create default: true  
Automatically provision draft bindings with new resources

The following is an example of using the `list` command to upload an mTLS certificate.

Terminal window

```

npx wrangler mtls-certificate list


```

```

ID: 99f5fef1-6cc1-46b8-bd79-44a0d5082b8d

Name: my-origin-cert

Issuer: CN=my-secured-origin.com,OU=my-team,O=my-org,L=San Francisco,ST=California,C=US

Created on: 1/01/2023

Expires: 1/01/2025


ID: c5d004d1-8312-402c-b8ed-6194328d5cbe

Issuer: CN=another-origin.com,OU=my-team,O=my-org,L=San Francisco,ST=California,C=US

Created on: 1/01/2023

Expires: 1/01/2025


```

### `mtls-certificate delete`

Delete an mTLS certificate

* [  npm ](#tab-panel-10007)
* [  pnpm ](#tab-panel-10008)
* [  yarn ](#tab-panel-10009)

Terminal window

```

npx wrangler mtls-certificate delete


```

Terminal window

```

pnpm wrangler mtls-certificate delete


```

Terminal window

```

yarn wrangler mtls-certificate delete


```

* `--id` ` string `  
The id of the mTLS certificate to delete
* `--name` ` string `  
The name of the mTLS certificate record to delete

Global flags

* `--v` ` boolean ` alias: --version  
Show version number
* `--cwd` ` string `  
Run as if Wrangler was started in the specified directory instead of the current working directory
* `--config` ` string ` alias: --c  
Path to Wrangler configuration file
* `--env` ` string ` alias: --e  
Environment to use for operations, and for selecting .env and .dev.vars files
* `--env-file` ` string `  
Path to an .env file to load - can be specified multiple times - values from earlier files are overridden by values in later files
* `--experimental-provision` ` boolean ` aliases: --x-provision default: true  
Experimental: Enable automatic resource provisioning
* `--experimental-auto-create` ` boolean ` alias: --x-auto-create default: true  
Automatically provision draft bindings with new resources

The following is an example of using the `delete` command to delete an mTLS certificate.

Terminal window

```

npx wrangler mtls-certificate delete --id 99f5fef1-6cc1-46b8-bd79-44a0d5082b8d


```

```

Are you sure you want to delete certificate 99f5fef1-6cc1-46b8-bd79-44a0d5082b8d (my-origin-cert)? [y/n]

yes

Deleting certificate 99f5fef1-6cc1-46b8-bd79-44a0d5082b8d...

Deleted certificate 99f5fef1-6cc1-46b8-bd79-44a0d5082b8d successfully


```

---

## `cert`

Manage mTLS client certificates and Certificate Authority (CA) chain certificates used for secured connections.

These certificates can be used in Hyperdrive configurations, enabling them to present the certificate when connecting to an origin database that requires client authentication (mTLS) or a custom Certificate Authority (CA).

### `cert upload mtls-certificate`

Upload an mTLS certificate

* [  npm ](#tab-panel-10010)
* [  pnpm ](#tab-panel-10011)
* [  yarn ](#tab-panel-10012)

Terminal window

```

npx wrangler cert upload mtls-certificate


```

Terminal window

```

pnpm wrangler cert upload mtls-certificate


```

Terminal window

```

yarn wrangler cert upload mtls-certificate


```

* `--cert` ` string ` required  
The path to a certificate file (.pem) containing a chain of certificates to upload
* `--key` ` string ` required  
The path to a file containing the private key for your leaf certificate
* `--name` ` string `  
The name for the certificate

Global flags

* `--v` ` boolean ` alias: --version  
Show version number
* `--cwd` ` string `  
Run as if Wrangler was started in the specified directory instead of the current working directory
* `--config` ` string ` alias: --c  
Path to Wrangler configuration file
* `--env` ` string ` alias: --e  
Environment to use for operations, and for selecting .env and .dev.vars files
* `--env-file` ` string `  
Path to an .env file to load - can be specified multiple times - values from earlier files are overridden by values in later files
* `--experimental-provision` ` boolean ` aliases: --x-provision default: true  
Experimental: Enable automatic resource provisioning
* `--experimental-auto-create` ` boolean ` alias: --x-auto-create default: true  
Automatically provision draft bindings with new resources

The following is an example of using the `upload` command to upload an mTLS certificate.

Terminal window

```

npx wrangler cert upload --cert cert.pem --key key.pem --name my-origin-cert


```

```

Uploading mTLS Certificate my-origin-cert...

Success! Uploaded mTLS Certificate my-origin-cert

ID: 99f5fef1-6cc1-46b8-bd79-44a0d5082b8d

Issuer: CN=my-secured-origin.com,OU=my-team,O=my-org,L=San Francisco,ST=California,C=US

Expires: 1/01/2025


```

Note that the certificate and private keys must be in separate (typically `.pem`) files when uploading.

### `cert upload certificate-authority`

Upload a CA certificate chain

* [  npm ](#tab-panel-10013)
* [  pnpm ](#tab-panel-10014)
* [  yarn ](#tab-panel-10015)

Terminal window

```

npx wrangler cert upload certificate-authority


```

Terminal window

```

pnpm wrangler cert upload certificate-authority


```

Terminal window

```

yarn wrangler cert upload certificate-authority


```

* `--name` ` string `  
The name for the certificate
* `--ca-cert` ` string ` required  
The path to a certificate file (.pem) containing a chain of CA certificates to upload

Global flags

* `--v` ` boolean ` alias: --version  
Show version number
* `--cwd` ` string `  
Run as if Wrangler was started in the specified directory instead of the current working directory
* `--config` ` string ` alias: --c  
Path to Wrangler configuration file
* `--env` ` string ` alias: --e  
Environment to use for operations, and for selecting .env and .dev.vars files
* `--env-file` ` string `  
Path to an .env file to load - can be specified multiple times - values from earlier files are overridden by values in later files
* `--experimental-provision` ` boolean ` aliases: --x-provision default: true  
Experimental: Enable automatic resource provisioning
* `--experimental-auto-create` ` boolean ` alias: --x-auto-create default: true  
Automatically provision draft bindings with new resources

The following is an example of using the `upload` command to upload an CA certificate.

Terminal window

```

npx wrangler cert upload certificate-authority --ca-cert server-ca-chain.pem --name SERVER_CA_CHAIN


```

```

Uploading CA Certificate SERVER_CA_CHAIN...

Success! Uploaded CA Certificate SERVER_CA_CHAIN

ID: 99f5fef1-6cc1-46b8-bd79-44a0d5082b8d

Issuer: CN=my-secured-origin.com,OU=my-team,O=my-org,L=San Francisco,ST=California,C=US

Expires: 1/01/2025


```

### `cert list`

List uploaded mTLS certificates

* [  npm ](#tab-panel-10016)
* [  pnpm ](#tab-panel-10017)
* [  yarn ](#tab-panel-10018)

Terminal window

```

npx wrangler cert list


```

Terminal window

```

pnpm wrangler cert list


```

Terminal window

```

yarn wrangler cert list


```

Global flags

* `--v` ` boolean ` alias: --version  
Show version number
* `--cwd` ` string `  
Run as if Wrangler was started in the specified directory instead of the current working directory
* `--config` ` string ` alias: --c  
Path to Wrangler configuration file
* `--env` ` string ` alias: --e  
Environment to use for operations, and for selecting .env and .dev.vars files
* `--env-file` ` string `  
Path to an .env file to load - can be specified multiple times - values from earlier files are overridden by values in later files
* `--experimental-provision` ` boolean ` aliases: --x-provision default: true  
Experimental: Enable automatic resource provisioning
* `--experimental-auto-create` ` boolean ` alias: --x-auto-create default: true  
Automatically provision draft bindings with new resources

The following is an example of using the `list` command to upload an mTLS or CA certificate.

Terminal window

```

npx wrangler cert list


```

```

ID: 99f5fef1-6cc1-46b8-bd79-44a0d5082b8d

Name: my-origin-cert

Issuer: CN=my-secured-origin.com,OU=my-team,O=my-org,L=San Francisco,ST=California,C=US

Created on: 1/01/2023

Expires: 1/01/2025


ID: c5d004d1-8312-402c-b8ed-6194328d5cbe

Issuer: CN=another-origin.com,OU=my-team,O=my-org,L=San Francisco,ST=California,C=US

Created on: 1/01/2023

Expires: 1/01/2025


```

### `cert delete`

Delete an mTLS certificate

* [  npm ](#tab-panel-10019)
* [  pnpm ](#tab-panel-10020)
* [  yarn ](#tab-panel-10021)

Terminal window

```

npx wrangler cert delete


```

Terminal window

```

pnpm wrangler cert delete


```

Terminal window

```

yarn wrangler cert delete


```

* `--id` ` string `  
The id of the mTLS certificate to delete
* `--name` ` string `  
The name of the mTLS certificate record to delete

Global flags

* `--v` ` boolean ` alias: --version  
Show version number
* `--cwd` ` string `  
Run as if Wrangler was started in the specified directory instead of the current working directory
* `--config` ` string ` alias: --c  
Path to Wrangler configuration file
* `--env` ` string ` alias: --e  
Environment to use for operations, and for selecting .env and .dev.vars files
* `--env-file` ` string `  
Path to an .env file to load - can be specified multiple times - values from earlier files are overridden by values in later files
* `--experimental-provision` ` boolean ` aliases: --x-provision default: true  
Experimental: Enable automatic resource provisioning
* `--experimental-auto-create` ` boolean ` alias: --x-auto-create default: true  
Automatically provision draft bindings with new resources

The following is an example of using the `delete` command to delete an mTLS or CA certificate.

Terminal window

```

npx wrangler cert delete --id 99f5fef1-6cc1-46b8-bd79-44a0d5082b8d


```

```

Are you sure you want to delete certificate 99f5fef1-6cc1-46b8-bd79-44a0d5082b8d (my-origin-cert)? [y/n]

yes

Deleting certificate 99f5fef1-6cc1-46b8-bd79-44a0d5082b8d...

Deleted certificate 99f5fef1-6cc1-46b8-bd79-44a0d5082b8d successfully


```

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers/","name":"Workers"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers/wrangler/","name":"Wrangler"}},{"@type":"ListItem","position":4,"item":{"@id":"/workers/wrangler/commands/","name":"Commands"}},{"@type":"ListItem","position":5,"item":{"@id":"/workers/wrangler/commands/certificates/","name":"Certificates"}}]}
```
