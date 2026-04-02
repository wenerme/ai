---
title: Letter of Agency
description: A Letter of Agency (LOA) - sometimes referred to as a Letter of Authorization - is a document that authorizes Cloudflare to announce prefixes on behalf of another entity. The LOA is required by Cloudflare's transit providers so they can accept the routes Cloudflare advertises on behalf of another entity.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/byoip/concepts/loa.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Letter of Agency

A Letter of Agency (LOA) - sometimes referred to as a Letter of Authorization - is a document that authorizes Cloudflare to announce prefixes on behalf of another entity. The LOA is required by Cloudflare's transit providers so they can accept the routes Cloudflare advertises on behalf of another entity.

The letter must contain both the prefixes you are authorizing Cloudflare to announce and which ASN they will be announced under. Cloudflare can announce a prefix under your ASN or you can use Cloudflare's ASN, which is AS13335.

## Requirements

* For all future onboardings, if using the Cloudflare ASN, you must use AS13335\. Current customers who are already using Cloudflare's AS209242 do not need to make any changes and can continue using that ASN.
* Cloudflare accepts digital signatures on an LOA, as long as it is clear who is signing the LOA.
* An LOA is a formal document which should be on company letterhead and contain a wet signature. The Letter of Agency must be a PDF. Transit providers may reject the LOA if it is in a JPG or PNG format.

## Auto-generated LOA

If you are onboarding your own IPs via the [self-serve flow](https://developers.cloudflare.com/byoip/get-started/), you can set `delegate_loa_creation` (in the [Add Prefix API call](https://developers.cloudflare.com/api/resources/addressing/subresources/prefixes/methods/create/)) to `true` . This will allow Cloudflare to automatically generate the LOA, speeding up the process.

Auto-generated LOAs rely on [RPKI-signed ROAs](https://developers.cloudflare.com/byoip/concepts/route-filtering-rpki/) and [ownership validation](https://developers.cloudflare.com/byoip/get-started/#validate-prefix-ownership) checks.

## Template

If you need to create an LOA document, you can use the template below.

Letter of Agency template

```

[COMPANY LETTERHEAD]


LETTER OF AGENCY ("LOA")


[DATE]


To whom it may concern:


[COMPANY NAME] (the "Company") authorizes Cloudflare, Inc. with AS13335 to advertise the following IP address blocks / originating ASNs:


- - - - - - - - - - - - - - - - - - -

[Subnet & Originating ASN]

[Subnet & Originating ASN]

[Subnet & Originating ASN]

- - - - - - - - - - - - - - - - - - -


As a representative of the Company that is the owner of the aforementioned IP address blocks / originating ASNs, I hereby declare that I am authorized to sign this LOA on the Company’s behalf.


Should you have any questions please email me at [E-MAIL ADDRESS], or call: [TELEPHONE NUMBER]


Regards,


[SIGNATURE]


[NAME TYPED]

[TITLE]

[COMPANY NAME]

[COMPANY ADDRESS]

[COMPANY STAMP]


```

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/byoip/","name":"BYOIP"}},{"@type":"ListItem","position":3,"item":{"@id":"/byoip/concepts/","name":"Concepts"}},{"@type":"ListItem","position":4,"item":{"@id":"/byoip/concepts/loa/","name":"Letter of Agency"}}]}
```
