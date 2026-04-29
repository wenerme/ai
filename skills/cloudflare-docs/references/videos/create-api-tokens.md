---
title: Create an API token
description: In this video, learn the difference between account and user API tokens how to create one.
image: https://developers.cloudflare.com/cf-twitter-card.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/videos/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Create an API token

In this video, learn the difference between account and user API tokens how to create one.

  
Transcript

An API token allows secure, fine grained access to specific resources

without exposing your full account credentials.

They have a limited lifespan and expire automatically.

This reduces risk if they are compromised.

For example, if you want to grant someone access to specific apps or data.

You can create an API token for them.

There are two types of tokens user token and account token.

User tokens are directly tied to an individual and their account.

While account tokens are typically tied to services which can help prevent an

interruption in service.

If an employee leaves their organization.

In this video, we'll walk through how to create an API token in the Cloudflare

dashboard. Before you begin, make sure you know your account and zone IDs.

So let's do that. First, the account ID identifies your Cloudflare

account, while the zone ID identifies a specific domain you've added to Cloudflare.

From the accounts page, locate your account at the end of the account

row, open the menu and select Copy Account ID.

If you only have one account, it looks a little bit different.

Login and go to the account home page next to your account name,

select the menu button from the drop down.

Choose Copy Account ID to find your zone ID, log in and go to the accounts page.

Select your account, then go to the overview page for your domain.

Scroll to the API section near the bottom.

Here you'll see the zone ID and an option to click to copy.

This section also lists your account ID for convenience.

Now we can create an API token to create a token.

Start from the Cloudflare dashboard.

For a user token, go to profile API tokens.

For an account token, go to Manage Account account API tokens.

You will only see this option if you are a Superadmin.

Select Create token. You can choose from predefined templates or build a custom token.

For example, let's use the Edit Zone DNS template.

Give your token a descriptive name such as DNS updates for example.com.

The template will fulfill permissions, but you can adjust them as needed.

Next assign permissions.

Permissions are organized by account, user or zone and usually offer either read

access or edit access.

Edit allows full control, create, read, update,

delete, and list, while read provides viewing rights only.

Then select the resources the token applies to.

For instance, granting zone DNS read access for example.com will let the token view DNS

records for that zone only.

If the token is used on a different zone, it will return an error.

Optionally, you can add restrictions such as filtering by client IP or setting a time to

live value for the token.

Click continue to summary to review your selections.

If everything looks correct, choose Create Token.

The dashboard will now display your new token secret.

Copy it immediately to a secure location.

The secret is shown only once.

Anyone with a token can perform the actions you've authorized,

so treat it like a password.

With that, you've successfully created an API token and can begin using it with a

Cloudflare API. For more information, visit our developer documentation.