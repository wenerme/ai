> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Adding a Tax ID to Your Invoices

> How to add your VAT, GST, or other tax ID so it appears on OpenRouter invoices

OpenRouter uses [Stripe](https://stripe.com) for payments and tax handling. Once you save a tax ID, Stripe attaches it to your customer record and includes it on every future invoice.

## Steps

1. Go to [openrouter.ai/settings/credits](https://openrouter.ai/settings/credits) and click **Add Credits**.

2. If you haven't purchased before, the modal walks you through adding a **billing address** and then a **payment method** — both inside the same modal.

3. Once your billing address and payment method are saved, the main purchase form appears. Expand the **Edit Tax ID** section.

4. Select your country code from the dropdown (e.g. `RO` for Romania, `DE` for Germany, `GB` for the United Kingdom).

5. Enter your tax ID number and click **Save**.

That's it. Your tax ID now appears on all invoices going forward.

<Note>
  You can add multiple tax IDs if needed — for example, an EU VAT number and a local tax registration number. Each saved ID shows as a chip above the input field. Click the trash icon next to any ID to remove it.
</Note>

## Supported tax ID types

OpenRouter supports tax IDs from 50+ countries through Stripe, including:

* **EU VAT** numbers (e.g. `RO1234567891`, `DE123456789`, `FR12345678901`)
* **US EIN** (e.g. `12-3456789`)
* **UK VAT** (e.g. `GB123456789`)
* **Australian ABN** (e.g. `12345678912`)
* **Canadian BN** (e.g. `123456789`)
* **Brazilian CNPJ** (e.g. `01.234.456/5432-10`)

The input field shows an example format for whatever country you select.

## Taxes on invoices

Prices on OpenRouter are exclusive of applicable taxes. Where required by your jurisdiction, VAT or GST is calculated automatically by Stripe and added to the invoice at purchase time. Adding your tax ID ensures the invoice is properly attributed to your business for tax compliance.

## Need help?

If your tax ID isn't accepted or you need a corrected invoice, reach out via the [Support](https://openrouter.ai/support) page.
