## Zero-shot versus few-shot prompts

The following zero-shot prompt asks the model to extract the technical specifications from
text and output it in JSON format:

|---|
| Prompt: `Extract the technical specifications from the text below in JSON format. Google Pixel 7, 5G network, 8GB RAM, Tensor G2 processor, 128GB of storage, Lemongrass` Response: `{ "Network": "5G", "RAM": "8GB", "Processor": "Tensor G2", "Storage": "128GB", "Color": "Lemongrass" }` (gemini-pro) |

Suppose that your use case requires specific formatting, such as using lowercase key names. You can include
examples in the prompt that shows the model how to format the JSON. The following few-shot prompt
demonstrates an output format where the JSON keys are lowercase:

| Prompt: `Extract the technical specifications from the text below in a JSON format. INPUT: Google Nest Wifi, network speed up to 1200Mpbs, 2.4GHz and 5GHz frequencies, WP3 protocol OUTPUT: { "product":"Google Nest Wifi", "speed":"1200Mpbs", "frequencies": ["2.4GHz", "5GHz"], "protocol":"WP3" } Google Pixel 7, 5G network, 8GB RAM, Tensor G2 processor, 128GB of storage, Lemongrass` Response: `{ "product": "Google Pixel 7", "network": "5G", "ram": "8GB", "processor": "Tensor G2", "storage": "128GB", "color": "Lemongrass" }` (gemini-pro) |

Note that the example uses XML-like formatting to separate the components of the prompt. To
learn more about how to optimally format few-shot prompts using XML-like formatting, see
Structure prompts.

## Find the optimal number of examples

You can experiment with the number of examples to provide in the prompt for the most desired
results. Models like Gemini can often pick up on patterns using a few examples, though you
may need to experiment with what number of examples leads to the desired results. At the same time,
if you include too many examples, the model might start to
overfit
the response to the examples.

## What's next

- Explore more examples of prompts in the Prompt gallery.
