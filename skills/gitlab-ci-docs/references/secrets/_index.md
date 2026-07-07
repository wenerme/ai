# Use external secrets in CI/CD

- Tier: Premium, Ultimate
- Offering: GitLab.com, GitLab Self-Managed, GitLab Dedicated

CI/CD jobs might need sensitive information, called secrets, to complete work.
This sensitive information could be items like API tokens, database credentials, or private keys.
Secrets are sourced from a secrets provider.

Unlike CI/CD variables which are always available in jobs, secrets must be explicitly
requested by a job.

GitLab supports several secret management providers, including:

1. [HashiCorp Vault](hashicorp_vault.md)
1. [Google Cloud Secret Manager](gcp_secret_manager.md)
1. [Azure Key Vault](azure_key_vault.md)
1. [AWS Secrets Manager](aws_secrets_manager.md)

These integrations use [ID tokens](id_token_authentication.md) for authentication.
You can also use ID tokens to manually authenticate with any secrets provider that supports
OIDC authentication with JSON web tokens (JWT).
