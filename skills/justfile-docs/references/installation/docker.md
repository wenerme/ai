### Docker

`just` is available as a Docker image from
[the GitHub Container Registry](https://ghcr.io/casey/just).

To copy `just` into a Docker image, add the following line to your
`Dockerfile`:

```dockerfile
COPY --from=ghcr.io/casey/just:latest /just /usr/local/bin/
```

After copying, `just` may also be used as part of a docker build:

```dockerfile
RUN just
```
