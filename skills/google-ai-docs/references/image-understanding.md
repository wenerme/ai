# Image understanding

Gemini models are built to be multimodal from the ground up, unlocking a wide
range of image processing and computer vision tasks including but not limited to
image captioning, classification, and visual question answering without having
to train specialized ML models.

In addition to their general multimodal capabilities, Gemini models offer
**enhanced accuracy** for specific use cases like [object detection](https://ai.google.dev/gemini-api/docs/image-understanding#object-detection), through additional
training.

## Passing images to Gemini

You can provide images as input to Gemini using two methods:

- [Passing inline image data](https://ai.google.dev/gemini-api/docs/image-understanding#inline-image): Ideal for smaller files (total request size less than 20MB, including prompts).
- [Uploading images using the File API](https://ai.google.dev/gemini-api/docs/image-understanding#upload-image): Recommended for larger files or for reusing images across multiple requests.

### Passing inline image data

You can pass inline image data in the
request to `generateContent`. You can provide image data as Base64 encoded
strings or by reading local files directly (depending on the language).

The following example shows how to read an image from a local file and pass
it to `generateContent` API for processing.

### Python

      from google import genai
      from google.genai import types

      with open('path/to/small-sample.jpg', 'rb') as f:
          image_bytes = f.read()

      client = genai.Client()
      response = client.models.generate_content(
        model='gemini-3.5-flash',
        contents=[
          types.Part.from_bytes(
            data=image_bytes,
            mime_type='image/jpeg',
          ),
          'Caption this image.'
        ]
      )

      print(response.text)

### JavaScript

    import { GoogleGenAI } from "@google/genai";
    import * as fs from "node:fs";

    const ai = new GoogleGenAI({});
    const base64ImageFile = fs.readFileSync("path/to/small-sample.jpg", {
      encoding: "base64",
    });

    const contents = [
      {
        inlineData: {
          mimeType: "image/jpeg",
          data: base64ImageFile,
        },
      },
      { text: "Caption this image." },
    ];

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: contents,
    });
    console.log(response.text);

### Go

    bytes, _ := os.ReadFile("path/to/small-sample.jpg")

    parts := []*genai.Part{
      genai.NewPartFromBytes(bytes, "image/jpeg"),
      genai.NewPartFromText("Caption this image."),
    }

    contents := []*genai.Content{
      genai.NewContentFromParts(parts, genai.RoleUser),
    }

    result, _ := client.Models.GenerateContent(
      ctx,
      "gemini-3.5-flash",
      contents,
      nil,
    )

    fmt.Println(result.Text())

### REST

    IMG_PATH="/path/to/your/image1.jpg"

    if [[ "$(base64 --version 2>&1)" = *"FreeBSD"* ]]; then
    B64FLAGS="--input"
    else
    B64FLAGS="-w0"
    fi

    curl "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash:generateContent" \
    -H "x-goog-api-key: $GEMINI_API_KEY" \
    -H 'Content-Type: application/json' \
    -X POST \
    -d '{
        "contents": [{
        "parts":[
            {
                "inline_data": {
                "mime_type":"image/jpeg",
                "data": "'"$(base64 $B64FLAGS $IMG_PATH)"'"
                }
            },
            {"text": "Caption this image."},
        ]
        }]
    }' 2> /dev/null

You can also fetch an image from a URL, convert it to bytes, and pass it to
`generateContent` as shown in the following examples.

### Python

    from google import genai
    from google.genai import types

    import requests

    image_path = "https://goo.gle/instrument-img"
    image_bytes = requests.get(image_path).content
    image = types.Part.from_bytes(
      data=image_bytes, mime_type="image/jpeg"
    )

    client = genai.Client()

    response = client.models.generate_content(
        model="gemini-3.5-flash",
        contents=["What is this image?", image],
    )

    print(response.text)

### JavaScript

    import { GoogleGenAI } from "@google/genai";

    async function main() {
      const ai = new GoogleGenAI({});

      const imageUrl = "https://goo.gle/instrument-img";

      const response = await fetch(imageUrl);
      const imageArrayBuffer = await response.arrayBuffer();
      const base64ImageData = Buffer.from(imageArrayBuffer).toString('base64');

      const result = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: [
        {
          inlineData: {
            mimeType: 'image/jpeg',
            data: base64ImageData,
          },
        },
        { text: "Caption this image." }
      ],
      });
      console.log(result.text);
    }

    main();

### Go

    package main

    import (
      "context"
      "fmt"
      "os"
      "io"
      "net/http"
      "google.golang.org/genai"
    )

    func main() {
      ctx := context.Background()
      client, err := genai.NewClient(ctx, nil)
      if err != nil {
          log.Fatal(err)
      }

      // Download the image.
      imageResp, _ := http.Get("https://goo.gle/instrument-img")

      imageBytes, _ := io.ReadAll(imageResp.Body)

      parts := []*genai.Part{
        genai.NewPartFromBytes(imageBytes, "image/jpeg"),
        genai.NewPartFromText("Caption this image."),
      }

      contents := []*genai.Content{
        genai.NewContentFromParts(parts, genai.RoleUser),
      }

      result, _ := client.Models.GenerateContent(
        ctx,
        "gemini-3.5-flash",
        contents,
        nil,
      )

      fmt.Println(result.Text())
    }

### REST

    IMG_URL="https://goo.gle/instrument-img"

    MIME_TYPE=$(curl -sIL "$IMG_URL" | grep -i '^content-type:' | awk -F ': ' '{print $2}' | sed 's/\r$//' | head -n 1)
    if [[ -z "$MIME_TYPE" || ! "$MIME_TYPE" == image/* ]]; then
      MIME_TYPE="image/jpeg"
    fi

    # Check for macOS
    if [[ "$(uname)" == "Darwin" ]]; then
      IMAGE_B64=$(curl -sL "$IMG_URL" | base64 -b 0)
    elif [[ "$(base64 --version 2>&1)" = *"FreeBSD"* ]]; then
      IMAGE_B64=$(curl -sL "$IMG_URL" | base64)
    else
      IMAGE_B64=$(curl -sL "$IMG_URL" | base64 -w0)
    fi

    curl "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash:generateContent" \
        -H "x-goog-api-key: $GEMINI_API_KEY" \
        -H 'Content-Type: application/json' \
        -X POST \
        -d '{
          "contents": [{
            "parts":[
                {
                  "inline_data": {
                    "mime_type":"'"$MIME_TYPE"'",
                    "data": "'"$IMAGE_B64"'"
                  }
                },
                {"text": "Caption this image."}
            ]
          }]
        }' 2> /dev/null

> [!NOTE]
> **Note:** Inline image data limits your total request size (text prompts, system instructions, and inline bytes) to 20MB. For larger requests, [upload image files](https://ai.google.dev/gemini-api/docs/image-understanding#upload-image) using the File API. Files API is also more efficient for scenarios that use the same image repeatedly.

### Uploading images using the File API

For large files or to be able to use the same image file repeatedly, use the
Files API. The following code uploads an image file and then uses the file in a
call to `generateContent`. See the [Files API guide](https://ai.google.dev/gemini-api/docs/files) for
more information and examples.

### Python

    from google import genai

    client = genai.Client()

    my_file = client.files.upload(file="path/to/sample.jpg")

    response = client.models.generate_content(
        model="gemini-3.5-flash",
        contents=[my_file, "Caption this image."],
    )

    print(response.text)

### JavaScript

    import {
      GoogleGenAI,
      createUserContent,
      createPartFromUri,
    } from "@google/genai";

    const ai = new GoogleGenAI({});

    async function main() {
      const myfile = await ai.files.upload({
        file: "path/to/sample.jpg",
        config: { mimeType: "image/jpeg" },
      });

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: createUserContent([
          createPartFromUri(myfile.uri, myfile.mimeType),
          "Caption this image.",
        ]),
      });
      console.log(response.text);
    }

    await main();

### Go

    package main

    import (
      "context"
      "fmt"
      "os"
      "google.golang.org/genai"
    )

    func main() {
      ctx := context.Background()
      client, err := genai.NewClient(ctx, nil)
      if err != nil {
          log.Fatal(err)
      }

      uploadedFile, _ := client.Files.UploadFromPath(ctx, "path/to/sample.jpg", nil)

      parts := []*genai.Part{
          genai.NewPartFromText("Caption this image."),
          genai.NewPartFromURI(uploadedFile.URI, uploadedFile.MIMEType),
      }

      contents := []*genai.Content{
          genai.NewContentFromParts(parts, genai.RoleUser),
      }

      result, _ := client.Models.GenerateContent(
          ctx,
          "gemini-3.5-flash",
          contents,
          nil,
      )

      fmt.Println(result.Text())
    }

### REST

    IMAGE_PATH="path/to/sample.jpg"
    MIME_TYPE=$(file -b --mime-type "${IMAGE_PATH}")
    NUM_BYTES=$(wc -c < "${IMAGE_PATH}")
    DISPLAY_NAME=IMAGE

    tmp_header_file=upload-header.tmp

    # Initial resumable request defining metadata.
    # The upload url is in the response headers dump them to a file.
    curl "https://generativelanguage.googleapis.com/upload/v1beta/files" \
      -H "x-goog-api-key: $GEMINI_API_KEY" \
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
      -H "x-goog-api-key: $GEMINI_API_KEY" \
      -H "Content-Length: ${NUM_BYTES}" \
      -H "X-Goog-Upload-Offset: 0" \
      -H "X-Goog-Upload-Command: upload, finalize" \
      --data-binary "@${IMAGE_PATH}" 2> /dev/null > file_info.json

    file_uri=$(jq -r ".file.uri" file_info.json)
    echo file_uri=$file_uri

    # Now generate content using that file
    curl "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash:generateContent" \
        -H "x-goog-api-key: $GEMINI_API_KEY" \
        -H 'Content-Type: application/json' \
        -X POST \
        -d '{
          "contents": [{
            "parts":[
              {"file_data":{"mime_type": "'"${MIME_TYPE}"'", "file_uri": "'"${file_uri}"'"}},
              {"text": "Caption this image."}]
            }]
          }' 2> /dev/null > response.json

    cat response.json
    echo

    jq ".candidates[].content.parts[].text" response.json

## Prompting with multiple images

You can provide multiple images in a single prompt by including multiple image
`Part` objects in the `contents` array. These can be a mix of inline data
(local files or URLs) and File API references.

### Python

    from google import genai
    from google.genai import types

    client = genai.Client()

    # Upload the first image
    image1_path = "path/to/image1.jpg"
    uploaded_file = client.files.upload(file=image1_path)

    # Prepare the second image as inline data
    image2_path = "path/to/image2.png"
    with open(image2_path, 'rb') as f:
        img2_bytes = f.read()

    # Create the prompt with text and multiple images
    response = client.models.generate_content(

        model="gemini-3.5-flash",
        contents=[
            "What is different between these two images?",
            uploaded_file,  # Use the uploaded file reference
            types.Part.from_bytes(
                data=img2_bytes,
                mime_type='image/png'
            )
        ]
    )

    print(response.text)

### JavaScript

    import {
      GoogleGenAI,
      createUserContent,
      createPartFromUri,
    } from "@google/genai";
    import * as fs from "node:fs";

    const ai = new GoogleGenAI({});

    async function main() {
      // Upload the first image
      const image1_path = "path/to/image1.jpg";
      const uploadedFile = await ai.files.upload({
        file: image1_path,
        config: { mimeType: "image/jpeg" },
      });

      // Prepare the second image as inline data
      const image2_path = "path/to/image2.png";
      const base64Image2File = fs.readFileSync(image2_path, {
        encoding: "base64",
      });

      // Create the prompt with text and multiple images

      const response = await ai.models.generateContent({

        model: "gemini-3.5-flash",
        contents: createUserContent([
          "What is different between these two images?",
          createPartFromUri(uploadedFile.uri, uploadedFile.mimeType),
          {
            inlineData: {
              mimeType: "image/png",
              data: base64Image2File,
            },
          },
        ]),
      });
      console.log(response.text);
    }

    await main();

### Go

    // Upload the first image
    image1Path := "path/to/image1.jpg"
    uploadedFile, _ := client.Files.UploadFromPath(ctx, image1Path, nil)

    // Prepare the second image as inline data
    image2Path := "path/to/image2.jpeg"
    imgBytes, _ := os.ReadFile(image2Path)

    parts := []*genai.Part{
      genai.NewPartFromText("What is different between these two images?"),
      genai.NewPartFromBytes(imgBytes, "image/jpeg"),
      genai.NewPartFromURI(uploadedFile.URI, uploadedFile.MIMEType),
    }

    contents := []*genai.Content{
      genai.NewContentFromParts(parts, genai.RoleUser),
    }

    result, _ := client.Models.GenerateContent(
      ctx,
      "gemini-3.5-flash",
      contents,
      nil,
    )

    fmt.Println(result.Text())

### REST

    # Upload the first image
    IMAGE1_PATH="path/to/image1.jpg"
    MIME1_TYPE=$(file -b --mime-type "${IMAGE1_PATH}")
    NUM1_BYTES=$(wc -c < "${IMAGE1_PATH}")
    DISPLAY_NAME1=IMAGE1

    tmp_header_file1=upload-header1.tmp

    curl "https://generativelanguage.googleapis.com/upload/v1beta/files" \
      -H "x-goog-api-key: $GEMINI_API_KEY" \
      -D upload-header1.tmp \
      -H "X-Goog-Upload-Protocol: resumable" \
      -H "X-Goog-Upload-Command: start" \
      -H "X-Goog-Upload-Header-Content-Length: ${NUM1_BYTES}" \
      -H "X-Goog-Upload-Header-Content-Type: ${MIME1_TYPE}" \
      -H "Content-Type: application/json" \
      -d "{'file': {'display_name': '${DISPLAY_NAME1}'}}" 2> /dev/null

    upload_url1=$(grep -i "x-goog-upload-url: " "${tmp_header_file1}" | cut -d" " -f2 | tr -d "\r")
    rm "${tmp_header_file1}"

    curl "${upload_url1}" \
      -H "Content-Length: ${NUM1_BYTES}" \
      -H "X-Goog-Upload-Offset: 0" \
      -H "X-Goog-Upload-Command: upload, finalize" \
      --data-binary "@${IMAGE1_PATH}" 2> /dev/null > file_info1.json

    file1_uri=$(jq ".file.uri" file_info1.json)
    echo file1_uri=$file1_uri

    # Prepare the second image (inline)
    IMAGE2_PATH="path/to/image2.png"
    MIME2_TYPE=$(file -b --mime-type "${IMAGE2_PATH}")

    if [[ "$(base64 --version 2>&1)" = *"FreeBSD"* ]]; then
      B64FLAGS="--input"
    else
      B64FLAGS="-w0"
    fi
    IMAGE2_BASE64=$(base64 $B64FLAGS $IMAGE2_PATH)

    # Now generate content using both images
    curl "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash:generateContent" \
        -H "x-goog-api-key: $GEMINI_API_KEY" \
        -H 'Content-Type: application/json' \
        -X POST \
        -d '{
          "contents": [{
            "parts":[
              {"text": "What is different between these two images?"},
              {"file_data":{"mime_type": "'"${MIME1_TYPE}"'", "file_uri": '$file1_uri'}},
              {
                "inline_data": {
                  "mime_type":"'"${MIME2_TYPE}"'",
                  "data": "'"$IMAGE2_BASE64"'"
                }
              }
            ]
          }]
        }' 2> /dev/null > response.json

    cat response.json
    echo

    jq ".candidates[].content.parts[].text" response.json

## Object detection

Models are trained to detect objects in an
image and get their bounding box coordinates. The coordinates, relative to image
dimensions, scale to \[0, 1000\]. You need to descale these coordinates based on
your original image size.

### Python

    from google import genai
    from google.genai import types
    from PIL import Image
    import json

    client = genai.Client()
    prompt = "Detect the all of the prominent items in the image. The box_2d should be [ymin, xmin, ymax, xmax] normalized to 0-1000."

    image = Image.open("/path/to/image.png")

    config = types.GenerateContentConfig(
      response_mime_type="application/json"
      )

    response = client.models.generate_content(model="gemini-3.5-flash",
                                              contents=[image, prompt],
                                              config=config
                                              )

    width, height = image.size
    bounding_boxes = json.loads(response.text)

    converted_bounding_boxes = []
    for bounding_box in bounding_boxes:
        abs_y1 = int(bounding_box["box_2d"][0]/1000 * height)
        abs_x1 = int(bounding_box["box_2d"][1]/1000 * width)
        abs_y2 = int(bounding_box["box_2d"][2]/1000 * height)
        abs_x2 = int(bounding_box["box_2d"][3]/1000 * width)
        converted_bounding_boxes.append([abs_x1, abs_y1, abs_x2, abs_y2])

    print("Image size: ", width, height)
    print("Bounding boxes:", converted_bounding_boxes)

> [!NOTE]
> **Note:** The model also supports generating bounding boxes based on custom instructions, such as: "Show bounding boxes of all green objects in this image". It also support custom labels like "label the items with the allergens they can contain".

For more examples, check following notebooks in the [Gemini Cookbook](https://github.com/google-gemini/cookbook):

- [2D spatial understanding notebook](https://colab.research.google.com/github/google-gemini/cookbook/blob/main/quickstarts/Spatial_understanding.ipynb)
- [Experimental 3D pointing notebook](https://colab.research.google.com/github/google-gemini/cookbook/blob/main/examples/Spatial_understanding_3d.ipynb)

## Supported image formats

Gemini supports the following image format MIME types:

- PNG - `image/png`
- JPEG - `image/jpeg`
- WEBP - `image/webp`
- HEIC - `image/heic`
- HEIF - `image/heif`

To learn about other file input methods, see the
[File input methods](https://ai.google.dev/gemini-api/docs/file-input-methods) guide.

## Capabilities

All Gemini model versions are multimodal and can be utilized in a wide range of
image processing and computer vision tasks including but not limited to image captioning,
visual question and answering, image classification, and object detection.

Gemini can reduce the need to use specialized ML models depending on your quality and performance requirements.

The latest model versions are specifically trained improve accuracy of
specialized tasks in addition to generic capabilities, like enhanced
[object detection](https://ai.google.dev/gemini-api/docs/image-understanding#object-detection).

## Limitations and key technical information

### File limit

Gemini models support a maximum of 3,600 image files per request.

### Token calculation

- 258 tokens if both dimensions \<= 384 pixels. Larger images are tiled into 768x768 pixel tiles, each costing 258 tokens.

A rough formula for calculating the number of tiles is as follows:

- Calculate the crop unit size which is roughly: floor(min(width, height) / 1.5).
- Divide each dimension by the crop unit size and multiply together to get the number of tiles.

For example, for an image of dimensions 960x540 would have a crop unit size
of 360. Divide each dimension by 360 and the number of tile is 3 \* 2 = 6.

### Media resolution

Gemini 3 introduces granular control over multimodal vision processing with the
`media_resolution` parameter. The `media_resolution` parameter determines the
**maximum number of tokens allocated per input image or video frame.**
Higher resolutions improve the model's ability to
read fine text or identify small details, but increase token usage and latency.

For more details about the parameter and how it can impact token calculations,
see the [media resolution](https://ai.google.dev/gemini-api/docs/media-resolution) guide.

## Tips and best practices

- Verify that images are correctly rotated.
- Use clear, non-blurry images.
- When using a single image with text, place the text prompt *after* the image part in the `contents` array.

## What's next

This guide shows you how to upload image files and generate text outputs from image
inputs. To learn more, see the following resources:

- [Files API](https://ai.google.dev/gemini-api/docs/files): Learn more about uploading and managing files for use with Gemini.
- [System instructions](https://ai.google.dev/gemini-api/docs/text-generation#system-instructions): System instructions let you steer the behavior of the model based on your specific needs and use cases.
- [File prompting strategies](https://ai.google.dev/gemini-api/docs/files#prompt-guide): The Gemini API supports prompting with text, image, audio, and video data, also known as multimodal prompting.
- [Safety guidance](https://ai.google.dev/gemini-api/docs/safety-guidance): Sometimes generative AI models produce unexpected outputs, such as outputs that are inaccurate, biased, or offensive. Post-processing and human evaluation are essential to limit the risk of harm from such outputs.