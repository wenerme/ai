---
title: Changelog
description: Review recent changes to Cloudflare One Multi-Cloud Networking (formerly Magic Cloud Networking) (beta).
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/multi-cloud-networking/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Changelog

[ Subscribe to RSS ](https://developers.cloudflare.com/changelog/rss/multi-cloud-networking.xml) 

## 2024-12-05

  
**Generate customized terraform files for building cloud network on-ramps**   

You can now generate customized terraform files for building cloud network on-ramps to [Magic WAN](https://developers.cloudflare.com/cloudflare-wan/).

[Magic Cloud](https://developers.cloudflare.com/multi-cloud-networking/) can scan and discover existing network resources and generate the required terraform files to automate cloud resource deployment using their existing infrastructure-as-code workflows for cloud automation.

You might want to do this to:

* Review the proposed configuration for an on-ramp before deploying it with Cloudflare.
* Deploy the on-ramp using your own infrastructure-as-code pipeline instead of deploying it with Cloudflare.

For more details, refer to [Set up with Terraform](https://developers.cloudflare.com/multi-cloud-networking/cloud-on-ramps/#set-up-with-terraform).

## 2024-11-21

**Import cloud resources for VMs and LBs**

Cloud network discovery now includes cloud native virtual machine (VM) and load-balancer (LB) resources.

## 2024-11-21

**Export resource catalog**

Customers can export their resource catalog including all discovered resource metadata to a downloadable JSON file, suitable for offline analysis.

## 2024-10-01

**Cost visibility for managed cloud configuration**

Customers can now see the cloud provider list price of discovered network resources and will be informed of total cost and delta cost when deploying managed configuration.

## 2024-08-14

**GCP on-ramps**

Magic Cloud Networking supports Google Cloud Platform.

## 2024-07-01

**Closed beta launch**

The Magic Cloud Networking closed beta release is available, with the managed cloud on-ramps feature.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/multi-cloud-networking/","name":"Multi-Cloud Networking"}},{"@type":"ListItem","position":3,"item":{"@id":"/multi-cloud-networking/changelog/","name":"Changelog"}}]}
```
