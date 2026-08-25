---
description: Set up Sourcing Kit to create import jobs and start importing images from Amazon S3 into Cloudflare Images.
title: Enable Sourcing Kit
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/images/llms.txt
> Use this file to discover all available pages before exploring further.

# Enable Sourcing Kit

Last updated Apr 21, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/images/storage/upload-images/sourcing-kit/enable/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Enabling Sourcing Kit will set it up with the necessary information to start importing images from your Amazon S3 account.

## Create your first import job

1. In the Cloudflare dashboard, go to the **Hosted Images** page.
[Go to **Hosted images** ↗](https://dash.cloudflare.com/?to=/:account/images/hosted)
2. Select **Sourcing Kit**.
3. Select **Import images** to create an import job.
4. In **Source name** give your source an appropriate name.
5. In **Amazon S3 bucket information** enter the S3's bucket name where your images are stored.
6. In **Required credentials**, enter your Amazon S3 credentials. This is required to connect Cloudflare Images to your source and import your images. Refer to [Credentials](https://developers.cloudflare.com/images/storage/upload-images/sourcing-kit/credentials/) to learn more about how to set up credentials.
7. Select **Next**.
8. In **Basic rules** define the Amazon S3 path to import your images from, and the path you want to copy your images to in your Cloudflare Images account. This is optional, and you can leave these fields blank.
9. On the same page, in **Overwrite images**, you need to choose what happens when the files in your source change. The recommended action is to copy the new images and overwrite the old ones on your Cloudflare Images account. You can also choose to skip the import, and keep what you already have on your Cloudflare Images account.
10. Select **Next**.
11. Review and confirm the information regarding the import job you created. Select **Import images** to start importing images from your source.

Your import job is now created. You can review the job status on the Sourcing Kit main page. It will show you information such as how many objects it found, how many images were imported, and any errors that might have occurred.

Note

Sourcing Kit will warn you when you are about to reach the limit for your plan space quota. When you exhaust the space available in your plan, the importing jobs will be aborted. If you see this warning on Sourcing Kit’s main page, select **View plan** to change your plan’s limits.

## Define a new source

1. In the Cloudflare dashboard, go to the **Hosted Images** page.
[Go to **Hosted images** ↗](https://dash.cloudflare.com/?to=/:account/images/hosted)
2. Select **Sourcing Kit**.
3. Select **Import images** \> **Define a new source**.

Repeat steps 4-11 in [Create your first import job](#create-your-first-import-job) to finish setting up your new source.

## Define additional import jobs

You can have many import jobs from the same or different sources. If you select an existing source to create a new import job, you will not need to enter your credentials again.

1. In the Cloudflare dashboard, go to the **Hosted Images** page.
[Go to **Hosted images** ↗](https://dash.cloudflare.com/?to=/:account/images/hosted)
2. Select **Sourcing Kit**.
3. Select **Import images**.
4. Choose from one of the sources already configured.

Repeat steps 8-11 in [Create your first import job](#create-your-first-import-job) to finish setting up your new import job.

## Next steps

Refer to [Edit source details](https://developers.cloudflare.com/images/storage/upload-images/sourcing-kit/edit/) to learn more about editing details for import jobs you have already created, or to learn how to abort running import jobs.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/images/storage/upload-images/sourcing-kit/enable/#page","headline":"Enable Sourcing Kit · Cloudflare Images docs","description":"Set up Sourcing Kit to create import jobs and start importing images from Amazon S3 into Cloudflare Images.","url":"https://developers.cloudflare.com/images/storage/upload-images/sourcing-kit/enable/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
