## Agent Search

brings together deep information retrieval, natural-language processing, and the
latest features in large language model (LLM) processing, which helps to
understand user intent and to return the most relevant results for the user.

With Agent Search, you can build a Google-quality search
application using data that you control.

### Configure Agent Search

To set up a Agent Search, do the following:

1. Create a search data
store.
2. Create a search
application.

## Use the Agent Search as a retrieval backend for RAG Engine

Once the Agent Search is set up, follow these steps to set it
as the retrieval backend for the RAG application.

### Set the Agent Search as the retrieval backend to create a RAG corpus

These code samples show you how to configure Agent Search as
the retrieval backend for a RAG corpus.

### REST

To use the command line to create a RAG corpus, do the following:

1. Create a RAG corpus Replace the following variables used in the code sample: PROJECT_ID: The ID of your Google Cloud project. LOCATION: The region to process the request. DISPLAY_NAME: The display name of the RAG corpus that you want to create. ENGINE_NAME : The full resource name of the Agent Search engine or Agent Search Datastore. For example,`projects/PROJECT_NUMBER/locations/LOCATION/collections/default_collection/engines/ENGINE_NAME/servingConfigs/default_search` curl -X POST
-H "Authorization: Bearer $(gcloud auth print-access-token)"
-H "Content-Type: application/json"
"https://LOCATION-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/ragCorpora"
-d '{
"display_name" : "DISPLAY_NAME",
"vertex_ai_search_config" : {
"serving_config": "ENGINE_NAME/servingConfigs/default_search"
}
}'
2. Monitor progress Replace the following variables used in the code sample: PROJECT_ID: The ID of your Google Cloud project. LOCATION: The region to process the request. OPERATION_ID: The ID of the RAG corpus create operation. curl -X GET
"https://LOCATION-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/operations/OPERATION_ID"

### Python

Before trying this sample, follow the Python setup instructions in the
Agent Platform quickstart using
client libraries.

To authenticate to Agent Platform, set up Application Default Credentials.
For more information, see

Set up authentication for a local development environment.

```
from vertexai import rag
import https://docs.cloud.google.com/python/docs/reference/agentplatform/latest

# TODO(developer): Update and un-comment below lines
# PROJECT_ID = "your-project-id"
# vertex_ai_search_engine_name = "projects/{PROJECT_ID}/locations/{LOCATION}/collections/default_collection/engines/{ENGINE_ID}"
# display_name = "test_corpus"
# description = "Corpus Description"

# Initialize Vertex AI API once per session
https://docs.cloud.google.com/python/docs/reference/agentplatform/latest.init(project=PROJECT_ID, location="us-central1")

# Configure Search
vertex_ai_search_config = rag.VertexAiSearchConfig(
    serving_config=f"{vertex_ai_search_engine_name}/servingConfigs/default_search",
)

corpus = rag.create_corpus(
    display_name=display_name,
    description=description,
    vertex_ai_search_config=vertex_ai_search_config,
print(corpus)
# Example response:
# RagCorpus(name='projects/1234567890/locations/us-central1/ragCorpora/1234567890',
# display_name='test_corpus', description='Corpus Description'.
# ...

```

### Retrieve contexts using the RAG API

After the RAG corpus creation, relevant contexts can be retrieved from
Agent Search through the `RetrieveContexts` API.

### REST

This code sample demonstrates how to retrieve contexts using REST.

Replace the following variables used in the code sample:

- PROJECT_ID: The ID of your Google Cloud project.
- LOCATION: The region to process the request.
- RAG_CORPUS_RESOURCE : The name of the RAG corpus resource. Format:
`projects/{project}/locations/{location}/ragCorpora/{rag_corpus}.`
- TEXT: The query text to get relevant contexts. curl -X POST
"https://LOCATION-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION:retrieveContexts"
"vertex_rag_store": {
"rag_resources": {
"rag_corpus": "RAG_CORPUS_RESOURCE"
},
"query": {
"text": "TEXT"

### Python

To learn how to install or update the Vertex AI SDK for Python, see Install the Vertex AI SDK for Python.

For more information, see the
Python API reference documentation.

```
import vertexai

# TODO(developer): Update and un-comment below lines
# PROJECT_ID = "your-project-id"
# corpus_name = "projects/[PROJECT_ID]/locations/us-central1/ragCorpora/[rag_corpus_id]"

# Initialize Vertex AI API once per session
vertexai.init(project=PROJECT_ID, location="us-central1")

response = rag.retrieval_query(
    rag_resources=[
        rag.RagResource(
            rag_corpus=corpus_name,
            # Optional: supply IDs from `rag.list_files()`.
            # rag_file_ids=["rag-file-1", "rag-file-2", ...],
    ],
    text="Hello World!",
    rag_retrieval_config=rag.RagRetrievalConfig(
        top_k=10,
        filter=rag.utils.resources.Filter(vector_distance_threshold=0.5),
    ),
print(response)
# Example response:
# contexts {
#   contexts {
#     source_uri: "gs://your-bucket-name/file.txt"
#     text: "....
#   ....

```

### Generate content using Agent Platform Gemini API

### REST

To generate content using Gemini models, make a call to the
Agent Platform `GenerateContent` API. By specifying the
`RAG_CORPUS_RESOURCE` in the request, it automatically retrieves data from
Agent Search.

Replace the following variables used in the sample code:

- MODEL_ID : LLM model for content generation. For
example, `gemini-2.0-flash`.
- GENERATION_METHOD : LLM method for content generation.
For example, `generateContent`, `streamGenerateContent`.
- INPUT_PROMPT: The text that is sent to the LLM for
content generation. Try to use a prompt relevant to the documents in
- RAG_CORPUS_RESOURCE : The name of the RAG corpus
resource. Format:
- SIMILARITY_TOP_K: Optional: The number of top
contexts
to retrieve. curl -X POST \
-H "Authorization: Bearer $(gcloud auth print-access-token)" \
-H "Content-Type: application/json" \
"https://LOCATION-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/publishers/google/models/MODEL_ID:GENERATION_METHOD" \
 "contents": {
 "role": "user",
 "parts": {
 "text": "INPUT_PROMPT"
 "tools": {
 "retrieval": {
 "disable_attribution": false,
 "similarity_top_k": SIMILARITY_TOP_K

### Python

To learn how to install or update the Vertex AI SDK for Python, see Install the Vertex AI SDK for Python.

```
from vertexai.generative_models import GenerativeModel, Tool

# TODO(developer): Update and un-comment below lines
# PROJECT_ID = "your-project-id"
# corpus_name = "projects/{PROJECT_ID}/locations/us-central1/ragCorpora/{rag_corpus_id}"

# Initialize Vertex AI API once per session

rag_retrieval_tool = Tool.from_retrieval(
    retrieval=rag.Retrieval(
        source=rag.VertexRagStore(

rag_model = GenerativeModel(
    model_name="gemini-2.0-flash-001", tools=[rag_retrieval_tool]
response = rag_model.generate_content("Why is the sky blue?")
print(response.text)
# Example response:
#   The sky appears blue due to a phenomenon called Rayleigh scattering.
#   Sunlight, which contains all colors of the rainbow, is scattered
#   by the tiny particles in the Earth's atmosphere....
#   ...

```

## What's next

- Retrieval and ranking
