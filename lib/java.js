var java = require('java');

java.asyncOptions = {
    syncSuffix: '',           // Synchronous methods the base name
    asyncSuffix: undefined,   // don't generate async (callback-style) wrappers
    promiseSuffix: undefined  // don't generate promise wrappers
}

var pathArray = __dirname.split("/");

// Dynamic path
java.classpath.push(pathArray.slice(0,pathArray.length-1).join("/")+"/");

module.exports = java;
