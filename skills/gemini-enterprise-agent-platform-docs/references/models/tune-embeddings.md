This page shows you how to tune
[text embedding models](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/embeddings/get-text-embeddings).

Foundation embedding models are pre-trained on a massive dataset of text, providing
a strong baseline for many tasks. For scenarios requiring specialized knowledge or
highly tailored performance, model tuning lets you fine-tune the model's
representations using your own relevant data. Tuning is supported for the following text embedding models:

| Model |
|---|
| `text-embedding-004` |
| `text-embedding-005` |
| `text-multilingual-embedding-002` |

Text embedding models support [supervised tuning](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/tune-text-models-supervised).
Supervised tuning uses labeled examples that demonstrate the type of output you'd
like from your text embedding model during inference.

To learn more about model tuning, see [How model tuning works](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/tune-models#how_model_tuning_works).

### Expected quality improvement

Gemini Enterprise Agent Platform uses a parameter efficient tuning method for customization.
This methodology shows significant gains in quality of up to 41% (average 12%)
on experiments performed on public retrieval benchmark datasets.

> [!NOTE]
> To see an example of getting tuned text embeddings,
> run the "Getting Tuned Text-Embeddings on Agent Platform" notebook in one of the following
> environments:
>
> [!Open in Colab](https://colab.research.google.com/github/GoogleCloudPlatform/vertex-ai-samples/blob/main/notebooks/official/generative_ai/tuned_text-embeddings.ipynb)
>
>
> \|
>
> [!Open in Colab Enterprise](https://console.cloud.google.com/agent-platform/colab/import/https%3A%2F%2Fraw.githubusercontent.com%2FGoogleCloudPlatform%2Fvertex-ai-samples%2Fmain%2Fnotebooks%2Fofficial%2Fgenerative_ai%2Ftuned_text-embeddings.ipynb)
>
>
> \|
>
> [!Open
> in Agent Platform Workbench](https://console.cloud.google.com/agent-platform/workbench/deploy-notebook?download_url=https://raw.githubusercontent.com/GoogleCloudPlatform/vertex-ai-samples/main/notebooks/official/generative_ai/tuned_text-embeddings.ipynb)
>
>
> \|
>
> [!View on GitHub](https://github.com/GoogleCloudPlatform/vertex-ai-samples/blob/main/notebooks/official/generative_ai/tuned_text-embeddings.ipynb)

## Use case for tuning an embedding model

Tuning a text embeddings model can enable your model to adapt to the embeddings to a
specific domain or task. This can be useful if the pre-trained embeddings model
is not well-suited to your specific needs. For example, you might fine-tune an
embeddings model on a specific dataset of customer support tickets for your company.
This could help a chatbot understand the different types of customer support
issues your customers typically have, and be able to answer their questions more
effectively. Without tuning, the model doesn't know the specifics of your
customer support tickets or the solutions to specific problems for your product.

## Tuning workflow

The model tuning workflow on Gemini Enterprise Agent Platform is as follows:

- Prepare your model tuning dataset.
- Upload the model tuning dataset to a Cloud Storage bucket.
- Configure your project for Gemini Enterprise Agent Platform Pipelines.
- Create a model tuning job.
- Deploy the tuned model to a Gemini Enterprise Agent Platform endpoint of the same name. Unlike text or Codey model tuning jobs, a text embedding tuning job doesn't deploy your tuned models to a Gemini Enterprise Agent Platform endpoint.

## Prepare your embeddings dataset

The dataset used to tune an embeddings model includes data that align with
the task that you want the model to perform.

### Dataset format for tuning an embeddings model

The training dataset consists of the following files, which need to be
in Cloud Storage. The path of the files are defined by parameters when launching
the tuning pipeline. The three types of files are the **corpus file** ,
**query file** , and **labels**. Only train labels are necessary, but you may also provide validation and test labels for greater control.

- **Corpus file** : The path is defined by parameter `corpus_path`. It's a
  JSONL file where each line has the fields `_id`, `title`, and `text` with
  string values. `_id` and `text` are required, while `title` is optional.
  Here is an example `corpus.jsonl` file:

      {"_id": "doc1", "title": "Get an introduction to Agent Platform", "text": "Agent Platform Studio offers a Google Cloud console tool for rapidly prototyping and testing generative AI models. Learn how you can use Agent Platform Studio to test models using prompt samples, design and save prompts, tune a foundation model, and convert between speech and text."}
      {"_id": "doc2", "title": "Use gen AI for summarization, classification, and extraction", "text": "Learn how to create text prompts for handling any number of tasks with Agent Platform's generative AI support. Some of the most common tasks are classification, summarization, and extraction. Agent Platform's PaLM API for text lets you design prompts with flexibility in terms of their structure and format."}
      {"_id": "doc3", "title": "Custom ML training overview and documentation", "text": "Get an overview of the custom training workflow in Agent Platform, the benefits of custom training, and the various training options that are available. This page also details every step involved in the ML training workflow from preparing data to inferences."}
      {"_id": "doc4", "text": "Text embeddings are useful for clustering, information retrieval, retrieval-augmented generation (RAG), and more."}
      {"_id": "doc5", "title": "Text embedding tuning", "text": "Google's text embedding models can be tuned on Agent Platform."}

- **Query file** : The query file contains your example queries. The path is
  defined by the parameter `queries_path`. The query file is in JSONL format
  and has the same fields as the corpus file. Here is an example `queries.jsonl`
  file:

      {"_id": "query1", "text": "Does Vertex support generative AI?"}
      {"_id": "query2", "text": "What can I do with Vertex GenAI offerings?"}
      {"_id": "query3", "text": "How do I train my models using Vertex?"}
      {"_id": "query4", "text": "What is a text embedding?"}
      {"_id": "query5", "text": "Can text embedding models be tuned on Vertex?"}
      {"_id": "query6", "text": "embeddings"}
      {"_id": "query7", "text": "embeddings for rag"}
      {"_id": "query8", "text": "custom model training"}
      {"_id": "query9", "text": "Google Cloud PaLM API"}

- **Training labels** : The path is defined by the parameter `train_label_path`.
  The train_label_path is the Cloud Storage URI to the train label data
  location and is specified when you create your tuning job.
  The labels need to be a TSV file with a header. A subset of the queries
  and the corpus need be included in your training labels file. The file must have
  the columns `query-id`, `corpus-id` and `score`. The `query-id` is a string that matches
  the `_id` key from the query file, the `corpus-id` is a string that matches
  the `_id` in the corpus file. `Score` is a non-negative integer value. If a pair of query and document is unrelated, you may either leave it out of the training labels file, or include it with a score of zero. Any
  score greater than zero indicates that the document is related to the query.
  Larger numbers indicate a greater level of relevance. If the score is omitted,
  the default value is 1.
  Here is an example `train_labels.tsv` file:

      query-id  corpus-id   score
      query1    doc1    1
      query2    doc2    1
      query3    doc3    2
      query3    doc5  1
      query4    doc4  1
      query4    doc5  1
      query5    doc5  2
      query6    doc4  1
      query6    doc5  1
      query7    doc4  1
      query8    doc3  1
      query9    doc2  1

- **Test labels** : Optional. The test labels have the same format as the training
  labels and are specified by the `test_label_path` parameter. If no `test_label_path`
  is provided, the test labels will be autosplit from the training labels.

- **Validation labels** : Optional. The validation labels have the same format as
  the training labels and are specified by the `validation_label_path`
  parameter. If no `validation_label_path` is provided, the validation labels
  will be autosplit from the training labels.

### Dataset size requirements

The provided dataset files must meet the following constraints:

- The number of queries must be between 9 and 10,000.
- The number of documents in the corpus must be between 9 and 500,000.
- Each dataset label file must include at least 3 query IDs, and across all dataset splits there must be at least 9 query IDs.
- The total number of labels must be less than 500,000.

### Configure your project for Gemini Enterprise Agent Platform Pipelines

Tuning is executed within your project using the [Gemini Enterprise Agent Platform Pipelines](https://docs.cloud.google.com/gemini-enterprise-agent-platform/machine-learning/pipelines/introduction) platform.

#### Configuring permissions

The pipeline executes training code under two service agents.
These service agents must be granted specific roles in order to begin training
using your project and dataset.

> [!NOTE]
> **Note:** If your dataset and pipeline job are in the same project, these service accounts will have access to your dataset by default. The only preparation necessary is granting the [Compute Engine default service account](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/tune-embeddings#compute-engine-service-account) (or your custom service account) the `Agent Platform User` role.

##### Compute Engine default service account

    PROJECT_NUMBER-compute@developer.gserviceaccount.com

This service account requires:

- `Storage Object Viewer` access to each dataset file you created in Cloud Storage.

- `Storage Object User` access to the output Cloud Storage directory of your pipeline, <var class="edit" scope="PIPELINE_OUTPUT_DIRECTORY" translate="no">PIPELINE_OUTPUT_DIRECTORY</var>.

- `Agent Platform User` access to your project.

Instead of the [Compute Engine default service account](https://docs.cloud.google.com/compute/docs/access/service-accounts#default_service_account),
you can specify a custom service account. For more information, see
[Configure a service account with granular permissions](https://docs.cloud.google.com/gemini-enterprise-agent-platform/machine-learning/pipelines/configure-project#service-account).

##### Gemini Enterprise Agent Platform Tuning Service Agent

    service-PROJECT_NUMBER@gcp-sa-aiplatform-ft.iam.gserviceaccount.com

This service account requires:

- `Storage Object Viewer` access to each dataset file you created in Cloud Storage.

- `Storage Object User` access to the output Cloud Storage directory of your pipeline, <var class="edit" scope="PIPELINE_OUTPUT_DIRECTORY" translate="no">PIPELINE_OUTPUT_DIRECTORY</var>.

> [!NOTE]
> **Note:** The Gemini Enterprise Agent Platform Tuning [Service Agent](https://docs.cloud.google.com/gemini-enterprise-agent-platform/machine-learning/general/access-control#service-agents) runs proprietary Google code and cannot be substituted with a custom service account.

For more information about configuring Cloud Storage dataset permissions, see [Configure a Cloud Storage bucket for pipeline artifacts](https://docs.cloud.google.com/gemini-enterprise-agent-platform/machine-learning/pipelines/configure-project#storage).

#### Using Accelerators

Tuning requires GPU accelerators. Any of the following accelerators can be used
for the text embedding tuning pipeline:

- `NVIDIA_L4`
- `NVIDIA_TESLA_A100`
- `NVIDIA_TESLA_T4`
- `NVIDIA_TESLA_V100`
- `NVIDIA_TESLA_P100`

Launching a tuning job requires adequate `Restricted image training GPUs` quota for the accelerator type and region you have selected, for example `Restricted image training Nvidia V100 GPUs per region`. To increase the quota of your project, see [request additional quota](https://docs.cloud.google.com/docs/quota_detail/view_manage#requesting_higher_quota).

Not all accelerators are available in all regions. See [Using accelerators in Gemini Enterprise Agent Platform](https://docs.cloud.google.com/gemini-enterprise-agent-platform/resources/locations#accelerators) for more information.

## Create an embedding model tuning job

You can create an embedding model tuning job by using the Google Cloud console, REST API, or client libraries.

> [!TIP]
> **Tip:** You can set custom values of hyperparameters such as batch size, learning rate multiplier, and output embedding dimensionality. Documentation for each parameter can be found in the [Colab notebook](https://colab.research.google.com/github/GoogleCloudPlatform/vertex-ai-samples/blob/2eddf4f/notebooks/official/generative_ai/tuned_text-embeddings.ipynb#scrollTo=G1i__mAHNY9U).

### REST

To create an embedding model tuning job, use the
[`projects.locations.pipelineJobs.create` method](https://docs.cloud.google.com/gemini-enterprise-agent-platform/reference/rest/v1/projects.locations.pipelineJobs/create).

Before using any of the request data,
make the following replacements:

- `PROJECT_ID`: Your Google Cloud project ID.
- `PIPELINE_OUTPUT_DIRECTORY`: Path for the pipeline output artifacts, starting with "gs://".

HTTP method and URL:

```
POST https://us-central1-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/us-central1/pipelineJobs
```

Request JSON body:

```
{
  "displayName": "tune_text_embeddings_model_sample",
  "runtimeConfig": {
    "gcsOutputDirectory": "PIPELINE_OUTPUT_DIRECTORY",
    "parameterValues": {
      "corpus_path": "gs://cloud-samples-data/ai-platform/embedding/goog-10k-2024/r11/corpus.jsonl",
      "queries_path": "gs://cloud-samples-data/ai-platform/embedding/goog-10k-2024/r11/queries.jsonl",
      "train_label_path": "gs://cloud-samples-data/ai-platform/embedding/goog-10k-2024/r11/train.tsv",
      "test_label_path": "gs://cloud-samples-data/ai-platform/embedding/goog-10k-2024/r11/test.tsv",
      "base_model_version_id":"text-embedding-004",
      "task_type": "DEFAULT",
      "batch_size": "128",
      "train_steps": "1000",
      "output_dimensionality": "768",
      "learning_rate_multiplier": "1.0"
    }
  },
  "templateUri": "https://us-kfp.pkg.dev/ml-pipeline/llm-text-embedding/tune-text-embedding-model/v1.1.3"
}
```

To send your request, expand one of these options:

#### curl (Linux, macOS, or Cloud Shell)

> [!NOTE]
> **Note:** The following command assumes that you have logged in to the `gcloud` CLI with your user account by running [`gcloud init`](https://docs.cloud.google.com/sdk/gcloud/reference/init) or [`gcloud auth login`](https://docs.cloud.google.com/sdk/gcloud/reference/auth/login) , or by using [Cloud Shell](https://docs.cloud.google.com/shell/docs), which automatically logs you into the `gcloud` CLI . You can check the currently active account by running [`gcloud auth list`](https://docs.cloud.google.com/sdk/gcloud/reference/auth/list).

Save the request body in a file named `request.json`,
and execute the following command:

```
curl -X POST \
     -H "Authorization: Bearer $(gcloud auth print-access-token)" \
     -H "Content-Type: application/json; charset=utf-8" \
     -d @request.json \
     "https://us-central1-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/us-central1/pipelineJobs"
```

#### PowerShell (Windows)

> [!NOTE]
> **Note:** The following command assumes that you have logged in to the `gcloud` CLI with your user account by running [`gcloud init`](https://docs.cloud.google.com/sdk/gcloud/reference/init) or [`gcloud auth login`](https://docs.cloud.google.com/sdk/gcloud/reference/auth/login) . You can check the currently active account by running [`gcloud auth list`](https://docs.cloud.google.com/sdk/gcloud/reference/auth/list).

Save the request body in a file named `request.json`,
and execute the following command:

```
$cred = gcloud auth print-access-token
$headers = @{ "Authorization" = "Bearer $cred" }

Invoke-WebRequest `
    -Method POST `
    -Headers $headers `
    -ContentType: "application/json; charset=utf-8" `
    -InFile request.json `
    -Uri "https://us-central1-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/us-central1/pipelineJobs" | Select-Object -Expand Content
```

You should receive a JSON response similar to the following:

#### Response

```
{
  "name": "projects/123456789012/locations/us-central1/pipelineJobs/tune-text-embedding-20231003231411",
  "displayName": "tune_text_embeddings_model_sample",
  "createTime": "2023-10-03T23:14:11.705749Z",
  "updateTime": "2023-10-03T23:14:11.705749Z",
  "pipelineSpec": { ... },
  "state": "PIPELINE_STATE_PENDING",
  "labels": {
    "vertex-ai-pipelines-run-billing-id": "1234567890123456789"
  },
  "runtimeConfig": {
    "gcsOutputDirectory": "gs://my-bucket/output-dir",
    "parameterValues": {
      "corpus_path": "gs://cloud-samples-data/ai-platform/embedding/goog-10k-2024/r11/corpus.jsonl",
      "queries_path": "gs://cloud-samples-data/ai-platform/embedding/goog-10k-2024/r11/queries.jsonl",
      "train_label_path": "gs://cloud-samples-data/ai-platform/embedding/goog-10k-2024/r11/train.tsv",
      "test_label_path": "gs://cloud-samples-data/ai-platform/embedding/goog-10k-2024/r11/test.tsv",
      "base_model_version_id": "text-embedding-004",
      "task_type": "DEFAULT",
      "batch_size": "128",
      "train_steps": "1000",
      "output_dimensionality": "768",
      "learning_rate_multiplier": "1.0"
    }
  },
  "serviceAccount": "123456789-compute@developer.gserviceaccount.com",
  "templateUri": "https://us-kfp.pkg.dev/ml-pipeline/llm-text-embedding/tune-text-embedding-model/v1.1.3"
}
```

After launching the pipeline, follow the progress of your tuning job through the **Google Cloud console**.

[Go to Google Cloud console](https://console.cloud.google.com/agent-platform/pipelines)

### Python

To learn how to install or update the Vertex AI SDK for Python, see [Install the Vertex AI SDK for Python](https://docs.cloud.google.com/vertex-ai/docs/start/use-vertex-ai-python-sdk).

For more information, see the
[Python API reference documentation](https://docs.cloud.google.com/python/docs/reference/aiplatform/latest).

    import re

    from google.cloud.aiplatform import initializer as aiplatform_init
    from vertexai.language_models import TextEmbeddingModel

    def tune_embedding_model(
        api_endpoint: str,
        base_model_name: str = "text-embedding-005",
        corpus_path: str = "gs://cloud-samples-data/ai-platform/embedding/goog-10k-2024/r11/corpus.jsonl",
        queries_path: str = "gs://cloud-samples-data/ai-platform/embedding/goog-10k-2024/r11/queries.jsonl",
        train_label_path: str = "gs://cloud-samples-data/ai-platform/embedding/goog-10k-2024/r11/train.tsv",
        test_label_path: str = "gs://cloud-samples-data/ai-platform/embedding/goog-10k-2024/r11/test.tsv",
    ):  # noqa: ANN201
        """Tune an embedding model using the specified parameters.
        Args:
            api_endpoint (str): The API endpoint for the Vertex AI service.
            base_model_name (str): The name of the base model to use for tuning.
            corpus_path (str): GCS URI of the JSONL file containing the corpus data.
            queries_path (str): GCS URI of the JSONL file containing the queries data.
            train_label_path (str): GCS URI of the TSV file containing the training labels.
            test_label_path (str): GCS URI of the TSV file containing the test labels.
        """
        match = re.search(r"^(\w+-\w+)", api_endpoint)
        location = match.group(1) if match else "us-central1"
        base_model = TextEmbeddingModel.from_pretrained(base_model_name)
        tuning_job = base_model.tune_model(
            task_type="DEFAULT",
            corpus_data=corpus_path,
            queries_data=queries_path,
            training_data=train_label_path,
            test_data=test_label_path,
            batch_size=128,  # The batch size to use for training.
            train_steps=1000,  # The number of training steps.
            tuned_model_location=location,
            output_dimensionality=768,  # The dimensionality of the output embeddings.
            learning_rate_multiplier=1.0,  # The multiplier for the learning rate.
        )
        return tuning_job

### Java

Before trying this sample, follow the Java setup instructions in the
[Agent Platform quickstart using
client libraries](https://docs.cloud.google.com/gemini-enterprise-agent-platform/machine-learning/start/client-libraries).

To authenticate to Agent Platform, set up Application Default Credentials.
For more information, see

[Set up authentication for a local development environment](https://docs.cloud.google.com/docs/authentication/set-up-adc-local-dev-environment).

    import com.google.cloud.aiplatform.v1.https://docs.cloud.google.com/java/docs/reference/google-cloud-aiplatform/latest/com.google.cloud.aiplatform.v1.CreatePipelineJobRequest.html;
    import com.google.cloud.aiplatform.v1.https://docs.cloud.google.com/java/docs/reference/google-cloud-aiplatform/latest/com.google.cloud.aiplatform.v1.LocationName.html;
    import com.google.cloud.aiplatform.v1.https://docs.cloud.google.com/java/docs/reference/google-cloud-aiplatform/latest/com.google.cloud.aiplatform.v1.PipelineJob.html;
    import com.google.cloud.aiplatform.v1.https://docs.cloud.google.com/java/docs/reference/google-cloud-aiplatform/latest/com.google.cloud.aiplatform.v1.PipelineJob.html.https://docs.cloud.google.com/java/docs/reference/google-cloud-aiplatform/latest/com.google.cloud.aiplatform.v1.PipelineJob.RuntimeConfig.html;
    import com.google.cloud.aiplatform.v1.https://docs.cloud.google.com/java/docs/reference/google-cloud-aiplatform/latest/com.google.cloud.aiplatform.v1.PipelineServiceClient.html;
    import com.google.cloud.aiplatform.v1.https://docs.cloud.google.com/java/docs/reference/google-cloud-aiplatform/latest/com.google.cloud.aiplatform.v1.PipelineServiceSettings.html;
    import com.google.protobuf.https://docs.cloud.google.com/java/docs/reference/protobuf/latest/com.google.protobuf.Value.html;
    import java.io.IOException;
    import java.util.Map;
    import java.util.regex.Matcher;
    import java.util.regex.Pattern;

    public class EmbeddingModelTuningSample {
      public static void main(String[] args) throws IOException {
        // TODO(developer): Replace these variables before running this sample.
        String apiEndpoint = "us-central1-aiplatform.googleapis.com:443";
        String project = "PROJECT";
        String baseModelVersionId = "BASE_MODEL_VERSION_ID";
        String taskType = "DEFAULT";
        String pipelineJobDisplayName = "PIPELINE_JOB_DISPLAY_NAME";
        String outputDir = "OUTPUT_DIR";
        String queriesPath = "QUERIES_PATH";
        String corpusPath = "CORPUS_PATH";
        String trainLabelPath = "TRAIN_LABEL_PATH";
        String testLabelPath = "TEST_LABEL_PATH";
        double learningRateMultiplier = 1.0;
        int outputDimensionality = 768;
        int batchSize = 128;
        int trainSteps = 1000;

        createEmbeddingModelTuningPipelineJob(
            apiEndpoint,
            project,
            baseModelVersionId,
            taskType,
            pipelineJobDisplayName,
            outputDir,
            queriesPath,
            corpusPath,
            trainLabelPath,
            testLabelPath,
            learningRateMultiplier,
            outputDimensionality,
            batchSize,
            trainSteps);
      }

      public static https://docs.cloud.google.com/java/docs/reference/google-cloud-aiplatform/latest/com.google.cloud.aiplatform.v1.PipelineJob.html createEmbeddingModelTuningPipelineJob(
          String apiEndpoint,
          String project,
          String baseModelVersionId,
          String taskType,
          String pipelineJobDisplayName,
          String outputDir,
          String queriesPath,
          String corpusPath,
          String trainLabelPath,
          String testLabelPath,
          double learningRateMultiplier,
          int outputDimensionality,
          int batchSize,
          int trainSteps)
          throws IOException {
        Matcher matcher = Pattern.compile("^(?<Location>\\w+-\\w+)").matcher(apiEndpoint);
        String location = matcher.matches() ? matcher.group("Location") : "us-central1";
        String templateUri =
            "https://us-kfp.pkg.dev/ml-pipeline/llm-text-embedding/tune-text-embedding-model/v1.1.4";
        https://docs.cloud.google.com/java/docs/reference/google-cloud-aiplatform/latest/com.google.cloud.aiplatform.v1.PipelineServiceSettings.html settings =
            https://docs.cloud.google.com/java/docs/reference/google-cloud-aiplatform/latest/com.google.cloud.aiplatform.v1.PipelineServiceSettings.html.newBuilder().setEndpoint(apiEndpoint).build();
        try (https://docs.cloud.google.com/java/docs/reference/google-cloud-aiplatform/latest/com.google.cloud.aiplatform.v1.PipelineServiceClient.html client = https://docs.cloud.google.com/java/docs/reference/google-cloud-aiplatform/latest/com.google.cloud.aiplatform.v1.PipelineServiceClient.html.create(settings)) {
          Map<String, Value> parameterValues =
              Map.of(
                  "base_model_version_id", valueOf(baseModelVersionId),
                  "task_type", valueOf(taskType),
                  "queries_path", valueOf(queriesPath),
                  "corpus_path", valueOf(corpusPath),
                  "train_label_path", valueOf(trainLabelPath),
                  "test_label_path", valueOf(testLabelPath),
                  "learning_rate_multiplier", valueOf(learningRateMultiplier),
                  "output_dimensionality", valueOf(outputDimensionality),
                  "batch_size", valueOf(batchSize),
                  "train_steps", valueOf(trainSteps));
          https://docs.cloud.google.com/java/docs/reference/google-cloud-aiplatform/latest/com.google.cloud.aiplatform.v1.PipelineJob.html pipelineJob =
              https://docs.cloud.google.com/java/docs/reference/google-cloud-aiplatform/latest/com.google.cloud.aiplatform.v1.PipelineJob.html.newBuilder()
                  .https://docs.cloud.google.com/java/docs/reference/google-cloud-aiplatform/latest/com.google.cloud.aiplatform.v1.PipelineJob.Builder.html#com_google_cloud_aiplatform_v1_PipelineJob_Builder_setTemplateUri_java_lang_String_(templateUri)
                  .setDisplayName(pipelineJobDisplayName)
                  .https://docs.cloud.google.com/java/docs/reference/google-cloud-aiplatform/latest/com.google.cloud.aiplatform.v1.PipelineJob.Builder.html#com_google_cloud_aiplatform_v1_PipelineJob_Builder_setRuntimeConfig_com_google_cloud_aiplatform_v1_PipelineJob_RuntimeConfig_(
                      https://docs.cloud.google.com/java/docs/reference/google-cloud-aiplatform/latest/com.google.cloud.aiplatform.v1.PipelineJob.RuntimeConfig.html.newBuilder()
                          .setGcsOutputDirectory(outputDir)
                          .https://docs.cloud.google.com/java/docs/reference/google-cloud-aiplatform/latest/com.google.cloud.aiplatform.v1.PipelineJob.RuntimeConfig.Builder.html#com_google_cloud_aiplatform_v1_PipelineJob_RuntimeConfig_Builder_putAllParameterValues_java_util_Map_java_lang_String_com_google_protobuf_Value__(parameterValues)
                          .build())
                  .build();
          https://docs.cloud.google.com/java/docs/reference/google-cloud-aiplatform/latest/com.google.cloud.aiplatform.v1.CreatePipelineJobRequest.html request =
              https://docs.cloud.google.com/java/docs/reference/google-cloud-aiplatform/latest/com.google.cloud.aiplatform.v1.CreatePipelineJobRequest.html.newBuilder()
                  .setParent(https://docs.cloud.google.com/java/docs/reference/google-cloud-aiplatform/latest/com.google.cloud.aiplatform.v1.LocationName.html.of(project, location).toString())
                  .setPipelineJob(pipelineJob)
                  .build();
          return client.createPipelineJob(request);
        }
      }

      private static https://docs.cloud.google.com/java/docs/reference/protobuf/latest/com.google.protobuf.Value.html valueOf(String s) {
        return https://docs.cloud.google.com/java/docs/reference/protobuf/latest/com.google.protobuf.Value.html.newBuilder().setStringValue(s).build();
      }

      private static https://docs.cloud.google.com/java/docs/reference/protobuf/latest/com.google.protobuf.Value.html valueOf(int n) {
        return https://docs.cloud.google.com/java/docs/reference/protobuf/latest/com.google.protobuf.Value.html.newBuilder().setNumberValue(n).build();
      }

      private static https://docs.cloud.google.com/java/docs/reference/protobuf/latest/com.google.protobuf.Value.html valueOf(double n) {
        return https://docs.cloud.google.com/java/docs/reference/protobuf/latest/com.google.protobuf.Value.html.newBuilder().setNumberValue(n).build();
      }
    }

### Node.js

Before trying this sample, follow the Node.js setup instructions in the
[Agent Platform quickstart using
client libraries](https://docs.cloud.google.com/gemini-enterprise-agent-platform/machine-learning/start/client-libraries).

To authenticate to Agent Platform, set up Application Default Credentials.
For more information, see

[Set up authentication for a local development environment](https://docs.cloud.google.com/docs/authentication/set-up-adc-local-dev-environment).

    async function main(
      apiEndpoint,
      project,
      outputDir,
      pipelineJobDisplayName = 'embedding-customization-pipeline-sample',
      baseModelVersionId = 'text-embedding-005',
      taskType = 'DEFAULT',
      corpusPath = 'gs://cloud-samples-data/ai-platform/embedding/goog-10k-2024/r11/corpus.jsonl',
      queriesPath = 'gs://cloud-samples-data/ai-platform/embedding/goog-10k-2024/r11/queries.jsonl',
      trainLabelPath = 'gs://cloud-samples-data/ai-platform/embedding/goog-10k-2024/r11/train.tsv',
      testLabelPath = 'gs://cloud-samples-data/ai-platform/embedding/goog-10k-2024/r11/test.tsv',
      outputDimensionality = 768,
      learningRateMultiplier = 1.0,
      batchSize = 128,
      trainSteps = 1000
    ) {
      const aiplatform = require('https://docs.cloud.google.com/nodejs/docs/reference/aiplatform/latest/overview.html');
      const {PipelineServiceClient} = aiplatform.v1;
      const {helpers} = aiplatform; // helps construct protobuf.Value objects.

      const client = new https://docs.cloud.google.com/nodejs/docs/reference/aiplatform/latest/overview.html({apiEndpoint});
      const match = apiEndpoint.match(/(?<L>\w+-\w+)/);
      const location = match ? match.groups.L : 'us-central1';
      const parent = `projects/${project}/locations/${location}`;
      const params = {
        base_model_version_id: baseModelVersionId,
        task_type: taskType,
        queries_path: queriesPath,
        corpus_path: corpusPath,
        train_label_path: trainLabelPath,
        test_label_path: testLabelPath,
        batch_size: batchSize,
        train_steps: trainSteps,
        output_dimensionality: outputDimensionality,
        learning_rate_multiplier: learningRateMultiplier,
      };
      const runtimeConfig = {
        gcsOutputDirectory: outputDir,
        parameterValues: Object.fromEntries(
          Object.entries(params).map(([k, v]) => [k, https://docs.cloud.google.com/nodejs/docs/reference/aiplatform/latest/overview.html.toValue(v)])
        ),
      };
      const pipelineJob = {
        templateUri:
          'https://us-kfp.pkg.dev/ml-pipeline/llm-text-embedding/tune-text-embedding-model/v1.1.4',
        displayName: pipelineJobDisplayName,
        runtimeConfig,
      };
      async function createTuneJob() {
        const [response] = await client.createPipelineJob({parent, pipelineJob});
        console.log(`job_name: ${response.name}`);
        console.log(`job_state: ${response.state}`);
      }

      await createTuneJob();
    }

### Console

To tune a text embedding model by using the
Google Cloud console, you can launch a customization pipeline using the following steps:

1. In the Agent Platform section of the Google Cloud console, go to the **Gemini Enterprise Agent Platform Pipelines** page.

   [Go to Gemini Enterprise Agent Platform Pipelines](https://console.cloud.google.com/agent-platform/pipelines/runs)
2. Click**Create run** to open the **Create pipeline run** pane.
3. Click **Select from existing pipelines** and enter the following details:
   1. Select "ml-pipeline" from the **select a resource** drop-down.
   2. Select "llm-text-embedding" from the **Repository** drop-down.
   3. Select "tune-text-embedding-model" from the **Pipeline or component** drop-down.
   4. Select the version labeled "v1.1.3" from the **Version** drop-down.
4. Specify a **Run name** to uniquely identify the pipeline run.
5. In the **Region** drop-down list, select the region to create the pipeline run, which will be the same region in which your tuned model is created.
6. Click **Continue** . The **Runtime configuration** pane appears.
7. Under **Cloud storage location** , click **Browse** to select the Cloud Storage bucket for storing the pipeline output artifacts, and then click **Select**.
8. Under **Pipeline parameters** , specify your parameters for the tuning pipeline. The three required parameters are `corpus_path`, `queries_path`, and `train_label_path`, with formats described in [Prepare your embeddings dataset](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/tune-embeddings#prepare-tuning). For more detailed information about each parameter, refer to the REST tab of this section.
9. Click **Submit** to create your pipeline run.

### Other supported features

Text embedding tuning supports [VPC Service Controls](https://docs.cloud.google.com/gemini-enterprise-agent-platform/machine-learning/general/vpc-service-controls) and can be configured to run within a Virtual Private Cloud (VPC) by passing the `network` parameter when creating the [`PipelineJob`](https://docs.cloud.google.com/gemini-enterprise-agent-platform/reference/rest/v1/projects.locations.pipelineJobs).

To use [CMEK (customer-managed encryption keys)](https://docs.cloud.google.com/gemini-enterprise-agent-platform/machine-learning/general/cmek), pass the key to the `parameterValues.encryption_spec_key_name` pipeline parameter, *as well as* the `encryptionSpec.kmsKeyName` parameter when creating the [`PipelineJob`](https://docs.cloud.google.com/gemini-enterprise-agent-platform/reference/rest/v1/projects.locations.pipelineJobs).

## Use your tuned model

### View tuned models in Model Registry

When your tuning job completes, the tuned model isn't automatically deployed to
an endpoint. It will be available as a Model resource in Model Registry.
You can view a list of models in your current project, including your tuned
models, by using the Google Cloud console.

To view your tuned models in the Google Cloud console, go to the
**Gemini Enterprise Agent Platform Model Registry** page.

[Go to Gemini Enterprise Agent Platform Model Registry](https://console.cloud.google.com/agent-platform/models)

### Deploy your model

After you've tuned the embeddings model, you need to deploy the Model resource.
To deploy your tuned embeddings model, see
[Deploy a model to an endpoint](https://docs.cloud.google.com/gemini-enterprise-agent-platform/machine-learning/general/deployment).

Unlike foundation models, tuned text embedding models are managed by the user.
This includes managing serving resources, like machine type and accelerators.
To prevent out-of-memory errors during inference, it's recommended that you deploy
using the `NVIDIA_TESLA_A100` GPU type, which can support batch sizes up to 5
for any input length.

Your tuned model supports up to 3072 tokens and can truncate longer inputs.

### Get inferences on a deployed model

Once your tuned model is deployed, you can use one of the following commands to
issue requests to the tuned model endpoint.

#### Example curl commands for tuned `textembedding-gecko@001` models

To get inferences from a tuned version of `textembedding-gecko@001`, use the
following example curl command.

    PROJECT_ID=PROJECT_ID
    LOCATION=LOCATION
    ENDPOINT_URI=https://${LOCATION}-aiplatform.googleapis.com
    MODEL_ENDPOINT=TUNED_MODEL_ENDPOINT_ID

    curl -X POST -H "Authorization: Bearer $(gcloud auth print-access-token)" \
        -H "Content-Type: application/json"  \
        ${ENDPOINT_URI}/v1/projects/${PROJECT_ID}/locations/${LOCATION}/endpoints/${MODEL_ENDPOINT}:predict \
        -d '{
      "instances": [
        {
          "content": "Dining in New York City"
        },
        {
          "content": "Best resorts on the east coast"
        }
      ]
    }'

#### Example curl commands for *non* `textembedding-gecko@001` models

Tuned versions of other models (for example, `textembedding-gecko@003` and `textembedding-gecko-multilingual@001`)
require 2 additional inputs: `task_type` and `title`.
More documentation for these parameters can be found at
[curl command](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/embeddings/get-text-embeddings#api_changes_to_models_released_in_or_after_august_2023)

> [!NOTE]
> **Note:** `task_type` and `title` are required for every request. For default behavior, set `task_type="DEFAULT"` and `title=""`.

    PROJECT_ID=PROJECT_ID
    LOCATION=LOCATION
    ENDPOINT_URI=https://${LOCATION}-aiplatform.googleapis.com
    MODEL_ENDPOINT=TUNED_MODEL_ENDPOINT_ID

    curl -X POST -H "Authorization: Bearer $(gcloud auth print-access-token)" \
        -H "Content-Type: application/json"  \
        ${ENDPOINT_URI}/v1/projects/${PROJECT_ID}/locations/${LOCATION}/endpoints/${MODEL_ENDPOINT}:predict \
        -d '{
      "instances": [
        {
          "content": "Dining in New York City",
          "task_type": "DEFAULT",
          "title": ""
        },
        {
          "content": "There are many resorts to choose from on the East coast...",
          "task_type": "RETRIEVAL_DOCUMENT",
          "title": "East Coast Resorts"
        }
      ]
    }'

#### Example output

The output of an inference request to the deployed tuned model is not in the
same format as the output of a request to the text embedding API.

    {
     "predictions": [
       [ ... ],
       [ ... ],
       ...
     ],
     "deployedModelId": "...",
     "model": "projects/.../locations/.../models/...",
     "modelDisplayName": "tuned-text-embedding-model",
     "modelVersionId": "1"
    }

## What's next

- To get batch inferences for embeddings, see [Get batch text embeddings inferences](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/embeddings/batch-prediction-genai-embeddings)
- To learn more about multimodal embeddings, see [Get multimodal embeddings](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/embeddings/get-multimodal-embeddings)
- For information about text-only use cases (text-based semantic search, clustering, long-form document analysis, and other text retrieval or question-answering use cases), read [Get text embeddings](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/embeddings/get-text-embeddings).
