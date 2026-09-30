---
date: "2026-08-30T00:00:00+02:00"
---

# Artifacts

Workflow runs can store files such as test results, coverage reports, and build output as artifacts. Artifacts are uploaded by workflows, for example with [`actions/upload-artifact`](https://github.com/actions/upload-artifact), and appear on the run page after the upload completes.

## Previewing artifacts

Select an artifact on the run page to open its file browser and preview in the same tab. The preview identifies the originating run and attempt, and provides links back to that run and to download the complete artifact. Selecting files in the browser updates the preview in the same tab.

Artifact previews:

- require sign-in and access to the Actions run to open the preview page
- render text-based files, images (including SVG), and PDFs
- run HTML and JavaScript content in a sandboxed frame

Preview content is loaded through signed URLs that expire after one hour and do not require a session cookie. Reopen the preview page to obtain a fresh URL after it expires.

The file browser lists up to 2,000 files per artifact. Larger artifacts show a notice when the list is truncated.

Unsupported or oversized files can still be downloaded with the complete artifact.

## Instance configuration

Site administrators can limit the total artifact size that can be browsed or previewed with `ARTIFACT_PREVIEW_MAX_SIZE` in the `[actions]` section of `app.ini`. The default is 10 MiB. Set it to `0` to disable previews or `-1` to allow artifacts of any size.

The size of an individual previewed file is also limited by [`MAX_DISPLAY_FILE_SIZE`](../../administration/config-cheat-sheet.md#ui-ui) in the `[ui]` section.
