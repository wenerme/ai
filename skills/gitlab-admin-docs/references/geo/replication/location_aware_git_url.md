# Location-aware Git remote URL with AWS Route53

- Tier: Premium, Ultimate
- Offering: GitLab Self-Managed

> [!note]
> [GitLab Geo supports location-aware DNS including web UI and API traffic.](../secondary_proxy/_index.md#configure-location-aware-dns)
> This configuration is recommended over the location-aware Git remote URL
> described in this document.

You can provide GitLab users with a single remote URL that automatically uses
the Geo site closest to them. This means users don't need to update their Git
configuration to take advantage of closer Geo sites as they move.

This is possible because Git push requests can be automatically redirected
(HTTP) or proxied (SSH) from secondary sites to the primary site.

Though these instructions use [AWS Route53](https://aws.amazon.com/route53/),
other services such as [Cloudflare](https://www.cloudflare.com/) could be used
as well.

## Prerequisites

In this example, we have already set up:

- `primary.example.com` as a Geo primary site.
- `secondary.example.com` as a Geo secondary site.

We create a `git.example.com` subdomain that automatically directs
requests:

- From Europe to the secondary site.
- From all other locations to the primary site.

In any case, you require:

- A working GitLab primary site that is accessible at its own address.
- A working GitLab secondary site.
- A Route53 Hosted Zone managing your domain.

If you haven't yet set up a Geo primary site and secondary site, see the
[Geo setup instructions](../setup/_index.md).

## Create a traffic policy

In a Route53 Hosted Zone, traffic policies can be used to set up a variety of
routing configurations.

1. Go to the
   [Route53 dashboard](https://console.aws.amazon.com/route53/home) and select
   **Traffic policies**.

   [Traffic policies section of Route53 dashboard]

1. Select **Create traffic policy**.

   [Naming the traffic policy]

1. Fill in the **Policy Name** field with `Single Git Host` and select **Next**.

   [Selecting DNS type for traffic policy]

1. Leave **DNS type** as `A: IP Address in IPv4 format`.
1. Select **Connect to** and select **Geolocation rule**.

   [Adding the geolocation rule]

1. For the first **Location**, leave it as `Default`.
1. Select **Connect to** and select **New endpoint**.
1. Choose **Type** `value` and fill it in with `<your primary IP address>`.
1. For the second **Location**, choose `Europe`.
1. Select **Connect to** and select **New endpoint**.
1. Choose **Type** `value` and fill it in with `<your secondary IP address>`.

   [Setting locations and endpoints to geolocation rule]

1. Select **Create traffic policy**.

   [Setting up policy records in traffic policy]

1. Fill in **Policy record DNS name** with `git`.
1. Select **Create policy records**.

   [Successfully created traffic policy with policy records]

You have successfully set up a single host, for example, `git.example.com` which
distributes traffic to your Geo sites by geolocation!

## Configure Git clone URLs to use the special Git URL

When a user clones a repository for the first time, they typically copy the Git
remote URL from the project page. By default, these SSH and HTTP URLs are based
on the external URL of the current host. For example:

- `git@secondary.example.com:group1/project1.git`
- `https://secondary.example.com/group1/project1.git`

[SSH and HTTPS URLs of repository]

You can customize the:

- SSH remote URL to use the location-aware `git.example.com`. To do so, change the SSH remote URL
  host by setting `gitlab_rails['gitlab_ssh_host']` in `gitlab.rb` of web nodes.
- HTTP remote URL as shown in
  [Custom Git clone URL for HTTP(S)](../../settings/visibility_and_access_controls.md#customize-git-clone-url-for-https).

## Example Git request handling behavior

After following the configuration steps documented previously, handling for Git requests is now location aware.
For requests:

- Outside Europe, all requests are directed to the primary site.
- Within Europe, over:
  - HTTP:
    - `git clone http://git.example.com/foo/bar.git` is directed to the secondary site.
    - `git push` is initially directed to the secondary, which automatically
      redirects to `primary.example.com`.
  - SSH:
    - `git clone git@git.example.com:foo/bar.git` is directed to the secondary.
    - `git push` is initially directed to the secondary, which automatically
      proxies the request to `primary.example.com`.
