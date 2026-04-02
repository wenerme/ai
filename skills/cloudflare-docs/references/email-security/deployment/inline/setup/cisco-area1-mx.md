---
title: Cisco - Email security (formerly Area 1) as MX Record
description: In this tutorial, you will learn how to configure Cisco IronPort with Email security as MX record. This tutorial is broken down into several steps.
image: https://developers.cloudflare.com/zt-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/email-security/deployment/inline/setup/cisco-area1-mx.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Cisco - Email security (formerly Area 1) as MX Record

**Last reviewed:**  over 3 years ago 

Area 1 has been renamed

Area 1 is now **Email Security (formerly Area 1)**.

![A schematic showing where Email security security is in the life cycle of an email received](https://developers.cloudflare.com/_astro/cisco-area1-mx.OaAYsQTw_ZuU008.webp) 

In this tutorial, you will learn how to configure Cisco IronPort with Email security as MX record. This tutorial is broken down into several steps.

## Prerequisites

To ensure changes made in this tutorial take effect quickly, update the Time to Live (TTL) value of the existing MX records on your domains to five minutes. Do this on all the domains you will be deploying.

Changing the TTL value instructs DNS servers on how long to cache this value before requesting an update from the responsible nameserver. You need to change the TTL value before changing your MX records to Cloudflare Email Security (formerly Area 1). This will ensure that changes take effect quickly and can also be reverted quickly if needed. If your DNS manager does not allow for a TTL of five minutes, set it to the lowest possible setting.

To check your existing TTL, open a terminal window and run the following command against your domain:

Terminal window

```

dig mx <YOUR_DOMAIN>


```

```

; <<>> DiG 9.10.6 <<>> mx <YOUR_DOMAIN>

;; global options: +cmd

;; Got answer:

;; ->>HEADER<<- opcode: QUERY, status: NOERROR, id: 39938

;; flags: qr rd ra; QUERY: 1, ANSWER: 5, AUTHORITY: 0, ADDITIONAL: 1


;; OPT PSEUDOSECTION:

; EDNS: version: 0, flags:; udp: 4096

;; QUESTION SECTION:

;domain.    IN  MX


;; ANSWER SECTION:

<YOUR_DOMAIN>.  300  IN  MX  5 mailstream-central.mxrecord.mx.

<YOUR_DOMAIN>.  300  IN  MX  10 mailstream-east.mxrecord.io.

<YOUR_DOMAIN>.  300  IN  MX  10 mailstream-west.mxrecord.io.


```

In the above example, TTL is shown in seconds as `300` (or five minutes).

If you are using Cloudflare for DNS, you can leave the [TTL setting as **Auto**](https://developers.cloudflare.com/dns/manage-dns-records/reference/ttl/).

Below is a list with instructions on how to edit MX records for some popular services:

* **Cloudflare**: [Set up email records](https://developers.cloudflare.com/dns/manage-dns-records/how-to/email-records/)
* **GoDaddy**: [Edit an MX Record ↗](https://www.godaddy.com/help/edit-an-mx-record-19235)
* **AWS**: [Creating records by using the Amazon Route 53 console ↗](https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/resource-record-sets-creating.html)
* **Azure**: [Create DNS records in a custom domain for a web app ↗](https://learn.microsoft.com/en-us/azure/dns/dns-web-sites-custom-domain)

## 1\. Add a Sender Group for Email security Email Protection IPs

To add a new Sender Group:

1. Go to **Mail Policies** \> **HAT Overview**.
2. Select **Add Sender Group**.
3. Configure the new Sender Group as follows:  
   * **Name**: `Area1`.  
   * **Order**: Order above the existing **WHITELIST** sender group.  
   * **Comment**: `Area 1 Email Protection egress IP Addresses`.  
   * **Policy**: `TRUSTED` (by default, spam detection is disabled for this mail flow policy).  
   * **SBRS**: Leave blank.  
   * **DNS Lists**: Leave blank.  
   * **Connecting Host DNS Verification**: Leave all options unchecked.
4. Select **Submit and Add Senders** and add the IP addresses mentioned in [Egress IPs](https://developers.cloudflare.com/email-security/deployment/inline/reference/egress-ips/).
![Sender group](https://developers.cloudflare.com/_astro/step1.DXTfpSGb_1msSgd.webp) 

## 2\. Configure Incoming Relays

You need to configure the Incoming Relays section to tell IronPort to ignore upstream hops, since all the connections are now coming from Email security. This step is needed so the IronPort can retrieve the original IPs to calculate IP reputation. IronPort also uses this information in the Anti-Spam (IPAS) scoring of messages.

1. To enable the Incoming Relays Feature, select **Network** \> **Incoming Relays**.
2. Select **Enable** and commit your changes.
3. Now, you will have to add an Incoming Relay. Select **Network** \> **Incoming Relays**.
4. Select **Add Relay** and give your relay a name.
5. Enter the IP address of the MTA, MX, or other machine that connects to the email gateway to relay incoming messages. You can use IPv4 or IPv6 addresses.
6. Specify the `Received:` header that will identify the IP address of the original external sender.
7. Commit your changes.

## 3\. Disable SPF checks

Make sure you disable Sender Policy Framework (SPF) checks in IronPort. Because Email security is acting as the MX record, if you do not disable SPF checks, IronPort will block emails due to an SPF failure.

Refer to [Cisco's documentation ↗](https://www.cisco.com/c/en/us/support/docs/security/email-security-appliance/117973-faq-esa-00.html) for more information on how to disable SPF checks.

## 4\. Update your domain MX records

Instructions to update your MX records will depend on the DNS provider you are using. In your domain DNS zone, you need to replace your current MX records with the Email security hosts. This will have to be done for every domain where Email security will be the primary MX. For example:

| MX Priority | Host                           |
| ----------- | ------------------------------ |
| 5           | mailstream-eu1.mxrecord.io     |
| 10          | mailstream-central.mxrecord.mx |
| 20          | mailstream-east.mxrecord.io    |
| 20          | mailstream-west.mxrecord.io    |

When configuring the Email Security (formerly Area 1) MX records, it is important to configure hosts with the correct MX priority. This will allow mail flows to the preferred hosts and fail over as needed.

Choose from the following Email Security MX hosts, and order them by priority. For example, if you are located outside the US and want to prioritize email processing in the EU, add `mailstream-eu1.mxrecord.io` as your first host, and then the US servers.

| Host                                                                                   | Location                | Note                                                                                                               |
| -------------------------------------------------------------------------------------- | ----------------------- | ------------------------------------------------------------------------------------------------------------------ |
| mailstream-central.mxrecord.mx mailstream-east.mxrecord.io mailstream-west.mxrecord.io | US                      | Best option to ensure all email traffic processing happens in the US.                                              |
| mailstream-eu1.mxrecord.io                                                             | EU                      | Best option to ensure all email traffic processing happens in Germany, with backup to US data centers.             |
| mailstream-bom.mxrecord.mx                                                             | India                   | Best option to ensure all email traffic processing happens within India.                                           |
| mailstream-india-primary.mxrecord.mx                                                   | India                   | Same as mailstream-bom.mxrecord.mx, with backup to US data centers.                                                |
| mailstream-asia.mxrecord.mx                                                            | India                   | Best option to ensure all email traffic processing happens in India, with Australia data centers as backup.        |
| mailstream-syd.area1.cloudflare.net                                                    | Australia / New Zealand | Best option to ensure all email traffic processing happens within Australia.                                       |
| mailstream-australia-primary.area1.cloudflare.net                                      | Australia / New Zealand | Best option to ensure all email traffic processing happens in Australia, with India and US data centers as backup. |

DNS changes will reach the major DNS servers in about an hour or follow the TTL value as described in the [Prerequisites section](#prerequisites).

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/email-security/","name":"Email security (formerly Area 1)"}},{"@type":"ListItem","position":3,"item":{"@id":"/email-security/deployment/","name":"Setup"}},{"@type":"ListItem","position":4,"item":{"@id":"/email-security/deployment/inline/","name":"Inline"}},{"@type":"ListItem","position":5,"item":{"@id":"/email-security/deployment/inline/setup/","name":"Setup"}},{"@type":"ListItem","position":6,"item":{"@id":"/email-security/deployment/inline/setup/cisco-area1-mx/","name":"Cisco - Email security (formerly Area 1) as MX Record"}}]}
```
