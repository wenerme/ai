Before you start using Vector Search, you need to choose an embedding
model, prepare your data, and decide what type of endpoint you'll use. This page
provides some information about doing those things.

## Prepare your embeddings

To use Vector Search, you need to have your embeddings ready.
If you already have your embeddings, skip to [Choose an
endpoint](https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/vector-search/setup#choose-endpoint).

To create your embeddings, do the following:

1. **Choose an embedding model**: There are many external embedding
   models available, which offer different features.

   Vector Search supports dense embeddings, sparse embeddings,
   and hybrid search. Hybrid search uses dense and
   sparse embeddings according to the weight that you specify for those
   embedding types.

   Depending on your use case, choose one of the following type of model:
   - **Ready-to-use** :
     If you want to semantically match text to text or text to images by the
     relevance of the text or image alone. This is a standard use case, so you
     don't need to train or tune the model. [Text
     embeddings](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/embeddings/get-text-embeddings)
     is a recommended option for this use case. Agent Platform uses
     dense embedding models.

   - **Custom model for embeddings**: If you want to match based on
     your own data or specific use case.

2. **Prepare your data**: Clean and preprocess your data to
   ensure that it's in a format that can be used by the embedding model.

3. **Train the embedding model if you use a custom model** : If you choose to
   use a custom embeddings model (tuning), you need to train it on your data.
   This can be a time-consuming process that depends on the size and complexity
   of your data. If you use a pretrained model from the
   [Model Garden](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/model-garden/explore-models),
   then you can skip this step.

4. **Generate embeddings**: After the model is trained, use it to generate
   embeddings for your data.

## Choose an endpoint

After you have created your index, you'll deploy it to an endpoint. For
more information, see [Deploy and manage public index
endpoints](https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/vector-search/deploy-index-public) and [Deploy and manage
index endpoints in a VPC network](https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/vector-search/deploy-index-vpc). It's
helpful to decide what kind of endpoint you'll need before you
create your index.

You can deploy your query index to one of the following:

- **Public endpoint**: If you deploy to a public endpoint, you don't need to
  set up your network. Public networks have slightly higher latency, but are
  faster to set up and easier to maintain.

- **Private Endpoint**: If you want to use a VPC, you must first
  set up networking. Vector Search supports two types of private
  network.

  - [VPC Network Peering connection](https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/vector-search/vpc)
    for reduced network latency.

  - [Private service
    connect](https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/vector-search/private-service-connect)
    for private consumption of services across VPC
    networks that belong to different groups, teams, projects, or
    organizations.

## What's next

After you've generated your embeddings and decided where to deploy your
index, the next step is to configure your index.

- Learn how to configure [input data format and structure](https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/vector-search/format-structure)
- Learn how to create a Vector Search index using [notebook tutorials](https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/vector-search/notebooks)
- Learn how to [manage indexes](https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/vector-search/create-manage-index)
