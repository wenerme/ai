---
description: Control consent programmatically with the Zaraz Consent API.
title: Consent API
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/zaraz/llms.txt
> Use this file to discover all available pages before exploring further.

# Consent API

Last updated Apr 16, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/zaraz/consent-management/api/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

## Background

The Consent API allows you to programmatically control all aspects of the Consent Management program. This includes managing the modal, the consent status, and obtaining information about your configured purposes.

Using the Consent API, you can integrate Zaraz Consent preferences with an external Consent Management Platform, customize your consent modal, or restrict consent management to users in specific regions.

---

## Events

### `Consent API Ready`

It can be useful to know when the Consent API is fully loaded on the page so that code interacting with its methods and properties is not called prematurely.

```js
document.addEventListener("zarazConsentAPIReady", () => {
  // do things with the Consent API
});
```

### `Consent Choices Updated`

This event is fired every time the user makes changes to their consent preferences. It can be used to act on changes to the consent, for example when updating a tool with the new consent preferences.

```js
document.addEventListener("zarazConsentChoicesUpdated", () => {
  // read the new consent preferences using `zaraz.consent.getAll();` and do things with it
});
```

---

## Properties

The following are properties of the `zaraz.consent` object.

* `modal` boolean

  * Get or set the current visibility status of the consent modal dialog.
* `purposes` object read-only

  * An object containing all configured purposes, with their ID, name, description, and order.
* `APIReady` boolean read-only

  * Indicates whether the Consent API is currently available on the page.

---

## Methods

### `Get`

```js
zaraz.consent.get(purposeId);
```

* `get(purposeId)` : `boolean | undefined`

Get the current consent status for a purpose using the purpose ID.

* `true`: The consent was granted.
* `false`: The consent was not granted.
* `undefined`: The purpose does not exist.

#### Parameters

* `purposeId` string

  * The ID representing the Purpose.

### `Set`

```js
zaraz.consent.set(consentPreferences);
```

* `set(consentPreferences)` : `undefined`

Set the consent status for some purposes using the purpose ID.

#### Parameters

* `consentPreferences` object

  * a `{ purposeId: boolean }` object describing the purposes you want to set and their respective consent status.

### `Get All`

```js
zaraz.consent.getAll();
```

* `getAll()` : `{ purposeId: boolean }`

Returns an object with the consent status of all purposes.

### `Set All`

```js
zaraz.consent.setAll(consentStatus);
```

* `setAll(consentStatus)` : `undefined`

Set the consent status for all purposes at once.

#### Parameters

* `consentStatus` boolean

  * Indicates whether the consent was granted or not.

### `Get All Checkboxes`

```js
zaraz.consent.getAllCheckboxes();
```

* `getAllCheckboxes()` : `{ purposeId: boolean }`

Returns an object with the checkbox status of all purposes.

### `Set Checkboxes`

```js
zaraz.consent.setCheckboxes(checkboxesStatus);
```

* `setCheckboxes(checkboxesStatus)` : `undefined`

Set the consent status for some purposes using the purpose ID.

#### Parameters

* `checkboxesStatus` object

  * a `{ purposeId: boolean }` object describing the checkboxes you want to set and their respective checked status.

### `Set All Checkboxes`

```js
zaraz.consent.setAllCheckboxes(checkboxStatus);
```

* `setAllCheckboxes(checkboxStatus)` : `undefined`

Set the `checkboxStatus` status for all purposes in the consent modal at once.

#### Parameters

* `checkboxStatus` boolean

  * Indicates whether the purposes should be marked as checked or not.

### `Send queued events`

```js
zaraz.consent.sendQueuedEvents();
```

* `sendQueuedEvents()` : `undefined`

If some Pageview-based events were not sent due to a lack of consent, they can be sent using this method after consent was granted.

## Examples

### Restricting consent checks based on location

You can combine multiple features of Zaraz to effectively disable Consent Management for some visitors. For example, if you would like to use it only for visitors from the EU, you can disable the automatic showing of the consent modal and add a Custom HTML tool with the following script:

```html
<script>
function getCookie(name) {
  const value = `; ${document.cookie}`
  return value?.split(`; ${name}=`)[1]?.split(";")[0]
}

function handleZarazConsentAPIReady() {
  const consent_cookie = getCookie("cf_consent")
  const isEUCountry = "{{system.device.location.isEUCountry}}" === "1"
  if (!consent_cookie) {
    if (isEUCountry) {
      zaraz.consent.modal = true
    } else {
      zaraz.consent.setAll(true)
      zaraz.consent.sendQueuedEvents()
    }
  }
}

if (zaraz.consent?.APIReady) {
  handleZarazConsentAPIReady()
} else {
  document.addEventListener("zarazConsentAPIReady", handleZarazConsentAPIReady)
}
</script>
```

Note: If you've customized the cookie name for the Consent Manager, use that customized name instead of "cf\_consent" in the snippet above.

By letting this Custom HTML tool to run without consent requirements, the modal will appear to all EU visitors, while for other visitors consent will be automatically granted. The `{{ system.device.location.isEUCountry }}` property will be `1` if the visitor is from an EU country and `0` otherwise. You can use any other property or variable to customize the Consent Management behavior in a similar manner, such as `{{ system.device.location.country }}` to restrict consent checks based on country code.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/zaraz/consent-management/api/#page","headline":"Consent API · Cloudflare Zaraz docs","description":"Control consent programmatically with the Zaraz Consent API.","url":"https://developers.cloudflare.com/zaraz/consent-management/api/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
