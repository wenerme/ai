# GitLab Dedicated network access and security

Configure network access and security settings for your GitLab Dedicated instance.

- Tier: Ultimate
- Offering: GitLab Dedicated

Use these settings to control how your GitLab Dedicated instance connects to the internet
and to your private infrastructure. You can configure custom domains, manage certificate
authorities for external services, set up private network connectivity with AWS PrivateLink,
restrict access with an IP allowlist, and view the outbound IPs your instance uses.

## Custom domains

You can configure a custom domain to access your GitLab Dedicated
instance instead of the default `your-tenant.gitlab-dedicated.com`.

When you add a custom domain:

- The domain is included in the external URL used to access your instance.
- Any connections to your instance using the default `tenant.gitlab-dedicated.com` domain
  are no longer available.

GitLab automatically manages SSL/TLS certificates for your custom domain using
[Let's Encrypt](https://letsencrypt.org/). Let's Encrypt uses the
[HTTP-01 challenge](https://letsencrypt.org/docs/challenge-types/#http-01-challenge)
to verify domain ownership, which requires:

- The CNAME record to be publicly resolvable through DNS.
- The same public validation process for automatic certificate renewal every 90 days.

For instances configured with private networking (such as AWS PrivateLink), public DNS
resolution ensures certificate management works properly, even when all other access is
restricted to private networks.

GitLab Dedicated supports custom domains through two configuration methods:

- Standard configuration: Uses CNAME records and Let's Encrypt certificates.
  You configure your own DNS records and request domain activation through support.
- Cloudflare security configuration: Uses NS records and Let's Encrypt certificates.
  GitLab provides DNS configuration details and you implement them in coordination with
  support.

Contact your Customer Success Manager to determine which configuration method applies to
your instance.

### View your custom domain details

The **Custom domains** section displays the active domain configuration for your GitLab
Dedicated instance, including:

- GitLab instance domain: The custom domain for your GitLab instance.
- Registry domain: The custom domain for the container registry.
- KAS domain: The custom domain for the GitLab agent server for Kubernetes (KAS).

Use this information to:

- Verify your current custom domain configuration.
- Reference domains for external integrations.
- Copy configuration details for DNS management.

To view your custom domain details:

1. Sign in to [Switchboard](https://console.gitlab-dedicated.com/).
1. In the left sidebar, select **Configuration**.
1. Expand **Custom domains**.

#### DNSSEC details

- Tier: Ultimate
- Offering: GitLab Dedicated for Government

If your custom domain is configured with Cloudflare Web Application Firewall (WAF),
Switchboard displays additional configuration details, including Cloudflare nameservers
and DNSSEC parameters for FedRAMP compliance.

The additional details include:

- Cloudflare nameservers: DNS nameservers for Cloudflare-managed domains.
- Key tag: Numeric identifier for the DNSSEC key.
- Algorithm: Cryptographic algorithm used (typically 13 for ECDSA P-256 with SHA-256).
- Digest type: Hash algorithm used (typically 2 for SHA-256).
- Digest: Cryptographic hash of the public key.

Use these values to configure DNS delegation and DNSSEC validation with your DNS provider.

### Standard configuration

With this configuration, your domain connects directly to your GitLab instance using a
CNAME record. You configure your own DNS records and request domain activation through
support.

> [!note]
> Your custom domain must be accessible from the public internet for SSL certificate
> management, even if you access your instance through private networks.

#### Configure DNS records

Prerequisites:

- Access to your domain host's DNS settings.

To configure DNS records:

1. Sign in to your domain host's website.
1. Go to the DNS settings.
1. Add a `CNAME` record that points your custom domain to your GitLab Dedicated
   instance. For example:

   ```plaintext
   gitlab.my-company.com.  CNAME  my-tenant.gitlab-dedicated.com
   ```

1. Optional. If your domain has an existing `CAA` record, update it to include
   Let's Encrypt as a valid certificate authority. For example:

   ```plaintext
   gitlab.my-company.com.  IN  CAA 0 issue "pki.goog"
   gitlab.my-company.com.  IN  CAA 0 issue "letsencrypt.org"
   ```

   The `CAA` record defines which certificate authorities can issue certificates for
   your domain.

1. Save your changes and wait for DNS changes to take effect.

Keep your DNS records in place as long as you use the custom domain.

#### Enable a custom domain

Prerequisites:

- You have configured the DNS records.

To enable your custom domain:

1. Submit a [support ticket](https://support.gitlab.com/hc/en-us/requests/new?ticket_form_id=4414917877650).
1. In your support ticket, specify:
   - Your custom domain name. For example, `gitlab.company.com`.
   - If you need custom domains for the container registry and GitLab agent server for
     Kubernetes, include the domain names you want to use. For example,
     `registry.company.com` and `kas.company.com`.

### Cloudflare security configuration

With this configuration, your domain must be delegated to GitLab using NS records,
which allows traffic to be routed through Cloudflare Web Application Firewall (WAF).
Cloudflare manages all DNS settings for your domain and provides enhanced security
features.

> [!note]
> This approach requires coordination with your Customer Success Manager.
> The configuration is applied during your instance's maintenance period.

#### Request a custom domain

To request a custom domain:

1. Submit a [support ticket](https://support.gitlab.com/hc/en-us/requests/new?ticket_form_id=4414917877650).
1. In your support ticket, specify:
   - Your custom domain name. For example, `gitlab.company.com`.
   - If you need custom domains for the container registry and GitLab agent server for
     Kubernetes, include the domain names you want to use. For example,
     `registry.company.com` and `kas.company.com`.
   - Your compliance requirements. For example, FedRAMP.

GitLab configures your domain in Cloudflare and provides:

- Two Cloudflare nameservers, like `name1.ns.cloudflare.com` and
  `name2.ns.cloudflare.com`.
- DNSSEC parameters (FedRAMP customers only), including:
  - Key tag: Numeric identifier (provided by GitLab)
  - Algorithm: Typically 13 (ECDSA P-256 with SHA-256) or 8 (RSA/SHA-256)
  - Digest type: Typically 2 (SHA-256)
  - Digest: Cryptographic hash of the public key (provided by GitLab)

#### Configure DNS records

Configure NS records in your DNS provider to delegate your subdomain to Cloudflare.

Prerequisites:

- Access to your domain host's DNS settings.
- GitLab has provided nameservers and DNSSEC parameters (if applicable).

To configure DNS records:

1. Sign in to your domain host's website.
1. Go to the DNS settings.
1. Create NS records using the nameservers provided by GitLab. For example:

   ```plaintext
   gitlab.company.com.     NS    name1.ns.cloudflare.com.
   gitlab.company.com.     NS    name2.ns.cloudflare.com.
   ```

1. Remove any conflicting A, AAAA, or CNAME records for the same subdomain.
1. FedRAMP customers only. Add a DS record using the values provided by GitLab:

   ```plaintext
   gitlab.company.com.     DS    [Key Tag] [Algorithm] [Digest Type] [Digest]
   ```

   For example:

   ```plaintext
   gitlab.company.com.     DS    12345 13 2 A1B2C3D4E5F6...
   ```

1. Save your changes. DNS changes can take up to 48 hours to take effect.
1. Verify your configuration:

   ```shell
   # Verify nameserver delegation
   dig +short NS gitlab.company.com

   # Verify DNS resolution
   dig gitlab.company.com

   # Verify DNSSEC (if configured)
   dig +dnssec gitlab.company.com
   ```

1. Notify GitLab through your support ticket that DNS configuration is complete.

GitLab then:

- Verifies DNS delegation.
- Configures SSL/TLS certificates.
- Confirms when your custom domain is active.

## Container registry network access

The container registry FQDN (Fully Qualified Domain Name) identifies the S3 bucket that
stores your instance's container registry data.

### View your container registry FQDN

Use the FQDN instead of IP addresses to configure firewall rules and network policies
that reference the registry storage location. IP addresses for S3 buckets can change
over time.

To view your container registry FQDN:

1. Sign in to [Switchboard](https://console.gitlab-dedicated.com/).
1. In the left sidebar, select **Configuration**.
1. Expand **Resource access**.
1. Under **Container registry**, select **Copy to clipboard**
   ().

## Custom certificate authorities for external services

GitLab Dedicated validates certificates when connecting to external services over HTTPS.
By default, GitLab Dedicated trusts only publicly recognized certificate authorities and
rejects connections to services with certificates from untrusted certificate authorities.

If your external services use certificates from a private or internal certificate
authority, you must add that certificate authority to your GitLab Dedicated instance.

You might need custom certificate authorities to:

- Connect to internal webhook endpoints.
- Pull images from private container registries.
- Integrate with on-premises services behind corporate public key infrastructure.

### Add a custom certificate

Certificate chain blocks (multiple certificates in a single text block) are not
supported. If you have multiple certificates in your chain, add each certificate
separately.

To add a custom certificate:

1. Sign in to [Switchboard](https://console.gitlab-dedicated.com/).
1. In the left sidebar, select **Configuration**.
1. Expand **Custom certificate authorities**.
1. Select **+ Add Certificate**.
1. Paste a single certificate into the text box. Include the
   `-----BEGIN CERTIFICATE-----` and `-----END CERTIFICATE-----` lines.
1. Select **Save**.
1. Repeat steps 4-6 for each additional certificate in your chain.
1. Scroll up to the top of the page and select whether to apply the changes immediately
   or during the next maintenance window.

If you cannot use Switchboard to add a custom certificate, open a
[support ticket](https://support.gitlab.com/hc/en-us/requests/new?ticket_form_id=4414917877650)
and attach each custom certificate as a separate file.

## AWS PrivateLink connectivity

AWS PrivateLink enables private network connectivity between your AWS infrastructure
and your GitLab Dedicated instance without routing traffic over the public internet.
All traffic stays within the AWS network, which reduces exposure to external threats
and can help meet compliance requirements for private networking.

GitLab Dedicated supports two types of PrivateLink connections:

- Inbound PrivateLink connections: Users and applications in your VPC connect
  privately to your GitLab Dedicated instance. Use this when you want to restrict
  access so your instance is not reachable over the public internet.
- Outbound PrivateLink connections: Your GitLab Dedicated instance and hosted
  runners connect privately to services running in your VPC. Use this for webhooks,
  project mirroring, secrets managers, or deployments into your infrastructure.

You can create endpoint services only in your primary and secondary AWS regions.
By default, PrivateLink connections must be in the same AWS region as your GitLab Dedicated
instance. Use cross-region connections for other AWS regions:

- [Cross-region inbound PrivateLink connections](#cross-region-inbound-privatelink-connections):
  Connect from other AWS regions to your instance.
- [Cross-region outbound PrivateLink connections](#cross-region-outbound-privatelink-connections):
  Connect your instance to services in other AWS regions.

Before creating cross-region connections, note:

- AWS does not support cross-region connections in some regions and Availability Zones (AZs).
  For more information, see AWS documentation for
  [cross-region considerations](https://docs.aws.amazon.com/vpc/latest/privatelink/privatelink-share-your-services.html#endpoint-service-cross-region)
- AWS charges for cross-region connections. For more information, see
  [AWS PrivateLink pricing](https://aws.amazon.com/privatelink/pricing/).

For more information about AWS PrivateLink, see
[what is AWS PrivateLink?](https://docs.aws.amazon.com/vpc/latest/privatelink/what-is-privatelink.html).

### Inbound PrivateLink connections

Inbound PrivateLink connections allow users and applications in your VPC to connect
privately to your GitLab Dedicated instance.

When you create an endpoint service, you specify IAM principals that control access.
Only the IAM principals you specify can create VPC endpoints to connect to your instance.

Each endpoint service is available in two availability zones, chosen during onboarding
or randomly selected.

IAM principals are configured independently for each region. You can reuse the same
principals across regions, or use different ones if your secondary region uses a
separate AWS account.

#### Create an inbound PrivateLink connection

Create an inbound PrivateLink connection to allow users and applications in your VPC
to connect privately to your GitLab Dedicated instance.

To keep this connection available during regional failover, configure a secondary
region endpoint. Without this, your instance is not privately accessible if your
primary region becomes unavailable.

Prerequisites:

- A VPC in each region you want to configure.
- An IAM principal with permissions to discover the GitLab-provided endpoint service,
  create the interface VPC endpoint, and associate it with the Route 53 private hosted
  zone when private DNS is enabled.
- IAM principals with role names only, without role paths.
  - Valid: `arn:aws:iam::AWS_ACCOUNT_ID:role/RoleName`
  - Invalid: `arn:aws:iam::AWS_ACCOUNT_ID:role/somepath/AnotherRoleName`

To create an inbound PrivateLink connection:

1. Sign in to [Switchboard](https://console.gitlab-dedicated.com/).
1. In the left sidebar, select **Configuration**.
1. Expand **Inbound PrivateLink connections**.
1. Select **Add endpoint service**.
1. Select a region.
1. Under **IAM principals**, add the AWS users or roles that can initiate connections
   to the endpoint service. The IAM principals must be
   [IAM role principals](https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_elements_principal.html#principal-roles)
   or [IAM user principals](https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_elements_principal.html#principal-users).
1. In your AWS account, attach a policy with the following permissions to the role
   or user that creates the VPC endpoint:

   ```json
   {
     "Version": "2012-10-17",
     "Statement": [
       {
         "Sid": "GitLabDedicatedInboundPrivateLink",
         "Effect": "Allow",
         "Action": [
           "ec2:CreateVpcEndpoint",
           "ec2:DescribeVpcEndpointServices",
           "ec2:DescribeVpcEndpoints",
           "ec2:DescribeVpcs",
           "route53:AssociateVPCWithHostedZone"
         ],
         "Resource": "*"
       }
     ]
   }
   ```

1. Recommended. To configure a secondary region, select **Secondary region** under **Regions**. This will create endpoint services in both regions with the specified IAM principals.
1. Select **Save**. GitLab creates the endpoint services and the service endpoint names
   become available on the **Configuration** page.

Then, for each region you configured, complete the AWS setup:

1. In your AWS account, create an
   [endpoint interface](https://docs.aws.amazon.com/vpc/latest/privatelink/create-interface-endpoint.html)
   in your VPC.
1. Configure the endpoint interface with these settings:
   - **Service endpoint name**: Use the name for that region from the **Configuration**
     page in Switchboard.
   - **Private DNS names enabled**: Select **Yes**.
   - **Subnets**: Select all matching subnets.
1. Use the instance URL provided during onboarding to connect to your GitLab Dedicated
   instance from your VPC.

To automate the AWS VPC endpoint setup, you can use the
[`terraform-inbound-privatelink`](https://gitlab.com/gitlab-com/gl-infra/gitlab-dedicated/customer-tools/terraform-inbound-privatelink)
Terraform module. The module also outputs the Route 53 records required when you switch DNS.

#### Configure DNS for KAS and registry

Create additional DNS configuration in your VPC to access KAS (GitLab agent for
Kubernetes) and the container registry through your private network.

Prerequisites:

- You have configured inbound PrivateLink connections.
- You have permission to create Route 53 private hosted zones in your AWS account.

To configure DNS for KAS and registry:

1. In your AWS console, create a private hosted zone for `gitlab-dedicated.com`
   and associate it with the VPC that contains your inbound PrivateLink connection.
1. After you create the private hosted zone, add the following DNS records
   (replace `example` with your instance name):

   1. Create an `A` record for your GitLab Dedicated instance:
      - Configure your full instance domain (for example, `example.gitlab-dedicated.com`)
        to resolve to your VPC endpoint as an alias.
      - Select the VPC endpoint that does not contain an availability zone reference.

        [VPC endpoint dropdown list showing the correct endpoint without AZ reference highlighted.]

   1. Create `CNAME` records for both KAS and the registry to resolve to your GitLab
      Dedicated instance domain (`example.gitlab-dedicated.com`):
      - `kas.example.gitlab-dedicated.com`
      - `registry.example.gitlab-dedicated.com`

1. To verify connectivity, from a resource in your VPC, run these commands:

   ```shell
   nslookup kas.example.gitlab-dedicated.com
   nslookup registry.example.gitlab-dedicated.com
   nslookup example.gitlab-dedicated.com
   ```

   All commands should resolve to private IP addresses within your VPC.

This configuration uses the VPC endpoint interface rather than specific IP addresses,
so it remains stable if IP addresses change.

#### Configure DNS for GitLab Pages

To access GitLab Pages through your private network, create additional DNS configuration
in your VPC.

To configure DNS for GitLab Pages:

1. In your AWS console, create a private hosted zone for `<tenant_name>.gitlab-dedicated.site`
   and associate it with the VPC that contains your inbound PrivateLink connection.
1. After you create the private hosted zone, add the following DNS records:
   1. Create an apex `A` alias record for the VPC endpoint.
   1. Create a wildcard `CNAME` for `*.<tenant_name>.gitlab-dedicated.site` that points
      to `<tenant_name>.gitlab-dedicated.site`.

### Cross-region inbound PrivateLink connections

By default, only VPCs in the same AWS region as an endpoint service can connect to it.
With cross-region inbound PrivateLink connections, VPCs in other AWS regions can connect
privately to your GitLab Dedicated instance.

Use cross-region inbound PrivateLink connections to:

- Connect workloads that run in AWS regions other than your primary and secondary regions.
- Keep private access to your instance after a failover to your secondary region, without
  moving your workloads. For example, a VPC in your primary region can connect to the
  endpoint service in your secondary region.

Before you add a region, consider:

- Cost: AWS charges for each cross-region VPC endpoint and for data transferred between
  regions. These charges apply to the VPC endpoints in your AWS account.
- IAM permissions: Each IAM principal that connects from an added region needs the
  `vpce:AllowMultiRegion` permission. In your AWS account, add this permission to the IAM
  policy that you attached in
  [create an inbound PrivateLink connection](#create-an-inbound-privatelink-connection).
  Connections from your primary and secondary regions do not need this permission.
- Region availability: Switchboard lists only the regions that support cross-region
  PrivateLink connections.
- Private DNS: In a VPC, only one VPC endpoint can have private DNS turned on for a DNS name.
  If one VPC has VPC endpoints for both your primary and secondary region endpoint services,
  turn on private DNS for the primary region endpoint only. After a failover, GitLab Support
  notifies you, and you must move private DNS to the secondary region endpoint.

#### Add a region to an inbound PrivateLink connection

Prerequisites:

- You have configured inbound PrivateLink connections.
- You have an IAM principal with the `vpce:AllowMultiRegion` permission.

To add a region:

1. Sign in to [Switchboard](https://console.gitlab-dedicated.com/).
1. In the left sidebar, select **Configuration**.
1. Expand **Inbound PrivateLink connections**.
1. If the endpoint service does not exist yet,
   [create an inbound PrivateLink connection](#create-an-inbound-privatelink-connection).
1. Select the endpoint service you want to update.
1. In the **Supported regions** section, select **Add region**.
1. From the **Region** dropdown list, select a region.
1. Select **Save**.

Then, for each region you added, complete the AWS setup:

1. In your AWS account, create an endpoint interface in a VPC in that region.
1. Configure the endpoint interface with these settings:
   - **Service endpoint name**: Use the endpoint service name from the **Configuration**
     page in Switchboard.
   - **Service Region**: Select **Enable Cross Region endpoint**, then select the region
     of the endpoint service.
   - **Subnets**: Select all matching subnets.

If the IAM principal does not have the `vpce:AllowMultiRegion` permission, AWS returns the
error `Service name could not be verified`.

#### Remove a region from an inbound PrivateLink connection

When you remove a region, VPC endpoints in that region that already connect to your
instance keep working. You cannot create new VPC endpoints in that region.
You cannot remove your primary region, or your secondary region if you have one.

To remove a region:

1. Sign in to [Switchboard](https://console.gitlab-dedicated.com/).
1. In the left sidebar, select **Configuration**.
1. Expand **Inbound PrivateLink connections**.
1. Select the endpoint service you want to update.
1. In the **Supported regions** section, next to the region you want to remove, select
   **Delete** ().
1. Select **Delete supported region**.

### Private S3 access for object storage

GitLab Dedicated stores object storage data in S3 buckets, including container images,
CI/CD job artifacts, LFS objects, packages, and user uploads. When a client downloads one
of these objects, GitLab returns a pre-signed S3 URL and the client connects directly to
S3. Because
[proxied downloads](../../../subscriptions/gitlab_dedicated/_index.md#object-storage-downloads)
are not supported, this connection goes over the public internet by default.

To keep object storage traffic on the AWS network, connect to S3 privately by creating S3
VPC endpoints in the VPC that hosts your inbound PrivateLink connection. You can attach
[VPC endpoint policies](https://docs.aws.amazon.com/vpc/latest/privatelink/vpc-endpoints-access.html)
to control and audit this traffic. No configuration changes are required on your GitLab
Dedicated instance.

The endpoints you need depend on where your clients run:

| Client location | Endpoints to create |
|-----------------|---------------------|
| In the VPC, for example, EC2 or EKS runners | S3 gateway endpoint |
| On premises, through Direct Connect or Site-to-Site VPN | S3 interface endpoint and Route 53 Resolver inbound endpoint, with an S3 gateway endpoint in the same VPC |

A gateway endpoint is a target in a VPC route table, so only clients inside the VPC can
use it. Clients that reach your VPC through Direct Connect, Site-to-Site VPN, or VPC
peering must use an interface endpoint, which has private IP addresses in your subnets.
Gateway endpoints have no additional charge. Interface and resolver endpoints have hourly
and data processing charges.

Both types of endpoint can coexist in the same VPC. Because this configuration uses
**Enable private DNS only for inbound endpoint**, AWS requires an S3 gateway endpoint in the
VPC, and clients inside the VPC continue to use it. For more information, see
[private DNS](https://docs.aws.amazon.com/AmazonS3/latest/userguide/privatelink-interface-endpoints.html#private-dns)
in the AWS documentation.

Repeat this configuration for each VPC that needs private S3 access. To keep private S3
access available during regional failover, also configure it in your secondary region.

To automate the AWS setup for both scenarios, you can use the
[`object-storage-private-access`](https://gitlab.com/gitlab-com/gl-infra/gitlab-dedicated/customer-tools/object-storage-private-access)
Terraform module. The module creates the endpoints described in the following sections and
outputs the DNS forwarding configuration for your on-premises DNS servers.

#### Configure private S3 access from your VPC

Prerequisites:

- You have configured inbound PrivateLink connections.
- You have permission to create VPC endpoints and modify route tables in your AWS account.

To configure private S3 access for clients in your VPC:

1. In the AWS VPC console, create a
   [gateway endpoint for Amazon S3](https://docs.aws.amazon.com/vpc/latest/privatelink/vpc-endpoints-s3.html)
   in the VPC that contains your inbound PrivateLink connection,
   and associate the endpoint with your route tables.
1. Recommended. To confirm S3 traffic uses the gateway endpoint, verify each route table has
   a route to the S3 prefix list (`pl-xxxxxxxx`) through the gateway endpoint (`vpce-xxxxxxxx`),
   or check [VPC Flow Logs](https://docs.aws.amazon.com/vpc/latest/userguide/flow-logs.html),
   S3 access logs, or CloudTrail for the `vpcEndpointId` field.
1. To verify connectivity, from a resource in your VPC, run these commands:

   ```shell
   # To authenticate to the registry
   docker login registry.example.gitlab-dedicated.com

   # To test a download
   docker pull registry.example.gitlab-dedicated.com/<group>/<project>/<image>:<tag>
   ```

#### Configure private S3 access from your on-premises network

On-premises clients cannot use a gateway endpoint. Create an interface endpoint so that S3
has private IP addresses in your VPC, and a Route 53 Resolver inbound endpoint so that your
on-premises DNS servers can resolve S3 hostnames to those addresses. Because the interface
endpoint addresses are inside your VPC CIDR range, traffic reaches them over your existing
Direct Connect or VPN connection, without new routes or BGP changes.

GitLab generates the pre-signed URL, so your clients cannot use the endpoint-specific DNS
names of the interface endpoint. Private DNS and DNS forwarding make the standard S3
hostnames resolve to the interface endpoint instead.

Prerequisites:

- You have configured private S3 access from your VPC, which creates the gateway endpoint
  that AWS requires for this configuration.
- You have at least two subnets in different availability zones.
- You have the CIDR ranges of your on-premises networks.

To configure private S3 access for on-premises clients:

1. In the AWS VPC console, create an [interface endpoint for Amazon S3](https://docs.aws.amazon.com/AmazonS3/latest/userguide/privatelink-interface-endpoints.html).
1. For **Subnets**, select at least two subnets in different availability zones.
1. Select **Enable DNS name**.
1. Select **Enable private DNS only for inbound endpoint**.
1. For **Security groups**, allow inbound TCP port 443 from your VPC CIDR range and from your on-premises CIDR ranges.
1. In the same VPC, create a
   [Route 53 Resolver inbound endpoint](https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/resolver-forwarding-inbound-queries.html)
   with a security group that allows inbound TCP and UDP port 53 from your on-premises
   CIDR ranges.
1. Record the IP addresses assigned to the resolver inbound endpoint. Your on-premises DNS
   servers forward S3 queries to these addresses.

#### Configure DNS forwarding for S3 hostnames

After you create the interface endpoint and the resolver inbound endpoint, configure your
on-premises DNS servers to forward S3 queries to the resolver.

Prerequisites:

- You have the IP addresses of your resolver inbound endpoint.
- You have permission to add conditional forwarders on your on-premises DNS servers.

To configure DNS forwarding:

1. On your on-premises DNS servers, add a forward-only conditional forwarder for the
   `s3.<region>.amazonaws.com` zone, where `<region>` is the AWS region of your GitLab
   Dedicated instance. If you have a Secondary region for failover, also add a forwarder for that region's S3 domain. Set the forwarders to the IP addresses of your resolver inbound
   endpoint. Forwarding applies to the entire zone, so queries for bucket hostnames such as
   `<bucket>.s3.<region>.amazonaws.com` are also forwarded.

   For Windows Server DNS:

   ```powershell
   Add-DnsServerConditionalForwarderZone `
     -Name "s3.eu-central-1.amazonaws.com" `
     -MasterServers 10.0.1.90, 10.0.1.91
   ```

   For BIND, in `named.conf`:

   ```plaintext
   zone "s3.eu-central-1.amazonaws.com" {
       type forward;
       forward only;
       forwarders { 10.0.1.90; 10.0.1.91; };
   };
   ```

   For other DNS servers, such as Infoblox, create a forward-only zone with the same name
   and the same targets.

1. To verify resolution, from an on-premises client, run this command against your
   container registry FQDN:

   ```shell
   dig <container_registry_fqdn>
   ```

   The command should return a private IP address from your VPC CIDR range. To find this
   value, see [view your container registry FQDN](#view-your-container-registry-fqdn).

1. To verify connectivity, from an on-premises client, run these commands:

   ```shell
   # To authenticate to the registry
   docker login registry.example.gitlab-dedicated.com

   # To test a download
   docker pull registry.example.gitlab-dedicated.com/<group>/<project>/<image>:<tag>
   ```

If S3 hostnames still resolve publicly, check that the forwarder zone matches your instance's
region and that your DNS servers can reach port 53 on the resolver endpoint. If they resolve
privately but downloads time out, check that the interface endpoint security group allows
port 443 from your on-premises CIDR ranges.

For AWS connectivity issues, contact AWS Support.

### Outbound PrivateLink connections

Outbound PrivateLink connections allow your GitLab Dedicated instance and hosted runners
to communicate privately with services running in your VPC, without exposing traffic to
the public internet.

Use outbound PrivateLink connections to send webhooks, import or mirror projects and
repositories, and give hosted runners access to custom secrets managers, artifacts,
job images, and deployments in your infrastructure.

You can create up to 10 outbound PrivateLink connections for each region. To consolidate
more than 10 backend services behind a single connection, you can use the
[`terraform-outbound-proxy`](https://gitlab.com/gitlab-com/gl-infra/gitlab-dedicated/customer-tools/terraform-outbound-proxy)
Terraform module to deploy a highly available NGINX reverse proxy with TLS passthrough,
HTTP routing, and SMTP forwarding.

Outbound PrivateLink connections in Switchboard use service connections to manage
connectivity. A service connection links a DNS alias to a VPC endpoint service in
your AWS account. Each service connection can have up to two VPC endpoints, one for
each region (primary and secondary). When you create a service connection, you choose
how DNS is resolved:

- GitLab-managed DNS: GitLab creates a private hosted zone (PHZ) and DNS record
  for the alias alongside the VPC endpoint.
- Private DNS: AWS handles DNS resolution automatically using the private DNS name
  of your endpoint service. GitLab does not create DNS records in this case.

For aliases that do not require a VPC endpoint, you can
[create a custom DNS record](#create-a-custom-dns-record) instead.

#### Create a service connection

Create a service connection to route outbound traffic from your GitLab Dedicated instance
through AWS PrivateLink to a service in your VPC.

To keep this connection available during regional failover, configure a secondary
region endpoint. Without this, outbound connections are unavailable if your primary
region becomes unavailable. Switchboard displays a warning if a service connection
has VPC endpoints in only one region.

Prerequisites:

- An endpoint service created for your internal service, with the service name noted.
  For more information, see
  [create an endpoint service](https://docs.aws.amazon.com/vpc/latest/privatelink/create-endpoint-service.html).
- A Network Load Balancer (NLB) configured in the availability zones where your instance
  is deployed. Either use the configured AZs (displayed on the **Overview** page in
  Switchboard) or enable the NLB in every AZ in the region.

To create a service connection:

1. Sign in to [Switchboard](https://console.gitlab-dedicated.com/).
1. In the left sidebar, select **Configuration**.
1. Expand **Outbound PrivateLink connections**, then select **Outbound PrivateLink connections**.
1. Expand **Set up endpoint service in AWS** and copy the ARN from
   **Outbound PrivateLink IAM principal**.
1. In your AWS endpoint service, add the ARN to the **Allowed Principals** list.
   For more information, see
   [manage permissions](https://docs.aws.amazon.com/vpc/latest/privatelink/configure-endpoint-service.html#add-remove-permissions).
1. Select the **Service connections** tab.
1. Select **Create service connection**.
1. Complete the fields:
   - **Alias**: Enter the DNS name your GitLab Dedicated instance uses to reach the
     service. For example, `my-service.example.com`.
   - Optional. **Description**: Enter a description for this connection.
1. Under the primary region, complete the fields:
   - **VPC endpoint**: Select **New VPC endpoint** and enter the VPC endpoint service
     name from your AWS account (for example,
     `com.amazonaws.vpce.us-east-1.vpce-svc-0a123bcd4e5f678gh`), or select
     **Existing VPC endpoint** and choose an endpoint from the dropdown list.
   - Optional. **Description**: Enter a description for this region's endpoint.
   - **DNS**: Select **GitLab-managed DNS** to have GitLab maintain private hosted zone
     records, or **Private DNS** to use the private DNS name configured on your VPC
     endpoint service in AWS.
1. Do one of the following for the secondary region:
   - To add a VPC endpoint, complete the same fields as the primary region.
   - To skip the secondary region, select **Remove** in the top right of the section.
1. Select **Save**.

GitLab configures your instance to create the necessary VPC endpoints and DNS records
(unless **Private DNS** is selected, in which case AWS manages DNS resolution).
After setup, GitLab routes matching outbound connections into your VPC over PrivateLink.

#### Create a custom DNS record

Use custom DNS records for DNS aliases that do not point to a VPC endpoint.
For example, use a custom DNS record when you need your GitLab Dedicated instance to resolve
a private domain name to a publicly accessible or internally routed service.

By default, the alias splits at the first dot into a record name and private hosted zone
name. For example, `service.example.com` splits into record name `service` and zone
`example.com`. If this split causes domain shadowing or conflicts with existing service
connection aliases or custom domains, use the advanced option to customize the split.

A private hosted zone (PHZ) is a container that holds information about how
Amazon Route 53 responds to DNS queries for a domain and its subdomains within your GitLab
Dedicated VPC. For more information, see
[private hosted zones](https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/hosted-zones-private.html).

Changes to custom DNS records, or to service connections when using GitLab-managed DNS
(private hosted zones), can disrupt services that use these records for up to five minutes.

To add a custom DNS record:

1. Sign in to [Switchboard](https://console.gitlab-dedicated.com/).
1. In the left sidebar, select **Configuration**.
1. Expand **Outbound PrivateLink connections**, then select **Outbound PrivateLink connections**.
1. Select the **Custom DNS records** tab.
1. Select **Create DNS record**.
1. Complete the fields:
   - **Alias**: Enter the DNS name your GitLab Dedicated instance uses to reach the
     service. For example, `my-internal-service.example.com`.
   - Optional. **Description**: Enter a description for this record.
   - Optional. Select **Customize DNS record and zone split (advanced)** to control
     how the record name is split into a record name and private hosted zone. When
     selected, the **Record name** text box becomes read-only and is automatically
     composed from the **Record name** and **Private hosted zone name** values you enter.
1. Under each region, enter the **Target domain name** the alias resolves to.
   To support failover, enter a target domain name for both your primary and secondary
   regions.
1. Select **Save**.
1. Scroll to the top of the page and select whether to apply the changes immediately
   or during the next maintenance window.

#### Configure outbound PrivateLink connections with a support request

If you cannot use Switchboard to configure outbound PrivateLink connections:

1. Open a [support ticket](https://support.gitlab.com/hc/en-us/requests/new?ticket_form_id=4414917877650)
   and provide:
   - The VPC endpoint service name.
   - The DNS alias you want to use, if applicable.
   - Whether Private DNS is enabled on your endpoint service.
1. Copy the ARN of the IAM principal provided by GitLab and add it to the
   **Allowed Principals** list on your endpoint service. For more information, see
   [manage permissions](https://docs.aws.amazon.com/vpc/latest/privatelink/configure-endpoint-service.html#add-remove-permissions).

#### Delete an outbound PrivateLink connection

You can delete a service connection or a VPC endpoint independently. Each has its own
tab in Switchboard: **Service connections** and **VPC endpoints**.

To delete a service connection:

1. Sign in to [Switchboard](https://console.gitlab-dedicated.com/).
1. In the left sidebar, select **Configuration**.
1. Expand **Outbound PrivateLink connections**.
1. Select the **Service connections** tab.
1. Go to the connection you want to delete, then select
   **Delete** ().
1. Select **Delete**.

To delete a VPC endpoint:

1. Sign in to [Switchboard](https://console.gitlab-dedicated.com/).
1. In the left sidebar, select **Configuration**.
1. Expand **Outbound PrivateLink connections**.
1. Select the **VPC endpoints** tab.
1. Go to the endpoint you want to delete, then select
   **Delete** ().
1. Select **Delete**.

### Cross-region outbound PrivateLink connections

By default, the VPC endpoints that GitLab creates for a service connection connect to
endpoint services in the same AWS region as the VPC endpoint. With cross-region outbound
PrivateLink connections, your GitLab Dedicated instance can connect privately to endpoint
services in other AWS regions.

Use cross-region outbound PrivateLink connections to:

- Connect to services that run in AWS regions other than your primary and secondary regions.
- Keep outbound connections available after a failover to your secondary region, with one
  endpoint service in one region. For example, the VPC endpoint in your secondary region
  can connect to the endpoint service in your primary region.

The service region is the AWS region where your endpoint service runs. Switchboard reads the
service region from the endpoint service name. When the service region differs from the
region of the VPC endpoint, Switchboard labels the VPC endpoint **Cross-region**.

A cross-region connection depends on the service region. If the service region becomes
unavailable, the connection fails, even after your instance fails over to your secondary
region.

Before you create a cross-region connection, consider:

- Endpoint service configuration: Your endpoint service must accept connections from the
  regions of your GitLab Dedicated instance. Add your primary region, and your secondary
  region if you use one, to the supported regions of your endpoint service.
- IAM permissions: The IAM principal that adds supported regions to your endpoint service
  needs the `vpce:AllowMultiRegion` permission. GitLab manages this permission for the VPC
  endpoints that GitLab creates.
- AZs: Same-region endpoint services must have a Network Load Balancer in the AZs of your
  instance. Cross-region endpoint services do not have this requirement.
- Region availability: Switchboard accepts only endpoint services in regions that support
  cross-region PrivateLink connections.
- Cost: AWS charges for data transferred between regions.

#### Create a cross-region service connection

Prerequisites:

- An endpoint service in your AWS account that lists the regions of your GitLab Dedicated
  instance as supported regions.

To create a cross-region service connection, follow the steps to
[create a service connection](#create-a-service-connection), with these differences:

- For **Endpoint service name**, enter the name of an endpoint service in another region.
  Switchboard shows the region in **Service region**.
- For **DNS**, select **GitLab-managed DNS**. **Private DNS** is not available for endpoint
  services in another region.

#### Change the service region of a VPC endpoint

You cannot change the endpoint service name of a VPC endpoint after GitLab creates it,
so you cannot change its service region. Before you apply your changes, you can still
edit the endpoint service name of a new VPC endpoint.

To connect to an endpoint service in another region, replace the VPC endpoint:

1. Sign in to [Switchboard](https://console.gitlab-dedicated.com/).
1. In the left sidebar, select **Configuration**.
1. Expand **Outbound PrivateLink connections**, then select **Outbound PrivateLink connections**.
1. On the **Service connections** tab, next to a service connection that uses the VPC
   endpoint, select **Edit** ().
1. Under the region, select **New VPC endpoint** and enter the new endpoint service name.
1. Select **Save**.
1. For each other service connection that uses the previous VPC endpoint, edit the
   connection, select **Existing VPC endpoint**, and select the new VPC endpoint.
1. [Delete the previous VPC endpoint](#delete-an-outbound-privatelink-connection).

## Static IP addresses

- Tier: Ultimate
- Offering: GitLab Dedicated for Government

By default, your GitLab Dedicated for Government instance is reachable through IP addresses
that Cloudflare shares across many customers. These addresses can change. To allow access
with an IP-based allowlist, you would have to allow all of the IP ranges that Cloudflare publishes.

If your network perimeter requires IP-based allowlists, you can request a pair of static
IP addresses reserved for your instance. With static IP addresses:

- Your instance hostname, container registry, and GitLab agent server for Kubernetes (KAS)
  resolve only to two IPv4 addresses that are reserved for your instance.
- Traffic continues to pass through Cloudflare Web Application Firewall (WAF).
- The addresses do not change unless GitLab coordinates the change with you first.

Static IP addresses are available only for GitLab Dedicated for Government.

### Hostnames that use static IP addresses

The following hostnames resolve only to your static IP addresses, on TCP ports 22, 80, and 443:

- Your instance hostname, which serves the web interface, the API, Git over HTTPS, and
  Git over SSH. This includes traffic to the
  [OpenID Connect](#enable-openid-connect-for-your-ip-allowlist) and
  [SCIM](#enable-scim-provisioning-for-your-ip-allowlist) endpoints, if you have turned on
  access to them.
- `registry.<instance hostname>`, the container registry.
- `kas.<instance hostname>`, the GitLab agent server for Kubernetes.

If you use a [custom domain](#custom-domains), the hostnames are your custom domain
hostnames, for example `gitlab.company.com`, `registry.company.com`, and `kas.company.com`.
Connections to the default `<tenant>.gitlab-dedicated.us` hostnames are no longer available
after you configure a custom domain.

### Traffic that does not use static IP addresses

The following traffic does not use your static IP addresses at this time:

- Object storage downloads, including CI/CD job artifacts, Git LFS objects, packages,
  user uploads, Dependency Proxy files, and container image layers. By default, your
  browser or client downloads these objects directly from Amazon S3. If these downloads
  must also come from your static IP addresses, contact your Customer Success Manager.
  To keep this traffic on the AWS network instead, see
  [private S3 access for object storage](#private-s3-access-for-object-storage).
- GitLab Pages.
- [Inbound PrivateLink connections](#inbound-privatelink-connections). PrivateLink
  traffic stays on the AWS network and never passes through Cloudflare.
- Outbound connections from your instance, such as email sent through Amazon SES, webhooks,
  and GitLab Duo requests. Outbound connections use your
  [NAT gateway IP addresses](#nat-gateway-ip-addresses).

Your [IP allowlist](#ip-allowlist) continues to apply to traffic that arrives on the
static IP addresses, apart from any endpoints you have opened to the internet, such as
OpenID Connect or SCIM.

### Request static IP addresses

Static IP addresses are an optional add-on to your GitLab Dedicated for Government subscription.

GitLab applies the change during a [maintenance window](../maintenance.md#maintenance-windows).
While the change is applied, your instance is unreachable for a few seconds. Because of DNS
caching, clients might take up to five minutes to resolve the new addresses. No data is affected.

Prerequisites:

- Your instance must use the default Git SSH port (22).
- If you use a custom domain, it must use the
  [Cloudflare security configuration](#cloudflare-security-configuration) and its DNS
  delegation must be complete. The custom domain must also include hostnames for the
  container registry and the GitLab agent server for Kubernetes.

To request static IP addresses:

1. Contact your Customer Success Manager.
1. When GitLab provides your addresses, add both IPv4 addresses to your network allowlists
   for TCP ports 22, 80, and 443. If IPv6 connectivity is turned on for your instance,
   also add both IPv6 addresses. Complete this step before the scheduled maintenance window
   so that access continues when the change is applied.
1. After the maintenance window, verify from inside your network that you can connect to
   your instance over SSH and HTTPS. Also verify that the container registry and the
   GitLab agent server for Kubernetes work.

### Changes to static IP addresses

The following actions affect your static IP addresses and allowlists.
GitLab applies them during a maintenance window, and they cause a brief interruption:

- Turn on [IPv6 connectivity](#ipv6-connectivity). Your IPv4 addresses do not change.
  GitLab provides a pair of static IPv6 addresses for you to add to your allowlists.
- Add a custom domain. Static IP addresses are applied to the new domain only after its
  DNS delegation is complete. Until then, your instance resolves to shared Cloudflare IP
  addresses, and allowlists that contain only the static IP addresses do not match. Plan
  this change with your Customer Success Manager.
- Turn off static IP addresses. Your instance returns to shared Cloudflare IP addresses,
  and the static IP addresses are no longer associated with your instance.

## IPv6 connectivity

IPv6 connectivity lets clients reach your GitLab Dedicated instance over IPv6, in addition to IPv4.
Cloudflare receives this traffic and translates it to IPv4 before forwarding requests to your
instance's existing IPv4 infrastructure. Internal communication between GitLab Dedicated platform
services remains IPv4-only.

When you turn on IPv6 for your instance:

- Your instance operates in dual-stack mode. IPv4 access continues to work alongside IPv6.
- The GitLab web interface becomes available over IPv6.
- SSH Git operations, such as clone, push, and pull, become available over IPv6.

Prerequisites:

- Your instance must be proxied through Cloudflare WAF.
  Contact your Customer Success Manager if you're unsure whether Cloudflare WAF is turned on for your instance.
- Your instance must run GitLab 18.11.4 or later.

Switchboard doesn't support this configuration. To turn on IPv6 connectivity, open a
[support ticket](https://support.gitlab.com/hc/en-us/requests/new?ticket_form_id=4414917877650)
and confirm you want IPv6 connectivity turned on for HTTPS and SSH access to your instance.

After IPv6 is turned on, the public IP addresses for your instance change for both IPv4 and IPv6.
If you've allowlisted these addresses in firewalls, DNS records, or monitoring systems, update
those configurations after the change is applied. Turning off IPv6 changes the IP addresses again.

If your GitLab Dedicated for Government instance uses [static IP addresses](#static-ip-addresses),
your IPv4 addresses do not change when you turn IPv6 on or off. GitLab provides a pair of static
IPv6 addresses for you to add to your allowlists.

The configuration is applied during the next maintenance window.

## IP allowlist

Control which IP addresses can access your instance with an IP allowlist.
When you enable the IP allowlist, IP addresses not on the allowlist are blocked
and receive an `HTTP 403 Forbidden` response when they try to access your instance.

Use Switchboard to configure and manage your IP allowlist, or submit a support request
if Switchboard is unavailable.

### Add IP addresses to the allowlist with Switchboard

To add IP addresses to the allowlist:

1. Sign in to [Switchboard](https://console.gitlab-dedicated.com/).
1. In the left sidebar, select **Configuration**.
1. Expand **IP allowlist**, then select **IP allowlist** to go to the IP allowlist page.
1. To enable the IP allowlist, select the vertical ellipsis
   (), then select **Enabled**.
1. Do one of the following:

   - To add a single IP address:

   1. Select **Add IP address**.
   1. In the **IP address** text box, enter either:
      - A single IPv4 or IPv6 address (for example, `192.168.1.1` or `2001:db8::1`).
      - An IPv4 or IPv6 address range in CIDR notation (for example, `192.168.1.0/24` or `2001:db8::/32`).
   1. In the **Description** text box, enter a description.
   1. Select **Add**.

   - To import multiple IP addresses:

   1. Select **Import**.
   1. Upload a CSV file or paste a list of IP addresses.
   1. Select **Continue**.
   1. Fix any invalid or duplicate entries, then select **Continue**.
   1. Review the changes, then select **Import**.

1. At the top of the page, choose whether to apply the changes immediately or during
   the next maintenance window.

### Delete IP addresses from the allowlist with Switchboard

To delete IP addresses from the allowlist:

1. Sign in to [Switchboard](https://console.gitlab-dedicated.com/).
1. In the left sidebar, select **Configuration**.
1. Expand **IP allowlist**, then select **IP allowlist** to go to the IP allowlist page.
1. Do one of the following:

   - To delete a single IP address:

   1. Next to the IP address you want to remove, select the trash icon
      ().
   1. Select **Delete IP address**.

   - To delete multiple IP addresses:

   1. Select the checkboxes for the IP addresses you want to delete.
   1. To select all IP addresses on the current page, select the checkbox in the
      header row.
   1. Above the IP addresses table, select **Delete**.
   1. Select **Delete** to confirm.

1. At the top of the page, choose whether to apply the changes immediately or during
   the next maintenance window.

### Add an IP to the allowlist with a support request

If you cannot use Switchboard to update your IP allowlist, open a
[support ticket](https://support.gitlab.com/hc/en-us/requests/new?ticket_form_id=4414917877650)
and specify a comma-separated list of IP addresses that can access your instance.

### Enable OpenID Connect for your IP allowlist

Using [GitLab as an OpenID Connect identity provider](../../../integration/openid_connect_provider.md)
requires internet access to the OpenID Connect verification endpoint.

To enable access to the OpenID Connect endpoint while maintaining your IP allowlist:

- In a [support ticket](https://support.gitlab.com/hc/en-us/requests/new?ticket_form_id=4414917877650),
  request to allow access to the OpenID Connect endpoint.

The configuration is applied during the next maintenance window.

### Enable SCIM provisioning for your IP allowlist

You can use SCIM with external identity providers to automatically provision and manage
users. To use SCIM, your identity provider must be able to access the instance SCIM API
endpoints. By default, IP allowlisting blocks communication to these endpoints.

To enable SCIM while maintaining your IP allowlist:

- In a [support ticket](https://support.gitlab.com/hc/en-us/requests/new?ticket_form_id=4414917877650),
  request to enable SCIM endpoints to the internet.

The configuration is applied during the next maintenance window.

## NAT gateway IP addresses

NAT gateway IP addresses identify your instance's outbound connections to external
services. They typically remain consistent but can change if a regional failover occurs,
because the instance is rebuilt with new infrastructure.

Use these IP addresses to configure webhook receivers and set up allowlists for external
services to accept connections from your instance.

To view your NAT gateway IP addresses:

1. Sign in to [Switchboard](https://console.gitlab-dedicated.com/).
1. In the left sidebar, select **Configuration**.
1. Expand **Resource access**.
1. Under **NAT gateways**, select **Copy to clipboard**
   ().

## Troubleshooting AWS PrivateLink connectivity

When working with AWS PrivateLink connections, you might encounter the following issues.

### Error: `Service name could not be verified`

When creating a VPC endpoint for an inbound PrivateLink connection,
you might get an error that states `Service name could not be verified`.

This issue occurs when the custom IAM role provided in the support ticket does not have
the required permissions or trust policies configured in your AWS account.

To resolve this issue:

1. Confirm that you can assume the custom IAM role provided to GitLab in the support
   ticket.
1. Verify the custom role has a trust policy that allows you to assume it. For example:

   ```json
   {
       "Version": "2012-10-17",
       "Statement": [
           {
               "Sid": "Statement1",
               "Effect": "Allow",
               "Principal": {
                   "AWS": "arn:aws:iam::CONSUMER_ACCOUNT_ID:user/user-name"
               },
               "Action": "sts:AssumeRole"
           }
       ]
   }
   ```

1. Verify the custom role has a permission policy that allows VPC endpoint and EC2
   actions. For example:

   ```json
   {
      "Version": "2012-10-17",
      "Statement": [
         {
            "Sid": "VisualEditor0",
            "Effect": "Allow",
            "Action": "vpce:*",
            "Resource": "*"
         },
         {
            "Sid": "Statement1",
            "Effect": "Allow",
            "Action": [
                  "ec2:CreateVpcEndpoint",
                  "ec2:DescribeVpcEndpointServices",
                  "ec2:DescribeVpcEndpoints"
            ],
            "Resource": "*"
         }
      ]
   }
   ```

1. Using the custom role, retry creating the VPC endpoint in your AWS console or CLI.

### Outbound PrivateLink connection fails

If your outbound PrivateLink connection is not working, check the following:

- Ensure that cross-zone load balancing is turned on in your Network Load Balancer (NLB).
- Ensure that the inbound rules section of the appropriate security groups permits traffic
  from the correct IP ranges.
- Ensure that the inbound traffic is mapped to the correct port on the endpoint service.
- In Switchboard, expand **Outbound PrivateLink connections** and confirm that the details
  appear as you expect.
- Ensure that you have
  [allowed requests to the local network from webhooks and integrations](../../../security/webhooks.md#allow-requests-to-the-local-network-from-webhooks-and-integrations).
