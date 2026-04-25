---
title: Origin Rules API parameter reference
description: Configurable parameters for origin rules.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

# Origin Rules API parameter reference

Create [different overrides](https://developers.cloudflare.com/rules/origin-rules/features/) by including different action parameters in the `action_parameters` field:

| Override type                                   | What to include                                                                |
| ----------------------------------------------- | ------------------------------------------------------------------------------ |
| Host header override                            | [host\_header parameter](#host-header-override-parameters)                     |
| SNI override                                    | [sni object](#sni-override-parameters)                                         |
| DNS record override / Destination port override | [origin object](#dns-record-override-and-destination-port-override-parameters) |

Note

The same origin rule can have different types of overrides. Refer to [Configuring several overrides in the same rule](#configuring-several-overrides-in-the-same-rule) for a syntax example.

## Host header override parameters

The full syntax of the `action_parameters` field for overriding the HTTP `Host` header is the following:

```

"action_parameters": {

  "host_header": "<HOST_HEADER_VALUE>"

}


```

## SNI override parameters

The full syntax of the `action_parameters` field for overriding the SNI value of incoming requests is the following:

```

"action_parameters": {

  "sni": {

    "value": "<SNI_VALUE>"

  }

}


```

## DNS record override and destination port override parameters

The full syntax of the `action_parameters` field for overriding both the hostname and the destination port of incoming requests is the following:

```

"action_parameters": {

  "origin": {

    "host": "<HOSTNAME>",

    "port": <PORT>

  }

}


```

If you are only overriding the hostname or the port, omit the `port` or `host` parameter, respectively.

## Configuring several overrides in the same rule

The same origin rule can have different types of overrides. For example, a single origin rule can perform an HTTP `Host` header override and a destination port override. The syntax of such a rule would be the following:

```

"action_parameters": {

  "host_header": "<HOST_HEADER_VALUE>",

  "origin": {

    "port": <PORT>

  }

}


```

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/rules/","name":"Rules"}},{"@type":"ListItem","position":3,"item":{"@id":"/rules/origin-rules/","name":"Origin Rules"}},{"@type":"ListItem","position":4,"item":{"@id":"/rules/origin-rules/parameters/","name":"Origin Rules API parameter reference"}}]}
```
