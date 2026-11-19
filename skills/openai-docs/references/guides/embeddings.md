# Vector embeddings

> For the complete documentation index, see [llms.txt](/llms.txt). Markdown versions of documentation pages are available by appending `.md` to the page URL.

## What are embeddings?

OpenAI’s text embeddings measure the relatedness of text strings. Embeddings are commonly used for:

- **Search** (where results are ranked by relevance to a query string)
- **Clustering** (where text strings are grouped by similarity)
- **Recommendations** (where items with related text strings are recommended)
- **Anomaly detection** (where outliers with little relatedness are identified)
- **Diversity measurement** (where similarity distributions are analyzed)
- **Classification** (where text strings are classified by their most similar label)

An embedding is a vector (list) of floating point numbers. The [distance](#which-distance-function-should-i-use) between two vectors measures their relatedness. Small distances suggest high relatedness and large distances suggest low relatedness.

Visit our [pricing page](https://openai.com/api/pricing/) to learn about embeddings pricing. Requests are billed based on the number of [tokens](https://platform.openai.com/tokenizer) in the [input](https://developers.openai.com/api/reference/resources/embeddings/methods/create#embeddings/create-input).

## How to get embeddings

To get an embedding, send your text string to the [embeddings API endpoint](https://developers.openai.com/api/reference/resources/embeddings) along with the embedding model name (for example, `text-embedding-3-small`):

Example: Getting embeddings

```typescript
import OpenAI from "openai";
const openai = new OpenAI();

const embedding = await openai.embeddings.create({
  model: "text-embedding-3-small",
  input: "Your text string goes here",
  encoding_format: "float",
});

console.log(embedding);
```

```python
from openai import OpenAI

client = OpenAI()

response = client.embeddings.create(
    input="Your text string goes here", model="text-embedding-3-small"
)

print(response.data[0].embedding)
```

```go
package main

import (
	"context"
	"fmt"

	"github.com/openai/openai-go/v3"
)

func main() {
	client := openai.NewClient()

	embedding, err := client.Embeddings.New(context.Background(), openai.EmbeddingNewParams{
		Model: openai.EmbeddingModelTextEmbedding3Small,
		Input: openai.EmbeddingNewParamsInputUnion{
			OfString: openai.String("Your text string goes here."),
		},
	})
	if err != nil {
		panic(err)
	}

	fmt.Println(len(embedding.Data[0].Embedding))
}
```

```java
import com.openai.client.OpenAIClient;
import com.openai.client.okhttp.OpenAIOkHttpClient;
import com.openai.models.embeddings.EmbeddingCreateParams;

var embedding =
    client
        .embeddings()
        .create(
            EmbeddingCreateParams.builder()
                .model("text-embedding-3-small")
                .input("The food was delicious and the waiter...")
                .build());

System.out.println(embedding.data().get(0).embedding());
```

```csharp
using OpenAI.Embeddings;

string key = Environment.GetEnvironmentVariable("OPENAI_API_KEY")!;
string model = "text-embedding-3-small";
EmbeddingClient client = new(model, key);

OpenAIEmbedding embedding = await client.GenerateEmbeddingAsync(
    "The food was delicious and the waiter was friendly."
);

Console.WriteLine($"Dimensions: {embedding.ToFloats().Length}");
```

```ruby
require "openai"

client = OpenAI::Client.new

response = client.embeddings.create(
  model: "text-embedding-3-small",
  input: "The food was delicious and the waiter..."
)

puts(response.data.fetch(0).embedding)
```

```bash
curl https://api.openai.com/v1/embeddings \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -d '{
    "input": "Your text string goes here",
    "model": "text-embedding-3-small"
  }'
```


The response contains the embedding vector (list of floating point numbers) along with some additional metadata. You can extract the embedding vector, save it in a vector database, and use for many different use cases.

```json
{
  "object": "list",
  "data": [
    {
      "object": "embedding",
      "index": 0,
      "embedding": [
        -0.006929283495992422, -0.005336422007530928, -4.547132266452536e-5,
        -0.024047505110502243
      ]
    }
  ],
  "model": "text-embedding-3-small",
  "usage": {
    "prompt_tokens": 5,
    "total_tokens": 5
  }
}
```


By default, the length of the embedding vector is `1536` for `text-embedding-3-small` or `3072` for `text-embedding-3-large`. To reduce the dimensions of an embedding without losing its ability to represent concepts, pass in the [dimensions parameter](https://developers.openai.com/api/reference/resources/embeddings/methods/create#embeddings-create-dimensions). Find more detail on embedding dimensions in the [embedding use case section](#use-cases).

## Embedding models

OpenAI offers two powerful third-generation embedding model (denoted by `-3` in the model ID). Read the embedding v3 [announcement blog post](https://openai.com/blog/new-embedding-models-and-api-updates) for more details.

Usage is priced per input token. Below is an example of pricing pages of text per US dollar (assuming ~800 tokens per page):

| Model                  | ~ Pages per dollar | Performance on [MTEB](https://github.com/embeddings-benchmark/mteb) eval | Max input |
| ---------------------- | ------------------ | ------------------------------------------------------------------------ | --------- |
| text-embedding-3-small | 62,500             | 62.3%                                                                    | 8192      |
| text-embedding-3-large | 9,615              | 64.6%                                                                    | 8192      |
| text-embedding-ada-002 | 12,500             | 61.0%                                                                    | 8192      |

## Use cases

Here we show some representative use cases, using the [Amazon fine-food reviews dataset](https://www.kaggle.com/snap/amazon-fine-food-reviews).

### Obtaining the embeddings

The dataset contains a total of 568,454 food reviews left by Amazon users up to October 2012. We use a subset of the 1000 most recent reviews for illustration purposes. The reviews are in English and tend to be positive or negative. Each review has a `ProductId`, `UserId`, `Score`, review title (`Summary`) and review body (`Text`). For example:




| Product Id | User Id        | Score | Summary               | Text                                            |
| ---------- | -------------- | ----- | --------------------- | ----------------------------------------------- |
| B001E4KFG0 | A3SGXH7AUHU8GW | 5     | Good Quality Dog Food | I have bought several of the Vitality canned…   |
| B00813GRG4 | A1D87F6ZCVE5NK | 1     | Not as Advertised     | Product arrived labeled as Jumbo Salted Peanut… |




Below, we combine the review summary and review text into a single combined text. The model encodes this combined text and outputs a single vector embedding.


Get_embeddings_from_dataset.ipynb
 For Ruby, save the review CSV as `data/fine_food_reviews_1k.csv` or set `REVIEWS_CSV` to its path. Keep the `Summary`, `Text`, `Score`, `UserId`, and `ProductId` columns; the saved embeddings retain them for the analysis steps.







For Go, save the review CSV as `data/fine_food_reviews_1k.csv`. Keep the `Summary`, `Text`, `Score`, `UserId`, and `ProductId` columns. The program preserves the input columns and adds `combined` and `ada_embedding` for the analysis steps.




Create review embeddings

```typescript
import { mkdir, writeFile } from "node:fs/promises";
import OpenAI from "openai";

const client = new OpenAI();
const reviews = ["A rich cup of coffee.", "A bright herbal tea."];

const response = await client.embeddings.create({
  model: "text-embedding-3-small",
  input: reviews.map((review) => review.replaceAll("\n", " ")),
});

const csvField = (value: string) => `"${value.replaceAll('"', '""')}"`;
const rows = response.data.map(({ embedding }, index) =>
  [csvField(reviews[index]), csvField(JSON.stringify(embedding))].join(",")
);

await mkdir("output", { recursive: true });
await writeFile(
  "output/embedded_1k_reviews.csv",
  ["combined,ada_embedding", ...rows].join("\n") + "\n"
);
```

```python
from pathlib import Path

from openai import OpenAI

client = OpenAI()


def get_embedding(text, model="text-embedding-3-small"):
    text = text.replace("\n", " ")
    return client.embeddings.create(input=[text], model=model).data[0].embedding


df["ada_embedding"] = df.combined.apply(
    lambda x: get_embedding(x, model="text-embedding-3-small")
)
Path("output").mkdir(exist_ok=True)
df.to_csv("output/embedded_1k_reviews.csv", index=False)
```

```go
import (
	"context"
	"encoding/csv"
	"encoding/json"
	"fmt"
	"log"
	"os"
	"slices"
	"strings"

	"github.com/openai/openai-go/v3"
)

func main() {
	if err := run(); err != nil {
		log.Fatal(err)
	}
}

func run() error {
	client := openai.NewClient()
	ctx := context.Background()
	input, err := os.Open("data/fine_food_reviews_1k.csv")
	if err != nil {
		return err
	}
	defer input.Close()
	rows, err := csv.NewReader(input).ReadAll()
	if err != nil {
		return err
	}
	if len(rows) < 2 {
		return fmt.Errorf("review CSV needs a header and at least one review")
	}
	headers := rows[0]
	for _, name := range []string{"Summary", "Text", "Score", "UserId", "ProductId"} {
		if !slices.Contains(headers, name) {
			return fmt.Errorf("missing %s column", name)
		}
	}
	summaryColumn, textColumn := slices.Index(headers, "Summary"), slices.Index(headers, "Text")
	if err := os.MkdirAll("output", 0755); err != nil {
		return err
	}
	file, err := os.Create("output/embedded_1k_reviews.csv")
	if err != nil {
		return err
	}
	defer file.Close()
	writer := csv.NewWriter(file)
	if err := writer.Write(append(append([]string{}, headers...), "combined", "ada_embedding")); err != nil {
		return err
	}
	for _, row := range rows[1:] {
		combined := strings.ReplaceAll(row[summaryColumn]+" "+row[textColumn], "\n", " ")
		vector, err := embedding(ctx, &client, combined)
		if err != nil {
			return err
		}
		encoded, err := json.Marshal(vector)
		if err != nil {
			return err
		}
		if err := writer.Write(append(append([]string{}, row...), combined, string(encoded))); err != nil {
			return err
		}
	}
	writer.Flush()
	if err := writer.Error(); err != nil {
		return err
	}
	if err := file.Close(); err != nil {
		return err
	}
	fmt.Println("Saved output/embedded_1k_reviews.csv")
	return nil
}

func embedding(ctx context.Context, client *openai.Client, text string) ([]float64, error) {
	response, err := client.Embeddings.New(ctx, openai.EmbeddingNewParams{
		Model: openai.EmbeddingModelTextEmbedding3Small,
		Input: openai.EmbeddingNewParamsInputUnion{OfString: openai.String(text)},
	})
	if err != nil {
		return nil, err
	}
	return response.Data[0].Embedding, nil
}
```

```java
import com.openai.client.OpenAIClient;
import com.openai.client.okhttp.OpenAIOkHttpClient;
import com.openai.models.embeddings.EmbeddingCreateParams;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.List;

static String csvField(String value) {
  return "\"" + value.replace("\"", "\"\"") + "\"";
}

List<String> reviews = List.of("A rich cup of coffee.", "A bright herbal tea.");
Path output = Path.of("output", "embedded_1k_reviews.csv");
Files.createDirectories(output.getParent());
try (var writer = Files.newBufferedWriter(output)) {
  writer.write("combined,ada_embedding\n");
  for (String review : reviews) {
    var embedding =
        client
            .embeddings()
            .create(
                EmbeddingCreateParams.builder()
                    .model("text-embedding-3-small")
                    .inputOfArrayOfStrings(List.of(review.replace("\n", " ")))
                    .build())
            .data()
            .get(0)
            .embedding();
    writer.write(csvField(review) + "," + csvField(embedding.toString()) + "\n");
  }
}
System.out.println(output);
```

```csharp
using System.Text.Json;
using OpenAI.Embeddings;

string key = Environment.GetEnvironmentVariable("OPENAI_API_KEY")!;
string model = "text-embedding-3-small";
EmbeddingClient client = new(model, key);

string[] reviews = ["A rich cup of coffee.", "A bright herbal tea."];
Directory.CreateDirectory("output");
using StreamWriter writer = new("output/embedded_1k_reviews.csv");
await writer.WriteLineAsync("combined,ada_embedding");
foreach (string review in reviews)
{
    float[] vector = await EmbedAsync(client, review.Replace("\n", " ", StringComparison.Ordinal));
    string encoded = JsonSerializer.Serialize(vector);
    await writer.WriteLineAsync($"{CsvField(review)},{CsvField(encoded)}");
}
Console.WriteLine("Saved output/embedded_1k_reviews.csv");

static async Task<float[]> EmbedAsync(EmbeddingClient client, string text)
{
    OpenAIEmbedding result = await client.GenerateEmbeddingAsync(text);
    return result.ToFloats().ToArray();
}

static string CsvField(string value) => "\"" + value.Replace("\"", "\"\"", StringComparison.Ordinal) + "\"";
```

```ruby
require "csv"
require "fileutils"
require "json"
require "openai"

client = OpenAI::Client.new
table = CSV.read(ENV.fetch("REVIEWS_CSV", "data/fine_food_reviews_1k.csv"))
headers = table.shift or raise ArgumentError, "Review CSV is empty"
reviews = table.map { |fields| headers.zip(fields).to_h }
combined = reviews.map { |row| "#{row.fetch("Summary")} #{row.fetch("Text")}".tr("\n", " ") }
response = client.embeddings.create(model: "text-embedding-3-small", input: combined)

FileUtils.mkdir_p("output")
CSV.open("output/embedded_1k_reviews.csv", "w") do |csv|
  csv << headers + ["combined", "ada_embedding"]
  response.data.each do |embedding|
    row = reviews.fetch(embedding.index)

    csv << headers.map { |header| row.fetch(header) } + [combined.fetch(embedding.index), JSON.generate(embedding.embedding)]
  end
end
```





Each Go example is a complete program that reads `output/embedded_1k_reviews.csv`. Run each program separately from your Go module. The file needs JSON arrays in `ada_embedding` and integer values in `Score`; grouped averages also need `UserId` and `ProductId`. The split uses a fixed seed, while forest predictions and t-SNE coordinates can vary between runs. The metrics below describe the linked Python notebooks, not these Go programs.







For Ruby, use Ruby 3.3 and install the [sample project dependencies](https://github.com/openai/developers-website/blob/main/src/content/platform/ruby-examples/Gemfile). Append the loading and analysis snippets to the same Ruby file; run the split before either forest example. The metrics below come from the linked Python notebooks and depend on the dataset and implementation.




To load the data from a saved file, you can run the following:

Load saved embeddings

```python
from ast import literal_eval
import pandas as pd

df = pd.read_csv("output/embedded_1k_reviews.csv")
df["ada_embedding"] = df.ada_embedding.apply(literal_eval).apply(np.array)
```

```go
package main

import (
	"encoding/csv"
	"encoding/json"
	"fmt"
	"io"
	"log"
	"os"
	"strconv"
)

type review struct {
	Vector            []float64
	Score             int
	UserID, ProductID string
}

func loadReviews(path string) ([]review, error) {
	file, err := os.Open(path)
	if err != nil {
		return nil, err
	}
	defer file.Close()
	reader := csv.NewReader(file)
	header, err := reader.Read()
	if err != nil {
		return nil, err
	}
	columns := map[string]int{}
	for i, name := range header {
		columns[name] = i
	}
	for _, name := range []string{"ada_embedding", "Score"} {
		if _, ok := columns[name]; !ok {
			return nil, fmt.Errorf("missing %s column", name)
		}
	}
	rows := []review{}
	dimensions := 0
	for {
		record, err := reader.Read()
		if err == io.EOF {
			break
		}
		if err != nil {
			return nil, err
		}
		var value review
		if err := json.Unmarshal([]byte(record[columns["ada_embedding"]]), &value.Vector); err != nil {
			return nil, err
		}
		if len(value.Vector) == 0 {
			return nil, fmt.Errorf("empty embedding")
		}
		if dimensions == 0 {
			dimensions = len(value.Vector)
		}
		if len(value.Vector) != dimensions {
			return nil, fmt.Errorf("inconsistent embedding dimensions")
		}
		value.Score, err = strconv.Atoi(record[columns["Score"]])
		if err != nil {
			return nil, err
		}
		if column, ok := columns["UserId"]; ok {
			value.UserID = record[column]
		}
		if column, ok := columns["ProductId"]; ok {
			value.ProductID = record[column]
		}
		rows = append(rows, value)
	}
	if len(rows) == 0 {
		return nil, fmt.Errorf("no reviews")
	}
	return rows, nil
}

func main() {
	rows, err := loadReviews("output/embedded_1k_reviews.csv")
	if err != nil {
		log.Fatal(err)
	}
	result := map[string]any{"rows": len(rows), "first": rows[0].Vector, "last": rows[len(rows)-1].Vector}
	if err := json.NewEncoder(os.Stdout).Encode(result); err != nil {
		log.Fatal(err)
	}
}
```

```ruby
# standard:disable Lint/UselessAssignment -- Preserve named results for the next workflow step.
require "csv"
require "json"

rows = CSV.read("output/embedded_1k_reviews.csv", headers: true).map do |row|
  row.to_h.merge("ada_embedding" => JSON.parse(row.fetch("ada_embedding")))
end
# standard:enable Lint/UselessAssignment
```




#### Reducing embedding dimensions



Using larger embeddings, for example storing them in a vector store for retrieval, generally costs more and consumes more compute, memory and storage than using smaller embeddings.

Both of our new embedding models were trained [with a technique](https://arxiv.org/abs/2205.13147) that allows developers to trade-off performance and cost of using embeddings. Specifically, developers can shorten embeddings (that is, remove some numbers from the end of the sequence) without the embedding losing its concept-representing properties by passing in the [`dimensions` API parameter](https://developers.openai.com/api/reference/resources/embeddings/methods/create#embeddings-create-dimensions). For example, on the MTEB benchmark, a `text-embedding-3-large` embedding can be shortened to a size of 256 while still outperforming a full-length `text-embedding-ada-002` embedding with a size of 1536. You can read more about how changing the dimensions impacts performance in our [embeddings v3 launch blog post](https://openai.com/blog/new-embedding-models-and-api-updates#:~:text=Native%20support%20for%20shortening%20embeddings).

In general, using the `dimensions` parameter when creating the embedding is the suggested approach. In certain cases, you may need to change the embedding dimension after you generate it. When you change the dimension manually, you need to be sure to normalize the dimensions of the embedding as is shown below.

Reduce embedding dimensions

```typescript
import OpenAI from "openai";

const client = new OpenAI();

const response = await client.embeddings.create({
  model: "text-embedding-3-small",
  input: "Testing 123",
  encoding_format: "float",
});

const shortened = response.data[0].embedding.slice(0, 256);
const magnitude = Math.hypot(...shortened);
const normalized = shortened.map((value) =>
  magnitude === 0 ? 0 : value / magnitude
);

console.log(normalized);
```

```python
from openai import OpenAI
import numpy as np

client = OpenAI()


def normalize_l2(x):
    x = np.array(x)
    if x.ndim == 1:
        norm = np.linalg.norm(x)
        if norm == 0:
            return x
        return x / norm
    else:
        norm = np.linalg.norm(x, 2, axis=1, keepdims=True)
        return np.where(norm == 0, x, x / norm)


response = client.embeddings.create(
    model="text-embedding-3-small", input="Testing 123", encoding_format="float"
)

cut_dim = response.data[0].embedding[:256]
norm_dim = normalize_l2(cut_dim)

print(norm_dim)
```

```go
response, err := client.Embeddings.New(context.Background(), openai.EmbeddingNewParams{
	Model:          openai.EmbeddingModelTextEmbedding3Small,
	Input:          openai.EmbeddingNewParamsInputUnion{OfString: openai.String("Testing 123")},
	EncodingFormat: openai.EmbeddingNewParamsEncodingFormatFloat,
})
if err != nil {
	panic(err)
}
if len(response.Data) != 1 || len(response.Data[0].Embedding) < 256 {
	panic("expected an embedding with at least 256 dimensions")
}
shortened := append([]float64(nil), response.Data[0].Embedding[:256]...)
magnitude := 0.0
for _, value := range shortened {
	magnitude += value * value
}
magnitude = math.Sqrt(magnitude)
if magnitude != 0 {
	for i := range shortened {
		shortened[i] /= magnitude
	}
}
```

```java
import com.openai.client.OpenAIClient;
import com.openai.client.okhttp.OpenAIOkHttpClient;
import com.openai.models.embeddings.EmbeddingCreateParams;
import java.util.List;

private static List<Double> normalizeL2(List<Float> embedding) {
  double norm =
      Math.sqrt(embedding.stream().mapToDouble(value -> value.doubleValue() * value).sum());
  return embedding.stream().map(value -> norm == 0 ? 0.0 : value / norm).toList();
}

var embedding =
    client
        .embeddings()
        .create(
            EmbeddingCreateParams.builder()
                .model("text-embedding-3-small")
                .input("Testing 123")
                .encodingFormat(EmbeddingCreateParams.EncodingFormat.FLOAT)
                .build());

List<Float> shortened = embedding.data().get(0).embedding().subList(0, 256);
System.out.println(normalizeL2(shortened));
```

```csharp
using OpenAI.Embeddings;

string key = Environment.GetEnvironmentVariable("OPENAI_API_KEY")!;
string model = "text-embedding-3-small";
EmbeddingClient client = new(model, key);

OpenAIEmbedding embedding = await client.GenerateEmbeddingAsync("Testing 123");

float[] shortened = embedding.ToFloats().Span[..256].ToArray();
double magnitude = Math.Sqrt(shortened.Sum(value => (double)value * value));
double[] normalized =
    magnitude == 0
        ? shortened.Select(value => (double)value).ToArray()
        : shortened.Select(value => value / magnitude).ToArray();

Console.WriteLine(System.Text.Json.JsonSerializer.Serialize(normalized));
```

```ruby
require "openai"

client = OpenAI::Client.new

response = client.embeddings.create(
  model: "text-embedding-3-small",
  input: "Testing 123",
  encoding_format: :float
)

shortened = response.data.fetch(0).embedding.first(256)
magnitude = Math.sqrt(shortened.sum { |value| value**2 })
normalized = shortened.map { |value| magnitude.zero? ? 0 : value / magnitude }

puts(normalized)
```


Dynamically changing the dimensions enables flexible usage. For example, when using a vector data store that only supports embeddings up to 1024 dimensions long, developers can now still use our best embedding model `text-embedding-3-large` and specify a value of 1024 for the `dimensions` API parameter, which will shorten the embedding down from 3072 dimensions, trading off some accuracy in exchange for the smaller vector size.







#### Question answering using embeddings-based search





  [
Question_answering_using_embeddings.ipynb
 ](https://developers.openai.com/cookbook/examples/question_answering_using_embeddings)



In many common cases, the model is not trained on data which contains key facts and information you want to make accessible when generating responses to a user query. One way of solving this, as shown below, is to put additional information into the context window of the model. This is effective in many use cases but leads to higher token costs. In this notebook, we explore the tradeoff between this approach and embeddings bases search.

Answer a question with retrieved context

```typescript
import OpenAI from "openai";

const client = new OpenAI();
const article =
  "At the 2022 Winter Olympics, Great Britain won women's curling and Sweden won men's curling.";
const question = `Use the article below to answer the question. If the answer cannot be found, say "I don't know."

Article:
${article}

Question: Which athletes won the gold medal in curling at the 2022 Winter Olympics?`;

const response = await client.chat.completions.create({
  model: "gpt-4.1-mini",
  messages: [
    {
      role: "system",
      content: "You answer questions about the 2022 Winter Olympics.",
    },
    { role: "user", content: question },
  ],
  temperature: 0,
});

console.log(response.choices[0].message.content);
```

```python
query = f"""Use the below article on the 2022 Winter Olympics to answer the subsequent question. If the answer cannot be found, write "I don't know."

Article:
\"\"\"
{wikipedia_article_on_curling}
\"\"\"

Question: Which athletes won the gold medal in curling at the 2022 Winter Olympics?"""

response = client.chat.completions.create(
    messages=[
        {
            "role": "system",
            "content": "You answer questions about the 2022 Winter Olympics.",
        },
        {"role": "user", "content": query},
    ],
    model=GPT_MODEL,
    temperature=0,
)

print(response.choices[0].message.content)
```

```go
import (
	"context"
	"fmt"
	"log"

	"github.com/openai/openai-go/v3"
)

func main() {
	if err := run(); err != nil {
		log.Fatal(err)
	}
}

func run() error {
	client := openai.NewClient()
	completion, err := client.Chat.Completions.New(context.Background(), openai.ChatCompletionNewParams{
		Model: "gpt-4.1-mini", Temperature: openai.Float(0), Messages: []openai.ChatCompletionMessageParamUnion{
			openai.SystemMessage("You answer questions about the 2022 Winter Olympics."),
			openai.UserMessage("Use the article to answer the question. If the answer cannot be found, write \"I don't know.\"\n\nArticle: At the 2022 Winter Olympics, Great Britain won women's curling and Sweden won men's curling.\n\nQuestion: Which athletes won the gold medal in curling at the 2022 Winter Olympics?")},
	})
	if err != nil {
		return err
	}
	fmt.Println(completion.Choices[0].Message.Content)
	return nil
}
```

```java
import com.openai.client.OpenAIClient;
import com.openai.client.okhttp.OpenAIOkHttpClient;
import com.openai.models.chat.completions.ChatCompletionCreateParams;

String article =
    "At the 2022 Winter Olympics, Great Britain won women's curling and Sweden won men's curling.";
String question =
    "Use the below article on the 2022 Winter Olympics to answer the subsequent question. "
        + "If the answer cannot be found, write \"I don't know.\"\n\n"
        + "Article:\n"
        + article
        + "\n\nQuestion: Which athletes won the gold medal in curling at the 2022 Winter Olympics?";

ChatCompletionCreateParams params =
    ChatCompletionCreateParams.builder()
        .model("gpt-4.1-mini")
        .addSystemMessage("You answer questions about the 2022 Winter Olympics.")
        .addUserMessage(question)
        .temperature(0)
        .build();

client.chat().completions().create(params).choices().stream()
    .flatMap(choice -> choice.message().content().stream())
    .forEach(System.out::println);
```

```csharp
using OpenAI.Chat;

string key = Environment.GetEnvironmentVariable("OPENAI_API_KEY")!;
string model = "gpt-4.1-mini";
ChatClient client = new(model, key);

string article = "At the 2022 Winter Olympics, Great Britain won women's curling and Sweden won men's curling.";
string query = $"Use the article to answer the question. If the answer cannot be found, write I don't know.\nArticle: {article}\nQuestion: Which athletes won the gold medal in curling at the 2022 Winter Olympics?";
ChatCompletion result = await client.CompleteChatAsync(
    [new SystemChatMessage("You answer questions about the 2022 Winter Olympics."), new UserChatMessage(query)],
    new ChatCompletionOptions { Temperature = 0 });
Console.WriteLine(result.Content[0].Text);
```

```ruby
require "openai"

client = OpenAI::Client.new
article = "At the 2022 Winter Olympics, Great Britain won women's curling and Sweden won men's curling."
question = <<~QUESTION
  Use the article below to answer the question. If the answer cannot be found, say "I don't know."

  Article:
  #{article}

  Question: Which athletes won the gold medal in curling at the 2022 Winter Olympics?
QUESTION

response = client.chat.completions.create(
  model: "gpt-4.1-mini",
  messages: [
    {
      role: :system,
      content: "You answer questions about the 2022 Winter Olympics."
    },
    {
      role: :user,
      content: question
    }
  ],
  temperature: 0
)

puts(response.choices.fetch(0).message.content)
```








#### Text search using embeddings





  [
Semantic_text_search_using_embeddings.ipynb
 ](https://developers.openai.com/cookbook/examples/semantic_text_search_using_embeddings)



To retrieve the most relevant documents we use the cosine similarity between the embedding vectors of the query and each document, and return the highest scored documents.

Search reviews by similarity

```typescript
import OpenAI from "openai";

const client = new OpenAI();
const reviews = [
  "A rich cup of coffee.",
  "Smooth beans in tomato sauce.",
  "Dark chocolate with orange.",
];

const { data } = await client.embeddings.create({
  model: "text-embedding-3-small",
  input: [...reviews, "delicious beans"],
});

const query = data[reviews.length].embedding;
const similarity = (embedding: number[]) => {
  const dotProduct = embedding.reduce(
    (total, value, index) => total + value * query[index],
    0
  );
  return dotProduct / (Math.hypot(...embedding) * Math.hypot(...query));
};

const results = reviews
  .map((review, index) => ({
    review,
    score: similarity(data[index].embedding),
  }))
  .sort((left, right) => right.score - left.score)
  .slice(0, 3);

console.log(results);
```

```python
def search_reviews(df, product_description, n=3, pprint=True):
    embedding = get_embedding(product_description, model="text-embedding-3-small")
    df["similarities"] = df.ada_embedding.apply(
        lambda x: cosine_similarity(x, embedding)
    )
    res = df.sort_values("similarities", ascending=False).head(n)
    return res


res = search_reviews(df, "delicious beans", n=3)
```

```go
import (
	"context"
	"fmt"
	"log"
	"math"
	"sort"

	"github.com/openai/openai-go/v3"
)

func main() {
	if err := run(); err != nil {
		log.Fatal(err)
	}
}

func run() error {
	client := openai.NewClient()
	ctx := context.Background()
	texts := []string{"A rich cup of coffee.", "Crunchy crackers with sea salt.", "Dark chocolate with orange.", "A bright herbal tea.", "Smooth beans in tomato sauce.", "A mild cheese with herbs.", "Spicy roasted nuts.", "A crisp sparkling water."}
	vectors := make([][]float64, len(texts))
	for i, text := range texts {
		vector, err := embedding(ctx, &client, text)
		if err != nil {
			return err
		}
		vectors[i] = vector
	}
	query, err := embedding(ctx, &client, "delicious beans")
	if err != nil {
		return err
	}
	matches := nearest(query, vectors)
	for _, match := range matches[:min(3, len(matches))] {
		fmt.Printf("%0.3f: %s\n", match.Similarity, texts[match.Index])
	}
	return nil
}

func embedding(ctx context.Context, client *openai.Client, text string) ([]float64, error) {
	response, err := client.Embeddings.New(ctx, openai.EmbeddingNewParams{
		Model: openai.EmbeddingModelTextEmbedding3Small,
		Input: openai.EmbeddingNewParamsInputUnion{OfString: openai.String(text)},
	})
	if err != nil {
		return nil, err
	}
	return response.Data[0].Embedding, nil
}

func cosineSimilarity(a, b []float64) float64 {
	var dot, left, right float64
	for i := range a {
		dot += a[i] * b[i]
		left += a[i] * a[i]
		right += b[i] * b[i]
	}
	return dot / math.Sqrt(left*right)
}

type match struct {
	Index      int
	Similarity float64
}

func nearest(query []float64, vectors [][]float64) []match {
	matches := make([]match, len(vectors))
	for i, vector := range vectors {
		matches[i] = match{Index: i, Similarity: cosineSimilarity(query, vector)}
	}
	sort.SliceStable(matches, func(i, j int) bool { return matches[i].Similarity > matches[j].Similarity })
	return matches
}
```

```java
import com.openai.client.OpenAIClient;
import com.openai.client.okhttp.OpenAIOkHttpClient;
import com.openai.models.embeddings.EmbeddingCreateParams;
import java.util.Comparator;
import java.util.List;
import java.util.stream.IntStream;

List<String> reviews =
    List.of(
        "A rich cup of coffee.",
        "Smooth beans in tomato sauce.",
        "Dark chocolate with orange.");
var reviewEmbeddings =
    client
        .embeddings()
        .create(
            EmbeddingCreateParams.builder()
                .model("text-embedding-3-small")
                .inputOfArrayOfStrings(reviews)
                .build())
        .data();
List<Float> query =
    client
        .embeddings()
        .create(
            EmbeddingCreateParams.builder()
                .model("text-embedding-3-small")
                .inputOfArrayOfStrings(List.of("delicious beans"))
                .build())
        .data()
        .get(0)
        .embedding();

IntStream.range(0, reviews.size())
    .boxed()
    .sorted(
        Comparator.comparingDouble(
                (Integer index) ->
                    cosineSimilarity(query, reviewEmbeddings.get(index).embedding()))
            .reversed())
    .limit(3)
    .map(reviews::get)
    .forEach(System.out::println);
```

```csharp
using OpenAI.Embeddings;

string key = Environment.GetEnvironmentVariable("OPENAI_API_KEY")!;
string model = "text-embedding-3-small";
EmbeddingClient client = new(model, key);

string[] texts = ["A rich cup of coffee.", "Crunchy crackers with sea salt.", "Dark chocolate with orange.", "A bright herbal tea.", "Smooth beans in tomato sauce.", "A mild cheese with herbs.", "Spicy roasted nuts.", "A crisp sparkling water."];
OpenAIEmbeddingCollection batch = await client.GenerateEmbeddingsAsync(texts);
float[][] vectors = batch.Select(item => item.ToFloats().ToArray()).ToArray();
float[] query = await EmbedAsync(client, "delicious beans");
var ranked = vectors.Select((vector, index) => new { Index = index, Similarity = CosineSimilarity(query, vector) }).OrderByDescending(match => match.Similarity);
foreach (var match in ranked.Take(3))
{
    Console.WriteLine($"{match.Similarity:F3}: {texts[match.Index]}");
}

static async Task<float[]> EmbedAsync(EmbeddingClient client, string text)
{
    OpenAIEmbedding result = await client.GenerateEmbeddingAsync(text);
    return result.ToFloats().ToArray();
}

static double CosineSimilarity(float[] left, float[] right)
{
    double dot = 0, leftNorm = 0, rightNorm = 0;
    for (int i = 0; i < left.Length; i++)
    {
        dot += (double)left[i] * right[i];
        leftNorm += (double)left[i] * left[i];
        rightNorm += (double)right[i] * right[i];
    }
    return dot / Math.Sqrt(leftNorm * rightNorm);
}
```

```ruby
require "openai"

client = OpenAI::Client.new
reviews = [
  "A rich cup of coffee.",
  "Smooth beans in tomato sauce.",
  "Dark chocolate with orange."
]

response = client.embeddings.create(
  model: "text-embedding-3-small",
  input: reviews + ["delicious beans"]
)

query = response.data.fetch(-1).embedding
similarity = lambda do |embedding|
  dot_product = embedding.zip(query).sum { |value, query_value| value * query_value }
  magnitude = Math.sqrt(embedding.sum { |value| value**2 })
  query_magnitude = Math.sqrt(query.sum { |value| value**2 })
  dot_product / (magnitude * query_magnitude)
end

results = reviews.map.with_index do |review, index|
  {
    review: review,
    score: similarity.call(response.data.fetch(index).embedding)
  }
end.sort_by { |result| -result.fetch(:score) }.first(3)

puts(results)
```








#### Code search using embeddings





  [
Code_search.ipynb
 ](https://developers.openai.com/cookbook/examples/code_search_using_embeddings)



Code search works similarly to embedding-based text search. We provide a method to extract Python functions from all the Python files in a given repository. Each function is then indexed by the `text-embedding-3-small` model.

To perform a code search, we embed the query in natural language using the same model. Then we calculate cosine similarity between the resulting query embedding and each of the function embeddings. The highest cosine similarity results are most relevant.

Search function source code

```typescript
import OpenAI from "openai";

const client = new OpenAI();
const functions = [
  "function add(a, b) { return a + b; }",
  "function complete(prompt) { return prompt; }",
];

const { data } = await client.embeddings.create({
  model: "text-embedding-3-small",
  input: [...functions, "Completions API tests"],
});

const query = data[functions.length].embedding;
const similarity = (embedding: number[]) => {
  const dotProduct = embedding.reduce(
    (total, value, index) => total + value * query[index],
    0
  );
  return dotProduct / (Math.hypot(...embedding) * Math.hypot(...query));
};

const results = functions
  .map((source, index) => ({
    source,
    score: similarity(data[index].embedding),
  }))
  .sort((left, right) => right.score - left.score);

console.log(results);
```

```python
df["code_embedding"] = df["code"].apply(
    lambda x: get_embedding(x, model="text-embedding-3-small")
)


def search_functions(df, code_query, n=3, pprint=True, n_lines=7):
    embedding = get_embedding(code_query, model="text-embedding-3-small")
    df["similarities"] = df.code_embedding.apply(
        lambda x: cosine_similarity(x, embedding)
    )

    res = df.sort_values("similarities", ascending=False).head(n)
    return res


res = search_functions(df, "Completions API tests", n=3)
```

```go
import (
	"context"
	"fmt"
	"log"
	"math"
	"sort"

	"github.com/openai/openai-go/v3"
)

func main() {
	if err := run(); err != nil {
		log.Fatal(err)
	}
}

func run() error {
	client := openai.NewClient()
	ctx := context.Background()
	texts := []string{"def add(a, b): return a + b", "def complete(prompt): return prompt"}
	vectors := make([][]float64, len(texts))
	for i, text := range texts {
		vector, err := embedding(ctx, &client, text)
		if err != nil {
			return err
		}
		vectors[i] = vector
	}
	query, err := embedding(ctx, &client, "Completions API tests")
	if err != nil {
		return err
	}
	matches := nearest(query, vectors)
	for _, match := range matches[:min(3, len(matches))] {
		fmt.Printf("%0.3f: %s\n", match.Similarity, texts[match.Index])
	}
	return nil
}

func embedding(ctx context.Context, client *openai.Client, text string) ([]float64, error) {
	response, err := client.Embeddings.New(ctx, openai.EmbeddingNewParams{
		Model: openai.EmbeddingModelTextEmbedding3Small,
		Input: openai.EmbeddingNewParamsInputUnion{OfString: openai.String(text)},
	})
	if err != nil {
		return nil, err
	}
	return response.Data[0].Embedding, nil
}

func cosineSimilarity(a, b []float64) float64 {
	var dot, left, right float64
	for i := range a {
		dot += a[i] * b[i]
		left += a[i] * a[i]
		right += b[i] * b[i]
	}
	return dot / math.Sqrt(left*right)
}

type match struct {
	Index      int
	Similarity float64
}

func nearest(query []float64, vectors [][]float64) []match {
	matches := make([]match, len(vectors))
	for i, vector := range vectors {
		matches[i] = match{Index: i, Similarity: cosineSimilarity(query, vector)}
	}
	sort.SliceStable(matches, func(i, j int) bool { return matches[i].Similarity > matches[j].Similarity })
	return matches
}
```

```java
import com.openai.client.OpenAIClient;
import com.openai.client.okhttp.OpenAIOkHttpClient;
import com.openai.models.embeddings.EmbeddingCreateParams;
import java.util.Comparator;
import java.util.List;
import java.util.stream.IntStream;

List<String> functions =
    List.of("def add(a, b): return a + b", "def complete(prompt): return prompt");
var functionEmbeddings =
    client
        .embeddings()
        .create(
            EmbeddingCreateParams.builder()
                .model("text-embedding-3-small")
                .inputOfArrayOfStrings(functions)
                .build())
        .data();
List<Float> query =
    client
        .embeddings()
        .create(
            EmbeddingCreateParams.builder()
                .model("text-embedding-3-small")
                .input("Completions API tests")
                .build())
        .data()
        .get(0)
        .embedding();
IntStream.range(0, functions.size())
    .boxed()
    .sorted(
        Comparator.comparingDouble(
                (Integer index) ->
                    cosineSimilarity(query, functionEmbeddings.get(index).embedding()))
            .reversed())
    .map(functions::get)
    .forEach(System.out::println);
```

```csharp
using OpenAI.Embeddings;

string key = Environment.GetEnvironmentVariable("OPENAI_API_KEY")!;
string model = "text-embedding-3-small";
EmbeddingClient client = new(model, key);

string[] texts = ["def add(a, b): return a + b", "def complete(prompt): return prompt"];
List<float[]> vectors = [];
foreach (string text in texts)
{
    vectors.Add(await EmbedAsync(client, text));
}
float[] query = await EmbedAsync(client, "Completions API tests");
var ranked = vectors.Select((vector, index) => new { Index = index, Similarity = CosineSimilarity(query, vector) }).OrderByDescending(match => match.Similarity);
foreach (var match in ranked.Take(3))
{
    Console.WriteLine($"{match.Similarity:F3}: {texts[match.Index]}");
}

static async Task<float[]> EmbedAsync(EmbeddingClient client, string text)
{
    OpenAIEmbedding result = await client.GenerateEmbeddingAsync(text);
    return result.ToFloats().ToArray();
}

static double CosineSimilarity(float[] left, float[] right)
{
    double dot = 0, leftNorm = 0, rightNorm = 0;
    for (int i = 0; i < left.Length; i++)
    {
        dot += (double)left[i] * right[i];
        leftNorm += (double)left[i] * left[i];
        rightNorm += (double)right[i] * right[i];
    }
    return dot / Math.Sqrt(leftNorm * rightNorm);
}
```

```ruby
require "openai"

client = OpenAI::Client.new
functions = [
  "function add(a, b) { return a + b; }",
  "function complete(prompt) { return prompt; }"
]

response = client.embeddings.create(
  model: "text-embedding-3-small",
  input: functions + ["Completions API tests"]
)

query = response.data.fetch(-1).embedding
similarity = lambda do |embedding|
  dot_product = embedding.zip(query).sum { |value, query_value| value * query_value }
  magnitude = Math.sqrt(embedding.sum { |value| value**2 })
  query_magnitude = Math.sqrt(query.sum { |value| value**2 })
  dot_product / (magnitude * query_magnitude)
end

results = functions.map.with_index do |source, index|
  {
    source: source,
    score: similarity.call(response.data.fetch(index).embedding)
  }
end.sort_by { |result| -result.fetch(:score) }

puts(results)
```








#### Recommendations using embeddings





  [
Recommendation_using_embeddings.ipynb
 ](https://developers.openai.com/cookbook/examples/recommendation_using_embeddings)



Because shorter distances between embedding vectors represent greater similarity, embeddings can be useful for recommendation.

Below, we illustrate a basic recommendation function. It takes in a list of strings and one 'source' string, computes their embeddings, and then returns a ranking of the strings, ranked from most similar to least similar. As a concrete example, the linked notebook below applies a version of this function to the [AG news dataset](http://groups.di.unipi.it/~gulli/AG_corpus_of_news_articles.html) (sampled down to 2,000 news article descriptions) to return the top 5 most similar articles to any given source article.

Recommend similar strings

```typescript
import OpenAI from "openai";

const client = new OpenAI();
const strings = [
  "A cheetah is a fast land animal.",
  "A peregrine falcon is a fast bird.",
  "A tortoise moves slowly.",
];

const { data } = await client.embeddings.create({
  model: "text-embedding-3-small",
  input: strings,
});

const query = data[0].embedding;
const recommendations = data
  .map(({ embedding }, index) => {
    const dotProduct = embedding.reduce(
      (total, value, dimension) => total + value * query[dimension],
      0
    );
    const similarity =
      dotProduct / (Math.hypot(...embedding) * Math.hypot(...query));
    return { index, text: strings[index], similarity };
  })
  .sort((left, right) => right.similarity - left.similarity);

console.log(recommendations);
```

```python
def recommendations_from_strings(
    strings: list[str],
    index_of_source_string: int,
    model="text-embedding-3-small",
) -> list[int]:
    """Return nearest neighbors of a given string."""

    # get embeddings for all strings
    embeddings = [embedding_from_string(string, model=model) for string in strings]

    # get the embedding of the source string
    query_embedding = embeddings[index_of_source_string]

    # get distances between the source embedding and other embeddings (function from embeddings_utils.py)
    distances = distances_from_embeddings(
        query_embedding, embeddings, distance_metric="cosine"
    )

    # get indices of nearest neighbors (function from embeddings_utils.py)
    indices_of_nearest_neighbors = indices_of_nearest_neighbors_from_distances(
        distances
    )
    return indices_of_nearest_neighbors
```

```go
import (
	"context"
	"fmt"
	"log"
	"math"
	"sort"

	"github.com/openai/openai-go/v3"
)

func main() {
	if err := run(); err != nil {
		log.Fatal(err)
	}
}

func run() error {
	client := openai.NewClient()
	ctx := context.Background()
	texts := []string{"A cheetah is a fast land animal.", "A peregrine falcon is a fast bird.", "A tortoise moves slowly."}
	vectors := make([][]float64, len(texts))
	for i, text := range texts {
		vector, err := embedding(ctx, &client, text)
		if err != nil {
			return err
		}
		vectors[i] = vector
	}
	query := vectors[0]
	matches := nearest(query, vectors)
	for _, match := range matches {
		fmt.Println(match.Index)
	}
	return nil
}

func embedding(ctx context.Context, client *openai.Client, text string) ([]float64, error) {
	response, err := client.Embeddings.New(ctx, openai.EmbeddingNewParams{
		Model: openai.EmbeddingModelTextEmbedding3Small,
		Input: openai.EmbeddingNewParamsInputUnion{OfString: openai.String(text)},
	})
	if err != nil {
		return nil, err
	}
	return response.Data[0].Embedding, nil
}

func cosineSimilarity(a, b []float64) float64 {
	var dot, left, right float64
	for i := range a {
		dot += a[i] * b[i]
		left += a[i] * a[i]
		right += b[i] * b[i]
	}
	return dot / math.Sqrt(left*right)
}

type match struct {
	Index      int
	Similarity float64
}

func nearest(query []float64, vectors [][]float64) []match {
	matches := make([]match, len(vectors))
	for i, vector := range vectors {
		matches[i] = match{Index: i, Similarity: cosineSimilarity(query, vector)}
	}
	sort.SliceStable(matches, func(i, j int) bool { return matches[i].Similarity > matches[j].Similarity })
	return matches
}
```

```java
import com.openai.client.OpenAIClient;
import com.openai.client.okhttp.OpenAIOkHttpClient;
import com.openai.models.embeddings.EmbeddingCreateParams;
import java.util.Comparator;
import java.util.List;
import java.util.stream.IntStream;

List<String> strings =
    List.of(
        "A cheetah is a fast land animal.",
        "A peregrine falcon is a fast bird.",
        "A tortoise moves slowly.");

var embeddings =
    client
        .embeddings()
        .create(
            EmbeddingCreateParams.builder()
                .model("text-embedding-3-small")
                .inputOfArrayOfStrings(strings)
                .build())
        .data();

List<Float> query = embeddings.get(0).embedding();
var nearestNeighbors =
    IntStream.range(0, embeddings.size())
        .boxed()
        .sorted(
            Comparator.comparingDouble(
                (Integer index) -> {
                  List<Float> candidate = embeddings.get(index).embedding();
                  double dotProduct = 0;
                  double queryMagnitude = 0;
                  double candidateMagnitude = 0;
                  for (int dimension = 0; dimension < query.size(); dimension++) {
                    double queryValue = query.get(dimension);
                    double candidateValue = candidate.get(dimension);
                    dotProduct += queryValue * candidateValue;
                    queryMagnitude += queryValue * queryValue;
                    candidateMagnitude += candidateValue * candidateValue;
                  }
                  return 1 - dotProduct / Math.sqrt(queryMagnitude * candidateMagnitude);
                }))
        .toList();

System.out.println(nearestNeighbors);
```

```csharp
using OpenAI.Embeddings;

string key = Environment.GetEnvironmentVariable("OPENAI_API_KEY")!;
string model = "text-embedding-3-small";
EmbeddingClient client = new(model, key);

string[] texts = ["A cheetah is a fast land animal.", "A peregrine falcon is a fast bird.", "A tortoise moves slowly."];
List<float[]> vectors = [];
foreach (string text in texts)
{
    vectors.Add(await EmbedAsync(client, text));
}
float[] query = vectors[0];
var ranked = vectors.Select((vector, index) => new { Index = index, Similarity = CosineSimilarity(query, vector) }).OrderByDescending(match => match.Similarity);
foreach (var match in ranked)
{
    Console.WriteLine(match.Index);
}

static async Task<float[]> EmbedAsync(EmbeddingClient client, string text)
{
    OpenAIEmbedding result = await client.GenerateEmbeddingAsync(text);
    return result.ToFloats().ToArray();
}

static double CosineSimilarity(float[] left, float[] right)
{
    double dot = 0, leftNorm = 0, rightNorm = 0;
    for (int i = 0; i < left.Length; i++)
    {
        dot += (double)left[i] * right[i];
        leftNorm += (double)left[i] * left[i];
        rightNorm += (double)right[i] * right[i];
    }
    return dot / Math.Sqrt(leftNorm * rightNorm);
}
```

```ruby
require "openai"

client = OpenAI::Client.new
strings = [
  "A cheetah is a fast land animal.",
  "A peregrine falcon is a fast bird.",
  "A tortoise moves slowly."
]

response = client.embeddings.create(
  model: "text-embedding-3-small",
  input: strings
)

query = response.data.fetch(0).embedding
similarity = lambda do |embedding|
  dot_product = embedding.zip(query).sum { |value, query_value| value * query_value }
  magnitude = Math.sqrt(embedding.sum { |value| value**2 })
  query_magnitude = Math.sqrt(query.sum { |value| value**2 })
  dot_product / (magnitude * query_magnitude)
end

recommendations = response.data.map.with_index do |embedding, index|
  {
    index: index,
    text: strings.fetch(index),
    similarity: similarity.call(embedding.embedding)
  }
end.sort_by { |recommendation| -recommendation.fetch(:similarity) }

puts(recommendations)
```








#### Data visualization in 2D





  [
Visualizing_embeddings_in_2D.ipynb
 ](https://developers.openai.com/cookbook/examples/visualizing_embeddings_in_2d)



The size of the embeddings varies with the complexity of the underlying model. In order to visualize this high dimensional data we use the t-SNE algorithm to transform the data into two dimensions.

We color the individual reviews based on the star rating which the reviewer has given:

- 1-star: red
- 2-star: dark orange
- 3-star: gold
- 4-star: turquoise
- 5-star: dark green

The visualization seems to have produced roughly 3 clusters, one of which has mostly negative reviews.




The Go plotting example uses `github.com/danaugrs/go-tsne/tsne` at `v0.0.0-20220306155740-2250969e057f`, `gonum.org/v1/gonum` at `v0.16.0`, and `gonum.org/v1/plot` at `v0.16.0`. It writes `local-plot.png` and prints the transformed coordinates and rating-color indices.




Visualize embeddings with t-SNE

```python
from ast import literal_eval
import numpy as np
import pandas as pd
from sklearn.manifold import TSNE
import matplotlib.pyplot as plt
import matplotlib

df = pd.read_csv("output/embedded_1k_reviews.csv")
matrix = np.array(df.ada_embedding.apply(literal_eval).to_list())

# Create a t-SNE model and transform the data
tsne = TSNE(
    n_components=2, perplexity=15, random_state=42, init="random", learning_rate=200
)
vis_dims = tsne.fit_transform(matrix)

colors = ["red", "darkorange", "gold", "turquoise", "darkgreen"]
x = [x for x, y in vis_dims]
y = [y for x, y in vis_dims]
color_indices = df.Score.values - 1

colormap = matplotlib.colors.ListedColormap(colors)
plt.scatter(x, y, c=color_indices, cmap=colormap, alpha=0.3)
plt.title("Amazon ratings visualized in language using t-SNE")
```

```go
package main

import (
	"encoding/csv"
	"encoding/json"
	"fmt"
	"github.com/danaugrs/go-tsne/tsne"
	"gonum.org/v1/gonum/mat"
	"gonum.org/v1/plot"
	"gonum.org/v1/plot/plotter"
	"gonum.org/v1/plot/vg"
	"gonum.org/v1/plot/vg/draw"
	"image/color"
	"io"
	"log"
	"math"
	"os"
	"strconv"
)

type review struct {
	Vector            []float64
	Score             int
	UserID, ProductID string
}

func loadReviews(path string) ([]review, error) {
	file, err := os.Open(path)
	if err != nil {
		return nil, err
	}
	defer file.Close()
	reader := csv.NewReader(file)
	header, err := reader.Read()
	if err != nil {
		return nil, err
	}
	columns := map[string]int{}
	for i, name := range header {
		columns[name] = i
	}
	for _, name := range []string{"ada_embedding", "Score"} {
		if _, ok := columns[name]; !ok {
			return nil, fmt.Errorf("missing %s column", name)
		}
	}
	rows := []review{}
	dimensions := 0
	for {
		record, err := reader.Read()
		if err == io.EOF {
			break
		}
		if err != nil {
			return nil, err
		}
		var value review
		if err := json.Unmarshal([]byte(record[columns["ada_embedding"]]), &value.Vector); err != nil {
			return nil, err
		}
		if len(value.Vector) == 0 {
			return nil, fmt.Errorf("empty embedding")
		}
		if dimensions == 0 {
			dimensions = len(value.Vector)
		}
		if len(value.Vector) != dimensions {
			return nil, fmt.Errorf("inconsistent embedding dimensions")
		}
		value.Score, err = strconv.Atoi(record[columns["Score"]])
		if err != nil {
			return nil, err
		}
		if column, ok := columns["UserId"]; ok {
			value.UserID = record[column]
		}
		if column, ok := columns["ProductId"]; ok {
			value.ProductID = record[column]
		}
		rows = append(rows, value)
	}
	if len(rows) == 0 {
		return nil, fmt.Errorf("no reviews")
	}
	return rows, nil
}

func main() {
	rows, err := loadReviews("output/embedded_1k_reviews.csv")
	if err != nil {
		log.Fatal(err)
	}
	if len(rows) < 3 {
		log.Fatal("need at least three reviews")
	}
	values := []float64{}
	for _, row := range rows {
		values = append(values, row.Vector...)
	}
	matrix := mat.NewDense(len(rows), len(rows[0].Vector), values)
	perplexity := math.Min(15, float64(len(rows)-1))
	embedded := tsne.NewTSNE(2, perplexity, 200, 1000, false).EmbedData(matrix, nil)
	points := make(plotter.XYs, len(rows))
	coordinates := make([][]float64, len(rows))
	colors := make([]int, len(rows))
	for i, row := range rows {
		x, y := embedded.At(i, 0), embedded.At(i, 1)
		if math.IsNaN(x) || math.IsNaN(y) || math.IsInf(x, 0) || math.IsInf(y, 0) {
			log.Fatal("non-finite t-SNE output")
		}
		if row.Score < 1 || row.Score > 5 {
			log.Fatal("review scores must be between 1 and 5")
		}
		points[i] = plotter.XY{X: x, Y: y}
		coordinates[i] = []float64{x, y}
		colors[i] = row.Score - 1
	}
	chart := plot.New()
	chart.Title.Text = "Review embeddings"
	chart.X.Label.Text = "t-SNE 1"
	chart.Y.Label.Text = "t-SNE 2"
	scatter, err := plotter.NewScatter(points)
	if err != nil {
		log.Fatal(err)
	}
	palette := []color.RGBA{{255, 0, 0, 255}, {255, 140, 0, 255}, {255, 215, 0, 255}, {64, 224, 208, 255}, {0, 100, 0, 255}}
	scatter.GlyphStyleFunc = func(i int) draw.GlyphStyle {
		return draw.GlyphStyle{Color: palette[colors[i]], Radius: vg.Points(3), Shape: draw.CircleGlyph{}}
	}
	chart.Add(scatter)
	if err := chart.Save(6*vg.Inch, 4*vg.Inch, "local-plot.png"); err != nil {
		log.Fatal(err)
	}
	plotted := make([][]float64, len(points))
	for i := range points {
		x, y := scatter.XY(i)
		plotted[i] = []float64{x, y}
	}
	result := map[string]any{"points": coordinates, "plotted": plotted, "colors": colors}
	if err := json.NewEncoder(os.Stdout).Encode(result); err != nil {
		log.Fatal(err)
	}
}
```

```ruby
require "csv"
require "json"
require "rumale/manifold"
require "chunky_png"

rows = CSV.read("output/embedded_1k_reviews.csv", headers: true).map do |row|
  row.to_h.merge("ada_embedding" => JSON.parse(row.fetch("ada_embedding")))
end
matrix = Numo::DFloat.asarray(rows.map { |row| row.fetch("ada_embedding") })
tsne = Rumale::Manifold::TSNE.new(n_components: 2, perplexity: 15, random_seed: 42, init: "random")
points = tsne.fit_transform(matrix).to_a
color_indices = rows.map { |row| Integer(row.fetch("Score")) - 1 }
palette = ["#ff0000", "#ff8c00", "#ffd700", "#40e0d0", "#006400"]

plot = ChunkyPNG::Image.new(600, 400, ChunkyPNG::Color::WHITE)
x_min, x_max = points.map(&:first).minmax
y_min, y_max = points.map(&:last).minmax
plotted = points.map(&:dup)
plotted.each_with_index do |(x, y), index|
  pixel_x = 20 + ((x - x_min) / [x_max - x_min, Float::EPSILON].max * 560).round
  pixel_y = 380 - ((y - y_min) / [y_max - y_min, Float::EPSILON].max * 360).round
  color = ChunkyPNG::Color.from_hex(palette.fetch(color_indices.fetch(index)))
  plot.circle(pixel_x, pixel_y, 3, color, color)
end
plot.save("local-plot.png")
```








#### Embedding as a text feature encoder for ML algorithms





  [
Regression_using_embeddings.ipynb
 ](https://developers.openai.com/cookbook/examples/regression_using_embeddings)



An embedding can be used as a general free-text feature encoder within a machine learning model. Incorporating embeddings will improve the performance of any machine learning model, if some of the relevant inputs are free text. An embedding can also be used as a categorical feature encoder within a ML model. This adds most value if the names of categorical variables are meaningful and numerous, such as job titles. Similarity embeddings generally perform better than search embeddings for this task.

We observed that generally the embedding representation is rich and information dense. For example, reducing the dimensionality of the inputs using SVD or PCA, even by 10%, generally results in worse downstream performance on specific tasks.

This code splits the data into a training set and a testing set, which will be used by the following two use cases, namely regression and classification.

Split the dataset for training and testing

```python
from sklearn.model_selection import train_test_split

X_train, X_test, y_train, y_test = train_test_split(
    list(df.ada_embedding.values), df.Score, test_size=0.2, random_state=42
)
```

```go
package main

import (
	"encoding/csv"
	"encoding/json"
	"fmt"
	"io"
	"log"
	"math/rand"
	"os"
	"strconv"
)

type review struct {
	Vector            []float64
	Score             int
	UserID, ProductID string
}

func loadReviews(path string) ([]review, error) {
	file, err := os.Open(path)
	if err != nil {
		return nil, err
	}
	defer file.Close()
	reader := csv.NewReader(file)
	header, err := reader.Read()
	if err != nil {
		return nil, err
	}
	columns := map[string]int{}
	for i, name := range header {
		columns[name] = i
	}
	for _, name := range []string{"ada_embedding", "Score"} {
		if _, ok := columns[name]; !ok {
			return nil, fmt.Errorf("missing %s column", name)
		}
	}
	rows := []review{}
	dimensions := 0
	for {
		record, err := reader.Read()
		if err == io.EOF {
			break
		}
		if err != nil {
			return nil, err
		}
		var value review
		if err := json.Unmarshal([]byte(record[columns["ada_embedding"]]), &value.Vector); err != nil {
			return nil, err
		}
		if len(value.Vector) == 0 {
			return nil, fmt.Errorf("empty embedding")
		}
		if dimensions == 0 {
			dimensions = len(value.Vector)
		}
		if len(value.Vector) != dimensions {
			return nil, fmt.Errorf("inconsistent embedding dimensions")
		}
		value.Score, err = strconv.Atoi(record[columns["Score"]])
		if err != nil {
			return nil, err
		}
		if column, ok := columns["UserId"]; ok {
			value.UserID = record[column]
		}
		if column, ok := columns["ProductId"]; ok {
			value.ProductID = record[column]
		}
		rows = append(rows, value)
	}
	if len(rows) == 0 {
		return nil, fmt.Errorf("no reviews")
	}
	return rows, nil
}

func main() {
	rows, err := loadReviews("output/embedded_1k_reviews.csv")
	if err != nil {
		log.Fatal(err)
	}
	if len(rows) < 2 {
		log.Fatal("need at least two reviews")
	}
	indices := rand.New(rand.NewSource(42)).Perm(len(rows))
	testSize := (len(rows) + 4) / 5
	trainVectors, testVectors := [][]float64{}, [][]float64{}
	trainScores, testScores := []int{}, []int{}
	for i, index := range indices {
		row := rows[index]
		if i < testSize {
			testVectors = append(testVectors, row.Vector)
			testScores = append(testScores, row.Score)
		} else {
			trainVectors = append(trainVectors, row.Vector)
			trainScores = append(trainScores, row.Score)
		}
	}
	result := map[string]any{"train": trainScores, "test": testScores, "train_vectors": trainVectors, "test_vectors": testVectors}
	if err := json.NewEncoder(os.Stdout).Encode(result); err != nil {
		log.Fatal(err)
	}
}
```

```ruby
vectors = rows.map { |row| row.fetch("ada_embedding") }
scores = rows.map { |row| Integer(row.fetch("Score")) }

indices = (0...vectors.length).to_a.shuffle(random: Random.new(42))
test_size = (vectors.length * 0.2).ceil
test_indices = indices.take(test_size)
train_indices = indices.drop(test_size)
x_train = train_indices.map { |index| vectors.fetch(index) }
holdout_vectors = test_indices.map { |index| vectors.fetch(index) }
y_train = train_indices.map { |index| scores.fetch(index) }
holdout_scores = test_indices.map { |index| scores.fetch(index) }
```


#### Regression using the embedding features

Embeddings present an elegant way of predicting a numerical value. In this example we predict the reviewer’s star rating, based on the text of their review. Because the semantic information contained within embeddings is high, the prediction is decent even with few reviews.

We assume the score is a continuous variable between 1 and 5, and allow the algorithm to predict any floating point value. The ML algorithm minimizes the distance of the predicted value to the true score, and achieves a mean absolute error of 0.39, which means that on average the prediction is off by less than half a star.




The Go example uses `github.com/wlattner/rf/forest` from module version `v0.0.0-20150304005020-e98c6ca28b25`. It fits 100 trees on the training partition and predicts the held-out rows. Install the pinned module version before running the program.




Predict review scores

```python
from sklearn.ensemble import RandomForestRegressor

rfr = RandomForestRegressor(n_estimators=100)
rfr.fit(X_train, y_train)
preds = rfr.predict(X_test)
```

```go
package main

import (
	"encoding/csv"
	"encoding/json"
	"fmt"
	"github.com/wlattner/rf/forest"
	"io"
	"log"
	"math/rand"
	"os"
	"strconv"
)

type review struct {
	Vector            []float64
	Score             int
	UserID, ProductID string
}

func loadReviews(path string) ([]review, error) {
	file, err := os.Open(path)
	if err != nil {
		return nil, err
	}
	defer file.Close()
	reader := csv.NewReader(file)
	header, err := reader.Read()
	if err != nil {
		return nil, err
	}
	columns := map[string]int{}
	for i, name := range header {
		columns[name] = i
	}
	for _, name := range []string{"ada_embedding", "Score"} {
		if _, ok := columns[name]; !ok {
			return nil, fmt.Errorf("missing %s column", name)
		}
	}
	rows := []review{}
	dimensions := 0
	for {
		record, err := reader.Read()
		if err == io.EOF {
			break
		}
		if err != nil {
			return nil, err
		}
		var value review
		if err := json.Unmarshal([]byte(record[columns["ada_embedding"]]), &value.Vector); err != nil {
			return nil, err
		}
		if len(value.Vector) == 0 {
			return nil, fmt.Errorf("empty embedding")
		}
		if dimensions == 0 {
			dimensions = len(value.Vector)
		}
		if len(value.Vector) != dimensions {
			return nil, fmt.Errorf("inconsistent embedding dimensions")
		}
		value.Score, err = strconv.Atoi(record[columns["Score"]])
		if err != nil {
			return nil, err
		}
		if column, ok := columns["UserId"]; ok {
			value.UserID = record[column]
		}
		if column, ok := columns["ProductId"]; ok {
			value.ProductID = record[column]
		}
		rows = append(rows, value)
	}
	if len(rows) == 0 {
		return nil, fmt.Errorf("no reviews")
	}
	return rows, nil
}

func main() {
	rows, err := loadReviews("output/embedded_1k_reviews.csv")
	if err != nil {
		log.Fatal(err)
	}
	if len(rows) < 2 {
		log.Fatal("need at least two reviews")
	}
	indices := rand.New(rand.NewSource(42)).Perm(len(rows))
	testSize := (len(rows) + 4) / 5
	trainVectors, testVectors := [][]float64{}, [][]float64{}
	trainScores, testScores := []int{}, []int{}
	for i, index := range indices {
		row := rows[index]
		if i < testSize {
			testVectors = append(testVectors, row.Vector)
			testScores = append(testScores, row.Score)
		} else {
			trainVectors = append(trainVectors, row.Vector)
			trainScores = append(trainScores, row.Score)
		}
	}
	targets := make([]float64, len(trainScores))
	for i, score := range trainScores {
		targets[i] = float64(score)
	}
	model := forest.NewRegressor(forest.NumTrees(100), forest.NumWorkers(1))
	model.Fit(trainVectors, targets)
	predictions := model.Predict(testVectors)
	result := map[string]any{"train": trainScores, "test": testScores, "train_vectors": trainVectors, "test_vectors": testVectors, "predictions": predictions, "trees": len(model.Trees), "features": len(trainVectors[0])}

	if err := json.NewEncoder(os.Stdout).Encode(result); err != nil {
		log.Fatal(err)
	}
}
```

```ruby
require "rumale/ensemble"

x_train = Numo::DFloat.asarray(x_train)
y_train = Numo::DFloat.asarray(y_train)
holdout_vectors = Numo::DFloat.asarray(holdout_vectors)

forest = Rumale::Ensemble::RandomForestRegressor.new(n_estimators: 100, random_seed: 42)
forest.fit(x_train, y_train)
predictions = forest.predict(holdout_vectors)
```








#### Classification using the embedding features





  [
Classification_using_embeddings.ipynb
 ](https://developers.openai.com/cookbook/examples/classification_using_embeddings)



This time, instead of having the algorithm predict a value anywhere between 1 and 5, we will attempt to classify the exact number of stars for a review into 5 buckets, ranging from 1 to 5 stars.

After the training, the model learns to predict 1 and 5-star reviews much better than the more nuanced reviews (2-4 stars), likely due to more extreme sentiment expression.




The Go example uses `github.com/wlattner/rf/forest` from module version `v0.0.0-20150304005020-e98c6ca28b25`. It fits 100 trees on the training partition and predicts the held-out rows. Install the pinned module version before running the program.




Classify review scores

```python
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report, accuracy_score

clf = RandomForestClassifier(n_estimators=100)
clf.fit(X_train, y_train)
preds = clf.predict(X_test)
```

```go
package main

import (
	"encoding/csv"
	"encoding/json"
	"fmt"
	"github.com/wlattner/rf/forest"
	"io"
	"log"
	"math/rand"
	"os"
	"slices"
	"strconv"
)

type review struct {
	Vector            []float64
	Score             int
	UserID, ProductID string
}

func loadReviews(path string) ([]review, error) {
	file, err := os.Open(path)
	if err != nil {
		return nil, err
	}
	defer file.Close()
	reader := csv.NewReader(file)
	header, err := reader.Read()
	if err != nil {
		return nil, err
	}
	columns := map[string]int{}
	for i, name := range header {
		columns[name] = i
	}
	for _, name := range []string{"ada_embedding", "Score"} {
		if _, ok := columns[name]; !ok {
			return nil, fmt.Errorf("missing %s column", name)
		}
	}
	rows := []review{}
	dimensions := 0
	for {
		record, err := reader.Read()
		if err == io.EOF {
			break
		}
		if err != nil {
			return nil, err
		}
		var value review
		if err := json.Unmarshal([]byte(record[columns["ada_embedding"]]), &value.Vector); err != nil {
			return nil, err
		}
		if len(value.Vector) == 0 {
			return nil, fmt.Errorf("empty embedding")
		}
		if dimensions == 0 {
			dimensions = len(value.Vector)
		}
		if len(value.Vector) != dimensions {
			return nil, fmt.Errorf("inconsistent embedding dimensions")
		}
		value.Score, err = strconv.Atoi(record[columns["Score"]])
		if err != nil {
			return nil, err
		}
		if column, ok := columns["UserId"]; ok {
			value.UserID = record[column]
		}
		if column, ok := columns["ProductId"]; ok {
			value.ProductID = record[column]
		}
		rows = append(rows, value)
	}
	if len(rows) == 0 {
		return nil, fmt.Errorf("no reviews")
	}
	return rows, nil
}

func main() {
	rows, err := loadReviews("output/embedded_1k_reviews.csv")
	if err != nil {
		log.Fatal(err)
	}
	if len(rows) < 2 {
		log.Fatal("need at least two reviews")
	}
	indices := rand.New(rand.NewSource(42)).Perm(len(rows))
	testSize := (len(rows) + 4) / 5
	trainVectors, testVectors := [][]float64{}, [][]float64{}
	trainScores, testScores := []int{}, []int{}
	for i, index := range indices {
		row := rows[index]
		if i < testSize {
			testVectors = append(testVectors, row.Vector)
			testScores = append(testScores, row.Score)
		} else {
			trainVectors = append(trainVectors, row.Vector)
			trainScores = append(trainScores, row.Score)
		}
	}
	labels := make([]string, len(trainScores))
	for i, score := range trainScores {
		labels[i] = strconv.Itoa(score)
	}
	model := forest.NewClassifier(forest.NumTrees(100), forest.NumWorkers(1))
	model.Fit(trainVectors, labels)
	predictedClasses := model.Predict(testVectors)
	predictions := make([]int, len(predictedClasses))
	for i, class := range predictedClasses {
		value, err := strconv.Atoi(model.Classes[class])
		if err != nil {
			log.Fatal(err)
		}
		predictions[i] = value
	}
	classes := make([]int, len(model.Classes))
	for i, class := range model.Classes {
		value, err := strconv.Atoi(class)
		if err != nil {
			log.Fatal(err)
		}
		classes[i] = value
	}
	slices.Sort(classes)
	result := map[string]any{"train": trainScores, "test": testScores, "train_vectors": trainVectors, "test_vectors": testVectors, "predictions": predictions, "trees": len(model.Trees), "features": len(trainVectors[0]), "classes": classes}

	if err := json.NewEncoder(os.Stdout).Encode(result); err != nil {
		log.Fatal(err)
	}
}
```

```ruby
require "rumale/ensemble"

x_train = Numo::DFloat.asarray(x_train)
y_train = Numo::Int32.asarray(y_train)
holdout_vectors = Numo::DFloat.asarray(holdout_vectors)

forest = Rumale::Ensemble::RandomForestClassifier.new(n_estimators: 100, random_seed: 42)
forest.fit(x_train, y_train)
predictions = forest.predict(holdout_vectors)
```








#### Zero-shot classification





  [
Zero-shot_classification_with_embeddings.ipynb
 ](https://developers.openai.com/cookbook/examples/zero-shot_classification_with_embeddings)



We can use embeddings for zero shot classification without any labeled training data. For each class, we embed the class name or a short description of the class. To classify some new text in a zero-shot manner, we compare its embedding to all class embeddings and predict the class with the highest similarity.

Classify text without training examples

```typescript
import OpenAI from "openai";

const client = new OpenAI();
const labels = ["negative", "positive"];

const { data } = await client.embeddings.create({
  model: "text-embedding-3-small",
  input: [...labels, "The coffee arrived quickly and tastes great."],
});

const review = data[labels.length].embedding;
const similarity = (embedding: number[]) => {
  const dotProduct = embedding.reduce(
    (total, value, index) => total + value * review[index],
    0
  );
  return dotProduct / (Math.hypot(...embedding) * Math.hypot(...review));
};

const [negative, positive] = data.map(({ embedding }) => similarity(embedding));
console.log(positive > negative ? "positive" : "negative");
```

```python
df = df[df.Score != 3]
df["sentiment"] = df.Score.replace(
    {1: "negative", 2: "negative", 4: "positive", 5: "positive"}
)

labels = ["negative", "positive"]
label_embeddings = [get_embedding(label, model=model) for label in labels]


def label_score(review_embedding, label_embeddings):
    return cosine_similarity(review_embedding, label_embeddings[1]) - cosine_similarity(
        review_embedding, label_embeddings[0]
    )


prediction = (
    "positive" if label_score(get_embedding("Sample Review", model=model), label_embeddings) > 0 else "negative"
)
```

```go
import (
	"context"
	"fmt"
	"log"
	"math"

	"github.com/openai/openai-go/v3"
)

func main() {
	if err := run(); err != nil {
		log.Fatal(err)
	}
}

func run() error {
	client := openai.NewClient()
	ctx := context.Background()
	negative, err := embedding(ctx, &client, "negative")
	if err != nil {
		return err
	}
	positive, err := embedding(ctx, &client, "positive")
	if err != nil {
		return err
	}
	review, err := embedding(ctx, &client, "Sample Review")
	if err != nil {
		return err
	}
	score := cosineSimilarity(review, positive) - cosineSimilarity(review, negative)
	prediction := "negative"
	if score > 0 {
		prediction = "positive"
	}
	fmt.Println(prediction)
	return nil
}

func embedding(ctx context.Context, client *openai.Client, text string) ([]float64, error) {
	response, err := client.Embeddings.New(ctx, openai.EmbeddingNewParams{
		Model: openai.EmbeddingModelTextEmbedding3Small,
		Input: openai.EmbeddingNewParamsInputUnion{OfString: openai.String(text)},
	})
	if err != nil {
		return nil, err
	}
	return response.Data[0].Embedding, nil
}

func cosineSimilarity(a, b []float64) float64 {
	var dot, left, right float64
	for i := range a {
		dot += a[i] * b[i]
		left += a[i] * a[i]
		right += b[i] * b[i]
	}
	return dot / math.Sqrt(left*right)
}
```

```java
import com.openai.client.OpenAIClient;
import com.openai.client.okhttp.OpenAIOkHttpClient;
import com.openai.models.embeddings.EmbeddingCreateParams;
import java.util.List;

var embeddings =
    client
        .embeddings()
        .create(
            EmbeddingCreateParams.builder()
                .model("text-embedding-3-small")
                .inputOfArrayOfStrings(List.of("negative", "positive", "Sample Review"))
                .build())
        .data();

List<Float> review = embeddings.get(2).embedding();
double negative = cosineSimilarity(review, embeddings.get(0).embedding());
double positive = cosineSimilarity(review, embeddings.get(1).embedding());
System.out.println(positive > negative ? "positive" : "negative");
```

```csharp
using OpenAI.Embeddings;

string key = Environment.GetEnvironmentVariable("OPENAI_API_KEY")!;
string model = "text-embedding-3-small";
EmbeddingClient client = new(model, key);

float[] negative = await EmbedAsync(client, "negative");
float[] positive = await EmbedAsync(client, "positive");
float[] review = await EmbedAsync(client, "Sample Review");
double score = CosineSimilarity(review, positive) - CosineSimilarity(review, negative);
Console.WriteLine(score > 0 ? "positive" : "negative");

static async Task<float[]> EmbedAsync(EmbeddingClient client, string text)
{
    OpenAIEmbedding result = await client.GenerateEmbeddingAsync(text);
    return result.ToFloats().ToArray();
}

static double CosineSimilarity(float[] left, float[] right)
{
    double dot = 0, leftNorm = 0, rightNorm = 0;
    for (int i = 0; i < left.Length; i++)
    {
        dot += (double)left[i] * right[i];
        leftNorm += (double)left[i] * left[i];
        rightNorm += (double)right[i] * right[i];
    }
    return dot / Math.Sqrt(leftNorm * rightNorm);
}
```

```ruby
require "openai"

client = OpenAI::Client.new
labels = ["negative", "positive"]

response = client.embeddings.create(
  model: "text-embedding-3-small",
  input: labels + ["The coffee arrived quickly and tastes great."]
)

review = response.data.fetch(-1).embedding
similarity = lambda do |embedding|
  dot_product = embedding.zip(review).sum { |value, review_value| value * review_value }
  magnitude = Math.sqrt(embedding.sum { |value| value**2 })
  review_magnitude = Math.sqrt(review.sum { |value| value**2 })
  dot_product / (magnitude * review_magnitude)
end

negative, positive = response.data.first(2).map do |embedding|
  similarity.call(embedding.embedding)
end
puts((positive > negative) ? "positive" : "negative")
```








#### Obtaining user and product embeddings for cold-start recommendation





  [
User_and_product_embeddings.ipynb
 ](https://developers.openai.com/cookbook/examples/user_and_product_embeddings)



We can obtain a user embedding by averaging over all of their reviews. Similarly, we can obtain a product embedding by averaging over all the reviews about that product. In order to showcase the usefulness of this approach we use a subset of 50k reviews to cover more reviews per user and per product.

We evaluate the usefulness of these embeddings on a separate test set, where we plot similarity of the user and product embedding as a function of the rating. Interestingly, based on this approach, even before the user receives the product we can predict better than random whether they would like the product.

Average user and product embeddings

```python
user_embeddings = df.groupby("UserId").ada_embedding.apply(np.mean)
prod_embeddings = df.groupby("ProductId").ada_embedding.apply(np.mean)
```

```go
package main

import (
	"encoding/csv"
	"encoding/json"
	"fmt"
	"io"
	"log"
	"os"
	"strconv"
)

type review struct {
	Vector            []float64
	Score             int
	UserID, ProductID string
}

func loadReviews(path string) ([]review, error) {
	file, err := os.Open(path)
	if err != nil {
		return nil, err
	}
	defer file.Close()
	reader := csv.NewReader(file)
	header, err := reader.Read()
	if err != nil {
		return nil, err
	}
	columns := map[string]int{}
	for i, name := range header {
		columns[name] = i
	}
	for _, name := range []string{"ada_embedding", "Score"} {
		if _, ok := columns[name]; !ok {
			return nil, fmt.Errorf("missing %s column", name)
		}
	}
	rows := []review{}
	dimensions := 0
	for {
		record, err := reader.Read()
		if err == io.EOF {
			break
		}
		if err != nil {
			return nil, err
		}
		var value review
		if err := json.Unmarshal([]byte(record[columns["ada_embedding"]]), &value.Vector); err != nil {
			return nil, err
		}
		if len(value.Vector) == 0 {
			return nil, fmt.Errorf("empty embedding")
		}
		if dimensions == 0 {
			dimensions = len(value.Vector)
		}
		if len(value.Vector) != dimensions {
			return nil, fmt.Errorf("inconsistent embedding dimensions")
		}
		value.Score, err = strconv.Atoi(record[columns["Score"]])
		if err != nil {
			return nil, err
		}
		if column, ok := columns["UserId"]; ok {
			value.UserID = record[column]
		}
		if column, ok := columns["ProductId"]; ok {
			value.ProductID = record[column]
		}
		rows = append(rows, value)
	}
	if len(rows) == 0 {
		return nil, fmt.Errorf("no reviews")
	}
	return rows, nil
}

func averageEmbeddings(rows []review, id func(review) string) (map[string][]float64, error) {
	sums := map[string][]float64{}
	counts := map[string]int{}
	for _, row := range rows {
		key := id(row)
		if key == "" {
			return nil, fmt.Errorf("missing user or product ID")
		}
		if sums[key] == nil {
			sums[key] = make([]float64, len(row.Vector))
		}
		for i, value := range row.Vector {
			sums[key][i] += value
		}
		counts[key]++
	}
	for key, vector := range sums {
		for i := range vector {
			vector[i] /= float64(counts[key])
		}
	}
	return sums, nil
}

func main() {
	rows, err := loadReviews("output/embedded_1k_reviews.csv")
	if err != nil {
		log.Fatal(err)
	}
	users, err := averageEmbeddings(rows, func(row review) string { return row.UserID })
	if err != nil {
		log.Fatal(err)
	}
	products, err := averageEmbeddings(rows, func(row review) string { return row.ProductID })
	if err != nil {
		log.Fatal(err)
	}
	result := map[string]any{"users": users, "products": products}
	if err := json.NewEncoder(os.Stdout).Encode(result); err != nil {
		log.Fatal(err)
	}
}
```

```ruby
vectors = rows.map { |row| row.fetch("ada_embedding") }
user_ids = rows.map { |row| row.fetch("UserId") }
product_ids = rows.map { |row| row.fetch("ProductId") }

def average_embeddings(ids, vectors)
  ids.zip(vectors).group_by(&:first).transform_values do |rows|
    rows.map(&:last).transpose.map { |dimension| dimension.sum / dimension.length.to_f }
  end
end

user_embeddings = average_embeddings(user_ids, vectors)
product_embeddings = average_embeddings(product_ids, vectors)
```








#### Clustering





  [
Clustering.ipynb
 ](https://developers.openai.com/cookbook/examples/clustering)



Clustering is one way of making sense of a large volume of textual data. Embeddings are useful for this task, as they provide semantically meaningful vector representations of each text. Thus, in an unsupervised way, clustering will uncover hidden groupings in our dataset.

In this example, we discover four distinct clusters: one focusing on dog food, one on negative reviews, and two on positive reviews.

Cluster embeddings

```python
import numpy as np
from sklearn.cluster import KMeans

matrix = np.vstack(df.ada_embedding.values)
n_clusters = 4

kmeans = KMeans(n_clusters=n_clusters, init="k-means++", random_state=42)
kmeans.fit(matrix)
df["Cluster"] = kmeans.labels_
```

```go
package main

import (
	"encoding/csv"
	"encoding/json"
	"fmt"
	"io"
	"log"
	"math"
	"math/rand"
	"os"
	"strconv"
)

type review struct {
	Vector            []float64
	Score             int
	UserID, ProductID string
}

func loadReviews(path string) ([]review, error) {
	file, err := os.Open(path)
	if err != nil {
		return nil, err
	}
	defer file.Close()
	reader := csv.NewReader(file)
	header, err := reader.Read()
	if err != nil {
		return nil, err
	}
	columns := map[string]int{}
	for i, name := range header {
		columns[name] = i
	}
	for _, name := range []string{"ada_embedding", "Score"} {
		if _, ok := columns[name]; !ok {
			return nil, fmt.Errorf("missing %s column", name)
		}
	}
	rows := []review{}
	dimensions := 0
	for {
		record, err := reader.Read()
		if err == io.EOF {
			break
		}
		if err != nil {
			return nil, err
		}
		var value review
		if err := json.Unmarshal([]byte(record[columns["ada_embedding"]]), &value.Vector); err != nil {
			return nil, err
		}
		if len(value.Vector) == 0 {
			return nil, fmt.Errorf("empty embedding")
		}
		if dimensions == 0 {
			dimensions = len(value.Vector)
		}
		if len(value.Vector) != dimensions {
			return nil, fmt.Errorf("inconsistent embedding dimensions")
		}
		value.Score, err = strconv.Atoi(record[columns["Score"]])
		if err != nil {
			return nil, err
		}
		if column, ok := columns["UserId"]; ok {
			value.UserID = record[column]
		}
		if column, ok := columns["ProductId"]; ok {
			value.ProductID = record[column]
		}
		rows = append(rows, value)
	}
	if len(rows) == 0 {
		return nil, fmt.Errorf("no reviews")
	}
	return rows, nil
}

func squaredDistance(a, b []float64) float64 {
	sum := 0.0
	for i, value := range a {
		delta := value - b[i]
		sum += delta * delta
	}
	return sum
}
func kmeans(vectors [][]float64, k int) ([]int, [][]float64, error) {
	if len(vectors) < k || k < 1 {
		return nil, nil, fmt.Errorf("need at least %d vectors", k)
	}
	random := rand.New(rand.NewSource(42))
	centers := [][]float64{append([]float64(nil), vectors[random.Intn(len(vectors))]...)}
	// k-means++ initialization samples proportional to squared distance.
	for len(centers) < k {
		distances := make([]float64, len(vectors))
		total := 0.0
		for i, vector := range vectors {
			best := math.Inf(1)
			for _, center := range centers {
				best = math.Min(best, squaredDistance(vector, center))
			}
			distances[i] = best
			total += best
		}
		if total == 0 {
			return nil, nil, fmt.Errorf("need %d distinct vectors", k)
		}
		threshold := random.Float64() * total
		chosen := len(vectors) - 1
		for i, distance := range distances {
			threshold -= distance
			if threshold < 0 {
				chosen = i
				break
			}
		}
		centers = append(centers, append([]float64(nil), vectors[chosen]...))
	}
	labels := make([]int, len(vectors))
	for i := range labels {
		labels[i] = -1
	}
	for iteration := 0; iteration < 300; iteration++ {
		changed := false
		counts := make([]int, k)
		sums := make([][]float64, k)
		for i := range sums {
			sums[i] = make([]float64, len(vectors[0]))
		}
		for i, vector := range vectors {
			closest := 0
			for j := 1; j < k; j++ {
				if squaredDistance(vector, centers[j]) < squaredDistance(vector, centers[closest]) {
					closest = j
				}
			}
			if labels[i] != closest {
				changed = true
			}
			labels[i] = closest
			counts[closest]++
			for j, value := range vector {
				sums[closest][j] += value
			}
		}
		for i, count := range counts {
			if count > 0 {
				for j := range sums[i] {
					sums[i][j] /= float64(count)
				}
				centers[i] = sums[i]
			}
		}
		if !changed {
			return labels, centers, nil
		}
	}
	return nil, nil, fmt.Errorf("k-means did not converge")
}

func main() {
	rows, err := loadReviews("output/embedded_1k_reviews.csv")
	if err != nil {
		log.Fatal(err)
	}
	vectors := make([][]float64, len(rows))
	for i, row := range rows {
		vectors[i] = row.Vector
	}
	labels, centers, err := kmeans(vectors, 4)
	if err != nil {
		log.Fatal(err)
	}
	result := map[string]any{"labels": labels, "centers": centers}
	if err := json.NewEncoder(os.Stdout).Encode(result); err != nil {
		log.Fatal(err)
	}
}
```

```ruby
require "rumale/clustering"

vectors = rows.map { |row| row.fetch("ada_embedding") }

matrix = Numo::DFloat.asarray(vectors)
kmeans = Rumale::Clustering::KMeans.new(n_clusters: 4, init: "k-means++", random_seed: 42)
labels = kmeans.fit_predict(matrix)
```






## FAQ

### How can I tell how many tokens a string has before I embed it?

In Python, you can split a string into tokens with OpenAI's tokenizer [`tiktoken`](https://github.com/openai/tiktoken).

Example code:

Count tokens before embedding

```python
import tiktoken


def num_tokens_from_string(string: str, encoding_name: str) -> int:
    """Returns the number of tokens in a text string."""
    encoding = tiktoken.get_encoding(encoding_name)
    num_tokens = len(encoding.encode(string))
    return num_tokens


num_tokens_from_string("tiktoken is great!", "cl100k_base")
```

```go
package main

import (
	"fmt"
	"github.com/tiktoken-go/tokenizer"
)

func numTokensFromString(text, encodingName string) (int, error) {
	encoding, err := tokenizer.Get(tokenizer.Encoding(encodingName))
	if err != nil {
		return 0, err
	}
	ids, _, err := encoding.Encode(text)
	return len(ids), err
}

func main() {
	count, err := numTokensFromString("tiktoken is great!", "cl100k_base")
	if err != nil {
		panic(err)
	}
	fmt.Println(count)
}
```

```ruby
require "tiktoken_ruby"

def num_tokens_from_string(string, encoding_name)
  Tiktoken.get_encoding(encoding_name).encode(string).length
end

puts(num_tokens_from_string("tiktoken is great!", "cl100k_base"))
```





The Go example uses the third-party `github.com/tiktoken-go/tokenizer` package, version `v0.10.0`. Install it in your Go module before running the example.




For third-generation embedding models like `text-embedding-3-small`, use the `cl100k_base` encoding.

More details and example code are in the OpenAI Cookbook guide [how to count tokens with tiktoken](https://developers.openai.com/cookbook/examples/how_to_count_tokens_with_tiktoken).

### How can I retrieve K nearest embedding vectors quickly?

For searching over many vectors quickly, we recommend using a vector database. You can find examples of working with vector databases and the OpenAI API [in our Cookbook](https://developers.openai.com/cookbook/examples/vector_databases/readme) on GitHub.

### Which distance function should I use?

We recommend [cosine similarity](https://en.wikipedia.org/wiki/Cosine_similarity). The choice of distance function typically doesn't matter much.

OpenAI embeddings are normalized to length 1, which means that:

- Cosine similarity can be computed slightly faster using just a dot product
- Cosine similarity and Euclidean distance will result in the identical rankings

### Can I share my embeddings online?

Yes, customers own their input and output from our models, including in the case of embeddings. You are responsible for ensuring that the content you input to our API does not violate any applicable law or our [Terms of Use](https://openai.com/policies/terms-of-use).

### Do V3 embedding models know about recent events?

No, the `text-embedding-3-large` and `text-embedding-3-small` models lack knowledge of events that occurred after September 2021. This is generally not as much of a limitation as it would be for text generation models but in certain edge cases it can reduce performance.