Use this page to learn how to delegate authorization for
Agent Gateway to Identity-Aware Proxy, Model Armor, and other
custom authorization engines by using Service Extensions.

Authorization policies let you enforce centralized access control and governance
policies on traffic passing through the endpoint published by the
Agent Gateway. These policies let you manage traffic by
controlling access based on mTLS identities, request and response attributes, and
even customize based on the protocol-specific attributes used (for example,
MCP servers).

Authorization policies use *policy profiles* to determine the type of
authorization to be performed. You can use a request-based authorization policy
(`REQUEST_AUTHZ`) that relies on information in HTTP request headers to allow or
deny traffic. Alternatively, you can use a content-based authorization policy
(`CONTENT_AUTHZ`) when you need to perform a deeper inspection of your
application payloads to allow or deny traffic.

To learn more about authorization policies, policy profiles and their use-cases,
see [Authorization policies
overview](https://docs.cloud.google.com/load-balancing/docs/auth-policy/auth-policy-overview).

## Authorization extensions

Sometimes, complex authorization decisions cannot be readily expressed using an
authorization policy. Agent Gateway lets you configure
authorization policies with [authorization
extensions](https://docs.cloud.google.com/service-extensions/docs/lb-extensions-overview#authorization-extensions)
to delegate authorization decisions to custom authorization engines.

An authorization extension lets you intercept and evaluate requests that pass
through an Agent Gateway deployment. It makes a real-time gRPC
call to an external service that you manage, so that you can inspect, modify, or
even block traffic before it continues to its destination.

The extension inspects the data based on the configured [authorization
policy](https://docs.cloud.google.com/load-balancing/docs/auth-policy/auth-policy-overview). You can
configure authorization extensions either separately for request-based and
content-based authorization policies, or you can use both for comprehensive
security.

## Before you begin

Before you begin, ensure that you meet the following requirements:

- The Agent Gateway is deployed. See [Configure
  Agent Gateway](https://docs.cloud.google.com/gemini-enterprise-agent-platform/govern/gateways/set-up-agent-gateway).

- You must have the `agentGateway.use` IAM permission on the
  deployed Agent Gateway resource to be able to attach
  authorization policies to the gateway.

## Configure authorization policies with extensions

This section shows you how to configure authorization policies that delegate
authorization and content safety decisions to Identity-Aware Proxy,
Model Armor, and other custom services.

### Delegate authorization to IAP

You can configure a request authorization extension to delegate access
decisions for authorization policies to IAP.

The following steps show you how to configure an authorization extension with an
authorization policy for an Agent Gateway instance.

1. Create the required IAM egress policies for your agents and
   tools. For more information, see [Create IAM agent
   policies](https://docs.cloud.google.com/gemini-enterprise-agent-platform/govern/policies/assign-identity-iam).

2. See [Configure Agent Gateway in Agent-to-Anywhere (Egress)
   mode](https://docs.cloud.google.com/gemini-enterprise-agent-platform/govern/gateways/set-up-agent-gateway#config-agent-to-anywhere) to enable
   IAP while creating the Agent Gateway
   (by using the **Access authorization** parameter).

   IAP requires that your agents be registered with the
   Agent Registry resource bound to the gateway.
3. Configure an authorization extension to point to IAP.

   1. Define the extension in a YAML file. Use the sample values provided. If
      you want to deploy the extension in a dry run *audit-only* mode, to
      test the authorization policy without enforcing it, you can specify the
      `iamEnforcementMode` field inside the `metadata` block.

          cat >iap-request-authz-extension.yaml <<EOF
          name: my-iap-request-authz-ext
          service: iap.googleapis.com
          failOpen: true
          timeout: 1s
          metadata:
            iapPolicyVersion: "V1"
          EOF

      If you want to deploy the extension in a dry run *audit-only* mode, to
      test the authorization policy without enforcing it, you can specify the
      `iamEnforcementMode` field inside the `metadata` block. This lets you
      verify your policy and minimize the risk of disrupting traffic due to
      configuration errors:

          cat >iap-request-authz-extension.yaml <<EOF
          name: my-iap-request-authz-ext
          service: iap.googleapis.com
          failOpen: true
          timeout: 1s
          metadata:
            iapPolicyVersion: "V1"
            iamEnforcementMode: "DRY_RUN"
          EOF

      Remove the `iamEnforcementMode: "DRY_RUN"` field from the `metadata` block
      when you're ready to start enforcing policies.
   2. Import the authorization extension. Use the
      [`gcloud service-extensions authz-extensions import` command](https://docs.cloud.google.com/sdk/gcloud/reference/service-extensions/authz-extensions/import) with the following sample values.

      ```
      gcloud service-extensions authz-extensions import my-iap-request-authz-ext \
          --source=iap-request-authz-extension.yaml \
          --location=LOCATION
      ```
4. In the same project, configure an authorization policy that delegates
   the decision to the extension.

   1. Define an authorization policy that associates the
      `my-iap-request-authz-ext` extension with your gateway. Use the sample
      values provided.

          cat >iap-request-authz-policy.yaml <<EOF
          name: my-iap-request-authz-policy
          target:
            resources:
              - "projects/PROJECT_ID/locations/LOCATION/agentGateways/AGENT_GATEWAY_NAME"
          policyProfile: REQUEST_AUTHZ
          action: CUSTOM
          customProvider:
            authzExtension:
              resources:
                - "projects/PROJECT_ID/locations/LOCATION/authzExtensions/my-iap-request-authz-ext"
          EOF

      Replace `PROJECT_ID` with your
      [project ID](https://docs.cloud.google.com/resource-manager/docs/creating-managing-projects#identifying_projects).
   2. Import the authorization policy to the project. Use the
      [`gcloud network-security authz-policies import` command](https://docs.cloud.google.com/sdk/gcloud/reference/network-security/authorization-policies/import)
      with the following sample values.

      ```
      gcloud beta network-security authz-policies import my-iap-request-authz-policy \
          --source=iap-request-authz-policy.yaml \
          --location=LOCATION
      ```

### Delegate authorization to Model Armor

You can configure an authorization extension to delegate content security
decisions for authorization policies to Model Armor.

The following example shows how to configure such an authorization extension
with an authorization policy for Agent Gateway.

### Console

To use the Google Cloud console to enable
Model Armor for Agent Gateway, perform the
following steps:

1. Create the required
   [Model Armor templates](https://docs.cloud.google.com/model-armor/manage-templates#create-ma-template).

2. See [Configure Agent Gateway](https://docs.cloud.google.com/gemini-enterprise-agent-platform/govern/gateways/set-up-agent-gateway) to enable
   Model Armor while creating the Agent Gateway
   (by using the **Enable Model Armor** checkbox). Model Armor
   templates are supported in both Client-to-Agent and Agent-to-Anywhere
   modes.

3. When you're using Model Armor, you must grant
   the Agent Gateway service account the permissions
   required to be able to use the Model Armor templates.
   The service account is of the
   format: `service-PROJECT_NUMBER@gcp-sa-dep.iam.gserviceaccount.com`, where <var translate="no">PROJECT_NUMBER</var>
   is the project number of the project where you created the gateway.

   You must complete this step even if both the gateway and the templates are
   in the same project. Grant the following roles:
   - The `roles/modelarmor.calloutUser` and `roles/serviceusage.serviceUsageConsumer` roles in the project that contains the gateway.
   - The `roles/modelarmor.user` role in the project that contains the Model Armor templates.

   You will need to use the gcloud CLI to complete this step.

   ```
   gcloud projects add-iam-policy-binding GATEWAY_PROJECT_ID \
       --member=serviceAccount:service-GATEWAY_PROJECT_NUMBER@gcp-sa-dep.iam.gserviceaccount.com \
       --role=roles/modelarmor.calloutUser
   gcloud projects add-iam-policy-binding GATEWAY_PROJECT_ID \
       --member=serviceAccount:service-GATEWAY_PROJECT_NUMBER@gcp-sa-dep.iam.gserviceaccount.com \
       --role=roles/serviceusage.serviceUsageConsumer
   gcloud projects add-iam-policy-binding MODEL_ARMOR_PROJECT_ID \
       --member=serviceAccount:service-GATEWAY_PROJECT_NUMBER@gcp-sa-dep.iam.gserviceaccount.com \
       --role=roles/modelarmor.user
   ```

   Replace the following:
   - `GATEWAY_PROJECT_ID`: The project ID of the project where you created the gateway.
   - `GATEWAY_PROJECT_NUMBER`: The project number of the project where you created the gateway.
   - `MODEL_ARMOR_PROJECT_ID`: The project ID of the project that contains the Model Armor template.

   If you're using the gateway for Agent Runtime, the Reasoning
   Engine Service Agent also requires these permissions as documented in [Route
   Agent Runtime traffic through
   Agent Gateway](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/runtime/agent-gateway-runtime-deploy#permissions).

### gcloud

1. Create the required
   [Model Armor templates](https://docs.cloud.google.com/model-armor/manage-templates#create-ma-template).

2. When you're using Model Armor, you must grant
   the Agent Gateway service account the permissions
   required to be able to use the Model Armor templates.
   The service account is of the
   format: `service-PROJECT_NUMBER@gcp-sa-dep.iam.gserviceaccount.com`, where <var translate="no">PROJECT_NUMBER</var>
   is the project number of the project where you created the gateway.

   You must complete this step even if both the gateway and the templates are
   in the same project. Grant the following roles:
   - The `roles/modelarmor.calloutUser` and `roles/serviceusage.serviceUsageConsumer` roles in the project that contains the gateway.
   - The `roles/modelarmor.user` role in the project that contains the Model Armor template.

   ```
   gcloud projects add-iam-policy-binding GATEWAY_PROJECT_ID \
       --member=serviceAccount:service-GATEWAY_PROJECT_NUMBER@gcp-sa-dep.iam.gserviceaccount.com \
       --role=roles/modelarmor.calloutUser
   gcloud projects add-iam-policy-binding GATEWAY_PROJECT_ID \
       --member=serviceAccount:service-GATEWAY_PROJECT_NUMBER@gcp-sa-dep.iam.gserviceaccount.com \
       --role=roles/serviceusage.serviceUsageConsumer
   gcloud projects add-iam-policy-binding MODEL_ARMOR_PROJECT_ID \
       --member=serviceAccount:service-GATEWAY_PROJECT_NUMBER@gcp-sa-dep.iam.gserviceaccount.com \
       --role=roles/modelarmor.user
   ```

   Replace the following:
   - `GATEWAY_PROJECT_ID`: The project ID of the project where you created the gateway.
   - `GATEWAY_PROJECT_NUMBER`: The project number of the project where you created the gateway.
   - `MODEL_ARMOR_PROJECT_ID`: The project ID of the project that contains the Model Armor template.
3. Configure the authorization extension to point to
   Model Armor.

   1. Define the extension in a YAML file. Use the sample values provided.

          cat >ma-content-authz-extension.yaml <<EOF
          name: my-ma-content-authz-ext
          service: modelarmor.LOCATION.rep.googleapis.com
          metadata:
            model_armor_settings: '[
              {
              "response_template_id": "projects/MODEL_ARMOR_PROJECT_ID/locations/LOCATION/templates/TEMPLATE_ID",
              "request_template_id": "projects/MODEL_ARMOR_PROJECT_ID/locations/LOCATION/templates/TEMPLATE_ID"
              }
            ]'
          failOpen: true
          timeout: 1s
          EOF

   2. Import the authorization extension. Use the
      [`gcloud service-extensions authz-extensions import` command](https://docs.cloud.google.com/sdk/gcloud/reference/service-extensions/authz-extensions/import) with the following sample
      values.

      ```
      gcloud service-extensions authz-extensions import my-ma-content-authz-ext \
         --source=ma-content-authz-extension.yaml \
         --location=LOCATION
      ```
4. Configure an authorization policy with the extension.

   1. Define an authorization policy that associates the extension
      `my-ma-content-authz-ext` with an Agent Gateway.

      ### Agent-to-Anywhere

          cat >ma-content-authz-policy.yaml <<EOF
          name: my-ma-content-authz-policy
          target:
            resources:
              - "projects/PROJECT_ID/locations/LOCATION/gateways/AGENT_GATEWAY_NAME"
          policyProfile: CONTENT_AUTHZ
          action: CUSTOM
          customProvider:
            authzExtension:
              resources:
                - "projects/PROJECT_ID/locations/LOCATION/authzExtensions/my-ma-content-authz-ext"
          httpRules:
            - to:
                operations: [ { "paths": [ { "prefix": "/" } ] } ]
              when: >
                request.headers['content-type'] == 'application/json' ||
                request.headers['content-type'].startsWith('text/')
          EOF

      Note the following:
      - The value of `policyProfile` is set to `CONTENT_AUTHZ`. This
        indicates that the custom policy provider processes request and
        response traffic including the request body.

      - The `httpRules` parameter demonstrates how to use
        [CEL](https://docs.cloud.google.com/service-extensions/docs/cel-matcher-language-reference)
        attributes to create conditions that match the specific traffic
        you want to forward to Model Armor for
        evaluation. In this example, the rules match all traffic with
        `application/json` or `text/` content types. We recommend using
        such rules to limit Model Armor evaluation to
        relevant traffic. This lets you route supported LLM API, MCP,
        and A2A traffic to Model Armor while excluding
        internal traffic such as agent gRPC calls.

      ### Client-to-Agent

          cat >ma-content-authz-policy.yaml <<EOF
          name: my-ma-content-authz-policy
          target:
            resources:
              - "projects/PROJECT_ID/locations/LOCATION/gateways/AGENT_GATEWAY_NAME"
          policyProfile: CONTENT_AUTHZ
          action: CUSTOM
          customProvider:
            authzExtension:
              resources:
                - "projects/PROJECT_ID/locations/LOCATION/authzExtensions/my-ma-content-authz-ext"
          EOF

      The value of `policyProfile` is set to `CONTENT_AUTHZ`. This
      indicates that the custom policy provider processes request and
      response traffic including the request body.
   2. Import the authorization policy to the project. Use the
      [`gcloud network-security authz-policies import` command](https://docs.cloud.google.com/sdk/gcloud/reference/network-security/authorization-policies/import)
      with the following sample values.

      ```
      gcloud network-security authz-policies import my-ma-content-authz-policy \
        --source=ma-content-authz-policy.yaml \
        --location=LOCATION
      ```

### Delegate authorization to custom authorization extensions

You can configure custom authorization extensions to delegate decisions to
custom services. These custom extensions can target only fully qualified domain
names (FQDNs).

When you use FQDN targets, the extension uses the HTTP2 protocol with TLS
encryption to communicate with endpoints on port
443. However, the extension doesn't validate the server certificate.
Therefore, for better security, you must ensure that the resolved endpoints are
within the VPC network. Also ensure that you have DNS peering set
up between the Agent Gateway project and your VPC
network.

1. To configure an authorization extension with an authorization policy for a
   specific FQDN, such as `mycustomauthz.internal.net`, specify it as the value for
   `service` in the extension YAML file as the following example shows. This
   example assumes that you have deployed a server in your VPC
   network implementing the `ext_authz` protocol.

       cat >custom-authz-extension.yaml <<EOF
       name: my-custom-authz-ext
       service: mycustomauthz.internal.net
       failOpen: true
       timeout: 1s
       wireFormat: EXT_AUTHZ_GRPC
       EOF

2. Create the authorization extension to point to the custom service.

   ```
   gcloud beta service-extensions authz-extensions import custom-authz-extension \
     --source=custom-authz-extension.yaml \
     --location=LOCATION
   ```
3. After you create the extension, configure a `CUSTOM` authorization policy
   that delegates decisions to the authorization extension.

         cat >authz-policy.yaml <<EOF
         name: authz-with-extension
         target:
           resources:
           - "projects/PROJECT_ID/locations/LOCATION/agentGateways/AGENT_GATEWAY_NAME"
         policyProfile: REQUEST_AUTHZ
         action: CUSTOM
         customProvider:
         authzExtension:
           resources:
           - projects/PROJECT_ID/locations/LOCATION/authzExtensions/custom-authz-extension
         EOF

4. Create the authorization policy.

   ```
   gcloud network-security authz-policies import authz-policy-with-extension \
   --source=authz-policy.yaml \
   --location=LOCATION
   ```

Note that when an authorization extension is associated with an authorization
policy using the `REQUEST_AUTHZ` profile as demonstrated in this example, the
gateway invokes the extension only when request headers arrive. The request
body, response headers, and response body are not visible to the authorization
extension.

### Combine IAP authorization with Model Armor guardrails

For comprehensive security, we recommend that you set up a CUSTOM authorization
policy with a `REQUEST_AUTHZ` policy profile and another CUSTOM authorization
policy with a `CONTENT_AUTHZ` policy profile.

The following example uses IAP as a centralized request
authorization system and Model Armor for AI guardrails. As shown
in previous examples, you can swap each of these with service extensions to use
your own custom solutions.

1. Configure a `REQUEST_AUTHZ` authorization extension that delegates to
   IAP and an authorization policy that points to the extension.

   1. Define the authorization extension. The `iapPolicyVersion` field under
      `metadata` is mandatory and must be set to `"V1"`.

          cat >iap-extension.yaml <<EOF
          name: iap-extension
          service: iap.googleapis.com
          failOpen: true
          timeout: 1s
          metadata:
            iapPolicyVersion: "V1"
          EOF

   2. Create the authorization extension.

      ```
      gcloud service-extensions authz-extensions import iap-extension \
      --source=iap-extension.yaml \
      --location=LOCATION
      ```

      Replace `LOCATION` with the region of the extension.
   3. Configure the `REQUEST_AUTHZ` authorization policy that delegates to the extension.

          cat >authz-policy-request-authz.yaml <<EOF
          name: authz-iap
          target:
            resources:
            - "projects/PROJECT_ID/locations/LOCATION/agentGateways/AGENT_GATEWAY_NAME"
          policyProfile: REQUEST_AUTHZ
          action: CUSTOM
          customProvider:
            authzExtension:
              resources:
              - "projects/PROJECT_ID/locations/LOCATION/authzExtensions/iap-extension"
          EOF

      Replace the following:
      - `PROJECT_ID`: Your project ID.
      - `LOCATION`: The location of the resources.
      - `AGENT_GATEWAY_NAME`: The name of the Agent Gateway.
   4. Create the authorization policy.

      ```
      gcloud network-security authz-policies import authz-iap \
      --source=authz-policy-request-authz.yaml \
      --location=LOCATION
      ```
2. Configure a `CONTENT_AUTHZ` authorization extension that delegates to
   Model Armor and an authorization policy that points to the
   extension.

   1. Define the extension.

          cat >ma-extension-file.yaml <<EOF
          name: ma-extension
          service: modelarmor.LOCATION.rep.googleapis.com
          metadata:
            model_armor_settings: '[
              {
              "response_template_id": "projects/MODEL_ARMOR_PROJECT_ID/locations/LOCATION/templates/RESPONSE_TEMPLATE_ID",
              "request_template_id": "projects/MODEL_ARMOR_PROJECT_ID/locations/LOCATION/templates/REQUEST_TEMPLATE_ID"
              }
            ]'
          failOpen: true
          timeout: 1s
          EOF

      Replace the following:
      - `LOCATION`: The region where your Model Armor templates reside.
      - `MODEL_ARMOR_PROJECT_ID`: The Project ID containing the Model Armor templates.
      - `RESPONSE_TEMPLATE_ID`: The ID of the response template.
      - `REQUEST_TEMPLATE_ID`: The ID of the request template.
   2. Create the authorization extension.

      ```
      gcloud service-extensions authz-extensions import ma-extension \
      --source=ma-extension-file.yaml \
      --location=LOCATION
      ```
   3. Configure the `CONTENT_AUTHZ` authorization policy that delegates to the
      extension.

          cat >authz-policy-content-authz.yaml <<EOF
          name: authz-ma
          target:
            resources:
            - "projects/PROJECT_ID/locations/LOCATION/agentGateways/AGENT_GATEWAY_NAME"
          policyProfile: CONTENT_AUTHZ
          action: CUSTOM
          customProvider:
            authzExtension:
              resources:
              - "projects/PROJECT_ID/locations/LOCATION/authzExtensions/ma-extension"
          EOF

   4. Create the authorization policy.

      ```
      gcloud network-security authz-policies import ma-authz-policy \
      --source=authz-policy-content-authz.yaml \
      --location=LOCATION
      ```

When an authorization extension is associated with a `CONTENT_AUTHZ` profile, it
receives all `ext_proc` events, including request and response headers, body,
and trailers. If your `ext_proc`-based authorization extension is capable of
handling both request-time authorization and content-based authorization, we
recommend configuring a single `CUSTOM` authorization policy with the
`CONTENT_AUTHZ` policy profile. This policy should point to your versatile
authorization extension. This approach enables both types of authorization
through a single extension and `ext_proc` connection, which can improve latency
compared to using separate extensions for `REQUEST_AUTHZ` and `CONTENT_AUTHZ`
profiles.

### Authorization based on MCP protocol attributes

> [!NOTE]
> **Note:** For authorization policies, conditions based on agentic protocol attributes are only supported for the Model Context Protocol (MCP). Other agentic protocols aren't supported.

Agent Gateway parses the MCP protocol payload in a request and
makes the extracted attributes available for authorization policies.

You can restrict access based on MCP method parameters such as the names of
specific tools. This section shows you two examples, one for an `ALLOW` policy
and one for `DENY`.

1. Configure the authorization policy.

   **`ALLOW` policy example**

   This example allows access to a specific set of tools on the MCP server and
   the base protocol features but disallows access to prompts and resources.

   When writing an `ALLOW` policy, make sure you specify
   `baseProtocolMethodsOption: MATCH_BASE_PROTOCOL_METHODS` so that non-access
   specific MCP RPCs like initialize, logging, completion, notifications, and
   ping continue to work. Failing to do so results in the inability to establish
   an MCP session.

       cat >authz-policy-restrict-tools.yaml <<EOF
       name: my-authz-policy-restrict-tools
       target:
         resources:
         - "projects/PROJECT_ID/locations/LOCATION/agentGateways/AGENT_GATEWAY_NAME"
       policyProfile: REQUEST_AUTHZ
       httpRules:
       - to:
           operations:
           - mcp:
               baseProtocolMethodsOption: MATCH_BASE_PROTOCOL_METHODS
               methods:
               - name: "tools/list"
               - name: "tools/call"
                 params:
                 - exact: "get_weather"
                 - exact: "get_location"
       action: ALLOW
       EOF

   **`DENY` policy example**

   This example disallows all prompts/ method access to an MCP server behind an
   Agent Gateway.

       cat >authz-policy-disallow-prompts.yaml <<EOF
       name: my-authz-policy-disallow-prompts
       target:
         resources:
         - "projects/PROJECT_ID/locations/LOCATION/agentGateways/AGENT_GATEWAY_NAME"
       policyProfile: REQUEST_AUTHZ
       httpRules:
       - to:
           operations:
           - mcp:
               methods:
               - name: "prompts"
       action: DENY
       EOF

2. Create the authorization policy.

   ```
   gcloud network-security authz-policies import AUTHZ_POLICY_NAME \
   --source=AUTH_POLICY_YAML_FILE_PATH \
   --location=LOCATION
   ```

   Replace the following:
   - `AUTHZ_POLICY_NAME`: The name of the authorization policy.
   - `AUTH_POLICY_YAML_FILE_PATH`: The path to the authorization policy YAML file.
   - `LOCATION`: The location of the resources.

## Limitations

The following limitations apply when you use authorization policies:

- For Agent-to-Anywhere (egress) gateways, you can configure a maximum of four custom authorization policies per gateway, regardless of policy profile.
- For Client-to-Agent (ingress) gateways, you can configure a maximum of one `CONTENT_AUTHZ` policy. We strongly recommend using Model Armor to protect against prompt injection attacks. However, if you want to use a Semantic Governance Policy extension instead, you must ensure that Model Armor is not configured on the gateway. Other types of service extensions are not supported for ingress.
- If you use custom authorization extensions with the `CONTENT_AUTHZ` profile, they must support the `ext_proc` protocol and `FULL_DUPLEX_STREAMED` mode for body events.
- If you configure multiple custom authorization policies that use the same profile, their execution order is not guaranteed.

Additionally, see the following sections for more information about the
limitations of authorization extensions:

- For limitations that are applicable to all extensions, see
  [Limitations of extensions](https://docs.cloud.google.com/service-extensions/docs/lb-extensions-overview#limitations).

- For limitations that are applicable to callouts, see
  [Limitations of callouts](https://docs.cloud.google.com/service-extensions/docs/callouts-overview#limitations).

## What's next

Codelab

### [Codelab: Govern agentic workloads with Agent Platform](https://codelabs.developers.google.com/cloudnet-agent-gateway)

Learn how to govern agentic workloads with Agent Gateway on Gemini Enterprise Agent Platform.

Guide

### [Monitor Agent Gateway](https://docs.cloud.google.com/gemini-enterprise-agent-platform/govern/gateways/monitor-agent-gateway)

Learn how to monitor Agent Gateway.

Troubleshooting

### [Troubleshoot Agent Gateway](https://docs.cloud.google.com/gemini-enterprise-agent-platform/troubleshooting/troubleshoot-agent-gateway)

Learn how to troubleshoot Agent Gateway connectivity.
