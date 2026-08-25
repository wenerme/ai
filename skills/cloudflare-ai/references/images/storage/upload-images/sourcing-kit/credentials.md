---
description: Configure AWS IAM credentials to grant Cloudflare Images Sourcing Kit read access to your Amazon S3 bucket.
title: Credentials
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/images/llms.txt
> Use this file to discover all available pages before exploring further.

# Credentials

Last updated Apr 21, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/images/storage/upload-images/sourcing-kit/credentials/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

To migrate images from Amazon S3, Sourcing Kit requires access permissions to your bucket. While you can use any AWS Identity and Access Management (IAM) user credentials with the correct permissions to create a Sourcing Kit source, Cloudflare recommends that you create a user with a narrow set of permissions.

To create the correct Sourcing Kit permissions:

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

You can now use both the Access Key ID and Secret Access Key to create a new source in Sourcing Kit. Refer to [Enable Sourcing Kit](https://developers.cloudflare.com/images/storage/upload-images/sourcing-kit/enable/) to learn more.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/images/storage/upload-images/sourcing-kit/credentials/#page","headline":"Credentials · Cloudflare Images docs","description":"Configure AWS IAM credentials to grant Cloudflare Images Sourcing Kit read access to your Amazon S3 bucket.","url":"https://developers.cloudflare.com/images/storage/upload-images/sourcing-kit/credentials/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
