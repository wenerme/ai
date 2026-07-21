# AI Credits

> [!NOTE]
> This page covers how AI credits work. For plan and seat-based billing, see [Billing and plans](https://linear.app/docs/billing-and-plans).

## How AI credits work

Linear's [coding sessions](https://linear.app/docs/coding-sessions) and [Loops](https://linear.app/docs/loops)[ ](https://linear.app/docs/loops)features are billed based on actual usage, not a fixed per-seat fee. Charges are deducted from a prepaid, workspace-level balance.

* Your balance is shown in US dollars
* The balance is pooled across the workspace and shared across AI features that use it
* You add funds to your balance before they are spent by topping up your credit balance

Using AI credits is **opt-in**. If your workspace never adds funds, you will not have access to these additional features, and you will never be charged for them.

## How AI credits are used

Feature | Available on | How it's billed
--- | --- | ---
Coding sessions | Basic, Business, and Enterprise | Per session, based on the model chosen, complexity of the work, and how long the session runs.
Loops | Business and Enterprise | Per loop run, based on on the complexity of the loop's instructions and if coding sessions are used.

AI credits are currently used by:

* **Coding sessions**, when Linear Agent writes code and creates pull requests
* **Agent loops**, when a loop runs agent work in the background

Other Linear AI features are included in your plan and do not draw from your AI credits balance.

## Typical costs

Cost | Task
--- | ---
$0.07 - $0.20 | Loop run without a coding session
$0.50 - $1 | Coding session copy and styling tweaks
$3 - $5 | Coding session small bug fixes
$5+ | The cost of more complex tasks varies depending on the time, token consumption, and selected model

You can see a live breakdown of usage by feature and by user in [_Settings → Workspace → Billing → AI Usage and credits._](https://linear.app/settings/billing/usage)

## Choosing a coding session model

By default, coding sessions use the latest zero-data-retention models. You have the option to select from a number of available models here, which affects the quality and cost of code changes - more on this in our [coding sessions docs](http://linear.app/docs/coding-sessions).

## Adding credits to your balance

Adding credits is restricted to Workspace admins (Owners on Enterprise workspaces). You can add credits from [_Settings → Workspace → Billing → AI Usage and credits._](https://linear.app/settings/billing/usage)

#### Ad-hoc credits

To add credits on an ad-hoc basis, click the _Add credits_ button at the top of the page. Select the amount or select _Other_ to input an amount of your choosing - minimum top up is $10 USD.

#### Automatic Reload

To add credits on an automatic basis, you can set up _Automatic Reload_. You can choose a balance that you don't want to go below, and then set the amount that you want automatically added when you reach the threshold - minimum auto top-up is $50 USD.

![Automatic reload](https://webassets.linear.app/images/ornj730p/production/f97dc8e9dfe7ac2943bd1853e1718cbda4d6517e-1534x274.png?q=95&auto=format&dpr=2)

![Manage automatic top-ups](https://webassets.linear.app/images/ornj730p/production/68d3d8c3d68d465d83dd54f73c4d456aaf64a962-1118x980.png?q=95&auto=format&dpr=2)

Top-ups are processed by Stripe and produce a separate invoice from your regular Linear subscription invoice.

### Payment methods

* Credit cards are the only accepted payment method for buying credits in billing settings
* AI usage can use a different card than your core Linear subscription if desired

### Currency and tax

Top-ups are processed in USD and sales tax is applied where applicable based on your billing address.

## Expiration

* Funds you add **expire 12 months after the purchase date**
* Promotional balances will have their own expiration dates, visible in the Usage and credits dashboard
* Unused balance rolls over across subscription billing cycles. It is independent of your Linear subscription period
* Expired balances cannot be refunded, transferred between workspaces, or restored

## Order of use

When your workspace has multiple types of credits at the same time (for example, promotional credits alongside a top-up you added), they are consumed in this order:

1. Promotional credits (one-time grants when turning on a feature)
2. Credits issued by Linear support
3. Credits you added yourself

Within each group, credits closest to expiry are consumed first. A single task may draw from more than one balance.

## Running out of credits

If your workspace runs out of credits, features that require a balance will not be able to begin new work. You’ll receive low-balance and expiration alerts in advance.

Balances are not updated in exact real time, so your workspace may briefly go slightly negative (e.g. multiple tasks running at the same time), typically by only a few dollars. Your next top-up will first cover any outstanding amount, then add the remaining funds to your balance. For example, if your workspace credit balance is -$1 and you add $50, your new balance will be $49.

## Manage your usage

Owners and admins with access to billing settings can manage everything related to usage-based billing from  [_Settings → Workspace → Billing → AI Usage and credits._](https://linear.app/settings/billing/usage) From there, you can:

* View your current workspace credit balance
* Add credits
* Review credit usage by feature and user
* View recent transactions and upcoming expirations

Usage history is retained for 3 months.

![Usage breakdown](https://webassets.linear.app/images/ornj730p/production/45faf432ec23b1bcf208f32971838d4f817a75b3-1500x1898.png?q=95&auto=format&dpr=2)

![Usage history](https://webassets.linear.app/images/ornj730p/production/2eed96a58cc8617de88245132ea2585596b05556-2202x1516.png?q=95&auto=format&dpr=2)

## Adjustments

* If a task fails because of a Linear platform issue, please [contact support](mailto:support@linear.app) so we can investigate and adjust where appropriate
* Failed runs, retries, or partial completions are billable for the resources used
* Funds you’ve added are non-refundable and non-transferable

## FAQ

<details>
<summary>Which workspaces get promotional launch credits?</summary>
All existing Business and Enterprise workspaces, and workspaces who upgrade to a Basic, Business or Enterprise plan within 30 days of this launch.
</details>

<details>
<summary>Can an admin or owner control who in the workspace has access to use credits?</summary>
Not at this time. If AI credits are enabled for the workspace, anyone who has access to features that use AI credits can spend from the shared balance, including coding sessions and agent loops.
</details>

<details>
<summary>Can an owner or admin restrict guests from using AI credits and coding sessions?</summary>
If you go to _Security, Integrations & applications_ there is a toggle to **Prevent guests from interacting with agents in the workspace.** That prevents guests from using coding sessions and other agent features that consume AI credits.
</details>

<details>
<summary>Who can create or manage agent loops?</summary>
Workspace admins can control who can create, update, and delete workspace loops from [Settings → Security → Workspace management → Manage loops](https://linear.app/settings/security#workspace-management). Team-level loop permissions may also depend on permissions for the team where the loop is created.
</details>

<details>
<summary>What happens my workspace AI credits if my workspace is deleted?</summary>
If a workspace is deleted, any remaining balance expires and cannot be recovered. Linear will warn you clearly before you confirm workspace deletion, and there is a 48 hour window to undo the request.
</details>
