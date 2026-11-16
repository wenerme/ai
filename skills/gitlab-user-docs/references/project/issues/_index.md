# Issues

Tasks, bug reports, feature requests, and tracking.

- Tier: Free, Premium, Ultimate
- Offering: GitLab.com, GitLab Self-Managed, GitLab Dedicated

- [Introduced](https://gitlab.com/groups/gitlab-org/-/epics/9584) in GitLab 17.5 [with a feature flag](../../../administration/feature_flags/_index.md) named `work_items_view_preference`. Disabled by default. This feature is in [beta](../../../policy/development_stages_support.md#beta).
- Feature flag named `work_items_view_preference` enabled on GitLab.com in GitLab 17.9 for a subset of users.
- Feature flag named `work_items_view_preference` [enabled](https://gitlab.com/gitlab-org/gitlab/-/merge_requests/184496) on GitLab.com, GitLab Self-Managed, and GitLab Dedicated in 17.10.
- [Enabled on GitLab.com, GitLab Self-Managed, and GitLab Dedicated](https://gitlab.com/gitlab-org/gitlab/-/issues/482931) in GitLab 17.11.
- [Moved](https://gitlab.com/gitlab-org/gitlab/-/issues/482931) to feature flag named `work_item_view_for_issues` in GitLab 18.1. Enabled on GitLab.com, GitLab Self-Managed, and GitLab Dedicated. Feature flag `work_items_view_preference` removed.
- Additional filters on the Issues page in projects [introduced](https://gitlab.com/gitlab-org/gitlab/-/merge_requests/198544) in GitLab 18.4. [Enabled on GitLab.com, GitLab Self-Managed, and GitLab Dedicated](https://gitlab.com/gitlab-org/gitlab/-/merge_requests/204139).
- Additional filters on the Issues page in groups [introduced](https://gitlab.com/gitlab-org/gitlab/-/merge_requests/202089) in GitLab 18.5. [Enabled on GitLab.com, GitLab Self-Managed, and GitLab Dedicated](https://gitlab.com/gitlab-org/gitlab/-/merge_requests/205308).
- [Generally available](https://gitlab.com/gitlab-org/gitlab/-/issues/520791) in GitLab 18.7. Feature flag `work_item_view_for_issues` removed.

Issues help you collaborate with your team to plan, track, and deliver work in GitLab.
An issue is a type of [work item](../../work_items/_index.md),
so issues appear with epics, tasks, and other work items in the  list.

Each issue belongs to one project.
To view the issues from every project in a group, open the  list for the group.

Teams use issues in the following ways:

- Track feature proposals, tasks, support requests, and bug reports.
- Organize and prioritize work with assignees, due dates, and health status.
- Discuss decisions in comments and threads.
- Support custom workflows with templates, labels, epics, and boards.
- Integrate with external tools like Zoom, Jira, and email services.

<div class="video-fallback">
  See the video: <a href="https://www.youtube.com/watch?v=Mt1EzlKToig">Issues - Setting up your Organization with GitLab</a>.
</div>
<figure class="video-container">
  <iframe src="https://www.youtube-nocookie.com/embed/Mt1EzlKToig" frameborder="0" allowfullscreen> </iframe>
</figure>

## Related topics

- [Epics](../../group/epics/_index.md)
- [Tasks](../../tasks.md)
- [Status](../../work_items/status.md)
- [Description templates](../description_templates.md)
- [Issues API](../../../api/issues.md)
- [External issue trackers](../../../integration/external-issue-tracker.md)
