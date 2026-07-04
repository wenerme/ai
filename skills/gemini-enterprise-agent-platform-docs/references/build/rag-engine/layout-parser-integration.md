The [VPC-SC security controls](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/security-controls) and
CMEK are supported by Agent Platform RAG Engine. Data residency and AXT security controls aren't
supported.

This page introduces the Document AI layout parser and how it's
used with RAG Engine.

## Document AI

[Document AI](https://docs.cloud.google.com/document-ai) is a [document-processing and
document-understanding
platform](https://en.wikipedia.org/wiki/Document_processing) that takes
unstructured data from documents and transforms that unstructured data into
fields that are suitable for storage in a database. Structured data leads to
data that you can understand, analyze, and consume.

Document AI is built on top of products within Gemini Enterprise Agent Platform
with generative AI to help you create scalable, end-to-end, cloud-based document
processing applications. No specialized machine-learning expertise is required
to use these products.

## Document AI layout parser

The layout parser extracts content elements from the document, such as text,
tables, and lists. The layout parser then creates context-aware chunks that
facilitate information retrieval in generative AI and discovery applications.

When it's used for retrieval and LLM generation, the document's layout is
considered during the chunking process, which improves semantic coherence and
reduces noise in the content. All text in a chunk comes from the same layout
entity, such as the heading, subheading, or list.

For file types used by layout detection, see [Layout detection per file
type](https://docs.cloud.google.com/document-ai/docs/layout-parse-chunk#parser-types).

## Use the layout parser in RAG Engine

To use the layout parser in RAG Engine, you must create
a corpus. To create a corpus, do the following:

1. In the Google Cloud console, go to the **RAG Engine** page.

   [Go to RAG Engine](https://console.cloud.google.com/agent-platform/rag/)
2. Select **Create corpus**.

3. In the **Region** field, select your region.

4. In the **Corpus name** field, enter your corpus name.

5. In the **Description** field, enter a description.

6. In the **Data** section, select where you want to upload your data.

7. Expand the **Advanced options** section.

   1. In the **Chunking strategy** section, the following default sizes are
      recommended:

      - **Chunking size**: 1024
      - **Chunk overlap**: 256
   2. In the **Layout parser** section, select the **Document AI layout parser**
      option, which has the highest accuracy for documents with images or charts.

      1. From the **Model** field, select your model.

      2. Optional: In the **Maximum parsing requests per min** field, enter your
         maximum parsing requests.

      3. Optional: In the **Custom parsing prompt** field, enter your parsing
         prompt.

      4. Click **Continue**.

8. From the **Configure vector store** page, do the following:

   1. In the **Embedding model** field, select your embedding model.

   2. In the **Vector database** section, select your database.

9. Click **Create corpus**.

### Limitations

The `ImportRagFiles` API supports the layout parser, however, the following
limitations apply:

- Input the file size maximum of 20 MB for all file types.
- There is a maximum of 500 pages per PDF file.

The Document AI [quotas](https://docs.cloud.google.com/document-ai/quotas) and
[pricing](https://cloud.google.com/document-ai/pricing) apply.

### Enable the Document AI API

You must enable the Document AI API for your project. For more
information on enabling APIs, see the [Service Usage
documentation](https://docs.cloud.google.com/service-usage/docs/enable-disable).

Enable the Document AI API.

**Roles required to enable APIs**

To enable APIs, you need the Service Usage Admin IAM
role (`roles/serviceusage.serviceUsageAdmin`), which
contains the `serviceusage.services.enable` permission. [Learn how to grant
roles](https://docs.cloud.google.com/iam/docs/granting-changing-revoking-access).

[Enable the API](https://console.cloud.google.com/apis/enableflow?apiid=documentai.googleapis.com)

### Turn on your layout parser

To turn on Layout Parser, follow these steps:

1. Create a Layout Parser by following the instructions in
   [Creating and managing processors](https://docs.cloud.google.com/document-ai/docs/create-processor).

   The processor type name is `LAYOUT_PARSER_PROCESSOR`.
2. Enable Layout Parser by following the instructions in
   [Enable a processor](https://docs.cloud.google.com/document-ai/docs/create-processor#enable-processor).

### Your RAG knowledge base (corpus)

If you don't have a RAG corpus, then create a RAG corpus. For example, see
[Create a RAG corpus example](https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/rag-engine/use-pinecone#create-rag-corpus).

If you already have a RAG corpus, existing files that were imported without a
layout parser won't be re-imported when you [Import files using Layout
Parser](https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/rag-engine/layout-parser-integration#importing_files_using_layout_parser).
If you want to use a layout parser with your files, delete the files first. For
example, see [Delete a RAG file
example](https://docs.cloud.google.com/gemini-enterprise-agent-platform/reference/rest/v1beta1/projects.locations.ragCorpora.ragFiles/delete).

### Importing files using layout parser

Files and folders from various sources can be imported using the layout parser.

### Python

To learn how to install or update the Vertex AI SDK for Python,
see [Install the Vertex AI SDK for
Python](https://docs.cloud.google.com/gemini-enterprise-agent-platform/machine-learning/python-sdk/use-vertex-ai-python-sdk).
For more information, see the [Python API reference
documentation](https://docs.cloud.google.com/python/docs/reference/aiplatform/latest).

Replace the following variables used in the code sample:

- **<var translate="no">PROJECT_ID</var>**: Your project ID.
- **<var translate="no">LOCATION</var>**: The region to process the request.
- **<var translate="no">RAG_CORPUS_ID</var>**: The ID of the RAG corpus resource.
- **<var translate="no">GCS_URIS</var>** : A list of Cloud Storage locations. For example: `"gs://my-bucket1"`, `"gs://my-bucket2"`.
- **<var translate="no">LAYOUT_PARSER_PROCESSOR_NAME</var>** : The resource path to the layout parser processor that was created. For example: `"projects/{project}/locations/{location}/processors/{processor_id}"`.
- **<var translate="no">CHUNK_SIZE</var>**: Optional: The number of tokens each chunk should have.

    from vertexai import rag
    import https://docs.cloud.google.com/python/docs/reference/agentplatform/latest

    PROJECT_ID = YOUR_PROJECT_ID
    corpus_name = "projects/{PROJECT_ID}/locations/us-central1/ragCorpora/{rag_corpus_id}"
    paths = ["https://drive.google.com/file/123", "gs://my_bucket/my_files_dir"]  # Supports Cloud Storage and Google Drive.

    # Initialize Agent Platform API once per session
    https://docs.cloud.google.com/python/docs/reference/agentplatform/latest.init(project=PROJECT_ID, location="LOCATION")

    response = rag.import_files(
        corpus_name=corpus_name,
        paths=paths,
        transformation_config=rag.TransformationConfig(
            rag.ChunkingConfig(chunk_size=1024, chunk_overlap=256)
        ),
        import_result_sink="gs://sample-existing-folder/sample_import_result_unique.ndjson",  # Optional: This must be an existing storage bucket folder, and the filename must be unique (non-existent).
        layout_parser=rag.LayoutParserConfig(
          processor_name="projects/{PROJECT_ID}/locations/us/processors/{processor_id}/processorVersions/{processor_version_id}",
          max_parsing_requests_per_min=120,
        ),
        max_embedding_requests_per_min=900,  # Optional
    )
    print(f"Import response: {response}")

### REST

The code sample shows how to import Cloud Storage files using the layout
parser. For more configuration options, including importing files from another
source, refer to the [`ImportRagFilesConfig`
reference](https://docs.cloud.google.com/gemini-enterprise-agent-platform/reference/rest/v1/projects.locations.ragCorpora.ragFiles/import#ImportRagFilesConfig).

Before using any of the request data, replace the following variables used in
the code sample:

- **<var translate="no">PROJECT_ID</var>**: Your project ID.
- **<var translate="no">LOCATION</var>**: The region to process the request.
- **<var translate="no">RAG_CORPUS_ID</var>**: The ID of the RAG corpus resource.
- **<var translate="no">GCS_URIS</var>** : A list of Cloud Storage locations. For example: `"gs://my-bucket1"`, `"gs://my-bucket2"`.
- **<var translate="no">LAYOUT_PARSER_PROCESSOR_NAME</var>** : The resource path to the layout parser processor that was created. For example: `"projects/{project}/locations/{location}/processors/{processor_id}"`.
- **<var translate="no">CHUNK_SIZE</var>**: Optional: The number of tokens each chunk should have.

    POST https://LOCATION-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/ragCorpora/RAG_CORPUS_ID/ragFiles:import

Request JSON body:

    {
      "import_rag_files_config": {
        "gcs_source": {
          "uris": "GCS_URIS"
        },
        "rag_file_parsing_config": {
          "layout_parser": {
            "processor_name": "LAYOUT_PARSER_PROCESSOR_NAME"
          }
        },
        "rag_file_transformation_config": {
          "rag_file_chunking_config": {
            "fixed_length_chunking": {
              "chunk_size": CHUNK_SIZE
            }
          }
        },
      }
    }

To send your request, choose one of these options:

### curl

> [!NOTE]
> **Note:** The following command assumes that you have signed in to the Google Cloud CLI CLI with your user account by running gcloud CLI `init` or gcloud CLI `auth login`, or by using Cloud Shell, which automatically signs you into the gcloud CLI CLI . You can check the active account by running gcloud CLI `auth list`.

Save the request body in a file named request.json, and run the
following command:

    curl -X POST \
        -H "Authorization: Bearer $(gcloud auth print-access-token)" \
        -H "Content-Type: application/json; charset=utf-8" \
        -d @request.json \
        "https://LOCATION-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/ragCorpora/RAG_CORPUS_ID/ragFiles:import"

### Powershell

> [!NOTE]
> **Note:** The following command assumes that you have signed in to the gcloud CLI CLI with your user account by running gcloud CLI `init` or gcloud CLI `auth login`. You can check the active account by running gcloud CLI `auth
> list`.

Save the request body in a file named request.json, and run the
following command:

    $cred = gcloud auth print-access-token
    $headers = @{ "Authorization" = "Bearer $cred" }

    Invoke-WebRequest `
        -Method POST `
        -Headers $headers `
        -ContentType: "application/json; charset=utf-8" `
        -InFile request.json `
        -Uri "https://LOCATION-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/ragCorpora/RAG_CORPUS_ID/ragFiles:import" | Select-Object -Expand Content

## Retrieval query

When a user asks a question or provides a prompt, the retrieval component in RAG
searches through its knowledge base to find information that is relevant to the
query.

For an example of retrieving RAG files from a corpus based on a query text, see
[Retrieval
query](https://docs.cloud.google.com/gemini-enterprise-agent-platform/reference/rest/v1beta1/projects.locations/retrieveContexts).

## Prediction

The prediction generates a grounded response using the retrieved contexts. For
an example, see
[Generation](https://docs.cloud.google.com/gemini-enterprise-agent-platform/reference/rest/v1beta1/projects.locations.publishers.models/generateContent).

## What's next

- [Vector database choices in
  RAG Engine](https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/rag-engine/vector-db-choices)

- For information about importing RAG files, see [Method:
  ragFiles.import](https://docs.cloud.google.com/gemini-enterprise-agent-platform/reference/rest/v1/projects.locations.ragCorpora.ragFiles/import)
