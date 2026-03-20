---
description: 'Step-by-step guide to create your first Amazon S3 ClickPipe.'
title: 'Creating your first Amazon S3 ClickPipe'
doc_type: 'guide'
---

# Creating your first Amazon S3 ClickPipe {#creating-your-first-amazon-s3-clickpipe}

The S3 ClickPipe provides a fully-managed and resilient way to ingest data from Amazon S3 and S3-compatible object stores into ClickHouse Cloud. It supports both **one-time** and **continuous ingestion** with exactly-once semantics.

S3 ClickPipes can be deployed and managed manually using the ClickPipes UI, as well as programmatically using [OpenAPI](https://clickhouse.com/docs/cloud/manage/api/swagger#tag/ClickPipes/paths/~1v1~1organizations~1%7BorganizationId%7D~1services~1%7BserviceId%7D~1clickpipes/post) and [Terraform](https://registry.terraform.io/providers/ClickHouse/clickhouse/3.8.1-alpha1/docs/resources/clickpipe).

<CreateClickPipe provider="s3"/>
