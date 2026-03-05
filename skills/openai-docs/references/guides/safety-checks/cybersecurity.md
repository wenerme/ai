# Cybersecurity checks

GPT-5.3-Codex is the first model we are classifying as having High Cybersecurity Capability under our [Preparedness Framework](https://cdn.openai.com/pdf/18a02b5d-6b67-4cec-ab64-68cdfbddebcd/preparedness-framework-v2.pdf). As a result, additional automated safeguards apply when using this model via the API. Please note that the safeguards applied in the API differ from those used in Codex. You can learn more about the Codex safeguards [here](https://developers.openai.com/codex/concepts/cyber-safety/).

These safeguards monitor for signals of potentially suspicious cybersecurity activity. If certain thresholds are met, access to the model may be temporarily limited while activity is reviewed. Because these systems are still being calibrated, legitimate security research or defensive work may occasionally be flagged. We expect only a small portion of traffic to be impacted, and we’re continuing to refine the overall API experience.

## Safeguard actions for non-ZDR Organizations

If our systems detect potentially suspicious cybersecurity activity within your traffic that exceeds defined thresholds, access to GPT-5.3-Codex may be temporarily revoked. In this case, API requests will return an error with the error code `cyber_policy`.

If your organization has not implemented a per-user [safety_identifier](https://developers.openai.com/api/docs/guides/safety-best-practices#implement-safety-identifiers), access may be temporarily revoked for the **entire organization**. If your organization provides a unique [safety_identifier](https://developers.openai.com/api/docs/guides/safety-best-practices#implement-safety-identifiers) per end user, access may be temporarily revoked for the **specific affected user** rather than the entire organization (after human review and warnings). Providing safety identifiers helps minimize disruption to other users on your platform.

## Safeguard actions for ZDR Organizations

The process is largely similar for [non-Zero Data Retention (ZDR)](https://developers.openai.com/api/docs/guides/your-data/#data-retention-controls-for-abuse-monitoring) organizations as described above; however, for organizations using ZDR, request-level mitigations are additionally applied.

If a request is classified as potentially suspicious you may receive an API error with the error code `cyber_policy`. For streaming requests, these errors may be returned in the midst of other streaming events.

As with non-ZDR organizations, if certain thresholds of suspicious cyber activity are met, access may be limited for the specific safety_identifier or for the whole organization.

## Appeals

If you believe your access has been incorrectly limited and need it restored before the 7-day period ends, please [contact support](https://help.openai.com/en/articles/6614161-how-can-i-contact-support).