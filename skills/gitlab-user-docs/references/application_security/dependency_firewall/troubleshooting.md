# Troubleshoot the dependency firewall

Diagnose blocked packages, bypass policies, and understand caching behavior.

- Tier: Premium, Ultimate
- Offering: GitLab.com, GitLab Self-Managed
- Status: Beta

## A package manager reports `403 Forbidden`

An `enforced` policy matched the package. The run summary names the package and the policy that
matched. You can also find the matching rule in the project's `dependency_firewall_blocked`
audit event, or on the dependency firewall dashboard.

A `403` from the firewall carries the header `X-Gitlab-Dependency-Firewall: blocked`. Use it to
tell a firewall block apart from a `403` returned by the registry itself.

To resolve the block, do one of the following:

- Remove the package, or upgrade to a version that does not match the rule.
- Add a [PURL exception](_index.md#rule-exceptions) for the package.
- Change the policy `enforcement_type` to `warn` while you investigate.
- Add the user or access token to [bypass settings](_index.md#bypass-settings).

To find a version that is not blocked, check specific versions with `glab df package`. For
example, `glab df package pkg:npm/left-pad@1.3.1`. For more information, see
[Check a single package](gitlab_cli.md#check-a-single-package).

## A package is blocked and the reason is `policy check failed`

When the CLI cannot evaluate a package, it blocks the package. The summary reason starts with
`policy check failed:`. No policy matched the package. The evaluation request failed because of
a network error, a timeout after 60 seconds, a server error (`503`), rate limiting (`429`), or a
permission error (`403`).

To resolve the block:

- Run the command again. The CLI retries a failed check on the next request.
- Check that you have at least the Reporter role on the project. In CI/CD jobs, check the role
  of the user who triggered the job.
- Check your network connection to GitLab.

For more information, see [When GitLab can't evaluate a package](gitlab_cli.md#when-gitlab-cant-evaluate-a-package).

## Bypass a policy

You might need to allow a package that an active policy would otherwise block. For example, a
service account must install an internal package whose license is on the deny list, or a
security responder must download a quarantined package during an incident.

To bypass a policy:

1. Identify the user ID or access token ID that needs to bypass the policy. To find a user ID,
   view the user's profile and append `.json` to the URL. To find an access token ID, view the
   project or group access token list.
1. In the top bar, select **Search or go to** and find your group or project.
1. Select **Secure** > **Policies**.
1. In the policy row, select **Edit**.
1. Expand **Advanced**, then add the user or token under **Bypass settings**.
1. Select **Configure with a merge request**, then review and merge it.

In **.yaml mode**, add a `bypass_settings` block instead. The following block lets user `1234`
and access token `5678` bypass the policy:

```yaml
bypass_settings:
  users:
    - id: 1234
  access_tokens:
    - id: 5678
```

If you cannot modify the policy, consider these alternatives:

- Add a [PURL exception](_index.md#rule-exceptions) for a single package.
- Add a CVE [ID exception](_index.md#rule-exceptions) for a single vulnerability.
- Change the policy `enforcement_type` to `warn` while you investigate.

## No packages are evaluated

When a `glab df` command runs but no summary is printed, no package was warned on or blocked.
The CLI never records allowed packages. Check the following:

- The CLI did not print a line that starts with `dependency firewall not evaluating` to
  standard error. That line means the firewall is turned off, or GitLab cannot find the project
  or your token cannot access it. The CLI then allows every package for the rest of the run.
- The dependency firewall is turned on. See
  [Turn on the dependency firewall](_index.md#turn-on-the-dependency-firewall).
- A security policy project with a dependency firewall policy is linked to the project or one of
  its parent groups.
- The command ran in a Git checkout whose remote points at the right GitLab project. The CLI
  resolves the project from the Git remote.
- The package manager actually fetched packages over the network rather than reading them from
  a local cache.
- The ecosystem is supported.

To check whether a specific package matches a policy, run `glab df package`. For more
information, see [Check a single package](gitlab_cli.md#check-a-single-package).

## Cached packages are not evaluated

Package managers install from a local cache without contacting a registry. Maven reads from
`~/.m2/repository/`, Gradle from `~/.gradle/caches/`, npm from `node_modules/`, and Bundler
from `vendor/bundle/`. The firewall evaluates a package only when the package manager fetches
it over the network.

To force re-evaluation, clear the cache before you install. In CI/CD jobs, do not restore the
package manager cache between jobs if you want every package to be evaluated.

## Policy changes do not take effect

Policy changes committed through a merge request take effect when the merge request is merged.
Policy changes committed directly to the default branch of the security policy project can take
up to 10 minutes to take effect. For more information, see
[Security policy projects](../policies/enforcement/security_policy_projects.md).

Evaluation results are also cached for the lifetime of a single `glab df` run. A policy change
made during a run does not apply until the next run.

## Requests fail with a TLS certificate error

The CLI inspects package manager traffic through a local proxy, which requires the package
manager to trust the proxy certificate. The CLI configures that trust for you, and preserves
any certificate bundle you have already set.

The CLI removes any `HTTP_PROXY`, `HTTPS_PROXY`, and `NO_PROXY` variables it inherits and sets
its own, so those variables are not the cause.

If requests still fail, check the following:

- Per-package-manager certificate options in files such as `.npmrc` that override the one the
  CLI sets.
- The registry certificate. The local proxy verifies the registry certificate against the
  operating system trust store only. The CLI keeps CA bundles you set for the package manager,
  such as `NODE_EXTRA_CA_CERTS`, `PIP_CERT`, `REQUESTS_CA_BUNDLE`, and `SSL_CERT_FILE`, for the
  connection between the package manager and the local proxy. It does not use them to verify the
  registry. A private registry with a certificate from an internal CA fails unless that CA is in
  the operating system trust store.
- The registry URL. A registry configured with a plain `http://` URL fails. The proxy accepts
  HTTPS traffic only and refuses plain HTTP rather than letting it bypass inspection.
- Your network. The local proxy connects to the registry directly and does not use an outbound
  corporate proxy, so `glab df` cannot reach registries in a network that requires one.
