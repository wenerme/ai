> [!WARNING]
>
> **Preview**
>
>
> This feature is
>
> subject to the "Pre-GA Offerings Terms" in the General Service Terms section of the
> [Service Specific
> Terms](https://docs.cloud.google.com/terms/service-terms#1).
>
> Pre-GA features are available "as is" and might have limited support.
>
> For more information, see the
> [launch stage descriptions](https://cloud.google.com/products/#product-launch-stages).

Example Store lets you store and dynamically retrieve
[few-shot examples](https://docs.cloud.google.com/gemini-enterprise-agent-platform/optimize/example-store/overview#fewshotexamples). Few-shot examples let you
demonstrate the expected response patterns to an LLM to improve the quality,
accuracy, and consistency of its responses to similar queries.

## What are few-shot examples?

A few-shot example is labeled data specific to your LLM use case. It includes
an input-output pair demonstrating the expected model response for a model
request. You can use examples to demonstrate the expected behavior or response
pattern from an LLM.

By using only a few relevant examples, you can cover a larger set of possible
outcomes, intended behavior, and user inputs without correspondingly increasing
the size or complexity of prompts. This is both by only including relevant
examples (decreasing how many examples are included) and by "showing not telling"
the expected behavior.

Using few-shot examples is a form of in-context learning. An example
demonstrates a clear pattern of inputs and outputs, without explaining how the
model generates the content. You can cover more possible outcomes or user
queries using just relatively few examples, without increasing your prompt size or
code complexity. Using examples doesn't involve updating the parameters of the
pretrained model, and without impacting the breadth of knowledge of the LLM.
This makes in-context learning with examples a relatively lightweight and
concise approach to customize, correct, or improve the reasoning
and response from an LLM to unseen prompts.

By collecting relevant examples that are representative of your user queries,
you help the model maintain attention, demonstrate the expected pattern,
and also rectify incorrect or unexpected behavior. This doesn't affect other
requests that result in the expected responses.

Like all prompt engineering strategies, using few-shot examples is additive to
other LLM optimization techniques, such as
[fine-tuning](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/tune-models)
or [RAG](https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/rag-engine/rag-overview).

## How to use Example Store

The following steps outline how you might use Example Store:

1. [Create or reuse](https://docs.cloud.google.com/gemini-enterprise-agent-platform/optimize/example-store/create-examplestore)
   an `ExampleStore` resource, also called an "Example Store instance".

   - For each region and project, you can have a maximum of 50 Example Store instances.
2. Write and upload examples based on LLM responses. There are two
   possible scenarios:

   - If the behavior and response pattern of the LLM are as expected, write
     examples based on these responses and upload them to the Example Store
     instance.

   - If the LLM shows unexpected behavior or response patterns, write an
     example to demonstrate how to correct the response, and then upload it
     to the Example Store instance.

3. The uploaded examples become available immediately to the agent or LLM
   application associated with the Example Store instance.

   - If an agent based on the [Agent Development Kit](https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/adk)
     is linked to the Example Store instance, then the agent automatically
     retrieves the examples and include them in LLM request.

   - For all other LLM applications, you must search for and retrieve the
     examples, and then include them in your prompts.

You can continue adding examples iteratively to an Example Store instance whenever you
observe unexpected performance from the LLM, or encounter adversarial or
unexpected user queries. You don't need to update your code or redeploy a new
version of your LLM application. The examples become available to the agent
or application as soon as you upload them to the Example Store instance.

Additionally, you can do the following:

- Retrieve examples by performing a cosine similarity search between the search
  keys of the stored examples and those in your query.

- Filter examples by function name and refine the list of candidate examples
  to those representing the possible responses from the LLM.

- Iteratively improve your agent or LLM application.

- Share examples with multiple agents or LLM applications.

## Guidelines for authoring few-shot examples

The impact of examples on model performance depends on what kinds of examples
are included in the prompts and how they are included.

The following are generally recommended practices for authoring examples:

- **Relevance and similarity**: The examples must be closely related to the
  specific task or domain. This helps the model focus on the most relevant
  aspects of its knowledge, decreases token usage, and maintains or even
  improves performance. You need fewer examples if those are relevant to
  the conversation. The corpus of the available examples must be representative
  of possible user queries. Also, an example must be relevant to a given user
  query.

- **Complexity**: To help the LLM perform better, use examples that are of low
  complexity to demonstrate the expected reasoning.

- **Representative of the possible model outcomes**: The expected
  responses in an example must be consistent with the possible outcome. This
  lets the example clearly demonstrate reasoning that's consistent with the
  expected reasoning from the LLM for the prompt.

- **Format**: For best performance, format few-shot examples in your prompt
  in a manner that's consistent with the LLM training data and differentiated from
  the conversation history. The formatting of examples in a prompt can
  considerably impact LLM performance.

## Example use case: Function calling

You can use few-shot examples to improve function calling performance.
You can indicate the expected function call for a user query in a consistent
pattern. The example can model the expected response to the request by including
which function needs to be invoked and the arguments to include in the function
call. Consider a use case where the function `get_store_location` returns the
location of a store and its description. If a query doesn't invoke this function
as expected or shows unexpected output, you can use few-shot examples to
correct this behavior for subsequent queries.

For more information about function calling, see
[Function calling](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/tools/function-calling).

To learn more, see [Example Store quickstart](https://docs.cloud.google.com/gemini-enterprise-agent-platform/optimize/example-store/quickstart).

## What's next

- Learn how to [create an example store](https://docs.cloud.google.com/gemini-enterprise-agent-platform/optimize/example-store/create-examplestore).

- Learn how to [teach an agent with examples](https://docs.cloud.google.com/gemini-enterprise-agent-platform/optimize/example-store/upload-examples)
