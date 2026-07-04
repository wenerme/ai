## Manage your retrieval strategy

`RagManagedDb` offers the following retrieval strategies to support your RAG use
cases:

| Retrieval strategy | Description | |
| --- | --- | --- |
| k-Nearest Neighbors (KNN) (Default) | Finds the exact nearest neighbors by comparing all data points in your RAG corpus. If you don't specify a strategy during the creation of your RAG corpus, KNN is the default retrieval strategy used. | - Verifies the perfect recall (1.0) during retrieval. - Great for recall-sensitive applications. - Great for small to medium-sized RAG corpora, which stores less than 10,000 RAG files. - Requires searching across every single data point, therefore, the latency increases with the number of RAG files in the corpus. |
| Approximate Nearest Neighbors (ANN) | Uses approximation techniques to find similar neighbors faster than the KNN technique. | - Reduces query latencies significantly on large RAG corpora. - Recall slightly lowered due to approximation techniques used. - Becomes very effective when you have large RAG corpora, which is approximately more than 10,000 RAG files. - The amount of recall loss that's acceptable to you depends on the use case, but in most large-scale cases, losing a bit of recall in return for improved query performance is an acceptable tradeoff. |

### Create a RAG corpus with KNN `RagManagedDb`

This code samples demonstrates how to create a RAG corpus using KNN
`RagManagedDb`.

### Python

```
from vertexai.preview import rag
import https://docs.cloud.google.com/python/docs/reference/agentplatform/latest

PROJECT_ID = YOUR_PROJECT_ID
LOCATION = YOUR_RAG_ENGINE_LOCATION
DISPLAY_NAME = YOUR_RAG_CORPUS_DISPLAY_NAME

# Initialize Agent Platform API once per session
https://docs.cloud.google.com/python/docs/reference/agentplatform/latest.init(project=PROJECT_ID, location=LOCATION)

vector_db = rag.RagManagedDb(retrieval_strategy=rag.KNN())
rag_corpus = rag.create_corpus(
    display_name=DISPLAY_NAME, backend_config=rag.RagVectorDbConfig(vector_db=vector_db))

```

### REST

Replace the following variables:

- PROJECT_ID: Your project ID.
- LOCATION: The region to process the request.
- CORPUS_DISPLAY_NAME: The display name of the RAG corpus. PROJECT_ID=PROJECT_ID
LOCATION=LOCATION
CORPUS_DISPLAY_NAME=CORPUS_DISPLAY_NAME curl -X POST
-H "Authorization: Bearer $(gcloud auth print-access-token)" \
 -H "Content-Type: application/json" \
 https://${LOCATION}-aiplatform.googleapis.com/v1beta1/projects/${PROJECT_ID}/locations/${LOCATION}/ragCorpora
-d '{
"display_name" : '""${CORPUS_DISPLAY_NAME}""',
"vector_db_config": {
"ragManagedDb": {
"knn": {}
}
}'

> [!WARNING]
> Preview
>
> Some of the RAG features are Preview offerings, subject to the "Pre-GA Offerings Terms"
> of the Google Cloud Service Specific
> Terms. Pre-GA products and features are available "as-is" and may have limited support, and
> changes to Pre-GA products and features may not be compatible with other Pre-GA versions. For
> more information, see the launch stage descriptions.
>
> By using the Gemini API on Gemini Enterprise Agent Platform, you agree to the Generative AI Preview
> terms and conditions(Preview
> Terms).

### Create a RAG corpus with ANN `RagManagedDb`

To offer the ANN feature, `RagManagedDb` uses a tree-based structure to
partition data and facilitate faster searches. To enable the best recall and
latency, the structure of this tree should be configured by experimentation to
fit your data size and distribution. `RagManagedDb` lets you configure the
`tree_depth` and the `leaf_count` of the tree.

The `tree_depth` determines the number of layers or the levels in the tree.
Follow these guidelines:

- If you have approximately 10,000 RAG files in the RAG corpus, set the value to 2.
- If you have more RAG files than that, set this to 3.
- If the `tree_depth` isn't specified, RAG Engine assigns a default value of 2 for this parameter.

The `leaf_count` determines the number of leaf nodes in the tree-based
structure. Each leaf node contains groups of closely related vectors along
with their corresponding centroid. Follow these guidelines:

- The recommended value is `10 * sqrt(num of RAG files in your RAG corpus)`.
- If not specified, RAG Engine assigns a default
value of 500 for this parameter.

### Python

```

TREE_DEPTH = YOUR_TREE_DEPTH # Optional: Acceptable values are 2 or 3. Default is 2.
LEAF_COUNT = YOUR_LEAF_COUNT # Optional: Default is 500.

# Initialize Agent Platform API once per session
https://docs.cloud.google.com/python/docs/reference/agentplatform/latest.init(project=PROJECT_ID, location=LOCATION)

ann_config = rag.ANN(tree_depth=TREE_DEPTH, leaf_count=LEAF_COUNT)
vector_db = rag.RagManagedDb(retrieval_strategy=ann_config)
    display_name=DISPLAY_NAME, backend_config=rag.RagVectorDbConfig(vector_db=vector_db))

```

### REST

- CORPUS_DISPLAY_NAME: The display name of the RAG corpus.
- TREE_DEPTH: Your tree depth.
- LEAF_COUNT: Your leaf count. PROJECT_ID=PROJECT_ID
CORPUS_DISPLAY_NAME=CORPUS_DISPLAY_NAME
TREE_DEPTH=TREE_DEPTH
LEAF_COUNT=LEAF_COUNT curl -X POST
 https://${LOCATION}-aiplatform.googleapis.com/v1beta1/projects/${PROJECT_ID}/locations/${LOCATION}/ragCorpora
"ann": {
"tree_depth": '"${TREE_DEPTH}"',
 "leaf_count": '"${LEAF_COUNT}"'

>
> Some of the RAG features are Preview offerings, subject to the "Pre-GA Offerings Terms"
> Terms. Pre-GA products and features are available "as-is" and may have limited support, and
> changes to Pre-GA products and features may not be compatible with other Pre-GA versions. For
>
> By using the Gemini API on Gemini Enterprise Agent Platform, you agree to the Generative AI Preview

### Importing your data into ANN `RagManagedDb`

You can use either the `ImportRagFiles` API or the `UploadRagFile` API to import
your data into the ANN `RagManagedDb`. However, unlike the KNN retrieval
strategy, the ANN approach requires the underlying tree-based index to be
rebuilt at least once and optionally after importing significant amounts of data
for optimal recall. To have RAG Engine rebuild your ANN
index, set the `rebuild_ann_index` to true in your `ImportRagFiles` API request.

The following are important:

1. Before you query the RAG corpus, you must rebuild the ANN index at least once.
2. Only one concurrent index rebuild is supported on a project in each location.

To upload your local file into your RAG corpus, see Upload a RAG
file. To
import data into your RAG corpus and trigger an ANN index rebuild, see the
following code sample that demonstrates how to import from Cloud Storage. To
learn about the supported data sources, see Data sources supported for
RAG.

### Python

```

CORPUS_ID = YOUR_CORPUS_ID
PATHS = ["gs://my_bucket/my_files_dir"]
REBUILD_ANN_INDEX = REBUILD_ANN_INDEX # Choose true or false.

# Initialize Agent Platform API once per session
https://docs.cloud.google.com/python/docs/reference/agentplatform/latest.init(project=PROJECT_ID, location=LOCATION)

corpus_name = f"projects/{PROJECT_ID}/locations/{LOCATION}/ragCorpora/{CORPUS_ID}"
# This is a non blocking call.
response = await rag.import_files_async(
    corpus_name=corpus_name,
    paths=PATHS,
    rebuild_ann_index=REBUILD_ANN_INDEX
)

# Wait for the import to complete.
await response.https://docs.cloud.google.com/python/docs/reference/agentplatform/latest/vertexai._genai.types.CheckQueryJobResultDict.html#vertexai__genai_types_CheckQueryJobResultDict_result()

```

### REST

```
GCS_URI=GCS_URI
REBUILD_ANN_INDEX=

curl -X POST \
https://${LOCATION}-aiplatform.googleapis.com/v1beta1/projects/${PROJECT_ID}/locations/${LOCATION}/ragCorpora/${CORPUS_ID}/ragFiles:import \
  "import_rag_files_config": {
    "gcs_source": {
      "uris": '\""${GCS_URI}"\"',
      },
    "rebuild_ann_index": '${REBUILD_ANN_INDEX}'

```

## Manage your encryption

RAG Engine provides robust options for managing how
your data at rest is encrypted. By default, all user data within `RagManagedDb`
is encrypted using a Google-owned and Google-managed encryption key, which is the default
setting. This default setting helps you to verify that your data is secure
without requiring any specific configuration.

If you require more control over your keys used for encryption,
RAG Engine supports Customer-Managed Encryption Key
(CMEK). With CMEK, you can use your cryptographic keys, managed within
Cloud Key Management Service (KMS), to protect your RAG corpus data.

For information on CMEK limitations for RAG corpora, see CMEK limitations for
RAG Engine on Gemini Enterprise Agent Platform.

### Set up your KMS key and grant permissions

Before you can create a RAG corpus encrypted with CMEK, you must set up a
cryptographic key in Google Cloud KMS, and grant the
RAG Engine service account the necessary permissions to
use this key.

#### Prerequisites

To perform the following setup steps, verify that your user account has the
appropriate Identity and Access Management (IAM) permissions in the Google Cloud project where you
intend to create the KMS key and the RAG corpus. Typically, a role like the
Cloud KMS Admin role (`roles/cloudkms.admin`) is required.

#### Enable the API

To enable the Cloud Key Management Service API, do the following:

1. Navigate to the Google Cloud console.
2. Select the project where you want to manage your keys, and create your RAG corpus.
3. In the search bar, type "Key Management", and select the "Key Management" service.
4. If the API isn't enabled, click Enable. You might need to wait a few minutes for the API to be fully provisioned.

#### Create your KMS key ring and key

To create a key ring, do the following:

1. In the Key Management section, click Create Key Ring. Enter the following: Key ring name: Enter a unique name for your key ring such as rag-engine-cmek-keys. Location type: Select Region. The Cloud Key Management Service key ring must be in the same region as the RAG Engine endpoint that you're using when you're encrypting a RAG corpus with CMEK. Location : Choose the selected region such as `us-central1`. This region should ideally match the region where your RAG Engine resources will reside.
2. Click Create.

To create a key within the key ring, do the following:

1. After the key ring is created, you'll be prompted, or you can navigate to
Create Key. Enter the following: Key name : Enter a unique name for your key such as `my-rag-corpus-key`. Protection level : Choose a protection level (Software or HSM ). If you require hardware-backed keys, select HSM. Purpose : Select Symmetric encrypt/decrypt. This is required for CMEK. Key material source : Select Generated key. Rotation period: Optional. Recommended. Configure a key rotation schedule according to your organization's security policies such as every 90 days.

To copy the key resource name, do the following:

1. After the key is created, navigate to its details page.
2. Locate the resource name. The format is
`projects/YOUR_PROJECT_ID/locations/YOUR_REGION/keyRings/YOUR_KEY_RING_NAME/cryptoKeys/YOUR_KEY_NAME/cryptoKeyVersions/1`. [!IMPORTANT]
Important: For the `EncryptionSpec` in your RAG corpus, you must use the key resource name without the version number.
3. Copy the resource name, and remove the `/cryptoKeyVersions/VERSION_NUMBER`
part. The correctly formatted resource name is
`projects/YOUR_PROJECT_ID/locations/YOUR_REGION/keyRings/YOUR_KEY_RING_NAME/cryptoKeys/YOUR_KEY_NAME`.

#### Grant Permissions to the RAG Engine service agent

For the RAG Engine to encrypt and decrypt data using
your KMS key, its service agent needs appropriate permissions on that specific
key.

To identify your RAG Engine service agent, do the
following:

1. Navigate to the IAM & Admin > IAM page in the Google Cloud console for
your project.
2. On the Identity and Access Management page, enable the Include Google-provided role grants
checkbox.
3. In the filter or search bar for the principals list, search for the
RAG Engine service agent. It follows the pattern
`service-YOUR_PROJECT_NUMBER@gcp-sa-vertex-rag.iam.gserviceaccount.com`. Replace YOUR_PROJECT_NUMBER with your Google Cloud project
number.

If your RAG Engine service
agent isn't present yet, do the following to trigger service agent creation:

1. Enable
the Resource Manager API.
2. Execute this command in the Cloud Shell or command line: gcloud beta services identity create --service=aiplatform.googleapis.com \
 --projects=PROJECT_ID
Alternatively, send the REST API call: curl -X POST -H "Authorization: Bearer $(gcloud auth print-access-token)" -H "Content-Type: application/json; charset=utf-8" -d "" "https://serviceusage.googleapis.com/v1beta1/projects/PROJECT_ID/services/aiplatform.googleapis.com:generateServiceIdentity"

3. Verify that the RAG Engine service agent was created.

To grant permissions on the KMS key, do the following:

1. Go back to the Key Management service in the Google Cloud console.
2. Select the key ring containing the key you created.
3. Select the specific key you created.
4. In the key's details page, go to the Permissions tab.
5. Click Add Principal.
6. In the New principals field, type the RAG Engine
service agent's email address.
7. In the Select a role drop-down, select the Cloud KMS CryptoKey
Encrypter/Decrypter role (`roles/cloudkms.cryptoKeyEncrypterDecrypter`). This
role grants the service agent the necessary permissions to use the key for
encryption and decryption operations.
8. Click Save.

### Create a RAG corpus with customer-managed encryption

This code sample demonstrates how to create a RAG corpus encrypted with a
Customer Managed Encrypted Key (CMEK).

Replace the variables in the following code samples:

### Python

```
from google.cloud import aiplatform
from vertexai import rag
from google.cloud.aiplatform_v1.types.encryption_spec import https://docs.cloud.google.com/python/docs/reference/aiplatform/latest/google.cloud.aiplatform_v1.types.EncryptionSpec.html

KMS_KEY_NAME = YOUR_KMS_KEY_NAME

https://docs.cloud.google.com/python/docs/reference/agentplatform/latest.https://docs.cloud.google.com/python/docs/reference/aiplatform/latest/google.cloud.aiplatform.html(project=PROJECT_ID)

rag_corpus = rag.create_corpus(display_name=DISPLAY_NAME, encryption_spec=EncryptionSpec(kms_key_name=KMS_KEY_NAME))

```

### REST

```

https://${LOCATION}-aiplatform.googleapis.com/v1/projects/${PROJECT_ID}/locations/${LOCATION}/ragCorpora \
      "display_name" : '\""${CORPUS_DISPLAY_NAME}"\"',
      "encryption_spec" : {
        "kms_key_name" : '\""${KMS_KEY_NAME}"\"'

```

### Quotas

When you use CMEK with Gemini Enterprise Agent Platform services, such as the
RAG Engine on Gemini Enterprise Agent Platform, there's a quota on the number of unique
Cloud KMS keys that can be in use per project per region. This quota is
tracked by the metric
`aiplatform.googleapis.com/in_use_customer_managed_encryption_keys`.

Each time you use a new, unique KMS key to create a resource like a RAG corpus
within a project and region, the KMS key consumes one unit of this quota. This
quota unit isn't released even if the resources using that specific key are
deleted.

If you need more unique keys than the current limit, you must request a quota increase for
`aiplatform.googleapis.com/in_use_customer_managed_encryption_keys` for the
select region.

For more information on how to request a quota increase, see View and edit the
quotas in the Google Cloud console.

## What's next

- To learn more about RagManagedDb, see Understanding
- To import files and folders from Google Drive or Cloud Storage, see Import RAG files
example.
- To list RAG files, see List RAG files
