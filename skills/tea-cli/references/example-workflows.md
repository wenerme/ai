# Gitea actions workflows

## Workflow management with tea

### List workflows

```bash
# List all workflows in the repository
tea actions workflows list
```

### View workflow details

```bash
# View details of a specific workflow by ID or filename
tea actions workflows view deploy.yml
```

### Dispatch (trigger) a workflow

```bash
# Dispatch a workflow on the current branch
tea actions workflows dispatch deploy.yml

# Dispatch on a specific branch
tea actions workflows dispatch deploy.yml --ref main

# Dispatch with workflow inputs
tea actions workflows dispatch deploy.yml --ref main --input env=staging --input version=1.2.3

# Dispatch and follow log output
tea actions workflows dispatch ci.yml --ref feature/my-pr --follow
```

### Enable / disable workflows

```bash
# Disable a workflow
tea actions workflows disable deploy.yml --confirm

# Enable a workflow
tea actions workflows enable deploy.yml
```

## Example: Re-trigger CI from an AI-driven PR flow

Use `tea actions workflows dispatch` to re-run a specific workflow after
pushing changes in an automated PR workflow:

```bash
# Push changes to a feature branch, then re-trigger CI
git push origin feature/auto-fix
tea actions workflows dispatch check-and-test --ref feature/auto-fix --follow
```

## Example: Dispatch a workflow with `workflow_dispatch` trigger

```yaml
name: deploy

on:
  workflow_dispatch:
    inputs:
      env:
        description: "Target environment"
        required: true
        default: "staging"
      version:
        description: "Version to deploy"
        required: true

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v6
      - name: Deploy
        run: |
          echo "Deploying version ${{ gitea.event.inputs.version }} to ${{ gitea.event.inputs.env }}"
```

Trigger this workflow from the CLI:

```bash
tea actions workflows dispatch deploy.yml --ref main --input env=production --input version=2.0.0
```

## Merge Pull request on approval

```yaml
---
name: Pull request
on:
  pull_request_review:
    types: [submitted, dismissed]
jobs:
  approved:
    name: Approved
    if: gitea.event.review.type == 'pull_request_review_approved'
    container:
      image: docker.io/pysen/tea:latest
    runs-on: ubuntu-latest
    steps:
    - name: Configure Tea
      env:
        # This is a tea config.yml with (service) account token
        TEA_CREDENTIALS: ${{ secrets.TEA_CREDENTIALS }}
      run: |
        echo "$TEA_CREDENTIALS" > $HOME/.config/tea/config.yml
    - name: Rebase then fast-forward merge Git
      run: |
        tea pr merge --repo ${{ gitea.event.repository.full_name }} --style rebase ${{ gitea.event.pull_request.number }}
  dismissed:
    name: Dismissed
    if: gitea.event.review.type == 'pull_request_review_rejected'
    runs-on: ubuntu-latest
    steps:
    - run: |
        tea pr reject --repo ${{ gitea.event.repository.full_name }} ${{ gitea.event.pull_request.number }} "Dismissed"
```
