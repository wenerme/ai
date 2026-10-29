# API credits for ChatGPT subscribers

> For the complete documentation index, see [llms.txt](/llms.txt). Markdown versions of documentation pages are available by appending `.md` to the page URL.

Eligible ChatGPT Pro and Business subscriptions can claim free API credits as part of their subscription benefits. Activate the benefit by linking your subscription to an API organization you own, then use the credits to build apps and agents with the OpenAI API.

- **Up to $500 per month:** Your allowance depends on your Pro plan or your Business workspace’s paid seats.
- **Activate once:** Receive credits automatically when your subscription renews, while these benefits are available and your subscription is eligible.
- **Use them before your billing cycle ends:** Unused credits expire at the end of the billing cycle and don't roll over.
- **No API payment method required:** You can use the API with active free credits.

The benefit is subject to [API terms](https://openai.com/policies/service-credit-terms/) and [policies](https://openai.com/policies/usage-policies/) including [API rate limits](https://developers.openai.com/api/docs/guides/rate-limits). Check the limits for your organization and models in [organization limits](https://platform.openai.com/settings/organization/limits).

## Credit amounts

| ChatGPT subscription | Monthly API credits (USD)  |
| -------------------- | -------------------------- |
| Pro ($100 tier)      | $100                       |
| Pro ($200 tier)      | $200                       |
| Pro ($500 tier)      | $500                       |
| Business Standard    | $20 per paid Standard seat |
| Business Premium     | $100 per paid Premium seat |

Your first grant is prorated for the time left in your current subscription billing cycle and expires at the end of that billing cycle.

Business API Credits are pooled and capped at $500 per workspace per month. Business workspaces that pay annually upfront receive the full year’s grant in one issuance, and the grant expires at the end of the annual billing cycle.

## Eligibility

To claim the benefit:

- Have an active, paid ChatGPT Pro or Business subscription that is at least seven days old. Free trials and complimentary subscriptions don't qualify.
- Be an owner of the ChatGPT subscription or Business workspace and an owner of the API organization receiving the credits.
- Use the same email address for your ChatGPT account and the API account used to link the organization.

## Claim your credits

Choose where to start. Both paths link the same subscription benefit to your selected API organization.

If you’re new to the API, you will be able to link your subscription to your Personal API Organization. Use the email address associated with your eligible ChatGPT subscription.



  


1. Sign in to [**ChatGPT**](https://chatgpt.com/) with the account that owns the eligible subscription.
2. For Pro, open [**Settings → Billing**](https://chatgpt.com/settings/billing). For Business, open your workspace’s billing settings in ChatGPT or the [**Admin Console**](https://admin.openai.com/).
3. Find the API credits benefit and start the claim flow.
4. Review the API organization that will receive the credits. If you own multiple eligible organizations, select the one you would like to link.
5. Confirm to activate the benefit.

  

  


1. Sign in to [**API Platform**](https://platform.openai.com/) with the email address associated with your eligible ChatGPT subscription.
2. Select the API organization you own that should receive the credits.
3. Open [**Billing**](https://platform.openai.com/settings/organization/billing/) and find the API credit benefit.
4. Select the eligible ChatGPT subscription or Business workspace you own to link.
5. Confirm to activate the benefit.

  




After claiming, open [API Platform billing settings](https://platform.openai.com/settings/organization/billing/overview) to see your credits. Now, you're ready to start building with the API!

- Follow the [**API quickstart**](https://developers.openai.com/api/docs/quickstart) to make your first request.
- Build an agent with the [Agents API](https://platform.openai.com/agents).
- Start building and testing prompts in the [Responses](https://platform.openai.com/chat/), [Decisions](https://platform.openai.com/decisions), and [Audio](https://platform.openai.com/audio/live) playgrounds.
- Track usage in the [**Usage dashboard**](https://platform.openai.com/usage).
- Use the [**OpenAI Developers Plugin**](https://chatgpt.com/plugins/openai-developers?open_in_app) in ChatGPT to build with the API, securely create API keys directly in ChatGPT, and build together with the API and ChatGPT Sites.

## What the credits cover

These benefits cover paid API Platform usage billed to the linked organization, including:

- **[Responses API](https://developers.openai.com/api/docs/guides/text)** for text, code, and image understanding.
- **[Agents API](https://developers.openai.com/api/docs/guides/agents-api/overview)** for running agents, including OpenAI-hosted sandbox charges.
- **[Decisions API](https://developers.openai.com/api/docs/guides/decisions)** for structured decisions.
- **[GPT-Live](https://developers.openai.com/api/docs/guides/live)** and the **[Realtime API](https://developers.openai.com/api/docs/guides/realtime)** for real-time voice interactions.
- **[Images API](https://developers.openai.com/api/docs/guides/image-generation)** for image generation and editing.
- **[Built-in tools](https://developers.openai.com/api/docs/guides/tools)** and their associated usage and storage charges, such as web search, file search, and Code Interpreter.
- Other APIs are available through [API Platform](https://platform.openai.com).

Codex usage through API keys is not supported by this benefit. These API
  credits also don't increase your ChatGPT or signed-in Codex usage limits.

## When your free credits run out

Your organization uses free API credits before purchased API credits. When your free API credit balance runs out:

| Organization balance         | What happens                                                                 |
| ---------------------------- | ---------------------------------------------------------------------------- |
| Purchased API credits remain | API usage continues using your purchased credits.                            |
| No credits remain            | API requests fail with HTTP `429` and error code `credit_balance_exhausted`. |

To continue when no credits remain:

- Add paid API credits in your organization’s [**billing settings**](https://platform.openai.com/settings/organization/billing/overview).
- Set up Auto Recharge to add paid credits to continue building without errors and interruptions.

## More about this benefit

- **Organization-specific credits:** Grants apply only to the linked API organization. Select that organization and use one of its project API keys when making requests.
- **Subscription changes:** Upgrading your Pro plan can provide extra prorated credits for the rest of the billing cycle. Later grants reflect the eligible plan's allowance, up to $500 per billing cycle.
- **Business seat changes:** Adding paid seats or upgrading seat types during a billing cycle can provide extra prorated credits, subject to a shared workspace cap of $500 per monthly billing cycle or $6,000 per annual billing cycle. Seat reductions affect the next billing cycle. Reassigning an existing seat to another person doesn't create extra credits.
- **Cancellation or an ineligible plan:** New grants stop when your subscription is no longer eligible. Cancellation alone doesn't revoke credits already issued; you can use them until they expire.
- **Downgrading to an ineligible plan:** If you downgrade to an ineligible ChatGPT plan, such as Plus, Go, or Free, your API organization link is removed at the end of the billing cycle.
- **Moving from Pro to Business:** Moving to Business ends the Pro link. After the workspace's paid subscription has been active for seven days, a Business workspace owner can create a new link to claim the Business benefit.
- **Moving from Business to Enterprise:** If your ChatGPT Business subscription moves to ChatGPT Enterprise, your API organization link is removed at the end of the billing cycle. ChatGPT Enterprise is not eligible for this benefit.
- **Changing the receiving organization:** Contact support if you need to change the linked API Organization.