To reduce network latency for vector matching
online queries, call the Agent Platform service endpoints from your
Virtual Private Cloud (VPC) by using
[private services access](https://docs.cloud.google.com/vpc/docs/private-services-access). For
each Google Cloud project, only one VPC network can be peered
with Vector Search. If you already have a
VPC with private services access configured, you can use that
VPC to peer with Vector Search.

VPC Network Peering connection configuration is an initial task required
only one time per Google Cloud project. After this setup is
done, you can make calls to the Vector Search index
from any client running inside your VPC.

The VPC Network Peering connection is required only for vector matching
online queries. API calls to create, deploy, and delete indexes don't require
a VPC Network Peering connection.

A designated Google Cloud project administrator or network administrator
can complete the following steps to create a VPC Network Peering connection.

1. To set up your Google Cloud projects, enable billing, and enable APIs,
   complete the following [Before you
   begin](https://docs.cloud.google.com/gemini-enterprise-agent-platform/machine-learning/general/vpc-peering#before_you_begin)
   steps.

2. To avoid IP address collisions between your VPC network and
   our service producer's network, you must allocate an IP address range for
   the Vector Search service in which the
   Vector Search indexes are deployed. For more information, see
   [Allocating IP address
   ranges](https://docs.cloud.google.com/vpc/docs/configure-private-services-access#allocating-range).

   ```sh
   # Note: `prefix-length=16` means a CIDR block with mask /16 is reserved for
   # use by Google services. Make sure to enable the Service Networking API.
   gcloud compute addresses create $PEERING_RANGE_NAME \
       --global \
       --prefix-length=16 \
       --description="peering range for Vector Search" \
       --network=$NETWORK_NAME \
       --purpose=VPC_PEERING \
       --project=$PROJECT_ID
   ```

   ```sh
   # Create the VPC connection.
   gcloud services vpc-peerings connect \
       --service=servicenetworking.googleapis.com \
       --network=$NETWORK_NAME \
       --ranges=$PEERING_RANGE_NAME \
       --project=$PROJECT_ID
   ```

After you create a private connection, you can make online calls to a
Vector Search index from any virtual machine (VM)
instance running within the peered VPC.

## Access control with IAM

Agent Platform uses Identity and Access Management (IAM) to manage
access to resources. To grant access to a resource, assign one or more roles to
a user, group, or service account.

To use Vector Search, use [these predefined
roles](https://docs.cloud.google.com/gemini-enterprise-agent-platform/machine-learning/general/access-control#predefined-roles)
to grant varying levels of access to resources at the project level.
