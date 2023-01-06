/*!
 * Lunr languages, `Tamil` language
 * https://github.com/tvmani/lunr-languages
 *
 * Copyright 2021, Manikandan Venkatasubban
 * http://www.mozilla.org/MPL/
 */
/*!
 * based on
 * Snowball JavaScript Library v0.3
 * http://code.google.com/p/urim/
 * http://snowball.tartarus.org/
 *
 * Copyright 2010, Oleg Mazko
 * http://www.mozilla.org/MPL/
 */

/**
 * export the module via AMD, CommonJS or as a browser global
 * Export code from https://github.com/umdjs/umd/blob/master/returnExports.js
 */
;
(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(factory)
  } else if (typeof exports === 'object') {
    /**
     * Node. Does not work with strict CommonJS, but
     * only CommonJS-like environments that support module.exports,
     * like Node.
     */
    module.exports = factory()
  } else {
    // Browser globals (root is window)
    factory()(root.lunr);
  }
}(this, function() {
  /**
   * Just return a value to define the module export.
   * This example returns an object, but the module
   * can return a function as the exported value.
   */
  return function(lunr) {
    /* throw error if lunr is not yet included */
    if ('undefined' === typeof lunr) {
      throw new Error('Lunr is not present. Please include / require Lunr before this script.');
    }

    /* throw error if lunr stemmer support is not yet included */
    if ('undefined' === typeof lunr.stemmerSupport) {
      throw new Error('Lunr stemmer support is not present. Please include / require Lunr stemmer support before this script.');
    }

    /* register specific locale function */
    lunr.ka = function() {
      this.pipeline.reset();
      this.pipeline.add(
        lunr.ka.trimmer,
        lunr.ka.stopWordFilter,
        lunr.ka.stemmer
      );

      // change the tokenizer for japanese one
      if (isLunr2) { // for lunr version 2.0.0
        this.tokenizer = lunr.ka.tokenizer;
      } else {
        if (lunr.tokenizer) { // for lunr version 0.6.0
          lunr.tokenizer = lunr.ka.tokenizer;
        }
        if (this.tokenizerFn) { // for lunr version 0.7.0 -> 1.0.0
          this.tokenizerFn = lunr.ka.tokenizer;
        }
      }

      if (this.searchPipeline) {
        this.searchPipeline.reset();
        this.searchPipeline.add(lunr.ka.stemmer)
      }
    };

    /* lunr trimmer function */
    lunr.ka.wordCharacters = "\u10d3\u10d8\u10d3\u10d4\u10d1\u10d0 \u10e1\u10d0\u10e5\u10d0\u10e0\u10d7\u10d5\u10d4\u10da\u10dd\u10e1, \u10e6\u10db\u10d4\u10e0\u10d7\u10d8 \u10d0\u10e0\u10e1 \u10e9\u10d5\u10d4\u10dc\u10d7\u10d0\u10dc!a-zA-Zａ-ｚＡ-Ｚ0-9０-９";

    lunr.ka.trimmer = lunr.trimmerSupport.generateTrimmer(lunr.ka.wordCharacters);

    lunr.Pipeline.registerFunction(lunr.ka.trimmer, 'trimmer-ka');
    /* lunr stop word filter */
    lunr.ka.stopWordFilter = lunr.generateStopWordFilter(
      'იქ არის ის, რომ ის ისინი ისინი არიან ამიტომ ამიტომ, მაგრამ აქ ეს ეს ეს ეს ეს ეს ეს ეს ეს ეს ეს ეს ეს ეს ეს ეს ეს ეს ეს ეს ეს ეს ეს ეს ეს ეს ეს ეს ეს ეს ეს ეს ეს ეს ეს ეს ეს ეს ეს ეს ეს ეს ეს ეს ეს ეს ეს ეს ეს ეს ეს ეს ეს ეს ეს ეს ეს ეს ეს ეს ეს ეს ეს ეს ეს ეს ეს ეს ეს ეს ეს ეს ეს ამდენი თქვენ თქვენი თქვენ სად სად სად რა რა როგორ ვინ ვინ ვინ ვინ რამდენი მე ჩემი ასე ჩემი რა რა ჩემ მიერ რატომ თავისთავად ჩვენ ჩვენ მე შენ შენ'.split(' '));
    /* lunr stemmer function */
    lunr.ka.stemmer = (function() {

      return function(word) {
        // for lunr version 2
        if (typeof word.update === "function") {
          return word.update(function(word) {
            return word;
          })
        } else { // for lunr version <= 1
          return word;
        }

      }
    })();

    var segmenter = lunr.wordcut;
    segmenter.init();
    lunr.ka.tokenizer = function(obj) {
      if (!arguments.length || obj == null || obj == undefined) return []
      if (Array.isArray(obj)) return obj.map(function(t) {
        return isLunr2 ? new lunr.Token(t.toLowerCase()) : t.toLowerCase()
      });

      var str = obj.toString().toLowerCase().replace(/^\s+/, '');
      return segmenter.cut(str).split('|');
    }

    lunr.Pipeline.registerFunction(lunr.ka.stemmer, 'stemmer-ka');
    lunr.Pipeline.registerFunction(lunr.ka.stopWordFilter, 'stopWordFilter-ka');

  };
}))