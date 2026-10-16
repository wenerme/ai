---
description: Filter email with subject keywords and trusted-domain heuristics.
title: Spam filtering
image: https://developers.cloudflare.com/email-service/examples/email-routing/spam-filtering/og.png?v=bcadf0d23ef36e90
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/email-service/llms.txt
> Use this file to discover all available pages before exploring further.

# Spam filtering

Filter email with subject keywords and trusted-domain heuristics

Last updated Oct 15, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/email-service/examples/email-routing/spam-filtering/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

This example scores incoming email using subject keywords and sender-domain heuristics.

## Basic spam filter

Simple spam detection with keyword matching and domain validation:

```typescript
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
		"lottery",
	];

	private trustedDomains = ["example.com", "trusted-partner.com", "vendor.net"];

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
		if (
			sender.includes("noreply") &&
			subject.toLowerCase().includes("urgent")
		) {
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
				"spam_check_completed",
				message.from,
				message.to,
				spamCheck.isSpam ? "spam" : "legitimate",
			],
			doubles: [
				1, // Count
				spamCheck.score,
				Date.now() - startTime,
			],
			indexes: [
				`spam_detected:${spamCheck.isSpam}`,
				`score_range:${getScoreRange(spamCheck.score)}`,
			],
		});

		if (spamCheck.isSpam) {
			console.log(
				`Rejected spam email from ${message.from}: ${spamCheck.reasons.join(", ")}`,
			);
			message.setReject(`Message rejected: ${spamCheck.reasons[0]}`);
			return;
		}

		// Add spam score headers and forward
		const headers = new Headers();
		headers.set("X-Spam-Score", spamCheck.score.toString());
		headers.set("X-Spam-Reasons", spamCheck.reasons.join(", "));
		headers.set("X-Spam-Check-Time", (Date.now() - startTime).toString());

		await message.forward("inbox@example.com", headers);
	},
};

function getScoreRange(score: number): string {
	if (score < 0) return "trusted";
	if (score === 0) return "neutral";
	if (score === 1) return "suspicious";
	return "spam";
}
```

## Optional Workers AI integration

The basic spam filter uses simple heuristic checks. You can optionally use [Workers AI](https://developers.cloudflare.com/workers-ai/) to analyze email content.

## Next steps

- [Email handler](https://developers.cloudflare.com/email-service/api/route-emails/email-handler/) — reference for `setReject()` and `forward()` actions used here.
- [Hard bounce handling](https://developers.cloudflare.com/email-service/examples/email-routing/hard-bounce-handling/) — detect bounce notifications that often originate from spam infrastructure.
- [Email storage and processing](https://developers.cloudflare.com/email-service/examples/email-routing/email-storage/) — log filtered emails to KV for later review.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/email-service/examples/email-routing/spam-filtering/#page","headline":"Spam filtering","description":"Filter email with subject keywords and trusted-domain heuristics.","url":"https://developers.cloudflare.com/email-service/examples/email-routing/spam-filtering/","inLanguage":"en","image":"https://developers.cloudflare.com/email-service/examples/email-routing/spam-filtering/og.png?v=bcadf0d23ef36e90","dateModified":"2026-10-15","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
