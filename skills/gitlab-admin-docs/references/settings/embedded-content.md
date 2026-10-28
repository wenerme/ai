# Embedded content

Choose the embed providers that users can embed content from in Markdown.

- Tier: Free, Premium, Ultimate
- Offering: GitLab Self-Managed, GitLab Dedicated
- Status: Experiment

- [Introduced](https://gitlab.com/gitlab-org/gitlab/-/merge_requests/200864) in GitLab 18.7 [with a feature flag](../feature_flags/_index.md) named `allow_iframes_in_markdown`. Disabled by default.
- Embed providers [introduced](https://gitlab.com/gitlab-org/gitlab/-/merge_requests/254945) in GitLab 19.5. Embed providers replace the allowlist of domains. The upgrade to GitLab 19.5 clears the existing allowlist.

> [!flag]
> The availability of this feature is controlled by a feature flag.
> For more information, see the history.
> This feature is available for testing, but not ready for production use.

Users can embed content from external providers, like YouTube videos and Figma designs, in Markdown.
You choose which embed providers to allow on your instance.
For the available providers and their IDs, see [embedded content](../../user/markdown.md#embedded-content).

GitLab defines the available embed providers.
Each provider defines the URLs it accepts, the URL the content loads from, and the
browser sandbox restrictions on its content.
You cannot add providers.

Content from an allowed provider loads inside pages in GitLab and can run scripts in the browsers
of users who view it.
Allow only providers you trust.

If you stop allowing a provider or turn off embedded content, existing content from those providers
displays as a link to its original URL.
If you allow a provider or turn on embedded content, existing content is not embedded until
GitLab next renders it, like when someone edits it.

## Choose embed providers

Prerequisites:

- Administrator access.

To choose which embed providers users can embed content from:

1. In the upper-right corner, select .
1. In the left sidebar, select  > .
1. Expand .
1. Select the  checkbox.
1. Under , select the checkbox for each provider to allow.
1. Select .

You can also choose embed providers with the
[application settings API](../../api/settings.md#available-settings), by using the
`iframe_rendering_enabled` and `iframe_rendering_allowlist` attributes.
