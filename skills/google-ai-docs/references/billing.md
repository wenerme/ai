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
billing cycle (read the [Cloud automated Billing setup](https://docs.cloud.google.com/billing/docs/in-product-billing-setup)
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

After you [Set up billing for the Paid Tier](https://ai.google.dev/gemini-api/docs/billing#setup-billing), you'll immediately
be informed whether setup was successful. You can
also verify that your Google Cloud Project is linked to the Google Cloud Billing
account and ready for paid usage on the
[API keys page](https://aistudio.google.com/api-keys). Your key's billing status
in the **Quota tier** column might show:

- **Tier 1, 2, or 3**: Verifies your project is linked and immediately billable.
- **Action needed** : You need to submit a one time [prepayment](https://ai.google.dev/gemini-api/docs/billing#prepay) that applies to your account usage.

### One-time prepayment verification

Google may require a one-time prepayment to activate the paid tier for the
Gemini API. This measure helps maintain the security and availability of our
platform for all users. It is not a fee; it is a credit that is applied directly
to your account for future use.

#### Prepayment process

1. [**Set up billing**](https://ai.google.dev/gemini-api/docs/billing#setup-billing): When you activate the Gemini API on a project linked to an eligible billing account, we'll notify you if a prepayment is required.
2. [**Get notified**](https://ai.google.dev/gemini-api/docs/billing#verify-billing): You'll see a dialog in AI Studio after billing account setup, and receive an email informing you of the requirement.
3. **Make a payment** : On the API keys page, click **Action needed** under **Quota tier** for your newly linked key.
4. **Get upgraded**: Once your payment is successfully processed (which is instant for most payment methods), your project will upgrade to the Paid Tier, and your new rate limits will apply.

## Monitor usage

You can monitor your usage of the Gemini API in
[Google AI Studio](https://aistudio.google.com/usage) in **Dashboard** \>
**Usage**.

## Cloud Billing

The Gemini API uses
[Cloud Billing](https://cloud.google.com/billing/docs/concepts) for billing
services, which you can [set up directly in AI Studio](https://ai.google.dev/gemini-api/docs/billing#setup-billing). You can
use AI Studio to track spending and understand costs. You can access the same
information and make payments in your Cloud Billing account.

> [!NOTE]
> **Note:** [New users](https://ai.google.dev/gemini-api/docs/billing#new-user) may be granted a [$300 welcome credit](https://docs.cloud.google.com/billing/docs/in-product-billing-setup#welcome-credits) in their new Google Cloud Billing accounts. You can't use these credits on AI Studio or the Gemini API, but you can use them on other Google Cloud products in the [Google Cloud console](https://ai.google.dev/gemini-api/docs/console.cloud.google.com).

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

Billing for the Gemini API is handled by the [Cloud Billing](https://cloud.google.com/billing/docs/concepts) system. Learn about the
automated Billing setup in the [Cloud Billing documentation](http://docs.cloud.google.com/billing/docs).

### Am I charged for failed requests?

If your request fails with a 400 or 500 error, you won't be charged for the
tokens used. However, the request will still count against your quota.

### Is there a charge for fine-tuning the models?

[Model tuning](https://ai.google.dev/gemini-api/docs/model-tuning) is no longer supported in the
Gemini API or AIS.

### Is `GetTokens` billed?

Requests to the `GetTokens` API are not billed, and they don't count against
inference quota.

### How is my Google AI Studio data handled if I have a paid API account?

Refer to the [Terms of Service](https://ai.google.dev/gemini-api/terms#paid-services) for details on
how data is handled when Cloud billing is enabled (see "How Google Uses Your
Data" under "Paid Services"). Note that your Google AI Studio prompts are
treated under the same "Paid Services" terms so long as at least 1 API project
has billing enabled, which you can validate on the
[Gemini API Key page](https://aistudio.google.com/api-keys) if you see any
projects marked as "Paid" under "Plan".

### What happens to my prepayment?

The full amount is added as a credit to your Cloud Billing account. This credit
will automatically be used to pay for any usage you accrue on Google Cloud,
including the Gemini API or other services like Compute Engine and Cloud
Storage.

### What if I don't prepay?

No problem. Your project will remain on the Gemini API free tier. You won't lose
any access, but you'll be subject to the free tier's rate limits. You can choose
to complete the prepayment at any time in the future to upgrade.

### Can I get a refund for my prepayment?

Yes. If you have a credit balance on your account, you can request a refund
through the Cloud Console, subject to our standard refund policies.

### What happens if I spend beyond the prepaid amount?

Once your prepaid credit balance is exhausted, your account will transition to
standard billing. Any additional usage will be charged to the primary payment
method linked to your Cloud Billing account.

### Where can I get help with billing?

To get help with billing, see
[Get Cloud Billing support](https://cloud.google.com/support/billing).