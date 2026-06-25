---
title: "MongoDB query editor | Grafana Enterprise Plugins documentation"
description: "This document describes the MongoDB data query editor."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# MongoDB query editor

Grafana provides a query editor for MongoDB that supports the same syntax as the MongoDB Shell (mongosh), but with the following limitations:

- You can only run one command or query per query.
- Only `find` and `aggregate` read commands are supported.
- `ISODate` is the only supported object constructor.

For an introduction to writing scripts for the MongoDB shell refer to [Write scripts](https://www.mongodb.com/docs/mongodb-shell/write-scripts/) in MongoDB documentation. You create a query in Grafana’s query editor in the same way you would in the MongoDB shell.

Example:

[Copy code to clipboard] Copy

```none
sample_mflix.movies.aggregate([
            {"$match": { "year": {"$gt" : 2000} }},
            {"$group": { "_id": "$year", "count": { "$sum": 1 }}},
            {"$project": { "_id": 0, "count": 1, "time": { "$dateFromParts": {"year": "$_id", "month": 2}}}}
            ]
          ).sort({"time": 1})
```

## Additional syntax

The editor extends the MongoDB Shell syntax by means of *database selection*, where you can use a database name instead of `db`. For example, `sample_mflix.movies.find()`. You can still use `db` to refer to the default database in your connection string.

It also extends it by means of *aggregate sorting*. Sorting typically happens within the aggregate pipeline. The extended syntax is allowed on `aggregate` similarly to `find`. For example, `sample_mflix.movies.aggregate({}).sort({"time": 1})`.

> Note
>
> MongoDB does not perform the sort with this syntax. Sorting occurs after retrieving the results from the collection.

### Collections with a dot

To query collections that contain a dot (`.`) in their name, use the following syntax:

[Copy code to clipboard] Copy

```none
my_db.getCollection("my.collection").find({})
```

## Keyboard shortcuts

Press **Ctrl+Space** to show code completion, which is displayed after entering a `.` after a database, collection, query method, or aggregation method name. Pressing **Cmd + S** runs the query.

## Query as time series

Create a time series query by aliasing the date field as `time`.

> Note
>
> You can convert non-date fields into date fields and alias them as `time` to create a time series query.

The following query converts the `int` field `year` to a date that is projected as `time` using the MongoDB *$dateFromParts* pipeline operator:

[Copy code to clipboard] Copy

```none
sample_mflix.movies.aggregate([
{"$match": { "year": {"$gt" : 2000} }},
{"$group": { "_id": "$year", "count": { "$sum": 1 }}},
{"$project": { "_id": 0, "count": 1, "time": { "$dateFromParts": {"year": "$_id", "month": 2}}}}
]
).sort({"time": 1})
```

If you want to group your time series by **Metric**, project a field called `__metric`.

The following query displays the count of movies over time by movie rating using `__metric`:

[Copy code to clipboard] Copy

```none
sample_mflix.movies.aggregate([
{"$match": { "year": {"$gt" : 2000}}},
{"$group": { "_id": {"year":"$year", "rated":"$rated"}, "count": { "$sum": 1 } }},
{"$project": { "_id": 0, "time": { "$dateFromParts": {"year": "$_id.year", "month": 2}}, "__metric": "$_id.rated", "count": 1}}
]
).sort({"time": 1})
```

## Diagnostics

MongoDB provides diagnostic commands to help monitor and troubleshoot database performance, health, and operations. For information about diagnostics commands, refer to [Diagnostic Commands](https://docs.mongodb.com/manual/reference/command/nav-diagnostic/) in MongoDB documentation.

The plugin supports the following MongoDB diagnostic commands:

- `buildInfo`
- `connPoolStats`
- `connectionStatus`
- `dbStats`
- `getLog`
- `hostInfo`
- `lockInfo`
- `replSetGetStatus`
- `serverStatus`
- `stats`

## Macros

To simplify syntax and to allow for dynamic times, you can write queries that contain macros. The MongoDB plugin supports the following macros:

Expand table

| Macro example   | Description                                                                                                    |
|-----------------|----------------------------------------------------------------------------------------------------------------|
| `$__timeFrom()` | Replaces the value with the start of the currently active time selection. Example: `FROM_UNIXTIME(1494410783)` |
| `$__timeTo()`   | Replaces the value with the end of the currently active time selection. Example: `TO_UNIXTIME(1494410983)`     |

## Dynamic dates in queries

Starting with version 1.14.2, the Grafana MongoDB plugin no longer supports performing arithmetic on dates directly within the query editor. In earlier versions of MongoDB (prior to version 5), date arithmetic was commonly used to filter documents.

Example:

JavaScript [Copy code to clipboard] Copy

```javascript
sample_mflix.movies.find({ $gte: new Date(new Date().setMonth(new Date().getMonth() - 3)) })
```

With MongoDB version 5.0 and later, new operators such as [`$dateSubtract`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/dateSubtract/) and [`$dateAdd`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/dateAdd/) were introduced. These operators provide more robust and flexible date manipulation, especially within aggregation queries.

The following example uses `$dateSubtract` to filter documents on the “mflix” sample dataset:

JavaScript [Copy code to clipboard] Copy

```javascript
sample_mflix.movies.aggregate([
  {
    $match: {
      $expr: {
        $gt: [
          "$released",
          {
            $dateSubtract: {
              startDate: "$$NOW",
              unit: "year",
              amount: 9
            }
          }
        ]
      }
    }
  }
])
```

The query filters for movies released in the last 9 years using MongoDB native date manipulation features.
