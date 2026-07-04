Single Zone Provisioned Throughput lets you reserve
throughput in specific regions where only one [zone](https://docs.cloud.google.com/docs/geography-and-regions) is
available. This option provides
predictable performance for Gemini models in use cases where ML
processing is required.

To view the list of supported models and regions, see
[Deployments and endpoints](https://docs.cloud.google.com/gemini-enterprise-agent-platform/resources/locations). For the list of
regions and models that support ML processing, see
[ML processing](https://docs.cloud.google.com/gemini-enterprise-agent-platform/resources/locations#canada).

## Features of Single Zone Provisioned Throughput

This section outlines the key features of Single Zone Provisioned Throughput:

- **Pricing and units are consistent with standard Provisioned Throughput** :
  Single Zone Provisioned Throughput uses the same measure of throughput ([GSUs](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/provisioned-throughput/measure-provisioned-throughput#gsu-burndown-rate)),
  [pricing](https://cloud.google.com/gemini-enterprise-agent-platform/generative-ai/pricing#provisioned-throughput), and terms as
  standard [Provisioned Throughput](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/provisioned-throughput/purchase-provisioned-throughput).

- **Single Zone Provisioned Throughput supports in-region ML processing** : All requests are processed in the
  purchased region, including traffic that exceeds your purchased amount of
  throughput. This traffic is billed at the
  [pay-as-you-go rate](https://cloud.google.com/gemini-enterprise-agent-platform/generative-ai/pricing#provisioned-throughput)
  using buffer capacity in the region.

- **You control the overages** : You can
  [control overflow traffic](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/provisioned-throughput/use-provisioned-throughput#use-rest-api)
  using the same headers as with standard Provisioned Throughput.

- **You can monitor your order** : You can monitor your Single Zone Provisioned Throughput order using the existing
  [Provisioned Throughput monitoring](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/provisioned-throughput/use-provisioned-throughput#monitor_provisioned_throughput) capabilities.

## Limitations

Single Zone Provisioned Throughput has the following limitations:

- Single Zone Provisioned Throughput is not a Covered Service and is excluded from the
  [Gemini Online Inference on Gemini Enterprise Agent Platform Service Level Agreement](https://cloud.google.com/vertex-ai/generative-ai/sla).

- Single Zone Provisioned Throughput does not integrate with or support
  [Batch requests](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/capabilities/batch-prediction-gemini#batch_prediction_use_case)
  or [Fine Tuning](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/tune-models).

- In regions without ML processing, latency for Single Zone Provisioned Throughput might be higher than
  standard Provisioned Throughput or pay-as-you-go.

## Purchase Single Zone Provisioned Throughput

For assistance with purchasing Single Zone Provisioned Throughput, [contact your Google Cloud account representative](https://cloud.google.com/contact).

## What's next

- [Purchase standard Provisioned Throughput.](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/provisioned-throughput/purchase-provisioned-throughput)
