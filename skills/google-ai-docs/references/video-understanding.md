> To learn about video generation, see the [Gemini Omni Flash](https://ai.google.dev/gemini-api/docs/omni) guide.

Gemini models can process videos, enabling many frontier developer use cases
that would have historically required domain specific models.
Some of Gemini's vision capabilities include the ability to: describe, segment,
and extract information from videos, answer questions about video content, and
refer to specific timestamps within a video.

You can provide videos as input to Gemini in the following ways:

| Input method | Max size | Recommended use case |
|---|---|---|
| [File API](https://ai.google.dev/gemini-api/docs/video-understanding#upload-video) | 20GB (paid) / 2GB (free) | Large files (100MB+), long videos (10min+), reusable files. |
| [Cloud Storage Registration](https://ai.google.dev/gemini-api/docs/file-input-methods#registration) | 2GB (per file, no storage limits) | Large files (100MB+), long videos (10min+), persistent, reusable files. |
| [Inline Data](https://ai.google.dev/gemini-api/docs/video-understanding#inline-video) | \< 100MB | Small files (\<100MB), short duration (\<1min), one-off inputs. |
| [YouTube URLs](https://ai.google.dev/gemini-api/docs/video-understanding#youtube) | N/A | Public YouTube videos. |

> **Note:** The [File API](https://ai.google.dev/gemini-api/docs/video-understanding#upload-video) is recommended for most use cases, especially for files larger than 100MB or when you want to reuse the file across multiple requests.

To learn about other file input methods, such as using external URLs or files
stored in Google Cloud, see the
[File input methods](https://ai.google.dev/gemini-api/docs/file-input-methods) guide.

### Upload a video file

The following code downloads a sample video, uploads it using the [Files API](https://ai.google.dev/gemini-api/docs/files),
waits for it to be processed, and then uses the uploaded file reference to
summarize the video.

### Python

    from google import genai
    import time

    client = genai.Client()

    myfile = client.files.upload(file="path/to/sample.mp4")

    while not myfile.state or myfile.state.name != "ACTIVE":
        print("Processing video...")
        time.sleep(5)
        myfile = client.files.get(name=myfile.name)

    interaction = client.interactions.create(
        model="gemini-3.8-flash",
        input=[
            {"type": "video", "uri": myfile.uri, "mime_type": myfile.mime_type},
            {"type": "text", "text": "Summarize this video. Then create a quiz with an answer key based on the information in this video."}
        ]
    )

    print(interaction.output_text)

### JavaScript

    import { GoogleGenAI } from "@google/genai";

    const ai = new GoogleGenAI({});

    async function main() {
      const myfile = await ai.files.upload({
        file: "path/to/sample.mp4",
        config: { mimeType: "video/mp4" },
      });

      let getFile = await ai.files.get({ name: myfile.name });
      while (getFile.state === 'PROCESSING') {
          getFile = await ai.files.get({ name: myfile.name });
          console.log(`current file status: ${getFile.state}`);
          console.log('File is still processing, retrying in 5 seconds');

          await new Promise((resolve) => {
              setTimeout(resolve, 5000);
          });
      }
      if (getFile.state === 'FAILED') {
          throw new Error('File processing failed.');
      }

      const interaction = await ai.interactions.create({
        model: "gemini-3.8-flash",
        input: [
          { type: "video", uri: myfile.uri, mime_type: myfile.mimeType },
          { type: "text", text: "Summarize this video. Then create a quiz with an answer key based on the information in this video." }
        ],
      });
      console.log(interaction.output_text);
    }

    await main();

### Java

    import com.google.genai.Client;
    import com.google.genai.gaos.models.interactions.Content;
    import com.google.genai.gaos.models.interactions.CreateModelInteraction;
    import com.google.genai.gaos.models.interactions.Interaction;
    import com.google.genai.gaos.models.interactions.InteractionsInput;
    import com.google.genai.gaos.models.interactions.Model;
    import com.google.genai.gaos.models.interactions.TextContent;
    import com.google.genai.gaos.models.interactions.VideoContent;
    import com.google.genai.gaos.models.interactions.VideoContentMimeType;
    import com.google.genai.gaos.models.operations.CreateInteractionRequestBody;
    import java.util.Arrays;
    import java.util.List;

    Client client = new Client();

    Content textContent = TextContent.builder().text("Summarize the key events in this video.").build();
    Content videoContent =
        VideoContent.builder()
            .uri("gs://cloud-samples-data/generative-ai/video/pixel8.mp4")
            .mimeType(VideoContentMimeType.VIDEO_MP4)
            .build();

    List<Content> contents = Arrays.asList(textContent, videoContent);

    CreateModelInteraction params =
        CreateModelInteraction.builder()
            .model(Model.of("gemini-3.8-flash"))
            .input(InteractionsInput.ofContent(contents))
            .build();

    Interaction interaction =
        client.interactions.create(CreateInteractionRequestBody.of(params)).interaction().get();

    System.out.println(interaction.outputText().orElse(""));

### REST

    VIDEO_PATH="path/to/sample.mp4"
    MIME_TYPE=$(file -b --mime-type "${VIDEO_PATH}")
    NUM_BYTES=$(wc -c < "${VIDEO_PATH}")
    DISPLAY_NAME=VIDEO

    tmp_header_file=upload-header.tmp

    echo "Starting file upload..."
    curl "https://generativelanguage.googleapis.com/upload/v1beta/files" \
      -H "x-goog-api-key: $GEMINI_API_KEY" \
      -D ${tmp_header_file} \
      -H "X-Goog-Upload-Protocol: resumable" \
      -H "X-Goog-Upload-Command: start" \
      -H "X-Goog-Upload-Header-Content-Length: ${NUM_BYTES}" \
      -H "X-Goog-Upload-Header-Content-Type: ${MIME_TYPE}" \
      -H "Content-Type: application/json" \
      -d "{'file': {'display_name': '${DISPLAY_NAME}'}}" 2> /dev/null

    upload_url=$(grep -i "x-goog-upload-url: " "${tmp_header_file}" | cut -d" " -f2 | tr -d "\r")
    rm "${tmp_header_file}"

    echo "Uploading video data..."
    curl "${upload_url}" \
      -H "Content-Length: ${NUM_BYTES}" \
      -H "X-Goog-Upload-Offset: 0" \
      -H "X-Goog-Upload-Command: upload, finalize" \
      --data-binary "@${VIDEO_PATH}" 2> /dev/null > file_info.json

    file_uri=$(jq -r ".file.uri" file_info.json)
    file_name=$(jq -r ".file.name" file_info.json)
    echo file_uri=$file_uri

    echo "File uploaded successfully. File URI: ${file_uri}"

    # Polling loop
    echo "Waiting for file to be processed..."
    while true; do
      curl -s "https://generativelanguage.googleapis.com/v1beta/${file_name}" \
        -H "x-goog-api-key: $GEMINI_API_KEY" > file_status.json
      state=$(jq -r ".state" file_status.json)
      echo "Current state: $state"
      if [ "$state" == "ACTIVE" ]; then
        break
      elif [ "$state" == "FAILED" ]; then
        echo "File processing failed."
        exit 1
      fi
      sleep 5
    done

    echo "Generating content from video..."
    curl -X POST "https://generativelanguage.googleapis.com/v1beta/interactions" \
        -H "x-goog-api-key: $GEMINI_API_KEY" \
        -H 'Content-Type: application/json' \
        -d '{
          "model": "gemini-3.8-flash",
          "input": [
            {"type": "video", "uri": "'${file_uri}'", "mime_type": "'${MIME_TYPE}'"},
            {"type": "text", "text": "Summarize this video. Then create a quiz with an answer key based on the information in this video."}
          ]
        }' 2> /dev/null > response.json

    jq ".steps[].content[0].text" response.json

Always use the Files API when the total request size (including the file, text
prompt, system instructions, etc.) is larger than 20 MB, the video duration is
significant, or if you intend to use the same video in multiple prompts.
The File API accepts video file formats directly.

To learn more about working with media files, see
[Files API](https://ai.google.dev/gemini-api/docs/files).

### Pass video data inline

Instead of uploading a video file using the File API, you can pass smaller
videos directly in the request. This is suitable for
shorter videos under 20MB total request size.

Here's an example of providing inline video data:

### Python

    from google import genai
    import base64

    video_file_name = "/path/to/your/video.mp4"
    video_bytes = open(video_file_name, 'rb').read()

    client = genai.Client()
    interaction = client.interactions.create(
        model='gemini-3.8-flash',
        input=[
            {"type": "text", "text": "Please summarize the video in 3 sentences."},
            {
                "type": "video",
                "data": base64.b64encode(video_bytes).decode('utf-8'),
                "mime_type": "video/mp4"
            }
        ]
    )
    print(interaction.output_text)

### JavaScript

    import { GoogleGenAI } from "@google/genai";
    import * as fs from "node:fs";

    const ai = new GoogleGenAI({});
    const base64VideoFile = fs.readFileSync("path/to/small-sample.mp4", {
      encoding: "base64",
    });

    const interaction = await ai.interactions.create({
      model: "gemini-3.8-flash",
      input: [
        { type: "text", text: "Please summarize the video in 3 sentences." },
        {
          type: "video",
          data: base64VideoFile,
          mime_type: "video/mp4",
        }
      ],
    });
    console.log(interaction.output_text);

### Java

    import com.google.genai.Client;
    import com.google.genai.gaos.models.interactions.Content;
    import com.google.genai.gaos.models.interactions.CreateModelInteraction;
    import com.google.genai.gaos.models.interactions.Interaction;
    import com.google.genai.gaos.models.interactions.InteractionsInput;
    import com.google.genai.gaos.models.interactions.Model;
    import com.google.genai.gaos.models.interactions.TextContent;
    import com.google.genai.gaos.models.interactions.VideoContent;
    import com.google.genai.gaos.models.interactions.VideoContentMimeType;
    import com.google.genai.gaos.models.operations.CreateInteractionRequestBody;
    import java.util.Arrays;
    import java.util.List;

    Client client = new Client();

    Content textContent = TextContent.builder().text("Summarize the key events in this video.").build();
    Content videoContent =
        VideoContent.builder()
            .uri("gs://cloud-samples-data/generative-ai/video/pixel8.mp4")
            .mimeType(VideoContentMimeType.VIDEO_MP4)
            .build();

    List<Content> contents = Arrays.asList(textContent, videoContent);

    CreateModelInteraction params =
        CreateModelInteraction.builder()
            .model(Model.of("gemini-3.8-flash"))
            .input(InteractionsInput.ofContent(contents))
            .build();

    Interaction interaction =
        client.interactions.create(CreateInteractionRequestBody.of(params)).interaction().get();

    System.out.println(interaction.outputText().orElse(""));

### REST

> [!NOTE]
> **Note:** If you get an `Argument list too long` error, the base64 encoding of your file might be too long for the curl command line. Use the File API method instead for larger files.

    VIDEO_PATH=/path/to/your/video.mp4

    if [[ "$(base64 --version 2>&1)" = *"FreeBSD"* ]]; then
      B64FLAGS="--input"
    else
      B64FLAGS="-w0"
    fi

    curl -X POST "https://generativelanguage.googleapis.com/v1beta/interactions" \
        -H "x-goog-api-key: $GEMINI_API_KEY" \
        -H 'Content-Type: application/json' \
        -d '{
          "model": "gemini-3.8-flash",
          "input": [
            {"type": "text", "text": "Please summarize the video in 3 sentences."},
            {
              "type": "video",
              "data": "'$(base64 $B64FLAGS $VIDEO_PATH)'",
              "mime_type": "video/mp4"
            }
          ]
        }' 2> /dev/null

### Pass YouTube URLs

> [!WARNING]
> **Preview:** The YouTube URL feature is in preview and is available at no charge. Pricing and rate limits are likely to change.

You can pass YouTube URLs directly to Gemini API as part of your request as follows:

### Python

    from google import genai

    client = genai.Client()
    interaction = client.interactions.create(
        model='gemini-3.8-flash',
        input=[
            {"type": "text", "text": "Please summarize the video in 3 sentences."},
            {
                "type": "video",
                "uri": "https://www.youtube.com/watch?v=9hE5-98ZeCg"
            }
        ]
    )
    print(interaction.output_text)

### JavaScript

    import { GoogleGenAI } from "@google/genai";

    const ai = new GoogleGenAI({});

    const interaction = await ai.interactions.create({
      model: "gemini-3.8-flash",
      input: [
        { type: "text", text: "Please summarize the video in 3 sentences." },
        {
          type: "video",
          uri: "https://www.youtube.com/watch?v=9hE5-98ZeCg",
        }
      ],
    });
    console.log(interaction.output_text);

### Java

    import com.google.genai.Client;
    import com.google.genai.gaos.models.interactions.Content;
    import com.google.genai.gaos.models.interactions.CreateModelInteraction;
    import com.google.genai.gaos.models.interactions.Interaction;
    import com.google.genai.gaos.models.interactions.InteractionsInput;
    import com.google.genai.gaos.models.interactions.Model;
    import com.google.genai.gaos.models.interactions.TextContent;
    import com.google.genai.gaos.models.interactions.VideoContent;
    import com.google.genai.gaos.models.interactions.VideoContentMimeType;
    import com.google.genai.gaos.models.operations.CreateInteractionRequestBody;
    import java.util.Arrays;
    import java.util.List;

    Client client = new Client();

    Content textContent = TextContent.builder().text("Summarize the key events in this video.").build();
    Content videoContent =
        VideoContent.builder()
            .uri("gs://cloud-samples-data/generative-ai/video/pixel8.mp4")
            .mimeType(VideoContentMimeType.VIDEO_MP4)
            .build();

    List<Content> contents = Arrays.asList(textContent, videoContent);

    CreateModelInteraction params =
        CreateModelInteraction.builder()
            .model(Model.of("gemini-3.8-flash"))
            .input(InteractionsInput.ofContent(contents))
            .build();

    Interaction interaction =
        client.interactions.create(CreateInteractionRequestBody.of(params)).interaction().get();

    System.out.println(interaction.outputText().orElse(""));

### REST

    curl -X POST "https://generativelanguage.googleapis.com/v1beta/interactions" \
        -H "x-goog-api-key: $GEMINI_API_KEY" \
        -H 'Content-Type: application/json' \
        -d '{
          "model": "gemini-3.8-flash",
          "input": [
            {"type": "text", "text": "Please summarize the video in 3 sentences."},
            {
              "type": "video",
              "uri": "https://www.youtube.com/watch?v=9hE5-98ZeCg"
            }
          ]
        }' 2> /dev/null

**Limitations:**

- For the free tier, you can't upload more than 8 hours of YouTube video per day.
- For the paid tier, there is no limit based on video length.
- For models prior to Gemini 2.5, you can upload only 1 video per request. For Gemini 2.5 and later models, you can upload a maximum of 10 videos per request.
- You can only upload public videos (not private or unlisted videos).

## Agentic video understanding

By default, video inputs use static processing (extracting frames at 1 FPS).
Gemini 3.8 Flash, 3.7 Flash, 3.6 Flash, and 3.5 Flash Lite models also support
**agentic video understanding**, where the model dynamically explores the video
timeline, selectively inspecting transcripts and adaptively adjusting frame
rates and resolution on the fly based on the prompt.

| **Mode** | **Description** | **Supported models** |
|---|---|---|
| **Static** (default) | Extracts frames at a fixed rate (1 FPS) and places them into context in a single pass. Works well for short clips. | All Gemini models |
| **Agentic** | The model dynamically navigates the video timeline, loading only the content it needs based on the prompt. Up to 88% more token-efficient and \~7% higher quality on long-form content. | Gemini 3.8 Flash, 3.7 Flash, 3.6 Flash, 3.5 Flash Lite |

### Choose a processing mode

As a general guideline, start with **agentic** mode, especially when optimizing
for response quality or token efficiency.

- **Agentic:** Long-form videos or queries targeting specific moments. The model dynamically navigates the timeline to target contextually relevant information without filling the context window.
- **Static:** Latency-sensitive queries on short clips (under 5 minutes), or cases where frame-level precision across the entire clip is needed.

> **Note:** For long videos or complex prompts where agentic processing takes
> more time, use streaming (`stream=True`) or background execution
> (`background=True`). This keeps the connection active, surfaces intermediate
> reasoning steps, and avoids connection or authentication timeouts.

### Set the processing mode

### Python

    import time
    from google import genai

    client = genai.Client()

    # Upload a long video
    video_file = client.files.upload(file="path/to/lecture.mp4")

    while video_file.state.name == "PROCESSING":
        time.sleep(2)
        video_file = client.files.get(name=video_file.name)

    # Use agentic processing
    interaction = client.interactions.create(
        model="gemini-3.8-flash",
        input=[
            {
                "type": "video",
                "uri": video_file.uri,
                "mime_type": video_file.mime_type,
                "processing": "agentic"
            },
            {"type": "text", "text": "What are the three main arguments presented?"}
        ]
    )
    print(interaction.output_text)

### JavaScript

    import { GoogleGenAI } from "@google/genai";

    const ai = new GoogleGenAI({});

    // Upload a long video
    let videoFile = await ai.files.upload({
      file: "path/to/lecture.mp4",
      config: { mimeType: "video/mp4" }
    });

    while (videoFile.state === "PROCESSING") {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      videoFile = await ai.files.get({ name: videoFile.name });
    }

    // Use agentic processing
    const interaction = await ai.interactions.create({
      model: "gemini-3.8-flash",
      input: [
        {
          type: "video",
          uri: videoFile.uri,
          mime_type: videoFile.mimeType,
          processing: "agentic"
        },
        { type: "text", text: "What are the three main arguments presented?" }
      ]
    });
    console.log(interaction.output_text);

### REST

    curl -X POST "https://generativelanguage.googleapis.com/v1beta/interactions" \
      -H "x-goog-api-key: $GEMINI_API_KEY" \
      -H 'Content-Type: application/json' \
      -d '{
        "model": "gemini-3.8-flash",
        "input": [
          {
            "type": "video",
            "uri": "'${file_uri}'",
            "mime_type": "video/mp4",
            "processing": "agentic"
          },
          {"type": "text", "text": "What are the three main arguments presented?"}
        ]
      }' 2> /dev/null

> **Note:** To verify that agentic processing was used, inspect `interaction.steps`. The presence of `processing_call` and `processing_result` indicates that the model dynamically navigated the video.

### Response steps

Agentic processing adds two new step types to the `steps` array:

- `processing_call`: the model requested a video segment or audio transcript, identified by `id`.
- `processing_result`: the result of that load, linked by `call_id`.

These appear interleaved with `thought` steps (when summaries are enabled) and precede the final `model_output` step. They can be used to show a progress trace in your UI but do not require a response.

The following example shows the response payload with interleaved processing steps:

    {
      "steps": [
        {
          "type": "thought",
          "signature": "sig_thought_1",
          "summary": [
            {
              "type": "text",
              "text": "Inspecting transcript for key discussion topics..."
            }
          ]
        },
        {
          "type": "processing_call",
          "id": "call_01",
          "signature": "sig_call_01"
        },
        {
          "type": "processing_result",
          "call_id": "call_01",
          "signature": "sig_result_01"
        },
        {
          "type": "thought",
          "signature": "sig_thought_2",
          "summary": [
            {
              "type": "text",
              "text": "Loading visual frames to verify slide content..."
            }
          ]
        },
        {
          "type": "processing_call",
          "id": "call_02",
          "signature": "sig_call_02"
        },
        {
          "type": "processing_result",
          "call_id": "call_02",
          "signature": "sig_result_02"
        },
        {
          "type": "thought",
          "signature": "sig_thought_3",
          "summary": [
            {
              "type": "text",
              "text": "Synthesizing answer from gathered evidence..."
            }
          ]
        },
        {
          "type": "model_output",
          "content": [
            {
              "type": "text",
              "text": "The three main arguments presented in the lecture are..."
            }
          ]
        }
      ]
    }

### Mix processing modes across videos

You can set different processing modes for each video in the same request:

### Python

    from google import genai

    client = genai.Client()

    lecture = client.files.upload(file="path/to/long-lecture.mp4")
    experiment = client.files.upload(file="path/to/short-experiment.mp4")

    interaction = client.interactions.create(
        model="gemini-3.8-flash",
        input=[
            {
                "type": "video",
                "uri": lecture.uri,
                "mime_type": lecture.mime_type,
                "processing": "agentic"  # Use agentic video understanding
            },
            {
                "type": "video",
                "uri": experiment.uri,
                "mime_type": experiment.mime_type,
                "processing": "static"  # Use static processing
            },
            {"type": "text", "text": "Compare the lecture content with the experiment results."}
        ]
    )
    print(interaction.output_text)

### JavaScript

    import { GoogleGenAI } from "@google/genai";

    const ai = new GoogleGenAI({});

    const lecture = await ai.files.upload({
      file: "path/to/long-lecture.mp4",
      config: { mimeType: "video/mp4" }
    });
    const experiment = await ai.files.upload({
      file: "path/to/short-experiment.mp4",
      config: { mimeType: "video/mp4" }
    });

    const interaction = await ai.interactions.create({
      model: "gemini-3.8-flash",
      input: [
        {
          type: "video",
          uri: lecture.uri,
          mime_type: lecture.mimeType,
          processing: "agentic" // Use agentic video understanding
        },
        {
          type: "video",
          uri: experiment.uri,
          mime_type: experiment.mimeType,
          processing: "static" // Use static processing
        },
        { type: "text", text: "Compare the lecture content with the experiment results." }
      ]
    });
    console.log(interaction.output_text);

### REST

    curl -X POST "https://generativelanguage.googleapis.com/v1beta/interactions" \
      -H "x-goog-api-key: $GEMINI_API_KEY" \
      -H 'Content-Type: application/json' \
      -d '{
        "model": "gemini-3.8-flash",
        "input": [
          {
            "type": "video",
            "uri": "'${lecture_uri}'",
            "mime_type": "video/mp4",
            "processing": "agentic"
          },
          {
            "type": "video",
            "uri": "'${experiment_uri}'",
            "mime_type": "video/mp4",
            "processing": "static"
          },
          {"type": "text", "text": "Compare the lecture content with the experiment results."}
        ]
      }' 2> /dev/null

### Multi-turn video conversations

Video context is preserved across turns in a conversation. When using agentic
processing:

- **Stateful mode** (using `previous_interaction_id`): The server retains the video context. No additional handling is needed.
- **Stateless mode** (using `step_list`): In stateless mode, the response includes `processing_call` and `processing_result` steps that encode the video context. You must include all steps from the response in your next request's `step_list` to preserve video context. While omitting them does not currently return an API error, the video context is lost, significantly reducing response quality on follow-up questions. Note that returned steps sent in subsequent requests contribute to input token counts.

## Refer to timestamps in the content

You can ask questions about specific points in time within the video using
timestamps of the form `MM:SS`.

### Python

    prompt = "What are the examples given at 00:05 and 00:10 supposed to show us?"

### JavaScript

    const prompt = "What are the examples given at 00:05 and 00:10 supposed to show us?";

### Java

    import com.google.genai.Client;
    import com.google.genai.gaos.models.interactions.Content;
    import com.google.genai.gaos.models.interactions.CreateModelInteraction;
    import com.google.genai.gaos.models.interactions.Interaction;
    import com.google.genai.gaos.models.interactions.InteractionsInput;
    import com.google.genai.gaos.models.interactions.Model;
    import com.google.genai.gaos.models.interactions.TextContent;
    import com.google.genai.gaos.models.interactions.VideoContent;
    import com.google.genai.gaos.models.interactions.VideoContentMimeType;
    import com.google.genai.gaos.models.operations.CreateInteractionRequestBody;
    import java.util.Arrays;
    import java.util.List;

    Client client = new Client();

    Content textContent = TextContent.builder().text("Summarize the key events in this video.").build();
    Content videoContent =
        VideoContent.builder()
            .uri("gs://cloud-samples-data/generative-ai/video/pixel8.mp4")
            .mimeType(VideoContentMimeType.VIDEO_MP4)
            .build();

    List<Content> contents = Arrays.asList(textContent, videoContent);

    CreateModelInteraction params =
        CreateModelInteraction.builder()
            .model(Model.of("gemini-3.8-flash"))
            .input(InteractionsInput.ofContent(contents))
            .build();

    Interaction interaction =
        client.interactions.create(CreateInteractionRequestBody.of(params)).interaction().get();

    System.out.println(interaction.outputText().orElse(""));

### REST

    PROMPT="What are the examples given at 00:05 and 00:10 supposed to show us?"

## Extract detailed insights from video

Gemini models offer powerful capabilities for understanding video content by
processing information from both the **audio and visual** streams. This lets you
extract a rich set of details, including generating descriptions of what is
happening in a video and answering questions about its content.

For visual descriptions, the model samples the video at a rate of **1 frame
per second** (FPS). This default sampling rate works well for most content, but
note that it may miss details in videos with rapid motion or quick scene changes.

### Python

    prompt = "Describe the key events in this video, providing both audio and visual details. Include timestamps for salient moments."

### JavaScript

    const prompt = "Describe the key events in this video, providing both audio and visual details. Include timestamps for salient moments.";

### Java

    import com.google.genai.Client;
    import com.google.genai.gaos.models.interactions.Content;
    import com.google.genai.gaos.models.interactions.CreateModelInteraction;
    import com.google.genai.gaos.models.interactions.Interaction;
    import com.google.genai.gaos.models.interactions.InteractionsInput;
    import com.google.genai.gaos.models.interactions.Model;
    import com.google.genai.gaos.models.interactions.TextContent;
    import com.google.genai.gaos.models.interactions.VideoContent;
    import com.google.genai.gaos.models.interactions.VideoContentMimeType;
    import com.google.genai.gaos.models.operations.CreateInteractionRequestBody;
    import java.util.Arrays;
    import java.util.List;

    Client client = new Client();

    Content textContent = TextContent.builder().text("Summarize the key events in this video.").build();
    Content videoContent =
        VideoContent.builder()
            .uri("gs://cloud-samples-data/generative-ai/video/pixel8.mp4")
            .mimeType(VideoContentMimeType.VIDEO_MP4)
            .build();

    List<Content> contents = Arrays.asList(textContent, videoContent);

    CreateModelInteraction params =
        CreateModelInteraction.builder()
            .model(Model.of("gemini-3.8-flash"))
            .input(InteractionsInput.ofContent(contents))
            .build();

    Interaction interaction =
        client.interactions.create(CreateInteractionRequestBody.of(params)).interaction().get();

    System.out.println(interaction.outputText().orElse(""));

### REST

    PROMPT="Describe the key events in this video, providing both audio and visual details. Include timestamps for salient moments."

## Customize video processing

You can customize video processing in the Gemini API by setting clipping
intervals or providing custom frame rate sampling. These customization options
are only supported when processing the video in `"static"` mode.

### Set clipping intervals

You can clip video by specifying `start_offset` and `end_offset` in the `processing` configuration object.

### Python

    interaction = client.interactions.create(
        model="gemini-3.8-flash",
        input=[
            {
                "type": "video",
                "uri": video_file.uri,
                "mime_type": video_file.mime_type,
                "processing": {
                    "type": "static",
                    "start_offset": 1200,
                    "end_offset": 1500,
                },
            },
            {"type": "text", "text": "Summarize this section of the video."},
        ],
    )
    print(interaction.output_text)

### JavaScript

    const interaction = await ai.interactions.create({
      model: "gemini-3.8-flash",
      input: [
        {
          type: "video",
          uri: videoFile.uri,
          mime_type: videoFile.mimeType,
          processing: {
            type: "static",
            start_offset: 1200,
            end_offset: 1500,
          },
        },
        { type: "text", text: "Summarize this section of the video." },
      ],
    });
    console.log(interaction.output_text);

### REST

    curl -X POST "https://generativelanguage.googleapis.com/v1beta/interactions" \
      -H "x-goog-api-key: $GEMINI_API_KEY" \
      -H 'Content-Type: application/json' \
      -d '{
        "model": "gemini-3.8-flash",
        "input": [
          {
            "type": "video",
            "uri": "'${file_uri}'",
            "mime_type": "video/mp4",
            "processing": {
              "type": "static",
              "start_offset": 1200,
              "end_offset": 1500
            }
          },
          {"type": "text", "text": "Summarize this section of the video."}
        ]
      }' 2> /dev/null

### Set a custom frame rate

You can set custom frame rate sampling by passing an `fps` argument in the `processing` configuration object.

### Python

    interaction = client.interactions.create(
        model="gemini-3.8-flash",
        input=[
            {
                "type": "video",
                "uri": video_file.uri,
                "mime_type": video_file.mime_type,
                "processing": {
                    "type": "static",
                    "fps": 0.5,  # Sample 1 frame every 2 seconds
                },
            },
            {"type": "text", "text": "Describe the scene changes in this video."},
        ],
    )
    print(interaction.output_text)

### JavaScript

    const interaction = await ai.interactions.create({
      model: "gemini-3.8-flash",
      input: [
        {
          type: "video",
          uri: videoFile.uri,
          mime_type: videoFile.mimeType,
          processing: {
            type: "static",
            fps: 0.5, // Sample 1 frame every 2 seconds
          },
        },
        { type: "text", text: "Describe the scene changes in this video." },
      ],
    });
    console.log(interaction.output_text);

### REST

    curl -X POST "https://generativelanguage.googleapis.com/v1beta/interactions" \
      -H "x-goog-api-key: $GEMINI_API_KEY" \
      -H 'Content-Type: application/json' \
      -d '{
        "model": "gemini-3.8-flash",
        "input": [
          {
            "type": "video",
            "uri": "'${file_uri}'",
            "mime_type": "video/mp4",
            "processing": {
              "type": "static",
              "fps": 0.5
            }
          },
          {"type": "text", "text": "Describe the scene changes in this video."}
        ]
      }' 2> /dev/null

## Supported video formats

Gemini supports the following video format MIME types:

- `video/mp4`
- `video/mpeg`
- `video/mov`
- `video/avi`
- `video/x-flv`
- `video/mpg`
- `video/webm`
- `video/wmv`
- `video/3gpp`

## Technical details about videos

- **Supported models and context** : All Gemini models can process video data.
  - Models with a 1M context window can process videos up to 3 hours long by default (at low media resolution), or up to 1 hour long at high media resolution.
- **Processing modes** : Gemini 3.8 Flash, 3.7 Flash, 3.6 Flash, 3.5 Flash Lite, and later models support two video processing modes:
  - **Static**: Frames are extracted at 1 FPS and placed into context (default for all models). Audio is processed at 1Kbps (single channel). Timestamps are added every second. Best for short clips or when every frame matters (such as frame-by-frame inspection). Note that fast action sequences might lose detail due to the 1 FPS sampling rate.
  - **Agentic** : The model dynamically navigates the video, loading transcript and/or frames and/or audio on demand. This uses up to 88% fewer tokens for long-form content, though navigation may slightly increase Time to First Token (TTFT) on short clips (\<5 minutes) due to internal reasoning and tool round-trips before generation begins. Best for long-form videos to optimize token costs and response quality. Supported on Gemini 3.8 Flash, 3.7 Flash, 3.6 Flash, and 3.5 Flash Lite. See [Agentic video understanding](https://ai.google.dev/gemini-api/docs/video-understanding#agentic-video-understanding) for details.
- **Token calculation (static mode)** : Each second of video is tokenized as follows:
  - Individual frames (sampled at 1 FPS):
    - If `media_resolution` is set to low, frames are tokenized at 66 tokens per frame.
    - Otherwise, frames are tokenized at 258 tokens per frame.
  - Audio: 32 tokens per second.
  - Metadata is also included.
  - Total: Approximately 100 tokens per second of video at default (low) media resolution, or approximately 300 tokens per second of video at high media resolution.
- **Token calculation (agentic mode)** : Token usage varies based on content complexity and the model's navigation strategy. Navigation reasoning tokens generated during video exploration are accounted as **thought tokens** (`total_thought_tokens`), while frames, audio, and transcript loaded on demand are accounted as tool use tokens (`total_tool_use_tokens`). Agentic processing typically uses up to 88% fewer total tokens than static processing for long-form content because the model loads only the transcript and/or frames and/or audio it needs to answer the prompt (see the [tokens guide](https://ai.google.dev/gemini-api/docs/tokens#video-token-usage)).
- **Media resolution** : Gemini 3 introduces granular control over multimodal vision processing with the `media_resolution` parameter. The `media_resolution` parameter determines the **maximum number of tokens
  allocated per input image or video frame.** Higher resolutions improve the model's ability to read fine text or identify small details, but increase token usage and latency. The `media_resolution` and `processing` parameters are independent: you can set both on the same video input.

For more details on token calculations, see the
[tokens](https://ai.google.dev/gemini-api/docs/tokens) guide.

- **Timestamp format** : When referring to specific moments in a video within your prompt, use the `MM:SS` format (e.g., `01:15` for 1 minute and 15 seconds).
- **Prompt placement** : If combining text and a single video, place the text prompt *after* the video part in the `input` array.
- **Timeouts for long requests** : For videos that require extended processing time or complex multi-step reasoning, use streaming (`stream=True`) or background execution (`background=True`). Synchronous, non-streaming requests that experience backend retries under high demand can exceed connection or authentication token validity windows, which may surface as unexpected `401 Unauthorized` or timeout errors. Streaming keeps the connection active and surfaces intermediate reasoning and tool call progress.

## What's next

- [Media resolution](https://ai.google.dev/gemini-api/docs/media-resolution): Control the resolution of video frames to balance quality and token usage.
- [Tokens](https://ai.google.dev/gemini-api/docs/tokens): Understand how video content is tokenized in both static and agentic processing modes.
- [System instructions](https://ai.google.dev/gemini-api/docs/text-generation#system-instructions): System instructions let you steer the behavior of the model based on your specific needs and use cases.
- [Files API](https://ai.google.dev/gemini-api/docs/files): Learn more about uploading and managing files for use with Gemini.
- [File prompting strategies](https://ai.google.dev/gemini-api/docs/files#prompt-guide): The Gemini API supports prompting with text, image, audio, and video data, also known as multimodal prompting.
- [Safety guidance](https://ai.google.dev/gemini-api/docs/safety-guidance): Sometimes generative AI models produce unexpected outputs, such as outputs that are inaccurate, biased, or offensive. Post-processing and human evaluation are essential to limit the risk of harm from such outputs.