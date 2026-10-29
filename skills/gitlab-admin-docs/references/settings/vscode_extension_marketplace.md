# Configure VS Code Extension Marketplace

Configure VS Code Extension Marketplace for features on the GitLab Self-Managed instance.

- Tier: Free, Premium, Ultimate
- Offering: GitLab Self-Managed

The VS Code Extension Marketplace provides access to extensions that enhance the functionality of the
Web IDE and Workspaces. Administrators can configure access to the marketplace for the entire instance.

> [!note]
> To access the VS Code Extension Marketplace, your browser must be able to access the `*.cdn.web-ide.gitlab-static.net` assets host.
> This security requirement ensures that third-party extensions run in isolation and cannot access your account.

## Access VS Code Extension Marketplace settings

Prerequisites:

- You must be an administrator.

To access the VS Code Extension Marketplace settings:

1. In the upper-right corner, select .
1. In the left sidebar, select  > .
1. Expand .

## Enable the extension registry

By default, the GitLab instance is configured to use the [Open VSX](https://open-vsx.org/)
extension registry. To enable the extension marketplace with this default configuration:

Prerequisites:

- You must be an administrator.

To enable the extension marketplace:

1. Go to the [VS Code Extension Marketplace settings](#access-vs-code-extension-marketplace-settings).
1. Turn on the  toggle.

## Modify the extension registry

Prerequisites:

- You must be an administrator.

To modify the extension registry:

1. Go to the [VS Code Extension Marketplace settings](#access-vs-code-extension-marketplace-settings).
1. Expand .
1. Turn off the  toggle.
1. Enter full URLs for a VS Code extension registry's , , and .
1. Select .

After you modify the extension registry:

- Active Web IDE or Workspace sessions continue to use their previous registry until refreshed.
- All users must [integrate their account with the new registry](../../user/profile/preferences.md#integrate-with-the-extension-marketplace) before they can use extensions.
