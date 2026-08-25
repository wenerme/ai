---
description: Understand how environments and versions work together.
title: About
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/version-management/llms.txt
> Use this file to discover all available pages before exploring further.

# About

Last updated Apr 23, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/version-management/about/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Version Management works through a combination of **environments** and **versions**.

stateDiagram-v2
    V2: Version 2
    V22: Version 2 <br/>(applied manually)
    V23: Version 2 <br/>(promoted from Development)
    V24: Version 2 <br/>(promoted from Staging)
    Revert: Production (rollback)
    V1: Version 1 <br/>(rolled back due to issues)
    V2 --> Development
    Development --> Staging
    Staging --> Production
    Production --> Revert
    state Development {
        V22
    }
    note right of Development
            At each level, test then promote the version.
        end note
    state Staging {
        V23
    }
    state Production {
        V24
    }
    state Revert {
        V1
    }
    note right of Revert
            Once promoted into an environment, a version can be rolled back.
        end note

## Environments

An environment is a place to test different versions of your zone configurations.


After you [enable](https://developers.cloudflare.com/version-management/how-to/enable/) version management, you will have the ability to create default environments:

* **Development**: Meant to validate that changes work correctly. The default [traffic filters](https://developers.cloudflare.com/version-management/reference/traffic-filters/) are that the `cf.zone.name` matches your zone name, the `Edge Server IP` is a specific value, and the request contains a cookie with `development=true`.
* **Staging**: Meant to test changes before sending them to **Production**. The default [traffic filters](https://developers.cloudflare.com/version-management/reference/traffic-filters/) are that the `cf.zone.name` matches your zone name and the `Edge Server IP` is a specific value.
* **Production**: Meant to hold all configurations applied to your zone. You cannot edit the [traffic filters](https://developers.cloudflare.com/version-management/reference/traffic-filters/) \- which are just that the `cf.zone.name` is equal to your zone's name - and cannot delete this environment. This environment has a read-only check enabled, so versions promoted to this environment will become read-only as well.

When you [create](https://developers.cloudflare.com/version-management/how-to/versions/#create-version) a new version, that version will be available to apply to your **Development** environment (or whatever environment has the lowest rank). Once you test a version in your **Development** environment, you would promote that version to the **Staging** environment and - with no issues - then promote it to **Production**.

To send traffic to specific environments, send requests to that environment that match the pattern specified in its [traffic filters](https://developers.cloudflare.com/version-management/reference/traffic-filters/).

## Versions

A version is a collection of configurations related to your zone, such as WAF custom rules and [other optimization configurations](https://developers.cloudflare.com/version-management/reference/available-configurations/).


Once you [enable](https://developers.cloudflare.com/version-management/how-to/enable/) Version Management, Cloudflare will automatically create:

* **Version Zero**, think about this as the configuration of your current zone. Once default environments are created, Version Zero is automatically deployed to them, guaranteeing no disruption in your live traffic. This Version is also permanently editable. In case you decide to disable Zone Versioning, Version Zero will become your zone again.
* **Global Configuration**, you can find all the configurations here that are not supported by Version Management.

Important

Any changes made to the **Global Configuration** will immediately apply to your zone and all versions of your zone, affecting live traffic.

On the Environments page, you can create default environments for **Production**, **Staging**, and **Development**.

When your version is ready, you would then test and promote it through various environments until it reaches **Production** (or whatever your final environment is).

You can create a new version at any time by choosing to [**Clone**](https://developers.cloudflare.com/version-management/how-to/versions/#create-version) an existing version, which automatically copies over configurations from an existing version.

Version configurations are applied to zone traffic when you [promote a version](https://developers.cloudflare.com/version-management/how-to/environments/#promote-a-version) to a new environment and then send traffic to that environment that matches the pattern specified in its [traffic filters](https://developers.cloudflare.com/version-management/reference/traffic-filters/).

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/version-management/about/#page","headline":"About · Cloudflare Version Management docs","description":"Understand how environments and versions work together.","url":"https://developers.cloudflare.com/version-management/about/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
