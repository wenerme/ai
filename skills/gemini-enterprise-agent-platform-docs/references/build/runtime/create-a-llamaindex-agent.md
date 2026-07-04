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

Agent Runtime lets you develop and deploy agents using the LlamaIndex
Query Pipelines template. By using the `LlamaIndexQueryPipelineAgent` class in
the `Agent Platform SDK`, you can create agents designed for Retrieval-Augmented
Generation (RAG).

This document explains how to develop a LlamaIndex Query Pipeline agent,
including defining the model, setting up a retriever, and synthesizing
responses.

For more information on managing your deployed agents, see
[Manage deployed agents](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/runtime/manage-deployed-agents).

## Before you begin

Make sure your environment is set up by following
the steps in [Set up your environment](https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/runtime/setup).

## Define and configure a model

Define and configure a model for your LlamaIndex Query Pipeline agent to use:

1. Specify the model you want to use:

       model = "gemini-2.0-flash"

2. Optional: Specify [model parameters](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/capabilities/image-understanding#set_model_parameters):

       model_kwargs = {
           # vertexai_config (dict): By providing the region and project_id parameters,
           # you can enable model usage through Agent Platform.
           "vertexai_config": {
               "project": "PROJECT_ID",
               "location": "LOCATION"
           },
           # temperature (float): The sampling temperature controls the degree of
           # randomness in token selection.
           "temperature": 0.28,
           # context_window (int): The context window of the model.
           # If not provided, the default context window is 200000.
           "context_window": 200000,
           # max_tokens (int): Token limit determines the maximum
           # amount of text output from one prompt. If not provided,
           # the default max_tokens is 256.
           "max_tokens": 256,
       }

3. Create a [`LlamaIndexQueryPipelineAgent`](https://docs.cloud.google.com/python/docs/reference/vertexai/latest/vertexai.preview.reasoning_engines.LlamaIndexQueryPipelineAgent) using the following model configurations:

       from vertexai.preview import reasoning_engines

       agent = reasoning_engines.LlamaIndexQueryPipelineAgent(
           model=model,                # Required.
           model_kwargs=model_kwargs,  # Optional.
       )

4. If you are running in an interactive environment (such as the terminal or Colab notebook), you can query the agent:

       response = agent.query(input="What is Paul Graham's life in college?")

       print(response)

   You should receive a response similar to the following:

       {'message': {'role': 'assistant',
         'additional_kwargs': {},
         'blocks': [{'block_type': 'text',
           'text': "Unfortunately, there's not a lot of publicly available information about Paul Graham's personal life in college. ..."}]},
         'raw': {'content': {'parts': [{'video_metadata': None,
             'thought': None,
             'code_execution_result': None,
             'executable_code': None,
             'file_data': None,
             'function_call': None,
             'function_response': None,
             'inline_data': None,
             'text': "Unfortunately, there's not a lot of publicly available information about Paul Graham's personal life in college. ..."}],
           'role': 'model'},
           'citation_metadata': None,
           'finish_message': None,
           'token_count': None,
           'avg_logprobs': -0.1468650027438327,
           'finish_reason': 'STOP',
           'grounding_metadata': None,
           'index': None,
           'logprobs_result': None,
           'safety_ratings': [{'blocked': None,
             'category': 'HARM_CATEGORY_HATE_SPEECH',
             'probability': 'NEGLIGIBLE',
             'probability_score': 0.022949219,
             'severity': 'HARM_SEVERITY_NEGLIGIBLE',
             'severity_score': 0.014038086},
           {'blocked': None,
             'category': 'HARM_CATEGORY_DANGEROUS_CONTENT',
             'probability': 'NEGLIGIBLE',
             'probability_score': 0.056640625,
             'severity': 'HARM_SEVERITY_NEGLIGIBLE',
             'severity_score': 0.029296875},
           {'blocked': None,
             'category': 'HARM_CATEGORY_HARASSMENT',
             'probability': 'NEGLIGIBLE',
             'probability_score': 0.071777344,
             'severity': 'HARM_SEVERITY_NEGLIGIBLE',
             'severity_score': 0.024047852},
           {'blocked': None,
             'category': 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
             'probability': 'NEGLIGIBLE',
             'probability_score': 0.103515625,
             'severity': 'HARM_SEVERITY_NEGLIGIBLE',
             'severity_score': 0.05102539}],
           'usage_metadata': {'cached_content_token_count': None,
           'candidates_token_count': 222,
           'prompt_token_count': 10,
           'total_token_count': 232}},
         'delta': None,
         'logprobs': None,
         'additional_kwargs': {}}

> [!NOTE]
> **Note:** The response in the `text` field demonstrates that the agent cannot answer the question about Paul Graham's college life without relevant information. To help the agent provide a more informed answer, you can equip the agent with a [retriever](https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/runtime/create-a-llamaindex-agent#define-retriever).

### Optional: Customize your model

The
[`LlamaIndexQueryPipelineAgent`](https://docs.cloud.google.com/python/docs/reference/vertexai/latest/vertexai.preview.reasoning_engines.LlamaIndexQueryPipelineAgent)
template uses [`Google
GenAI`](https://docs.llamaindex.ai/en/stable/examples/llm/google_genai/) by
default to provide access to all foundational models available in Google Cloud.
To use a model that isn't available through `Google GenAI`, define
`model_builder=` as follows:

    from typing import Optional

    def model_builder(
        *,
        model_name: str,                      # Required. The name of the model
        model_kwargs: Optional[dict] = None,  # Optional. The model keyword arguments.
        **kwargs,                             # Optional. The remaining keyword arguments to be ignored.
    ):

For a list of the chat models supported in `LlamaIndexQueryPipeline` and their
capabilities, see [Available LLM
integrations](https://docs.llamaindex.ai/en/stable/module_guides/models/llms/modules/).
Each chat model uses their own set of supported values for `model=` and
`model_kwargs=`.

### Google GenAI

Google GenAI is installed by default when you [set up your environment](https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/runtime/create-a-llamaindex-agent#before-you-begin) and is automatically used in [`LlamaIndexQueryPipelineAgent`](https://docs.cloud.google.com/python/docs/reference/vertexai/latest/vertexai.preview.reasoning_engines.LlamaIndexQueryPipelineAgent) when you omit `model_builder`.

    from vertexai.preview import reasoning_engines

    agent = reasoning_engines.LlamaIndexQueryPipelineAgent(
        model=model,                # Required.
        model_kwargs=model_kwargs,  # Optional.
    )

### Anthropic

1. Follow the [Anthropic documentation](https://docs.llamaindex.ai/en/stable/examples/llm/anthropic/) to set up an account and install the `llama-index-llms-anthropic` package.

2. Define `model_builder` to return the `Anthropic` model:

       def model_builder(*, model_name: str, model_kwargs = None, **kwargs):
           from llama_index.llms.anthropic import Anthropic

           return Anthropic(model=model_name, **model_kwargs)

3. Use the Anthropic model in [`LlamaIndexQueryPipelineAgent`](https://docs.cloud.google.com/python/docs/reference/vertexai/latest/vertexai.preview.reasoning_engines.LlamaIndexQueryPipelineAgent):

       from vertexai.preview import reasoning_engines

       agent = reasoning_engines.LlamaIndexQueryPipelineAgent(
           model="claude-3-opus-20240229",           # Required.
           model_builder=model_builder,              # Required.
           model_kwargs={
               "api_key": "ANTHROPIC_API_KEY",    # Required.
               "temperature": 0.28,                  # Optional.
           },
       )

### OpenAILike

You can use `OpenAILike` with Gemini's `ChatCompletions` API.

1. Follow the [`OpenAILike`
   documentation](https://docs.llamaindex.ai/en/stable/api_reference/llms/openai_like/)
   to install the package:

       pip install llama-index-llms-openai-like

2. Define a `model_builder` that returns the `OpenAILike` model:

       def model_builder(
           *,
           model_name: str,
           model_kwargs = None,
           project: str,   # Specified via vertexai.init
           location: str,  # Specified via vertexai.init
           **kwargs,
       ):
           import google.auth
           from llama_index.llms.openai_like import OpenAILike

           # Note: the credential lives for 1 hour by default.
           # After expiration, it must be refreshed.
           creds, _ = google.auth.default(scopes=["https://www.googleapis.com/auth/cloud-platform"])
           auth_req = google.auth.transport.requests.Request()
           creds.refresh(auth_req)

           if model_kwargs is None:
               model_kwargs = {}

           endpoint = f"https://{location}-aiplatform.googleapis.com"
           api_base = f'{endpoint}/v1beta1/projects/{project}/locations/{location}/endpoints/openapi'

           return OpenAILike(
               model=model_name,
               api_base=api_base,
               api_key=creds.token,
               **model_kwargs,
           )

3. Use the model in [`LlamaIndexQueryPipelineAgent`](https://docs.cloud.google.com/python/docs/reference/vertexai/latest/vertexai.preview.reasoning_engines.LlamaIndexQueryPipelineAgent):

       from vertexai.preview import reasoning_engines

       agent = reasoning_engines.LlamaIndexQueryPipelineAgent(
           model="google/gemini-2.0-flash",  # Or "meta/llama3-405b-instruct-maas"
           model_builder=model_builder,        # Required.
           model_kwargs={
               "temperature": 0,               # Optional.
               "max_retries": 2,               # Optional.
           },
       )

## Define and use a retriever

After you define your model, define the retriever that your model uses for
reasoning. A
[retriever](https://docs.llamaindex.ai/en/stable/module_guides/querying/retriever/)
can be built on top of
[indexes](https://docs.llamaindex.ai/en/stable/module_guides/indexing/), but can
also be defined
[comprehensively](https://docs.llamaindex.ai/en/stable/module_guides/querying/retriever/retrievers/#comprehensive-retriever-guides).
You should test your retriever locally.

1. Define a retriever that returns relevant documents and similarity scores:

       def retriever_builder(model, retriever_kwargs=None):
           import os
           import requests
           from llama_index.core import (
               StorageContext,
               VectorStoreIndex,
               load_index_from_storage,
           )
           from llama_index.core import SimpleDirectoryReader
           from llama_index.embeddings.vertex import VertexTextEmbedding
           import google.auth

           credentials, _ = google.auth.default()
           embed_model = VertexTextEmbedding(
               model_name="text-embedding-005", project="PROJECT_ID", credentials=credentials
           )

           data_dir = "data/paul_graham"
           essay_file = os.path.join(data_dir, "paul_graham_essay.txt")
           storage_dir = "storage"

           # --- Simple Download (if needed) ---
           if not os.path.exists(essay_file):
               os.makedirs(data_dir, exist_ok=True)  # Make sure the directory exists
               essay_url = "https://raw.githubusercontent.com/run-llama/llama_index/main/docs/docs/examples/data/paul_graham/paul_graham_essay.txt"
               try:
                   response = requests.get(essay_url)
                   response.raise_for_status()  # Check for download errors
                   with open(essay_file, "wb") as f:
                       f.write(response.content)
                   print("Essay downloaded.")
               except requests.exceptions.RequestException as e:
                   print(f"Download failed: {e}")

           # --- Build/Load Index ---
           if not os.path.exists(storage_dir):
               print("Creating new index...")
               # --- Load Data ---
               reader = SimpleDirectoryReader(data_dir)
               docs = reader.load_data()

               index = VectorStoreIndex.from_documents(docs, model=model, embed_model=embed_model)
               index.storage_context.persist(persist_dir=storage_dir)
           else:
               print("Loading existing index...")
               storage_context = StorageContext.from_defaults(persist_dir=storage_dir)
               index = load_index_from_storage(storage_context, embed_model=embed_model)

           return index.as_retriever()

2. Test the retriever:

       from llama_index.llms.google_genai import GoogleGenAI

       model = GoogleGenAI(
           model=model,
           **model_kwargs
       )
       retriever = retriever_builder(model)
       retrieved_response = retriever.retrieve("What is Paul Graham's life in College?")

   The retrieved response should be similar to the following:

       [
         NodeWithScore(
           node=TextNode(
             id_='692a5d5c-cd56-4ed0-8e29-ecadf6eb9933',
             embedding=None,
             metadata={'file_path': '/content/data/paul_graham/paul_graham_essay.txt', 'file_name': 'paul_graham_essay.txt', 'file_type': 'text/plain', 'file_size': 75042, 'creation_date': '2025-03-24', 'last_modified_date': '2025-03-24'},
             excluded_embed_metadata_keys=['file_name', 'file_type', 'file_size', 'creation_date', 'last_modified_date', 'last_accessed_date'],
             excluded_llm_metadata_keys=['file_name', 'file_type', 'file_size', 'creation_date', 'last_modified_date', 'last_accessed_date'],
             relationships={
               <NodeRelationship.SOURCE: '1'>: RelatedNodeInfo(node_id='3e1c4d73-1e1d-4e83-bd16-2dae24abb231', node_type='4', metadata={'file_path': '/content/data/paul_graham/paul_graham_essay.txt', 'file_name': 'paul_graham_essay.txt', 'file_type': 'text/plain', 'file_size': 75042, 'creation_date': '2025-03-24', 'last_modified_date': '2025-03-24'}, hash='0c3c3f46cac874b495d944dfc4b920f6b68817dbbb1699ecc955d1fafb2bf87b'), <NodeRelationship.PREVIOUS: '2'>: RelatedNodeInfo(node_id='782c5787-8753-4f65-85ed-c2833ea6d4d8', node_type='1', metadata={'file_path': '/content/data/paul_graham/paul_graham_essay.txt', 'file_name': 'paul_graham_essay.txt', 'file_type': 'text/plain', 'file_size': 75042, 'creation_date': '2025-03-24', 'last_modified_date': '2025-03-24'}, hash='b8e6463833887a8a2b13f1b5a623672819faedc1b725d9565ba003223628db0e'), <NodeRelationship.NEXT: '3'>: RelatedNodeInfo(node_id='f7d2cb7e-fa0c-40bf-b8e7-b888e36b87f9', node_type='1', metadata={}, hash='db7cc1a67fa3afd1e5f24c8c61583781ce6a00c444da8f25a5374468c17b7de0')
             },
             metadata_template='{key}: {value}',
             metadata_separator='\n',
             text='So I looked around to see what I could salvage from the wreckage of my plans, and there was Lisp...',
             mimetype='text/plain',
             start_char_idx=7166,
             end_char_idx=11549,
             metadata_separator='\n',
             text_template='{metadata_str}\n\n{content}'
           ),
           score=0.7403571819090398
         )
       ]

3. To use the retriever inside [`LlamaIndexQueryPipelineAgent`](https://docs.cloud.google.com/python/docs/reference/vertexai/latest/vertexai.preview.reasoning_engines.LlamaIndexQueryPipelineAgent), add it under the `retriever_builder=` argument:

       from vertexai.preview import reasoning_engines

       agent = reasoning_engines.LlamaIndexQueryPipelineAgent(
           model=model,                          # Required.
           model_kwargs=model_kwargs,            # Optional.
           retriever_builder=retriever_builder,  # Optional.
       )

4. Test the agent locally by performing test queries:

       response = agent.query(
           input="What is Paul Graham's life in College?"
       )

   The response is a JSON serializable list of nodes with scores.

       [{'node': {'id_': '692a5d5c-cd56-4ed0-8e29-ecadf6eb9933',
         'embedding': None,
         'metadata': {'file_path': '/content/data/paul_graham/paul_graham_essay.txt',
           'file_name': 'paul_graham_essay.txt',
           'file_type': 'text/plain',
           'file_size': 75042,
           'creation_date': '2025-03-12',
           'last_modified_date': '2025-03-12'},
         'excluded_embed_metadata_keys': ['file_name',
           'file_type',
           'file_size',
           'creation_date',
           'last_modified_date',
           'last_accessed_date'],
         'excluded_llm_metadata_keys': ['file_name',
           'file_type',
           'file_size',
           'creation_date',
           'last_modified_date',
           'last_accessed_date'],
         'relationships': {'1': {'node_id': '07ee9574-04c8-46c7-b023-b22ba9558a1f',
           'node_type': '1',
           'metadata': {},
           'hash': '44136fa355b3678a1146ad16f7e8649e94fb4fc21fe77e8310c060f61caaff8a',
           'class_name': 'RelatedNodeInfo'},
           '2': {'node_id': 'ac7e54aa-6fff-40b5-a15e-89c5eb234936',
           'node_type': '1',
           'metadata': {'file_path': '/content/data/paul_graham/paul_graham_essay.txt',
             'file_name': 'paul_graham_essay.txt',
             'file_type': 'text/plain',
             'file_size': 75042,
             'creation_date': '2025-03-12',
             'last_modified_date': '2025-03-12'},
           'hash': '755327a01efe7104db771e4e6f9683417884ea6895d878da882d2b21a6b66442',
           'class_name': 'RelatedNodeInfo'},
           '3': {'node_id': '3a04be27-ac46-4acd-a8c6-031689508982',
           'node_type': '1',
           'metadata': {},
           'hash': 'db7cc1a67fa3afd1e5f24c8c61583781ce6a00c444da8f25a5374468c17b7de0',
           'class_name': 'RelatedNodeInfo'}},
         'metadata_template': '{key}: {value}',
         'metadata_separator': '\n',
         'text': 'So I looked around to see what I could salvage from the wreckage of my plans, and there was Lisp...',
         'mimetype': 'text/plain',
         'start_char_idx': 7164,
         'end_char_idx': 11547,
         'metadata_separator': '\n',
         'text_template': '{metadata_str}\n\n{content}',
         'class_name': 'TextNode'},
         'score': 0.25325886336265013,
         'class_name': 'NodeWithScore'}
       ]

## Define and use a response synthesizer

After you define your model and retriever, define the [response-synthesizer](https://docs.llamaindex.ai/en/stable/module_guides/querying/response_synthesizers/) that generates a response from an LLM using a user query and a given set of text chunks.
You can use the default [get_response_synthesizer](https://docs.llamaindex.ai/en/stable/module_guides/querying/response_synthesizers/#get-started)
or configure the [response mode](https://docs.llamaindex.ai/en/stable/module_guides/querying/response_synthesizers/#configuring-the-response-mode).

1. Define a response synthesizer that returns the answer:

       def response_synthesizer_builder(model, response_synthesizer_kwargs=None):
           from llama_index.core.response_synthesizers import SimpleSummarize

           return SimpleSummarize(llm=model)

2. Test the function:

       response_synthesizer = response_synthesizer_builder(model=model)
       response = response_synthesizer.get_response(
           "What is Paul Graham's life in College?",
           [node.model_dump_json() for node in retrieved_response],
       )

   The response should be similar to the following:

       "While in a PhD program for computer science, he took art classes and worked on a book about Lisp hacking. He applied to art schools, got accepted to RISD, and later got an invitation to take the entrance exam at the Accademia di Belli Arti in Florence. He was accepted to both. He attended the Accademia, but was disappointed by the lack of instruction."

3. To use the response synthesizer inside [`LlamaIndexQueryPipelineAgent`](https://docs.cloud.google.com/python/docs/reference/vertexai/latest/vertexai.preview.reasoning_engines.LlamaIndexQueryPipelineAgent), add it under the `response_synthesizer_builder=` argument:

       from vertexai.preview import reasoning_engines

       agent = reasoning_engines.LlamaIndexQueryPipelineAgent(
           model=model,                                                    # Required.
           model_kwargs=model_kwargs,                                      # Optional.
           retriever_builder=retriever_builder,                            # Optional.
           response_synthesizer_builder=response_synthesizer_builder,      # Optional.
       )

4. Test the full RAG query pipeline locally by running test queries:

       response = agent.query(
           input="What is Paul Graham's life in College?"
       )

   The response is a dictionary that is similar to the following:

       {
         'response': "While in college, he was drawn to McCarthy's 1960 Lisp, although he didn't fully grasp the reasons for his interest at the time. He also had a brief encounter with surplus Xerox Dandelions in the computer lab but found them too slow for his liking. \n",
         'source_nodes': [
           '{"node":{"id_":"95889c30-53c7-43d0-bf91-930dbb23bde6"...,"score":0.7077213268404997,"class_name":"NodeWithScore"}'
         ],
         'metadata': {
           '95889c30-53c7-43d0-bf91-930dbb23bde6': {
             'file_path': '/content/data/paul_graham/paul_graham_essay.txt',
             'file_name': 'paul_graham_essay.txt',
             'file_type': 'text/plain',
             'file_size': 75042,
             'creation_date': '2025-03-25',
             'last_modified_date': '2025-03-25'
           }
         }
       }

## Optional: Customize the prompt template

Prompt templates translate user input into model instructions, guiding responses
for contextually relevant and coherent output. See
[Prompts](https://docs.llamaindex.ai/en/stable/module_guides/models/prompts/)
for details.

The default prompt template is organized sequentially into the following sections:

| Section | Description |
|---|---|
| Optional: System instruction | Instructions for the agent to be applied across all queries. |
| User input | The query from the user for the agent to respond to. |

The default prompt template is generated if you create the agent without
specifying your own prompt template, and looks like the following:

    from llama_index.core import prompts
    from llama_index.core.base.llms import types

    message_templates = [
      types.ChatMessage(role=types.MessageRole.SYSTEM, content=system_instruction),
      types.ChatMessage(role=types.MessageRole.USER, content="{input}"),
    ]
    prompts.ChatPromptTemplate(message_templates=message_templates)

You can use the full prompt template when you instantiate the agent
in the following example:

      from vertexai.preview import reasoning_engines

      system_instruction = "I help to find what is Paul Graham's life in College"

      agent = reasoning_engines.LlamaIndexQueryPipelineAgent(
          model=model,
          system_instruction=system_instruction,
      )

You can override the default prompt template with your own prompt template, and
use it when constructing the agent:

    prompt_str = "Please answer {question} about {name}"
    prompt_tmpl = PromptTemplate(prompt_str)

    from vertexai.preview import reasoning_engines
    agent = reasoning_engines.LlamaIndexQueryPipelineAgent(
        model = model,
        prompt = prompt_tmpl,
    )

    agent.query(
        input={
            "name": "Paul Graham",
            "question": "What is the life in college?",
        }
    )

## Optional: Customize the orchestration

All `LlamaIndexQueryPipeline` components implement the [Query Component
interface](https://docs.llamaindex.ai/en/stable/api_reference/query_pipeline/#llama_index.core.base.query_pipeline.query.QueryComponent),
which provides input and output schemas for orchestration. The
[`LlamaIndexQueryPipelineAgent`](https://docs.cloud.google.com/python/docs/reference/vertexai/latest/vertexai.preview.reasoning_engines.LlamaIndexQueryPipelineAgent)
class requires a runnable to be built for it to respond to queries. By default,
[`LlamaIndexQueryPipelineAgent`](https://docs.cloud.google.com/python/docs/reference/vertexai/latest/vertexai.preview.reasoning_engines.LlamaIndexQueryPipelineAgent)
builds a [sequential chain or Directed Acyclic Graph
(DAG)](https://www.llamaindex.ai/blog/introducing-query-pipelines-025dc2bb0537)
using [`Query
Pipeline`](https://docs.llamaindex.ai/en/stable/module_guides/querying/pipeline/).

You might want to customize the orchestration if you intend to do either of the following:

- Implement an agent that extends the RAG pipeline (such as extending an
  existing Prompt, Model, Retriever, Response Synthesizer module to [Query
  Engine](https://docs.llamaindex.ai/en/stable/module_guides/querying/pipeline/module_usage/#query-engines),
  [Query
  Transformer](https://docs.llamaindex.ai/en/stable/module_guides/querying/pipeline/module_usage/#query-transforms),
  [Output
  Parsers](https://docs.llamaindex.ai/en/stable/module_guides/querying/pipeline/module_usage/#output-parsers),
  [Postprocessor/Rerankers](https://docs.llamaindex.ai/en/stable/module_guides/querying/pipeline/module_usage/#postprocessorsrerankers)
  or [Custom Query
  Component](https://docs.llamaindex.ai/en/stable/module_guides/querying/pipeline/usage_pattern/#defining-a-custom-query-component)).

- Prompt the agent using
  [ReAct](https://docs.llamaindex.ai/en/stable/examples/agent/react_agent/) to
  execute tools and annotate each step with comments for why it performed that
  step. To do so, override the default runnable when creating
  [`LlamaIndexQueryPipelineAgent`](https://docs.cloud.google.com/python/docs/reference/vertexai/latest/vertexai.preview.reasoning_engines.LlamaIndexQueryPipelineAgent)
  by specifying the `runnable_builder=` argument:

      from typing import Optional
      from llama_index.core.llms import function_calling

      def runnable_builder(
          model: function_calling.FunctionCallingLLM,
          *,
          system_instruction: Optional[str] = None,
          prompt: Optional[query.QUERY_COMPONENT_TYPE] = None,
          retriever: Optional[query.QUERY_COMPONENT_TYPE] = None,
          response_synthesizer: Optional[query.QUERY_COMPONENT_TYPE] = None,
          runnable_kwargs: Optional[Mapping[str, Any]] = None,
      ):

  Where:
  - `model` corresponds to the chat model being returned from the `model_builder` (see [Define and configure a model](https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/runtime/create-a-llamaindex-agent#custom-model)).
  - `retriever` and `retriever_kwargs` correspond to the retriever and configurations to be used (see [Define a retriever](https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/runtime/create-a-llamaindex-agent#define-retriever)).
  - `response_synthesizer` and `response_synthesizer_kwargs` correspond to the response synthesizer and configurations to be used (see [Define a response
    synthesizer](https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/runtime/create-a-llamaindex-agent#define-response-synthesizer)).
  - `system_instruction` and `prompt` correspond to the prompt configuration (see [Customize the prompt template](https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/runtime/create-a-llamaindex-agent#prompt-template)).
  - `agent_executor_kwargs` and `runnable_kwargs` are the keyword arguments you can use for customizing the runnable.

You can customize the orchestration logic using a custom pipeline or ReAct:

### Custom pipeline

To provide an extra module (such as a Postprocessor) to the agent, override the `runnable_builder` for [`LlamaIndexQueryPipelineAgent`](https://docs.cloud.google.com/python/docs/reference/vertexai/latest/vertexai.preview.reasoning_engines.LlamaIndexQueryPipelineAgent).

1. Define a Postprocessor:

       def post_processor_builder():
         from llama_index.core.postprocessor import SimilarityPostprocessor

         # similarity postprocessor: filter nodes below 0.7 similarity score
         return SimilarityPostprocessor(similarity_cutoff=0.7)

       def runnable_with_postprocessor_builder(
           model, runnable_kwargs, **kwargs
       ):
         from llama_index.core.query_pipeline import QueryPipeline

         pipeline = QueryPipeline(**runnable_kwargs)
         pipeline_modules = {
             "retriever": retriever_builder(model),
             "postprocessor": post_processor_builder(),
         }
         pipeline.add_modules(pipeline_modules)
         pipeline.add_link("retriever", "postprocessor")

         return pipeline

       agent = reasoning_engines.LlamaIndexQueryPipelineAgent(
         model=model,
         runnable_builder=runnable_with_postprocessor_builder,
       )

2. Query the agent:

       result = agent.query(input="What is Paul Graham's life in College?")

   The output should be similar to the following:

       [
         {
           'node': {'id_': 'bb7d2942-213d-4fb3-a7cb-1a664642a7ff',
           'embedding': None,
           'metadata': {
             'file_path': '/content/data/paul_graham/paul_graham_essay.txt',
             'file_name': 'paul_graham_essay.txt',
             'file_type': 'text/plain',
             'file_size': 75042,
             'creation_date': '2025-03-25',
             'last_modified_date': '2025-03-25'
           },
           'excluded_embed_metadata_keys': [
             'file_name',
             'file_type',
             'file_size',
             'creation_date',
             'last_modified_date',
             'last_accessed_date'
           ],
           'excluded_llm_metadata_keys': [
             'file_name',
             'file_type',
             'file_size',
             'creation_date',
             'last_modified_date',
             'last_accessed_date'
           ],
           'relationships': {'1': {'node_id': 'c508cee5-5ef2-4fdf-a33d-0427dcb78b5c',
             'node_type': '4',
             'metadata': {'file_path': '/content/data/paul_graham/paul_graham_essay.txt',
               'file_name': 'paul_graham_essay.txt',
               'file_type': 'text/plain',
               'file_size': 75042,
               'creation_date': '2025-03-25',
               'last_modified_date': '2025-03-25'},
             'hash': '0c3c3f46cac874b495d944dfc4b920f6b68817dbbb1699ecc955d1fafb2bf87b',
             'class_name': 'RelatedNodeInfo'},
             '2': {'node_id': '97a84b41-62bf-4959-acae-cfd4bdfbd4d9',
             'node_type': '1',
             'metadata': {'file_path': '/content/data/paul_graham/paul_graham_essay.txt',
               'file_name': 'paul_graham_essay.txt',
               'file_type': 'text/plain',
               'file_size': 75042,
               'creation_date': '2025-03-25',
               'last_modified_date': '2025-03-25'},
             'hash': 'a7dd352be97e47e8e553ceda3d2d2c9e9d5c54adb298063c94da06167938d583',
             'class_name': 'RelatedNodeInfo'},
             '3': {'node_id': 'b984eea1-f0bc-4880-812e-3f49f1e304b8',
             'node_type': '1',
             'metadata': {},
             'hash': 'db7cc1a67fa3afd1e5f24c8c61583781ce6a00c444da8f25a5374468c17b7de0',
             'class_name': 'RelatedNodeInfo'}},
           'metadata_template': '{key}: {value}',
           'metadata_separator': '\n',
           'text': 'So I looked around to see what I could salvage from the wreckage of my plans, and there was Lisp...',
           'mimetype': 'text/plain',
           'start_char_idx': 7166,
           'end_char_idx': 11549,
           'metadata_separator': '\n',
           'text_template': '{metadata_str}\n\n{content}',
           'class_name': 'TextNode'},
           'score': 0.7403571819090398,
           'class_name': 'NodeWithScore'
         },
         {
           'node': {'id_': 'b984eea1-f0bc-4880-812e-3f49f1e304b8...'}
           'score': 0.7297395567513889,
           'class_name': 'NodeWithScore'
         }
       ]

### ReAct Agent

To provide [tool-calling behavior](https://docs.llamaindex.ai/en/stable/module_guides/deploying/agents/tools/#functiontool) with your own ReAct agent,
override `runnable_builder` for [`LlamaIndexQueryPipelineAgent`](https://docs.cloud.google.com/python/docs/reference/vertexai/latest/vertexai.preview.reasoning_engines.LlamaIndexQueryPipelineAgent).

1. Define an example function that returns an exchange rate:

       def get_exchange_rate(
         currency_from: str = "USD",
         currency_to: str = "EUR",
         currency_date: str = "latest",
       ):
         """Retrieves the exchange rate between two currencies on a specified date.

         Uses the Frankfurter API (https://api.frankfurter.app/) to obtain
         exchange rate data.

         Args:
             currency_from: The base currency (3-letter currency code).
                 Defaults to "USD" (US Dollar).
             currency_to: The target currency (3-letter currency code).
                 Defaults to "EUR" (Euro).
             currency_date: The date for which to retrieve the exchange rate.
                 Defaults to "latest" for the most recent exchange rate data.
                 Can be specified in YYYY-MM-DD format for historical rates.

         Returns:
             dict: A dictionary containing the exchange rate information.
                 Example: {"amount": 1.0, "base": "USD", "date": "2023-11-24",
                     "rates": {"EUR": 0.95534}}
         """
         import requests
         response = requests.get(
             f"https://api.frankfurter.app/{currency_date}",
             params={"from": currency_from, "to": currency_to},
         )
         return response.json()

2. Create a custom [ReAct agent](https://docs.llamaindex.ai/en/stable/api_reference/agent/react/#llama_index.core.agent.react.ReActAgent) with tools:

       def runnable_with_tools_builder(model, runnable_kwargs=None, **kwargs):
         from llama_index.core.query_pipeline import QueryPipeline
         from llama_index.core.tools import FunctionTool
         from llama_index.core.agent import ReActAgent

         llama_index_tools = []
         for tool in runnable_kwargs.get("tools"):
             llama_index_tools.append(FunctionTool.from_defaults(tool))
         agent = ReActAgent.from_tools(llama_index_tools, llm=model, verbose=True)
         return QueryPipeline(modules = {"agent": agent})

       agent = reasoning_engines.LlamaIndexQueryPipelineAgent(
         model="gemini-2.0-flash",
         runnable_kwargs={"tools": [get_exchange_rate]},
         runnable_builder=runnable_with_tools_builder,
       )

3. Query the agent:

       result = agent.query(input="What is the exchange rate between US and EURO today?")

   The output should look like the following:

       {
         'response': 'The exchange rate between US and EURO today, 2025-03-19, is 1 USD to 0.91768 EUR.',
         'source_nodes': [],
         'metadata': None
       }

## What's next

Guide

### [Deploy agents](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/runtime/deploy-an-agent)

Learn the five ways to deploy an agent on Agent Platform Runtime based on your development needs.

Guide

### [Use a LlamaIndex Query Pipeline agent](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/runtime/use-a-llamaindex-agent)

Use a LlamaIndex Query Pipeline agent with Agent Platform Runtime.

Guide

### [Evaluate your agents](https://docs.cloud.google.com/gemini-enterprise-agent-platform/optimize/evaluation/evaluate-agents)

Create and deploy a basic agent and use the Gen AI evaluation service to evaluate the agent

Troubleshooting

### [Troubleshoot agent creation](https://docs.cloud.google.com/gemini-enterprise-agent-platform/troubleshooting/agent-creation)

Learn how to resolve common errors when creating custom agents.

Resource

### [Get support](https://docs.cloud.google.com/gemini-enterprise-agent-platform/resources/agent-support)

Find resources and support for Google Agent Platform.
