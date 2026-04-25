---
title: About
description: Understand how environments and versions work together.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

# About

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

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/version-management/","name":"Version Management"}},{"@type":"ListItem","position":3,"item":{"@id":"/version-management/about/","name":"About"}}]}
```
