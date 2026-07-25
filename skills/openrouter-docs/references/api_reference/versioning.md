> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# API Versioning

> How the OpenRouter API is versioned, what we consider a breaking change, and how deprecations are communicated.

## Current version

The OpenRouter API has a single stable version, `v1`, selected by the URL path:

```
https://openrouter.ai/api/v1
```

There are no version headers and no date-based version pinning. All endpoints documented in the [API Reference](/docs/api_reference/overview) are part of `v1`.

## How the API evolves

The API changes continuously rather than in numbered releases. Every change is reflected in the [OpenAPI specification](/docs/api_reference/overview), and every release that changes the specification produces an entry in the [API Changelog](/docs/changelog).

**Non-breaking changes ship without prior notice.** These include:

* New endpoints
* New optional request parameters
* New fields in responses
* New response status codes
* New schemas, and new optional properties or union variants on existing schemas

Write clients defensively: ignore response fields you don't recognize, and don't fail on unknown enum values.

**Breaking changes are reviewed by a human before publication** and appear in the changelog under the **Breaking** tag with migration notes. These include:

* Removing or renaming an endpoint, parameter, or response field
* Changing a field's type
* Making an optional parameter required

## Deprecations

When part of the API is deprecated, the deprecation is announced in the [API Changelog](/docs/changelog) and the affected endpoint or field is marked as deprecated in the API Reference. Removal of a deprecated feature is a breaking change and follows the breaking-change process above.

Model availability is separate from API versioning: models are added and removed by providers independently. See [Models](/docs/guides/overview/models) for how to list currently available models.

## Staying up to date

* Watch the [API Changelog](/docs/changelog), which is generated automatically from OpenAPI specification diffs on every release
* Subscribe to the [RSS feed](https://openrouter.ai/docs/changelog/rss.xml) for changelog entries
* Filter changelog entries by the **Breaking** tag to review only compatibility-affecting changes
