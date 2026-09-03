# Resource Actions

## Overview
Argo CD allows operators to define custom actions which users can perform on specific resource types. This is used internally to provide actions like `restart` for a `DaemonSet`, or `retry` for an Argo Rollout.

Operators can add actions to custom resources in form of a Lua script and expand those capabilities.

## Built-in Actions

The following are actions that are built-in to Argo CD. Each action name links to its Lua script definition:

- [apps/DaemonSet/restart](https://github.com/argoproj/argo-cd/blob/master/resource_customizations/apps/DaemonSet/actions/restart/action.lua)
- [apps/Deployment/pause](https://github.com/argoproj/argo-cd/blob/master/resource_customizations/apps/Deployment/actions/pause/action.lua)
- [apps/Deployment/restart](https://github.com/argoproj/argo-cd/blob/master/resource_customizations/apps/Deployment/actions/restart/action.lua)
- [apps/Deployment/resume](https://github.com/argoproj/argo-cd/blob/master/resource_customizations/apps/Deployment/actions/resume/action.lua)
- [apps/Deployment/scale](https://github.com/argoproj/argo-cd/blob/master/resource_customizations/apps/Deployment/actions/scale/action.lua)
- [apps/StatefulSet/restart](https://github.com/argoproj/argo-cd/blob/master/resource_customizations/apps/StatefulSet/actions/restart/action.lua)
- [apps/StatefulSet/scale](https://github.com/argoproj/argo-cd/blob/master/resource_customizations/apps/StatefulSet/actions/scale/action.lua)
- [argoproj.io/AnalysisRun/terminate](https://github.com/argoproj/argo-cd/blob/master/resource_customizations/argoproj.io/AnalysisRun/actions/terminate/action.lua)
- [argoproj.io/Application/toggle-auto-sync](https://github.com/argoproj/argo-cd/blob/master/resource_customizations/argoproj.io/Application/actions/toggle-auto-sync/action.lua)
- [argoproj.io/CronWorkflow/create-workflow](https://github.com/argoproj/argo-cd/blob/master/resource_customizations/argoproj.io/CronWorkflow/actions/create-workflow/action.lua)
- [argoproj.io/Rollout/abort](https://github.com/argoproj/argo-cd/blob/master/resource_customizations/argoproj.io/Rollout/actions/abort/action.lua)
- [argoproj.io/Rollout/pause](https://github.com/argoproj/argo-cd/blob/master/resource_customizations/argoproj.io/Rollout/actions/pause/action.lua)
- [argoproj.io/Rollout/promote-full](https://github.com/argoproj/argo-cd/blob/master/resource_customizations/argoproj.io/Rollout/actions/promote-full/action.lua)
- [argoproj.io/Rollout/restart](https://github.com/argoproj/argo-cd/blob/master/resource_customizations/argoproj.io/Rollout/actions/restart/action.lua)
- [argoproj.io/Rollout/resume](https://github.com/argoproj/argo-cd/blob/master/resource_customizations/argoproj.io/Rollout/actions/resume/action.lua)
- [argoproj.io/Rollout/retry](https://github.com/argoproj/argo-cd/blob/master/resource_customizations/argoproj.io/Rollout/actions/retry/action.lua)
- [argoproj.io/Rollout/skip-current-step](https://github.com/argoproj/argo-cd/blob/master/resource_customizations/argoproj.io/Rollout/actions/skip-current-step/action.lua)
- [argoproj.io/WorkflowTemplate/create-workflow](https://github.com/argoproj/argo-cd/blob/master/resource_customizations/argoproj.io/WorkflowTemplate/actions/create-workflow/action.lua)
- [batch/CronJob/create-job](https://github.com/argoproj/argo-cd/blob/master/resource_customizations/batch/CronJob/actions/create-job/action.lua)
- [batch/CronJob/resume](https://github.com/argoproj/argo-cd/blob/master/resource_customizations/batch/CronJob/actions/resume/action.lua)
- [batch/CronJob/suspend](https://github.com/argoproj/argo-cd/blob/master/resource_customizations/batch/CronJob/actions/suspend/action.lua)
- [batch/Job/resume](https://github.com/argoproj/argo-cd/blob/master/resource_customizations/batch/Job/actions/resume/action.lua)
- [batch/Job/suspend](https://github.com/argoproj/argo-cd/blob/master/resource_customizations/batch/Job/actions/suspend/action.lua)
- [batch/Job/terminate](https://github.com/argoproj/argo-cd/blob/master/resource_customizations/batch/Job/actions/terminate/action.lua)
- [capsule.clastix.io/GlobalTenantResource/cordon](https://github.com/argoproj/argo-cd/blob/master/resource_customizations/capsule.clastix.io/GlobalTenantResource/actions/cordon/action.lua)
- [capsule.clastix.io/GlobalTenantResource/reconcile](https://github.com/argoproj/argo-cd/blob/master/resource_customizations/capsule.clastix.io/GlobalTenantResource/actions/reconcile/action.lua)
- [capsule.clastix.io/GlobalTenantResource/uncordon](https://github.com/argoproj/argo-cd/blob/master/resource_customizations/capsule.clastix.io/GlobalTenantResource/actions/uncordon/action.lua)
- [capsule.clastix.io/Tenant/cordon](https://github.com/argoproj/argo-cd/blob/master/resource_customizations/capsule.clastix.io/Tenant/actions/cordon/action.lua)
- [capsule.clastix.io/Tenant/uncordon](https://github.com/argoproj/argo-cd/blob/master/resource_customizations/capsule.clastix.io/Tenant/actions/uncordon/action.lua)
- [capsule.clastix.io/TenantResource/cordon](https://github.com/argoproj/argo-cd/blob/master/resource_customizations/capsule.clastix.io/TenantResource/actions/cordon/action.lua)
- [capsule.clastix.io/TenantResource/reconcile](https://github.com/argoproj/argo-cd/blob/master/resource_customizations/capsule.clastix.io/TenantResource/actions/reconcile/action.lua)
- [capsule.clastix.io/TenantResource/uncordon](https://github.com/argoproj/argo-cd/blob/master/resource_customizations/capsule.clastix.io/TenantResource/actions/uncordon/action.lua)
- [core.strimzi.io/StrimziPodSet/rolling-update](https://github.com/argoproj/argo-cd/blob/master/resource_customizations/core.strimzi.io/StrimziPodSet/actions/rolling-update/action.lua)
- [external-secrets.io/ExternalSecret/refresh](https://github.com/argoproj/argo-cd/blob/master/resource_customizations/external-secrets.io/ExternalSecret/actions/refresh/action.lua)
- [external-secrets.io/PushSecret/push](https://github.com/argoproj/argo-cd/blob/master/resource_customizations/external-secrets.io/PushSecret/actions/push/action.lua)
- [helm.toolkit.fluxcd.io/HelmRelease/reconcile](https://github.com/argoproj/argo-cd/blob/master/resource_customizations/helm.toolkit.fluxcd.io/HelmRelease/actions/reconcile/action.lua)
- [helm.toolkit.fluxcd.io/HelmRelease/resume](https://github.com/argoproj/argo-cd/blob/master/resource_customizations/helm.toolkit.fluxcd.io/HelmRelease/actions/resume/action.lua)
- [helm.toolkit.fluxcd.io/HelmRelease/suspend](https://github.com/argoproj/argo-cd/blob/master/resource_customizations/helm.toolkit.fluxcd.io/HelmRelease/actions/suspend/action.lua)
- [image.toolkit.fluxcd.io/ImageRepository/reconcile](https://github.com/argoproj/argo-cd/blob/master/resource_customizations/image.toolkit.fluxcd.io/ImageRepository/actions/reconcile/action.lua)
- [image.toolkit.fluxcd.io/ImageRepository/resume](https://github.com/argoproj/argo-cd/blob/master/resource_customizations/image.toolkit.fluxcd.io/ImageRepository/actions/resume/action.lua)
- [image.toolkit.fluxcd.io/ImageRepository/suspend](https://github.com/argoproj/argo-cd/blob/master/resource_customizations/image.toolkit.fluxcd.io/ImageRepository/actions/suspend/action.lua)
- [image.toolkit.fluxcd.io/ImageUpdateAutomation/reconcile](https://github.com/argoproj/argo-cd/blob/master/resource_customizations/image.toolkit.fluxcd.io/ImageUpdateAutomation/actions/reconcile/action.lua)
- [image.toolkit.fluxcd.io/ImageUpdateAutomation/resume](https://github.com/argoproj/argo-cd/blob/master/resource_customizations/image.toolkit.fluxcd.io/ImageUpdateAutomation/actions/resume/action.lua)
- [image.toolkit.fluxcd.io/ImageUpdateAutomation/suspend](https://github.com/argoproj/argo-cd/blob/master/resource_customizations/image.toolkit.fluxcd.io/ImageUpdateAutomation/actions/suspend/action.lua)
- [k8s.mariadb.com/MariaDB/resume](https://github.com/argoproj/argo-cd/blob/master/resource_customizations/k8s.mariadb.com/MariaDB/actions/resume/action.lua)
- [k8s.mariadb.com/MariaDB/suspend](https://github.com/argoproj/argo-cd/blob/master/resource_customizations/k8s.mariadb.com/MariaDB/actions/suspend/action.lua)
- [keda.sh/ScaledJob/pause](https://github.com/argoproj/argo-cd/blob/master/resource_customizations/keda.sh/ScaledJob/actions/pause/action.lua)
- [keda.sh/ScaledJob/resume](https://github.com/argoproj/argo-cd/blob/master/resource_customizations/keda.sh/ScaledJob/actions/resume/action.lua)
- [keda.sh/ScaledObject/pause](https://github.com/argoproj/argo-cd/blob/master/resource_customizations/keda.sh/ScaledObject/actions/pause/action.lua)
- [keda.sh/ScaledObject/paused-replicas](https://github.com/argoproj/argo-cd/blob/master/resource_customizations/keda.sh/ScaledObject/actions/paused-replicas/action.lua)
- [keda.sh/ScaledObject/resume](https://github.com/argoproj/argo-cd/blob/master/resource_customizations/keda.sh/ScaledObject/actions/resume/action.lua)
- [kustomize.toolkit.fluxcd.io/Kustomization/reconcile](https://github.com/argoproj/argo-cd/blob/master/resource_customizations/kustomize.toolkit.fluxcd.io/Kustomization/actions/reconcile/action.lua)
- [kustomize.toolkit.fluxcd.io/Kustomization/resume](https://github.com/argoproj/argo-cd/blob/master/resource_customizations/kustomize.toolkit.fluxcd.io/Kustomization/actions/resume/action.lua)
- [kustomize.toolkit.fluxcd.io/Kustomization/suspend](https://github.com/argoproj/argo-cd/blob/master/resource_customizations/kustomize.toolkit.fluxcd.io/Kustomization/actions/suspend/action.lua)
- [notification.toolkit.fluxcd.io/Alert/resume](https://github.com/argoproj/argo-cd/blob/master/resource_customizations/notification.toolkit.fluxcd.io/Alert/actions/resume/action.lua)
- [notification.toolkit.fluxcd.io/Alert/suspend](https://github.com/argoproj/argo-cd/blob/master/resource_customizations/notification.toolkit.fluxcd.io/Alert/actions/suspend/action.lua)
- [notification.toolkit.fluxcd.io/Provider/resume](https://github.com/argoproj/argo-cd/blob/master/resource_customizations/notification.toolkit.fluxcd.io/Provider/actions/resume/action.lua)
- [notification.toolkit.fluxcd.io/Provider/suspend](https://github.com/argoproj/argo-cd/blob/master/resource_customizations/notification.toolkit.fluxcd.io/Provider/actions/suspend/action.lua)
- [notification.toolkit.fluxcd.io/Receiver/reconcile](https://github.com/argoproj/argo-cd/blob/master/resource_customizations/notification.toolkit.fluxcd.io/Receiver/actions/reconcile/action.lua)
- [notification.toolkit.fluxcd.io/Receiver/resume](https://github.com/argoproj/argo-cd/blob/master/resource_customizations/notification.toolkit.fluxcd.io/Receiver/actions/resume/action.lua)
- [notification.toolkit.fluxcd.io/Receiver/suspend](https://github.com/argoproj/argo-cd/blob/master/resource_customizations/notification.toolkit.fluxcd.io/Receiver/actions/suspend/action.lua)
- [numaflow.numaproj.io/InterStepBufferService/force-promote](https://github.com/argoproj/argo-cd/blob/master/resource_customizations/numaflow.numaproj.io/InterStepBufferService/actions/force-promote/action.lua)
- [numaflow.numaproj.io/MonoVertex/force-promote](https://github.com/argoproj/argo-cd/blob/master/resource_customizations/numaflow.numaproj.io/MonoVertex/actions/force-promote/action.lua)
- [numaflow.numaproj.io/MonoVertex/pause](https://github.com/argoproj/argo-cd/blob/master/resource_customizations/numaflow.numaproj.io/MonoVertex/actions/pause/action.lua)
- [numaflow.numaproj.io/MonoVertex/unpause-fast](https://github.com/argoproj/argo-cd/blob/master/resource_customizations/numaflow.numaproj.io/MonoVertex/actions/unpause-fast/action.lua)
- [numaflow.numaproj.io/MonoVertex/unpause-gradual](https://github.com/argoproj/argo-cd/blob/master/resource_customizations/numaflow.numaproj.io/MonoVertex/actions/unpause-gradual/action.lua)
- [numaflow.numaproj.io/Pipeline/delete](https://github.com/argoproj/argo-cd/blob/master/resource_customizations/numaflow.numaproj.io/Pipeline/actions/delete/action.lua)
- [numaflow.numaproj.io/Pipeline/force-promote](https://github.com/argoproj/argo-cd/blob/master/resource_customizations/numaflow.numaproj.io/Pipeline/actions/force-promote/action.lua)
- [numaflow.numaproj.io/Pipeline/pause](https://github.com/argoproj/argo-cd/blob/master/resource_customizations/numaflow.numaproj.io/Pipeline/actions/pause/action.lua)
- [numaflow.numaproj.io/Pipeline/unpause-fast](https://github.com/argoproj/argo-cd/blob/master/resource_customizations/numaflow.numaproj.io/Pipeline/actions/unpause-fast/action.lua)
- [numaflow.numaproj.io/Pipeline/unpause-gradual](https://github.com/argoproj/argo-cd/blob/master/resource_customizations/numaflow.numaproj.io/Pipeline/actions/unpause-gradual/action.lua)
- [numaplane.numaproj.io/MonoVertexRollout/pause](https://github.com/argoproj/argo-cd/blob/master/resource_customizations/numaplane.numaproj.io/MonoVertexRollout/actions/pause/action.lua)
- [numaplane.numaproj.io/MonoVertexRollout/unpause-fast](https://github.com/argoproj/argo-cd/blob/master/resource_customizations/numaplane.numaproj.io/MonoVertexRollout/actions/unpause-fast/action.lua)
- [numaplane.numaproj.io/MonoVertexRollout/unpause-gradual](https://github.com/argoproj/argo-cd/blob/master/resource_customizations/numaplane.numaproj.io/MonoVertexRollout/actions/unpause-gradual/action.lua)
- [numaplane.numaproj.io/PipelineRollout/allow-data-loss](https://github.com/argoproj/argo-cd/blob/master/resource_customizations/numaplane.numaproj.io/PipelineRollout/actions/allow-data-loss/action.lua)
- [numaplane.numaproj.io/PipelineRollout/disallow-data-loss](https://github.com/argoproj/argo-cd/blob/master/resource_customizations/numaplane.numaproj.io/PipelineRollout/actions/disallow-data-loss/action.lua)
- [numaplane.numaproj.io/PipelineRollout/pause](https://github.com/argoproj/argo-cd/blob/master/resource_customizations/numaplane.numaproj.io/PipelineRollout/actions/pause/action.lua)
- [numaplane.numaproj.io/PipelineRollout/unpause-fast](https://github.com/argoproj/argo-cd/blob/master/resource_customizations/numaplane.numaproj.io/PipelineRollout/actions/unpause-fast/action.lua)
- [numaplane.numaproj.io/PipelineRollout/unpause-gradual](https://github.com/argoproj/argo-cd/blob/master/resource_customizations/numaplane.numaproj.io/PipelineRollout/actions/unpause-gradual/action.lua)
- [postgresql.cnpg.io/Cluster/hibernate](https://github.com/argoproj/argo-cd/blob/master/resource_customizations/postgresql.cnpg.io/Cluster/actions/hibernate/action.lua)
- [postgresql.cnpg.io/Cluster/promote](https://github.com/argoproj/argo-cd/blob/master/resource_customizations/postgresql.cnpg.io/Cluster/actions/promote/action.lua)
- [postgresql.cnpg.io/Cluster/rehydrate](https://github.com/argoproj/argo-cd/blob/master/resource_customizations/postgresql.cnpg.io/Cluster/actions/rehydrate/action.lua)
- [postgresql.cnpg.io/Cluster/reload](https://github.com/argoproj/argo-cd/blob/master/resource_customizations/postgresql.cnpg.io/Cluster/actions/reload/action.lua)
- [postgresql.cnpg.io/Cluster/restart](https://github.com/argoproj/argo-cd/blob/master/resource_customizations/postgresql.cnpg.io/Cluster/actions/restart/action.lua)
- [postgresql.cnpg.io/Cluster/resume](https://github.com/argoproj/argo-cd/blob/master/resource_customizations/postgresql.cnpg.io/Cluster/actions/resume/action.lua)
- [postgresql.cnpg.io/Cluster/suspend](https://github.com/argoproj/argo-cd/blob/master/resource_customizations/postgresql.cnpg.io/Cluster/actions/suspend/action.lua)
- [promoter.argoproj.io/PullRequest/merge](https://github.com/argoproj/argo-cd/blob/master/resource_customizations/promoter.argoproj.io/PullRequest/actions/merge/action.lua)
- [psmdb.percona.com/PerconaServerMongoDB/unpause](https://github.com/argoproj/argo-cd/blob/master/resource_customizations/psmdb.percona.com/PerconaServerMongoDB/actions/unpause/action.lua)
- [source.toolkit.fluxcd.io/Bucket/reconcile](https://github.com/argoproj/argo-cd/blob/master/resource_customizations/source.toolkit.fluxcd.io/Bucket/actions/reconcile/action.lua)
- [source.toolkit.fluxcd.io/Bucket/resume](https://github.com/argoproj/argo-cd/blob/master/resource_customizations/source.toolkit.fluxcd.io/Bucket/actions/resume/action.lua)
- [source.toolkit.fluxcd.io/Bucket/suspend](https://github.com/argoproj/argo-cd/blob/master/resource_customizations/source.toolkit.fluxcd.io/Bucket/actions/suspend/action.lua)
- [source.toolkit.fluxcd.io/GitRepository/reconcile](https://github.com/argoproj/argo-cd/blob/master/resource_customizations/source.toolkit.fluxcd.io/GitRepository/actions/reconcile/action.lua)
- [source.toolkit.fluxcd.io/GitRepository/resume](https://github.com/argoproj/argo-cd/blob/master/resource_customizations/source.toolkit.fluxcd.io/GitRepository/actions/resume/action.lua)
- [source.toolkit.fluxcd.io/GitRepository/suspend](https://github.com/argoproj/argo-cd/blob/master/resource_customizations/source.toolkit.fluxcd.io/GitRepository/actions/suspend/action.lua)
- [source.toolkit.fluxcd.io/HelmChart/reconcile](https://github.com/argoproj/argo-cd/blob/master/resource_customizations/source.toolkit.fluxcd.io/HelmChart/actions/reconcile/action.lua)
- [source.toolkit.fluxcd.io/HelmChart/resume](https://github.com/argoproj/argo-cd/blob/master/resource_customizations/source.toolkit.fluxcd.io/HelmChart/actions/resume/action.lua)
- [source.toolkit.fluxcd.io/HelmChart/suspend](https://github.com/argoproj/argo-cd/blob/master/resource_customizations/source.toolkit.fluxcd.io/HelmChart/actions/suspend/action.lua)
- [source.toolkit.fluxcd.io/HelmRepository/reconcile](https://github.com/argoproj/argo-cd/blob/master/resource_customizations/source.toolkit.fluxcd.io/HelmRepository/actions/reconcile/action.lua)
- [source.toolkit.fluxcd.io/HelmRepository/resume](https://github.com/argoproj/argo-cd/blob/master/resource_customizations/source.toolkit.fluxcd.io/HelmRepository/actions/resume/action.lua)
- [source.toolkit.fluxcd.io/HelmRepository/suspend](https://github.com/argoproj/argo-cd/blob/master/resource_customizations/source.toolkit.fluxcd.io/HelmRepository/actions/suspend/action.lua)
- [source.toolkit.fluxcd.io/OCIRepository/reconcile](https://github.com/argoproj/argo-cd/blob/master/resource_customizations/source.toolkit.fluxcd.io/OCIRepository/actions/reconcile/action.lua)
- [source.toolkit.fluxcd.io/OCIRepository/resume](https://github.com/argoproj/argo-cd/blob/master/resource_customizations/source.toolkit.fluxcd.io/OCIRepository/actions/resume/action.lua)
- [source.toolkit.fluxcd.io/OCIRepository/suspend](https://github.com/argoproj/argo-cd/blob/master/resource_customizations/source.toolkit.fluxcd.io/OCIRepository/actions/suspend/action.lua)

See the [RBAC documentation](rbac.md#the-action-action) for information on how to control access to these actions.

## Custom Resource Actions

Argo CD supports custom resource actions written in [Lua](https://www.lua.org/). This is useful if you:

* Have a custom resource for which Argo CD does not provide any built-in actions.
* Have a commonly performed manual task that might be error prone if executed by users via `kubectl`

The resource actions act on a single object.

You can define your own custom resource actions in the `argocd-cm` ConfigMap.

### Custom Resource Action Types

#### An action that modifies the source resource

This action modifies and returns the source resource.
This kind of action was the only one available till 2.8, and it is still supported.

#### An action that produces a list of new or modified resources

**An alpha feature, introduced in 2.8.**

This action returns a list of impacted resources, each impacted resource has a K8S resource and an operation to perform on.   
Currently supported operations are "create" and "patch", "patch" is only supported for the source resource.   
Creating new resources is possible, by specifying a "create" operation for each such resource in the returned list.  
One of the returned resources can be the modified source object, with a "patch" operation, if needed.   
See the definition examples below.

### Define a Custom Resource Action in `argocd-cm` ConfigMap

Custom resource actions can be defined in `resource.customizations.actions.<group_kind>` field of `argocd-cm`. Following example demonstrates a set of custom actions for `CronJob` resources, each such action returns the modified CronJob. 
The customizations key is in the format of `resource.customizations.actions.<apiGroup_Kind>`.

```yaml
resource.customizations.actions.batch_CronJob: |
  discovery.lua: |
    actions = {}
    actions["suspend"] = {["disabled"] = true}
    actions["resume"] = {["disabled"] = true}
  
    local suspend = false
    if obj.spec.suspend ~= nil then
        suspend = obj.spec.suspend
    end
    if suspend then
        actions["resume"]["disabled"] = false
    else
        actions["suspend"]["disabled"] = false
    end
    return actions
  definitions:
  - name: suspend
    action.lua: |
      obj.spec.suspend = true
      return obj
  - name: resume
    action.lua: |
      if obj.spec.suspend ~= nil and obj.spec.suspend then
          obj.spec.suspend = false
      end
      return obj
```

The `discovery.lua` script must return a table where the key name represents the action name. You can optionally include logic to enable or disable certain actions based on the current object state.

Each action name must be represented in the list of `definitions` with an accompanying `action.lua` script to control the resource modifications. The `obj` is a global variable which contains the resource. Each action script returns an optionally modified version of the resource. In this example, we are simply setting `.spec.suspend` to either `true` or `false`.

By default, defining a resource action customization will override any built-in action for this resource kind. As of Argo CD version 2.13.0, if you want to retain the built-in actions, you can set the `mergeBuiltinActions` key to `true`. Your custom actions will have precedence over the built-in actions.
```yaml        
resource.customizations.actions.argoproj.io_Rollout: |
  mergeBuiltinActions: true
  discovery.lua: |
    actions = {}
    actions["do-things"] = {}
    return actions
  definitions:
  - name: do-things
    action.lua: |
      return obj		
```

#### Creating new resources with a custom action

> [!IMPORTANT]
> Creating resources via the Argo CD UI is an intentional, strategic departure from GitOps principles. We recommend 
> that you use this feature sparingly and only for resources that are not part of the desired state of the 
> application.

The resource the action is invoked on would be referred to as the `source resource`.  
The new resource and all the resources implicitly created as a result, must be permitted on the AppProject level, otherwise the creation will fail.

##### Creating a source resource child resources with a custom action

If the new resource represents a k8s child of the source resource, the source resource ownerReference must be set on the new resource.  
Here is an example Lua snippet, that takes care of constructing a Job resource that is a child of a source CronJob resource - the `obj` is a global variable, which contains the source resource:

```lua
-- ...
ownerRef = {}
ownerRef.apiVersion = obj.apiVersion
ownerRef.kind = obj.kind
ownerRef.name = obj.metadata.name
ownerRef.uid = obj.metadata.uid
job = {}
job.metadata = {}
job.metadata.ownerReferences = {}
job.metadata.ownerReferences[1] = ownerRef
-- ...
```

##### Creating independent child resources with a custom action

If the new resource is independent of the source resource, the default behavior of such new resource is that it is not known by the App of the source resource (as it is not part of the desired state and does not have an `ownerReference`).  
To make the App aware of the new resource, the `app.kubernetes.io/instance` label (or other ArgoCD tracking label, if configured) must be set on the resource.   
It can be copied from the source resource, like this:

```lua
-- ...
newObj = {}
newObj.metadata = {}
newObj.metadata.labels = {}
newObj.metadata.labels["app.kubernetes.io/instance"] = obj.metadata.labels["app.kubernetes.io/instance"]
-- ...
```   

While the new resource will be part of the App with the tracking label in place, it will be immediately deleted if auto prune is set on the App.   
To keep the resource, set `Prune=false` annotation on the resource, with this Lua snippet:

```lua
-- ...
newObj.metadata.annotations = {}
newObj.metadata.annotations["argocd.argoproj.io/sync-options"] = "Prune=false"
-- ...
```

(If setting `Prune=false` behavior, the resource will not be deleted upon the deletion of the App, and will require a manual cleanup).

The resource and the App will now appear out of sync - which is the expected ArgoCD behavior upon creating a resource that is not part of the desired state.

If you wish to treat such an App as a synced one, add the following resource annotation in Lua code:

```lua
-- ...
newObj.metadata.annotations["argocd.argoproj.io/compare-options"] = "IgnoreExtraneous"
-- ...
```

#### An action that produces a list of resources - a complete example:

```yaml
resource.customizations.actions.ConfigMap: |
  discovery.lua: |
    actions = {}
    actions["do-things"] = {}
    return actions
  definitions:
  - name: do-things
    action.lua: |
      -- Create a new ConfigMap
      cm1 = {}
      cm1.apiVersion = "v1"
      cm1.kind = "ConfigMap"
      cm1.metadata = {}
      cm1.metadata.name = "cm1"
      cm1.metadata.namespace = obj.metadata.namespace
      cm1.metadata.labels = {}
      -- Copy ArgoCD tracking label so that the resource is recognized by the App
      cm1.metadata.labels["app.kubernetes.io/instance"] = obj.metadata.labels["app.kubernetes.io/instance"]
      cm1.metadata.annotations = {}
      -- For Apps with auto-prune, set the prune false on the resource, so it does not get deleted
      cm1.metadata.annotations["argocd.argoproj.io/sync-options"] = "Prune=false"	  
      -- Keep the App synced even though it has a resource that is not in Git
      cm1.metadata.annotations["argocd.argoproj.io/compare-options"] = "IgnoreExtraneous"		  
      cm1.data = {}
      cm1.data.myKey1 = "myValue1"
      impactedResource1 = {}
      impactedResource1.operation = "create"
      impactedResource1.resource = cm1

      -- Patch the original cm
      obj.metadata.labels["aKey"] = "aValue"
      impactedResource2 = {}
      impactedResource2.operation = "patch"
      impactedResource2.resource = obj

      result = {}
      result[1] = impactedResource1
      result[2] = impactedResource2
      return result		  
```

### Action Icons and Display Names

By default, an action will appear in the UI by the name specified in the `actions` key, and it will have no icon. You 
can customize the display name and icon of an action by adding the `iconClass` and `displayName` keys to the action 
definition.

The icon class name is the name of a FontAwesome icon from [the set of free icons](https://fontawesome.com/search?ic=free).
The `fa-fw` class ensures that the icon is displayed with a fixed width, to avoid alignment issues with other icons.

```lua
local actions = {}
actions["create-workflow"] = {
  ["iconClass"] = "fa fa-fw fa-plus",
  ["displayName"] = "Create Workflow"
}
return actions
```

### Action Parameters

You can define parameters for your custom actions. The parameters are defined in the `parameters` key of the action discovery definition.

See the [Deployment actions discovery script](https://github.com/argoproj/argo-cd/blob/master/resource_customizations/apps/Deployment/actions/discovery.lua):

```lua
local actions = {}
 
actions["restart"] = {
    ["iconClass"] = "fa fa-fw fa-redo"
}
 
local paused = false
if obj.spec.paused ~= nil then
    paused = obj.spec.paused
end

actions["pause"] = {
    ["disabled"] = paused,
    ["iconClass"] = "fa fa-fw fa-pause-circle"
}
 
actions["resume"] = {
    ["disabled"] = not(paused),
    ["iconClass"] = "fa fa-fw fa-play-circle"
}
 
actions["scale"] = {
    ["iconClass"] = "fa fa-fw fa-plus-circle",
    ["params"] = {
        {
            ["name"] = "replicas"
        }
    },
}
 
return actions
```

The [resource scale actions](../user-guide/scale_application_resources.md) documentation shows how this function behaves in the UI.

## Contributing a Custom Resource Action

A resource action can be bundled into Argo CD. Custom resource action scripts are located in the `resource_customizations` directory of [https://github.com/argoproj/argo-cd](https://github.com/argoproj/argo-cd). Each contributed custom action needs to have a Lua script for discovery and a Lua script for the actual action logic. It also needs to have testdata and expected K8s resource manifests, which represent the outcome of performing the action.

The following directory structure must be respected:

```
argo-cd
|-- resource_customizations
|    |-- your.crd.group.io                         # CRD group
|    |    |-- MyKind                               # Resource kind
|    |    |    |-- actions                         # Actions folder
|    |    |    |    |-- action_test.yaml           # Test inputs and expected results
|    |    |    |    |-- testdata                   # Folder with sample K8s manifest yaml files, for testing the outcome of performing the custom actions 
|    |    |    |    |-- discovery.lua              # Conditions upon which the custom action would be visible in the UI
|    |    |    |    |-- <action_name>              # Folder for each custom action, named as the custom action
|    |    |    |    |    |-- action.lua            # Custom action logic Lua script 
```
It is required to provide both discovery tests and action tests for your custom action.

Example of a [complete custom action](https://github.com/argoproj/argo-cd/tree/master/resource_customizations/argoproj.io/AnalysisRun/actions) called `terminate` for AnalysisRun.

Example of `action_test.yaml` file content with `discoveryTests` and `actionTests`:
``` yaml
discoveryTests:
- inputPath: testdata/runningAnalysisRun.yaml
  result:
  - name: terminate
    disabled: false
- inputPath: testdata/failedAnalysisRun.yaml
  result:
  - name: terminate
    disabled: true
actionTests:
- action: terminate
  inputPath: testdata/runningAnalysisRun.yaml
  expectedOutputPath: testdata/runningAnalysisRun_terminated.yaml
```