To help you maintain a strong security posture and identify potential threats to your agents, Gemini Enterprise Agent Platform integrates with Security Command Center for threat detection, offers specialized protections for AI agents through Model Armor, and provides audit trails for Identity and Access Management policy changes through Cloud Audit Logs. This page describes how you can view security and audit findings related to your agents.

## View threat detections in Security Command Center

Security Command Center is Google Cloud's centralized vulnerability and threat reporting service. Agent Platform integrates with Security Command Center to provide findings on threat detection, policy violations, and anomalous behavior related to your agents.

Security Command Center provides threat detection through a multi-layered approach using log-based, agentless, and runtime detectors to monitor your cloud resources and detect potentially malicious activity in near real time. When a threat is detected, Security Command Center generates a finding. You can view these findings in the Security Command Center dashboard in the Google Cloud console.

For more information on threat detection in Security Command Center, see [Threat detection in Security Command Center](https://docs.cloud.google.com/security-command-center/docs/overview-threats).

## Review Model Armor logs

Model Armor is a Google Cloud service that enhances the security and safety of AI applications by screening LLM prompts and responses. It helps protect against malicious input, verifies content safety, protects sensitive data, and helps you maintain compliance and enforce AI safety and security policies.

When Model Armor detects a policy violation or malicious content in prompts or responses to your agent, it logs these events. You can review Model Armor logs to understand how your agent is being used and to identify attempts to misuse it.

For more information on Model Armor, see [Model Armor overview](https://docs.cloud.google.com/model-armor/overview).

## Audit Identity and Access Management policy changes

You can use Cloud Audit Logs to track changes to Identity and Access Management policies for your Agent Platform resources. Identity and Access Management policy changes, such as granting or revoking roles for users or service accounts, are recorded in audit logs. These logs provide an audit trail of who made the change, when it was made, and what was changed. Reviewing these logs can help you investigate unauthorized access or ensure compliance with your organization's policies.

For more information on auditing Identity and Access Management changes, see [Identity and Access Management audit logging](https://docs.cloud.google.com/iam/docs/audit-logging).
