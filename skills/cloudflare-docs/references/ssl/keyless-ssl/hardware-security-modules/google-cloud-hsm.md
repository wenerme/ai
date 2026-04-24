---
title: Google Cloud HSM
description: Learn how to use Keyless SSL with Google Cloud HSM.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

### Tags

[ GCP ](https://developers.cloudflare.com/search/?tags=GCP) 

### Agents toolkit

* Agent setup
* Copy as Markdown

Open the Markdown file in a new tab

Ask Claude about this page

Ask ChatGPT about this page

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/ssl/keyless-ssl/hardware-security-modules/google-cloud-hsm.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

# Google Cloud HSM

This tutorial uses [Google Cloud HSM ↗](https://cloud.google.com/kms/docs/hsm) — a FIPS 140-2 Level 3 certified implementation.

---

## Before you start

Make sure that you have:

* Set up your [Google Cloud project ↗](https://cloud.google.com/kms/docs/quickstart#before-you-begin)

---

## 1\. Create a key ring

To set up the Google Cloud HSM, [create a key ring ↗](https://cloud.google.com/kms/docs/hsm#kms-create-key-hsm-web) and indicate its location.

Note:

Only [certain locations ↗](https://cloud.google.com/kms/docs/locations#hsm-regions) support Google Cloud HSM.

---

## 2\. Create a key

Create a key, including the following information:

| Field            | Value                                  |
| ---------------- | -------------------------------------- |
| Key ring         | The key ring you created in **Step 2** |
| Protection level | HSM                                    |
| Purpose          | Asymmetric Encrypt                     |

---

## 3\. Import the private key

After creating a key ring and key, [import the private key ↗](https://cloud.google.com/kms/docs/importing-a-key).

Note:

You need to [convert your key ↗](https://cloud.google.com/kms/docs/formatting-keys-for-import#formatting%5Fasymmetric%5Fkeys) from a PEM to DER format.

---

## 4\. Modify your gokeyless config file and restart the service

Once you’ve imported the key, copy the **Resource name** from the UI. Then, add this value to the `gokeyless` YAML file under `private_key_stores`.

With the config file saved, restart `gokeyless` and verify it started successfully.

Terminal window

```

sudo systemctl restart gokeyless.service

sudo systemctl status gokeyless.service -l


```

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ssl/","name":"SSL/TLS"}},{"@type":"ListItem","position":3,"item":{"@id":"/ssl/keyless-ssl/","name":"Keyless SSL"}},{"@type":"ListItem","position":4,"item":{"@id":"/ssl/keyless-ssl/hardware-security-modules/","name":"Hardware security modules"}},{"@type":"ListItem","position":5,"item":{"@id":"/ssl/keyless-ssl/hardware-security-modules/google-cloud-hsm/","name":"Google Cloud HSM"}}]}
```
