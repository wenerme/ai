---
description: Create and manage Logpush jobs using Python.
title: Manage Logpush with Python
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/logs/llms.txt
> Use this file to discover all available pages before exploring further.

# Manage Logpush with Python

Last updated Apr 23, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/logs/logpush/examples/example-logpush-python/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

You can manage your Cloudflare Logpush service using Python. In the script below you can find example requests to create a job, retrieve job details, update job settings, and delete a Logpush job.

Note

The examples below are for zone-scoped datasets. Account-scoped datasets should use `<ACCOUNT_ID>` instead of `<ZONE_ID>`.

```python
import json
import requests

url = "https://api.cloudflare.com/client/v4/"

x_auth_email = "<EMAIL>"
x_auth_key = "<API_KEY>"

zone_id = "<ZONE_ID>"
destination_conf = "s3://<BUCKET_NAME>/logs?region=us-west-1"

logpush_url = url + "/zones/%s/logpush" % zone_id

headers = {
  'X-Auth-Email': <EMAIL>,
  'X-Auth-Key': <API_KEY>,
  'Content-Type': 'application/json'
}

# Create job
r = requests.post(logpush_url + "/jobs", headers=headers, data=json.dumps({"destination_conf":destination_conf}))
print(r.status_code, r.text)
assert r.status_code == 201
assert r.json()["result"]["enabled"] == False

# Keep id of the new job
id = r.json()["result"]["id"]

# Get job
r = requests.get(logpush_url + "/jobs/%s" % id, headers=headers)
print(r.status_code, r.text)
assert r.status_code == 200

# Get all jobs for a zone
r = requests.get(logpush_url + "/jobs", headers=headers)
print(r.status_code, r.text)
assert r.status_code == 200
assert len(r.json()["result"]) > 0

# Update job
r = requests.put(logpush_url + "/jobs/%s" % id, headers=headers, data=json.dumps({"enabled":True}))
print(r.status_code, r.text)
assert r.status_code == 200
assert r.json()["result"]["enabled"] == True

# Delete job
r = requests.delete(logpush_url + "/jobs/%s" % id, headers=headers)
print(r.status_code, r.text)
assert r.status_code == 200
```

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/logs/logpush/examples/example-logpush-python/#page","headline":"Manage Logpush with Python · Cloudflare Logs docs","description":"Create and manage Logpush jobs using Python.","url":"https://developers.cloudflare.com/logs/logpush/examples/example-logpush-python/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
