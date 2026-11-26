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

The Java examples use `com.openai:openai-java:4.105.0`, `org.apache.commons:commons-csv:1.14.1`, and `com.fasterxml.jackson.core:jackson-databind:2.18.11`. For token counting, add `com.knuddels:jtokkit:1.1.0`. For visualization, clustering, classification, and regression, also add `com.github.haifengl:smile-core:3.1.1`; the examples use that version’s API. Keep imports at the top of your file and helper methods and records at class scope. Place the statements for each step inside a `main` method that declares checked exceptions. Use the same working directory for the CSV files shared by the steps.

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







Download and extract the [TypeScript samples and locked dependencies](https://developers.openai.com/api/docs/samples/typescript.tar.gz), including OpenAI and the CSV parser and writer. Save the review dataset as `data/fine_food_reviews_1k.csv` and set `OPENAI_API_KEY`. Keep `Summary`, `Text`, `Score`, `UserId`, and `ProductId`; the producer preserves these columns in its output for the analysis programs. Use a dataset with at least four rows for the four-cluster example.







Save the review dataset as `data/fine_food_reviews_1k.csv`. Keep `Summary`, `Text`, `Score`, `UserId`, and `ProductId`; the Java producer preserves these columns and adds `combined` and `ada_embedding`. Use at least four labeled reviews for the visualization. The visualization sets t-SNE perplexity based on the dataset size, with a maximum of 15, and writes `local-plot.png`.




Create review embeddings

```typescript
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { parse } from "csv-parse/sync";
import { stringify } from "csv-stringify/sync";
import OpenAI from "openai";

const reviews: Record<string, string>[] = parse(
  await readFile("data/fine_food_reviews_1k.csv", "utf8"),
  { columns: true, skip_empty_lines: true }
);
if (!reviews.length) throw new Error("No reviews in the input CSV");
for (const review of reviews) {
  for (const column of ["Summary", "Text", "Score", "UserId", "ProductId"]) {
    if (typeof review[column] !== "string" || !review[column].trim())
      throw new Error(`Review is missing ${column}`);
  }
  const score = Number(review.Score);
  if (!Number.isInteger(score) || score < 1 || score > 5)
    throw new Error("Score must be an integer from 1 to 5");
}
const combined = reviews.map((review) =>
  `${review.Summary} ${review.Text}`.replaceAll("\n", " ")
);
const client = new OpenAI();
const response = await client.embeddings.create({
  model: "text-embedding-3-small",
  input: combined,
});
const embeddings = [...response.data].sort((a, b) => a.index - b.index);
if (embeddings.length !== reviews.length)
  throw new Error("Embedding response did not include every review");
const rows = reviews.map((review, index) => {
  if (embeddings[index].index !== index)
    throw new Error("Embedding response has invalid review indices");
  return {
    ...review,
    combined: combined[index],
    ada_embedding: JSON.stringify(embeddings[index].embedding),
  };
});
await mkdir("output", { recursive: true });
await writeFile(
  "output/embedded_1k_reviews.csv",
  stringify(rows, { header: true })
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
import com.fasterxml.jackson.databind.ObjectMapper;
import com.openai.client.OpenAIClient;
import com.openai.client.okhttp.OpenAIOkHttpClient;
import com.openai.models.embeddings.EmbeddingCreateParams;
import java.nio.file.*;
import java.util.*;
import org.apache.commons.csv.*;

Path output = Path.of("output", "embedded_1k_reviews.csv");
Files.createDirectories(output.getParent());
try (var reviews =
    CSVFormat.DEFAULT
        .builder()
        .setHeader()
        .setSkipHeaderRecord(true)
        .get()
        .parse(Files.newBufferedReader(Path.of("data/fine_food_reviews_1k.csv")))) {
  var headers = new ArrayList<>(reviews.getHeaderNames());
  headers.add("combined");
  headers.add("ada_embedding");
  try (var writer =
      CSVFormat.DEFAULT
          .builder()
          .setHeader(headers.toArray(String[]::new))
          .get()
          .print(Files.newBufferedWriter(output))) {
    for (var review : reviews) {
      String combined = (review.get("Summary") + " " + review.get("Text")).replace("\n", " ");
      var embedding =
          client
              .embeddings()
              .create(
                  EmbeddingCreateParams.builder()
                      .model("text-embedding-3-small")
                      .inputOfArrayOfStrings(List.of(combined))
                      .build())
              .data()
              .get(0)
              .embedding();
      var values = new ArrayList<String>();
      for (String header : reviews.getHeaderNames()) values.add(review.get(header));
      values.add(combined);
      values.add(new ObjectMapper().writeValueAsString(embedding));
      writer.printRecord(values);
    }
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







For Ruby, install the [sample project dependencies](https://developers.openai.com/api/docs/samples/ruby-Gemfile). Append the loading and analysis snippets to the same Ruby file; run the split before either forest example. The metrics below come from the linked Python notebooks and depend on the dataset and implementation.







Download and extract the [TypeScript samples and locked dependencies](https://developers.openai.com/api/docs/samples/typescript.tar.gz). From the extracted `typescript-examples` directory, install with `pnpm install --ignore-workspace --frozen-lockfile`. Run each complete analysis program separately with `node --experimental-strip-types embeddings/<filename>.ts` from that directory.

The programs read `output/embedded_1k_reviews.csv` with JSON arrays in `ada_embedding` and numeric review ratings in `Score`. Grouped averages also require `UserId` and `ProductId`. Each program loads its own input; do not concatenate the excerpts. The linked Python notebooks supply the metrics below. Results from the TypeScript algorithms can differ from those metrics, and t-SNE coordinates can vary between runs.




To load the data from a saved file, you can run the following:

Load saved embeddings

```typescript
import { readFile } from "node:fs/promises";
import { parse } from "csv-parse/sync";

const records: { Score: string; ada_embedding: string }[] = parse(
  await readFile("output/embedded_1k_reviews.csv", "utf8"),
  { columns: true, skip_empty_lines: true }
);
const rows = records.map((row) => ({
  score: Number(row.Score),
  embedding: JSON.parse(row.ada_embedding) as number[],
}));
if (!rows.length) throw new Error("No embeddings");
const dimensions = rows[0].embedding.length;
for (const row of rows) {
  if (
    !Number.isFinite(row.score) ||
    !Array.isArray(row.embedding) ||
    !dimensions ||
    row.embedding.length !== dimensions ||
    !row.embedding.every(Number.isFinite)
  ) {
    throw new Error(
      "Expected finite scores and embeddings with consistent dimensions"
    );
  }
}
console.log(rows);
```

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

```java
import com.fasterxml.jackson.databind.ObjectMapper;
import java.nio.file.*;
import java.util.*;
import org.apache.commons.csv.*;

var vectors = new ArrayList<List<Double>>();
try (var csv =
    CSVFormat.DEFAULT
        .builder()
        .setHeader()
        .setSkipHeaderRecord(true)
        .get()
        .parse(Files.newBufferedReader(Path.of("output/embedded_1k_reviews.csv")))) {
  for (var row : csv) {
    List<Double> vector =
        new ObjectMapper()
            .readValue(
                row.get("ada_embedding"),
                new com.fasterxml.jackson.core.type.TypeReference<List<Double>>() {});
    if (vector.stream().anyMatch(v -> v == null || !Double.isFinite(v)))
      throw new IllegalArgumentException("Invalid embedding");
    vectors.add(vector);
  }
}
System.out.println(vectors.get(0));
```

```csharp
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using Microsoft.VisualBasic.FileIO;

namespace OpenAI.Docs.Examples.Embeddings.LoadSavedEmbeddingsSample;

internal static class LoadSavedEmbeddings
{

internal static List<double[]> LoadVectors()
    {
        // Use the CSV saved by the review-embedding example.
        List<double[]> vectors = [];
        foreach (Dictionary<string, string> row in ReadCsv("output/embedded_1k_reviews.csv", "ada_embedding"))
        {
            double[] vector = DecodeVector(row["ada_embedding"]);
            if (vectors.Count > 0 && vector.Length != vectors[0].Length)
            {
                throw new InvalidDataException("Embedding dimensions differ.");
            }
            vectors.Add(vector);
        }
        if (vectors.Count == 0)
        {
            throw new InvalidDataException("The CSV contains no embeddings.");
        }

        Console.WriteLine(JsonSerializer.Serialize(vectors[0]));
        return vectors;
    }
    private static IEnumerable<Dictionary<string, string>> ReadCsv(string path, params string[] requiredColumns)
    {
        using TextFieldParser parser = new(path)
        {
            TextFieldType = FieldType.Delimited,
            HasFieldsEnclosedInQuotes = true,
            TrimWhiteSpace = false,
        };
        parser.SetDelimiters(",");
        string[] headers = parser.ReadFields()
            ?? throw new InvalidDataException("The CSV has no header.");
        if (headers.Distinct(StringComparer.Ordinal).Count() != headers.Length
            || requiredColumns.Any(column => !headers.Contains(column, StringComparer.Ordinal)))
        {
            throw new InvalidDataException("The CSV has duplicate headers or missing required columns.");
        }

        while (!parser.EndOfData)
        {
            string[] fields = parser.ReadFields()
                ?? throw new InvalidDataException("The CSV record is missing.");
            if (fields.Length != headers.Length)
            {
                throw new InvalidDataException($"CSV record near line {parser.LineNumber} has the wrong field count.");
            }

            Dictionary<string, string> row = new(StringComparer.Ordinal);
            for (int i = 0; i < headers.Length; i++)
            {
                row.Add(headers[i], fields[i]);
            }
            yield return row;
        }
    }

    private static double[] DecodeVector(string json)
    {
        double[] vector = JsonSerializer.Deserialize<double[]>(json)
            ?? throw new InvalidDataException("An embedding is null.");
        if (vector.Length == 0 || vector.Any(value => !double.IsFinite(value)))
        {
            throw new InvalidDataException("Embeddings must contain finite numbers and at least one dimension.");
        }
        return vector;
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



The model may not have learned the facts you want it to use when responding to a user query. One way of solving this, as shown below, is to put additional information into the context window of the model. This is effective in many use cases but leads to higher token costs. In this notebook, we explore the tradeoff between this approach and embedding-based search.

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




The Go plotting example uses `github.com/danaugrs/go-tsne/tsne`, `gonum.org/v1/gonum`, and `gonum.org/v1/plot`. It writes `local-plot.png` and prints the transformed coordinates and rating-color indices.




Visualize embeddings with t-SNE

```typescript
import { readFile } from "node:fs/promises";
import { parse } from "csv-parse/sync";

const records: {
  Score: string;
  ada_embedding: string;
  UserId: string;
  ProductId: string;
}[] = parse(await readFile("output/embedded_1k_reviews.csv", "utf8"), {
  columns: true,
  skip_empty_lines: true,
});
const rows = records.map((row) => ({
  score: Number(row.Score),
  embedding: JSON.parse(row.ada_embedding) as number[],
  userID: row.UserId,
  productID: row.ProductId,
}));
if (!rows.length) throw new Error("No reviews");
const dimensions = rows[0].embedding.length;
for (const row of rows) {
  if (
    !Number.isFinite(row.score) ||
    !Array.isArray(row.embedding) ||
    !dimensions ||
    row.embedding.length !== dimensions ||
    !row.embedding.every(Number.isFinite)
  ) {
    throw new Error(
      "Expected finite scores and embeddings with consistent dimensions"
    );
  }
}

import TSNE from "tsne-js";
import { createCanvas } from "@napi-rs/canvas";
import { writeFile } from "node:fs/promises";

const model = new TSNE({
  dim: 2,
  perplexity: 15,
  learningRate: 200,
  nIter: 1000,
  metric: "euclidean",
});
model.init({ data: rows.map((row) => row.embedding), type: "dense" });
model.run();
const points = model.getOutput();
const colors = ["red", "darkorange", "gold", "turquoise", "darkgreen"];
const colorIndices = rows.map((row) => row.score - 1);
const canvas = createCanvas(800, 600);
const context = canvas.getContext("2d");
context.fillStyle = "white";
context.fillRect(0, 0, 800, 600);
context.fillStyle = "black";
context.font = "20px sans-serif";
context.fillText("Amazon ratings visualized using t-SNE", 40, 30);
const xs = points.map((point) => point[0]);
const ys = points.map((point) => point[1]);
const minX = Math.min(...xs),
  maxX = Math.max(...xs);
const minY = Math.min(...ys),
  maxY = Math.max(...ys);
const plotted: number[][] = [];
for (const [index, point] of points.entries()) {
  if (point.length !== 2 || !point.every(Number.isFinite))
    throw new Error("Invalid t-SNE point");
  const x = 40 + ((point[0] - minX) / (maxX - minX || 1)) * 720;
  const y = 560 - ((point[1] - minY) / (maxY - minY || 1)) * 500;
  context.fillStyle = colors[colorIndices[index]];
  context.globalAlpha = 0.3;
  context.beginPath();
  context.arc(x, y, 6, 0, Math.PI * 2);
  context.fill();
  plotted.push(point);
}
await writeFile("local-plot.png", await canvas.encode("png"));
```

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

```java
import com.fasterxml.jackson.databind.ObjectMapper;
import java.nio.file.*;
import java.util.*;
import org.apache.commons.csv.*;
import smile.manifold.TSNE;

var vectors = new ArrayList<double[]>();
var colors = new ArrayList<Integer>();
try (var csv =
    CSVFormat.DEFAULT
        .builder()
        .setHeader()
        .setSkipHeaderRecord(true)
        .get()
        .parse(Files.newBufferedReader(Path.of("output/embedded_1k_reviews.csv")))) {
  for (var row : csv) {
    vectors.add(new ObjectMapper().readValue(row.get("ada_embedding"), double[].class));
    colors.add(Integer.parseInt(row.get("Score")) - 1);
  }
}
if (vectors.size() < 4)
  throw new IllegalArgumentException("Provide at least four labeled reviews.");
smile.math.MathEx.setSeed(42);
var tsne =
    new TSNE(
        vectors.toArray(double[][]::new), 2, Math.min(15, (vectors.size() - 1) / 3), 200, 1000);
var points = tsne.coordinates;
var image =
    new java.awt.image.BufferedImage(640, 480, java.awt.image.BufferedImage.TYPE_INT_RGB);
var graphics = image.createGraphics();
var plotted = new ArrayList<double[]>();
try {
  graphics.setColor(java.awt.Color.WHITE);
  graphics.fillRect(0, 0, 640, 480);
  var palette =
      new java.awt.Color[] {
        java.awt.Color.RED,
        java.awt.Color.ORANGE,
        java.awt.Color.YELLOW,
        java.awt.Color.CYAN,
        java.awt.Color.GREEN
      };
  double minX = Arrays.stream(points).mapToDouble(p -> p[0]).min().orElseThrow(),
      maxX = Arrays.stream(points).mapToDouble(p -> p[0]).max().orElseThrow();
  double minY = Arrays.stream(points).mapToDouble(p -> p[1]).min().orElseThrow(),
      maxY = Arrays.stream(points).mapToDouble(p -> p[1]).max().orElseThrow();
  for (int i = 0; i < points.length; i++) {
    var point = points[i];
    int x = 20 + (int) (600 * (point[0] - minX) / Math.max(1e-12, maxX - minX));
    int y = 20 + (int) (440 * (point[1] - minY) / Math.max(1e-12, maxY - minY));
    graphics.setColor(palette[colors.get(i)]);
    graphics.fillOval(x - 3, y - 3, 6, 6);
    plotted.add(point);
  }
} finally {
  graphics.dispose();
}
javax.imageio.ImageIO.write(image, "png", Path.of("local-plot.png").toFile());
```

```csharp
using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using Microsoft.VisualBasic.FileIO;

// The included illustrative CSV has been retaining Score, UserId and ProductId
// beside each corresponding ada_embedding. The basic embedding producer has
// been writing only combined and ada_embedding to a different output file.
// Real-data preparation has been preserving these review fields when attaching
// each generated vector; this example has been reading that labeled schema.

var (matrix, scores) = ReadReviews("data/illustrative-review-embeddings.csv");
// Exact t-SNE uses all pairwise affinities. Its quadratic cost is suitable
// for this 1,000-review tutorial, rather than very large datasets.
double[][] points = FitTsne(matrix, perplexity: 15, seed: 42, learningRate: 200);

WritePlot(points, scores, "local-plot.svg");

static double[][] FitTsne(double[][] matrix, double perplexity, int seed, double learningRate)
{
    int n = matrix.Length;
    if (perplexity < 1 || n <= perplexity || !double.IsFinite(perplexity) ||
        learningRate <= 0 || !double.IsFinite(learningRate))
    {
        throw new ArgumentException("Perplexity must be at least one and smaller than the row count; learning rate must be positive and finite.");
    }

    double[,] probabilities = JointProbabilities(matrix, perplexity);
    Random random = new(seed);
    double[][] points = Enumerable.Range(0, n).Select(_ => new[]
    {
        Gaussian(random) * 1e-4, Gaussian(random) * 1e-4,
    }).ToArray();
    double[,] velocity = new double[n, 2];
    double[,] gains = new double[n, 2];
    for (int i = 0; i < n; i++)
    {
        gains[i, 0] = gains[i, 1] = 1;
    }

    double[,] numerators = new double[n, n];
    double[,] gradient = new double[n, 2];
    for (int iteration = 0; iteration < 1000; iteration++)
    {
        Array.Clear(gradient);
        double normalization = 0;
        for (int i = 0; i < n; i++)
        {
            for (int j = i + 1; j < n; j++)
            {
                double dx = points[i][0] - points[j][0];
                double dy = points[i][1] - points[j][1];
                double numerator = 1 / (1 + dx * dx + dy * dy);
                numerators[i, j] = numerator;
                normalization += 2 * numerator;
            }
        }

        if (!double.IsFinite(normalization) || normalization <= 0)
        {
            throw new InvalidOperationException("The t-SNE affinity normalization is not finite and positive.");
        }

        // Student-t affinities and the exact gradient of KL(P || Q).
        // Early exaggeration and momentum follow the common t-SNE schedule.
        double exaggeration = iteration < 250 ? 12 : 1;
        for (int i = 0; i < n; i++)
        {
            for (int j = i + 1; j < n; j++)
            {
                double numerator = numerators[i, j];
                double q = numerator / normalization;
                double factor = 4 * (exaggeration * probabilities[i, j] - q) * numerator;
                for (int d = 0; d < 2; d++)
                {
                    double contribution = factor * (points[i][d] - points[j][d]);
                    gradient[i, d] += contribution;
                    gradient[j, d] -= contribution;
                }
            }
        }

        double momentum = iteration < 250 ? 0.5 : 0.8;
        for (int i = 0; i < n; i++)
        {
            for (int d = 0; d < 2; d++)
            {
                gains[i, d] = Math.Sign(gradient[i, d]) != Math.Sign(velocity[i, d])
                    ? gains[i, d] + 0.2 : Math.Max(0.01, gains[i, d] * 0.8);
                velocity[i, d] = momentum * velocity[i, d] - learningRate * gains[i, d] * gradient[i, d];
                points[i][d] += velocity[i, d];
                if (!double.IsFinite(points[i][d]))
                {
                    throw new InvalidOperationException("The t-SNE optimization produced nonfinite coordinates.");
                }
            }
        }

        for (int d = 0; d < 2; d++)
        {
            double center = points.Average(point => point[d]);
            foreach (double[] point in points)
            {
                point[d] -= center;
            }
        }
    }

    return points;
}

// Binary-search a Gaussian precision per input vector until each conditional
// distribution has entropy log(perplexity), then symmetrize over both directions.
static double[,] JointProbabilities(double[][] matrix, double perplexity)
{
    int n = matrix.Length;
    double[,] conditional = new double[n, n];
    double targetEntropy = Math.Log(perplexity);
    for (int i = 0; i < n; i++)
    {
        double[] distances = new double[n];
        double minimum = double.PositiveInfinity;
        for (int j = 0; j < n; j++)
        {
            if (i == j)
            {
                continue;
            }

            double distance = 0;
            for (int d = 0; d < matrix[i].Length; d++)
            {
                double delta = matrix[i][d] - matrix[j][d];
                distance += delta * delta;
            }

            if (!double.IsFinite(distance))
            {
                throw new InvalidDataException("Embedding distances overflowed; rescale the input.");
            }

            distances[j] = distance;
            minimum = Math.Min(minimum, distance);
        }

        // Subtract the nearest distance before exponentiation to avoid
        // underflow of every affinity when the Gaussian is very narrow.
        double beta = 1, lower = 0, upper = double.PositiveInfinity;
        bool converged = false;
        for (int attempt = 0; attempt < 100; attempt++)
        {
            double total = 0;
            for (int j = 0; j < n; j++)
            {
                conditional[i, j] = i == j ? 0 : Math.Exp(-beta * (distances[j] - minimum));
                total += conditional[i, j];
            }

            double entropy = 0;
            for (int j = 0; j < n; j++)
            {
                conditional[i, j] /= total;
                double p = conditional[i, j];
                if (p > 0)
                {
                    entropy -= p * Math.Log(p);
                }
            }

            double error = entropy - targetEntropy;
            if (Math.Abs(error) < 1e-5)
            {
                converged = true;
                break;
            }

            if (error > 0)
            {
                lower = beta;
                beta = double.IsPositiveInfinity(upper) ? beta * 2 : (beta + upper) / 2;
            }
            else
            {
                upper = beta;
                beta = (beta + lower) / 2;
            }
        }

        if (!converged)
        {
            throw new InvalidDataException("Cannot achieve perplexity 15 for these distances; inspect duplicate or degenerate embeddings.");
        }
    }

    double[,] joint = new double[n, n];
    for (int i = 0; i < n; i++)
    {
        for (int j = i + 1; j < n; j++)
        {
            joint[i, j] = joint[j, i] = (conditional[i, j] + conditional[j, i]) / (2 * n);
        }
    }

    return joint;
}

static double Gaussian(Random random)
{
    double radius = Math.Sqrt(-2 * Math.Log(1 - random.NextDouble()));
    return radius * Math.Cos(2 * Math.PI * random.NextDouble());
}

static void WritePlot(double[][] points, int[] scores, string path)
{
    // SVG keeps the plot portable across Linux, macOS, and Windows without
    // a platform-specific graphics package. Preserve labels in the artifact.
    System.Xml.Linq.XNamespace svg = "http://www.w3.org/2000/svg";
    System.Xml.Linq.XElement image = new(svg + "svg",
        new System.Xml.Linq.XAttribute("width", 640),
        new System.Xml.Linq.XAttribute("height", 480),
        new System.Xml.Linq.XAttribute("viewBox", "0 0 640 480"),
        new System.Xml.Linq.XElement(svg + "title", "Review embeddings colored by score"),
        new System.Xml.Linq.XElement(svg + "rect",
            new System.Xml.Linq.XAttribute("width", 640),
            new System.Xml.Linq.XAttribute("height", 480),
            new System.Xml.Linq.XAttribute("fill", "white")));
    string[] palette = ["#e41a1c", "#ff7f00", "#d4af00", "#00a6ca", "#238b45"];
    double minX = points.Min(point => point[0]), maxX = points.Max(point => point[0]);
    double minY = points.Min(point => point[1]), maxY = points.Max(point => point[1]);
    for (int i = 0; i < points.Length; i++)
    {
        double x = 20 + 600 * (points[i][0] - minX) / Math.Max(1e-12, maxX - minX);
        double y = 440 - 400 * (points[i][1] - minY) / Math.Max(1e-12, maxY - minY);
        image.Add(new System.Xml.Linq.XElement(svg + "circle",
            new System.Xml.Linq.XAttribute("cx", x.ToString("R", CultureInfo.InvariantCulture)),
            new System.Xml.Linq.XAttribute("cy", y.ToString("R", CultureInfo.InvariantCulture)),
            new System.Xml.Linq.XAttribute("r", 3),
            new System.Xml.Linq.XAttribute("fill", palette[scores[i] - 1]),
            new System.Xml.Linq.XAttribute("data-score", scores[i]),
            new System.Xml.Linq.XAttribute("data-review", i)));
    }

    for (int rating = 1; rating <= 5; rating++)
    {
        image.Add(new System.Xml.Linq.XElement(svg + "text",
            new System.Xml.Linq.XAttribute("x", 20 + (rating - 1) * 120),
            new System.Xml.Linq.XAttribute("y", 470),
            new System.Xml.Linq.XAttribute("fill", palette[rating - 1]),
            new System.Xml.Linq.XAttribute("font-size", 14),
            $"Score {rating}"));
    }

    new System.Xml.Linq.XDocument(image).Save(path);
}

// Read the CSV produced by the review-embedding workflow. TextFieldParser
// handles quoted JSON vectors, commas, escaped quotes, and multiline reviews.
static (double[][] Vectors, int[] Scores) ReadReviews(string path)
{
    using TextFieldParser csv = new(path);
    csv.TextFieldType = FieldType.Delimited;
    csv.SetDelimiters(",");
    csv.HasFieldsEnclosedInQuotes = true;
    string[] header = csv.ReadFields() ?? throw new InvalidDataException("The CSV is empty.");
    int embeddingColumn = Array.IndexOf(header, "ada_embedding");
    int scoreColumn = Array.IndexOf(header, "Score");
    if (embeddingColumn < 0 || scoreColumn < 0)
    {
        throw new InvalidDataException("Expected ada_embedding and Score columns.");
    }

    List<double[]> vectors = [];
    List<int> scores = [];
    while (!csv.EndOfData)
    {
        string[] row = csv.ReadFields() ?? throw new InvalidDataException("Missing CSV row.");
        if (row.Length != header.Length)
        {
            throw new InvalidDataException("The CSV row does not match its header.");
        }

        double[] vector = JsonSerializer.Deserialize<double[]>(row[embeddingColumn])
            ?? throw new InvalidDataException("A review has no embedding.");
        if (vector.Length == 0 || vector.Any(value => !double.IsFinite(value)) ||
            (vectors.Count > 0 && vector.Length != vectors[0].Length))
        {
            throw new InvalidDataException("Embeddings must be finite vectors of equal nonzero length.");
        }

        int score = int.Parse(row[scoreColumn], CultureInfo.InvariantCulture);
        if (score is < 1 or > 5)
        {
            throw new InvalidDataException("Review scores must be integers from 1 through 5.");
        }

        vectors.Add(vector);
        scores.Add(score);
    }

    if (vectors.Count == 0)
    {
        throw new InvalidDataException("The CSV has no reviews.");
    }

    return (vectors.ToArray(), scores.ToArray());
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




The Java split takes a `double[][] vectors` array and a matching `int[] scores` array from your labeled reviews. It returns primitive arrays that both model examples can use; the regression example converts the integer ratings to continuous targets.




Split the dataset for training and testing

```typescript
import { readFile } from "node:fs/promises";
import { parse } from "csv-parse/sync";

const records: {
  Score: string;
  ada_embedding: string;
  UserId: string;
  ProductId: string;
}[] = parse(await readFile("output/embedded_1k_reviews.csv", "utf8"), {
  columns: true,
  skip_empty_lines: true,
});
const rows = records.map((row) => ({
  score: Number(row.Score),
  embedding: JSON.parse(row.ada_embedding) as number[],
  userID: row.UserId,
  productID: row.ProductId,
}));
if (!rows.length) throw new Error("No reviews");
const dimensions = rows[0].embedding.length;
for (const row of rows) {
  if (
    !Number.isFinite(row.score) ||
    !Array.isArray(row.embedding) ||
    !dimensions ||
    row.embedding.length !== dimensions ||
    !row.embedding.every(Number.isFinite)
  ) {
    throw new Error(
      "Expected finite scores and embeddings with consistent dimensions"
    );
  }
}

// Shuffle whole rows so labels stay paired with their embedding vectors.
const shuffled = [...rows];
let seed = 42;
for (let i = shuffled.length - 1; i > 0; i--) {
  seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
  const j = Math.floor((seed / 2 ** 32) * (i + 1));
  [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
}
const testSize = Math.ceil(shuffled.length * 0.2);
const testRows = shuffled.slice(0, testSize);
const trainRows = shuffled.slice(testSize);
const trainVectors = trainRows.map((row) => row.embedding);
const trainScores = trainRows.map((row) => row.score);
const testVectors = testRows.map((row) => row.embedding);
const testScores = testRows.map((row) => row.score);
```

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

```java
import com.fasterxml.jackson.databind.ObjectMapper;
import java.nio.file.Path;
import java.util.*;

// Shuffle paired examples once so each vector stays aligned with its score.
var indices = new ArrayList<Integer>();
for (int i = 0; i < vectors.length; i++) indices.add(i);
Collections.shuffle(indices, new Random(42));
int testSize = (int) Math.ceil(vectors.length * 0.2);
var testIndices = indices.subList(0, testSize);
var trainIndices = indices.subList(testSize, indices.size());
var xTrain = trainIndices.stream().map(i -> vectors[i]).toArray(double[][]::new);
var xTest = testIndices.stream().map(i -> vectors[i]).toArray(double[][]::new);
var yTrain = trainIndices.stream().mapToInt(i -> scores[i]).toArray();
var yTest = testIndices.stream().mapToInt(i -> scores[i]).toArray();
System.out.println("Training examples: " + xTrain.length);
System.out.println("Test examples: " + xTest.length);


```

```csharp
using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using Microsoft.VisualBasic.FileIO;

var (yTrain, yTest, xTrain, xTest) = SplitDataset();

// The included illustrative CSV has been retaining Score, UserId and ProductId
// beside each corresponding ada_embedding. The basic embedding producer has
// been writing only combined and ada_embedding to a different output file.
// Real-data preparation has been preserving these review fields when attaching
// each generated vector; this example has been reading that labeled schema.
static (int[] Train, int[] Test, double[][] TrainVectors, double[][] TestVectors) SplitDataset()
{
    List<double[]> vectors = [];
    List<int> scores = [];
    foreach (Dictionary<string, string> row in ReadCsv(
        "data/illustrative-review-embeddings.csv", "ada_embedding", "Score"))
    {
        double[] vector = DecodeVector(row["ada_embedding"]);
        if (vectors.Count > 0 && vector.Length != vectors[0].Length)
        {
            throw new InvalidDataException("Embedding dimensions differ.");
        }
        int score = int.Parse(row["Score"], NumberStyles.Integer, CultureInfo.InvariantCulture);
        vectors.Add(vector);
        scores.Add(score);
    }
    if (vectors.Count < 2)
    {
        throw new InvalidDataException("Splitting requires at least two reviews.");
    }

    // Shuffle row indices once to preserve vector/score alignment.
    // Seed 42 is repeatable in this .NET runtime, not identical to Python's permutation.
    int[] indices = Enumerable.Range(0, vectors.Count).ToArray();
    Random random = new(42);
    for (int i = indices.Length - 1; i > 0; i--)
    {
        int j = random.Next(i + 1);
        (indices[i], indices[j]) = (indices[j], indices[i]);
    }
    int testSize = (int)Math.Ceiling(vectors.Count * 0.2);
    int[] testIndices = indices[..testSize];
    int[] trainIndices = indices[testSize..];
    double[][] xTrain = trainIndices.Select(index => vectors[index]).ToArray();
    double[][] xTest = testIndices.Select(index => vectors[index]).ToArray();
    int[] yTrain = trainIndices.Select(index => scores[index]).ToArray();
    int[] yTest = testIndices.Select(index => scores[index]).ToArray();
    Console.WriteLine($"Training examples: {xTrain.Length}");
    Console.WriteLine($"Test examples: {xTest.Length}");
    return (yTrain, yTest, xTrain, xTest);
}
static IEnumerable<Dictionary<string, string>> ReadCsv(string path, params string[] requiredColumns)
{
    using TextFieldParser parser = new(path)
    {
        TextFieldType = FieldType.Delimited,
        HasFieldsEnclosedInQuotes = true,
        TrimWhiteSpace = false,
    };
    parser.SetDelimiters(",");
    string[] headers = parser.ReadFields()
        ?? throw new InvalidDataException("The CSV has no header.");
    if (headers.Distinct(StringComparer.Ordinal).Count() != headers.Length
        || requiredColumns.Any(column => !headers.Contains(column, StringComparer.Ordinal)))
    {
        throw new InvalidDataException("The CSV has duplicate headers or missing required columns.");
    }

    while (!parser.EndOfData)
    {
        string[] fields = parser.ReadFields()
            ?? throw new InvalidDataException("The CSV record is missing.");
        if (fields.Length != headers.Length)
        {
            throw new InvalidDataException($"CSV record near line {parser.LineNumber} has the wrong field count.");
        }

        Dictionary<string, string> row = new(StringComparer.Ordinal);
        for (int i = 0; i < headers.Length; i++)
        {
            row.Add(headers[i], fields[i]);
        }
        yield return row;
    }
}

static double[] DecodeVector(string json)
{
    double[] vector = JsonSerializer.Deserialize<double[]>(json)
        ?? throw new InvalidDataException("An embedding is null.");
    if (vector.Length == 0 || vector.Any(value => !double.IsFinite(value)))
    {
        throw new InvalidDataException("Embeddings must contain finite numbers and at least one dimension.");
    }
    return vector;
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




The Go example uses `github.com/wlattner/rf/forest`. It fits 100 trees on the training partition and predicts the held-out rows. Install the module before running the program.




Predict review scores

```typescript
import { readFile } from "node:fs/promises";
import { parse } from "csv-parse/sync";

const records: {
  Score: string;
  ada_embedding: string;
  UserId: string;
  ProductId: string;
}[] = parse(await readFile("output/embedded_1k_reviews.csv", "utf8"), {
  columns: true,
  skip_empty_lines: true,
});
const rows = records.map((row) => ({
  score: Number(row.Score),
  embedding: JSON.parse(row.ada_embedding) as number[],
  userID: row.UserId,
  productID: row.ProductId,
}));
if (!rows.length) throw new Error("No reviews");
const dimensions = rows[0].embedding.length;
for (const row of rows) {
  if (
    !Number.isFinite(row.score) ||
    !Array.isArray(row.embedding) ||
    !dimensions ||
    row.embedding.length !== dimensions ||
    !row.embedding.every(Number.isFinite)
  ) {
    throw new Error(
      "Expected finite scores and embeddings with consistent dimensions"
    );
  }
}

// Shuffle whole rows so labels stay paired with their embedding vectors.
const shuffled = [...rows];
let seed = 42;
for (let i = shuffled.length - 1; i > 0; i--) {
  seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
  const j = Math.floor((seed / 2 ** 32) * (i + 1));
  [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
}
const testSize = Math.ceil(shuffled.length * 0.2);
const testRows = shuffled.slice(0, testSize);
const trainRows = shuffled.slice(testSize);
const trainVectors = trainRows.map((row) => row.embedding);
const trainScores = trainRows.map((row) => row.score);
const testVectors = testRows.map((row) => row.embedding);
const testScores = testRows.map((row) => row.score);

import { RandomForestRegression } from "ml-random-forest";
const forest = new RandomForestRegression({
  nEstimators: 100,
  seed: 42,
  maxFeatures: trainVectors[0].length,
  // Evaluate on the held-out test rows instead of out-of-bag samples.
  noOOB: true,
});
forest.train(trainVectors, trainScores);
const predictions = forest.predict(testVectors);
console.log(predictions);
```

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

```java
import com.fasterxml.jackson.databind.ObjectMapper;
import java.nio.file.*;
import java.util.*;
import org.apache.commons.csv.*;
import smile.data.DataFrame;
import smile.data.formula.Formula;
import smile.data.vector.DoubleVector;
import smile.regression.RandomForest;

smile.math.MathEx.setSeed(42);
String[] columns =
    java.util.stream.IntStream.range(0, xTrain[0].length)
        .mapToObj(index -> "embedding_" + index)
        .toArray(String[]::new);
var training =
    DataFrame.of(xTrain, columns)
        .merge(DoubleVector.of("score", Arrays.stream(yTrain).asDoubleStream().toArray()));
var options = new Properties();
options.setProperty("smile.random_forest.trees", "100");
options.setProperty("smile.random_forest.node_size", "1");
options.setProperty("smile.random_forest.max_nodes", "4");
var forest = RandomForest.fit(Formula.lhs("score"), training, options);
var test = DataFrame.of(xTest, columns);
var predictions = new ArrayList<Number>();
for (int i = 0; i < test.nrow(); i++) predictions.add(forest.predict(test.get(i)));
System.out.println(predictions);
```

```csharp
using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using Microsoft.VisualBasic.FileIO;

// The included illustrative CSV has been retaining Score, UserId and ProductId
// beside each corresponding ada_embedding. The basic embedding producer has
// been writing only combined and ada_embedding to a different output file.
// Real-data preparation has been preserving these review fields when attaching
// each generated vector; this example has been reading that labeled schema.

var (vectors, scores) = ReadReviews("data/illustrative-review-embeddings.csv");
var (trainIndices, testIndices) = Split(vectors.Length, testFraction: 0.2, seed: 42);
double[][] xTrain = trainIndices.Select(i => vectors[i]).ToArray();
int[] yTrain = trainIndices.Select(i => scores[i]).ToArray();
double[][] xTest = testIndices.Select(i => vectors[i]).ToArray();
int[] yTest = testIndices.Select(i => scores[i]).ToArray();
Node[] forest = FitForest(xTrain, yTrain);
double[] predictions = Predict(forest, xTest);
double meanSquaredError = predictions.Zip(yTest)
    .Average(pair => Math.Pow(pair.First - pair.Second, 2));
Console.WriteLine(JsonSerializer.Serialize(predictions));

static Node[] FitForest(double[][] xTrain, int[] yTrain)
{
    Random random = new(42);
    return Enumerable.Range(0, 100).Select(treeIndex =>
    {
        int[] bootstrap = Enumerable.Range(0, xTrain.Length)
            .Select(rowIndex => random.Next(xTrain.Length)).ToArray();
        return GrowTree(xTrain, yTrain, bootstrap, random);
    }).ToArray();
}

static double[] Predict(Node[] forest, double[][] vectors) =>
    vectors.Select(row => forest.Average(tree => Leaf(tree, row).Value)).ToArray();


static Node Leaf(Node tree, double[] row)
{
    while (tree.Feature >= 0)
    {
        tree = row[tree.Feature] <= tree.Threshold ? tree.Left! : tree.Right!;
    }

    return tree;
}

// Bootstrap CART trees: search exact thresholds between distinct feature
// values. The split criterion is the sum of squared residuals.
static Node GrowTree(double[][] x, int[] y, int[] rows, Random random)
{
    double mean = rows.Average(row => (double)y[row]);
    if (rows.Length < 2 || rows.All(row => y[row] == y[rows[0]]))
    {
        return new Node { Value = mean };
    }

    int[] features = Enumerable.Range(0, x[0].Length).ToArray();
    random.Shuffle(features);
    int featureCount = features.Length;
    int bestFeature = -1;
    double bestThreshold = 0;
    double bestLoss = double.PositiveInfinity;
    // If all randomly selected features are constant, inspect further
    // features until at least one valid partition has been found.
    for (int f = 0; f < features.Length && (f < featureCount || bestFeature < 0); f++)
    {
        int feature = features[f];
        int[] ordered = rows.OrderBy(row => x[row][feature]).ToArray();
        double leftSum = 0, leftSquaredSum = 0;
        double rightSum = rows.Sum(row => (double)y[row]);
        double rightSquaredSum = rows.Sum(row => (double)y[row] * y[row]);
        for (int split = 1; split < ordered.Length; split++)
        {
            int score = y[ordered[split - 1]];
            leftSum += score;
            rightSum -= score;
            leftSquaredSum += score * score;
            rightSquaredSum -= score * score;
            double lower = x[ordered[split - 1]][feature];
            double upper = x[ordered[split]][feature];
            if (lower == upper)
            {
                continue;
            }

            int rightCount = ordered.Length - split;
            double loss = leftSquaredSum - leftSum * leftSum / split
                + rightSquaredSum - rightSum * rightSum / rightCount;
            if (loss < bestLoss)
            {
                bestLoss = loss;
                bestFeature = feature;
                // A rounded midpoint must remain strictly below upper.
                bestThreshold = lower / 2 + upper / 2;
                if (bestThreshold >= upper)
                {
                    bestThreshold = lower;
                }
            }
        }
    }

    if (bestFeature < 0)
    {
        return new Node { Value = mean };
    }

    int[] left = rows.Where(row => x[row][bestFeature] <= bestThreshold).ToArray();
    int[] right = rows.Where(row => x[row][bestFeature] > bestThreshold).ToArray();
    return new Node
    {
        Feature = bestFeature,
        Threshold = bestThreshold,
        Left = GrowTree(x, y, left, random),
        Right = GrowTree(x, y, right, random),
    };
}

static (int[] Train, int[] Test) Split(int count, double testFraction, int seed)
{
    int testCount = (int)Math.Ceiling(count * testFraction);
    if (testCount < 1 || testCount >= count)
    {
        throw new ArgumentException("Provide enough reviews for nonempty training and test sets.", nameof(count));
    }

    int[] indices = Enumerable.Range(0, count).ToArray();
    Random random = new(seed);
    random.Shuffle(indices);
    return (indices[testCount..], indices[..testCount]);
}

// Read the CSV produced by the review-embedding workflow. TextFieldParser
// handles quoted JSON vectors, commas, escaped quotes, and multiline reviews.
static (double[][] Vectors, int[] Scores) ReadReviews(string path)
{
    using TextFieldParser csv = new(path);
    csv.TextFieldType = FieldType.Delimited;
    csv.SetDelimiters(",");
    csv.HasFieldsEnclosedInQuotes = true;
    string[] header = csv.ReadFields() ?? throw new InvalidDataException("The CSV is empty.");
    int embeddingColumn = Array.IndexOf(header, "ada_embedding");
    int scoreColumn = Array.IndexOf(header, "Score");
    if (embeddingColumn < 0 || scoreColumn < 0)
    {
        throw new InvalidDataException("Expected ada_embedding and Score columns.");
    }

    List<double[]> vectors = [];
    List<int> scores = [];
    while (!csv.EndOfData)
    {
        string[] row = csv.ReadFields() ?? throw new InvalidDataException("Missing CSV row.");
        if (row.Length != header.Length)
        {
            throw new InvalidDataException("The CSV row does not match its header.");
        }

        double[] vector = JsonSerializer.Deserialize<double[]>(row[embeddingColumn])
            ?? throw new InvalidDataException("A review has no embedding.");
        if (vector.Length == 0 || vector.Any(value => !double.IsFinite(value)) ||
            (vectors.Count > 0 && vector.Length != vectors[0].Length))
        {
            throw new InvalidDataException("Embeddings must be finite vectors of equal nonzero length.");
        }

        int score = int.Parse(row[scoreColumn], CultureInfo.InvariantCulture);
        if (score is < 1 or > 5)
        {
            throw new InvalidDataException("Review scores must be integers from 1 through 5.");
        }

        vectors.Add(vector);
        scores.Add(score);
    }

    if (vectors.Count == 0)
    {
        throw new InvalidDataException("The CSV has no reviews.");
    }

    return (vectors.ToArray(), scores.ToArray());
}

sealed class Node
{
    internal int Feature { get; init; } = -1;
    internal double Threshold { get; init; }
    internal double Value { get; init; }
    internal Node? Left { get; init; }
    internal Node? Right { get; init; }
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




The Go example uses `github.com/wlattner/rf/forest`. It fits 100 trees on the training partition and predicts the held-out rows. Install the module before running the program.




Classify review scores

```typescript
import { readFile } from "node:fs/promises";
import { parse } from "csv-parse/sync";

const records: {
  Score: string;
  ada_embedding: string;
  UserId: string;
  ProductId: string;
}[] = parse(await readFile("output/embedded_1k_reviews.csv", "utf8"), {
  columns: true,
  skip_empty_lines: true,
});
const rows = records.map((row) => ({
  score: Number(row.Score),
  embedding: JSON.parse(row.ada_embedding) as number[],
  userID: row.UserId,
  productID: row.ProductId,
}));
if (!rows.length) throw new Error("No reviews");
const dimensions = rows[0].embedding.length;
for (const row of rows) {
  if (
    !Number.isFinite(row.score) ||
    !Array.isArray(row.embedding) ||
    !dimensions ||
    row.embedding.length !== dimensions ||
    !row.embedding.every(Number.isFinite)
  ) {
    throw new Error(
      "Expected finite scores and embeddings with consistent dimensions"
    );
  }
}

// Shuffle whole rows so labels stay paired with their embedding vectors.
const shuffled = [...rows];
let seed = 42;
for (let i = shuffled.length - 1; i > 0; i--) {
  seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
  const j = Math.floor((seed / 2 ** 32) * (i + 1));
  [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
}
const testSize = Math.ceil(shuffled.length * 0.2);
const testRows = shuffled.slice(0, testSize);
const trainRows = shuffled.slice(testSize);
const trainVectors = trainRows.map((row) => row.embedding);
const trainScores = trainRows.map((row) => row.score);
const testVectors = testRows.map((row) => row.embedding);
const testScores = testRows.map((row) => row.score);

import { RandomForestClassifier } from "ml-random-forest";
const forest = new RandomForestClassifier({
  nEstimators: 100,
  seed: 42,
  maxFeatures: trainVectors[0].length,
});
forest.train(trainVectors, trainScores);
const predictions = forest.predict(testVectors);
console.log(predictions);
```

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

```java
import com.fasterxml.jackson.databind.ObjectMapper;
import java.nio.file.*;
import java.util.*;
import org.apache.commons.csv.*;
import smile.classification.RandomForest;
import smile.data.DataFrame;
import smile.data.formula.Formula;
import smile.data.vector.IntVector;

smile.math.MathEx.setSeed(42);
String[] columns =
    java.util.stream.IntStream.range(0, xTrain[0].length)
        .mapToObj(index -> "embedding_" + index)
        .toArray(String[]::new);
var training = DataFrame.of(xTrain, columns).merge(IntVector.of("score", yTrain));
var options = new Properties();
options.setProperty("smile.random_forest.trees", "100");
options.setProperty("smile.random_forest.node_size", "1");
options.setProperty("smile.random_forest.max_nodes", "4");
var forest = RandomForest.fit(Formula.lhs("score"), training, options);
var test = DataFrame.of(xTest, columns);
var predictions = new ArrayList<Number>();
for (int i = 0; i < test.nrow(); i++) predictions.add(forest.predict(test.get(i)));
System.out.println(predictions);
```

```csharp
using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using Microsoft.VisualBasic.FileIO;

// The included illustrative CSV has been retaining Score, UserId and ProductId
// beside each corresponding ada_embedding. The basic embedding producer has
// been writing only combined and ada_embedding to a different output file.
// Real-data preparation has been preserving these review fields when attaching
// each generated vector; this example has been reading that labeled schema.

var (vectors, scores) = ReadReviews("data/illustrative-review-embeddings.csv");
var (trainIndices, testIndices) = Split(vectors.Length, testFraction: 0.2, seed: 42);
double[][] xTrain = trainIndices.Select(i => vectors[i]).ToArray();
int[] yTrain = trainIndices.Select(i => scores[i]).ToArray();
double[][] xTest = testIndices.Select(i => vectors[i]).ToArray();
int[] yTest = testIndices.Select(i => scores[i]).ToArray();
Node[] forest = FitForest(xTrain, yTrain);
int[] classes = yTrain.Distinct().Order().ToArray();
int[] predictions = Predict(forest, xTest, classes);
double accuracy = predictions.Zip(yTest).Count(pair => pair.First == pair.Second) / (double)yTest.Length;
Console.WriteLine(JsonSerializer.Serialize(predictions));

static Node[] FitForest(double[][] xTrain, int[] yTrain)
{
    Random random = new(42);
    return Enumerable.Range(0, 100).Select(treeIndex =>
    {
        int[] bootstrap = Enumerable.Range(0, xTrain.Length)
            .Select(rowIndex => random.Next(xTrain.Length)).ToArray();
        return GrowTree(xTrain, yTrain, bootstrap, random);
    }).ToArray();
}

// Average the fitted multiclass leaf probabilities, then choose the largest.
static int[] Predict(Node[] forest, double[][] vectors, int[] classes) =>
    vectors.Select(row => classes.MaxBy(label =>
        forest.Sum(tree => Leaf(tree, row).Probabilities[label - 1]))).ToArray();


static Node Leaf(Node tree, double[] row)
{
    while (tree.Feature >= 0)
    {
        tree = row[tree.Feature] <= tree.Threshold ? tree.Left! : tree.Right!;
    }

    return tree;
}

// Bootstrap CART trees: search exact thresholds between distinct feature
// values. The split criterion is weighted multiclass Gini impurity.
static Node GrowTree(double[][] x, int[] y, int[] rows, Random random)
{
    double[] counts = new double[5];
    foreach (int row in rows)
    {
        counts[y[row] - 1]++;
    }

    if (rows.Length < 2 || rows.All(row => y[row] == y[rows[0]]))
    {
        return new Node { Probabilities = counts.Select(count => count / rows.Length).ToArray() };
    }

    int[] features = Enumerable.Range(0, x[0].Length).ToArray();
    random.Shuffle(features);
    int featureCount = Math.Max(1, (int)Math.Sqrt(features.Length));
    int bestFeature = -1;
    double bestThreshold = 0;
    double bestLoss = double.PositiveInfinity;
    // If all randomly selected features are constant, inspect further
    // features until at least one valid partition has been found.
    for (int f = 0; f < features.Length && (f < featureCount || bestFeature < 0); f++)
    {
        int feature = features[f];
        int[] ordered = rows.OrderBy(row => x[row][feature]).ToArray();
        double[] leftCounts = new double[5];
        double[] rightCounts = (double[])counts.Clone();
        for (int split = 1; split < ordered.Length; split++)
        {
            int score = y[ordered[split - 1]];
            leftCounts[score - 1]++;
            rightCounts[score - 1]--;
            double lower = x[ordered[split - 1]][feature];
            double upper = x[ordered[split]][feature];
            if (lower == upper)
            {
                continue;
            }

            int rightCount = ordered.Length - split;
            double loss = split - leftCounts.Sum(count => count * count) / split
                + rightCount - rightCounts.Sum(count => count * count) / rightCount;
            if (loss < bestLoss)
            {
                bestLoss = loss;
                bestFeature = feature;
                // A rounded midpoint must remain strictly below upper.
                bestThreshold = lower / 2 + upper / 2;
                if (bestThreshold >= upper)
                {
                    bestThreshold = lower;
                }
            }
        }
    }

    if (bestFeature < 0)
    {
        return new Node { Probabilities = counts.Select(count => count / rows.Length).ToArray() };
    }

    int[] left = rows.Where(row => x[row][bestFeature] <= bestThreshold).ToArray();
    int[] right = rows.Where(row => x[row][bestFeature] > bestThreshold).ToArray();
    return new Node
    {
        Feature = bestFeature,
        Threshold = bestThreshold,
        Left = GrowTree(x, y, left, random),
        Right = GrowTree(x, y, right, random),
    };
}

static (int[] Train, int[] Test) Split(int count, double testFraction, int seed)
{
    int testCount = (int)Math.Ceiling(count * testFraction);
    if (testCount < 1 || testCount >= count)
    {
        throw new ArgumentException("Provide enough reviews for nonempty training and test sets.", nameof(count));
    }

    int[] indices = Enumerable.Range(0, count).ToArray();
    Random random = new(seed);
    random.Shuffle(indices);
    return (indices[testCount..], indices[..testCount]);
}

// Read the CSV produced by the review-embedding workflow. TextFieldParser
// handles quoted JSON vectors, commas, escaped quotes, and multiline reviews.
static (double[][] Vectors, int[] Scores) ReadReviews(string path)
{
    using TextFieldParser csv = new(path);
    csv.TextFieldType = FieldType.Delimited;
    csv.SetDelimiters(",");
    csv.HasFieldsEnclosedInQuotes = true;
    string[] header = csv.ReadFields() ?? throw new InvalidDataException("The CSV is empty.");
    int embeddingColumn = Array.IndexOf(header, "ada_embedding");
    int scoreColumn = Array.IndexOf(header, "Score");
    if (embeddingColumn < 0 || scoreColumn < 0)
    {
        throw new InvalidDataException("Expected ada_embedding and Score columns.");
    }

    List<double[]> vectors = [];
    List<int> scores = [];
    while (!csv.EndOfData)
    {
        string[] row = csv.ReadFields() ?? throw new InvalidDataException("Missing CSV row.");
        if (row.Length != header.Length)
        {
            throw new InvalidDataException("The CSV row does not match its header.");
        }

        double[] vector = JsonSerializer.Deserialize<double[]>(row[embeddingColumn])
            ?? throw new InvalidDataException("A review has no embedding.");
        if (vector.Length == 0 || vector.Any(value => !double.IsFinite(value)) ||
            (vectors.Count > 0 && vector.Length != vectors[0].Length))
        {
            throw new InvalidDataException("Embeddings must be finite vectors of equal nonzero length.");
        }

        int score = int.Parse(row[scoreColumn], CultureInfo.InvariantCulture);
        if (score is < 1 or > 5)
        {
            throw new InvalidDataException("Review scores must be integers from 1 through 5.");
        }

        vectors.Add(vector);
        scores.Add(score);
    }

    if (vectors.Count == 0)
    {
        throw new InvalidDataException("The CSV has no reviews.");
    }

    return (vectors.ToArray(), scores.ToArray());
}

sealed class Node
{
    internal int Feature { get; init; } = -1;
    internal double Threshold { get; init; }
    internal double[] Probabilities { get; init; } = new double[5];
    internal Node? Left { get; init; }
    internal Node? Right { get; init; }
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

```typescript
import { readFile } from "node:fs/promises";
import { parse } from "csv-parse/sync";

const records: {
  Score: string;
  ada_embedding: string;
  UserId: string;
  ProductId: string;
}[] = parse(await readFile("output/embedded_1k_reviews.csv", "utf8"), {
  columns: true,
  skip_empty_lines: true,
});
const rows = records.map((row) => ({
  score: Number(row.Score),
  embedding: JSON.parse(row.ada_embedding) as number[],
  userID: row.UserId,
  productID: row.ProductId,
}));
if (!rows.length) throw new Error("No reviews");
const dimensions = rows[0].embedding.length;
for (const row of rows) {
  if (
    !Number.isFinite(row.score) ||
    !Array.isArray(row.embedding) ||
    !dimensions ||
    row.embedding.length !== dimensions ||
    !row.embedding.every(Number.isFinite)
  ) {
    throw new Error(
      "Expected finite scores and embeddings with consistent dimensions"
    );
  }
}

function averageEmbeddings(
  key: "userID" | "productID"
): Record<string, number[]> {
  const groups = new Map<string, { sum: number[]; count: number }>();
  for (const row of rows) {
    if (!row[key]) throw new Error(`Missing ${key}`);
    const group = groups.get(row[key]) ?? {
      sum: Array(dimensions).fill(0),
      count: 0,
    };
    row.embedding.forEach((value, i) => {
      group.sum[i] += value;
    });
    group.count++;
    groups.set(row[key], group);
  }
  return Object.fromEntries(
    [...groups].map(([id, group]) => [
      id,
      group.sum.map((value) => value / group.count),
    ])
  );
}
const userEmbeddings = averageEmbeddings("userID");
const productEmbeddings = averageEmbeddings("productID");
```

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

```java
import com.fasterxml.jackson.databind.ObjectMapper;
import java.nio.file.*;
import java.util.*;
import org.apache.commons.csv.*;

// vectors is a double[][] with one embedding per review.
// userIds and productIds are String[] columns in the same review-row order.
var users = averageBy(userIds, vectors);
var products = averageBy(productIds, vectors);
System.out.println(new ObjectMapper().writeValueAsString(users));
System.out.println(new ObjectMapper().writeValueAsString(products));

static Map<String, double[]> averageBy(String[] groups, double[][] vectors) {
  var sums = new LinkedHashMap<String, double[]>();
  var counts = new HashMap<String, Integer>();
  for (int i = 0; i < vectors.length; i++) {
    var sum = sums.computeIfAbsent(groups[i], key -> new double[vectors[0].length]);
    if (sum.length != vectors[i].length)
      throw new IllegalArgumentException("Embedding dimensions differ");
    for (int j = 0; j < sum.length; j++) sum[j] += vectors[i][j];
    counts.merge(groups[i], 1, Integer::sum);
  }
  sums.forEach(
      (group, sum) -> {
        for (int j = 0; j < sum.length; j++) sum[j] /= counts.get(group);
      });
  return sums;
}
```

```csharp
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using Microsoft.VisualBasic.FileIO;

namespace OpenAI.Docs.Examples.Embeddings.AverageUserAndProductEmbeddingsSample;

internal static class AverageUserAndProductEmbeddings
{

// The included illustrative CSV has been retaining Score, UserId and ProductId
    // beside each corresponding ada_embedding. The basic embedding producer has
    // been writing only combined and ada_embedding to a different output file.
    // Real-data preparation has been preserving these review fields when attaching
    // each generated vector; this example has been reading that labeled schema.
    internal static (Dictionary<string, double[]> Users, Dictionary<string, double[]> Products) AverageReviews()
    {
        // Preserve the user and product columns alongside each saved review vector.
        List<Review> reviews = [];
        foreach (Dictionary<string, string> row in ReadCsv(
            "data/illustrative-review-embeddings.csv", "UserId", "ProductId", "ada_embedding"))
        {
            if (string.IsNullOrWhiteSpace(row["UserId"]) || string.IsNullOrWhiteSpace(row["ProductId"]))
            {
                throw new InvalidDataException("Each review needs a user ID and product ID.");
            }
            reviews.Add(new Review(row["UserId"], row["ProductId"], DecodeVector(row["ada_embedding"])));
        }
        if (reviews.Count == 0)
        {
            throw new InvalidDataException("The CSV contains no reviews.");
        }

        Dictionary<string, double[]> users = AverageBy(reviews, review => review.UserId);
        Dictionary<string, double[]> products = AverageBy(reviews, review => review.ProductId);
        Console.WriteLine(JsonSerializer.Serialize(users));
        Console.WriteLine(JsonSerializer.Serialize(products));
        return (users, products);
    }
    internal sealed record Review(string UserId, string ProductId, double[] Vector);

    internal static Dictionary<string, double[]> AverageBy(
        List<Review> reviews, Func<Review, string> groupKey)
    {
        int dimensions = reviews[0].Vector.Length;
        Dictionary<string, double[]> means = new(StringComparer.Ordinal);
        foreach (IGrouping<string, Review> group in reviews.GroupBy(groupKey, StringComparer.Ordinal))
        {
            double[] mean = new double[dimensions];
            int count = 0;
            foreach (Review review in group)
            {
                if (review.Vector.Length != dimensions)
                {
                    throw new InvalidDataException("Embedding dimensions differ.");
                }
                count++;
                for (int dimension = 0; dimension < dimensions; dimension++)
                {
                    mean[dimension] += review.Vector[dimension];
                    if (!double.IsFinite(mean[dimension]))
                    {
                        throw new InvalidDataException("The grouped sum exceeds the numeric range.");
                    }
                }
            }
            for (int dimension = 0; dimension < dimensions; dimension++)
            {
                mean[dimension] /= count;
            }
            means.Add(group.Key, mean);
        }
        return means;
    }

    private static IEnumerable<Dictionary<string, string>> ReadCsv(string path, params string[] requiredColumns)
    {
        using TextFieldParser parser = new(path)
        {
            TextFieldType = FieldType.Delimited,
            HasFieldsEnclosedInQuotes = true,
            TrimWhiteSpace = false,
        };
        parser.SetDelimiters(",");
        string[] headers = parser.ReadFields()
            ?? throw new InvalidDataException("The CSV has no header.");
        if (headers.Distinct(StringComparer.Ordinal).Count() != headers.Length
            || requiredColumns.Any(column => !headers.Contains(column, StringComparer.Ordinal)))
        {
            throw new InvalidDataException("The CSV has duplicate headers or missing required columns.");
        }

        while (!parser.EndOfData)
        {
            string[] fields = parser.ReadFields()
                ?? throw new InvalidDataException("The CSV record is missing.");
            if (fields.Length != headers.Length)
            {
                throw new InvalidDataException($"CSV record near line {parser.LineNumber} has the wrong field count.");
            }

            Dictionary<string, string> row = new(StringComparer.Ordinal);
            for (int i = 0; i < headers.Length; i++)
            {
                row.Add(headers[i], fields[i]);
            }
            yield return row;
        }
    }

    private static double[] DecodeVector(string json)
    {
        double[] vector = JsonSerializer.Deserialize<double[]>(json)
            ?? throw new InvalidDataException("An embedding is null.");
        if (vector.Length == 0 || vector.Any(value => !double.IsFinite(value)))
        {
            throw new InvalidDataException("Embeddings must contain finite numbers and at least one dimension.");
        }
        return vector;
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

```typescript
import { readFile } from "node:fs/promises";
import { parse } from "csv-parse/sync";

const records: {
  Score: string;
  ada_embedding: string;
  UserId: string;
  ProductId: string;
}[] = parse(await readFile("output/embedded_1k_reviews.csv", "utf8"), {
  columns: true,
  skip_empty_lines: true,
});
const rows = records.map((row) => ({
  score: Number(row.Score),
  embedding: JSON.parse(row.ada_embedding) as number[],
  userID: row.UserId,
  productID: row.ProductId,
}));
if (!rows.length) throw new Error("No reviews");
const dimensions = rows[0].embedding.length;
for (const row of rows) {
  if (
    !Number.isFinite(row.score) ||
    !Array.isArray(row.embedding) ||
    !dimensions ||
    row.embedding.length !== dimensions ||
    !row.embedding.every(Number.isFinite)
  ) {
    throw new Error(
      "Expected finite scores and embeddings with consistent dimensions"
    );
  }
}

import { kmeans } from "ml-kmeans";

const matrix = rows.map((row) => row.embedding);
const clusters = kmeans(matrix, 4, { seed: 42, initialization: "kmeans++" });
console.log(clusters.clusters);
```

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

```java
import com.fasterxml.jackson.databind.ObjectMapper;
import java.nio.file.*;
import java.util.*;
import org.apache.commons.csv.*;
import smile.clustering.KMeans;

// matrix is a double[][] containing at least four review embeddings.
// Each row must have the same number of dimensions.
smile.math.MathEx.setSeed(42);
var clusters = KMeans.fit(matrix, 4);
System.out.println(Arrays.toString(clusters.y));
```

```csharp
using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using Microsoft.VisualBasic.FileIO;

// The included illustrative CSV has been retaining Score, UserId and ProductId
// beside each corresponding ada_embedding. The basic embedding producer has
// been writing only combined and ada_embedding to a different output file.
// Real-data preparation has been preserving these review fields when attaching
// each generated vector; this example has been reading that labeled schema.

var (matrix, _) = ReadReviews("data/illustrative-review-embeddings.csv");
var (labels, centers) = FitKMeans(matrix, clusterCount: 4, seed: 42);
Console.WriteLine(JsonSerializer.Serialize(labels));

// K-means++ initialization followed by Lloyd's algorithm, with squared
// Euclidean distance and explicit recovery of empty clusters.
static (int[] Labels, double[][] Centers) FitKMeans(
    double[][] matrix, int clusterCount, int seed)
{
    if (matrix.Length < clusterCount || clusterCount < 1)
    {
        throw new ArgumentException("Provide at least one row per cluster.", nameof(matrix));
    }

    Random random = new(seed);
    List<double[]> centers = [(double[])matrix[random.Next(matrix.Length)].Clone()];
    while (centers.Count < clusterCount)
    {
        double[] distances = matrix.Select(row => centers.Min(center => SquaredDistance(row, center))).ToArray();
        double total = distances.Sum();
        if (!double.IsFinite(total) || total <= 0)
        {
            throw new ArgumentException("Provide at least four distinct, bounded embeddings.", nameof(matrix));
        }

        double target = random.NextDouble() * total;
        int chosen = 0;
        while (chosen < distances.Length - 1 && target >= distances[chosen])
        {
            target -= distances[chosen++];
        }

        centers.Add((double[])matrix[chosen].Clone());
    }

    int[] labels = Enumerable.Repeat(-1, matrix.Length).ToArray();
    for (int iteration = 0; iteration < 1000; iteration++)
    {
        bool changed = false;
        int[] counts = new int[clusterCount];
        double[][] sums = Enumerable.Range(0, clusterCount).Select(_ => new double[matrix[0].Length]).ToArray();
        for (int i = 0; i < matrix.Length; i++)
        {
            int closest = Enumerable.Range(0, clusterCount)
                .MinBy(cluster => SquaredDistance(matrix[i], centers[cluster]));
            changed |= labels[i] != closest;
            labels[i] = closest;
            counts[closest]++;
        }

        // Move the worst represented member of a nonsingleton cluster to
        // each empty cluster. Recompute means from these exact assignments.
        for (int empty = 0; empty < clusterCount; empty++)
        {
            if (counts[empty] != 0)
            {
                continue;
            }

            int moved = Enumerable.Range(0, matrix.Length)
                .Where(i => counts[labels[i]] > 1)
                .MaxBy(i => SquaredDistance(matrix[i], centers[labels[i]]));
            counts[labels[moved]]--;
            labels[moved] = empty;
            counts[empty]++;
            changed = true;
        }

        for (int i = 0; i < matrix.Length; i++)
        {
            for (int d = 0; d < matrix[i].Length; d++)
            {
                sums[labels[i]][d] += matrix[i][d];
            }
        }

        for (int cluster = 0; cluster < clusterCount; cluster++)
        {
            for (int d = 0; d < matrix[0].Length; d++)
            {
                centers[cluster][d] = sums[cluster][d] / counts[cluster];
            }
        }

        if (!changed)
        {
            return (labels, centers.ToArray());
        }
    }

    throw new InvalidOperationException("K-means did not converge within 1000 iterations.");
}

static double SquaredDistance(double[] a, double[] b)
{
    double distance = 0;
    for (int d = 0; d < a.Length; d++)
    {
        double delta = a[d] - b[d];
        distance += delta * delta;
    }

    if (!double.IsFinite(distance))
    {
        throw new InvalidDataException("Embedding distances overflowed; rescale the input.");
    }

    return distance;
}

// Read the CSV produced by the review-embedding workflow. TextFieldParser
// handles quoted JSON vectors, commas, escaped quotes, and multiline reviews.
static (double[][] Vectors, int[] Scores) ReadReviews(string path)
{
    using TextFieldParser csv = new(path);
    csv.TextFieldType = FieldType.Delimited;
    csv.SetDelimiters(",");
    csv.HasFieldsEnclosedInQuotes = true;
    string[] header = csv.ReadFields() ?? throw new InvalidDataException("The CSV is empty.");
    int embeddingColumn = Array.IndexOf(header, "ada_embedding");
    int scoreColumn = Array.IndexOf(header, "Score");
    if (embeddingColumn < 0 || scoreColumn < 0)
    {
        throw new InvalidDataException("Expected ada_embedding and Score columns.");
    }

    List<double[]> vectors = [];
    List<int> scores = [];
    while (!csv.EndOfData)
    {
        string[] row = csv.ReadFields() ?? throw new InvalidDataException("Missing CSV row.");
        if (row.Length != header.Length)
        {
            throw new InvalidDataException("The CSV row does not match its header.");
        }

        double[] vector = JsonSerializer.Deserialize<double[]>(row[embeddingColumn])
            ?? throw new InvalidDataException("A review has no embedding.");
        if (vector.Length == 0 || vector.Any(value => !double.IsFinite(value)) ||
            (vectors.Count > 0 && vector.Length != vectors[0].Length))
        {
            throw new InvalidDataException("Embeddings must be finite vectors of equal nonzero length.");
        }

        int score = int.Parse(row[scoreColumn], CultureInfo.InvariantCulture);
        if (score is < 1 or > 5)
        {
            throw new InvalidDataException("Review scores must be integers from 1 through 5.");
        }

        vectors.Add(vector);
        scores.Add(score);
    }

    if (vectors.Count == 0)
    {
        throw new InvalidDataException("The CSV has no reviews.");
    }

    return (vectors.ToArray(), scores.ToArray());
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

```typescript
import { getEncoding } from "js-tiktoken";
import type { TiktokenEncoding } from "js-tiktoken";

function numTokensFromString(
  text: string,
  encodingName: TiktokenEncoding
): number {
  return getEncoding(encodingName).encode(text).length;
}

console.log(numTokensFromString("tiktoken is great!", "cl100k_base"));
```

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

```java
import com.fasterxml.jackson.databind.ObjectMapper;
import java.nio.file.*;
import java.util.*;
import org.apache.commons.csv.*;

System.out.println(ENCODING.countTokens("tiktoken is great!"));

static final com.knuddels.jtokkit.api.Encoding ENCODING =
    com.knuddels.jtokkit.Encodings.newDefaultEncodingRegistry()
        .getEncoding(com.knuddels.jtokkit.api.EncodingType.CL100K_BASE);
```

```csharp
using System;
using System.IO;
using System.Text.Json;
using System.Threading.Tasks;
using Microsoft.ML.Tokenizers;

static int NumberOfTokens(string text, string encodingName)
{
    ArgumentNullException.ThrowIfNull(text);
    ArgumentException.ThrowIfNullOrWhiteSpace(encodingName);
    TiktokenTokenizer encoding = TiktokenTokenizer.CreateForEncoding(encodingName);
    return encoding.CountTokens(text);
}

int tokens = NumberOfTokens("tiktoken is great!", "cl100k_base");
Console.WriteLine(tokens);
```

```ruby
require "tiktoken_ruby"

def num_tokens_from_string(string, encoding_name)
  Tiktoken.get_encoding(encoding_name).encode(string).length
end

puts(num_tokens_from_string("tiktoken is great!", "cl100k_base"))
```





The Go example uses the third-party `github.com/tiktoken-go/tokenizer` package. Install it in your Go module before running the example.




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