# Safety checks

export const snippetExampleProvidingUserIdentifier = {
  python: `
from openai import OpenAI
client = OpenAI()

response = client.chat.completions.create(
model="gpt-5-mini",
messages=[
{"role": "user", "content": "This is a test"}
],
safety_identifier="user_123456"
)
`.trim(),
  curl: `
curl https://api.openai.com/v1/chat/completions \\
-H "Content-Type: application/json" \\
-H "Authorization: Bearer $OPENAI_API_KEY" \\
-d '{
"model": "gpt-5-mini",
"messages": [
{"role": "user", "content": "This is a test"}
],
"safety_identifier": "user_123456"
}'
`.trim(),
};

export const snippetExampleProvidingUserIdentifierResponses = {
  python: `
from openai import OpenAI
client = OpenAI()

response = client.responses.create(
model="gpt-5-mini",
input="This is a test",
safety_identifier="user_123456",
)
`.trim(),
  curl: `
curl https://api.openai.com/v1/responses \\
-H "Content-Type: application/json" \\
-H "Authorization: Bearer $OPENAI_API_KEY" \\
-d '{
"model": "gpt-5-mini",
"input": "This is a test",
"safety_identifier": "user_123456"
}'
`.trim(),
};

We run several types of evaluations on our models and how they're being used. This guide covers how we test for safety and what you can do to avoid violations.

## Safety classifiers for GPT-5 and forward

With the introduction of [GPT-5](https://developers.openai.com/api/docs/models/gpt-5), we added some checks to find and halt hazardous information from being accessed. It's likely some users will eventually try to use your application for things outside of OpenAI’s policies, especially in applications with a wide range of use cases.

### The safety classifier process

1. We classify requests to GPT-5 into risk thresholds.
1. If your org hits high thresholds repeatedly, OpenAI returns an error and sends a warning email.
1. If the requests continue past the stated time threshold (usually seven days), we stop your org's access to GPT-5. Requests will no longer work.

### How to avoid errors, latency, and bans

If your org engages in suspicious activity that violates our safety policies, we may return an error, limit model access, or even block your account. The following safety measures help us identify where high-risk requests are coming from and block individual end users, rather than blocking your entire org.

- [Implement safety identifiers](https://developers.openai.com/api/docs/guides/safety-best-practices#implement-safety-identifiers) using the `safety_identifier` parameter in your API requests.
- If your use case depends on accessing a less restricted version of our services in order to engage in beneficial applications across the life sciences, read about our [special access program](https://help.openai.com/en/articles/11826767-life-science-research-special-access-program) to see if you meet criteria.

You likely don't need to provide a safety identifier if access to your product
  is tightly controlled (for example, enterprise customers) or in cases where
  users don't directly provide prompts, or are limited to use in narrow areas.

### Implementing safety identifiers for individual users

The `safety_identifier` parameter is available in both the [Responses API](https://developers.openai.com/api/docs/api-reference/responses/create) and older [Chat Completions API](https://developers.openai.com/api/docs/api-reference/chat/create). To use safety identifiers, provide a stable ID for your end user on each request. Hash user email or internal user IDs to avoid passing any personal information.



<div data-content-switcher-pane data-value="responses">
    <div class="hidden">Responses API</div>
    </div>
  <div data-content-switcher-pane data-value="chat" hidden>
    <div class="hidden">Chat Completions API</div>
    </div>



### Potential consequences

If OpenAI monitoring systems identify potential abuse, we may take different levels of action:

- **Delayed streaming responses**
  - As an initial, lower-consequence intervention for a user potentially violating policies, OpenAI may delay streaming responses while running additional checks before returning the full response to that user.
  - If the check passes, streaming begins. If the check fails, the request stops—no tokens show up, and the streamed response does not begin.
  - For a better end user experience, consider adding a loading spinner for cases where streaming is delayed.
- **Blocked model access for individual users**
  - In a high confidence policy violation, the associated `safety_identifier` is completely blocked from OpenAI model access.
  - The safety identifier receives an `identifier blocked` error on all future GPT-5 requests for the same identifier. OpenAI cannot currently unblock an individual identifier.

For these blocks to be effective, ensure you have controls in place to prevent blocked users from simply opening a new account. As a reminder, repeated policy violations from your organization can lead to losing access for your entire organization.

### Why we're doing this

The specific enforcement criteria may change based on evolving real-world usage or new model releases. Currently, OpenAI may restrict or block access for safety identifiers with risky or suspicious biology or chemical activity. See the [blog post](https://openai.com/index/preparing-for-future-ai-capabilities-in-biology/) for more information about how we’re approaching higher AI capabilities in biology.

## Other types of safety checks

To help ensure safety in your use of the OpenAI API and tools, we run safety checks on our own models, including all fine-tuned models, and on the computer use tool.

Learn more:

- [Model evaluations hub](https://openai.com/safety/evaluations-hub)
- [Cyber Safety](https://developers.openai.com/codex/concepts/cyber-safety)
- [Fine-tuning safety](https://developers.openai.com/api/docs/guides/supervised-fine-tuning#safety-checks)
- [Safety checks in computer use](https://developers.openai.com/api/docs/guides/tools-computer-use#acknowledge-safety-checks)