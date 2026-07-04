This document describes how to use system instructions. To learn about what
system instructions are and best practices for using system instructions, see
[Introduction to system instructions](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/prompts/system-instruction-introduction)
instead.

System instructions are a set of instructions that the model processes before it
processes prompts. We recommend that you use system instructions to tell the
model how you want it to behave and respond to prompts. For example, you can
include things like the role or persona, contextual information, and formatting
instructions:

    You are a friendly and helpful assistant.
    Ensure your answers are complete, unless the user requests a more concise approach.
    When generating code, offer explanations for code segments as necessary and maintain good coding practices.
    When presented with inquiries seeking information, provide answers that reflect a deep understanding of the field, guaranteeing their correctness.
    For any non-english queries, respond in the same language as the prompt unless otherwise specified by the user.
    For prompts involving reasoning, provide a clear explanation of each step in the reasoning process before presenting the final answer.

When a system instruction is set, it applies to the entire request. It works
across multiple user and model turns when included in the prompt. Though system
instructions are separate from the contents of the prompt, they are still part
of your overall prompts and therefore are subject to standard data use policies.

> [!NOTE]
> **Note:** System instructions can help guide the model to follow instructions, but they don't fully prevent jailbreaks or leaks. We recommend exercising caution around putting any sensitive information in system instructions.

## Use cases

You can use system instructions in many ways, including:

- Defining a persona or role (for a chatbot, for example)
- Defining output format (Markdown, YAML, etc.)
- Defining output style and tone (for example, verbosity, formality, and target reading level)
- Defining goals or rules for the task (for example, returning a code snippet without further explanations)
- Providing additional context for the prompt (for example, a knowledge cutoff)
- Specifying which language the model should respond in (sometimes models can
  respond in your local language, even if the prompt is written in another
  language). When you use a non-English language for your prompts, we recommend
  you add the following to your system instructions:

  ```
  All questions should be answered comprehensively with details, unless the user requests a concise response specifically. Respond in the same language as the query.
  ```

## Code samples

The code samples on the following tabs demonstrate how to use system
instructions in your generative AI application.

### Go

Learn how to install or update the [Go](https://docs.cloud.google.com/vertex-ai/generative-ai/docs/sdks/overview).

To learn more, see the
[SDK reference documentation](https://pkg.go.dev/google.golang.org/genai).

Set environment variables to use the Gen AI SDK with Vertex AI:

```bash
# Replace the `GOOGLE_CLOUD_PROJECT` and `GOOGLE_CLOUD_LOCATION` values
# with appropriate values for your project.
export GOOGLE_CLOUD_PROJECT=GOOGLE_CLOUD_PROJECT
export GOOGLE_CLOUD_LOCATION=global
export GOOGLE_GENAI_USE_ENTERPRISE=True
```

    import (
        "context"
        "fmt"
        "io"

        genai "google.golang.org/genai"
    )

    // generateWithSystem shows how to generate text using a text prompt and system instruction.
    func generateWithSystem(w io.Writer) error {
        ctx := context.Background()

        client, err := genai.NewClient(ctx, &genai.ClientConfig{
            HTTPOptions: genai.HTTPOptions{APIVersion: "v1"},
        })
        if err != nil {
            return fmt.Errorf("failed to create genai client: %w", err)
        }

        modelName := "gemini-2.5-flash"
        contents := genai.Text("Why is the sky blue?")
        config := &genai.GenerateContentConfig{
            SystemInstruction: &genai.Content{
                Parts: []*genai.Part{
                    {Text: "You're a language translator. Your mission is to translate text in English to French."},
                },
            },
        }

        resp, err := client.Models.GenerateContent(ctx, modelName, contents, config)
        if err != nil {
            return fmt.Errorf("failed to generate content: %w", err)
        }

        respText := resp.Text()

        fmt.Fprintln(w, respText)

        // Example response:
        // Pourquoi le ciel est-il bleu ?

        return nil
    }

### Node.js

#### Install

```
npm install @google/genai
```

To learn more, see the
[SDK reference documentation](https://googleapis.github.io/js-genai/).

Set environment variables to use the Gen AI SDK with Vertex AI:

```bash
# Replace the `GOOGLE_CLOUD_PROJECT` and `GOOGLE_CLOUD_LOCATION` values
# with appropriate values for your project.
export GOOGLE_CLOUD_PROJECT=GOOGLE_CLOUD_PROJECT
export GOOGLE_CLOUD_LOCATION=global
export GOOGLE_GENAI_USE_ENTERPRISE=True
```

    const {GoogleGenAI} = require('@google/genai');

    const GOOGLE_CLOUD_PROJECT = process.env.GOOGLE_CLOUD_PROJECT;
    const GOOGLE_CLOUD_LOCATION = process.env.GOOGLE_CLOUD_LOCATION || 'global';

    async function generateContent(
      projectId = GOOGLE_CLOUD_PROJECT,
      location = GOOGLE_CLOUD_LOCATION
    ) {
      const client = new GoogleGenAI({
        vertexai: true,
        project: projectId,
        location: location,
      });

      const prompt = `
      User input: I like bagels.
      Answer:
      `;

      const response = await client.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
          systemInstruction: [
            'You are a language translator.',
            'Your mission is to translate text in English to French.',
          ],
        },
      });

      console.log(response.text);

      return response.text;
    }

### Java

Learn how to install or update the [Java](https://docs.cloud.google.com/vertex-ai/generative-ai/docs/sdks/overview).

To learn more, see the
[SDK reference documentation](https://central.sonatype.com/artifact/com.google.genai/google-genai).

Set environment variables to use the Gen AI SDK with Vertex AI:

```bash
# Replace the `GOOGLE_CLOUD_PROJECT` and `GOOGLE_CLOUD_LOCATION` values
# with appropriate values for your project.
export GOOGLE_CLOUD_PROJECT=GOOGLE_CLOUD_PROJECT
export GOOGLE_CLOUD_LOCATION=global
export GOOGLE_GENAI_USE_ENTERPRISE=True
```

    import com.google.genai.Client;
    import com.google.genai.types.Content;
    import com.google.genai.types.GenerateContentConfig;
    import com.google.genai.types.GenerateContentResponse;
    import com.google.genai.types.HttpOptions;
    import com.google.genai.types.Part;

    public class TextGenerationWithSystemInstruction {

      public static void main(String[] args) {
        // TODO(developer): Replace these variables before running the sample.
        String modelId = "gemini-2.5-flash";
        generateContent(modelId);
      }

      // Generates text with text and system instruction input
      public static String generateContent(String modelId) {
        // Initialize client that will be used to send requests. This client only needs to be created
        // once, and can be reused for multiple requests.
        try (Client client =
            Client.builder()
                .location("global")
                .vertexAI(true)
                .httpOptions(HttpOptions.builder().apiVersion("v1").build())
                .build()) {

          GenerateContentConfig config =
              GenerateContentConfig.builder()
                  .systemInstruction(
                      Content.fromParts(
                          Part.fromText("You're a language translator."),
                          Part.fromText("Your mission is to translate text in English to French.")))
                  .build();

          GenerateContentResponse response =
              client.models.generateContent(modelId, "Why is the sky blue?", config);

          System.out.print(response.text());
          // Example response:
          // Pourquoi le ciel est-il bleu ?
          return response.text();
        }
      }
    }

### REST

After you set up your environment, you can use REST to test a text prompt. The
following sample sends a request to the publisher model endpoint.

Before using any of the request data,
make the following replacements:

- `GENERATE_RESPONSE_METHOD`: The type of response that you want the model to generate. Choose a method that generates how you want the model's response to be returned:
  - `streamGenerateContent`: The response is streamed as it's being generated to reduce the perception of latency to a human audience.
  - `generateContent`: The response is returned after it's fully generated.
- `LOCATION`: The region to process the request. Available options include the following: **Click to expand a partial list of available regions**
  - `us-central1`
  - `us-west4`
  - `northamerica-northeast1`
  - `us-east4`
  - `us-west1`
  - `asia-northeast3`
  - `asia-southeast1`
  - `asia-northeast1`
- `PROJECT_ID`: Your \[project ID\](/resource-manager/docs/creating-managing-projects#identifiers). .
- `MODEL_ID`: The model ID of the multimodal model that you want to use.
- `ROLE`: The role in a conversation associated with the content. Specifying a role is required even in singleturn use cases. Acceptable values include the following:
  - `USER`: Specifies content that's sent by you.
  - `MODEL`: Specifies the model's response.
-

  ```
  TEXT
  ```
  The text instructions to include in the prompt. For example, `User input: I like bagels`.
- `SAFETY_CATEGORY`: The safety category to configure a threshold for. Acceptable values include the following: **Click to expand safety categories**
  - `HARM_CATEGORY_SEXUALLY_EXPLICIT`
  - `HARM_CATEGORY_HATE_SPEECH`
  - `HARM_CATEGORY_HARASSMENT`
  - `HARM_CATEGORY_DANGEROUS_CONTENT`
- `THRESHOLD`: The threshold for blocking responses that could belong to the specified safety category based on probability. Acceptable values include the following: **Click to expand blocking thresholds**
  - `BLOCK_NONE`
  - `BLOCK_ONLY_HIGH`
  - `BLOCK_MEDIUM_AND_ABOVE` (default)
  - `BLOCK_LOW_AND_ABOVE`
  `BLOCK_LOW_AND_ABOVE` blocks the most while `BLOCK_ONLY_HIGH` blocks the least.
-

  ```
  SYSTEM_INSTRUCTION
  ```
  (Optional) Not available for all models. Instructions for the model to steer it toward better performance. JSON does not support line breaks. Replace all line breaks in this field with `\n`. For example, `You are a helpful language translator.\nYour mission is to
  translate text in English to French.`
- `TEMPERATURE`: The temperature is used for sampling during response generation, which occurs when `topP` and `topK` are applied. Temperature controls the degree of randomness in token selection. Lower temperatures are good for prompts that require a less open-ended or creative response, while higher temperatures can lead to more diverse or creative results. A temperature of `0` means that the highest probability tokens are always selected. In this case, responses for a given prompt are mostly deterministic, but a small amount of variation is still possible.

  If the model returns a response that's too generic, too short, or the model gives a fallback
  response, try increasing the temperature. If the model enters infinite generation, increasing the
  temperature to at least `0.1` may lead to improved results.
  `1.0` is the recommended starting value for temperature.
- `TOP_P`: Top-P changes how the model selects tokens for output. Tokens are selected from the most probable to least probable until the sum of their probabilities equals the top-P value. For example, if tokens A, B, and C have a probability of 0.3, 0.2, and 0.1 and the top-P value is `0.5`, then the model will select either A or B as the next token by using temperature and excludes C as a candidate.

  Specify a lower value for less random responses and a higher value for more
  random responses.
- `TOP_K`: Top-K changes how the model selects tokens for output. A top-K of `1` means the next selected token is the most probable among all tokens in the model's vocabulary (also called greedy decoding), while a top-K of `3` means that the next token is selected from among the three most probable tokens by using temperature.

  For each token selection step, the top-K tokens with the highest
  probabilities are sampled. Then tokens are further filtered based on top-P with
  the final token selected using temperature sampling.

  Specify a lower value for less random responses and a higher value for more
  random responses.
- `MAX_OUTPUT_TOKENS`: Maximum number of tokens that can be generated in the response. A token is approximately four characters. 100 tokens correspond to roughly 60-80 words.

  Specify a lower value for shorter responses and a higher value for potentially longer
  responses.
- `STOP_SEQUENCES`: Specifies a list of strings that tells the model to stop generating text if one of the strings is encountered in the response. If a string appears multiple times in the response, then the response is truncated where it's first encountered. The strings are case-sensitive.

  For example, if the following is the returned response when `stopSequences` isn't specified:

  `public
  static string reverse(string myString)`

  Then the returned response with `stopSequences` set to `["Str",
  "reverse"]` is:

  `public static string `

  Specify an empty array (`[]`) to disable stop sequences.

To send your request, choose one of these options:

#### curl

> [!NOTE]
> **Note:** The following command assumes that you have logged in to the `gcloud` CLI with your user account by running [`gcloud init`](https://docs.cloud.google.com/sdk/gcloud/reference/init) or [`gcloud auth login`](https://docs.cloud.google.com/sdk/gcloud/reference/auth/login) , or by using [Cloud Shell](https://docs.cloud.google.com/shell/docs), which automatically logs you into the `gcloud` CLI . You can check the currently active account by running [`gcloud auth list`](https://docs.cloud.google.com/sdk/gcloud/reference/auth/list).

Save the request body in a file named `request.json`.
Run the following command in the terminal to create or overwrite
this file in the current directory:

```
cat > request.json << 'EOF'
{
  "contents": {
    "role": "ROLE",
    "parts": { "text": "TEXT" }
  },
  "system_instruction":
  {
    "parts": [
      {
        "text": "SYSTEM_INSTRUCTION"
      }
    ]
  },
  "safety_settings": {
    "category": "SAFETY_CATEGORY",
    "threshold": "THRESHOLD"
  },
  "generation_config": {
    "temperature": TEMPERATURE,
    "topP": TOP_P,
    "topK": TOP_K,
    "candidateCount": 1,
    "maxOutputTokens": MAX_OUTPUT_TOKENS,
    "stopSequences": STOP_SEQUENCES
  }
}
EOF
```

Then execute the following command to send your REST request:

```
curl -X POST \
     -H "Authorization: Bearer $(gcloud auth print-access-token)" \
     -H "Content-Type: application/json; charset=utf-8" \
     -d @request.json \
     "https://LOCATION-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/publishers/google/models/MODEL_ID:GENERATE_RESPONSE_METHOD"
```

#### PowerShell

> [!NOTE]
> **Note:** The following command assumes that you have logged in to the `gcloud` CLI with your user account by running [`gcloud init`](https://docs.cloud.google.com/sdk/gcloud/reference/init) or [`gcloud auth login`](https://docs.cloud.google.com/sdk/gcloud/reference/auth/login) . You can check the currently active account by running [`gcloud auth list`](https://docs.cloud.google.com/sdk/gcloud/reference/auth/list).

Save the request body in a file named `request.json`.
Run the following command in the terminal to create or overwrite
this file in the current directory:

```
@'
{
  "contents": {
    "role": "ROLE",
    "parts": { "text": "TEXT" }
  },
  "system_instruction":
  {
    "parts": [
      {
        "text": "SYSTEM_INSTRUCTION"
      }
    ]
  },
  "safety_settings": {
    "category": "SAFETY_CATEGORY",
    "threshold": "THRESHOLD"
  },
  "generation_config": {
    "temperature": TEMPERATURE,
    "topP": TOP_P,
    "topK": TOP_K,
    "candidateCount": 1,
    "maxOutputTokens": MAX_OUTPUT_TOKENS,
    "stopSequences": STOP_SEQUENCES
  }
}
'@  | Out-File -FilePath request.json -Encoding utf8
```

Then execute the following command to send your REST request:

```
$cred = gcloud auth print-access-token
$headers = @{ "Authorization" = "Bearer $cred" }

Invoke-WebRequest `
    -Method POST `
    -Headers $headers `
    -ContentType: "application/json; charset=utf-8" `
    -InFile request.json `
    -Uri "https://LOCATION-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/publishers/google/models/MODEL_ID:GENERATE_RESPONSE_METHOD" | Select-Object -Expand Content
```

You should receive a JSON response similar to the following.

#### Response

```
{
  "candidates": [
    {
      "content": {
        "role": "model",
        "parts": [
          {
            "text": "J'aime les bagels. \n"
          }
        ]
      },
      "finishReason": "STOP",
      "safetyRatings": [
        {
          "category": "HARM_CATEGORY_HATE_SPEECH",
          "probability": "NEGLIGIBLE",
          "probabilityScore": 0.1481704,
          "severity": "HARM_SEVERITY_NEGLIGIBLE",
          "severityScore": 0.07921032
        },
        {
          "category": "HARM_CATEGORY_DANGEROUS_CONTENT",
          "probability": "NEGLIGIBLE",
          "probabilityScore": 0.07185127,
          "severity": "HARM_SEVERITY_NEGLIGIBLE",
          "severityScore": 0.10302442
        },
        {
          "category": "HARM_CATEGORY_HARASSMENT",
          "probability": "NEGLIGIBLE",
          "probabilityScore": 0.11920293,
          "severity": "HARM_SEVERITY_NEGLIGIBLE",
          "severityScore": 0.07626997
        },
        {
          "category": "HARM_CATEGORY_SEXUALLY_EXPLICIT",
          "probability": "NEGLIGIBLE",
          "probabilityScore": 0.20212802,
          "severity": "HARM_SEVERITY_NEGLIGIBLE",
          "severityScore": 0.13386749
        }
      ]
    }
  ],
  "usageMetadata": {
    "promptTokenCount": 25,
    "candidatesTokenCount": 8,
    "totalTokenCount": 33
  }
}
```
Note the following in the URL for this sample:

- Use the [`generateContent`](https://docs.cloud.google.com/gemini-enterprise-agent-platform/reference/rest/v1/projects.locations.publishers.models/generateContent) method to request that the response is returned after it's fully generated. To reduce the perception of latency to a human audience, stream the response as it's being generated by using the [`streamGenerateContent`](https://docs.cloud.google.com/gemini-enterprise-agent-platform/reference/rest/v1/projects.locations.publishers.models/streamGenerateContent) method.
- The multimodal model ID is located at the end of the URL before the method (for example, `gemini-2.5-flash`). This sample might support other models as well.
- When you use a regional API endpoint (for example, `us-central1`), the region from the endpoint URL determines where the request is processed. Any conflicting location in the resource path is ignored.

## Prompt examples

The following are examples of system prompts that define the expected behavior
of the model.

### Code generation

| Code generation |
|---|
| **System instructions:** ``` You are a coding expert that specializes in rendering code for front-end interfaces. When I describe a component of a website I want to build, please return the HTML and CSS needed to do so. Do not give an explanation for this code. Also offer some UI design suggestions. ``` **Prompt:** ``` Create a box in the middle of the page that contains a rotating selection of images each with a caption. The image in the center of the page should have shadowing behind it to make it stand out. It should also link to another page of the site. Leave the URL blank so that I can fill it in. ``` |

### Formatted data generation

| Formatted data generation |
|---|
| **System instructions:** ``` You are an assistant for home cooks. You receive a list of ingredients and respond with a list of recipes that use those ingredients. Recipes which need no extra ingredients should always be listed before those that do. Your response must be a JSON object containing 3 recipes. A recipe object has the following schema: * name: The name of the recipe * usedIngredients: Ingredients in the recipe that were provided in the list * otherIngredients: Ingredients in the recipe that were not provided in the list (omitted if there are no other ingredients) * description: A brief description of the recipe, written positively as if to sell it ``` **Prompt:** ``` * 1 lb bag frozen broccoli * 1 pint heavy cream * 1 lb pack cheese ends and pieces ``` |

### Music chatbot

| Music chatbot |
|---|
| **System instructions:** ``` You will respond as a music historian, demonstrating comprehensive knowledge across diverse musical genres and providing relevant examples. Your tone will be upbeat and enthusiastic, spreading the joy of music. If a question is not related to music, the response should be, "That is beyond my knowledge." ``` **Prompt:** ``` If a person was born in the sixties, what was the most popular music genre being played when they were born? List five songs by bullet point. ``` |

### Financial analysis

| Financial analysis |
|---|
| **System instructions:** ``` As a financial analysis expert, your role is to interpret complex financial data, offer personalized advice, and evaluate investments using statistical methods to gain insights across different financial areas. Accuracy is the top priority. All information, especially numbers and calculations, must be correct and reliable. Always double-check for errors before giving a response. The way you respond should change based on what the user needs. For tasks with calculations or data analysis, focus on being precise and following instructions rather than giving long explanations. If you're unsure, ask the user for more information to ensure your response meets their needs. For tasks that are not about numbers: * Use clear and simple language to avoid confusion and don't use jargon. * Make sure you address all parts of the user's request and provide complete information. * Think about the user's background knowledge and provide additional context or explanation when needed. Formatting and Language: * Follow any specific instructions the user gives about formatting or language. * Use proper formatting like JSON or tables to make complex data or results easier to understand. ``` **Prompt:** ``` Please summarize the key insights of given numerical tables. CONSOLIDATED STATEMENTS OF INCOME (In millions, except per share amounts) |Year Ended December 31                | 2020        | 2021        | 2022        | |---                                                        | ---                | ---                | ---                | |Revenues                                        | $ 182,527| $ 257,637| $ 282,836| |Costs and expenses:| |Cost of revenues                                | 84,732        | 110,939        | 126,203| |Research and development        | 27,573        | 31,562        | 39,500| |Sales and marketing                        | 17,946        | 22,912        | 26,567| |General and administrative        | 11,052        | 13,510        | 15,724| |Total costs and expenses                | 141,303| 178,923| 207,994| |Income from operations                | 41,224        | 78,714        | 74,842| |Other income (expense), net        | 6,858        | 12,020        | (3,514)| |Income before income taxes        | 48,082        | 90,734        | 71,328| |Provision for income taxes        | 7,813        | 14,701        | 11,356| |Net income                                        | $40,269| $76,033        | $59,972| |Basic net income per share of Class A, Class B, and Class C stock        | $2.96| $5.69| $4.59| |Diluted net income per share of Class A, Class B, and Class C stock| $2.93| $5.61| $4.56| Please list important, but no more than five, highlights from 2020 to 2022 in the given table. Please write in a professional and business-neutral tone. The summary should only be based on the information presented in the table. ``` |

### Market sentiment analysis

| Market sentiment analysis |
|---|
| **System instructions:** ``` You are a stock market analyst who analyzes market sentiment given a news snippet. Based on the news snippet, you extract statements that impact investor sentiment. Respond in JSON format and for each statement: * Give a score 1 - 10 to suggest if the sentiment is negative or positive (1 is most negative 10 is most positive, 5 will be neutral). * Reiterate the statement. * Give a one sentence explanation. ``` **Prompt:** ``` Mobileye reported a build-up of excess inventory by top-tier customers following supply-chain constraints in recent years. Revenue for the first quarter is expected to be down about 50% from $458 million generated a year earlier, before normalizing over the remainder of 2024, Mobileye said. Mobileye forecast revenue for full-year 2024 at between $1.83 billion and $1.96 billion, down from the about $2.08 billion it now expects for 2023. ``` |

## What's next

- Explore more examples of prompts in the [Prompt gallery](https://docs.cloud.google.com/vertex-ai/generative-ai/docs/prompt-gallery).
