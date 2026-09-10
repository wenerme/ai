---
description: Configure AWS IAM credentials for Amazon S3 read access.
title: Credentials
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/images/llms.txt
> Use this file to discover all available pages before exploring further.

# Credentials

Last updated Sep 10, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/images/storage/upload-images/import-from-s3/credentials/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

To import images, Cloudflare Images requires access to your Amazon S3 bucket. You can use credentials for any AWS Identity and Access Management (IAM) user with the correct permissions.

Cloudflare recommends creating a user with narrowly scoped permissions.

To create the required permissions:

1. Log in to your AWS IAM account.
2. Create a policy with the following format (replace `<BUCKET_NAME>` with the bucket you want to grant access to):
```json
{
	"Version": "2012-10-17",
	"Statement": [
		{
			"Effect": "Allow",
			"Action": ["s3:Get*", "s3:List*"],
			"Resource": [
				"arn:aws:s3:::<BUCKET_NAME>",
				"arn:aws:s3:::<BUCKET_NAME>/*"
			]
		}
	]
}
```
3. Next, create a new user and attach the created policy to that user.

You can now use both the Access Key ID and Secret Access Key to create a new source. Refer to [Import images from S3](https://developers.cloudflare.com/images/storage/upload-images/import-from-s3/enable/) for setup instructions.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/images/storage/upload-images/import-from-s3/credentials/#page","headline":"Credentials · Cloudflare Images docs","description":"Configure AWS IAM credentials for Amazon S3 read access.","url":"https://developers.cloudflare.com/images/storage/upload-images/import-from-s3/credentials/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-09-10","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
