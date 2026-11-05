# GitLab Advanced SAST rules

- Tier: Ultimate
- Offering: GitLab.com, GitLab Self-Managed, GitLab Dedicated

The [GitLab Advanced SAST](../gitlab_advanced_sast.md) analyzer uses the following rules
to detect vulnerabilities in source code.

If a rule reports a finding in code you know is safe, you can:

- [Suppress findings on that line](../gitlab_advanced_sast.md#exclude-lines).
- [Disable the rule](../customize_rulesets.md#disable-specific-default-gitlab-advanced-sast-rules).
- [Dismiss the vulnerability](../../vulnerabilities/_index.md#vulnerability-dismissal-reasons).

If the finding is a real vulnerability, [remediate it](../../remediate/_index.md).

## Coverage summary

| Language | Total rules |
|----------|-------------|
| [C#](gitlab_advanced_sast_rules_csharp.md) | 48 |
| [Go](gitlab_advanced_sast_rules_go.md) | 47 |
| [Java](gitlab_advanced_sast_rules_java.md) | 124 |
| [JavaScript](gitlab_advanced_sast_rules_javascript.md) | 98 |
| [PHP](gitlab_advanced_sast_rules_php.md) | 92 |
| [Python](gitlab_advanced_sast_rules_python.md) | 108 |
| [Regex](gitlab_advanced_sast_rules_regex.md) | 1 |
| [Ruby](gitlab_advanced_sast_rules_ruby.md) | 38 |
| **Total** | **556** |
