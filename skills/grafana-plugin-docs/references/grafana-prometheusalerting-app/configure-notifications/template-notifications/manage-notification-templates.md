---
title: "Manage notification templates | Grafana Plugins documentation"
description: "Create, edit, and delete Alertmanager notification templates in the Prometheus Alerting plugin, and reference the names you define in them from a receiver's integration fields."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Manage notification templates

Templates are stored in the Alertmanager configuration and referenced by name from a receiver’s integration fields.

## Create a template

1. Click **Templates**.
2. Click **Create template**.
3. Enter a **Name**, conventionally ending in `.tmpl`, for example `slack-notification.tmpl`. Names have to be unique.
4. Enter the **Content**. Wrap each definition in `{{ define "name" }} ... {{ end }}`.
5. Click **Create template**.

The name of the file and the names you `define` inside it are different things. Receivers reference the *defined* name, not the filename, so one file can hold several definitions used by different receivers.

## Use a template in a receiver

Defining a template changes nothing on its own. To apply it, reference the defined name from the relevant field on a receiver’s integration, such as a Slack integration’s title and text fields.

Refer to [Create a receiver](/docs/plugins/grafana-prometheusalerting-app/latest/configure-notifications/create-receiver/).

## Edit a template

1. Click **Templates**.
2. Select the template.
3. Click **Edit**.
4. Change the content and click **Update template**.

The list shows a preview of each template’s content, which is usually enough to find the one you want without opening each.

## Delete a template

1. Select the template.
2. Click **Delete** and confirm.

Deleting can’t be undone. Check that no receiver references any of the names defined in it. A receiver pointing at a definition that no longer exists falls back to the default formatting, quietly.

## Editing safely

Templates are only exercised when a notification is sent, so a mistake surfaces during an incident rather than at save time. Two habits help:

- Change one thing at a time, and confirm a real notification still looks right before moving on.
- Keep a working copy of a template’s content before a substantial edit, so you can put it back quickly.

The editor is a plain text field, so it won’t catch a syntax error for you. Refer to [Template language](/docs/plugins/grafana-prometheusalerting-app/latest/configure-notifications/template-notifications/language/).
