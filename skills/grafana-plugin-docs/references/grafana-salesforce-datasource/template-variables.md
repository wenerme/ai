---
title: "Salesforce template variables | Grafana Enterprise Plugins documentation"
description: "Use template variables with the Salesforce data source in Grafana."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Salesforce template variables

Instead of hard-coding details such as user names, account IDs, or opportunity stages in your queries, you can use variables. Grafana displays these variables in drop-down select boxes at the top of the dashboard to help you change the data displayed in your dashboard. Grafana refers to such variables as **template variables**.

For an introduction to templates and variables, refer to the following topics:

- [Variables](/docs/grafana/latest/dashboards/variables/)
- [Templates](/docs/grafana/latest/dashboards/variables/#templates)
- [Add and manage variables](/docs/grafana/latest/dashboards/variables/add-template-variables/)
- [Variable syntax](/docs/grafana/latest/dashboards/variables/variable-syntax/)

## Create Salesforce query variables

To add a new Salesforce query variable, refer to [Add a query variable](/docs/grafana/latest/variables/variable-types/add-query-variable/). Select your Salesforce data source and write a SOQL query that returns your desired variable options.

You can use either the SOQL Editor or Query Builder mode to create variable queries.

### Single value variables

To create a variable with a single column of values, write a SOQL query that returns one field:

soql [Copy code to clipboard] Copy

```soql
SELECT Name FROM Account ORDER BY Name
```

This query creates a drop-down with all account names. You can enable multi-value selection or include an “All” option in the variable settings.

### Name/value pair variables

To use name/value pairs, such as displaying a user’s name while filtering by their ID, return two fields in your SOQL query. The first field serves as the value (used in queries), and the second field serves as the display text.

soql [Copy code to clipboard] Copy

```soql
SELECT Id, Name FROM User WHERE IsActive = true ORDER BY Name
```

This approach is useful when you want to:

- Display human-readable names in the drop-down
- Filter by a unique identifier (such as ID) in your dashboard queries

## Common variable examples

The following examples demonstrate common variable queries for Salesforce objects.

### Users

soql [Copy code to clipboard] Copy

```soql
SELECT Id, Name FROM User WHERE IsActive = true ORDER BY Name
```

### Accounts

soql [Copy code to clipboard] Copy

```soql
SELECT Id, Name FROM Account ORDER BY Name
```

### Opportunity stages

soql [Copy code to clipboard] Copy

```soql
SELECT DISTINCT StageName FROM Opportunity ORDER BY StageName
```

### Record types

soql [Copy code to clipboard] Copy

```soql
SELECT Id, Name FROM RecordType WHERE SubjectType = 'Opportunity' ORDER BY Name
```

### Custom picklist values

soql [Copy code to clipboard] Copy

```soql
SELECT DISTINCT Status__c FROM CustomObject__c ORDER BY Status__c
```

## Use variables in queries

After you create a variable, you can use it in your Salesforce queries using [variable syntax](/docs/grafana/latest/variables/syntax/).

For example, if you have a variable named `account`, you can use it in a SOQL query:

soql [Copy code to clipboard] Copy

```soql
SELECT Name, Amount, CloseDate
FROM Opportunity
WHERE AccountId = '${account}'
```

For multi-value variables, use the `IN` operator:

soql [Copy code to clipboard] Copy

```soql
SELECT Name, Amount, CloseDate
FROM Opportunity
WHERE AccountId IN (${account:singlequote})
```

The `singlequote` formatting option wraps each value in single quotes, which is required for string comparisons in SOQL.

## Limitations

The following limitations apply to template variables with the Salesforce data source:

- **Ad-hoc filters are not supported.** You cannot use the ad-hoc filters variable type with Salesforce.
- **Reports mode does not support variables.** Variable queries must use SOQL Editor or Query Builder mode.

For more information about variables, refer to [Templates and variables](/docs/grafana/latest/variables/).
