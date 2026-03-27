# Gitea actions workflows

## Merge Pull request on approval

``` Yaml
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
