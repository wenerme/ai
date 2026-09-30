---
title: "Provision services using Terraform | Grafana Plugins documentation"
description: "Use the Grafana Terraform provider to create and manage Service Center services as code, including ownership, dependencies, and links."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Provision services using Terraform

Use the [Grafana Terraform provider](https://registry.terraform.io/providers/grafana/grafana/latest/docs) to create and manage your services as code. Managing services in Terraform lets you version service definitions, review changes before they apply, and keep services alongside the teams, SLOs, and alert rules they relate to.

This page describes how to provision services with the `grafana_apps_servicemodel_component_v1alpha1` resource. For the complete list of attributes, refer to the [resource reference](https://registry.terraform.io/providers/grafana/grafana/latest/docs/resources/apps_servicemodel_component_v1alpha1).

## Before you begin

Before you provision services with Terraform, make sure you have:

- A Grafana Cloud stack.
- [Terraform](https://developer.hashicorp.com/terraform/downloads) installed on your local machine.
- Version 4.44.0 or later of the Grafana Terraform provider.

## Configure the Terraform provider

Create a [service account token](/docs/grafana-cloud/account-management/authentication-and-permissions/service-accounts/) to authenticate Terraform with Grafana:

1. Create a new service account.
2. Assign a role with permissions to manage services, such as **Admin**.
3. Create a new service account token.
4. Name and save the token for use in Terraform.

In the working directory for your Terraform configuration, create a file named `main.tf`:

terraform [Copy code to clipboard] Copy

```terraform
terraform {
  required_providers {
    grafana = {
      source  = "grafana/grafana"
      version = ">= 4.44.0"
    }
  }
}

provider "grafana" {
  url  = "<grafana-url>"
  auth = "<auth-token>"
}
```

Replace the following placeholders:

- `<grafana-url>` with the URL of your Grafana instance.
- `<auth-token>` with the service account token you created.

For other authentication options, refer to the [provider authentication documentation](https://registry.terraform.io/providers/grafana/grafana/latest/docs#authentication).

## Create a service

A minimal service needs a `metadata.uid` and a `spec.title`:

terraform [Copy code to clipboard] Copy

```terraform
resource "grafana_apps_servicemodel_component_v1alpha1" "payments" {
  metadata {
    uid = "payments-api"
  }

  spec {
    title = "Payments API"
  }
}
```

### Apply the configuration

To create the service, complete the following steps.

1. Initialize the working directory containing the Terraform configuration files.

   shell [Copy code to clipboard] Copy

   ```shell
   terraform init
   ```

   This command installs the Grafana Terraform provider configured in the `main.tf` file.
2. Apply the Terraform configuration files to provision the service.

   shell [Copy code to clipboard] Copy

   ```shell
   terraform apply
   ```

   Before applying any changes to Grafana, Terraform displays the execution plan and requests your approval.

The service then appears in **Alerts &amp; IRM** &gt; **Service Center**, and Service Center begins correlating resources to it.

### Name the service

The `metadata.uid` is the unique name of the service and its [service identifier](/docs/grafana-cloud/alerting-and-irm/service-center/create-a-service/#configure-service-content). Service Center matches dashboards, alerts, SLOs, incidents, and synthetic checks to the service when they carry a `service_name` label or tag equal to it.

The `uid` can only contain lowercase letters, numbers, and dashes, must start and end with a letter or number, and must be 2 to 63 characters long.

> Note
>
> Changing `metadata.uid` replaces the service. Terraform destroys the existing service and creates a new one, which means the original service and its correlations are removed.

## Configure ownership, dependencies, and links

The following example defines a service with an owning team, an additional identifier, a dependency, and a link:

terraform [Copy code to clipboard] Copy

```terraform
resource "grafana_team" "checkout" {
  name = "Checkout Team"
}

resource "grafana_apps_servicemodel_component_v1alpha1" "checkout" {
  metadata {
    uid = "checkout-service"
  }

  spec {
    title       = "Checkout Service"
    description = "Handles checkout and payment orchestration."

    identifiers {
      key   = "namespace"
      value = "checkout-prod"
    }

    owner_ref {
      name = grafana_team.checkout.team_uid
    }

    depends_on_refs {
      name = grafana_apps_servicemodel_component_v1alpha1.payments.metadata.uid
    }

    links {
      url   = "https://github.com/example/checkout"
      title = "Source code"
      type  = "repository"
    }
  }
}
```

### Assign an owning team

Set `owner_ref.name` to a Grafana team UID to assign ownership. Referencing a `grafana_team` resource lets Terraform create the team and the service together.

Assigning a team enables [on-call information and issue response from Service Center](/docs/grafana-cloud/alerting-and-irm/service-center/escalate-to-irm/).

### Add identifiers

Use `identifiers` blocks to define additional label key-value pairs, so that Service Center also matches Grafana Cloud resources that use another label convention. A Grafana Cloud resource matches when it carries a label or tag with the same key and value.

For example, the following identifier matches alerts, SLOs, and dashboards labeled or tagged `namespace=checkout-prod`:

terraform [Copy code to clipboard] Copy

```terraform
identifiers {
  key   = "namespace"
  value = "checkout-prod"
}
```

You can define a maximum of five identifiers per service.

### Define dependencies

Use `depends_on_refs` blocks to model relationships between services. Dependencies help assess potential upstream or downstream impact during incidents.

Reference the `metadata.uid` of another service’s resource block, rather than hard-coding the name. This lets Terraform determine the correct order to create the services in.

### Add links

Use `links` blocks to attach documentation, repositories, and other references to the service. Service Center uses the link types `documentation`, `repository`, `backlog`, and `custom`.

## Import an existing service

To manage a service that already exists, import it using its `uid`:

shell [Copy code to clipboard] Copy

```shell
terraform import grafana_apps_servicemodel_component_v1alpha1.checkout checkout-service
```

Write a matching configuration before you import, then run `terraform plan` to confirm no changes are pending.

## Manage each service in one system

Each time you apply a configuration, Terraform writes the full service definition and replaces values set elsewhere. Manage each service in one system only:

- Manage the services you provision with Terraform in Terraform. Changes made in the Service Center UI are overwritten the next time you apply the configuration.
- Services [imported from Backstage](/docs/grafana-cloud/alerting-and-irm/service-center/create-a-service/#import-services-from-backstage) should be managed in Backstage. Managing them in Terraform as well causes the two systems to repeatedly overwrite each other.

## More examples

For more examples on the concepts in this guide:

- Review all the available attributes and examples for the service resource in the [Grafana Terraform provider documentation](https://registry.terraform.io/providers/grafana/grafana/latest/docs/resources/apps_servicemodel_component_v1alpha1).
- Review the [tutorial to manage a Grafana Cloud stack using Terraform](/docs/grafana-cloud/developer-resources/infrastructure-as-code/terraform/terraform-cloud-stack/).
