# Use kaniko to build Docker images

Build container images in GitLab CI/CD with kaniko.

- Tier: Free, Premium, Ultimate
- Offering: GitLab.com, GitLab Self-Managed, GitLab Dedicated

[kaniko](https://github.com/GoogleContainerTools/kaniko) is a tool to build
container images from a Dockerfile, inside a container or Kubernetes cluster.

The original project is no longer maintained.
A maintained community fork, [`osscontainertools/kaniko`](https://github.com/osscontainertools/kaniko),
publishes releases and images.

> [!note]
> GitLab does not support or endorse the `osscontainertools/kaniko` fork.
> You use it at your own risk.

kaniko solves two problems with using the
[Docker-in-Docker build](using_docker_build.md#use-docker-in-docker)
method:

- Docker-in-Docker requires [privileged mode](https://docs.docker.com/engine/reference/run/#runtime-privilege-and-linux-capabilities)
  to function, which is a significant security concern.
- Docker-in-Docker generally incurs a performance penalty and can be slow.

## Prerequisites

To use kaniko with GitLab, [a runner](https://docs.gitlab.com/runner/) with one
of the following executors is required:

- [Kubernetes](https://docs.gitlab.com/runner/executors/kubernetes/)
- [Docker](https://docs.gitlab.com/runner/executors/docker/)
- [Docker Machine](https://docs.gitlab.com/runner/executors/docker_machine/)

## Authentication with registries

Authentication is required when building and pushing images with kaniko:

- For the GitLab container registry, authentication happens automatically without any manual configuration.
- For pulling images through the GitLab dependency proxy, additional configuration is required.

For more information on how authentication works, see [access an image from a private container registry](using_docker_images.md#access-an-image-from-a-private-container-registry).

For more information on authentication with other registries,
see [pushing to different registries](https://github.com/osscontainertools/kaniko/blob/main/docs/registries.md).

### Authenticate with the container registry

When pushing to the GitLab container registry, authentication happens automatically without requiring any manual configuration:

- GitLab CI/CD generates authentication credentials from the `CI_REGISTRY`, `CI_REGISTRY_USER`, and `CI_REGISTRY_PASSWORD` predefined CI/CD variables.
- For Google Container Registry, Amazon ECR, and Azure Container Registry, kaniko authenticates with its built-in credential helpers.
- For other registries, store static credentials with `executor login <registry> --username <user> --password-stdin` before the build.
  See [debug authentication issues](#debug-authentication-issues) for troubleshooting steps.

### Authenticate with the dependency proxy

If you need to pull images through the dependency proxy,
you must add the corresponding CI/CD variables for authentication to the `config.json` file:

```yaml
build:
  script:
    # Store the dependency proxy credentials in config.json
    - echo "$CI_DEPENDENCY_PROXY_PASSWORD" | /kaniko/executor login "${CI_DEPENDENCY_PROXY_SERVER%:*}"
      --username "$CI_DEPENDENCY_PROXY_USER" --password-stdin
```

This configuration strips the port, for example `:443`, from `CI_DEPENDENCY_PROXY_SERVER` so you don't have to include it when referencing images.

For more information, see [authenticate within CI/CD](../../user/packages/dependency_proxy/_index.md#authenticate-within-cicd).

## Build and push an image

When building an image with kaniko and GitLab CI/CD, you should be aware of a
few important details:

- The kaniko debug image is recommended (`ghcr.io/osscontainertools/kaniko:debug`)
  because it has a shell, and a shell is required for an image to be used with
  GitLab CI/CD.
- The entrypoint needs to be [overridden](using_docker_images.md#override-the-entrypoint-of-an-image),
  otherwise the build script doesn't run.

In the following example, kaniko is used to:

1. Build a Docker image.
1. Push it to [GitLab container registry](../../user/packages/container_registry/_index.md).

The job runs only when a tag is pushed.

In the last step, kaniko uses the `Dockerfile` under the
root directory of the project, builds the Docker image and pushes it to the
project's container registry while tagging it with the Git tag:

```yaml
build:
  stage: build
  image:
    name: ghcr.io/osscontainertools/kaniko:debug
    entrypoint: [""]
  script:
    - /kaniko/executor
      --context "${CI_PROJECT_DIR}"
      --dockerfile "${CI_PROJECT_DIR}/Dockerfile"
      --destination "${CI_REGISTRY_IMAGE}:${CI_COMMIT_TAG}"
  rules:
    - if: $CI_COMMIT_TAG
```

### Build an image behind a proxy

If you use a custom GitLab Runner behind an http(s) proxy, kaniko needs to be set
up accordingly. This means:

- Passing the `http_proxy` environment variables as build arguments so the Dockerfile
  instructions can use the proxy when building the image.

The previous example can be extended as follows:

```yaml
build:
  stage: build
  variables:
    http_proxy: <your-proxy>
    https_proxy: <your-proxy>
    no_proxy: <your-no-proxy>
  image:
    name: ghcr.io/osscontainertools/kaniko:debug
    entrypoint: [""]
  script:
    - /kaniko/executor
      --context "${CI_PROJECT_DIR}"
      --build-arg http_proxy=$http_proxy
      --build-arg https_proxy=$https_proxy
      --build-arg no_proxy=$no_proxy
      --dockerfile "${CI_PROJECT_DIR}/Dockerfile"
      --destination "${CI_REGISTRY_IMAGE}:${CI_COMMIT_TAG}"
  rules:
    - if: $CI_COMMIT_TAG
```

## Build a multi-arch image

You can build [multi-arch images](https://www.docker.com/blog/multi-arch-build-and-images-the-simple-way/)
inside a container by using [`manifest-tool`](https://github.com/estesp/manifest-tool).

For a detailed guide on how to build a multi-arch image, see
[Building a multi-arch container image in unprivileged containers](https://blog.siemens.com/2022/07/building-a-multi-arch-container-image-in-unprivileged-containers/).

## Use a registry with a custom certificate

When trying to push to a Docker registry that uses a certificate that is signed
by a custom CA, you might get the following error:

```shell
$ /kaniko/executor --context $CI_PROJECT_DIR --dockerfile $CI_PROJECT_DIR/Dockerfile --no-push
INFO[0000] Downloading base image registry.gitlab.example.com/group/docker-image
error building image: getting stage builder for stage 0: Get https://registry.gitlab.example.com/v2/: x509: certificate signed by unknown authority
```

This can be solved by adding your CA's certificate to the kaniko certificate
store:

```yaml
before_script:
  - |
    echo "-----BEGIN CERTIFICATE-----
    ...
    -----END CERTIFICATE-----" >> /kaniko/ssl/certs/ca-certificates.crt
```

## Video walkthrough of a working example

The [Least Privilege Container Builds with Kaniko on GitLab](https://www.youtube.com/watch?v=d96ybcELpFs)
video is a walkthrough of the [Kaniko Docker Build](https://gitlab.com/guided-explorations/containers/kaniko-docker-build)
Guided Exploration project pipeline. It was tested on:

- [GitLab.com instance runners](../runners/_index.md)
- [The Kubernetes runner executor](https://docs.gitlab.com/runner/executors/kubernetes/)

The example can be copied to your own group or instance for testing. More details
on what other GitLab CI patterns are demonstrated are available at the project page.

## Troubleshooting

### Debug authentication issues

To debug authentication issues with kaniko:

- [Enable debug logging](../variables/variables_troubleshooting.md#enable-debug-logging) by adding `CI_DEBUG_TRACE: "true"` to your job variables.

  > [!warning]
  > Debug logging exposes sensitive information including authentication tokens in your job logs.
  > Enable it temporarily and only when needed for troubleshooting.

  In the debug logs, examine the `DOCKER_AUTH_CONFIG` variable.

- To isolate authentication issues, [configure credentials per job](using_docker_images.md#configure-a-job).
- If you're using Docker-in-Docker, see [authenticate with registry in Docker-in-Docker](authenticate_registry.md).

### 403 error: "error checking push permissions"

If you receive this error, it might be due to an outside proxy. Setting the `http_proxy`
and `https_proxy` [environment variables](../../administration/packages/container_registry_troubleshooting.md#running-the-docker-daemon-with-a-proxy)
can fix the problem.
