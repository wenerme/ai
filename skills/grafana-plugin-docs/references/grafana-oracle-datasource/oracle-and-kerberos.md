---
title: "Oracle Kerberos integration | Grafana Enterprise Plugins documentation"
description: "This document describes Kerberos authentication for Oracle."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Oracle Kerberos integration

Grafana provides a basic configuration for Kerberos authentication for both standalone and `Dockerized` Grafana servers. You must use the `tnsnames.ora` file with this configuration. The `tnsnames.ora` file is used by Oracle to store and configure connection information for different databases.

> Note
>
> Kerberos authentication is not supported in Grafana Cloud.

## Oracle configuration files

The following are key Oracle configuration files:

- **tnsnames.ora** - Configuration file used by Oracle to store and configure connection information for different databases. Refer to [Local Naming Parameters in the tnsnames.ora File](https://docs.oracle.com/en/database/oracle/oracle-database/21/netrf/local-naming-parameters-in-tns-ora-file.html#GUID-7F967CE5-5498-427C-9390-4A5C6767ADAA) for more information regarding the tnsnames.ora file.
- **sqlnet.ora** - Oracle profile configuration file used for managing database connections. Refer to [Parameters for the sqlnet.ora File](https://docs.oracle.com/en/database/oracle/oracle-database/19/netrf/parameters-for-the-sqlnet.ora.html#GUID-2041545B-58D4-48DC-986F-DCC9D0DEC642).
- **krb5.conf** - Configuration file containing Kerberos configuration information. Refer to [krb5.conf](https://docs.oracle.com/en/database/oracle/oracle-database/21/netrf/local-naming-parameters-in-tns-ora-file.html#GUID-7F967CE5-5498-427C-9390-4A5C6767ADAA) in Oracle’s documentation for more information.

### Locations

The Oracle plugin uses default search paths defined by Oracle [Instant Client](https://www.oracle.com/database/technologies/faq-instant-client.html#:~:text=What%20is%20Instant%20Client%3F,%28or%20local%29%20Oracle%20Database). Setting the `ORACLE_HOME` environment variable can be used to override where the `sqlnet.ora` and `tnsnames.ora` config files are found.

When `ORACLE_HOME` is set to `/opt/oracle`, Oracle configuration files are located in the following directories:

Expand table

| filename     | Search Path               |
|--------------|---------------------------|
| tnsnames.ora | /opt/oracle/network/admin |
| sqlnet.ora   | /opt/oracle/network/admin |
| krb5.conf    | /opt/oracle/network/admin |
| krb5cc\_472  | /tmp/krb5cc\_472          |

You can use other search paths, including the following:

- `/home/grafana/.sqlnet.ora`
- `/var/lib/grafana/plugins/grafana-oracle-datasource/lib/linux_x64/instantclient_12_2/network/admin/sqlnet.ora`
- `/home/grafana/.tnsnames.ora`
- `/etc/tnsnames.ora`

## Data source configuration

Refer to [Configure the Oracle data source](/docs/plugins/grafana-oracle-datasource/latest/configure-oracle-data-source/) for instructions on how to configure Oracle in Grafana. When setting up the Oracle data source use the data source connection option [**TNSNames Entry**](/docs/plugins/grafana-oracle-datasource/latest/configure-oracle-data-source/#connection) in the **Connection** section. The name entered into the text field should use the following convention:

`/@DBNAME`

DBNAME must correspond to an entry in `tnsnames.ora`.

In the following example configuration file, the connection string is `/@XE`:

INI [Copy code to clipboard] Copy

```ini
XE =
  (DESCRIPTION =
    (ADDRESS = (PROTOCOL = TCP)(HOST = krbclient1.plugins.grafana.net)(PORT = 1521))
    (CONNECT_DATA =
      (SERVER = DEDICATED)
      (SERVICE_NAME = XE)
    )
  )
```

## Docker

The following Docker Compose file shows the expected configuration files mapped into a Docker container.

The main components are:

- location of `krb5.conf`
- mapping the ticket cache to the Grafana UID (472)
- location of `tnsnames.ora`
- location of `sqlnet.ora`

YAML [Copy code to clipboard] Copy

```yaml
version: '3.7'
services:
  grafana:
    image: grafana/grafana:latest
    ports:
      - 3000:3000
    volumes:
      - ./kerb5_client/krb5.conf:/etc/krb5.conf
      - ./ticketcache/krb5cc_1000:/tmp/krb5cc_472
      - ./plugin:/var/lib/grafana/plugins/grafana-oracle-datasource
      - ./network/admin/tnsnames.ora:/etc/tnsnames.ora
      - ./network/admin:/opt/oracle/network/admin
    extra_hosts:
      krb5.plugins.grafana.net: 172.16.0.4
      krbclient1.plugins.grafana.net: 172.16.0.11
    environment:
      - TERM=linux
      - ORACLE_HOME=/opt/oracle
      - GF_DATAPROXY_LOGGING=true
      - GF_LOG_LEVEL=debug
      - GF_LOG_FILTERS=oracle-datasource:debug
      - GF_PLUGINS_ORACLE_DATASOURCE_POOLSIZE=15
```

## Kerberos

The following example depicts a basic Oracle Kerberos configuration. Use Oracle’s [Configuring Kerberos Authentication](https://docs.oracle.com/en/database/oracle/oracle-database/19/dbseg/configuring-kerberos-authentication.html#GUID-DF84261F-457A-4B9F-AE41-CDE6FE9178C4) to integrate Oracle with Kerberos.

`/opt/oracle/network/admin/krb5.conf`

INI [Copy code to clipboard] Copy

```ini
[libdefaults]
    default_realm = PLUGINS.GRAFANA.NET
    kdc_timesync = 1
    ccache_type = 4
    forwardable = true
    proxiable = true
    fcc-mit-ticketflags = true
[realms]
    PLUGINS.GRAFANA.NET = {
        kdc = krb5.plugins.grafana.net:9088
        admin_server = krb5.plugins.grafana.net:9749
    }
[domain_realm]
    .plugins.grafana.net = PLUGINS.GRAFANA.NET
    plugins.grafana.net = PLUGINS.GRAFANA.NET
```

## sqlnet.ora configuration

Key items in the sqlnet.ora configuration file include:

- `AUTHENTICATION_KERBEROS5_SERVICE`
- `SQLNET.KERBEROS5_CC_NAME`
- `SQLNET.KERBEROS5_KEYTAB`

`/opt/oracle/network/admin/sqlnet.ora`

INI [Copy code to clipboard] Copy

```ini
NAMES.DIRECTORY_PATH= (TNSNAMES, EZCONNECT)
SQLNET.AUTHENTICATION_SERVICES=(KERBEROS5)
SQLNET.FALLBACK_AUTHENTICATION=TRUE
SQLNET.AUTHENTICATION_KERBEROS5_SERVICE=oraclesvc
SQLNET.KERBEROS5_CC_NAME=/tmp/krb5cc_472
SQLNET.KERBEROS5_CONF_MIT=TRUE
SQLNET.KERBEROS5_CONF=/etc/krb5.conf
SQLNET.KERBEROS5_CONF_LOCATION=/etc
SQLNET.KERBEROS5_KEYTAB=/etc/v5srvtab
```

## Additional references

- [Configuring Kerberos Authentication](https://docs.oracle.com/en/database/oracle/oracle-database/19/dbseg/configuring-kerberos-authentication.html#GUID-DF84261F-457A-4B9F-AE41-CDE6FE9178C4)
- [How to Install and Configure Kerberos in CentOS/RHEL 7](https://www.thegeekdiary.com/how-to-install-and-configure-kerberos-in-centos-rhel-7/)
- [Setting up Kerberos for Ubuntu](https://linuxconfig.org/how-to-install-kerberos-kdc-server-and-client-on-ubuntu-18-04/)
