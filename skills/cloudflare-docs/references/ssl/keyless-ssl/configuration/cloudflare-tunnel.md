---
title: Cloudflare Tunnel
description: Through an integration with Cloudflare Tunnel, you can send traffic to a key server through a secure channel and avoid exposing your key server to the public Internet.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/ssl/keyless-ssl/configuration/cloudflare-tunnel.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Cloudflare Tunnel

Through an integration with [Cloudflare Tunnel](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/), you can send traffic to a key server through a secure channel and avoid exposing your key server to the public Internet.

---

## Before you begin

### Supported platforms

Keyless has been tested on `amd64` and `arm` architectures. The key server binary will likely run on all architectures that Go supports. Code support may exist for other CPUs too, but these other architectures have not been tested.

In addition to running on bare metal, the key server should run without issue in a virtualized or containerized environment. Care will need to be taken to configure ingress access to the appropriate TCP port and file system access to private keys (if using filesystem storage).

### Supported operating systems

You will need to have a supported operating system (OS) to run Keyless. Supported operating systems include:

* Ubuntu 14.04 LTS, 16.04 LTS, 18.04 LTS, 20.04 LTS, 22.04 LTS, 22.10
* Debian 8, 9, 10, 11, 12
* RHEL and CentOS 6, 7, 8, 9
* Amazon Linux 1, 2

We strongly recommend that you use an operating system still supported by the vendor (still receiving security updates) as your key server will have access to your private keys.

---

## 1\. Install `cloudflared` on key server

First, install `cloudflared` on your key server.

This process differs depending on whether you are using the [command line](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/do-more-with-tunnels/local-management/create-local-tunnel/) or the [Cloudflare dashboard](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/get-started/create-remote-tunnel/).

  
## 2\. Create a Tunnel

Then, create a Cloudflare Tunnel.

This process differs depending on whether you are using the [command line](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/do-more-with-tunnels/local-management/create-local-tunnel/) or the [Cloudflare dashboard](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/get-started/create-remote-tunnel/).

  
In these steps, you should choose the option to **Connect a network** and use the private IP address of your key server.

After you create the Tunnel, use the Cloudflare API to [List tunnel routes](https://developers.cloudflare.com/api/resources/zero%5Ftrust/subresources/networks/subresources/routes/methods/list/), saving the following values for a future step:

* `"virtual_network_id"`
* `"network"`

## 3\. Upload Keyless SSL Certificates

Before your key servers can be configured, you must next upload the corresponding SSL certificates to Cloudflare’s edge. During TLS termination, Cloudflare will present these certificates to connecting browsers and then (for non-resumed sessions) communicate with the specified key server to complete the handshake.

Upload certificates to Cloudflare with only SANs that you wish to use with Cloudflare Keyless SSL. All Keyless SSL hostnames must be [proxied](https://developers.cloudflare.com/dns/proxy-status/).

You will have to upload each certificate used with Keyless SSL.

To upload a Keyless certificate with the API, send a [POST](https://developers.cloudflare.com/api/resources/keyless%5Fcertificates/methods/create/) request that includes a `"tunnel"` object.

```

"tunnel": {

  "vnet_id": "<VIRTUAL_NETWORK_ID>",

  "private_ip": "<NETWORK>"

}


```

Note

When you receive the `network` value from the Tunnel route API, it will include a subnet mask, such as `10.0.0.1/32`. Remove the subnet mask and use the IP address (`10.0.0.1`).

## 4\. Set up and activate key server

Finally, you need to install the key server on your infrastructure, populate it with the SSL keys of the certificates you wish to use to terminate TLS at Cloudflare’s edge, and activate the key server so it can be mutually authenticated.

Note

If you plan to run Keyless SSL in a [high availability setup](https://developers.cloudflare.com/ssl/keyless-ssl/reference/high-availability/), you may need to set up additional infrastructure (load balancing and health checks).

### Install

These steps are also at the [Cloudflare package repository ↗](https://pkg.cloudflare.com/).

#### Debian/Ubuntu packages

Debian or Ubuntu

```

sudo mkdir -p --mode=0755 /usr/share/keyrings

curl -fsSL https://pkg.cloudflare.com/cloudflare-main.gpg | sudo tee /usr/share/keyrings/cloudflare-main.gpg >/dev/null


# Add this repo to your apt repositories

echo 'deb [signed-by=/usr/share/keyrings/cloudflare-main.gpg] https://pkg.cloudflare.com/gokeyless buster main' | sudo tee /etc/apt/sources.list.d/cloudflare.list


# install gokeyless

sudo apt-get update && sudo apt-get install gokeyless


```

#### RHEL/CentOS packages

Use either of the following examples to install the `gokeyless` package for RHEL or CentOS.

**Option 1**

RHEL or CentOS (version lower than 8)

```

sudo yum makecache

sudo yum-config-manager --add-repo https://pkg.cloudflare.com/gokeyless.repo && sudo yum-config-manager --setopt=gokeyless-stable.gpgkey=https://pkg.cloudflare.com/cloudflare-ascii-pubkey.gpg --save

sudo yum install gokeyless


```

**Option 2**

RHEL or CentOS (version 8 or higher)

```

sudo dnf install dnf-plugins-core && dnf clean all

sudo dnf config-manager --add-repo https://pkg.cloudflare.com/gokeyless.repo

sudo dnf install gokeyless


```

Note

Amazon Linux customers may need to update their final installation command to be something similar to `sudo yum install rsyslog shadow-utils && sudo yum install gokeyless`.

### Configure

Add your Cloudflare account details to the configuration file located at `/etc/keyless/gokeyless.yaml`:

1. Set the hostname of the key server, for example, `keyserver.keyless.example.com`. This is also the value you entered when you uploaded your keyless certificate and is the hostname of your key server that holds the key for this certificate.
2. Set the Zone ID (found on **Overview** tab of the Cloudflare dashboard).
3. [Set the Origin CA API key](https://developers.cloudflare.com/fundamentals/api/get-started/ca-keys).

### Populate keys

Install your private keys in `/etc/keyless/keys/` and set the user and group to keyless with 400 permissions. Keys must be in PEM or DER format and have an extension of `.key`:

Terminal window

```

ls -l /etc/keyless/keys


```

```

-r-------- 1 keyless keyless 1675 Nov 18 16:44 example.com.key


```

When running multiple key servers, make sure all required keys are distributed to each key server. Customers typically will either use a configuration management tool such as Salt or Puppet to distribute keys or mount `/etc/keyless/keys` to a network location accessible only by your key servers. Keys are read on boot into memory, so a network path must be accessible during the gokeyless process start/restart.

### Activate

To activate, restart your keyless instance:

* systemd: `sudo service gokeyless restart`
* upstart/sysvinit: `sudo /etc/init.d/gokeyless restart`

If this command fails, try troubleshooting by [checking the logs](https://developers.cloudflare.com/ssl/keyless-ssl/troubleshooting/).

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ssl/","name":"SSL/TLS"}},{"@type":"ListItem","position":3,"item":{"@id":"/ssl/keyless-ssl/","name":"Keyless SSL"}},{"@type":"ListItem","position":4,"item":{"@id":"/ssl/keyless-ssl/configuration/","name":"Get started"}},{"@type":"ListItem","position":5,"item":{"@id":"/ssl/keyless-ssl/configuration/cloudflare-tunnel/","name":"Cloudflare Tunnel"}}]}
```
