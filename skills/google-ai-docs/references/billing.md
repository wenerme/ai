This guide provides an overview of different Gemini API billing options,
explains how to enable billing and monitor usage, and provides answers to
frequently asked questions (FAQs) about billing.
[Upgrade to the Gemini API paid tier](https://aistudio.google.com/api-keys)

## About billing and tiers

Billing for the Gemini API is based on two pricing tiers: the **Free Tier** and
the **Paid Tier** (*pay-as-you-go* or *pay only for what you use* ). The Free
Tier is available for certain models, which are documented on the
[Pricing](https://ai.google.dev/gemini-api/docs/pricing) page. Pricing and
[rate limits](https://ai.google.dev/gemini-api/docs/rate-limits) differ between tiers and vary by
[model](https://ai.google.dev/gemini-api/docs/models/gemini).

[Google AI Studio](https://aistudio.google.com/) also provides free usage up to
a limit for some models, separate from the API Free Tier. For access to
Paid-only models and features in AI Studio, you can link a Paid API Key.
You can unlink an API Key to return to the Free AIS quota.

### Why use the Paid Tier?

Upgrading to the **Paid Tier** lets you access higher
[rate limits](https://ai.google.dev/gemini-api/docs/rate-limits), use advanced models, and ensures
your prompts and responses are **not** used to improve Google products
(enterprise-grade data privacy). For more information on data use for paid
services, see the [Terms of Service](https://ai.google.dev/gemini-api/terms#data-use-paid).

## Set up billing to access the Paid Tier

You can create a [project](https://ai.google.dev/gemini-api/docs/billing#cloud-billing) and set up billing, or import an
existing project to upgrade to the Paid Tier directly in
[Google AI Studio](https://aistudio.google.com/) without switching to the
[Google Cloud console](https://console.cloud.google.com/). You'll gain immediate
billable status without any upfront
costs, and pay later only for the specific resources you consume during the
billing cycle (read the [Cloud automated billing setup](https://docs.cloud.google.com/billing/docs/in-product-billing-setup)
for more information).

1. Go to the [AI Studio API keys](https://aistudio.google.com/api-keys) page (or anywhere you see "Set up billing" in AI Studio).
2. New users will have a project and API key created for them by default.
   1. If you need a new key, click **Create API key** and follow the dialog to add a key-project pair to the table.
3. Find the project you want to upgrade to the Paid Tier and click **Set up Billing** under the **Quota tier** column.
   1. If a project is already on a Paid Tier, you might see the option to [**Upgrade**](https://ai.google.dev/gemini-api/docs/billing#upgrade).
4. Setup differs for new and existing Cloud Billing users:
   1. [New Cloud Billing users](https://ai.google.dev/gemini-api/docs/billing#new-user)
   2. [Existing Cloud Billing users](https://ai.google.dev/gemini-api/docs/billing#existing-user)

### New users

*This workflow is for users with no existing Google [billing](https://ai.google.dev/gemini-api/docs/billing#cloud-billing)
accounts.*

1. [Follow the steps](https://ai.google.dev/gemini-api/docs/billing#setup-billing) to choose your project and API key for set up.
2. Select your country to agree to the Terms of Service in the **Setup your
   Google Cloud billing account** window.
3. If you have any existing payment profiles linked to your account, you'll see your **Contact information** and **Payment method** filled in the **Add your
   billing account details** window. Click **Change** to edit either field.
4. If you don't have an existing payment profile, click the **+** button for both **Contact information** and **Payment method** and follow the instructions to fill out your details in their respective windows.
5. Click **Finish account setup**.
6. The next window will inform you of your [billing status](https://ai.google.dev/gemini-api/docs/billing#verify-billing).

### Existing users

*This workflow is for users who have previously set up Google
[billing](https://ai.google.dev/gemini-api/docs/billing#cloud-billing) with their account.*

1. [Follow the steps](https://ai.google.dev/gemini-api/docs/billing#setup-billing) to choose your project and API key for set up.
2. You will have several options in the **Set up your Cloud Billing account** window:
   1. If you have multiple billing accounts, click the **Select billing account** menu to choose the one you'd like to link to your selected project.
   2. If you only have one billing account, that account will be automatically selected in the menu.
   3. If you don't want to use any of your existing accounts, click **Add new
      billing account** under the menu. This will trigger step 3 in the [New Cloud Billing users](https://ai.google.dev/gemini-api/docs/billing#new-user) section.
3. Click **Finish setup**.
4. The next window will inform you of your [billing status](https://ai.google.dev/gemini-api/docs/billing#verify-billing).

## Upgrade to the next Paid Tier

If you're already on a Paid Tier and meet the
[criteria](https://ai.google.dev/gemini-api/docs/rate-limits#usage-tiers) for a plan change, you will
be automatically upgraded to the next tier.

## Verify billing status

After you [Set up billing for the paid tier](https://ai.google.dev/gemini-api/docs/billing#setup-billing), you'll immediately
be informed whether setup was successful. You can
also verify that your Google Cloud Project is linked to the Google Cloud Billing
account and ready for paid usage on the
[API keys page](https://aistudio.google.com/api-keys). Your key's billing status
in the **Quota tier** column might show:

- **Tier 1, 2, or 3**: Verifies your project is linked and immediately billable.
- **Action needed**: You need to take action on your account, like pay a bill, update a payment method, etc.

## Monitor usage

You can monitor your usage of the Gemini API in
[Google AI Studio](https://aistudio.google.com/usage) in **Dashboard** \>
**Usage**.

## Project spend caps

> [!WARNING]
> **Experimental:** The feature is experimental and may change in scope.

You can set your own [project-level](https://ai.google.dev/gemini-api/docs/api-key#google-cloud-projects) spend caps in AI Studio.
This is useful if you have multiple projects under the same billing
account and want to ensure each has access to enough of the spending limit.

Accounts with the project editor, owner, or admin [roles](https://docs.cloud.google.com/iam/docs/roles-overview) can set spend caps per
project in AI Studio on the [Spend](https://aistudio.google.com/spend) page
under **Monthly spend cap** \> **Edit spend cap**.

If you switch a project to a different billing account, any spend cap you
already set for that project will persist, but any accumulated spend will
reset to $0 for the new billing cycle.

[Batch mode](https://ai.google.dev/gemini-api/docs/batch-api) completions may still incur overages.

> [!CAUTION]
> **Caution:** Billing data processing times can be slightly delayed in AI Studio, up to around 10 minutes. You may experience overages beyond your project cap if billing data hasn't processed before more charges are accrued.

## Cloud Billing

The Gemini API uses
[Cloud Billing](https://cloud.google.com/billing/docs/concepts) for billing
services, which you can [set up directly in AI Studio](https://ai.google.dev/gemini-api/docs/billing#setup-billing). You can
use AI Studio to track spending and understand costs. You can access the same
information and make payments in your Cloud billing account.

> [!NOTE]
> **Note:** [New users](https://ai.google.dev/gemini-api/docs/billing#new-user) may be granted a [$300 welcome credit](https://docs.cloud.google.com/billing/docs/in-product-billing-setup#welcome-credits) in their new Google Cloud Billing accounts. You can't use these credits on AI Studio or the Gemini API, but you can use them on other Google Cloud products in the [Google Cloud console](https://console.cloud.google.com/).

## Frequently asked questions

This section provides answers to frequently asked questions.

### What am I billed for?

Gemini API pricing is based on the following:

- Input token count
- Output token count
- Cached token count
- Cached token storage duration

For pricing information, see the [Pricing page](https://ai.google.dev/pricing).

### Where can I view my quota?

You can view your quota and system limits in
[AI Studio](https://aistudio.google.com/usage) or the
[Google Cloud console](https://console.cloud.google.com/apis/api/generativelanguage.googleapis.com/quotas).

### How do I request more quota?

To request a paid tier [rate limit](https://ai.google.dev/gemini-api/docs/rate-limits#request-rate-limit-increase) increase, use [this
form](https://forms.gle/ETzX94k8jf7iSotH9).

### Can I use the Gemini API for free in EEA (including EU), the UK, and CH?

Yes, we make the free tier and paid tier available in [many regions](https://ai.google.dev/gemini-api/docs/available-regions).

### If I set up billing with the Gemini API, will I be charged for my Google AI Studio usage?

AI Studio usage remains free of charge unless users link a paid API key for
access to paid features.
Once you link a paid API key as part of a paid project in AI Studio, you will be
charged for AI Studio usage for that key. You can switch between Paid Tier
projects and Free Tier projects in AI Studio as needed.

### Can I use 1M tokens in the free tier?

The free tier for Gemini API differs based on the model selected. For now, you
can try the 1M token context window in the following ways:

- In Google AI Studio
- With pay-as-you-go plans
- With free-of-charge plans for select models

### How can I calculate the number of tokens I'm using?

Use the [`GenerativeModel.count_tokens`](https://ai.google.dev/api/python/google/generativeai/GenerativeModel#count_tokens)
method to count the number of tokens. Refer to the [Tokens guide](https://ai.google.dev/gemini-api/docs/tokens) to learn more about tokens.

### Can I use my Google Cloud welcome credit with the Gemini API?

No, the Google Cloud [welcome credit](https://docs.cloud.google.com/billing/docs%20in-product-billing-setup#welcome-credits)
or free trial credit can't be used towards the Gemini API or AI Studio.

If you were granted a Google Cloud welcome credit before they became
ineligible, you can spend your remaining credits on the Gemini API and AI
Studio, up until the credits expire after 90 days.

### How is billing handled?

Billing for the Gemini API is handled by the [Cloud billing](https://cloud.google.com/billing/docs/concepts) system. Learn about the
automated Billing setup in the [Cloud billing documentation](http://docs.cloud.google.com/billing/docs).

### Am I charged for failed requests?

If your request fails with a 400 or 500 error, you won't be charged for the
tokens used. However, the request will still count against your quota.

### Is `GetTokens` billed?

Requests to the `GetTokens` API are not billed, and they don't count against
inference quota.

### How is my Google AI Studio data handled if I have a paid API account?

Refer to the [Terms of service](https://ai.google.dev/gemini-api/terms#paid-services) for details on
how data is handled when Cloud billing is enabled (see "How Google Uses Your
Data" under "Paid Services"). Note that your Google AI Studio prompts are
treated under the same "Paid Services" terms so long as at least 1 API project
has billing enabled, which you can validate on the
[Gemini API key page](https://aistudio.google.com/api-keys) if you see any
projects marked as "Paid" under "Plan".

### Where can I get help with billing?

To get help with billing, see
[Get Cloud billing support](https://cloud.google.com/support/billing).