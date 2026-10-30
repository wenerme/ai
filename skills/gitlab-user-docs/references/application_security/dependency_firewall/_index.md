# Dependency firewall

Block packages with disallowed licenses, high vulnerability risk, or malicious code before a package manager installs them.

- Tier: Premium, Ultimate
- Offering: GitLab.com, GitLab Self-Managed
- Status: Beta

- [Introduced](https://gitlab.com/groups/gitlab-org/-/epics/22189) in GitLab 19.0 as an
  [experiment](../../../policy/development_stages_support.md).
- Changed to [beta](../../../policy/development_stages_support.md) in GitLab
  19.5. Available in Premium and Ultimate on GitLab.com and GitLab Self-Managed.
  GitLab Dedicated support is planned for general availability.

> [!note]
> The dependency firewall is in [beta](../../../policy/development_stages_support.md#beta).
> The policy schema and supported ecosystems might change between releases.
>
> The dependency firewall is free during beta. It is planned to become a paid feature, billed
> through [GitLab Credits](../../../subscriptions/gitlab_credits.md). You must opt in before you
> are charged, and GitLab gives notice first.

Use the dependency firewall to control which packages your developers and CI/CD jobs install.
Run your package manager through the [GitLab CLI](../../../editor_extensions/gitlab_cli/_index.md)
with `glab dependency-firewall`, or its shorter alias `glab df`. GitLab checks each package
against your dependency firewall policies before the package reaches your machine. Policies
match packages by license, vulnerability risk, and malicious code.

The firewall works with the registries your project already uses, such as npmjs.com, PyPI,
Maven Central, or RubyGems.org. GitLab does not host or mirror the packages it evaluates, so you
do not have to move your dependencies into the GitLab package registry or change your registry
configuration.

For each package, the firewall returns one of these outcomes:

- Allowed: The package manager fetches the package as usual.
- Warned: The package manager fetches the package, and the CLI reports it.
- Blocked: The firewall refuses the package, and the package manager receives a
  `403 Forbidden` response.

GitLab records each decision as an [audit event](#view-audit-events).

## Supported ecosystems

| Ecosystem | Package managers |
|-----------|------------------|
| Java      | Maven, Gradle |
| Node.js   | npm, pnpm, Yarn |
| Python    | pip, uv, Poetry, pipenv, twine |
| Ruby      | RubyGems, Bundler |

Packages in other ecosystems are fetched without evaluation.

For the command to use with each package manager, see
[`glab dependency-firewall`](https://docs.gitlab.com/cli/dependency-firewall/).

The CLI connects to registries directly, over HTTPS only, and refuses plain `http://` requests.
It does not use an outbound corporate proxy, so `glab df` cannot reach registries in a network
that requires one.

## Turn on the dependency firewall

Turn on the dependency firewall before you create policies. While the firewall is off, GitLab
does not evaluate packages, and `glab df` allows every package.

### GitLab.com

On GitLab.com, you turn on the firewall for each top-level group. Subgroups and projects inherit
the setting from their top-level group.

Prerequisites:

- The Owner role for the top-level group.

To turn on the dependency firewall:

1. In the top bar, select **Search or go to** and find your top-level group.
1. In the left sidebar, select **Settings** > **Secure**.
1. Turn on the **Enable dependency firewall** toggle.

### GitLab Self-Managed

On GitLab Self-Managed, you turn on the firewall once for the whole instance. The setting
applies to every project on the instance. There is no per-group toggle.

Prerequisites:

- Administrator access.

To turn on the dependency firewall:

1. In the upper-right corner, select **Admin**.
1. In the left sidebar, select **Settings** > **Security and compliance**.
1. Expand **Dependency firewall**.
1. Select the **Enable dependency firewall** checkbox.
1. Select **Save changes**.

To turn off the firewall, repeat the steps for your offering and turn the setting off. Existing
policies are preserved, but the firewall stops evaluating packages.

## Use the dependency firewall

Run your package manager through the GitLab CLI to check each package against your policies. You
can run it on your machine or in a CI/CD job.

Prerequisites:

- The dependency firewall turned on for your group or instance.
- The GitLab CLI installed and authenticated.
- The Reporter, Security Manager, Developer, Maintainer, or Owner role for the project.

To get started, follow the [dependency firewall tutorial](quickstart.md).

### Use the dependency firewall in CI/CD

In a CI/CD job, run your package manager through `glab df` in the job script, and set the
`GLAB_ENABLE_CI_AUTOLOGIN` CI/CD variable to `true`. The CLI then signs in with the CI/CD job
token, so the job needs no other credentials.

The job token can evaluate packages for its own project only. The user who triggered the job
needs one of the roles listed in the prerequisites.

For an example job that fails when any package is blocked, see
[`glab dependency-firewall ci-summary`](https://docs.gitlab.com/cli/dependency-firewall/ci-summary/).

## Prevent bypassing the firewall

The firewall evaluates only the traffic that `glab df` can see. A package manager run on its
own installs whatever it resolves, and so does an AI coding agent that calls a package manager
for you. Neither reaches the firewall, so neither sees a block.

Packages already in a package manager cache are also not re-evaluated. Maven reads from
`~/.m2/repository/`, npm from `node_modules/`, and Bundler from `vendor/bundle/`. The firewall
evaluates a package only when the package manager fetches it over the network.

To close that gap, enforce the firewall at your network egress point instead of relying on
every caller to remember the prefix.

The CLI adds the following header to every request it forwards to a registry, including
metadata and index requests, and requests for allowed and warned packages:

```plaintext
X-Gitlab-Dependency-Firewall: allowed
```

Configure your egress proxy or gateway to allow HTTPS traffic to package registries only when
that header is present. A package manager that runs outside `glab df` sends no such header, so
the request is refused at the network boundary rather than quietly succeeding.

This control needs:

- An egress control point that inspects HTTPS traffic. The header travels inside the TLS
  session the CLI opens to the registry, so a gateway that sees only the destination host
  cannot read it.
- A rule for each registry hostname your teams use, such as `registry.npmjs.org`, `pypi.org`,
  `files.pythonhosted.org`, `repo.maven.apache.org`, and `rubygems.org`.

The header is set by the CLI, so this is a guardrail rather than a boundary. It stops a package
manager or agent that does not know about the header. A caller that sets the header itself
still reaches the registry.

The header also does not prove that a policy evaluated the request. The CLI adds it even when
the firewall is not evaluating the project, for example when the firewall is turned off or the
project cannot be found. The header shows only that the request went through `glab df`. The CLI
never forwards blocked packages.

Some configurations also send traffic around the CLI. For example, an `http_proxy:` setting in a
`gemrc` file takes precedence over the proxy settings the CLI applies for `gem` and `bundle`, so
that traffic is not inspected. RubyGems reads the system `gemrc` file, `~/.gemrc`, and the file
named by the `GEMRC` variable. It does not read these files from the repository, so a committed
project file cannot cause this, but a CI image or a developer machine can.

## Create a dependency firewall policy

Dependency firewall policies are stored in the `.gitlab/security-policies/policy.yml` file of a
[security policy project](../policies/enforcement/security_policy_projects.md). Build a policy
in the policy editor, or edit that file in a merge request. GitLab applies policy changes only
when a merge request is merged. For more information, see
[policy editor](../policies/_index.md#policy-editor).

A security policy project can have a maximum of five dependency firewall policies. This limit is
controlled by the `dependency_firewall_policies_per_configuration_limit` application setting.

Creating policies at the group level means the policy applies to every project in the group, as well as its subgroups. Creating a policy at the project level, means the policy applies only to that project.

Prerequisites:

- By default, only group, subgroup, or project Owners have the [permissions](../../permissions.md#project-application-security)
  required to create or assign a security policy project. Alternatively, you can create a custom
  role with the permission to [manage security policy links](../../custom_roles/abilities.md#security-policy-management).

To create a dependency firewall policy:

1. In the top bar, select **Search or go to** and find your group or project.
1. In the left sidebar, select **Secure** > **Policies**.
1. Select **New policy**.
1. In **Dependency firewall policy**, select **Select policy**.
1. Complete the fields. For what each one means, see [Policy schema](#policy-schema).
1. Select **Configure with a merge request**.
1. Review and merge the merge request.

After the merge request is merged, the policy takes effect on the next evaluation.

### Editor modes

The policy editor opens in rule mode, a form that builds the policy for you. Rule mode covers
the name, description, scope, enforcement mode, and rules. Bypass settings are under
**Advanced**.

To write the policy as YAML instead, select .
Use YAML mode to copy a policy between projects, or to use a field that rule mode does not show.

You can switch between the two modes at any time. If the YAML contains an error, rule mode is
turned off until you fix it. For more information, see
[Policy editor](../policies/_index.md#policy-editor).

### Policy schema

A dependency firewall policy has the following top-level fields.

| Field              | Type    | Required | Description |
|--------------------|---------|----------|-------------|
| `name`             | string  | yes      | Name of the policy. Maximum 255 characters. |
| `description`      | string  | no       | Longer description of the policy. |
| `enabled`          | boolean | yes      | Whether the policy is evaluated. Set to `false` to turn off the policy without removing it. |
| `enforcement_type` | string  | yes      | One of `enforced` or `warn`. See [Enforcement modes](#enforcement-modes). |
| `rules`            | array   | yes      | One or more rules. See [Rule types](#rule-types). |
| `bypass_settings`  | object  | no       | Users and access tokens that bypass the policy. See [Bypass settings](#bypass-settings). |
| `policy_scope`     | object  | no       | Groups and projects that the policy applies to. See [Policy scope](#policy-scope). |

### Enforcement modes

The `enforcement_type` field controls what happens when a rule matches:

- `enforced`: The firewall refuses the package. The package manager receives a `403 Forbidden`
  response and the package is not installed.
- `warn`: The firewall fetches the package and reports it in the run summary. Use this mode to
  test a policy before you enforce it.

When no rule in any active policy matches a package, the firewall allows it.

A package that is absent from the package metadata database is also allowed. An allowed outcome
is not an assertion that GitLab holds license or vulnerability data for the package.

### Rule types

A policy must contain at least one rule. Each rule has a `type` field that is one of `license`,
`risk_severity`, or `malicious`. In rule mode, select the type from **Choose a rule type**.

Rules match against the package name, version, and ecosystem. The firewall resolves license,
vulnerability, and malicious package data from the package metadata database and the
[GitLab advisory database](../gitlab_advisory_database/_index.md).

#### License rules

License rules match packages by their SPDX license name. Use `denied` to block packages that
declare any of the listed licenses. Use `allowed` to block packages that declare a license that
is not in the list. The two keys are mutually exclusive.

```yaml
rules:
  - type: license
    denied:
      - name: GNU General Public License v3.0 only
      - name: GNU Affero General Public License v3.0 only
```

```yaml
rules:
  - type: license
    allowed:
      - name: MIT License
      - name: Apache License 2.0
```

#### Risk severity rules

Risk severity rules match packages by how many known vulnerabilities they carry at each
severity. Each entry pairs a `severity` with a `threshold`, which is the maximum number of
vulnerabilities you permit at that severity. A package is denied when it carries more than that
number.

A `threshold` of `0` permits none, so it denies a package that has even one vulnerability at
that severity. A `threshold` of `2` permits two and denies a third.

Severities are `critical`, `high`, `medium`, and `low`. List each severity at most once. Only
`denied` is supported.

The following rule blocks any package with a critical vulnerability, with more than two high
vulnerabilities, or with more than ten medium vulnerabilities:

```yaml
rules:
  - type: risk_severity
    denied:
      - severity: critical
        threshold: 0
      - severity: high
        threshold: 2
      - severity: medium
        threshold: 10
```

Vulnerabilities of unknown severity are never counted.

#### Malicious package rules

Malicious package rules block packages that the GitLab malicious packages data feed has flagged.
Only `denied` is supported, and the single entry must be `is_malicious: true`.

```yaml
rules:
  - type: malicious
    denied:
      - is_malicious: true
```

### Rule exceptions

Each rule supports an optional `exceptions` array. An exception entry is either a package URL
(PURL) or a vulnerability identifier such as a CVE. A matching exception removes the package or
the vulnerability from the evaluation of that rule.

Use PURL exceptions to exempt internal packages from a license or malicious rule. The PURL can
include or omit a version. When the version is omitted, the exception applies to every version
of the package.

```yaml
rules:
  - type: license
    denied:
      - name: GNU General Public License v3.0 only
    exceptions:
      - purl: pkg:npm/my-internal-lib
      - purl: pkg:npm/another-lib@1.2.3
```

Use ID exceptions to exempt specific CVEs from a risk severity rule. An excepted vulnerability
is not counted toward any threshold.

```yaml
rules:
  - type: risk_severity
    denied:
      - severity: high
        threshold: 0
    exceptions:
      - id: CVE-2024-12345
```

### Bypass settings

Bypass settings let specific users or access tokens skip a policy. A request made by a listed
user, or with a listed access token, is allowed, and the bypass reason is recorded.

```yaml
bypass_settings:
  users:
    - id: 1234
  access_tokens:
    - id: 5678
```

To find a user ID, view the user's profile and append `.json` to the URL. To find an access
token ID, view the project or group access token list.

Use bypass settings for service accounts that must install internal packages, or for emergency
access during an incident.

### Policy scope

By default, a dependency firewall policy applies to every project that the policy is enforced
on. Use `policy_scope` to narrow that to a specific set of groups or projects, or to exclude
projects from a broader rollout.

`policy_scope` accepts two keys, `groups` and `projects`. Each key takes an `including` list, an
`excluding` list, or both.

In all cases, each entry is an object with an `id`.

| Field                | Type  | Description |
|----------------------|-------|-------------|
| `groups.including`   | array | Groups that the policy applies to. |
| `groups.excluding`   | array | Groups that the policy does not apply to. |
| `projects.including` | array | Projects that the policy applies to. |
| `projects.excluding` | array | Projects that the policy does not apply to. A `type` of `personal` or `archived` excludes all personal or archived projects. |

For example, the following scope applies the policy to two groups, but excludes one project and
all archived projects in those groups:

```yaml
policy_scope:
  groups:
    including:
      - id: 100
      - id: 101
  projects:
    excluding:
      - id: 555
      - type: archived
```

When `policy_scope` is omitted, the policy applies to every project in the security policy
project's enforcement target.

> [!note]
> Dependency firewall `policy_scope` supports `groups` and `projects` only. Compliance
> frameworks and security attributes are not supported.

### Example policy

The following policy:

- blocks copyleft licenses
- blocks packages that carry critical
- vulnerabilities or more than two high vulnerabilities
- blocks malicious packages
- and exempts an internal library and a known false-positive CVE.

```yaml
---
dependency_firewall_policy:
  - name: Restrict copyleft licenses and high-risk packages
    description: Blocks copyleft-licensed packages, high-risk packages, and malicious packages.
    enabled: true
    enforcement_type: enforced
    rules:
      - type: license
        denied:
          - name: GNU General Public License v3.0 only
          - name: GNU Affero General Public License v3.0 only
        exceptions:
          - purl: pkg:npm/my-internal-lib
      - type: risk_severity
        denied:
          - severity: critical
            threshold: 0
          - severity: high
            threshold: 2
        exceptions:
          - id: CVE-2024-12345
      - type: malicious
        denied:
          - is_malicious: true
    bypass_settings:
      users:
        - id: 1234
    policy_scope:
      projects:
        excluding:
          - type: archived
```

## Edit a dependency firewall policy

Edit a policy in the group or project where it is defined. A policy inherited from a parent group
cannot be edited from a subgroup or project.

Prerequisites:

- The Developer, Maintainer, or Owner role for the security policy project.

To edit a dependency firewall policy:

1. In the top bar, select **Search or go to** and find your group or project.
1. In the left sidebar, select **Secure** > **Policies**.
1. Next to the policy, select the vertical ellipsis () > **Edit**.
1. Edit the policy.
1. Select **Configure with a merge request**.
1. Review and merge the merge request.

The updated policy takes effect on the next evaluation after the merge request is merged.

## Delete a dependency firewall policy

Prerequisites:

- The Developer, Maintainer, or Owner role for the security policy project.

To delete a dependency firewall policy:

1. In the top bar, select **Search or go to** and find your group or project.
1. In the left sidebar, select **Secure** > **Policies**.
1. Next to the policy, select the vertical ellipsis () > **Delete**.
   GitLab opens a merge request that removes the policy.
1. Review and merge the merge request.

After the merge request is merged, the policy no longer applies.

## View the dependency firewall dashboard

Use the dependency firewall dashboard to see how your policies affect the packages your teams
install. The dashboard counts the packages the firewall blocked or warned on over a time period.
It also lists each active policy rule with its mode and how often it was triggered.

Prerequisites:

- The dependency firewall turned on for your group or instance.
- The Security Manager, Developer, Maintainer, or Owner role for the group or project.

To view the dependency firewall dashboard:

1. In the top bar, select **Search or go to** and find your group or project.
1. In the left sidebar, select **Secure** > **Dependency firewall**.
1. Optional. To change the time period from the default of seven days, select **Last 30 days**
   from the dropdown list.

## View audit events

GitLab records a project audit event for every package the firewall evaluates. Each event
includes the package, the operation, the policy name, and the rule that matched. For more
information, see [audit event types](../../compliance/audit_event_types.md#dependency-firewall).

Prerequisites:

- To view events for all users, the Security Manager, Maintainer, or Owner role for the project.
- To view events for your own actions only, the Developer role for the project.

To view audit events:

1. In the top bar, select **Search or go to** and find your project.
1. In the left sidebar, select **Secure** > **Audit events**.

The following audit event types are recorded:

| Event type                    | Recorded when |
|-------------------------------|---------------|
| `dependency_firewall_allowed` | The firewall allows the package, including through a bypass or an exception. |
| `dependency_firewall_warned`  | A `warn` policy matches the package. |
| `dependency_firewall_blocked` | An `enforced` policy matches the package. |

## Troubleshooting

When you use the dependency firewall, you might encounter the following issues.

If GitLab can't evaluate a package, the CLI blocks it. If the firewall isn't evaluating the
project, the CLI allows every package.

### Error: `policy check failed:`

A package is blocked, and its reason in the summary starts with `policy check failed:`.

This issue occurs when the evaluation request fails because of a network error, a timeout
after 60 seconds, a server error (`503`), rate limiting (`429`), or a permission error (`403`),
for example when you do not have the Reporter role.

The CLI retries a failed check the next time the package is requested in the same run.
`glab df package` does not block the package. It exits with `1` instead.

### Warning: `dependency firewall not evaluating`

The CLI prints a line to standard error that starts with `dependency firewall not evaluating`,
and allows every package for the rest of the run.

The line is expected when the firewall is not turned on for the project. You can use the same
commands in every project, whether or not a policy applies.

This issue also occurs when GitLab cannot find the project or your token cannot access it.
To resolve this issue, check your Git remote and your token's access to the project.
