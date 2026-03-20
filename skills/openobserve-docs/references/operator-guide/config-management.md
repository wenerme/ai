---
title: Custom Configuration File and Dynamic Reloading in OpenObserve
description: Learn how to use custom config paths and dynamic config reloading in OpenObserve to apply changes without restarts.
---
This guide explains how to use custom configuration file locations and
dynamic configuration reloading in OpenObserve to manage deployments
without system restarts.

## Overview
Earlier versions of OpenObserve only read the **.env** file from the current
directory with no way to specify a different path. When running
OpenObserve in different deployment modes (Kubernetes, virtual machines,
and systemd services) existing frameworks require config files in
specific locations. 
Additionally, when configuration changes are needed, you need to restart
the whole cluster or the system, which is expensive. They cause
downtime, drop capacity and bandwidth, and you do not want to restart
your whole cluster just to change a simple configuration like increasing
an interval by 2 seconds.

OpenObserve now provides a custom config file CLI argument (`-c` or
`--config`) to specify config files at any location, and a Config Watcher
that monitors the config file and automatically reloads specific
configurations every 30 seconds without requiring a restart.

!!! note "Who should use this"
    These features are for you if you:

    -   Deploy OpenObserve on virtual machines (VMs)
    -   Run OpenObserve as systemd services or system daemons
    -   Use custom deployment frameworks without container orchestration tools like Kubernetes
    -   Need to avoid expensive restarts that cause downtime

!!! note "Who does NOT need this"
    You do not need these features if you:

    -   Deploy OpenObserve in Kubernetes clusters
    -   Use container orchestration platforms

    **Why Kubernetes users do not need this**
    
    In Kubernetes deployments:

    -   Configurations are managed through ConfigMaps, Secrets, and environment variables in YAML manifests
    -   Any configuration change automatically triggers pod restarts and rollouts
    -   Kubernetes handles configuration updates through its native mechanisms
    -   The .env file pattern is not used in containerized deployments

## Custom config file CLI argument

### What it does
It adds a CLI argument to the OpenObserve binary that allows you to pass
a path to a config file, adding flexibility to load environment
variables from different files. Earlier versions strictly looked for the
.env file in the current directory.

### How to use

```bash linenums="1"
# Short form
./openobserve -c /path/to/your/config/file

```

```bash linenums="1"
# Long form
./openobserve --config /path/to/your/config/file
```

## Dynamic configuration reload

### What it does
It adds a job to watch the config file. The watcher monitors the config
file and reloads the configuration if any changes are detected, allowing
configuration updates without restarting OpenObserve.

### How it works

-   Runs every 30 seconds by default (configurable via `ZO_CONFIG_WATCHER_INTERVAL` environment variable)
-   Watches the active config file (.env by default, or custom file if specified using `-c` flag)
-   Detects changes to configuration values
-   Automatically reloads changes for reloadable configurations only
-   If no config file exists, the watcher remains inactive

### Workflow example

1.  OpenObserve is running with a config file
2.  Edit the config file and change a reloadable configuration (for example, stream stats interval from 2 to 5 seconds)
3.  Wait up to 30 seconds
4.  Change is applied automatically without any restart and downtime

### Limitation: Only specific configs are reloadable

Any configuration not in the list below requires a full OpenObserve
restart to take effect.

### Reloadable environment variables
| Category | Environment Variables |
|----------|----------------------|
| **Data Processing Intervals** | - ZO_FILE_PUSH_INTERVAL- ZO_MEM_PERSIST_INTERVAL- ZO_COMPACT_INTERVAL- ZO_COMPACT_OLD_DATA_INTERVAL- ZO_COMPACT_SYNC_TO_DB_INTERVAL- ZO_COMPACT_JOB_RUN_TIMEOUT- ZO_COMPACT_JOB_CLEAN_WAIT_TIME- ZO_COMPACT_PENDING_JOBS_METRIC_INTERVAL |
| **Cache Management** | - ZO_MEMORY_CACHE_GC_INTERVAL- ZO_MEMORY_CACHE_MAX_SIZE- ZO_MEMORY_CACHE_DATAFUSION_MAX_SIZE- ZO_DISK_CACHE_GC_INTERVAL- ZO_DISK_CACHE_MAX_SIZE- ZO_DISK_CACHE_SKIP_SIZE- ZO_DISK_CACHE_RELEASE_SIZE- ZO_DISK_CACHE_GC_SIZE- ZO_S3_SYNC_TO_CACHE_INTERVAL |
| **Metrics and Monitoring** | - ZO_METRICS_LEADER_PUSH_INTERVAL- ZO_METRICS_LEADER_ELECTION_INTERVAL- ZO_CALCULATE_STATS_INTERVAL- ZO_CALCULATE_STATS_STEP_LIMIT- ZO_TELEMETRY_HEARTBEAT |
| **Scheduling** | - ZO_ALERT_SCHEDULE_INTERVAL- ZO_DERIVED_STREAM_SCHEDULE_INTERVAL- ZO_SCHEDULER_CLEAN_INTERVAL- ZO_SCHEDULER_WATCH_INTERVAL- ZO_SEARCH_JOB_SCHEDULE_INTERVAL- ZO_SEARCH_JOB_SCHEDULER_INTERVAL- ZO_DISTINCT_VALUES_INTERVAL |
| **Job and Process Timeouts** | - ZO_SEARCH_JOB_TIMEOUT- ZO_SEARCH_JOB_RUN_TIMEOUT- ZO_SEARCH_JOB_RETENTION- ZO_SEARCH_JOB_DELETE_INTERVAL- ZO_HEALTH_CHECK_TIMEOUT |
| **Memory and Buffer Sizes** | - ZO_MEMORY_CACHE_SKIP_SIZE- ZO_MEMORY_CACHE_RELEASE_SIZE- ZO_MEMORY_CACHE_GC_SIZE- ZO_MEM_TABLE_MAX_SIZE |
| **File Sizes** | - ZO_MAX_FILE_SIZE_ON_DISK- ZO_MAX_FILE_SIZE_IN_MEMORY- ZO_MAX_FILE_RETENTION_TIME- ZO_COMPACT_MAX_FILE_SIZE |
| **Network and Protocol Sizes** | - ZO_STREAMING_RESPONSE_CHUNK_SIZE_MB |
| **Batch Sizes** | - ZO_COMPACT_BATCH_SIZE- ZO_EVENTS_BATCH_SIZE |
| **Pipeline Configuration** | - ZO_PIPELINE_OFFSET_FLUSH_INTERVAL- ZO_PIPELINE_REMOTE_REQUEST_TIMEOUT- ZO_PIPELINE_WAL_SIZE_LIMIT- ZO_PIPELINE_BATCH_SIZE- ZO_PIPELINE_BATCH_TIMEOUT_MS- ZO_PIPELINE_BATCH_SIZE_BYTES- ZO_PIPELINE_BATCH_RETRY_INITIAL_DELAY_MS- ZO_PIPELINE_BATCH_RETRY_MAX_DELAY_MS- ZO_PIPELINE_MAX_FILE_SIZE_ON_DISK_MB |
| **WAL and Buffer Configurations** | - ZO_WAL_WRITE_BUFFER_SIZE- ZO_WAL_WRITE_QUEUE_SIZE |
| **Search Group Configuration** | - O2_SEARCH_GROUP_BASE_SECS- O2_SEARCH_GROUP_BASE_SPEED- O2_SEARCH_GROUP_LONG_MAX_CPU- O2_SEARCH_GROUP_SHORT_MAX_CPU- O2_SEARCH_GROUP_LONG_MAX_CONCURRENCY- O2_SEARCH_GROUP_SHORT_MAX_CONCURRENCY- O2_SEARCH_GROUP_LONG_MAX_MEMORY- O2_SEARCH_GROUP_SHORT_MAX_MEMORY- O2_SEARCH_GROUP_USER_SHORT_MAX_CONCURRENCY- O2_SEARCH_GROUP_USER_LONG_MAX_CONCURRENCY |
| **AI Configuration** | - O2_AI_ENABLED- O2_AI_API_URL- O2_AI_MODEL- O2_AI_PROVIDER- O2_AI_API_KEY |
| **Other Configurations** | - ZO_ROUTE_MAX_CONNECTIONS- ZO_ENRICHMENT_TABLE_MERGE_INTERVAL- ZO_DOWNSAMPLING_DOWNSAMPLING_INTERVAL- ZO_DATAFUSION_FILE_STAT_CACHE_MAX_ENTRIES- ZO_SCHEMA_MAX_FIELDS_TO_ENABLE_UDS |
