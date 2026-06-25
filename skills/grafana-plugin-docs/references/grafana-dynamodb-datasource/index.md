---
title: "DynamoDB data source for Grafana | Grafana Enterprise Plugins documentation"
description: "DynamoDB data source for Grafana The DynamoDB data source allows a direct connection to DynamoDB to query and visualize DynamoDB data in Grafana. This data source supports PartiQL and provides an editor to format and color code your PartiQL statements."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# DynamoDB data source for Grafana

The DynamoDB data source allows a direct connection to DynamoDB to query and visualize DynamoDB data in Grafana.

This data source supports PartiQL and provides an editor to format and color code your PartiQL statements.

DynamoDB plugin is available for the following account types:

- Users with a [Grafana Cloud](/products/cloud/) Free, Advanced or Trial account or with an [activated Grafana Enterprise license](/docs/grafana/latest/enterprise/license/activate-license/).

## Installation

For detailed instructions on how to install the plugin on Grafana Cloud or locally, please checkout the [Plugin installation docs](/docs/grafana/latest/plugins/installation/).

### Manual configuration

Once the plugin is installed on your Grafana instance, follow [these instructions](/docs/grafana/latest/datasources/add-a-data-source/) to add a new DynamoDB data source, and enter configuration options.

### Configuration options

The DynamoDB Data Source uses [the AWS SDK for Go](https://aws.github.io/aws-sdk-go-v2/docs/configuring-sdk) to connect to your DB cluster with AWS IAM Credentials. There are a few possible ways to configure your data source instance with Grafana to specify how you’d like to connect with AWS:

Expand table

| Configuration Option    | Details                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
|-------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Authentication Provider | Depending on the environment in which it is run, Grafana supports different authentication providers such as keys, a credentials file, or using the “Default” provider from AWS which supports using service-based IAM roles. These providers can be manually enabled/disabled with the allowed\_auth\_providers field. To read more about supported authentication providers please see [the Cloud Watch Data Source’s documentation](/docs/grafana/latest/datasources/aws-cloudwatch/aws-authentication/#select-an-authentication-method) |
| Access Key              | A required field, Enter AWS Access Key                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| Secret Key              | A required field, Enter AWS Access Secret Key.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| Default Region          | A required field, Specify the region of your cluster.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| Endpoint                | An optional field, by default, all requests will use whatever endpoint is specified in the [aws sdk](https://github.com/aws/aws-sdk-go-v2) however if you would like to override this, you can.                                                                                                                                                                                                                                                                                                                                             |

### Configure data source with a provision file

It is possible to configure data sources using configuration files with Grafana’s provisioning system. To read about how it works, including all the settings that you can set for this data source, refer to [Provisioning Grafana data sources](/docs/grafana/latest/administration/provisioning/#data-sources).

Here are some provisioning examples for this data source using basic authentication:

YAML [Copy code to clipboard] Copy

```yaml
apiVersion: 1
datasources:
  - name: DynamoDB
    type: grafana-dynamodb-datasource
    jsonData:
      authType: keys
      endpoint: local/remote endpoint
      defaultRegion: us-west-2
      migrated: true
    secureJsonData:
      accessKey: <YOUR ACCESS KEY>
      secretKey: <YOUR SECRET KEY>
```

or for ~.aws/credentials

YAML [Copy code to clipboard] Copy

```yaml
apiVersion: 1
datasources:
  - name: DynamoDB
    type: grafana-dynamodb-datasource
    jsonData:
      authType: credentials
      endpoint: local/remote endpoint
      profile: <YOUR PROFILE>
      defaultRegion: us-west-2
      migrated: true
    secureJsonData:
```

### Time series

Time series visualization options are selectable after adding a `datetime` field type to your query. This field will be used as the timestamp. You can select time series visualizations using the visualization options. Grafana interprets timestamp rows without explicit time zone as UTC. Any column except `time` is treated as a value column.

#### Multi-line time series

To create multi-line time series, the query must return at least 3 fields in the following order:

- Field 1: `datetime` field with an alias of `time`
- Field 2: value to group by
- Field 3+: the metric values

For example:

SQL [Copy code to clipboard] Copy

```sql
SELECT log_time AS time, machine_group, avg(disk_free) AS avg_disk_free
FROM mgbench.logs1
GROUP BY machine_group, log_time
ORDER BY log_time
```

### Templates and variables

To add a new DynamoDB query variable, refer to [Add a query variable](/docs/grafana/latest/variables/variable-types/add-query-variable/).

After creating a variable, you can use it in your DynamoDB queries by using [Variable syntax](/docs/grafana/latest/variables/syntax/). For more information about variables, refer to [Templates and variables](/docs/grafana/latest/variables/).

### Known limitations

Currently querying data from nested maps is not supported and will return null value.

## Learn more

- Add [Annotations](/docs/grafana/latest/dashboards/annotations/).
- Configure and use [Templates and variables](/docs/grafana/latest/variables/).
- Add [Transformations](/docs/grafana/latest/panels/transformations/).
- Set up alerting; refer to [Alerts overview](/docs/grafana/latest/alerting/).
