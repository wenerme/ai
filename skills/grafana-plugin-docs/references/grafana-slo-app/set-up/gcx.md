---
title: "Use gcx to manage SLO resources | Grafana Plugins documentation"
description: "Use the gcx CLI to list, inspect, monitor, delete, and provision SLO definitions and SLO reports."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Use `gcx` to manage SLO resources

[`gcx`](https://grafana.com/docs/grafana/latest/ai-tools/grafana-cli/gcx/) is a command-line interface (CLI) that you and coding agents can use to manage Grafana resources. It provides two ways to manage SLO resources:

- [`gcx slo`](https://grafana.com/docs/plugins/grafana-slo-app/latest/set-up/gcx/#manage-resources-with-gcx-slo) commands to list, inspect, monitor, and delete SLO definitions and SLO reports. You and coding agents can use them to check the health of your SLOs and view how the SLI changes over time.
- [`gcx resources`](https://grafana.com/docs/plugins/grafana-slo-app/latest/set-up/gcx/#manage-resources-with-gcx-resources) commands to export and provision SLO definitions and SLO reports as manifest files. Use them to create and update SLOs and keep them in version control.

## Before you begin

1. [Install `gcx`](https://grafana.com/docs/grafana/latest/ai-tools/grafana-cli/gcx/installation/).
2. [Authenticate `gcx`](https://grafana.com/docs/grafana/latest/ai-tools/grafana-cli/gcx/authentication/) with the preferred method for your Grafana Cloud stack.
3. To check which configuration `gcx` uses, run:

   Bash ![Copy code to clipboard](https://grafana.com/media/images/icons/icon-copy-small-2.svg) Copy

   ```bash
   gcx config view
   ```

## Manage resources with `gcx slo`

Use `gcx slo` to inspect and manage SLO definitions and SLO reports:

Expand table

| Command                                                                                                                      | Operations                                    |
|------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------|
| [`gcx slo definitions`](https://grafana.com/docs/grafana/latest/ai-tools/grafana-cli/gcx/cli-reference/#gcx-slo-definitions) | `list`, `get`, `status`, `timeline`, `delete` |
| [`gcx slo reports`](https://grafana.com/docs/grafana/latest/ai-tools/grafana-cli/gcx/cli-reference/#gcx-slo-reports)         | `list`, `get`, `status`, `timeline`, `delete` |

Coding agents can also use `gcx slo` to understand the state of your system, such as which SLOs are breaching their objectives and how their error budgets change over time.

The `gcx slo definitions` and `gcx slo reports` commands support the same operations and arguments. The following examples use SLO definitions:

- [**List**](https://grafana.com/docs/grafana/latest/ai-tools/grafana-cli/gcx/cli-reference/#gcx-slo-definitions-list) all SLO definitions.

  Bash ![Copy code to clipboard](https://grafana.com/media/images/icons/icon-copy-small-2.svg) Copy

  ```bash
  gcx slo definitions list
  ```

  output ![Copy code to clipboard](https://grafana.com/media/images/icons/icon-copy-small-2.svg) Copy

  ```output
  ┌───────────────────────┬──────────────────┬────────┬────────┬─────────┐
  │ UUID                  │ NAME             │ TARGET │ WINDOW │ STATUS  │
  ├───────────────────────┼──────────────────┼────────┼────────┼─────────┤
  │ gxqieubrb1s3d1ex6meoh │ Latency SLO      │ 99.00% │ 28d    │ updated │
  │ a835ucvmpqa1gd7szlsuk │ Availability SLO │ 99.90% │  7d    │ updated │
  └───────────────────────┴──────────────────┴────────┴────────┴─────────┘
  ```
- [**Get**](https://grafana.com/docs/grafana/latest/ai-tools/grafana-cli/gcx/cli-reference/#gcx-slo-definitions-get) a single SLO definition by its UUID. The output is YAML by default. Use `-o json` for JSON. Redirect the output to a file to read or edit it:

  Bash ![Copy code to clipboard](https://grafana.com/media/images/icons/icon-copy-small-2.svg) Copy

  ```bash
  gcx slo definitions get <UUID> -o yaml > slo.yaml
  ```
- Show the [**status**](https://grafana.com/docs/grafana/latest/ai-tools/grafana-cli/gcx/cli-reference/#gcx-slo-definitions-status) of all SLO definitions, or pass a UUID to show a single SLO. The status includes the current SLI, the error budget, and the health of each SLO:

  Bash ![Copy code to clipboard](https://grafana.com/media/images/icons/icon-copy-small-2.svg) Copy

  ```bash
  gcx slo definitions status
  ```

  output ![Copy code to clipboard](https://grafana.com/media/images/icons/icon-copy-small-2.svg) Copy

  ```output
  ┌──────────────────┬──────┬───────────┬────────┬─────────┬────────┬────────┐
  │ NAME             │ UUID │ OBJECTIVE │ WINDOW │ SLI     │ BUDGET │ STATUS │
  ├──────────────────┼──────┼───────────┼────────┼─────────┼────────┼────────┤
  │ Latency SLO      │  *   │ 99.00%    │ 28d    │ 89.85%  │ 66.2%  │ OK     │
  │ Availability SLO │  *   │ 99.90%    │ 7d     │ 100.00% │ 100.0% │ OK     │
  └──────────────────┴──────┴───────────┴────────┴─────────┴────────┴────────┘
  ```

  Use `-o wide` to include the burn rate and the 1-hour and 1-day SLI columns:

  output ![Copy code to clipboard](https://grafana.com/media/images/icons/icon-copy-small-2.svg) Copy

  ```output
  ┌──────────────────┬──────┬───────────┬────────┬─────────┬────────┬───────────┬─────────┬─────────┬────────┐
  │ NAME             │ UUID │ OBJECTIVE │ WINDOW │ SLI     │ BUDGET │ BURN_RATE │ SLI_1H  │ SLI_1D  │ STATUS │
  ├──────────────────┼──────┼───────────┼────────┼─────────┼────────┼───────────┼─────────┼─────────┼────────┤
  │ Latency SLO      │  *   │ 99.00%    │ 28d    │ 89.85%  │ 66.2%  │ 0.35x     │ 89.95%  │ 89.66%  │ OK     │
  │ Availability SLO │  *   │ 99.90%    │  7d    │ 100.00% │ 100.0% │ 0.00x     │ 100.00% │ 100.00% │ OK     │
  └──────────────────┴──────┴───────────┴────────┴─────────┴────────┴───────────┴─────────┴─────────┴────────┘
  ```
- Render the [**timeline**](https://grafana.com/docs/grafana/latest/ai-tools/grafana-cli/gcx/cli-reference/#gcx-slo-definitions-timeline) of the SLI as a line chart. By default, it shows the last 7 days:

  Bash ![Copy code to clipboard](https://grafana.com/media/images/icons/icon-copy-small-2.svg) Copy

  ```bash
  gcx slo definitions timeline --since 24h
  ```

  [](https://grafana.com/media/docs/grafana-cloud/slo/gcx-slo-definitions-output.png)

  To set an exact range, use `--from`, `--to`, and `--step`, for example `--from now-24h --to now --step 5m`.
- [**Delete**](https://grafana.com/docs/grafana/latest/ai-tools/grafana-cli/gcx/cli-reference/#gcx-slo-definitions-delete) one or more SLO definitions by their UUIDs:

  Bash ![Copy code to clipboard](https://grafana.com/media/images/icons/icon-copy-small-2.svg) Copy

  ```bash
  gcx slo definitions delete <UUID>
  ```

  `gcx` asks for confirmation before it deletes the SLO definition. To skip the prompt, add `--force`.

## Manage resources with `gcx resources`

Use `gcx resources` to export SLO definitions and SLO reports as manifest files, and to create, update, or provision them from those files.

`gcx resources` supports the following SLO resource types. To list them, run:

Bash ![Copy code to clipboard](https://grafana.com/media/images/icons/icon-copy-small-2.svg) Copy

```bash
gcx resources list-types --no-schema -o text | grep slo
```

output ![Copy code to clipboard](https://grafana.com/media/images/icons/icon-copy-small-2.svg) Copy

```output
slo.ext.grafana.app   v1alpha1   reports
slo.ext.grafana.app   v1alpha1   slos
```

Use `pull` to export existing SLO definitions and SLO reports to a local directory:

Bash ![Copy code to clipboard](https://grafana.com/media/images/icons/icon-copy-small-2.svg) Copy

```bash
gcx resources pull slos reports --path ./slo-config/
```

By default, `gcx resources pull` writes JSON and names each file after `metadata.name`, which is the UUID.

Use `push` to provision the SLO definitions and SLO reports saved in the directory:

Bash ![Copy code to clipboard](https://grafana.com/media/images/icons/icon-copy-small-2.svg) Copy

```bash
gcx resources push slos reports --path ./slo-config/
```

To push one resource, add its `metadata.name` to the selector:

Bash ![Copy code to clipboard](https://grafana.com/media/images/icons/icon-copy-small-2.svg) Copy

```bash
gcx resources push slos/<UUID> --path ./slo-config/
```

> Note
>
> Pushing an existing resource updates it.
