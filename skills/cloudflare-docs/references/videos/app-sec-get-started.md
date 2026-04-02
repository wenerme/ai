---
title: Application Security - Get started guide
description: In this video, learn how to get immediate protection against the most common attacks.
image: https://developers.cloudflare.com/cf-twitter-card.png
---

[Skip to content](#%5Ftop) 

# Application Security - Get started guide

In this video, learn how to get immediate protection against the most common attacks.

  
Transcript

Cloudflare Application Security Dashboard allows you to manage application security

features that protect your domains and applications from various web attacks and

threats. In this video, you'll learn how to get immediate protection

against the most common attacks.

Use analytics to monitor and investigate traffic patterns and events.

Handle false positives.

Create custom rules with filters.

Depending on your plan, some functionalities may or may not be

available to you. For more information, visit our developer documentation.

Before you can start reviewing analytics or fine tuning rules,

you need to set up and enable rules that will inspect and mitigate incoming threats.

Let's start by setting up Cloudflare's managed rule set.

This rule set contains multiple rules designed to detect known vulnerabilities and

common attack vectors.

It's updated weekly and also includes emergency patches for zero day threats.

If you're on a free plan, the free managed rule set is already deployed

by default, so you don't have to do anything for this step.

First, log in to the Cloudflare dashboard, select your account and domain and go to

Security Settings. Second, in the Web Application Exploits category,

locate the Cloudflare managed rule set and turn it on.

By enabling this rule set, you immediately get broad protection with low

false positives. Once you've enabled this rule set,

you can go to the analytics page to start understanding how your rules are working.

Keep in mind the system needs time to collect data,

so if you just enable the rule sets, allow some time for incoming traffic to be

analyzed by Cloudflare.

Let's check out analytics page.

There are two different views in analytics.

The traffic tab shows all incoming HTTP requests to your domain,

including ones that aren't mitigated by any security rules.

The events tab only shows requests that triggered a Cloudflare Security action,

such as block, challenge, or lock.

Let's start with the traffic tab.

Here you can identify patterns of traffic through filters like request properties.

Path source, IP action taken, or rule ID.

Let's take a look at an example.

Say that you only want to see only post requests for the login path that contain

leaked credentials. First click Add filter and enter path equals login.

Click apply. Then add the following additional filters HTTP method equals post

leaked credentials. Scan results equals username and password leaked.

Hover on served by origin, then click filter.

Now that you're filtering by requests that have actually reached origin with leaked

credentials, you notice that these requests all come from the same IP address.

The IP address is displayed in the source IP column in sample logs.

Also available in top statistics source IPS.

Let's add that IP to the filters.

Source IP equals to the IP we see here.

Not only can you use filters to analyze specific kinds of requests,

you can also use filters as a starting point for creating your own security rules.

Let's create a rule using the filters we just applied.

This rule will represent a security challenge to post requests that contain leaked

credentials coming from the IP address we specified.

Click Create Custom Security Rule.

A preview side panel will appear.

This preview shows you the beginning of the rule you're building.

We still need to decide what action happens when requests match this rule.

So let's select Configure Rule action.

Now you've been brought to the Rule Builder page under the Security Rule section.

First let's give a rule a name.

Next you'll see that the rule expression contains the filters you just applied in the

analytics page. The rule expression specifies the conditions that must be met for the rule

to run. You can build a rule expression by either using the expression builder or by

manually writing the rule expression.

Now let's select the action we want this rule to perform on matching requests.

Each of the challenge actions use Cloudflare's Challenge platform to verify

whether a visitor to a domain is a real human,

and not a bot or automated script.

An interactive challenge presents visitors with a challenge they need to solve for the

request to be successful.

A JavaScript challenge asks the visitor's web browser to solve a JavaScript based challenge

in the background. Unlike interactive challenges,

this type of challenge does not require interactions from a visitor.

A managed challenge allows Cloudflare to dynamically choose the appropriate type of

challenge to present to a visitor, based on the characteristics of their

requests. Aside from the challenge actions, we can choose block to completely block all

requests that match this rule or skip to skip other rules from a selection of options.

Enterprise accounts also have the option to log requests that match a rule.

These logged requests can then be found in the Security Analytics under the events tab.

In this example, we're going to choose Managed Challenge as the action to take on

requests that match this rule.

Lastly, we can use a Select Order dropdown to select whether to place this rule at the

beginning or end of the execution order.

Rules that match a request are executed in the way they're placed in,

starting from one. If multiple rules match with the request and a preceding rule is a

terminating action, such as a block, no subsequent rules will be performed.

If you want to place this rule in a specific place of the execution order,

we can edit this after we deploy the rule.

Now that we've finished building our rule, select deploy.

Now you're at the Security Rules Overview page where you manage and create custom

security rules. And here's the rule we just created.

If you ever want to edit a rule you created or move its position in the execution order,

just press the three dots to the right of the rule to find these actions.

Occasionally, legitimate requests may also get blocked by rule from a managed rule set

that's created and maintained by Cloudflare.

These are known as false positives.

Let's head back to the analytics page and go to the events tab.

Filter by action block and surface managed rules.

You can adjust the time frame if necessary.

by managed rules, don't just disable the entire rule set.

First, check for common properties between block requests that should be allowed,

such as the same path like login.

Then expand the log details for any of these block requests you'd like to follow and copy

the rule ID. Take note of the managed Rule set name to allow these requests.

To bypass this rule, you can either add an exception to skip the rule for request to a

specific path, or you can configure an override to disable the rule.

Let's see how you would create an exception for specific path in security rules.

Select create rule. Manage rules.

Enter a name for the exception in field we enter URI path in operator equals in value

login. Then select Skip specific rules from a managed rule set and then choose Select

Ruleset for the managed rule you previously identified.

Choose select rules. Search for the rule you want to skip using the rule ID and select it

using the checkbox. Select next.

Review your configuration in rules being skipped and select deploy.

Now let's look at configuring a rule override for that specific rule.

The override will change the rule for all incoming requests.

Select the rule name to open the sidebar, then select view.

In Security rules, select browse rules.

Search for the rule you want to skip using the rule ID you copied.

To disable the rule for all requests, set the status to off.

Select next and then save.

This keeps your overall protection in place while allowing valid traffic through for

known cases. You can now set up application security features to protect your domains and

applications. For more information, please refer to our developer documentation.