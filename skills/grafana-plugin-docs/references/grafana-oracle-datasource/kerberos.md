---
title: "Oracle Kerberos integration | Grafana Enterprise Plugins documentation"
description: "Configure Kerberos authentication for the Oracle data source in Grafana."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Oracle Kerberos integration

This document explains how to configure Kerberos authentication for the Oracle data source on both standalone and Docker-based Grafana servers. Kerberos authentication requires the `tnsnames.ora` file for connection configuration.

> Note
>
> Kerberos authentication is not supported in Grafana Cloud. Use the **Host with TCP Port** connection method with **Basic authentication** and [Private data source connect (PDC)](/docs/grafana-cloud/connect-externally-hosted/private-data-source-connect/) instead.

## Oracle configuration files

Kerberos authentication requires three configuration files:

- **tnsnames.ora**—stores connection information for Oracle databases. Refer to [Local Naming Parameters in the tnsnames.ora File](https://docs.oracle.com/en/database/oracle/oracle-database/21/netrf/local-naming-parameters-in-tns-ora-file.html#GUID-7F967CE5-5498-427C-9390-4A5C6767ADAA) for more information.
- **sqlnet.ora**—Oracle profile configuration file for managing database connections. Refer to [Parameters for the sqlnet.ora File](https://docs.oracle.com/en/database/oracle/oracle-database/19/netrf/parameters-for-the-sqlnet.ora.html#GUID-2041545B-58D4-48DC-986F-DCC9D0DEC642).
- **krb5.conf**—Kerberos configuration file containing realm and KDC information. Refer to Oracle’s [Configuring Kerberos Authentication](https://docs.oracle.com/en/database/oracle/oracle-database/19/dbseg/configuring-kerberos-authentication.html#GUID-DF84261F-457A-4B9F-AE41-CDE6FE9178C4) for details.

### File locations

The Oracle plugin resolves configuration files using standard Oracle networking search paths. Set the `ORACLE_HOME` environment variable to specify where configuration files are located.

When `ORACLE_HOME` is set to `/opt/oracle`, the files are found in:

Expand table

| File                  | Path                        |
|-----------------------|-----------------------------|
| `tnsnames.ora`        | `/opt/oracle/network/admin` |
| `sqlnet.ora`          | `/opt/oracle/network/admin` |
| `krb5.conf`           | `/opt/oracle/network/admin` |
| Kerberos ticket cache | `/tmp/krb5cc_472`           |

Alternative search paths include:

- `/home/grafana/.sqlnet.ora`
- `/home/grafana/.tnsnames.ora`
- `/etc/tnsnames.ora`

## Configure the data source connection

When setting up the Oracle data source, select **TNSNames Entry** as the connection method. The name entered into the text field should use the following convention:

[Copy code to clipboard] Copy

```none
/@DBNAME
```

`DBNAME` must correspond to an entry in `tnsnames.ora`.

In the following example configuration file, the connection string is `/@XE`:

ini [Copy code to clipboard] Copy

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

Refer to [Configure the Oracle data source](/docs/plugins/grafana-oracle-datasource/latest/configure/) for the full configuration walkthrough.

## Docker configuration

The following Docker Compose file shows the expected configuration files mapped into a Docker container.

Key volume mappings:

- `krb5.conf`—Kerberos configuration
- Ticket cache mapped to the Grafana UID (472)
- `tnsnames.ora`—Oracle connection descriptors
- `sqlnet.ora`—Oracle networking parameters

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
      # Sets [plugin.grafana-oracle-datasource] poolsize and max_response_size,
      # which Grafana forwards to the plugin process
      - GF_PLUGIN_GRAFANA_ORACLE_DATASOURCE_POOLSIZE=50
      - GF_PLUGIN_GRAFANA_ORACLE_DATASOURCE_MAX_RESPONSE_SIZE=16
```

## Kerberos configuration example

The following example shows a basic `krb5.conf` for Oracle Kerberos authentication.

`/opt/oracle/network/admin/krb5.conf`:

ini [Copy code to clipboard] Copy

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

Refer to Oracle’s [Configuring Kerberos Authentication](https://docs.oracle.com/en/database/oracle/oracle-database/19/dbseg/configuring-kerberos-authentication.html#GUID-DF84261F-457A-4B9F-AE41-CDE6FE9178C4) to integrate Oracle with Kerberos.

## sqlnet.ora configuration

Key parameters in the `sqlnet.ora` configuration file:

Expand table

| Parameter                          | Description                                        |
|------------------------------------|----------------------------------------------------|
| `SQLNET.AUTHENTICATION_SERVICES`   | Set to `(KERBEROS5)` to enable Kerberos.           |
| `AUTHENTICATION_KERBEROS5_SERVICE` | The Kerberos service name for the Oracle database. |
| `SQLNET.KERBEROS5_CC_NAME`         | Path to the Kerberos ticket cache file.            |
| `SQLNET.KERBEROS5_KEYTAB`          | Path to the Kerberos `keytab` file.                |

`/opt/oracle/network/admin/sqlnet.ora`:

ini [Copy code to clipboard] Copy

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

- [Configuring Kerberos Authentication (Oracle)](https://docs.oracle.com/en/database/oracle/oracle-database/19/dbseg/configuring-kerberos-authentication.html#GUID-DF84261F-457A-4B9F-AE41-CDE6FE9178C4)
- [How to Install and Configure Kerberos in CentOS/RHEL 7](https://www.thegeekdiary.com/how-to-install-and-configure-kerberos-in-centos-rhel-7/)
- [Setting up Kerberos for Ubuntu](https://linuxconfig.org/how-to-install-kerberos-kdc-server-and-client-on-ubuntu-18-04/)
