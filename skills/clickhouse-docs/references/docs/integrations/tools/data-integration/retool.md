---
keywords: ['clickhouse', 'retool', 'connect', 'integrate', 'ui', 'admin', 'panel', 'dashboard', 'nocode', 'no-code']
description: 'Quickly build web and mobile apps with rich user interfaces, automate complex tasks, and integrate AI—all powered by your data.'
title: 'Connecting Retool to ClickHouse'
doc_type: 'guide'
integration:
  - support_level: 'partner'
  - category: 'data_integration'
---

<PartnerBadge/>

## 1. Gather your connection details {#1-gather-your-connection-details}
<ConnectionDetails />

## 2. Create a ClickHouse resource {#2-create-a-clickhouse-resource}

Login to your Retool account and navigate to the _Resources_ tab. Choose "Create New" -> "Resource":

<Image img={retool_01} size="lg" border alt="Creating a new resource" />

Select "JDBC" from the list of available connectors:

<Image img={retool_02} size="lg" border alt="Choosing JDBC connector" />

In the setup wizard, make sure you select `com.clickhouse.jdbc.ClickHouseDriver` as the "Driver name":

<Image img={retool_03} size="lg" border alt="Selecting the right driver" />

Fill in your ClickHouse credentials in the following format: `jdbc:clickhouse://HOST:PORT/DATABASE?user=USERNAME&password=PASSWORD`.
If your instance requires SSL or you're using ClickHouse Cloud, add `&ssl=true` to the connection string, so it looks like `jdbc:clickhouse://HOST:PORT/DATABASE?user=USERNAME&password=PASSWORD&ssl=true`

<Image img={retool_04} size="lg" border alt="Specifying your credentials" />

After that, test your connection:

<Image img={retool_05} size="lg" border alt="Testing your connection" />

Now, you should be able to proceed to your app using your ClickHouse resource.
