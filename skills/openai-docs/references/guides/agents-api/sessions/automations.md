# Scheduled automations

> For the complete documentation index, see [llms.txt](/llms.txt). Markdown versions of documentation pages are available by appending `.md` to the page URL.

Use scheduled automations to kick off agent sessions on a cron schedule. You can also enable the `automations` tool for your agents, so they can schedule tasks in the course of their work.



**Automate sessions on a cron schedule**

Use a cron expression and time zone to start new sessions or continue an existing session.






**Enable agents to create automations**

Add the `automations` tool so an agent can schedule follow-ups in its current session.






**Monitor automation invocations**

Each invocation records an attempt to send a task to a session. Inspect its status and session ID.





Automate sessions on a cron schedule

```javascript
import OpenAI from "openai";

const client = new OpenAI();
const automation = await client.beta.agents.automations.create({
  type: "periodic",
  name: "Daily session",
  expression: "0 10 * * *",
  timezone: "America/New_York",
  target: {
    type: "new_session",
    agent_id: "agt_123",
    environment: { type: "openai_hosted" },
    input: [
      {
        role: "user",
        content: [
          {
            type: "input_text",
            text: "Summarize the current status and next steps.",
          },
        ],
      },
    ],
  },
});
console.log(automation);
```

```python
from openai import OpenAI

client = OpenAI()
automation = client.beta.agents.automations.create(
    type="periodic",
    name="Daily session",
    expression="0 10 * * *",
    timezone="America/New_York",
    target={
        "type": "new_session",
        "agent_id": "agt_123",
        "environment": {"type": "openai_hosted"},
        "input": [
            {
                "role": "user",
                "content": [
                    {
                        "type": "input_text",
                        "text": "Summarize the current status and next steps.",
                    }
                ],
            }
        ],
    },
)
print(automation.to_json())
```

```go
import (
	"context"
	"fmt"

	"github.com/openai/openai-go/v3"
)

ctx := context.Background()
client := openai.NewClient()
automation, err := client.Beta.Agents.Automations.New(ctx,
	openai.BetaAgentAutomationNewParams{
		CreateAutomationParams: openai.AutomationScheduleParamUnion{
			OfParamPeriodic: &openai.AutomationScheduleParamPeriodic{
				Name:       "Daily session",
				Expression: "0 10 * * *",
				Timezone:   "America/New_York",
				Target: openai.AutomationTargetParamUnion{
					OfParamNewSession: &openai.AutomationTargetParamNewSession{
						AgentID: openai.String("agt_123"),
						Environment: openai.EnvironmentParamUnion{
							OfParamOpenAIHosted: &openai.EnvironmentParamOpenAIHosted{},
						},
						Input: []openai.AgentSessionInputMessageParam{
							{
								Content: []openai.InputContentParamUnion{
									{
										OfParamInputText: &openai.InputContentParamInputText{
											Text: "Summarize the current status and next steps.",
										},
									},
								},
							},
						},
					},
				},
			},
		},
	})
if err != nil {
	panic(err)
}
fmt.Println(automation)
```

```java
import com.openai.client.OpenAIClient;
import com.openai.client.okhttp.OpenAIOkHttpClient;
import com.openai.models.beta.agents.AgentSessionInputMessageParam;
import com.openai.models.beta.agents.EnvironmentParam;
import com.openai.models.beta.agents.automations.AutomationCreateParams;
import com.openai.models.beta.agents.automations.AutomationScheduleParam;
import com.openai.models.beta.agents.automations.AutomationTargetParam;

OpenAIClient client = OpenAIOkHttpClient.fromEnv();
var automation =
    client
        .beta()
        .agents()
        .automations()
        .create(
            AutomationCreateParams.builder()
                .automationScheduleParam(
                    AutomationScheduleParam.Periodic.builder()
                        .name("Daily session")
                        .expression("0 10 * * *")
                        .timezone("America/New_York")
                        .target(
                            AutomationTargetParam.NewSession.builder()
                                .agentId("agt_123")
                                .environment(EnvironmentParam.OpenAIHosted.builder().build())
                                .addInput(
                                    AgentSessionInputMessageParam.builder()
                                        .addInputTextContent(
                                            "Summarize the current status and next steps.")
                                        .build())
                                .build())
                        .build())
                .build());
System.out.println(automation);
```

```csharp
using OpenAI;
using OpenAI.Agents;
#pragma warning disable OPENAI001

string key = Environment.GetEnvironmentVariable("OPENAI_API_KEY")!;
AgentClient client = new OpenAIClient(key).GetAgentClient();
AgentAutomation automation = await client.CreateAutomationAsync(
    new AgentAutomationCreationOptions
    {
        Type = AgentAutomationType.Periodic,
        Name = "Daily session",
        Expression = "0 10 * * *",
        Timezone = "America/New_York",
        Target = new NewSessionAutomationTarget
        {
            AgentId = "agt_123",
            Environment = new EnvironmentParamOpenaiHosted(),
            Input =
            [
                new InputMessageParam(
                    [new InputContentParamInputText("Summarize the current status and next steps.")]
                ),
            ],
        },
    }
);
Console.WriteLine(automation.Id);
```

```ruby
require "openai"

client = OpenAI::Client.new
automation = client.beta.agents.automations.create(
  body: {
    type: "periodic",
    name: "Daily session",
    expression: "0 10 * * *",
    timezone: "America/New_York",
    target: {
      type: "new_session",
      agent_id: "agt_123",
      environment: { type: "openai_hosted" },
      input: [
        {
          role: "user",
          content: [
            {
              type: "input_text",
              text: "Summarize the current status and next steps."
            }
          ]
        }
      ]
    }
  }
)
puts automation
```

```bash
curl https://api.openai.com/v1/agents/automations \
  -H "OpenAI-Beta: agents=v1" \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "type": "periodic",
    "name": "Daily session",
    "expression": "0 10 * * *",
    "timezone": "America/New_York",
    "target": {
      "type": "new_session",
      "agent_id": "agt_123",
      "environment": {
        "type": "openai_hosted"
      },
      "input": [
        {
          "role": "user",
          "content": [
            {
              "type": "input_text",
              "text": "Summarize the current status and next steps."
            }
          ]
        }
      ]
    }
  }'
```

  

  

    Enable agents to create automations

```javascript
import OpenAI from "openai";

const client = new OpenAI();
const session = await client.beta.agents.sessions.create({
  agent: {
    model: "gpt-6-astra",
    instructions:
      "Use automations to schedule tasks requested by the user. Delegate each scheduled task to a subagent and ask for a concise result. Keep the goal, schedule, and useful summaries in the main session. Adjust or stop schedules when the user asks.",
    tools: [{ type: "automations" }],
    multi_agent: { enabled: true },
  },
  environment: { type: "openai_hosted" },
  input:
    "Every day at 10 AM in America/New_York, review the goals we discuss here and suggest the next actions I could take.",
});
console.log(session.id);
```

```python
from openai import OpenAI

client = OpenAI()
session = client.beta.agents.sessions.create(
    agent={
        "model": "gpt-6-astra",
        "instructions": (
            "Use automations to schedule tasks requested by the user. "
            "Delegate each scheduled task to a subagent and ask for a concise result. "
            "Keep the goal, schedule, and useful summaries in the main session. "
            "Adjust or stop schedules when the user asks."
        ),
        "multi_agent": {"enabled": True},
        "tools": [{"type": "automations"}],
    },
    environment={"type": "openai_hosted"},
    input=(
        "Every day at 10 AM in America/New_York, review the goals we discuss here "
        "and suggest the next actions I could take."
    ),
)
print(session.id)
```

```go
import (
	"context"
	"fmt"

	"github.com/openai/openai-go/v3"
)

ctx := context.Background()
client := openai.NewClient()
session, err := client.Beta.Agents.Sessions.New(ctx,
	openai.BetaAgentSessionNewParams{
		Agent: openai.BetaAgentSessionNewParamsAgent{
			Model:        openai.String("gpt-6-astra"),
			Instructions: openai.String("Use automations to schedule tasks requested by the user. Delegate each scheduled task to a subagent and ask for a concise result. Keep the goal, schedule, and useful summaries in the main session. Adjust or stop schedules when the user asks."),
			MultiAgent: openai.MultiAgentConfigParam{
				Enabled: true,
			},
			Tools: []openai.AgentToolParamUnion{
				{OfParamAutomations: &openai.AgentToolParamAutomations{}},
			},
		},
		Environment: openai.EnvironmentParamUnion{
			OfParamOpenAIHosted: &openai.EnvironmentParamOpenAIHosted{},
		},
		Input: openai.BetaAgentSessionNewParamsInputUnion{
			OfString: openai.String("Every day at 10 AM in America/New_York, review the goals we discuss here and suggest the next actions I could take."),
		},
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
import com.openai.models.beta.agents.MultiAgentConfigParam;
import com.openai.models.beta.agents.sessions.SessionCreateParams;

OpenAIClient client = OpenAIOkHttpClient.fromEnv();
var session =
    client
        .beta()
        .agents()
        .sessions()
        .create(
            SessionCreateParams.builder()
                .agent(
                    SessionCreateParams.Agent.builder()
                        .model("gpt-6-astra")
                        .instructions(
                            "Use automations to schedule tasks requested by the user. Delegate each scheduled task to a subagent and ask for a concise result. Keep the goal, schedule, and useful summaries in the main session. Adjust or stop schedules when the user asks.")
                        .multiAgent(MultiAgentConfigParam.builder().enabled(true).build())
                        .addToolAutomations()
                        .build())
                .environment(EnvironmentParam.OpenAIHosted.builder().build())
                .input(
                    "Every day at 10 AM in America/New_York, review the goals we discuss here and suggest the next actions I could take.")
                .build());
System.out.println(session.id());
```

```csharp
using OpenAI;
using OpenAI.Agents;
#pragma warning disable OPENAI001

string key = Environment.GetEnvironmentVariable("OPENAI_API_KEY")!;
AgentClient client = new OpenAIClient(key).GetAgentClient();
AgentSession session = await client.CreateAgentSessionAsync(
    new AgentSessionCreationOptions
    {
        Agent = new SessionAgentConfigParam
        {
            Model = "gpt-6-astra",
            Instructions = "Use automations to schedule tasks requested by the user. Delegate each scheduled task to a subagent and ask for a concise result. Keep the goal, schedule, and useful summaries in the main session. Adjust or stop schedules when the user asks.",
            MultiAgent = new MultiAgentConfigParam { Enabled = true },
            Tools = [new AgentToolConfigParamAutomations()],
        },
        Environment = new EnvironmentParamOpenaiHosted(),
        Input =
        [
            new InputMessageParam(
                [new InputContentParamInputText("Every day at 10 AM in America/New_York, review the goals we discuss here and suggest the next actions I could take.")]
            ),
        ],
    }
);
Console.WriteLine(session.Id);
```

```ruby
require "openai"

client = OpenAI::Client.new
session = client.beta.agents.sessions.create(
  agent: {
    model: "gpt-6-astra",
    instructions: "Use automations to schedule tasks requested by the user. Delegate each scheduled task to a subagent and ask for a concise result. Keep the goal, schedule, and useful summaries in the main session. Adjust or stop schedules when the user asks.",
    multi_agent: { enabled: true },
    tools: [{ type: "automations" }]
  },
  environment: { type: "openai_hosted" },
  input: "Every day at 10 AM in America/New_York, review the goals we discuss here and suggest the next actions I could take."
)
puts session.id
```

```bash
curl https://api.openai.com/v1/agents/sessions \
  -H "OpenAI-Beta: agents=v1" \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "agent": {
      "model": "gpt-6-astra",
      "instructions": "Use automations to schedule tasks requested by the user. Delegate each scheduled task to a subagent and ask for a concise result. Keep the goal, schedule, and useful summaries in the main session. Adjust or stop schedules when the user asks.",
      "tools": [{ "type": "automations" }],
      "multi_agent": { "enabled": true }
    },
    "environment": {
      "type": "openai_hosted"
    },
    "input": "Every day at 10 AM in America/New_York, review the goals we discuss here and suggest the next actions I could take."
  }'
```

  

  

    Monitor automation invocations

```javascript
import OpenAI from "openai";

const client = new OpenAI();
for await (const invocation of client.beta.agents.automations.invocations.list(
  "auto_123"
)) {
  console.log(invocation.id, invocation.status, invocation.session_id);
}
```

```python
from openai import OpenAI

client = OpenAI()
invocations = client.beta.agents.automations.invocations.list(automation_id="auto_123")
for invocation in invocations:
    print(invocation.id, invocation.status, invocation.session_id)
```

```go
import (
	"context"
	"fmt"

	"github.com/openai/openai-go/v3"
)

ctx := context.Background()
client := openai.NewClient()
invocations := client.Beta.Agents.Automations.Invocations.ListAutoPaging(ctx, "auto_123",
	openai.BetaAgentAutomationInvocationListParams{})
for invocations.Next() {
	invocation := invocations.Current()
	fmt.Println(invocation.ID, invocation.Status, invocation.SessionID)
}
if err := invocations.Err(); err != nil {
	panic(err)
}
```

```java
import com.openai.client.OpenAIClient;
import com.openai.client.okhttp.OpenAIOkHttpClient;
import com.openai.models.beta.agents.automations.invocations.InvocationListParams;

OpenAIClient client = OpenAIOkHttpClient.fromEnv();
var invocations =
    client
        .beta()
        .agents()
        .automations()
        .invocations()
        .list(InvocationListParams.builder().automationId("auto_123").build());
for (var invocation : invocations.autoPager()) {
  System.out.println(
      invocation.id() + " " + invocation.status() + " " + invocation.sessionId());
}
```

```csharp
using OpenAI;
using OpenAI.Agents;
#pragma warning disable OPENAI001

string key = Environment.GetEnvironmentVariable("OPENAI_API_KEY")!;
AgentClient client = new OpenAIClient(key).GetAgentClient();
await foreach (AgentAutomationInvocation invocation in client.GetAutomationInvocationsAsync("auto_123"))
{
    Console.WriteLine($"{invocation.Id} {invocation.Status} {invocation.SessionId}");
}
```

```ruby
require "openai"

client = OpenAI::Client.new
invocations = client.beta.agents.automations.invocations.list("auto_123")
invocations.auto_paging_each do |invocation|
  puts "#{invocation.id} #{invocation.status} #{invocation.session_id}"
end
```

```bash
curl https://api.openai.com/v1/agents/automations/auto_123/invocations \
  -H "OpenAI-Beta: agents=v1" \
  -H "Authorization: Bearer $OPENAI_API_KEY"
```








## API resources






[Agents](https://developers.openai.com/api/reference/resources/beta/subresources/agents)

`/v1/agents`




Define the instructions and tools for the task.








[Automations](https://developers.openai.com/api/reference/resources/beta/subresources/agents/subresources/automations)

`/v1/agents/automations`




Save when to run and which session to use.








[Invocations](https://developers.openai.com/api/reference/resources/beta/subresources/agents/subresources/automations/subresources/invocations)

`/v1/agents/automations/{automation_id}/invocations`




See when a task was sent and which session received it.








[Sessions](https://developers.openai.com/api/reference/resources/beta/subresources/agents/subresources/sessions)

`/v1/agents/sessions`




Run the task with conversation history and tools.








[Session events](https://developers.openai.com/api/reference/resources/beta/subresources/agents/subresources/sessions/subresources/events)

`/v1/agents/sessions/{session_id}/events`




Follow progress and collect the result.










## Use cases

### Restaurant reservations

```javascript
import OpenAI from "openai";

const client = new OpenAI();
const automation = await client.beta.agents.automations.create({
  type: "periodic",
  name: "Check restaurant reservations",
  expression: "0 */2 * * *",
  timezone: "America/New_York",
  target: {
    type: "existing_session",
    session_id: "sess_123",
    instructions:
      "Check restaurant availability for our dinner plans. Compare with earlier checks and report newly available tables.",
  },
});
console.log(automation);
```

```python
from openai import OpenAI

client = OpenAI()
automation = client.beta.agents.automations.create(
    type="periodic",
    name="Check restaurant reservations",
    expression="0 */2 * * *",
    timezone="America/New_York",
    target={
        "type": "existing_session",
        "session_id": "sess_123",
        "instructions": (
            "Check restaurant availability for our dinner plans. "
            "Compare with earlier checks and report newly available tables."
        ),
    },
)
print(automation.to_json())
```

```go
import (
	"context"
	"fmt"

	"github.com/openai/openai-go/v3"
)

ctx := context.Background()
client := openai.NewClient()
automation, err := client.Beta.Agents.Automations.New(ctx,
	openai.BetaAgentAutomationNewParams{
		CreateAutomationParams: openai.AutomationScheduleParamUnion{
			OfParamPeriodic: &openai.AutomationScheduleParamPeriodic{
				Name:       "Check restaurant reservations",
				Expression: "0 */2 * * *",
				Timezone:   "America/New_York",
				Target: openai.AutomationTargetParamUnion{
					OfParamExistingSession: &openai.AutomationTargetParamExistingSession{
						SessionID:    "sess_123",
						Instructions: "Check restaurant availability for our dinner plans. Compare with earlier checks and report newly available tables.",
					},
				},
			},
		},
	})
if err != nil {
	panic(err)
}
fmt.Println(automation)
```

```java
import com.openai.client.OpenAIClient;
import com.openai.client.okhttp.OpenAIOkHttpClient;
import com.openai.models.beta.agents.automations.AutomationCreateParams;
import com.openai.models.beta.agents.automations.AutomationScheduleParam;
import com.openai.models.beta.agents.automations.AutomationTargetParam;

OpenAIClient client = OpenAIOkHttpClient.fromEnv();
var automation =
    client
        .beta()
        .agents()
        .automations()
        .create(
            AutomationCreateParams.builder()
                .automationScheduleParam(
                    AutomationScheduleParam.Periodic.builder()
                        .name("Check restaurant reservations")
                        .expression("0 */2 * * *")
                        .timezone("America/New_York")
                        .target(
                            AutomationTargetParam.ExistingSession.builder()
                                .sessionId("sess_123")
                                .instructions(
                                    "Check restaurant availability for our dinner plans. Compare with earlier checks and report newly available tables.")
                                .build())
                        .build())
                .build());
System.out.println(automation);
```

```csharp
using OpenAI;
using OpenAI.Agents;
#pragma warning disable OPENAI001

string key = Environment.GetEnvironmentVariable("OPENAI_API_KEY")!;
AgentClient client = new OpenAIClient(key).GetAgentClient();
AgentAutomation automation = await client.CreateAutomationAsync(
    new AgentAutomationCreationOptions
    {
        Type = AgentAutomationType.Periodic,
        Name = "Check restaurant reservations",
        Expression = "0 */2 * * *",
        Timezone = "America/New_York",
        Target = new ExistingSessionAutomationTarget
        {
            SessionId = "sess_123",
            Instructions = "Check restaurant availability for our dinner plans. Compare with earlier checks and report newly available tables.",
        },
    }
);
Console.WriteLine(automation.Id);
```

```ruby
require "openai"

client = OpenAI::Client.new
automation = client.beta.agents.automations.create(
  body: {
    type: "periodic",
    name: "Check restaurant reservations",
    expression: "0 */2 * * *",
    timezone: "America/New_York",
    target: {
      type: "existing_session",
      session_id: "sess_123",
      instructions: "Check restaurant availability for our dinner plans. Compare with earlier checks and report newly available tables."
    }
  }
)
puts automation
```

```bash
curl https://api.openai.com/v1/agents/automations \
  -H "OpenAI-Beta: agents=v1" \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "type": "periodic",
    "name": "Check restaurant reservations",
    "expression": "0 */2 * * *",
    "timezone": "America/New_York",
    "target": {
      "type": "existing_session",
      "session_id": "sess_123",
      "instructions": "Check restaurant availability for our dinner plans. Compare with earlier checks and report newly available tables."
    }
  }'
```

### Monthly spending

```javascript
import OpenAI from "openai";

const client = new OpenAI();
const automation = await client.beta.agents.automations.create({
  type: "periodic",
  name: "Monthly spending review",
  expression: "0 9 1 * *",
  timezone: "America/New_York",
  target: {
    type: "new_session",
    agent_id: "agt_123",
    environment: { type: "openai_hosted" },
    input: [
      {
        role: "user",
        content: [
          {
            type: "input_text",
            text: "Review my spending for the previous month. Flag unused subscriptions, price increases, and other potential savings for me to review.",
          },
        ],
      },
    ],
  },
});
console.log(automation);
```

```python
from openai import OpenAI

client = OpenAI()
automation = client.beta.agents.automations.create(
    type="periodic",
    name="Monthly spending review",
    expression="0 9 1 * *",
    timezone="America/New_York",
    target={
        "type": "new_session",
        "agent_id": "agt_123",
        "environment": {"type": "openai_hosted"},
        "input": [
            {
                "role": "user",
                "content": [
                    {
                        "type": "input_text",
                        "text": (
                            "Review my spending for the previous month. Flag unused "
                            "subscriptions, price increases, and other potential "
                            "savings for me to review."
                        ),
                    }
                ],
            }
        ],
    },
)
print(automation.to_json())
```

```go
import (
	"context"
	"fmt"

	"github.com/openai/openai-go/v3"
)

ctx := context.Background()
client := openai.NewClient()
automation, err := client.Beta.Agents.Automations.New(ctx,
	openai.BetaAgentAutomationNewParams{
		CreateAutomationParams: openai.AutomationScheduleParamUnion{
			OfParamPeriodic: &openai.AutomationScheduleParamPeriodic{
				Name:       "Monthly spending review",
				Expression: "0 9 1 * *",
				Timezone:   "America/New_York",
				Target: openai.AutomationTargetParamUnion{
					OfParamNewSession: &openai.AutomationTargetParamNewSession{
						AgentID: openai.String("agt_123"),
						Environment: openai.EnvironmentParamUnion{
							OfParamOpenAIHosted: &openai.EnvironmentParamOpenAIHosted{},
						},
						Input: []openai.AgentSessionInputMessageParam{
							{
								Content: []openai.InputContentParamUnion{
									{
										OfParamInputText: &openai.InputContentParamInputText{
											Text: "Review my spending for the previous month. Flag unused subscriptions, price increases, and other potential savings for me to review.",
										},
									},
								},
							},
						},
					},
				},
			},
		},
	})
if err != nil {
	panic(err)
}
fmt.Println(automation)
```

```java
import com.openai.client.OpenAIClient;
import com.openai.client.okhttp.OpenAIOkHttpClient;
import com.openai.models.beta.agents.AgentSessionInputMessageParam;
import com.openai.models.beta.agents.EnvironmentParam;
import com.openai.models.beta.agents.automations.AutomationCreateParams;
import com.openai.models.beta.agents.automations.AutomationScheduleParam;
import com.openai.models.beta.agents.automations.AutomationTargetParam;

OpenAIClient client = OpenAIOkHttpClient.fromEnv();
var automation =
    client
        .beta()
        .agents()
        .automations()
        .create(
            AutomationCreateParams.builder()
                .automationScheduleParam(
                    AutomationScheduleParam.Periodic.builder()
                        .name("Monthly spending review")
                        .expression("0 9 1 * *")
                        .timezone("America/New_York")
                        .target(
                            AutomationTargetParam.NewSession.builder()
                                .agentId("agt_123")
                                .environment(EnvironmentParam.OpenAIHosted.builder().build())
                                .addInput(
                                    AgentSessionInputMessageParam.builder()
                                        .addInputTextContent(
                                            "Review my spending for the previous month. Flag unused subscriptions, price increases, and other potential savings for me to review.")
                                        .build())
                                .build())
                        .build())
                .build());
System.out.println(automation);
```

```csharp
using OpenAI;
using OpenAI.Agents;
#pragma warning disable OPENAI001

string key = Environment.GetEnvironmentVariable("OPENAI_API_KEY")!;
AgentClient client = new OpenAIClient(key).GetAgentClient();
AgentAutomation automation = await client.CreateAutomationAsync(
    new AgentAutomationCreationOptions
    {
        Type = AgentAutomationType.Periodic,
        Name = "Monthly spending review",
        Expression = "0 9 1 * *",
        Timezone = "America/New_York",
        Target = new NewSessionAutomationTarget
        {
            AgentId = "agt_123",
            Environment = new EnvironmentParamOpenaiHosted(),
            Input =
            [
                new InputMessageParam(
                    [new InputContentParamInputText("Review my spending for the previous month. Flag unused subscriptions, price increases, and other potential savings for me to review.")]
                ),
            ],
        },
    }
);
Console.WriteLine(automation.Id);
```

```ruby
require "openai"

client = OpenAI::Client.new
automation = client.beta.agents.automations.create(
  body: {
    type: "periodic",
    name: "Monthly spending review",
    expression: "0 9 1 * *",
    timezone: "America/New_York",
    target: {
      type: "new_session",
      agent_id: "agt_123",
      environment: { type: "openai_hosted" },
      input: [
        {
          role: "user",
          content: [
            {
              type: "input_text",
              text: "Review my spending for the previous month. Flag unused subscriptions, price increases, and other potential savings for me to review."
            }
          ]
        }
      ]
    }
  }
)
puts automation
```

```bash
curl https://api.openai.com/v1/agents/automations \
  -H "OpenAI-Beta: agents=v1" \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "type": "periodic",
    "name": "Monthly spending review",
    "expression": "0 9 1 * *",
    "timezone": "America/New_York",
    "target": {
      "type": "new_session",
      "agent_id": "agt_123",
      "environment": {
        "type": "openai_hosted"
      },
      "input": [
        {
          "role": "user",
          "content": [
            {
              "type": "input_text",
              "text": "Review my spending for the previous month. Flag unused subscriptions, price increases, and other potential savings for me to review."
            }
          ]
        }
      ]
    }
  }'
```

### Daily actions

```javascript
import OpenAI from "openai";

const client = new OpenAI();
const automation = await client.beta.agents.automations.create({
  type: "periodic",
  name: "Daily suggestions",
  expression: "0 10 * * *",
  timezone: "America/New_York",
  target: {
    type: "new_session",
    agent_id: "agt_123",
    environment: { type: "openai_hosted" },
    input: [
      {
        role: "user",
        content: [
          {
            type: "input_text",
            text: "Review my calendar, tasks, and recent messages for today. Suggest the most useful actions I could take today, with a short reason for each.",
          },
        ],
      },
    ],
  },
});
console.log(automation);
```

```python
from openai import OpenAI

client = OpenAI()
automation = client.beta.agents.automations.create(
    type="periodic",
    name="Daily suggestions",
    expression="0 10 * * *",
    timezone="America/New_York",
    target={
        "type": "new_session",
        "agent_id": "agt_123",
        "environment": {"type": "openai_hosted"},
        "input": [
            {
                "role": "user",
                "content": [
                    {
                        "type": "input_text",
                        "text": (
                            "Review my calendar, tasks, and recent messages for today. "
                            "Suggest the most useful actions I could take today, "
                            "with a short reason for each."
                        ),
                    }
                ],
            }
        ],
    },
)
print(automation.to_json())
```

```go
import (
	"context"
	"fmt"

	"github.com/openai/openai-go/v3"
)

ctx := context.Background()
client := openai.NewClient()
automation, err := client.Beta.Agents.Automations.New(ctx,
	openai.BetaAgentAutomationNewParams{
		CreateAutomationParams: openai.AutomationScheduleParamUnion{
			OfParamPeriodic: &openai.AutomationScheduleParamPeriodic{
				Name:       "Daily suggestions",
				Expression: "0 10 * * *",
				Timezone:   "America/New_York",
				Target: openai.AutomationTargetParamUnion{
					OfParamNewSession: &openai.AutomationTargetParamNewSession{
						AgentID: openai.String("agt_123"),
						Environment: openai.EnvironmentParamUnion{
							OfParamOpenAIHosted: &openai.EnvironmentParamOpenAIHosted{},
						},
						Input: []openai.AgentSessionInputMessageParam{
							{
								Content: []openai.InputContentParamUnion{
									{
										OfParamInputText: &openai.InputContentParamInputText{
											Text: "Review my calendar, tasks, and recent messages for today. Suggest the most useful actions I could take today, with a short reason for each.",
										},
									},
								},
							},
						},
					},
				},
			},
		},
	})
if err != nil {
	panic(err)
}
fmt.Println(automation)
```

```java
import com.openai.client.OpenAIClient;
import com.openai.client.okhttp.OpenAIOkHttpClient;
import com.openai.models.beta.agents.AgentSessionInputMessageParam;
import com.openai.models.beta.agents.EnvironmentParam;
import com.openai.models.beta.agents.automations.AutomationCreateParams;
import com.openai.models.beta.agents.automations.AutomationScheduleParam;
import com.openai.models.beta.agents.automations.AutomationTargetParam;

OpenAIClient client = OpenAIOkHttpClient.fromEnv();
var automation =
    client
        .beta()
        .agents()
        .automations()
        .create(
            AutomationCreateParams.builder()
                .automationScheduleParam(
                    AutomationScheduleParam.Periodic.builder()
                        .name("Daily suggestions")
                        .expression("0 10 * * *")
                        .timezone("America/New_York")
                        .target(
                            AutomationTargetParam.NewSession.builder()
                                .agentId("agt_123")
                                .environment(EnvironmentParam.OpenAIHosted.builder().build())
                                .addInput(
                                    AgentSessionInputMessageParam.builder()
                                        .addInputTextContent(
                                            "Review my calendar, tasks, and recent messages for today. Suggest the most useful actions I could take today, with a short reason for each.")
                                        .build())
                                .build())
                        .build())
                .build());
System.out.println(automation);
```

```csharp
using OpenAI;
using OpenAI.Agents;
#pragma warning disable OPENAI001

string key = Environment.GetEnvironmentVariable("OPENAI_API_KEY")!;
AgentClient client = new OpenAIClient(key).GetAgentClient();
AgentAutomation automation = await client.CreateAutomationAsync(
    new AgentAutomationCreationOptions
    {
        Type = AgentAutomationType.Periodic,
        Name = "Daily suggestions",
        Expression = "0 10 * * *",
        Timezone = "America/New_York",
        Target = new NewSessionAutomationTarget
        {
            AgentId = "agt_123",
            Environment = new EnvironmentParamOpenaiHosted(),
            Input =
            [
                new InputMessageParam(
                    [new InputContentParamInputText("Review my calendar, tasks, and recent messages for today. Suggest the most useful actions I could take today, with a short reason for each.")]
                ),
            ],
        },
    }
);
Console.WriteLine(automation.Id);
```

```ruby
require "openai"

client = OpenAI::Client.new
automation = client.beta.agents.automations.create(
  body: {
    type: "periodic",
    name: "Daily suggestions",
    expression: "0 10 * * *",
    timezone: "America/New_York",
    target: {
      type: "new_session",
      agent_id: "agt_123",
      environment: { type: "openai_hosted" },
      input: [
        {
          role: "user",
          content: [
            {
              type: "input_text",
              text: "Review my calendar, tasks, and recent messages for today. Suggest the most useful actions I could take today, with a short reason for each."
            }
          ]
        }
      ]
    }
  }
)
puts automation
```

```bash
curl https://api.openai.com/v1/agents/automations \
  -H "OpenAI-Beta: agents=v1" \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "type": "periodic",
    "name": "Daily suggestions",
    "expression": "0 10 * * *",
    "timezone": "America/New_York",
    "target": {
      "type": "new_session",
      "agent_id": "agt_123",
      "environment": {
        "type": "openai_hosted"
      },
      "input": [
        {
          "role": "user",
          "content": [
            {
              "type": "input_text",
              "text": "Review my calendar, tasks, and recent messages for today. Suggest the most useful actions I could take today, with a short reason for each."
            }
          ]
        }
      ]
    }
  }'
```



## How it works

An automation is a saved schedule for agent work. The Agents API stores the schedule and sends each task to its target session:

1. **Define the work.** Choose when it should run and whether each run starts a new session or continues an existing one.
2. **Send the task.** Each run creates an **invocation**, a record of the attempt to send the task to its target session. If that session is busy, the task waits.
3. **Follow the result.** The agent works with the session's tools and context. Follow session events to track progress and collect results. The session receiving the task doesn't mean the agent has finished the work.

Your application can create, update, pause, or delete schedules through the API. With the `automations` tool enabled, an agent can also schedule its own next check in its current session.

## Choose the session and schedule

Choose a target based on whether the task needs earlier conversation history:

| Target             | Use it for                                                 | Required configuration                                            |
| ------------------ | ---------------------------------------------------------- | ----------------------------------------------------------------- |
| `new_session`      | Independent work, such as a monthly spending review.       | An agent, an environment, and initial messages in `target.input`. |
| `existing_session` | Follow-up work that needs the session's previous findings. | A session ID and reminder text in `target.instructions`.          |

Choose timing independently of the target:

| Type       | Timing fields               | Example                                                              |
| ---------- | --------------------------- | -------------------------------------------------------------------- |
| `periodic` | `expression` and `timezone` | Every day at 10 AM in `America/New_York`.                            |
| `once`     | `run_at`                    | One check at a future time specified as a Unix timestamp in seconds. |

Both schedule types work with either target. Creating an automation saves it with status `active`; it doesn't run the task immediately. A periodic automation's first occurrence is scheduled for the next matching time.

## Schedule daily suggestions

Before creating the automation, create an agent with instructions and tools for the task, including access to the user's calendar, tasks, and messages. See [Reuse an agent across sessions](https://developers.openai.com/api/docs/guides/agents-api/configuration#reuse-an-agent-across-sessions).

The SDKs include the `OpenAI-Beta: agents=v1` header; include it when calling the API with cURL.

Here's an example of how to create an automation to start a new session for 10 AM each day in New York:

Schedule daily suggestions

```javascript
import OpenAI from "openai";

const client = new OpenAI();
const automation = await client.beta.agents.automations.create({
  type: "periodic",
  name: "Daily suggestions",
  expression: "0 10 * * *",
  timezone: "America/New_York",
  target: {
    type: "new_session",
    agent_id: "agt_123",
    environment: { type: "openai_hosted" },
    input: [
      {
        role: "user",
        content: [
          {
            type: "input_text",
            text: "Review my calendar, tasks, and recent messages for today. Suggest the most useful actions I could take today, with a short reason for each.",
          },
        ],
      },
    ],
  },
});
console.log(automation);
```

```python
from openai import OpenAI

client = OpenAI()
automation = client.beta.agents.automations.create(
    type="periodic",
    name="Daily suggestions",
    expression="0 10 * * *",
    timezone="America/New_York",
    target={
        "type": "new_session",
        "agent_id": "agt_123",
        "environment": {"type": "openai_hosted"},
        "input": [
            {
                "role": "user",
                "content": [
                    {
                        "type": "input_text",
                        "text": (
                            "Review my calendar, tasks, and recent messages for today. "
                            "Suggest the most useful actions I could take today, "
                            "with a short reason for each."
                        ),
                    }
                ],
            }
        ],
    },
)
print(automation.to_json())
```

```go
import (
	"context"
	"fmt"

	"github.com/openai/openai-go/v3"
)

ctx := context.Background()
client := openai.NewClient()
automation, err := client.Beta.Agents.Automations.New(ctx,
	openai.BetaAgentAutomationNewParams{
		CreateAutomationParams: openai.AutomationScheduleParamUnion{
			OfParamPeriodic: &openai.AutomationScheduleParamPeriodic{
				Name:       "Daily suggestions",
				Expression: "0 10 * * *",
				Timezone:   "America/New_York",
				Target: openai.AutomationTargetParamUnion{
					OfParamNewSession: &openai.AutomationTargetParamNewSession{
						AgentID: openai.String("agt_123"),
						Environment: openai.EnvironmentParamUnion{
							OfParamOpenAIHosted: &openai.EnvironmentParamOpenAIHosted{},
						},
						Input: []openai.AgentSessionInputMessageParam{
							{
								Content: []openai.InputContentParamUnion{
									{
										OfParamInputText: &openai.InputContentParamInputText{
											Text: "Review my calendar, tasks, and recent messages for today. Suggest the most useful actions I could take today, with a short reason for each.",
										},
									},
								},
							},
						},
					},
				},
			},
		},
	})
if err != nil {
	panic(err)
}
fmt.Println(automation)
```

```java
import com.openai.client.OpenAIClient;
import com.openai.client.okhttp.OpenAIOkHttpClient;
import com.openai.models.beta.agents.AgentSessionInputMessageParam;
import com.openai.models.beta.agents.EnvironmentParam;
import com.openai.models.beta.agents.automations.AutomationCreateParams;
import com.openai.models.beta.agents.automations.AutomationScheduleParam;
import com.openai.models.beta.agents.automations.AutomationTargetParam;

OpenAIClient client = OpenAIOkHttpClient.fromEnv();
var automation =
    client
        .beta()
        .agents()
        .automations()
        .create(
            AutomationCreateParams.builder()
                .automationScheduleParam(
                    AutomationScheduleParam.Periodic.builder()
                        .name("Daily suggestions")
                        .expression("0 10 * * *")
                        .timezone("America/New_York")
                        .target(
                            AutomationTargetParam.NewSession.builder()
                                .agentId("agt_123")
                                .environment(EnvironmentParam.OpenAIHosted.builder().build())
                                .addInput(
                                    AgentSessionInputMessageParam.builder()
                                        .addInputTextContent(
                                            "Review my calendar, tasks, and recent messages for today. Suggest the most useful actions I could take today, with a short reason for each.")
                                        .build())
                                .build())
                        .build())
                .build());
System.out.println(automation);
```

```csharp
using OpenAI;
using OpenAI.Agents;
#pragma warning disable OPENAI001

string key = Environment.GetEnvironmentVariable("OPENAI_API_KEY")!;
AgentClient client = new OpenAIClient(key).GetAgentClient();
AgentAutomation automation = await client.CreateAutomationAsync(
    new AgentAutomationCreationOptions
    {
        Type = AgentAutomationType.Periodic,
        Name = "Daily suggestions",
        Expression = "0 10 * * *",
        Timezone = "America/New_York",
        Target = new NewSessionAutomationTarget
        {
            AgentId = "agt_123",
            Environment = new EnvironmentParamOpenaiHosted(),
            Input =
            [
                new InputMessageParam(
                    [new InputContentParamInputText("Review my calendar, tasks, and recent messages for today. Suggest the most useful actions I could take today, with a short reason for each.")]
                ),
            ],
        },
    }
);
Console.WriteLine(automation.Id);
```

```ruby
require "openai"

client = OpenAI::Client.new
automation = client.beta.agents.automations.create(
  body: {
    type: "periodic",
    name: "Daily suggestions",
    expression: "0 10 * * *",
    timezone: "America/New_York",
    target: {
      type: "new_session",
      agent_id: "agt_123",
      environment: { type: "openai_hosted" },
      input: [
        {
          role: "user",
          content: [
            {
              type: "input_text",
              text: "Review my calendar, tasks, and recent messages for today. Suggest the most useful actions I could take today, with a short reason for each."
            }
          ]
        }
      ]
    }
  }
)
puts automation
```

```bash
curl https://api.openai.com/v1/agents/automations \
  -H "OpenAI-Beta: agents=v1" \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "type": "periodic",
    "name": "Daily suggestions",
    "expression": "0 10 * * *",
    "timezone": "America/New_York",
    "target": {
      "type": "new_session",
      "agent_id": "agt_123",
      "environment": {
        "type": "openai_hosted"
      },
      "input": [
        {
          "role": "user",
          "content": [
            {
              "type": "input_text",
              "text": "Review my calendar, tasks, and recent messages for today. Suggest the most useful actions I could take today, with a short reason for each."
            }
          ]
        }
      ]
    }
  }'
```


Save the returned automation `id` to inspect or manage the schedule later. Each invocation starts a new conversation. The environment configuration above provisions an [OpenAI-hosted sandbox](https://developers.openai.com/api/docs/guides/agents-api/environments/openai-hosted) for that session.

You can supply inline agent configuration in `target.agent` instead of a saved `target.agent_id`. Supply exactly one of these fields. Put the initial messages inside `target.input`, not at the top level of the request. Include at least one message with nonempty text or an image URL.

### Review spending each month

The same approach works for a monthly spending review. Give the saved agent access to the user's financial records, then schedule a new session for 9 AM on the first day of each month:

Schedule a monthly spending review

```javascript
import OpenAI from "openai";

const client = new OpenAI();
const automation = await client.beta.agents.automations.create({
  type: "periodic",
  name: "Monthly spending review",
  expression: "0 9 1 * *",
  timezone: "America/New_York",
  target: {
    type: "new_session",
    agent_id: "agt_123",
    environment: { type: "openai_hosted" },
    input: [
      {
        role: "user",
        content: [
          {
            type: "input_text",
            text: "Review my spending for the previous month. Flag unused subscriptions, price increases, and other potential savings for me to review.",
          },
        ],
      },
    ],
  },
});
console.log(automation);
```

```python
from openai import OpenAI

client = OpenAI()
automation = client.beta.agents.automations.create(
    type="periodic",
    name="Monthly spending review",
    expression="0 9 1 * *",
    timezone="America/New_York",
    target={
        "type": "new_session",
        "agent_id": "agt_123",
        "environment": {"type": "openai_hosted"},
        "input": [
            {
                "role": "user",
                "content": [
                    {
                        "type": "input_text",
                        "text": (
                            "Review my spending for the previous month. Flag unused "
                            "subscriptions, price increases, and other potential "
                            "savings for me to review."
                        ),
                    }
                ],
            }
        ],
    },
)
print(automation.to_json())
```

```go
import (
	"context"
	"fmt"

	"github.com/openai/openai-go/v3"
)

ctx := context.Background()
client := openai.NewClient()
automation, err := client.Beta.Agents.Automations.New(ctx,
	openai.BetaAgentAutomationNewParams{
		CreateAutomationParams: openai.AutomationScheduleParamUnion{
			OfParamPeriodic: &openai.AutomationScheduleParamPeriodic{
				Name:       "Monthly spending review",
				Expression: "0 9 1 * *",
				Timezone:   "America/New_York",
				Target: openai.AutomationTargetParamUnion{
					OfParamNewSession: &openai.AutomationTargetParamNewSession{
						AgentID: openai.String("agt_123"),
						Environment: openai.EnvironmentParamUnion{
							OfParamOpenAIHosted: &openai.EnvironmentParamOpenAIHosted{},
						},
						Input: []openai.AgentSessionInputMessageParam{
							{
								Content: []openai.InputContentParamUnion{
									{
										OfParamInputText: &openai.InputContentParamInputText{
											Text: "Review my spending for the previous month. Flag unused subscriptions, price increases, and other potential savings for me to review.",
										},
									},
								},
							},
						},
					},
				},
			},
		},
	})
if err != nil {
	panic(err)
}
fmt.Println(automation)
```

```java
import com.openai.client.OpenAIClient;
import com.openai.client.okhttp.OpenAIOkHttpClient;
import com.openai.models.beta.agents.AgentSessionInputMessageParam;
import com.openai.models.beta.agents.EnvironmentParam;
import com.openai.models.beta.agents.automations.AutomationCreateParams;
import com.openai.models.beta.agents.automations.AutomationScheduleParam;
import com.openai.models.beta.agents.automations.AutomationTargetParam;

OpenAIClient client = OpenAIOkHttpClient.fromEnv();
var automation =
    client
        .beta()
        .agents()
        .automations()
        .create(
            AutomationCreateParams.builder()
                .automationScheduleParam(
                    AutomationScheduleParam.Periodic.builder()
                        .name("Monthly spending review")
                        .expression("0 9 1 * *")
                        .timezone("America/New_York")
                        .target(
                            AutomationTargetParam.NewSession.builder()
                                .agentId("agt_123")
                                .environment(EnvironmentParam.OpenAIHosted.builder().build())
                                .addInput(
                                    AgentSessionInputMessageParam.builder()
                                        .addInputTextContent(
                                            "Review my spending for the previous month. Flag unused subscriptions, price increases, and other potential savings for me to review.")
                                        .build())
                                .build())
                        .build())
                .build());
System.out.println(automation);
```

```csharp
using OpenAI;
using OpenAI.Agents;
#pragma warning disable OPENAI001

string key = Environment.GetEnvironmentVariable("OPENAI_API_KEY")!;
AgentClient client = new OpenAIClient(key).GetAgentClient();
AgentAutomation automation = await client.CreateAutomationAsync(
    new AgentAutomationCreationOptions
    {
        Type = AgentAutomationType.Periodic,
        Name = "Monthly spending review",
        Expression = "0 9 1 * *",
        Timezone = "America/New_York",
        Target = new NewSessionAutomationTarget
        {
            AgentId = "agt_123",
            Environment = new EnvironmentParamOpenaiHosted(),
            Input =
            [
                new InputMessageParam(
                    [new InputContentParamInputText("Review my spending for the previous month. Flag unused subscriptions, price increases, and other potential savings for me to review.")]
                ),
            ],
        },
    }
);
Console.WriteLine(automation.Id);
```

```ruby
require "openai"

client = OpenAI::Client.new
automation = client.beta.agents.automations.create(
  body: {
    type: "periodic",
    name: "Monthly spending review",
    expression: "0 9 1 * *",
    timezone: "America/New_York",
    target: {
      type: "new_session",
      agent_id: "agt_123",
      environment: { type: "openai_hosted" },
      input: [
        {
          role: "user",
          content: [
            {
              type: "input_text",
              text: "Review my spending for the previous month. Flag unused subscriptions, price increases, and other potential savings for me to review."
            }
          ]
        }
      ]
    }
  }
)
puts automation
```

```bash
curl https://api.openai.com/v1/agents/automations \
  -H "OpenAI-Beta: agents=v1" \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "type": "periodic",
    "name": "Monthly spending review",
    "expression": "0 9 1 * *",
    "timezone": "America/New_York",
    "target": {
      "type": "new_session",
      "agent_id": "agt_123",
      "environment": {
        "type": "openai_hosted"
      },
      "input": [
        {
          "role": "user",
          "content": [
            {
              "type": "input_text",
              "text": "Review my spending for the previous month. Flag unused subscriptions, price increases, and other potential savings for me to review."
            }
          ]
        }
      ]
    }
  }'
```


### Set recurring timing

Use a five-field cron expression with a named time zone:

| Expression        | Schedule                        |
| ----------------- | ------------------------------- |
| `0 10 * * *`      | Every day at 10 AM              |
| `0 */2 * * *`     | Every two hours                 |
| `0 9 1 * *`       | First day of each month at 9 AM |
| `0 9 * * MON-FRI` | Monday through Friday at 9 AM   |

The time zone determines how to interpret the expression. Use `UTC` for a UTC schedule or an IANA time zone such as `America/New_York` for a local schedule. Don't include `run_at` in a periodic automation.

A cron schedule follows clock times in the selected time zone. For example, `0 */3 * * *` schedules runs at midnight, 3 AM, 6 AM, and every three hours after that, rather than every three hours from creation.

The schedule specifies the intended time. The Agents API adds a small randomized delay to recurring runs to spread load. The task can wait longer if the target session is busy.

## Continue an existing session

Use an existing session when the agent needs earlier findings, messages, or saved work. For example, a session planning dinner can keep the restaurant preferences and results from earlier availability checks.

Here's how to check for restaurant reservations every two hours in that session:

Check restaurant reservations

```javascript
import OpenAI from "openai";

const client = new OpenAI();
const automation = await client.beta.agents.automations.create({
  type: "periodic",
  name: "Check restaurant reservations",
  expression: "0 */2 * * *",
  timezone: "America/New_York",
  target: {
    type: "existing_session",
    session_id: "sess_123",
    instructions:
      "Check restaurant availability for our dinner plans. Compare with earlier checks and report newly available tables.",
  },
});
console.log(automation);
```

```python
from openai import OpenAI

client = OpenAI()
automation = client.beta.agents.automations.create(
    type="periodic",
    name="Check restaurant reservations",
    expression="0 */2 * * *",
    timezone="America/New_York",
    target={
        "type": "existing_session",
        "session_id": "sess_123",
        "instructions": (
            "Check restaurant availability for our dinner plans. "
            "Compare with earlier checks and report newly available tables."
        ),
    },
)
print(automation.to_json())
```

```go
import (
	"context"
	"fmt"

	"github.com/openai/openai-go/v3"
)

ctx := context.Background()
client := openai.NewClient()
automation, err := client.Beta.Agents.Automations.New(ctx,
	openai.BetaAgentAutomationNewParams{
		CreateAutomationParams: openai.AutomationScheduleParamUnion{
			OfParamPeriodic: &openai.AutomationScheduleParamPeriodic{
				Name:       "Check restaurant reservations",
				Expression: "0 */2 * * *",
				Timezone:   "America/New_York",
				Target: openai.AutomationTargetParamUnion{
					OfParamExistingSession: &openai.AutomationTargetParamExistingSession{
						SessionID:    "sess_123",
						Instructions: "Check restaurant availability for our dinner plans. Compare with earlier checks and report newly available tables.",
					},
				},
			},
		},
	})
if err != nil {
	panic(err)
}
fmt.Println(automation)
```

```java
import com.openai.client.OpenAIClient;
import com.openai.client.okhttp.OpenAIOkHttpClient;
import com.openai.models.beta.agents.automations.AutomationCreateParams;
import com.openai.models.beta.agents.automations.AutomationScheduleParam;
import com.openai.models.beta.agents.automations.AutomationTargetParam;

OpenAIClient client = OpenAIOkHttpClient.fromEnv();
var automation =
    client
        .beta()
        .agents()
        .automations()
        .create(
            AutomationCreateParams.builder()
                .automationScheduleParam(
                    AutomationScheduleParam.Periodic.builder()
                        .name("Check restaurant reservations")
                        .expression("0 */2 * * *")
                        .timezone("America/New_York")
                        .target(
                            AutomationTargetParam.ExistingSession.builder()
                                .sessionId("sess_123")
                                .instructions(
                                    "Check restaurant availability for our dinner plans. Compare with earlier checks and report newly available tables.")
                                .build())
                        .build())
                .build());
System.out.println(automation);
```

```csharp
using OpenAI;
using OpenAI.Agents;
#pragma warning disable OPENAI001

string key = Environment.GetEnvironmentVariable("OPENAI_API_KEY")!;
AgentClient client = new OpenAIClient(key).GetAgentClient();
AgentAutomation automation = await client.CreateAutomationAsync(
    new AgentAutomationCreationOptions
    {
        Type = AgentAutomationType.Periodic,
        Name = "Check restaurant reservations",
        Expression = "0 */2 * * *",
        Timezone = "America/New_York",
        Target = new ExistingSessionAutomationTarget
        {
            SessionId = "sess_123",
            Instructions = "Check restaurant availability for our dinner plans. Compare with earlier checks and report newly available tables.",
        },
    }
);
Console.WriteLine(automation.Id);
```

```ruby
require "openai"

client = OpenAI::Client.new
automation = client.beta.agents.automations.create(
  body: {
    type: "periodic",
    name: "Check restaurant reservations",
    expression: "0 */2 * * *",
    timezone: "America/New_York",
    target: {
      type: "existing_session",
      session_id: "sess_123",
      instructions: "Check restaurant availability for our dinner plans. Compare with earlier checks and report newly available tables."
    }
  }
)
puts automation
```

```bash
curl https://api.openai.com/v1/agents/automations \
  -H "OpenAI-Beta: agents=v1" \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "type": "periodic",
    "name": "Check restaurant reservations",
    "expression": "0 */2 * * *",
    "timezone": "America/New_York",
    "target": {
      "type": "existing_session",
      "session_id": "sess_123",
      "instructions": "Check restaurant availability for our dinner plans. Compare with earlier checks and report newly available tables."
    }
  }'
```


Each invocation delivers the saved instructions as an automation notification to the same session, using its current agent configuration and saved state. The notification is separate from a new user message.

If the session is working, delivery waits for it to become available. A scheduled run doesn't interrupt the active turn or supply a missing tool result or approval. Your application must still [handle required actions](https://developers.openai.com/api/docs/guides/agents-api/sessions/manage#handle-required-actions).

### Schedule one check

For a single follow-up, use `type: "once"` with `run_at`. The value must be an integer Unix timestamp in **seconds** that is in the future. Don't include `expression` or `timezone`.

Schedule a check at **January 1, 2027, at 9 AM UTC**:

Schedule an agent to run once

```javascript
import OpenAI from "openai";

const client = new OpenAI();
const automation = await client.beta.agents.automations.create({
  type: "once",
  name: "Check restaurant reply",
  run_at: 1798794000,
  target: {
    type: "existing_session",
    session_id: "sess_123",
    instructions:
      "Check whether the restaurant replied about our booking. Summarize any changes to the dinner plans.",
  },
});
console.log(automation);
```

```python
from openai import OpenAI

client = OpenAI()
automation = client.beta.agents.automations.create(
    type="once",
    name="Check restaurant reply",
    run_at=1798794000,
    target={
        "type": "existing_session",
        "session_id": "sess_123",
        "instructions": (
            "Check whether the restaurant replied about our booking. "
            "Summarize any changes to the dinner plans."
        ),
    },
)
print(automation.to_json())
```

```go
import (
	"context"
	"fmt"

	"github.com/openai/openai-go/v3"
)

ctx := context.Background()
client := openai.NewClient()
automation, err := client.Beta.Agents.Automations.New(ctx,
	openai.BetaAgentAutomationNewParams{
		CreateAutomationParams: openai.AutomationScheduleParamUnion{
			OfParamOnce: &openai.AutomationScheduleParamOnce{
				Name:  "Check restaurant reply",
				RunAt: 1798794000,
				Target: openai.AutomationTargetParamUnion{
					OfParamExistingSession: &openai.AutomationTargetParamExistingSession{
						SessionID:    "sess_123",
						Instructions: "Check whether the restaurant replied about our booking. Summarize any changes to the dinner plans.",
					},
				},
			},
		},
	})
if err != nil {
	panic(err)
}
fmt.Println(automation)
```

```java
import com.openai.client.OpenAIClient;
import com.openai.client.okhttp.OpenAIOkHttpClient;
import com.openai.models.beta.agents.automations.AutomationCreateParams;
import com.openai.models.beta.agents.automations.AutomationScheduleParam;
import com.openai.models.beta.agents.automations.AutomationTargetParam;

OpenAIClient client = OpenAIOkHttpClient.fromEnv();
var automation =
    client
        .beta()
        .agents()
        .automations()
        .create(
            AutomationCreateParams.builder()
                .automationScheduleParam(
                    AutomationScheduleParam.Once.builder()
                        .name("Check restaurant reply")
                        .runAt(1798794000L)
                        .target(
                            AutomationTargetParam.ExistingSession.builder()
                                .sessionId("sess_123")
                                .instructions(
                                    "Check whether the restaurant replied about our booking. Summarize any changes to the dinner plans.")
                                .build())
                        .build())
                .build());
System.out.println(automation);
```

```csharp
using OpenAI;
using OpenAI.Agents;
#pragma warning disable OPENAI001

string key = Environment.GetEnvironmentVariable("OPENAI_API_KEY")!;
AgentClient client = new OpenAIClient(key).GetAgentClient();
AgentAutomation automation = await client.CreateAutomationAsync(
    new AgentAutomationCreationOptions
    {
        Type = AgentAutomationType.Once,
        Name = "Check restaurant reply",
        RunAt = 1798794000,
        Target = new ExistingSessionAutomationTarget
        {
            SessionId = "sess_123",
            Instructions = "Check whether the restaurant replied about our booking. Summarize any changes to the dinner plans.",
        },
    }
);
Console.WriteLine(automation.Id);
```

```ruby
require "openai"

client = OpenAI::Client.new
automation = client.beta.agents.automations.create(
  body: {
    type: "once",
    name: "Check restaurant reply",
    run_at: 1798794000,
    target: {
      type: "existing_session",
      session_id: "sess_123",
      instructions: "Check whether the restaurant replied about our booking. Summarize any changes to the dinner plans."
    }
  }
)
puts automation
```

```bash
curl https://api.openai.com/v1/agents/automations \
  -H "OpenAI-Beta: agents=v1" \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "type": "once",
    "name": "Check restaurant reply",
    "run_at": 1798794000,
    "target": {
      "type": "existing_session",
      "session_id": "sess_123",
      "instructions": "Check whether the restaurant replied about our booking. Summarize any changes to the dinner plans."
    }
  }'
```


A completed one-time schedule has no more scheduled runs. You can still invoke it manually or create another automation for another scheduled follow-up.

## Let the agent schedule follow-ups

Add `automations` to the agent's tools so it can schedule work requested by the user. This example also enables subagents, so the main agent can delegate each scheduled task and keep a concise summary of the result:

Let agents schedule tasks

```javascript
import OpenAI from "openai";

const client = new OpenAI();
const session = await client.beta.agents.sessions.create({
  agent: {
    model: "gpt-6-astra",
    instructions:
      "Use automations to schedule tasks requested by the user. Delegate each scheduled task to a subagent and ask for a concise result. Keep the goal, schedule, and useful summaries in the main session. Adjust or stop schedules when the user asks.",
    tools: [{ type: "automations" }],
    multi_agent: { enabled: true },
  },
  environment: { type: "openai_hosted" },
  input:
    "Every day at 10 AM in America/New_York, review the goals we discuss here and suggest the next actions I could take.",
});
console.log(session.id);
```

```python
from openai import OpenAI

client = OpenAI()
session = client.beta.agents.sessions.create(
    agent={
        "model": "gpt-6-astra",
        "instructions": (
            "Use automations to schedule tasks requested by the user. "
            "Delegate each scheduled task to a subagent and ask for a concise result. "
            "Keep the goal, schedule, and useful summaries in the main session. "
            "Adjust or stop schedules when the user asks."
        ),
        "multi_agent": {"enabled": True},
        "tools": [{"type": "automations"}],
    },
    environment={"type": "openai_hosted"},
    input=(
        "Every day at 10 AM in America/New_York, review the goals we discuss here "
        "and suggest the next actions I could take."
    ),
)
print(session.id)
```

```go
import (
	"context"
	"fmt"

	"github.com/openai/openai-go/v3"
)

ctx := context.Background()
client := openai.NewClient()
session, err := client.Beta.Agents.Sessions.New(ctx,
	openai.BetaAgentSessionNewParams{
		Agent: openai.BetaAgentSessionNewParamsAgent{
			Model:        openai.String("gpt-6-astra"),
			Instructions: openai.String("Use automations to schedule tasks requested by the user. Delegate each scheduled task to a subagent and ask for a concise result. Keep the goal, schedule, and useful summaries in the main session. Adjust or stop schedules when the user asks."),
			MultiAgent: openai.MultiAgentConfigParam{
				Enabled: true,
			},
			Tools: []openai.AgentToolParamUnion{
				{OfParamAutomations: &openai.AgentToolParamAutomations{}},
			},
		},
		Environment: openai.EnvironmentParamUnion{
			OfParamOpenAIHosted: &openai.EnvironmentParamOpenAIHosted{},
		},
		Input: openai.BetaAgentSessionNewParamsInputUnion{
			OfString: openai.String("Every day at 10 AM in America/New_York, review the goals we discuss here and suggest the next actions I could take."),
		},
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
import com.openai.models.beta.agents.MultiAgentConfigParam;
import com.openai.models.beta.agents.sessions.SessionCreateParams;

OpenAIClient client = OpenAIOkHttpClient.fromEnv();
var session =
    client
        .beta()
        .agents()
        .sessions()
        .create(
            SessionCreateParams.builder()
                .agent(
                    SessionCreateParams.Agent.builder()
                        .model("gpt-6-astra")
                        .instructions(
                            "Use automations to schedule tasks requested by the user. Delegate each scheduled task to a subagent and ask for a concise result. Keep the goal, schedule, and useful summaries in the main session. Adjust or stop schedules when the user asks.")
                        .multiAgent(MultiAgentConfigParam.builder().enabled(true).build())
                        .addToolAutomations()
                        .build())
                .environment(EnvironmentParam.OpenAIHosted.builder().build())
                .input(
                    "Every day at 10 AM in America/New_York, review the goals we discuss here and suggest the next actions I could take.")
                .build());
System.out.println(session.id());
```

```csharp
using OpenAI;
using OpenAI.Agents;
#pragma warning disable OPENAI001

string key = Environment.GetEnvironmentVariable("OPENAI_API_KEY")!;
AgentClient client = new OpenAIClient(key).GetAgentClient();
AgentSession session = await client.CreateAgentSessionAsync(
    new AgentSessionCreationOptions
    {
        Agent = new SessionAgentConfigParam
        {
            Model = "gpt-6-astra",
            Instructions = "Use automations to schedule tasks requested by the user. Delegate each scheduled task to a subagent and ask for a concise result. Keep the goal, schedule, and useful summaries in the main session. Adjust or stop schedules when the user asks.",
            MultiAgent = new MultiAgentConfigParam { Enabled = true },
            Tools = [new AgentToolConfigParamAutomations()],
        },
        Environment = new EnvironmentParamOpenaiHosted(),
        Input =
        [
            new InputMessageParam(
                [new InputContentParamInputText("Every day at 10 AM in America/New_York, review the goals we discuss here and suggest the next actions I could take.")]
            ),
        ],
    }
);
Console.WriteLine(session.Id);
```

```ruby
require "openai"

client = OpenAI::Client.new
session = client.beta.agents.sessions.create(
  agent: {
    model: "gpt-6-astra",
    instructions: "Use automations to schedule tasks requested by the user. Delegate each scheduled task to a subagent and ask for a concise result. Keep the goal, schedule, and useful summaries in the main session. Adjust or stop schedules when the user asks.",
    multi_agent: { enabled: true },
    tools: [{ type: "automations" }]
  },
  environment: { type: "openai_hosted" },
  input: "Every day at 10 AM in America/New_York, review the goals we discuss here and suggest the next actions I could take."
)
puts session.id
```

```bash
curl https://api.openai.com/v1/agents/sessions \
  -H "OpenAI-Beta: agents=v1" \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "agent": {
      "model": "gpt-6-astra",
      "instructions": "Use automations to schedule tasks requested by the user. Delegate each scheduled task to a subagent and ask for a concise result. Keep the goal, schedule, and useful summaries in the main session. Adjust or stop schedules when the user asks.",
      "tools": [{ "type": "automations" }],
      "multi_agent": { "enabled": true }
    },
    "environment": {
      "type": "openai_hosted"
    },
    "input": "Every day at 10 AM in America/New_York, review the goals we discuss here and suggest the next actions I could take."
  }'
```


This lets the agent create, list, get, update, pause, resume, and delete its own automations. The Agents API sets the current session as the target. The agent can create one-time or periodic runs, but it can't use these tools to start a new session or manage another session's automations.

The tools can access only automations created by the agent in the current session. Your application can manage those automations through the API, alongside automations it created itself. The Agents API records the creator in `created_by`; don't send that field in a create request.

The tool is absent by default. Your application can schedule work without enabling it. Removing the tool from an agent's configuration doesn't delete saved schedules; pause or delete them through the API when needed.

### Keep repeated work out of the main context

For ongoing goals, [enable multi-agent orchestration](https://developers.openai.com/api/docs/guides/agents-api/multi-agent#enable-multi-agent-orchestration) with `agent.multi_agent.enabled: true`. Ask the main agent to keep the goal and schedule, delegate each task to a subagent, and retain a short result. This keeps detailed tool output from repeated checks out of the main session's context window.

For example, include this in the main agent's instructions:

> Delegate each scheduled task to a subagent. Give it the goal and relevant prior findings, and ask for a concise result. Review that result, keep the useful summary, and decide whether to continue, change, or stop the schedule.

The `automations` tool manages schedules. Keep the other tools and data access the agent needs to do the scheduled work.

## Schedule onboarding follow-ups from your app

Your application can also create schedules in response to its own events. For example, when a user signs up, start an onboarding session and schedule its first follow-up for 48 hours later:

Schedule an onboarding follow-up

```javascript
import OpenAI from "openai";

const client = new OpenAI();
const automation = await client.beta.agents.automations.create({
  type: "once",
  name: "Onboarding follow-up",
  run_at: Math.floor(Date.now() / 1000) + 48 * 60 * 60,
  target: {
    type: "existing_session",
    session_id: "sess_123",
    instructions:
      "Review onboarding progress and send the next onboarding message if the user has not completed onboarding.",
  },
});
console.log(automation);
```

```python
import time

from openai import OpenAI

client = OpenAI()
automation = client.beta.agents.automations.create(
    type="once",
    name="Onboarding follow-up",
    run_at=int(time.time()) + 48 * 60 * 60,
    target={
        "type": "existing_session",
        "session_id": "sess_123",
        "instructions": (
            "Review onboarding progress and send the next onboarding message "
            "if the user has not completed onboarding."
        ),
    },
)
print(automation.to_json())
```

```go
import (
	"context"
	"fmt"
	"time"

	"github.com/openai/openai-go/v3"
)

ctx := context.Background()
client := openai.NewClient()
automation, err := client.Beta.Agents.Automations.New(ctx,
	openai.BetaAgentAutomationNewParams{
		CreateAutomationParams: openai.AutomationScheduleParamUnion{
			OfParamOnce: &openai.AutomationScheduleParamOnce{
				Name:  "Onboarding follow-up",
				RunAt: time.Now().Add(48 * time.Hour).Unix(),
				Target: openai.AutomationTargetParamUnion{
					OfParamExistingSession: &openai.AutomationTargetParamExistingSession{
						SessionID:    "sess_123",
						Instructions: "Review onboarding progress and send the next onboarding message if the user has not completed onboarding.",
					},
				},
			},
		},
	})
if err != nil {
	panic(err)
}
fmt.Println(automation)
```

```java
import com.openai.client.OpenAIClient;
import com.openai.client.okhttp.OpenAIOkHttpClient;
import com.openai.models.beta.agents.automations.AutomationCreateParams;
import com.openai.models.beta.agents.automations.AutomationScheduleParam;
import com.openai.models.beta.agents.automations.AutomationTargetParam;
import java.time.Duration;
import java.time.Instant;

OpenAIClient client = OpenAIOkHttpClient.fromEnv();
var automation =
    client
        .beta()
        .agents()
        .automations()
        .create(
            AutomationCreateParams.builder()
                .automationScheduleParam(
                    AutomationScheduleParam.Once.builder()
                        .name("Onboarding follow-up")
                        .runAt(Instant.now().plus(Duration.ofHours(48)).getEpochSecond())
                        .target(
                            AutomationTargetParam.ExistingSession.builder()
                                .sessionId("sess_123")
                                .instructions(
                                    "Review onboarding progress and send the next onboarding message if the user has not completed onboarding.")
                                .build())
                        .build())
                .build());
System.out.println(automation);
```

```csharp
using OpenAI;
using OpenAI.Agents;
#pragma warning disable OPENAI001

string key = Environment.GetEnvironmentVariable("OPENAI_API_KEY")!;
AgentClient client = new OpenAIClient(key).GetAgentClient();
AgentAutomation automation = await client.CreateAutomationAsync(
    new AgentAutomationCreationOptions
    {
        Type = AgentAutomationType.Once,
        Name = "Onboarding follow-up",
        RunAt = DateTimeOffset.UtcNow.AddHours(48).ToUnixTimeSeconds(),
        Target = new ExistingSessionAutomationTarget
        {
            SessionId = "sess_123",
            Instructions = "Review onboarding progress and send the next onboarding message if the user has not completed onboarding.",
        },
    }
);
Console.WriteLine(automation.Id);
```

```ruby
require "openai"

client = OpenAI::Client.new
automation = client.beta.agents.automations.create(
  body: {
    type: "once",
    name: "Onboarding follow-up",
    run_at: Time.now.to_i + 48 * 60 * 60,
    target: {
      type: "existing_session",
      session_id: "sess_123",
      instructions: "Review onboarding progress and send the next onboarding message if the user has not completed onboarding."
    }
  }
)
puts automation
```

```bash
RUN_AT=$(($(date +%s) + 48 * 60 * 60))

curl https://api.openai.com/v1/agents/automations \
  -H "OpenAI-Beta: agents=v1" \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -H "Content-Type: application/json" \
  -d @- <<EOF
{
    "type": "once",
    "name": "Onboarding follow-up",
    "run_at": $RUN_AT,
    "target": {
      "type": "existing_session",
      "session_id": "sess_123",
      "instructions": "Review onboarding progress and send the next onboarding message if the user has not completed onboarding."
    }
  }
EOF
```


After each completed follow-up, your application can schedule another one 48 hours later. Stop when onboarding is complete or the user opts out, and delete any pending follow-up. Use one-time schedules for this interval; a cron day-of-month expression doesn't represent a repeating 48-hour interval across month boundaries.

The onboarding agent needs access to onboarding progress and the application's messaging tools. Creating the automation schedules the work; it doesn't send the message immediately.

## Try a run and inspect delivery

To test a saved automation immediately, send `POST /v1/agents/automations/auto_123/invocations` with no request body. A manual invocation doesn't change the saved schedule or consume a one-time scheduled run. It also works while the schedule is paused.

Save the returned invocation ID. Retrieve it with `GET /v1/agents/automations/auto_123/invocations/ainv_123`, or list delivery history with `GET /v1/agents/automations/auto_123/invocations`.

For an overview of past runs, list the automation's invocations:

Monitor automation invocations

```javascript
import OpenAI from "openai";

const client = new OpenAI();
for await (const invocation of client.beta.agents.automations.invocations.list(
  "auto_123"
)) {
  console.log(invocation.id, invocation.status, invocation.session_id);
}
```

```python
from openai import OpenAI

client = OpenAI()
invocations = client.beta.agents.automations.invocations.list(automation_id="auto_123")
for invocation in invocations:
    print(invocation.id, invocation.status, invocation.session_id)
```

```go
import (
	"context"
	"fmt"

	"github.com/openai/openai-go/v3"
)

ctx := context.Background()
client := openai.NewClient()
invocations := client.Beta.Agents.Automations.Invocations.ListAutoPaging(ctx, "auto_123",
	openai.BetaAgentAutomationInvocationListParams{})
for invocations.Next() {
	invocation := invocations.Current()
	fmt.Println(invocation.ID, invocation.Status, invocation.SessionID)
}
if err := invocations.Err(); err != nil {
	panic(err)
}
```

```java
import com.openai.client.OpenAIClient;
import com.openai.client.okhttp.OpenAIOkHttpClient;
import com.openai.models.beta.agents.automations.invocations.InvocationListParams;

OpenAIClient client = OpenAIOkHttpClient.fromEnv();
var invocations =
    client
        .beta()
        .agents()
        .automations()
        .invocations()
        .list(InvocationListParams.builder().automationId("auto_123").build());
for (var invocation : invocations.autoPager()) {
  System.out.println(
      invocation.id() + " " + invocation.status() + " " + invocation.sessionId());
}
```

```csharp
using OpenAI;
using OpenAI.Agents;
#pragma warning disable OPENAI001

string key = Environment.GetEnvironmentVariable("OPENAI_API_KEY")!;
AgentClient client = new OpenAIClient(key).GetAgentClient();
await foreach (AgentAutomationInvocation invocation in client.GetAutomationInvocationsAsync("auto_123"))
{
    Console.WriteLine($"{invocation.Id} {invocation.Status} {invocation.SessionId}");
}
```

```ruby
require "openai"

client = OpenAI::Client.new
invocations = client.beta.agents.automations.invocations.list("auto_123")
invocations.auto_paging_each do |invocation|
  puts "#{invocation.id} #{invocation.status} #{invocation.session_id}"
end
```

```bash
curl https://api.openai.com/v1/agents/automations/auto_123/invocations \
  -H "OpenAI-Beta: agents=v1" \
  -H "Authorization: Bearer $OPENAI_API_KEY"
```


The history contains invocations already created, but it does not include every future occurrence. Inspect these fields:

| Field          | What to check                                                                                              |
| -------------- | ---------------------------------------------------------------------------------------------------------- |
| `status`       | Starts as `queued`; becomes `completed` when delivery succeeds.                                            |
| `session_id`   | The value identifies the session to follow after delivery and can be `null` before a session is available. |
| `source.type`  | `manual` for a manual invocation or `automation` for a scheduled run.                                      |
| `scheduled_at` | The intended scheduled time, or `null` for a manual invocation.                                            |

**A completed delivery doesn't mean the agent has completed its work.** For a new session, it means the session accepted its initial input. For an existing session, it means the session accepted the notification and the request to start work.

Use the invocation's `session_id` to [follow session events](https://developers.openai.com/api/docs/guides/agents-api/sessions/events) and inspect the turn's outcome.

The automation schedules the work. Your application displays session output and sends any notifications to the user.

## Change or stop a schedule

Retrieve an automation with `GET /v1/agents/automations/auto_123`. List your project's automations with `GET /v1/agents/automations`; add `session_id=sess_123` to find automations targeting an existing session.

Update the cron expression to move a recurring check to 11 AM:

Change a schedule

```javascript
import OpenAI from "openai";

const client = new OpenAI();
const automation = await client.beta.agents.automations.update("auto_123", {
  expression: "0 11 * * *",
});
console.log(automation);
```

```python
from openai import OpenAI

client = OpenAI()
automation = client.beta.agents.automations.update(
    automation_id="auto_123",
    expression="0 11 * * *",
)
print(automation.to_json())
```

```go
import (
	"context"
	"fmt"

	"github.com/openai/openai-go/v3"
)

ctx := context.Background()
client := openai.NewClient()
automation, err := client.Beta.Agents.Automations.Update(ctx, "auto_123",
	openai.BetaAgentAutomationUpdateParams{
		Expression: openai.String("0 11 * * *"),
	})
if err != nil {
	panic(err)
}
fmt.Println(automation)
```

```java
import com.openai.client.OpenAIClient;
import com.openai.client.okhttp.OpenAIOkHttpClient;
import com.openai.models.beta.agents.automations.AutomationUpdateParams;

OpenAIClient client = OpenAIOkHttpClient.fromEnv();
var automation =
    client
        .beta()
        .agents()
        .automations()
        .update(
            AutomationUpdateParams.builder()
                .automationId("auto_123")
                .expression("0 11 * * *")
                .build());
System.out.println(automation);
```

```csharp
using OpenAI;
using OpenAI.Agents;
#pragma warning disable OPENAI001

string key = Environment.GetEnvironmentVariable("OPENAI_API_KEY")!;
AgentClient client = new OpenAIClient(key).GetAgentClient();
AgentAutomation automation = await client.UpdateAutomationAsync(
    "auto_123",
    new AgentAutomationUpdateOptions { Expression = "0 11 * * *" }
);
Console.WriteLine(automation.Id);
```

```ruby
require "openai"

client = OpenAI::Client.new
automation = client.beta.agents.automations.update(
  "auto_123",
  expression: "0 11 * * *"
)
puts automation
```

```bash
curl https://api.openai.com/v1/agents/automations/auto_123 \
  -H "OpenAI-Beta: agents=v1" \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "expression": "0 11 * * *"
  }'
```


Omitted fields stay unchanged. A supplied `target` replaces the whole target, so include all its required fields and retain its type. Update reminder text in `target.instructions` or initial messages in `target.input`. An agent-created automation must retain its creator session as the target.

Make changes before the next scheduled time. Updates apply to future invocations; an invocation that is already queued keeps the target and input saved when it was created.

Use the following operations without a request body:

| Goal                   | Operation                                     | Effect                                                                   |
| ---------------------- | --------------------------------------------- | ------------------------------------------------------------------------ |
| Pause scheduled work.  | `POST /v1/agents/automations/auto_123/pause`  | Holds pending scheduled deliveries; manual invocation remains available. |
| Resume scheduled work. | `POST /v1/agents/automations/auto_123/resume` | Reactivates the saved schedule.                                          |
| Remove the schedule.   | `DELETE /v1/agents/automations/auto_123`      | Prevents future scheduled and manual invocations.                        |

Pausing or deleting an automation doesn't stop work already accepted by a session or delete the session. A delivery already in progress may still reach its session. To stop current work, [cancel its active turn](https://developers.openai.com/api/docs/guides/agents-api/sessions#cancel-an-active-turn).

If a one-time automation's scheduled time passes while it is paused, set a new future `run_at` before resuming. A completed one-time automation can't be paused or resumed; create another automation for another scheduled follow-up.