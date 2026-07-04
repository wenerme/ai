> [!NOTE]
> To see an example of getting started with Responsible AI with Gemini API,
> run the "Responsible AI with Agent Platform Gemini API: Safety ratings and thresholds" notebook in one of the following
> environments:
>
> [!Open in Colab](https://colab.research.google.com/github/GoogleCloudPlatform/generative-ai/blob/main/gemini/responsible-ai/gemini_safety_ratings.ipynb)
>
>
> \|
>
> [!Open in Colab Enterprise](https://console.cloud.google.com/agent-platform/colab/import/https%3A%2F%2Fraw.githubusercontent.com%2FGoogleCloudPlatform%2Fgenerative-ai%2Fmain%2Fgemini%2Fresponsible-ai%2Fgemini_safety_ratings.ipynb)
>
>
> \|
>
> [!Open
> in Agent Platform Workbench](https://console.cloud.google.com/agent-platform/workbench/deploy-notebook?download_url=https://raw.githubusercontent.com/GoogleCloudPlatform/generative-ai/main/gemini/responsible-ai/gemini_safety_ratings.ipynb)
>
>
> \|
>
> [!View on GitHub](https://github.com/GoogleCloudPlatform/generative-ai/blob/main/gemini/responsible-ai/gemini_safety_ratings.ipynb)

Google's generative AI models, like Gemini 2.5 Flash, are designed to
prioritize safety. However, they can still generate harmful responses,
especially when they're explicitly prompted. To further enhance safety and
minimize misuse, you can configure content filters to block potentially harmful
responses.

This page is for the safety filters of the Gemini text generation models.
For information about safety filters and responsible AI for other Google models,
see the following documentation:

- [Gemini for image generation](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/capabilities/gemini-image-responsible-ai)
- [Responsible AI for Veo](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/video/responsible-ai-and-usage-guidelines)
- [Computer use](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/computer-use#safety-and-security)

This page describes each safety and content filter type, outlines key safety
concepts, and shows you how to configure blocking thresholds for configurable
content filters. There are also
[examples provided](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/capabilities/configure-safety-filters#api-examples) to demonstrate how to program
a configurable content filter.

Safety and content filters act as a barrier, preventing harmful output, but they don't
directly influence the model's behavior. To learn more about model steerability,
see [System instructions for safety](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/capabilities/safety-system-instructions).

## Unsafe prompts

The Gemini API provides one of the following `enum` codes to explain why a prompt was rejected:

| Enum | Filter type | Description |
|---|---|---|
| `PROHIBITED_CONTENT` | Non-configurable safety filter | The prompt was blocked because it was flagged for containing prohibited contents, usually CSAM. |
| `BLOCKED_REASON_UNSPECIFIED` | N/A | The reason for blocking the prompt is unspecified. |
| `OTHER` | N/A | This enum refers to all other reasons for blocking a prompt. Note that Gemini API does not support all languages. For a list of supported languages, see [Gemini language support](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/google-models#languages-gemini). |

To learn more, see the [`BlockedReason` API reference](https://docs.cloud.google.com/python/docs/reference/aiplatform/latest/google.cloud.aiplatform_v1.types.GenerateContentResponse.PromptFeedback.BlockedReason).

The following are examples of Gemini API output for prompt feedback.
If a prompt is blocked, `promptFeedback` contains a `blockReason`. If a
prompt is not blocked, `promptFeedback` is empty, as in the following example:

    {
      "promptFeedback": {
      },
      "usageMetadata": {
        "promptTokenCount": 7,
        "totalTokenCount": 7
      }
    }

The following example shows a prompt that is blocked for containing
`PROHIBITED_CONTENT`:

    {
      "promptFeedback": {
        "blockReason": "PROHIBITED_CONTENT"
      },
      "usageMetadata": {
        "promptTokenCount": 7,
        "totalTokenCount": 7
      }
    }

The following example shows a prompt that is blocked for an unspecified
reason:

    {
      "promptFeedback": {
        "blockReason": "BLOCKED_REASON_UNSPECIFIED"
      },
      "usageMetadata": {
        "promptTokenCount": 7,
        "totalTokenCount": 7
      }
    }

## Unsafe responses

The following filters can detect and block potentially unsafe responses:

- **Non-configurable safety filters**, which block child sexual abuse material (CSAM) and personally identifiable information (PII).
- **Configurable content filters** , which block unsafe content based on a list of harm categories and their user-configured blocking thresholds. You can configure blocking thresholds for each of these harms based on what is appropriate for your use case and business. To learn more, see [Configurable content filters](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/capabilities/configure-safety-filters#configurable-filters).
- **Citation filters** , which provide citations for source material. To learn more, see [Citation filter](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/capabilities/configure-safety-filters#citation-filter).

An LLM generates responses in units of text called tokens. A model stops
generating tokens because it reaches a natural stopping point or
because one of the filters blocks the response. The Gemini API
provides one of the following `enum` codes to explain why token generation stopped:

| Enum | Filter type | Description |
|---|---|---|
| `STOP` | N/A | This enum indicates that the model reached a natural stopping point or the provided stop sequence. |
| `MAX_TOKENS` | N/A | The token generation was stopped because the model reached the maximum number of tokens that was specified in the request. |
| `SAFETY` | Configurable content filter | The token generation was stopped because the response was flagged for harmful content. |
| `RECITATION` | Citation filter | The token generation stopped because of potential recitation. |
| `SPII` | Non-configurable safety filter | The token generation was stopped because the response was flagged for Sensitive Personally Identifiable Information (SPII) content. |
| `PROHIBITED_CONTENT` | Non-configurable safety filter | The token generation was stopped because the response was flagged for containing prohibited content, usually CSAM. |
| `FINISH_REASON_UNSPECIFIED` | N/A | The finish reason is unspecified. |
| `OTHER` | N/A | This enum refers to all other reasons that stop token generation. Note that token generation is not supported for all languages. For a list of supported languages, see [Gemini language support](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/google-models#languages-gemini). |

To learn more, see the [`FinishReason` API reference](https://docs.cloud.google.com/python/docs/reference/aiplatform/latest/google.cloud.aiplatform_v1.types.Candidate.FinishReason).

If a filter blocks the response, it clears the response's `Candidate.content`
field. It does not provide any feedback to the model.

## Configurable content filters

Content filters assess content against a list
of harms. For each harm category, the content filters assign one
score based on the *probability* of the content being harmful and another
score based on the *severity* of harmful content.

The configurable content filters don't have versioning independent of model
versions. Google doesn't update the configurable content filter for a previously
released version of a model. However, it may update the configurable content
filter for a future version of a model.

### Harm categories

Content filters assess content based on the following harm categories:

| Harm Category | Definition |
|---|---|
| Hate Speech | Negative or harmful comments targeting identity and/or protected attributes. |
| Harassment | Threatening, intimidating, bullying, or abusive comments targeting another individual. |
| Sexually Explicit | Contains references to sexual acts or other lewd content. |
| Dangerous Content | Promotes or enables access to harmful goods, services, and activities. |

### Comparison of probability scores and severity scores

The *probability* safety score reflects the likelihood that a model response
is associated with the respective harm. It has an
associated confidence score between `0.0` and `1.0`, rounded to one decimal place.
The confidence score is discretized into four confidence levels:
`NEGLIGIBLE`, `LOW`, `MEDIUM`, and `HIGH`.

The *severity* score reflects the magnitude of how harmful a model
response might be. It has an associated severity score ranging from
`0.0` to `1.0`, rounded to one decimal place. The severity score is discretized
into four levels: `NEGLIGIBLE`, `LOW`, `MEDIUM`, and `HIGH`.

Content can have a low *probability* score and a high *severity* score, or a
high *probability* score and a low *severity* score.

### Content filter configuration options

You can use the Gemini API or the Google Cloud console to configure
content filters.

### Gemini API

The Gemini API provides two "harm block" methods:

- **SEVERITY**: This method uses both probability and severity scores.
- **PROBABILITY**: This method uses the probability score only.

The default method is `SEVERITY`. For models older than `gemini-1.5-flash` and
`gemini-1.5-pro`, the default method is
`PROBABILITY`. To learn more, see
[`HarmBlockMethod` API reference](https://docs.cloud.google.com/python/docs/reference/aiplatform/latest/google.cloud.aiplatform_v1.types.SafetySetting.HarmBlockMethod).

The Gemini API provides the following "harm block" thresholds:

- **`BLOCK_LOW_AND_ABOVE`** : Block when the probability score or the severity score is `LOW`, `MEDIUM` or `HIGH`.
- **`BLOCK_MEDIUM_AND_ABOVE`** : Block when the probability score or the severity score is `MEDIUM` or `HIGH`.
- **`BLOCK_ONLY_HIGH`** : Block when the probability score or the severity score is `HIGH`.
- **`HARM_BLOCK_THRESHOLD_UNSPECIFIED`**: Block using the default threshold.
- **`OFF`** : No automated response blocking and no metadata is returned. For `gemini-2.5-flash` and subsequent models, `OFF` is the default value.
- **`BLOCK_NONE`** : The `BLOCK_NONE` setting removes automated response blocking. Instead, you can configure your own content guidelines with the returned scores. This is a restricted field that isn't available to all users in [GA](https://cloud.google.com/products/#product-launch-stages) model versions.

For example, the following Python code demonstrates how you can set the harm
block threshold to `BLOCK_ONLY_HIGH` for the dangerous content category:

    generative_models.SafetySetting(
      category=generative_models.HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
      threshold=generative_models.HarmBlockThreshold.BLOCK_ONLY_HIGH,
    ),

This will block most of the content that is classified as dangerous content.
To learn more, see [`HarmBlockThreshold` API reference](https://docs.cloud.google.com/python/docs/reference/aiplatform/latest/google.cloud.aiplatform_v1.types.SafetySetting.HarmBlockThreshold).

For end-to-end examples in Python, Node.js, Java, Go, C# and REST, see
[Examples of content filter configuration](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/capabilities/configure-safety-filters#api-examples).

### Google Cloud console

The Google Cloud console lets you configure a threshold for each content attribute.
The content filter uses only the probability scores. There is no option to use
the severity scores.

The Google Cloud console provides the following threshold values:

- **Off** (default): No automated response blocking.
- **Block few** : Block when the probability score is `HIGH`.
- **Block some** : Block when the probability score is `MEDIUM` or `HIGH`.
- **Block most** : Block when the probability score is `LOW`, `MEDIUM` or `HIGH`.

For example, if you set the block setting to **Block few** for the
**Dangerous Content category**, everything that has a high probability of
being dangerous content is blocked. Anything with a lower probability is
allowed.

To set the thresholds, see the following steps:

1. In the Agent Platform section of the Google Cloud console, go to
   the **Agent Studio** page.

   [Go to Agent Studio](https://console.cloud.google.com/agent-platform/generative/language)
2. Under **Create a new prompt**, click any of the buttons to open the prompt
   design page.

3. Click **Safety settings**.

   The **Safety settings** dialog window opens.
4. For each harm category, configure the selected threshold value.

5. Click **Save**.

### Example output for a blocked response

The following is an example of Gemini API output when a response is
blocked by the configurable content filter for containing dangerous content:

    {
      "candidates": [{
        "finishReason": "SAFETY",
        "safetyRatings": [{
          "category": "HARM_CATEGORY_HATE_SPEECH",
          "probability": "NEGLIGIBLE",
          "probabilityScore": 0.11027937,
          "severity": "HARM_SEVERITY_LOW",
          "severityScore": 0.28487435
        }, {
          "category": "HARM_CATEGORY_DANGEROUS_CONTENT",
          "probability": "HIGH",
          "blocked": true,
          "probabilityScore": 0.95422274,
          "severity": "HARM_SEVERITY_MEDIUM",
          "severityScore": 0.43398145
        }, {
          "category": "HARM_CATEGORY_HARASSMENT",
          "probability": "NEGLIGIBLE",
          "probabilityScore": 0.11085559,
          "severity": "HARM_SEVERITY_NEGLIGIBLE",
          "severityScore": 0.19027223
        }, {
          "category": "HARM_CATEGORY_SEXUALLY_EXPLICIT",
          "probability": "NEGLIGIBLE",
          "probabilityScore": 0.22901751,
          "severity": "HARM_SEVERITY_NEGLIGIBLE",
          "severityScore": 0.09089675
        }]
      }],
      "usageMetadata": {
        "promptTokenCount": 38,
        "totalTokenCount": 38
      }
    }

### Implementing a content filter configuration

The following examples demonstrate how you can configure the content filter
using the Gemini API:

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
    from google.genai.types import (
        GenerateContentConfig,
        HarmBlockThreshold,
        HarmCategory,
        HttpOptions,
        SafetySetting,
    )

    client = genai.Client(http_options=HttpOptions(api_version="v1"))

    system_instruction = "Be as mean as possible."

    prompt = """
        Write a list of 5 disrespectful things that I might say to the universe after stubbing my toe in the dark.
    """

    safety_settings = [
        SafetySetting(
            category=HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
            threshold=HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
        ),
        SafetySetting(
            category=HarmCategory.HARM_CATEGORY_HARASSMENT,
            threshold=HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
        ),
        SafetySetting(
            category=HarmCategory.HARM_CATEGORY_HATE_SPEECH,
            threshold=HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
        ),
        SafetySetting(
            category=HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
            threshold=HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
        ),
    ]

    response = client.models.generate_content(
        model="gemini-3.5-flash",
        contents=prompt,
        config=GenerateContentConfig(
            system_instruction=system_instruction,
            safety_settings=safety_settings,
        ),
    )

    # Response will be `None` if it is blocked.
    print(response.text)
    # Example response:
    #     None

    # Finish Reason will be `SAFETY` if it is blocked.
    print(response.candidates[0].finish_reason)
    # Example response:
    #     FinishReason.SAFETY

    # For details on all the fields in the response
    for each in response.candidates[0].safety_ratings:
        print('\nCategory: ', str(each.category))
        print('Is Blocked:', True if each.blocked else False)
        print('Probability: ', each.probability)
        print('Probability Score: ', each.probability_score)
        print('Severity:', each.severity)
        print('Severity Score:', each.severity_score)
    # Example response:
    #
    #     Category:  HarmCategory.HARM_CATEGORY_HATE_SPEECH
    #     Is Blocked: False
    #     Probability:  HarmProbability.NEGLIGIBLE
    #     Probability Score:  2.547714e-05
    #     Severity: HarmSeverity.HARM_SEVERITY_NEGLIGIBLE
    #     Severity Score: None
    #
    #     Category:  HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT
    #     Is Blocked: False
    #     Probability:  HarmProbability.NEGLIGIBLE
    #     Probability Score:  3.6103818e-06
    #     Severity: HarmSeverity.HARM_SEVERITY_NEGLIGIBLE
    #     Severity Score: None
    #
    #     Category:  HarmCategory.HARM_CATEGORY_HARASSMENT
    #     Is Blocked: True
    #     Probability:  HarmProbability.MEDIUM
    #     Probability Score:  0.71599233
    #     Severity: HarmSeverity.HARM_SEVERITY_MEDIUM
    #     Severity Score: 0.30782545
    #
    #     Category:  HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT
    #     Is Blocked: False
    #     Probability:  HarmProbability.NEGLIGIBLE
    #     Probability Score:  1.5624657e-05
    #     Severity: HarmSeverity.HARM_SEVERITY_NEGLIGIBLE
    #     Severity Score: None

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

        "google.golang.org/genai"
    )

    // generateTextWithSafety shows how to apply safety settings to a text generation request.
    func generateTextWithSafety(w io.Writer) error {
        ctx := context.Background()

        client, err := genai.NewClient(ctx, &genai.ClientConfig{
            HTTPOptions: genai.HTTPOptions{APIVersion: "v1"},
        })
        if err != nil {
            return fmt.Errorf("failed to create genai client: %w", err)
        }

        systemInstruction := &genai.Content{
            Parts: []*genai.Part{
                {Text: "Be as mean as possible."},
            },
            Role: genai.RoleUser,
        }

        prompt := "Write a list of 5 disrespectful things that I might say to the universe after stubbing my toe in the dark."

        safetySettings := []*genai.SafetySetting{
            {Category: genai.HarmCategoryDangerousContent, Threshold: genai.HarmBlockThresholdBlockLowAndAbove},
            {Category: genai.HarmCategoryHarassment, Threshold: genai.HarmBlockThresholdBlockLowAndAbove},
            {Category: genai.HarmCategoryHateSpeech, Threshold: genai.HarmBlockThresholdBlockLowAndAbove},
            {Category: genai.HarmCategorySexuallyExplicit, Threshold: genai.HarmBlockThresholdBlockLowAndAbove},
        }

        config := &genai.GenerateContentConfig{
            SystemInstruction: systemInstruction,
            SafetySettings:    safetySettings,
        }
        modelName := "gemini-2.5-flash"
        resp, err := client.Models.GenerateContent(ctx, modelName,
            []*genai.Content{{Parts: []*genai.Part{{Text: prompt}}, Role: genai.RoleUser}},
            config,
        )
        if err != nil {
            return fmt.Errorf("failed to generate content: %w", err)
        }

        fmt.Fprintln(w, resp.Text())

        if len(resp.Candidates) > 0 {
            fmt.Fprintln(w, "Finish Reason:", resp.Candidates[0].FinishReason)

            for _, rating := range resp.Candidates[0].SafetyRatings {
                fmt.Fprintf(w, "\nCategory: %v\nIs Blocked: %v\nProbability: %v\nProbability Score: %v\nSeverity: %v\nSeverity Score: %v\n",
                    rating.Category,
                    rating.Blocked,
                    rating.Probability,
                    rating.ProbabilityScore,
                    rating.Severity,
                    rating.SeverityScore,
                )
            }
        }

        // Example response:
        // Category: HARM_CATEGORY_HATE_SPEECH
        // Is Blocked: false
        // Probability: NEGLIGIBLE
        // Probability Score: 8.996795e-06
        // Severity: HARM_SEVERITY_NEGLIGIBLE
        // Severity Score: 0.04771039
        //
        // Category: HARM_CATEGORY_DANGEROUS_CONTENT
        // Is Blocked: false
        // Probability: NEGLIGIBLE
        // Probability Score: 2.2431707e-06
        // Severity: HARM_SEVERITY_NEGLIGIBLE
        // Severity Score: 0
        //
        // Category: HARM_CATEGORY_HARASSMENT
        // Is Blocked: false
        // Probability: NEGLIGIBLE
        // Probability Score: 0.00026123362
        // Severity: HARM_SEVERITY_NEGLIGIBLE
        // Severity Score: 0.022358216
        //
        // Category: HARM_CATEGORY_SEXUALLY_EXPLICIT
        // Is Blocked: false
        // Probability: NEGLIGIBLE
        // Probability Score: 6.1352006e-07
        // Severity: HARM_SEVERITY_NEGLIGIBLE
        // Severity Score: 0.020111412

        return nil
    }

### REST

After you set up your environment, you can use REST to test a text prompt. The
following sample sends a request to the publisher model endpoint.

Before using any of the request data,
make the following replacements:

- <var class="edit" scope="LOCATION" translate="no">LOCATION</var>: The region to process the request. Available options include the following: **Click to expand a partial list of available regions**
  - `us-central1`
  - `us-west4`
  - `northamerica-northeast1`
  - `us-east4`
  - `us-west1`
  - `asia-northeast3`
  - `asia-southeast1`
  - `asia-northeast1`
- <var class="edit" scope="PROJECT_ID" translate="no">PROJECT_ID</var>: Your \[project ID\](/resource-manager/docs/creating-managing-projects#identifiers). .
- <var class="edit" scope="MODEL_ID" translate="no">MODEL_ID</var>: The model ID of the multimodal model that you want to use, like `gemini-2.5-flash`.
- <var class="edit" scope="ROLE" translate="no">ROLE</var>: The role in a conversation associated with the content. Specifying a role is required even in singleturn use cases. Acceptable values include the following:
  - `USER`: Specifies content that's sent by you.
  - `MODEL`: Specifies the model's response.
- <var class="edit" scope="TEXT" translate="no">TEXT</var>: The text instructions to include in the prompt.
- <var class="edit" scope="SAFETY_CATEGORY" translate="no">SAFETY_CATEGORY</var>: The safety category to configure a threshold for. Acceptable values include the following: **Click to expand safety categories**
  - `HARM_CATEGORY_SEXUALLY_EXPLICIT`
  - `HARM_CATEGORY_HATE_SPEECH`
  - `HARM_CATEGORY_HARASSMENT`
  - `HARM_CATEGORY_DANGEROUS_CONTENT`
- <var class="edit" scope="THRESHOLD" translate="no">THRESHOLD</var>: The threshold for blocking responses that could belong to the specified safety category based on probability. Acceptable values include the following: **Click to expand blocking thresholds**
  - `BLOCK_NONE`
  - `BLOCK_ONLY_HIGH`
  - `BLOCK_MEDIUM_AND_ABOVE` (default)
  - `BLOCK_LOW_AND_ABOVE`
  `BLOCK_LOW_AND_ABOVE` blocks the most while `BLOCK_ONLY_HIGH` blocks the least.

HTTP method and URL:

```
POST https://LOCATION-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/publishers/google/models/MODEL_ID:streamGenerateContent
```

Request JSON body:

```
{
  "contents": {
    "role": "ROLE",
    "parts": { "text": "TEXT" }
  },
  "safetySettings": {
    "category": "SAFETY_CATEGORY",
    "threshold": "THRESHOLD"
  },
}
```

To send your request, choose one of these options:

#### curl

> [!NOTE]
> **Note:** The following command assumes that you have logged in to the `gcloud` CLI with your user account by running [`gcloud init`](https://docs.cloud.google.com/sdk/gcloud/reference/init) or [`gcloud auth login`](https://docs.cloud.google.com/sdk/gcloud/reference/auth/login) , or by using [Cloud Shell](https://docs.cloud.google.com/shell/docs), which automatically logs you into the `gcloud` CLI . You can check the currently active account by running [`gcloud auth list`](https://docs.cloud.google.com/sdk/gcloud/reference/auth/list).

Save the request body in a file named `request.json`,
and execute the following command:

```
curl -X POST \
     -H "Authorization: Bearer $(gcloud auth print-access-token)" \
     -H "Content-Type: application/json; charset=utf-8" \
     -d @request.json \
     "https://LOCATION-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/publishers/google/models/MODEL_ID:streamGenerateContent"
```

#### PowerShell

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
    -Uri "https://LOCATION-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/publishers/google/models/MODEL_ID:streamGenerateContent" | Select-Object -Expand Content
```

You should receive a JSON response similar to the following.

#### Response

```
[{
  "candidates": [
    {
      "content": {
        "role": "model",
        "parts": [
          {
            "text": " The picture shows a table with a white tablecloth. On the table are two cups of coffee, a bowl of blueberries, and five scones with blueberries. There"
          }
        ]
      },
      "safetyRatings": [
        {
          "category": "HARM_CATEGORY_HARASSMENT",
          "probability": "NEGLIGIBLE"
        },
        {
          "category": "HARM_CATEGORY_HATE_SPEECH",
          "probability": "NEGLIGIBLE"
        },
        {
          "category": "HARM_CATEGORY_SEXUALLY_EXPLICIT",
          "probability": "NEGLIGIBLE"
        },
        {
          "category": "HARM_CATEGORY_DANGEROUS_CONTENT",
          "probability": "NEGLIGIBLE"
        }
      ]
    }
  ]
}
,
{
  "candidates": [
    {
      "content": {
        "role": "model",
        "parts": [
          {
            "text": " are also some pink flowers on the table. The background is a dark blue color. The picture is taken from a top-down perspective."
          }
        ]
      },
      "finishReason": "STOP",
      "safetyRatings": [
        {
          "category": "HARM_CATEGORY_HARASSMENT",
          "probability": "NEGLIGIBLE"
        },
        {
          "category": "HARM_CATEGORY_HATE_SPEECH",
          "probability": "NEGLIGIBLE"
        },
        {
          "category": "HARM_CATEGORY_SEXUALLY_EXPLICIT",
          "probability": "NEGLIGIBLE"
        },
        {
          "category": "HARM_CATEGORY_DANGEROUS_CONTENT",
          "probability": "NEGLIGIBLE"
        }
      ]
    }
  ],
  "usageMetadata": {
    "promptTokenCount": 262,
    "candidatesTokenCount": 59,
    "totalTokenCount": 321
  }
}
```

#### Example curl command

    LOCATION="us-central1"
    MODEL_ID="gemini-2.5-flash"
    PROJECT_ID="test-project"

    curl \
    -X POST \
    -H "Authorization: Bearer $(gcloud auth print-access-token)" \
    -H "Content-Type: application/json" \
    https://${LOCATION}-aiplatform.googleapis.com/v1/projects/${PROJECT_ID}/locations/${LOCATION}/publishers/google/models/${MODEL_ID}:streamGenerateContent -d \
    $'{
      "contents": {
        "role": "user",
        "parts": { "text": "Hello!" }
      },
      "safety_settings": [
        {
          "category": "HARM_CATEGORY_SEXUALLY_EXPLICIT",
          "threshold": "OFF"
        },
        {
          "category": "HARM_CATEGORY_HATE_SPEECH",
          "threshold": "BLOCK_LOW_AND_ABOVE"
        },
        {
          "category": "HARM_CATEGORY_HARASSMENT",
          "threshold": "BLOCK_MEDIUM_AND_ABOVE"
        },
        {
          "category": "HARM_CATEGORY_DANGEROUS_CONTENT",
          "threshold": "BLOCK_ONLY_HIGH"
        }
      ]
    }'

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

    async function generateWithSafetySettings(
      projectId = GOOGLE_CLOUD_PROJECT,
      location = GOOGLE_CLOUD_LOCATION
    ) {
      const client = new GoogleGenAI({
        vertexai: true,
        project: projectId,
        location: location,
      });

      const systemInstruction = 'Be as mean as possible.';

      const prompt =
        'Write a list of 5 disrespectful things that I might say to the universe after stubbing my toe in the dark.';

      const safetySettings = [
        {
          category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
          threshold: 'BLOCK_LOW_AND_ABOVE',
        },
        {
          category: 'HARM_CATEGORY_HARASSMENT',
          threshold: 'BLOCK_LOW_AND_ABOVE',
        },
        {
          category: 'HARM_CATEGORY_HATE_SPEECH',
          threshold: 'BLOCK_LOW_AND_ABOVE',
        },
        {
          category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
          threshold: 'BLOCK_LOW_AND_ABOVE',
        },
      ];

      const response = await client.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
          systemInstruction: systemInstruction,
          safetySettings: safetySettings,
        },
      });

      // console.log(response.text);
      // console.log(response.candidates[0].finishMessage);
      //
      // for (const each of response.candidates[0].safetyRatings) {
      //   console.log('\nCategory:', String(each.category));
      //   console.log('Is Blocked:', each.blocked);
      //   console.log('Probability:', each.probability);
      //   console.log('Probability Score:', each.probabilityScore);
      //   console.log('Severity:', each.severity);
      //   console.log('Severity Score:', each.severityScore);
      // }

      // Example response:
      //
      //     Category:  HarmCategory.HARM_CATEGORY_HATE_SPEECH
      //     Is Blocked: False
      //     Probability:  HarmProbability.NEGLIGIBLE
      //     Probability Score:  2.547714e-05
      //     Severity: HarmSeverity.HARM_SEVERITY_NEGLIGIBLE
      //     Severity Score: None
      //
      //     Category:  HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT
      //     Is Blocked: False
      //     Probability:  HarmProbability.NEGLIGIBLE
      //     Probability Score:  3.6103818e-06
      //     Severity: HarmSeverity.HARM_SEVERITY_NEGLIGIBLE
      //     Severity Score: None
      //
      //     Category:  HarmCategory.HARM_CATEGORY_HARASSMENT
      //     Is Blocked: True
      //     Probability:  HarmProbability.MEDIUM
      //     Probability Score:  0.71599233
      //     Severity: HarmSeverity.HARM_SEVERITY_MEDIUM
      //     Severity Score: 0.30782545
      //
      //     Category:  HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT
      //     Is Blocked: False
      //     Probability:  HarmProbability.NEGLIGIBLE
      //     Probability Score:  1.5624657e-05
      //     Severity: HarmSeverity.HARM_SEVERITY_NEGLIGIBLE
      //     Severity Score: None

      return response;
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
    import com.google.genai.types.Candidate;
    import com.google.genai.types.Content;
    import com.google.genai.types.GenerateContentConfig;
    import com.google.genai.types.GenerateContentResponse;
    import com.google.genai.types.HarmBlockThreshold;
    import com.google.genai.types.HarmCategory;
    import com.google.genai.types.HttpOptions;
    import com.google.genai.types.Part;
    import com.google.genai.types.SafetySetting;
    import java.util.List;
    import java.util.stream.Collectors;

    public class SafetyWithTxt {

      public static void main(String[] args) {
        // TODO(developer): Replace these variables before running the sample.
        String modelId = "gemini-2.5-flash";
        generateContent(modelId);
      }

      // Shows how to generate content with safety settings.
      public static GenerateContentResponse generateContent(String modelId) {
        // Client Initialization. Once created, it can be reused for multiple requests.
        try (Client client =
            Client.builder()
                .location("global")
                .vertexAI(true)
                .httpOptions(HttpOptions.builder().apiVersion("v1").build())
                .build()) {

          String systemInstruction = "Be as mean as possible.";

          String prompt =
              "Write a list of 5 disrespectful things that I might say"
                  + " to the universe after stubbing my toe in the dark.";

          // Set safety settings.
          List<HarmCategory.Known> categoriesToBlock =
              List.of(
                  HarmCategory.Known.HARM_CATEGORY_DANGEROUS_CONTENT,
                  HarmCategory.Known.HARM_CATEGORY_HARASSMENT,
                  HarmCategory.Known.HARM_CATEGORY_HATE_SPEECH,
                  HarmCategory.Known.HARM_CATEGORY_SEXUALLY_EXPLICIT);

          List<SafetySetting> safetySettings =
              categoriesToBlock.stream()
                  .map(
                      category ->
                          SafetySetting.builder()
                              .category(category)
                              .threshold(HarmBlockThreshold.Known.BLOCK_LOW_AND_ABOVE)
                              .build())
                      .collect(Collectors.toList());

          GenerateContentResponse response =
              client.models.generateContent(
                  modelId,
                  prompt,
                  GenerateContentConfig.builder()
                      .systemInstruction(Content.fromParts(Part.fromText(systemInstruction)))
                      .safetySettings(safetySettings)
                      .build());

          // Get response candidate.
          Candidate candidate =
              response
                  .candidates()
                  .flatMap(candidates -> candidates.stream().findFirst())
                  .orElseThrow(
                      () -> new IllegalStateException("No response candidate generated by the model."));

          // Finish Reason will be `SAFETY` if it is blocked.
          System.out.println(candidate.finishReason());
          // Example response:
          // Optional[SAFETY]

          // For details on all the fields in the response.
          candidate
              .safetyRatings()
              .ifPresent(
                  safetyRatings ->
                      safetyRatings.forEach(
                          safetyRating -> {
                            System.out.println("\nCategory: " + safetyRating.category());
                            System.out.println("Is Blocked: " + safetyRating.blocked());
                            System.out.println("Probability: " + safetyRating.probability());
                            System.out.println("Probability Score: " + safetyRating.probabilityScore());
                            System.out.println("Severity: " + safetyRating.severity());
                            System.out.println("Severity Score: " + safetyRating.severityScore());
                          }));
          // Example response:
          // Category: Optional[HARM_CATEGORY_HATE_SPEECH]
          // Is Blocked: Optional.empty
          // Probability: Optional[NEGLIGIBLE]
          // Probability Score: Optional[1.9967922E-5]
          // Severity: Optional[HARM_SEVERITY_NEGLIGIBLE]
          // Severity Score: Optional[0.05732864]
          //
          // Category: Optional[HARM_CATEGORY_DANGEROUS_CONTENT]
          // Is Blocked: Optional.empty
          // Probability: Optional[NEGLIGIBLE]
          // Probability Score: Optional[2.9124324E-6]
          // Severity: Optional[HARM_SEVERITY_NEGLIGIBLE]
          // Severity Score: Optional[0.04544826]
          //
          // Category: Optional[HARM_CATEGORY_HARASSMENT]
          // Is Blocked: Optional[true]
          // Probability: Optional[MEDIUM]
          // Probability Score: Optional[0.4593908]
          // Severity: Optional[HARM_SEVERITY_MEDIUM]
          // Severity Score: Optional[0.22082388]
          //
          // Category: Optional[HARM_CATEGORY_SEXUALLY_EXPLICIT]
          // Is Blocked: Optional.empty
          // Probability: Optional[NEGLIGIBLE]
          // Probability Score: Optional[6.453211E-8]
          // Severity: Optional[HARM_SEVERITY_NEGLIGIBLE]
          // Severity Score: Optional[0.023201048]
          return response;
        }
      }
    }

## Jailbreak classifier

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

> [!NOTE]
> **Note:** This feature is only available in `gemini-3-flash-preview`.

Some prompts attempt to bypass safety guidelines, ethical constraints, or
intended operational instructions, leading to potentially harmful, biased,
or inappropriate outputs. The jailbreak classifier detects and, depending on the
configuration, blocks prompts that attempt to circumvent the model's defenses.
This filter is **off** by default. To turn it on, set the blocking threshold for
`JAILBREAK` to any of the following values:

- `BLOCK_NONE`
- `BLOCK_LOW_AND_ABOVE`
- `BLOCK_MEDIUM_AND_ABOVE`
- `BLOCK_ONLY_HIGH`

The following code shows you how to turn on this jailbreak filter:

    generative_models.SafetySetting(
        category=generative_models.HarmCategory.HARM_CATEGORY_JAILBREAK,
        threshold=generative_models.HarmBlockThreshold.BLOCK_ONLY_HIGH,
    )

If the content is blocked by the jailbreak classifier, you can expect a result
similar to this:

    {
      prompt_feedback: {
        block_reason: JAILBREAK
        safety_ratings: [
          {
            category: HARM_CATEGORY_JAILBREAK
            blocked: true
            severity: HARM_SEVERITY_MEDIUM
            severity_score: 0.76953125
          }
        ]
      }
    }

If you set `HarmBlockMethod` to `PROBABILITY`, then `safety_ratings` contains
`probability` and `probability_score` instead of `severity` and
`severity_score`. In the case where the prompt isn't blocked or flagged, the
model will still return safety ratings depending on `HarmBlockMethod`.

### Billing

Like other Gemini safety filters, using the jailbreak classifier is
free.

## Citation filter

The generative code features of Agent Platform are intended to produce
original content. By design, Gemini limits the likelihood
that existing content is replicated at length. If a Gemini feature does
make an extensive quotation from a web page, Gemini cites that page.

Sometimes the same content can be found on multiple web pages. Gemini
attempts to point you to a popular source. In the case of
citations to code repositories, the citation might also reference an applicable
open source license. Complying with any license requirements is your own
responsibility.

To learn about the metadata of the citation filter, see the
[Citation API reference](https://docs.cloud.google.com/python/docs/reference/aiplatform/latest/google.cloud.aiplatform_v1.types.Citation).

## Best practices

While content filters help prevent unsafe content, they might occasionally block
benign content or miss harmful content. Advanced models like
Gemini 2.5 Flash are designed to generate safe responses even without
filters. Test different filter settings to find the right balance between
safety and allowing appropriate content.

## What's next

- Learn about [system instructions for safety](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/capabilities/safety-system-instructions).
- Learn about [abuse monitoring](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/abuse-monitoring).
- Learn more about [responsible AI](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/responsible-ai).
- Learn how to [process blocked responses](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/capabilities/process-blocked-responses).
