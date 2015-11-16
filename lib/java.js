var path = require('path');
var java = require('java');

java.asyncOptions = {
    syncSuffix: '',           // Synchronous methods the base name
    asyncSuffix: undefined,   // don't generate async (callback-style) wrappers
    promiseSuffix: undefined  // don't generate promise wrappers
};

// Parent folder
java.classpath.push(path.normalize(__dirname+'/..'));

module.exports = java;
