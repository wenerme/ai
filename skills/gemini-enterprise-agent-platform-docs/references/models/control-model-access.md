Model Garden's organization policy lets you centrally control the
models your users can access and the actions they can take. By default, anyone
with permissions to use Gemini Enterprise Agent Platform can use Model Garden to
discover, customize, and deploy a wide variety of Google and third-party models.

Setting a Model Garden policy might be useful, for example, if you have
a set of approved Google and third-party models that can be used in production
environments. You can define a policy at the organization, folder, or project
level so that your users can only access the approved models. A policy
applies to all principals. An organization policy is not a per-user policy. For
more information, see [Introduction to the Organization Policy Service](https://docs.cloud.google.com/resource-manager/docs/organization-policy/overview).

## Policy evaluations

At evaluation time, all policies that contribute to a particular resource are
reviewed, and only the applicable policies are merged and then evaluated. Any
explicit deny value takes precedence over any explicit allow value.

For example, imagine you have a folder policy that denies a specific model and a
project policy that allows that same model. Assuming that the policies are
merged, access to the model is denied at the project level because the explicit
deny policy at the folder level takes precedence. However, if you set the project
policy to override all parent policies, then access to the model is allowed at the
project level.

For more information, see [Understanding hierarchy evaluation](https://docs.cloud.google.com/resource-manager/docs/organization-policy/understanding-hierarchy) in the
Resource Manager documentation.

## Considerations

- The Model Garden organization policy only applies to models in Model Garden. For example, this policy doesn't apply to models that are registered in Gemini Enterprise Agent Platform Model Registry.
- An organization policy can't exceed 500 allowed and denied values.
- For a custom policy, you must specify each model individually. You cannot allow or deny a group of models. For example, you can't deny all third-party models or allow the predict action for only Google models.

## Policy details

When you set a policy, you define one of the following actions:

- Allow all models.
- Deny all models.
- Set a custom policy rule to allow or deny a specific list of models.

By default, if no policy is set or inherited, all models and actions are
allowed.

For a *custom deny policy* , you explicitly deny a list of models
and implicitly allow all other models. Similarly, for a *custom allow policy*,
you explicitly allow a list of models and implicitly deny all other models.

To specify models in a custom policy and a [model action](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/control-model-access#actions), use the
following format:

```
publishers/PUBLISHER/models/MODEL_NAME:ACTION
```

Replace the following:

- `PUBLISHER`: the name of the publisher who owns the model that your policy applies to.
- `MODEL_NAME`: the name of the model to allow or deny.
- `ACTION`: a [model action](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/control-model-access#actions) to include with your policy.

For example, to define a policy rule on predictions against the
Gemini 2.0 Flash model, specify
`publishers/google/models/gemini-2.0-flash-001:predict`.

The fully qualified ID
(`publishers/PUBLISHER/models/MODEL_NAME`) is
also known as the *model ID* . To find the model ID for a model, go to its model
card in Model Garden. For links to model cards, see the list of models
in [Explore AI models in Model Garden](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/model-garden/explore-models).

### Model actions

For each model, you can allow or deny the following actions:

- `predict`: Specifies whether users can make online and batch predictions against a model with a managed API (model as a service).
- `deploy`: For models without a managed API, specifies whether users can deploy models on Google Cloud. For example, this action applies to one-click deployments in the Google Cloud console.
- `tune`: Specifies whether users can tune models.

#### Set a policy for model actions

You can set a policy for Model Garden by using the Google Cloud console or
the Google Cloud CLI. The name of the constraint is
`vertexai.allowedModels`. For more information about setting policies, see the
the following topics in the Resource Manager documentation:

- For Google Cloud console instructions, see [Creating and managing
  organization policies](https://docs.cloud.google.com/resource-manager/docs/organization-policy/creating-managing-policies).
- For gcloud CLI instructions, see [Using constraints](https://docs.cloud.google.com/resource-manager/docs/organization-policy/using-constraints).

### Partner model features

For partner models, you can allow or deny the following actions:

- `web_search`: Specifies whether users can use web search for partner models. For projects that belong to an organization, this feature is denied by default and must be explicitly allowed.
- `structured_outputs`: Specifies whether users can use structured outputs for partner models. For projects that belong to an organization, this feature is denied by default and must be explicitly allowed.

#### Set a policy for partner model features

You can allow or deny `web_search` and `structured_outputs` for partner models
by using the `vertexai.allowedPartnerModelFeatures` constraint.

## Example policies

The following example policies are in the YAML format, which you use when
setting a policy through the gcloud CLI.

### Deny a set of models and allow all other models

The following example denies actions on a specific set of models.

```yaml
name: organizations/ORGANIZATION_ID/policies/vertexai.allowedModels
spec:
  rules:
    values:
      deniedValues:
      - publishers/meta/models/llama3:deploy
      - publishers/google/models/gemini-2.0-flash-001:tune
      - publishers/hf-google/models/gemma-2b:deploy
```

Replace <var translate="no">ORGANIZATION_ID</var> with the ID of your Google Cloud
organization. For more information, see [Getting an organization
resource](https://docs.cloud.google.com/resource-manager/docs/creating-managing-organization#acquiring).

### Allow a set of models and deny all other models

The following example allows actions on a specific set of models.

```yaml
name: organizations/ORGANIZATION_ID/policies/vertexai.allowedModels
spec:
  rules:
    values:
      allowedValues:
      - publishers/meta/models/llama3:deploy
      - publishers/google/models/gemini-2.0-flash-001:tune
      - publishers/hf-google/models/gemma-2b:deploy
```

### Enable `web_search` for partner models

To enable the `web_search` feature for partner models, you can specify
the following:

- All features for all models from a specific publisher, for example: `publishers/anthropic`
- All features for a specific model, for example: `publishers/anthropic/models/MODEL_NAME`
- The `web_search` feature for a specific model, for example: `publishers/anthropic/models/MODEL_NAME:web_search`

The following example enables `web_search` for all models from Anthropic:

```yaml
name: organizations/ORGANIZATION_ID/policies/vertexai.allowedPartnerModelFeatures
spec:
  rules:
    values:
      allowedValues:
      # Allow all features of this publisher
      - publishers/anthropic
      # Allow all features of this model
      - publishers/anthropic/models/MODEL_NAME
      # Allow this feature
      - publishers/anthropic/models/MODEL_NAME:web_search
```

### Enable `structured_outputs` for partner models

To enable the `structured_outputs` feature for partner models, you can specify
the following:

- All features for all models from a specific publisher, for example: `publishers/anthropic`
- All features for a specific model, for example: `publishers/anthropic/models/MODEL_NAME`
- The `structured_outputs` feature for a specific model, for example: `publishers/anthropic/models/MODEL_NAME:structured_outputs`

The following example enables `structured_outputs` for all models from
Anthropic:

```yaml
name: organizations/ORGANIZATION_ID/policies/vertexai.allowedPartnerModelFeatures
spec:
  rules:
    values:
      allowedValues:
      # Allow all features of this publisher
      - publishers/anthropic
      # Allow all features of this model
      - publishers/anthropic/models/MODEL_NAME
      # Allow this feature
      - publishers/anthropic/models/MODEL_NAME:structured_outputs
```

## What's next

Guide

### [Use models in Model Garden](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/model-garden/use-models)

Use generative models from Model Garden in the .

Guide

### [Test model capabilities in Model Garden](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/model-garden/quickstart)

Quickly view and test what various models can do using demos in Model Garden.
