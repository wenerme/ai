---
title: Entrust nShield Connect
description: Learn how to use Keyless SSL with Entrust nShield Connect.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/ssl/keyless-ssl/hardware-security-modules/entrust-nshield-connect.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Entrust nShield Connect

Note

This example assumes you have already configured the nShield Connect device and generated or imported your private keys.

Since the keys are already in place, we merely need to build the configuration file that the key server will read on startup. In this example the device contains a single RSA key pair.

We ask `pkcs11-tool` (provided by the `opensc` package) to display the objects stored in the token:

```

pkcs11-tool --module /opt/nfast/toolkits/pkcs11/libcknfast.so -O


```

```

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

Explain Code

The key piece of information is the label of the object, `rsa-privkey`. Open up `/etc/keyless/gokeyless.yaml` and immediately after

YAML

```

private_key_stores:

  - dir: /etc/keyless/keys


```

add

YAML

```

- uri: pkcs11:token=accelerator;object=rsa-privkey?module-path=/opt/nfast/toolkits/pkcs11/libcknfast.so&max-sessions=4


```

Save the config file, restart `gokeyless`, and verify it started successfully.

Terminal window

```

sudo systemctl restart gokeyless.service

sudo systemctl status gokeyless.service -l


```

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ssl/","name":"SSL/TLS"}},{"@type":"ListItem","position":3,"item":{"@id":"/ssl/keyless-ssl/","name":"Keyless SSL"}},{"@type":"ListItem","position":4,"item":{"@id":"/ssl/keyless-ssl/hardware-security-modules/","name":"Hardware security modules"}},{"@type":"ListItem","position":5,"item":{"@id":"/ssl/keyless-ssl/hardware-security-modules/entrust-nshield-connect/","name":"Entrust nShield Connect"}}]}
```
