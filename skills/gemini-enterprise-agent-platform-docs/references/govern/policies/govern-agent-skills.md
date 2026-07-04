> [!WARNING]
> **Preview**
>
>
> This feature is subject to the "Pre-GA Offerings Terms" in the General Service
> Terms section of the
> [Service Specific Terms](https://cloud.google.com/terms/service-terms#1)
> and the
> [Generative AI Service Specific Terms](https://cloud.google.com/terms/service-terms#20),
> as well as the
> [Additional Terms
> for Generative AI Preview Products](https://cloud.google.com/trustedtester/aitos?e=48754805).
>
>
> When you use this feature with AI Agents, the terms applicable to AI Agents in the Agreement apply.
>
>
> Pre-GA features are available "as is" and might have limited support. For more
> information, see the
> [launch stage descriptions](https://cloud.google.com/products/#product-launch-stages).

> [!NOTE]
> **Note:** Semantic Governance Policy is a Generative AI Service that uses an LLM to implement natural language policies. LLMs are probabilistic and can make mistakes. Verdicts may not be accurate.

> [!NOTE]
> **Note:** This feature does not support VPC-SC.

An agent can access numerous tools using Model Context Protocol (MCP) servers,
enterprise APIs, or custom scripts. Exposing an agent to a very large number of
tool descriptions at once can lead to context bloat, which increases token
costs, latency, and can degrade the LLM's reasoning performance.

To optimize performance, you can use **[Agent Skills](https://agentskills.io/)**
(a standard for packaging tools and procedure descriptions) to implement
progressive disclosure of tools. Instead of placing the entire tool catalog in
the context, the agent is exposed to a small set of skills initially. The LLM
directs the agent to load specific skill packages dynamically when they become
relevant.

## Governing the skill lifecycle

Because loading and managing skills uses tool calls, SGP can govern the entire skill lifecycle. If your agent is built using
the Google Agent Development Kit (ADK), it employs the following core tools to
manage skills:

| ADK Skill Tool | Description |
|---|---|
| `list_skills` | Displays all available skill packages to the model. |
| `load_skill` | Imports a specific skill and its associated tools into the current context dynamically. |
| `load_skill_resource` | Retrieves necessary data or assets for a skill's operation. |
| `run_skill_script` | Executes the underlying logic defined within the skill. |

SGP intercepts these skill-management tool calls and evaluates them against your
Natural Language Constraints (NLC). This lets you apply constraints to
control which skills are loaded under specific conditions.

## Examples: Skill and tool lifecycle policies

The following examples show how SGP can defend against security risks in the skill
lifecycle, such as instruction injection or supply-chain compromise.

### Prevent loading tools in tainted sessions

**Scenario:** An agent is authorized to load and run skills. An administrator
wants to prevent the agent from loading tools that perform outbound actions if
the chat history contains untrusted context that could contain injected
instructions. For example, an agent might load a `send_email`
tool after it scraped web content.

- **Constraint:** *"Do not load any skill that can send messages or write to external systems if the current chat history contains content fetched from inbound email, web pages, or uploaded documents."*
- **Logic:** When the LLM proposes calling `load_skill(skill_name='send_email')`, SGP inspects the chat history. If an earlier turn fetched untrusted data (for example, email content), SGP denies the `load_skill` call. As a result, the outbound tools packaged in that skill never become available to the agent during that session.

### Limit dependency installations (supply chain)

**Scenario:** A development agent uses a skill to install packages. An attacker
with access to the skill repository modifies the instructions to always install a
malicious package along with the requested dependencies.

- **Constraint:** *"Only allow the npm_install tool to run for packages on the approved list: react, express, lodash, or axios."*
- **Logic:** When the LLM proposes a tool call like `npm_install(packages=['lodash', 'malicious-agent-helper'])`, SGP inspects the arguments. Because `malicious-agent-helper` is not on the allowlist, SGP issues a `DENY` verdict, blocking the action before execution.

## What's next

- Author effective rules in [Best practices for authoring constraints](https://docs.cloud.google.com/gemini-enterprise-agent-platform/govern/policies/best-practices).
- Configure policies in [Configure semantic governance policies](https://docs.cloud.google.com/gemini-enterprise-agent-platform/govern/policies/configure-semantic-governance).
