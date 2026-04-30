---
title: Webhook definitions
description: Webhook event data for certificate issuance, validation, and custom hostname changes.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-for-platforms/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

### Tags

[ JSON ](https://developers.cloudflare.com/search/?tags=JSON) 

# Webhook definitions

When you [create a webhook notification](https://developers.cloudflare.com/notifications/get-started/configure-webhooks/) for **SSL for SaaS Custom Hostnames**, you may want to automate responses to specific events (certificate issuance, failed validation, etc.).

The following section details the data Cloudflare sends to a webhook destination.

## Certificate validation

Before a Certificate Authority will issue a certificate for a domain, the requester must prove they have control over that domain. This process is known as [domain control validation (DCV)](https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/security/certificate-management/issue-and-validate/validate-certificates/).

### Validation succeeded

Cloudflare sends this alert when certificates move from a status of `pending_validation` to `pending_issuance`.

```

{

  "metadata": {

    "event": {

      "id": "<<WEBHOOK_ID>",

      "type": "ssl.custom_hostname_certificate.validation.succeeded",

      "created_at": "2022-02-09T00:03:28.385080Z"

    },

    "account": {

      "id": "<<ACCOUNT_ID>"

    },

    "zone": {

      "id": "<<ZONE_ID>"

    }

  },

  "data": {

    "id": "<<CUSTOM_HOSTNAME_ID>",

    "hostname": "blog.com",

    "ssl": {

      "id": "<<CERTIFICATE_ID>",

      "type": "dv",

      "method": "cname",

      "status": "pending_issuance",

      "settings": {

        "min_tls_version": "1.2",

        "http2": "on"

      }

    },

    "custom_metadata": {

      "key1": "value1",

      "key2": "value2"

    },

    "custom_origin_server": "0001.blog.com"

  }

}


```

### Validation failed

Cloudflare sends this alert each time a certificate remains in a `pending_validation` status during [DCV retries](https://developers.cloudflare.com/ssl/edge-certificates/changing-dcv-method/validation-backoff-schedule/).

```

{

  "metadata": {

    "event": {

      "id": "<<WEBHOOK_ID>",

      "type": "ssl.custom_hostname_certificate.validation.failed",

      "created_at": "2018-02-09T00:03:28.385080Z"

    },

    "account": {

      "id": "<<ACCOUNT_ID>"

    },

    "zone": {

      "id": "<<ZONE_ID>"

    }

  },

  "data": {

    "id": "<<CUSTOM_HOSTNAME_ID>",

    "hostname": "blog.com",

    "ssl": {

      "id": "<<CERTIFICATE_ID>",

      "type": "dv",

      "method": "cname",

      "status": "pending_validation",

      "cname": "_ca3-64ce913ebfe74edeb2e8813e3928e359.app.example2.com",

      "cname_target": "dcv.digicert.com",

      "validation_errors": [

        {

          "message": "blog.example.com reported as potential risk: google_safe_browsing"

        }

      ],

      "settings": {

        "min_tls_version": "1.2",

        "http2": "on"

      }

    },

    "custom_metadata": {

      "key1": "value1",

      "key2": "value2"

    },

    "custom_origin_server": "0001.blog.com"

  }

}


```

---

## Certificate issuance

Once validated, certificates are issued by Cloudflare in conjunction with your chosen [certificate authority](https://developers.cloudflare.com/ssl/reference/certificate-authorities/).

### Issuance succeeded

Cloudflare sends this alert when certificates move from a status of `pending_validation` or `pending_issuance` to `pending_deployment`.

```

{

  "metadata": {

    "event": {

      "id": "<<WEBHOOK_ID>",

      "type": "ssl.custom_hostname_certificate.issuance.succeeded",

      "created_at": "2022-02-09T00:03:28.385080Z"

    },

    "account": {

      "id": "<<ACCOUNT_ID>"

    },

    "zone": {

      "id": "<<ZONE_ID>"

    }

  },

  "data": {

    "id": "<<CUSTOM_HOSTNAME_ID>",

    "hostname": "blog.com",

    "ssl": {

      "id": "<<CERTIFICATE_ID>",

      "type": "dv",

      "method": "cname",

      "status": "pending_deployment",

      "settings": {

        "min_tls_version": "1.2",

        "http2": "on"

      }

    },

    "custom_metadata": {

      "key1": "value1",

      "key2": "value2"

    },

    "custom_origin_server": "0001.blog.com"

  }

}


```

### Issuance failed

Cloudflare sends this alert each time a certificate remains in a status of `pending_issuance` during [DCV retries](https://developers.cloudflare.com/ssl/edge-certificates/changing-dcv-method/validation-backoff-schedule/).

```

{

  "metadata": {

    "event": {

      "id": "<<WEBHOOK_ID>",

      "type": "ssl.custom_hostname_certificate.issuance.failed",

      "created_at": "2022-02-09T00:03:28.385080Z"

    },

    "account": {

      "id": "<<ACCOUNT_ID>"

    },

    "zone": {

      "id": "<<ZONE_ID>"

    }

  },

  "data": {

    "id": "<<CUSTOM_HOSTNAME_ID>",

    "hostname": "blog.com",

    "ssl": {

      "id": "<<CERTIFICATE_ID>",

      "type": "dv",

      "method": "cname",

      "status": "pending_issuance",

      "cname": "_ca3-64ce913ebfe74edeb2e8813e3928e359.app.example2.com",

      "cname_target": "dcv.digicert.com",

      "validation_errors": [

        {

          "message": "caa_error: blog.example.com"

        }

      ],

      "settings": {

        "min_tls_version": "1.2",

        "http2": "on"

      }

    },

    "custom_metadata": {

      "key1": "value1",

      "key2": "value2"

    },

    "custom_origin_server": "0001.blog.com"

  }

}


```

---

## Certificate deployment

Once issued, certificates are deployed to Cloudflare's global edge network.

### Deployment succeeded

Cloudflare sends this alert when certificates move from a status of `pending_deployment` to `active`.

```

{

  "metadata": {

    "event": {

      "id": "<<WEBHOOK_ID>",

      "type": "ssl.custom_hostname_certificate.deployment.succeeded",

      "created_at": "2022-02-09T00:03:28.385080Z"

    },

    "account": {

      "id": "<<ACCOUNT_ID>"

    },

    "zone": {

      "id": "<<ZONE_ID>"

    }

  },

  "data": {

    "id": "<<CUSTOM_HOSTNAME_ID>",

    "hostname": "blog.com",

    "ssl": {

      "id": "<<CERTIFICATE_ID>",

      "type": "dv",

      "method": "cname",

      "status": "active",

      "settings": {

        "min_tls_version": "1.2",

        "http2": "on"

      }

    },

    "custom_metadata": {

      "key1": "value1",

      "key2": "value2"

    },

    "custom_origin_server": "0001.blog.com"

  }

}


```

### Deployment failed

Cloudflare sends this alert each time a certificate remains in a status of `pending_deployment` during [DCV retries](https://developers.cloudflare.com/ssl/edge-certificates/changing-dcv-method/validation-backoff-schedule/).

```

{

  "metadata": {

    "event": {

      "id": "<<WEBHOOK_ID>",

      "type": "ssl.custom_hostname_certificate.deployment.failed",

      "created_at": "2022-02-09T00:03:28.385080Z"

    },

    "account": {

      "id": "<<ACCOUNT_ID>"

    },

    "zone": {

      "id": "<<ZONE_ID>"

    }

  },

  "data": {

    "id": "<<CUSTOM_HOSTNAME_ID>",

    "hostname": "blog.com",

    "ssl": {

      "id": "<<CERTIFICATE_ID>",

      "type": "dv",

      "method": "cname",

      "status": "pending_deployment",

      "settings": {

        "min_tls_version": "1.2",

        "http2": "on"

      }

    },

    "custom_metadata": {

      "key1": "value1",

      "key2": "value2"

    },

    "custom_origin_server": "0001.blog.com"

  }

}


```

---

## Certificate deletion

### Deletion succeeded

Cloudflare sends this alert when certificates move from a status of `pending_deletion` to `deleted`.

```

{

  "metadata": {

    "event": {

      "id": "<<WEBHOOK_ID>",

      "type": "ssl.custom_hostname_certificate.deletion.succeeded",

      "created_at": "2022-02-09T00:03:28.385080Z"

    },

    "account": {

      "id": "<<ACCOUNT_ID>"

    },

    "zone": {

      "id": "<<ZONE_ID>"

    }

  },

  "data": {

    "id": "<<CUSTOM_HOSTNAME_ID>",

    "hostname": "blog.com",

    "ssl": {

      "id": "<<CERTIFICATE_ID>",

      "type": "dv",

      "method": "cname",

      "status": "deleted"

    },

    "custom_metadata": {

      "key1": "value1",

      "key2": "value2"

    },

    "custom_origin_server": "0001.blog.com"

  }

}


```

### Deletion failed

Cloudflare sends this alert each time a certificate remains in status of `pending_deletion` during [DCV retries](https://developers.cloudflare.com/ssl/edge-certificates/changing-dcv-method/validation-backoff-schedule/).

```

{

  "metadata": {

    "event": {

      "id": "<<WEBHOOK_ID>",

      "type": "ssl.custom_hostname_certificate.deletion.failed",

      "created_at": "2022-02-09T00:03:28.385080Z"

    },

    "account": {

      "id": "<<ACCOUNT_ID>"

    },

    "zone": {

      "id": "<<ZONE_ID>"

    }

  },

  "data": {

    "id": "<<CUSTOM_HOSTNAME_ID>",

    "hostname": "blog.com",

    "ssl": {

      "id": "<<CERTIFICATE_ID>",

      "type": "dv",

      "method": "cname",

      "status": "pending_deletion"

    },

    "custom_metadata": {

      "key1": "value1",

      "key2": "value2"

    },

    "custom_origin_server": "0001.blog.com"

  }

}


```

---

## Certificate renewal

Once issued, certificates are valid for a period of time depending on the [certificate authority](https://developers.cloudflare.com/ssl/reference/certificate-validity-periods/).

The actions that you need to perform to renew certificates depend on your [validation method](https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/security/certificate-management/issue-and-validate/renew-certificates/).

### Upcoming renewal

```

{

  "metadata": {

    "event": {

      "id": "<<WEBHOOK_ID>",

      "type": "ssl.custom_hostname_certificate.renewal.upcoming_certificate_expiration_notification",

      "created_at": "2022-02-09T00:03:28.385080Z"

    },

    "account": {

      "id": "<<ACCOUNT_ID>"

    },

    "zone": {

      "id": "<<ZONE_ID>"

    }

  },

  "data": {

    "id": "<<CUSTOM_HOSTNAME_ID>",

    "hostname": "blog.com",

    "ssl": {

      "id": "<<CERTIFICATE_ID>",

      "status": "active",

      "hosts": ["blog.example.com"],

      "issuer": "DigiCertInc",

      "serial_number": "1001172778337169491",

      "signature": "ECDSAWithSHA256",

      "uploaded_on": "2021-11-17T04:33:54.561747Z",

      "expires_on": "2022-11-21T12:00:00Z",

      "custom_csr_id": "7b163417-1d2b-4c84-a38a-2fb7a0cd7752",

      "settings": {

        "min_tls_version": "1.2",

        "http2": "on"

      }

    },

    "custom_metadata": {

      "key1": "value1",

      "key2": "value2"

    },

    "custom_origin_server": "0001.blog.com"

  }

}


```

### Renewal succeeded

Cloudflare sends this alert when certificates move from a status of `active` to `pending_deployment`.

```

{

  "metadata": {

    "event": {

      "id": "<<WEBHOOK_ID>",

      "type": "ssl.custom_hostname_certificate.renewal.succeeded",

      "created_at": "2022-02-09T00:03:28.385080Z"

    },

    "account": {

      "id": "<<ACCOUNT_ID>"

    },

    "zone": {

      "id": "<<ZONE_ID>"

    }

  },

  "data": {

    "id": "<<CUSTOM_HOSTNAME_ID>",

    "hostname": "blog.com",

    "ssl": {

      "id": "<<CERTIFICATE_ID>",

      "type": "dv",

      "method": "cname",

      "status": "pending_deployment",

      "settings": {

        "min_tls_version": "1.2",

        "http2": "on"

      }

    },

    "custom_metadata": {

      "key1": "value1",

      "key2": "value2"

    },

    "custom_origin_server": "0001.blog.com"

  }

}


```

### Renewal failed

Cloudflare sends this alert when certificates move from a status of `active` to `pending_issuance`.

```

{

  "metadata": {

    "event": {

      "id": "<<WEBHOOK_ID>",

      "type": "ssl.custom_hostname_certificate.renewal.failed",

      "created_at": "2022-02-09T00:03:28.385080Z"

    },

    "account": {

      "id": "<<ACCOUNT_ID>"

    },

    "zone": {

      "id": "<<ZONE_ID>"

    }

  },

  "data": {

    "id": "<<CUSTOM_HOSTNAME_ID>",

    "hostname": "blog.com",

    "ssl": {

      "id": "<<CERTIFICATE_ID>",

      "type": "dv",

      "method": "cname",

      "status": "pending_issuance",

      "cname": "_ca3-64ce913ebfe74edeb2e8813e3928e359.app.example2.com",

      "cname_target": "dcv.digicert.com",

      "validation_errors": [

        {

          "message": "caa_error: blog.example.com"

        }

      ],

      "settings": {

        "min_tls_version": "1.2",

        "http2": "on"

      }

    },

    "custom_metadata": {

      "key1": "value1",

      "key2": "value2"

    },

    "custom_origin_server": "0001.blog.com"

  }

}


```

## Troubleshooting

Occasionally, you may see webhook notifications that do not include a corresponding `<<CUSTOM_HOSTNAME_ID>>` and `hostname` values.

This behavior is because each custom hostname can only have one certificate attached to it. Previously attached certificates can still emit webhook events but will not include the associated hostname and ID values.

## Alerts

You can configure alerts to receive notifications for changes in your custom hostname certificates.

SSL for SaaS Custom Hostnames Alert

**Who is it for?**

Customers with custom hostname certificates who want to receive a notification on validation, issuance, renewal, and expiration of certificates. For more details around data formatting for webhooks, refer to the [Cloudflare for SaaS docs](https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/security/certificate-management/webhook-definitions/).

**Other options / filters**

None.

**Included with**

Purchase of [Cloudflare for SaaS](https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/).

**What should you do if you receive one?**

You only need to take action if you are notified that you have a certificate that failed. You can find the reasons why a certificate is not being issued in [Troubleshooting SSL errors](https://developers.cloudflare.com/ssl/troubleshooting/general-ssl-errors/).

Refer to [Cloudflare Notifications](https://developers.cloudflare.com/notifications/get-started/) for more information on how to set up an alert.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-for-platforms/","name":"Cloudflare for Platforms"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-for-platforms/cloudflare-for-saas/","name":"Cloudflare for SaaS"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-for-platforms/cloudflare-for-saas/security/","name":"Security"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-for-platforms/cloudflare-for-saas/security/certificate-management/","name":"Certificate management"}},{"@type":"ListItem","position":6,"item":{"@id":"/cloudflare-for-platforms/cloudflare-for-saas/security/certificate-management/webhook-definitions/","name":"Webhook definitions"}}]}
```
