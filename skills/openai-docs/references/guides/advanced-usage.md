# Advanced usage

> For the complete documentation index, see [llms.txt](/llms.txt). Markdown versions of documentation pages are available by appending `.md` to the page URL.

OpenAI's text generation models (often called generative pre-trained transformers or large language models) have been trained to understand natural language, code, and images. The models provide text outputs in response to their inputs. The text inputs to these models are also referred to as "prompts." Designing a prompt is essentially how you “program” a large language model, usually by providing instructions or some examples of how to successfully complete a task.

## Reproducible outputs

Chat Completions are non-deterministic by default (which means model outputs may differ from request to request). That being said, we offer some control towards deterministic outputs by giving you access to the [`seed`](https://developers.openai.com/api/reference/resources/chat#chat-create-seed) parameter and the [`system_fingerprint`](https://developers.openai.com/api/reference/resources/completions#completions/object-system_fingerprint) response field.

To receive (mostly) deterministic outputs across API calls, you can:

- Set the [seed](https://developers.openai.com/api/reference/resources/chat#chat-create-seed) parameter to any integer of your choice and use the same value across requests you'd like deterministic outputs for.
- Ensure all other parameters (like `prompt` or `temperature`) are the exact same across requests.

Sometimes, determinism may be impacted due to necessary changes OpenAI makes to model configurations on our end. To help you keep track of these changes, we expose the [`system_fingerprint`](https://developers.openai.com/api/reference/resources/chat#chat/object-system_fingerprint) field. If this value is different, you may see different outputs due to changes we've made on our systems.

[Deterministic outputs](https://developers.openai.com/cookbook/examples/reproducible_outputs_with_the_seed_parameter)

Explore the new seed parameter in the OpenAI cookbook



## Managing tokens

Language models read and write text in chunks called tokens. In English, a token can be as short as one character or as long as one word (for example, `a` or ` apple`), and in some languages tokens can be even shorter than one character or even longer than one word.

As a rough rule of thumb, 1 token is approximately 4 characters or 0.75 words for English text.

Check out our 
  [tokenizer tool](https://platform.openai.com/tokenizer) 
  to test specific strings and see how they are translated into tokens.

For example, the string `"ChatGPT is great!"` is encoded into six tokens: `["Chat", "G", "PT", " is", " great", "!"]`.

The total number of tokens in an API call affects:

- How much your API call costs, as you pay per token
- How long your API call takes, as writing more tokens takes more time
- Whether your API call works at all, as input and output tokens must fit within the model's context window (see the [model pages](https://developers.openai.com/api/docs/models) for limits)

Both input and output tokens count toward these quantities. For example, if your API call used 10 tokens in the message input and you received 20 tokens in the message output, you would be billed for 30 tokens. Note however that for some models the price per token is different for tokens in the input vs. the output (see the [pricing](https://openai.com/api/pricing) page for more information).

To see how many tokens are used by an API call, check the `usage` field in the API response (for example, `response['usage']['total_tokens']`).

Chat models use additional tokens for message formatting, so counting the text alone doesn't give the full input token count. For Responses API requests, use the [input token counting API](https://developers.openai.com/api/docs/guides/token-counting) to count tokens before creating a response.



The examples below use `gpt-3.5-turbo-0613`, which was [retired on September 13, 2024](https://developers.openai.com/api/docs/deprecations#2023-11-06-chat-model-updates).

This local counter applies only to text messages for that historical snapshot. Message formatting varies by model.




The Go examples use the third-party `github.com/tiktoken-go/tokenizer` package. Install it in your Go module before running either complete example.







The TypeScript counters use `js-tiktoken`. Install it in your project. Save the counter definition and the example messages below together as `counter.ts`, then run `node --experimental-strip-types counter.ts`. The counting rules apply to the historical model snapshot named in the code.




Count chat message tokens

```typescript
import { getEncoding } from "js-tiktoken";

// Estimate this historical model's framing; other models and tools differ.
function numTokensFromMessages(
  messages: Record<string, string>[],
  model = "gpt-3.5-turbo-0613"
): number {
  if (model !== "gpt-3.5-turbo-0613") {
    throw new Error(`Unsupported token-counting model: ${model}`);
  }
  const encoding = getEncoding("cl100k_base");
  let total = 3;
  for (const message of messages) {
    total += 3;
    for (const [key, value] of Object.entries(message)) {
      total += encoding.encode(value).length;
      if (key === "name") total += 1;
    }
  }
  return total;
}
```

```python
import tiktoken


def num_tokens_from_messages(messages, model="gpt-3.5-turbo-0613"):
    """Returns the number of tokens used by a list of messages."""
    try:
        encoding = tiktoken.encoding_for_model(model)
    except KeyError:
        encoding = tiktoken.get_encoding("cl100k_base")
    if model == "gpt-3.5-turbo-0613":
        num_tokens = 0
        for message in messages:
            num_tokens += 3  # Message formatting overhead.
            for key, value in message.items():
                num_tokens += len(encoding.encode(value))
                if key == "name":
                    num_tokens += 1  # Extra formatting for a named message.
        num_tokens += 3  # Assistant reply priming.
        return num_tokens
    raise ValueError(
        f"num_tokens_from_messages() only supports gpt-3.5-turbo-0613, not {model}."
    )
```

```go
package main

import (
	"fmt"
	"github.com/tiktoken-go/tokenizer"
)

// numTokensFromMessages estimates the historical model's message framing.
// Other models and tool definitions require different accounting.
func numTokensFromMessages(messages []map[string]string, model string) (int, error) {
	if model != "gpt-3.5-turbo-0613" {
		return 0, fmt.Errorf("unsupported token-counting model: %s", model)
	}
	encoding, err := tokenizer.Get(tokenizer.Cl100kBase)
	if err != nil {
		return 0, err
	}
	total := 3
	for _, message := range messages {
		total += 3
		for key, value := range message {
			ids, _, err := encoding.Encode(value)
			if err != nil {
				return 0, err
			}
			total += len(ids)
			if key == "name" {
				total++
			}
		}
	}
	return total, nil
}

func main() {
	count, err := numTokensFromMessages([]map[string]string{{"role": "user", "content": "Hi"}}, "gpt-3.5-turbo-0613")
	if err != nil {
		panic(err)
	}
	fmt.Println(count)
}
```

```java
import java.util.*;

System.out.println(countChatMessageTokens(List.of(Map.of("role", "user", "content", "Hi"))));

// Maven dependency: com.knuddels:jtokkit:1.1.0
static final com.knuddels.jtokkit.api.Encoding ENCODING =
    com.knuddels.jtokkit.Encodings.newDefaultEncodingRegistry()
        .getEncoding(com.knuddels.jtokkit.api.EncodingType.CL100K_BASE);

static int countChatMessageTokens(List<Map<String, String>> messages) {
  // This estimate follows gpt-3.5-turbo-0613 message framing, not all models.
  int tokens = 3;
  for (var message : messages) {
    tokens += 3;
    for (var entry : message.entrySet()) {
      tokens += ENCODING.countTokens(entry.getValue());
      if (entry.getKey().equals("name")) tokens++;
    }
  }
  return tokens;
}
```

```ruby
require "tiktoken_ruby"

def num_tokens_from_messages(messages, model = "gpt-3.5-turbo-0613")
  raise ArgumentError, "Token counting only supports gpt-3.5-turbo-0613" unless model == "gpt-3.5-turbo-0613"

  encoding = Tiktoken.get_encoding("cl100k_base")
  messages.sum do |message|
    3 + message.sum { |key, value| encoding.encode(value).length + ((key.to_s == "name") ? 1 : 0) }
  end + 3
end
```


Count the example messages locally:

Count tokens in an example prompt

```typescript
const messages: Record<string, string>[] = [
  {
    role: "system",
    content:
      "You are a helpful, pattern-following assistant that translates corporate jargon into plain English.",
  },
  {
    role: "system",
    name: "example_user",
    content: "New synergies will help drive top-line growth.",
  },
  {
    role: "system",
    name: "example_assistant",
    content: "Things working well together will increase revenue.",
  },
  {
    role: "system",
    name: "example_user",
    content:
      "Let's circle back when we have more bandwidth to touch base on opportunities for increased leverage.",
  },
  {
    role: "system",
    name: "example_assistant",
    content: "Let's talk later when we're less busy about how to do better.",
  },
  {
    role: "user",
    content:
      "This late pivot means we don't have time to boil the ocean for the client deliverable.",
  },
];
const model = "gpt-3.5-turbo-0613";
console.log(`${numTokensFromMessages(messages, model)} prompt tokens counted.`);
```

```python
messages = [
    {
        "role": "system",
        "content": "You are a helpful, pattern-following assistant that translates corporate jargon into plain English.",
    },
    {
        "role": "system",
        "name": "example_user",
        "content": "New synergies will help drive top-line growth.",
    },
    {
        "role": "system",
        "name": "example_assistant",
        "content": "Things working well together will increase revenue.",
    },
    {
        "role": "system",
        "name": "example_user",
        "content": "Let's circle back when we have more bandwidth to touch base on opportunities for increased leverage.",
    },
    {
        "role": "system",
        "name": "example_assistant",
        "content": "Let's talk later when we're less busy about how to do better.",
    },
    {
        "role": "user",
        "content": "This late pivot means we don't have time to boil the ocean for the client deliverable.",
    },
]

model = "gpt-3.5-turbo-0613"

print(f"{num_tokens_from_messages(messages, model)} prompt tokens counted.")
# 129 prompt tokens counted.
```

```go
package main

import (
	"fmt"
	"github.com/tiktoken-go/tokenizer"
)

// numTokensFromMessages estimates the historical model's message framing.
// Other models and tool definitions require different accounting.
func numTokensFromMessages(messages []map[string]string, model string) (int, error) {
	if model != "gpt-3.5-turbo-0613" {
		return 0, fmt.Errorf("unsupported token-counting model: %s", model)
	}
	encoding, err := tokenizer.Get(tokenizer.Cl100kBase)
	if err != nil {
		return 0, err
	}
	total := 3
	for _, message := range messages {
		total += 3
		for key, value := range message {
			ids, _, err := encoding.Encode(value)
			if err != nil {
				return 0, err
			}
			total += len(ids)
			if key == "name" {
				total++
			}
		}
	}
	return total, nil
}

var messages = []map[string]string{
	{"role": "system", "content": "You are a helpful, pattern-following assistant that translates corporate jargon into plain English."},
	{"role": "system", "name": "example_user", "content": "New synergies will help drive top-line growth."},
	{"role": "system", "name": "example_assistant", "content": "Things working well together will increase revenue."},
	{"role": "system", "name": "example_user", "content": "Let's circle back when we have more bandwidth to touch base on opportunities for increased leverage."},
	{"role": "system", "name": "example_assistant", "content": "Let's talk later when we're less busy about how to do better."},
	{"role": "user", "content": "This late pivot means we don't have time to boil the ocean for the client deliverable."},
}

const model = "gpt-3.5-turbo-0613"

func main() {
	count, err := numTokensFromMessages(messages, model)
	if err != nil {
		panic(err)
	}
	fmt.Printf("%d prompt tokens counted.\n", count)
}
```

```java
import java.util.*;

List<Map<String, String>> messages =
    List.of(
        Map.of(
            "role",
            "system",
            "content",
            "You are a helpful, pattern-following assistant that translates corporate jargon into plain English."),
        Map.of(
            "role",
            "system",
            "name",
            "example_user",
            "content",
            "New synergies will help drive top-line growth."),
        Map.of(
            "role",
            "system",
            "name",
            "example_assistant",
            "content",
            "Things working well together will increase revenue."),
        Map.of(
            "role",
            "system",
            "name",
            "example_user",
            "content",
            "Let's circle back when we have more bandwidth to touch base on opportunities for increased leverage."),
        Map.of(
            "role",
            "system",
            "name",
            "example_assistant",
            "content",
            "Let's talk later when we're less busy about how to do better."),
        Map.of(
            "role",
            "user",
            "content",
            "This late pivot means we don't have time to boil the ocean for the client deliverable."));
System.out.println(countChatMessageTokens(messages) + " prompt tokens counted.");

static final com.knuddels.jtokkit.api.Encoding ENCODING =
    com.knuddels.jtokkit.Encodings.newDefaultEncodingRegistry()
        .getEncoding(com.knuddels.jtokkit.api.EncodingType.CL100K_BASE);

static int countChatMessageTokens(List<Map<String, String>> messages) {
  // This estimate follows gpt-3.5-turbo-0613 message framing, not all models.
  int tokens = 3;
  for (var message : messages) {
    tokens += 3;
    for (var entry : message.entrySet()) {
      tokens += ENCODING.countTokens(entry.getValue());
      if (entry.getKey().equals("name")) tokens++;
    }
  }
  return tokens;
}
```

```ruby
require "json"

messages = JSON.parse(<<~MESSAGES)
  [
    {
      "role": "system",
      "content": "You are a helpful, pattern-following assistant that translates corporate jargon into plain English."
    },
    {
      "role": "system",
      "name": "example_user",
      "content": "New synergies will help drive top-line growth."
    },
    {
      "role": "system",
      "name": "example_assistant",
      "content": "Things working well together will increase revenue."
    },
    {
      "role": "system",
      "name": "example_user",
      "content": "Let's circle back when we have more bandwidth to touch base on opportunities for increased leverage."
    },
    {
      "role": "system",
      "name": "example_assistant",
      "content": "Let's talk later when we're less busy about how to do better."
    },
    {
      "role": "user",
      "content": "This late pivot means we don't have time to boil the ocean for the client deliverable."
    }
  ]
MESSAGES
model = "gpt-3.5-turbo-0613"
puts("#{num_tokens_from_messages(messages, model)} prompt tokens counted.")
```



Read the prompt token count from `response.usage`:

Read API prompt token usage

```typescript
import OpenAI from "openai";

const client = new OpenAI();

const response = await client.chat.completions.create({
  model: "gpt-6.2-astra",
  messages: [
    { role: "user", content: "Translate this sentence into plain English." },
  ],
});

if (!response.usage)
  throw new Error("The response did not include token usage.");
console.log(`${response.usage.prompt_tokens} prompt tokens used.`);
```

```python
# example token count from the OpenAI API
from openai import OpenAI

client = OpenAI()

response = client.chat.completions.create(
    model="gpt-6.2-astra",
    messages=[
        {"role": "user", "content": "Translate this sentence into plain English."}
    ],
)

if response.usage is None:
    raise RuntimeError("The response did not include token usage")
print(f"{response.usage.prompt_tokens} prompt tokens used.")
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
	response, err := client.Chat.Completions.New(context.Background(), openai.ChatCompletionNewParams{
		Model:    "gpt-6.2-astra",
		Messages: []openai.ChatCompletionMessageParamUnion{openai.UserMessage("Translate this sentence into plain English.")},
	})
	if err != nil {
		panic(err)
	}
	fmt.Printf("%d prompt tokens used.\n", response.Usage.PromptTokens)
}
```

```java
import com.openai.client.OpenAIClient;
import com.openai.client.okhttp.OpenAIOkHttpClient;
import com.openai.models.chat.completions.ChatCompletionCreateParams;

ChatCompletionCreateParams params =
    ChatCompletionCreateParams.builder()
        .model("gpt-6.2-astra")
        .addUserMessage("Translate this sentence into plain English.")
        .build();

var completion = client.chat().completions().create(params);
var usage =
    completion.usage().orElseThrow(() -> new IllegalStateException("No usage returned"));
System.out.println(usage.promptTokens() + " prompt tokens used.");
```

```ruby
require "openai"

client = OpenAI::Client.new
response = client.chat.completions.create(
  model: "gpt-6.2-astra",
  messages: [
    {
      role: :user,
      content: "Translate this sentence into plain English."
    }
  ]
)
usage = response.usage or raise "The response did not include token usage"
puts "#{usage.prompt_tokens} prompt tokens used."
```


To see how many tokens are in a text string without making an API call, use OpenAI’s [tiktoken](https://github.com/openai/tiktoken) Python library. Example code can be found in the OpenAI Cookbook’s guide on [how to count tokens with tiktoken](https://developers.openai.com/cookbook/examples/how_to_count_tokens_with_tiktoken).

Each message passed to the API consumes the number of tokens in the content, role, and other fields, plus a few extra for behind-the-scenes formatting. This may change slightly in the future.

If a conversation has too many tokens to fit within a model’s context window, you will have to truncate, omit, or otherwise shrink your text until it fits. Beware that if a message is removed from the messages input, the model will lose all knowledge of it.

Leave room in the context window for output tokens, and check the model's maximum output token limit when setting an output budget.

## Parameter details

### Frequency and presence penalties

The frequency and presence penalties found in the [Chat Completions API](https://developers.openai.com/api/reference/resources/chat) and [Legacy Completions API](https://developers.openai.com/api/reference/resources/completions) can be used to reduce the likelihood of sampling repetitive sequences of tokens.



They work by directly modifying the raw token scores (un-normalized log-probabilities) with an additive contribution.

Set frequency and presence penalties

```typescript
mu[j] =
  mu[j] - counts[j] * alphaFrequency - (counts[j] > 0 ? alphaPresence : 0);
```

```python
mu[j] = mu[j] - c[j] * alpha_frequency - float(c[j] > 0) * alpha_presence
```

```go
mu[j] -= counts[j] * frequency
if counts[j] > 0 {
	mu[j] -= presence
}
```

```java


mu[j] = mu[j] - counts[j] * frequencyPenalty - (counts[j] > 0 ? presencePenalty : 0);
System.out.println(mu[j]);
```

```csharp
using System.Globalization;

mu[j] = mu[j] - counts[j] * frequencyPenalty - (counts[j] > 0 ? presencePenalty : 0);
```

```ruby
mu[j] = mu[j] - c[j] * alpha_frequency - ((c[j] > 0) ? alpha_presence : 0.0)
```


Where:

- `mu[j]` is the raw score of the j-th token
- `c[j]` is how often that token was sampled prior to the current position
- The presence penalty subtracts `alpha_presence` if `c[j] > 0` and 0 otherwise
- `alpha_frequency` is the frequency penalty coefficient
- `alpha_presence` is the presence penalty coefficient

As we can see, the presence penalty is a one-off additive contribution that applies to all tokens that have been sampled at least once and the frequency penalty is a contribution that is proportional to how often a particular token has already been sampled.



Reasonable values for the penalty coefficients are around 0.1 to 1 if the aim is to just reduce repetitive samples somewhat. If the aim is to strongly suppress repetition, then one can increase the coefficients up to 2, but this can noticeably degrade the quality of samples. Negative values can be used to increase the likelihood of repetition.

### Token log probabilities

The [`logprobs`](https://developers.openai.com/api/reference/resources/chat#chat-create-logprobs) parameter found in the [Chat Completions API](https://developers.openai.com/api/reference/resources/chat) and [Legacy Completions API](https://developers.openai.com/api/reference/resources/completions), when requested, provides the log probabilities of each output token, and a limited number of the most likely tokens at each token position alongside their log probabilities. This can be useful in some cases to assess the confidence of the model in its output, or to examine alternative responses the model might have given.

### Other parameters

See the full [API reference documentation](https://platform.openai.com/docs/api-reference/chat) to learn more.