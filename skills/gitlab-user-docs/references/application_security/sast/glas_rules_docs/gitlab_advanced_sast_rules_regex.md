# GitLab Advanced SAST rules: Regex

- Tier: Ultimate
- Offering: GitLab.com, GitLab Self-Managed, GitLab Dedicated

Rules used by GitLab Advanced SAST to detect vulnerabilities in Regex code.

If a rule reports a finding in code you know is safe, you can:

- [Suppress findings on that line](../gitlab_advanced_sast.md#exclude-lines).
- [Disable the rule](../customize_rulesets.md#disable-specific-default-gitlab-advanced-sast-rules).
- [Dismiss the vulnerability](../../vulnerabilities/_index.md#vulnerability-dismissal-reasons).

If the finding is a real vulnerability, [remediate it](../../remediate/_index.md).

| Rule ID | Rule description | CWE | OWASP Top 10 |
|---------|------------------|-----|--------------|
| `regex-jsp-xss-escapexml-atomic` | Improper encoding or escaping of output | [CWE-116](https://cwe.mitre.org/data/definitions/116.html) | A7:2017, A03:2021 |
