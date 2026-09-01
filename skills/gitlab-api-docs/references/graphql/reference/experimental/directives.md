# GraphQL API Directives

Schema and query modifiers that change how fields are executed or validated.

A directive provides a way to describe alternate runtime execution and type validation behavior
in a GraphQL document. For more information, see the
[GraphQL directive documentation](https://graphql.org/learn/queries/#directives).

WARNING:
Deprecated items are marked with .
They will be removed in a future release according to the GitLab [deprecation process](../../_index.md#deprecation-and-removal-process).
Items that are [experiments](../../../../policy/development_stages_support.md#experiment) are marked with .
Experimental items can change at any time and are not recommended for use in production.

## `deprecated`

Marks an element of a GraphQL schema as no longer supported.

### Locations {.no_toc}

- `ARGUMENT_DEFINITION`
- `ENUM_VALUE`
- `FIELD_DEFINITION`
- `INPUT_FIELD_DEFINITION`

### Arguments {.no_toc}

| Name | Type | Description | Default |
| ---- | ---- | ----------- | ------- |
| `reason` | [`String`](scalars.md#string) | Explains why this element was deprecated, usually also including a suggestion for how to access supported similar data. Formatted in [Markdown](https://daringfireball.net/projects/markdown/). | `"No longer supported"` |

## `gl_introduced`

Marks a field as introduced in a specific version. Fields with a version higher than the current one will return null.

### Locations {.no_toc}

- `FIELD`
- `INLINE_FRAGMENT`

### Arguments {.no_toc}

| Name | Type | Description |
| ---- | ---- | ----------- |
| `version` | [`String!`](scalars.md#string) | The version when this field was introduced (e.g. '18.1.0'). |

## `granularScope`

### Locations {.no_toc}

- `FIELD_DEFINITION`
- `OBJECT`

This is a repeatable directive and can be used with different arguments at the same location.

### Arguments {.no_toc}

| Name | Type | Description |
| ---- | ---- | ----------- |
| `boundary` | [`String`](scalars.md#string) | Method name to call on the resolved object to extract the authorization boundary (Project/Group). Use when the object is already resolved (fields on types, nested fields). |
| `boundaryArgument` | [`String`](scalars.md#string) | Argument name containing the authorization boundary (path or GlobalID). Use for mutations and query fields where the boundary is passed as an argument. |
| `boundaryType` | [`PermissionBoundary`](enums.md#permissionboundary) | The type of authorization boundary (project, group, user, instance). Used for validation and documentation of the permission boundary. |
| `permissions` | [`[String!]`](scalars.md#string) | Granular scope permissions required to access the field or type. |
| `requirementGroup` | [`String`](scalars.md#string) | Label grouping directives that are alternative boundaries for the same requirement. The token must be authorized on any one boundary in a group, and on every group. Absent means the primary group. Set for a second container, such as a move target. |
| `skipReason` | [`String`](scalars.md#string) | Reason the field or type intentionally opts out of granular token authorization. |

## `include`

Directs the executor to include this field or fragment only when the `if` argument is true.

### Locations {.no_toc}

- `FIELD`
- `FRAGMENT_SPREAD`
- `INLINE_FRAGMENT`

### Arguments {.no_toc}

| Name | Type | Description |
| ---- | ---- | ----------- |
| `if` | [`Boolean!`](scalars.md#boolean) | Included when true. |

## `oneOf`

Requires that exactly one field must be supplied and that field must not be `null`.

### Locations {.no_toc}

- `INPUT_OBJECT`

## `skip`

Directs the executor to skip this field or fragment when the `if` argument is true.

### Locations {.no_toc}

- `FIELD`
- `FRAGMENT_SPREAD`
- `INLINE_FRAGMENT`

### Arguments {.no_toc}

| Name | Type | Description |
| ---- | ---- | ----------- |
| `if` | [`Boolean!`](scalars.md#boolean) | Skipped when true. |

## `specifiedBy`

Exposes a URL that specifies the behavior of this scalar.

### Locations {.no_toc}

- `SCALAR`

### Arguments {.no_toc}

| Name | Type | Description |
| ---- | ---- | ----------- |
| `url` | [`String!`](scalars.md#string) | The URL that specifies the behavior of this scalar. |
