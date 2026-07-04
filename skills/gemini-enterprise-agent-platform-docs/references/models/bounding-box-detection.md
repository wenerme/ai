> [!NOTE]
>
> **Experimental**
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
> To see an example of bounding box detection,
> run the "Spatial understanding with Gemini" notebook in one of the following
> environments:
>
> [!Open in Colab](https://colab.research.google.com/github/GoogleCloudPlatform/generative-ai/blob/main/gemini/use-cases/spatial-understanding/spatial_understanding.ipynb)
>
>
> \|
>
> [!Open in Colab Enterprise](https://console.cloud.google.com/agent-platform/colab/import/https%3A%2F%2Fraw.githubusercontent.com%2FGoogleCloudPlatform%2Fgenerative-ai%2Fmain%2Fgemini%2Fuse-cases%2Fspatial-understanding%2Fspatial_understanding.ipynb)
>
>
> \|
>
> [!Open
> in Agent Platform Workbench](https://console.cloud.google.com/agent-platform/workbench/deploy-notebook?download_url=https://raw.githubusercontent.com/GoogleCloudPlatform/generative-ai/main/gemini/use-cases/spatial-understanding/spatial_understanding.ipynb)
>
>
> \|
>
> [!View on GitHub](https://github.com/GoogleCloudPlatform/generative-ai/blob/main/gemini/use-cases/spatial-understanding/spatial_understanding.ipynb)

In this experimental launch, we are providing developers with a powerful tool
for object detection and localization within images and video. By accurately
identifying and delineating objects with bounding boxes, developers can unlock a
wide range of applications and enhance the intelligence of their projects.

**Key Benefits:**

- **Simple:** Integrate object detection capabilities into your applications with ease, regardless of your computer vision expertise.
- **Customizable:** Produce bounding boxes based on custom instructions (e.g. "I want to see bounding boxes of all the green objects in this image"), without having to train a custom model.

**Technical Details:**

- **Input:** Your prompt and associated images or video frames.
- **Output:** Bounding boxes in the `[y_min, x_min, y_max, x_max]` format. The top left corner is the origin. The `x` and `y` axis go horizontally and vertically, respectively. Coordinate values are normalized to 0-1000 for every image.
- **Visualization:** AI Studio users will see bounding boxes plotted within the UI. Vertex AI users should visualize their bounding boxes through custom visualization code.

### Python

#### Install

```
pip install --upgrade google-genai
```

To learn more, see the
[SDK reference documentation](https://googleapis.github.io/python-genai/).

Set environment variables to use the Google Gen AI SDK with Vertex AI:

```bash
# Replace the `GOOGLE_CLOUD_PROJECT` and `GOOGLE_CLOUD_LOCATION` values
# with appropriate values for your project.
export GOOGLE_CLOUD_PROJECT=GOOGLE_CLOUD_PROJECT
export GOOGLE_CLOUD_LOCATION=global
export GOOGLE_GENAI_USE_ENTERPRISE=True
```

    import requests
    from google import genai
    from google.genai.types import (
        GenerateContentConfig,
        HarmBlockThreshold,
        HarmCategory,
        HttpOptions,
        Part,
        SafetySetting,
    )
    from PIL import Image, ImageColor, ImageDraw
    from pydantic import BaseModel

    # Helper class to represent a bounding box
    class BoundingBox(BaseModel):
        """
        Represents a bounding box with its 2D coordinates and associated label.

        Attributes:
            box_2d (list[int]): A list of integers representing the 2D coordinates of the bounding box,
                                typically in the format [y_min, x_min, y_max, x_max].
            label (str): A string representing the label or class associated with the object within the bounding box.
        """

        box_2d: list[int]
        label: str

    # Helper function to plot bounding boxes on an image
    def plot_bounding_boxes(image_uri: str, bounding_boxes: list[BoundingBox]) -> None:
        """
        Plots bounding boxes on an image with labels, using PIL and normalized coordinates.

        Args:
            image_uri: The URI of the image file.
            bounding_boxes: A list of BoundingBox objects. Each box's coordinates are in
                            normalized [y_min, x_min, y_max, x_max] format.
        """
        with Image.open(requests.get(image_uri, stream=True, timeout=10).raw) as im:
            width, height = im.size
            draw = ImageDraw.Draw(im)

            colors = list(ImageColor.colormap.keys())

            for i, bbox in enumerate(bounding_boxes):
                # Scale normalized coordinates to image dimensions
                abs_y_min = int(bbox.box_2d[0] / 1000 * height)
                abs_x_min = int(bbox.box_2d[1] / 1000 * width)
                abs_y_max = int(bbox.box_2d[2] / 1000 * height)
                abs_x_max = int(bbox.box_2d[3] / 1000 * width)

                color = colors[i % len(colors)]

                # Draw the rectangle using the correct (x, y) pairs
                draw.rectangle(
                    ((abs_x_min, abs_y_min), (abs_x_max, abs_y_max)),
                    outline=color,
                    width=4,
                )
                if bbox.label:
                    # Position the text at the top-left corner of the box
                    draw.text((abs_x_min + 8, abs_y_min + 6), bbox.label, fill=color)

            im.show()

    client = genai.Client(http_options=HttpOptions(api_version="v1"))

    config = GenerateContentConfig(
        system_instruction="""
        Return bounding boxes as an array with labels.
        Never return masks. Limit to 25 objects.
        If an object is present multiple times, give each object a unique label
        according to its distinct characteristics (colors, size, position, etc..).
        """,
        temperature=0.5,
        safety_settings=[
            SafetySetting(
                category=HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
                threshold=HarmBlockThreshold.BLOCK_ONLY_HIGH,
            ),
        ],
        response_mime_type="application/json",
        response_schema=list[BoundingBox],
    )

    image_uri = "https://storage.googleapis.com/generativeai-downloads/images/socks.jpg"

    response = client.models.generate_content(
        model="gemini-3.5-flash",
        contents=[
            Part.from_uri(
                file_uri=image_uri,
                mime_type="image/jpeg",
            ),
            "Output the positions of the socks with a face. Label according to position in the image.",
        ],
        config=config,
    )
    print(response.text)
    plot_bounding_boxes(image_uri, response.parsed)

    # Example response:
    # [
    #     {"box_2d": [6, 246, 386, 526], "label": "top-left light blue sock with cat face"},
    #     {"box_2d": [234, 649, 650, 863], "label": "top-right light blue sock with cat face"},
    # ]

### Go

Learn how to install or update the [Go](https://docs.cloud.google.com/vertex-ai/generative-ai/docs/sdks/overview).

To learn more, see the
[SDK reference documentation](https://pkg.go.dev/google.golang.org/genai).

Set environment variables to use the Google Gen AI SDK with Vertex AI:

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
        "image"
        "image/color"
        "image/draw"
        "image/jpeg"
        "io"
        "net/http"

        "google.golang.org/genai"
    )

    // BoundingBox represents a bounding box with coordinates and label.
    type BoundingBox struct {
        Box2D []int  `json:"box_2d"`
        Label string `json:"label"`
    }

    // plotBoundingBoxes downloads the image and overlays bounding boxes.
    func plotBoundingBoxes(imageURI string, boundingBoxes []BoundingBox) error {
        resp, err := http.Get(imageURI)
        if err != nil {
            return fmt.Errorf("failed to download image: %w", err)
        }
        defer resp.Body.Close()

        img, err := jpeg.Decode(resp.Body)
        if err != nil {
            return fmt.Errorf("failed to decode image: %w", err)
        }

        bounds := img.Bounds()
        rgba := image.NewRGBA(bounds)
        draw.Draw(rgba, bounds, img, bounds.Min, draw.Src)

        // Simple red color for bounding boxes
        red := color.RGBA{255, 0, 0, 255}

        for _, bbox := range boundingBoxes {
            // scale normalized coordinates [0--1000] to absolute pixels
            yMin := bbox.Box2D[0] * bounds.Dy() / 1000
            xMin := bbox.Box2D[1] * bounds.Dx() / 1000
            yMax := bbox.Box2D[2] * bounds.Dy() / 1000
            xMax := bbox.Box2D[3] * bounds.Dx() / 1000

            // draw rectangle border
            for x := xMin; x <= xMax; x++ {
                rgba.Set(x, yMin, red)
                rgba.Set(x, yMax, red)
            }
            for y := yMin; y <= yMax; y++ {
                rgba.Set(xMin, y, red)
                rgba.Set(xMax, y, red)
            }
        }

        return nil
    }

    func generateBoundingBoxesWithText(w io.Writer) error {
        ctx := context.Background()

        client, err := genai.NewClient(ctx, &genai.ClientConfig{
            HTTPOptions: genai.HTTPOptions{APIVersion: "v1"},
        })
        if err != nil {
            return fmt.Errorf("failed to create genai client: %w", err)
        }

        imageURI := "https://storage.googleapis.com/generativeai-downloads/images/socks.jpg"

        // Schema definition for []BoundingBox
        schema := &genai.Schema{
            Type: genai.TypeArray,
            Items: &genai.Schema{
                Type: genai.TypeObject,
                Properties: map[string]*genai.Schema{
                    "box_2d": {
                        Type:  genai.TypeArray,
                        Items: &genai.Schema{Type: genai.TypeInteger},
                    },
                    "label": {Type: genai.TypeString},
                },
                Required: []string{"box_2d", "label"},
            },
        }

        config := &genai.GenerateContentConfig{
            SystemInstruction: &genai.Content{
                Parts: []*genai.Part{{
                    Text: "Return bounding boxes as an array with labels. Never return masks. Limit to 25 objects.",
                }},
            },
            Temperature:      float32Ptr(0.5),
            ResponseMIMEType: "application/json",
            ResponseSchema:   schema,
            SafetySettings: []*genai.SafetySetting{
                {
                    Category:  genai.HarmCategoryDangerousContent,
                    Threshold: genai.HarmBlockThresholdBlockOnlyHigh,
                },
            },
        }

        contents := []*genai.Content{
            {
                Role: genai.RoleUser,
                Parts: []*genai.Part{
                    {
                        FileData: &genai.FileData{
                            FileURI:  imageURI,
                            MIMEType: "image/jpeg",
                        },
                    },
                    {Text: "Output the positions of the socks with a face. Label according to position in the image."},
                },
            },
        }

        resp, err := client.Models.GenerateContent(ctx, "gemini-2.5-flash", contents, config)
        if err != nil {
            return fmt.Errorf("failed to generate content: %w", err)
        }

        fmt.Fprintln(w, resp.Text())

        // Parse into []BoundingBox
        var boxes []BoundingBox
        if err := json.Unmarshal([]byte(resp.Text()), &boxes); err != nil {
            return fmt.Errorf("failed to parse bounding boxes: %w", err)
        }

        // Example response:
        //    Box: (962,113)-(2158,1631) Label: top left sock with face
        //    Box: (2656,721)-(3953,2976) Label: top right sock with face
        //...

        return plotBoundingBoxes(imageURI, boxes)
    }

    func float32Ptr(v float32) *float32 { return &v }

### Node.js

#### Install

```
npm install @google/genai
```

To learn more, see the
[SDK reference documentation](https://googleapis.github.io/js-genai/).

Set environment variables to use the Google Gen AI SDK with Vertex AI:

```bash
# Replace the `GOOGLE_CLOUD_PROJECT` and `GOOGLE_CLOUD_LOCATION` values
# with appropriate values for your project.
export GOOGLE_CLOUD_PROJECT=GOOGLE_CLOUD_PROJECT
export GOOGLE_CLOUD_LOCATION=global
export GOOGLE_GENAI_USE_ENTERPRISE=True
```

    const {GoogleGenAI} = require('@google/genai');

    const {createCanvas, loadImage} = require('canvas');
    const fetch = require('node-fetch');
    const fs = require('fs');

    const GOOGLE_CLOUD_PROJECT = process.env.GOOGLE_CLOUD_PROJECT;
    const GOOGLE_CLOUD_LOCATION = process.env.GOOGLE_CLOUD_LOCATION || 'global';

    async function fetchImageAsBase64(uri) {
      const response = await fetch(uri);
      const buffer = await response.buffer();
      return buffer.toString('base64');
    }

    async function plotBoundingBoxes(imageUri, boundingBoxes) {
      console.log('Creating bounding boxes');
      const image = await loadImage(imageUri);
      const canvas = createCanvas(image.width, image.height);
      const ctx = canvas.getContext('2d');

      ctx.drawImage(image, 0, 0);

      const colors = ['red', 'blue', 'green', 'orange'];

      boundingBoxes.forEach((bbox, i) => {
        const [yMin, xMin, yMax, xMax] = bbox.box_2d;

        const absYMin = Math.floor((yMin / 1000) * image.height);
        const absXMin = Math.floor((xMin / 1000) * image.width);
        const absYMax = Math.floor((yMax / 1000) * image.height);
        const absXMax = Math.floor((xMax / 1000) * image.width);

        ctx.strokeStyle = colors[i % colors.length];
        ctx.lineWidth = 4;
        ctx.strokeRect(absXMin, absYMin, absXMax - absXMin, absYMax - absYMin);

        ctx.fillStyle = colors[i % colors.length];
        ctx.font = '20px Arial';
        ctx.fillText(bbox.label, absXMin + 8, absYMin + 20);
      });

      fs.writeFileSync('output.png', canvas.toBuffer('image/png'));
      console.log('Saved output to file: output.png');
    }

    async function createBoundingBox(
      projectId = GOOGLE_CLOUD_PROJECT,
      location = GOOGLE_CLOUD_LOCATION
    ) {
      const client = new GoogleGenAI({
        vertexai: true,
        project: projectId,
        location: location,
      });

      const systemInstruction = `
        Return bounding boxes as an array with labels.
        Never return masks. Limit to 25 objects.
        If an object is present multiple times, give each object a unique label
        according to its distinct characteristics (colors, size, position, etc).
      `;

      const safetySettings = [
        {
          category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
          threshold: 'BLOCK_ONLY_HIGH',
        },
      ];

      const imageUri =
        'https://storage.googleapis.com/generativeai-downloads/images/socks.jpg';
      const base64Image = await fetchImageAsBase64(imageUri);

      const boundingBoxSchema = {
        type: 'ARRAY',
        description: 'List of bounding boxes for detected objects',
        items: {
          type: 'OBJECT',
          title: 'BoundingBox',
          description: 'Represents a bounding box with coordinates and label',
          properties: {
            box_2d: {
              type: 'ARRAY',
              description:
                'Bounding box coordinates in format [y_min, x_min, y_max, x_max]',
              items: {
                type: 'INTEGER',
                format: 'int32',
              },
              minItems: 4,
              maxItems: 4,
            },
            label: {
              type: 'STRING',
              description: 'Label describing the object within the bounding box',
            },
          },
          required: ['box_2d', 'label'],
        },
      };

      const response = await client.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: [
          {
            role: 'user',
            parts: [
              {
                text: 'Output the positions of the socks with a face. Label according to position in the image',
              },
              {
                inlineData: {
                  data: base64Image,
                  mimeType: 'image/jpeg',
                },
              },
            ],
          },
        ],
        config: {
          systemInstruction: systemInstruction,
          safetySettings: safetySettings,
          responseMimeType: 'application/json',
          temperature: 0.5,
          responseSchema: boundingBoxSchema,
        },
      });

      const candidate = response.candidates[0].content.parts[0].text;
      const boundingBoxes = JSON.parse(candidate);

      console.log('Bounding boxes:', boundingBoxes);

      await plotBoundingBoxes(imageUri, boundingBoxes);
      return boundingBoxes;
    }

### Java

Learn how to install or update the [Java](https://docs.cloud.google.com/vertex-ai/generative-ai/docs/sdks/overview).

To learn more, see the
[SDK reference documentation](https://central.sonatype.com/artifact/com.google.genai/google-genai).

Set environment variables to use the Google Gen AI SDK with Vertex AI:

```bash
# Replace the `GOOGLE_CLOUD_PROJECT` and `GOOGLE_CLOUD_LOCATION` values
# with appropriate values for your project.
export GOOGLE_CLOUD_PROJECT=GOOGLE_CLOUD_PROJECT
export GOOGLE_CLOUD_LOCATION=global
export GOOGLE_GENAI_USE_ENTERPRISE=True
```

    import static com.google.genai.types.Type.Known.ARRAY;
    import static com.google.genai.types.Type.Known.INTEGER;
    import static com.google.genai.types.Type.Known.OBJECT;
    import static com.google.genai.types.Type.Known.STRING;

    import com.google.genai.Client;
    import com.google.genai.types.Content;
    import com.google.genai.types.GenerateContentConfig;
    import com.google.genai.types.GenerateContentResponse;
    import com.google.genai.types.HarmBlockThreshold;
    import com.google.genai.types.HarmCategory;
    import com.google.genai.types.HttpOptions;
    import com.google.genai.types.Part;
    import com.google.genai.types.SafetySetting;
    import com.google.genai.types.Schema;
    import com.google.gson.Gson;
    import com.google.gson.reflect.TypeToken;
    import java.awt.BasicStroke;
    import java.awt.Color;
    import java.awt.Font;
    import java.awt.Graphics2D;
    import java.awt.image.BufferedImage;
    import java.io.File;
    import java.io.IOException;
    import java.io.InputStream;
    import java.lang.reflect.Type;
    import java.net.URL;
    import java.util.Arrays;
    import java.util.List;
    import java.util.Map;
    import javax.imageio.ImageIO;

    public class BoundingBoxWithTxtImg {

      public static class BoundingBox {
        List<Integer> box2d;
        String label;

        public List<Integer> getBox2d() {
          return box2d;
        }

        public String getLabel() {
          return label;
        }
      }

      // Plot bounding boxes on an image and save it to a file.
      public static void plotBoundingBoxes(String imageUrl, List<BoundingBox> boundingBoxes)
          throws IOException {
        URL url = new URL(imageUrl);
        BufferedImage image = ImageIO.read(url);

        int width = image.getWidth();
        int height = image.getHeight();

        Graphics2D graphics2D = image.createGraphics();
        graphics2D.setStroke(new BasicStroke(4));
        graphics2D.setFont(new Font("Arial", Font.PLAIN, 18));

        // Define a list of colors to cycle through.
        List<Color> colors =
            Arrays.asList(
                Color.RED,
                Color.GREEN,
                Color.BLUE,
                Color.YELLOW,
                Color.CYAN,
                Color.MAGENTA,
                Color.ORANGE);

        for (int i = 0; i < boundingBoxes.size(); i++) {
          BoundingBox boundingBox = boundingBoxes.get((i));
          List<Integer> box2d = boundingBox.getBox2d();

          // Scale normalized coordinates (0-1000) to image dimensions.
          int topY = (int) (box2d.get(0) / 1000.0 * height);
          int leftX = (int) (box2d.get(1) / 1000.0 * width);
          int bottomY = (int) (box2d.get(2) / 1000.0 * height);
          int rightX = (int) (box2d.get(3) / 1000.0 * width);

          Color color = colors.get(i % colors.size());
          graphics2D.setColor(color);

          // Draw the rectangle.
          graphics2D.drawRect(leftX, topY, rightX - leftX, bottomY - topY);

          // Draw the label text.
          if (boundingBox.getLabel() != null && !boundingBox.getLabel().isEmpty()) {
            graphics2D.drawString(boundingBox.getLabel(), leftX + 8, topY + 20);
          }
        }
        graphics2D.dispose();

        // Write the image to a file.
        String outputFilePath = "resources/output/bounding-boxes-socks.jpg";
        ImageIO.write(image, "jpg", new File(outputFilePath));
        System.out.println("Successfully saved image to: " + outputFilePath);
      }

      public static void main(String[] args) throws IOException {
        // TODO(developer): Replace these variables before running the sample.
        String model = "gemini-2.5-flash";
        generateContent(model);
      }

      // Shows how to send a multimodal prompt to the model and get a structured JSON response
      // containing bounding box data, and then uses that data to draw the boxes on the original
      // image, saving it to a new file.
      public static String generateContent(String modelId) throws IOException {
        // Client Initialization. Once created, it can be reused for multiple requests.
        try (Client client =
            Client.builder()
                .location("global")
                .httpOptions(HttpOptions.builder().apiVersion("v1").build())
                .vertexAI(true)
                .build()) {

          String systemInstruction =
              "Return bounding boxes as an array with labels.\n"
                  + " Never return masks. Limit to 25 objects.\n"
                  + " If an object is present multiple times, give each object a unique label\n"
                  + " according to its distinct characteristics (colors, size, position, etc..).";

          // Define the response schema.
          Schema responseSchema =
              Schema.builder()
                  .type(ARRAY)
                  .items(
                      Schema.builder()
                          .type(OBJECT)
                          .properties(
                              Map.of(
                                  "box2d",
                                  Schema.builder()
                                      .type(ARRAY)
                                      .items(Schema.builder().type(INTEGER).build())
                                      .build(),
                                  "label",
                                  Schema.builder().type(STRING).build()))
                          .required("box2d", "label")
                          .build())
                  .build();

          // Define the GenerateContentConfig and set the response schema.
          GenerateContentConfig contentConfig =
              GenerateContentConfig.builder()
                  .systemInstruction(Content.fromParts(Part.fromText(systemInstruction)))
                  .temperature(0.5F)
                  .safetySettings(
                      SafetySetting.builder()
                          .category(HarmCategory.Known.HARM_CATEGORY_DANGEROUS_CONTENT)
                          .threshold(HarmBlockThreshold.Known.BLOCK_ONLY_HIGH)
                          .build())
                  .responseMimeType("application/json")
                  .responseSchema(responseSchema)
                  .build();

          String imageUri = "https://storage.googleapis.com/generativeai-downloads/images/socks.jpg";
          URL url = new URL(imageUri);

          try (InputStream inputStream = url.openStream()) {
            byte[] imageBytes = inputStream.readAllBytes();

            String prompt =
                "Output the positions of the socks with a face."
                    + " Label according to position in the image";

            GenerateContentResponse response =
                client.models.generateContent(
                    modelId,
                    Content.fromParts(Part.fromBytes(imageBytes, "image/jpeg"), Part.fromText(prompt)),
                    contentConfig);

            System.out.println(response.text());
            // Example response:
            // [
            //  {"box2d": [24, 24, 521, 526], "label": "top left light blue cat face sock"},
            //  {"box2d": [238, 627, 649, 863], "label": "top right light blue cat face sock"}
            // ]

            // Use Gson to parse the JSON string into a list of BoundingBox objects.
            Gson gson = new Gson();
            Type boundingBoxListType = new TypeToken<List<BoundingBox>>() {}.getType();
            List<BoundingBox> boundingBoxes = gson.fromJson(response.text(), boundingBoxListType);

            // Plot the bounding boxes on the image.
            if (boundingBoxes != null) {
              plotBoundingBoxes(imageUri, boundingBoxes);
            }

            return response.text();
          }
        }
      }
    }
