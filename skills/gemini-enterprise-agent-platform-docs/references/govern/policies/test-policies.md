After you define policies for agent ingress and egress traffic, we recommend
that you test them to ensure they're working as you expect before you enforce
them. When you test a policy, you can verify that it correctly filters traffic
during ingress or egress based on the conditions you've defined. This page
describes how to use dry-run modes to test ingress policies using Identity-Aware Proxy
and egress policies using Agent Gateway.

## Before you begin

1. Enable billing

2. **Ingress** : To test an ingress policy, ensure that you've set up
   Identity-Aware Proxy with an ingress policy that contains an IAM
   policy. We recommend that you initially set the enforcement
   mode to dry-run to prevent service disruption. After you determine that your
   policies are working as you expect, update the enforcement mode to `ENFORCE`.

3. **Egress** : To test your Agent Gateway egress policy, ensure
   that you've [set up Agent Gateway](https://docs.cloud.google.com/iam/docs/allow-policies) with
   an [IAM allow policy](https://docs.cloud.google.com/gemini-enterprise-agent-platform/govern/policies/assign-identity-iam). We recommend that you initially set the enforcement
   mode to dry-run to prevent service disruption. After you determine that your
   policies are working as you expect, update the enforcement mode to `ENFORCE`.

## Test policies

This section describes how to use dry-run modes to test policy impact.

### Test agent egress

To test that your agent traffic is able to egress and access the target
resources through Agent Gateway, do the following:

1. Initiate an action from your agent that triggers an egress call.

2. Check Cloud Audit Logs for Agent Platform entries. Filter logs on
   `protoPayload.serviceName="iap.googleapis.com"`.

3. Examine the effective IAM policy:

   ```bash
   gcloud iap web get-iam-policy
   ```
4. After testing, update the enforcement mode to `ENFORCE`.

### Test agent ingress

To test your agent ingress policy through IAP, do the following:

1. Initiate an action from your agent that triggers an ingress call.

2. Check the results for an error.

## What's next

Overview

### [Agent Gateway overview](https://docs.cloud.google.com/gemini-enterprise-agent-platform/govern/gateways/agent-gateway-overview)

Get an overview of Agent Gateway.

Guide

### [Security and audit findings](https://docs.cloud.google.com/gemini-enterprise-agent-platform/security-findings)

View other security-related logs.
