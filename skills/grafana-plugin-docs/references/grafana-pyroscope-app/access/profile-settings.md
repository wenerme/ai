---
title: "Profile settings | Grafana Plugins documentation"
description: "Configure available settings for Profiles Drilldown."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Profiles settings

The **Profiles settings** page lets you modify flame graph and function-details options used by Profiles Drilldown.

Expand table

| Features                    | Options        | Explanation                                                                                                                                                                                                                            |
|-----------------------------|----------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Collapsed flame graph**   | Default: Off   | When this feature is active, you can collapse flame graphs to minimize their screen space.                                                                                                                                             |
| **Maximum number of nodes** | Default: 16384 | This setting controls the maximum number of nodes in the flame graph. Higher values render more detail and can increase rendering time.                                                                                                |
| **Enable function details** | Default: On    | Enables mapping of resource usage to lines of source code. If the [GitHub integration](/docs/grafana-cloud/monitor-applications/profiles/pyroscope-github-integration/) is configured, then the source code is downloaded from GitHub. |

## Modify settings

To change the settings for Profiles Drilldown:

1. Sign in to your Grafana instance.
2. Select **Drilldown** &gt; **Profiles** in the left navigation.
3. Select **View/edit tenant settings** in the top toolbar.
4. Change any options as desired.
5. Select **Save settings** to preserve the changes.
