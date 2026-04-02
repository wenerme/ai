---
title: Create multitenancy
description: AI Search supports multitenancy by letting you segment content by tenant, so each user, customer, or workspace can only access their own data. This is typically done by organizing documents into per-tenant folders and applying metadata filters at query time.
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/ai-search/how-to/multitenancy.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Create multitenancy

AI Search supports multitenancy by letting you segment content by tenant, so each user, customer, or workspace can only access their own data. This is typically done by organizing documents into per-tenant folders and applying [metadata filters](https://developers.cloudflare.com/ai-search/configuration/metadata/) at query time.

## 1\. Organize content by tenant

When uploading files to R2, structure your content by tenant using unique folder paths.

Example folder structure:

* Directorycustomer-a  
   * Directorylogs/  
         * …  
   * Directorycontracts/  
         * …
* Directorycustomer-b  
   * Directorycontracts/  
         * …

When indexing, AI Search will automatically store the folder path as metadata under the `folder` attribute. It is recommended to enforce folder separation during upload or indexing to prevent accidental data access across tenants.

## 2\. Search using folder filters

To ensure a tenant only retrieves their own documents, apply a `folder` filter when performing a search.

Terminal window

```

curl https://api.cloudflare.com/client/v4/accounts/{ACCOUNT_ID}/ai-search/instances/{NAME}/search \

  -H "Content-Type: application/json" \

  -H "Authorization: Bearer {API_TOKEN}" \

  -d '{

    "messages": [

      {

        "content": "When did I sign my agreement contract?",

        "role": "user"

      }

    ],

    "ai_search_options": {

      "retrieval": {

        "filters": {

          "folder": { "$gte": "customer-a/", "$lt": "customer-a0" }

        }

      }

    }

  }'


```

## Tip: Use "starts with" filter

While an equality filter targets files at a specific folder, you often want to retrieve all documents belonging to a tenant, including files in subfolders. For example, all files in `customer-a/` with a structure like:

* Directorycustomer-a  
   * profile.md  
   * Directorycontracts  
         * Directoryproperty  
                  * contract-1.pdf

To achieve this ["starts with"](https://developers.cloudflare.com/ai-search/configuration/metadata/#starts-with-filter-for-folders) behavior, use a range filter:

```

{

  "ai_search_options": {

    "retrieval": {

      "filters": {

        "folder": { "$gte": "customer-a/", "$lt": "customer-a0" }

      }

    }

  }

}


```

This range filter matches all paths starting with `customer-a/` because `0` comes after `/` in ASCII order, capturing both `profile.md` and `contract-1.pdf`.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ai-search/","name":"AI Search"}},{"@type":"ListItem","position":3,"item":{"@id":"/ai-search/how-to/","name":"How to"}},{"@type":"ListItem","position":4,"item":{"@id":"/ai-search/how-to/multitenancy/","name":"Create multitenancy"}}]}
```
