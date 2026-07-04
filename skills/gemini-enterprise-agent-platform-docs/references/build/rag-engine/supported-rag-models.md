## Gemini models

The following models support RAG Engine:

#### Click to expand supported models

- Gemini 3.5 Flash
- Gemini 3.1 Flash-Lite
- Gemini 3.1 Pro preview
- Gemini 3 Flash preview
- Gemini 2.5 Pro
- Gemini 2.5 Flash preview
- Gemini 2.5 Flash-Lite preview
- Gemini 2.5 Flash
- Gemini 2.5 Flash-Lite

Fine-tuned Gemini models are unsupported when the Gemini
models use RAG Engine on Gemini Enterprise Agent Platform.

## Self-deployed models

RAG Engine on Gemini Enterprise Agent Platform supports all models in
Model Garden.

Use RAG Engine with your self-deployed open model endpoints.

Replace the variables used in the code sample:

- PROJECT_ID: Your project ID.
- LOCATION: The region to process your request.
- ENDPOINT_ID: Your endpoint ID. # Create a model instance with your self-deployed open model endpoint
 rag_model = GenerativeModel(
 "projects/PROJECT_ID/locations/LOCATION/endpoints/ENDPOINT_ID",
 tools=[rag_retrieval_tool]
 )

## Models with managed APIs on Agent Platform

The models with managed APIs on Agent Platform that support
RAG Engine include the following:

- Mistral on
Agent Platform
- Llama 3.1 and 3.2

The following code sample demonstrates how to use the Gemini
`GenerateContent` API to create a generative model instance. The model ID,
`/publisher/meta/models/llama-3.1-405B-instruct-maas`, is found in the
model card.

- RAG_RETRIEVAL_TOOL: Your RAG retrieval tool. # Create a model instance with Llama 3.1 MaaS endpoint
 "projects/PROJECT_ID/locations/LOCATION/publisher/meta/models/llama-3.1-405B-instruct-maas",
 tools=RAG_RETRIEVAL_TOOL

The following code sample demonstrates how to use the OpenAI compatible
`ChatCompletions` API to generate a model response.

- MODEL_ID : LLM model for content generation. For example, `meta/llama-3.1-405b-instruct-maas`.
- INPUT_PROMPT: The text sent to the LLM for content generation. Use a prompt relevant to the documents in Agent Search.
- RAG_CORPUS_ID: The ID of the RAG corpus resource.
- ROLE: Your role.
- USER: Your username.
- CONTENT: Your content. # Generate a response with Llama 3.1 MaaS endpoint
 response = client.chat.completions.create(
 model="MODEL_ID",
 messages=[{"ROLE": "USER", "content": "CONTENT"}],
 extra_body={
 "extra_body": {
 "google": {
 "vertex_rag_store": {
 "rag_resources": {
 "rag_corpus": "RAG_CORPUS_ID"
 },
 "similarity_top_k": 10
 }

## What's next

- Use Embedding models with RAG Engine.
