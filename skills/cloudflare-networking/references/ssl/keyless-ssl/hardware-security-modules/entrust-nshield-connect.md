---
description: Learn how to use Keyless SSL with Entrust nShield Connect.
title: Entrust nShield Connect
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/ssl/llms.txt
> Use this file to discover all available pages before exploring further.

# Entrust nShield Connect

Last updated May 5, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/ssl/keyless-ssl/hardware-security-modules/entrust-nshield-connect/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Note

This example assumes you have already configured the nShield Connect device and generated or imported your private keys.

Since the keys are already in place, we merely need to build the configuration file that the key server will read on startup. In this example the device contains a single RSA key pair.

We ask `pkcs11-tool` (provided by the `opensc` package) to display the objects stored in the token:

```txt
pkcs11-tool --module /opt/nfast/toolkits/pkcs11/libcknfast.so -O
```

```txt
Using slot 0 with a present token (0x1d622495)
Private Key Object; RSA
  label:      rsa-privkey
  ID:         105013281578de42ea45f5bfac46d302fb006687
  Usage:      decrypt, sign, unwrap
warning: PKCS11 function C_GetAttributeValue(ALWAYS_AUTHENTICATE) failed: rv = CKR_ATTRIBUTE_TYPE_INVALID (0x12)

Public Key Object; RSA 2048 bits
  label:      rsa-privkey
  ID:         105013281578de42ea45f5bfac46d302fb006687
  Usage:      encrypt, verify, wrap
```

The key piece of information is the label of the object, `rsa-privkey`. Open up `/etc/keyless/gokeyless.yaml` and immediately after

```yaml
private_key_stores:
  - dir: /etc/keyless/keys
```

add

```yaml
- uri: pkcs11:token=accelerator;object=rsa-privkey?module-path=/opt/nfast/toolkits/pkcs11/libcknfast.so&max-sessions=4
```

Save the config file, restart `gokeyless`, and verify it started successfully.

```sh
sudo systemctl restart gokeyless.service
sudo systemctl status gokeyless.service -l
```

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ssl/keyless-ssl/hardware-security-modules/entrust-nshield-connect/#page","headline":"Entrust nShield Connect · Cloudflare SSL/TLS docs","description":"Learn how to use Keyless SSL with Entrust nShield Connect.","url":"https://developers.cloudflare.com/ssl/keyless-ssl/hardware-security-modules/entrust-nshield-connect/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-05-05","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
