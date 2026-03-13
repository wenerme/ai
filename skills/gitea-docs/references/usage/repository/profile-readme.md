---
date: "2023-03-02T21:00:00+05:00"
slug: "profile-readme"
sidebar_position: 42
aliases:
  - /profile-readme
---

# Profile READMEs

To display a Markdown file in your Gitea user or organization profile page, create a repository named `.profile` and add a new file named `README.md` to it.
Gitea will automatically display the contents of the file on your profile, in a new "Overview" above your repositories.

Making the `.profile` repository private will hide the Profile README.

Example of user with `.profile/README.md`:

![profile readme screenshot](/images/usage/profile-readme.png)
