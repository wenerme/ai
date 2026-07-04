Some generative AI models, such as [Gemini](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models), have managed APIs and are ready to accept prompts without deployment. For a list of models with managed APIs, see [Foundational model APIs](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models#foundation_model_apis).

Other generative AI models must be deployed to an endpoint before
they're ready to accept prompts. There are two types of generative models that
must be deployed:

- [Tuned models](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/deploy/overview#deploy-a-tuned-model), which you create by tuning a
  supported foundation model with your own data.

- [Generative models that don't have managed APIs](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/deploy/overview#not-managed). In the
  Model Garden, these are models that aren't labeled as
  **API available** or **Agent Platform Studio**---for example, Llama 2.

When you deploy a model to an endpoint, Gemini Enterprise Agent Platform associates compute
resources and a URI with the model so that it can serve prompt requests.

## Deploy a tuned model

Tuned models are automatically uploaded to the
[Gemini Enterprise Agent Platform Model Registry](https://docs.cloud.google.com/gemini-enterprise-agent-platform/machine-learning/model-registry/introduction)
and deployed to an Agent Platform shared public
[`endpoint`](https://docs.cloud.google.com/gemini-enterprise-agent-platform/reference/rest/v1/projects.locations.endpoints). Tuned models don't
appear in the Model Garden because they are tuned with your data.
For more information, see
[Overview of model tuning](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/tune-models).

Once the endpoint is *active* , it is ready to accept prompt requests at its URI.
The format of the API call for a tuned model is the same as the foundation model
it was tuned from. For example, if your model is tuned on Gemini, then your
prompt request should follow the [Gemini API](https://docs.cloud.google.com/gemini-enterprise-agent-platform/reference/models/inference).

Make sure you send prompt requests to your tuned model's endpoint instead of the
managed API. The tuned model's endpoint is in the format:

```
https://LOCATION-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/endpoints/ENDPOINT_ID
```

To get the endpoint ID, see [View or manage an endpoint](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/deploy/overview#view-or-manage-an-endpoint).

## Deploy a generative model that doesn't have a managed API

To use a model from the Model Garden that doesn't have a managed
API, you must upload the model to Model Registry and
deploy it to an endpoint before you can send prompt requests. This is similar to
uploading and [deploying a custom trained model for online prediction](https://docs.cloud.google.com/gemini-enterprise-agent-platform/machine-learning/general/deployment)
in Agent Platform.

To deploy one of these models, go to the Model Garden and select
the model you'd like to deploy.

[Go to Model Garden](https://console.cloud.google.com/agent-platform/model-garden)

Each model card displays one or more of the following deployment options:

- **Deploy** button: Most of the generative models in
  the Model Garden have a **Deploy** button that walks you
  through deploying to Agent Platform. If you don't see a **Deploy**
  button, go to the next bullet.

  For deployment on Agent Platform, you can use the
  suggested settings or modify them. You can also set **Advanced** deployment
  settings to, for example, select a Compute Engine
  [reservation](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/deploy/overview#reservation).

  > [!NOTE]
  > **Note:** Some models also support deployment to Google Kubernetes Engine which is an unmanaged solution that provides you even more control. For more information, see [Serve a model with a single GPU in GKE](https://docs.cloud.google.com/kubernetes-engine/docs/tutorials/online-ml-inference).

- **Open Notebook** button: This option opens a Jupyter notebook. Every model
  card displays this option. The Jupyter notebook includes instructions and
  sample code for uploading the model to Model Registry,
  deploying the model to an endpoint, and sending a prompt request.

Once deployment is complete and the endpoint is *active* , it is ready to accept
prompt requests at its URI. The format of the API is
[`predict`](https://docs.cloud.google.com/gemini-enterprise-agent-platform/reference/rest/v1/projects.locations.endpoints/predict) and the format
of each [`instance`](https://docs.cloud.google.com/gemini-enterprise-agent-platform/reference/rest/v1/projects.locations.endpoints/predict#body.request_body.FIELDS.instances)
in the request body depends on the model. For more information, see the
following resources:

- [Request body for online prediction](https://docs.cloud.google.com/gemini-enterprise-agent-platform/machine-learning/predictions/get-online-predictions#request-body-details)
- [Format your input for online prediction](https://docs.cloud.google.com/gemini-enterprise-agent-platform/machine-learning/predictions/get-online-predictions#formatting-prediction-input)

Make sure you have enough machine quota to deploy your model. To view your
current quota or request more quota, in the Google Cloud console, go to the
**Quotas** page.

[Go to Quotas](https://console.cloud.google.com/iam-admin/quotas)

Then, filter by the quota name `Custom Model Serving` to see the quotas for
online prediction. To learn more, see [View and manage quotas](https://docs.cloud.google.com/docs/quotas/view-manage).

### Ensure capacity for deployed models with Compute Engine reservations

You can deploy Model Garden models on VM resources that have been
allocated through Compute Engine reservations. Reservations help ensure
that capacity is available when your model predictions requests need them. For
more information, see [Use reservations with prediction](https://docs.cloud.google.com/gemini-enterprise-agent-platform/machine-learning/predictions/use-reservations).

## View or manage a model

For tuned models, you can view the model and its tuning job on the **Tune and
Distill** page in the Google Cloud console.

[Go to Tune and Distill](https://console.cloud.google.com/agent-platform/)

You can also view and manage all of your uploaded models in
Model Registry.

[Go to Model Registry](https://console.cloud.google.com/agent-platform/models)

In Model Registry, a tuned model is categorized as a
*Large Model*, and has labels that specify the foundation model and the pipeline
or tuning job that was used for tuning.

Models that are deployed with the **Deploy** button will indicate **Model Garden**
as its [`Source`](https://docs.cloud.google.com/gemini-enterprise-agent-platform/reference/rest/v1/projects.locations.models#Model.FIELDS.model_source_info).
Note that, if the model is updated in the Model Garden, your
uploaded model in Model Registry is not updated.

For more information, see [Introduction to
Gemini Enterprise Agent Platform Model Registry](https://docs.cloud.google.com/gemini-enterprise-agent-platform/machine-learning/model-registry/introduction).

## View or manage an endpoint

To view and manage your endpoint, go to the Agent Platform
**Online prediction** page. By default, the endpoint's name is the same as the
model's name.

[Go to Online prediction](https://console.cloud.google.com/agent-platform/online-prediction/endpoints)

For more information, see [Deploy a model to an endpoint](https://docs.cloud.google.com/gemini-enterprise-agent-platform/machine-learning/general/deployment).

## Monitor model endpoint traffic

To learn how to monitor model endpoint traffic, see
[Monitor models](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/model-observability#monitor-traffic).

## Limitations

- A tuned Gemini model can only be deployed to a shared public endpoint. Deployment to dedicated public endpoints, Private Service Connect endpoints, and private endpoints isn't supported.

## Pricing

For tuned models, you are billed per token at the same rate as the foundation
model your model was tuned from. There is no cost for the endpoint because
tuning is implemented as a small adapter on top of the foundation model.

For models without managed APIs, you are billed for the machine hours that are
used by your endpoint at the same rate as Agent Platform online
predictions. You are not billed per token. For more information, see
[pricing for predictions in Agent Platform](https://cloud.google.com/gemini-enterprise-agent-platform/generative-ai/pricing#prediction-prices).

## What's next

- [Overview of model tuning](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/tune-models)
- [Deploy a model to an endpoint](https://docs.cloud.google.com/gemini-enterprise-agent-platform/machine-learning/general/deployment)
