> [!NOTE]
> To see an example of using Anthropic's Claude model on Agent Platform,
> run the "Use Anthropic's Claude model on Agent Platform" notebook in one of the following
> environments:
>
> [!Open in Colab](https://colab.research.google.com/github/GoogleCloudPlatform/vertex-ai-samples/blob/main/notebooks/official/generative_ai/anthropic_claude_3_intro.ipynb)
>
>
> \|
>
> [!Open in Colab Enterprise](https://console.cloud.google.com/agent-platform/colab/import/https%3A%2F%2Fraw.githubusercontent.com%2FGoogleCloudPlatform%2Fvertex-ai-samples%2Fmain%2Fnotebooks%2Fofficial%2Fgenerative_ai%2Fanthropic_claude_3_intro.ipynb)
>
>
> \|
>
> [!Open
> in Agent Platform Workbench](https://console.cloud.google.com/agent-platform/workbench/deploy-notebook?download_url=https://raw.githubusercontent.com/GoogleCloudPlatform/vertex-ai-samples/main/notebooks/official/generative_ai/anthropic_claude_3_intro.ipynb)
>
>
> \|
>
> [!View on GitHub](https://github.com/GoogleCloudPlatform/vertex-ai-samples/blob/main/notebooks/official/generative_ai/anthropic_claude_3_intro.ipynb)

The Anthropic Claude models on Gemini Enterprise Agent Platform offer fully managed and
serverless models as APIs. To use a Claude model on Agent Platform, send
a request directly to the Agent Platform API endpoint. Because the Anthropic
Claude models use a managed API, there's no need to provision or manage
infrastructure.

You can stream your Claude responses to reduce the end-user latency perception.
A streamed response uses server-sent events (SSE) to incrementally stream the
response.

You pay for Claude models as you use them (pay as you go), or you pay a fixed
fee when using [provisioned
throughput](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/provisioned-throughput). For
pay-as-you-go pricing, see [Anthropic Claude models on the Gemini Enterprise Agent Platform
pricing page](https://cloud.google.com/gemini-enterprise-agent-platform/generative-ai/pricing#partner-models).

## Available Claude models

> [!IMPORTANT]
> **Important:** Accessing Claude models through Agent Platform meets the FedRAMP High requirements, and operates within the Google Cloud FedRAMP High authorization boundary.

The following models are available from Anthropic to use in Gemini Enterprise Agent Platform. To
access a Claude model, go to its Model Garden model card.

Anthropic's Claude models support Agent Platform request-response
logging. Enable 30-day request-response logging of your prompt and completion
activity to track any model misuse by your users. For more information, see [Log
requests and responses](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/capabilities/request-response-logging).

### Claude Sonnet 5

Claude Sonnet 5 is our most capable Sonnet model yet, built for coding,
agents, and professional work at scale.

**Retirement Date:** Not sooner than December 24, 2026.

- **Agents**: Claude Sonnet 5 can operate as both a lead-agent and sub-agent in production pipelines, with reliable tool use and the cost profile to run high-volume agentic workloads at scale.
- **Coding**: Claude Sonnet 5 is built for everyday development work: building features, refactoring, and debugging across complex codebases without losing quality.
- **Enterprise workflows**: Users need fewer rounds of editing to reach production-ready documents, spreadsheets, and presentations. Perfect for teams that need a reliable, everyday model for office tasks.
- **Financial analysis**: Claude Sonnet 5 pairs general intelligence improvements with stronger analysis and spreadsheet work, fitting high-volume financial workflows where precision and iteration speed matter.
- **Computer use**: Claude Sonnet 5 is our most efficient computer-use model, making browser automation cost-effective enough to deploy across business tools at scale.

[Go to the Claude Sonnet 5 model card](https://console.cloud.google.com/agent-platform/publishers/anthropic/model-garden/claude-sonnet-5)

### Claude Fable 5

Claude Fable 5 is optimized for autonomous knowledge work and coding, handling long-running, complex, and asynchronous tasks.

**Retirement Date:** Not sooner than June 8, 2027.

- **Long-running agents**: Run Claude Fable 5 in an agent harness like Claude Code or Claude Managed Agents and it can work for days at a time: planning across stages, delegating to sub-agents, and checking its own work.
- **Coding**: Claude Fable 5 is our most capable model for ambitious coding projects, including large migrations, complex implementations, and multi-day autonomous sessions. It can write its own tests to verify its work, implements designs with high fidelity, and uses vision to check outputs against goals.
- **Enterprise workflows**: Claude Fable 5 handles complex, multi-stage knowledge work with minimal oversight, from deep research and analysis to finished deliverables. Teams can hand off large projects and review completed work rather than supervising every step.
- **Financial analysis**: Claude Fable 5 brings deeper reasoning and best-in-class vision to financial workflows, reading dense filings, charts, and tables nested in PDFs at high fidelity. It supports investment research, earnings analysis, credit and risk review, and compliance workflows.
- **Vision**: Claude Fable 5 understands diagrams, charts, and tables nested in files and PDFs, improving document-heavy work in finance, legal, analytics, and architecture. It also uses vision to verify its own work, checking outputs against the original design or goal.
- **Computer use**: Claude Fable 5 is our most capable computer use model, pairing improved vision with deep reasoning for multi-step tasks that span multiple applications and require planning and judgment, including verifying and testing the same applications it creates.

[Go to the Claude Fable 5 model card](https://console.cloud.google.com/agent-platform/publishers/anthropic/model-garden/claude-fable-5)

### Claude Opus 4.8

Claude Opus 4.8 is a high-intelligence Opus model built for coding and agents, featuring deep reasoning for enterprise workflows.

**Retirement Date:** Not sooner than May 28, 2027.

- **Coding**: Claude Opus 4.8 is an advanced coding model for real-world work, and runs independently for longer than previous Opus models. It reads codebases like a subject matter expert and plans before it edits. On long, multi-stage tasks it keeps track of dependencies, gets unstuck on its own, and persists over hours with stronger memory and longer context.
- **Enterprise workflows**: Claude Opus 4.8 is built for scalable workflows. It is better at following instructions, staying in scope, and producing professional-grade outputs. It reasons across long documents, checks its work, and manages multi-stage projects end-to-end with professional polish on spreadsheets, slides, and docs.
- **Long-running agents**: Claude Opus 4.8 sets a new bar for agentic workflows, pairing improved tool use with creative problem-solving across multi-step tasks. It is designed to work independently for longer, unblocking itself across multi-stage projects and complex dependency chains with minimal oversight.
- **Financial analysis**: Claude Opus 4.8 brings deeper reasoning and precision to financial workflows like investment research and earnings analysis, reading dense filings and charts at high fidelity and carrying context across an entire reporting cycle.
- **Cybersecurity**: Claude Opus 4.8 brings deeper reasoning to security workflows like threat intelligence synthesis, vulnerability finding, alert triage, and incident response. It holds long traces and large codebases in context to help catch subtle patterns and complex attack vectors.
- **Computer use**: Claude Opus 4.8 is a highly capable model for computer-use tasks, pairing improved vision with deep reasoning for multi-step tasks that span multiple applications and require planning and judgment.

[Go to the Claude Opus 4.8 model card](https://console.cloud.google.com/agent-platform/publishers/anthropic/model-garden/claude-opus-4-8)

### Claude Opus 4.7

Claude Opus 4.7 is optimized for coding, enterprise agents, and
professional work.

**Retirement Date:** Not sooner than April 16, 2027.

- **Coding**: Claude Opus 4.7 is built for agentic coding at scale, excelling at long-horizon projects, complex implementations, and polished UI design. It handles the full lifecycle from architecture to deployment, including design-quality UI so senior engineers can delegate complex work with confidence.
- **Enterprise workflows**: Claude Opus 4.7 sets the standard for enterprise workflows, carrying context across sessions to manage complex, multi-day projects end-to-end with professional polish and industry-leading performance on spreadsheets, slides, and docs.
- **Long-running agents**: Claude Opus 4.7 powers production agentic workflows, orchestrating complex multi-tool tasks with industry-leading reliability. It plans deliberately, uses memory to learn across sessions, and drives long-running work forward with minimal oversight.
- **Financial analysis**: Claude Opus 4.7 brings frontier reasoning to financial workflows, reading dense filings and charts at high fidelity and carrying context across an entire deal or reporting cycle. It handles the nuance and precision that compliance-sensitive work demands.
- **Cybersecurity**: Claude Opus 4.7 advances reasoning for security workflows, holding long traces and large codebases in context to catch subtle patterns and complex attack vectors.
- **Computer use**: Claude Opus 4.7 is our most capable production model for computer-use, bringing high-resolution vision and deep reasoning to multi-step tasks that span multiple applications and require planning and judgment.

[Go to the Claude Opus 4.7 model card](https://console.cloud.google.com/agent-platform/publishers/anthropic/model-garden/claude-opus-4-7)

### Claude Sonnet 4.6

Claude Sonnet 4.6 delivers frontier intelligence at scale---built for
coding, agents, and enterprise workflows.

- **Long-running agents**: Power production-ready assistants for multi-step, real-time applications---from customer support automation to complex operational workflows that require peak accuracy, intelligence, and speed.
- **Coding**: Handle everyday development tasks with enhanced performance---or plan and execute complex software projects spanning hours or days---with the ability to save, maintain, and reference information across multiple sessions.
- **Cybersecurity**: Deploy agents that autonomously patch vulnerabilities before exploitation---shifting from reactive detection to proactive defense.
- **Financial analysis**: Conduct entry-level financial analysis, deliver advanced predictive analysis, or preemptively develop intelligent risk management strategies that leverage best-in-class domain knowledge.
- **Computer use**: Claude Sonnet 4.6 is a highly accurate model for computer use, enabling developers to direct Claude to use computers the way people do.
- **Business tasks**: Generate and edit office files like slides, documents, and spreadsheets with minimal input.
- **Research**: Perform focused analysis across multiple data sources, turning expert analysis into final deliverables. Ideal for complex problem solving, rapid business intelligence, and real-time decision support.

[Go to the Claude Sonnet 4.6 model card](https://console.cloud.google.com/agent-platform/publishers/anthropic/model-garden/claude-sonnet-4-6)

### Claude Opus 4.6

Claude Opus 4.6 is optimized for coding, enterprise agents, and professional work.

**Retirement Date:** Not sooner than February 5, 2027.

- **Long-running agents:** Power production-ready assistants for multi-step, real-time applications---from customer support automation to complex operational workflows that require peak accuracy, intelligence, and speed.
- **Coding:** Handle everyday development tasks with enhanced performance---or plan and execute complex software projects spanning hours or days---with the ability to save, maintain, and reference information across multiple sessions.
- **Cybersecurity:** Deploy agents that autonomously patch vulnerabilities before exploitation---shifting from reactive detection to proactive defense.
- **Financial analysis:** Conduct entry-level financial analysis, deliver advanced predictive analysis, or preemptively develop intelligent risk management strategies that leverage best-in-class domain knowledge.
- **Computer use:** Claude Opus 4.6 is a highly accurate model for computer use, enabling developers to direct Claude to use computers the way people do.
- **Business tasks:** Generate and edit office files like slides, documents, and spreadsheets with minimal input.
- **Research:** Perform focused analysis across multiple data sources, turning expert analysis into final deliverables. Ideal for complex problem solving, rapid business intelligence, and real-time decision support.

[Go to the Claude Opus 4.6 model card](https://console.cloud.google.com/agent-platform/publishers/anthropic/model-garden/claude-opus-4-6)

### Claude Opus 4.5

Claude Opus 4.5 is optimized for coding, agents, computer use, and enterprise workflows.

**Retirement Date:** Not sooner than Nov 24, 2026.

- **Agents**: Claude Opus 4.5, paired with our advanced tool use capabilities, enables more capable agents with new behaviors.
- **Coding**: Opus 4.5 can confidently deliver multi-day software development projects in hours, working independently with the technical depth and taste to create efficient and straightforward solutions. It has improved performance across coding languages, with better planning and architecture choices---making it the ideal model for enterprise developers.
- **Enterprise workflows**: Opus 4.5 can power agents that manage sprawling professional projects from start to finish. It better leverages memory to maintain context and consistency across files, alongside a step-change improvement in creating spreadsheets, slides, and docs.
- **Financial analysis**: Opus 4.5 connects the dots across complex information systems---regulatory filings, market reports, internal data---making sophisticated predictive modeling and proactive compliance possible.
- **Cybersecurity**: Opus 4.5 brings professional-grade analysis to security workflows, correlating logs, vulnerability databases, and threat intelligence for proactive threat detection and automated incident response.
- **Computer use**: A highly capable computer-use model, Claude Opus 4.5 navigates new experiences with confident, consistent approaches that deliver more human-like browsing, enabling better web QA, workflow automation, and advanced user experiences.

[Go to the Claude Opus 4.5 model card](https://console.cloud.google.com/agent-platform/publishers/anthropic/model-garden/claude-opus-4-5)

### Claude Sonnet 4.5

Claude Sonnet 4.5 is Anthropic's Sonnet-class model for powering
real-world agents, with industry leading capabilities around coding, computer
use, cybersecurity, and working with office files like spreadsheets.

**Retirement Date:** Not sooner than Sept 29, 2026.

- **Long-running agents**: Power production-ready assistants for multi-step, real-time applications, from customer support automation to complex operational workflows that require peak accuracy, intelligence, and speed.
- **Coding**: Handle everyday development tasks with enhanced performance - or plan and execute complex software projects spanning hours or days - with the ability to save, maintain, and reference information across multiple sessions.
- **Cybersecurity**: Deploy agents that autonomously patch vulnerabilities before exploitation, shifting from reactive detection to proactive defense.
- **Financial analysis**: Conduct entry-level financial analysis, deliver advanced predictive analysis, or preemptively develop intelligent risk management strategies that leverage best-in-class domain knowledge.
- **Computer use**: A highly accurate model for computer use, enabling developers to direct the model to use computers the way people do.
- **Business tasks**: Generate and edit office files like slides, documents, and spreadsheets with minimal input.
- **Research**: Perform focused analysis across multiple data sources, turning expert analysis into final deliverables. Ideal for complex problem solving, rapid business intelligence, and real-time decision support.

[Go to the Claude Sonnet 4.5 model card](https://console.cloud.google.com/agent-platform/publishers/anthropic/model-garden/claude-sonnet-4-5)

### Claude Opus 4.1

Claude Opus 4.1 is Anthropic's Opus-class model and an industry
leader for coding and agent capabilities, especially agentic search. It excels
for customers needing frontier intelligence:

**Retirement Date:** Not sooner than Aug 5, 2026.

- **AI agents**: Enable AI agents to complete complex, multi-step tasks with precision and reliability.
- **Agentic search and analysis**: Connect to multiple data sources to synthesize information and insights across different repositories.
- **Expert-level coding**: Plan and execute complex coding tasks end-to-end, maintaining high-quality code that is consistent with your style.
- **Virtual collaboration**: Use the sustained reasoning capabilities to unlock new use cases involving long-horizon tasks and long chains of actions.
- **Content creation**: Generate content with human-quality, natural prose. Create long-form content, technical documentation, marketing copy, and front-end design mockups.
- **Long context and memory**: Incorporates memory capabilities that allow it to effectively summarize and reference previous interactions.

[Go to the Claude Opus 4.1 model card](https://console.cloud.google.com/agent-platform/publishers/anthropic/model-garden/claude-opus-4-1)

### Claude Haiku 4.5

Claude Haiku 4.5 delivers near-frontier performance for a wide range of
use cases, and is a highly capable coding model---with the
right speed and cost to power free products and high-volume user experiences.

**Retirement Date:** Not sooner than Oct 15, 2026.

- **Free tier user experiences**: Claude Haiku 4.5 delivers near-frontier performance at a cost and speed that makes free agent products and agentic use cases economically viable at scale.
- **Latency-sensitive experiences**: Claude Haiku 4.5's speed is ideal for real-time applications like customer service agents and chatbots where response time is critical.
- **Coding sub-agents**: Use Claude Haiku 4.5 to power sub-agents, enabling multi-agent systems that tackle complex refactors, migrations, and large feature builds with quality and speed.
- **Financial analysis**: Use Claude Haiku 4.5 to monitor thousands of data streams---tracking regulatory changes, market signals, and portfolio risks to preemptively adapt compliance and trading systems at previously impossible scales.
- **Research sub-agents**: Perform parallel analyses across multiple data sources while maintaining fast response times. Ideal for rapid business intelligence, competitive analysis, and real-time decision support.
- **Business tasks**: Claude Haiku 4.5 is capable of producing and editing office files like slides, documents, and spreadsheets. It also better supports strategy and campaign planning, business analysis and brainstorming.

[Go to the Claude Haiku 4.5 model card](https://console.cloud.google.com/agent-platform/publishers/anthropic/model-garden/claude-haiku-4-5)

### Claude Opus 4

Claude Opus 4 is a state-of-the-art model for coding and agent
capabilities, especially agentic search. It excels for customers needing
frontier intelligence:

**Retirement Date:** Not sooner than May 14, 2026.

- **Advanced coding**: Independently plan and execute complex development tasks end-to-end. It adapts to your style and maintains high code quality throughout.
- **Long-horizon tasks and complex problem solving (virtual collaborator)**: Unlock new use cases that involves long-horizon tasks that require memory, sustained reasoning, and long chains of actions.
- **AI agents**: Enable agents to tackle complex, multi-step tasks that require peak accuracy.
- **Agentic search and research**: Connect to multiple data sources to synthesize comprehensive insights across repositories.
- **Content creation**: Create human-quality content with natural prose. Produce long-form creative content, technical documentation, marketing copy, and frontend design mockups.
- **Memory and context management**: Incorporates memory capabilities that allow it to effectively summarize and reference previous interactions.

[Go to the Claude Opus 4 model card](https://console.cloud.google.com/agent-platform/publishers/anthropic/model-garden/claude-opus-4)

### Claude Sonnet 4

Claude Sonnet 4 balances impressive performance for coding with the
right speed and cost for high-volume use cases:

**Retirement Date:** Not sooner than May 14, 2026.

- **Coding**: Handle everyday development tasks with enhanced performance---power code reviews, bug fixes, API integrations, and feature development with immediate feedback loops.
- **AI Assistants**: Power production-ready assistants for real-time applications---from customer support automation to operational workflows that require both intelligence and speed.
- **Efficient research**: Perform focused analysis across multiple data sources while maintaining fast response times. Ideal for rapid business intelligence, competitive analysis, and real-time decision support.
- **Large-scale content**: Generate and analyze content at scale with improved quality. Create customer communications, analyze user feedback, and produce marketing materials with the right balance of quality and throughput.

[Go to the Claude Sonnet 4 model card](https://console.cloud.google.com/agent-platform/publishers/anthropic/model-garden/claude-sonnet-4)

### Claude 3.5 Haiku

Claude 3.5 Haiku is optimized for use cases where speed and
affordability matter. It improves on its predecessor across every skill set.
Claude 3.5 Haiku is optimized for the following use cases:

- Code completions - With its rapid response time and understanding of programming patterns, Claude 3.5 Haiku excels at providing quick, accurate code suggestions and completions in real-time development workflows.
- Interactive chat bots - Claude 3.5 Haiku's improved reasoning and natural conversation abilities make it ideal for creating responsive, engaging chatbots that can handle high volumes of user interactions efficiently.
- Data extraction and labeling - Leveraging its improved analysis skills, Claude 3.5 Haiku efficiently processes and categorizes data, making it useful for rapid data extraction and automated labeling tasks.
- Real-time content moderation - With strong reasoning skills and content understanding, Claude 3.5 Haiku provides fast, reliable content moderation for platforms that require immediate response times at scale.

[Go to the Claude 3.5 Haiku model card](https://console.cloud.google.com/agent-platform/publishers/anthropic/model-garden/claude-3-5-haiku)

## What's next

[Learn how to use Anthropic's models](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/partner-models/claude/use-claude).
