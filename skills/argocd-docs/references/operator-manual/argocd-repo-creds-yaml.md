# argocd-repo-creds.yaml example

An example of an argocd-repo-creds.yaml file:

```yaml
# Repository credentials, for using the same credentials in multiple repositories.
apiVersion: v1
kind: Secret
metadata:
  name: argoproj-https-creds
  namespace: argocd
  labels:
    argocd.argoproj.io/secret-type: repo-creds
stringData:
  url: https://github.com/argoproj
  type: helm
  password: EXAMPLE_PASSWORD
  username: my-username
---
apiVersion: v1
kind: Secret
metadata:
  name: argoproj-ssh-creds
  namespace: argocd
  labels:
    argocd.argoproj.io/secret-type: repo-creds
stringData:
  url: git@github.com:argoproj-labs
  type: helm
  sshPrivateKey: |
    EXAMPLE_PRIVATE_KEY_PEM
---
apiVersion: v1
kind: Secret
metadata:
  name: github-creds
  namespace: argocd
  labels:
    argocd.argoproj.io/secret-type: repo-creds
stringData:
  url: https://github.com/argoproj
  type: helm
  githubAppID: 1
  githubAppInstallationID: 2
  githubAppPrivateKey: |
    EXAMPLE_PRIVATE_KEY_PEM
---
apiVersion: v1
kind: Secret
metadata:
  name: github-enterprise-creds
  namespace: argocd
  labels:
    argocd.argoproj.io/secret-type: repo-creds
stringData:
  url: https://github.com/argoproj
  type: helm
  githubAppID: 1
  githubAppInstallationID: 2
  githubAppEnterpriseBaseUrl: https://ghe.example.com/api/v3
  githubAppPrivateKey: |
    EXAMPLE_PRIVATE_KEY_PEM
---
apiVersion: v1
kind: Secret
metadata:
  name: private-oci-repo
  namespace: argocd
  labels:
    argocd.argoproj.io/secret-type: repo-creds
stringData:
  username: my-username
  password: EXAMPLE_PASSWORD
  project: myproject
  type: oci
  url: oci://my.registry.com/namespace
```
