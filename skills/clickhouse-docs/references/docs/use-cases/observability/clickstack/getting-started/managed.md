---
title: 'Getting Started with Managed ClickStack'
description: 'Getting started with Managed ClickStack'
doc_type: 'guide'
keywords: ['Managed ClickStack', 'getting started', 'ClickHouse Cloud']
---

<BetaBadge/>

The easiest way to get started is by deploying **Managed ClickStack** on **ClickHouse Cloud**, which provides a fully managed, secure backend while retaining complete control over ingestion, schema, and observability workflows. This removes the need to operate ClickHouse yourself and delivers a range of benefits: 

- Automatic scaling of compute, independent of storage
- Low-cost and effectively unlimited retention based on object storage
- The ability to independently isolate read and write workloads with warehouses.
- Integrated authentication
- Automated backups
- Security and compliance features
- Seamless upgrades

<VerticalStepper headerLevel="h2">

## Signup to ClickHouse Cloud {#signup-to-clickhouse-cloud}

To create a Managed ClickStack service in [ClickHouse Cloud](https://console.clickhouse.cloud) first complete the **first step** of the [ClickHouse Cloud quickstart guide](/getting-started/quick-start/cloud).

<ProviderSelection/>

## Setup ingestion {#setup-ingestion}

Once your service has been provisioned, ensure the the service is selected and click "ClickStack" from the left menu.

<SetupManagedIngestion/>

## Navigate to the ClickStack UI {#navigate-to-clickstack-ui-cloud}

<NavigateClickStackUI/>

## Next Steps {#next-steps}

:::important[Record default credentials]
If you haven't recorded your default credentials during the above steps, navigate to the service and select `Connect`, recording the password and HTTP/native endpoints. Store these admin credentials securely, which can be reused in further guides.

<Image img={service_connect} size="lg" alt='Service Connect' border/>

To perform tasks such as provisioning new users or adding further data sources, see the [deployment guide for Managed ClickStack](/use-cases/observability/clickstack/deployment/clickstack-clickhouse-cloud#additional-tasks).

</VerticalStepper>
