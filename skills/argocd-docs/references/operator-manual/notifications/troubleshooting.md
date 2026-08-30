`argocd admin notifications` is a CLI command group that helps to configure the controller
settings and troubleshoot issues. Full command details are available in the [command reference](../../user-guide/commands/argocd_admin_notifications.md).

## Global flags
The following global flags are available for all sub-commands:

* `--config-map` - path to the file containing `argocd-notifications-cm` ConfigMap. If not specified
then the command loads `argocd-notification-cm` ConfigMap using the local Kubernetes config file.
* `--secret` - path to the file containing `argocd-notifications-secret` ConfigMap. If not
specified then the command loads `argocd-notification-secret` Secret using the local Kubernetes config file.
Additionally, you can specify `:empty` to use empty secret with no notification service settings. 

**Examples:**

* Get a list of triggers configured in the local config map:

    ```bash
    argocd admin notifications trigger get \
      --config-map ./argocd-notifications-cm.yaml --secret :empty
    ```

* Trigger notification using in-cluster config map and secret:

    ```bash
    argocd admin notifications template notify \
      app-sync-succeeded guestbook --recipient slack:argocd admin notifications
    ```

## Kustomize

If you are managing `argocd-notifications` config using Kustomize you can pipe whole `kustomize build` output
into stdin using `--config-map -` flag:

```bash
kustomize build ./argocd-notifications | \
  argocd-notifications \
  template notify app-sync-succeeded guestbook --recipient grafana:argocd \
  --config-map -
```

## How to get it

### On your laptop

You can download the `argocd` CLI from the GitHub [release](https://github.com/argoproj/argo-cd/releases)
attachments.

The binary is available in the `quay.io/argoproj/argocd` image. Use the `docker run` and volume mount
to execute binary on any platform. 

**Example:**

```bash
docker run --rm -it -w /src -v $(pwd):/src \
  quay.io/argoproj/argocd:<version> \
  /app/argocd admin notifications trigger get \
  --config-map ./argocd-notifications-cm.yaml --secret :empty
```

### In your cluster

SSH into the running `argocd-notifications-controller` pod and use `kubectl exec` command to validate in-cluster
configuration.

**Example**
```bash
kubectl exec -it argocd-notifications-controller-<pod-hash> \
  /usr/local/bin/argocd admin notifications trigger get
```

## Commands

The following commands may help debug issues with notifications:

* [`argocd admin notifications template get`](../../user-guide/commands/argocd_admin_notifications_template_get.md)
* [`argocd admin notifications template notify`](../../user-guide/commands/argocd_admin_notifications_template_notify.md)
* [`argocd admin notifications trigger get`](../../user-guide/commands/argocd_admin_notifications_trigger_get.md)
* [`argocd admin notifications trigger run`](../../user-guide/commands/argocd_admin_notifications_trigger_run.md)

## Errors

## Failed to parse new settings

### error converting YAML to JSON

YAML syntax is incorrect.

**incorrect:**

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: argocd-notifications-cm
data:
  service.slack: |
    token: $slack-token
    icon: :rocket:
```

**correct:**

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: argocd-notifications-cm
data:
  service.slack: |
    token: $slack-token
    icon: ":rocket:" # <- diff here
```

### service type 'xxxx' is not supported

Check the `argocd-notifications` controller version. For example, the Teams integration support started in `v1.1.0`.

## Failed to notify recipient

### notification service 'xxxx' is not supported

You have not defined `xxxx` in `argocd-notifications-cm` or parsing failed.

### GitHub.repoURL (\u003cno value\u003e) does not have a / using the configuration

Likely caused by an Application with [multiple sources](https://argo-cd.readthedocs.io/en/stable/user-guide/multiple_sources/):

```yaml
spec:
  sources:  # <- multiple sources
  - repoURL: https://github.com/exampleOrg/first.git
    path: sources/example
  - repoURL: https://github.com/exampleOrg/second.git
    targetRevision: "{{branch}}"
```

The standard notification template only supports a single source (`{{.app.spec.source.repoURL}}`). Use an index to specify the source in the array:

```yaml
template.example: |
  github:
    repoURLPath: "{{ (index .app.spec.sources 0).repoURL }}"
```

### Error message `POST https://api.github.com/repos/xxxx/yyyy/statuses/: 404 Not Found`

This case is similar to the previous one, you have multiple sources in the Application manifest. 
Default `revisionPath` template `{{.app.status.operationState.syncResult.revision}}` is for an Application with single source.

Multi-source applications report application statuses in an array:

```yaml
status:
  operationState:
    syncResult:
      revisions:
        - 38cfa22edf9148caabfecb288bfb47dc4352dfc6
        - 38cfa22edf9148caabfecb288bfb47dc4352dfc6
Quick fix for this is to use `index` function to get the first revision:
```yaml
template.example: |
  github:
    revisionPath: "{{index .app.status.operationState.syncResult.revisions 0}}"
```

## config referenced xxx, but key does not exist in secret

- If you are using a custom secret, check that the secret is in the same namespace
- You have added the label: `app.kubernetes.io/part-of: argocd` to the secret
- You have tried restarting `argocd-notifications` controller

### Example:
Secret:
```yaml
apiVersion: v1
kind: Secret
metadata:
  name: argocd-slackbot
  namespace: <the namespace where argocd is installed>
  labels:
    app.kubernetes.io/part-of: argocd
type: Opaque
data:
  slack-token: <base64encryptedtoken>
```
ConfigMap
```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: argocd-notifications-cm
data:
  service.slack: |
    token: $argocd-slackbot:slack-token
```
