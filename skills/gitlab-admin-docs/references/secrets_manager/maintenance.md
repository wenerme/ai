# Maintain OpenBao

- Tier: Premium, Ultimate
- Offering: GitLab Self-Managed

For Geo failover, see
[Geo disaster recovery](../geo/disaster_recovery/_index.md#step-4-optional-promote-the-openbao-ha-cluster).

## Back up and restore OpenBao

OpenBao stores data in a separate logical database on PostgreSQL. Back up this database alongside your
regular GitLab backup so you can restore secrets after a failure.

For detailed backup and restore procedures specific to OpenBao, see the
[OpenBao backup documentation](https://docs.gitlab.com/charts/charts/openbao/#back-up-openbao).

## Recovery key management

For information about managing the OpenBao recovery key, including storing, viewing, and using it to
generate a root token, see [recovery key management](recovery_key.md).

## Recover OpenBao authentication

GitLab authenticates to OpenBao with a JSON Web Token (JWT). OpenBao accepts the JWT only if its
`iss` (issuer) and `aud` (audience) claims match the values that OpenBao stored. OpenBao stores
these values when OpenBao is initialized, and when the GitLab Secrets Manager is provisioned for each project
and group. OpenBao does not update the stored values when you change your configuration later.

Authentication fails in these cases:

- JWT audience mismatch: GitLab sends a different audience than the one OpenBao stored, for example
  after the OpenBao URL changed. To fix the mismatch,
  [restore the JWT audience](#restore-the-jwt-audience).
- JWT issuer mismatch: the GitLab URL changed after OpenBao was initialized. To fix the mismatch,
  [restore the JWT issuer](#restore-the-jwt-issuer).

A root token cannot fix authentication, because
`gitlab:secrets_management:openbao:root_token:generate` authenticates to OpenBao with a GitLab JWT.

If you cannot restore the audience or the issuer, [reset OpenBao data](#reset-openbao-data). A reset
deletes all stored secrets.

### Find the stored JWT audience

The stored audience is the OpenBao URL from when OpenBao was first initialized.

To find the stored JWT audience:

1. Find the candidates. If you set `global.openbao.jwt_audience` in an earlier restore, that value is
   the stored audience. Check that value in the next step.

   Otherwise, list the candidates. Helm keeps the rendered configuration of recent chart revisions,
   so list the `bound_audiences` value of each revision:

   ```shell
   for revision in $(helm history gitlab -n gitlab | awk 'NR > 1 { print $1 }'); do
     echo "$revision: $(helm get manifest gitlab -n gitlab --revision "$revision" | grep -o '"bound_audiences": "[^"]*"')"
   done
   ```

   Each distinct value is a candidate. By default, Helm keeps the last 10 revisions. If OpenBao
   was first initialized in an older revision, the list might not include the stored audience.

1. Check each candidate. In the [Rails console](../operations/rails_console.md), replace
   `<candidate_audience>` with the candidate and run:

   ```ruby
   jwt = SecretsManagement::GlobalSecretsManagerJwt.new(aud: '<candidate_audience>').encoded
   SecretsManagement::SecretsManagerClient.new(jwt: jwt).generate_root_token_status
   ```

   If OpenBao stored this audience, the second command returns without an error. Otherwise,
   OpenBao rejects the JWT with `invalid audience (aud) claim`. If OpenBao rejects the JWT with
   `invalid issuer (iss) claim` instead, [restore the JWT issuer](#restore-the-jwt-issuer) first.

### Restore the JWT audience

Restore the JWT audience when GitLab sends a different audience than the one OpenBao stored.

Prerequisites:

- The audience that OpenBao stored. For more information, see
  [Find the stored JWT audience](#find-the-stored-jwt-audience).

To restore the JWT audience:

1. In your Helm values file, set `global.openbao.jwt_audience` to the stored audience. For example:

   ```yaml
   global:
     openbao:
       jwt_audience: https://openbao.example.com
   ```

1. Redeploy GitLab:

   ```shell
   helm upgrade --install --version <chart-version> gitlab gitlab/gitlab \
     -n gitlab -f gitlab.yaml
   ```

After the GitLab pods restart, GitLab authenticates to OpenBao again.

### Restore the JWT issuer

Restore the JWT issuer when the GitLab URL changed after OpenBao was initialized. OpenBao expects
the GitLab URL from that time as the issuer, so you must change the GitLab URL back.

To restore the JWT issuer:

1. In your Helm values file, set the GitLab host settings back to the values from when OpenBao was
   first initialized. For more information, see
   [configure host settings](https://docs.gitlab.com/charts/charts/globals/#configure-host-settings).

1. Redeploy GitLab:

   ```shell
   helm upgrade --install --version <chart-version> gitlab gitlab/gitlab \
     -n gitlab -f gitlab.yaml
   ```

After the GitLab pods restart, GitLab authenticates to OpenBao again.

## Reset OpenBao data

> [!warning]
> This procedure permanently deletes all secrets and secrets permissions stored in OpenBao, and
> turns off the secrets manager for every project and group.

Resetting OpenBao data wipes the OpenBao database so that OpenBao self-initializes with the
configuration in your Helm values.

Prerequisites:

- The correct OpenBao URL in your configuration. OpenBao derives `bound_audiences` from this URL
  during self-initialization.
- `global.openbao.jwt_audience` set to the same URL, or not set.

To reset OpenBao data:

1. Scale OpenBao to zero replicas:

   ```shell
   kubectl -n gitlab scale deployment gitlab-openbao --replicas=0
   kubectl -n gitlab wait --for=delete pod -l app.kubernetes.io/name=openbao --timeout=120s
   ```

1. Get the toolbox pod name:

   ```shell
   kubectl -n gitlab get pods -l app=toolbox -o jsonpath='{.items[0].metadata.name}'
   ```

1. Wipe the OpenBao storage tables. Replace the placeholders with your OpenBao database password and
   host:

   ```shell
   kubectl -n gitlab exec -ti <toolbox-pod-name> -- \
     env PGPASSWORD='<openbao_database_password>' \
     psql -h <postgres_host> -U openbao -d openbao \
     -c "TRUNCATE TABLE openbao_kv_store; TRUNCATE TABLE openbao_ha_locks;"
   ```

1. Delete the secrets manager records and the stored recovery key from the GitLab database. The old
   recovery key no longer works, and you cannot create a new key while the old one is stored.
   In the [Rails console](../operations/rails_console.md), run:

   ```ruby
   ApplicationRecord.connection.execute(<<~SQL)
     TRUNCATE TABLE project_secrets_managers, project_secrets_manager_maintenance_tasks,
       group_secrets_managers, group_secrets_manager_maintenance_tasks,
       secret_rotation_infos, group_secret_rotation_infos, namespace_secret_counts
   SQL
   SecretsManagement::RecoveryKey.active.destroy_all
   ```

   Use `TRUNCATE` instead of turning off each secrets manager. Turning off a secrets manager calls
   OpenBao to delete data that the previous step already deleted.

1. Redeploy OpenBao with autoscaling set for a single OpenBao replica. The `openbao.autoscaling`
   settings stop the Horizontal Pod Autoscaler from adding a second replica before initialization
   completes:

   ```shell
   helm upgrade --install --version <chart-version> gitlab gitlab/gitlab \
     -n gitlab -f gitlab.yaml \
     --set openbao.autoscaling.minReplicas=1 --set openbao.autoscaling.maxReplicas=1
   ```

1. Scale OpenBao up to one replica. A chart redeploy does not restore a deployment that you scaled
   down manually:

   ```shell
   kubectl -n gitlab scale deployment gitlab-openbao --replicas=1
   kubectl -n gitlab rollout status deployment gitlab-openbao --timeout=120s
   ```

1. Verify that OpenBao is initialized and unsealed. Replace `https://openbao.example.com` with your
   OpenBao URL:

   ```shell
   curl "https://openbao.example.com/v1/sys/health"
   ```

   The response includes `"initialized":true` and `"sealed":false`.

1. Redeploy without the single-replica settings, then scale OpenBao up to your usual number of
   replicas. Replace `<replica_count>` with the value of `openbao.autoscaling.minReplicas`, which is
   `2` by default:

   ```shell
   helm upgrade --install --version <chart-version> gitlab gitlab/gitlab \
     -n gitlab -f gitlab.yaml
   kubectl -n gitlab scale deployment gitlab-openbao --replicas=<replica_count>
   kubectl -n gitlab rollout status deployment gitlab-openbao --timeout=120s
   ```

1. Create a new [recovery key](recovery_key.md).

After the reset, the GitLab Secrets Manager is provisioned again for each project and group the next time someone
[creates a secret](../../ci/secrets/secrets_manager/_index.md#define-a-secret) in it.

## Enable secrets access from external requests

- Rake task [introduced](https://gitlab.com/gitlab-org/gitlab/-/issues/602549) in GitLab 19.3.

Secrets managers provisioned in GitLab 19.2 and later support
[secrets access from external services and tools](../../ci/secrets/secrets_manager/non_cicd_access.md).
If a secrets manager was provisioned for a project or group in GitLab 19.1 or earlier, this access
is not supported.

To enable this access for a secrets manager provisioned before GitLab 19.2,
an administrator must run the `backfill_api_auth` Rake task.
The secrets manager remains active while the Rake task runs, and existing secrets are preserved.

Prerequisites:

- Administrator access.

To backfill every group and project secrets manager on the instance:

```shell
# Linux package (Omnibus) and Helm chart (Kubernetes)
sudo gitlab-rake gitlab:secrets_management:backfill_api_auth

# Self-compiled (source)
bundle exec rake gitlab:secrets_management:backfill_api_auth RAILS_ENV=production
```

To scope the backfill to a single top-level group or user namespace instead, pass its ID:

```shell
sudo gitlab-rake "gitlab:secrets_management:backfill_api_auth[<root_namespace_id>]"
```

The task is idempotent and safe to run more than once. If it reports failures, fix the underlying
cause (for example, an unreachable OpenBao server) and run the task again.

## Update the OpenBao policy for GitLab

- Rake task [introduced](https://gitlab.com/gitlab-org/gitlab/-/merge_requests/262091) in GitLab 19.6.

To provision secrets managers, GitLab authenticates to OpenBao with the `app` role on the
`gitlab_rails_jwt` authentication mount.
The `secrets_manager` OpenBao policy controls what this role can do.
Earlier versions of the policy grant access to every OpenBao path.
GitLab 19.6 and later include a restricted policy that grants access only to the paths that GitLab
uses.

OpenBao creates the policy once, when OpenBao initializes for the first time.
Upgrading GitLab does not change the existing policy.
To update the policy on an existing installation, an administrator runs the
`gitlab:secrets_management:openbao:secrets_manager_policy:update` Rake task.
The task compares the policy in OpenBao with the policy that your GitLab version includes.
If the policies match, the task changes nothing.

Prerequisites:

- Administrator access.
- OpenBao 2.6.0 or later.
- A [recovery key](recovery_key.md#store-the-recovery-key).
- If OpenBao has the restricted policy, a
  [root token generated from the recovery key](recovery_key.md#generate-a-root-token-from-the-recovery-key).
  The restricted policy does not allow GitLab to change the policy.

To update the policy:

1. Run the Rake task. By default, the task does not change anything, but shows the existing policy
   and the policy that your GitLab version includes:

   ```shell
   # Linux package (Omnibus)
   sudo gitlab-rake "gitlab:secrets_management:openbao:secrets_manager_policy:update"

   # Helm chart (Kubernetes)
   kubectl exec -n gitlab -it -c toolbox <toolbox-pod-name> -- \
     gitlab-rake "gitlab:secrets_management:openbao:secrets_manager_policy:update"
   ```

   To find the toolbox pod name, run `kubectl get pods -n gitlab -lapp=toolbox`.

   If the output states that the `secrets_manager` policy is already up to date, you do not need to
   do anything else.
   If the output states that OpenBao has no recovery key, store the recovery key and run the task
   again.

1. Run the Rake task with `DRY_RUN=false` to update the policy:

   ```shell
   # Linux package (Omnibus)
   sudo gitlab-rake "gitlab:secrets_management:openbao:secrets_manager_policy:update" DRY_RUN=false

   # Helm chart (Kubernetes)
   kubectl exec -n gitlab -it -c toolbox <toolbox-pod-name> -- \
     gitlab-rake "gitlab:secrets_management:openbao:secrets_manager_policy:update" DRY_RUN=false
   ```

   If the GitLab database does not store the recovery key, the task asks whether you have the
   recovery key. To continue, enter `y`.

   If OpenBao denies the update, the task asks for a root token. Enter the root token. The task does
   not display the token as you enter it. Root tokens do not expire, so revoke the root token when
   you finish your maintenance.

1. If you entered a root token and do not need it for more maintenance, revoke the root token. The
   last step of the procedure you used to generate the root token shows how.
