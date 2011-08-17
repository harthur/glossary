# glossary

glossary is a JavaScript module that extracts keywords from text (aka "term extraction" or "auto tagging"). It takes a string of text and returns an array of terms that are relevant to the content:

```javascript
var glossary = require("glossary");

var keywords = glossary.extract("Her cake shop is the best in the business");

console.log(keywords)  // ["cake", "shop", "cake shop", "business"]
```

`glossary` is standalone and uses part-of-speech analysis to extract the relevant terms.

# install

For [node](http://nodejs.org) with [npm](http://npmjs.org):

```bash
npm install glossary
```

# API

#### blacklisting

Use `blacklist` to remove unwanted terms from any extraction:

```javascript
var glossary = require("./glossary")({
   blacklist: ["library", "script", "api", "function"]
});

var keywords = glossary.extract("JavaScript color conversion library");

console.log(keywords); // ["color", "conversion"]
```

#### minimum frequency

Use `minFreq` to limit the terms to only those that occur with a certain frequency:

```javascript
var glossary = require("./glossary")({ minFreq: 2 });

var keywords = glossary.extract("Kasey's pears are the best pears in Canada");

console.log(keywords); // ["pears"]
```

#### sub-terms

Use `collapse` to remove terms that are sub-terms of other terms:

```javascript
var glossary = require("./glossary")({ collapse: true });

var keywords = glossary.extract("The Middle East crisis is getting worse");

console.log(keywords); // ["Middle East crisis"]
```

#### verbose output

Use `verbose` to also get the count of each term:

If you don't want terms that are sub-terms of other terms, use `collapse`:

```javascript
var glossary = require("./glossary")({ verbose: true });

var keywords = glossary.extract("The pears from the farm are good");

console.log(keywords); // [ { word: 'pears', count: 1 }, { word: 'farm', count: 1 } ]
```

# propers

`glossary` Uses [jspos](http://code.google.com/p/jspos/) for POS tagging. It's inspired by the python module [topia.termextract](http://pypi.python.org/pypi/topia.termextract/).


