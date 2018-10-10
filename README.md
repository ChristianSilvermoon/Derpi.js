# Derpi.js
Library to access the Derpibooru / Booru-on-rails JSON API from JavaScript easily.

## Getting Started

```JavaScript
import derpiJS from "./derpi.js"; //Import Class

const Derpi = new derpiJS;
```
**An important note:** Most methods return ***promises***, so please expect this!

For Derpibooru's API reference, see https://derpibooru.org/pages/api

## Properties

### `domain`
Change the target domain.
It's `https://derpibooru.org` by default.

To change, do
```JavaScript
Derpi.domain = "http://example.com"
```
## Setters / Getters

### `filter`
Returns or sets the filter ID (numerical only).

When setting filters, you can use Derpibooru's aliases for the default filters in place of numerical IDs.

**Examples**
```JavaScript
Derpi.filter; //Returns 100073 if unmodified
Derpi.filter = 1234; //Sets filter ID to 1234
Derpi.filter = EVERYTHING; //Sets filter ID to 56027
```

**Filter Aliases (Setting Only)**

Alias           | ID (Click to view on Derpibooru)                
--------------- | ------------------------------------------------
DEFAULT         | [100073](https://derpibooru.org/filters/100073)
EVERYTHING      | [56027](https://derpibooru.org/filters/56027)
18+DARK         | [37429](https://derpibooru.org/filters/37429)
MAXSPOILERS 	| [37430](https://derpibooru.org/filters/37430)
LEGACYDEFAULT   | [37431](https://derpibooru.org/filters/37431)
18+R34          | [37432](https://derpibooru.org/filters/37432)

## Methods

### `search("query", {extraParams})`
Returns a promise for the Derpibooru search result JSON.
Searches Derpibooru for the specified query. You can use the `extraParams` to modify the results. See the reference below for details. (ex: https://derpibooru.org/search.json?q=dashie%2C+hugging%2C+cake)

**Examples**
```JavaScript

//Basic
Derpi.search("dashie, hugging, cake").then(
	results => {
		//output result JSON to terminal
		console.log(results);
	}
)

//With all OPTIONAL extraParams included (same as above)
Derpi.search("dashie, hugging, cake", {
	"filter": "DEFAULT",
	"sortDir": "desc",
	"sortBy": "created_at",
	"perPage": 20,
	"page": 1
}).then(
	results => {
		//output result JSON to terminal
		console.log(results);
	}
)

```

**Optional Extra Params**

Parameter | Values | Function
--------- | ------ | ----------
filter  | Numerical or Filter Alias | Overrides current set filter. (`derpiJS.filter` by default)
sortDir | `asc` or `desc` | Changes the sort direction of results to ascending or descending respectively (`desc` by default)
sortBy | `created_at`, `score`, `wilson`, `relevance`, `width`, `height`, `comments`,`random` or `random:` + Numerical Value | Changes how results are sorted (`created_at` by default)
perPage | `0`-`50` | Changes the number of results per page (`20` by default)
page | Numerical value | Selects page of results (`1` by default)

### `favedBy("USER", {extraParams})`
Identical to `Derpi.search("faved_by:USER")`

**Examples**
```JavaScript
Derpi.favedBy("USER").then(
	result => {
		console.log(result);
	}
)

//Identical to the above
Derpi.search("faved_by:USER").then(
	result => {
		console.log(result);
	}
)
```

### `post(id)`
Returns JSON Data for a specific post. (ex: https://derpibooru.org/0.json)

**Examples**
```JavaScript
Derpi.post(0).then(
	postJSON => {
		console.log(postJSON);
	}
)
```

### `postOembed(id)`
Gets the oEmbed JSON for a post

```javaScript
Derpi.postOembed(0).then(
	postJSON => {
		console.log(postJSON);
	}
)
```

### `lists()`
Returns post lists (ex: https://derpibooru.org/lists.json)

**Examples**
```javascript
Derpi.lists().then(
	listJSON => {
		console.log(listJSON);
	}
)
```
