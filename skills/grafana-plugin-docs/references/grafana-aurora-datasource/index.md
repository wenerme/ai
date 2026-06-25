---
title: "Amazon Aurora data source | Grafana Enterprise Plugins documentation"
description: "This document introduces the Aurora data source"
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Amazon Aurora data source

Query and visualize your data from Amazon Aurora with Grafana. This data source plugin is currently in [public preview](/docs/release-life-cycle/#public-preview).

## Introduction

With the Amazon Aurora data source you can easily query and visualize your data in Amazon Aurora. This plugin currently supports both MySQL-compatible and Postgres-compatible Aurora Engines.

## Requirements

This plugin was designed for Enterprise versions of Grafana 9.4.7 and above, although it may work for older versions as well.

This plugin connects to AWS Aurora clusters using IAM with the AWS SDK for Go. Please read through the [Prerequisites section of the “Connecting to your DB cluster using IAM authentication and the AWS SDK for Go” guide from AWS](https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/UsingWithRDS.IAMDBAuth.Connecting.Go.html) on how to connect to your DB cluster using IAM to ensure Grafana will be able to query your cluster.

### Example permissions

As part of the above, please ensure whatever user/role that you are using to query Aurora has the appropriate permissions. For example:

[Copy code to clipboard] Copy

```none

{
   "Version": "2012-10-17",
   "Statement": [
      {
         "Effect": "Allow",
         "Action": [
             "rds-db:connect"
         ],
         "Resource": [
             "arn:aws:rds-db:us-east-2:1234567890:dbuser:cluster-ABCDEFGHIJKL01234/db_user"
         ]
      }
   ]
}
```

For more information, please read through [the documentation from AWS](https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/UsingWithRDS.IAMDBAuth.IAMPolicy.html)

## Getting started

1. [Install the plugin](/docs/grafana/latest/administration/plugin-management/#install-grafana-plugins)
2. [Add a new data source with the UI](/docs/grafana/latest/datasources/#add-a-data-source) or [provision one](/docs/grafana/latest/administration/provisioning/)
3. [Configure the data source](#configuration-options)
4. [Start making queries](#querying)

### Configuration options

The Amazon Aurora Data Source uses [the AWS SDK for Go](https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/UsingWithRDS.IAMDBAuth.Connecting.Go.html) to connect to your DB cluster with AWS IAM Credentials. There are a few possible ways to configure your data source instance with Grafana to specify how you’d like to connect with AWS:

Expand table

| Configuration Option    | Details                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
|-------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Authentication Provider | Depending on the environment in which it is run, Grafana supports different authentication providers such as keys, a credentials file, or using the “Default” provider from AWS which supports using service-based IAM roles. These providers can be manually enabled/disabled with the allowed\_auth\_providers field. To read more about supported authentication providers please see [the Cloud Watch Data Source’s documentation](/docs/grafana/latest/datasources/aws-cloudwatch/aws-authentication/#select-an-authentication-method) |
| Assume Role ARN         | an optional field, to be used if you would like whatever provider you selected above to assume a role.                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| External Id             | An optional field, sometimes used when assuming a role.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| Endpoint                | An optional field, by default, all requests will use whatever endpoint is specified in the [aws sdk](https://github.com/aws/aws-sdk-go-v2) however if you would like to override this, you can.                                                                                                                                                                                                                                                                                                                                             |
| Default Region          | Specify the region of your cluster.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| Engine                  | Choose which Aurora Engine your cluster uses. At this time we provide support for PostgreSQL and MySQL compatible engines.                                                                                                                                                                                                                                                                                                                                                                                                                  |
| Database Name           | An optional field, used to create the DSN.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| Database User           | Used to create the DSN.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| Database Host           | Used to create the DSN (note: it is recommended you choose specify a read-only connection, as there is nothing in the Grafana UI that will prevent writes to your DB).                                                                                                                                                                                                                                                                                                                                                                      |
| Database Port           | Used to create the DSN.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |

#### Advanced settings

In order to connect to your cluster, Grafana makes 2 calls:

1. Generating an auth token with RDS with an endpoint
2. Opening a connection to your DSN with that token and your endpoint.

Often the endpoint for these two steps is the same. However if you have your DB cluster behind a load balancer you may need 2 separate endpoints. For the first step you will need to specify the endpoint behind the load balancer. For the second step you will need to specify the load balancer endpoint for open SQL connections. To have Grafana do this on your behalf, specify the endpoint behind the load balancer in the `DB Host for Auth` and `DB Port for Auth` and use the load balancer endpoint/port configuration fields above.

#### Example of provisioned Aurora data source

If you’re provisioning your data source you can set all of the above configuration options with a YAML file. Here’s an example of what that file might look like:

[Copy code to clipboard] Copy

```none
  - name: AWS Aurora with mysql behind a load balancer
    type: grafana-aurora-datasource
    editable: true
    jsonData:
      engine: 'aurora-mysql'
      authType: keys
      dbName: 'testDatabase'
      dbUser: 'dbuser'
      dbHost: 'aurora-mysql.cluster-123.us-east-1.rds.amazonaws.com'
      dbPort: 3306
      defaultRegion: 'us-east-1'
    secureJsonData:
      accessKey: someAccessKey
      secretKey: someSecretKey
    version: 1
```

Here is another example with a load balancer

[Copy code to clipboard] Copy

```none
  - name: AWS Aurora with mysql behind a load balancer
    type: grafana-aurora-datasource
    editable: true
    jsonData:
      engine: 'aurora-mysql'
      authType: keys
      dbName: 'testDatabase'
      dbUser: 'dbuser'
      dbHost: 'protectedByALoadBalancer.example.com'
      dbPort: 3307
      defaultRegion: 'us-east-1'
      dbPortAuth: 3306
      dbHostAuth 'aurora-mysql.cluster-123.us-east-1.rds.amazonaws.com'
    secureJsonData:
      accessKey: someAccessKey
      secretKey: someSecretKey
    version: 1
```

## Querying

## Table vs time series

As with other SQL data source plugins in Grafana, you can specify whether to return data as a “wide” or “long” time series when querying. This is controlled by the “Format data frames as dropdown”.

To better explain this concept, consider a table like this:

When we render this same query with the time series visualization, we’ll notice that the “neighborhood” and “city” fields collapse into 1 time series:

This is often the desired and expected behavior from a SQL data source, particularly when using the Table Visualization. However, there are times when you may want to render a separate time series for each city/neighborhood combo. To do so, in the “Format data frames as” dropdown select “Time series” which will render that same timeseries visualization like so:

When using Explore, Grafana renders your data using the appropriate time series or table visualization automatically when you change the format. With the query editor in dashboards, users control how to visualize the data.

To learn more, refer to the [Grafana documentation time series formats](/developers/dataplane/timeseries).

## Variables and macros

This plugin supports both custom and global variables to make writing queries easier. For example, if you set a custom variable to be `$tableName` you can use the same query in a dashboard across multiple tables:

[Copy code to clipboard] Copy

```none
select * from $tableName limit 3;
```

> Note
>
> Variables don’t work with Grafana Alerting.

This plugin also supports macros from [the sql util](https://github.com/grafana/grafana-plugin-sdk-go/blob/main/data/sqlutil/macros.go) library such as `$__timeFrom` and `$__timeTo`. For example:

[Copy code to clipboard] Copy

```none
select * from test_table where $__timeFrom(recorded_at) and $__timeTo(recorded_at)
```

If you have a suggestion for a macro unique to the Amazon Aurora data source, feel free to reach out to Customer Support.
