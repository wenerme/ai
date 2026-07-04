> [!WARNING]
>
> **Preview**
>
>
> This product or feature is
>
> subject to the "Pre-GA Offerings Terms" in the General Service Terms section
> of the [Service Specific
> Terms](https://docs.cloud.google.com/terms/service-terms#1).
>
> Pre-GA products and features are available "as is" and might have limited support.
>
> For more information, see the
> [launch stage descriptions](https://cloud.google.com/products/#product-launch-stages).

This page shows you how to list the tokens and their token IDs of a prompt
and how to get a total token count of a prompt by using the Google Gen AI SDK.

## Tokens and the importance of token listing and counting

Generative AI models break down text and other data in a prompt into units called
tokens for processing. The way that data is converted into tokens depends on the
tokenizer used. A token can be characters, words, or phrases.

Each model has a maximum number of tokens that it can handle in a prompt and
response. Knowing the token count of your prompt lets you know whether you've
exceeded this limit or not.

Listing tokens returns a list of the tokens that your prompt is broken down into.
Each listed token is associated with a token ID, which helps you perform
troubleshooting and analyze model behavior.

## Supported models

The following table shows you the models that support token listing and token
counting:

#### Click to expand supported models

- [Gemini Omni Flash](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/omni-flash-preview) preview
- [Gemini 3.1 Flash-Lite Image (Nano Banana 2 Lite)](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/3-1-flash-lite-image)
- [Gemini 3 Pro Image](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/3-pro-image)
- [Gemini 3.1 Flash Image](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/3-1-flash-image)
- [Gemini 3.5 Flash](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/3-5-flash)
- [Gemini 3.1 Flash-Lite](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/3-1-flash-lite)
- [Gemini 3.1 Flash Image](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/3-1-flash-image) preview
- [Gemini 3.1 Pro](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/3-1-pro) preview
- [Gemini 3 Flash](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/3-flash) preview
- [Gemini 3 Pro Image](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/3-pro-image-preview) preview
- [Gemini 2.5 Pro](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/2-5-pro)
- [Gemini 2.5 Flash](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/2-5-flash) preview
- [Gemini 2.5 Flash-Lite](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/2-5-flash-lite) preview
- [Gemini 2.5 Flash Image](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/2-5-flash-image)
- [Gemini 2.5 Flash](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/2-5-flash)
- [Gemini 2.5 Flash-Lite](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/2-5-flash-lite)

## Get a list of tokens and token IDs for a prompt

The following code sample shows you how to get a list of tokens and token IDs for
a prompt. The prompt must contain only text. Multimodal prompts are not supported.

### Python

#### Install

```
pip install --upgrade google-genai
```

To learn more, see the
[SDK reference documentation](https://googleapis.github.io/python-genai/).

Set environment variables to use the Gen AI SDK with Vertex AI:

```bash
# Replace the `GOOGLE_CLOUD_PROJECT` and `GOOGLE_CLOUD_LOCATION` values
# with appropriate values for your project.
export GOOGLE_CLOUD_PROJECT=GOOGLE_CLOUD_PROJECT
export GOOGLE_CLOUD_LOCATION=global
export GOOGLE_GENAI_USE_ENTERPRISE=True
```

    from google import genai
    from google.genai.types import HttpOptions

    client = genai.Client(http_options=HttpOptions(api_version="v1"))
    response = client.models.compute_tokens(
        model="gemini-3.5-flash",
        contents="What's the longest word in the English language?",
    )

    print(response)
    # Example output:
    # tokens_info=[TokensInfo(
    #    role='user',
    #    token_ids=[1841, 235303, 235256, 573, 32514, 2204, 575, 573, 4645, 5255, 235336],
    #    tokens=[b'What', b"'", b's', b' the', b' longest', b' word', b' in', b' the', b' English', b' language', b'?']
    #  )]

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
        "encoding/json"
        "fmt"
        "io"

        genai "google.golang.org/genai"
    )

    // computeWithTxt shows how to compute tokens with text input.
    func computeWithTxt(w io.Writer) error {
        ctx := context.Background()

        client, err := genai.NewClient(ctx, &genai.ClientConfig{
            HTTPOptions: genai.HTTPOptions{APIVersion: "v1"},
        })
        if err != nil {
            return fmt.Errorf("failed to create genai client: %w", err)
        }

        modelName := "gemini-2.5-flash"
        contents := []*genai.Content{
            {Parts: []*genai.Part{
                {Text: "What's the longest word in the English language?"},
            },
                Role: genai.RoleUser},
        }

        resp, err := client.Models.ComputeTokens(ctx, modelName, contents, nil)
        if err != nil {
            return fmt.Errorf("failed to generate content: %w", err)
        }

        type tokenInfoDisplay struct {
            IDs    []int64  `json:"token_ids"`
            Tokens []string `json:"tokens"`
        }
        // See the documentation: https://pkg.go.dev/google.golang.org/genai#ComputeTokensResponse
        for _, instance := range resp.TokensInfo {
            display := tokenInfoDisplay{
                IDs:    instance.TokenIDs,
                Tokens: make([]string, len(instance.Tokens)),
            }
            for i, t := range instance.Tokens {
                display.Tokens[i] = string(t)
            }

            data, err := json.MarshalIndent(display, "", "  ")
            if err != nil {
                return fmt.Errorf("failed to marshal token info: %w", err)
            }
            fmt.Fprintln(w, string(data))
        }

        // Example response:
        // {
        //     "ids": [
        //         1841,
        //         235303,
        //         235256,
        //    ...
        //     ],
        //     "values": [
        //         "What",
        //         "'",
        //         "s",
        //    ...
        //     ]
        // }

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

    async function countTokens(
      projectId = GOOGLE_CLOUD_PROJECT,
      location = GOOGLE_CLOUD_LOCATION
    ) {
      const client = new GoogleGenAI({
        vertexai: true,
        project: projectId,
        location: location,
        httpOptions: {apiVersion: 'v1'},
      });

      const response = await client.models.computeTokens({
        model: 'gemini-2.5-flash',
        contents: "What's the longest word in the English language?",
      });

      console.log(response);

      return response.tokensInfo;
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
    import com.google.genai.types.ComputeTokensResponse;
    import com.google.genai.types.HttpOptions;
    import com.google.genai.types.TokensInfo;
    import java.nio.charset.StandardCharsets;
    import java.util.List;
    import java.util.Optional;

    public class CountTokensComputeWithText {

      public static void main(String[] args) {
        // TODO(developer): Replace these variables before running the sample.
        String modelId = "gemini-2.5-flash";
        computeTokens(modelId);
      }

      // Computes tokens with text input
      public static Optional<List<TokensInfo>> computeTokens(String modelId) {
        // Initialize client that will be used to send requests. This client only needs to be created
        // once, and can be reused for multiple requests.
        try (Client client =
            Client.builder()
                .location("global")
                .vertexAI(true)
                .httpOptions(HttpOptions.builder().apiVersion("v1").build())
                .build()) {

          ComputeTokensResponse response = client.models.computeTokens(
                  modelId, "What's the longest word in the English language?", null);

          // Print TokensInfo
          response.tokensInfo().ifPresent(tokensInfoList -> {
            for (TokensInfo info : tokensInfoList) {
              info.role().ifPresent(role -> System.out.println("role: " + role));
              info.tokenIds().ifPresent(tokenIds -> System.out.println("tokenIds: " + tokenIds));
              // print tokens input as strings since they are in a form of byte array
              System.out.println("tokens: ");
              info.tokens().ifPresent(tokens ->
                  tokens.forEach(token ->
                      System.out.println(new String(token, StandardCharsets.UTF_8))
                  )
              );
            }
          });
          // Example response.tokensInfo()
          // role: user
          // tokenIds: [1841, 235303, 235256, 573, 32514, 2204, 575, 573, 4645, 5255, 235336]
          // tokens:
          // What
          // '
          // s
          // the
          return response.tokensInfo();
        }
      }
    }

## Get the token count of a prompt

The following code sample shows you how to get the token count of a prompt. Both
text-only and multimodal prompts are supported.

### Python

#### Install

```
pip install --upgrade google-genai
```

To learn more, see the
[SDK reference documentation](https://googleapis.github.io/python-genai/).

Set environment variables to use the Gen AI SDK with Vertex AI:

```bash
# Replace the `GOOGLE_CLOUD_PROJECT` and `GOOGLE_CLOUD_LOCATION` values
# with appropriate values for your project.
export GOOGLE_CLOUD_PROJECT=GOOGLE_CLOUD_PROJECT
export GOOGLE_CLOUD_LOCATION=global
export GOOGLE_GENAI_USE_ENTERPRISE=True
```

    from google import genai
    from google.genai.types import HttpOptions

    client = genai.Client(http_options=HttpOptions(api_version="v1"))

    prompt = "Why is the sky blue?"

    # Send text to Gemini
    response = client.models.generate_content(
        model="gemini-3.5-flash", contents=prompt
    )

    # Prompt and response tokens count
    print(response.usage_metadata)

    # Example output:
    #  cached_content_token_count=None
    #  candidates_token_count=311
    #  prompt_token_count=6
    #  total_token_count=317

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
        "encoding/json"
        "fmt"
        "io"

        genai "google.golang.org/genai"
    )

    // generateTextAndCount shows how to generate text and obtain token count metadata from the model response.
    func generateTextAndCount(w io.Writer) error {
        ctx := context.Background()

        client, err := genai.NewClient(ctx, &genai.ClientConfig{
            HTTPOptions: genai.HTTPOptions{APIVersion: "v1"},
        })
        if err != nil {
            return fmt.Errorf("failed to create genai client: %w", err)
        }

        modelName := "gemini-2.5-flash"
        contents := []*genai.Content{
            {Parts: []*genai.Part{
                {Text: "Why is the sky blue?"},
            },
                Role: genai.RoleUser},
        }

        resp, err := client.Models.GenerateContent(ctx, modelName, contents, nil)
        if err != nil {
            return fmt.Errorf("failed to generate content: %w", err)
        }

        usage, err := json.MarshalIndent(resp.UsageMetadata, "", "  ")
        if err != nil {
            return fmt.Errorf("failed to convert usage metadata to JSON: %w", err)
        }
        fmt.Fprintln(w, string(usage))

        // Example response:
        // {
        //      "candidatesTokenCount": 339,
        //      "promptTokenCount": 6,
        //      "totalTokenCount": 345
        // }

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

    async function countTokens(
      projectId = GOOGLE_CLOUD_PROJECT,
      location = GOOGLE_CLOUD_LOCATION
    ) {
      const client = new GoogleGenAI({
        vertexai: true,
        project: projectId,
        location: location,
        httpOptions: {apiVersion: 'v1'},
      });

      const response = await client.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: 'Why is the sky blue?',
      });

      console.log(response.usageMetadata);

      return response.usageMetadata;
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
    import com.google.genai.types.GenerateContentResponse;
    import com.google.genai.types.GenerateContentResponseUsageMetadata;
    import com.google.genai.types.HttpOptions;
    import java.util.Optional;

    public class CountTokensResponseWithText {

      public static void main(String[] args) {
        // TODO(developer): Replace these variables before running the sample.
        String modelId = "gemini-2.5-flash";
        countTokens(modelId);
      }

      // Generates content response usage metadata that contains prompt and response token counts
      public static Optional<GenerateContentResponseUsageMetadata> countTokens(String modelId) {
        // Initialize client that will be used to send requests. This client only needs to be created
        // once, and can be reused for multiple requests.
        try (Client client =
            Client.builder()
                .location("global")
                .vertexAI(true)
                .httpOptions(HttpOptions.builder().apiVersion("v1").build())
                .build()) {

          GenerateContentResponse response =
                  client.models.generateContent(modelId, "Why is the sky blue?", null);

          response.usageMetadata().ifPresent(System.out::println);
          // Example response:
          // GenerateContentResponseUsageMetadata{cacheTokensDetails=Optional.empty,
          // cachedContentTokenCount=Optional.empty, candidatesTokenCount=Optional[569],
          // candidatesTokensDetails=Optional[[ModalityTokenCount{modality=Optional[TEXT],
          // tokenCount=Optional[569]}]], promptTokenCount=Optional[6],
          // promptTokensDetails=Optional[[ModalityTokenCount{modality=Optional[TEXT],
          // tokenCount=Optional[6]}]], thoughtsTokenCount=Optional[1132],
          // toolUsePromptTokenCount=Optional.empty, toolUsePromptTokensDetails=Optional.empty,
          // totalTokenCount=Optional[1707], trafficType=Optional[ON_DEMAND]}
          return response.usageMetadata();
        }
      }
    }

## Count tokens locally

For large prompts, counting tokens using the Count Tokens
API may be fairly memory-intensive. The Google Gen AI SDK also supports local
token counting to simplify those operations.

To count just the tokens, use `count_tokens`:

### Python

#### Install

```
pip install --upgrade google-genai
```

To learn more, see the
[SDK reference documentation](https://googleapis.github.io/python-genai/).

Set environment variables to use the Gen AI SDK with Vertex AI:

```bash
# Replace the `GOOGLE_CLOUD_PROJECT` and `GOOGLE_CLOUD_LOCATION` values
# with appropriate values for your project.
export GOOGLE_CLOUD_PROJECT=GOOGLE_CLOUD_PROJECT
export GOOGLE_CLOUD_LOCATION=global
export GOOGLE_GENAI_USE_ENTERPRISE=True
```

    from google.genai.local_tokenizer import LocalTokenizer

    tokenizer = LocalTokenizer(model_name="gemini-3.5-flash")
    response = tokenizer.count_tokens("What's the highest mountain in Africa?")
    print(response)
    # Example output:
    #   total_tokens=10

To count the tokens and get their token IDs, use `compute_tokens` instead:

### Python

#### Install

```
pip install --upgrade google-genai
```

To learn more, see the
[SDK reference documentation](https://googleapis.github.io/python-genai/).

Set environment variables to use the Gen AI SDK with Vertex AI:

```bash
# Replace the `GOOGLE_CLOUD_PROJECT` and `GOOGLE_CLOUD_LOCATION` values
# with appropriate values for your project.
export GOOGLE_CLOUD_PROJECT=GOOGLE_CLOUD_PROJECT
export GOOGLE_CLOUD_LOCATION=global
export GOOGLE_GENAI_USE_ENTERPRISE=True
```

    from google.genai.local_tokenizer import LocalTokenizer

    tokenizer = LocalTokenizer(model_name="gemini-3.5-flash")
    response = tokenizer.compute_tokens("What's the longest word in the English language?")
    print(response)
    # Example output:
    # tokens_info=[TokensInfo(
    #     role='user',
    #     token_ids=[3689, 236789, 236751, 506,
    #               27801, 3658, 528, 506, 5422, 5192, 236881],
    #     tokens=[b'What', b"'", b's', b' the', b' longest',
    #            b' word', b' in', b' the', b' English', b' language', b'?']
    #     )]
