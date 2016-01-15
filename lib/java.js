"use strict";

var path = require("path");
var java = require("java");

java.asyncOptions = {
    syncSuffix: "",           // Synchronous methods use the base name
    asyncSuffix: "Async",     // Async methods
    promiseSuffix: undefined  // don't generate promise wrappers
};

// Parent folder
java.classpath.push(path.normalize(__dirname+"/.."));

module.exports = java;
