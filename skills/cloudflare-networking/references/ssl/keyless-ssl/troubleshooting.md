---
description: Review how to troubleshoot issues when using Cloudflare Keyless SSL.
title: Troubleshooting
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/ssl/llms.txt
> Use this file to discover all available pages before exploring further.

# Troubleshooting

Last updated Aug 18, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/ssl/keyless-ssl/troubleshooting/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

## Check the logs

To check logs, use a command similar to the following.

* systemd: `sudo journalctl -f -u gokeyless`
* upstart/sysvinit: `sudo tail -f /var/log/gokeyless.log`

## Enable debug logging

To enable debug logging, use a command similar to the following.

```sh
cd /etc/keyless
sudo -u keyless gokeyless --loglevel 0
```

When running in a container, `gokeyless` is the container's main process (PID 1), so the host/systemd command above does not apply. Instead, set the log level when you start the container and read logs from the container runtime:

```sh
# Set verbosity via environment variable
docker run ... -e KEYLESS_LOGLEVEL=0 ghcr.io/cloudflare/gokeyless:latest

# Read logs
docker logs -f <CONTAINER>   # or: kubectl logs -f <POD>
```

## Browsers are seeing a TLS connection failure after trying to connect

1. Make sure your key server is accessible from outside your network (tcp/2407).
2. Provide a packet capture: `sudo tcpdump -nni <interface> -s 0 -w keyless-$(date +%s).pcap port 2407`

## Clients are connecting, but immediately aborting

If you run `gokeyless` with debug logging enabled, and you see logs like this:

```txt
[DEBUG] connection 162.158.57.220:37490: reading half closed by client
[DEBUG] connection 162.158.57.220:37490: server closing connection
[DEBUG] connection 162.158.57.220:37490 removed
[DEBUG] spawning new connection: 162.158.57.220:37862
[DEBUG] connection 162.158.57.220:37862: reading half closed by client
[DEBUG] connection 162.158.57.220:37862: server closing connection
[DEBUG] connection 162.158.57.220:37862 removed
```

These logs likely indicate that the key server is not using an appropriate server or .`PEM` file and the client is aborting the connection after the certificate exchange. The certificate must be signed by the keyless CA and the SANs must include the hostname of the keyless server. Here is a valid example for a keyless server located at `11aa40b4a5db06d4889e48e2f.example.com` (note the Subject Alternative Name and Authority Key Identifier):

```bash
openssl x509 -in server.pem -noout -text -certopt no_subject,no_header,no_version,no_serial,no_signame,no_validity,no_subject,no_issuer,no_pubkey,no_sigdump,no_aux | sed -e 's/^        //'
```

```bash
X509v3 extensions:
    X509v3 Key Usage: critical
        Digital Signature, Key Encipherment
    X509v3 Extended Key Usage:
        TLS Web Server Authentication
    X509v3 Basic Constraints: critical
        CA:FALSE
    X509v3 Subject Key Identifier:
        DD:24:97:F1:A9:F1:4C:73:D9:1B:44:EC:A1:C3:10:E9:F0:41:98:BB
    X509v3 Authority Key Identifier:
        keyid:29:CE:8F:F1:9D:4C:BA:DE:55:78:D7:A6:29:E9:C5:FD:1D:9D:21:48

    X509v3 Subject Alternative Name:
        DNS:11aa40b4a5db06d4889e48e2f.example.com
    X509v3 CRL Distribution Points:

        Full Name:
          URI:http://ca.cfdata.org/api/v1/crl/key_server
```

## The gokeyless binary cannot load the CA file

Ensure permissions are correct on all keys and certificates installed on the server.

## Keyless is affecting to unanticipated hosts

You will need to either provide a certificate for only those hosts or change the priority of the certificate in the **SSL/TLS** app of your Cloudflare dashboard.

## Key servers on Windows

Cloudflare currently only provide packages for the supported GNU/Linux distributions as per the [Cloudflare package repository ↗](https://pkg.cloudflare.com/).

However, the key server is open source so you may attempt to build and deploy a binary, but running on Windows is not a supported configuration so you may experience problems that Cloudflare will not be able to help with.

## Key server multi-domain support

A single key server can serve multiple domains. Add each certificate's private key to the `private_key_stores` block in `gokeyless.yaml`, or pass them with `--private-key-dirs` / `--private-key-files`. Refer to [Serve multiple private keys](https://developers.cloudflare.com/ssl/keyless-ssl/configuration/run-with-docker/#serve-multiple-private-keys) for details.

The `hostname` and `zone_id` fields are single string values used only during enrollment. You do not need to update them for additional domains.

## Additional questions

Contact your account team or [Cloudflare Support](https://developers.cloudflare.com/support/contacting-cloudflare-support/).

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ssl/keyless-ssl/troubleshooting/#page","headline":"Troubleshooting Keyless SSL · Cloudflare SSL/TLS docs","description":"Review how to troubleshoot issues when using Cloudflare Keyless SSL.","url":"https://developers.cloudflare.com/ssl/keyless-ssl/troubleshooting/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-08-18","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Debugging"]}
```
