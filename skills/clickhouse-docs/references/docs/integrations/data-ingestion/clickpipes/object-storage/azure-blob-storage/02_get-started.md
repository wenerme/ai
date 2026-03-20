---
description: 'Step-by-step guide to create your first Azure Blob Storage (ABS) ClickPipe.'
title: 'Create your first Azure Blob Storage ClickPipe'
doc_type: 'guide'
---

**Prerequisites**

To follow this guide, you will need:
- An Azure Blob Storage account
- [Azure connection string](/integrations/azure-data-factory/table-function#acquiring-azure-blob-storage-access-keys)
- Container name
- A running ClickHouse Cloud service

<VerticalStepper headerLevel="h2">

## Navigate to data sources {#navigate-to-data-sources}

From the home page of your service, click **Data sources** in the left hand menu.
Expand the **ClickPipes** dropdown and click **Create ClickPipe**

<Image img={navigateToDatasources} alt="Navigate to Data Sources" size="md"/>

<Image img={createClickpipe} alt="Create ClickPipe" size="md"/>

## Select the data source {#select-data-source}

Select **Azure Blob Storage** as data type

<Image img={selectBlobStorage} alt="Select Azure Blob Storage" size="md"/>

## Setup your ClickPipe connection {#setup-connection}

1. Give your ClickPipe a descriptive name
2. Select **Connection String** from the authentication method dropdown
3. Paste your Azure connection string in the field for **Connection string**
4. Enter your container name
5. Enter your Azure Blob Storage file path, using wildcards if you want to ingest multiple files

Optionally, enable continuous ingestion. See ["Continuous Ingestion"](/integrations/clickpipes/object-storage/abs/overview#continuous-ingestion) for more details.

Finally, click **Incoming data**

<Image img={configurationDetails} alt="Configuration Details" size="md"/>

## Select data format {#select-data-format}

1. Select file type
2. File compression (`detect automatically`, `none`, `gzip`, `brotli`, `xz` or `zstd`)
3. Complete additional format specific configuration such as delimiter used for comma-separated formats
4. Click **Parse information**

<Image img={chooseDataFormat} alt="Choose Data Format" size="md"/>

## Configure table, schema and settings {#configure-table-schema}

Now you need to create a new table or select an existing one where the incoming data can be stored.

1. Select whether to upload data to a new table or an existing table
2. Select the database to use, and which name to give the table if it is a new table
3. Choose a sorting key or keys
4. Define any mappings from the source file to destination table for column name, column type, default value and nullability
5. Finally, specify advanced settings such as the engine type you wish to use, the expression to partition by and the primary key

<Image img={parseInformation} alt="Parse Information" size="md"/>

When you have finished configuring your table, schema and settings, click **Details and settings**

## Configure permissions {#configure-permissions}

ClickPipes will set up a dedicated database user for data writing.
You can select a role for this user.
For materialized views or dictionary access from the destination table, opt for "Full access".

<Image img={permissions} alt="Configure Permissions" size="md"/>

## Complete setup {#complete-setup}

Click **Create ClickPipe** to complete setup

You should now see your ClickPipe in a provisioning status.
After a few moments it will change from **provisioning** to **completed**.

</VerticalStepper>
