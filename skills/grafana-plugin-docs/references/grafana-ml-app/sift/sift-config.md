---
title: "Sift configuration | Grafana Plugins documentation"
description: "Configure Sift to run customized investigations"
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Sift configuration

> Note
>
> Sift’s configuration can only be edited by users with the Editor or Admin role.

The Sift configuration page lists the checks that will currently attempt to run along with their current configuration. Checks can be disabled by clicking the **Disable** button.

Some checks allow you to customize their parameters. This can be used to alter the title, override the datasource, increase the sensitivity or reduce the noise of Sift checks, for example.

To do so, click the **Edit** button next to the check instance. The modal that appears shows the current values for each setting, with the default value shown in the placeholder if no custom value has been set. See the tooltips or the documentation below for details on each setting.

All check instances have a **Title** field which determines how the check instance is referred to in investigations. This can be customized to provide more detail in specific cases.

Many checks also contain a **Datasource** field. By default, Sift will automatically detect the best instance of a datasource for the check by searching through the available datasources in Grafana for the instance with the most series, streams, or labels matching the current investigation’s labels. You may tell Sift to skip this check and always use a specific datasource by setting this field.

## Running checks multiple times

By default, a Sift investigation attempts to run each of its checks once using the default values for each of that check’s fields. The results of each check will be shown in the investigation page, with the check’s name shown on the left of the page.

Some checks require specific sets of labels to run. If those labels aren’t present on a given investigation, the check will be skipped. These labels are documented per-check in the [Sift analyses documentation](/docs/grafana-cloud/alerting-and-irm/machine-learning/sift/analyses/).

In some cases you may want Sift to run a check more than once with different configurations for each instance. An example of this could be searching for patterns in error logs with different initial queries.

When you click the **+ Add** button, a new instance of a check with the default configuration is created. It is recommend that you change the title of the check instances to make them easier to distinguish when viewing investigation results.

### Limiting when Sift checks run

Sift allows you to limit when an instance of a check runs based on the labels of an investigation. The conditions for a check run are expressed using PromQL selectors, e.g. `app="shopping-cart"` or `environment=~"prod.+"`. You can combine conditions using ‘AND’ and ‘OR’ to ensure checks only run when you need them to.

To add conditions for when a check is run, go to the Conditions section and click the **+ Add condition** button in the config modal. This adds a condition with some inputs for label names and values; within this condition, every label must match the selector for the check to run (the labels are combined using ‘AND’ logic). To express an ‘OR’, click the **+Add condition** button again and add your second condition to the new input field.

For example, you may have a specific log query which you only want to run whenever an investigation triggers matching the PromQL selector `{namespace="gateway", cluster=~"prod.+"}`. To express this, click the **+Add condition** button once, then type ’namespace’ into the **Label name** box and ‘gateway’ into the **Label value** box. Next click **+ Add label** and type ‘cluster’ into the **Label name** box, change the selector type to `~=`, and type ‘prod.+’ into the **Label value** box.
