---
title: 'Support matrix'
description: 'Comprehensive support matrices for ClickHouse open table format integrations and data catalog connections.'
keywords: ['data lake', 'lakehouse', 'support', 'iceberg', 'delta lake', 'hudi', 'paimon', 'catalog', 'features']
doc_type: 'reference'
---

This page provides comprehensive support matrices for ClickHouse's data lake integrations. It covers the features available for each open table format, the catalogs ClickHouse can connect to, and the capabilities supported by each catalog.

## Open table format support {#format-support}

ClickHouse integrates with four open table formats: [Apache Iceberg](/engines/table-engines/integrations/iceberg), [Delta Lake](/engines/table-engines/integrations/deltalake), [Apache Hudi](/engines/table-engines/integrations/hudi), and [Apache Paimon](/sql-reference/table-functions/paimon). Select a format below to view its support matrix.

**Legend:** ✅ Supported | ⚠️ Partial / Experimental | ❌ Not supported

| Feature | Status | Notes |
|---------|:-:|-------|
| **Storage backends** | | |
| AWS S3 | ✅ | Via [`icebergS3()`](/sql-reference/table-functions/iceberg) or `iceberg()` alias |
| GCS | ✅ | Via [`icebergS3()`](/sql-reference/table-functions/iceberg) or `iceberg()` alias |
| Azure Blob Storage | ✅ | Via [`icebergAzure()`](/sql-reference/table-functions/iceberg) |
| HDFS | ⚠️ | Via [`icebergHDFS()`](/sql-reference/table-functions/iceberg). Deprecated. |
| Local filesystem | ✅ | Via [`icebergLocal()`](/sql-reference/table-functions/iceberg) |
| **Access methods** | | |
| Table function | ✅ | [`icebergS3()`](/sql-reference/table-functions/iceberg) with variants per backend |
| Table engine | ✅ | [`IcebergS3`](/engines/table-engines/integrations/iceberg) with variants per backend |
| Cluster-distributed reads | ✅ | [`icebergS3Cluster`](/sql-reference/table-functions/icebergCluster), [`icebergAzureCluster`](/sql-reference/table-functions/icebergCluster), [`icebergHDFSCluster`](/sql-reference/table-functions/icebergCluster) |
| Named collections | ✅ | [Defining a named collection](/sql-reference/table-functions/iceberg#defining-a-named-collection) |
|  |  |  |
| **Read features** | | |
| Read support | ✅ | Full SELECT support with all ClickHouse SQL functions |
| Partition pruning | ✅ | See [Partition pruning](/engines/table-engines/integrations/iceberg#partition-pruning). |
| Hidden partitioning | ✅ | Iceberg transform-based partitioning supported |
| Partition evolution | ✅ | Reading tables with changing partition specs over time supported |
| Schema evolution | ✅ | Column addition, removal, and reordering. See [Schema evolution](/engines/table-engines/integrations/iceberg#schema-evolution). |
| Type promotion / widening | ✅ | `int` → `long`, `float` → `double`, `decimal(P,S)` → `decimal(P',S)` where P' > P. See [Schema evolution](/engines/table-engines/integrations/iceberg#schema-evolution). |
| Time travel / snapshots | ✅ | Via `iceberg_timestamp_ms` or `iceberg_snapshot_id` settings. See [Time travel](/engines/table-engines/integrations/iceberg#time-travel). |
| Position deletes | ✅ | See [Processing deleted rows](/engines/table-engines/integrations/iceberg#deleted-rows). |
| Equality deletes | ✅ | Table engine only, from v25.8+. See [Processing deleted rows](/engines/table-engines/integrations/iceberg#deleted-rows). |
| Merge-on-read | ⚠️ | Experimental. Supported for [delete operations](/sql-reference/table-functions/iceberg#iceberg-writes-delete). |
| Format versions | ⚠️ | v1 and v2 supported. V3 not supported. |
| Column statistics | ✅ | |
| Bloom filters / puffin files | ❌ | Bloom filter indexes in puffin files not supported |
| Virtual columns | ✅ | `_path`, `_file`, `_size`, `_time`, `_etag`. See [Virtual columns](/sql-reference/table-functions/iceberg#virtual-columns). |
|  |  |  |
| **Write features** | | |
| Table creation | ✅ | Experimental. Requires `allow_insert_into_iceberg = 1`. From v25.7+. See [Creating a table](/sql-reference/table-functions/iceberg#create-iceberg-table). |
| INSERT | ✅ | Beta from 26.2. Requires `allow_insert_into_iceberg = 1`. See [Inserting data](/sql-reference/table-functions/iceberg#writes-inserts). |
| DELETE | ✅ | Experimental. Requires `allow_insert_into_iceberg = 1`. Via `ALTER TABLE ... DELETE WHERE`. See [Deleting data](/sql-reference/table-functions/iceberg#iceberg-writes-delete). |
| ALTER TABLE (schema changes) | ✅ | Experimental. Requires `allow_insert_into_iceberg = 1`. Add, drop, modify, rename columns. See [Schema evolution](/sql-reference/table-functions/iceberg#iceberg-writes-schema-evolution). |
| Compaction | ⚠️ | Experimental. Requires `allow_experimental_iceberg_compaction = 1`. Merges position delete files into data files. See [Compaction](/sql-reference/table-functions/iceberg#iceberg-writes-compaction). Other Iceberg compaction operations not supported. |
| UPDATE / MERGE | ❌ | Not supported. See Compaction. |
| Copy-on-write | ❌ | Not supported |
| Expire snapshots | ❌ | Not supported |
| Remove orphan files | ❌ | Not supported |
| Writing partitions | ✅ | Supported. |
| Altering partitions | ❌ | The changing of the partitioning scheme from ClickHouse is not supported. ClickHouse can write to iceberg tables which have an evolved partitioning. |
|  |  |  |
| **Metadata** | | |
| Branching and tagging | ❌ | Iceberg branch/tag references not supported |
| Metadata file resolution | ✅ | Support for metadata resolution through catalogs, simple directory listing, using 'version-hint' and specific path. Configurable via `iceberg_metadata_file_path` and `iceberg_metadata_table_uuid`. See [Metadata file resolution](/engines/table-engines/integrations/iceberg#metadata-file-resolution). |
| Data caching | ✅ | Same mechanism as S3/Azure/HDFS storage engines. See [Data cache](/engines/table-engines/integrations/iceberg#data-cache). |
| Metadata caching | ✅ | Manifest and metadata files cached in memory. Enabled by default via `use_iceberg_metadata_files_cache`. See [Metadata cache](/engines/table-engines/integrations/iceberg#metadata-cache). |

From version 25.6, ClickHouse reads Delta Lake tables using the Delta Lake Rust kernel, providing broader feature support; however, known issues occur when accessing data in Azure Blob Storage. For this reason the Kernel is disabled when reading data on Azure Blob Storage. We indicate below which features require this kernel.

| Feature | Status | Notes |
|---------|:-:|-------|
| **Storage backends** | | |
| AWS S3 | ✅ | Via [`deltaLake()`](/sql-reference/table-functions/deltalake) or `deltaLakeS3()` |
| GCS | ✅ | Via [`deltaLake()`](/sql-reference/table-functions/deltalake) or `deltaLakeS3()` |
| Azure Blob Storage | ✅ | Via [`deltaLakeAzure()`](/sql-reference/table-functions/deltalake) |
| HDFS | ❌ | Not supported |
| Local filesystem | ✅ | Via [`deltaLakeLocal()`](/sql-reference/table-functions/deltalake) |
| **Access methods** | | |
| Table function | ✅ | [`deltaLake()`](/sql-reference/table-functions/deltalake) with variants per backend |
| Table engine | ✅ | [`DeltaLake`](/engines/table-engines/integrations/deltalake) |
| Cluster-distributed reads | ✅ | [`deltaLakeCluster`](/sql-reference/table-functions/deltalakeCluster), [`deltaLakeAzureCluster`](/sql-reference/table-functions/deltalakeCluster) |
| Named collections | ✅ | [Named collection](/sql-reference/table-functions/deltalake#arguments) |
| **Read features** | | |
| Read support | ✅ | Full SELECT support with all ClickHouse SQL functions |
| Partition pruning | ✅ |  Requires Delta Kernel. |
| Schema evolution | ✅ |  Requires Delta Kernel. |
| Time travel | ✅ |  Requires Delta Kernel. |
| Deletion vectors | ✅ | |
| Column mapping | ✅ | |
| Change data feed | ✅ |  Requires Delta Kernel. |
| Virtual columns | ✅ | `_path`, `_file`, `_size`, `_time`, `_etag`. See [Virtual columns](/sql-reference/table-functions/deltalake#virtual-columns). |
| **Write features** | | |
| INSERT | ✅ | Experimental. Requires `allow_experimental_delta_lake_writes = 1`. See [DeltaLake engine](/engines/table-engines/integrations/deltalake). Requires Delta Kernel. |
| DELETE / UPDATE / MERGE | ❌ | Not supported |
| CREATE empty table | ❌ | Creation of a new empty Delta Lake table is not supported. `CREATE TABLE` operation assumes existence of existing Delta Lake on object storage. |
| **Caching** | | |
| Data caching | ✅ | Same mechanism as S3/Azure/HDFS storage engines. See [Data cache](/engines/table-engines/integrations/deltalake#data-cache). |

| Feature | Status | Notes |
|---------|:-:|-------|
| **Storage backends** | | |
| AWS S3 | ✅ | Via [`hudi()`](/sql-reference/table-functions/hudi) |
| GCS | ✅ | Via [`hudi()`](/sql-reference/table-functions/hudi) |
| Azure Blob Storage | ❌ | Not supported |
| HDFS | ❌ | Not supported |
| Local filesystem | ❌ | Not supported |
| **Access methods** | | |
| Table function | ✅ | [`hudi()`](/sql-reference/table-functions/hudi) |
| Table engine | ✅ | [`Hudi`](/engines/table-engines/integrations/hudi) |
| Cluster-distributed reads | ✅ | [`hudiCluster`](/sql-reference/table-functions/hudiCluster) (S3 only) |
| Named collections | ✅ | [Hudi arguments](/sql-reference/table-functions/hudi#arguments) |
| **Read features** | | |
| Read support | ✅ | Full SELECT support with all ClickHouse SQL functions |
| Schema evolution | ❌ | Not supported |
| Time travel | ❌ | Not supported |
| Virtual columns | ✅ | `_path`, `_file`, `_size`, `_time`, `_etag`. See [Virtual columns](/sql-reference/table-functions/hudi#virtual-columns). |
| **Write features** | | |
| INSERT / DELETE / UPDATE | ❌ | Read-only integration |
| **Caching** | | |
| Data caching | ❌ | Not supported |

| Feature | Status | Notes |
|---------|:-:|-------|
| **Storage backends** | | |
| S3 | ✅ | Experimental. Via [`paimon()`](/sql-reference/table-functions/paimon) or `paimonS3()` |
| GCS | ✅ | Experimental. Via [`paimon()`](/sql-reference/table-functions/paimon) or `paimonS3()` |
| Azure Blob Storage | ✅ | Experimental. Via [`paimonAzure()`](/sql-reference/table-functions/paimon) |
| HDFS | ⚠️ | Experimental. Via [`paimonHDFS()`](/sql-reference/table-functions/paimon). Deprecated. |
| Local filesystem | ✅ | Experimental. Via [`paimonLocal()`](/sql-reference/table-functions/paimon) |
| **Access methods** | | |
| Table function | ✅ | Experimental. [`paimon()`](/sql-reference/table-functions/paimon) with variants per backend |
| Table engine | ❌ | No dedicated table engine |
| Cluster-distributed reads | ✅ | Experimental. [`paimonS3Cluster`](/sql-reference/table-functions/paimonCluster), [`paimonAzureCluster`](/sql-reference/table-functions/paimonCluster), [`paimonHDFSCluster`](/sql-reference/table-functions/paimonCluster) |
| Named collections | ✅ | Experimental. [Defining a named collection](/sql-reference/table-functions/paimon#defining-a-named-collection) |
| **Read features** | | |
| Read support | ✅ | Experimental. Full SELECT support with all ClickHouse SQL functions |
| Schema evolution | ❌ | Not supported |
| Time travel | ❌ | Not supported |
| Virtual columns | ✅ | Experimental. `_path`, `_file`, `_size`, `_time`, `_etag`. See [Virtual columns](/sql-reference/table-functions/paimon#virtual-columns). |
| **Write features** | | |
| INSERT / DELETE / UPDATE | ❌ | Read-only integration |
| **Caching** | | |
| Data caching | ❌ | Not supported |

## Catalog support {#catalog-support}

ClickHouse can connect to external data catalogs using the [`DataLakeCatalog`](/engines/database-engines/datalakecatalog) database engine, which exposes the catalog as a ClickHouse database. Tables registered in the catalog appear automatically and can be queried with standard SQL.

The following catalogs are currently supported. Refer to each catalog's reference guide for full setup instructions.

| Catalog | Formats | Read | Create table | INSERT | Reference guide |
|---------|---------|:-:|:-:|:-:|---------|
| [AWS Glue Catalog](/use-cases/data-lake/glue-catalog) | Iceberg | ✅ Beta | ❌ | ❌ | [Glue catalog guide](/use-cases/data-lake/glue-catalog) |
| [BigLake Metastore](/use-cases/data-lake/biglake-catalog) | Iceberg | ✅ Beta | ❌ | ❌ | [BigLake Metastore guide](/use-cases/data-lake/biglake-catalog) |
| [Databricks Unity Catalog](/use-cases/data-lake/unity-catalog) | Delta, Iceberg | ✅ Beta | ✅ Beta | ✅ Beta | [Unity Catalog guide](/use-cases/data-lake/unity-catalog) |
| [Iceberg REST](/use-cases/data-lake/rest-catalog) | Iceberg | ✅ Beta | ❌ | ❌ | [REST catalog guide](/use-cases/data-lake/rest-catalog) |
| [Lakekeeper](/use-cases/data-lake/lakekeeper-catalog) | Iceberg | ✅ Beta | ❌ | ❌ | [Lakekeeper catalog guide](/use-cases/data-lake/lakekeeper-catalog) |
| [Project Nessie](/use-cases/data-lake/nessie-catalog) | Iceberg | ✅ Experimental | ❌ | ❌ | [Nessie catalog guide](/use-cases/data-lake/nessie-catalog) |
| [Microsoft OneLake](/use-cases/data-lake/onelake-catalog) | Iceberg | ✅ Beta | ✅ Beta | ✅ Beta | [OneLake catalog guide](/use-cases/data-lake/onelake-catalog) |

All catalog integrations currently require an experimental or beta setting to be enabled. With the exception of Microsoft OneLake and Databricks Unity Catalog, all catalogs expose **read-only** access — tables can be queried but not created or written to through the catalog connection. To load data from a catalog into ClickHouse for faster analytics, use `INSERT INTO SELECT` as described in the [accelerating analytics guide](/use-cases/data-lake/getting-started/accelerating-analytics). To write data back to open table formats, create standalone Iceberg tables as described in the [writing data guide](/use-cases/data-lake/getting-started/writing-data).
