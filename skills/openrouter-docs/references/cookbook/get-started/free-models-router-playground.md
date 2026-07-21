> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Free Models Router

> Get started with free AI inference using the OpenRouter Chat Playground

OpenRouter offers free models that let you experiment with AI without any cost. The easiest way to try these models is through the [Chat Playground](https://openrouter.ai/chat), where you can start chatting immediately.

## Using the Free Models Router

The simplest way to get free inference is to use `openrouter/free`, our Free Models Router that automatically selects a free model at random from the available free models on OpenRouter. The router intelligently filters for models that support the features your request needs, such as image understanding, tool calling, and structured outputs.

### Step 1: Open the Chat Playground

Navigate to [openrouter.ai/chat](https://openrouter.ai/chat) to access the Chat Playground.

### Step 2: Search for Free Models

Click the **Add Model** button (or press `Cmd+K` / `Ctrl+K`) to open the model selector. Type "free" in the search box to filter for free models.

<Frame>
  <img src="https://mintcdn.com/openrouter-d02e98a0/PSwwwiCqAD_BNeni/assets/cookbook/get-started/free-models-router-playground/free-models-search.png?fit=max&auto=format&n=PSwwwiCqAD_BNeni&q=85&s=c99cb85c309b9b104c2bdaf3089e38c0" alt="Searching for free models in the model selector" width="1550" height="1035" data-path="assets/cookbook/get-started/free-models-router-playground/free-models-search.png" />
</Frame>

You'll see a list of available free models, including the **Free Models Router** option.

### Step 3: Select the Free Models Router

Click on **Free Models Router** to select it. This router will automatically choose a free model for each request based on your needs.

<Frame>
  <img src="https://mintcdn.com/openrouter-d02e98a0/PSwwwiCqAD_BNeni/assets/cookbook/get-started/free-models-router-playground/free-router-selected.png?fit=max&auto=format&n=PSwwwiCqAD_BNeni&q=85&s=da5c29afeab8f3f1d6b277c4f21bde1b" alt="Free Models Router selected in the chat playground" width="1550" height="1035" data-path="assets/cookbook/get-started/free-models-router-playground/free-router-selected.png" />
</Frame>

### Step 4: Start Chatting

Once selected, you can start sending messages. The Free Models Router will route your request to an appropriate free model, and you'll see which model responded in the chat.

<Frame>
  <img src="https://mintcdn.com/openrouter-d02e98a0/PSwwwiCqAD_BNeni/assets/cookbook/get-started/free-models-router-playground/free-router-response.png?fit=max&auto=format&n=PSwwwiCqAD_BNeni&q=85&s=f8386a7b19a310ecaf210cc18133ac3b" alt="A response from a free model showing the model name" width="2984" height="1866" data-path="assets/cookbook/get-started/free-models-router-playground/free-router-response.png" />
</Frame>

In this example, the Free Models Router selected Solar Pro 3 (free) to respond to the message.

## Selecting Specific Free Models

If you prefer to use a specific free model rather than the Free Models Router, you can select any model with "(free)" in its name from the model selector. Some popular free models include:

* **Trinity Large Preview (free)** - A frontier-scale open-weight model from Arcee
* **Trinity Mini (free)** - A smaller, faster variant
* **DeepSeek R1 (free)** - DeepSeek's reasoning model
* **Llama models (free)** - Various Meta Llama models

## Using Free Models via API

You can also use the Free Models Router programmatically. Simply set the model to `openrouter/free` in your API requests:

```bash lines theme={null}
curl https://openrouter.ai/api/v1/chat/completions \
  -H "Authorization: Bearer $OPENROUTER_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "openrouter/free",
    "messages": [{"role": "user", "content": "Hello!"}]
  }'
```

For more details on the Free Models Router API, see the [API Quickstart](https://openrouter.ai/openrouter/free/api).

## Free Model Limitations

Free models may have different rate limits and availability compared to paid models. They are ideal for experimentation, learning, and low-volume use cases. For production workloads with higher reliability requirements, consider using paid models.

## Related Resources

* [Free Variant Documentation](/docs/guides/routing/model-variants/free) - Learn about the `:free` variant suffix
* [Models Page](https://openrouter.ai/models) - Browse all available models
* [Free Models Router API](https://openrouter.ai/openrouter/free/api) - API quickstart for the Free Models Router
