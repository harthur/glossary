var _ = require("underscore"),
    pos = require("pos"),
    natural = require("natural"),
    inflector = new natural.NounInflector();

function normalize(word) {
   return inflector.singularize(word);
}

function Glossary(opts) {
   this.opts = _(opts || {}).defaults({
      minFreq: 1,
      collapse: false,
      blacklist: [],
      verbose: false
   });
}

Glossary.prototype.extract = function(text) {
   var tags = new pos.Tagger().tag(new pos.Lexer().lex(text)),
       terms = {},
       multiterm = [];

   function add(word) {
     var norm = normalize(word);
     multiterm.push(word);

     terms[norm] = terms[norm] || {
        count: 0,
        norm: norm,
        word: word
     };
     terms[norm].count++;
   }

   var searching = true;

   for (var i = 0; i < tags.length; i++) {
      var word = tags[i][0],
          tag = tags[i][1];

      var isNoun = tag.indexOf('N') == 0,
          isAdj = tag == "JJ";

      if (searching && (isNoun || (isAdj
            && word[0].match(/[A-Z]/)))) {
         searching = false;
         add(word);
      }
      else if (!searching && isNoun) {
         add(word);
      }
      else if (!searching && !isNoun) {
         searching = true;
         if (multiterm.length > 1) {
            add(multiterm.join(" "));
         }
         multiterm = [];
      }
   }

   var opts = this.opts;
   var terms =  _(terms).select(function(term) {
      return term.count >= opts.minFreq;
   });

  if (opts.collapse) {
     terms = _(terms).reject(function(term) {
        return _(terms).any(function(term2) {
           return term.word != term2.word
              && term2.norm.indexOf(term.norm) >= 0;
        })
     });
  }
  
  if (opts.blacklist) {
     terms = _(terms).reject(function(term) {
        return _(opts.blacklist).any(function(black) {
           return term.norm.toLowerCase().indexOf(normalize(black).toLowerCase()) >= 0;
        }) 
     })
  }

  if (!this.opts.verbose) {
     terms = _(terms).pluck("word");
  }

  return terms;
}

var createGlossary = function(opts) {
   return new Glossary(opts);
}

var glossary = createGlossary();

createGlossary.extract = _(glossary.extract).bind(glossary);

module.exports = createGlossary;
