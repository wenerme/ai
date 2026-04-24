---
title: Credentials
description: Configure AWS IAM credentials to grant Cloudflare Images Sourcing Kit read access to your Amazon S3 bucket.
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

### Agents toolkit

* Agent setup
* Copy as Markdown

Open the Markdown file in a new tab

Ask Claude about this page

Ask ChatGPT about this page

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/images/storage/upload-images/sourcing-kit/credentials.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

# Credentials

To migrate images from Amazon S3, Sourcing Kit requires access permissions to your bucket. While you can use any AWS Identity and Access Management (IAM) user credentials with the correct permissions to create a Sourcing Kit source, Cloudflare recommends that you create a user with a narrow set of permissions.

To create the correct Sourcing Kit permissions:

1. Log in to your AWS IAM account.
2. Create a policy with the following format (replace `<BUCKET_NAME>` with the bucket you want to grant access to):  
```  
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
Explain Code
3. Next, create a new user and attach the created policy to that user.

You can now use both the Access Key ID and Secret Access Key to create a new source in Sourcing Kit. Refer to [Enable Sourcing Kit](https://developers.cloudflare.com/images/storage/upload-images/sourcing-kit/enable/) to learn more.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/images/","name":"Cloudflare Images"}},{"@type":"ListItem","position":3,"item":{"@id":"/images/storage/","name":"Storage"}},{"@type":"ListItem","position":4,"item":{"@id":"/images/storage/upload-images/","name":"Upload images"}},{"@type":"ListItem","position":5,"item":{"@id":"/images/storage/upload-images/sourcing-kit/","name":"Upload via Sourcing Kit"}},{"@type":"ListItem","position":6,"item":{"@id":"/images/storage/upload-images/sourcing-kit/credentials/","name":"Credentials"}}]}
```
