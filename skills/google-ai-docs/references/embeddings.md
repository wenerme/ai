> ## AI Agent Context
> Get the complete documentation index at: https://aistudio.google.com/llms.txt
> Use this file to discover all available pages.
> For the full documentation in a single file, fetch: https://aistudio.google.com/llms-full.txt

# Embeddings

The Gemini API offers embedding models to generate embeddings for text, images,
video, and other content. These resulting embeddings can then be used for tasks
such as semantic search, classification, and clustering, providing more
accurate, context-aware results than keyword-based approaches.

The latest model, `gemini-embedding-2`, is the first multimodal
embedding model in the Gemini API. It maps text, images,
video, audio, and documents into a unified embedding space, enabling cross-modal
search, classification, and clustering across over 100 languages. See the
[multimodal embeddings section](/docs/embeddings#multimodal) to learn more. For text-only
use cases, `gemini-embedding-001` remains available.

Building Retrieval Augmented Generation (RAG) systems is a common use case for
AI products. Embeddings play a key role in significantly enhancing model outputs
with improved factual accuracy, coherence, and contextual richness. If you
prefer to use a managed RAG solution, we built the
[File Search](/docs/file-search) tool which makes doing RAG easier to manage and
more cost effective.

## Generating embeddings  {% id="generate-embeddings" %}

Use the `embedContent` method to generate text embeddings:

{% tabs %}
  {% tab label="Python" %}
  ```python
  from google import genai
  
  client = genai.Client()
  
  result = client.models.embed_content(
          model="gemini-embedding-2",
          contents="What is the meaning of life?"
  )
  
  print(result.embeddings)
  ```

  {% /tab %}

  {% tab label="JavaScript" %}
  ```js
  import { GoogleGenAI } from "@google/genai";
  
  async function main() {
  
      const ai = new GoogleGenAI({});
  
      const response = await ai.models.embedContent({
          model: 'gemini-embedding-2',
          contents: 'What is the meaning of life?',
      });
  
      console.log(response.embeddings);
  }
  
  await main();
  ```

  {% /tab %}

  {% tab label="Java" %}
  ```java
  import com.google.genai.Client;
  import com.google.genai.types.EmbedContentResponse;
  
  Client client = new Client();
  
  EmbedContentResponse response =
      client.models.embedContent("gemini-embedding-2", "What is the meaning of life?", null);
  
  System.out.println(response.embeddings().orElse(null));
  ```

  {% /tab %}

  {% tab label="Go" %}
  ```go
  package main
  
  import (
      "context"
      "encoding/json"
      "fmt"
      "log"
  
      "google.golang.org/genai"
  )
  
  func main() {
      ctx := context.Background()
      client, err := genai.NewClient(ctx, nil)
      if err != nil {
          log.Fatal(err)
      }
  
      contents := []*genai.Content{
          genai.NewContentFromText("What is the meaning of life?", genai.RoleUser),
      }
      result, err := client.Models.EmbedContent(ctx,
          "gemini-embedding-2",
          contents,
          nil,
      )
      if err != nil {
          log.Fatal(err)
      }
  
      embeddings, err := json.MarshalIndent(result.Embeddings, "", " ")
      if err != nil {
          log.Fatal(err)
      }
      fmt.Println(string(embeddings))
  }
  ```

  {% /tab %}

  {% tab label="REST" %}
  ```shell
  curl "https://generativelanguage.googleapis.com/v1beta/models/gemini-embedding-2:embedContent" \
      -H "Content-Type: application/json" \
      -H "x-goog-api-key: ${GEMINI_API_KEY}" \
      -d '{
          "model": "models/gemini-embedding-2",
          "content": {
          "parts": [{
              "text": "What is the meaning of life?"
          }]
          }
      }'
  ```

  {% /tab %}

{% /tabs %}

{% callout type="note" %}
  While `gemini-embedding-001` lets you generate individual embeddings for a
  list of strings, Gemini Embedding 2 produces a single aggregated embedding for
  multiple inputs. You can find more information in [Embedding aggregation](/docs/embeddings#embedding-aggregation),
  or you can use the [Batch API](/docs/batch-api#batch-embedding) if
  you want to generate multiple embeddings at once.

{% /callout %}

## Specify task type to improve performance  {% id="task-types" %}

You can use embeddings for a wide range of tasks from classification to document
search. Specifying the right task type helps optimize the embeddings for the
intended relationships, maximizing accuracy and efficiency.

### Task types with Embeddings 2  {% id="task-types-embeddings-2" %}

For text-only tasks with `gemini-embedding-2`, we strongly recommend you
add the task instruction in your prompt. This can be done by formatting the
query and the document with the correct task prefix.

When generating a [single embedding based on multimodal
input](/docs/embeddings#embedding-aggregation), we generally don't recommend
prefixing the text portion of the input with a task instruction. In some cases
it improves performance, but in others it reduces performance.

The following tables show examples of how to format queries and documents for
symmetric and asymmetric use cases using the `gemini-embedding-2` model.

**Retrieval use cases (Asymmetric format)**

In asymmetric use cases, add the task prefix to the query and apply
the document structure for the content you want to embed and retrieve.

{% table %}
  * Use case
  * Query structure
  * Document structure

  ---

  * Search query
  * `task: search result | query: {content}`
  *     `title: {title} | text: {content}`

    If there is no title, use `title: none`.


  ---

  * Question answering
  * `task: question answering | query: {content}`
  * `title: {title} | text: {content}`

  ---

  * Fact checking
  * `task: fact checking | query: {content}`
  * `title: {title} | text: {content}`

  ---

  * Code retrieval
  * `task: code retrieval | query: {content}`
  * `title: {title} | text: {content}`
{% /table %}

**Example usage**

{% tabs %}
  {% tab label="Python" %}
  ```python
  def prepare_query(query):
      return f"task: search result | query: {query}"
  
  def prepare_document(content, title=None):
      if title is None:
          title = "none"
      return f"title: {title} | text: {content}"
  ```

  {% /tab %}

  {% tab label="Java" %}
  ```java
  // Generate embedding for a task's query. Use your correct task here:
  String query = "What is the capital of France?";
  String formattedQuery = "task: search result | query: " + query;
  
  // Generate embedding for document of an asymmetric retrieval task:
  String title = "France";
  String content = "Paris is the capital and most populous city of France.";
  String formattedDocument = "title: " + (title != null ? title : "none") + " | text: " + content;
  ```

  {% /tab %}

{% /tabs %}

**Single-input use cases (Symmetric format)**

In symmetric use cases, for the same task, use the same formatting
for the query and the document.

{% table %}
  * Use case
  * Input structure

  ---

  * Classification
  * `task: classification | query: {content}`

  ---

  * Clustering
  * `task: clustering | query: {content}`

  ---

  * Semantic similarity
  *     `task: sentence similarity | query: {content}`

    Do not use this for search or retrieval. It is intended for semantic textual similarity.

{% /table %}

**Example usage**

{% tabs %}
  {% tab label="Python" %}
  ```python
  def prepare_query_and_document(content):
      return f'task: classification | query: {content}'
  ```

  {% /tab %}

  {% tab label="Java" %}
  ```java
  // Generate embedding for query & document of your task.
  String content = "This movie was fantastic!";
  String formattedContent = "task: classification | query: " + content;
  ```

  {% /tab %}

{% /tabs %}

It is important that the task is used consistently. E.g., if documents are
embedded with `f'task: classification | query: {content}'`, the query should
also be embedded following this task format.

### Task types with Embeddings 1  {% id="task-types-embeddings-1" %}

For `gemini-embedding-001`, you can specify the `task_type` in the
`embedContent` method. For a complete list of supported task types, see the
[Supported task types](/docs/embeddings#supported-task-types) table.

{% callout type="note" %}
  You cannot use the `task_type` field for the `gemini-embedding-2` model. Instead, include the task as an instruction in your prompt, as detailed in the [above section](/docs/embeddings#task-types-embeddings-2).

{% /callout %}

The following example shows how you can use `SEMANTIC_SIMILARITY` to check how
similar in meaning strings of texts are.

{% tabs %}
  {% tab label="Python" %}
  ```python
  from google import genai
  from google.genai import types
  import pandas as pd
  from sklearn.metrics.pairwise import cosine_similarity
  
  client = genai.Client()
  
  texts = [
      "What is the meaning of life?",
      "What is the purpose of existence?",
      "How do I bake a cake?",
  ]
  
  result = client.models.embed_content(
      model="gemini-embedding-001",
      contents=texts,
      config=types.EmbedContentConfig(task_type="SEMANTIC_SIMILARITY")
  )
  
  df = pd.DataFrame(
      cosine_similarity([e.values for e in result.embeddings]),
      index=texts,
      columns=texts,
  )
  
  print(df)
  ```

  {% /tab %}

  {% tab label="JavaScript" %}
  ```js
  import { GoogleGenAI } from "@google/genai";
  // npm i compute-cosine-similarity
  import * as cosineSimilarity from "compute-cosine-similarity";
  
  async function main() {
      const ai = new GoogleGenAI({});
  
      const texts = [
          "What is the meaning of life?",
          "What is the purpose of existence?",
          "How do I bake a cake?",
      ];
  
      const response = await ai.models.embedContent({
          model: 'gemini-embedding-001',
          contents: texts,
          config: { taskType: 'SEMANTIC_SIMILARITY' },
      });
  
      const embeddings = response.embeddings?.map(e => e.values || []) || [];
  
      for (let i = 0; i < texts.length; i++) {
          for (let j = i + 1; j < texts.length; j++) {
              const text1 = texts[i];
              const text2 = texts[j];
              const similarity = cosineSimilarity(embeddings[i], embeddings[j]);
              console.log(`Similarity between '${text1}' and '${text2}': ${similarity.toFixed(4)}`);
          }
      }
  }
  
  await main();
  ```

  {% /tab %}

  {% tab label="Java" %}
  ```java
  import java.util.Arrays;
  import com.google.genai.Client;
  import com.google.genai.types.ContentEmbedding;
  import com.google.genai.types.EmbedContentConfig;
  import com.google.genai.types.EmbedContentResponse;
  import java.util.List;
  
  Client client = new Client();
  
  List<String> texts =
      Arrays.asList(
          "What is the meaning of life?",
          "What is the purpose of existence?",
          "How do I bake a cake?");
  
  EmbedContentConfig config =
      EmbedContentConfig.builder().taskType("SEMANTIC_SIMILARITY").build();
  
  EmbedContentResponse response =
      client.models.embedContent("gemini-embedding-001", texts, config);
  
  List<ContentEmbedding> embeddings = response.embeddings().get();
  
  for (int i = 0; i < texts.size(); i++) {
    for (int j = i + 1; j < texts.size(); j++) {
      List<Float> v1 = embeddings.get(i).values().get();
      List<Float> v2 = embeddings.get(j).values().get();
      double dotProduct = 0.0;
      double normA = 0.0;
      double normB = 0.0;
      for (int k = 0; k < v1.size(); k++) {
        dotProduct += v1.get(k) * v2.get(k);
        normA += v1.get(k) * v1.get(k);
        normB += v2.get(k) * v2.get(k);
      }
      double similarity = dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
      System.out.printf(
          "Similarity between '%s' and '%s': %.4f%n", texts.get(i), texts.get(j), similarity);
    }
  }
  ```

  {% /tab %}

  {% tab label="Go" %}
  ```go
  package main
  
  import (
      "context"
      "fmt"
      "log"
      "math"
  
      "google.golang.org/genai"
  )
  
  // cosineSimilarity calculates the similarity between two vectors.
  func cosineSimilarity(a, b []float32) (float64, error) {
      if len(a) != len(b) {
          return 0, fmt.Errorf("vectors must have the same length")
      }
  
      var dotProduct, aMagnitude, bMagnitude float64
      for i := 0; i < len(a); i++ {
          dotProduct += float64(a[i] * b[i])
          aMagnitude += float64(a[i] * a[i])
          bMagnitude += float64(b[i] * b[i])
      }
  
      if aMagnitude == 0 || bMagnitude == 0 {
          return 0, nil
      }
  
      return dotProduct / (math.Sqrt(aMagnitude) * math.Sqrt(bMagnitude)), nil
  }
  
  func main() {
      ctx := context.Background()
      client, _ := genai.NewClient(ctx, nil)
      defer client.Close()
  
      texts := []string{
          "What is the meaning of life?",
          "What is the purpose of existence?",
          "How do I bake a cake?",
      }
  
      var contents []*genai.Content
      for _, text := range texts {
          contents = append(contents, genai.NewContentFromText(text, genai.RoleUser))
      }
  
      result, _ := client.Models.EmbedContent(ctx,
          "gemini-embedding-001",
          contents,
          &genai.EmbedContentRequest{TaskType: genai.TaskTypeSemanticSimilarity},
      )
  
      embeddings := result.Embeddings
  
      for i := 0; i < len(texts); i++ {
          for j := i + 1; j < len(texts); j++ {
              similarity, _ := cosineSimilarity(embeddings[i].Values, embeddings[j].Values)
              fmt.Printf("Similarity between '%s' and '%s': %.4f\n", texts[i], texts[j], similarity)
          }
      }
  }
  ```

  {% /tab %}

  {% tab label="REST" %}
  ```shell
  curl "https://generativelanguage.googleapis.com/v1beta/models/gemini-embedding-001:embedContent" \
      -H "Content-Type: application/json" \
      -H "x-goog-api-key: $GEMINI_API_KEY" \
      -d '{
      "taskType": "SEMANTIC_SIMILARITY",
      "content": {
          "parts": [
          {
              "text": "What is the meaning of life?"
          },
          {
              "text": "How much wood would a woodchuck chuck?"
          },
          {
              "text": "How does the brain work?"
          }
          ]
      }
      }'
  ```

  {% /tab %}

{% /tabs %}

The code snippets will show how similar the different chunks of text are to one
another when run.

{% callout type="note" %}
  Cosine similarity is a good distance metric because it focuses on
  direction rather than magnitude, which more accurately reflects conceptual
  closeness. Values range from -1 (opposite) to 1 (greatest similarity).

{% /callout %}

#### Supported task types  {% id="supported-task-types" %}

Supported task types for `gemini-embedding-001`:

{% table %}
  * **SEMANTIC_SIMILARITY**
  * Embeddings optimized to assess text similarity.
  * Recommendation systems, duplicate detection

  ---

  * **CLASSIFICATION**
  * Embeddings optimized to classify texts according to preset labels.
  * Sentiment analysis, spam detection

  ---

  * **CLUSTERING**
  * Embeddings optimized to cluster texts based on their similarities.
  * Document organization, market research, anomaly detection

  ---

  * **RETRIEVAL_DOCUMENT**
  * Embeddings optimized for document search.
  * Indexing articles, books, or web pages for search.

  ---

  * **RETRIEVAL_QUERY**
  * Embeddings optimized for general search queries. Use `RETRIEVAL_QUERY` for
    queries; `RETRIEVAL_DOCUMENT` for documents to be retrieved.
  * Custom search

  ---

  * **CODE_RETRIEVAL_QUERY**
  * Embeddings optimized for retrieval of code blocks based on natural language
    queries. Use `CODE_RETRIEVAL_QUERY` for queries; `RETRIEVAL_DOCUMENT` for code
    blocks to be retrieved.
  * Code suggestions and search

  ---

  * **QUESTION_ANSWERING**
  * Embeddings for questions in a question-answering system, optimized for finding
    documents that answer the question. Use `QUESTION_ANSWERING` for questions;
    `RETRIEVAL_DOCUMENT` for documents to be retrieved.
  * Chatbox

  ---

  * **FACT_VERIFICATION**
  * Embeddings for statements that need to be verified, optimized for retrieving
    documents that contain evidence supporting or refuting the statement. Use
    `FACT_VERIFICATION` for the target text; `RETRIEVAL_DOCUMENT` for documents to
    be retrieved.
  * Automated fact-checking systems
{% /table %}

## Controlling embedding size  {% id="control-embedding-size" %}

Both `gemini-embedding-001` and `gemini-embedding-2` are trained using
the Matryoshka Representation Learning (MRL) technique which teaches a model to
learn high-dimensional embeddings that have initial segments (or prefixes) which
are also useful, simpler versions of the same data.

Use the `output_dimensionality` parameter to control the size of
the output embedding vector. Selecting a smaller output dimensionality can save
storage space and increase computational efficiency for downstream applications,
while sacrificing little in terms of quality. By default, both models output a
3072-dimensional embedding, but you can truncate it to a smaller size without
losing quality to save storage space. We recommend using 768, 1536, or 3072
output dimensions.

{% tabs %}
  {% tab label="Python" %}
  ```python
  from google import genai
  from google.genai import types
  
  client = genai.Client()
  
  result = client.models.embed_content(
      model="gemini-embedding-2",
      contents="What is the meaning of life?",
      config=types.EmbedContentConfig(output_dimensionality=768)
  )
  
  [embedding_obj] = result.embeddings
  embedding_length = len(embedding_obj.values)
  
  print(f"Length of embedding: {embedding_length}")
  ```

  {% /tab %}

  {% tab label="JavaScript" %}
  ```javascript
  import { GoogleGenAI } from "@google/genai";
  
  async function main() {
      const ai = new GoogleGenAI({});
  
      const response = await ai.models.embedContent({
          model: 'gemini-embedding-2',
          contents: 'What is the meaning of life?',
          config: { outputDimensionality: 768 },
      });
  
      const embeddingLength = response.embeddings?.[0]?.values?.length || 0;
      console.log(`Length of embedding: ${embeddingLength}`);
  }
  
  await main();
  ```

  {% /tab %}

  {% tab label="Java" %}
  ```java
  import com.google.genai.Client;
  import com.google.genai.types.ContentEmbedding;
  import com.google.genai.types.EmbedContentConfig;
  import com.google.genai.types.EmbedContentResponse;
  
  Client client = new Client();
  
  EmbedContentConfig config =
      EmbedContentConfig.builder().outputDimensionality(768).build();
  
  EmbedContentResponse response =
      client.models.embedContent("gemini-embedding-2", "What is the meaning of life?", config);
  
  ContentEmbedding embeddingObj = response.embeddings().get().get(0);
  int embeddingLength = embeddingObj.values().get().size();
  
  System.out.println("Length of embedding: " + embeddingLength);
  ```

  {% /tab %}

  {% tab label="Go" %}
  ```go
  package main
  
  import (
      "context"
      "fmt"
      "log"
  
      "google.golang.org/genai"
  )
  
  func main() {
      ctx := context.Background()
      // The client uses Application Default Credentials.
      // Authenticate with 'gcloud auth application-default login'.
      client, err := genai.NewClient(ctx, nil)
      if err != nil {
          log.Fatal(err)
      }
      defer client.Close()
  
      contents := []*genai.Content{
          genai.NewContentFromText("What is the meaning of life?", genai.RoleUser),
      }
  
      result, err := client.Models.EmbedContent(ctx,
          "gemini-embedding-2",
          contents,
          &genai.EmbedContentRequest{OutputDimensionality: 768},
      )
      if err != nil {
          log.Fatal(err)
      }
  
      embedding := result.Embeddings[0]
      embeddingLength := len(embedding.Values)
      fmt.Printf("Length of embedding: %d\n", embeddingLength)
  }
  ```

  {% /tab %}

  {% tab label="REST" %}
  ```shell
  curl -X POST "https://generativelanguage.googleapis.com/v1beta/models/gemini-embedding-2:embedContent" \
      -H 'Content-Type: application/json' \
      -H "x-goog-api-key: $GEMINI_API_KEY" \
      -d '{
          "content": {"parts":[{ "text": "What is the meaning of life?"}]},
          "output_dimensionality": 768
      }'
  ```

  {% /tab %}

{% /tabs %}

Example output from the code snippet:

```none
Length of embedding: 768
```

## Ensuring quality for smaller dimensions  {% id="quality-for-smaller-dimensions" %}

{% callout type="note" %}
  `gemini-embedding-2` introduces automatic renormalization for non-default
  dimensions.

{% /callout %}

While the default 3072-dimension embeddings are always normalized, Gemini
Embedding 2 also auto-normalizes truncated dimensions (e.g., 768, 1536). This
ensures semantic similarity is calculated via vector direction rather than
magnitude, providing more accurate results out of the box.

**Older Models**: If you are using `gemini-embedding-001`, you must manually
normalize non-3072 dimensions as follows:

{% tabs %}
  {% tab label="Python" %}
  ```python
  import numpy as np
  from numpy.linalg import norm
  
  embedding_values_np = np.array(embedding_obj.values)
  normed_embedding = embedding_values_np / np.linalg.norm(embedding_values_np)
  
  print(f"Normed embedding length: {len(normed_embedding)}")
  print(f"Norm of normed embedding: {np.linalg.norm(normed_embedding):.6f}") # Should be very close to 1
  ```

  {% /tab %}

  {% tab label="Java" %}
  ```java
  import com.google.genai.Client;
  import com.google.genai.types.ContentEmbedding;
  import com.google.genai.types.EmbedContentConfig;
  import com.google.genai.types.EmbedContentResponse;
  import java.util.ArrayList;
  import java.util.List;
  
  Client client = new Client();
  
  EmbedContentConfig config =
      EmbedContentConfig.builder().outputDimensionality(768).build();
  
  EmbedContentResponse response =
      client.models.embedContent("gemini-embedding-2", "What is the meaning of life?", config);
  
  ContentEmbedding embeddingObj = response.embeddings().get().get(0);
  List<Float> values = embeddingObj.values().get();
  
  double norm = 0.0;
  for (float v : values) {
    norm += v * v;
  }
  norm = Math.sqrt(norm);
  
  List<Double> normedEmbedding = new ArrayList<>();
  double newNorm = 0.0;
  for (float v : values) {
    double normedVal = v / norm;
    normedEmbedding.add(normedVal);
    newNorm += normedVal * normedVal;
  }
  newNorm = Math.sqrt(newNorm);
  
  System.out.println("Normed embedding length: " + normedEmbedding.size());
  System.out.printf("Norm of normed embedding: %.6f%n", newNorm); // Should be very close to 1
  ```

  {% /tab %}

{% /tabs %}

Example output from this code snippet:

```none
Normed embedding length: 768
Norm of normed embedding: 1.000000
```

The following table shows the MTEB scores, a commonly used benchmark for
embeddings, for different dimensions. Notably, the result shows that performance
is not strictly tied to the size of the embedding dimension, with lower
dimensions achieving scores comparable to their higher dimension counterparts.

{% table %}
  * 2048
  * 68.16

  ---

  * 1536
  * 68.17

  ---

  * 768
  * 67.99

  ---

  * 512
  * 67.55

  ---

  * 256
  * 66.19

  ---

  * 128
  * 63.31
{% /table %}

## Multimodal embeddings  {% id="multimodal" %}

The `gemini-embedding-2` model supports multimodal input, allowing you
to embed images, video, audio, and documents content alongside text. All
modalities are mapped into the same embedding space, enabling cross-modal search
and comparison.

### Supported modalities and limits  {% id="supported-modalities" %}

The overall maximum input tokens limit is 8192 tokens.

{% table %}
  * **Text**
  * Supports up to 8,192 tokens.

  ---

  * **Image**
  * Maximum of 6 images per request. Supported formats: PNG, JPEG.

  ---

  * **Audio**
  * Maximum duration of 180 seconds. Supported formats: MP3, WAV.

  ---

  * **Video**
  *     Maximum duration of 120 seconds. Supported formats: MP4, MOV. Supported codecs: H264, H265, AV1, VP9.

    The system processes a maximum of 32 frames per video: short videos (≤32s) are sampled at 1 fps, while longer videos are uniformly sampled to 32 frames. Audio tracks are not processed in video files.


  ---

  * **Documents (PDF)**
  * Maximum of 1 file per request, up to 6 pages.
{% /table %}

### Embedding images  {% id="embed-images" %}

The following example shows how to embed an image using
`gemini-embedding-2`.

Images can be provided as inline data or as uploaded files
through the [Files API](/docs/files).

{% tabs %}
  {% tab label="Python" %}
  ```python
  from google import genai
  from google.genai import types
  
  with open('example.png', 'rb') as f:
      image_bytes = f.read()
  
  client = genai.Client()
  
  result = client.models.embed_content(
      model='gemini-embedding-2',
      contents=[
          types.Part.from_bytes(
              data=image_bytes,
              mime_type='image/png',
          ),
      ]
  )
  
  print(result.embeddings)
  ```

  {% /tab %}

  {% tab label="JavaScript" %}
  ```js
  import { GoogleGenAI } from "@google/genai";
  import * as fs from "node:fs";
  
  async function main() {
      const ai = new GoogleGenAI({});
  
      const imgBase64 = fs.readFileSync("example.png", { encoding: "base64" });
  
      const response = await ai.models.embedContent({
          model: 'gemini-embedding-2',
          contents: [{
              inlineData: {
                  mimeType: 'image/png',
                  data: imgBase64,
              },
          }],
      });
  
      console.log(response.embeddings);
  }
  
  await main();
  ```

  {% /tab %}

  {% tab label="Java" %}
  ```java
  import com.google.genai.Client;
  import com.google.genai.types.Content;
  import com.google.genai.types.EmbedContentResponse;
  import com.google.genai.types.Part;
  import java.nio.file.Files;
  import java.nio.file.Paths;
  
  Client client = new Client();
  
  byte[] imageBytes = Files.readAllBytes(Paths.get("example.png"));
  
  Content content = Content.fromParts(Part.fromBytes(imageBytes, "image/png"));
  
  EmbedContentResponse response =
      client.models.embedContent("gemini-embedding-2", content, null);
  
  System.out.println(response.embeddings().orElse(null));
  ```

  {% /tab %}

  {% tab label="REST" %}
  ```sh
  IMG_PATH="/path/to/your/image.png"
  IMG_BASE64=$(base64 -w0 "${IMG_PATH}")
  
  curl "https://generativelanguage.googleapis.com/v1beta/models/gemini-embedding-2:embedContent" \
      -H "Content-Type: application/json" \
      -H "x-goog-api-key: ${GEMINI_API_KEY}" \
      -d '{
          "content": {
              "parts": [{
                  "inline_data": {
                      "mime_type": "image/png",
                      "data": "'"${IMG_BASE64}"'"
                  }
              }]
          }
      }'
  ```

  {% /tab %}

{% /tabs %}

### Embedding aggregation  {% id="embedding-aggregation" %}

When working with multimodal content, how you structure your input affects the
embedding output:

*   **Multiple parts (aggregated):** Adding multiple inputs directly to the
  `contents` parameter produces one aggregated embedding for all inputs.

*   **Multiple `Content` objects (separate):** Wrapping each input in a
  `Content` object and passing them in the `contents` parameter returns
  separate embeddings for each entry.

*   **Post-level representation:** For complex objects like social media posts
  with multiple media items, we recommend aggregating separate embeddings
  (for example, by averaging) to create a coherent post-level representation.


The following example shows how to create one aggregated embedding for text and
image input. Simply add multiple inputs to the `contents` parameter:

{% tabs %}
  {% tab label="Python" %}
  ```python
  from google import genai
  from google.genai import types
  
  client = genai.Client()
  
  with open('dog.png', 'rb') as f:
      image_bytes = f.read()
  
  result = client.models.embed_content(
      model='gemini-embedding-2',
      contents=[
          "An image of a dog",
          types.Part.from_bytes(
              data=image_bytes,
              mime_type='image/png',
          ),
      ]
  )
  
  for embedding in result.embeddings:
      print(embedding.values)
  ```

  {% /tab %}

  {% tab label="JavaScript" %}
  ```js
  import { GoogleGenAI } from "@google/genai";
  import * as fs from "node:fs";
  
  async function main() {
      const ai = new GoogleGenAI({});
  
      const imgBase64 = fs.readFileSync("dog.png", { encoding: "base64" });
  
      const response = await ai.models.embedContent({
          model: 'gemini-embedding-2',
          contents: [
              'An image of a dog',
              {
                  inlineData: {
                      mimeType: 'image/png',
                      data: imgBase64,
                  },
              },
          ],
      });
  
      // This produces one embedding
      for (const embedding of response.embeddings || []) {
          console.log(embedding.values);
      }
  }
  
  await main();
  ```

  {% /tab %}

  {% tab label="Java" %}
  ```java
  import com.google.genai.Client;
  import com.google.genai.types.Content;
  import com.google.genai.types.ContentEmbedding;
  import com.google.genai.types.EmbedContentResponse;
  import com.google.genai.types.Part;
  import java.nio.file.Files;
  import java.nio.file.Paths;
  import java.util.Collections;
  
  Client client = new Client();
  
  byte[] imageBytes = Files.readAllBytes(Paths.get("dog.png"));
  
  Content content =
      Content.fromParts(
          Part.fromText("An image of a dog"),
          Part.fromBytes(imageBytes, "image/png"));
  
  EmbedContentResponse response =
      client.models.embedContent("gemini-embedding-2", content, null);
  
  // This produces one embedding
  for (ContentEmbedding embedding : response.embeddings().orElse(Collections.emptyList())) {
    System.out.println(embedding.values().orElse(Collections.emptyList()));
  }
  ```

  {% /tab %}

  {% tab label="REST" %}
  ```sh
  IMG_PATH="/path/to/your/dog.png"
  IMG_BASE64=$(base64 -w0 "${IMG_PATH}")
  
  curl "https://generativelanguage.googleapis.com/v1beta/models/gemini-embedding-2:embedContent" \
      -H "Content-Type: application/json" \
      -H "x-goog-api-key: ${GEMINI_API_KEY}" \
      -d '{
          "content": {
              "parts": [
                  {"text": "An image of a dog"},
                  {
                      "inline_data": {
                          "mime_type": "image/png",
                          "data": "'"${IMG_BASE64}"'"
                      }
                  }
              ]
          }
      }'
  ```

  {% /tab %}

{% /tabs %}

{% callout type="note" %}
  The text portion of the multimodal input shouldn't include task type
  information.

{% /callout %}

On the other hand, if you use `Content` objects inside the `contents` parameter,
it returns separate embeddings. This example creates multiple embeddings in one
embedding call:

{% tabs %}
  {% tab label="Python" %}
  ```python
  from google import genai
  from google.genai import types
  
  client = genai.Client()
  
  with open('dog.png', 'rb') as f:
      image_bytes = f.read()
  
  result = client.models.embed_content(
      model="gemini-embedding-2",
      contents=[
          types.Content(parts=[types.Part.from_text(text="task: classification | query: An image of a dog")]),
          types.Content(
              parts=[
                  types.Part.from_bytes(
                      data=image_bytes,
                      mime_type="image/png",
                  ),
              ]
          ),
      ],
  )
  
  for embedding in result.embeddings:
      print(embedding.values)
  ```

  {% /tab %}

  {% tab label="JavaScript" %}
  ```js
  import { GoogleGenAI } from "@google/genai";
  import * as fs from "node:fs";
  
  async function main() {
      const ai = new GoogleGenAI({});
  
      const imgBase64 = fs.readFileSync("dog.png", { encoding: "base64" });
  
      const response = await ai.models.embedContent({
          model: 'gemini-embedding-2',
          contents: [
              { parts: [{ text: 'task: classification | query: An image of a dog' }] },
              {
                  parts: [{
                      inlineData: {
                          mimeType: 'image/png',
                          data: imgBase64,
                      },
                  }],
              },
          ],
      });
  
      // This produces two embeddings
      for (const embedding of response.embeddings || []) {
          console.log(embedding.values);
      }
  }
  
  await main();
  ```

  {% /tab %}

  {% tab label="Java" %}
  ```java
  import java.util.Arrays;
  import com.google.genai.Client;
  import com.google.genai.types.Content;
  import com.google.genai.types.ContentEmbedding;
  import com.google.genai.types.EmbedContentResponse;
  import com.google.genai.types.Part;
  import java.nio.file.Files;
  import java.nio.file.Paths;
  import java.util.Collections;
  import java.util.List;
  
  Client client = new Client();
  
  byte[] imageBytes = Files.readAllBytes(Paths.get("dog.png"));
  
  List<Content> contents =
      Arrays.asList(
          Content.fromParts(Part.fromText("task: classification | query: An image of a dog")),
          Content.fromParts(Part.fromBytes(imageBytes, "image/png")));
  
  // Embed each Content object separately to produce separate embeddings
  for (Content content : contents) {
    EmbedContentResponse response =
        client.models.embedContent("gemini-embedding-2", content, null);
    for (ContentEmbedding embedding : response.embeddings().orElse(Collections.emptyList())) {
      System.out.println(embedding.values().orElse(Collections.emptyList()));
    }
  }
  ```

  {% /tab %}

  {% tab label="REST" %}
  ```sh
  IMG_PATH="/path/to/your/dog.png"
  IMG_BASE64=$(base64 -w0 "${IMG_PATH}")
  
  curl "https://generativelanguage.googleapis.com/v1beta/models/gemini-embedding-2:batchEmbedContents" \
      -H "Content-Type: application/json" \
      -H "x-goog-api-key: ${GEMINI_API_KEY}" \
      -d '{
          "requests": [
              {
                  "model": "models/gemini-embedding-2",
                  "content": {"parts": [{"text": "task: classification | query: An image of a dog"}]}
              },
              {
                  "model": "models/gemini-embedding-2",
                  "content": {"parts": [{"inline_data": {"mime_type": "image/png", "data": "'"${IMG_BASE64}"'"}}]}
              }
          ]
      }'
  ```

  {% /tab %}

{% /tabs %}

### Embedding audio  {% id="embed-audio" %}

The following example shows how to embed an audio file using
`gemini-embedding-2`.

Audio files can be provided as inline data or as uploaded files
through the [Files API](/docs/files).

{% tabs %}
  {% tab label="Python" %}
  ```python
  from google import genai
  from google.genai import types
  
  with open('example.mp3', 'rb') as f:
      audio_bytes = f.read()
  
  client = genai.Client()
  
  result = client.models.embed_content(
      model='gemini-embedding-2',
      contents=[
          types.Part.from_bytes(
              data=audio_bytes,
              mime_type='audio/mpeg',
          ),
      ]
  )
  
  print(result.embeddings)
  ```

  {% /tab %}

  {% tab label="JavaScript" %}
  ```js
  import { GoogleGenAI } from "@google/genai";
  import * as fs from "node:fs";
  
  async function main() {
      const ai = new GoogleGenAI({});
  
      const audioBase64 = fs.readFileSync("example.mp3", { encoding: "base64" });
  
      const response = await ai.models.embedContent({
          model: 'gemini-embedding-2',
          contents: [{
              inlineData: {
                  mimeType: 'audio/mpeg',
                  data: audioBase64,
              },
          }],
      });
  
      console.log(response.embeddings);
  }
  
  await main();
  ```

  {% /tab %}

  {% tab label="Java" %}
  ```java
  import com.google.genai.Client;
  import com.google.genai.types.Content;
  import com.google.genai.types.EmbedContentResponse;
  import com.google.genai.types.Part;
  import java.nio.file.Files;
  import java.nio.file.Paths;
  
  Client client = new Client();
  
  byte[] audioBytes = Files.readAllBytes(Paths.get("example.mp3"));
  
  Content content = Content.fromParts(Part.fromBytes(audioBytes, "audio/mpeg"));
  
  EmbedContentResponse response =
      client.models.embedContent("gemini-embedding-2", content, null);
  
  System.out.println(response.embeddings().orElse(null));
  ```

  {% /tab %}

  {% tab label="REST" %}
  ```sh
  AUDIO_PATH="/path/to/your/example.mp3"
  AUDIO_BASE64=$(base64 -w0 "${AUDIO_PATH}")
  
  curl "https://generativelanguage.googleapis.com/v1beta/models/gemini-embedding-2:embedContent" \
      -H "Content-Type: application/json" \
      -H "x-goog-api-key: ${GEMINI_API_KEY}" \
      -d '{
          "content": {
              "parts": [{
                  "inline_data": {
                      "mime_type": "audio/mpeg",
                      "data": "'"${AUDIO_BASE64}"'"
                  }
              }]
          }
      }'
  ```

  {% /tab %}

{% /tabs %}

### Embedding video  {% id="embed-video" %}

The following example shows how to embed a video using
`gemini-embedding-2`.

Videos can be provided as inline data or as uploaded files
through the [Files API](/docs/files).

{% tabs %}
  {% tab label="Python" %}
  ```python
  from google import genai
  from google.genai import types
  
  client = genai.Client()
  
  with open('example.mp4', 'rb') as f:
      video_bytes = f.read()
  
  result = client.models.embed_content(
      model='gemini-embedding-2',
      contents=[
          types.Part.from_bytes(
              data=video_bytes,
              mime_type='video/mp4',
          ),
      ]
  )
  
  print(result.embeddings[0].values)
  ```

  {% /tab %}

  {% tab label="JavaScript" %}
  ```js
  import { GoogleGenAI } from "@google/genai";
  import * as fs from "node:fs";
  
  async function main() {
      const ai = new GoogleGenAI({});
  
      const videoBase64 = fs.readFileSync("example.mp4", { encoding: "base64" });
  
      const response = await ai.models.embedContent({
          model: 'gemini-embedding-2',
          contents: [{
              inlineData: {
                  mimeType: 'video/mp4',
                  data: videoBase64,
              },
          }],
      });
  
      console.log(response.embeddings);
  }
  
  await main();
  ```

  {% /tab %}

  {% tab label="Java" %}
  ```java
  import com.google.genai.Client;
  import com.google.genai.types.Content;
  import com.google.genai.types.EmbedContentResponse;
  import com.google.genai.types.Part;
  import java.nio.file.Files;
  import java.nio.file.Paths;
  import java.util.Collections;
  
  Client client = new Client();
  
  byte[] videoBytes = Files.readAllBytes(Paths.get("example.mp4"));
  
  Content content = Content.fromParts(Part.fromBytes(videoBytes, "video/mp4"));
  
  EmbedContentResponse response =
      client.models.embedContent("gemini-embedding-2", content, null);
  
  System.out.println(
      response.embeddings().get().get(0).values().orElse(Collections.emptyList()));
  ```

  {% /tab %}

  {% tab label="REST" %}
  ```sh
  VIDEO_PATH="/path/to/your/video.mp4"
  VIDEO_BASE64=$(base64 -w0 "${VIDEO_PATH}")
  
  curl "https://generativelanguage.googleapis.com/v1beta/models/gemini-embedding-2:embedContent" \
      -H "Content-Type: application/json" \
      -H "x-goog-api-key: ${GEMINI_API_KEY}" \
      -d '{
          "content": {
              "parts": [{
                  "inline_data": {
                      "mime_type": "video/mp4",
                      "data": "'"${VIDEO_BASE64}"'"
                  }
              }]
          }
      }'
  ```

  {% /tab %}

{% /tabs %}

If you need to embed videos >120 seconds, you can chunk the video into
overlapping segments and embed those chunks individually.

### Embedding documents  {% id="embed-documents" %}

Documents in PDF format can be embedded directly. The model processes the visual
and text
content of each page.

PDFs can be provided as inline data or as uploaded files
through the [Files API](/docs/files).

#### How the model processes PDFs  {% id="pdf-processing" %}

When you embed a PDF, the model processes the document using both visual and
text features:

* **Visual representation:** The model renders each page as an image, which
  consumes **258 tokens** per page.
* **Text extraction:** The model extracts text from the document. For **native
  PDFs** (which contain digital text), the model extracts the text directly. For
  **scanned PDFs** (which contain images of text), the model automatically runs
  optical character recognition (OCR) to extract the text.

To calculate the total token count for a PDF, add the visual tokens (258 per
page) to the text tokens. Your inputs must fit within the model's **8,192 token
limit** (shared across all modalities). The system silently truncates inputs
that exceed this limit.

{% callout type="note" %}
  The Gemini Developer API always enables OCR for PDFs and does not support
  disabling it (the `document_ocr` parameter is only available in Vertex AI).

{% /callout %}

#### PDF limits  {% id="pdf-limits" %}

* **Files per request:** You can submit a maximum of 1 PDF file.
* **Page limit:** You can submit a maximum of 6 pages per file. For the best quality, we strongly recommend using 1 page per PDF.

The following example shows how to embed a PDF using `gemini-embedding-2`:

{% tabs %}
  {% tab label="Python" %}
  ```python
  from google import genai
  from google.genai import types
  
  with open('example.pdf', 'rb') as f:
      pdf_bytes = f.read()
  
  client = genai.Client()
  
  result = client.models.embed_content(
      model='gemini-embedding-2',
      contents=[
          types.Part.from_bytes(
              data=pdf_bytes,
              mime_type='application/pdf',
          ),
      ]
  )
  
  print(result.embeddings)
  ```

  {% /tab %}

  {% tab label="JavaScript" %}
  ```js
  import { GoogleGenAI } from "@google/genai";
  import * as fs from "node:fs";
  
  async function main() {
      const ai = new GoogleGenAI({});
  
      const pdfBase64 = fs.readFileSync("example.pdf", { encoding: "base64" });
  
      const response = await ai.models.embedContent({
          model: 'gemini-embedding-2',
          contents: [{
              inlineData: {
                  mimeType: 'application/pdf',
                  data: pdfBase64,
              },
          }],
      });
  
      console.log(response.embeddings);
  }
  
  await main();
  ```

  {% /tab %}

  {% tab label="Java" %}
  ```java
  import com.google.genai.Client;
  import com.google.genai.types.Content;
  import com.google.genai.types.EmbedContentResponse;
  import com.google.genai.types.Part;
  import java.nio.file.Files;
  import java.nio.file.Paths;
  
  Client client = new Client();
  
  byte[] pdfBytes = Files.readAllBytes(Paths.get("example.pdf"));
  
  Content content = Content.fromParts(Part.fromBytes(pdfBytes, "application/pdf"));
  
  EmbedContentResponse response =
      client.models.embedContent("gemini-embedding-2", content, null);
  
  System.out.println(response.embeddings().orElse(null));
  ```

  {% /tab %}

  {% tab label="REST" %}
  ```sh
  PDF_PATH="/path/to/your/example.pdf"
  PDF_BASE64=$(base64 -w0 "${PDF_PATH}")
  
  curl "https://generativelanguage.googleapis.com/v1beta/models/gemini-embedding-2:embedContent" \
      -H "Content-Type: application/json" \
      -H "x-goog-api-key: ${GEMINI_API_KEY}" \
      -d '{
          "content": {
              "parts": [{
                  "inline_data": {
                      "mime_type": "application/pdf",
                      "data": "'"${PDF_BASE64}"'"
                  }
              }]
          }
      }'
  ```

  {% /tab %}

{% /tabs %}

## Use cases  {% id="common-use-cases" %}

Text embeddings are crucial for a variety of common AI use cases, such as:

*   **Retrieval-Augmented Generation (RAG):** Embeddings enhance the quality
  of generated text by retrieving and incorporating relevant information into
  the context of a model.

*   **Information retrieval:** Search for the most semantically similar text or
  documents given a piece of input text.

  {% button href="https://github.com/google-gemini/cookbook/blob/main/examples/Talk_to_documents_with_embeddings.ipynb" icon="task" variant="primary" %}Document search tutorial{% /button %}

*   **Search reranking**: Prioritize the most relevant items by semantically
  scoring initial results against the query.

  {% button href="https://github.com/google-gemini/cookbook/blob/main/examples/Search_reranking_using_embeddings.ipynb" icon="task" variant="primary" %}Search reranking tutorial{% /button %}

*   **Anomaly detection:** Comparing groups of embeddings can help identify
  hidden trends or outliers.

  {% button href="https://github.com/google-gemini/cookbook/blob/main/examples/Anomaly_detection_with_embeddings.ipynb" icon="bubble_chart" variant="primary" %}Anomaly detection tutorial{% /button %}

*   **Classification:** Automatically categorize text based on its content, such
  as sentiment analysis or spam detection

  {% button href="https://github.com/google-gemini/cookbook/blob/main/examples/Classify_text_with_embeddings.ipynb" icon="token" variant="primary" %}Classification tutorial{% /button %}

*   **Clustering:** Effectively grasp complex relationships by creating clusters
  and visualizations of your embeddings.

  {% button href="https://github.com/google-gemini/cookbook/blob/main/examples/clustering_with_embeddings.ipynb" icon="bubble_chart" variant="primary" %}Clustering visualization tutorial{% /button %}


## Storing embeddings  {% id="store-embeddings" %}

As you take embeddings to production, it is common to
use **vector databases** to efficiently store, index, and retrieve
high-dimensional embeddings. Google Cloud offers managed data services that
can be used for this purpose including
[Gemini Enterprise Agent Platform Vector Search 2.0](https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/vector-search-2/overview),
[BigQuery](https://cloud.google.com/bigquery/docs/introduction),
[AlloyDB](https://cloud.google.com/alloydb/docs/overview), and
[Cloud SQL](https://cloud.google.com/sql/docs/postgres/introduction).

The following tutorials show how to use other third party vector databases
with Gemini Embedding.

* {% button href="https://docs.trychroma.com/integrations/embedding-models/google-gemini" icon="bolt" variant="primary" %}ChromaDB tutorials{% /button %}
* {% button href="https://qdrant.tech/documentation/embeddings/gemini/" icon="bolt" variant="primary" %}QDrant tutorials{% /button %}
* {% button href="https://docs.weaviate.io/weaviate/model-providers/google" icon="bolt" variant="primary" %}Weaviate tutorials{% /button %}
* {% button href="https://github.com/google-gemini/cookbook/blob/main/examples/langchain/Gemini_LangChain_QA_Pinecone_WebLoad.ipynb" icon="bolt" variant="primary" %}Pinecone tutorials{% /button %}

## Model versions  {% id="model-versions" %}

{% tabs %}
  {% tab title="Gemini Embedding 2" %}
  {% table %}
  * Property
  * Description

  ---

  *   {% section class="model-property" %}
  {% icon name="id_card" /%}Model code

  {% /section %}

  * **Gemini API**
  `gemini-embedding-2`

  ---

  *   {% section class="model-property" %}
  {% icon name="save" /%}Supported data types

  {% /section %}

  * **Input**
  Text, image, video, audio, PDF
  **Output**
  Text embeddings

  ---

  *   {% section class="model-property" %}
  {% icon name="token_auto" /%}Token limits[[*]](/docs/tokens)

  {% /section %}

  * **Input token limit**
  8,192
  **Output dimension size**
  Flexible, supports: 128 - 3072, Recommended: 768, 1536, 3072

  ---

  *   {% section class="model-property" %}
  {% icon name="123" /%}Versions

  {% /section %}

  * Read the [model version patterns](/docs/models#model-versions) for more details.
  Stable: `gemini-embedding-2`

  ---

  *   {% section class="model-property" %}
  {% icon name="calendar_month" /%}Latest update

  {% /section %}

  * April 2026

  ---

  *   {% section class="model-property" %}
  {% icon name="paid" /%}Pricing

  {% /section %}

  * [Pricing](/docs/pricing#gemini-embedding-2)
  {% /table %}

  {% /tab %}

  {% tab title="Gemini Embedding" %}
  {% table %}
  * Property
  * Description

  ---

  *   {% section class="model-property" %}
  {% icon name="id_card" /%}Model code

  {% /section %}

  * **Gemini API**
  `gemini-embedding-001`

  ---

  *   {% section class="model-property" %}
  {% icon name="save" /%}Supported data types

  {% /section %}

  * **Input**
  Text
  **Output**
  Text embeddings

  ---

  *   {% section class="model-property" %}
  {% icon name="token_auto" /%}Token limits[[*]](/docs/tokens)

  {% /section %}

  * **Input token limit**
  2,048
  **Output dimension size**
  Flexible, supports: 128 - 3072, Recommended: 768, 1536, 3072

  ---

  *   {% section class="model-property" %}
  {% icon name="123" /%}Versions

  {% /section %}

  * Read the [model version patterns](/docs/models#model-versions) for more details.
  Stable: `gemini-embedding-001`

  ---

  *   {% section class="model-property" %}
  {% icon name="calendar_month" /%}Latest update

  {% /section %}

  * June 2025

  ---

  *   {% section class="model-property" %}
  {% icon name="paid" /%}Pricing

  {% /section %}

  * [Pricing](/docs/pricing#gemini-embedding)
  {% /table %}

  {% /tab %}

{% /tabs %}

For deprecated Embeddings models, visit the [Deprecations](/docs/deprecations) page

## Migration from gemini-embedding-001  {% id="migration" %}

The embedding spaces between `gemini-embedding-001` and
`gemini-embedding-2` are **incompatible**. This means you cannot
directly compare embeddings generated by one model with embeddings generated by
the other. If you are upgrading to `gemini-embedding-2`, you must
re-embed all of your existing data.

Beyond incompatibility, there are several other notable differences between
the two models:

*   **Task type specification:** With `gemini-embedding-001`, you specify the
  task type using the `task_type` parameter (e.g., `SEMANTIC_SIMILARITY`,
  `RETRIEVAL_DOCUMENT`). With `gemini-embedding-2`, the `task_type`
  parameter is not supported. Instead, you should include task instructions
  directly in the prompt for text-only tasks. See
  [Task types with Embeddings 2](/docs/embeddings#task-types-embeddings-2) for details on how
  to format prompts for different use cases.

*   **Embedding aggregation:** `gemini-embedding-001` generates individual
  embeddings for each string in a list of inputs. In contrast,
  `gemini-embedding-2` produces a single, aggregated embedding when multiple
  inputs (like text and images) are provided directly in one request. To
  generate separate embeddings for individual inputs, wrap each input in a
  `Content` object, or use the
  [Batch API](/docs/batch-api#batch-embedding). See
  [Embedding aggregation](/docs/embeddings#embedding-aggregation) for more information.

*   **Normalization:** If you use `output_dimensionality` to request embeddings
  with fewer than 3072 dimensions, `gemini-embedding-2` automatically
  normalizes these truncated embeddings. With `gemini-embedding-001`, you
  need to perform manual normalization for dimensions other than 3072. See
  [Ensuring quality for smaller dimensions](/docs/embeddings#quality-for-smaller-dimensions)
  for details.


## Batch embeddings  {% id="batch-embedding" %}

If latency is not a concern, try using the Gemini Embeddings models with
[Batch API](/docs/batch-api#batch-embedding). This
allows for much higher throughput at 50% of the default Embedding price.
Find examples on how to get started in the [Batch API cookbook](https://github.com/google-gemini/cookbook/blob/main/quickstarts/Batch_mode.ipynb).

## Responsible use notice  {% id="responsible-use-notice" %}

Unlike generative AI models that create new content, the Gemini Embedding model
is only intended to transform the format of your input data into a numerical
representation. While Google is responsible for providing an embedding model
that transforms the format of your input data to the numerical-format requested,
users retain full responsibility for the data they input and the resulting
embeddings. By using the Gemini Embedding model you confirm that you have the
necessary rights to any content that you upload. Do not generate content that
infringes on others' intellectual property or privacy rights. Your use of this
service is subject to our [Prohibited Use
Policy](https://policies.google.com/terms/generative-ai/use-policy) and
[Google's Terms of Service](/docs/terms).

## Start building with embeddings  {% id="start-building" %}

Check out the [embeddings quickstart
notebook](https://github.com/google-gemini/cookbook/blob/main/quickstarts/Embeddings.ipynb)
to explore the model capabilities and learn how to customize and visualize your
embeddings.

