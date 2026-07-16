# Stash HTTP Engine

Stash has a built-in efficient HTTP engine that allows users to rewrite, intercept, fetch, replay, and decrypt HTTPS requests using a MitM approach.

## Inbound Logic

Not all connections in the system are HTTP requests. Stash controls whether a connection enters the HTTP engine according to the following strategies:

- When "use only Tunnel proxy" is turned off, Stash declares an HTTP proxy to the system. HTTP requests entering the HTTP proxy will be handled by the HTTP engine.
- TCP connections entering through Tunnel and hitting the `force-http-engine` list will also be handled by the HTTP engine.
- HTTPS requests hitting the MitM list will also be handled by the HTTP engine, and Stash will use the configured root certificate to generate a temporary certificate for TLS handshake based on SNI.
- Other unmatched requests will be forwarded as TCP streams without entering the HTTP engine.
- HTTP/3 requests are currently not supported and will be sent as regular UDP packets. The overall throughput is generally lower than that of HTTP/1 and HTTP/2 protocols based on TCP.

When encountering issues with HTTP rewriting or scripts not working, you can check the above rules for troubleshooting.

## Negotiation and Connection Management

Stash HTTP Engine fully supports parsing HTTP/1.x and HTTP/2 protocols.

![](https://mermaid.ink/svg/pako:eNo1jsEKwjAQRH9l2XPrB-QmWPDQg7QFD00Pa7O2QZOGJFWk7b8bRS_Dg3kMs2A_KUaBgyc3QllJK-3eOch3-VquECKFsa0_CcemOUFhB225-_bVCs_QnvkCNfsH-w4zNOwNaZUWF2kBJMaRDUsUCRX5m0Rpt-TNTlHkQuk4eRRXugfOkOY41S_bo4h-5r900JTemZ-1vQEAUjzw)

- For HTTP requests, Stash HTTP Engine only supports HTTP/1.x protocol and does not support HTTP/2 Cleartext.
- For HTTPS requests and when MitM is enabled, Stash will try to negotiate with both the app and the web server to upgrade to HTTP/2. The L and R connections are independent and have no impact on each other.
- Stash HTTP Engine manages the L and R connections separately. For the R-side connection, Stash maximizes the reuse of TCP connections to minimize the consumption of TCP/TLS handshakes.

## Practice and Performance

![](https://mermaid.ink/svg/pako:eNp1j8EKgkAQhl9lmLMaevQWJHToECl0cD1M7qRLucq6FqG-e2sUXeoy_Mz_8TEzYtlKxhgrQ10Nu4PQQq-7LgQ_8Kdtlu1XYRBO0Fvq6zxdJixbSHSlNBdfLJrg3udHPkHK5sameHmiX57_DXrYsGlISXfSKDSAQFtzwwJjFyWZi0ChZ8cNnSTLiVS2NRif6dqzhzTYNn3oEmNrBv5AG0XuveZNzU9wy1Ah)

In practice, there are:

- Some apps do not negotiate HTTP/2, but the web server supports HTTP/2. After Stash HTTP Engine takes over through MitM, the L side will use the HTTP/1.1 protocol, but the R side will negotiate to use HTTP/2.
- Some apps create a TLS connection for each HTTPS request even when the web server supports HTTP/2. After Stash HTTP Engine takes over through MitM, only one TCP connection to the web server will be created.

> [!NOTE]
> If you encounter any compatibility issues, please contact us.
