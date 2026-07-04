Agent Runtime supports Private Service Connect interface (PSC interface) and DNS peering to enable private and secure egress traffic. This allows your agents to securely access resources in your VPC or on-premises networks.

This document explains the overview and setup details for using the PSC
interface with Agent Runtime.

## Overview

Your agent is deployed in a secure, Google-managed network without access to your Virtual Private Cloud (VPC) network. A PSC interface creates a private and secure bridge to your network, making it the recommended solution for interacting with privately hosted services across your VPC, on-premises, and multi-cloud environments.

When you configure a PSC interface, Agent Runtime provisions an interface in a Google-owned tenant project where your agent runs. This interface connects directly to a [network attachment](https://docs.cloud.google.com/vpc/docs/create-manage-network-attachments) in your project. All traffic between your agent and your VPC travels securely within Google's network, never traversing the public internet.

In addition to providing private access, PSC interface is required to enable internet access when using VPC Service Controls.

The agent's ability to access the public internet depends on your project's
security configuration, specifically whether you are using VPC Service Controls.

- **Without VPC Service Controls** : When you configure your agent with only a PSC interface, traffic from your agent is routed into your VPC. By default, your VPC doesn't provide an outbound path to the public internet for this traffic. To enable internet access for your agent, you must explicitly configure an egress path within your VPC. For example, you can set up a dedicated proxy VM in your VPC. For more information, see the [Agent Runtime PSC Interface Codelab](https://codelabs.developers.google.com/agent-engine-psc-interface-private).

- **With VPC Service Controls**: When your project is part of a VPC Service Controls perimeter, the agent's default
  internet access is blocked by the perimeter to prevent data exfiltration. To
  allow the agent to access the public internet in this scenario, you must
  explicitly configure a secure egress path that routes traffic through your VPC.
  The recommended way to achieve this is by setting up a proxy server inside your
  VPC perimeter and create a Cloud NAT gateway to allow the proxy VM to access
  the internet.

## Setup details for Private Service Connect interface

To enable private connectivity for your deployed agent using
Private Service Connect interface, you need to set up a
VPC network, subnetwork, and network attachment in your user
project.

### Subnetwork IP range requirements

Agent Runtime requires a minimum /28 subnetwork for every Agent Engine user project.

The subnet of the network attachment supports RFC 1918 and non RFC 1918
addresses with the exception of subnets `100.64.0.0/20` and `240.0.0.0/4`.
Agent Runtime can only connect to RFC 1918 IP address ranges that are routable
from the specified network. Agent Runtime can't reach a privately used public IP
address or the following non-RFC 1918 ranges:

- `100.64.0.0/20`
- `192.0.0.0/24`
- `192.0.2.0/24`
- `198.18.0.0/15`
- `198.51.100.0/24`
- `203.0.113.0/24`
- `240.0.0.0/4`

See
[Set up a Private Service Connect interface](https://docs.cloud.google.com/gemini-enterprise-agent-platform/machine-learning/general/vpc-psc-i-setup)
for more information.

### Using Private Service Connect interface with Shared VPC

You can use the Private Service Connect interface with a
[Shared VPC](https://docs.cloud.google.com/vpc/docs/shared-vpc) architecture, which lets you create your Agent Runtime in a
service project while using a network from a central host project.

For the service project to use the host project's network, the Agent Platform Service
Agent from your service project needs the Compute Network User (`roles/compute.networkUser`)
role on the host project.

Complete the following steps:

1. [Create the subnet](https://docs.cloud.google.com/vpc/docs/create-modify-vpc-networks#add-subnets) in the host project.

2. [Create the network attachment](https://docs.cloud.google.com/gemini-enterprise-agent-platform/machine-learning/general/vpc-psc-i-setup#create-network-attachment) in either the service project or the host project. The network attachment can be created in any project connected to the shared VPC, but we recommend placing the network attachment in the service project to simplify permissions:

   - **Network attachment in service project (Recommended)** : Grant the Compute Network Admin (`roles/compute.networkAdmin`) role to the Agent Platform Service Agent of the service project. This role is required so the service agent can update the network attachment to accept traffic from Google's internal project. If you don't want to use the Compute Network Admin role, you can instead create a [custom role](https://docs.cloud.google.com/iam/docs/creating-custom-roles) with the following permissions and grant that role to the Agent Platform Service Agent of the service project:

     - `compute.networkAttachments.get`
     - `compute.networkAttachments.update`
     - `compute.regionOperations.get`

   - **Network attachment in host project**: Complete the following steps:

     1. Enable the Agent Platform API in the host project. See [Set up a Private Service Connect interface](https://docs.cloud.google.com/gemini-enterprise-agent-platform/machine-learning/general/vpc-psc-i-setup#before-you-begin) for more information.

     2. If the Agent Platform Service Agent doesn't exist in the host project, create it using the following command:

            gcloud beta services identity create --service=aiplatform.googleapis.com --project=PROJECT_ID

        where <var translate="no">PROJECT_ID</var> is your project ID.
     3. Grant the Compute Network Admin (`roles/compute.networkAdmin`) role to the host project's Agent Platform Service Agent. See [Set up a Private Service Connect interface](https://docs.cloud.google.com/gemini-enterprise-agent-platform/machine-learning/general/vpc-psc-i-setup#before-you-begin) for more information. If you don't want to use the Compute Network Admin role, you can instead create a [custom role](https://docs.cloud.google.com/iam/docs/creating-custom-roles) with the following permissions and grant that role to the Agent Platform Service Agent of the host project:

        - `compute.networkAttachments.get`
        - `compute.networkAttachments.update`
        - `compute.regionOperations.get`

### DNS peering

While Private Service Connect interface provides the secure network
path, DNS peering provides the service discovery mechanism. With PSC interface, you
need to know the specific IP address of the service in the
VPC network. And while you can connect to services using their
internal IP addresses, this is not recommended for production systems where IPs
can change. With DNS peering, the deployed agent can connect to services in the
your VPC network using stable, human-readable DNS names instead
of IP addresses. DNS peering enables the deployed agents to resolve DNS names
using the records from a Cloud DNS private zone in your VPC. See
[Set up a private DNS peering](https://docs.cloud.google.com/gemini-enterprise-agent-platform/machine-learning/general/vpc-psc-i-setup#set-up-private-dns-peering) for more information.

## Limitations

Private Service Connect interface with Agent Runtime is
subject to the following limitations:

- You can't change an existing Private Service Connect interface for a Runtime agent without recreating the resources.

## What's next

Guide

### [Deploy agents](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/runtime/deploy-an-agent)

Learn the five ways to deploy an agent on Agent Platform Runtime based on your development needs.
