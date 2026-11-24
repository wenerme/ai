# Cluster discovery API (certificate-based) (deprecated)

- Tier: Free, Premium, Ultimate
- Offering: GitLab.com, GitLab Self-Managed, GitLab Dedicated

> [!warning]
> This feature was [deprecated](https://gitlab.com/groups/gitlab-org/configure/-/work_items/8) in GitLab 14.5.

## Retrieve certificate-based clusters

Retrieve certificate-based clusters that are registered to a group, subgroup, or project. Disabled and enabled clusters are also returned.

```plaintext
GET /discover-cert-based-clusters
```

Parameters:

| Attribute | Type           | Required | Description                                                                   |
| --------- | -------------- | -------- | ----------------------------------------------------------------------------- |
| `group_id`      | integer or string | yes      | The ID of the group |

Example request:

```shell
curl --request GET \
  --header "PRIVATE-TOKEN: <your_access_token>" \
  --url "https://gitlab.example.com/api/v4/discover-cert-based-clusters?group_id=1"
```

Example response:

```json
{
  "groups": {
    "my-clusters-group": [
      {
        "id": 2,
        "name": "group-cluster-1"
      }
    ],
    "my-clusters-group/subgroup1/subsubgroup1": [
      {
        "id": 4,
        "name": "subsubgroup-cluster"
      }
    ]
  },
  "projects": {
    "my-clusters-group/subgroup1/subsubgroup1/subsubgroup-project-with-cluster": [
      {
        "id": 3,
        "name": "subsubgroup-project-cluster"
      }
    ],
    "my-clusters-group/project1-with-cluster": [
      {
        "id": 1,
        "name": "test"
      }
    ]
  }
}
```

## Delete certificate-based clusters

You can delete a certificate-based cluster you found with the discovery API by
using the group or project clusters API.

Prerequisites:

- Maintainer or Owner role for the group or project.

To delete a cluster:

1. From the discovery API response, get the cluster `id` and the group or project
   path. The path is the key the cluster is listed under, for example,
   `my-clusters-group/project1-with-cluster`.
1. Call the API for your cluster type, using the cluster `id` as the `cluster_id`
   attribute and the [URL-encoded path](rest/_index.md#namespaced-paths) as the
   `id` attribute:
   - For clusters in groups, use the
     [group clusters API](group_clusters.md#delete-a-group-cluster).
   - For clusters in projects, use the
     [project clusters API](project_clusters.md#delete-cluster-from-a-project).

To remove a cluster in the UI, or to remove an instance cluster, see
[remove a cluster](../user/project/clusters/add_remove_clusters.md#remove-a-cluster).
