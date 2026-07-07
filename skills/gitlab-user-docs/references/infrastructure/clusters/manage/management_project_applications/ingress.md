# Install Ingress with a cluster management project

- Tier: Free, Premium, Ultimate
- Offering: GitLab.com, GitLab Self-Managed, GitLab Dedicated

Assuming you already have a project created from a
[management project template](../../../../clusters/management_project_template.md), to install Ingress you should
uncomment this line from your `helmfile.yaml`:

```yaml
  - path: applications/ingress/helmfile.yaml
```

Ingress is installed by default into the `gitlab-managed-apps` namespace
of your cluster.

You can customize the installation of Ingress by updating the
`applications/ingress/values.yaml` file in your cluster
management project. Refer to the
[chart](https://github.com/kubernetes/ingress-nginx/tree/master/charts/ingress-nginx)
for the available configuration options.
