---
title: Prepared statement methods
description: Bind parameters and run D1 prepared statements using the run, all, first, and raw methods.
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

### Agents toolkit

* Agent setup
* Copy as Markdown

Open the Markdown file in a new tab

Ask Claude about this page

Ask ChatGPT about this page

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/d1/worker-api/prepared-statements.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

# Prepared statement methods

This chapter documents the various ways you can run and retrieve the results of a query after you have [prepared your statement](https://developers.cloudflare.com/d1/worker-api/d1-database/#prepare).

## Methods

### `bind()`

Binds a parameter to the prepared statement.

* [  JavaScript ](#tab-panel-6561)
* [  Python ](#tab-panel-6562)

JavaScript

```

const someVariable = `Bs Beverages`;

const stmt = env.DB.prepare("SELECT * FROM Customers WHERE CompanyName = ?").bind(someVariable);


```

Python

```

some_variable = "Bs Beverages"

stmt = self.env.DB.prepare(

  "SELECT * FROM Customers WHERE CompanyName = ?"

).bind(some_variable)


```

#### Parameter

* `Variable`: ` string `  
   * The variable to be appended into the prepared statement. See [guidance](#guidance) below.

#### Return values

* `D1PreparedStatement`: ` Object `  
   * A `D1PreparedStatement` where the input parameter has been included in the statement.

#### Guidance

* D1 follows the [SQLite convention ↗](https://www.sqlite.org/lang%5Fexpr.html#varparam) for prepared statements parameter binding. Currently, D1 only supports Ordered (`?NNNN`) and Anonymous (`?`) parameters. In the future, D1 will support named parameters as well.  
| Syntax | Type      | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |  
| ------ | --------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |  
| ?NNN   | Ordered   | A question mark followed by a number NNN holds a spot for the NNN\-th parameter. NNN must be between 1 and SQLITE\_MAX\_VARIABLE\_NUMBER                                                                                                                                                                                                                                                                                                                                                                                                            |  
| ?      | Anonymous | A question mark that is not followed by a number creates a parameter with a number one greater than the largest parameter number already assigned. If this means the parameter number is greater than SQLITE\_MAX\_VARIABLE\_NUMBER, it is an error. This parameter format is provided for compatibility with other database engines. But because it is easy to miscount the question marks, the use of this parameter format is discouraged. Programmers are encouraged to use one of the symbolic formats below or the ?NNN format above instead. |  
To bind a parameter, use the `.bind` method.  
Order and anonymous examples:  
   * [  JavaScript ](#tab-panel-6563)  
   * [  Python ](#tab-panel-6564)  
JavaScript  
```  
const stmt = db.prepare("SELECT * FROM Customers WHERE CompanyName = ?").bind("");  
```  
Python  
```  
stmt = db.prepare("SELECT * FROM Customers WHERE CompanyName = ?").bind("")  
```  
   * [  JavaScript ](#tab-panel-6565)  
   * [  Python ](#tab-panel-6566)  
JavaScript  
```  
const stmt = db  
  .prepare("SELECT * FROM Customers WHERE CompanyName = ? AND CustomerId = ?")  
  .bind("Alfreds Futterkiste", 1);  
```  
Python  
```  
stmt = db.prepare(  
"SELECT * FROM Customers WHERE CompanyName = ? AND CustomerId = ?"  
).bind("Alfreds Futterkiste", 1)  
```  
   * [  JavaScript ](#tab-panel-6567)  
   * [  Python ](#tab-panel-6568)  
JavaScript  
```  
const stmt = db  
  .prepare(  
  "SELECT * FROM Customers WHERE CompanyName = ?2 AND CustomerId = ?1"  
).bind(1, "Alfreds Futterkiste");  
```  
Python  
```  
stmt = db.prepare("SELECT * FROM Customers WHERE CompanyName = ?2 AND CustomerId = ?1").bind(1, "Alfreds Futterkiste")  
```

#### Static statements

D1 API supports static statements. Static statements are SQL statements where the variables have been hard coded. When writing a static statement, you manually type the variable within the statement string.

Advantages of prepared statements

The recommended approach is to use [prepared statements](https://developers.cloudflare.com/d1/worker-api/d1-database/#prepare) to run the SQL and bind parameters to them. Binding parameters using [bind()](https://developers.cloudflare.com/d1/worker-api/prepared-statements/#bind) to prepared statements allows you to reuse the prepared statements in your code, and prevents SQL injection attacks.

Example of a prepared statement with dynamically bound value:

* [  JavaScript ](#tab-panel-6569)
* [  Python ](#tab-panel-6570)

JavaScript

```

const someVariable = `Bs Beverages`;

const stmt = env.DB.prepare("SELECT * FROM Customers WHERE CompanyName = ?").bind(someVariable);

// A variable (someVariable) will replace the placeholder '?' in the query.

// `stmt` is a prepared statement.


```

Python

```

some_variable = "Bs Beverages"

stmt = self.env.DB.prepare("SELECT * FROM Customers WHERE CompanyName = ?").bind(some_variable)

# A variable (some_variable) will replace the placeholder '?' in the query.

# `stmt` is a prepared statement.


```

Example of a static statement:

* [  JavaScript ](#tab-panel-6571)
* [  Python ](#tab-panel-6572)

JavaScript

```

const stmt = env.DB.prepare("SELECT * FROM Customers WHERE CompanyName = 'Bs Beverages'");

// "Bs Beverages" is hard-coded into the query.

// `stmt` is a static statement.


```

Python

```

stmt = self.env.DB.prepare("SELECT * FROM Customers WHERE CompanyName = 'Bs Beverages'")

# "Bs Beverages" is hard-coded into the query.

# `stmt` is a static statement.


```

### `run()`

Runs the prepared query (or queries) and returns results. The returned results includes metadata.

* [  JavaScript ](#tab-panel-6573)
* [  Python ](#tab-panel-6574)

JavaScript

```

const returnValue = await stmt.run();


```

Python

```

return_value = await stmt.run()


```

#### Parameter

* None.

#### Return values

* `D1Result`: ` Object `  
   * An object containing the success status, a meta object, and an array of objects containing the query results.  
   * For more information on the object, refer to [D1Result](https://developers.cloudflare.com/d1/worker-api/return-object/#d1result).

Example of return values

* [  JavaScript ](#tab-panel-6575)
* [  Python ](#tab-panel-6576)

JavaScript

```

const someVariable = `Bs Beverages`;

const stmt = env.DB.prepare("SELECT * FROM Customers WHERE CompanyName = ?").bind(someVariable);

const returnValue = await stmt.run();

return Response.json(returnValue);


```

Python

```

from workers import Response


some_variable = "Bs Beverages"

stmt = self.env.DB.prepare("SELECT * FROM Customers WHERE CompanyName = ?").bind(some_variable)

return_value = await stmt.run()

return Response.json(return_value)


```

```

{

  "success": true,

  "meta": {

    "served_by": "miniflare.db",

    "duration": 1,

    "changes": 0,

    "last_row_id": 0,

    "changed_db": false,

    "size_after": 8192,

    "rows_read": 4,

    "rows_written": 0

  },

  "results": [

    {

      "CustomerId": 11,

      "CompanyName": "Bs Beverages",

      "ContactName": "Victoria Ashworth"

    },

    {

      "CustomerId": 13,

      "CompanyName": "Bs Beverages",

      "ContactName": "Random Name"

    }

  ]

}


```

Explain Code

#### Guidance

* `results` is empty for write operations such as `UPDATE`, `DELETE`, or `INSERT`.
* When using TypeScript, you can pass a [type parameter](https://developers.cloudflare.com/d1/worker-api/#typescript-support) to [D1PreparedStatement::run](#run) to return a typed result object.
* [D1PreparedStatement::run](#run) is functionally equivalent to `D1PreparedStatement::all`, and can be treated as an alias.
* You can choose to extract only the results you expect from the statement by simply returning the `results` property of the return object.

Example of returning only the `results`

* [  JavaScript ](#tab-panel-6577)
* [  Python ](#tab-panel-6578)

JavaScript

```

return Response.json(returnValue.results);


```

Python

```

from workers import Response


return Response.json(return_value.results)


```

```

[

  {

    "CustomerId": 11,

    "CompanyName": "Bs Beverages",

    "ContactName": "Victoria Ashworth"

  },

  {

    "CustomerId": 13,

    "CompanyName": "Bs Beverages",

    "ContactName": "Random Name"

  }

]


```

Explain Code

### `raw()`

Runs the prepared query (or queries), and returns the results as an array of arrays. The returned results do not include metadata.

Column names are not included in the result set by default. To include column names as the first row of the result array, set `.raw({columnNames: true})`.

* [  JavaScript ](#tab-panel-6579)
* [  Python ](#tab-panel-6580)

JavaScript

```

const returnValue = await stmt.raw();


```

Python

```

return_value = await stmt.raw()


```

#### Parameters

* `columnNames`: ` Object ` Optional  
   * A boolean object which includes column names as the first row of the result array.

#### Return values

* `Array`: ` Array `  
   * An array of arrays. Each sub-array represents a row.

Example of return values

* [  JavaScript ](#tab-panel-6581)
* [  Python ](#tab-panel-6582)

JavaScript

```

const someVariable = `Bs Beverages`;

const stmt = env.DB.prepare("SELECT * FROM Customers WHERE CompanyName = ?").bind(someVariable);

const returnValue = await stmt.raw();

return Response.json(returnValue);


```

Python

```

from workers import Response


some_variable = "Bs Beverages"

stmt = self.env.DB.prepare("SELECT * FROM Customers WHERE CompanyName = ?").bind(some_variable)

return_value = await stmt.raw()

return Response.json(return_value)


```

```

[

  [11, "Bs Beverages",

    "Victoria Ashworth"

  ],

  [13, "Bs Beverages",

    "Random Name"

  ]

]


```

With parameter `columnNames: true`:

* [  JavaScript ](#tab-panel-6583)
* [  Python ](#tab-panel-6584)

JavaScript

```

const someVariable = `Bs Beverages`;

const stmt = env.DB.prepare("SELECT * FROM Customers WHERE CompanyName = ?").bind(someVariable);

const returnValue = await stmt.raw({columnNames:true});

return Response.json(returnValue)


```

Python

```

from pyodide.ffi import to_js

from workers import Response


some_variable = "Bs Beverages"

stmt = self.env.DB.prepare("SELECT * FROM Customers WHERE CompanyName = ?").bind(some_variable)

return_value = await stmt.raw(columnNames=True)

return Response.json(return_value)


```

```

[

  [

    "CustomerId",

    "CompanyName",

    "ContactName"

  ],

  [11, "Bs Beverages",

    "Victoria Ashworth"

  ],

  [13, "Bs Beverages",

    "Random Name"

  ]

]


```

Explain Code

#### Guidance

* When using TypeScript, you can pass a [type parameter](https://developers.cloudflare.com/d1/worker-api/#typescript-support) to [D1PreparedStatement::raw](#raw) to return a typed result array.

### `first()`

Runs the prepared query (or queries), and returns the first row of the query result as an object. This does not return any metadata. Instead, it directly returns the object.

* [  JavaScript ](#tab-panel-6585)
* [  Python ](#tab-panel-6586)

JavaScript

```

const values = await stmt.first();


```

Python

```

values = await stmt.first()


```

#### Parameters

* `columnName`: ` String ` Optional  
   * Specify a `columnName` to return a value from a specific column in the first row of the query result.
* None.  
   * Do not pass a parameter to obtain all columns from the first row.

#### Return values

* `firstRow`: ` Object ` Optional  
   * An object containing the first row of the query result.  
   * The return value will be further filtered to a specific attribute if `columnName` was specified.
* `null`: ` null `  
   * If the query returns no rows.

Example of return values

Get all the columns from the first row:

* [  JavaScript ](#tab-panel-6587)
* [  Python ](#tab-panel-6588)

JavaScript

```

const someVariable = `Bs Beverages`;

const stmt = env.DB.prepare("SELECT * FROM Customers WHERE CompanyName = ?").bind(someVariable);

const returnValue = await stmt.first();

return Response.json(returnValue)


```

Python

```

from workers import Response


some_variable = "Bs Beverages"

stmt = self.env.DB.prepare("SELECT * FROM Customers WHERE CompanyName = ?").bind(some_variable)

return_value = await stmt.first()

return Response.json(return_value)


```

```

{

  "CustomerId": 11,

  "CompanyName": "Bs Beverages",

  "ContactName": "Victoria Ashworth"

}


```

Get a specific column from the first row:

* [  JavaScript ](#tab-panel-6589)
* [  Python ](#tab-panel-6590)

JavaScript

```

const someVariable = `Bs Beverages`;

const stmt = env.DB.prepare("SELECT * FROM Customers WHERE CompanyName = ?").bind(someVariable);

const returnValue = await stmt.first("CustomerId");

return Response.json(returnValue)


```

Python

```

from workers import Response


some_variable = "Bs Beverages"

stmt = self.env.DB.prepare("SELECT * FROM Customers WHERE CompanyName = ?").bind(some_variable)

return_value = await stmt.first("CustomerId")

return Response.json(return_value)


```

```

11


```

#### Guidance

* If the query returns rows but `column` does not exist, then [D1PreparedStatement::first](#first) throws the `D1_ERROR` exception.
* [D1PreparedStatement::first](#first) does not alter the SQL query. To improve performance, consider appending `LIMIT 1` to your statement.
* When using TypeScript, you can pass a [type parameter](https://developers.cloudflare.com/d1/worker-api/#typescript-support) to [D1PreparedStatement::first](#first) to return a typed result object.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/d1/","name":"D1"}},{"@type":"ListItem","position":3,"item":{"@id":"/d1/worker-api/","name":"Workers Binding API"}},{"@type":"ListItem","position":4,"item":{"@id":"/d1/worker-api/prepared-statements/","name":"Prepared statement methods"}}]}
```
