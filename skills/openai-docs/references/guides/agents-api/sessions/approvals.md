# Automatic review

> For the complete documentation index, see [llms.txt](/llms.txt). Markdown versions of documentation pages are available by appending `.md` to the page URL.

Automatic review approves or denies supported approval requests as an agent works, much like the automatic approval function in ChatGPT and Codex. Configure it using the `review` field when you create a session for your agent. The setting applies to root turns and any subagents they create.



**Review actions**

Automatically approve or deny supported requests from the agent and its subagents.






**Change review between tasks**

Choose the review mode for the next root turn.






**Keep network restrictions**

Review does not override the environment's outbound network restrictions.








## API resources






[Sessions](https://developers.openai.com/api/reference/resources/beta/subresources/agents/subresources/sessions)

`/v1/agents/sessions`




Set the review mode and inspect pending actions.








[Agents](https://developers.openai.com/api/reference/resources/beta/subresources/agents)

`/v1/agents`




Reuse the instructions and tools for the task.








[Environment templates](https://developers.openai.com/api/reference/resources/beta/subresources/agents/subresources/environments/subresources/templates)

`/v1/agents/environments/templates`




Reuse the execution environment's configuration.








[Session events](https://developers.openai.com/api/reference/resources/beta/subresources/agents/subresources/sessions/subresources/events)

`/v1/agents/sessions/{session_id}/events`




Follow progress and check how the turn ended.











## How it works

Automatic review brings the "Approve for me" functionality of the Codex harness to your agents. During a session, approval requests can arise when an agent's intended action requests additional permissions. Some example actions that could raise approval requests:

- Shell commands and terminal input that require approval, such as permission escalation or potentially dangerous commands.
- File changes that require approval.
- Additional permission requests, such as broader filesystem or network access.
- Network access requests that trigger approval, subject to the environment’s network restrictions.
- MCP tool calls whose approval rules require confirmation.

An OpenAI-managed reviewer model uses the conversation context to assess what the action would do, what risks it poses, and whether the action aligns with the user's intent. The model then approves or denies the request.

Tokens used for review are billed in addition to your agent’s model usage.

Your application still handles browser origin-access and sign-in requests. MCP
forms that require input and requests that direct the user to a URL follow their
existing flows. Automatic review does not require new approval event handlers.
See [Events and items](https://developers.openai.com/api/docs/guides/agents-api/sessions/events) to follow the
agent's progress and check the turn's outcome.

## Choose a review mode

Set the session's `review` field to choose the behavior:

| Value           | Behavior                                                                                                                      |
| --------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| `"auto_review"` | Automatically approve or deny supported requests based on the action's risks and the user's instructions in the conversation. |
| `"none"`        | Automatic review is not applied. Most actions execute directly, subject to the environment's permissions and restrictions.    |

Omitting `review` defaults to `"none"`. The setting persists when the session
resumes. To change it, send `"auto_review"` or `"none"`; `null` is not accepted.
Setting `review` to `"none"` does not send those actions to your application for
manual approval.

## Prepare the execution environment

For OpenAI-hosted execution, create the session with a new environment, optionally
from an [environment template](https://developers.openai.com/api/reference/resources/beta/subresources/agents/subresources/environments/subresources/templates).
Automatic review is not supported when reusing an existing hosted environment
through `environment_id`.

For self-hosted execution, follow the
[self-hosted environment setup](https://developers.openai.com/api/docs/guides/agents-api/environments/self-hosted#prepare-your-environment)
and the [sandbox prerequisites for your operating system](https://learn.chatgpt.com/docs/sandboxing?surface=app#app-prerequisites)
before enabling automatic review. Setting `review` alone does not configure
sandboxing in your environment.




Automatic review does not change the environment's network restrictions.
Configure outbound access through the environment's
[network settings](https://developers.openai.com/api/docs/guides/agents-api/environments/openai-hosted#control-network-access).
Browser origin approval does not override those restrictions.




## Create a session with automatic review

Set `review` to `"auto_review"` when you create a session. This example asks the
agent to run `npm install` in `/workspace`.

With your [API key and SDK configured](https://developers.openai.com/api/docs/guides/agents-api/quickstart#prerequisites),
use an existing agent and an environment template that provides Node.js and a
project containing `/workspace/package.json`. Replace the example agent and
template IDs with your own.

Run npm install with automatic review

```javascript
import OpenAI from "openai";

const client = new OpenAI();
const session = await client.beta.agents.sessions.create({
  agent_id: "agt_123",
  environment: {
    type: "openai_hosted",
    environment_template_id: "envtmpl_123",
  },
  review: "auto_review",
  input: "Run npm install in /workspace.",
});
console.log(session.id);
```

```python
from openai import OpenAI

client = OpenAI()
session = client.beta.agents.sessions.create(
    agent_id="agt_123",
    environment={
        "type": "openai_hosted",
        "environment_template_id": "envtmpl_123",
    },
    review="auto_review",
    input="Run npm install in /workspace.",
)
print(session.id)
```

```go
import (
	"context"
	"fmt"

	"github.com/openai/openai-go/v3"
)

client := openai.NewClient()
session, err := client.Beta.Agents.Sessions.New(context.Background(), openai.BetaAgentSessionNewParams{
	AgentID: openai.String("agt_123"),
	Environment: openai.EnvironmentParamUnion{
		OfParamOpenAIHosted: &openai.EnvironmentParamOpenAIHosted{
			EnvironmentTemplateID: openai.String("envtmpl_123"),
		},
	},
	Review: openai.BetaAgentSessionNewParamsReviewAutoReview,
	Input:  openai.BetaAgentSessionNewParamsInputUnion{OfString: openai.String("Run npm install in /workspace.")},
})
if err != nil {
	panic(err)
}
fmt.Println(session.ID)
```

```java
import com.openai.client.OpenAIClient;
import com.openai.client.okhttp.OpenAIOkHttpClient;
import com.openai.models.beta.agents.EnvironmentParam;
import com.openai.models.beta.agents.sessions.SessionCreateParams;

OpenAIClient client = OpenAIOkHttpClient.fromEnv();
var session =
    client
        .beta()
        .agents()
        .sessions()
        .create(
            SessionCreateParams.builder()
                .agentId("agt_123")
                .environment(
                    EnvironmentParam.OpenAIHosted.builder()
                        .environmentTemplateId("envtmpl_123")
                        .build())
                .review(SessionCreateParams.Review.AUTO_REVIEW)
                .input("Run npm install in /workspace.")
                .build());
System.out.println(session.id());
```

```ruby
require "openai"

client = OpenAI::Client.new
session = client.beta.agents.sessions.create(
  agent_id: "agt_123",
  environment: {
    type: :openai_hosted,
    environment_template_id: "envtmpl_123"
  },
  review: :auto_review,
  input: "Run npm install in /workspace."
)
puts session.id
```

```bash
curl --fail-with-body https://api.openai.com/v1/agents/sessions \
  -H "OpenAI-Beta: agents=v1" \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "agent_id": "agt_123",
    "environment": {
      "type": "openai_hosted",
      "environment_template_id": "envtmpl_123"
    },
    "review": "auto_review",
    "input": "Run npm install in /workspace."
  }'
```


Use the returned session `id` to [change the review mode](#change-the-review-mode)
between tasks. See the [Create session reference](https://developers.openai.com/api/reference/resources/beta/subresources/agents/subresources/sessions/methods/create)
for the request fields.

Your project must have access to automatic review. If it is unavailable, the API
rejects requests to enable it and identifies `review` as the affected parameter.




## Change the review mode

Update the session's `review` field between tasks. The main task must be idle and
input submission must have settled before you change the mode. This example
turns off automatic review. Replace `sess_123` with the session ID returned above:

Turn off automatic review

```javascript
const updatedSession = await client.beta.agents.sessions.update("sess_123", {
  review: "none",
});
console.log(updatedSession.id);
```

```python
updated_session = client.beta.agents.sessions.update("sess_123", review="none")
print(updated_session.id)
```

```go
updatedSession, err := client.Beta.Agents.Sessions.Update(context.Background(), "sess_123", openai.BetaAgentSessionUpdateParams{
	Review: openai.BetaAgentSessionUpdateParamsReviewNone,
})
if err != nil {
	panic(err)
}
fmt.Println(updatedSession.ID)
```

```java
import com.openai.models.beta.agents.sessions.SessionUpdateParams;

var updatedSession =
    client
        .beta()
        .agents()
        .sessions()
        .update(
            SessionUpdateParams.builder()
                .sessionId("sess_123")
                .review(SessionUpdateParams.Review.NONE)
                .build());
System.out.println(updatedSession.id());
```

```ruby
updated_session = client.beta.agents.sessions.update("sess_123", review: :none)
puts updated_session.id
```

```bash
curl --fail-with-body https://api.openai.com/v1/agents/sessions/sess_123 \
  -X POST \
  -H "OpenAI-Beta: agents=v1" \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "review": "none"
  }'
```


The update returns `200 OK` and the updated session. Omit `review` from other
session updates to leave it unchanged. To enable automatic review again, send
`"review": "auto_review"`. See the [Update session reference](https://developers.openai.com/api/reference/resources/beta/subresources/agents/subresources/sessions/methods/update)
for the request fields.

A request to change the mode while the main task is active or input submission
has not settled returns `409 Conflict`. None of the updates in that request are
applied. Retry after the task is idle and input submission has settled. Handle
`409` even after checking the session's status, because new input can arrive
before the update. Sending the current review value is allowed while work is
active.




[Retrieve](https://developers.openai.com/api/docs/guides/agents-api/sessions/manage#inspect-a-session) or
[list sessions](https://developers.openai.com/api/docs/guides/agents-api/sessions/manage#list-sessions) to inspect
the saved `review` value. If the response omits the field, treat it as `"none"`.