---
title: cf.llm.prompt.unsafe_topic_categories
description: Array of string values with the type of unsafe topics detected in the LLM prompt.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/ruleset-engine/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

#  cf.llm.prompt.unsafe\_topic\_categories 

`cf.llm.prompt.unsafe_topic_categories` ` Array<String> ` 

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

```

# Matches requests where an unsafe topic categorized as "S2" (Non-violent crimes) or "S10" (Hate) was detected in the LLM prompt:

(cf.llm.prompt.unsafe_topic_detected and any(cf.llm.prompt.unsafe_topic_categories[*] in {"S2" "S10"}))


```

Categories: 
* Request

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ruleset-engine/","name":"Ruleset Engine"}},{"@type":"ListItem","position":3,"item":{"@id":"/ruleset-engine/rules-language/","name":"Rules language"}},{"@type":"ListItem","position":4,"item":{"@id":"/ruleset-engine/rules-language/fields/","name":"Fields"}},{"@type":"ListItem","position":5,"item":{"@id":"/ruleset-engine/rules-language/fields/reference/","name":"Fields reference"}}]}
```
