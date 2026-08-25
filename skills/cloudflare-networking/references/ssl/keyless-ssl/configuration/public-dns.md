---
description: Deploy Keyless SSL with public DNS resolution.
title: Public DNS
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/ssl/llms.txt
> Use this file to discover all available pages before exploring further.

# Public DNS

Last updated Jul 30, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/ssl/keyless-ssl/configuration/public-dns/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

If you cannot use a [Cloudflare Tunnel setup](https://developers.cloudflare.com/ssl/keyless-ssl/configuration/cloudflare-tunnel/), you can also create a public DNS record for your key server.

This setup option is not ideal as the DNS record cannot be [proxied](https://developers.cloudflare.com/dns/proxy-status/) and - as a result - will expose the origin IP address of your key server.

---

## Before you begin

### Supported platforms

Keyless has been tested on `amd64` and `arm` architectures. The key server binary will likely run on all architectures that Go supports. Code support may exist for other CPUs too, but these other architectures have not been tested.

In addition to running on bare metal, the key server should run without issue in a virtualized or containerized environment. Care will need to be taken to configure ingress access to the appropriate TCP port and file system access to private keys (if using filesystem storage).

### Supported operating systems

You will need to have a supported operating system (OS) to run Keyless. Supported operating systems include:

* Ubuntu 20.04 LTS (Focal), 22.04 LTS (Jammy), 24.04 LTS (Noble)
* Debian 11 (Bullseye), 12 (Bookworm), 13 (Trixie)
* RHEL 8, 9, CentOS 8, and CentOS Stream 9
* Amazon Linux 2, 2023

We strongly recommend that you use an operating system still supported by the vendor (still receiving security updates) as your key server will have access to your private keys.

---

## 1\. Create public DNS record

1. Open a Terminal and run `openssl rand -hex 24` to generate a long, random hostname such as `11aa40b4a5db06d4889e48e2f738950ddfa50b7349d09b5f.example.com`.
2. Add this record via your DNS provider’s interface as an **A** or **AAAA** record pointing to the IP address of your Keyless SSL server.
3. Use this hostname as the server hostname during initialization of your Keyless SSL server.

Caution

As a security measure, you should hide the hostname of your key server.

Note

If your key server hostname is on a Cloudflare zone, you must create a DNS-only (grey cloud) record for it — do not proxy it. If the record is proxied, the hostname resolves to Cloudflare's edge IP addresses instead of your key server, so Cloudflare's keyless client cannot reach it. If the record is missing, resolution fails with NXDOMAIN. Either way, the Keyless SSL handshake fails. The fix is the DNS-only record — not adding the hostname to a certificate Subject Alternative Name (SAN).

---

## Certificates used in Keyless SSL

Keyless SSL involves **two different certificates**. Confusing them is the most common setup error.

| Certificate                               | What it is                                                          | SAN should contain                                      |
| ----------------------------------------- | ------------------------------------------------------------------- | ------------------------------------------------------- |
| **Edge (Keyless SSL) certificate**        | The public certificate Cloudflare serves for your site.             | Your site hostnames only (for example, www.example.com) |
| **Key server authentication certificate** | The certificate your key server uses to prove itself to Cloudflare. | The key server hostname only                            |

Caution

Do **not** add your key server hostname to the SAN of your public edge certificate. It is not required, and it leaks internal hostnames into the public certificate and Certificate Transparency logs.

---

## 2\. Upload Keyless SSL Certificates

Before your key servers can be configured, you must next upload the corresponding SSL certificates to Cloudflare’s edge. During TLS termination, Cloudflare will present these certificates to connecting browsers and then (for non-resumed sessions) communicate with the specified key server to complete the handshake.

Upload certificates to Cloudflare with only SANs that you wish to use with Cloudflare Keyless SSL. All Keyless SSL hostnames must be [proxied](https://developers.cloudflare.com/dns/proxy-status/).

You will have to upload each certificate used with Keyless SSL.

To create a Keyless certificate in the dashboard:

1. In the Cloudflare dashboard, go to the **Edge Certificates** page.
[Go to **Edge Certificates** ↗](https://dash.cloudflare.com/?to=/:account/:zone/ssl-tls/edge-certificates)
2. Select **Upload Keyless SSL Certificate**.
3. Fill in the upload modal with the certificate and other details and select **Add**.

| Label               | Description                                                                                                                                                                                     | Example Values                                               |
| ------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------ |
| Key server label    | Any unique identifier for your key server.                                                                                                                                                      | “test-keyless”, “production-keyless-1”                       |
| Key server hostname | The hostname of your key server that holds the key for this certificate (such as the random hostname generated earlier).                                                                        | 11aa40b4a5db06d4889e48e2f738950ddfa50b7349d09b5f.example.com |
| Key server port     | Set to 2407 unless you have changed this on the key server.                                                                                                                                     | 2407                                                         |
| SSL Certificate     | The valid X509v3 SSL certificate (in PEM form) for which you hold the private key.                                                                                                              | (PEM bytes)                                                  |
| Bundle method       | This should almost always be **Compatible**. Refer to [Uploading Custom Certificates](https://developers.cloudflare.com/ssl/edge-certificates/custom-certificates/uploading/) for more details. | Compatible                                                   |

To create a Keyless certificate with the API, send a [POST](https://developers.cloudflare.com/api/resources/keyless%5Fcertificates/methods/create/) request.

---

## 3\. Set up and activate key server

Finally, you need to install the key server on your infrastructure, populate it with the SSL keys of the certificates you wish to use to terminate TLS at Cloudflare’s edge, and activate the key server so it can be mutually authenticated.

Note

If you plan to run Keyless SSL in a [high availability setup](https://developers.cloudflare.com/ssl/keyless-ssl/reference/high-availability/), you may need to set up additional infrastructure (load balancing and health checks).

### Install

These steps are also at the [Cloudflare package repository ↗](https://pkg.cloudflare.com/).

#### Debian/Ubuntu packages

```sh
sudo mkdir -p --mode=0755 /usr/share/keyrings
curl -fsSL https://pkg.cloudflare.com/cloudflare-main.gpg | sudo tee /usr/share/keyrings/cloudflare-main.gpg >/dev/null

echo 'deb [signed-by=/usr/share/keyrings/cloudflare-main.gpg] https://pkg.cloudflare.com/gokeyless trixie main' | sudo tee /etc/apt/sources.list.d/cloudflare.list

sudo apt-get update && sudo apt-get install gokeyless
```

```sh
sudo mkdir -p --mode=0755 /usr/share/keyrings
curl -fsSL https://pkg.cloudflare.com/cloudflare-main.gpg | sudo tee /usr/share/keyrings/cloudflare-main.gpg >/dev/null

echo 'deb [signed-by=/usr/share/keyrings/cloudflare-main.gpg] https://pkg.cloudflare.com/gokeyless bookworm main' | sudo tee /etc/apt/sources.list.d/cloudflare.list

sudo apt-get update && sudo apt-get install gokeyless
```

```sh
sudo mkdir -p --mode=0755 /usr/share/keyrings
curl -fsSL https://pkg.cloudflare.com/cloudflare-main.gpg | sudo tee /usr/share/keyrings/cloudflare-main.gpg >/dev/null

echo 'deb [signed-by=/usr/share/keyrings/cloudflare-main.gpg] https://pkg.cloudflare.com/gokeyless bullseye main' | sudo tee /etc/apt/sources.list.d/cloudflare.list

sudo apt-get update && sudo apt-get install gokeyless
```

```sh
sudo mkdir -p --mode=0755 /usr/share/keyrings
curl -fsSL https://pkg.cloudflare.com/cloudflare-main.gpg | sudo tee /usr/share/keyrings/cloudflare-main.gpg >/dev/null

echo 'deb [signed-by=/usr/share/keyrings/cloudflare-main.gpg] https://pkg.cloudflare.com/gokeyless noble main' | sudo tee /etc/apt/sources.list.d/cloudflare.list

sudo apt-get update && sudo apt-get install gokeyless
```

```sh
sudo mkdir -p --mode=0755 /usr/share/keyrings
curl -fsSL https://pkg.cloudflare.com/cloudflare-main.gpg | sudo tee /usr/share/keyrings/cloudflare-main.gpg >/dev/null

echo 'deb [signed-by=/usr/share/keyrings/cloudflare-main.gpg] https://pkg.cloudflare.com/gokeyless jammy main' | sudo tee /etc/apt/sources.list.d/cloudflare.list

sudo apt-get update && sudo apt-get install gokeyless
```

```sh
sudo mkdir -p --mode=0755 /usr/share/keyrings
curl -fsSL https://pkg.cloudflare.com/cloudflare-main.gpg | sudo tee /usr/share/keyrings/cloudflare-main.gpg >/dev/null

echo 'deb [signed-by=/usr/share/keyrings/cloudflare-main.gpg] https://pkg.cloudflare.com/gokeyless focal main' | sudo tee /etc/apt/sources.list.d/cloudflare.list

sudo apt-get update && sudo apt-get install gokeyless
```

#### RHEL/CentOS/Amazon Linux packages

Gokeyless uses CGO for PKCS#11/HSM support, which creates glibc dependencies. Use the repository that matches your distribution.

```sh
sudo dnf config-manager --add-repo https://pkg.cloudflare.com/gokeyless/rpm/gokeyless.repo
sudo dnf install gokeyless
```

```sh
curl -fsSl https://pkg.cloudflare.com/gokeyless/rpm/gokeyless.repo | sudo tee /etc/yum.repos.d/gokeyless.repo
sudo yum update
sudo yum install gokeyless
```

```sh
sudo dnf config-manager --add-repo https://pkg.cloudflare.com/gokeyless/rpm-el8/gokeyless.repo
sudo dnf install gokeyless
```

```sh
curl -fsSl https://pkg.cloudflare.com/gokeyless/rpm-el8/gokeyless.repo | sudo tee /etc/yum.repos.d/gokeyless.repo
sudo yum update
sudo yum install gokeyless
```

### Configure

Add your Cloudflare account details to the configuration file located at `/etc/keyless/gokeyless.yaml`:

1. Set the hostname of the key server, for example, `11aa40b4a5db06d4889e48e2f.example.com`. This is also the value you entered when you uploaded your keyless certificate and is the hostname of your key server that holds the key for this certificate.
2. Set the Zone ID (found on **Overview** tab of the Cloudflare dashboard).
3. Set the authentication credential for server certificate enrollment. gokeyless supports two options:

  * **API Token (recommended):** [Create an API Token](https://developers.cloudflare.com/fundamentals/api/get-started/create-token/) with the **Zone > SSL and Certificates > Edit** permission. Set it in your configuration:
  ```yaml
  api_token: "<YOUR_API_TOKEN>"
  ```
  Or use the environment variable `KEYLESS_API_TOKEN`.
  * **Origin CA API key (deprecated):** [Set the Origin CA API key](https://developers.cloudflare.com/fundamentals/api/get-started/ca-keys/). This option will stop working on September 30, 2026.

Origin CA Service Keys are removed September 30, 2026

The Origin CA API key (Service Key) used for Keyless SSL enrollment is deprecated and will be removed on **September 30, 2026**. After that date, key server enrollment and certificate refresh using only a Service Key will fail.

**To migrate**, upgrade to gokeyless 1.18.0 or later, create an API Token with **Zone > SSL and Certificates > Edit**, and set the `api_token` value in `/etc/keyless/gokeyless.yaml` (or the `KEYLESS_API_TOKEN` environment variable). You can then remove the `origin_ca_api_key` value.

Refer to the [gokeyless 1.18.0 release notes ↗](https://github.com/cloudflare/gokeyless/releases/tag/v1.18.0) and the [Origin CA keys deprecation notice](https://developers.cloudflare.com/fundamentals/api/get-started/ca-keys/) for details.

### Populate keys

Install your private keys in `/etc/keyless/keys/` and set the user and group to keyless with 400 permissions. Keys must be in PEM or DER format and have an extension of `.key`:

```sh
ls -l /etc/keyless/keys
```

```sh
-r-------- 1 keyless keyless 1675 Nov 18 16:44 example.com.key
```

When running multiple key servers, make sure all required keys are distributed to each key server. Customers typically will either use a configuration management tool such as Salt or Puppet to distribute keys or mount `/etc/keyless/keys` to a network location accessible only by your key servers. Keys are read on boot into memory, so a network path must be accessible during the gokeyless process start/restart.

### Activate

To activate, restart your keyless instance:

* systemd: `sudo service gokeyless restart`
* upstart/sysvinit: `sudo /etc/init.d/gokeyless restart`

Note

The first time the key server starts with the hostname, Zone ID, and Origin CA API key set, it automatically generates its own private key and certificate signing request (CSR), submits the CSR to Cloudflare, and saves the signed authentication certificate it presents for mutual TLS. You do not need to create this certificate manually. If those three values are not set, the key server will not start and will ask you to set them — or to run it with `--config-only` or `--manual-activation` to generate the key and CSR interactively.

If this command fails, try troubleshooting by [checking the logs](https://developers.cloudflare.com/ssl/keyless-ssl/troubleshooting/).

### Allow incoming connections from Cloudflare

During TLS handshakes, Cloudflare's keyless client will initiate connections to the key server hostname or IP address you specify during certificate upload. By default, the keyless client will use a destination TCP port of 2407, but this can be changed during certificate upload or by editing the certificate details after upload.

Create WAF custom rules that allow your key server to accept connections from only Cloudflare. You can get Cloudflare's IPv4 and IPv6 addresses via the [IP details API endpoint](https://developers.cloudflare.com/api/resources/ips/methods/list/).

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ssl/keyless-ssl/configuration/public-dns/#page","headline":"Public DNS setup - Keyless SSL · Cloudflare SSL/TLS docs","description":"Deploy Keyless SSL with public DNS resolution.","url":"https://developers.cloudflare.com/ssl/keyless-ssl/configuration/public-dns/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-07-30","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["DNS"]}
```
