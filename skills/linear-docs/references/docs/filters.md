# Filters

Filters allow you to refine existing views and create custom views to show only the relevant issues.

![Linear interface showing filters applied to the active issues view](https://webassets.linear.app/images/ornj730p/production/26e1e266d76606fad8972baf4b57ed364aa2e4c1-2438x1126.png?q=95&auto=format&dpr=2)

Filters help narrow a view to the issues most relevant to the work at hand. They can be used across issue lists to focus on specific assignees, statuses, labels, projects, cycles, and more.

Use filters when reviewing active work, checking ownership, triaging requests, or sharing a focused view with someone else.

## Apply filters

Open the filter menu or type `F` shortcut to choose the criteria you want to apply. A view can have one or more filters at the same time, so it’s possible to narrow results in very specific ways.

As filters are applied, the issue list updates to show only matching results.

The applied filters are also reflected in the browser URL. You can copy the browser address to share the filtered view; opening the link applies the same filters. Only the main filters are included in the URL. View options, quick filters, and Insights filters aren’t included.

### Advanced Filters

Advanced filters let you build more precise views by grouping conditions and combining them with AND/OR logic (including nested filter groups). From the filter menu, choose Advanced filter to open the builder, add conditions, and adjust the logic between them.

![Example of advanced filter focused on a specific project, urgent issues or breached SLA issues for the engineering team](https://webassets.linear.app/images/ornj730p/production/158daf78ba2d520b7152a70f6758f1b39582f037-976x636.png?q=95&auto=format&dpr=2)

### Filter with AI

Use natural language combined with artificial intelligence to filter your views. For example filter by phrases like "Show me issues assigned to me", "What issues are important?", " what issues are due next week" and so on, to have your views automatically filtered with the most suited parameters.

![Linear interface showing AI filters menu](https://webassets.linear.app/images/ornj730p/production/f2f4e2653379d8211c581e5a946d037b7c4cfd8e-848x405.png?q=95&auto=format&dpr=2)

## Working with filters

The exact set of available can vary by workspace features and by the view you’re in.

There are a few nuances to know:

* To filter for **no labels**, you'll have to select all labels and then switch the operator to _does not include_.
* To filter by milestones, you must filter by project first.
* You cannot filter for **suspended users**. To find issues assigned to or created by suspended users, navigate to their profile page (`linear.app/workspace-name/profiles/username`). If you do not know the username, an admin can find the link by clicking on member in the [Members](https://linear.app/settings/members) page.

### Quick search filters

If you know the specific name of the property you want to filter, you can type that directly and the filter will show up as a choice, saving you from having to click through the category to select it.

Property type | Quick filters
--- | ---
Team | Team name
Status | Status name
Assignee | Username
Created by | Username
Priority | "High", "Low", etc.
Labels | Label or label group name
Content | No quick filters available
Cycle | Active, Upcoming
Project | Project name
Subscriber | Username
Relations | These are top level filters
Date filters | "N days", Month, Quarter, Half-year, Year
Links | Front, Zendesk, Intercom, custom link source
Milestone | Milestone name

### Added to cycle

The Added to cycle filter is different from Cycle.

It answers when the issue was added relative to the cycle, not which cycle it belongs to. The values are:

* `Added to cycle` describes when an issue was added to a cycle relative to that cycle's start date.
* `Planned` means the issue was added before the cycle started or within the first 24 hours after it began.
* `After cycle` means the issue was added more than 24 hours after the cycle started, including after the cycle ended.

### Build with operators

Once you add a filter, refine it with operators. The filter type cannot be changed but clicking on any other part of the filter formula will give you options to change it and modify the query.

For instance, for a filter that says _Assignee is Andreas,_ clicking on _Assignee_ will do nothing, clicking on _is_ will give you the option to change the operator to i_s not_, and clicking on _Andreas_ will show a selectable list to modify the assignee. If you add another assignee, Adrien, then you'll see the is operator change to _is either_ _of_ or _is not_.

We support the following operators in Linear, which will show up depending on the type of filter and selections:

* _is or is not_ when one option is included in the filter
* _is either of or is not_ when multiple options are included in the filter
* _includes any, all, neither, either,_ or _none_ for labels and links
* _before_ or _after_ for date-related filters

### Filter with API

For more complex filters or to build queries on the API, see our [developer documentation](https://developers.linear.app/docs/graphql/working-with-the-graphql-api/filtering).
