# AI Catalog Rake tasks

- Tier: Premium, Ultimate
- Offering: GitLab Self-Managed

GitLab provides a Rake task for seeding Self-managed AI Catalogs with the following external agents:

- Claude Agent by GitLab <https://gitlab.com/explore/ai-catalog/agents/2057/>
- Codex Agent by GitLab <https://gitlab.com/explore/ai-catalog/agents/513/>

## Seed AI catalog external agents

### Linux package (Omnibus)

```shell
sudo gitlab-rake gitlab:ai_catalog:seed_external_agents
```

### Self-compiled (source)

```shell
bundle exec rake gitlab:ai_catalog:seed_external_agents
```
