The notification template is used to generate the notification content and is configured in the `argocd-notifications-cm` ConfigMap. The template is leveraging
the [html/template](https://golang.org/pkg/html/template/) golang package and allows customization of the notification message.
Templates are meant to be reusable and can be referenced by multiple triggers.

The following template is used to notify the user about application sync status.

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: argocd-notifications-cm
data:
  template.my-custom-template-slack-template: |
    message: |
      Application {{.app.metadata.name}} sync is {{.app.status.sync.status}}.
      Application details: {{.context.argocdUrl}}/applications/{{.app.metadata.name}}.
```

Each template has access to the following fields:

- `app` holds the application object.
- `appProject` holds the AppProject object associated with the application. This provides access to project-level details like RBAC roles, policies, source repository restrictions, and destination cluster restrictions.
- `context` is a user-defined string map and might include any string keys and values.
- `secrets` provides access to sensitive data stored in `argocd-notifications-secret`
- `serviceType` holds the notification service type name (such as "slack" or "email"). The field can be used to conditionally
render service-specific fields.
- `recipient` holds the recipient name.

## Defining user-defined `context`

It is possible to define some shared context between all notification templates by setting a top-level
YAML document of key-value pairs, which can then be used within templates, like so:

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: argocd-notifications-cm
data:
  context: |
    region: east
    environmentName: staging

  template.a-slack-template-with-context: |
    message: "Something happened in {{ .context.environmentName }} in the {{ .context.region }} data center!"
```

## Using AppProject information in templates

Templates can access the AppProject associated with an Application using the `appProject` variable. This is useful for including project-level information such as RBAC policies, source repositories, and destination clusters in notifications.

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: argocd-notifications-cm
data:
  template.app-project-info: |
    message: |
      Application {{.app.metadata.name}} belongs to project {{.appProject.metadata.name}}.
      Project description: {{.appProject.spec.description}}
      Allowed source repositories: {{range .appProject.spec.sourceRepos}}{{.}} {{end}}
  
  template.app-rbac-policies: |
    message: |
      Application: {{.app.metadata.name}}
      Project: {{.appProject.metadata.name}}
      RBAC Roles:
      {{range .appProject.spec.roles}}
      - Role: {{.name}}
        Policies: {{range .policies}}{{.}} {{end}}
      {{end}}
```

## Defining and using secrets within notification templates

Some notification service use cases will require the use of secrets within templates. This can be achieved with the use of
the `secrets` data variable available within the templates.

Given that we have the following `argocd-notifications-secret`:

```yaml
apiVersion: v1
kind: Secret
metadata:
  name: argocd-notifications-secret
stringData:
  sampleWebhookToken: secret-token
type: Opaque
```

We can use the defined `sampleWebhookToken` in a template as such:

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: argocd-notifications-cm
data:
  template.trigger-webhook: |
      webhook:
        sample-webhook:
          method: POST
          path: 'webhook/endpoint/with/auth'
          body: 'token={{ .secrets.sampleWebhookToken }}&variables[APP_SOURCE_PATH]={{ .app.spec.source.path }}
```

## Notification Service Specific Fields

The `message` field of the template definition allows creating a basic notification for any notification service. You can leverage notification service-specific
fields to create complex notifications. For example, using service-specific fields you can add blocks and attachments for Slack, subject for Email or URL path, and body for Webhook.
See corresponding service [documentation](services/overview.md) for more information.

## Change the timezone

To change the timezone used when formatting time values in notifications, see
[Configuring the local timezone](#configuring-the-local-timezone).

## Functions

Templates have access to the set of built-in functions such as the functions of the [Sprig](https://masterminds.github.io/sprig/) package

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: argocd-notifications-cm
data:
  template.my-custom-template-slack-template: |
    message: "Author: {{(call .repo.GetCommitMetadata .app.status.sync.revision).Author}}"
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
