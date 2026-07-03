---
title: "MongoDB query editor | Grafana Enterprise Plugins documentation"
description: "This document describes the MongoDB data query editor."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# MongoDB query editor

Grafana provides a query editor for MongoDB that supports the same syntax as the MongoDB Shell (`mongosh`), with the following limitations:

- Only one command can be executed per query panel.
- Only `find` and `aggregate` read commands are supported.
- Supported date constructors include `ISODate`, `new Date`, `Date`, and `Date.now()`.

For an introduction to writing scripts for the MongoDB shell refer to [Write scripts](https://www.mongodb.com/docs/mongodb-shell/write-scripts/) in MongoDB documentation. You create a query in the Grafana query editor in the same way you would in the MongoDB shell.

Example:

JavaScript [Copy code to clipboard] Copy

```javascript
sample_mflix.movies.aggregate([
            {"$match": { "year": {"$gt" : 2000} }},
            {"$group": { "_id": "$year", "count": { "$sum": 1 }}},
            {"$project": { "_id": 0, "count": 1, "time": { "$dateFromParts": {"year": "$_id", "month": 2}}}}
            ]
          ).sort({"time": 1})
```

## Grafana Assistant

Starting with plugin version 1.27.0, the query editor includes a **Grafana Assistant** button that provides AI-assisted help with writing MongoDB queries. Click the Assistant button in the query editor toolbar to get suggestions and help constructing your queries.

## Additional syntax

The editor extends the MongoDB Shell syntax with the following features.

### Database selection

You can use a database name instead of `db`. For example, `sample_mflix.movies.find()`. You can still use `db` to refer to the default database in your connection string.

### Aggregate sorting

Sorting typically happens within the aggregate pipeline. The extended syntax allows sorting on `aggregate` similarly to `find`. For example, `sample_mflix.movies.aggregate({}).sort({"time": 1})`.

> Note
>
> With this syntax, sorting is performed by the plugin after retrieving results from MongoDB, not on the server side. For server-side sorting, use `$sort` within your aggregation pipeline.

### Collections with a dot

To query collections that contain a dot (`.`) in their name, use the following syntax:

JavaScript [Copy code to clipboard] Copy

```javascript
my_db.getCollection("my.collection").find({})
```

## Keyboard shortcuts

Press **Ctrl+Space** to show code completion, which is displayed after entering a `.` after a database, collection, query method, or aggregation method name. Pressing **Cmd+S** (macOS) or **Ctrl+S** (Windows/Linux) runs the query.

## Query as time series

Create a time series query by aliasing the date field as `time`.

> Note
>
> You can convert non-date fields into date fields and alias them as `time` to create a time series query.

The following query converts the `int` field `year` to a date that is projected as `time` using the MongoDB `$dateFromParts` pipeline operator:

JavaScript [Copy code to clipboard] Copy

```javascript
sample_mflix.movies.aggregate([
{"$match": { "year": {"$gt" : 2000} }},
{"$group": { "_id": "$year", "count": { "$sum": 1 }}},
{"$project": { "_id": 0, "count": 1, "time": { "$dateFromParts": {"year": "$_id", "month": 2}}}}
]
).sort({"time": 1})
```

If you want to group your time series by **Metric**, project a field called `__metric`.

The following query displays the count of movies over time by movie rating using `__metric`:

JavaScript [Copy code to clipboard] Copy

```javascript
sample_mflix.movies.aggregate([
{"$match": { "year": {"$gt" : 2000}}},
{"$group": { "_id": {"year":"$year", "rated":"$rated"}, "count": { "$sum": 1 } }},
{"$project": { "_id": 0, "time": { "$dateFromParts": {"year": "$_id.year", "month": 2}}, "__metric": "$_id.rated", "count": 1}}
]
).sort({"time": 1})
```

## Faceted queries

When `$facet` is the last stage in your aggregation pipeline, the plugin returns multiple named data frames – one for each facet group. This is useful when you want to display different aggregations of the same data in separate panels or table columns.

JavaScript [Copy code to clipboard] Copy

```javascript
sample_mflix.movies.aggregate([
  {
    "$facet": {
      "by_genre": [
        {"$group": {"_id": "$genres", "count": {"$sum": 1}}}
      ],
      "by_year": [
        {"$group": {"_id": "$year", "count": {"$sum": 1}}}
      ]
    }
  }
])
```

## Date type detection

Append `.detect()` to a query to trigger automatic date-type detection for fields in the results. The backend probes the collection to identify which fields contain date values and converts them appropriately.

JavaScript [Copy code to clipboard] Copy

```javascript
sample_mflix.movies.find({"year": {"$gt": 2000}}).detect()
```

## Diagnostics

MongoDB provides diagnostic commands to help monitor and troubleshoot database performance, health, and operations. For information about diagnostics commands, refer to [Diagnostic Commands](https://www.mongodb.com/docs/manual/reference/command/nav-diagnostic/) in MongoDB documentation.

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

| Macro example | Description                                                                                                                               |
|---------------|-------------------------------------------------------------------------------------------------------------------------------------------|
| `$__timeFrom` | Replaced with the start of the currently active time selection as a BSON date object. Example output: `{"$date": "2024-05-10T12:00:00Z"}` |
| `$__timeTo`   | Replaced with the end of the currently active time selection as a BSON date object. Example output: `{"$date": "2024-05-10T13:00:00Z"}`   |

Example usage:

JavaScript [Copy code to clipboard] Copy

```javascript
sample_mflix.movies.find({ "tomatoes.dvd": { $gte: $__timeFrom, $lt: $__timeTo } })
```

## Dynamic dates in queries

Starting with plugin version 1.14.2, performing arithmetic on dates directly within the query editor is no longer supported. In earlier versions of MongoDB (prior to version 5), date arithmetic was commonly used to filter documents.

Example of previously supported syntax (no longer works):

JavaScript [Copy code to clipboard] Copy

```javascript
sample_mflix.movies.find({"released": { $gte: new Date(new Date().setMonth(new Date().getMonth() - 3)) }})
```

With MongoDB version 5.0 and later, new operators such as [`$dateSubtract`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/dateSubtract/) and [`$dateAdd`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/dateAdd/) were introduced. These operators provide more robust and flexible date manipulation, especially within aggregation queries.

The following example uses `$dateSubtract` to filter documents on the `sample_mflix` dataset:

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
