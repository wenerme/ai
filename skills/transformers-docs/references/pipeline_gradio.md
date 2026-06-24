

# Machine learning apps

[Gradio](https://www.gradio.app/), a fast and easy library for building and sharing machine learning apps, is integrated with [`Pipeline`] to quickly create a simple interface for inference.

Before you begin, make sure Gradio is installed.

```py
!pip install gradio
```

Create a pipeline for your task, and then pass it to Gradio's [Interface.from_pipeline](https://www.gradio.app/docs/gradio/interface#interface-from_pipeline) function to create the interface. Gradio automatically determines the appropriate input and output components for a [`Pipeline`].

Add [launch](https://www.gradio.app/main/docs/gradio/blocks#blocks-launch) to create a web server and start up the app.

```py
from transformers import pipeline
import gradio as gr

pipeline = pipeline("image-classification", model="google/vit-base-patch16-224")
gr.Interface.from_pipeline(pipeline).launch()
```

The web app runs on a local server by default. To share the app with other users, set `share=True` in [launch](https://www.gradio.app/main/docs/gradio/blocks#blocks-launch) to generate a temporary public link. For a more permanent solution, host the app on Hugging Face [Spaces](https://hf.co/spaces).

```py
gr.Interface.from_pipeline(pipeline).launch(share=True)
```

The Space below is created with the code above and hosted on Spaces.

<iframe
 src="https://stevhliu-gradio-pipeline-demo.hf.space"
 frameborder="0"
 width="850"
 height="850"
></iframe>
