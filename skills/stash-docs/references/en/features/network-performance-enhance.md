# Network Performance Enhancement

Stash has optimized performance at every level of network connection, aiming to provide a low-latency, high-throughput access experience.

> [!NOTE]
> Some features need to be manually enabled in "Network Settings".

## Concurrent DNS Queries

Stash allows users to configure multiple DNS servers. When making queries, Stash will concurrently request all servers and use the fastest response.

## Optimistic DNS Cache

Stash uses the LRU algorithm to locally cache DNS queries. When the local cache expires, Stash continues to use the cached result and silently updates the record in the background, effectively reducing request latency caused by expired DNS cache.

## Concurrent Connections

In cases where a domain has multiple A / AAAA records, Stash will concurrently initiate TCP connections to all IPs and select the fastest successful handshake result. This can help avoid single node failures and provide better performance when accessing CDNs.

## Hybrid Use of Multiple Networks

When Wi-Fi / Cellular / Wired networks are available simultaneously, Stash will attempt to establish connections using multiple networks at the same time and select the fastest successful handshake result. This feature can be used in conjunction with "Concurrent Connections" and can reduce the probability of connection timeouts in scenarios of weak network signals and network switching.
