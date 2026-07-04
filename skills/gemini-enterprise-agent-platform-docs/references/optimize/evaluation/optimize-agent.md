> [!WARNING]
> **Preview - Agent evaluation on Gemini Enterprise Agent Platform**
>
> This feature is subject to the "Pre-GA Offerings Terms" in the General Service Terms section of the [Service Specific Terms](https://cloud.google.com/terms/service-terms#1) as well as the [Generative AI Service Specific Terms](https://cloud.google.com/terms/service-terms#20). This feature allows customers to evaluate AI Agents, and so the "Agentic AI Services" Service Specific Terms apply. Pre-GA products and features are available "as is" and might have limited support. For more information, see the [launch stage descriptions](https://cloud.google.com/products/#product-launch-stages).

The *Quality
Flywheel* is a continuous cycle of evaluation, analysis, and optimization. You
evaluate your agent's performance, analyze the results to identify clusters of
failures, and then optimize to address those
specific issues. Each iteration improves agent quality.

The Agent Development Kit (ADK) provides an extensible framework for automated agent optimization. Automate agent optimization using the ADK's built-in `adk optimize` command. This command applies the [GEPA algorithm](https://github.com/gepa-ai/gepa) to iteratively refine root system instructions by evaluating them against your test suite.

The framework is extensible: you can implement custom optimization strategies, or develop custom samplers that integrate with your own evaluation pipelines.

For more details on how to get started with optimizing agents using ADK, see [Optimize agents](https://adk.dev/optimize/) in ADK's documentation.
