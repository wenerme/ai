---
title: "Provision SLO resources using Terraform | Grafana Plugins documentation"
description: "This guide outlines the steps and references to provision Grafana SLO resources with Terraform."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Provision SLO resources using Terraform

Use [Grafana Terraform Provider](https://registry.terraform.io/providers/grafana/grafana/latest/docs) to manage your service level objective (SLO) resources and provision them into your Grafana system. Managing SLOs as code makes it easier to create, maintain, and version your configurations.

This guide outlines the steps and references to provision SLO resources with Terraform.

1. Create a service account token to configure the Terraform provider.
2. Define your SLO resources in Terraform using one of the following methods:

   1. Export existing SLOs in Terraform format.
   2. Use the SLO wizard to generate a Terraform configuration and skip the creation step.
   3. Write the SLO definition directly using the Terraform schema.
3. Run `terraform apply` to provision your SLO resources.

Before you begin, make sure you have a Grafana instance with the Grafana SLO app installed and Terraform installed on your local machine.

## Create a service account token and configure the Terraform provider

Create a [service account token](/docs/grafana-cloud/security-and-account-management/authentication-and-permissions/service-accounts/) to authenticate Terraform with Grafana. To generate a token for provisioning SLO resources, complete the following steps:

1. Create a new service account.
2. Assign a role with permissions to manage SLO resources.

   You can assign a basic role such as **Admin** or **Editor**, or use one of the SLO-specific roles such as **SLO Admin** or **SLO Editor**. For details, refer to [RBAC permissions for SLOs](/docs/grafana-cloud/alerting-and-irm/slo/set-up/rbac/).
3. Create a new service account token.
4. Name and save the token for use in Terraform.

You can now move to the working directory for your Terraform configurations, and create a file named `main.tf` like:

main.tf [Copy code to clipboard] Copy

```maintf
terraform {
    required_providers {
        grafana = {
            source = "grafana/grafana"
            version = ">= 3.5.0"
        }
    }
}

provider "grafana" {
    url = <grafana-url>
    auth = <auth-token>
}
```

Replace the following placeholders in the configuration:

- `<grafana-url>` with the URL of the Grafana instance.
- `<auth-token>` with the service account token previously created.

This Terraform configuration installs the **Grafana Terraform provider** and authenticates against your Grafana instance using the service account token. For other authentication options, refer to the [Authentication documentation](https://registry.terraform.io/providers/grafana/grafana/latest/docs#authentication).

## Define SLO resources

You can define an SLO in Terraform format or in JSON format for use with the **SLO API**.

When you create an SLO, Grafana automatically generates the associated recording rules, dashboards, and alerts:

- Recording rules query your SLI and record it as a new metric, so that it is faster to query later.
- Dashboards show the error budget, your alert status, and other metrics related to your SLO.
- Alerts indicate whether you are burning through your error budget too quickly.

You do not need to define the recording rules, dashboards, or alert resources separately. You only need to provide the SLO definition.

To define SLOs in Terraform, choose one of the following methods:

1. [Export an existing SLO](#export-an-existing-slo) in Terraform format from the Grafana UI or API.
2. [Use the SLO wizard to generate an SLO Terraform configuration](#use-the-slo-wizard-to-generate-hcl-without-creating-an-slo) instead of saving the SLO.
3. [Write the SLO definition](#write-the-slo-terraform-schema) directly in Terraform using the SLO schema.

### Export an existing SLO

You can export an existing SLO in Terraform format (HCL) from the UI or the SLO API.

**SLO UI**

From the **Manage SLOs** page, find the SLO you want to export. Click **More**, then click **Export** to view the SLO in Terraform (HCL) format.

You can copy or download the generated `resource` block schema for use in your Terraform configuration.

**SLO API**

You can also make an HTTP GET call to the SLO API with the query parameter `?format=hcl` to retrieve HCL for an individual SLO or the full list of SLOs.

For details, refer to the [SLO API documentation](/docs/grafana-cloud/alerting-and-irm/slo/set-up/api/).

### Use the SLO Wizard to generate HCL without creating an SLO

This option lets you use the SLO wizard to define an SLO and export it to HCL format without creating it in Grafana.

From the **Manage SLOs** page, click **More** on the top right of the screen, right of the **New SLO** button, then click **New SLO for Export**.

Using the SLO wizard, follow [the instructions to define your SLO](/docs/grafana-cloud/alerting-and-irm/slo/create/).

On the final page, select **Export SLO to HCL**.

### Write the SLO Terraform schema

The easiest way to get started with Terraform is to export an SLO using one of the methods above, then modify the generated resource as needed.

Alternatively, you can write the SLO definition from scratch using the Terraform schema.

[Copy code to clipboard] Copy

```none
resource "grafana_slo" "ratio" {
  name        = "HTTP Requests Kubelet Success Rate Indicator"
  description = "99.5% of  Kubelet HTTP Requests are not 5xx errors"
  query {
    ratio {
      success_metric  = "kubelet_http_requests_total{status!~\"5..\"}"
      total_metric    = "kubelet_http_requests_total"
      group_by_labels = ["job", "instance"]
    }
    type = "ratio"
  }
  objectives {
    value  = 0.995
    window = "30d"
  }
   destination_datasource {
      uid = "grafanacloud-prom"
  }
  label {
    key   = "team_name"
    value = "k8s-platform"
  }
  label {
    key   = "service_name"
    value = "kubelet"
  }
  alerting {
    fastburn {
      annotation {
        key   = "name"
        value = "SLO Burn Rate Very High"
      }
      annotation {
        key   = "description"
        value = "Error budget is burning too fast"
      }
    }

    slowburn {
      annotation {
        key   = "name"
        value = "SLO Burn Rate High"
      }
      annotation {
        key   = "description"
        value = "Error budget is burning too fast"
      }
    }
  }
}
```

For details about the SLO schema fields, formats, and requirements, refer to the [Grafana SLO documentation](https://registry.terraform.io/providers/grafana/grafana/latest/docs/resources/slo) in the Terraform Registry.

## Provision SLO resources with Terraform

To provision a SLO, complete the following steps.

1. Export the SLO you want to import in Grafana or write directly the SLO in Terraform format as shown in the previous sections.
2. Copy the sample `resource` block schema into a `main.tf` file on your local machine and customize it if necessary.

   If alerting rules are configured for the SLO, ensure the alerting resources are appropriately configured. Refer to [provision alerting resources with Terraform](/docs/grafana-cloud/alerting-and-irm/alerting/set-up/provision-alerting-resources/terraform-provisioning/).
3. Initialize the working directory containing the Terraform configuration files.

   shell [Copy code to clipboard] Copy

   ```shell
   terraform init
   ```

   This command initializes the Terraform directory, installing the Grafana Terraform provider configured in the `main.tf` file.
4. Apply the Terraform configuration files to provision the resources.

   shell [Copy code to clipboard] Copy

   ```shell
   terraform apply
   ```

   Before applying any changes to Grafana, Terraform displays the execution plan and requests your approval.

   shell [Copy code to clipboard] Copy

   ```shell
    Plan: 1 to add, 0 to change, 0 to destroy.

    Do you want to perform these actions?
    Terraform will perform the actions described above.
    Only 'yes' will be accepted to approve.

    Enter a value:
   ```

   Once you have confirmed to proceed with the changes, Terraform creates the provisioned resources in Grafana!

   shell [Copy code to clipboard] Copy

   ```shell
   Apply complete! Resources: 1 added, 0 changed, 0 destroyed.
   ```

You can now access Grafana to verify the creation of the distinct resources.

## Import existing SLO resources into Terraform

You can import an existing SLO resource into Terraform to bring it under Terraform management. The import process should not modify the server resource, but any edits made are displayed in the `terraform apply` preview. After import, Terraform manages the SLO resource within its state. All existing artifacts previously managed by the SLO—such as recording rules, dashboards, and alerting rules— should be preserved during the import process.

To import an existing SLO into Terraform state, complete the following steps.

1. From the **Manage SLOs** page, locate the SLO you want to export. Click **More**, then click **Export** to view the SLO in Terraform (HCL) format. Note that there is an `import` block, and a `resource` block.
2. Copy the contents (including both the `import` block and the `resource` block) into your `main.tf` file.
3. Initialize the working directory containing the Terraform configuration files, if you don’t already have an established terraform setup.

   shell [Copy code to clipboard] Copy

   ```shell
   terraform init
   ```

   This command initializes the Terraform directory, installing the Grafana Terraform provider configured in the `main.tf` file.
4. Apply the Terraform configuration files to import the SLO resource into Terraform. Note that it says “0 to add, 0 to change” meaning no server side changes are applied.

   shell [Copy code to clipboard] Copy

   ```shell
   terraform apply
   ```

   Before applying any changes to Grafana, Terraform displays the execution plan and requests your approval.

   shell [Copy code to clipboard] Copy

   ```shell
    Plan: 1 to import, 0 to add, 0 to change, 0 to destroy.

    Do you want to perform these actions?
    Terraform will perform the actions described above.
    Only 'yes' will be accepted to approve.

    Enter a value:
   ```

   shell [Copy code to clipboard] Copy

   ```shell
   Apply complete! Resources: 1 imported, 0 added, 0 changed, 0 destroyed.
   ```

You can now access the `terraform.tfstate` file to verify the resource has been successfully imported into Terraform. Modifications can be made directly to the `main.tf` to manage the imported resource going forward. You can now delete the `import` block, or leave it as a hint to humans that this SLO was once imported into terraform.

## More examples

For more examples on the concept of this guide:

- Review all the available options and examples of the Terraform SLO schemas in the [Grafana Terraform Provider documentation](https://registry.terraform.io/providers/grafana/grafana/latest/docs/resources/slo).
- Review the [tutorial to manage a Grafana Cloud stack using Terraform](/docs/grafana-cloud/developer-resources/infrastructure-as-code/terraform/terraform-cloud-stack/).
