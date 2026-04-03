# Codex Pricing

Teams can now get started with Codex with no fixed monthly costs. For a
  limited time, eligible ChatGPT Business workspaces can earn up to $500 in
  credits when their team members start using Codex. [View
  terms](https://help.openai.com/en/articles/20001150-codex-for-business-promotion-earn-up-to-500-in-credits)
  or [get started](https://chatgpt.com/codex/team/start).

<h2 class="sr-only">Pricing options</h2>

<ContentSwitcher
  id="codex-pricing-plans"
  initialValue="individual"
  options={[
    {
      label: "Individual",
      value: "individual",
    },
    {
      label: "Business / Enterprise",
      value: "business-enterprise",
    },
  ]}
>
  <div data-content-switcher-pane data-value="individual">
    <div class="codex-pricing-grid">
      <PricingCard
        name="Free"
        subtitle="Explore Codex capabilities on quick coding tasks."
        price="$0"
        interval="/month"
        ctaLabel="Get Free"
        ctaHref="https://chatgpt.com/plans/free/"
      />
      <PricingCard
        name="Go"
        subtitle="Use Codex for lightweight coding tasks."
        price="$8"
        interval="/month"
        ctaLabel="Get Go"
        ctaHref="https://chatgpt.com/plans/go"
      />
      <PricingCard
        name="Plus"
        subtitle="Power a few focused coding sessions each week."
        price="$20"
        interval="/month"
        ctaLabel="Get Plus"
        ctaHref="https://chatgpt.com/explore/plus?utm_internal_source=openai_developers_codex"
      >
        - Codex on the web, in the CLI, in the IDE extension, and on iOS
        - Cloud-based integrations like automatic code review and Slack
          integration
        - The latest models, including GPT-5.4 and GPT-5.3-Codex
        - GPT-5.4-mini for up to 3.3x higher usage limits for local messages
        - Flexibly extend usage with [ChatGPT credits](#credits-overview)
        - Other [ChatGPT features](https://chatgpt.com/pricing) as part of the
          Plus plan
      </PricingCard>
      <PricingCard
        name="Pro"
        subtitle="Rely on Codex for daily full-time development."
        price="$200"
        interval="/month"
        ctaLabel="Get Pro"
        ctaHref="https://chatgpt.com/explore/pro?utm_internal_source=openai_developers_codex"
        highlight="Everything in Plus and:"
      >
        - Priority request processing
        - Access to GPT-5.3-Codex-Spark (research preview), a fast Codex model
          for day-to-day coding tasks
        - 6x higher usage limits for local and cloud tasks
        - 10x more cloud-based code reviews
        - Other [ChatGPT features](https://chatgpt.com/pricing) as part of the
          Pro plan
      </PricingCard>
    </div>

    <div class="mt-8 mb-10 codex-pricing-grid">
      <PricingCard
        class="codex-pricing-card--span-two"
        name="API Key"
        subtitle="Great for automation in shared environments like CI."
        price=""
        interval=""
        ctaLabel="Learn more"
        ctaHref="/codex/auth"
        highlight=""
      >
        - Codex in the CLI, SDK, or IDE extension
        - No cloud-based features (GitHub code review, Slack, etc.)
        - Delayed access to new models like GPT-5.3-Codex and
          GPT-5.3-Codex-Spark
        - Pay only for the tokens Codex uses, based on [API
          pricing](https://platform.openai.com/docs/pricing)
      </PricingCard>
    </div>

  </div>

  <div data-content-switcher-pane data-value="business-enterprise" hidden>
    <div class="codex-pricing-grid">
      <PricingCard
        name="Business"
        subtitle="Bring Codex into your startup or growing business."
        price="Pay as you go"
        interval=""
        ctaLabel="Get Business"
        ctaHref="https://chatgpt.com/codex/team/start"
        highlight="Everything in Plus and:"
      >
        - Assign standard or usage-based Codex seats based on your team's needs.
          [Learn
          more](https://help.openai.com/en/articles/8792828-what-is-chatgpt-business)
        - Larger virtual machines to run cloud tasks faster
        - Flexibly extend usage with [ChatGPT credits](#credits-overview)
        - A secure, dedicated workspace with essential admin controls, SAML SSO,
          and MFA
        - No training on your business data by default. [Learn
          more](https://openai.com/business-data/)
        - Other [ChatGPT features](https://chatgpt.com/pricing) as part of the
          Business plan
      </PricingCard>
      <PricingCard
        name="Enterprise & Edu"
        subtitle="Unlock Codex for your entire organization with enterprise-grade functionality."
        interval=""
        ctaLabel="Contact sales"
        ctaHref="https://chatgpt.com/contact-sales?utm_internal_source=openai_developers_codex"
        highlight="Everything in Business and:"
      >
        - Priority request processing
        - Enterprise-level security and controls, including SCIM, EKM, user
          analytics, domain verification, and role-based access control
          ([RBAC](https://help.openai.com/en/articles/11750701-rbac))
        - Audit logs and usage monitoring via the [Compliance
          API](https://chatgpt.com/admin/api-reference#tag/Codex-Tasks)
        - Data retention and data residency controls
        - Other [ChatGPT features](https://chatgpt.com/pricing) as part of the
          Enterprise plan
      </PricingCard>
    </div>

    <div class="mt-8 mb-10 codex-pricing-grid">
      <PricingCard
        class="codex-pricing-card--span-two"
        name="API Key"
        subtitle="Great for automation in shared environments like CI."
        price=""
        interval=""
        ctaLabel="Learn more"
        ctaHref="/codex/auth"
        highlight=""
      >
        - Codex in the CLI, SDK, or IDE extension
        - No cloud-based features (GitHub code review, Slack, etc.)
        - Delayed access to new models like GPT-5.3-Codex and
          GPT-5.3-Codex-Spark
        - Pay only for the tokens Codex uses, based on [API
          pricing](https://platform.openai.com/docs/pricing)
      </PricingCard>
    </div>

  </div>
</ContentSwitcher>

## Frequently asked questions

### What are the usage limits for my plan?

The number of Codex messages you can send depends on the model used, size and
complexity of your coding tasks and whether you run them locally or in the
cloud. Small scripts or routine functions may consume only a fraction of your
allowance, while larger codebases, long-running tasks, or extended sessions that
require Codex to hold more context will use significantly more per message.

<div id="usage-limits">
  <ContentSwitcher
    id="codex-usage-limits"
    initialValue="plus"
    align="right"
    options={[
      {
        label: "Plus",
        value: "plus",
      },
      {
        label: "Pro",
        value: "pro",
      },
      {
        label: "Business",
        value: "business",
      },
      {
        label: "API Key",
        value: "api-key",
      },
    ]}
  >
    <div data-content-switcher-pane data-value="plus">
      <div class="hidden">Plus</div>

      <table>
        <thead>
          <tr>
            <th scope="col"></th>
            <th scope="col" style="text-align:center">
              Local Messages[\*](#shared-limits-plus) / 5h
            </th>
            <th scope="col" style="text-align:center">
              Cloud Tasks[\*](#shared-limits-plus) / 5h
            </th>
            <th scope="col" style="text-align:center">
              Code Reviews / week
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>GPT-5.4</td>
            <td style="text-align:center">33-168</td>
            <td style="text-align:center">Not available</td>
            <td style="text-align:center">Not available</td>
          </tr>
          <tr>
            <td>GPT-5.4-mini</td>
            <td style="text-align:center">110-560</td>
            <td style="text-align:center">Not available</td>
            <td style="text-align:center">Not available</td>
          </tr>
          <tr>
            <td>GPT-5.3-Codex</td>
            <td style="text-align:center">45-225</td>
            <td style="text-align:center">10-60</td>
            <td style="text-align:center">10-25</td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td colspan="4" style="text-align:center">
              <a id="shared-limits-plus" class="footnote">
                *The usage limits for local messages and cloud tasks share a
                **five-hour window**. Additional weekly limits may apply.
              </a>
            </td>
          </tr>
          <tr>
            <td colspan="4" style="text-align:center">
              For Enterprise/Edu users, there are no fixed rate limits - usage
              scales with [credits](#credits-overview)
            </td>
          </tr>
          <tr>
            <td colspan="4" style="text-align:center">
              Enterprise and Edu plans without flexible pricing have the same
              per-seat usage limits as Plus for most features
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
    <div data-content-switcher-pane data-value="pro" hidden>
      <div class="hidden">Pro</div>

      <table>
        <thead>
          <tr>
            <th scope="col"></th>
            <th scope="col" style="text-align:center">
              Local Messages[\*](#shared-limits-pro) / 5h
            </th>
            <th scope="col" style="text-align:center">
              Cloud Tasks[\*](#shared-limits-pro) / 5h
            </th>
            <th scope="col" style="text-align:center">
              Code Reviews / week
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>GPT-5.4</td>
            <td style="text-align:center">223-1120</td>
            <td style="text-align:center">Not available</td>
            <td style="text-align:center">Not available</td>
          </tr>
          <tr>
            <td>GPT-5.4-mini</td>
            <td style="text-align:center">743-3733</td>
            <td style="text-align:center">Not available</td>
            <td style="text-align:center">Not available</td>
          </tr>
          <tr>
            <td>GPT-5.3-Codex</td>
            <td style="text-align:center">300-1500</td>
            <td style="text-align:center">50-400</td>
            <td style="text-align:center">100-250</td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td colspan="4" style="text-align:center">
              <a id="shared-limits-pro" class="footnote">
                *The usage limits for local messages and cloud tasks share a
                **five-hour window**. Additional weekly limits may apply.
              </a>
            </td>
          </tr>
          <tr>
            <td colspan="4" style="text-align:center">
              For Enterprise/Edu users, there are no fixed rate limits - usage
              scales with [credits](#credits-overview)
            </td>
          </tr>
          <tr>
            <td colspan="4" style="text-align:center">
              Enterprise and Edu plans without flexible pricing have the same
              per-seat usage limits as Plus for most features
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
    <div data-content-switcher-pane data-value="business" hidden>
      <div class="hidden">Business</div>

      <table>
        <thead>
          <tr>
            <th scope="col"></th>
            <th scope="col" style="text-align:center">
              Local Messages[\*](#shared-limits-business) / 5h
            </th>
            <th scope="col" style="text-align:center">
              Cloud Tasks[\*](#shared-limits-business) / 5h
            </th>
            <th scope="col" style="text-align:center">
              Code Reviews / week
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>GPT-5.4</td>
            <td style="text-align:center">15-60</td>
            <td style="text-align:center">Not available</td>
            <td style="text-align:center">Not available</td>
          </tr>
          <tr>
            <td>GPT-5.4-mini</td>
            <td style="text-align:center">40-200</td>
            <td style="text-align:center">Not available</td>
            <td style="text-align:center">Not available</td>
          </tr>
          <tr>
            <td>GPT-5.3-Codex</td>
            <td style="text-align:center">20-90</td>
            <td style="text-align:center">5-40</td>
            <td style="text-align:center">15-30</td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td colspan="4" style="text-align:center">
              <a id="shared-limits-business" class="footnote">
                *The usage limits for local messages and cloud tasks share a
                **five-hour window**. Additional weekly limits may apply.
              </a>
            </td>
          </tr>
          <tr>
            <td colspan="4" style="text-align:center">
              For Enterprise/Edu users, there are no fixed rate limits - usage
              scales with [credits](#credits-overview)
            </td>
          </tr>
          <tr>
            <td colspan="4" style="text-align:center">
              Enterprise and Edu plans without flexible pricing have the same
              per-seat usage limits as Plus for most features
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
    <div data-content-switcher-pane data-value="api-key" hidden>
      <div class="hidden">API Key</div>

      <table>
        <thead>
          <tr>
            <th scope="col"></th>
            <th scope="col" style="text-align:center">
              Local Messages[\*](#shared-limits-api-key) / 5h
            </th>
            <th scope="col" style="text-align:center">
              Cloud Tasks[\*](#shared-limits-api-key) / 5h
            </th>
            <th scope="col" style="text-align:center">
              Code Reviews / week
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>GPT-5.4</td>
            <td style="text-align:center">
              [Usage-based](https://platform.openai.com/docs/pricing)
            </td>
            <td style="text-align:center">Not available</td>
            <td style="text-align:center">Not available</td>
          </tr>
          <tr>
            <td>GPT-5.4-mini</td>
            <td style="text-align:center">
              [Usage-based](https://platform.openai.com/docs/pricing)
            </td>
            <td style="text-align:center">Not available</td>
            <td style="text-align:center">Not available</td>
          </tr>
          <tr>
            <td>GPT-5.3-Codex</td>
            <td style="text-align:center">
              [Usage-based](https://platform.openai.com/docs/pricing)
            </td>
            <td style="text-align:center">Not available</td>
            <td style="text-align:center">Not available</td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td colspan="4" style="text-align:center">
              <a id="shared-limits-api-key" class="footnote">
                *The usage limits for local messages and cloud tasks share a
                **five-hour window**. Additional weekly limits may apply.
              </a>
            </td>
          </tr>
          <tr>
            <td colspan="4" style="text-align:center">
              For Enterprise/Edu users, there are no fixed rate limits - usage
              scales with [credits](#credits-overview)
            </td>
          </tr>
          <tr>
            <td colspan="4" style="text-align:center">
              Enterprise and Edu plans without flexible pricing have the same
              per-seat usage limits as Plus for most features
            </td>
          </tr>
        </tfoot>
      </table>
    </div>

  </ContentSwitcher>
</div>

Speed configurations increase credit consumption for all applicable models, so
they also use included limits faster. Details can be found [here](https://developers.openai.com/codex/speed).
GPT-5.3-Codex-Spark is in research preview for ChatGPT Pro users only, and isn't
available in the API at launch. Because it runs on specialized low-latency
hardware, usage is governed by a separate usage limit that may adjust based on
demand.

### What happens when you hit usage limits?

ChatGPT Plus and Pro users who reach their usage limit can purchase additional
credits to continue working without needing to upgrade their existing plan.

Business, Edu, and Enterprise plans with [flexible
pricing](https://help.openai.com/en/articles/11487671-flexible-pricing-for-the-enterprise-edu-and-business-plans)
can purchase additional workspace credits to continue using Codex.

If you are approaching usage limits, you can also switch to the GPT-5.4-mini
model to make your usage limits last longer.

All users may also run extra local tasks using an API key, with usage charged at
[standard API rates](https://platform.openai.com/docs/pricing).

### Where can I see my current usage limits?

You can find your current limits in the [Codex usage
dashboard](https://chatgpt.com/codex/settings/usage). If you want to see your
remaining limits during an active Codex CLI session, you can use `/status`.

### How do credits work?

Credits let you continue using Codex after you reach your included usage
limits. Usage draws down from your available credits based on the models and
features you use, allowing you to extend work without interruption.

As of April 2nd, we're moving pricing to API token-based rates. Credits remain
the core pricing unit that customers purchase and consume, but usage is based
on tokens consumed, calculated as credits per million input tokens, cached
input tokens and output tokens your workspace consumes. Read about tokens
[here](https://help.openai.com/en/articles/4936856-what-are-tokens-and-how-to-count-them).

This format replaces average per-message estimates for your plan with a direct
mapping between token usage and credits. It is most useful when you want a
clearer view of how input, cached input, and output affect credit consumption.

Under this model, actual credit usage depends on the mix of input, cached input,
and output tokens in each task. The new rate card is displayed in the table
below, and is currently applicable to **new and existing Business customers,
and new Enterprise customers**.

**New and existing customers on all other plan types** should continue to use
the previous message based rate card, until we migrate you to the new rates in
the upcoming weeks.

Select your appropriate plan type in the table below to see rates.

<div id="credits-overview">
  <ContentSwitcher
    id="codex-credit-costs"
    initialValue="business-enterprise-new"
    align="right"
    options={[
      {
        label: "Business & New Enterprise Customers",
        value: "business-enterprise-new",
      },
      {
        label: "Plus, Pro, Existing Enterprise/Edu and New Edu",
        value: "plus-pro-enterprise-edu-legacy",
      },
    ]}
  >
    <div data-content-switcher-pane data-value="business-enterprise-new">
      <div class="hidden">Business & New Enterprise Customers</div>
      <table>
        <thead>
          <tr>
            <th scope="col">Credits per 1M tokens</th>
            <th scope="col" style="text-align:center">
              Input Tokens
            </th>
            <th scope="col" style="text-align:center">
              Cached input tokens
            </th>
            <th scope="col" style="text-align:center">
              Output Tokens
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>GPT-5.4</td>
            <td style="text-align:center">62.50 credits</td>
            <td style="text-align:center">6.250 credits</td>
            <td style="text-align:center">375 credits</td>
          </tr>
          <tr>
            <td>GPT-5.3-Codex</td>
            <td style="text-align:center">43.75 credits</td>
            <td style="text-align:center">4.375 credits</td>
            <td style="text-align:center">350 credits</td>
          </tr>
          <tr>
            <td>GPT-5.1-Codex-mini</td>
            <td style="text-align:center">6.25 credits</td>
            <td style="text-align:center">0.625 credits</td>
            <td style="text-align:center">50 credits</td>
          </tr>
          <tr>
            <td>GPT-5.4-Mini</td>
            <td style="text-align:center">18.75 credits</td>
            <td style="text-align:center">1.875 credits</td>
            <td style="text-align:center">113 credits</td>
          </tr>
          <tr>
            <td>GPT-5.2-Codex</td>
            <td style="text-align:center">43.75 credits</td>
            <td style="text-align:center">4.375 credits</td>
            <td style="text-align:center">350 credits</td>
          </tr>
          <tr>
            <td>GPT-5.2</td>
            <td style="text-align:center">43.75 credits</td>
            <td style="text-align:center">4.375 credits</td>
            <td style="text-align:center">350 credits</td>
          </tr>
          <tr>
            <td>GPT-5.1-Codex-Max</td>
            <td style="text-align:center">31.25 credits</td>
            <td style="text-align:center">3.125 credits</td>
            <td style="text-align:center">250 credits</td>
          </tr>
          <tr>
            <td>GPT-5.3-Codex-Spark</td>
            <td colspan="3" style="text-align:center">
              research preview
            </td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td colspan="4" style="text-align:center">
              Fast mode consumes 2x as many credits.
            </td>
          </tr>
          <tr>
            <td colspan="4" style="text-align:center">
              Code review runs on 5.3-Codex.
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
    <div
      data-content-switcher-pane
      data-value="plus-pro-enterprise-edu-legacy"
      hidden
    >
      <div class="hidden">Plus, Pro, Existing Enterprise/Edu and New Edu</div>
      <table>
        <thead>
          <tr>
            <th scope="col"></th>
            <th scope="col" style="text-align:center">
              Unit
            </th>
            <th scope="col" style="text-align:center">
              GPT-5.4
            </th>
            <th scope="col" style="text-align:center">
              GPT-5.3-Codex
            </th>
            <th scope="col" style="text-align:center">
              GPT-5.1-Codex-mini
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Local Tasks</td>
            <td style="text-align:center">1 message</td>
            <td style="text-align:center">\~7 credits</td>
            <td style="text-align:center">\~5 credits</td>
            <td style="text-align:center">\~1 credit</td>
          </tr>
          <tr>
            <td>Cloud Tasks</td>
            <td style="text-align:center">1 message</td>
            <td style="text-align:center">\~34 credits</td>
            <td style="text-align:center">\~25 credits</td>
            <td style="text-align:center">Not available</td>
          </tr>
          <tr>
            <td>Code Review</td>
            <td style="text-align:center">1 pull request</td>
            <td style="text-align:center">\~34 credits</td>
            <td style="text-align:center">\~25 credits</td>
            <td style="text-align:center">Not available</td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td colspan="5" style="text-align:center">
              Fast mode consumes 2x as many credits.
            </td>
          </tr>
          <tr>
            <td colspan="5" style="text-align:center">
              These averages also apply to legacy GPT-5.2, GPT-5.2-Codex,
              GPT-5.1, GPT-5.1-Codex-Max, GPT-5, GPT-5-Codex, and
              GPT-5-Codex-Mini.
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  </ContentSwitcher>
</div>

Speed configurations will increase credit consumption for all models that apply.
Details can be found [here](https://developers.openai.com/codex/speed).

[Learn more about credits in ChatGPT Plus and
Pro.](https://help.openai.com/en/articles/12642688-using-credits-for-flexible-usage-in-chatgpt-freegopluspro-sora)

[Learn more about credits in ChatGPT Business, Enterprise, and
Edu.](https://help.openai.com/en/articles/11487671-flexible-pricing-for-the-enterprise-edu-and-business-plans)

### What counts as Code Review usage?

Code Review usage applies only when Codex runs reviews through GitHub—for
example, when you tag `@Codex` for review in a pull request or enable automatic
reviews on your repository. Reviews run locally or outside of GitHub count
toward your general usage limits.

### What can I do to make my usage limits last longer?

The usage limits and credits above are average rates. You can try the following
tips to maximize your limits:

- **Control the size of your prompts.** Be precise with the instructions you
  give Codex, but remove unnecessary context.
- **Reduce the size of your AGENTS.md.** If you work on a larger project, you
  can control how much context you inject through AGENTS.md files by [nesting
  them within your repository](https://developers.openai.com/codex/guides/agents-md#layer-project-instructions).
- **Limit the number of MCP servers you use.** Every [MCP](https://developers.openai.com/codex/mcp) you add
  to Codex adds more context to your messages and uses more of your limit.
  Disable MCP servers when you don’t need them.
- **Switch to GPT-5.4-mini for routine tasks.** Using the mini model should
  extend your local-message usage limits by roughly 2.5x to 3.3x, depending on
  the model you switch from.