---
description: Understand what keeps a sandbox running, what stops it, and which files the next instance starts with.
title: Sandbox lifetime
image: https://developers.cloudflare.com/sandbox/concepts/lifetime/og.png?v=cd31f8e1a3824d5a
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/sandbox/llms.txt
> Use this file to discover all available pages before exploring further.

# Sandbox lifetime

Last updated Sep 30, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/sandbox/concepts/lifetime/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

A Linux sandbox has three parts: a name, a [Durable Object](https://developers.cloudflare.com/durable-objects/), and an instance in [Containers](https://developers.cloudflare.com/containers/). Your Worker reaches the sandbox by name, the name reaches the Durable Object, and the Durable Object starts the instance. The name and the Durable Object last as long as your application uses them. The instance runs only while something keeps it running.

This page follows a coding agent. The agent clones a repository, installs its dependencies, edits files, and starts a development server. Then it waits an hour for its next instruction and reaches the same sandbox by name. The files are still there if the instance kept running or the application saved a snapshot. The development server is still there only if the instance kept running.

Instance running

ResetStop instanceStart from snapshot

Sandbox name

Durable Objectstoragesnapshot ID

Linux instanceRUNNINGprocessesdev serverdiskrepository, edits

mounted

R2 bucket

The Linux instance runs a development server and holds the repository and edits on its disk.

## The name and the Durable Object remain

Your Worker calls `getByName()` with the sandbox name. The same name always reaches the same Durable Object. Durable Object storage keeps data such as session details or a snapshot ID, whether or not an instance is running.

When work arrives and no instance is running, the Durable Object starts one with [`this.ctx.container.start()`](https://developers.cloudflare.com/containers/api/durable-object-container/#start).

## Activity keeps an instance running

An instance keeps running while its Durable Object is active. The Durable Object is active while it handles a request, runs an alarm, streams a response, or keeps an accepted WebSocket open. An open terminal keeps a sandbox running this way, even when nobody types.

After the Durable Object becomes inactive, the instance keeps running for the time set with [`setInactivityTimeout()`](https://developers.cloudflare.com/containers/api/durable-object-container/#setinactivitytimeout), up to 6 hours. A request that arrives within that time reaches the same instance, with its files and processes. When the time ends, Cloudflare stops the instance. Without a timeout, Cloudflare stops the instance shortly after the Durable Object becomes inactive.

A pending [`monitor()`](https://developers.cloudflare.com/containers/api/durable-object-container/#monitor) call keeps the Durable Object in memory, so the inactivity timeout starts only after the Durable Object leaves memory. When it leaves, the call ends, so `monitor()` does not report the stop that follows.

Code that runs inside the instance does not count as activity. If no requests arrive, the instance stops when the inactivity timeout ends, even while a build, a test suite, or an agent task still runs inside it. A Durable Object [alarm](https://developers.cloudflare.com/durable-objects/api/alarms/) that runs more often than the timeout and checks the work keeps the instance running until the work ends. [Run background processes](https://developers.cloudflare.com/sandbox/commands/run-background-processes/) uses an alarm that runs every minute.

## The timeout does not survive a restart

A Durable Object can restart while its instance keeps running, for example after a deploy or between two alarms. The restarted Durable Object starts without an inactivity timeout, so the instance stops shortly after the Durable Object becomes inactive.

The sandbox examples set the timeout after `start()`, and set it again in the constructor of the Durable Object when the instance is already running. For an example, refer to [`setInactivityTimeout()`](https://developers.cloudflare.com/containers/api/durable-object-container/#setinactivitytimeout).

## What stops an instance

An instance stops when one of these happens:

- The inactivity timeout ends.
- Your Worker calls [`destroy()`](https://developers.cloudflare.com/containers/api/durable-object-container/#destroy).
- The main process exits.

The main process is the entrypoint passed to `start()`, or the default command of the image. When it exits, the instance stops, and every command started with `exec()` ends with it. The default command of `cloudflare/debian-trixie` exits right away, so the sandbox examples start that image with `sleep infinity` as the entrypoint, or run a web server as the main process.

When the inactivity timeout ends, every process in the instance receives `SIGTERM`, and Cloudflare stops the instance shortly after, whether or not the processes exit. `destroy()` stops the instance at once, with no time for processes to clean up. Use `SIGTERM` only for cleanup that can fail, and save the files you need before the instance stops, for example in a [snapshot](#snapshots-carry-files-to-the-next-instance).

After an instance stops, the next request that calls `start()` starts a new instance.

Cloudflare does not wake the Durable Object when its instance stops. To record each stop and its reason, refer to [Run code when a sandbox stops](https://developers.cloudflare.com/sandbox/manage/run-code-when-a-sandbox-stops/).

## Deploys keep instances running

Deploying a new version of your Worker restarts every Durable Object. A running instance keeps running, and the next request reaches the same instance, with its files and processes. Outbound handlers that the Durable Object set up with [`interceptOutboundHttp()`](https://developers.cloudflare.com/containers/api/durable-object-container/#interceptoutboundhttp) remain in place and run the code of the new version.

A running instance keeps the image, entrypoint, and environment variables that it started with. `start()` throws while an instance runs, so a new image or new startup options apply only to instances that start after the deploy. To move a sandbox to a new image, stop its instance, for example with `destroy()`, and start a new one. The files and processes of the old instance end with it.

Requests, streamed responses, and WebSockets that the previous version was handling end during the deploy. A browser terminal disconnects and must connect again.

After the deploy, the instance keeps running for the inactivity timeout that the previous version set. If no request arrives within that time, the instance stops. The new version starts without the timeout, so set it again in the constructor, as the sandbox examples do.

Container [rollouts](https://developers.cloudflare.com/containers/configuration/rollouts/) replace instances only in Container applications that use the [default scheduling policy](https://developers.cloudflare.com/containers/configuration/scheduling-policy/), so no rollout replaces a sandbox.

## Files and processes end with the instance

The disk of an instance holds the repository, installed packages, configuration files, and output written by commands. Its memory holds running processes, open terminals, and network connections. All of it ends when the instance stops. The next instance starts from its image, or from a snapshot.

## Snapshots carry files to the next instance

Public beta

Container snapshots are in public beta. The API and behavior may change.

[`snapshotContainer()`](https://developers.cloudflare.com/containers/api/durable-object-container/#snapshotcontainer) saves the writable root filesystem of a running instance. It does not save separately mounted filesystems, memory, or processes. Starting with a snapshot creates a new instance with the saved files, and the new instance runs its entrypoint. The processes that were running do not continue. The new instance reuses the same process IDs, so a process ID saved in a file can belong to another process after a restore. Files in `/run` are in memory, and a snapshot does not save them.

Cloudflare does not restore a snapshot on its own. Your application decides when to save a snapshot. It stores the snapshot, for example in Durable Object storage, and passes it to the next `start()`. Changes made after the last snapshot exist only in the current instance, so save another snapshot before the instance stops.

A snapshot expires 30 days after it is created or last restored. To keep files longer, copy them to a bucket.

The repository, dependencies, and edits of the coding agent return from a snapshot. The development server does not, so the agent starts it again. To save and restore a workspace, refer to [Save and restore a sandbox with snapshots](https://developers.cloudflare.com/sandbox/files/save-and-restore-a-workspace/). To save a sandbox each time it stops for inactivity, refer to [Save a sandbox automatically](https://developers.cloudflare.com/sandbox/files/save-a-sandbox-automatically/).

## Mounted buckets outlive every instance

Files in a mounted [R2](https://developers.cloudflare.com/r2/) bucket are objects in that bucket. They remain after every instance stops, and other sandboxes and Workers with access to the bucket can read them. A snapshot does not include mounted directories, and a mount ends with its instance, so each new instance mounts the bucket again.

Use a snapshot for files that belong to one continuing workspace. Use a bucket for files that other systems read, or that must outlive the workspace. To mount a bucket, refer to [Mount an R2 bucket](https://developers.cloudflare.com/sandbox/files/mount-an-r2-bucket/).

## Related resources

- [Sandbox security](https://developers.cloudflare.com/sandbox/concepts/security/)
- [Durable Object Container API](https://developers.cloudflare.com/containers/api/durable-object-container/)
- [Durable Object alarms](https://developers.cloudflare.com/durable-objects/api/alarms/)

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/sandbox/concepts/lifetime/#page","headline":"Sandbox lifetime","description":"Understand what keeps a sandbox running, what stops it, and which files the next instance starts with.","url":"https://developers.cloudflare.com/sandbox/concepts/lifetime/","inLanguage":"en","image":"https://developers.cloudflare.com/sandbox/concepts/lifetime/og.png?v=cd31f8e1a3824d5a","dateModified":"2026-09-30","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
