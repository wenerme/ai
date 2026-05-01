---
name: Clean and prepare messy data
tagline: Process tabular data without affecting the original.
summary: Drag in or mention a messy CSV or spreadsheet, describe the problems
  you see, and ask Codex to write a cleaned copy while keeping the original file
  unchanged.
skills:
  - token: $spreadsheet
    description: Inspect tabular files, clean columns, and produce reviewable outputs.
bestFor:
  - CSV or spreadsheet exports with mixed dates, currencies, duplicates, summary
    rows, or missing values.
  - Teams who work with data from multiple sources.
starterPrompt:
  title: Clean a Copy
  body: >-
    Clean @marketplace-risk-rollout-export.csv.


    What's wrong:

    - dates are mixed between MM/DD/YYYY and YYYY-MM-DD

    - currency values include $, commas, and blank cells

    - a few duplicate customer rows came from repeated exports

    - region and category names use several aliases

    - there are pasted summary rows mixed into the data


    What I want:

    - write a cleaned CSV

    - keep the original file unchanged

    - use one date format

    - keep blank currency cells blank

    - preserve source row IDs when possible

    - add a short data-quality note with rows you changed, removed, or could not
    clean confidently
  suggestedEffort: low
relatedLinks:
  - label: Analyze data with Codex
    url: /codex/use-cases/analyze-data-export
  - label: File inputs
    url: /api/docs/guides/file-inputs
  - label: Agent skills
    url: /codex/skills
---

## Introduction

Codex is great at cleaning systematically tabular data.
When a CSV or spreadsheet has mixed dates, duplicate rows, currency strings, blank cells, aliases, or pasted summary rows, ask Codex to clean a copy and leave the original file unchanged.

## How to use



1. Drag the file into Codex or mention it in your prompt, such as `@customer-export.csv`.
2. Describe the problems you already see.
3. Tell Codex what the cleaned version should be: CSV, spreadsheet tab, or upload-ready file.
4. Review the cleaned copy before using it.



Use the starter prompt on this page for the first cleaning pass. Replace the file name and bullets with your own. The useful details are the problems you already see and the file you need next: a cleaned CSV, a clean spreadsheet tab, or an upload-ready file. After Codex writes the clean copy, open the cleaned file and the data-quality note from the thread before using the data downstream.