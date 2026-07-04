This page provides details to consider before subscribing to
Provisioned Throughput, the permissions you must have to place or to
view a Provisioned Throughput order, and the instructions for
placing and viewing your orders for standard Provisioned Throughput.

If you want to purchase Single Zone Provisioned Throughput,
[contact your
Google Cloud account representative](https://cloud.google.com/contact)
for assistance. For more information about
Single Zone Provisioned Throughput, see
[Single Zone Provisioned Throughput](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/provisioned-throughput/szpt).

## What to consider before purchasing

To help you decide whether you want to purchase
Provisioned Throughput, consider the following:

- **You can't cancel your order in the middle of your term.**

  Your Provisioned Throughput purchase is a commitment, which
  means that you can't cancel the order in the middle of your term. However, you
  can increase the number of purchased GSUs. If you accidentally purchase a
  commitment or there's a problem with your configuration, [contact your
  Google Cloud account representative](https://cloud.google.com/contact)
  for assistance.
- **You can auto-renew your subscription.**

  When you submit your order, you can choose to auto-renew your subscription at
  the end of its term, or let the subscription expire. You can also modify the
  auto renewal behavior of your order under specific circumstances. To learn
  about scenarios where you can't modify an order, see
  [When you can't change an order](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/provisioned-throughput/purchase-provisioned-throughput#no-order-changes).

  You can configure monthly subscriptions to renew automatically each month.
  Weekly terms don't support automatic renewal.

  For more information, see [Change a standard
  Provisioned Throughput order](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/provisioned-throughput/purchase-provisioned-throughput#change-order). You can also
  [contact your Google Cloud account representative](https://cloud.google.com/contact)
  for assistance.
- **You can change your auto-renewal behavior, model, model version, or region with notice.**

  After you've chosen your project, region, model, model version, and
  auto-renewal behavior, and your order is approved and activated,
  Provisioned Throughput is enabled, subject to available capacity.
  You can change your auto-renewal behavior, model, model version, or region by
  [modifying your existing Provisioned Throughput
  order](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/provisioned-throughput/purchase-provisioned-throughput#change-order) by using the Google Cloud console.

  All changes are processed based on commercially reasonable efforts and are
  typically fulfilled within 10 business days of the initial request.

  Model changes are limited to a specific publisher. For example, you can
  switch the model assignment of Provisioned Throughput from Google
  Gemini 2.0 Pro to Google
  Gemini 2.0 Flash, but you can't switch from Google
  Gemini 2.0 Flash to Anthropic's Claude 3.5 Sonnet v2.
- **By default, the overage is billed as pay-as-you-go.**

  If your throughput exceeds your Provisioned Throughput order
  amount, overages are processed and billed as standard pay-as-you-go. You can
  control overages on a per-request basis. For more information, see
  [Use Provisioned Throughput](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/provisioned-throughput/use-provisioned-throughput).

For information about pricing, see
[Provisioned Throughput](https://cloud.google.com/gemini-enterprise-agent-platform/generative-ai/pricing#provisioned-throughput).

### Purchase Provisioned Throughput for preview models

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

You can purchase Provisioned Throughput for Google models in
preview, provided that a generally available version of the model hasn't been
released.

If you have an active Provisioned Throughput order for a preview
model and a generally available version of the model is released, then you can
do either of the following:

- Move the order to the generally available version of the model. Note that
  after you move your order to the generally available model, you can't switch
  your order back to the preview model. For more information about changing an
  order, see
  [Change a standard Provisioned Throughput order](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/provisioned-throughput/purchase-provisioned-throughput#change-order).

- Alternatively, continue using Provisioned Throughput
  for the preview version of a model as long as the preview version is stable.
  For more information about stable and retired models, see
  [Model versions and lifecycle](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/model-versions).

## Roles and permissions

The following role grants full access to manage Gemini Enterprise Agent Platform
Provisioned Throughput:

- **`roles/aiplatform.provisionedThroughputAdmin`**: You can access Gemini Enterprise Agent Platform Provisioned Throughput resources.

This role includes the following permissions:

| **Permissions** | **Description** |
|---|---|
| `aiplatform.provisionedThroughputs.create` | Submit a new Provisioned Throughput order. |
| `aiplatform.provisionedThroughputs.get` | View a specific Provisioned Throughput order. |
| `aiplatform.provisionedThroughputs.list` | View all Provisioned Throughput orders. |
| `aiplatform.provisionedThroughputs.update` | Modify a Provisioned Throughput order. |
| `aiplatform.provisionedThroughputs.cancel` | Cancel a pending order or pending update. |

## Planning your Provisioned Throughput order

Consider the following when planning your Provisioned Throughput
orders.

### Quotas

If you expect your QPM to exceed 30,000, then to maximize your
Provisioned Throughput order,
[request a quota adjustment](https://docs.cloud.google.com/docs/quotas/help/request_increase) for your
default Agent Platform system quota using the following information:

- **Service**: The Agent Platform API.
- **Name** : `Online prediction requests per minute per region`
- **Service type**: A quota.
- **Dimensions**: The region where you ordered Provisioned Throughput.
- **Value**: This is your chosen online-prediction traffic limit.

### Order processing

Provisioned Throughput orders are processed based on the size of
the order and the available capacity. Depending on the number of GSUs requested
and the available capacity, it might take from a few minutes to a few weeks to
process your order. While placing a Provisioned Throughput order,
you can use the Generative AI scale unit estimator tool to calculate the
number of GSUs that you need to purchase. After reviewing the estimate, you can
either proceed with it, or modify the number of GSUs to purchase.

### Multiple pending orders

You can submit up to seven Google model orders for the same model and region,
even if a prior order is in an approved or pending state, as long as
the scheduled start time for each order is greater than 1 hour from
the scheduled start time of another order. If an order was submitted without
a start time, you won't be able to submit another unscheduled order.

## Place a standard Provisioned Throughput order

Follow these steps to purchase standard Provisioned Throughput.
For assistance with purchasing Single Zone Provisioned Throughput,
[contact your Google Cloud account representative](https://cloud.google.com/contact).

1. In the Google Cloud console, go to the
   **Provisioned Throughput** page.

   [Go to Provisioned Throughput](https://console.cloud.google.com/agent-platform/provisioned-throughput)
2. To start a new order, click **New order**.

3. Enter an **Order name**.

4. Select the **Model**.

5. Select the **Region**.

6. Click **Estimation tool**.

7. In the **Generative AI scale unit estimation tool** pane, perform the
   following steps to estimate the number of GSUs that you need.

   1. Select your **Model**.
   2. Based on the selected model, enter the details to estimate the number
      of GSUs needed. For information about the GSU minimum and purchase
      increments for each model, see
      [Supported models](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/provisioned-throughput/supported-models#google-models).
      For information about a model's capabilities and input or output
      limits, see the documentation for the model.

      - For the [Gemini 3 Pro](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/3-pro),
        [Gemini 2.5 Pro](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/2-5-pro),
        [Gemini 2.5 Flash](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/2-5-flash), and
        [Gemini 2.5 Flash-Lite](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/2-5-flash-lite)
        models, enter the following:

        - **Estimated queries per second requiring assurance**
        - **Input tokens per query**
        - **Input image tokens per query**
        - **Input video tokens per query**
        - **Input audio tokens per query**
        - **Average cache hit %**
        - **Output response text tokens per query**
        - **Output reasoning text tokens per query**
      - For the [Gemini 3 Pro Image](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/3-pro-image)
        model, enter the following:

        - **Estimated queries per second requiring assurance**
        - **Input tokens per query**
        - **Input image tokens per query**
        - **Output response text tokens per query**
        - **Output reasoning text tokens per query**
        - **Output image tokens per query**
      - For the [Gemini 2.5 Flash Image](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/2-5-flash-image)
        model, enter the following:

        - **Estimated queries per second requiring assurance**
        - **Input tokens per query**
        - **Input image tokens per query**
        - **Output response text tokens per query**
        - **Output image tokens per query**
      - For the [Gemini 2.5 Flash with
        Gemini Live API native audio)](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/2-5-flash-live-api)
        model, enter the following:

        - **Estimated queries per second requiring assurance**
        - **Input tokens per query**
        - **Input image tokens per query**
        - **Input video tokens per query**
        - **Input audio tokens per query**
        - **Session memory (cached) tokens per query**
        - **Output response text tokens per query**
        - **Output audio tokens per query**
      - For the Gemini 2.5 Flash with Gemini Live API, enter the following:

        - **Estimated queries per second requiring assurance**
        - **Input tokens per query**
        - **Input image tokens per query**
        - **Input video tokens per query**
        - **Input audio tokens per query**
        - **Session memory (cached) tokens per query**
        - **Output response text tokens per query**
        - **Output audio tokens per query**

        > [!NOTE]
        > **Note:** For information about access to this release, see the [access request page](https://docs.google.com/forms/d/e/1FAIpQLScxBeD4UJ8GbUfX4SXjj5a1XJ1K7Urwvb0iSGdGccNcFRBrpQ/viewform). For more information about using Provisioned Throughput for Gemini 2.5 Flash with Gemini Live API, see [Provisioned Throughput for Gemini Live API](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/provisioned-throughput/live-api).

      - For the [Gemini 2.0 Flash](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/2-0-flash)
        and [Gemini 2.0 Flash-Lite](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/2-0-flash-lite)
        models, enter the following:

        - **Estimated queries per second requiring assurance**
        - **Input tokens per query**
        - **Input image tokens per query**
        - **Input video tokens per query**
        - **Input audio tokens per query**
        - **Output text tokens per query**
      - For the [Veo 3](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/veo/3-0-generate-001)
        and [Veo 3 Fast](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/veo/3-0-fast-generate-001)
        models, enter the following:

        - **Frequency**---Specify how often outputs are generated, in seconds. This isn't the latency.
        - **Output video seconds per query** ---Enter the total requested video seconds. For example, 12 seconds represents the sum of `3x4` or `2x6` video seconds.
        - **Output video+audio seconds per query** ---Enter the total requested video and audio seconds. For example, 12 seconds represents the sum of `3x4` or `2x6` video and audio seconds.
      - For open models, enter the following:

        - **Estimated queries per second requiring assurance**
        - **Input tokens per query**
        - **Input image tokens per query** (for open models that support image input)
        - **Output response text tokens per query**
   3. In the **Estimated GSUs and monthly prices** section, review the
      estimated number of GSUs that you need and the prices.

8. Click **Use calculated**.

9. Optional: Modify the **Number of generative AI scale units (GSUs) per month**.

10. Select your **Term** . Note that term fees are not cancelable for the
    duration of the term and will apply regardless of actual usage or if the
    model is discontinued. Google recommends
    [changing your assigned model](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/provisioned-throughput/purchase-provisioned-throughput#change-order)
    prior to the model's
    [discontinuation date](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/model-versions#stable-versions-available).
    Google won't proactively cancel auto-renewal for discontinued models.

    The following options are available:
    - **1 week** (available only for Google models)
    - **1 month**
    - **3 months**
    - **1 year**
11. Optional: Select the **Start date and time** for your term.

    You can provide a start date and time within two weeks into the future from
    when you place the order. If you don't specify a start date and time, then
    the order is processed as soon as the capacity is available. Requested
    start dates and times are processed based on commercially reasonable efforts,
    and orders aren't guaranteed to be fulfilled by these dates until the order
    status is set to **Approved**.

    If your requested start date is too close to the current date, your order
    might be approved and activated after your requested start date. In this
    case, the end date is adjusted, based on the duration of the selected
    term, starting from the activation date. For information about cancelling
    a pending order, see [Change a standard
    Provisioned Throughput order](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/provisioned-throughput/purchase-provisioned-throughput#change-order).

    > [!NOTE]
    > **Note:** You can schedule a future start date and time only for Google models. Scheduling a start date and time isn't available for open models.

12. In the **Renewal** list, specify whether you want to automatically renew
    the order at the end of the term. You can specify the renewal option only
    if you select **1 month** , **3 months** , or **1 year** as the term.

13. Click **Continue**.

14. In the **Confirm and submit** section, review the price and throughput
    estimates for your order. Read the terms listed and linked in the form.

15. To finalize and submit your order, enter `CONFIRM` in the
    **Purchase confirmation** field, then click **Submit order**.

    It can take from a few minutes to a few weeks to process an order,
    depending on the order size and the available capacity. After the order is
    processed, its status in the Google Cloud console changes to
    **Active**. You're billed for the order only after it becomes active.

## Change a standard Provisioned Throughput order

You can modify your Provisioned Throughput orders by using
the Google Cloud console based on the status of your order and any
existing conditions. Modifying your orders is only available for online orders
for Google models placed through the console. For changes to offline orders or
orders for open models, contact your
[Google Cloud account representative](https://cloud.google.com/contact)
for assistance. You can't change Provisioned Throughput orders for
Google models to open models.

When you use the Google Cloud console to change your model or model version,
the existing order's model or model version is updated, but
the subscription end date remains the same.

You can provide a start date and time within the next two weeks for
your change request. If you don't specify a start date and time,
then the change request is processed as soon as the capacity is
available. Requested start dates and times are processed based on
commercially reasonable efforts, and order changes aren't guaranteed to be
fulfilled by these dates until the change status is set to **Approved**.

If your requested start date is too close to the current date, your
change order might be approved and activated after your requested start date.
For information about cancelling a pending change order, see
the following table.

The following table describes how to modify your
Provisioned Throughput orders by using the
[Google Cloud console](https://console.cloud.google.com/agent-platform/provisioned-throughput)

| **Order status** | **Action** | **Note** | **Steps in Google Cloud console** |
|---|---|---|---|
| **Pending review** | You can cancel your order. | If you have additional changes to your order, then cancel the pending order, and place a new order. If you have multiple models, each model can have only one pending order revision. | To cancel your pending order in the Google Cloud console, do the following: 1. Go to the [**Provisioned Throughput** page](https://console.cloud.google.com/agent-platform/provisioned-throughput). 2. Select the **Region** where your pending order is located. 3. To go to the **Order details** page, click the **Order ID** for the order that you want to cancel. 4. Click **Cancel**. 5. In the **Are you sure you want to cancel the order?** dialog, click **Cancel Order**. |
| **Approved** | You can't modify your order. | The order is awaiting activation. You can't make changes to your order at this time. | Not applicable |
| **Active** | You can make the following changes only if the order doesn't expire in the next five days or renews automatically: - Increase GSUs on existing orders. An increase in GSUs is applied immediately upon approval, regardless of the auto-renewal schedule. - Decrease GSUs on existing orders. A decrease in GSUs is applied during auto-renewal for the next term. - Enable or disable automatic renewals. - Change the model or model version. - Change the region. | You can't change an active order if it expires in less than five days and isn't set up to renew automatically. | To change your active order in the Google Cloud console, use one of the following methods: - In the [**Provisioned Throughput**](https://console.cloud.google.com/agent-platform/provisioned-throughput) page, click the symbol from the **Actions** column, and click **Edit**. - In the **Order details** page, click the **Edit** button. |

### Split an order

You can divide an active order into two orders while maintaining the same
model, region, term, expiration time, and renewal policy to facilitate
partial migrations.

To split an order, do the following:

1. In the Google Cloud console, go to the
   **Provisioned Throughput Orders** page.

   [Go to Provisioned Throughput Orders](https://console.cloud.google.com/agent-platform/provisioned-throughput/orders)
2. Click an Order ID.

3. On the **Order details** page, click the **Split** button.

4. Enter an **Order name** for the split order that you are creating.

5. Enter the number of GSUs to be moved from the original order to this
   new order.

6. Review the **Summary of changes** table to understand how this action
   will impact your existing order.

7. Click **Submit changes**.

   The Orders summary page opens. On the Orders summary page, your new
   split order is shown with an **Approved** status.

Within 10 minutes, the split order will move to **Active** status and
the original order's GSU count will be reduced by the number of GSUs
activated on the newly created order. There is no loss in service or increase
in billing charges as a result of this change.

### When you can't change an order

You can't change or cancel a Provisioned Throughput order
from the Google Cloud console if any of the following conditions apply:

- **Model limitations:** The order is for a model that doesn't support
  modifications.

- **Order status:** The order status isn't `Active`.

- **Expiring in less than five days:** The order status is `Active`, but
  it expires in less than five days and isn't configured for auto-renewal.

- **Existing order change request:** There's an existing order change request
  that's either pending or approved.

## Check order status

After you submit your Provisioned Throughput order, the order status might
appear as one of the following:

- **Pending review** : You placed your order. Because approval depends on available capacity to provision your order, your order is waiting for review and approval. For more information about the status of your pending order, [contact your Google Cloud account representative](https://cloud.google.com/contact).
- **Approved**: Google has approved your order and the order is awaiting activation. You can't make changes after the order is approved.
- **Active**: Google has activated your order, and then billing starts.
- **Expired**: Your order has expired.

## View standard Provisioned Throughput orders

Follow these steps to view your Provisioned Throughput orders:

1. In the Google Cloud console, go to the Provisioned Throughput page.

   [Go to Provisioned Throughput](https://console.cloud.google.com/agent-platform/provisioned-throughput)
2. Select the **Region**. Your list of orders appears.

## What's next

- [Use Provisioned Throughput](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/provisioned-throughput/use-provisioned-throughput).
