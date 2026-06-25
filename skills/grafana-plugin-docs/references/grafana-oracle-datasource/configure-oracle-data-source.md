---
title: "Configure the Oracle data source | Grafana Enterprise Plugins documentation"
description: "This document describes configuration options for the Oracle data source."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Configure the Oracle data source

Grafana provides a number of configuration options for the Oracle data source. For general information on installing a data source, refer to [Install Grafana plugins](/docs/grafana/latest/administration/plugin-management/#install-grafana-plugins). For general information on adding a data source, refer to [Add a data source](/docs/grafana/latest/administration/data-source-management/#add-a-data-source).

## Before you begin

You must have the `Organization Administrator` role to add data sources. Administrators can also configure the data source via YAML with [Grafana’s provisioning system](/docs/grafana/latest/administration/provisioning/).

In order to add the Oracle data source you must first install the Oracle plugin. Refer to [Installation](/grafana/plugins/grafana-oracle-datasource/?tab=installation) on the Oracle plugin page for installation instructions.

> Note
>
> When adding a data source, ensure the database user you specify has only `SELECT` permissions on the relevant database and tables you want to query. Grafana does not validate the safety of queries, which means they can include potentially harmful SQL statements, such as `DROP TABLE user;`or `DELETE FROM user;`, which could get executed. To minimize this risk, Grafana strongly recommends creating a dedicated Oracle Database user with restricted permissions.

## Configure the data source

To add the Oracle data source, complete the following steps:

1. Install the Oracle plugin.
2. Click **Connections** in the left-side menu.
3. Under **Connections**, click **Add new connection**.
4. Enter **Oracle** in the search bar.
5. Select **Oracle Database** under the **Data Source** section.
6. Click **Add new data source** in the upper right.

You are taken to the **Settings** tab where you will set up your Oracle configuration.

## Configuration options

Following is a list configuration options for Oracle.

- **Name** - The data source name. This is how you refer to the data source in panels and queries. Examples: Oracle Database-1, Oracle-DB-Sales.
- **Default** - Toggle to make this Oracle data source the default pre-selected data source in panels and visualizations.

**Connection:**

You can connect to Oracle via 2 different connection methods, depending on whether you have an on-premise or cloud account.

- **Host with TCP Port** - Connect with a hostname or IP address with the TCP port number.

  - **Host** - Enter the hostname or IP address with TCP port number.
  - **Database** - Enter the name of the database.
- **TNSNames Entry** - *Enterprise only.* Specify a tnsnames.ora entry for connection. **This is not available in Grafana Cloud.**

  - **TNSName** - Use configuration connection specified in the `tnsnames.ora` file.

**Authentication:**

There are 2 authentication methods you can choose in the drop-down. Authentication methods depend on your connection method.

- **Basic authentication** -The only authentication available with the **Host with TCP Port** connection method. Authenticate with a username and password.

  - **User** - The Oracle username with access to the specified database.
  - **Password** - The Oracle password with access to the specified database.
- **Kerberos Authentication** - *Not supported in Grafana Cloud.* Kerberos authentication only works with TNSNames enabled, and must be configured in the `tnsnames.ora` configuration file. Refer to [Kerberos integration](/docs/plugins/grafana-oracle-datasource/latest/oracle-and-kerberos/) for configuration parameters. Follow Oracle’s documentation [Configuring Kerberos Authentication](https://docs.oracle.com/en/database/oracle/oracle-database/19/dbseg/configuring-kerberos-authentication.html#GUID-DF84261F-457A-4B9F-AE41-CDE6FE9178C4) to integrate Oracle with Kerberos.

**Additional settings:**

- **Timezone** - Select the default timezone of the Oracle server in UTC from the drop-down.
- **Connection Pool Size** - Choose the maximum number of connections in the connection pool. Defaults to 50. When set this value will override the environment variable `GF_PLUGINS_ORACLE_DATASOURCE_POOLSIZE`.
- **Dataproxy Timeout** - Choose the maximum time in seconds to wait for a response. Defaults to 120 seconds. When set this value will override the environment variable `GF_DATAPROXY_TIMEOUT`.
- **Prefetch Row Size** - Choose the number of rows to be prefetched. The rows are buffered after each successful query execution and for each subsequent fetch request sent to the database. [More info](https://docs.oracle.com/en/database/oracle/oracle-database/23/refrn/CLIENT_PREFETCH_ROWS.html)

**Private data source connect (PDC):**

- **Private data source connect:** - *Only for Grafana Cloud users.* Private data source connect, or PDC, allows you to establish a private, secured connection between a Grafana Cloud instance, or stack, and data sources secured within a private network. Click the drop-down to locate the URL for PDC. Refer to [Private data source connect](/docs/grafana-cloud/connect-externally-hosted/private-data-source-connect/) for more information on how PDC works and [Configure Grafana private data source connect (PDC)](/docs/grafana-cloud/connect-externally-hosted/private-data-source-connect/configure-pdc/#configure-grafana-private-data-source-connect-pdc) for steps on setting up a PDC connection.

Click **Manage private data source connect** to be taken to your PDC connection page, where you’ll find your PDC configuration details.

Once you have configured your Oracle data source options, click **Save &amp; test** at the bottom to test out your data source connection. You can also remove a connection by clicking **Delete**.

### Configure the data source with provisioning

You can define and configure the Oracle data source in YAML files as part of Grafana’s provisioning system. For more information about provisioning a data source, and for available configuration options, refer to [Provision Grafana](/docs/grafana/latest/administration/provisioning/#datasources).

Following are provisioning examples for the Oracle data source.

TNSNames enabled with basic auth:

YAML [Copy code to clipboard] Copy

```yaml
apiVersion: 1
datasources:
  - name: Oracle (TNS-BASICAUTH)
    type: grafana-oracle-datasource
    access: proxy
    basicAuth: false
    editable: true
    jsonData:
      timezone_name: UTC
      useKerberosAuthentication: false
      useTNSNamesBasedConnection: true
      user: USERNAME
    secureJsonData:
      password: PASSWORD
    url: TNSNAME
    version: 1
```

TNSNames disabled with basic auth:

YAML [Copy code to clipboard] Copy

```yaml
apiVersion: 1
datasources:
  - name: Oracle (Integration)
    type: grafana-oracle-datasource
    access: proxy
    basicAuth: false
    editable: true
    jsonData:
      database: DATABASE
      user: USERNAME
    secureJsonData:
      password: PASSWORD
    url: HOST
    version: 1
```

## Other configurations

You can adjust the Oracle datasource connection details using environment variables or updating the Grafana Server configuration file.

> Note
>
> Environment variables are not supported in Grafana Cloud.

### Max response size

You can set `GF_PLUGINS_ORACLE_DATASOURCE_MAX_RESPONSE_SIZE` in your environment variable to change query response data size. The default is `16`, the maximum is `512`.

[Copy code to clipboard] Copy

```none
export GF_PLUGINS_ORACLE_DATASOURCE_MAX_RESPONSE_SIZE=<number>
```

### Connection pool size

You can set `GF_PLUGINS_ORACLE_DATASOURCE_POOLSIZE` in your environment variable to change connection pool size. The default value is `50`

[Copy code to clipboard] Copy

```none
export GF_PLUGINS_ORACLE_DATASOURCE_POOLSIZE=<number>
```

Alternatively, you can configure these parameters on the [Grafana configuration](/docs/grafana/latest/setup-grafana/configure-grafana/#plugins-1) file `grafana.ini` under the `[plugins]` section.

[Copy code to clipboard] Copy

```none
[plugins]
oracle_datasource_poolsize = 50
oracle_datasource_max_response_size = 16
```

## Troubleshoot

If you encounter issues with connection or queries, refer to [Troubleshoot the Oracle data source](/docs/plugins/grafana-oracle-datasource/latest/troubleshoot-oracle-data-source/) for common problems and solutions.
