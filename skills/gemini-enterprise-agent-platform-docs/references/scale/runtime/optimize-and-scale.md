Agent Runtime provides deployment parameters that allow you to optimize and
scale the performance of your agents. By configuring these parameters, you can
handle unpredictable or spiky traffic patterns effectively.

This page describes best practices on how to optimize and scale performance for
Agent Runtime, covering the following scenarios:

- [Cold start problem](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/runtime/optimize-and-scale#cold-start-problem)
- [Underutilized asynchronous workers](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/runtime/optimize-and-scale#underutilized-workers)

The scenarios show how to use [deployment parameters](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/runtime/deploy-an-agent#customized-resource-controls) to solve common performance
bottlenecks, especially for unpredictable, spiky traffic patterns in real-world
applications.

## Cold start problem

A *cold start* occurs when a request arrives and there are no idle instances or
containers to serve it, forcing Agent Runtime to start a new
one. This adds significant latency to the request.

For example, sending 300 concurrent requests to an agent with the default `min_instances=1` can show the following results:

- **Cold start** (first run): Average latency of approximately 4.7 seconds.

- **Warm start** (immediate second run): Average latency of approximately 0.4 seconds.

The overhead of more than four seconds is almost entirely due to new instances starting up to handle the load.

Try the following methods to mitigate the cold start problem:

- Set a `min_instances` value that is high enough to handle your baseline traffic.
  For example, setting `min_instances=10` to the example agent can reduce the
  average latency for a cold start to approximately 1.4 seconds. For
  applications with spiky or high traffic, set `min_instances` to a value that can
  handle your typical load without needing to scale from 1. The maximum value is
  10.

- Send a stable, continuous, predictable load to Agent Runtime using
  a queue. For example, running a sustained load test of 1,500 queries per
  minute (25 queries per second) for 60 seconds on an Agent Development Kit
  (ADK)-based agent with `min_instances=10` and the default `concurrency` (9)
  can yield the following result:

  - The average latency is consistently low at approximately 1.6 seconds.

A stable, continuous load keeps the service *warm* and results in optimal performance.

## Underutilized asynchronous workers

By default, `container_concurrency` is configured for synchronous code, where
each Agent Platform instance handles only one request at a time.
Asynchronous agents, such as those based on the
[Agent Development Kit (ADK)](https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/adk), can handle multiple
I/O-bound requests (like LLM or tool calls) simultaneously.

For example, sending 300 concurrent requests to an ADK-based agent with `min_instances=10` and the default `container_concurrency=9` can yield the following result:

- While the median latency is approximately 4 seconds, the maximum latency spikes to 60 seconds. This indicates that requests are heavily queued while the service slowly scales out.

To mitigate underutilized asynchronous workers, increase `container_concurrency`
to allow each Agent Platform instance to handle multiple requests. The
number of concurrent requests that each agent process can handle is
`container_concurrency / 9`. The value 9 represents the number of agent
processes running in parallel within each container.

For example, sending 300 concurrent requests to the same ADK-based agent with `min_instances=10` and `container_concurrency=36` can yield the following result:

- The maximum latency drops from 60 seconds to approximately 7 seconds. This shows that existing instances can absorb the spike in traffic more effectively.

For asynchronous agents (such as ADK-based agents), set `container_concurrency`
to a multiple of 9 (for example, 36) as a starting point. This improves
responsiveness to traffic spikes and reduces latency from scaling out.

Note that setting the `container_concurrency` value too high can risk out-of-memory (OOM) errors.

## What's next

Guide

### [Manage deployed agents](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/runtime/manage-deployed-agents)

Learn how to manage agents that have been deployed to the Agent Platform managed runtime.

Guide

### [Use an agent](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/runtime/use-an-agent)

Use an agent with Agent Platform Runtime.

Resource

### [Quotas](https://docs.cloud.google.com/gemini-enterprise-agent-platform/resources/agent-quotas)

Learn about quotas and limits for Agent Platform.
