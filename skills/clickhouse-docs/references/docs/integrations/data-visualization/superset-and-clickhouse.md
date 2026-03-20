---
keywords: ['superset']
description: 'Apache Superset is an open-source data exploration and visualization platform.'
title: 'Connect Superset to ClickHouse'
show_related_blogs: true
doc_type: 'guide'
integration:
  - support_level: 'core'
  - category: 'data_visualization'
  - website: 'https://github.com/ClickHouse/clickhouse-connect'
---

# Connect Superset to ClickHouse

<ClickHouseSupportedBadge/>

<a href="https://superset.apache.org/" target="_blank">Apache Superset</a> is an open-source data exploration and visualization platform written in Python. Superset connects to ClickHouse using a Python driver provided by ClickHouse. Let's see how it works...

## Goal {#goal}

In this guide you will build a dashboard in Superset with data from a ClickHouse database. The dashboard will look like this:

<Image size="md" img={superset_12} alt="Superset dashboard showing UK property prices with multiple visualizations including pie charts and tables" border />

> **tip**: Add some data
If you don't have a dataset to work with you can add one of the examples. This guide uses the [UK Price Paid](/getting-started/example-datasets/uk-price-paid.md) dataset, so you might choose that one. There are several others to look at in the same documentation category.

## 1. Gather your connection details {#1-gather-your-connection-details}
<ConnectionDetails />

## 2. Install the Driver {#2-install-the-driver}

1. Superset uses the `clickhouse-connect` driver to connect to ClickHouse. The details of `clickhouse-connect` are at <a href="https://pypi.org/project/clickhouse-connect/" target="_blank">https://pypi.org/project/clickhouse-connect/</a> and it can be installed with the following command:

    ```console
    pip install clickhouse-connect
    ```

    :::note Docker Compose Setup
    For Docker-based installations, see the [Superset database configuration guide](https://superset.apache.org/docs/configuration/databases/#clickhouse) for instructions on adding `clickhouse-connect` to your container.
    :::

2. Start (or restart) Superset.

## 3. Connect Superset to ClickHouse {#3-connect-superset-to-clickhouse}

1. Within Superset, select **Data** from the top menu and then **Databases** from the drop-down menu. Add a new database by clicking the **+ Database** button:

<Image size="lg" img={superset_01} alt="Superset interface showing the Database menu with + Database button highlighted" border />

2. In the first step, select **ClickHouse Connect** as the type of database:

<Image size="sm" img={superset_02} alt="Superset database connection wizard showing ClickHouse Connect option selected" border />

3. In the second step:
- Set SSL on or off.
- Enter the connection information that you collected earlier
- Specify the **DISPLAY NAME**: this can be any name you prefer. If you will be connecting to multiple ClickHouse databases then make the name more descriptive.

<Image size="sm" img={superset_03} alt="Superset connection configuration form showing ClickHouse connection parameters" border />

4. Click the **CONNECT** and then **FINISH** buttons to complete the setup wizard, and you should see your database in the list of databases.

## 4. Add a Dataset {#4-add-a-dataset}

1. To interact with your ClickHouse data with Superset, you need to define a **_dataset_**. From the top menu in Superset, select **Data**, then **Datasets** from the drop-down menu.

2. Click the button for adding a dataset. Select your new database as the datasource and you should see the tables defined in your database:

<Image size="sm" img={superset_04} alt="Superset dataset creation dialog showing available tables from ClickHouse database" border />

3. Click the **ADD** button at the bottom of the dialog window and your table appears in the list of datasets. You're ready to build a dashboard and analyze your ClickHouse data!

## 5.  Creating charts and a dashboard in Superset {#5--creating-charts-and-a-dashboard-in-superset}

If you're familiar with Superset, then you will feel right at home with this next section. If you're new to Superset, well...it's like a lot of the other cool visualization tools out there in the world - it doesn't take long to get started, but the details and nuances get learned over time as you use the tool.

1. You start with a dashboard. From the top menu in Superset, select **Dashboards**. Click the button in the upper-right to add a new dashboard. The following dashboard is named **UK property prices**:

<Image size="md" img={superset_05} alt="Empty Superset dashboard named UK property prices ready for charts to be added" border />

2. To create a new chart, select **Charts** from the top menu and click the button to add a new chart. You will be shown a lot of options. The following example shows a **Pie Chart** chart using the **uk_price_paid** dataset from the **CHOOSE A DATASET** drop-down:

<Image size="md" img={superset_06} alt="Superset chart creation interface with Pie Chart visualization type selected" border />

3. Superset pie charts need a **Dimension** and a **Metric**, the rest of the settings are optional. You can pick your own fields for the dimension and metric, this example uses the ClickHouse field `district` as the dimension and `AVG(price)` as the metric.

<Image size="md" img={superset_08} alt="Dimension configuration showing district field selected for pie chart" border />
<Image size="md" img={superset_09} alt="Metric configuration showing AVG(price) aggregate function for pie chart" border />

5. If you prefer doughnut charts over pie, then you can set that and other options  under **CUSTOMIZE**:

<Image size="sm" img={superset_10} alt="Customize panel showing doughnut chart option and other pie chart configuration settings" border />

6. Click the **SAVE** button to save the chart, then select **UK property prices** under the **ADD TO DASHBOARD** drop-down, then **SAVE & GO TO DASHBOARD** saves the chart and adds it to the dashboard:

<Image size="md" img={superset_11} alt="Save chart dialog with dashboard selection dropdown and Save & Go to Dashboard button" border />

7. That's it. Building dashboards in Superset based on data in ClickHouse opens up a whole world of blazing fast data analytics!

<Image size="md" img={superset_12} alt="Completed Superset dashboard with multiple visualizations of UK property price data from ClickHouse" border />
