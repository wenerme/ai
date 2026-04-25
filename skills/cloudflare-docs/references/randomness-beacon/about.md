---
title: About drand
description: Learn about the drand randomness-as-a-service project.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

# About drand

The drand project aims to address the current lack of services providing distributed public randomness. Distributed to increase the resilience and trustworthiness, drand provides a standalone randomness-as-a-service network that is application agnostic. This is similar to how NTP networks serve timing information across the globe.

drand follows the [KISS principle ↗](https://en.wikipedia.org/wiki/KISS%5Fprinciple). It relies on well-researched cryptographic building blocks and open-source software design principles and libraries, such as protobuf and gRPC, to ensure high performance and interoperability. drand also attempts to use sane security defaults, such as having TLS enabled by default.

Beyond that, drand adds new features important for its practical deployment, such as being able to securely add and remove members of the network through [resharing ↗](https://ieeexplore.ieee.org/document/1183515) while keeping the same shared public key necessary for randomness verification.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/randomness-beacon/","name":"Randomness Beacon"}},{"@type":"ListItem","position":3,"item":{"@id":"/randomness-beacon/about/","name":"About drand"}}]}
```
