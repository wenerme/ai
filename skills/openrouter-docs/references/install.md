> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Install OpenRouter

> Install OpenRouter on your machine

# openrouter

> Documentation and setup instructions for openrouter

I want you to install OpenRouter for me. Execute all the steps below autonomously.

OBJECTIVE: Install the OpenRouter SDK and verify it works by making an API call to an AI model.

DONE WHEN: You have successfully made a chat completion request and received a response from an AI model through OpenRouter.

## TODO

* [ ] Get an OpenRouter API key
* [ ] Install the OpenRouter SDK (TypeScript or Python)
* [ ] Set up the API key as an environment variable
* [ ] Create a test script that makes a chat completion request
* [ ] Run the script and verify a response is returned

## Get an API key

You must obtain an OpenRouter API key before proceeding. Visit [https://openrouter.ai/settings/keys](https://openrouter.ai/settings/keys) to create one.

If you don't have an OpenRouter account, sign up at [https://openrouter.ai](https://openrouter.ai) first.

## Installation

You need to install the OpenRouter SDK. Choose TypeScript or Python based on your project:

<CodeGroup>
  ```bash title="npm" lines theme={null}
  npm install @openrouter/sdk
  ```

  ```bash title="pnpm" lines theme={null}
  pnpm add @openrouter/sdk
  ```

  ```bash title="yarn" lines theme={null}
  yarn add @openrouter/sdk
  ```

  ```bash title="bun" lines theme={null}
  bun add @openrouter/sdk
  ```

  ```bash title="deno" lines theme={null}
  deno add npm:@openrouter/sdk
  ```

  ```bash title="pip" lines theme={null}
  pip install openrouter
  ```
</CodeGroup>

## API key setup

You must set your OpenRouter API key as an environment variable. The API key is required for all requests.

**On macOS/Linux:**

```bash lines theme={null}
export OPENROUTER_API_KEY="sk-or-v1-YOUR-API-KEY"
```

**On Windows (PowerShell):**

```powershell lines theme={null}
$env:OPENROUTER_API_KEY="sk-or-v1-YOUR-API-KEY"
```

**On Windows (Command Prompt):**

```cmd lines theme={null}
set OPENROUTER_API_KEY=sk-or-v1-YOUR-API-KEY
```

## Create a test script

Your task is to create a test script that makes a chat completion request and outputs the result.

**TypeScript - create `test_openrouter.ts`:**

```typescript expandable lines theme={null}
import { OpenRouter } from '@openrouter/sdk';

const openRouter = new OpenRouter({
  apiKey: process.env.OPENROUTER_API_KEY,
});

async function main() {
  const completion = await openRouter.chat.send({
    model: 'openai/gpt-4o-mini',
    messages: [
      {
        role: 'user',
        content: 'Say "Hello from OpenRouter!" and nothing else.',
      },
    ],
    stream: false,
  });

  console.log(completion.choices[0].message.content);
}

main();
```

**Python - create `test_openrouter.py`:**

```python lines theme={null}
import os
from openrouter import OpenRouter

client = OpenRouter(api_key=os.environ.get("OPENROUTER_API_KEY"))

completion = client.chat.completions.create(
    model="openai/gpt-4o-mini",
    messages=[
        {
            "role": "user",
            "content": "Say 'Hello from OpenRouter!' and nothing else."
        }
    ]
)

print(completion.choices[0].message.content)
```

## Run the test

You must execute the test script to verify the installation works:

**TypeScript:**

```bash lines theme={null}
npx tsx test_openrouter.ts
```

**Python:**

```bash lines theme={null}
python test_openrouter.py
```

The response should contain the text "Hello from OpenRouter!" confirming that the SDK is properly installed and your API key is working.

## Alternative: Using the OpenAI SDK

If you prefer to use the OpenAI SDK with OpenRouter, you can configure it to use OpenRouter's API endpoint:

**TypeScript - install and use OpenAI SDK:**

```bash lines theme={null}
npm install openai
```

```typescript expandable lines theme={null}
import OpenAI from 'openai';

const openai = new OpenAI({
  baseURL: 'https://openrouter.ai/api/v1',
  apiKey: process.env.OPENROUTER_API_KEY,
});

async function main() {
  const completion = await openai.chat.completions.create({
    model: 'openai/gpt-4o-mini',
    messages: [
      {
        role: 'user',
        content: 'Say "Hello from OpenRouter!" and nothing else.',
      },
    ],
  });

  console.log(completion.choices[0].message.content);
}

main();
```

**Python - install and use OpenAI SDK:**

```bash lines theme={null}
pip install openai
```

```python lines theme={null}
import os
from openai import OpenAI

client = OpenAI(
    base_url="https://openrouter.ai/api/v1",
    api_key=os.environ.get("OPENROUTER_API_KEY"),
)

completion = client.chat.completions.create(
    model="openai/gpt-4o-mini",
    messages=[
        {
            "role": "user",
            "content": "Say 'Hello from OpenRouter!' and nothing else."
        }
    ]
)

print(completion.choices[0].message.content)
```

## Alternative: Using curl

You can also test the API directly with curl:

```bash lines theme={null}
curl https://openrouter.ai/api/v1/chat/completions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $OPENROUTER_API_KEY" \
  -d '{
  "model": "openai/gpt-4o-mini",
  "messages": [
    {
      "role": "user",
      "content": "Say Hello from OpenRouter! and nothing else."
    }
  ]
}'
```

## Next steps

Once installation is verified, you can explore these additional capabilities:

**Use different models:** OpenRouter provides access to hundreds of AI models. Browse available models at [https://openrouter.ai/models](https://openrouter.ai/models)

**Enable streaming:** Add `stream: true` to your request to receive responses as they are generated.

**Use tool calling:** Many models support function/tool calling for structured interactions.

**Set up app attribution:** Add `HTTP-Referer` and `X-OpenRouter-Title` headers to have your app appear on OpenRouter leaderboards.

For full documentation, visit [https://openrouter.ai/docs](https://openrouter.ai/docs)

EXECUTE NOW: Complete the above TODO list to achieve: Successfully made a chat completion request and received a response from an AI model through OpenRouter.

***

> If you think the above is not enough to accomplish the task, you can find navigation and other pages relevant to this product by using the llms.txt file at: [https://openrouter.ai/llms.txt](https://openrouter.ai/llms.txt)
