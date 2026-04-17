---
name: Query tabular data
tagline: Ask a question about a CSV, spreadsheet, export, or data folder.
summary: Use Codex with a CSV, spreadsheet, dashboard export, Google Sheet, or
  local data file to answer a question, create a browser visualization, and save
  the result.
skills:
  - token: $spreadsheet
    url: https://github.com/openai/skills/tree/main/skills/.curated/spreadsheet
    description: Inspect tabular data, run calculations, and create charts or tables.
  - token: google-sheets
    url: /codex/plugins
    description: Analyze approved Google Sheets when the data lives in a shared spreadsheet.
bestFor:
  - Questions that can be answered through a quick calculation, chart, table, or
    short summary.
  - Roles that need to analyze data and create visualizations.
starterPrompt:
  title: Ask a Question
  body: |-
    Analyze @sales-export.csv

    Question: Which customer segment changed the most last quarter?

    Please:
    - inspect the columns before analyzing
    - answer the question from the data
    - create a simple browser visualization as an HTML file
    - start a local preview so I can open it in the Codex browser
  suggestedEffort: low
relatedLinks:
  - label: File inputs
    url: /api/docs/guides/file-inputs
  - label: Agent skills
    url: /codex/skills
---

## Analyze the data

Use Codex when you have a CSV, spreadsheet, dashboard export, Google Sheet, or local data file and want to answer a question from it. Start with the file and the question. Codex can inspect the columns, run the analysis, and create a browser visualization you can open in the Codex app.

1. Attach the file or mention the connected data source.
2. Ask the question you want answered.
3. Have Codex inspect the columns, run the calculation, and create an HTML visualization.
4. Open the local preview in the Codex browser, then continue in the same thread to adjust the chart or slice the data another way.



Use `@` to attach the CSV or mention the Google Sheet. If the data came from a dashboard, export the rows first so Codex can inspect the raw columns.

## Follow-up analysis

After Codex gives you the first answer, ask for the next comparison you would normally check.

You can keep going in the same thread: clean a column, exclude a test segment, compare two time windows, make the chart easier to read, or turn the result into a short note for a meeting.