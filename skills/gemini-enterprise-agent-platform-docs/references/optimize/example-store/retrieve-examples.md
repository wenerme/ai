## Prerequisites

Before you use the Python samples on this page, install and initialize the
Agent Platform SDK in your local Python environment.

1. Run the following command to install the Agent Platform SDK for Example Store. pip install --upgrade google-cloud-aiplatform>=1.87.0

2. Use the following code sample to import and initialize the SDK for Example Store. import https://docs.cloud.google.com/python/docs/reference/agentplatform/latest
from vertexai.preview import example_stores

https://docs.cloud.google.com/python/docs/reference/agentplatform/latest.init(
 project="PROJECT_ID",
 location="LOCATION"
)
Replace the following: PROJECT_ID: Your project ID. LOCATION: Your region. Only `us-central1` is supported.

## Fetch examples

Use the following samples to fetch examples. `FetchExamples` retrieves all examples that exactly fit your filtering criteria.

### Agent Platform SDK

The following code returns all examples in your Example Store, up to 100 per page:

```

example_store = example_stores.ExampleStore(EXAMPLE_STORE_NAME)
# Returns the dictionary representation of FetchExamplesResponse.
examples = example_store.fetch_examples()

```

You can use `function_names` to specify one or more filters that restrict which examples are returned. The following example only returns examples that include the functions `flight_booking_tool` and `hotel_booking_tool`:

```
# Returns examples that include either tool.
example_store.fetch_examples(
    filter={
        "function_names": {
            "values": ["flight_booking_tool", "hotel_booking_tool"],
            "array_operator": "CONTAINS_ANY"
        }

# Returns examples that include *both* tools.
            "array_operator": "CONTAINS_ALL"

```

You can use the `search_keys` filter to restrict which examples are returned by their search key.

```
# Returns examples that include any of the following search keys.
    filter={"search_keys": ["How do I get to the airport?"]}

```

You can use the `example_ids` filter to restrict which examples are returned by their Example ID. Example IDs use the format `exampleTypes/stored_contents_example/examples/EXAMPLE_ID`, where EXAMPLE_ID represents the numerical ID generated for the example.

```
# Returns examples that have any of the following Example IDs.
  example_ids=["exampleTypes/stored_contents_example/examples/09b1d383f92c47e7a2583a44ebbc7854"]

```

### REST API

To fetch examples, send a POST request by using the `exampleStores.fetchExamples` method.

The `function_names` filter specified in the example request JSON body only returns examples that include the functions `flight_booking_tool` and `hotel_booking_tool`:

Before using any of the request data,
make the following replacements:

- PROJECT_ID: Your project ID.
- LOCATION: The region where you want to create the example store. The only region supported is `us-central1`.
- EXAMPLE_STORE_ID: The ID of the Example Store instance where you want to upload the example.

HTTP method and URL:

```
POST https://LOCATION-aiplatform.googleapis.com/v1beta1/projects/PROJECT_ID/locations/LOCATION/exampleStores/EXAMPLE_STORE_ID:fetchExamples

```

Request JSON body:

```
{
  "stored_contents_example_filter": {

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
     "https://LOCATION-aiplatform.googleapis.com/v1beta1/projects/PROJECT_ID/locations/LOCATION/exampleStores/EXAMPLE_STORE_ID:fetchExamples"

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
    -Uri "https://LOCATION-aiplatform.googleapis.com/v1beta1/projects/PROJECT_ID/locations/LOCATION/exampleStores/EXAMPLE_STORE_ID:fetchExamples" | Select-Object -Expand Content

```

You should receive a JSON response similar to the following, where EXAMPLE_ID
represents the ID generated for the example.

#### Response

```
{'examples': [{'exampleId': 'exampleTypes/stored_contents_example/examples/EXAMPLE_ID',
 'storedContentsExample': {'searchKey': 'What is the weather like in Boston?',
  'contentsExample': {'contents': [{'role': 'user',
     'parts': [{'text': 'What is the weather like in Boston?'}]}],
   'expectedContents': [{'content': {'parts': [{'functionCall': {'name': 'get_current_weather',
         'args': {'location': 'New York, NY'}}}]}},
    {'content': {'parts': [{'functionResponse': {'name': 'get_current_weather',
         'response': {'humidity': 65.0,
          'description': 'Partly Cloudy',
          'icon': 'partly-cloudy',
          'temperature': 38.0,
          'location': 'New York, NY',
          'wind': {'speed': 10.0, 'direction': 'NW'}}}}]}},
    {'content': {'role': 'model',
      'parts': [{'text': 'The weather in NYC is 38 degrees and partly cloudy.'}]}}]}}}],
 'nextPageToken': 'ElNidWlsdF9pbl9leGFtcGxlcy9zdG9yZWRfY29udGVudHNfZXhhbXBsZS9leGFtcGxlcy81MGVmM2E5ZjliNjc0MzRkYjg2ZDczMWVjYzNmOTdlYQ=='}

```

## Search examples

Example Store finds the most relevant examples based on the similarity score between the `stored_contents_example_key` and the stored examples' search keys. Using examples that are relevant to the conversation helps the model learn the expected behavior.

### Agent Platform SDK

Use the following code sample to search for relevant examples using the Agent Platform SDK for Python:

```
example_store.search_examples(
    parameters={
        "stored_contents_example_key": "what's the weather in nyc"
    },
    # Only fetch the most similar examaple. The default value is 3.
    top_k=1

"""
Response -- dictionary representation of SearchExamplesResponse.
{'results': [{'example': {'exampleId': 'exampleTypes/stored_contents_example/examples/16834837b178453783e471b459d99195',
      'expectedContents': [{'content': {'parts': [{'functionCall': {'name': 'get_current_weather',
            'location': 'Boston, MA',
        'parts': [{'text': 'The weather in Boston is 38 degrees and partly cloudy.'}]}}]}}},
  'similarityScore': 0.73527116}]}

```

You can use the `function_names` filter to restrict which examples are included in the similarity search.

```
    "stored_contents_example_key": "What's the weather in nyc",
      "values": ["weather_tool", "hotel_booking_tool"],
```
