---
title: Spam filtering
description: Build spam detection for Email Service with keyword analysis, domain reputation checks, and AI-based filtering.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/email-service/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Spam filtering

Implement intelligent spam detection with keyword analysis, domain reputation, and machine learning techniques

Build spam filtering systems with keyword matching, domain validation, and intelligent detection methods for effective email security.

## Basic spam filter

Simple spam detection with keyword matching and domain validation:

TypeScript

```

interface Env {

  EMAIL: SendEmail;

  EMAIL_ANALYTICS: AnalyticsEngine;

}


interface SpamFilter {

  checkSpam(

    message: any,

  ): Promise<{ isSpam: boolean; score: number; reasons: string[] }>;

}


class SimpleSpamFilter implements SpamFilter {

  private spamKeywords = [

    "buy now",

    "limited time",

    "act fast",

    "click here",

    "free money",

    "guaranteed",

    "risk free",

    "urgent",

    "winner",

    "congratulations",

    "inheritance",

    "lottery"

  ];


  private trustedDomains = ["company.com", "trusted-partner.com", "vendor.net"];


  async checkSpam(

    message,

  ): Promise<{ isSpam: boolean; score: number; reasons: string[] }> {

    let score = 0;

    const reasons = [];


    const sender = message.from;

    const subject = message.headers.get("subject") || "";

    const senderDomain = sender.split("@")[1];


    // Check sender domain

    if (this.trustedDomains.includes(senderDomain)) {

      score -= 2; // Trusted sender

    }


    // Check subject for spam keywords

    const subjectLower = subject.toLowerCase();

    for (const keyword of this.spamKeywords) {

      if (subjectLower.includes(keyword)) {

        score += 1;

        reasons.push(`Spam keyword: ${keyword}`);

      }

    }


    // Check for excessive capitalization

    const capsRatio = (subject.match(/[A-Z]/g) || []).length / subject.length;

    if (capsRatio > 0.7 && subject.length > 10) {

      score += 1;

      reasons.push("Excessive capitalization");

    }


    // Check for suspicious patterns

    if (subject.includes("!!!") || subject.includes("$$$")) {

      score += 1;

      reasons.push("Suspicious punctuation");

    }


    // Check for suspicious sender patterns

    if (sender.includes("noreply") && subject.toLowerCase().includes("urgent")) {

      score += 2;

      reasons.push("Suspicious noreply + urgent combination");

    }


    return {

      isSpam: score >= 2,

      score,

      reasons,

    };

  }

}


const spamFilter = new SimpleSpamFilter();


export default {

  async email(message, env, ctx): Promise<void> {

    const startTime = Date.now();


    // Check for spam

    const spamCheck = await spamFilter.checkSpam(message);


    // Track spam check metrics

    env.EMAIL_ANALYTICS?.writeDataPoint({

      blobs: [

        'spam_check_completed',

        message.from,

        message.to,

        spamCheck.isSpam ? 'spam' : 'legitimate'

      ],

      doubles: [

        1, // Count

        spamCheck.score,

        Date.now() - startTime

      ],

      indexes: [

        `spam_detected:${spamCheck.isSpam}`,

        `score_range:${getScoreRange(spamCheck.score)}`

      ]

    });


    if (spamCheck.isSpam) {

      console.log(`🚫 Rejected spam email from ${message.from}: ${spamCheck.reasons.join(", ")}`);

      message.setReject(`Message rejected: ${spamCheck.reasons[0]}`);

      return;

    }


    // Add spam score headers and forward

    const headers = new Headers();

    headers.set("X-Spam-Score", spamCheck.score.toString());

    headers.set("X-Spam-Reasons", spamCheck.reasons.join(", "));

    headers.set("X-Spam-Check-Time", (Date.now() - startTime).toString());


    await message.forward("inbox@company.com", headers);

  },

};


function getScoreRange(score: number): string {

  if (score < 0) return 'trusted';

  if (score === 0) return 'neutral';

  if (score === 1) return 'suspicious';

  return 'spam';

}


```

## Advanced spam detection with AI

For more sophisticated spam detection, you can enhance the basic filter using [Workers AI](https://developers.cloudflare.com/workers-ai) to analyze email content with machine learning models. This approach can identify subtle spam patterns that keyword-based filters might miss.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/email-service/","name":"Email Service"}},{"@type":"ListItem","position":3,"item":{"@id":"/email-service/examples/","name":"Examples"}},{"@type":"ListItem","position":4,"item":{"@id":"/email-service/examples/email-routing/","name":"Email routing"}},{"@type":"ListItem","position":5,"item":{"@id":"/email-service/examples/email-routing/spam-filtering/","name":"Spam filtering"}}]}
```
