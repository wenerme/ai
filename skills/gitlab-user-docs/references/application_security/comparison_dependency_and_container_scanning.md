# Dependency scanning compared to container scanning

Dependency scanning compared to container scanning.

GitLab offers both [dependency scanning](dependency_scanning/_index.md) and
[container scanning](container_scanning/_index.md) to ensure coverage for all of these
dependency types. To cover as much of your risk area as possible, you should use all available
security scanning tools:

- Dependency scanning analyzes your project and tells you which software dependencies,
  including upstream dependencies, have been included in your project, and what known
  risks the dependencies contain.
- Container scanning analyzes your containers and tells you about known risks in the operating
  system's (OS) packages.

The following table summarizes which types of dependencies each scanning tool can detect:

| Feature                                                                                      | Dependency scanning | Container scanning |
|----------------------------------------------------------------------------------------------|---------------------|--------------------|
| Identify the manifest, lock file, or static file that introduced the dependency              | Yes         | No         |
| Development dependencies                                                                     | Yes         | No         |
| Dependencies in a lock file committed to your repository                                     | Yes         | Yes <sup>1</sup> |
| Binaries built by Go                                                                         | No          | Yes <sup>2</sup> |
| Dynamically-linked language-specific dependencies installed by the Operating System          | No          | Yes        |
| Operating system dependencies                                                                | No          | Yes        |
| Language-specific dependencies installed on the operating system (not built by your project) | No          | Yes        |

1. Lock file must be present in the image to be detected.
1. [Report language-specific findings](container_scanning/_index.md#report-language-specific-findings) must be enabled, and binaries must be present in the image to be detected.
