> [!NOTE]
> **Note:** This feature does not support VPC-SC.

You can define, apply, and manage policies that govern agent interactions.

By using the **Policies** page, you can do the following:

- [Use Identity and Access Management (IAM) policies to govern agentic communication](https://docs.cloud.google.com/gemini-enterprise-agent-platform/govern/policies/iam-overview).

- [Use Semantic Governance Policies to govern traffic between agents and MCP servers and other tools](https://docs.cloud.google.com/gemini-enterprise-agent-platform/govern/policies/semantic-governance-overview).

## Use IAM policies to govern agentic communication

You can create IAM allow and deny policies that
Agent Gateway uses to securely govern agentic communication between
your agents and other services, including other agents, MCP servers, and
endpoints. Agent Gateway uses Identity-Aware Proxy (IAP) to
enforce the policies.

For detailed information about IAM policies for Agent Gateway, see [IAM policies overview](https://docs.cloud.google.com/gemini-enterprise-agent-platform/govern/policies/iam-overview). To create an IAM policy, see [Create IAM policies](https://docs.cloud.google.com/gemini-enterprise-agent-platform/govern/policies/assign-identity-iam).

## Use Semantic Governance Policies

Semantic Governance Policy (SGP) is a natural language-based security and
compliance layer that ensures an AI agent's tool invocations strictly align with
both user intent and organizational business constraints. While security mechanisms
like IAM are static, SGP handles the non-deterministic nature of
Large Language Models (LLMs) by allowing administrators to define security and
business rules using Natural Language Constraints (NLC).

To learn more about Semantic Governance Policies, see [Semantic governance policies overview](https://docs.cloud.google.com/gemini-enterprise-agent-platform/govern/policies/semantic-governance-overview). To configure Semantic Governance Policies, see [Configure semantic governance policies](https://docs.cloud.google.com/gemini-enterprise-agent-platform/govern/policies/configure-semantic-governance).

## What's next

Codelab

### [Codelab: Secure cross-cloud agentic AI applications](https://codelabs.developers.google.com/next26/aiinfra-learning-pod/screen1-securing-cross-cloud-agentic)

Learn how to secure your agentic applications in the Securing Cross-Cloud Agentic AI Applications codelab.

Overview

### [Agent Gateway overview](https://docs.cloud.google.com/gemini-enterprise-agent-platform/govern/gateways/agent-gateway-overview)

Get an overview of Agent Gateway.

Guide

### [Security controls](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/security-controls)

Learn about security controls for Google Agent Platform.
