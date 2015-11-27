// Helpers to convert javascript objects to scala (via java)
//
// This is currently NOT suited for general use (and hence is not published as a standalone module).
//
// https://github.com/scala/scala/blob/v2.11.7/src/library/scala/collection/JavaConversions.scala
//
"use strict";

var java = require("java");
var List = java.import("java.util.ArrayList");
var HashMap = java.import ("java.util.HashMap")


// this currently works because we're importing the spark assembly jar elsewhere,
// but will need to import the scala library jar separately when this is split
// it into its own module
var convert = java.import("scala.collection.JavaConversions");


function syncMethodName(base) {
    return base + java.asyncOptions.syncSuffix;
}


// convert a js array into a buffer
function buffer(arr) {
    if (!Array.isArray(arr)) {
        return;
    }

    var l = new List();
    arr.forEach(function(el) {
        l[syncMethodName("add")](el);
    })
    return convert[syncMethodName("asScalaBuffer")](l)
}

// convert a js object into a map
function map(arr) {
    var hm = new HashMap();
    Object.keys(arr).forEach(function(k) {
        hm.put(k, arr[k]);
    })
    return convert[syncMethodName("asScalaMap")](hm)
}

// convert a js object into a set
function set(obj) {


}


module.exports = {
    buffer: buffer,
    map: map,
    set: set
}
