---
title: "Sqlyze data source for Grafana | Grafana Enterprise Plugins documentation"
description: "Grafana Sqlyze Data source This plugin is not yet supported in Grafana Cloud. The Grafana Sqlyze Data Source plugin is a versatile plugin that allows you to connect to hundreds of data sources using a single query language: SQL. Whether your data resides in traditional SQL databases, NoSQL databases, or other non-SQL data sources, this plugin enables you to query them all with SQL."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Grafana Sqlyze Data source

*This plugin is not yet supported in Grafana Cloud.*

The Grafana Sqlyze Data Source plugin is a versatile plugin that allows you to connect to hundreds of data sources using a single query language: SQL. Whether your data resides in traditional SQL databases, NoSQL databases, or other non-SQL data sources, this plugin enables you to query them all with SQL.

### Overview

The Sqlyze plugin leverages the ODBC (Open Database Connectivity) interface to connect to various databases. ODBC is a standard API for accessing database management systems (DBMS). The following diagram illustrates how the plugin interacts with the different components in the data connection stack:

[Copy code to clipboard] Copy

```none
+-----------------------------------+
|           Sqlyze plugin           |
| +-----------------+               |
| |   Plugin        |               |
| +-----------------+               |
|         |                         |
|         | ODBC API Calls          |
|         v                         |
| +-------------------------+       |
| | unixODBC Driver Manager |       |
| +-------------------------+       |
|         |                         |
|         | Directs ODBC Calls      |
|         v                         |
+-----------------------------------+
          |
          v
+----------------+
|  ODBC Driver   |
| (e.g., MySQL,  | (ODBC Drivers that are needed to be installed for your specific DBMS / DB)
| PostgreSQL)    |
+----------------+
          |
          | Translates ODBC Calls to DB-Specific Commands
          v
+-----------------+
|      DBMS       | (Database Management System)
+-----------------+
          |
          | Manages Data Access
          v
+-----------------+
|    Database     |
+-----------------+
```

## Configuration

### Driver Configuration

The plugin requires two essential fields to be configured: **Driver** and **Timeout**.

- **Driver:** This is the absolute path to the ODBC driver on your system. The ODBC driver is specific to the database management system (DBMS) you are connecting to and must be installed separately.
- **Timeout:** This field sets the timeout for database connections in seconds.

### Connection String Settings

ODBC uses a connection string under the hood to connect to the DBMS. This connection string is built from a concatenation of the driver path, timeout, and any other key value combinations provided in the Driver Settings sections of the settings UI. Here is an example connection string for an IBM DB2 database:

plaintext [Copy code to clipboard] Copy

```plaintext
Driver=/home/ibm/db2/V11.5/lib64/libdb2o.so;Timeout=0;Hostname=db2.server.com;Port=50000;Uid=testUserUID;Pwd=Testing123;DB=testdb
```

The connection string format may vary depending on the database you’re connecting to. For specific connection strings, you can refer to resources like [ConnectionStrings.com](https://www.connectionstrings.com/ibm-db2-odbc/).

The `Driver` field can also contain a reference to the driver in configuration in the `odbc.ini` file, instead of referring to the driver directly. e.g.:

plaintext [Copy code to clipboard] Copy

```plaintext
`Driver={MyDB2Database};Timeout=0;Hostname=db2.server.com;Port=50000;Uid=testUserUID;Pwd=Testing123;DB=testdb
```

* * *

## Testing and Troubleshooting ODBC Connections

Proper setup of ODBC connections is critical for ensuring that your database communication works as expected. This section covers the key configuration files required for ODBC, as well as tools and commands to help you test and troubleshoot your setup.

The CLI tools mentioned below are likely not installed on your system and you will most likely need to install `unixodbc` and / or `unixodbc-dev`, ( if you are using ubuntu ) using the command below.

sh [Copy code to clipboard] Copy

```sh
apt-get install unixodbc unixodbc-dev
```

### ODBC Configuration Files

### odbcinst -j

The odbcinst -j command is used to display the locations of important ODBC configuration files. This can help verify that your system is set up correctly.

sh [Copy code to clipboard] Copy

```sh
$ odbcinst -j
unixODBC 2.3.7
DRIVERS............: /etc/odbcinst.ini
SYSTEM DATA SOURCES: /etc/odbc.ini
USER DATA SOURCES..: /home/username/.odbc.ini
```

#### Example `odbc.ini` File

The `odbc.ini` file is used to define DSNs (Data Source Names), which represent individual database connections. Each DSN specifies the connection parameters for a particular database.

ini [Copy code to clipboard] Copy

```ini
[ODBC Data Sources]
MyDB2Database=IBM DB2 ODBC Driver

[MyDB2Database]
Description=IBM DB2 Database
Driver=/home/ibm/db2/V11.5/lib64/libdb2o.so
Database=testdb
Hostname=db2.server.com
Port=50000
Uid=testUserUID
Pwd=Testing123

[ODBC]
Trace=Yes
TraceFile=/tmp/sql.log
```

### Example `odbcinst.ini` File

The odbcinst.ini file is used to define the ODBC drivers installed on your system. Each section represents a different driver.

ini [Copy code to clipboard] Copy

```ini
[Db2]
Description = Db2 Driver
Driver = <instance_path>/lib/libdb2o.so
fileusage=1
dontdlclose=1
```

### Using `odbc_cli` to Verify Configuration Files

`odbc_cli` is a utility for checking your ODBC configuration files, such as ensuring the correct driver paths and DSN configurations.

[Copy code to clipboard] Copy

```none
$ odbc_cli verify
Configuration file(s) verified:
- /etc/odbcinst.ini
- /etc/odbc.ini
```

### `isql` to verify connections

The isql tool is an interactive SQL shell that can be used to test the connection to your database via ODBC. It’s particularly useful for diagnosing issues with your ODBC configuration before using the Grafana plugin. It is installed with the `unixodbc`/`unixodbc-dev` packages.

sh [Copy code to clipboard] Copy

```sh
$ isql MyDB2Database
+---------------------------------------+
| Connected!                            |
|                                       |
| SQL>                                  |
+---------------------------------------+
```

* * *

## Time series

To format your SQL queries for time series data in Grafana, use the alias **as time** in your SQL queries. This allows Grafana to recognize the timestamp and render time series data correctly.

Example query:

SQL [Copy code to clipboard] Copy

```sql
select date_start as time, foo, avg(bar) as bar
from foo_bar
```

* * *

## Platform Support

This plugin relies on ODBC for connectivity to various databases. It includes the `unixODBC` library, which facilitates the ODBC communication but does not include the utilities (such as command-line tools). Since ODBC is widely supported across operating systems like Windows, Linux, and macOS, the plugin is cross-platform. However, some additional dependencies might need to be installed on non-Linux systems.

### Using ODBC with Linux ARM or macOS

#### Installing unixODBC

To use ODBC on Linux ARM or macOS, you must have unixODBC installed. This library is essential for ODBC operations on these platforms. Installation instructions can be found in the IBM documentation for installing unixODBC Driver Manager.

* * *

## Short list of known drivers and settings

### DB2

- Can be downloaded from IBM Fix Central where you can choose your DB2 Version and Platform: [https://www.ibm.com/support/fixcentral/swg/selectFixes?parent=ibm%7EInformation%20Management&amp;product=ibm/Information+Management/IBM+Data+Server+Client+Packages&amp;release=11.5](https://www.ibm.com/support/fixcentral/swg/selectFixes?parent=ibm~Information%20Management&product=ibm%2FInformation%20Management%2FIBM%20Data%20Server%20Client%20Packages&release=11.5).\*&amp;platform=Mac+OSX&amp;function=all
- Driver Settings - set the path to where the driver is installed and add required settings (MacOS example below)

Expand table

| Setting           | Example Value                            |
|-------------------|------------------------------------------|
| Driver            | /Applications/dsdriver/lib/libdb2o.dylib |
| Timeout (seconds) | 10                                       |
| host              | 127.0.0.1                                |
| port              | 50000                                    |
| uid               | db2inst1                                 |
| pwd               | ••••••••••••                             |
| database          | sample                                   |

### Impala

- Driver: [https://www.cloudera.com/downloads/connectors/impala/odbc/2-6-14.html](https://www.cloudera.com/downloads/connectors/impala/odbc/2-6-14.html)
- Settings: [https://docs.cloudera.com/documentation/other/connectors/impala-odbc/latest/Cloudera-ODBC-Driver-for-Impala-Install-Guide.pdf](https://docs.cloudera.com/documentation/other/connectors/impala-odbc/latest/Cloudera-ODBC-Driver-for-Impala-Install-Guide.pdf)

### Databricks

- Driver: [https://databricks.com/spark/odbc-drivers-download](https://databricks.com/spark/odbc-drivers-download)
- Settings: [https://docs.databricks.com/integrations/bi/jdbc-odbc-bi.html#odbc-driver](https://docs.databricks.com/integrations/bi/jdbc-odbc-bi.html#odbc-driver)

### Third party drivers

The settings for other third-party drivers vary, but the Sqlyze plugin is designed to accept any key-value pair required by the ODBC driver. Always refer to the documentation provided by the driver vendor for the most accurate configuration settings.

## Common Errors:

unixODBC errors will be surfaced into the UI as errors. Below is a list of common errors that you might encounter when configuring the plugin.

`SQLDriverConnect: {08001} [IBM][CLI Driver] SQL1024N A database connection does not exist. SQLSTATE=08003`

This error can occur when the ODBC driver cannot start a connection with the database.

`SQLDriverConnect: {01000} [unixODBC][Driver Manager]Can't open lib '/home/driver/odbc_cli/clidriver/lib/libdb2.so' : file not found`

This error can occur when the driver file (in this example `libdb2.so`) is missing linked dependencies. You verify this by running the `ldd` cli tool for example run within the grafana container: `ldd /home/driver/odbc_cli/clidriver/lib/libdb2.so`. Please make sure to report this to our team with your linux version so we can include all necessary dependencies.

## Provisioning

You can define and configure the ODBC data source in YAML files as part of the Grafana provisioning system. For more information about provisioning a data source, and for available configuration options, refer [Provision Grafana](/docs/grafana/latest/administration/provisioning/#datasources).

YAML [Copy code to clipboard] Copy

```yaml
apiVersion: 1
datasources:
  - name: odbc
    uid: odbc
    type: grafana-odbc-datasource
    jsonData:
      driver: "/home/driver/odbc_cli/clidriver/lib/libdb2.so"
      timeout: "5000"
      settings:
        - name: "Hostname"
          value: "host.docker.internal"
        - name: "Port"
          value: "50000"
        - name: "Uid"
          value: "db2inst1"
        - name: "Database"
          value: "testdb"
        - name: "Pwd"
          secure: true
    secureJsonData:
        "Pwd": "password123"
```
