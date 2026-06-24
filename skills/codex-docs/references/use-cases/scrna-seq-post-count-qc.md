---
name: Annotate scRNA-seq data
tagline: Review single-cell QC, annotations, and UMAPs in one thread.
summary: Use Codex with the NGS Analysis plugin to turn a 10x-style matrix
  bundle into QC-filtered single-cell artifacts, threshold-justified filtering
  summaries, annotations, and UMAPs you can inspect and revise in the same
  thread.
skills:
  - token: NGS Analysis
    url: codex://plugins/ngs-analysis@openai-curated
    description: Run single-cell post-count QC and return filtering, visualization,
      annotation, and notebook artifacts.
bestFor:
  - Single-cell teams doing matrix-level QC, annotation, and visualization after
    count generation.
  - Researchers who need threshold-justified filtering and an auditable record
    of cells removed or flagged.
  - Teams that want a portable review surface with generated figures, a
    visualization index, and a notebook or app handoff.
starterPrompt:
  title: Run scRNA-seq Post-count QC
  body: >-
    Use the NGS Analysis plugin.


    Route this matrix-level input to scrna-seq-qc using the indicated 10x-style
    matrix bundle, plus the manifest and dataset metadata.


    Choose QC thresholds from the observed distributions, preserve raw counts,
    and generate global/per-group UMAPs.


    Return:

    - summary.md

    - a QC summary table with cells removed or flagged per filter

    - threshold-justification plots

    - filtered .h5ad
  suggestedEffort: high
relatedLinks:
  - label: Request access to GPT-Rosalind
    url: https://openai.com/form/life-sciences-access/
---

## Leverage skills

The NGS Analysis plugin includes:

- `ngs-analysis-router`
- `scrna-seq-qc`
- `ngs-scrna-seq`

When you use the plugin, Codex can use all these packaged skills.

## Step-by-step guide



1. Point Codex to the appropriate matrix, barcodes, genes or features, manifest, and dataset metadata, or provide exact file references.
2. Run the starter prompt so Codex can choose QC thresholds from the observed distributions and record the rationale in the run artifacts.
3. Open the visualization index and review notebook or app to inspect QC pass or fail counts, UMAPs, and annotation confidence.
4. Continue in the same thread to refine thresholds, supply a matched reference atlas, or rerun after unblocking doublet detection.



## Results

The run produces a review surface for the filtering decisions, not just a
filtered matrix. Begin with the threshold-justification plots and the QC
summary so you can see how many cells each filter removed or flagged and
whether the selected cutoffs match the observed distributions.

![Review threshold-justification plots and QC pass or fail counts for a single-cell run.](https://developers.openai.com/codex/use-cases/scrna-seq-post-count-qc-screenshot-1.webp)

Then inspect the generated UMAPs by coarse label and Leiden cluster. These
views make it easier to identify annotation gaps, suspicious clusters, or
threshold choices that need another pass.

![Inspect UMAP plots by coarse label and Leiden cluster.](https://developers.openai.com/codex/use-cases/scrna-seq-post-count-qc-screenshot-2.webp)

Finally, review the cell-level metrics and filtering outcomes. Codex preserves
this table with the filtered `.h5ad` and visualization artifacts so you can
revise the thresholds in the same thread without losing the rationale for the
first pass.

![Open cell-level QC metrics and filtering outcomes for review.](https://developers.openai.com/codex/use-cases/scrna-seq-post-count-qc-screenshot-3.webp)