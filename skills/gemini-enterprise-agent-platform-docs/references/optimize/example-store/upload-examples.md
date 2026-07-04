## Upload examples

Use the following samples to upload examples to an Example Store instance. You can upload
a maximum of five examples per request.

### Python

The following samples let you improve LLM behavior and function calling performance by creating and uploading examples to an Example Store instance, using responses received from an LLM. Before using the following samples, ensure that you've done the following:

Follow the Python setup instructions in the
Install the client libraries and set
up authentication by using Application Default Credentials.

For more information, see the Agent Platform Python API reference documentation.

### Upload an example based on an expected response

Use the following sample to author and upload a sample in a scenario where the
response from the LLM is in the expected format. This sample lets you send a
request, create an example based on the response, and then upload the example
to an Example Store instance.

```
from vertexai.preview.example_stores import ContentsExample, StoredContentsExample

client = genai.Client(
    http_options=genai_types.HttpOptions(api_version="v1"),
    vertexai=True,
    project="PROJECT_ID",
    location="LOCATION")

user_content = genai_types.Content(
    role="user",
    parts=[genai_types.Part(text="EXAMPLE_QUERY")],
)

response = client.models.generate_content(
    model="MODEL_NAME",
    user_content,
    config=genai_types.GenerateContentConfig(
      tools=[FUNCTION_OR_FUNCTION_DECLARATION]

# Upload example.
example = {
  "contents_example": {
    "contents": [user_content.to_json_dict()],
    "expected_contents": [
      {"content": response.candidates[0].content.to_json_dict()},
      {"content": EXPECTED_FUNCTION_RESPONSE.to_json_dict()},
      {"content": EXPECTED_FINAL_MODEL_RESPONSE.to_json_dict()},
    ],
  },
  "search_key": user_content.parts[0].text,
}
example_store.upsert_examples(examples=[example])

```

Replace the following:

- PROJECT_ID: Your project ID.
- LOCATION: Your region. Only `us-central1` is supported.
- EXAMPLE_QUERY: The user request or query to the LLM or agent.
- MODEL_NAME: The model name. For example, `gemini-2.0-flash`.
- FUNCTION_OR_FUNCTION_DECLARATION: The function or function
declaration to use in the request. See the GenAI SDK documentation for Function Calling for help in defining a function as a tool.
- EXPECTED_FUNCTION_RESPONSE: The expected function response (a `FunctionResponse` object) for the expected function call. See the GenAI SDK documentation for Function Calling for help in defining a function response.
- EXPECTED_FINAL_MODEL_RESPONSE: The expected final model response (a `Content` object) for the expected function call and response.

### Upload an example to correct an unexpected response

If the LLM doesn't generate the response as expected, you can create an example
based on the corrected response. This helps the LLM follow the expected
reasoning for subsequent requests.

Use the following sample to upload an example with the corrected response to the
Example Store instance.

```

      {"content": EXPECTED_FUNCTION_CALL.to_json_dict()},

```

- EXPECTED_FUNCTION_CALL: The expected function call (a `FunctionCall` object) for the provided user query. See the GenAI SDK documentation for Function Calling for help in defining a function call.
- EXPECTED_FUNCTION_RESPONSE: The expected function response (a `FunctionResponse` object) for the expected function call. See the GenAI SDK documentation for Function Calling for help in defining a function response.
- EXPECTED_FINAL_MODEL_RESPONSE: The expected final model response (a `Content` object) for the expected function call and response.

### REST

To upload a sample to an Example Store instance, send a `POST` request by using the
`exampleStores.upsertExamples`
method.

Before using any of the request data,
make the following replacements:

- LOCATION: The region where you want to create the example store. The only region supported is `us-central1`.
- EXAMPLE_STORE_ID: The ID of the Example Store instance where you want to upload the example.

HTTP method and URL:

```
POST https://LOCATION-aiplatform.googleapis.com/v1beta1/projects/PROJECT_ID/locations/LOCATION/exampleStores/EXAMPLE_STORE_ID:upsertExamples

```

Request JSON body:

```
{
  "examples": [
          "stored_contents_example": {
                  "contents": [
                          "role": "user",
                          "parts": [
                                  "text": "Is there a store in Mountain View, CA that I can visit to try the new Pixel 8 Pro?"
                          ]
                          "content": {
                              "role": "model",
                                      "text": ""Yes, there is a store located at 2000 N Shoreline Blvd, Mountain View, CA 94043, US."
              "search_key_generation_method": {
                  "last_entry": {}

```

To send your request, choose one of these options:

#### curl

> [!NOTE]
> Note: The following command assumes that you have logged in to the `gcloud` CLI with your user account by running `gcloud init` or `gcloud auth login` , or by using Cloud Shell, which automatically logs you into the `gcloud` CLI . You can check the currently active account by running `gcloud auth list`.

Save the request body in a file named `request.json`,
and execute the following command:

```
curl -X POST \
     -H "Authorization: Bearer $(gcloud auth print-access-token)" \
     -H "Content-Type: application/json; charset=utf-8" \
     -d @request.json \
     "https://LOCATION-aiplatform.googleapis.com/v1beta1/projects/PROJECT_ID/locations/LOCATION/exampleStores/EXAMPLE_STORE_ID:upsertExamples"

```

#### PowerShell

> Note: The following command assumes that you have logged in to the `gcloud` CLI with your user account by running `gcloud init` or `gcloud auth login` . You can check the currently active account by running `gcloud auth list`.

```
$cred = gcloud auth print-access-token
$headers = @{ "Authorization" = "Bearer $cred" }

Invoke-WebRequest `
    -Method POST `
    -Headers $headers `
    -ContentType: "application/json; charset=utf-8" `
    -InFile request.json `
    -Uri "https://LOCATION-aiplatform.googleapis.com/v1beta1/projects/PROJECT_ID/locations/LOCATION/exampleStores/EXAMPLE_STORE_ID:upsertExamples" | Select-Object -Expand Content

```

You should receive a JSON response similar to the following, where EXAMPLE_ID
represents the numerical ID generated for the example.

#### Response

```
  "results": [
      "example": {
        "exampleId": "exampleTypes/stored_contents_example/examples/EXAMPLE_ID",
        "storedContentsExample": {
          "searchKey": "Is there a store in Mountain View, CA that I can visit to try the new Pixel 8 Pro?",
          "contentsExample": {
                    "text": "Is there a store in Mountain View, CA that I can visit to try the new Pixel 8 Pro?"
            "expectedContents": [
                      "text": ""Yes, there is a store located at 2000 N Shoreline Blvd, Mountain View, CA 94043, US."
          "searchKeyGenerationMethod": {
            "lastEntry": {}

```

## What's next

- Learn how to retrieve examples.
