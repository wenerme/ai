## List

**get** `/organization/groups`

Lists all groups in the organization.

### Query Parameters

- `after: optional string`

  A cursor for use in pagination. `after` is a group ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with group_abc, your subsequent call can include `after=group_abc` in order to fetch the next page of the list.

- `limit: optional number`

  A limit on the number of groups to be returned. Limit can range between 0 and 1000, and the default is 100.

- `order: optional "asc" or "desc"`

  Specifies the sort order of the returned groups.

  - `"asc"`

  - `"desc"`

### Returns

- `data: array of object { id, created_at, is_scim_managed, name }`

  Groups returned in the current page.

  - `id: string`

    Identifier for the group.

  - `created_at: number`

    Unix timestamp (in seconds) when the group was created.

  - `is_scim_managed: boolean`

    Whether the group is managed through SCIM and controlled by your identity provider.

  - `name: string`

    Display name of the group.

- `has_more: boolean`

  Whether additional groups are available when paginating.

- `next: string`

  Cursor to fetch the next page of results, or `null` if there are no more results.

- `object: "list"`

  Always `list`.

  - `"list"`

### Example

```http
curl https://api.openai.com/v1/organization/groups \
    -H "Authorization: Bearer $OPENAI_API_KEY"
```
