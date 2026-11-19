# Troubleshooting the dependency firewall

Diagnose blocked packages, failed policy checks, caching, and TLS errors.

- Tier: Premium, Ultimate
- Offering: GitLab.com, GitLab Self-Managed
- Status: Beta

## Error: `403 Forbidden`

This error occurs when an `enforced` policy matches the package. The run summary names the package and the policy that
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
[`glab dependency-firewall package`](https://docs.gitlab.com/cli/dependency-firewall/package/).

## Error: `policy check failed`

A package is blocked, and its reason in the summary starts with `policy check failed`.

This issue occurs when the evaluation request fails because of a network error, a timeout
after 60 seconds, a server error (`503`), rate limiting (`429`), or a permission error (`403`),
for example, when you do not have at least the Reporter role.

The CLI retries a failed check the next time the package is requested in the same run.
`glab df package` does not block the package. It exits with `1` instead.

To resolve this issue, check your network connection and your role in the project, then run
the command again.

## Warning: `dependency firewall not evaluating`

The CLI prints a line to standard error that starts with `dependency firewall not evaluating`,
and allows every package for the rest of the run.

The line is expected when the firewall is not turned on for the project. You can use the same
commands in every project, whether or not a policy applies.

This issue also occurs when GitLab cannot find the project or your token cannot access it.
To resolve this issue, check your Git remote and your token's access to the project.

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

If requests still fail, check the following:

- Per-package-manager certificate options in files such as `.npmrc` that override the one the
  CLI sets.
- The registry certificate. If the registry or your outbound proxy uses an internal CA, set
  `ca_cert` to that CA. For more information, see
  [`glab dependency-firewall`](https://docs.gitlab.com/cli/dependency-firewall/).
