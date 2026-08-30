The trigger defines the condition when the notification should be sent. The definition includes name, condition
and notification templates reference. The condition is a predicate expression that returns true if the notification
should be sent. The trigger condition evaluation is powered by [antonmedv/expr](https://github.com/antonmedv/expr).
The condition language syntax is described at [language-definition.md](https://github.com/antonmedv/expr/blob/master/docs/language-definition.md).

The trigger is configured in the `argocd-notifications-cm` ConfigMap. For example the following trigger sends a notification
when application sync status changes to `Unknown` using the `app-sync-status` template:

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: argocd-notifications-cm
data:
  trigger.on-sync-status-unknown: |
    - when: app.status.sync.status == 'Unknown'     # trigger condition
      send: [app-sync-status, github-commit-status] # template names
```

Each condition might use several templates. Typically, each template is responsible for generating a service-specific notification part.
In the example above, the `app-sync-status` template "knows" how to create email and Slack notification, and `github-commit-status` knows how to
generate the payload for GitHub webhook.

## Conditions Bundles

Triggers are typically managed by administrators and encapsulate information about when and which notification should be sent.
The end users just need to subscribe to the trigger and specify the notification destination. In order to improve user experience
triggers might include multiple conditions with a different set of templates for each condition. For example, the following trigger
covers all stages of sync status operation and uses a different template for different cases:

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: argocd-notifications-cm
data:
  trigger.sync-operation-change: |
    - when: app.status?.operationState.phase in ['Succeeded']
      send: [github-commit-status]
    - when: app.status?.operationState.phase in ['Running']
      send: [github-commit-status]
    - when: app.status?.operationState.phase in ['Error', 'Failed']
      send: [app-sync-failed, github-commit-status]
```

## Accessing Optional Manifest Sections and Fields

Note that in the trigger example above, the `?.` (optional chaining) operator is used to access the Application's
`status.operationState` section. This section is optional; it is not present when an operation has been initiated but has not yet
started by the Application Controller.

If the `?.` operator were not used, `status.operationState` would resolve to `nil` and the evaluation of the
`app.status.operationState.phase` expression would fail.  The `app.status?.operationState.phase` expression is equivalent to
`app.status.operationState != nil ?  app.status.operationState.phase : nil`.

## Avoid Sending Same Notification Too Often

In some cases, the trigger condition might be "flapping". The example below illustrates the problem.
The trigger is supposed to generate a notification once when Argo CD application is successfully synchronized and healthy.
However, the application health status might intermittently switch to `Progressing` and then back to `Healthy` so the trigger might unnecessarily generate
multiple notifications. The `oncePer` field configures triggers to generate the notification only when the corresponding application field changes.
The `on-deployed` trigger from the example below sends the notification only once per observed Git revision of the deployment repository.

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: argocd-notifications-cm
data:
  # Optional 'oncePer' property ensures that notification is sent only once per specified field value
  # E.g. following is triggered once per sync revision
  trigger.on-deployed: |
    when: app.status?.operationState.phase in ['Succeeded'] and app.status.health.status == 'Healthy'
    oncePer: app.status.sync.revision
    send: [app-sync-succeeded]
```

**Mono Repo Usage**

When one repo is used to sync multiple applications, the `oncePer: app.status.sync.revision` field will trigger a notification for each commit. For mono repos, the better approach will be using `oncePer: app.status?.operationState.syncResult.revision` statement. This way a notification will be sent only for a particular Application's revision.

### oncePer

The `oncePer` field is supported like as follows.

```yaml
apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  annotations:
    example.com/version: v0.1
```

```yaml
oncePer: app.metadata.annotations["example.com/version"]
```

## Default Triggers

You can use `defaultTriggers` field instead of specifying individual triggers to the annotations.

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: argocd-notifications-cm
data:
  # Holds list of triggers that are used by default if trigger is not specified explicitly in the subscription
  defaultTriggers: |
    - on-sync-status-unknown

  defaultTriggers.mattermost: |
    - on-sync-running
    - on-sync-succeeded
```

Specify the annotations as follows to use `defaultTriggers`. In this example, `slack` sends when `on-sync-status-unknown`, and `mattermost` sends when `on-sync-running` and `on-sync-succeeded`.

```yaml
apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  annotations:
    notifications.argoproj.io/subscribe.slack: my-channel
    notifications.argoproj.io/subscribe.mattermost: my-mattermost-channel
```

## Functions

Triggers have access to the set of built-in functions.

Example:

```yaml
when: time.Now().Sub(time.Parse(app.status?.operationState.startedAt)).Minutes() >= 5
```

### **time**
Time related functions.

#### Configuring the local timezone

The `time` functions can be used in both notification templates and triggers.

When converting a time value to local time using `.Local()`, Argo CD Notifications uses the local timezone configured for the `argocd-notifications-controller` container.

You can configure this timezone by setting the `TZ` environment variable on the `argocd-notifications-controller` container:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: argocd-notifications-controller
spec:
  template:
    spec:
      containers:
      - name: argocd-notifications-controller
        env:
        - name: TZ
          value: Asia/Tokyo
```

For example, a notification template can format an application timestamp in the configured local timezone:

```
{{ (call .time.Parse .app.status.operationState.startedAt).Local.Format "2006-01-02T15:04:05Z07:00" }}
```

<hr>
**`time.Now() Time`**

Executes function built-in Golang [time.Now](https://golang.org/pkg/time/#Now) function. Returns an instance of
Golang [Time](https://golang.org/pkg/time/#Time).

<hr>
**`time.Parse(val string) Time`**

Parses specified string using RFC3339 layout. Returns an instance of Golang [Time](https://golang.org/pkg/time/#Time).

<hr>
Time related constants.

**Durations**

```
	time.Nanosecond   = 1
	time.Microsecond  = 1000 * Nanosecond
	time.Millisecond  = 1000 * Microsecond
	time.Second       = 1000 * Millisecond
	time.Minute       = 60 * Second
	time.Hour         = 60 * Minute
```

**Timestamps**

Used when formatting time instances as strings (e.g. `time.Now().Format(time.RFC3339)`).

```
	time.Layout      = "01/02 03:04:05PM '06 -0700" // The reference time, in numerical order.
	time.ANSIC       = "Mon Jan _2 15:04:05 2006"
	time.UnixDate    = "Mon Jan _2 15:04:05 MST 2006"
	time.RubyDate    = "Mon Jan 02 15:04:05 -0700 2006"
	time.RFC822      = "02 Jan 06 15:04 MST"
	time.RFC822Z     = "02 Jan 06 15:04 -0700" // RFC822 with numeric zone
	time.RFC850      = "Monday, 02-Jan-06 15:04:05 MST"
	time.RFC1123     = "Mon, 02 Jan 2006 15:04:05 MST"
	time.RFC1123Z    = "Mon, 02 Jan 2006 15:04:05 -0700" // RFC1123 with numeric zone
	time.RFC3339     = "2006-01-02T15:04:05Z07:00"
	time.RFC3339Nano = "2006-01-02T15:04:05.999999999Z07:00"
	time.Kitchen     = "3:04PM"
	// Handy time stamps.
	time.Stamp      = "Jan _2 15:04:05"
	time.StampMilli = "Jan _2 15:04:05.000"
	time.StampMicro = "Jan _2 15:04:05.000000"
	time.StampNano  = "Jan _2 15:04:05.000000000"
```

### **strings**
String related functions.

<hr>
**`strings.ReplaceAll() string`**

Executes function built-in Golang [strings.ReplaceAll](https://pkg.go.dev/strings#ReplaceAll) function.

<hr>
**`strings.ToUpper() string`**

Executes function built-in Golang [strings.ToUpper](https://pkg.go.dev/strings#ToUpper) function.

<hr>
**`strings.ToLower() string`**

Executes function built-in Golang [strings.ToLower](https://pkg.go.dev/strings#ToLower) function.

### **sync**

<hr>
**`sync.GetInfoItem(app map, name string) string`**
Returns the `info` item value by given name stored in the Argo CD App sync operation.

### **repo**
Functions that provide additional information about Application source repository.
<hr>
**`repo.RepoURLToHTTPS(url string) string`**

Transforms given GIT URL into HTTPs format.

<hr>
**`repo.FullNameByRepoURL(url string) string`**

Returns repository URL full name `(<owner>/<repoName>)`. Currently supports only Github, GitLab and Bitbucket.

<hr>
**`repo.QueryEscape(s string) string`**

QueryEscape escapes the string, so it can be safely placed inside a URL

Example:
```
/projects/{{ call .repo.QueryEscape (call .repo.FullNameByRepoURL .app.status.RepoURL) }}/merge_requests
```

<hr>
**`repo.GetCommitMetadata(sha string) CommitMetadata`**

Returns commit metadata. The commit must belong to the application source repository. `CommitMetadata` fields:

* `Message string` commit message
* `Author string` - commit author
* `Date time.Time` - commit creation date
* `Tags []string` - Associated tags

<hr>
**`repo.GetAppDetails() AppDetail`**

Returns application details. `AppDetail` fields:

* `Type string` - AppDetail type
* `Helm HelmAppSpec` - Helm details
  * Fields :
    * `Name string`
    * `ValueFiles []string`
    * `Parameters []*v1alpha1.HelmParameter`
    * `Values string`
    * `FileParameters []*v1alpha1.HelmFileParameter`
  * Methods :
    * `GetParameterValueByName(Name string)` Retrieve value by name in Parameters field
    * `GetFileParameterPathByName(Name string)` Retrieve path by name in FileParameters field
*
* `Kustomize *apiclient.KustomizeAppSpec` - Kustomize details
* `Directory *apiclient.DirectoryAppSpec` - Directory details
