---
name: Prioritize drug targets
tagline: Rank drug targets across multiple evidence lanes.
summary: Use Codex with the Life Science Research plugin to normalize entities,
  retrieve genetics, cohort, clinical, literature, and expression evidence in
  parallel, score each lane, and produce a final ranking with reusable visuals.
skills:
  - token: Life Science Research
    url: codex://plugins/life-science-research@openai-curated
    description: Search scientific databases and literature to ground pathway,
      translational, tractability, and competitive evidence.
bestFor:
  - Target prioritization questions that need more than one evidence family,
    such as genetics, cohort replication, disease context, clinical precedent,
    literature, and expression.
  - Teams that want Codex to perform scientific research across multiple
    evidence lanes, then reconcile the results into one conclusion.
  - Scientists who want saved raw payloads, an explicit scoring rubric, and
    visuals they can reuse in the next review or decision memo.
starterPrompt:
  title: Prioritize Asthma Drug Targets
  body: >-
    Use the Life Science Research plugin to compare TSLP, IL33, and IL1RL1 for
    asthma target prioritization.


    Run these independent lanes in parallel with subagents:

    - Human genetics and GWAS: gwas-catalog-skill, opentargets-skill,
    gnomad-graphql-skill

    - Cohort replication and PheWAS: finngen-phewas-skill,
    ukb-topmed-phewas-skill, biobankjapan-phewas-skill, tpmi-phewas-skill

    - Target-disease evidence and disease context: opentargets-skill,
    efo-ontology-skill

    - Clinical and regulatory precedent: clinicaltrials-skill,
    opentargets-skill, chembl-skill, pharmgkb-skill

    - Literature and public-dataset context: ncbi-entrez-skill, ncbi-pmc-skill,
    biorxiv-skill, ncbi-datasets-skill, biostudies-arrayexpress-skill

    - Expression and tissue/cell-type context: human-protein-atlas-skill,
    gtex-eqtl-skill, cellxgene-skill, bgee-skill


    For each lane:

    - score TSLP, IL33, IL1RL1 on a 1-5 scale

    - keep direct asthma evidence separate from adjacent allergic/atopic
    phenotypes

    - save raw payloads when helpful


    Then synthesize:

    - a lane-by-target score table

    - a final rank of TSLP, IL33, IL1RL1

    - a confidence assessment and the main caveats

    - two visuals: a prioritization heatmap and a GWAS summary figure with the
    lead asthma-linked variants for each target
  suggestedEffort: high
relatedLinks:
  - label: Request access to GPT-Rosalind
    url: https://openai.com/form/life-sciences-access/
---

## Leverage skills

The [Life Science Research plugin](https://github.com/openai/plugins/tree/main/plugins/life-science-research)
includes skills for each evidence lane:

- Human genetics and GWAS: `gwas-catalog-skill`, `opentargets-skill`, `gnomad-graphql-skill`
- Cohort replication and PheWAS: `finngen-phewas-skill`, `ukb-topmed-phewas-skill`, `biobankjapan-phewas-skill`, `tpmi-phewas-skill`
- Target-disease evidence and disease context: `opentargets-skill`, `efo-ontology-skill`
- Clinical and regulatory precedent: `clinicaltrials-skill`, `opentargets-skill`, `chembl-skill`, `pharmgkb-skill`
- Literature and public-dataset context: `ncbi-entrez-skill`, `ncbi-pmc-skill`, `biorxiv-skill`, `ncbi-datasets-skill`, `biostudies-arrayexpress-skill`
- Expression and tissue/cell-type context: `human-protein-atlas-skill`, `gtex-eqtl-skill`, `cellxgene-skill`, `bgee-skill`

Use these skills by mentioning them specifically, or let Codex decide when to use them.

## Step-by-step guide



1. Start with a concrete comparison question and the exact targets, disease, and evidence lanes you want Codex to cover.
2. Invoke the `Life Science Research` plugin and tell Codex to run the lanes in parallel with subagents so each evidence family stays bounded.
3. Ask Codex to score each lane on a fixed 1-5 scale and to keep direct disease evidence separate from adjacent phenotypes.
4. Review the saved raw payloads, the lane-by-target score table, and the synthesized rank in the same thread.