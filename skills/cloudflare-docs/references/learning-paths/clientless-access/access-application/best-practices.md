---
title: Best practices
description: Learn best practices for building scalable Access applications and policies.
image: https://developers.cloudflare.com/cf-twitter-card.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/learning-paths/clientless-access/access-application/best-practices.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Best practices

Learn best practices for building scalable Access applications and policies.

## Create reusable policy components

If you have many policies that contain duplicate rules, we recommend [building a rule group](https://developers.cloudflare.com/cloudflare-one/access-controls/policies/groups/) and referencing it across multiple policies. For example, you could define a rule group for "corporate users", which has both device posture check requirements and specific emails, or just “developers”, which references a group in your identity provider.

## Define your domain structure

Access applications have an inherently flexible and powerful domain structure capability. Your domain structure should achieve your application security goals without being overly permissive or overly restrictive. Before designing applications for production, review the [Application paths documentation](https://developers.cloudflare.com/cloudflare-one/access-controls/policies/app-paths/) to understand how path definitions work and how to use wildcards.

### Multiple domains in an application

Many customers who have workflows designed around internal web applications, especially those that were built internally, often see challenges related to interdependencies on multiple internal services. Separately, there can be challenges related to SPAs (Single-Page Applications) that make deploying clientless access difficult. For example, an application may have iFrames or other embedded systems that rely on different internal and/or external addresses.

If your internal service operates in this way, we recommend specifying multiple top-level domains in a single Access application. Otherwise, if the goal of using multiple domains is to streamline or simplify policy creation, we recommend making one primary domain per application, and automating the rest of your deployment [using Terraform](https://developers.cloudflare.com/learning-paths/clientless-access/terraform/) or another Infrastructure as Code (IaC) service.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/learning-paths/","name":"Learning Paths"}},{"@type":"ListItem","position":3,"item":{"@id":"/learning-paths/clientless-access/access-application/","name":"Secure your applications"}},{"@type":"ListItem","position":4,"item":{"@id":"/learning-paths/clientless-access/access-application/best-practices/","name":"Best practices"}}]}
```
