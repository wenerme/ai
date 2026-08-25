---
description: Array of string values with the type of unsafe topics detected in the LLM prompt.
title: cf.llm.prompt.unsafe_topic_categories
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

# cf.llm.prompt.unsafe\_topic\_categories

`cf.llm.prompt.unsafe_topic_categories` `Array<String>`

Array of string values with the type of unsafe topics detected in the LLM prompt.

The possible values are the following:

| Value | Category name             | Description                                                                                                       |
| ----- | ------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| S1    | Violent crimes            | Violent crimes against people or animals.                                                                         |
| S2    | Non-violent crimes        | Non-violent offenses such as fraud, theft, drug creation, or hacking.                                             |
| S3    | Sex-related crimes        | Sex-related crimes, including trafficking, assault, and harassment.                                               |
| S4    | Child sexual exploitation | Sexual exploitation of children.                                                                                  |
| S5    | Defamation                | False statements that are likely to damage a living person's reputation.                                          |
| S6    | Specialized advice        | Specialized financial, medical, or legal advice, or misrepresent dangerous things as safe.                        |
| S7    | Privacy                   | Sensitive, nonpublic personal information that could endanger an individual.                                      |
| S8    | Intellectual property     | Violate a third party's intellectual property rights.                                                             |
| S9    | Indiscriminate weapons    | Creation of indiscriminate weapons like chemical, biological, or nuclear arms.                                    |
| S10   | Hate                      | Demean or dehumanize people based on their race, religion, sexual orientation, or other personal characteristics. |
| S11   | Suicide and self-harm     | Encourage or endorse suicide, self-injury, or disordered eating.                                                  |
| S12   | Sexual content            | Erotic content.                                                                                                   |
| S13   | Elections                 | False information about the time, place, or manner of voting in elections.                                        |
| S14   | Code interpreter abuse    | Misuse of code execution capabilities.                                                                            |

Requires a Cloudflare Enterprise plan. You must also enable [AI Security for Apps](https://developers.cloudflare.com/waf/detections/ai-security-for-apps/).

Example usage:

```txt
# Matches requests where an unsafe topic categorized as "S2" (Non-violent crimes) or "S10" (Hate) was detected in the LLM prompt:
(cf.llm.prompt.unsafe_topic_detected and any(cf.llm.prompt.unsafe_topic_categories[*] in {"S2" "S10"}))
```

Categories:
* Request

Was this helpful?

YesNo

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/cf.llm.prompt.unsafe_topic_categories/#page","headline":"cf.llm.prompt.unsafe_topic_categories · Cloudflare Ruleset Engine docs","description":"Array of string values with the type of unsafe topics detected in the LLM prompt.","url":"https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/cf.llm.prompt.unsafe_topic_categories/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
