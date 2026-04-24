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
        - The latest models, including GPT-5.5, GPT-5.4, and GPT-5.3-Codex
        - GPT-5.4-mini for higher usage limits on routine local messages
        - Flexibly extend usage with [ChatGPT credits](#credits-overview)
        - Other [ChatGPT features](https://chatgpt.com/pricing) as part of the
          Plus plan
      </PricingCard>
      <PricingCard
        name="Pro"
        subtitle="Choose 5x or 20x higher rate limits than Plus."
        priceEyebrow="From"
        price="$100"
        interval="/month"
        ctaLabel="Get Pro"
        ctaHref="https://chatgpt.com/explore/pro?utm_internal_source=openai_developers_codex"
        highlight="Everything in Plus and:"
        footnoteLabel="*Learn more about limits and promos on both tiers."
        footnoteHref="https://help.openai.com/en/articles/9793128-about-chatgpt-pro-plans"
      >
        **Double your normal Codex usage on the $100/month tier until May 31, 2026.**

        - Access to GPT-5.3-Codex-Spark (research preview), a fast Codex model
          for day-to-day coding tasks
        - ~~5x~~ 10x or 20x more Codex usage than Plus*
        - Other [ChatGPT features](https://chatgpt.com/pricing) as part of the
          Pro plan
      </PricingCard>
      <PricingCard
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

GPT-5.5 uses significantly fewer tokens to achieve results comparable to
GPT-5.4. Its Codex setup runs faster and delivers higher-quality results for
most users. These efficiency gains support generous usage limits despite
GPT-5.5 being a significantly more capable model.

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
        label: "Pro 5x",
        value: "pro",
      },
      {
        label: "Pro 20x",
        value: "pro-20x",
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
              Code Reviews / 5h
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>GPT-5.5</td>
            <td style="text-align:center">15-80</td>
            <td style="text-align:center">Not available</td>
            <td style="text-align:center">Not available</td>
          </tr>
          <tr>
            <td>GPT-5.4</td>
            <td style="text-align:center">20-100</td>
            <td style="text-align:center">Not available</td>
            <td style="text-align:center">Not available</td>
          </tr>
          <tr>
            <td>GPT-5.4-mini</td>
            <td style="text-align:center">60-350</td>
            <td style="text-align:center">Not available</td>
            <td style="text-align:center">Not available</td>
          </tr>
          <tr>
            <td>GPT-5.3-Codex</td>
            <td style="text-align:center">30-150</td>
            <td style="text-align:center">10-60</td>
            <td style="text-align:center">20-50</td>
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
      <div class="hidden">Pro 5x</div>

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
              Code Reviews / 5h
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>GPT-5.5</td>
            <td style="text-align:center">80-400</td>
            <td style="text-align:center">Not available</td>
            <td style="text-align:center">Not available</td>
          </tr>
          <tr>
            <td>GPT-5.4</td>
            <td style="text-align:center">100-500</td>
            <td style="text-align:center">Not available</td>
            <td style="text-align:center">Not available</td>
          </tr>
          <tr>
            <td>GPT-5.4-mini</td>
            <td style="text-align:center">300-1750</td>
            <td style="text-align:center">Not available</td>
            <td style="text-align:center">Not available</td>
          </tr>
          <tr>
            <td>GPT-5.3-Codex</td>
            <td style="text-align:center">150-750</td>
            <td style="text-align:center">50-300</td>
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
              Pro $100 gets 2x the usage shown above until May 31, 2026.
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
    <div data-content-switcher-pane data-value="pro-20x" hidden>
      <div class="hidden">Pro 20x</div>

      <table>
        <thead>
          <tr>
            <th scope="col"></th>
            <th scope="col" style="text-align:center">
              Local Messages[\*](#shared-limits-pro-20x) / 5h
            </th>
            <th scope="col" style="text-align:center">
              Cloud Tasks[\*](#shared-limits-pro-20x) / 5h
            </th>
            <th scope="col" style="text-align:center">
              Code Reviews / 5h
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>GPT-5.5</td>
            <td style="text-align:center">300-1600</td>
            <td style="text-align:center">Not available</td>
            <td style="text-align:center">Not available</td>
          </tr>
          <tr>
            <td>GPT-5.4</td>
            <td style="text-align:center">400-2000</td>
            <td style="text-align:center">Not available</td>
            <td style="text-align:center">Not available</td>
          </tr>
          <tr>
            <td>GPT-5.4-mini</td>
            <td style="text-align:center">1200-7000</td>
            <td style="text-align:center">Not available</td>
            <td style="text-align:center">Not available</td>
          </tr>
          <tr>
            <td>GPT-5.3-Codex</td>
            <td style="text-align:center">600-3000</td>
            <td style="text-align:center">200-1200</td>
            <td style="text-align:center">400-1000</td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td colspan="4" style="text-align:center">
              <a id="shared-limits-pro-20x" class="footnote">
                *The usage limits for local messages and cloud tasks share a
                **five-hour window**. Additional weekly limits may apply.
              </a>
            </td>
          </tr>
          <tr>
            <td colspan="4" style="text-align:center">
              Pro $200 gets a boost on the usage shown above until May 31,
              2026. [Learn
              more](https://help.openai.com/en/articles/9793128-about-chatgpt-pro-plans).
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
              Code Reviews / 5h
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>GPT-5.5</td>
            <td style="text-align:center">15-80</td>
            <td style="text-align:center">Not available</td>
            <td style="text-align:center">Not available</td>
          </tr>
          <tr>
            <td>GPT-5.4</td>
            <td style="text-align:center">20-100</td>
            <td style="text-align:center">Not available</td>
            <td style="text-align:center">Not available</td>
          </tr>
          <tr>
            <td>GPT-5.4-mini</td>
            <td style="text-align:center">60-350</td>
            <td style="text-align:center">Not available</td>
            <td style="text-align:center">Not available</td>
          </tr>
          <tr>
            <td>GPT-5.3-Codex</td>
            <td style="text-align:center">30-150</td>
            <td style="text-align:center">10-60</td>
            <td style="text-align:center">20-50</td>
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
              Code Reviews / 5h
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>GPT-5.5</td>
            <td style="text-align:center">Not available</td>
            <td style="text-align:center">Not available</td>
            <td style="text-align:center">Not available</td>
          </tr>
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
they also use included limits faster. Fast mode consumes credits at a higher
rate for supported models. See [Speed](https://developers.openai.com/codex/speed) for supported models and
rates. Image generations also use included limits ~3-5x faster on average,
depending on image quality and size. GPT-5.3-Codex-Spark is in research preview
for ChatGPT Pro users only, and isn't available in the API at launch. Because it
runs on specialized low-latency hardware, usage is governed by a separate usage
limit that may adjust based on demand.

### What happens when you hit usage limits?

ChatGPT Plus and Pro users who reach their usage limit can purchase additional
credits to continue working without needing to upgrade their existing plan.

Business, Edu, and Enterprise plans with [flexible
pricing](https://help.openai.com/en/articles/11487671-flexible-pricing-for-the-enterprise-edu-and-business-plans)
can purchase additional workspace credits to continue using Codex.

If you are approaching usage limits, you can also switch to a smaller model to
make your usage limits last longer.

All users may also run extra local tasks using an API key, with usage charged at
[standard API rates](https://platform.openai.com/docs/pricing).

<a id="image-generation-usage-limits"></a>

### How does image generation count toward usage limits?

Image generation counts toward the same general Codex usage limits as local
messages and cloud tasks. Image generations use included limits 3-5x faster on
average than similar turns without image generation, depending on
image quality and size. After you reach your included limits, image generation
also draws from [credits](#credits-overview).

Image generation isn't available on the Free plan. When you use Codex with an
API key, API pricing applies to image generation instead of included ChatGPT
usage limits.

### What's the current Codex usage promo on Pro?

We’re currently offering extra Codex usage on both Pro tiers.

For **Pro $100**, to celebrate the launch, you’ll get **2x Codex usage through May 31, 2026**. That means 10x usage instead of the standard 5x.

**For Pro $200**, as a thank you to our most loyal customers, we’re carrying forward the benefits of our earlier 2x promo, which means Pro $200 now includes 20x Plus on an ongoing basis. In addition, we’re continuing to honor the higher 5-hour Codex limits for a limited time, so those remain at 25x Plus through May 31, 2026 instead of the standard 20x Plus.

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
mapping between token usage and credits. It's most useful when you want a
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
            <td>GPT-5.5</td>
            <td style="text-align:center">125 credits</td>
            <td style="text-align:center">12.50 credits</td>
            <td style="text-align:center">750 credits</td>
          </tr>
          <tr>
            <td>GPT-5.4</td>
            <td style="text-align:center">62.50 credits</td>
            <td style="text-align:center">6.250 credits</td>
            <td style="text-align:center">375 credits</td>
          </tr>
          <tr>
            <td>GPT-5.4-mini</td>
            <td style="text-align:center">18.75 credits</td>
            <td style="text-align:center">1.875 credits</td>
            <td style="text-align:center">113 credits</td>
          </tr>
          <tr>
            <td>GPT-5.3-Codex</td>
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
            <td>GPT-5.3-Codex-Spark</td>
            <td colspan="3" style="text-align:center">
              research preview
            </td>
          </tr>
          <tr>
            <td>GPT-Image-2 (image)</td>
            <td style="text-align:center">200 credits</td>
            <td style="text-align:center">50 credits</td>
            <td style="text-align:center">750 credits</td>
          </tr>
          <tr>
            <td>GPT-Image-2 (text)</td>
            <td style="text-align:center">125 credits</td>
            <td style="text-align:center">31.25 credits</td>
            <td style="text-align:center">250 credits</td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td colspan="4" style="text-align:center">
              Fast mode consumes credits at a higher rate for supported models.
              See <a href="/codex/speed">Speed</a> for rates.
            </td>
          </tr>
          <tr>
            <td colspan="4" style="text-align:center">
              Cloud tasks and code review run on GPT-5.3-Codex.
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
              GPT-5.5
            </th>
            <th scope="col" style="text-align:center">
              GPT-5.4
            </th>
            <th scope="col" style="text-align:center">
              GPT-5.3-Codex
            </th>
            <th scope="col" style="text-align:center">
              GPT-5.4-mini
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Local Tasks</td>
            <td style="text-align:center">1 message</td>
            <td style="text-align:center">\~14 credits</td>
            <td style="text-align:center">\~7 credits</td>
            <td style="text-align:center">\~5 credits</td>
            <td style="text-align:center">\~2 credits</td>
          </tr>
          <tr>
            <td>Cloud Tasks</td>
            <td style="text-align:center">1 message</td>
            <td style="text-align:center">Not available</td>
            <td style="text-align:center">Not available</td>
            <td style="text-align:center">\~25 credits</td>
            <td style="text-align:center">Not available</td>
          </tr>
          <tr>
            <td>Code Review</td>
            <td style="text-align:center">1 pull request</td>
            <td style="text-align:center">Not available</td>
            <td style="text-align:center">Not available</td>
            <td style="text-align:center">\~25 credits</td>
            <td style="text-align:center">Not available</td>
          </tr>
          <tr>
            <td>Image generation</td>
            <td style="text-align:center">1 image (1024px &times; 1024px)</td>
            <td colspan="4" style="text-align:center">
              \~5-6 credits
            </td>
          </tr>
          <tr>
            <td>Image generation</td>
            <td style="text-align:center">1 image (1024px &times; 1536px)</td>
            <td colspan="4" style="text-align:center">
              \~7-8 credits
            </td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td colspan="6" style="text-align:center">
              Fast mode consumes credits at a higher rate for supported models.
              See <a href="/codex/speed">Speed</a> for rates.
            </td>
          </tr>
          <tr>
            <td colspan="6" style="text-align:center">
              These averages also apply to GPT-5.2.
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  </ContentSwitcher>
</div>

Speed configurations will increase credit consumption for all models that apply.
Fast mode consumes credits at a higher rate for supported models. See
[Speed](https://developers.openai.com/codex/speed) for supported models and rates.

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
- **Switch to a smaller model for routine tasks.** Using GPT-5.4 or
  GPT-5.4-mini can extend your local-message usage limits, depending on the
  model you switch from.