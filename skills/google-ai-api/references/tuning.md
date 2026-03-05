The Gemini API's fine tuning support provides a mechanism for curating output when you have a small dataset of input/output examples. For more details, check out the[Model tuning guide](https://ai.google.dev/gemini-api/docs/model-tuning)and[tutorial](https://ai.google.dev/gemini-api/docs/model-tuning/tutorial).  

## Method: tunedModels.create

- [Endpoint](https://ai.google.dev/api/tuning#body.HTTP_TEMPLATE)
- [Query parameters](https://ai.google.dev/api/tuning#body.QUERY_PARAMETERS)
- [Request body](https://ai.google.dev/api/tuning#body.request_body)
- [Response body](https://ai.google.dev/api/tuning#body.response_body)
- [Authorization scopes](https://ai.google.dev/api/tuning#body.aspect)
- [Example request](https://ai.google.dev/api/tuning#body.codeSnippets)
  - [Create](https://ai.google.dev/api/tuning#body.codeSnippets.group)

Creates a tuned model. Check intermediate tuning progress (if any) through the`google.longrunning.Operations`service.

Access status and results through the Operations service. Example: GET /v1/tunedModels/az2mb0bpw6i/operations/000-111-222  

### Endpoint

post`https:``/``/generativelanguage.googleapis.com``/v1beta``/tunedModels`  

### Query parameters

`tunedModelId``string`  
Optional. The unique id for the tuned model if specified. This value should be up to 40 characters, the first character must be a letter, the last could be a letter or a number. The id must match the regular expression:`[a-z]([a-z0-9-]{0,38}[a-z0-9])?`.

### Request body

The request body contains an instance of[TunedModel](https://ai.google.dev/api/tuning#TunedModel).
Fields`displayName``string`  
Optional. The name to display for this model in user interfaces. The display name must be up to 40 characters including spaces.
`description``string`  
Optional. A short description of this model.
`tuningTask``object (`[TuningTask](https://ai.google.dev/api/tuning#TuningTask)`)`  
Required. The tuning task that creates the tuned model.
`readerProjectNumbers[]``string (`[int64](https://developers.google.com/discovery/v1/type-format)` format)`  
Optional. List of project numbers that have read access to the tuned model.  
`source_model``Union type`  
The model used as the starting point for tuning.`source_model`can be only one of the following:
`tunedModelSource``object (`[TunedModelSource](https://ai.google.dev/api/tuning#TunedModelSource)`)`  
Optional. TunedModel to use as the starting point for training the new model.
`baseModel``string`  
Immutable. The name of the`Model`to tune. Example:`models/gemini-1.5-flash-001`
`temperature``number`  
Optional. Controls the randomness of the output.

Values can range over`[0.0,1.0]`, inclusive. A value closer to`1.0`will produce responses that are more varied, while a value closer to`0.0`will typically result in less surprising responses from the model.

This value specifies default to be the one used by the base model while creating the model.
`topP``number`  
Optional. For Nucleus sampling.

Nucleus sampling considers the smallest set of tokens whose probability sum is at least`topP`.

This value specifies default to be the one used by the base model while creating the model.
`topK``integer`  
Optional. For Top-k sampling.

Top-k sampling considers the set of`topK`most probable tokens. This value specifies default to be used by the backend while making the call to the model.

This value specifies default to be the one used by the base model while creating the model.  

### Example request

### Python

    # With Gemini 2 we're launching a new SDK. See the following doc for details.
    # https://ai.google.dev/gemini-api/docs/migrate  
    https://github.com/google-gemini/deprecated-generative-ai-python/blob/7a7cc5474ddaa0255a4410e05361028a24400abd/README.md#L23-L24

### Response body

If successful, the response body contains a newly created instance of[Operation](https://ai.google.dev/api/batch-mode#Operation).  

## Method: tunedModels.generateContent

- [Endpoint](https://ai.google.dev/api/tuning#body.HTTP_TEMPLATE)
- [Path parameters](https://ai.google.dev/api/tuning#body.PATH_PARAMETERS)
- [Request body](https://ai.google.dev/api/tuning#body.request_body)
  - [JSON representation](https://ai.google.dev/api/tuning#body.request_body.SCHEMA_REPRESENTATION)
- [Response body](https://ai.google.dev/api/tuning#body.response_body)
- [Authorization scopes](https://ai.google.dev/api/tuning#body.aspect)
- [Example request](https://ai.google.dev/api/tuning#body.codeSnippets)
  - [Text](https://ai.google.dev/api/tuning#body.codeSnippets.group)
  - [Image](https://ai.google.dev/api/tuning#body.codeSnippets.group_1)
  - [Audio](https://ai.google.dev/api/tuning#body.codeSnippets.group_2)
  - [Video](https://ai.google.dev/api/tuning#body.codeSnippets.group_3)
  - [PDF](https://ai.google.dev/api/tuning#body.codeSnippets.group_4)
  - [Chat](https://ai.google.dev/api/tuning#body.codeSnippets.group_5)
  - [Cache](https://ai.google.dev/api/tuning#body.codeSnippets.group_6)
  - [Tuned Model](https://ai.google.dev/api/tuning#body.codeSnippets.group_7)
  - [JSON Mode](https://ai.google.dev/api/tuning#body.codeSnippets.group_8)
  - [Code execution](https://ai.google.dev/api/tuning#body.codeSnippets.group_9)
  - [Function Calling](https://ai.google.dev/api/tuning#body.codeSnippets.group_10)
  - [Generation config](https://ai.google.dev/api/tuning#body.codeSnippets.group_11)
  - [Safety Settings](https://ai.google.dev/api/tuning#body.codeSnippets.group_12)
  - [System Instruction](https://ai.google.dev/api/tuning#body.codeSnippets.group_13)

Generates a model response given an input`GenerateContentRequest`. Refer to the[text generation guide](https://ai.google.dev/gemini-api/docs/text-generation)for detailed usage information. Input capabilities differ between models, including tuned models. Refer to the[model guide](https://ai.google.dev/gemini-api/docs/models/gemini)and[tuning guide](https://ai.google.dev/gemini-api/docs/model-tuning)for details.  

### Endpoint

post`https:``/``/generativelanguage.googleapis.com``/v1beta``/{model=tunedModels``/*}:generateContent`  

### Path parameters

`model``string`  
Required. The name of the`Model`to use for generating the completion.

Format:`models/{model}`. It takes the form`tunedModels/{tunedmodel}`.

### Request body

The request body contains data with the following structure:
Fields`contents[]``object (`[Content](https://ai.google.dev/api/caching#Content)`)`  
Required. The content of the current conversation with the model.

For single-turn queries, this is a single instance. For multi-turn queries like[chat](https://ai.google.dev/gemini-api/docs/text-generation#chat), this is a repeated field that contains the conversation history and the latest request.
`tools[]``object (`[Tool](https://ai.google.dev/api/caching#Tool)`)`  
Optional. A list of`Tools`the`Model`may use to generate the next response.

A`Tool`is a piece of code that enables the system to interact with external systems to perform an action, or set of actions, outside of knowledge and scope of the`Model`. Supported`Tool`s are`Function`and`codeExecution`. Refer to the[Function calling](https://ai.google.dev/gemini-api/docs/function-calling)and the[Code execution](https://ai.google.dev/gemini-api/docs/code-execution)guides to learn more.
`toolConfig``object (`[ToolConfig](https://ai.google.dev/api/caching#ToolConfig)`)`  
Optional. Tool configuration for any`Tool`specified in the request. Refer to the[Function calling guide](https://ai.google.dev/gemini-api/docs/function-calling#function_calling_mode)for a usage example.
`safetySettings[]``object (`[SafetySetting](https://ai.google.dev/api/generate-content#v1beta.SafetySetting)`)`  
Optional. A list of unique`SafetySetting`instances for blocking unsafe content.

This will be enforced on the`GenerateContentRequest.contents`and`GenerateContentResponse.candidates`. There should not be more than one setting for each`SafetyCategory`type. The API will block any contents and responses that fail to meet the thresholds set by these settings. This list overrides the default settings for each`SafetyCategory`specified in the safetySettings. If there is no`SafetySetting`for a given`SafetyCategory`provided in the list, the API will use the default safety setting for that category. Harm categories HARM_CATEGORY_HATE_SPEECH, HARM_CATEGORY_SEXUALLY_EXPLICIT, HARM_CATEGORY_DANGEROUS_CONTENT, HARM_CATEGORY_HARASSMENT, HARM_CATEGORY_CIVIC_INTEGRITY are supported. Refer to the[guide](https://ai.google.dev/gemini-api/docs/safety-settings)for detailed information on available safety settings. Also refer to the[Safety guidance](https://ai.google.dev/gemini-api/docs/safety-guidance)to learn how to incorporate safety considerations in your AI applications.
`systemInstruction``object (`[Content](https://ai.google.dev/api/caching#Content)`)`  
Optional. Developer set[system instruction(s)](https://ai.google.dev/gemini-api/docs/system-instructions). Currently, text only.
`generationConfig``object (`[GenerationConfig](https://ai.google.dev/api/generate-content#v1beta.GenerationConfig)`)`  
Optional. Configuration options for model generation and outputs.
`cachedContent``string`  
Optional. The name of the content[cached](https://ai.google.dev/gemini-api/docs/caching)to use as context to serve the prediction. Format:`cachedContents/{cachedContent}`  

### Example request

### Text

### Python

    from google import genai

    client = genai.Client()
    response = client.models.generate_content(
        model="gemini-2.0-flash", contents="Write a story about a magic backpack."
    )
    print(response.text)  
    https://github.com/google-gemini/api-examples/blob/856e8a0f566a2810625cecabba6e2ab1fe97e496/python/text_generation.py#L26-L32

### Node.js

    // Make sure to include the following import:
    // import {GoogleGenAI} from '@google/genai';
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: "Write a story about a magic backpack.",
    });
    console.log(response.text);  
    https://github.com/google-gemini/api-examples/blob/856e8a0f566a2810625cecabba6e2ab1fe97e496/javascript/text_generation.js#L36-L44

### Go

    ctx := context.Background()
    client, err := genai.NewClient(ctx, &genai.ClientConfig{
    	APIKey:  os.Getenv("GEMINI_API_KEY"),
    	Backend: genai.BackendGeminiAPI,
    })
    if err != nil {
    	log.Fatal(err)
    }
    contents := []*genai.Content{
    	genai.NewContentFromText("Write a story about a magic backpack.", genai.RoleUser),
    }
    response, err := client.Models.GenerateContent(ctx, "gemini-2.0-flash", contents, nil)
    if err != nil {
    	log.Fatal(err)
    }
    printResponse(response)  
    https://github.com/google-gemini/api-examples/blob/856e8a0f566a2810625cecabba6e2ab1fe97e496/go/text_generation.go#L16-L31

### Shell

    curl "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=$GEMINI_API_KEY" \
        -H 'Content-Type: application/json' \
        -X POST \
        -d '{
          "contents": [{
            "parts":[{"text": "Write a story about a magic backpack."}]
            }]
           }' 2> /dev/null  
    https://github.com/google-gemini/deprecated-generative-ai-python/blob/7a7cc5474ddaa0255a4410e05361028a24400abd/samples/rest/text_generation.sh#L21-L29

### Java

    // Specify a Gemini model appropriate for your use case
    GenerativeModel gm =
        new GenerativeModel(
            /* modelName */ "gemini-1.5-flash",
            // Access your API key as a Build Configuration variable (see "Set up your API key"
            // above)
            /* apiKey */ BuildConfig.apiKey);
    GenerativeModelFutures model = GenerativeModelFutures.from(gm);

    Content content =
        new Content.Builder().addText("Write a story about a magic backpack.").build();

    // For illustrative purposes only. You should use an executor that fits your needs.
    Executor executor = Executors.newSingleThreadExecutor();

    ListenableFuture<GenerateContentResponse> response = model.generateContent(content);
    Futures.addCallback(
        response,
        new FutureCallback<GenerateContentResponse>() {
          @Override
          public void onSuccess(GenerateContentResponse result) {
            String resultText = result.getText();
            System.out.println(resultText);
          }

          @Override
          public void onFailure(Throwable t) {
            t.printStackTrace();
          }
        },
        executor);  
    https://github.com/google-gemini/generative-ai-android/blob/a77dc5e4dc07d7aa710f59fde1908fbfff2e0e70/samples/src/main/java/com/google/ai/client/generative/samples/java/text_generation.java#L44-L74

### Image

### Python

    from google import genai
    import PIL.Image

    client = genai.Client()
    organ = PIL.Image.open(media / "organ.jpg")
    response = client.models.generate_content(
        model="gemini-2.0-flash", contents=["Tell me about this instrument", organ]
    )
    print(response.text)  
    https://github.com/google-gemini/api-examples/blob/856e8a0f566a2810625cecabba6e2ab1fe97e496/python/text_generation.py#L50-L58

### Node.js

    // Make sure to include the following import:
    // import {GoogleGenAI} from '@google/genai';
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

    const organ = await ai.files.upload({
      file: path.join(media, "organ.jpg"),
    });

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: [
        createUserContent([
          "Tell me about this instrument", 
          createPartFromUri(organ.uri, organ.mimeType)
        ]),
      ],
    });
    console.log(response.text);  
    https://github.com/google-gemini/api-examples/blob/856e8a0f566a2810625cecabba6e2ab1fe97e496/javascript/text_generation.js#L70-L87

### Go

    ctx := context.Background()
    client, err := genai.NewClient(ctx, &genai.ClientConfig{
    	APIKey:  os.Getenv("GEMINI_API_KEY"),
    	Backend: genai.BackendGeminiAPI,
    })
    if err != nil {
    	log.Fatal(err)
    }

    file, err := client.Files.UploadFromPath(
    	ctx, 
    	filepath.Join(getMedia(), "organ.jpg"), 
    	&genai.UploadFileConfig{
    		MIMEType : "image/jpeg",
    	},
    )
    if err != nil {
    	log.Fatal(err)
    }
    parts := []*genai.Part{
    	genai.NewPartFromText("Tell me about this instrument"),
    	genai.NewPartFromURI(file.URI, file.MIMEType),
    }
    contents := []*genai.Content{
    	genai.NewContentFromParts(parts, genai.RoleUser),
    }

    response, err := client.Models.GenerateContent(ctx, "gemini-2.0-flash", contents, nil)
    if err != nil {
    	log.Fatal(err)
    }
    printResponse(response)  
    https://github.com/google-gemini/api-examples/blob/856e8a0f566a2810625cecabba6e2ab1fe97e496/go/text_generation.go#L66-L97

### Shell

    # Use a temporary file to hold the base64 encoded image data
    TEMP_B64=$(mktemp)
    trap 'rm -f "$TEMP_B64"' EXIT
    base64 $B64FLAGS $IMG_PATH > "$TEMP_B64"

    # Use a temporary file to hold the JSON payload
    TEMP_JSON=$(mktemp)
    trap 'rm -f "$TEMP_JSON"' EXIT

    cat > "$TEMP_JSON" << EOF
    {
      "contents": [{
        "parts":[
          {"text": "Tell me about this instrument"},
          {
            "inline_data": {
              "mime_type":"image/jpeg",
              "data": "$(cat "$TEMP_B64")"
            }
          }
        ]
      }]
    }
    EOF

    curl "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=$GEMINI_API_KEY" \
        -H 'Content-Type: application/json' \
        -X POST \
        -d "@$TEMP_JSON" 2> /dev/null  
    https://github.com/google-gemini/deprecated-generative-ai-python/blob/7a7cc5474ddaa0255a4410e05361028a24400abd/samples/rest/text_generation.sh#L41-L70

### Java

    // Specify a Gemini model appropriate for your use case
    GenerativeModel gm =
        new GenerativeModel(
            /* modelName */ "gemini-1.5-flash",
            // Access your API key as a Build Configuration variable (see "Set up your API key"
            // above)
            /* apiKey */ BuildConfig.apiKey);
    GenerativeModelFutures model = GenerativeModelFutures.from(gm);

    Bitmap image = BitmapFactory.decodeResource(context.getResources(), R.drawable.image);

    Content content =
        new Content.Builder()
            .addText("What's different between these pictures?")
            .addImage(image)
            .build();

    // For illustrative purposes only. You should use an executor that fits your needs.
    Executor executor = Executors.newSingleThreadExecutor();

    ListenableFuture<GenerateContentResponse> response = model.generateContent(content);
    Futures.addCallback(
        response,
        new FutureCallback<GenerateContentResponse>() {
          @Override
          public void onSuccess(GenerateContentResponse result) {
            String resultText = result.getText();
            System.out.println(resultText);
          }

          @Override
          public void onFailure(Throwable t) {
            t.printStackTrace();
          }
        },
        executor);  
    https://github.com/google-gemini/generative-ai-android/blob/a77dc5e4dc07d7aa710f59fde1908fbfff2e0e70/samples/src/main/java/com/google/ai/client/generative/samples/java/text_generation.java#L124-L159

### Audio

### Python

    from google import genai

    client = genai.Client()
    sample_audio = client.files.upload(file=media / "sample.mp3")
    response = client.models.generate_content(
        model="gemini-2.0-flash",
        contents=["Give me a summary of this audio file.", sample_audio],
    )
    print(response.text)  
    https://github.com/google-gemini/api-examples/blob/856e8a0f566a2810625cecabba6e2ab1fe97e496/python/text_generation.py#L118-L126

### Node.js

    // Make sure to include the following import:
    // import {GoogleGenAI} from '@google/genai';
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

    const audio = await ai.files.upload({
      file: path.join(media, "sample.mp3"),
    });

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: [
        createUserContent([
          "Give me a summary of this audio file.",
          createPartFromUri(audio.uri, audio.mimeType),
        ]),
      ],
    });
    console.log(response.text);  
    https://github.com/google-gemini/api-examples/blob/856e8a0f566a2810625cecabba6e2ab1fe97e496/javascript/text_generation.js#L185-L202

### Go

    ctx := context.Background()
    client, err := genai.NewClient(ctx, &genai.ClientConfig{
    	APIKey:  os.Getenv("GEMINI_API_KEY"),
    	Backend: genai.BackendGeminiAPI,
    })
    if err != nil {
    	log.Fatal(err)
    }

    file, err := client.Files.UploadFromPath(
    	ctx, 
    	filepath.Join(getMedia(), "sample.mp3"), 
    	&genai.UploadFileConfig{
    		MIMEType : "audio/mpeg",
    	},
    )
    if err != nil {
    	log.Fatal(err)
    }

    parts := []*genai.Part{
    	genai.NewPartFromText("Give me a summary of this audio file."),
    	genai.NewPartFromURI(file.URI, file.MIMEType),
    }

    contents := []*genai.Content{
    	genai.NewContentFromParts(parts, genai.RoleUser),
    }

    response, err := client.Models.GenerateContent(ctx, "gemini-2.0-flash", contents, nil)
    if err != nil {
    	log.Fatal(err)
    }
    printResponse(response)  
    https://github.com/google-gemini/api-examples/blob/856e8a0f566a2810625cecabba6e2ab1fe97e496/go/text_generation.go#L256-L289

### Shell

    # Use File API to upload audio data to API request.
    MIME_TYPE=$(file -b --mime-type "${AUDIO_PATH}")
    NUM_BYTES=$(wc -c < "${AUDIO_PATH}")
    DISPLAY_NAME=AUDIO

    tmp_header_file=upload-header.tmp

    # Initial resumable request defining metadata.
    # The upload url is in the response headers dump them to a file.
    curl "${BASE_URL}/upload/v1beta/files?key=${GEMINI_API_KEY}" \
      -D upload-header.tmp \
      -H "X-Goog-Upload-Protocol: resumable" \
      -H "X-Goog-Upload-Command: start" \
      -H "X-Goog-Upload-Header-Content-Length: ${NUM_BYTES}" \
      -H "X-Goog-Upload-Header-Content-Type: ${MIME_TYPE}" \
      -H "Content-Type: application/json" \
      -d "{'file': {'display_name': '${DISPLAY_NAME}'}}" 2> /dev/null

    upload_url=$(grep -i "x-goog-upload-url: " "${tmp_header_file}" | cut -d" " -f2 | tr -d "\r")
    rm "${tmp_header_file}"

    # Upload the actual bytes.
    curl "${upload_url}" \
      -H "Content-Length: ${NUM_BYTES}" \
      -H "X-Goog-Upload-Offset: 0" \
      -H "X-Goog-Upload-Command: upload, finalize" \
      --data-binary "@${AUDIO_PATH}" 2> /dev/null > file_info.json

    file_uri=$(jq ".file.uri" file_info.json)
    echo file_uri=$file_uri

    curl "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=$GEMINI_API_KEY" \
        -H 'Content-Type: application/json' \
        -X POST \
        -d '{
          "contents": [{
            "parts":[
              {"text": "Please describe this file."},
              {"file_data":{"mime_type": "audio/mpeg", "file_uri": '$file_uri'}}]
            }]
           }' 2> /dev/null > response.json

    cat response.json
    echo

    jq ".candidates[].content.parts[].text" response.json  
    https://github.com/google-gemini/deprecated-generative-ai-python/blob/7a7cc5474ddaa0255a4410e05361028a24400abd/samples/rest/text_generation.sh#L174-L220

### Video

### Python

    from google import genai
    import time

    client = genai.Client()
    # Video clip (CC BY 3.0) from https://peach.blender.org/download/
    myfile = client.files.upload(file=media / "Big_Buck_Bunny.mp4")
    print(f"{myfile=}")

    # Poll until the video file is completely processed (state becomes ACTIVE).
    while not myfile.state or myfile.state.name != "ACTIVE":
        print("Processing video...")
        print("File state:", myfile.state)
        time.sleep(5)
        myfile = client.files.get(name=myfile.name)

    response = client.models.generate_content(
        model="gemini-2.0-flash", contents=[myfile, "Describe this video clip"]
    )
    print(f"{response.text=}")  
    https://github.com/google-gemini/api-examples/blob/856e8a0f566a2810625cecabba6e2ab1fe97e496/python/text_generation.py#L146-L164

### Node.js

    // Make sure to include the following import:
    // import {GoogleGenAI} from '@google/genai';
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

    let video = await ai.files.upload({
      file: path.join(media, 'Big_Buck_Bunny.mp4'),
    });

    // Poll until the video file is completely processed (state becomes ACTIVE).
    while (!video.state || video.state.toString() !== 'ACTIVE') {
      console.log('Processing video...');
      console.log('File state: ', video.state);
      await sleep(5000);
      video = await ai.files.get({name: video.name});
    }

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: [
        createUserContent([
          "Describe this video clip",
          createPartFromUri(video.uri, video.mimeType),
        ]),
      ],
    });
    console.log(response.text);  
    https://github.com/google-gemini/api-examples/blob/856e8a0f566a2810625cecabba6e2ab1fe97e496/javascript/text_generation.js#L237-L262

### Go

    ctx := context.Background()
    client, err := genai.NewClient(ctx, &genai.ClientConfig{
    	APIKey:  os.Getenv("GEMINI_API_KEY"),
    	Backend: genai.BackendGeminiAPI,
    })
    if err != nil {
    	log.Fatal(err)
    }

    file, err := client.Files.UploadFromPath(
    	ctx, 
    	filepath.Join(getMedia(), "Big_Buck_Bunny.mp4"), 
    	&genai.UploadFileConfig{
    		MIMEType : "video/mp4",
    	},
    )
    if err != nil {
    	log.Fatal(err)
    }

    // Poll until the video file is completely processed (state becomes ACTIVE).
    for file.State == genai.FileStateUnspecified || file.State != genai.FileStateActive {
    	fmt.Println("Processing video...")
    	fmt.Println("File state:", file.State)
    	time.Sleep(5 * time.Second)

    	file, err = client.Files.Get(ctx, file.Name, nil)
    	if err != nil {
    		log.Fatal(err)
    	}
    }

    parts := []*genai.Part{
    	genai.NewPartFromText("Describe this video clip"),
    	genai.NewPartFromURI(file.URI, file.MIMEType),
    }

    contents := []*genai.Content{
    	genai.NewContentFromParts(parts, genai.RoleUser),
    }

    response, err := client.Models.GenerateContent(ctx, "gemini-2.0-flash", contents, nil)
    if err != nil {
    	log.Fatal(err)
    }
    printResponse(response)  
    https://github.com/google-gemini/api-examples/blob/856e8a0f566a2810625cecabba6e2ab1fe97e496/go/text_generation.go#L342-L387

### Shell

    # Use File API to upload audio data to API request.
    MIME_TYPE=$(file -b --mime-type "${VIDEO_PATH}")
    NUM_BYTES=$(wc -c < "${VIDEO_PATH}")
    DISPLAY_NAME=VIDEO

    # Initial resumable request defining metadata.
    # The upload url is in the response headers dump them to a file.
    curl "${BASE_URL}/upload/v1beta/files?key=${GEMINI_API_KEY}" \
      -D "${tmp_header_file}" \
      -H "X-Goog-Upload-Protocol: resumable" \
      -H "X-Goog-Upload-Command: start" \
      -H "X-Goog-Upload-Header-Content-Length: ${NUM_BYTES}" \
      -H "X-Goog-Upload-Header-Content-Type: ${MIME_TYPE}" \
      -H "Content-Type: application/json" \
      -d "{'file': {'display_name': '${DISPLAY_NAME}'}}" 2> /dev/null

    upload_url=$(grep -i "x-goog-upload-url: " "${tmp_header_file}" | cut -d" " -f2 | tr -d "\r")
    rm "${tmp_header_file}"

    # Upload the actual bytes.
    curl "${upload_url}" \
      -H "Content-Length: ${NUM_BYTES}" \
      -H "X-Goog-Upload-Offset: 0" \
      -H "X-Goog-Upload-Command: upload, finalize" \
      --data-binary "@${VIDEO_PATH}" 2> /dev/null > file_info.json

    file_uri=$(jq ".file.uri" file_info.json)
    echo file_uri=$file_uri

    state=$(jq ".file.state" file_info.json)
    echo state=$state

    name=$(jq ".file.name" file_info.json)
    echo name=$name

    while [[ "($state)" = *"PROCESSING"* ]];
    do
      echo "Processing video..."
      sleep 5
      # Get the file of interest to check state
      curl https://generativelanguage.googleapis.com/v1beta/files/$name > file_info.json
      state=$(jq ".file.state" file_info.json)
    done

    curl "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=$GEMINI_API_KEY" \
        -H 'Content-Type: application/json' \
        -X POST \
        -d '{
          "contents": [{
            "parts":[
              {"text": "Transcribe the audio from this video, giving timestamps for salient events in the video. Also provide visual descriptions."},
              {"file_data":{"mime_type": "video/mp4", "file_uri": '$file_uri'}}]
            }]
           }' 2> /dev/null > response.json

    cat response.json
    echo

    jq ".candidates[].content.parts[].text" response.json  
    https://github.com/google-gemini/deprecated-generative-ai-python/blob/7a7cc5474ddaa0255a4410e05361028a24400abd/samples/rest/text_generation.sh#L272-L331

### PDF

### Python

    from google import genai

    client = genai.Client()
    sample_pdf = client.files.upload(file=media / "test.pdf")
    response = client.models.generate_content(
        model="gemini-2.0-flash",
        contents=["Give me a summary of this document:", sample_pdf],
    )
    print(f"{response.text=}")  
    https://github.com/google-gemini/api-examples/blob/856e8a0f566a2810625cecabba6e2ab1fe97e496/python/text_generation.py#L194-L202

### Go

    ctx := context.Background()
    client, err := genai.NewClient(ctx, &genai.ClientConfig{
    	APIKey:  os.Getenv("GEMINI_API_KEY"),
    	Backend: genai.BackendGeminiAPI,
    })
    if err != nil {
    	log.Fatal(err)
    }

    file, err := client.Files.UploadFromPath(
    	ctx, 
    	filepath.Join(getMedia(), "test.pdf"), 
    	&genai.UploadFileConfig{
    		MIMEType : "application/pdf",
    	},
    )
    if err != nil {
    	log.Fatal(err)
    }

    parts := []*genai.Part{
    	genai.NewPartFromText("Give me a summary of this document:"),
    	genai.NewPartFromURI(file.URI, file.MIMEType),
    }

    contents := []*genai.Content{
    	genai.NewContentFromParts(parts, genai.RoleUser),
    }

    response, err := client.Models.GenerateContent(ctx, "gemini-2.0-flash", contents, nil)
    if err != nil {
    	log.Fatal(err)
    }
    printResponse(response)  
    https://github.com/google-gemini/api-examples/blob/856e8a0f566a2810625cecabba6e2ab1fe97e496/go/text_generation.go#L452-L485

### Shell

    MIME_TYPE=$(file -b --mime-type "${PDF_PATH}")
    NUM_BYTES=$(wc -c < "${PDF_PATH}")
    DISPLAY_NAME=TEXT


    echo $MIME_TYPE
    tmp_header_file=upload-header.tmp

    # Initial resumable request defining metadata.
    # The upload url is in the response headers dump them to a file.
    curl "${BASE_URL}/upload/v1beta/files?key=${GEMINI_API_KEY}" \
      -D upload-header.tmp \
      -H "X-Goog-Upload-Protocol: resumable" \
      -H "X-Goog-Upload-Command: start" \
      -H "X-Goog-Upload-Header-Content-Length: ${NUM_BYTES}" \
      -H "X-Goog-Upload-Header-Content-Type: ${MIME_TYPE}" \
      -H "Content-Type: application/json" \
      -d "{'file': {'display_name': '${DISPLAY_NAME}'}}" 2> /dev/null

    upload_url=$(grep -i "x-goog-upload-url: " "${tmp_header_file}" | cut -d" " -f2 | tr -d "\r")
    rm "${tmp_header_file}"

    # Upload the actual bytes.
    curl "${upload_url}" \
      -H "Content-Length: ${NUM_BYTES}" \
      -H "X-Goog-Upload-Offset: 0" \
      -H "X-Goog-Upload-Command: upload, finalize" \
      --data-binary "@${PDF_PATH}" 2> /dev/null > file_info.json

    file_uri=$(jq ".file.uri" file_info.json)
    echo file_uri=$file_uri

    # Now generate content using that file
    curl "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=$GEMINI_API_KEY" \
        -H 'Content-Type: application/json' \
        -X POST \
        -d '{
          "contents": [{
            "parts":[
              {"text": "Can you add a few more lines to this poem?"},
              {"file_data":{"mime_type": "application/pdf", "file_uri": '$file_uri'}}]
            }]
           }' 2> /dev/null > response.json

    cat response.json
    echo

    jq ".candidates[].content.parts[].text" response.json  
    https://github.com/google-gemini/deprecated-generative-ai-python/blob/7a7cc5474ddaa0255a4410e05361028a24400abd/samples/rest/text_generation.sh#L393-L441

### Chat

### Python

    from google import genai
    from google.genai import types

    client = genai.Client()
    # Pass initial history using the "history" argument
    chat = client.chats.create(
        model="gemini-2.0-flash",
        history=[
            types.Content(role="user", parts=[types.Part(text="Hello")]),
            types.Content(
                role="model",
                parts=[
                    types.Part(
                        text="Great to meet you. What would you like to know?"
                    )
                ],
            ),
        ],
    )
    response = chat.send_message(message="I have 2 dogs in my house.")
    print(response.text)
    response = chat.send_message(message="How many paws are in my house?")
    print(response.text)  
    https://github.com/google-gemini/api-examples/blob/856e8a0f566a2810625cecabba6e2ab1fe97e496/python/chat.py#L25-L47

### Node.js

    // Make sure to include the following import:
    // import {GoogleGenAI} from '@google/genai';
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    const chat = ai.chats.create({
      model: "gemini-2.0-flash",
      history: [
        {
          role: "user",
          parts: [{ text: "Hello" }],
        },
        {
          role: "model",
          parts: [{ text: "Great to meet you. What would you like to know?" }],
        },
      ],
    });

    const response1 = await chat.sendMessage({
      message: "I have 2 dogs in my house.",
    });
    console.log("Chat response 1:", response1.text);

    const response2 = await chat.sendMessage({
      message: "How many paws are in my house?",
    });
    console.log("Chat response 2:", response2.text);  
    https://github.com/google-gemini/api-examples/blob/856e8a0f566a2810625cecabba6e2ab1fe97e496/javascript/chat.js#L33-L58

### Go

    ctx := context.Background()
    client, err := genai.NewClient(ctx, &genai.ClientConfig{
    	APIKey:  os.Getenv("GEMINI_API_KEY"),
    	Backend: genai.BackendGeminiAPI,
    })
    if err != nil {
    	log.Fatal(err)
    }

    // Pass initial history using the History field.
    history := []*genai.Content{
    	genai.NewContentFromText("Hello", genai.RoleUser),
    	genai.NewContentFromText("Great to meet you. What would you like to know?", genai.RoleModel),
    }

    chat, err := client.Chats.Create(ctx, "gemini-2.0-flash", nil, history)
    if err != nil {
    	log.Fatal(err)
    }

    firstResp, err := chat.SendMessage(ctx, genai.Part{Text: "I have 2 dogs in my house."})
    if err != nil {
    	log.Fatal(err)
    }
    fmt.Println(firstResp.Text())

    secondResp, err := chat.SendMessage(ctx, genai.Part{Text: "How many paws are in my house?"})
    if err != nil {
    	log.Fatal(err)
    }
    fmt.Println(secondResp.Text())  
    https://github.com/google-gemini/api-examples/blob/856e8a0f566a2810625cecabba6e2ab1fe97e496/go/chat.go#L16-L46

### Shell

    curl https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=$GEMINI_API_KEY \
        -H 'Content-Type: application/json' \
        -X POST \
        -d '{
          "contents": [
            {"role":"user",
             "parts":[{
               "text": "Hello"}]},
            {"role": "model",
             "parts":[{
               "text": "Great to meet you. What would you like to know?"}]},
            {"role":"user",
             "parts":[{
               "text": "I have two dogs in my house. How many paws are in my house?"}]},
          ]
        }' 2> /dev/null | grep "text"  
    https://github.com/google-gemini/deprecated-generative-ai-python/blob/7a7cc5474ddaa0255a4410e05361028a24400abd/samples/rest/chat.sh#L7-L23

### Java

    // Specify a Gemini model appropriate for your use case
    GenerativeModel gm =
        new GenerativeModel(
            /* modelName */ "gemini-1.5-flash",
            // Access your API key as a Build Configuration variable (see "Set up your API key"
            // above)
            /* apiKey */ BuildConfig.apiKey);
    GenerativeModelFutures model = GenerativeModelFutures.from(gm);

    // (optional) Create previous chat history for context
    Content.Builder userContentBuilder = new Content.Builder();
    userContentBuilder.setRole("user");
    userContentBuilder.addText("Hello, I have 2 dogs in my house.");
    Content userContent = userContentBuilder.build();

    Content.Builder modelContentBuilder = new Content.Builder();
    modelContentBuilder.setRole("model");
    modelContentBuilder.addText("Great to meet you. What would you like to know?");
    Content modelContent = userContentBuilder.build();

    List<Content> history = Arrays.asList(userContent, modelContent);

    // Initialize the chat
    ChatFutures chat = model.startChat(history);

    // Create a new user message
    Content.Builder userMessageBuilder = new Content.Builder();
    userMessageBuilder.setRole("user");
    userMessageBuilder.addText("How many paws are in my house?");
    Content userMessage = userMessageBuilder.build();

    // For illustrative purposes only. You should use an executor that fits your needs.
    Executor executor = Executors.newSingleThreadExecutor();

    // Send the message
    ListenableFuture<GenerateContentResponse> response = chat.sendMessage(userMessage);

    Futures.addCallback(
        response,
        new FutureCallback<GenerateContentResponse>() {
          @Override
          public void onSuccess(GenerateContentResponse result) {
            String resultText = result.getText();
            System.out.println(resultText);
          }

          @Override
          public void onFailure(Throwable t) {
            t.printStackTrace();
          }
        },
        executor);  
    https://github.com/google-gemini/generative-ai-android/blob/a77dc5e4dc07d7aa710f59fde1908fbfff2e0e70/samples/src/main/java/com/google/ai/client/generative/samples/java/chat.java#L47-L98

### Cache

### Python

    from google import genai
    from google.genai import types

    client = genai.Client()
    document = client.files.upload(file=media / "a11.txt")
    model_name = "gemini-1.5-flash-001"

    cache = client.caches.create(
        model=model_name,
        config=types.CreateCachedContentConfig(
            contents=[document],
            system_instruction="You are an expert analyzing transcripts.",
        ),
    )
    print(cache)

    response = client.models.generate_content(
        model=model_name,
        contents="Please summarize this transcript",
        config=types.GenerateContentConfig(cached_content=cache.name),
    )
    print(response.text)  
    https://github.com/google-gemini/api-examples/blob/856e8a0f566a2810625cecabba6e2ab1fe97e496/python/cache.py#L25-L46

### Node.js

    // Make sure to include the following import:
    // import {GoogleGenAI} from '@google/genai';
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    const filePath = path.join(media, "a11.txt");
    const document = await ai.files.upload({
      file: filePath,
      config: { mimeType: "text/plain" },
    });
    console.log("Uploaded file name:", document.name);
    const modelName = "gemini-1.5-flash-001";

    const contents = [
      createUserContent(createPartFromUri(document.uri, document.mimeType)),
    ];

    const cache = await ai.caches.create({
      model: modelName,
      config: {
        contents: contents,
        systemInstruction: "You are an expert analyzing transcripts.",
      },
    });
    console.log("Cache created:", cache);

    const response = await ai.models.generateContent({
      model: modelName,
      contents: "Please summarize this transcript",
      config: { cachedContent: cache.name },
    });
    console.log("Response text:", response.text);  
    https://github.com/google-gemini/api-examples/blob/856e8a0f566a2810625cecabba6e2ab1fe97e496/javascript/cache.js#L33-L62

### Go

    ctx := context.Background()
    client, err := genai.NewClient(ctx, &genai.ClientConfig{
    	APIKey:  os.Getenv("GEMINI_API_KEY"), 
    	Backend: genai.BackendGeminiAPI,
    })
    if err != nil {
    	log.Fatal(err)
    }

    modelName := "gemini-1.5-flash-001"
    document, err := client.Files.UploadFromPath(
    	ctx, 
    	filepath.Join(getMedia(), "a11.txt"), 
    	&genai.UploadFileConfig{
    		MIMEType : "text/plain",
    	},
    )
    if err != nil {
    	log.Fatal(err)
    }
    parts := []*genai.Part{
    	genai.NewPartFromURI(document.URI, document.MIMEType),
    }
    contents := []*genai.Content{
    	genai.NewContentFromParts(parts, genai.RoleUser),
    }
    cache, err := client.Caches.Create(ctx, modelName, &genai.CreateCachedContentConfig{
    	Contents: contents,
    	SystemInstruction: genai.NewContentFromText(
    		"You are an expert analyzing transcripts.", genai.RoleUser,
    	),
    })
    if err != nil {
    	log.Fatal(err)
    }
    fmt.Println("Cache created:")
    fmt.Println(cache)

    // Use the cache for generating content.
    response, err := client.Models.GenerateContent(
    	ctx,
    	modelName,
    	genai.Text("Please summarize this transcript"),
    	&genai.GenerateContentConfig{
    		CachedContent: cache.Name,
    	},
    )
    if err != nil {
    	log.Fatal(err)
    }
    printResponse(response)  
    https://github.com/google-gemini/api-examples/blob/856e8a0f566a2810625cecabba6e2ab1fe97e496/go/cache.go#L16-L66

### Tuned Model

### Python

    # With Gemini 2 we're launching a new SDK. See the following doc for details.
    # https://ai.google.dev/gemini-api/docs/migrate  
    https://github.com/google-gemini/deprecated-generative-ai-python/blob/7a7cc5474ddaa0255a4410e05361028a24400abd/README.md#L23-L24

### JSON Mode

### Python

    from google import genai
    from google.genai import types
    from typing_extensions import TypedDict

    class Recipe(TypedDict):
        recipe_name: str
        ingredients: list[str]

    client = genai.Client()
    result = client.models.generate_content(
        model="gemini-2.0-flash",
        contents="List a few popular cookie recipes.",
        config=types.GenerateContentConfig(
            response_mime_type="application/json", response_schema=list[Recipe]
        ),
    )
    print(result)  
    https://github.com/google-gemini/api-examples/blob/856e8a0f566a2810625cecabba6e2ab1fe97e496/python/controlled_generation.py#L25-L41

### Node.js

    // Make sure to include the following import:
    // import {GoogleGenAI} from '@google/genai';
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: "List a few popular cookie recipes.",
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: "array",
          items: {
            type: "object",
            properties: {
              recipeName: { type: "string" },
              ingredients: { type: "array", items: { type: "string" } },
            },
            required: ["recipeName", "ingredients"],
          },
        },
      },
    });
    console.log(response.text);  
    https://github.com/google-gemini/api-examples/blob/856e8a0f566a2810625cecabba6e2ab1fe97e496/javascript/controlled_generation.js#L33-L54

### Go

    ctx := context.Background()
    client, err := genai.NewClient(ctx, &genai.ClientConfig{
    	APIKey:  os.Getenv("GEMINI_API_KEY"), 
    	Backend: genai.BackendGeminiAPI,
    })
    if err != nil {
    	log.Fatal(err)
    }

    schema := &genai.Schema{
    	Type: genai.TypeArray,
    	Items: &genai.Schema{
    		Type: genai.TypeObject,
    		Properties: map[string]*genai.Schema{
    			"recipe_name": {Type: genai.TypeString},
    			"ingredients": {
    				Type:  genai.TypeArray,
    				Items: &genai.Schema{Type: genai.TypeString},
    			},
    		},
    		Required: []string{"recipe_name"},
    	},
    }

    config := &genai.GenerateContentConfig{
    	ResponseMIMEType: "application/json",
    	ResponseSchema:   schema,
    }

    response, err := client.Models.GenerateContent(
    	ctx,
    	"gemini-2.0-flash",
    	genai.Text("List a few popular cookie recipes."),
    	config,
    )
    if err != nil {
    	log.Fatal(err)
    }
    printResponse(response)  
    https://github.com/google-gemini/api-examples/blob/856e8a0f566a2810625cecabba6e2ab1fe97e496/go/controlled_generation.go#L14-L52

### Shell

    curl "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=$GEMINI_API_KEY" \
    -H 'Content-Type: application/json' \
    -d '{
        "contents": [{
          "parts":[
            {"text": "List 5 popular cookie recipes"}
            ]
        }],
        "generationConfig": {
            "response_mime_type": "application/json",
            "response_schema": {
              "type": "ARRAY",
              "items": {
                "type": "OBJECT",
                "properties": {
                  "recipe_name": {"type":"STRING"},
                }
              }
            }
        }
    }' 2> /dev/null | head  
    https://github.com/google-gemini/deprecated-generative-ai-python/blob/7a7cc5474ddaa0255a4410e05361028a24400abd/samples/rest/controlled_generation.sh#L5-L25

### Java

    Schema<List<String>> schema =
        new Schema(
            /* name */ "recipes",
            /* description */ "List of recipes",
            /* format */ null,
            /* nullable */ false,
            /* list */ null,
            /* properties */ null,
            /* required */ null,
            /* items */ new Schema(
                /* name */ "recipe",
                /* description */ "A recipe",
                /* format */ null,
                /* nullable */ false,
                /* list */ null,
                /* properties */ Map.of(
                    "recipeName",
                    new Schema(
                        /* name */ "recipeName",
                        /* description */ "Name of the recipe",
                        /* format */ null,
                        /* nullable */ false,
                        /* list */ null,
                        /* properties */ null,
                        /* required */ null,
                        /* items */ null,
                        /* type */ FunctionType.STRING)),
                /* required */ null,
                /* items */ null,
                /* type */ FunctionType.OBJECT),
            /* type */ FunctionType.ARRAY);

    GenerationConfig.Builder configBuilder = new GenerationConfig.Builder();
    configBuilder.responseMimeType = "application/json";
    configBuilder.responseSchema = schema;

    GenerationConfig generationConfig = configBuilder.build();

    // Specify a Gemini model appropriate for your use case
    GenerativeModel gm =
        new GenerativeModel(
            /* modelName */ "gemini-1.5-pro",
            // Access your API key as a Build Configuration variable (see "Set up your API key"
            // above)
            /* apiKey */ BuildConfig.apiKey,
            /* generationConfig */ generationConfig);
    GenerativeModelFutures model = GenerativeModelFutures.from(gm);

    Content content = new Content.Builder().addText("List a few popular cookie recipes.").build();

    // For illustrative purposes only. You should use an executor that fits your needs.
    Executor executor = Executors.newSingleThreadExecutor();

    ListenableFuture<GenerateContentResponse> response = model.generateContent(content);
    Futures.addCallback(
        response,
        new FutureCallback<GenerateContentResponse>() {
          @Override
          public void onSuccess(GenerateContentResponse result) {
            String resultText = result.getText();
            System.out.println(resultText);
          }

          @Override
          public void onFailure(Throwable t) {
            t.printStackTrace();
          }
        },
        executor);  
    https://github.com/google-gemini/generative-ai-android/blob/a77dc5e4dc07d7aa710f59fde1908fbfff2e0e70/samples/src/main/java/com/google/ai/client/generative/samples/java/controlled_generation.java#L42-L110

### Code execution

### Python

    from google import genai
    from google.genai import types

    client = genai.Client()
    response = client.models.generate_content(
        model="gemini-2.0-pro-exp-02-05",
        contents=(
            "Write and execute code that calculates the sum of the first 50 prime numbers. "
            "Ensure that only the executable code and its resulting output are generated."
        ),
    )
    # Each part may contain text, executable code, or an execution result.
    for part in response.candidates[0].content.parts:
        print(part, "\n")

    print("-" * 80)
    # The .text accessor concatenates the parts into a markdown-formatted text.
    print("\n", response.text)  
    https://github.com/google-gemini/api-examples/blob/856e8a0f566a2810625cecabba6e2ab1fe97e496/python/code_execution.py#L22-L39

### Go

    ctx := context.Background()
    client, err := genai.NewClient(ctx, &genai.ClientConfig{
    	APIKey:  os.Getenv("GEMINI_API_KEY"),
    	Backend: genai.BackendGeminiAPI,
    })
    if err != nil {
    	log.Fatal(err)
    }

    response, err := client.Models.GenerateContent(
    	ctx,
    	"gemini-2.0-pro-exp-02-05",
    	genai.Text(
    		`Write and execute code that calculates the sum of the first 50 prime numbers.
    		 Ensure that only the executable code and its resulting output are generated.`,
    	),
    	&genai.GenerateContentConfig{},
    )
    if err != nil {
    	log.Fatal(err)
    }

    // Print the response.
    printResponse(response)

    fmt.Println("--------------------------------------------------------------------------------")
    fmt.Println(response.Text())  
    https://github.com/google-gemini/api-examples/blob/856e8a0f566a2810625cecabba6e2ab1fe97e496/go/code_execution.go#L14-L40

### Java

    // Specify a Gemini model appropriate for your use case
    GenerativeModel gm =
            new GenerativeModel(
                    /* modelName */ "gemini-1.5-pro",
                    // Access your API key as a Build Configuration variable (see "Set up your API key"
                    // above)
                    /* apiKey */ BuildConfig.apiKey,
                    /* generationConfig */ null,
                    /* safetySettings */ null,
                    /* requestOptions */ new RequestOptions(),
                    /* tools */ Collections.singletonList(Tool.CODE_EXECUTION));
    GenerativeModelFutures model = GenerativeModelFutures.from(gm);

    Content inputContent =
            new Content.Builder().addText("What is the sum of the first 50 prime numbers?").build();

    // For illustrative purposes only. You should use an executor that fits your needs.
    Executor executor = Executors.newSingleThreadExecutor();

    ListenableFuture<GenerateContentResponse> response = model.generateContent(inputContent);
    Futures.addCallback(
            response,
            new FutureCallback<GenerateContentResponse>() {
                @Override
                public void onSuccess(GenerateContentResponse result) {
                    // Each `part` either contains `text`, `executable_code` or an
                    // `execution_result`
                    Candidate candidate = result.getCandidates().get(0);
                    for (Part part : candidate.getContent().getParts()) {
                        System.out.println(part);
                    }

                    // Alternatively, you can use the `text` accessor which joins the parts into a
                    // markdown compatible text representation
                    String resultText = result.getText();
                    System.out.println(resultText);
                }

                @Override
                public void onFailure(Throwable t) {
                    t.printStackTrace();
                }
            },
            executor);  
    https://github.com/google-gemini/generative-ai-android/blob/a77dc5e4dc07d7aa710f59fde1908fbfff2e0e70/samples/src/main/java/com/google/ai/client/generative/samples/java/code_execution.java#L46-L89

### Function Calling

### Python

    from google import genai
    from google.genai import types

    client = genai.Client()

    def add(a: float, b: float) -> float:
        """returns a + b."""
        return a + b

    def subtract(a: float, b: float) -> float:
        """returns a - b."""
        return a - b

    def multiply(a: float, b: float) -> float:
        """returns a * b."""
        return a * b

    def divide(a: float, b: float) -> float:
        """returns a / b."""
        return a / b

    # Create a chat session; function calling (via tools) is enabled in the config.
    chat = client.chats.create(
        model="gemini-2.0-flash",
        config=types.GenerateContentConfig(tools=[add, subtract, multiply, divide]),
    )
    response = chat.send_message(
        message="I have 57 cats, each owns 44 mittens, how many mittens is that in total?"
    )
    print(response.text)  
    https://github.com/google-gemini/api-examples/blob/856e8a0f566a2810625cecabba6e2ab1fe97e496/python/function_calling.py#L22-L51

### Go

    ctx := context.Background()
    client, err := genai.NewClient(ctx, &genai.ClientConfig{
    	APIKey:  os.Getenv("GEMINI_API_KEY"),
    	Backend: genai.BackendGeminiAPI,
    })
    if err != nil {
    	log.Fatal(err)
    }
    modelName := "gemini-2.0-flash"

    // Create the function declarations for arithmetic operations.
    addDeclaration := createArithmeticToolDeclaration("addNumbers", "Return the result of adding two numbers.")
    subtractDeclaration := createArithmeticToolDeclaration("subtractNumbers", "Return the result of subtracting the second number from the first.")
    multiplyDeclaration := createArithmeticToolDeclaration("multiplyNumbers", "Return the product of two numbers.")
    divideDeclaration := createArithmeticToolDeclaration("divideNumbers", "Return the quotient of dividing the first number by the second.")

    // Group the function declarations as a tool.
    tools := []*genai.Tool{
    	{
    		FunctionDeclarations: []*genai.FunctionDeclaration{
    			addDeclaration,
    			subtractDeclaration,
    			multiplyDeclaration,
    			divideDeclaration,
    		},
    	},
    }

    // Create the content prompt.
    contents := []*genai.Content{
    	genai.NewContentFromText(
    		"I have 57 cats, each owns 44 mittens, how many mittens is that in total?", genai.RoleUser,
    	),
    }

    // Set up the generate content configuration with function calling enabled.
    config := &genai.GenerateContentConfig{
    	Tools: tools,
    	ToolConfig: &genai.ToolConfig{
    		FunctionCallingConfig: &genai.FunctionCallingConfig{
    			// The mode equivalent to FunctionCallingConfigMode.ANY in JS.
    			Mode: genai.FunctionCallingConfigModeAny,
    		},
    	},
    }

    genContentResp, err := client.Models.GenerateContent(ctx, modelName, contents, config)
    if err != nil {
    	log.Fatal(err)
    }

    // Assume the response includes a list of function calls.
    if len(genContentResp.FunctionCalls()) == 0 {
    	log.Println("No function call returned from the AI.")
    	return nil
    }
    functionCall := genContentResp.FunctionCalls()[0]
    log.Printf("Function call: %+v\n", functionCall)

    // Marshal the Args map into JSON bytes.
    argsMap, err := json.Marshal(functionCall.Args)
    if err != nil {
    	log.Fatal(err)
    }

    // Unmarshal the JSON bytes into the ArithmeticArgs struct.
    var args ArithmeticArgs
    if err := json.Unmarshal(argsMap, &args); err != nil {
    	log.Fatal(err)
    }

    // Map the function name to the actual arithmetic function.
    var result float64
    switch functionCall.Name {
    	case "addNumbers":
    		result = add(args.FirstParam, args.SecondParam)
    	case "subtractNumbers":
    		result = subtract(args.FirstParam, args.SecondParam)
    	case "multiplyNumbers":
    		result = multiply(args.FirstParam, args.SecondParam)
    	case "divideNumbers":
    		result = divide(args.FirstParam, args.SecondParam)
    	default:
    		return fmt.Errorf("unimplemented function: %s", functionCall.Name)
    }
    log.Printf("Function result: %v\n", result)

    // Prepare the final result message as content.
    resultContents := []*genai.Content{
    	genai.NewContentFromText("The final result is " + fmt.Sprintf("%v", result), genai.RoleUser),
    }

    // Use GenerateContent to send the final result.
    finalResponse, err := client.Models.GenerateContent(ctx, modelName, resultContents, &genai.GenerateContentConfig{})
    if err != nil {
    	log.Fatal(err)
    }

    printResponse(finalResponse)  
    https://github.com/google-gemini/api-examples/blob/856e8a0f566a2810625cecabba6e2ab1fe97e496/go/function_calling.go#L63-L161

### Node.js

      // Make sure to include the following import:
      // import {GoogleGenAI} from '@google/genai';
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

      /**
       * The add function returns the sum of two numbers.
       * @param {number} a
       * @param {number} b
       * @returns {number}
       */
      function add(a, b) {
        return a + b;
      }

      /**
       * The subtract function returns the difference (a - b).
       * @param {number} a
       * @param {number} b
       * @returns {number}
       */
      function subtract(a, b) {
        return a - b;
      }

      /**
       * The multiply function returns the product of two numbers.
       * @param {number} a
       * @param {number} b
       * @returns {number}
       */
      function multiply(a, b) {
        return a * b;
      }

      /**
       * The divide function returns the quotient of a divided by b.
       * @param {number} a
       * @param {number} b
       * @returns {number}
       */
      function divide(a, b) {
        return a / b;
      }

      const addDeclaration = {
        name: "addNumbers",
        parameters: {
          type: "object",
          description: "Return the result of adding two numbers.",
          properties: {
            firstParam: {
              type: "number",
              description:
                "The first parameter which can be an integer or a floating point number.",
            },
            secondParam: {
              type: "number",
              description:
                "The second parameter which can be an integer or a floating point number.",
            },
          },
          required: ["firstParam", "secondParam"],
        },
      };

      const subtractDeclaration = {
        name: "subtractNumbers",
        parameters: {
          type: "object",
          description:
            "Return the result of subtracting the second number from the first.",
          properties: {
            firstParam: {
              type: "number",
              description: "The first parameter.",
            },
            secondParam: {
              type: "number",
              description: "The second parameter.",
            },
          },
          required: ["firstParam", "secondParam"],
        },
      };

      const multiplyDeclaration = {
        name: "multiplyNumbers",
        parameters: {
          type: "object",
          description: "Return the product of two numbers.",
          properties: {
            firstParam: {
              type: "number",
              description: "The first parameter.",
            },
            secondParam: {
              type: "number",
              description: "The second parameter.",
            },
          },
          required: ["firstParam", "secondParam"],
        },
      };

      const divideDeclaration = {
        name: "divideNumbers",
        parameters: {
          type: "object",
          description:
            "Return the quotient of dividing the first number by the second.",
          properties: {
            firstParam: {
              type: "number",
              description: "The first parameter.",
            },
            secondParam: {
              type: "number",
              description: "The second parameter.",
            },
          },
          required: ["firstParam", "secondParam"],
        },
      };

      // Step 1: Call generateContent with function calling enabled.
      const generateContentResponse = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents:
          "I have 57 cats, each owns 44 mittens, how many mittens is that in total?",
        config: {
          toolConfig: {
            functionCallingConfig: {
              mode: FunctionCallingConfigMode.ANY,
            },
          },
          tools: [
            {
              functionDeclarations: [
                addDeclaration,
                subtractDeclaration,
                multiplyDeclaration,
                divideDeclaration,
              ],
            },
          ],
        },
      });

      // Step 2: Extract the function call.(
      // Assuming the response contains a 'functionCalls' array.
      const functionCall =
        generateContentResponse.functionCalls &&
        generateContentResponse.functionCalls[0];
      console.log(functionCall);

      // Parse the arguments.
      const args = functionCall.args;
      // Expected args format: { firstParam: number, secondParam: number }

      // Step 3: Invoke the actual function based on the function name.
      const functionMapping = {
        addNumbers: add,
        subtractNumbers: subtract,
        multiplyNumbers: multiply,
        divideNumbers: divide,
      };
      const func = functionMapping[functionCall.name];
      if (!func) {
        console.error("Unimplemented error:", functionCall.name);
        return generateContentResponse;
      }
      const resultValue = func(args.firstParam, args.secondParam);
      console.log("Function result:", resultValue);

      // Step 4: Use the chat API to send the result as the final answer.
      const chat = ai.chats.create({ model: "gemini-2.0-flash" });
      const chatResponse = await chat.sendMessage({
        message: "The final result is " + resultValue,
      });
      console.log(chatResponse.text);
      return chatResponse;
    }  
    https://github.com/google-gemini/api-examples/blob/856e8a0f566a2810625cecabba6e2ab1fe97e496/javascript/function_calling.js#L22-L-1

### Shell


    cat > tools.json << EOF
    {
      "function_declarations": [
        {
          "name": "enable_lights",
          "description": "Turn on the lighting system."
        },
        {
          "name": "set_light_color",
          "description": "Set the light color. Lights must be enabled for this to work.",
          "parameters": {
            "type": "object",
            "properties": {
              "rgb_hex": {
                "type": "string",
                "description": "The light color as a 6-digit hex string, e.g. ff0000 for red."
              }
            },
            "required": [
              "rgb_hex"
            ]
          }
        },
        {
          "name": "stop_lights",
          "description": "Turn off the lighting system."
        }
      ]
    } 
    EOF

    curl "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=$GEMINI_API_KEY" \
      -H 'Content-Type: application/json' \
      -d @<(echo '
      {
        "system_instruction": {
          "parts": {
            "text": "You are a helpful lighting system bot. You can turn lights on and off, and you can set the color. Do not perform any other tasks."
          }
        },
        "tools": ['$(cat tools.json)'],

        "tool_config": {
          "function_calling_config": {"mode": "auto"}
        },

        "contents": {
          "role": "user",
          "parts": {
            "text": "Turn on the lights please."
          }
        }
      }
    ') 2>/dev/null |sed -n '/"content"/,/"finishReason"/p'  
    https://github.com/google-gemini/deprecated-generative-ai-python/blob/7a7cc5474ddaa0255a4410e05361028a24400abd/samples/rest/function_calling.sh#L4-L59

### Java

    FunctionDeclaration multiplyDefinition =
        defineFunction(
            /* name  */ "multiply",
            /* description */ "returns a * b.",
            /* parameters */ Arrays.asList(
                Schema.numDouble("a", "First parameter"),
                Schema.numDouble("b", "Second parameter")),
            /* required */ Arrays.asList("a", "b"));

    Tool tool = new Tool(Arrays.asList(multiplyDefinition), null);

    // Specify a Gemini model appropriate for your use case
    GenerativeModel gm =
        new GenerativeModel(
            /* modelName */ "gemini-1.5-flash",
            // Access your API key as a Build Configuration variable (see "Set up your API key"
            // above)
            /* apiKey */ BuildConfig.apiKey,
            /* generationConfig (optional) */ null,
            /* safetySettings (optional) */ null,
            /* requestOptions (optional) */ new RequestOptions(),
            /* functionDeclarations (optional) */ Arrays.asList(tool));
    GenerativeModelFutures model = GenerativeModelFutures.from(gm);

    // Create prompt
    Content.Builder userContentBuilder = new Content.Builder();
    userContentBuilder.setRole("user");
    userContentBuilder.addText(
        "I have 57 cats, each owns 44 mittens, how many mittens is that in total?");
    Content userMessage = userContentBuilder.build();

    // For illustrative purposes only. You should use an executor that fits your needs.
    Executor executor = Executors.newSingleThreadExecutor();

    // Initialize the chat
    ChatFutures chat = model.startChat();

    // Send the message
    ListenableFuture<GenerateContentResponse> response = chat.sendMessage(userMessage);

    Futures.addCallback(
        response,
        new FutureCallback<GenerateContentResponse>() {
          @Override
          public void onSuccess(GenerateContentResponse result) {
            if (!result.getFunctionCalls().isEmpty()) {
              handleFunctionCall(result);
            }
            if (!result.getText().isEmpty()) {
              System.out.println(result.getText());
            }
          }

          @Override
          public void onFailure(Throwable t) {
            t.printStackTrace();
          }

          private void handleFunctionCall(GenerateContentResponse result) {
            FunctionCallPart multiplyFunctionCallPart =
                result.getFunctionCalls().stream()
                    .filter(fun -> fun.getName().equals("multiply"))
                    .findFirst()
                    .get();
            double a = Double.parseDouble(multiplyFunctionCallPart.getArgs().get("a"));
            double b = Double.parseDouble(multiplyFunctionCallPart.getArgs().get("b"));

            try {
              // `multiply(a, b)` is a regular java function defined in another class
              FunctionResponsePart functionResponsePart =
                  new FunctionResponsePart(
                      "multiply", new JSONObject().put("result", multiply(a, b)));

              // Create prompt
              Content.Builder functionCallResponse = new Content.Builder();
              userContentBuilder.setRole("user");
              userContentBuilder.addPart(functionResponsePart);
              Content userMessage = userContentBuilder.build();

              chat.sendMessage(userMessage);
            } catch (JSONException e) {
              throw new RuntimeException(e);
            }
          }
        },
        executor);  
    https://github.com/google-gemini/generative-ai-android/blob/a77dc5e4dc07d7aa710f59fde1908fbfff2e0e70/samples/src/main/java/com/google/ai/client/generative/samples/java/function_calling.java#L54-L140

### Generation config

### Python

    from google import genai
    from google.genai import types

    client = genai.Client()
    response = client.models.generate_content(
        model="gemini-2.0-flash",
        contents="Tell me a story about a magic backpack.",
        config=types.GenerateContentConfig(
            candidate_count=1,
            stop_sequences=["x"],
            max_output_tokens=20,
            temperature=1.0,
        ),
    )
    print(response.text)  
    https://github.com/google-gemini/api-examples/blob/856e8a0f566a2810625cecabba6e2ab1fe97e496/python/configure_model_parameters.py#L22-L36

### Node.js

    // Make sure to include the following import:
    // import {GoogleGenAI} from '@google/genai';
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: "Tell me a story about a magic backpack.",
      config: {
        candidateCount: 1,
        stopSequences: ["x"],
        maxOutputTokens: 20,
        temperature: 1.0,
      },
    });

    console.log(response.text);  
    https://github.com/google-gemini/api-examples/blob/856e8a0f566a2810625cecabba6e2ab1fe97e496/javascript/configure_model_parameters.js#L22-L37

### Go

    ctx := context.Background()
    client, err := genai.NewClient(ctx, &genai.ClientConfig{
    	APIKey:  os.Getenv("GEMINI_API_KEY"),
    	Backend: genai.BackendGeminiAPI,
    })
    if err != nil {
    	log.Fatal(err)
    }

    // Create local variables for parameters.
    candidateCount := int32(1)
    maxOutputTokens := int32(20)
    temperature := float32(1.0)

    response, err := client.Models.GenerateContent(
    	ctx,
    	"gemini-2.0-flash",
    	genai.Text("Tell me a story about a magic backpack."),
    	&genai.GenerateContentConfig{
    		CandidateCount:  candidateCount,
    		StopSequences:   []string{"x"},
    		MaxOutputTokens: maxOutputTokens,
    		Temperature:     &temperature,
    	},
    )
    if err != nil {
    	log.Fatal(err)
    }

    printResponse(response)  
    https://github.com/google-gemini/api-examples/blob/856e8a0f566a2810625cecabba6e2ab1fe97e496/go/configure_model_parameters.go#L13-L42

### Shell

    curl https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=$GEMINI_API_KEY \
        -H 'Content-Type: application/json' \
        -X POST \
        -d '{
            "contents": [{
                "parts":[
                    {"text": "Explain how AI works"}
                ]
            }],
            "generationConfig": {
                "stopSequences": [
                    "Title"
                ],
                "temperature": 1.0,
                "maxOutputTokens": 800,
                "topP": 0.8,
                "topK": 10
            }
        }'  2> /dev/null | grep "text"  
    https://github.com/google-gemini/deprecated-generative-ai-python/blob/7a7cc5474ddaa0255a4410e05361028a24400abd/samples/rest/configure_model_parameters.sh#L4-L23

### Java

    GenerationConfig.Builder configBuilder = new GenerationConfig.Builder();
    configBuilder.temperature = 0.9f;
    configBuilder.topK = 16;
    configBuilder.topP = 0.1f;
    configBuilder.maxOutputTokens = 200;
    configBuilder.stopSequences = Arrays.asList("red");

    GenerationConfig generationConfig = configBuilder.build();

    // Specify a Gemini model appropriate for your use case
    GenerativeModel gm =
        new GenerativeModel("gemini-1.5-flash", BuildConfig.apiKey, generationConfig);

    GenerativeModelFutures model = GenerativeModelFutures.from(gm);  
    https://github.com/google-gemini/generative-ai-android/blob/a77dc5e4dc07d7aa710f59fde1908fbfff2e0e70/samples/src/main/java/com/google/ai/client/generative/samples/java/configure_model_parameters.java#L32-L45

### Safety Settings

### Python

    from google import genai
    from google.genai import types

    client = genai.Client()
    unsafe_prompt = (
        "I support Martians Soccer Club and I think Jupiterians Football Club sucks! "
        "Write a ironic phrase about them including expletives."
    )
    response = client.models.generate_content(
        model="gemini-2.0-flash",
        contents=unsafe_prompt,
        config=types.GenerateContentConfig(
            safety_settings=[
                types.SafetySetting(
                    category="HARM_CATEGORY_HATE_SPEECH",
                    threshold="BLOCK_MEDIUM_AND_ABOVE",
                ),
                types.SafetySetting(
                    category="HARM_CATEGORY_HARASSMENT", threshold="BLOCK_ONLY_HIGH"
                ),
            ]
        ),
    )
    try:
        print(response.text)
    except Exception:
        print("No information generated by the model.")

    print(response.candidates[0].safety_ratings)  
    https://github.com/google-gemini/api-examples/blob/856e8a0f566a2810625cecabba6e2ab1fe97e496/python/safety_settings.py#L48-L76

### Node.js

      // Make sure to include the following import:
      // import {GoogleGenAI} from '@google/genai';
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const unsafePrompt =
        "I support Martians Soccer Club and I think Jupiterians Football Club sucks! Write a ironic phrase about them including expletives.";

      const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: unsafePrompt,
        config: {
          safetySettings: [
            {
              category: "HARM_CATEGORY_HATE_SPEECH",
              threshold: "BLOCK_MEDIUM_AND_ABOVE",
            },
            {
              category: "HARM_CATEGORY_HARASSMENT",
              threshold: "BLOCK_ONLY_HIGH",
            },
          ],
        },
      });

      try {
        console.log("Generated text:", response.text);
      } catch (error) {
        console.log("No information generated by the model.");
      }
      console.log("Safety ratings:", response.candidates[0].safetyRatings);
      return response;
    }  
    https://github.com/google-gemini/api-examples/blob/856e8a0f566a2810625cecabba6e2ab1fe97e496/javascript/safety_settings.js#L49-L-1

### Go

    ctx := context.Background()
    client, err := genai.NewClient(ctx, &genai.ClientConfig{
    	APIKey:  os.Getenv("GEMINI_API_KEY"),
    	Backend: genai.BackendGeminiAPI,
    })
    if err != nil {
    	log.Fatal(err)
    }

    unsafePrompt := "I support Martians Soccer Club and I think Jupiterians Football Club sucks! " +
    	"Write a ironic phrase about them including expletives."

    config := &genai.GenerateContentConfig{
    	SafetySettings: []*genai.SafetySetting{
    		{
    			Category:  "HARM_CATEGORY_HATE_SPEECH",
    			Threshold: "BLOCK_MEDIUM_AND_ABOVE",
    		},
    		{
    			Category:  "HARM_CATEGORY_HARASSMENT",
    			Threshold: "BLOCK_ONLY_HIGH",
    		},
    	},
    }
    contents := []*genai.Content{
    	genai.NewContentFromText(unsafePrompt, genai.RoleUser),
    }
    response, err := client.Models.GenerateContent(ctx, "gemini-2.0-flash", contents, config)
    if err != nil {
    	log.Fatal(err)
    }

    // Print the generated text.
    text := response.Text()
    fmt.Println("Generated text:", text)

    // Print the and safety ratings from the first candidate.
    if len(response.Candidates) > 0 {
    	fmt.Println("Finish reason:", response.Candidates[0].FinishReason)
    	safetyRatings, err := json.MarshalIndent(response.Candidates[0].SafetyRatings, "", "  ")
    	if err != nil {
    		return err
    	}
    	fmt.Println("Safety ratings:", string(safetyRatings))
    } else {
    	fmt.Println("No candidate returned.")
    }  
    https://github.com/google-gemini/api-examples/blob/856e8a0f566a2810625cecabba6e2ab1fe97e496/go/safety_settings.go#L60-L106

### Shell

    echo '{
        "safetySettings": [
            {"category": "HARM_CATEGORY_HARASSMENT", "threshold": "BLOCK_ONLY_HIGH"},
            {"category": "HARM_CATEGORY_HATE_SPEECH", "threshold": "BLOCK_MEDIUM_AND_ABOVE"}
        ],
        "contents": [{
            "parts":[{
                "text": "'I support Martians Soccer Club and I think Jupiterians Football Club sucks! Write a ironic phrase about them.'"}]}]}' > request.json

    curl "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=$GEMINI_API_KEY" \
        -H 'Content-Type: application/json' \
        -X POST \
        -d @request.json 2> /dev/null  
    https://github.com/google-gemini/deprecated-generative-ai-python/blob/7a7cc5474ddaa0255a4410e05361028a24400abd/samples/rest/safety_settings.sh#L20-L33

### Java

    SafetySetting harassmentSafety =
        new SafetySetting(HarmCategory.HARASSMENT, BlockThreshold.ONLY_HIGH);

    SafetySetting hateSpeechSafety =
        new SafetySetting(HarmCategory.HATE_SPEECH, BlockThreshold.MEDIUM_AND_ABOVE);

    // Specify a Gemini model appropriate for your use case
    GenerativeModel gm =
        new GenerativeModel(
            "gemini-1.5-flash",
            BuildConfig.apiKey,
            null, // generation config is optional
            Arrays.asList(harassmentSafety, hateSpeechSafety));

    GenerativeModelFutures model = GenerativeModelFutures.from(gm);  
    https://github.com/google-gemini/generative-ai-android/blob/a77dc5e4dc07d7aa710f59fde1908fbfff2e0e70/samples/src/main/java/com/google/ai/client/generative/samples/java/safety_settings.java#L52-L66

### System Instruction

### Python

    from google import genai
    from google.genai import types

    client = genai.Client()
    response = client.models.generate_content(
        model="gemini-2.0-flash",
        contents="Good morning! How are you?",
        config=types.GenerateContentConfig(
            system_instruction="You are a cat. Your name is Neko."
        ),
    )
    print(response.text)  
    https://github.com/google-gemini/api-examples/blob/856e8a0f566a2810625cecabba6e2ab1fe97e496/python/system_instruction.py#L22-L33

### Node.js

    // Make sure to include the following import:
    // import {GoogleGenAI} from '@google/genai';
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: "Good morning! How are you?",
      config: {
        systemInstruction: "You are a cat. Your name is Neko.",
      },
    });
    console.log(response.text);  
    https://github.com/google-gemini/api-examples/blob/856e8a0f566a2810625cecabba6e2ab1fe97e496/javascript/system_instruction.js#L22-L32

### Go

    ctx := context.Background()
    client, err := genai.NewClient(ctx, &genai.ClientConfig{
    	APIKey:  os.Getenv("GEMINI_API_KEY"),
    	Backend: genai.BackendGeminiAPI,
    })
    if err != nil {
    	log.Fatal(err)
    }

    // Construct the user message contents.
    contents := []*genai.Content{
    	genai.NewContentFromText("Good morning! How are you?", genai.RoleUser),
    }

    // Set the system instruction as a *genai.Content.
    config := &genai.GenerateContentConfig{
    	SystemInstruction: genai.NewContentFromText("You are a cat. Your name is Neko.", genai.RoleUser),
    }

    response, err := client.Models.GenerateContent(ctx, "gemini-2.0-flash", contents, config)
    if err != nil {
    	log.Fatal(err)
    }
    printResponse(response)  
    https://github.com/google-gemini/api-examples/blob/856e8a0f566a2810625cecabba6e2ab1fe97e496/go/system_instruction.go#L13-L36

### Shell

    curl "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=$GEMINI_API_KEY" \
    -H 'Content-Type: application/json' \
    -d '{ "system_instruction": {
        "parts":
          { "text": "You are a cat. Your name is Neko."}},
        "contents": {
          "parts": {
            "text": "Hello there"}}}'  
    https://github.com/google-gemini/deprecated-generative-ai-python/blob/7a7cc5474ddaa0255a4410e05361028a24400abd/samples/rest/system_instruction.sh#L4-L12

### Java

    GenerativeModel model =
        new GenerativeModel(
            // Specify a Gemini model appropriate for your use case
            /* modelName */ "gemini-1.5-flash",
            /* apiKey */ BuildConfig.apiKey,
            /* generationConfig (optional) */ null,
            /* safetySettings (optional) */ null,
            /* requestOptions (optional) */ new RequestOptions(),
            /* tools (optional) */ null,
            /* toolsConfig (optional) */ null,
            /* systemInstruction (optional) */ new Content.Builder()
                .addText("You are a cat. Your name is Neko.")
                .build());  
    https://github.com/google-gemini/generative-ai-android/blob/a77dc5e4dc07d7aa710f59fde1908fbfff2e0e70/samples/src/main/java/com/google/ai/client/generative/samples/java/system_instruction.java#L31-L43

### Response body

If successful, the response body contains an instance of[GenerateContentResponse](https://ai.google.dev/api/generate-content#v1beta.GenerateContentResponse).  

## Method: tunedModels.streamGenerateContent

- [Endpoint](https://ai.google.dev/api/tuning#body.HTTP_TEMPLATE)
- [Path parameters](https://ai.google.dev/api/tuning#body.PATH_PARAMETERS)
- [Request body](https://ai.google.dev/api/tuning#body.request_body)
  - [JSON representation](https://ai.google.dev/api/tuning#body.request_body.SCHEMA_REPRESENTATION)
- [Response body](https://ai.google.dev/api/tuning#body.response_body)
- [Authorization scopes](https://ai.google.dev/api/tuning#body.aspect)
- [Example request](https://ai.google.dev/api/tuning#body.codeSnippets)
  - [Text](https://ai.google.dev/api/tuning#body.codeSnippets.group)
  - [Image](https://ai.google.dev/api/tuning#body.codeSnippets.group_1)
  - [Audio](https://ai.google.dev/api/tuning#body.codeSnippets.group_2)
  - [Video](https://ai.google.dev/api/tuning#body.codeSnippets.group_3)
  - [PDF](https://ai.google.dev/api/tuning#body.codeSnippets.group_4)
  - [Chat](https://ai.google.dev/api/tuning#body.codeSnippets.group_5)

Generates a[streamed response](https://ai.google.dev/gemini-api/docs/text-generation?lang=python#generate-a-text-stream)from the model given an input`GenerateContentRequest`.  

### Endpoint

post`https:``/``/generativelanguage.googleapis.com``/v1beta``/{model=tunedModels``/*}:streamGenerateContent`  

### Path parameters

`model``string`  
Required. The name of the`Model`to use for generating the completion.

Format:`models/{model}`. It takes the form`tunedModels/{tunedmodel}`.

### Request body

The request body contains data with the following structure:
Fields`contents[]``object (`[Content](https://ai.google.dev/api/caching#Content)`)`  
Required. The content of the current conversation with the model.

For single-turn queries, this is a single instance. For multi-turn queries like[chat](https://ai.google.dev/gemini-api/docs/text-generation#chat), this is a repeated field that contains the conversation history and the latest request.
`tools[]``object (`[Tool](https://ai.google.dev/api/caching#Tool)`)`  
Optional. A list of`Tools`the`Model`may use to generate the next response.

A`Tool`is a piece of code that enables the system to interact with external systems to perform an action, or set of actions, outside of knowledge and scope of the`Model`. Supported`Tool`s are`Function`and`codeExecution`. Refer to the[Function calling](https://ai.google.dev/gemini-api/docs/function-calling)and the[Code execution](https://ai.google.dev/gemini-api/docs/code-execution)guides to learn more.
`toolConfig``object (`[ToolConfig](https://ai.google.dev/api/caching#ToolConfig)`)`  
Optional. Tool configuration for any`Tool`specified in the request. Refer to the[Function calling guide](https://ai.google.dev/gemini-api/docs/function-calling#function_calling_mode)for a usage example.
`safetySettings[]``object (`[SafetySetting](https://ai.google.dev/api/generate-content#v1beta.SafetySetting)`)`  
Optional. A list of unique`SafetySetting`instances for blocking unsafe content.

This will be enforced on the`GenerateContentRequest.contents`and`GenerateContentResponse.candidates`. There should not be more than one setting for each`SafetyCategory`type. The API will block any contents and responses that fail to meet the thresholds set by these settings. This list overrides the default settings for each`SafetyCategory`specified in the safetySettings. If there is no`SafetySetting`for a given`SafetyCategory`provided in the list, the API will use the default safety setting for that category. Harm categories HARM_CATEGORY_HATE_SPEECH, HARM_CATEGORY_SEXUALLY_EXPLICIT, HARM_CATEGORY_DANGEROUS_CONTENT, HARM_CATEGORY_HARASSMENT, HARM_CATEGORY_CIVIC_INTEGRITY are supported. Refer to the[guide](https://ai.google.dev/gemini-api/docs/safety-settings)for detailed information on available safety settings. Also refer to the[Safety guidance](https://ai.google.dev/gemini-api/docs/safety-guidance)to learn how to incorporate safety considerations in your AI applications.
`systemInstruction``object (`[Content](https://ai.google.dev/api/caching#Content)`)`  
Optional. Developer set[system instruction(s)](https://ai.google.dev/gemini-api/docs/system-instructions). Currently, text only.
`generationConfig``object (`[GenerationConfig](https://ai.google.dev/api/generate-content#v1beta.GenerationConfig)`)`  
Optional. Configuration options for model generation and outputs.
`cachedContent``string`  
Optional. The name of the content[cached](https://ai.google.dev/gemini-api/docs/caching)to use as context to serve the prediction. Format:`cachedContents/{cachedContent}`  

### Example request

### Text

### Python

    from google import genai

    client = genai.Client()
    response = client.models.generate_content_stream(
        model="gemini-2.0-flash", contents="Write a story about a magic backpack."
    )
    for chunk in response:
        print(chunk.text)
        print("_" * 80)  
    https://github.com/google-gemini/api-examples/blob/856e8a0f566a2810625cecabba6e2ab1fe97e496/python/text_generation.py#L37-L45

### Node.js

    // Make sure to include the following import:
    // import {GoogleGenAI} from '@google/genai';
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

    const response = await ai.models.generateContentStream({
      model: "gemini-2.0-flash",
      contents: "Write a story about a magic backpack.",
    });
    let text = "";
    for await (const chunk of response) {
      console.log(chunk.text);
      text += chunk.text;
    }  
    https://github.com/google-gemini/api-examples/blob/856e8a0f566a2810625cecabba6e2ab1fe97e496/javascript/text_generation.js#L51-L63

### Go

    ctx := context.Background()
    client, err := genai.NewClient(ctx, &genai.ClientConfig{
    	APIKey:  os.Getenv("GEMINI_API_KEY"),
    	Backend: genai.BackendGeminiAPI,
    })
    if err != nil {
    	log.Fatal(err)
    }
    contents := []*genai.Content{
    	genai.NewContentFromText("Write a story about a magic backpack.", genai.RoleUser),
    }
    for response, err := range client.Models.GenerateContentStream(
    	ctx,
    	"gemini-2.0-flash",
    	contents,
    	nil,
    ) {
    	if err != nil {
    		log.Fatal(err)
    	}
    	fmt.Print(response.Candidates[0].Content.Parts[0].Text)
    }  
    https://github.com/google-gemini/api-examples/blob/856e8a0f566a2810625cecabba6e2ab1fe97e496/go/text_generation.go#L38-L59

### Shell

    curl "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:streamGenerateContent?alt=sse&key=${GEMINI_API_KEY}" \
            -H 'Content-Type: application/json' \
            --no-buffer \
            -d '{ "contents":[{"parts":[{"text": "Write a story about a magic backpack."}]}]}'  
    https://github.com/google-gemini/deprecated-generative-ai-python/blob/7a7cc5474ddaa0255a4410e05361028a24400abd/samples/rest/text_generation.sh#L33-L37

### Java

    // Specify a Gemini model appropriate for your use case
    GenerativeModel gm =
        new GenerativeModel(
            /* modelName */ "gemini-1.5-flash",
            // Access your API key as a Build Configuration variable (see "Set up your API key"
            // above)
            /* apiKey */ BuildConfig.apiKey);
    GenerativeModelFutures model = GenerativeModelFutures.from(gm);

    Content content =
        new Content.Builder().addText("Write a story about a magic backpack.").build();

    Publisher<GenerateContentResponse> streamingResponse = model.generateContentStream(content);

    StringBuilder outputContent = new StringBuilder();

    streamingResponse.subscribe(
        new Subscriber<GenerateContentResponse>() {
          @Override
          public void onNext(GenerateContentResponse generateContentResponse) {
            String chunk = generateContentResponse.getText();
            outputContent.append(chunk);
          }

          @Override
          public void onComplete() {
            System.out.println(outputContent);
          }

          @Override
          public void onError(Throwable t) {
            t.printStackTrace();
          }

          @Override
          public void onSubscribe(Subscription s) {
            s.request(Long.MAX_VALUE);
          }
        });  
    https://github.com/google-gemini/generative-ai-android/blob/a77dc5e4dc07d7aa710f59fde1908fbfff2e0e70/samples/src/main/java/com/google/ai/client/generative/samples/java/text_generation.java#L80-L118

### Image

### Python

    from google import genai
    import PIL.Image

    client = genai.Client()
    organ = PIL.Image.open(media / "organ.jpg")
    response = client.models.generate_content_stream(
        model="gemini-2.0-flash", contents=["Tell me about this instrument", organ]
    )
    for chunk in response:
        print(chunk.text)
        print("_" * 80)  
    https://github.com/google-gemini/api-examples/blob/856e8a0f566a2810625cecabba6e2ab1fe97e496/python/text_generation.py#L63-L73

### Node.js

    // Make sure to include the following import:
    // import {GoogleGenAI} from '@google/genai';
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

    const organ = await ai.files.upload({
      file: path.join(media, "organ.jpg"),
    });

    const response = await ai.models.generateContentStream({
      model: "gemini-2.0-flash",
      contents: [
        createUserContent([
          "Tell me about this instrument", 
          createPartFromUri(organ.uri, organ.mimeType)
        ]),
      ],
    });
    let text = "";
    for await (const chunk of response) {
      console.log(chunk.text);
      text += chunk.text;
    }  
    https://github.com/google-gemini/api-examples/blob/856e8a0f566a2810625cecabba6e2ab1fe97e496/javascript/text_generation.js#L94-L115

### Go

    ctx := context.Background()
    client, err := genai.NewClient(ctx, &genai.ClientConfig{
    	APIKey:  os.Getenv("GEMINI_API_KEY"),
    	Backend: genai.BackendGeminiAPI,
    })
    if err != nil {
    	log.Fatal(err)
    }
    file, err := client.Files.UploadFromPath(
    	ctx, 
    	filepath.Join(getMedia(), "organ.jpg"), 
    	&genai.UploadFileConfig{
    		MIMEType : "image/jpeg",
    	},
    )
    if err != nil {
    	log.Fatal(err)
    }
    parts := []*genai.Part{
    	genai.NewPartFromText("Tell me about this instrument"),
    	genai.NewPartFromURI(file.URI, file.MIMEType),
    }
    contents := []*genai.Content{
    	genai.NewContentFromParts(parts, genai.RoleUser),
    }
    for response, err := range client.Models.GenerateContentStream(
    	ctx,
    	"gemini-2.0-flash",
    	contents,
    	nil,
    ) {
    	if err != nil {
    		log.Fatal(err)
    	}
    	fmt.Print(response.Candidates[0].Content.Parts[0].Text)
    }  
    https://github.com/google-gemini/api-examples/blob/856e8a0f566a2810625cecabba6e2ab1fe97e496/go/text_generation.go#L104-L139

### Shell

    cat > "$TEMP_JSON" << EOF
    {
      "contents": [{
        "parts":[
          {"text": "Tell me about this instrument"},
          {
            "inline_data": {
              "mime_type":"image/jpeg",
              "data": "$(cat "$TEMP_B64")"
            }
          }
        ]
      }]
    }
    EOF

    curl "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:streamGenerateContent?alt=sse&key=$GEMINI_API_KEY" \
        -H 'Content-Type: application/json' \
        -X POST \
        -d "@$TEMP_JSON" 2> /dev/null  
    https://github.com/google-gemini/deprecated-generative-ai-python/blob/7a7cc5474ddaa0255a4410e05361028a24400abd/samples/rest/text_generation.sh#L74-L94

### Java

    // Specify a Gemini model appropriate for your use case
    GenerativeModel gm =
        new GenerativeModel(
            /* modelName */ "gemini-1.5-flash",
            // Access your API key as a Build Configuration variable (see "Set up your API key"
            // above)
            /* apiKey */ BuildConfig.apiKey);
    GenerativeModelFutures model = GenerativeModelFutures.from(gm);

    Bitmap image1 = BitmapFactory.decodeResource(context.getResources(), R.drawable.image1);
    Bitmap image2 = BitmapFactory.decodeResource(context.getResources(), R.drawable.image2);

    Content content =
        new Content.Builder()
            .addText("What's different between these pictures?")
            .addImage(image1)
            .addImage(image2)
            .build();

    // For illustrative purposes only. You should use an executor that fits your needs.
    Executor executor = Executors.newSingleThreadExecutor();

    Publisher<GenerateContentResponse> streamingResponse = model.generateContentStream(content);

    StringBuilder outputContent = new StringBuilder();

    streamingResponse.subscribe(
        new Subscriber<GenerateContentResponse>() {
          @Override
          public void onNext(GenerateContentResponse generateContentResponse) {
            String chunk = generateContentResponse.getText();
            outputContent.append(chunk);
          }

          @Override
          public void onComplete() {
            System.out.println(outputContent);
          }

          @Override
          public void onError(Throwable t) {
            t.printStackTrace();
          }

          @Override
          public void onSubscribe(Subscription s) {
            s.request(Long.MAX_VALUE);
          }
        });  
    https://github.com/google-gemini/generative-ai-android/blob/a77dc5e4dc07d7aa710f59fde1908fbfff2e0e70/samples/src/main/java/com/google/ai/client/generative/samples/java/text_generation.java#L165-L213

### Audio

### Python

    from google import genai

    client = genai.Client()
    sample_audio = client.files.upload(file=media / "sample.mp3")
    response = client.models.generate_content_stream(
        model="gemini-2.0-flash",
        contents=["Give me a summary of this audio file.", sample_audio],
    )
    for chunk in response:
        print(chunk.text)
        print("_" * 80)  
    https://github.com/google-gemini/api-examples/blob/856e8a0f566a2810625cecabba6e2ab1fe97e496/python/text_generation.py#L131-L141

### Go

    ctx := context.Background()
    client, err := genai.NewClient(ctx, &genai.ClientConfig{
    	APIKey:  os.Getenv("GEMINI_API_KEY"),
    	Backend: genai.BackendGeminiAPI,
    })
    if err != nil {
    	log.Fatal(err)
    }

    file, err := client.Files.UploadFromPath(
    	ctx, 
    	filepath.Join(getMedia(), "sample.mp3"), 
    	&genai.UploadFileConfig{
    		MIMEType : "audio/mpeg",
    	},
    )
    if err != nil {
    	log.Fatal(err)
    }

    parts := []*genai.Part{
    	genai.NewPartFromText("Give me a summary of this audio file."),
    	genai.NewPartFromURI(file.URI, file.MIMEType),
    }

    contents := []*genai.Content{
    	genai.NewContentFromParts(parts, genai.RoleUser),
    }

    for result, err := range client.Models.GenerateContentStream(
    	ctx,
    	"gemini-2.0-flash",
    	contents,
    	nil,
    ) {
    	if err != nil {
    		log.Fatal(err)
    	}
    	fmt.Print(result.Candidates[0].Content.Parts[0].Text)
    }  
    https://github.com/google-gemini/api-examples/blob/856e8a0f566a2810625cecabba6e2ab1fe97e496/go/text_generation.go#L296-L335

### Shell

    # Use File API to upload audio data to API request.
    MIME_TYPE=$(file -b --mime-type "${AUDIO_PATH}")
    NUM_BYTES=$(wc -c < "${AUDIO_PATH}")
    DISPLAY_NAME=AUDIO

    tmp_header_file=upload-header.tmp

    # Initial resumable request defining metadata.
    # The upload url is in the response headers dump them to a file.
    curl "${BASE_URL}/upload/v1beta/files?key=${GEMINI_API_KEY}" \
      -D upload-header.tmp \
      -H "X-Goog-Upload-Protocol: resumable" \
      -H "X-Goog-Upload-Command: start" \
      -H "X-Goog-Upload-Header-Content-Length: ${NUM_BYTES}" \
      -H "X-Goog-Upload-Header-Content-Type: ${MIME_TYPE}" \
      -H "Content-Type: application/json" \
      -d "{'file': {'display_name': '${DISPLAY_NAME}'}}" 2> /dev/null

    upload_url=$(grep -i "x-goog-upload-url: " "${tmp_header_file}" | cut -d" " -f2 | tr -d "\r")
    rm "${tmp_header_file}"

    # Upload the actual bytes.
    curl "${upload_url}" \
      -H "Content-Length: ${NUM_BYTES}" \
      -H "X-Goog-Upload-Offset: 0" \
      -H "X-Goog-Upload-Command: upload, finalize" \
      --data-binary "@${AUDIO_PATH}" 2> /dev/null > file_info.json

    file_uri=$(jq ".file.uri" file_info.json)
    echo file_uri=$file_uri

    curl "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:streamGenerateContent?alt=sse&key=$GEMINI_API_KEY" \
        -H 'Content-Type: application/json' \
        -X POST \
        -d '{
          "contents": [{
            "parts":[
              {"text": "Please describe this file."},
              {"file_data":{"mime_type": "audio/mpeg", "file_uri": '$file_uri'}}]
            }]
           }' 2> /dev/null > response.json

    cat response.json
    echo  
    https://github.com/google-gemini/deprecated-generative-ai-python/blob/7a7cc5474ddaa0255a4410e05361028a24400abd/samples/rest/text_generation.sh#L224-L268

### Video

### Python

    from google import genai
    import time

    client = genai.Client()
    # Video clip (CC BY 3.0) from https://peach.blender.org/download/
    myfile = client.files.upload(file=media / "Big_Buck_Bunny.mp4")
    print(f"{myfile=}")

    # Poll until the video file is completely processed (state becomes ACTIVE).
    while not myfile.state or myfile.state.name != "ACTIVE":
        print("Processing video...")
        print("File state:", myfile.state)
        time.sleep(5)
        myfile = client.files.get(name=myfile.name)

    response = client.models.generate_content_stream(
        model="gemini-2.0-flash", contents=[myfile, "Describe this video clip"]
    )
    for chunk in response:
        print(chunk.text)
        print("_" * 80)  
    https://github.com/google-gemini/api-examples/blob/856e8a0f566a2810625cecabba6e2ab1fe97e496/python/text_generation.py#L169-L189

### Node.js

    // Make sure to include the following import:
    // import {GoogleGenAI} from '@google/genai';
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

    let video = await ai.files.upload({
      file: path.join(media, 'Big_Buck_Bunny.mp4'),
    });

    // Poll until the video file is completely processed (state becomes ACTIVE).
    while (!video.state || video.state.toString() !== 'ACTIVE') {
      console.log('Processing video...');
      console.log('File state: ', video.state);
      await sleep(5000);
      video = await ai.files.get({name: video.name});
    }

    const response = await ai.models.generateContentStream({
      model: "gemini-2.0-flash",
      contents: [
        createUserContent([
          "Describe this video clip",
          createPartFromUri(video.uri, video.mimeType),
        ]),
      ],
    });
    let text = "";
    for await (const chunk of response) {
      console.log(chunk.text);
      text += chunk.text;
    }  
    https://github.com/google-gemini/api-examples/blob/856e8a0f566a2810625cecabba6e2ab1fe97e496/javascript/text_generation.js#L269-L298

### Go

    ctx := context.Background()
    client, err := genai.NewClient(ctx, &genai.ClientConfig{
    	APIKey:  os.Getenv("GEMINI_API_KEY"),
    	Backend: genai.BackendGeminiAPI,
    })
    if err != nil {
    	log.Fatal(err)
    }

    file, err := client.Files.UploadFromPath(
    	ctx, 
    	filepath.Join(getMedia(), "Big_Buck_Bunny.mp4"), 
    	&genai.UploadFileConfig{
    		MIMEType : "video/mp4",
    	},
    )
    if err != nil {
    	log.Fatal(err)
    }

    // Poll until the video file is completely processed (state becomes ACTIVE).
    for file.State == genai.FileStateUnspecified || file.State != genai.FileStateActive {
    	fmt.Println("Processing video...")
    	fmt.Println("File state:", file.State)
    	time.Sleep(5 * time.Second)

    	file, err = client.Files.Get(ctx, file.Name, nil)
    	if err != nil {
    		log.Fatal(err)
    	}
    }

    parts := []*genai.Part{
    	genai.NewPartFromText("Describe this video clip"),
    	genai.NewPartFromURI(file.URI, file.MIMEType),
    }

    contents := []*genai.Content{
    	genai.NewContentFromParts(parts, genai.RoleUser),
    }

    for result, err := range client.Models.GenerateContentStream(
    	ctx,
    	"gemini-2.0-flash",
    	contents,
    	nil,
    ) {
    	if err != nil {
    		log.Fatal(err)
    	}
    	fmt.Print(result.Candidates[0].Content.Parts[0].Text)
    }  
    https://github.com/google-gemini/api-examples/blob/856e8a0f566a2810625cecabba6e2ab1fe97e496/go/text_generation.go#L394-L445

### Shell

    # Use File API to upload audio data to API request.
    MIME_TYPE=$(file -b --mime-type "${VIDEO_PATH}")
    NUM_BYTES=$(wc -c < "${VIDEO_PATH}")
    DISPLAY_NAME=VIDEO_PATH

    # Initial resumable request defining metadata.
    # The upload url is in the response headers dump them to a file.
    curl "${BASE_URL}/upload/v1beta/files?key=${GEMINI_API_KEY}" \
      -D upload-header.tmp \
      -H "X-Goog-Upload-Protocol: resumable" \
      -H "X-Goog-Upload-Command: start" \
      -H "X-Goog-Upload-Header-Content-Length: ${NUM_BYTES}" \
      -H "X-Goog-Upload-Header-Content-Type: ${MIME_TYPE}" \
      -H "Content-Type: application/json" \
      -d "{'file': {'display_name': '${DISPLAY_NAME}'}}" 2> /dev/null

    upload_url=$(grep -i "x-goog-upload-url: " "${tmp_header_file}" | cut -d" " -f2 | tr -d "\r")
    rm "${tmp_header_file}"

    # Upload the actual bytes.
    curl "${upload_url}" \
      -H "Content-Length: ${NUM_BYTES}" \
      -H "X-Goog-Upload-Offset: 0" \
      -H "X-Goog-Upload-Command: upload, finalize" \
      --data-binary "@${VIDEO_PATH}" 2> /dev/null > file_info.json

    file_uri=$(jq ".file.uri" file_info.json)
    echo file_uri=$file_uri

    state=$(jq ".file.state" file_info.json)
    echo state=$state

    while [[ "($state)" = *"PROCESSING"* ]];
    do
      echo "Processing video..."
      sleep 5
      # Get the file of interest to check state
      curl https://generativelanguage.googleapis.com/v1beta/files/$name > file_info.json
      state=$(jq ".file.state" file_info.json)
    done

    curl "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:streamGenerateContent?alt=sse&key=$GEMINI_API_KEY" \
        -H 'Content-Type: application/json' \
        -X POST \
        -d '{
          "contents": [{
            "parts":[
              {"text": "Please describe this file."},
              {"file_data":{"mime_type": "video/mp4", "file_uri": '$file_uri'}}]
            }]
           }' 2> /dev/null > response.json

    cat response.json
    echo  
    https://github.com/google-gemini/deprecated-generative-ai-python/blob/7a7cc5474ddaa0255a4410e05361028a24400abd/samples/rest/text_generation.sh#L335-L389

### PDF

### Python

    from google import genai

    client = genai.Client()
    sample_pdf = client.files.upload(file=media / "test.pdf")
    response = client.models.generate_content_stream(
        model="gemini-2.0-flash",
        contents=["Give me a summary of this document:", sample_pdf],
    )

    for chunk in response:
        print(chunk.text)
        print("_" * 80)  
    https://github.com/google-gemini/api-examples/blob/856e8a0f566a2810625cecabba6e2ab1fe97e496/python/text_generation.py#L207-L218

### Go

    ctx := context.Background()
    client, err := genai.NewClient(ctx, &genai.ClientConfig{
    	APIKey:  os.Getenv("GEMINI_API_KEY"),
    	Backend: genai.BackendGeminiAPI,
    })
    if err != nil {
    	log.Fatal(err)
    }

    file, err := client.Files.UploadFromPath(
    	ctx, 
    	filepath.Join(getMedia(), "test.pdf"), 
    	&genai.UploadFileConfig{
    		MIMEType : "application/pdf",
    	},
    )
    if err != nil {
    	log.Fatal(err)
    }

    parts := []*genai.Part{
    	genai.NewPartFromText("Give me a summary of this document:"),
    	genai.NewPartFromURI(file.URI, file.MIMEType),
    }

    contents := []*genai.Content{
    	genai.NewContentFromParts(parts, genai.RoleUser),
    }

    for result, err := range client.Models.GenerateContentStream(
    	ctx,
    	"gemini-2.0-flash",
    	contents,
    	nil,
    ) {
    	if err != nil {
    		log.Fatal(err)
    	}
    	fmt.Print(result.Candidates[0].Content.Parts[0].Text)
    }  
    https://github.com/google-gemini/api-examples/blob/856e8a0f566a2810625cecabba6e2ab1fe97e496/go/text_generation.go#L492-L531

### Shell

    MIME_TYPE=$(file -b --mime-type "${PDF_PATH}")
    NUM_BYTES=$(wc -c < "${PDF_PATH}")
    DISPLAY_NAME=TEXT


    echo $MIME_TYPE
    tmp_header_file=upload-header.tmp

    # Initial resumable request defining metadata.
    # The upload url is in the response headers dump them to a file.
    curl "${BASE_URL}/upload/v1beta/files?key=${GEMINI_API_KEY}" \
      -D upload-header.tmp \
      -H "X-Goog-Upload-Protocol: resumable" \
      -H "X-Goog-Upload-Command: start" \
      -H "X-Goog-Upload-Header-Content-Length: ${NUM_BYTES}" \
      -H "X-Goog-Upload-Header-Content-Type: ${MIME_TYPE}" \
      -H "Content-Type: application/json" \
      -d "{'file': {'display_name': '${DISPLAY_NAME}'}}" 2> /dev/null

    upload_url=$(grep -i "x-goog-upload-url: " "${tmp_header_file}" | cut -d" " -f2 | tr -d "\r")
    rm "${tmp_header_file}"

    # Upload the actual bytes.
    curl "${upload_url}" \
      -H "Content-Length: ${NUM_BYTES}" \
      -H "X-Goog-Upload-Offset: 0" \
      -H "X-Goog-Upload-Command: upload, finalize" \
      --data-binary "@${PDF_PATH}" 2> /dev/null > file_info.json

    file_uri=$(jq ".file.uri" file_info.json)
    echo file_uri=$file_uri

    # Now generate content using that file
    curl "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:streamGenerateContent?alt=sse&key=$GEMINI_API_KEY" \
        -H 'Content-Type: application/json' \
        -X POST \
        -d '{
          "contents": [{
            "parts":[
              {"text": "Can you add a few more lines to this poem?"},
              {"file_data":{"mime_type": "application/pdf", "file_uri": '$file_uri'}}]
            }]
           }' 2> /dev/null > response.json

    cat response.json
    echo  
    https://github.com/google-gemini/deprecated-generative-ai-python/blob/7a7cc5474ddaa0255a4410e05361028a24400abd/samples/rest/text_generation.sh#L445-L491

### Chat

### Python

    from google import genai
    from google.genai import types

    client = genai.Client()
    chat = client.chats.create(
        model="gemini-2.0-flash",
        history=[
            types.Content(role="user", parts=[types.Part(text="Hello")]),
            types.Content(
                role="model",
                parts=[
                    types.Part(
                        text="Great to meet you. What would you like to know?"
                    )
                ],
            ),
        ],
    )
    response = chat.send_message_stream(message="I have 2 dogs in my house.")
    for chunk in response:
        print(chunk.text)
        print("_" * 80)
    response = chat.send_message_stream(message="How many paws are in my house?")
    for chunk in response:
        print(chunk.text)
        print("_" * 80)

    print(chat.get_history())  
    https://github.com/google-gemini/api-examples/blob/856e8a0f566a2810625cecabba6e2ab1fe97e496/python/chat.py#L52-L79

### Node.js

    // Make sure to include the following import:
    // import {GoogleGenAI} from '@google/genai';
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    const chat = ai.chats.create({
      model: "gemini-2.0-flash",
      history: [
        {
          role: "user",
          parts: [{ text: "Hello" }],
        },
        {
          role: "model",
          parts: [{ text: "Great to meet you. What would you like to know?" }],
        },
      ],
    });

    console.log("Streaming response for first message:");
    const stream1 = await chat.sendMessageStream({
      message: "I have 2 dogs in my house.",
    });
    for await (const chunk of stream1) {
      console.log(chunk.text);
      console.log("_".repeat(80));
    }

    console.log("Streaming response for second message:");
    const stream2 = await chat.sendMessageStream({
      message: "How many paws are in my house?",
    });
    for await (const chunk of stream2) {
      console.log(chunk.text);
      console.log("_".repeat(80));
    }

    console.log(chat.getHistory());  
    https://github.com/google-gemini/api-examples/blob/856e8a0f566a2810625cecabba6e2ab1fe97e496/javascript/chat.js#L66-L101

### Go

    ctx := context.Background()
    client, err := genai.NewClient(ctx, &genai.ClientConfig{
    	APIKey:  os.Getenv("GEMINI_API_KEY"),
    	Backend: genai.BackendGeminiAPI,
    })
    if err != nil {
    	log.Fatal(err)
    }

    history := []*genai.Content{
    	genai.NewContentFromText("Hello", genai.RoleUser),
    	genai.NewContentFromText("Great to meet you. What would you like to know?", genai.RoleModel),
    }
    chat, err := client.Chats.Create(ctx, "gemini-2.0-flash", nil, history)
    if err != nil {
    	log.Fatal(err)
    }

    for chunk, err := range chat.SendMessageStream(ctx, genai.Part{Text: "I have 2 dogs in my house."}) {
    	if err != nil {
    		log.Fatal(err)
    	}
    	fmt.Println(chunk.Text())
    	fmt.Println(strings.Repeat("_", 64))
    }

    for chunk, err := range chat.SendMessageStream(ctx, genai.Part{Text: "How many paws are in my house?"}) {
    	if err != nil {
    		log.Fatal(err)
    	}
    	fmt.Println(chunk.Text())
    	fmt.Println(strings.Repeat("_", 64))
    }

    fmt.Println(chat.History(false))  
    https://github.com/google-gemini/api-examples/blob/856e8a0f566a2810625cecabba6e2ab1fe97e496/go/chat.go#L54-L88

### Shell

    curl https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:streamGenerateContent?alt=sse&key=$GEMINI_API_KEY \
        -H 'Content-Type: application/json' \
        -X POST \
        -d '{
          "contents": [
            {"role":"user",
             "parts":[{
               "text": "Hello"}]},
            {"role": "model",
             "parts":[{
               "text": "Great to meet you. What would you like to know?"}]},
            {"role":"user",
             "parts":[{
               "text": "I have two dogs in my house. How many paws are in my house?"}]},
          ]
        }' 2> /dev/null | grep "text"  
    https://github.com/google-gemini/deprecated-generative-ai-python/blob/7a7cc5474ddaa0255a4410e05361028a24400abd/samples/rest/chat.sh#L27-L43

### Java

    // Specify a Gemini model appropriate for your use case
    GenerativeModel gm =
        new GenerativeModel(
            /* modelName */ "gemini-1.5-flash",
            // Access your API key as a Build Configuration variable (see "Set up your API key"
            // above)
            /* apiKey */ BuildConfig.apiKey);
    GenerativeModelFutures model = GenerativeModelFutures.from(gm);

    // (optional) Create previous chat history for context
    Content.Builder userContentBuilder = new Content.Builder();
    userContentBuilder.setRole("user");
    userContentBuilder.addText("Hello, I have 2 dogs in my house.");
    Content userContent = userContentBuilder.build();

    Content.Builder modelContentBuilder = new Content.Builder();
    modelContentBuilder.setRole("model");
    modelContentBuilder.addText("Great to meet you. What would you like to know?");
    Content modelContent = userContentBuilder.build();

    List<Content> history = Arrays.asList(userContent, modelContent);

    // Initialize the chat
    ChatFutures chat = model.startChat(history);

    // Create a new user message
    Content.Builder userMessageBuilder = new Content.Builder();
    userMessageBuilder.setRole("user");
    userMessageBuilder.addText("How many paws are in my house?");
    Content userMessage = userMessageBuilder.build();

    // Use streaming with text-only input
    Publisher<GenerateContentResponse> streamingResponse = model.generateContentStream(userMessage);

    StringBuilder outputContent = new StringBuilder();

    streamingResponse.subscribe(
        new Subscriber<GenerateContentResponse>() {
          @Override
          public void onNext(GenerateContentResponse generateContentResponse) {
            String chunk = generateContentResponse.getText();
            outputContent.append(chunk);
          }

          @Override
          public void onComplete() {
            System.out.println(outputContent);
          }

          @Override
          public void onSubscribe(Subscription s) {
            s.request(Long.MAX_VALUE);
          }

          @Override
          public void onError(Throwable t) {}

        });  
    https://github.com/google-gemini/generative-ai-android/blob/a77dc5e4dc07d7aa710f59fde1908fbfff2e0e70/samples/src/main/java/com/google/ai/client/generative/samples/java/chat.java#L104-L162

### Response body

If successful, the response body contains a stream of[GenerateContentResponse](https://ai.google.dev/api/generate-content#v1beta.GenerateContentResponse)instances.  

## Method: tunedModels.get

- [Endpoint](https://ai.google.dev/api/tuning#body.HTTP_TEMPLATE)
- [Path parameters](https://ai.google.dev/api/tuning#body.PATH_PARAMETERS)
- [Request body](https://ai.google.dev/api/tuning#body.request_body)
- [Response body](https://ai.google.dev/api/tuning#body.response_body)
- [Authorization scopes](https://ai.google.dev/api/tuning#body.aspect)
- [Example request](https://ai.google.dev/api/tuning#body.codeSnippets)
  - [Get](https://ai.google.dev/api/tuning#body.codeSnippets.group)

Gets information about a specific TunedModel.  

### Endpoint

get`https:``/``/generativelanguage.googleapis.com``/v1beta``/{name=tunedModels``/*}`  

### Path parameters

`name``string`  
Required. The resource name of the model.

Format:`tunedModels/my-model-id`It takes the form`tunedModels/{tunedmodel}`.

### Request body

The request body must be empty.  

### Example request

### Python

    # With Gemini 2 we're launching a new SDK. See the following doc for details.
    # https://ai.google.dev/gemini-api/docs/migrate  
    https://github.com/google-gemini/deprecated-generative-ai-python/blob/7a7cc5474ddaa0255a4410e05361028a24400abd/README.md#L23-L24

### Response body

If successful, the response body contains an instance of[TunedModel](https://ai.google.dev/api/tuning#TunedModel).  

## Method: tunedModels.list

- [Endpoint](https://ai.google.dev/api/tuning#body.HTTP_TEMPLATE)
- [Query parameters](https://ai.google.dev/api/tuning#body.QUERY_PARAMETERS)
- [Request body](https://ai.google.dev/api/tuning#body.request_body)
- [Response body](https://ai.google.dev/api/tuning#body.response_body)
  - [JSON representation](https://ai.google.dev/api/tuning#body.ListTunedModelsResponse.SCHEMA_REPRESENTATION)
- [Authorization scopes](https://ai.google.dev/api/tuning#body.aspect)
- [Example request](https://ai.google.dev/api/tuning#body.codeSnippets)
  - [List](https://ai.google.dev/api/tuning#body.codeSnippets.group)

Lists created tuned models.  

### Endpoint

get`https:``/``/generativelanguage.googleapis.com``/v1beta``/tunedModels`  

### Query parameters

`pageSize``integer`  
Optional. The maximum number of`TunedModels`to return (per page). The service may return fewer tuned models.

If unspecified, at most 10 tuned models will be returned. This method returns at most 1000 models per page, even if you pass a larger pageSize.
`pageToken``string`  
Optional. A page token, received from a previous`tunedModels.list`call.

Provide the`pageToken`returned by one request as an argument to the next request to retrieve the next page.

When paginating, all other parameters provided to`tunedModels.list`must match the call that provided the page token.
`filter``string`  
Optional. A filter is a full text search over the tuned model's description and display name. By default, results will not include tuned models shared with everyone.

Additional operators: - owner:me - writers:me - readers:me - readers:everyone

Examples: "owner:me" returns all tuned models to which caller has owner role "readers:me" returns all tuned models to which caller has reader role "readers:everyone" returns all tuned models that are shared with everyone

### Request body

The request body must be empty.  

### Example request

### Python

    # With Gemini 2 we're launching a new SDK. See the following doc for details.
    # https://ai.google.dev/gemini-api/docs/migrate  
    https://github.com/google-gemini/deprecated-generative-ai-python/blob/7a7cc5474ddaa0255a4410e05361028a24400abd/README.md#L23-L24

### Response body

Response from`tunedModels.list`containing a paginated list of Models.

If successful, the response body contains data with the following structure:
Fields`tunedModels[]``object (`[TunedModel](https://ai.google.dev/api/tuning#TunedModel)`)`  
The returned Models.
`nextPageToken``string`  
A token, which can be sent as`pageToken`to retrieve the next page.

If this field is omitted, there are no more pages.  

|                                               JSON representation                                                |
|------------------------------------------------------------------------------------------------------------------|
| ``` { "tunedModels": [ { object (https://ai.google.dev/api/tuning#TunedModel) } ], "nextPageToken": string } ``` |

## Method: tunedModels.patch

- [Endpoint](https://ai.google.dev/api/tuning#body.HTTP_TEMPLATE)
- [Path parameters](https://ai.google.dev/api/tuning#body.PATH_PARAMETERS)
- [Query parameters](https://ai.google.dev/api/tuning#body.QUERY_PARAMETERS)
- [Request body](https://ai.google.dev/api/tuning#body.request_body)
- [Response body](https://ai.google.dev/api/tuning#body.response_body)
- [Authorization scopes](https://ai.google.dev/api/tuning#body.aspect)

Updates a tuned model.  

### Endpoint

patch`https:``/``/generativelanguage.googleapis.com``/v1beta``/{tunedModel.name=tunedModels``/*}`  
`PATCH https://generativelanguage.googleapis.com/v1beta/{tunedModel.name=tunedModels/*}`

### Path parameters

`tunedModel.name``string`  
Output only. The tuned model name. A unique name will be generated on create. Example:`tunedModels/az2mb0bpw6i`If displayName is set on create, the id portion of the name will be set by concatenating the words of the displayName with hyphens and adding a random portion for uniqueness.

Example:

- displayName =`Sentence Translator`
- name =`tunedModels/sentence-translator-u3b7m`It takes the form`tunedModels/{tunedmodel}`.

### Query parameters

`updateMask``string (`[FieldMask](https://protobuf.dev/reference/protobuf/google.protobuf/#field-mask)` format)`  
Optional. The list of fields to update.

This is a comma-separated list of fully qualified names of fields. Example:`"user.displayName,photo"`.

### Request body

The request body contains an instance of[TunedModel](https://ai.google.dev/api/tuning#TunedModel).
Fields`displayName``string`  
Optional. The name to display for this model in user interfaces. The display name must be up to 40 characters including spaces.
`description``string`  
Optional. A short description of this model.
`tuningTask``object (`[TuningTask](https://ai.google.dev/api/tuning#TuningTask)`)`  
Required. The tuning task that creates the tuned model.
`readerProjectNumbers[]``string (`[int64](https://developers.google.com/discovery/v1/type-format)` format)`  
Optional. List of project numbers that have read access to the tuned model.  
`source_model``Union type`  
The model used as the starting point for tuning.`source_model`can be only one of the following:
`tunedModelSource``object (`[TunedModelSource](https://ai.google.dev/api/tuning#TunedModelSource)`)`  
Optional. TunedModel to use as the starting point for training the new model.
`temperature``number`  
Optional. Controls the randomness of the output.

Values can range over`[0.0,1.0]`, inclusive. A value closer to`1.0`will produce responses that are more varied, while a value closer to`0.0`will typically result in less surprising responses from the model.

This value specifies default to be the one used by the base model while creating the model.
`topP``number`  
Optional. For Nucleus sampling.

Nucleus sampling considers the smallest set of tokens whose probability sum is at least`topP`.

This value specifies default to be the one used by the base model while creating the model.
`topK``integer`  
Optional. For Top-k sampling.

Top-k sampling considers the set of`topK`most probable tokens. This value specifies default to be used by the backend while making the call to the model.

This value specifies default to be the one used by the base model while creating the model.  

### Response body

If successful, the response body contains an instance of[TunedModel](https://ai.google.dev/api/tuning#TunedModel).  

## Method: tunedModels.delete

- [Endpoint](https://ai.google.dev/api/tuning#body.HTTP_TEMPLATE)
- [Path parameters](https://ai.google.dev/api/tuning#body.PATH_PARAMETERS)
- [Request body](https://ai.google.dev/api/tuning#body.request_body)
- [Response body](https://ai.google.dev/api/tuning#body.response_body)
- [Authorization scopes](https://ai.google.dev/api/tuning#body.aspect)

Deletes a tuned model.  

### Endpoint

delete`https:``/``/generativelanguage.googleapis.com``/v1beta``/{name=tunedModels``/*}`  

### Path parameters

`name``string`  
Required. The resource name of the model. Format:`tunedModels/my-model-id`It takes the form`tunedModels/{tunedmodel}`.

### Request body

The request body must be empty.  

### Response body

If successful, the response body is an empty JSON object.  

## REST Resource: tunedModels

- [Resource: TunedModel](https://ai.google.dev/api/tuning#TunedModel)
  - [JSON representation](https://ai.google.dev/api/tuning#TunedModel.SCHEMA_REPRESENTATION)
- [TunedModelSource](https://ai.google.dev/api/tuning#TunedModelSource)
  - [JSON representation](https://ai.google.dev/api/tuning#TunedModelSource.SCHEMA_REPRESENTATION)
- [State](https://ai.google.dev/api/tuning#State)
- [TuningTask](https://ai.google.dev/api/tuning#TuningTask)
  - [JSON representation](https://ai.google.dev/api/tuning#TuningTask.SCHEMA_REPRESENTATION)
- [TuningSnapshot](https://ai.google.dev/api/tuning#TuningSnapshot)
  - [JSON representation](https://ai.google.dev/api/tuning#TuningSnapshot.SCHEMA_REPRESENTATION)
- [Dataset](https://ai.google.dev/api/tuning#Dataset)
  - [JSON representation](https://ai.google.dev/api/tuning#Dataset.SCHEMA_REPRESENTATION)
- [TuningExamples](https://ai.google.dev/api/tuning#TuningExamples)
  - [JSON representation](https://ai.google.dev/api/tuning#TuningExamples.SCHEMA_REPRESENTATION)
- [TuningExample](https://ai.google.dev/api/tuning#TuningExample)
  - [JSON representation](https://ai.google.dev/api/tuning#TuningExample.SCHEMA_REPRESENTATION)
- [Hyperparameters](https://ai.google.dev/api/tuning#Hyperparameters)
  - [JSON representation](https://ai.google.dev/api/tuning#Hyperparameters.SCHEMA_REPRESENTATION)
- [Methods](https://ai.google.dev/api/tuning#METHODS_SUMMARY)

## Resource: TunedModel

A fine-tuned model created using ModelService.CreateTunedModel.
Fields`name``string`  
Output only. The tuned model name. A unique name will be generated on create. Example:`tunedModels/az2mb0bpw6i`If displayName is set on create, the id portion of the name will be set by concatenating the words of the displayName with hyphens and adding a random portion for uniqueness.

Example:

- displayName =`Sentence Translator`
- name =`tunedModels/sentence-translator-u3b7m`
`displayName``string`  
Optional. The name to display for this model in user interfaces. The display name must be up to 40 characters including spaces.
`description``string`  
Optional. A short description of this model.
`state``enum (`[State](https://ai.google.dev/api/tuning#State)`)`  
Output only. The state of the tuned model.
`createTime``string (`[Timestamp](https://protobuf.dev/reference/protobuf/google.protobuf/#timestamp)` format)`  
Output only. The timestamp when this model was created.

Uses RFC 3339, where generated output will always be Z-normalized and uses 0, 3, 6 or 9 fractional digits. Offsets other than "Z" are also accepted. Examples:`"2014-10-02T15:01:23Z"`,`"2014-10-02T15:01:23.045123456Z"`or`"2014-10-02T15:01:23+05:30"`.
`updateTime``string (`[Timestamp](https://protobuf.dev/reference/protobuf/google.protobuf/#timestamp)` format)`  
Output only. The timestamp when this model was updated.

Uses RFC 3339, where generated output will always be Z-normalized and uses 0, 3, 6 or 9 fractional digits. Offsets other than "Z" are also accepted. Examples:`"2014-10-02T15:01:23Z"`,`"2014-10-02T15:01:23.045123456Z"`or`"2014-10-02T15:01:23+05:30"`.
`tuningTask``object (`[TuningTask](https://ai.google.dev/api/tuning#TuningTask)`)`  
Required. The tuning task that creates the tuned model.
`readerProjectNumbers[]``string (`[int64](https://developers.google.com/discovery/v1/type-format)` format)`  
Optional. List of project numbers that have read access to the tuned model.  
`source_model``Union type`  
The model used as the starting point for tuning.`source_model`can be only one of the following:
`tunedModelSource``object (`[TunedModelSource](https://ai.google.dev/api/tuning#TunedModelSource)`)`  
Optional. TunedModel to use as the starting point for training the new model.
`baseModel``string`  
Immutable. The name of the`Model`to tune. Example:`models/gemini-1.5-flash-001`
`temperature``number`  
Optional. Controls the randomness of the output.

Values can range over`[0.0,1.0]`, inclusive. A value closer to`1.0`will produce responses that are more varied, while a value closer to`0.0`will typically result in less surprising responses from the model.

This value specifies default to be the one used by the base model while creating the model.
`topP``number`  
Optional. For Nucleus sampling.

Nucleus sampling considers the smallest set of tokens whose probability sum is at least`topP`.

This value specifies default to be the one used by the base model while creating the model.
`topK``integer`  
Optional. For Top-k sampling.

Top-k sampling considers the set of`topK`most probable tokens. This value specifies default to be used by the backend while making the call to the model.

This value specifies default to be the one used by the base model while creating the model.  

|                                                                                                                                                                                                                                  JSON representation                                                                                                                                                                                                                                   |
|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| ``` { "name": string, "displayName": string, "description": string, "state": enum (https://ai.google.dev/api/tuning#State), "createTime": string, "updateTime": string, "tuningTask": { object (https://ai.google.dev/api/tuning#TuningTask) }, "readerProjectNumbers": [ string ], // source_model "tunedModelSource": { object (https://ai.google.dev/api/tuning#TunedModelSource) }, "baseModel": string // Union type "temperature": number, "topP": number, "topK": integer } ``` |

## TunedModelSource

Tuned model as a source for training a new model.
Fields`tunedModel``string`  
Immutable. The name of the`TunedModel`to use as the starting point for training the new model. Example:`tunedModels/my-tuned-model`
`baseModel``string`  
Output only. The name of the base`Model`this`TunedModel`was tuned from. Example:`models/gemini-1.5-flash-001`  

|                  JSON representation                  |
|-------------------------------------------------------|
| ``` { "tunedModel": string, "baseModel": string } ``` |

## State

The state of the tuned model.

|                             Enums                             ||
|---------------------|------------------------------------------|
| `STATE_UNSPECIFIED` | The default value. This value is unused. |
| `CREATING`          | The model is being created.              |
| `ACTIVE`            | The model is ready to be used.           |
| `FAILED`            | The model failed to be created.          |

## TuningTask

Tuning tasks that create tuned models.
Fields`startTime``string (`[Timestamp](https://protobuf.dev/reference/protobuf/google.protobuf/#timestamp)` format)`  
Output only. The timestamp when tuning this model started.

Uses RFC 3339, where generated output will always be Z-normalized and uses 0, 3, 6 or 9 fractional digits. Offsets other than "Z" are also accepted. Examples:`"2014-10-02T15:01:23Z"`,`"2014-10-02T15:01:23.045123456Z"`or`"2014-10-02T15:01:23+05:30"`.
`completeTime``string (`[Timestamp](https://protobuf.dev/reference/protobuf/google.protobuf/#timestamp)` format)`  
Output only. The timestamp when tuning this model completed.

Uses RFC 3339, where generated output will always be Z-normalized and uses 0, 3, 6 or 9 fractional digits. Offsets other than "Z" are also accepted. Examples:`"2014-10-02T15:01:23Z"`,`"2014-10-02T15:01:23.045123456Z"`or`"2014-10-02T15:01:23+05:30"`.
`snapshots[]``object (`[TuningSnapshot](https://ai.google.dev/api/tuning#TuningSnapshot)`)`  
Output only. Metrics collected during tuning.
`trainingData``object (`[Dataset](https://ai.google.dev/api/tuning#Dataset)`)`  
Required. Input only. Immutable. The model training data.
`hyperparameters``object (`[Hyperparameters](https://ai.google.dev/api/tuning#Hyperparameters)`)`  
Immutable. Hyperparameters controlling the tuning process. If not provided, default values will be used.  

|                                                                                                                                       JSON representation                                                                                                                                       |
|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| ``` { "startTime": string, "completeTime": string, "snapshots": [ { object (https://ai.google.dev/api/tuning#TuningSnapshot) } ], "trainingData": { object (https://ai.google.dev/api/tuning#Dataset) }, "hyperparameters": { object (https://ai.google.dev/api/tuning#Hyperparameters) } } ``` |

## TuningSnapshot

Record for a single tuning step.
Fields`step``integer`  
Output only. The tuning step.
`epoch``integer`  
Output only. The epoch this step was part of.
`meanLoss``number`  
Output only. The mean loss of the training examples for this step.
`computeTime``string (`[Timestamp](https://protobuf.dev/reference/protobuf/google.protobuf/#timestamp)` format)`  
Output only. The timestamp when this metric was computed.

Uses RFC 3339, where generated output will always be Z-normalized and uses 0, 3, 6 or 9 fractional digits. Offsets other than "Z" are also accepted. Examples:`"2014-10-02T15:01:23Z"`,`"2014-10-02T15:01:23.045123456Z"`or`"2014-10-02T15:01:23+05:30"`.  

|                                   JSON representation                                    |
|------------------------------------------------------------------------------------------|
| ``` { "step": integer, "epoch": integer, "meanLoss": number, "computeTime": string } ``` |

## Dataset

Dataset for training or validation.
Fields  
`dataset``Union type`  
Inline data or a reference to the data.`dataset`can be only one of the following:
`examples``object (`[TuningExamples](https://ai.google.dev/api/tuning#TuningExamples)`)`  
Optional. Inline examples with simple input/output text.  

|                                              JSON representation                                              |
|---------------------------------------------------------------------------------------------------------------|
| ``` { // dataset "examples": { object (https://ai.google.dev/api/tuning#TuningExamples) } // Union type } ``` |

## TuningExamples

A set of tuning examples. Can be training or validation data.
Fields`examples[]``object (`[TuningExample](https://ai.google.dev/api/tuning#TuningExample)`)`  
The examples. Example input can be for text or discuss, but all examples in a set must be of the same type.  

|                                   JSON representation                                   |
|-----------------------------------------------------------------------------------------|
| ``` { "examples": [ { object (https://ai.google.dev/api/tuning#TuningExample) } ] } ``` |

## TuningExample

A single example for tuning.
Fields`output``string`  
Required. The expected model output.  
`model_input``Union type`  
The input to the model for this example.`model_input`can be only one of the following:
`textInput``string`  
Optional. Text model input.  

|                              JSON representation                               |
|--------------------------------------------------------------------------------|
| ``` { "output": string, // model_input "textInput": string // Union type } ``` |

## Hyperparameters

Hyperparameters controlling the tuning process. Read more at<https://ai.google.dev/docs/model_tuning_guidance>
Fields  
`learning_rate_option``Union type`  
Options for specifying learning rate during tuning.`learning_rate_option`can be only one of the following:
`learningRate``number`  
Optional. Immutable. The learning rate hyperparameter for tuning. If not set, a default of 0.001 or 0.0002 will be calculated based on the number of training examples.
`learningRateMultiplier``number`  
Optional. Immutable. The learning rate multiplier is used to calculate a final learningRate based on the default (recommended) value. Actual learning rate := learningRateMultiplier \* default learning rate Default learning rate is dependent on base model and dataset size. If not set, a default of 1.0 will be used.
`epochCount``integer`  
Immutable. The number of training epochs. An epoch is one pass through the training data. If not set, a default of 5 will be used.
`batchSize``integer`  
Immutable. The batch size hyperparameter for tuning. If not set, a default of 4 or 16 will be used based on the number of training examples.  

|                                                                  JSON representation                                                                   |
|--------------------------------------------------------------------------------------------------------------------------------------------------------|
| ``` { // learning_rate_option "learningRate": number, "learningRateMultiplier": number // Union type "epochCount": integer, "batchSize": integer } ``` |