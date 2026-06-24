---
name: Forecast cash flow
tagline: Find the liquidity low point in an editable forecast workbook.
summary: Give Codex cash-flow inputs and model constraints, then ask it to
  create an editable workbook that preserves the source cadence, flags
  safety-balance breaches, and shows which assumptions drive cash pressure.
skills:
  - token: $spreadsheets
    description: Build editable forecast workbooks, wire formulas to assumptions,
      and add checks for scenarios and input gaps.
bestFor:
  - Finance and operations teams building a 13-week or monthly cash forecast.
  - Forecasts that need receipts, payroll, vendor payments, and working-capital
    assumptions in one workbook.
  - Teams reviewing runway, safety-balance breaches, and scenario drivers before
    a planning meeting.
starterPrompt:
  title: Forecast cash flow
  body: >-
    Use $spreadsheets to build an editable cash-flow forecast workbook from the
    attached source files.


    Use beginning cash, expected receipts, payroll, vendor payments, debt, tax,
    capex, working-capital items, and timing assumptions where available.
    Preserve the source cadence, whether weekly or monthly.


    Include a summary view that flags the liquidity low point, the minimum
    ending cash balance, and any breach of the safety cash threshold. Use
    formulas so I can change assumptions later, and call out missing timing
    assumptions before using placeholders.
  suggestedEffort: medium
relatedLinks:
  - label: Agent skills
    url: /codex/skills
---

## Introduction

When you are building a cash-flow forecast, you want to make sure it is accurate and reflects the reality of your business. You can use Codex to help you create a forecast workbook that you can inspect and revise in Codex. Attach the cash-flow inputs, operating assumptions, and model constraints. You can also use file references when the inputs live in Google Drive or another connected source.

## Make the forecast



1. Attach the cash-flow inputs, operating assumptions, and model constraints.
2. Run the starter prompt and ask for an editable `.xlsx` workbook.
3. Open the workbook in Codex. Expand it into the full-screen view to inspect assumptions, formulas, scenarios, and the summary tab.
4. Continue in the same thread to change collections, payroll, vendor payment, growth, or safety-balance assumptions.



When the workbook appears in the thread, open it in Codex and expand it full-screen. Review the timing assumptions, formulas, scenarios, and summary tab, then ask Codex to revise the same workbook from there.

## Review cash pressure

Before using the forecast, ask Codex to identify the low point, tie the workbook back to the source inputs, and list assumptions that need review.

## Run a scenario

After reviewing the workbook in Codex, use follow-up prompts to change one scenario driver at a time.