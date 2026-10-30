---
description: Connect two laptops, phones, or desktops privately with Cloudflare Mesh and verify connectivity between them.
title: Connect two devices privately with Cloudflare Mesh
image: https://developers.cloudflare.com/mesh/guides/connect-client-devices/og.png?v=835297b7377c1ee0
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/mesh/llms.txt
> Use this file to discover all available pages before exploring further.

# Connect two devices privately with Cloudflare Mesh

Last updated Oct 29, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/mesh/guides/connect-client-devices/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

Connect two laptops, phones, or desktops by enrolling both devices in Cloudflare Mesh. Each device receives a private [Mesh IP](https://developers.cloudflare.com/mesh/concepts/#mesh-ips) and can reach the other device without a Mesh node.

## Prerequisites

Use two devices supported by the [Cloudflare One Client](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/download/). One device must run a service that the other device can test, such as SSH or HTTP.

Before you enroll the devices, configure the [required account settings](https://developers.cloudflare.com/mesh/get-started/#required-account-settings). You do not need to create a Mesh node for device-to-device connectivity.

## 1. Connect the first device

Use the Mesh dashboard to find the installer and organization name:

1. In the Cloudflare dashboard, go to **Networking** > **Mesh**. [Go to **Mesh** ↗](https://dash.cloudflare.com/?to=/:account/mesh)
2. Select **Add participant** > **Add device**.
3. Select Windows, macOS, Linux, iOS, or Android.
4. Use the provided link or QR code to install the Cloudflare One Client.
5. Open the client and select **Cloudflare Zero Trust** when prompted for a connection type.
6. Enter the organization name shown in the dashboard and complete authentication.

The workflow provides installation information. It does not enroll the device automatically. For manual enrollment instructions, refer to [Enroll a device](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/manual-deployment/).

### Headless Windows, macOS, and Linux devices

Do not use interactive CLI enrollment on a device without a browser. Instead, [create a Service Auth enrollment policy](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/device-enrollment/#check-for-service-token). Configure the [`organization`](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/mdm-deployment/parameters/#organization), [`auth_client_id`](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/mdm-deployment/parameters/#auth_client_id), and [`auth_client_secret`](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/mdm-deployment/parameters/#auth_client_secret) managed deployment parameters.

For platform-specific installation methods and configuration file locations, refer to [Managed deployment](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/mdm-deployment/). For a complete Linux example, refer to [Deploy the Cloudflare One Client on headless Linux machines](https://developers.cloudflare.com/cloudflare-one/tutorials/deploy-client-headless-linux/).

This method works on [supported Windows, macOS, and Linux systems](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/download/). Service-token devices use the shared identity `non_identity@<team-name>.cloudflareaccess.com`. Policies based on identity provider users or groups do not apply to these devices. To assign device profiles, use the expression `identity.service_token_uuid == "<SERVICE_TOKEN_ID>"`, where `<SERVICE_TOKEN_ID>` is the service token resource UUID (`id`), not its `auth_client_id`. Place this [Service Token selector](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/device-profiles/#service-token) before broader OS or email profiles. Use the shared non-identity email only when all Service Auth devices should match the profile.

After enrollment, the device receives a Mesh IP. The device appears in the participant table under **Networking** > **Mesh**.

## 2. Connect the second device

Repeat the enrollment procedure on the second device. Use the same Cloudflare account and Zero Trust organization.

Confirm that both devices appear as **Online** under **Networking** > **Mesh**. Record the Mesh IP of the device that runs the service.

## 3. Route Mesh traffic through Cloudflare

Check the [device profile](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/device-profiles/) applied to each device. The profile must use Traffic and DNS mode and route your Mesh IP range through Cloudflare.

- In Split Tunnels **Include mode**, include `100.96.0.0/12`.
- In Split Tunnels **Exclude mode**, make sure neither `100.96.0.0/12` nor a parent range such as `100.64.0.0/10` is excluded.

Use your custom device IP range instead of `100.96.0.0/12` if you changed the default. For configuration instructions, refer to [Split Tunnels](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/route-traffic/split-tunnels/).

## 4. Allow inbound traffic

Configure the destination device firewall to accept the service traffic. Windows Firewall blocks inbound traffic from `100.96.0.0/12` by default. Add a rule that allows the required protocols and ports from the Mesh IP range.

On macOS and Linux, verify that custom firewall rules permit the same traffic. You do not need to open the service to the public Internet.

## Verify connectivity

Test the application protocol that you intend to use. For example, test a service that listens on TCP port `22`:

```sh
nc -vz <DESTINATION-IP> 22
```

```powershell
Test-NetConnection <DESTINATION-IP> -Port 22
```

For an HTTP service, open `http://<DESTINATION-IP>:<PORT>` in a browser.

Replace `<DESTINATION-IP>` with the destination Mesh IP or private IP. Replace port `22` or `<PORT>` with the port used by your service.

If you turned on the ICMP Gateway proxy, you can also run `ping <DESTINATION-IP>` as a diagnostic check. A connected participant status does not confirm that the application protocol can reach the destination.

Use the destination device Mesh IP for `<DESTINATION-IP>`.

## Secure and monitor the connection

Use [Gateway network policies](https://developers.cloudflare.com/cloudflare-one/traffic-controls/network-policies/) to control which sources can reach each destination IP and port. You can combine network policies with [device posture checks](https://developers.cloudflare.com/cloudflare-one/reusable-components/posture-checks/) for enrolled client devices.

Review allowed and blocked connections in [Gateway network logs](https://developers.cloudflare.com/cloudflare-one/insights/logs/dashboard-logs/gateway-logs/#network). Client device traffic includes the enrolled user identity. Mesh node traffic uses the identity `warp_connector@<your-team-name>.cloudflareaccess.com`.

If a participant is online but the service is unreachable, refer to [Troubleshoot Cloudflare Mesh connectivity](https://developers.cloudflare.com/mesh/troubleshooting/).

## Next steps

- [Connect two servers](https://developers.cloudflare.com/mesh/guides/connect-servers/) by their Mesh IPs.
- [Connect two private networks](https://developers.cloudflare.com/mesh/guides/connect-sites/) through routed subnets.
- [Configure routes](https://developers.cloudflare.com/mesh/features/routes/) for devices that cannot run the client.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/mesh/guides/connect-client-devices/#page","headline":"Connect two devices privately with Cloudflare Mesh","description":"Connect two laptops, phones, or desktops privately with Cloudflare Mesh and verify connectivity between them.","url":"https://developers.cloudflare.com/mesh/guides/connect-client-devices/","inLanguage":"en","image":"https://developers.cloudflare.com/mesh/guides/connect-client-devices/og.png?v=835297b7377c1ee0","dateModified":"2026-10-29","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Private networks"]}
```
