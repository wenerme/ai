# Batch Mode

The Gemini API Batch Mode is designed to process large volumes of requests
asynchronously at [50% of the standard cost](/gemini-api/docs/pricing).
The target turnaround time is 24 hours, but in majority of cases, it is much
quicker.

Use Batch Mode for large-scale, non-urgent tasks such as data
pre-processing or running evaluations where an immediate response is not
required.
| **Note:** You can access Batch Mode using our Python libraries or the REST API. Support for other languages (including JavaScript/TypeScript) is coming soon.

Creating a batch job
--------------------

You have two ways to submit your requests in Batch Mode:

- **[Inline Requests](#inline-requests):** A list of [`GenerateContentRequest`](/api/batch-mode#GenerateContentRequest) objects directly included in your batch creation request. This is suitable for smaller batches that keep the total request size under 20MB. The **output** returned from the model is a list of `inlineResponse` objects.
- **[Input File](#input-file):** A [JSON Lines (JSONL)](https://jsonlines.org/) file where each line contains a complete [`GenerateContentRequest`](/api/batch-mode#GenerateContentRequest) object. This method is recommended for larger requests. The **output** returned from the model is a JSONL file where each line is either a `GenerateContentResponse` or a status object.

### Inline requests

For a small number of requests, you can directly embed the
[`GenerateContentRequest`](/api/batch-mode#GenerateContentRequest) objects
within your [`BatchGenerateContentRequest`](/api/batch-mode#request-body). The
following example calls the
[`BatchGenerateContent`](/api/batch-mode#google.ai.generativelanguage.v1beta.BatchService.BatchGenerateContent)
method with inline requests:  

### Python


    from google import genai
    from google.genai import types

    client = genai.Client()

    # A list of dictionaries, where each is a GenerateContentRequest
    inline_requests = [
        {
            'contents': [{
                'parts': [{'text': 'Tell me a one-sentence joke.'}],
                'role': 'user'
            }]
        },
        {
            'contents': [{
                'parts': [{'text': 'Why is the sky blue?'}],
                'role': 'user'
            }]
        }
    ]

    inline_batch_job = client.batches.create(
        model="models/gemini-2.5-flash",
        src=inline_requests,
        config={
            'display_name': "inlined-requests-job-1",
        },
    )

    print(f"Created batch job: {inline_batch_job.name}")

### REST

    curl https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:batchGenerateContent \
    -H "x-goog-api-key: $GEMINI_API_KEY" \
    -X POST \
    -H "Content-Type:application/json" \
    -d '{
        "batch": {
            "display_name": "my-batch-requests",
            "input_config": {
                "requests": {
                    "requests": [
                        {
                            "request": {"contents": [{"parts": [{"text": "Describe the process of photosynthesis."}]}]},
                            "metadata": {
                                "key": "request-1"
                            }
                        },
                        {
                            "request": {"contents": [{"parts": [{"text": "Describe the process of photosynthesis."}]}]},
                            "metadata": {
                                "key": "request-2"
                            }
                        }
                    ]
                }
            }
        }
    }'

### Input file

For larger sets of requests, prepare a JSON Lines (JSONL) file. Each line in
this file must be a JSON object containing a user-defined key and a request
object, where the request is a valid
[`GenerateContentRequest`](/api/batch-mode#GenerateContentRequest) object. The
user-defined key is used in the response to indicate which output is the result
of which request. For example, the request with the key defined as `request-1`
will have its response annotated with the same key name.

This file is uploaded using the [File API](/gemini-api/docs/files). The maximum
allowed file size for an input file is 2GB.

The following is an example of a JSONL file. You can save it in a file named
`my-batch-requests.json`:  

    {"key": "request-1", "request": {"contents": [{"parts": [{"text": "Describe the process of photosynthesis."}]}], "generation_config": {"temperature": 0.7}}}
    {"key": "request-2", "request": {"contents": [{"parts": [{"text": "What are the main ingredients in a Margherita pizza?"}]}]}}

Similarly to inline requests, you can specify other parameters like system
instructions, tools or other configurations in each request JSON.

You can upload this file using the [File API](/gemini-api/docs/files) as
shown in the following example. If
you are working with multimodal input, you can reference other uploaded files
within your JSONL file.  

### Python


    from google import genai
    from google.genai import types

    client = genai.Client()

    # Create a sample JSONL file
    with open("my-batch-requests.jsonl", "w") as f:
        requests = [
            {"key": "request-1", "request": {"contents": [{"parts": [{"text": "Describe the process of photosynthesis."}]}]}},
            {"key": "request-2", "request": {"contents": [{"parts": [{"text": "What are the main ingredients in a Margherita pizza?"}]}]}}
        ]
        for req in requests:
            f.write(json.dumps(req) + "\n")

    # Upload the file to the File API
    uploaded_file = client.files.upload(
        file='my-batch-requests.jsonl',
        config=types.UploadFileConfig(display_name='my-batch-requests', mime_type='jsonl')
    )

    print(f"Uploaded file: {uploaded_file.name}")

### REST

    tmp_batch_input_file=batch_input.tmp
    echo -e '{"contents": [{"parts": [{"text": "Describe the process of photosynthesis."}]}], "generationConfig": {"temperature": 0.7}}\n{"contents": [{"parts": [{"text": "What are the main ingredients in a Margherita pizza?"}]}]}' > batch_input.tmp
    MIME_TYPE=$(file -b --mime-type "${tmp_batch_input_file}")
    NUM_BYTES=$(wc -c < "${tmp_batch_input_file}")
    DISPLAY_NAME=BatchInput

    tmp_header_file=upload-header.tmp

    # Initial resumable request defining metadata.
    # The upload url is in the response headers dump them to a file.
    curl "https://generativelanguage.googleapis.com/upload/v1beta/files \
    -D "${tmp_header_file}" \
    -H "x-goog-api-key: $GEMINI_API_KEY" \
    -H "X-Goog-Upload-Protocol: resumable" \
    -H "X-Goog-Upload-Command: start" \
    -H "X-Goog-Upload-Header-Content-Length: ${NUM_BYTES}" \
    -H "X-Goog-Upload-Header-Content-Type: ${MIME_TYPE}" \
    -H "Content-Type: application/jsonl" \
    -d "{'file': {'display_name': '${DISPLAY_NAME}'}}" 2> /dev/null

    upload_url=$(grep -i "x-goog-upload-url: " "${tmp_header_file}" | cut -d" " -f2 | tr -d "\r")
    rm "${tmp_header_file}"

    # Upload the actual bytes.
    curl "${upload_url}" \
    -H "Content-Length: ${NUM_BYTES}" \
    -H "X-Goog-Upload-Offset: 0" \
    -H "X-Goog-Upload-Command: upload, finalize" \
    --data-binary "@${tmp_batch_input_file}" 2> /dev/null > file_info.json

    file_uri=$(jq ".file.uri" file_info.json)

The following example calls the
[`BatchGenerateContent`](/api/batch-mode#google.ai.generativelanguage.v1beta.BatchService.BatchGenerateContent)
method with the input file uploaded using File API:  

### Python


    # Assumes `uploaded_file` is the file object from the previous step
    file_batch_job = client.batches.create(
        model="gemini-2.5-flash",
        src=uploaded_file.name,
        config={
            'display_name': "file-upload-job-1",
        },
    )

    print(f"Created batch job: {file_batch_job.name}")

### REST

    BATCH_INPUT_FILE='files/123456' # File ID
    curl https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:batchGenerateContent \
    -X POST \
    -H "x-goog-api-key: $GEMINI_API_KEY" \
    -H "Content-Type:application/json" \
    -d "{
        'batch': {
            'display_name': 'my-batch-requests',
            'input_config': {
                'requests': {
                    'file_name': ${BATCH_INPUT_FILE}
                }
            }
        }
    }"

When you create a batch job, you will get a job name returned. Use this name
for [monitoring](#batch-job-status) the job status as well as
[retrieving the results](#retrieve-batch-results) once the job completes.

The following is an example output that contains a job name:  


    Created batch job from file: batches/123456789

### Request configuration

You can include any request configurations you would use in a standard non-batch
request. For example, you could specify the temperature, system instructions or
even pass in other modalities. The following example shows an example inline
request that contains a system instruction for one of the requests:  

    inline_requests_list = [
        {'contents': [{'parts': [{'text': 'Write a short poem about a cloud.'}]}]},
        {'contents': [{'parts': [{'text': 'Write a short poem about a cat.'}]}], 'system_instructions': {'parts': [{'text': 'You are a cat. Your name is Neko.'}]}}
    ]

Similarly can specify tools to use for a request. The following example
shows a request that enables the [Google Search tool](/gemini-api/docs/google-search):  

    inline_requests_list = [
        {'contents': [{'parts': [{'text': 'Who won the euro 1998?'}]}]},
        {'contents': [{'parts': [{'text': 'Who won the euro 2025?'}]}], 'tools': [{'google_search ': {}}]}
    ]

You can specify [structured output](/gemini-api/docs/structured-output) as well.
The following example shows how to specify for your batch requests.  

    from google import genai
    from pydantic import BaseModel, TypeAdapter

    class Recipe(BaseModel):
        recipe_name: str
        ingredients: list[str]

    client = genai.Client()

    # A list of dictionaries, where each is a GenerateContentRequest
    inline_requests = [
        {
            'contents': [{
                'parts': [{'text': 'List a few popular cookie recipes, and include the amounts of ingredients.'}],
                'role': 'user'
            }],
            'config': {
                'response_mime_type': 'application/json',
                'response_schema': list[Recipe]
            }
        },
        {
            'contents': [{
                'parts': [{'text': 'List a few popular gluten free cookie recipes, and include the amounts of ingredients.'}],
                'role': 'user'
            }],
            'config': {
                'response_mime_type': 'application/json',
                'response_schema': list[Recipe]
            }
        }
    ]

    inline_batch_job = client.batches.create(
        model="models/gemini-2.5-flash",
        src=inline_requests,
        config={
            'display_name': "structured-output-job-1"
        },
    )

    # wait for the job to finish
    job_name = inline_batch_job.name
    print(f"Polling status for job: {job_name}")

    while True:
        batch_job_inline = client.batches.get(name=job_name)
        if batch_job_inline.state.name in ('JOB_STATE_SUCCEEDED', 'JOB_STATE_FAILED', 'JOB_STATE_CANCELLED', 'JOB_STATE_EXPIRED'):
            break
        print(f"Job not finished. Current state: {batch_job_inline.state.name}. Waiting 30 seconds...")
        time.sleep(30)

    print(f"Job finished with state: {batch_job_inline.state.name}")

    # print the response
    for i, inline_response in enumerate(batch_job_inline.dest.inlined_responses):
        print(f"\n--- Response {i+1} ---")

        # Check for a successful response
        if inline_response.response:
            # The .text property is a shortcut to the generated text.
            print(inline_response.response.text)

Monitoring job status
---------------------

Use the operation name obtained when creating the batch job to poll its status.
The state field of the batch job will indicate its current status. A batch job
can be in one of the following states:

- `JOB_STATE_PENDING`: The job has been created and is waiting to be processed by the service.
- `JOB_STATE_RUNNING`: The job is in progress.
- `JOB_STATE_SUCCEEDED`: The job completed successfully. You can now retrieve the results.
- `JOB_STATE_FAILED`: The job failed. Check the error details for more information.
- `JOB_STATE_CANCELLED`: The job was cancelled by the user.
- `JOB_STATE_EXPIRED`: The job has expired because it was running or pending for more than 48 hours. The job will not have any results to retrieve. You can try submitting the job again or splitting up the requests into smaller batches.

You can poll the job status periodically to check for completion.  

### Python


    # Use the name of the job you want to check
    # e.g., inline_batch_job.name from the previous step
    job_name = "YOUR_BATCH_JOB_NAME"  # (e.g. 'batches/your-batch-id')
    batch_job = client.batches.get(name=job_name)

    completed_states = set([
        'JOB_STATE_SUCCEEDED',
        'JOB_STATE_FAILED',
        'JOB_STATE_CANCELLED',
        'JOB_STATE_EXPIRED',
    ])

    print(f"Polling status for job: {job_name}")
    batch_job = client.batches.get(name=job_name) # Initial get
    while batch_job.state.name not in completed_states:
      print(f"Current state: {batch_job.state.name}")
      time.sleep(30) # Wait for 30 seconds before polling again
      batch_job = client.batches.get(name=job_name)

    print(f"Job finished with state: {batch_job.state.name}")
    if batch_job.state.name == 'JOB_STATE_FAILED':
        print(f"Error: {batch_job.error}")

Retrieving results
------------------

Once the job status indicates your batch job has succeeded, the results are
available in the `response` field.  

### Python

    import json

    # Use the name of the job you want to check
    # e.g., inline_batch_job.name from the previous step
    job_name = "YOUR_BATCH_JOB_NAME"
    batch_job = client.batches.get(name=job_name)

    if batch_job.state.name == 'JOB_STATE_SUCCEEDED':

        # If batch job was created with a file
        if batch_job.dest and batch_job.dest.file_name:
            # Results are in a file
            result_file_name = batch_job.dest.file_name
            print(f"Results are in file: {result_file_name}")

            print("Downloading result file content...")
            file_content = client.files.download(file=result_file_name)
            # Process file_content (bytes) as needed
            print(file_content.decode('utf-8'))

        # If batch job was created with inline request
        elif batch_job.dest and batch_job.dest.inlined_responses:
            # Results are inline
            print("Results are inline:")
            for i, inline_response in enumerate(batch_job.dest.inlined_responses):
                print(f"Response {i+1}:")
                if inline_response.response:
                    # Accessing response, structure may vary.
                    try:
                        print(inline_response.response.text)
                    except AttributeError:
                        print(inline_response.response) # Fallback
                elif inline_response.error:
                    print(f"Error: {inline_response.error}")
        else:
            print("No results found (neither file nor inline).")
    else:
        print(f"Job did not succeed. Final state: {batch_job.state.name}")
        if batch_job.error:
            print(f"Error: {batch_job.error}")

### REST

    BATCH_NAME="batches/123456" # Your batch job name

    curl https://generativelanguage.googleapis.com/v1beta/$BATCH_NAME \
    -H "x-goog-api-key: $GEMINI_API_KEY" \
    -H "Content-Type:application/json" 2> /dev/null > batch_status.json

    if jq -r '.done' batch_status.json | grep -q "false"; then
        echo "Batch has not finished processing"
    fi

    batch_state=$(jq -r '.metadata.state' batch_status.json)
    if [[ $batch_state = "JOB_STATE_SUCCEEDED" ]]; then
        if [[ $(jq '.response | has("inlinedResponses")' batch_status.json) = "true" ]]; then
            jq -r '.response.inlinedResponses' batch_status.json
            exit
        fi
        responses_file_name=$(jq -r '.response.responsesFile' batch_status.json)
        curl https://generativelanguage.googleapis.com/download/v1beta/$responses_file_name:download?alt=media \
        -H "x-goog-api-key: $GEMINI_API_KEY" 2> /dev/null
    elif [[ $batch_state = "JOB_STATE_FAILED" ]]; then
        jq '.error' batch_status.json
    elif [[ $batch_state == "JOB_STATE_CANCELLED" ]]; then
        echo "Batch was cancelled by the user"
    elif [[ $batch_state == "JOB_STATE_EXPIRED" ]]; then
        echo "Batch expired after 48 hours"
    fi

Cancelling a batch job
----------------------

You can cancel an ongoing batch job using its name. When a job is
canceled, it stops processing new requests.  

### Python

    # Cancel a batch job
    client.batches.cancel(name=batch_job_to_cancel.name)

### REST

    BATCH_NAME="batches/123456" # Your batch job name

    # Cancel the batch
    curl https://generativelanguage.googleapis.com/v1beta/$BATCH_NAME:cancel \
    -H "x-goog-api-key: $GEMINI_API_KEY" \

    # Confirm that the status of the batch after cancellation is JOB_STATE_CANCELLED
    curl https://generativelanguage.googleapis.com/v1beta/$BATCH_NAME \
    -H "x-goog-api-key: $GEMINI_API_KEY" \
    -H "Content-Type:application/json" 2> /dev/null | jq -r '.metadata.state'

Deleting a batch job
--------------------

You can delete an existing batch job using its name. When a job is
deleted, it stops processing new requests and is removed from the list of
batch jobs.  

### Python

    # Delete a batch job
    client.batches.delete(name=batch_job_to_delete.name)

### REST

    BATCH_NAME="batches/123456" # Your batch job name

    # Delete the batch job
    curl https://generativelanguage.googleapis.com/v1beta/$BATCH_NAME:delete \
    -H "x-goog-api-key: $GEMINI_API_KEY"

Technical details
-----------------

- **Supported models:** Batch Mode supports a range of Gemini models. Refer to the [Models page](/gemini-api/docs/models) for each model's support of Batch Mode. The supported modalities for Batch Mode are the same as what's supported on the interactive (or non-batch mode) API.
- **Pricing:** Batch Mode usage is priced at 50% of the standard interactive API cost for the equivalent model. See the [pricing page](/gemini-api/docs/pricing) for details. Refer to the [rate limits page](/gemini-api/docs/rate-limits#batch-mode) for details on rate limits for this feature.
- **Service Level Objective (SLO):** Batch jobs are designed to complete within a 24-hour turnaround time. Many jobs may complete much faster depending on their size and current system load.
- **Caching:** [Context caching](/gemini-api/docs/caching) is enabled for batch requests. If a request in your batch results in a cache hit, the cached tokens are priced the same as for non-batch mode traffic.

Best practices
--------------

- **Use input files for large requests:** For a large number of requests, always use the file input method for better manageability and to avoid hitting request size limits for the [`BatchGenerateContent`](/api/batch-mode#google.ai.generativelanguage.v1beta.BatchService.BatchGenerateContent) call itself. Note that there's a the 2GB file size limit per input file.
- **Error handling:** Check the `batchStats` for `failedRequestCount` after a job completes. If using file output, parse each line to check if it's a `GenerateContentResponse` or a status object indicating an error for that specific request. See the [troubleshooting
  guide](/gemini-api/docs/troubleshooting#error-codes) for a complete set of error codes.
- **Submit jobs once:** The creation of a batch job is not idempotent. If you send the same creation request twice, two separate batch jobs will be created.
- **Break up very large batches:** While the target turnaround time is 24 hours, actual processing time can vary based on system load and job size. For large jobs, consider breaking them into smaller batches if intermediate results are needed sooner.

What's next
-----------

Check out the [batch mode notebook](https://colab.research.google.com/github/google-gemini/cookbook/blob/main/quickstarts/Batch_mode.ipynb)
for more examples.