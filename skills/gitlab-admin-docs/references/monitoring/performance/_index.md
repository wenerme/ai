# GitLab Performance Monitoring

- Tier: Free, Premium, Ultimate
- Offering: GitLab Self-Managed

Detect performance bottlenecks before they affect your users with GitLab Performance
Monitoring. When slow response times or memory issues occur, pinpoint their exact
cause through detailed metrics on SQL queries, Ruby processing, and system resources.

Administrators who implement performance monitoring gain immediate alerts to
potential problems before they cascade into instance-wide issues. Track transaction
times, query execution performance, and memory usage to maintain optimal GitLab
performance for your organization.

For more information on how to configure GitLab Performance Monitoring, see the:

- [Prometheus documentation](../prometheus/_index.md).
- [Grafana configuration](grafana_configuration.md).
- [Performance bar](performance_bar.md).

Two types of metrics are collected:

1. Transaction specific metrics.
1. Sampled metrics.

## Transaction Metrics

Transaction metrics are metrics that can be associated with a single
transaction. This includes statistics such as the transaction duration, timings
of any executed SQL queries, and time spent rendering HAML views. These metrics
are collected for every Rack request and Sidekiq job processed.

## Sampled Metrics

Sampled metrics are metrics that cannot be associated with a single transaction.
Examples include garbage collection statistics and retained Ruby objects. These
metrics are collected at a regular interval. This interval is made up of two
parts:

1. A user defined interval.
1. A randomly generated offset added on top of the interval, the same offset
   can't be used twice in a row.

The actual interval can be anywhere between a half of the defined interval and a
half above the interval. For example, for a user defined interval of 15 seconds
the actual interval can be anywhere between 7.5 and 22.5. The interval is
re-generated for every sampling run instead of being generated one time and reused
for the duration of the process' lifetime.

User defined intervals can be specified by means of environment variables.
The following environment variables are recognized:

- `RUBY_SAMPLER_INTERVAL_SECONDS`
- `DATABASE_SAMPLER_INTERVAL_SECONDS`
- `ACTION_CABLE_SAMPLER_INTERVAL_SECONDS`
- `PUMA_SAMPLER_INTERVAL_SECONDS`
- `THREADS_SAMPLER_INTERVAL_SECONDS`
- `GLOBAL_SEARCH_SAMPLER_INTERVAL_SECONDS`
- `PG_ASH_SAMPLER_INTERVAL_SECONDS`

## Active session history

- Tier: Free, Premium, Ultimate
- Offering: GitLab Self-Managed
- Status: Experiment

- Introduced in GitLab 19.5 as an [experiment](../../../policy/development_stages_support.md).

Active session history samples `pg_stat_activity` on the main database, so you can see what the
database was doing at a point in the past.
GitLab vendors [pg_ash](https://github.com/NikolayS/pg_ash) to collect and store the samples.

This feature is an experiment and is not ready for production use.
Test it outside of production first.

`pg_ash` is not installed by default, and sampling is off by default.

Prerequisites:

- For the database user that GitLab connects as:
  - The `CREATE` privilege on the main database
  - The `SELECT` privilege on `pg_stat_activity` and the `EXECUTE` privilege on
    `pg_stat_get_activity(integer)`

PostgreSQL grants the `pg_stat_activity` privileges to all users by default.
If a privilege is missing, the install Rake task stops and prints the `GRANT` statements
to run as a database superuser.
If the `pg_stat_activity` privileges are missing after the install, the status Rake task
prints the same statements.

Without the privileges of the `pg_read_all_stats` role, `pg_ash` samples only the sessions of
the database user that GitLab connects as.
PostgreSQL hides what the sessions of other users are doing, such as a console session that holds a lock.
In this case, the install Rake task prints a warning with the `GRANT` statement.
The `pg_read_all_stats` role also allows reading the queries and statistics of all database users.

### Linux package (Omnibus)

To install `pg_ash`:

```shell
sudo gitlab-rake gitlab:db:pg_ash:install
```

To check an install:

```shell
sudo gitlab-rake gitlab:db:pg_ash:status
```

To remove `pg_ash` and every sample it holds:

```shell
sudo gitlab-rake gitlab:db:pg_ash:uninstall
```

### Helm chart (Kubernetes)

To install `pg_ash`:

```shell
kubectl exec -it <toolbox-pod-name> -- gitlab-rake gitlab:db:pg_ash:install
```

To check an install:

```shell
kubectl exec -it <toolbox-pod-name> -- gitlab-rake gitlab:db:pg_ash:status
```

To remove `pg_ash` and every sample it holds:

```shell
kubectl exec -it <toolbox-pod-name> -- gitlab-rake gitlab:db:pg_ash:uninstall
```

### Docker

To install `pg_ash`:

```shell
sudo docker exec -t <container-name> gitlab-rake gitlab:db:pg_ash:install
```

To check an install:

```shell
sudo docker exec -t <container-name> gitlab-rake gitlab:db:pg_ash:status
```

To remove `pg_ash` and every sample it holds:

```shell
sudo docker exec -t <container-name> gitlab-rake gitlab:db:pg_ash:uninstall
```

### Self-compiled (source)

To install `pg_ash`:

```shell
sudo -u git -H bundle exec rake gitlab:db:pg_ash:install RAILS_ENV=production
```

To check an install:

```shell
sudo -u git -H bundle exec rake gitlab:db:pg_ash:status RAILS_ENV=production
```

To remove `pg_ash` and every sample it holds:

```shell
sudo -u git -H bundle exec rake gitlab:db:pg_ash:uninstall RAILS_ENV=production
```

Each GitLab version supports one `pg_ash` version.
If the  tab says
that this version of GitLab needs another `pg_ash` version, for example after you upgrade GitLab,
uninstall `pg_ash` and install it again. Uninstalling deletes every sample.

To turn on sampling:

1. Sign in as a user with administrator access.
1. In the upper-right corner, select **Admin**.
1. In the left sidebar, select **Settings** > **Metrics and profiling**.
1. Expand the **Active session history** section.
1. Select the **Turn on session sampling** checkbox.
1. Optional. Change **Sample interval (seconds)**. The default is one second.
1. Select **Save changes**.

A background thread in the Sidekiq process takes the samples.
Only one process samples at a time, so the interval you set is the interval for the whole instance.
Sampling needs the GitLab Prometheus metrics endpoint, which is on by default.
Sampling stops when Sidekiq stops, so a restart or a deployment can lose samples.
If three samples in a row fail, no process tries to sample again for about 90 seconds.

A change to either setting applies without a restart, but not at once.
Each Sidekiq process reads the new value in up to 90 seconds.

`PG_ASH_SAMPLER_INTERVAL_SECONDS` sets how often a Sidekiq process checks whether it should take
over as the sampling process.
It does not set the sample interval.

### View active session history

- [Introduced](https://gitlab.com/gitlab-org/gitlab/-/work_items/608101) as an [experiment](../../../policy/development_stages_support.md#experiment) in GitLab 19.6.

View the load on the main database in a time range, by wait event type, and the queries that caused it.

Prerequisites:

- Administrator access.
- `pg_ash` installed. Session sampling must be turned on to record new activity.

To view active session history:

1. In the upper-right corner, select .
1. In the left sidebar, select  > .
1. Select the  tab.
1. Optional. From the  dropdown list, select a time range.
   The default is the last hour.
   To choose a start and end, select ,
   then select the  and  dates and times.

A time range can be up to 24 hours long, and start up to 30 days ago.
A time range shorter than 61 minutes starts earlier, so that it is 61 minutes long.
The data ends at the last minute that the `pg_ash_rollup_minute_worker` job summarized,
so the newest data is usually one or two minutes old.
The tab shows:

- : The share of the load for each wait event type,
  and the average and peak number of active sessions.
  `CPU*` counts sessions that were active without a wait event.
  These sessions were running on the CPU, or in a part of PostgreSQL that does not report wait events.
- : The queries that caused the most load, across all wait event types.

When a time range starts before the oldest minute summary in `pg_ash`,
for example on the first day after you install it, `pg_ash` reads hourly summaries instead:

- The time range widens to whole hours.
  The current hour has no hourly summary yet, so its load is missing.
-  shows .
- Time without summarized samples, such as before the install or the current hour, counts as no load,
  so averages are lower than the load while sampling ran.

The tab shows only sessions on the primary database, so load on read replicas does not appear.
Sessions of other database users appear only if the GitLab database user has the `pg_read_all_stats` role.

`pg_ash` weights every stored sample by the current sample interval.
If you change the interval, the numbers for earlier time ranges change by the same ratio.
For example, after a change from one to five seconds, earlier load shows five times too high.

#### Query IDs and text

`pg_ash` records the query ID that PostgreSQL reports for each active session.
PostgreSQL computes query IDs when `compute_query_id` is `on`,
or when it is `auto` and the `pg_stat_statements` library is loaded.
Load without a query ID shows as .
This load includes queries that are waiting for a table lock,
because PostgreSQL usually assigns a query ID only after a query gets its table locks.
In , this row also includes the load
from queries outside the top queries of each minute,
or with fewer than three samples in that minute.
On hourly summaries, it also includes queries outside the top 100 of each hour.

The query text comes from the `pg_stat_statements` extension in the main database.
Queries, transaction commands, and schema changes or maintenance that can hold heavy locks,
such as `ALTER TABLE`, `CREATE INDEX`, or `VACUUM`, show their text.
Values, such as strings and numbers, show as placeholders, for example `$1`.
Comments are removed, and names, such as table and column names, show as written.
A query shows  when:

- The extension is not installed or no longer has the query.
- The statement is another type, such as `ALTER ROLE` or `COPY` to a file,
  because these can contain passwords.
- The text contains a backslash. With `standard_conforming_strings` turned off,
  a backslash can change where a value ends.
- The statement has not finished. `pg_stat_statements` stores text only for finished statements,
  so a schema change that is still waiting for a lock shows only its query ID.
  The text appears after the same statement finishes, also for the minutes it spent waiting.

To read a query that does not fit, select .
Query text is limited to 1,000 characters.

### Rollup and retention

While sampling is on, Sidekiq cron jobs summarize and remove old samples:

| Job | Runs | Effect |
|-----|------|--------|
| `pg_ash_rollup_minute_worker` | Every minute | Summarizes raw samples into one row per minute. |
| `pg_ash_rollup_hour_worker` | Every hour | Summarizes minute rows into one row per hour. |
| `pg_ash_rotate_worker` | Every hour from 00:03 to 05:03 | Removes the oldest day of raw samples once a day. The other runs are retries. |
| `pg_ash_rollup_cleanup_worker` | Every hour from 03:07 to 05:07 | Removes minute and hour rows older than their retention. |

Times are in the [cron jobs time zone](../../settings/sidekiq.md#cron-jobs-time-zone), UTC by default.

With the `pg_ash` defaults, raw samples are kept for one full day plus the current day,
minute rows for 30 days, and hour rows for five years.
The retention values are in the `ash.config` table.
An admin setting for them is proposed in
[issue 608100](https://gitlab.com/gitlab-org/gitlab/-/work_items/608100).

Raw samples are removed only after they are summarized.
If a rotation cannot confirm this, it fails and the `gitlab_pg_ash_consecutive_rotate_failures`
metric increases. The `gitlab:db:pg_ash:status` Rake task shows the same counter.

The jobs stop when you turn off sampling. Data collected until then stays until you uninstall `pg_ash`.
