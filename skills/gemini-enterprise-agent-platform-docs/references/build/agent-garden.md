> [!WARNING]
>
> **Preview**
>
>
> This product or feature is
>
> subject to the "Pre-GA Offerings Terms" in the General Service Terms section
> of the [Service Specific
> Terms](https://docs.cloud.google.com/terms/service-terms#1).
>
> Pre-GA products and features are available "as is" and might have limited support.
>
> For more information, see the
> [launch stage descriptions](https://cloud.google.com/products/#product-launch-stages).

The [Agent Garden](https://console.cloud.google.com/agent-platform/agent-garden) is a curated
library within Google Cloud's Gemini Enterprise Agent Platform that provides prebuilt
agent samples. These samples are designed to help developers quickly jumpstart
the creation of AI agents by providing high-quality, functional templates for
common AI patterns.

Agent Garden simplifies the process of building sophisticated AI applications by
offering:

- **Ready-to-use samples** : Templates like [Retrieval-Augmented Generation
  (RAG)](https://console.cloud.google.com/agent-platform/agent-garden/samples/retrieval-augmented-generation) that come with pre-configured logic.
- **Customizable logic** : While the samples work out of the box, they provide [access to GitHub](https://github.com/GoogleCloudPlatform/generative-ai/tree/main/gemini/agents) source code for deep customization.
- **Integrated infrastructure** : Agents are built to work seamlessly with other Agent Platform components like **RAG Engine** , **Vector
  Search** , and **Gemini models**.
- **Use case focused**: Each agent is tailored for specific tasks, such as documentation-grounded customer support or industry-specific research synthesis.

## Deployment steps

To deploy an agent sample from Agent Garden, follow these steps:

1. Navigate to the [Agent Platform console](https://console.cloud.google.com/agent-platform/) and select **Agent Garden** from the **Agent Builder** section in the left-hand menu to access Agent Garden.
2. Choose a sample that fits your needs. For example, the [Retrieval-Augmented
   Generation
   (RAG)](https://console.cloud.google.com/agent-platform/agent-garden/samples/retrieval-augmented-generation) sample is ideal for building factually grounded Q\&A systems.
3. Configure the following environment settings:
   - **Project**: Ensure you are in the correct Google Cloud project.
   - **Region**: Select a supported region for your deployment.
   - **Model selection**: Choose the model (for example, Gemini 3 Flash) that your agent will use.
4. Click **Deploy** , and then select one of the deployment options described in the [following section](https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/agent-garden#deployment-options).
5. Click **Create** or **Confirm** to initialize the agent. The system will provision the necessary resources. You can track the progress in the notification bar or the "Agent Runtime" section.

### Deployment options

When you deploy an agent, you can choose one of three options:

#### Deploy with Agents CLI

This method is the standard and most direct path for deploying agents from the
Agent Garden. It is ideal for learners, prototyping, and rapid testing, as it
offers a quick deployment solution with foundational resources for
monitoring.

- **Tool and method** : Pressing the **Deploy** button opens a command-line interface (CLI) with a filled command. Enter the region when asked.
- **Target environment**: Deploys the agent into an Agent Runtime instance.

#### Deploy E2E implementation with Application Design Center

This option is for full-scale, enterprise-grade deployment. It uses the
Application Design Center (ADC), which provides a low-code visual 'ClickOps'
configuration experience. ADC uses an Agent Cloud Terraform template for
deployment.

- **Target environment**: Deploys the agent to Agent Cloud, which is a complex grouping of production-ready infrastructure and configurations.
- **Use case** : This option provides the entire enterprise deployment stack, offering significant benefits over simpler deployment methods, including the following:
  - Managed post-deployment experience across Day 0, 1, and 2.
  - Operational dashboards, FinOps cost optimization, and version control.
  - Security, Compliance, and CI/CD/GitOps integrations.

#### Deploy and register to Gemini Enterprise with Agents CLI

This option focuses on making a production-ready agent discoverable and governed
within the corporate ecosystem.

- **Process**: The agent is first deployed to a managed runtime (like Agent Runtime) using a tool like Agents CLI. The critical second step is registration with Gemini Enterprise.
- **Target environment**: A Gemini Enterprise Application, using the Agent Platform Agent Runtime as the runtime.
- **Use case**: Registration is the critical bridge that connects your agent's backend logic to the Gemini Enterprise orchestration layer.

## Post-deployment and testing

Once deployed, you have several options to interact with your new agent:

- **Preview** : Use the **Open Agent** button to test the agent's performance in a chat interface immediately.
- **Debug** : Toggle the **Show debug panel** to see the underlying reasoning, tool calls, and retrieval steps the agent is taking.
- **Expand** : Use the **Tools** menu to connect your agent to external APIs or private data stores.

> [!TIP]
> **Tip:** If you want to modify the core behavior, use the [Open
> GitHub](https://www.google.com/search?q=https://github.com/GoogleCloudPlatform/generative-ai/tree/main/gemini/agents) link on the sample page to clone the repository and deploy your custom version using the Agent Platform SDK.
