---
title: Schedule tasks
description: Schedule tasks to run in the future — whether that is seconds from now, at a specific date/time, or on a recurring cron schedule. Scheduled tasks survive agent restarts and are persisted to SQLite.
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/agents/api-reference/schedule-tasks.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Schedule tasks

Schedule tasks to run in the future — whether that is seconds from now, at a specific date/time, or on a recurring cron schedule. Scheduled tasks survive agent restarts and are persisted to SQLite.

Scheduled tasks can do anything a request or message from a user can: make requests, query databases, send emails, read and write state. Scheduled tasks can invoke any regular method on your Agent.

## Overview

The scheduling system supports four modes:

| Mode          | Syntax                             | Use case                  |
| ------------- | ---------------------------------- | ------------------------- |
| **Delayed**   | this.schedule(60, ...)             | Run in 60 seconds         |
| **Scheduled** | this.schedule(new Date(...), ...)  | Run at specific time      |
| **Cron**      | this.schedule("0 8 \* \* \*", ...) | Run on recurring schedule |
| **Interval**  | this.scheduleEvery(30, ...)        | Run every 30 seconds      |

Under the hood, scheduling uses [Durable Object alarms](https://developers.cloudflare.com/durable-objects/api/alarms/) to wake the agent at the right time. Tasks are stored in a SQLite table and executed in order.

## Quick start

* [  JavaScript ](#tab-panel-2744)
* [  TypeScript ](#tab-panel-2745)

JavaScript

```

import { Agent } from "agents";


export class ReminderAgent extends Agent {

  async onRequest(request) {

    const url = new URL(request.url);


    // Schedule in 30 seconds

    await this.schedule(30, "sendReminder", {

      message: "Check your email",

    });


    // Schedule at specific time

    await this.schedule(new Date("2025-02-01T09:00:00Z"), "sendReminder", {

      message: "Monthly report due",

    });


    // Schedule recurring (every day at 8am)

    await this.schedule("0 8 * * *", "dailyDigest", {

      userId: url.searchParams.get("userId"),

    });


    return new Response("Scheduled!");

  }


  async sendReminder(payload) {

    console.log(`Reminder: ${payload.message}`);

    // Send notification, email, etc.

  }


  async dailyDigest(payload) {

    console.log(`Sending daily digest to ${payload.userId}`);

    // Generate and send digest

  }

}


```

Explain Code

TypeScript

```

import { Agent } from "agents";


export class ReminderAgent extends Agent {

  async onRequest(request: Request) {

    const url = new URL(request.url);


    // Schedule in 30 seconds

    await this.schedule(30, "sendReminder", {

      message: "Check your email",

    });


    // Schedule at specific time

    await this.schedule(new Date("2025-02-01T09:00:00Z"), "sendReminder", {

      message: "Monthly report due",

    });


    // Schedule recurring (every day at 8am)

    await this.schedule("0 8 * * *", "dailyDigest", {

      userId: url.searchParams.get("userId"),

    });


    return new Response("Scheduled!");

  }


  async sendReminder(payload: { message: string }) {

    console.log(`Reminder: ${payload.message}`);

    // Send notification, email, etc.

  }


  async dailyDigest(payload: { userId: string }) {

    console.log(`Sending daily digest to ${payload.userId}`);

    // Generate and send digest

  }

}


```

Explain Code

## Scheduling modes

### Delayed execution

Pass a number to schedule a task to run after a delay in **seconds**:

* [  JavaScript ](#tab-panel-2726)
* [  TypeScript ](#tab-panel-2727)

JavaScript

```

// Run in 10 seconds

await this.schedule(10, "processTask", { taskId: "123" });


// Run in 5 minutes (300 seconds)

await this.schedule(300, "sendFollowUp", { email: "user@example.com" });


// Run in 1 hour

await this.schedule(3600, "checkStatus", { orderId: "abc" });


```

TypeScript

```

// Run in 10 seconds

await this.schedule(10, "processTask", { taskId: "123" });


// Run in 5 minutes (300 seconds)

await this.schedule(300, "sendFollowUp", { email: "user@example.com" });


// Run in 1 hour

await this.schedule(3600, "checkStatus", { orderId: "abc" });


```

**Use cases:**

* Debouncing rapid events
* Delayed notifications ("You left items in your cart")
* Retry with backoff
* Rate limiting

### Scheduled execution

Pass a `Date` object to schedule a task at a specific time:

* [  JavaScript ](#tab-panel-2730)
* [  TypeScript ](#tab-panel-2731)

JavaScript

```

// Run tomorrow at noon

const tomorrow = new Date();

tomorrow.setDate(tomorrow.getDate() + 1);

tomorrow.setHours(12, 0, 0, 0);

await this.schedule(tomorrow, "sendReminder", { message: "Meeting time!" });


// Run at a specific timestamp

await this.schedule(new Date("2025-06-15T14:30:00Z"), "triggerEvent", {

  eventId: "conference-2025",

});


// Run in 2 hours using Date math

const twoHoursFromNow = new Date(Date.now() + 2 * 60 * 60 * 1000);

await this.schedule(twoHoursFromNow, "checkIn", {});


```

Explain Code

TypeScript

```

// Run tomorrow at noon

const tomorrow = new Date();

tomorrow.setDate(tomorrow.getDate() + 1);

tomorrow.setHours(12, 0, 0, 0);

await this.schedule(tomorrow, "sendReminder", { message: "Meeting time!" });


// Run at a specific timestamp

await this.schedule(new Date("2025-06-15T14:30:00Z"), "triggerEvent", {

  eventId: "conference-2025",

});


// Run in 2 hours using Date math

const twoHoursFromNow = new Date(Date.now() + 2 * 60 * 60 * 1000);

await this.schedule(twoHoursFromNow, "checkIn", {});


```

Explain Code

**Use cases:**

* Appointment reminders
* Deadline notifications
* Scheduled content publishing
* Time-based triggers

### Recurring (cron)

Pass a cron expression string for recurring schedules:

* [  JavaScript ](#tab-panel-2734)
* [  TypeScript ](#tab-panel-2735)

JavaScript

```

// Every day at 8:00 AM

await this.schedule("0 8 * * *", "dailyReport", {});


// Every hour

await this.schedule("0 * * * *", "hourlyCheck", {});


// Every Monday at 9:00 AM

await this.schedule("0 9 * * 1", "weeklySync", {});


// Every 15 minutes

await this.schedule("*/15 * * * *", "pollForUpdates", {});


// First day of every month at midnight

await this.schedule("0 0 1 * *", "monthlyCleanup", {});


```

Explain Code

TypeScript

```

// Every day at 8:00 AM

await this.schedule("0 8 * * *", "dailyReport", {});


// Every hour

await this.schedule("0 * * * *", "hourlyCheck", {});


// Every Monday at 9:00 AM

await this.schedule("0 9 * * 1", "weeklySync", {});


// Every 15 minutes

await this.schedule("*/15 * * * *", "pollForUpdates", {});


// First day of every month at midnight

await this.schedule("0 0 1 * *", "monthlyCleanup", {});


```

Explain Code

**Cron syntax:** `minute hour day month weekday`

| Field        | Values         | Special characters |
| ------------ | -------------- | ------------------ |
| Minute       | 0-59           | \* , \- /          |
| Hour         | 0-23           | \* , \- /          |
| Day of Month | 1-31           | \* , \- /          |
| Month        | 1-12           | \* , \- /          |
| Day of Week  | 0-6 (0=Sunday) | \* , \- /          |

**Common patterns:**

* [  JavaScript ](#tab-panel-2728)
* [  TypeScript ](#tab-panel-2729)

JavaScript

```

"* * * * *"; // Every minute

"*/5 * * * *"; // Every 5 minutes

"0 * * * *"; // Every hour (on the hour)

"0 0 * * *"; // Every day at midnight

"0 8 * * 1-5"; // Weekdays at 8am

"0 0 * * 0"; // Every Sunday at midnight

"0 0 1 * *"; // First of every month


```

TypeScript

```

"* * * * *"; // Every minute

"*/5 * * * *"; // Every 5 minutes

"0 * * * *"; // Every hour (on the hour)

"0 0 * * *"; // Every day at midnight

"0 8 * * 1-5"; // Weekdays at 8am

"0 0 * * 0"; // Every Sunday at midnight

"0 0 1 * *"; // First of every month


```

**Use cases:**

* Daily/weekly reports
* Periodic cleanup jobs
* Polling external services
* Health checks
* Subscription renewals

### Interval

Use `scheduleEvery()` to run a task at fixed intervals (in seconds). Unlike cron, intervals support sub-minute precision and arbitrary durations:

* [  JavaScript ](#tab-panel-2732)
* [  TypeScript ](#tab-panel-2733)

JavaScript

```

// Poll every 30 seconds

await this.scheduleEvery(30, "poll", { source: "api" });


// Health check every 45 seconds

await this.scheduleEvery(45, "healthCheck", {});


// Sync every 90 seconds (1.5 minutes - cannot be expressed in cron)

await this.scheduleEvery(90, "syncData", { destination: "warehouse" });


```

TypeScript

```

// Poll every 30 seconds

await this.scheduleEvery(30, "poll", { source: "api" });


// Health check every 45 seconds

await this.scheduleEvery(45, "healthCheck", {});


// Sync every 90 seconds (1.5 minutes - cannot be expressed in cron)

await this.scheduleEvery(90, "syncData", { destination: "warehouse" });


```

**Key differences from cron:**

| Feature             | Cron                                  | Interval               |
| ------------------- | ------------------------------------- | ---------------------- |
| Minimum granularity | 1 minute                              | 1 second               |
| Arbitrary intervals | No (must fit cron pattern)            | Yes                    |
| Fixed schedule      | Yes (for example, "every day at 8am") | No (relative to start) |
| Overlap prevention  | No                                    | Yes (built-in)         |

**Overlap prevention:**

If a callback takes longer than the interval, the next execution is skipped (not queued). This prevents runaway resource usage:

* [  JavaScript ](#tab-panel-2738)
* [  TypeScript ](#tab-panel-2739)

JavaScript

```

class PollingAgent extends Agent {

  async poll() {

    // If this takes 45 seconds and interval is 30 seconds,

    // the next poll is skipped (with a warning logged)

    const data = await slowExternalApi();

    await this.processData(data);

  }

}


// Set up 30-second interval

await this.scheduleEvery(30, "poll", {});


```

Explain Code

TypeScript

```

class PollingAgent extends Agent {

  async poll() {

    // If this takes 45 seconds and interval is 30 seconds,

    // the next poll is skipped (with a warning logged)

    const data = await slowExternalApi();

    await this.processData(data);

  }

}


// Set up 30-second interval

await this.scheduleEvery(30, "poll", {});


```

Explain Code

When a skip occurs, you will see a warning in logs:

```

Skipping interval schedule abc123: previous execution still running


```

**Error resilience:**

If the callback throws an error, the interval continues — only that execution fails:

* [  JavaScript ](#tab-panel-2736)
* [  TypeScript ](#tab-panel-2737)

JavaScript

```

class SyncAgent extends Agent {

  async syncData() {

    // Even if this throws, the interval keeps running

    const response = await fetch("https://api.example.com/data");

    if (!response.ok) throw new Error("Sync failed");

    // ...

  }

}


```

TypeScript

```

class SyncAgent extends Agent {

  async syncData() {

    // Even if this throws, the interval keeps running

    const response = await fetch("https://api.example.com/data");

    if (!response.ok) throw new Error("Sync failed");

    // ...

  }

}


```

**Use cases:**

* Sub-minute polling (every 10, 30, 45 seconds)
* Intervals that do not map to cron (every 90 seconds, every 7 minutes)
* Rate-limited API polling with precise control
* Real-time data synchronization

## Managing scheduled tasks

### Get a schedule

Retrieve a scheduled task by its ID:

* [  JavaScript ](#tab-panel-2740)
* [  TypeScript ](#tab-panel-2741)

JavaScript

```

const schedule = this.getSchedule(scheduleId);


if (schedule) {

  console.log(

    `Task ${schedule.id} will run at ${new Date(schedule.time * 1000)}`,

  );

  console.log(`Callback: ${schedule.callback}`);

  console.log(`Type: ${schedule.type}`); // "scheduled" | "delayed" | "cron" | "interval"

} else {

  console.log("Schedule not found");

}


```

Explain Code

TypeScript

```

const schedule = this.getSchedule(scheduleId);


if (schedule) {

  console.log(

    `Task ${schedule.id} will run at ${new Date(schedule.time * 1000)}`,

  );

  console.log(`Callback: ${schedule.callback}`);

  console.log(`Type: ${schedule.type}`); // "scheduled" | "delayed" | "cron" | "interval"

} else {

  console.log("Schedule not found");

}


```

Explain Code

### List schedules

Query scheduled tasks with optional filters:

* [  JavaScript ](#tab-panel-2750)
* [  TypeScript ](#tab-panel-2751)

JavaScript

```

// Get all scheduled tasks

const allSchedules = this.getSchedules();


// Get only cron jobs

const cronJobs = this.getSchedules({ type: "cron" });


// Get tasks in the next hour

const upcoming = this.getSchedules({

  timeRange: {

    start: new Date(),

    end: new Date(Date.now() + 60 * 60 * 1000),

  },

});


// Get a specific task by ID

const specific = this.getSchedules({ id: "abc123" });


// Combine filters

const upcomingCronJobs = this.getSchedules({

  type: "cron",

  timeRange: {

    start: new Date(),

    end: new Date(Date.now() + 24 * 60 * 60 * 1000),

  },

});


```

Explain Code

TypeScript

```

// Get all scheduled tasks

const allSchedules = this.getSchedules();


// Get only cron jobs

const cronJobs = this.getSchedules({ type: "cron" });


// Get tasks in the next hour

const upcoming = this.getSchedules({

  timeRange: {

    start: new Date(),

    end: new Date(Date.now() + 60 * 60 * 1000),

  },

});


// Get a specific task by ID

const specific = this.getSchedules({ id: "abc123" });


// Combine filters

const upcomingCronJobs = this.getSchedules({

  type: "cron",

  timeRange: {

    start: new Date(),

    end: new Date(Date.now() + 24 * 60 * 60 * 1000),

  },

});


```

Explain Code

### Cancel a schedule

Remove a scheduled task before it executes:

* [  JavaScript ](#tab-panel-2742)
* [  TypeScript ](#tab-panel-2743)

JavaScript

```

const cancelled = await this.cancelSchedule(scheduleId);


if (cancelled) {

  console.log("Schedule cancelled successfully");

} else {

  console.log("Schedule not found (may have already executed)");

}


```

TypeScript

```

const cancelled = await this.cancelSchedule(scheduleId);


if (cancelled) {

  console.log("Schedule cancelled successfully");

} else {

  console.log("Schedule not found (may have already executed)");

}


```

**Example: Cancellable reminders**

* [  JavaScript ](#tab-panel-2762)
* [  TypeScript ](#tab-panel-2763)

JavaScript

```

class ReminderAgent extends Agent {

  async setReminder(userId, message, delaySeconds) {

    const schedule = await this.schedule(delaySeconds, "sendReminder", {

      userId,

      message,

    });


    // Store the schedule ID so user can cancel later

    this.sql`

      INSERT INTO user_reminders (user_id, schedule_id, message)

      VALUES (${userId}, ${schedule.id}, ${message})

    `;


    return schedule.id;

  }


  async cancelReminder(scheduleId) {

    const cancelled = await this.cancelSchedule(scheduleId);


    if (cancelled) {

      this.sql`DELETE FROM user_reminders WHERE schedule_id = ${scheduleId}`;

    }


    return cancelled;

  }


  async sendReminder(payload) {

    // Send the reminder...


    // Clean up the record

    this.sql`DELETE FROM user_reminders WHERE user_id = ${payload.userId}`;

  }

}


```

Explain Code

TypeScript

```

class ReminderAgent extends Agent {

  async setReminder(userId: string, message: string, delaySeconds: number) {

    const schedule = await this.schedule(delaySeconds, "sendReminder", {

      userId,

      message,

    });


    // Store the schedule ID so user can cancel later

    this.sql`

      INSERT INTO user_reminders (user_id, schedule_id, message)

      VALUES (${userId}, ${schedule.id}, ${message})

    `;


    return schedule.id;

  }


  async cancelReminder(scheduleId: string) {

    const cancelled = await this.cancelSchedule(scheduleId);


    if (cancelled) {

      this.sql`DELETE FROM user_reminders WHERE schedule_id = ${scheduleId}`;

    }


    return cancelled;

  }


  async sendReminder(payload: { userId: string; message: string }) {

    // Send the reminder...


    // Clean up the record

    this.sql`DELETE FROM user_reminders WHERE user_id = ${payload.userId}`;

  }

}


```

Explain Code

## The Schedule object

When you create or retrieve a schedule, you get a `Schedule` object:

TypeScript

```

type Schedule<T> = {

  id: string; // Unique identifier

  callback: string; // Method name to call

  payload: T; // Data passed to the callback

  time: number; // Unix timestamp (seconds) of next execution

} & (

  | { type: "scheduled" } // One-time at specific date

  | { type: "delayed"; delayInSeconds: number } // One-time after delay

  | { type: "cron"; cron: string } // Recurring (cron expression)

  | { type: "interval"; intervalSeconds: number } // Recurring (fixed interval)

);


```

Explain Code

**Example:**

* [  JavaScript ](#tab-panel-2746)
* [  TypeScript ](#tab-panel-2747)

JavaScript

```

const schedule = await this.schedule(60, "myTask", { foo: "bar" });


console.log(schedule);

// {

//   id: "abc123xyz",

//   callback: "myTask",

//   payload: { foo: "bar" },

//   time: 1706745600,

//   type: "delayed",

//   delayInSeconds: 60

// }


```

Explain Code

TypeScript

```

const schedule = await this.schedule(60, "myTask", { foo: "bar" });


console.log(schedule);

// {

//   id: "abc123xyz",

//   callback: "myTask",

//   payload: { foo: "bar" },

//   time: 1706745600,

//   type: "delayed",

//   delayInSeconds: 60

// }


```

Explain Code

## Patterns

### Rescheduling from callbacks

For dynamic recurring schedules, schedule the next run from within the callback:

* [  JavaScript ](#tab-panel-2760)
* [  TypeScript ](#tab-panel-2761)

JavaScript

```

class PollingAgent extends Agent {

  async startPolling(intervalSeconds) {

    await this.schedule(intervalSeconds, "poll", { interval: intervalSeconds });

  }


  async poll(payload) {

    try {

      const data = await fetch("https://api.example.com/updates");

      await this.processUpdates(await data.json());

    } catch (error) {

      console.error("Polling failed:", error);

    }


    // Schedule the next poll (regardless of success/failure)

    await this.schedule(payload.interval, "poll", payload);

  }


  async stopPolling() {

    // Cancel all polling schedules

    const schedules = this.getSchedules({ type: "delayed" });

    for (const schedule of schedules) {

      if (schedule.callback === "poll") {

        await this.cancelSchedule(schedule.id);

      }

    }

  }

}


```

Explain Code

TypeScript

```

class PollingAgent extends Agent {

  async startPolling(intervalSeconds: number) {

    await this.schedule(intervalSeconds, "poll", { interval: intervalSeconds });

  }


  async poll(payload: { interval: number }) {

    try {

      const data = await fetch("https://api.example.com/updates");

      await this.processUpdates(await data.json());

    } catch (error) {

      console.error("Polling failed:", error);

    }


    // Schedule the next poll (regardless of success/failure)

    await this.schedule(payload.interval, "poll", payload);

  }


  async stopPolling() {

    // Cancel all polling schedules

    const schedules = this.getSchedules({ type: "delayed" });

    for (const schedule of schedules) {

      if (schedule.callback === "poll") {

        await this.cancelSchedule(schedule.id);

      }

    }

  }

}


```

Explain Code

### Exponential backoff retry

* [  JavaScript ](#tab-panel-2764)
* [  TypeScript ](#tab-panel-2765)

JavaScript

```

class RetryAgent extends Agent {

  async attemptTask(payload) {

    try {

      await this.doWork(payload.taskId);

      console.log(

        `Task ${payload.taskId} succeeded on attempt ${payload.attempt}`,

      );

    } catch (error) {

      if (payload.attempt >= payload.maxAttempts) {

        console.error(

          `Task ${payload.taskId} failed after ${payload.maxAttempts} attempts`,

        );

        return;

      }


      // Exponential backoff: 2^attempt seconds (2s, 4s, 8s, 16s...)

      const delaySeconds = Math.pow(2, payload.attempt);


      await this.schedule(delaySeconds, "attemptTask", {

        ...payload,

        attempt: payload.attempt + 1,

      });


      console.log(`Retrying task ${payload.taskId} in ${delaySeconds}s`);

    }

  }


  async doWork(taskId) {

    // Your actual work here

  }

}


```

Explain Code

TypeScript

```

class RetryAgent extends Agent {

  async attemptTask(payload: {

    taskId: string;

    attempt: number;

    maxAttempts: number;

  }) {

    try {

      await this.doWork(payload.taskId);

      console.log(

        `Task ${payload.taskId} succeeded on attempt ${payload.attempt}`,

      );

    } catch (error) {

      if (payload.attempt >= payload.maxAttempts) {

        console.error(

          `Task ${payload.taskId} failed after ${payload.maxAttempts} attempts`,

        );

        return;

      }


      // Exponential backoff: 2^attempt seconds (2s, 4s, 8s, 16s...)

      const delaySeconds = Math.pow(2, payload.attempt);


      await this.schedule(delaySeconds, "attemptTask", {

        ...payload,

        attempt: payload.attempt + 1,

      });


      console.log(`Retrying task ${payload.taskId} in ${delaySeconds}s`);

    }

  }


  async doWork(taskId: string) {

    // Your actual work here

  }

}


```

Explain Code

### Self-destructing agents

You can safely call `this.destroy()` from within a scheduled callback:

* [  JavaScript ](#tab-panel-2752)
* [  TypeScript ](#tab-panel-2753)

JavaScript

```

class TemporaryAgent extends Agent {

  async onStart() {

    // Self-destruct in 24 hours

    await this.schedule(24 * 60 * 60, "cleanup", {});

  }


  async cleanup() {

    // Perform final cleanup

    console.log("Agent lifetime expired, cleaning up...");


    // This is safe to call from a scheduled callback

    await this.destroy();

  }

}


```

Explain Code

TypeScript

```

class TemporaryAgent extends Agent {

  async onStart() {

    // Self-destruct in 24 hours

    await this.schedule(24 * 60 * 60, "cleanup", {});

  }


  async cleanup() {

    // Perform final cleanup

    console.log("Agent lifetime expired, cleaning up...");


    // This is safe to call from a scheduled callback

    await this.destroy();

  }

}


```

Explain Code

Note

When `destroy()` is called from within a scheduled task, the Agent SDK defers the destruction to ensure the scheduled callback completes successfully. The Agent instance will be evicted immediately after the callback finishes executing.

## AI-assisted scheduling

The SDK includes utilities for parsing natural language scheduling requests with AI.

### `getSchedulePrompt()`

Returns a system prompt for parsing natural language into scheduling parameters:

* [  JavaScript ](#tab-panel-2766)
* [  TypeScript ](#tab-panel-2767)

JavaScript

```

import { getSchedulePrompt, scheduleSchema } from "agents";

import { generateObject } from "ai";

import { openai } from "@ai-sdk/openai";


class SmartScheduler extends Agent {

  async parseScheduleRequest(userInput) {

    const result = await generateObject({

      model: openai("gpt-4o"),

      system: getSchedulePrompt({ date: new Date() }),

      prompt: userInput,

      schema: scheduleSchema,

    });


    return result.object;

  }


  async handleUserRequest(input) {

    // Parse: "remind me to call mom tomorrow at 3pm"

    const parsed = await this.parseScheduleRequest(input);


    // parsed = {

    //   description: "call mom",

    //   when: {

    //     type: "scheduled",

    //     date: "2025-01-30T15:00:00Z"

    //   }

    // }


    if (parsed.when.type === "scheduled" && parsed.when.date) {

      await this.schedule(new Date(parsed.when.date), "sendReminder", {

        message: parsed.description,

      });

    } else if (parsed.when.type === "delayed" && parsed.when.delayInSeconds) {

      await this.schedule(parsed.when.delayInSeconds, "sendReminder", {

        message: parsed.description,

      });

    } else if (parsed.when.type === "cron" && parsed.when.cron) {

      await this.schedule(parsed.when.cron, "sendReminder", {

        message: parsed.description,

      });

    }

  }


  async sendReminder(payload) {

    console.log(`Reminder: ${payload.message}`);

  }

}


```

Explain Code

TypeScript

```

import { getSchedulePrompt, scheduleSchema } from "agents";

import { generateObject } from "ai";

import { openai } from "@ai-sdk/openai";


class SmartScheduler extends Agent {

  async parseScheduleRequest(userInput: string) {

    const result = await generateObject({

      model: openai("gpt-4o"),

      system: getSchedulePrompt({ date: new Date() }),

      prompt: userInput,

      schema: scheduleSchema,

    });


    return result.object;

  }


  async handleUserRequest(input: string) {

    // Parse: "remind me to call mom tomorrow at 3pm"

    const parsed = await this.parseScheduleRequest(input);


    // parsed = {

    //   description: "call mom",

    //   when: {

    //     type: "scheduled",

    //     date: "2025-01-30T15:00:00Z"

    //   }

    // }


    if (parsed.when.type === "scheduled" && parsed.when.date) {

      await this.schedule(new Date(parsed.when.date), "sendReminder", {

        message: parsed.description,

      });

    } else if (parsed.when.type === "delayed" && parsed.when.delayInSeconds) {

      await this.schedule(parsed.when.delayInSeconds, "sendReminder", {

        message: parsed.description,

      });

    } else if (parsed.when.type === "cron" && parsed.when.cron) {

      await this.schedule(parsed.when.cron, "sendReminder", {

        message: parsed.description,

      });

    }

  }


  async sendReminder(payload: { message: string }) {

    console.log(`Reminder: ${payload.message}`);

  }

}


```

Explain Code

### `scheduleSchema`

A Zod schema for validating parsed scheduling data. Uses a discriminated union on `when.type` so each variant only contains the fields it needs:

* [  JavaScript ](#tab-panel-2756)
* [  TypeScript ](#tab-panel-2757)

JavaScript

```

import { scheduleSchema } from "agents";


// The schema is a discriminated union:

// {

//   description: string,

//   when:

//     | { type: "scheduled", date: string }       // ISO 8601 date string

//     | { type: "delayed", delayInSeconds: number }

//     | { type: "cron", cron: string }

//     | { type: "no-schedule" }

// }


```

Explain Code

TypeScript

```

import { scheduleSchema } from "agents";


// The schema is a discriminated union:

// {

//   description: string,

//   when:

//     | { type: "scheduled", date: string }       // ISO 8601 date string

//     | { type: "delayed", delayInSeconds: number }

//     | { type: "cron", cron: string }

//     | { type: "no-schedule" }

// }


```

Explain Code

Note

Dates are returned as ISO 8601 strings (not `Date` objects) for compatibility with both Zod v3 and v4 JSON schema generation.

## Scheduling vs Queue vs Workflows

| Feature            | Queue              | Scheduling        | Workflows           |
| ------------------ | ------------------ | ----------------- | ------------------- |
| **When**           | Immediately (FIFO) | Future time       | Future time         |
| **Execution**      | Sequential         | At scheduled time | Multi-step          |
| **Retries**        | Built-in           | Built-in          | Automatic           |
| **Persistence**    | SQLite             | SQLite            | Workflow engine     |
| **Recurring**      | No                 | Yes (cron)        | No (use scheduling) |
| **Complex logic**  | No                 | No                | Yes                 |
| **Human approval** | No                 | No                | Yes                 |

Use Queue when:

* You need background processing without blocking the response
* Tasks should run ASAP but do not need to block
* Order matters (FIFO)

Use Scheduling when:

* Tasks need to run at a specific time
* You need recurring jobs (cron)
* Delayed execution (debouncing, retries)

Use Workflows when:

* Multi-step processes with dependencies
* Automatic retries with backoff
* Human-in-the-loop approvals
* Long-running tasks (minutes to hours)

## API reference

### `schedule()`

TypeScript

```

async schedule<T>(

  when: Date | string | number,

  callback: keyof this,

  payload?: T,

  options?: { retry?: RetryOptions }

): Promise<Schedule<T>>


```

Schedule a task for future execution.

**Parameters:**

* `when` \- When to execute: `number` (seconds delay), `Date` (specific time), or `string` (cron expression)
* `callback` \- Name of the method to call
* `payload` \- Data to pass to the callback (must be JSON-serializable)
* `options.retry` \- Optional retry configuration. Refer to [Retries](https://developers.cloudflare.com/agents/api-reference/retries/) for details.

**Returns:** A `Schedule` object with the task details

Warning

Tasks that set a callback for a method that does not exist will throw an exception. Ensure that the method named in the `callback` argument exists on your `Agent` class.

### `scheduleEvery()`

TypeScript

```

async scheduleEvery<T>(

  intervalSeconds: number,

  callback: keyof this,

  payload?: T,

  options?: { retry?: RetryOptions }

): Promise<Schedule<T>>


```

Schedule a task to run repeatedly at a fixed interval.

**Parameters:**

* `intervalSeconds` \- Number of seconds between executions (must be greater than 0)
* `callback` \- Name of the method to call
* `payload` \- Data to pass to the callback (must be JSON-serializable)
* `options.retry` \- Optional retry configuration. Refer to [Retries](https://developers.cloudflare.com/agents/api-reference/retries/) for details.

**Returns:** A `Schedule` object with `type: "interval"`

**Behavior:**

* First execution occurs after `intervalSeconds` (not immediately)
* If callback is still running when next execution is due, it is skipped (overlap prevention)
* If callback throws an error, the interval continues
* Cancel with `cancelSchedule(id)` to stop the entire interval

### `getSchedule()`

TypeScript

```

getSchedule<T>(id: string): Schedule<T> | undefined


```

Get a scheduled task by ID. Returns `undefined` if not found. This method is synchronous.

### `getSchedules()`

TypeScript

```

getSchedules<T>(criteria?: {

  id?: string;

  type?: "scheduled" | "delayed" | "cron" | "interval";

  timeRange?: { start?: Date; end?: Date };

}): Schedule<T>[]


```

Get scheduled tasks matching the criteria. This method is synchronous.

### `cancelSchedule()`

TypeScript

```

async cancelSchedule(id: string): Promise<boolean>


```

Cancel a scheduled task. Returns `true` if cancelled, `false` if not found.

### `keepAlive()`

TypeScript

```

async keepAlive(): Promise<() => void>


```

Prevent the Durable Object from being evicted due to inactivity by creating a 30-second heartbeat schedule. Returns a disposer function that cancels the heartbeat when called. The disposer is idempotent — calling it multiple times is safe.

Always call the disposer when the work is done — otherwise the heartbeat continues indefinitely.

* [  JavaScript ](#tab-panel-2754)
* [  TypeScript ](#tab-panel-2755)

JavaScript

```

const dispose = await this.keepAlive();

try {

  // Long-running work that must not be interrupted

  const result = await longRunningComputation();

  await sendResults(result);

} finally {

  dispose();

}


```

TypeScript

```

const dispose = await this.keepAlive();

try {

  // Long-running work that must not be interrupted

  const result = await longRunningComputation();

  await sendResults(result);

} finally {

  dispose();

}


```

### `keepAliveWhile()`

TypeScript

```

async keepAliveWhile<T>(fn: () => Promise<T>): Promise<T>


```

Run an async function while keeping the Durable Object alive. The heartbeat is automatically started before the function runs and stopped when it completes (whether it succeeds or throws). Returns the value returned by the function.

This is the recommended way to use `keepAlive` — it guarantees cleanup.

* [  JavaScript ](#tab-panel-2748)
* [  TypeScript ](#tab-panel-2749)

JavaScript

```

const result = await this.keepAliveWhile(async () => {

  const data = await longRunningComputation();

  return data;

});


```

TypeScript

```

const result = await this.keepAliveWhile(async () => {

  const data = await longRunningComputation();

  return data;

});


```

## Keeping the agent alive

Durable Objects are evicted after a period of inactivity (typically 70-140 seconds with no incoming requests, WebSocket messages, or alarms). During long-running operations — streaming LLM responses, waiting on external APIs, running multi-step computations — the agent can be evicted mid-flight.

`keepAlive()` prevents this by creating a 30-second heartbeat schedule. The internal heartbeat callback is a no-op — the alarm firing itself is what resets the inactivity timer. Because it uses the scheduling system:

* The heartbeat does not conflict with your own schedules (the scheduling system multiplexes through a single alarm slot)
* The heartbeat shows up in `getSchedules()` if you need to inspect it
* Multiple concurrent `keepAlive()` calls each get their own schedule, so they do not interfere with each other

### Multiple concurrent callers

Each `keepAlive()` call returns an independent disposer:

* [  JavaScript ](#tab-panel-2758)
* [  TypeScript ](#tab-panel-2759)

JavaScript

```

const dispose1 = await this.keepAlive();

const dispose2 = await this.keepAlive();


// Both heartbeats are active

dispose1(); // Only cancels the first heartbeat

// Agent is still alive via dispose2's heartbeat


dispose2(); // Now the agent can go idle


```

TypeScript

```

const dispose1 = await this.keepAlive();

const dispose2 = await this.keepAlive();


// Both heartbeats are active

dispose1(); // Only cancels the first heartbeat

// Agent is still alive via dispose2's heartbeat


dispose2(); // Now the agent can go idle


```

### AIChatAgent

`AIChatAgent` automatically calls `keepAlive()` during streaming responses. You do not need to add it yourself when using `AIChatAgent` — every LLM stream is protected from idle eviction by default.

### When to use keepAlive

| Scenario                                    | Use keepAlive?                         |
| ------------------------------------------- | -------------------------------------- |
| Streaming LLM responses via AIChatAgent     | No — already built in                  |
| Long-running computation in a custom Agent  | Yes                                    |
| Waiting on a slow external API call         | Yes                                    |
| Multi-step tool execution                   | Yes                                    |
| Short request-response handlers             | No — not needed                        |
| Background work via scheduling or workflows | No — alarms already keep the DO active |

Note

`keepAlive()` is marked `@experimental` and may change between releases.

## Limits

* **Maximum tasks:** Limited by SQLite storage (each task is a row). Practical limit is tens of thousands per agent.
* **Task size:** Each task (including payload) can be up to 2MB.
* **Minimum delay:** 0 seconds (runs on next alarm tick)
* **Cron precision:** Minute-level (not seconds)
* **Interval precision:** Second-level
* **Cron jobs:** After execution, automatically rescheduled for the next occurrence
* **Interval jobs:** After execution, rescheduled for `now + intervalSeconds`; skipped if still running

## Next steps

[ Queue tasks ](https://developers.cloudflare.com/agents/api-reference/queue-tasks/) Immediate background task processing. 

[ Run Workflows ](https://developers.cloudflare.com/agents/api-reference/run-workflows/) Durable multi-step background processing. 

[ Agents API ](https://developers.cloudflare.com/agents/api-reference/agents-api/) Complete API reference for the Agents SDK. 

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/agents/","name":"Agents"}},{"@type":"ListItem","position":3,"item":{"@id":"/agents/api-reference/","name":"API Reference"}},{"@type":"ListItem","position":4,"item":{"@id":"/agents/api-reference/schedule-tasks/","name":"Schedule tasks"}}]}
```
