---
name: Model a DCF valuation
tagline: Turn financial inputs into an editable valuation workbook.
summary: Attach historical financials, valuation assumptions, and modeling
  notes, then ask Codex for an editable DCF workbook you can inspect and revise
  in Codex.
skills:
  - token: $spreadsheets
    description: Create editable spreadsheet workbooks from attached inputs,
      formulas, and assumptions.
bestFor:
  - Analysts turning historical financials and assumptions into a DCF workbook.
  - Finance teams that want to inspect and iterate on the workbook in Codex.
  - Teams preparing a valuation model from source files.
starterPrompt:
  title: Model a DCF valuation
  body: >-
    Use $spreadsheets to build a DCF workbook for the company in the attached
    source files.


    Include explicit operating drivers for revenue growth, margins, capex, and
    working capital. Calculate unlevered free cash flow, WACC, terminal value,
    and enterprise value. If capital structure and diluted share count are
    provided, bridge to implied equity value and implied equity value per share.


    Use any assumptions included in the source files. If an assumption is
    missing, add a clearly labeled placeholder in the assumptions tab instead of
    hiding it in a formula. If full balance sheet or cash-flow statement inputs
    are missing, create the operating forecast needed for unlevered free cash
    flow and flag the missing statement inputs.


    Generate the result as an editable .xlsx workbook.
  suggestedEffort: medium
relatedLinks:
  - label: Agent skills
    url: /codex/skills
  - label: File inputs
    url: /api/docs/guides/file-inputs
---

## Introduction

Codex can help you create a fully functional DCF workbook that you can inspect and revise.

It can use multiple files as context, including the historical financials, valuation assumptions, and any modeling notes.
You can provide these files directly, or use file references when the inputs live in Google Drive or another connected source. If so, provide the exact file references, as it will be more effective than asking Codex to search through all of your files.

## Create the workbook



1. Attach the historical financials, valuation assumptions, and any modeling notes, or provide exact file references along with the source.
2. Run the starter prompt and ask for an editable `.xlsx` workbook.
3. Open the generated workbook in Codex. Expand it into the full-screen view to inspect the model tabs, formulas, assumptions, and valuation summary.
4. Continue in the same thread to check formula links, change assumptions, add scenarios, or tighten the model.



When the workbook appears in the thread, open it in Codex and expand it full-screen. Review the source inputs, forecast drivers, valuation outputs, and sensitivity tables, then ask Codex to revise the same workbook from there.

## Check the valuation

Before using the workbook, ask Codex to review the model like a finance teammate would: source tie-outs, formulas, hardcoded assumptions, and valuation outputs.

## Revise one assumption

After reviewing the workbook in Codex, ask for targeted revisions in the same thread. Change one driver at a time so the impact is easy to inspect.