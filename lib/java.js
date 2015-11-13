var java = require('java');

java.asyncOptions = {
    syncSuffix: '',           // Synchronous methods the base name
    asyncSuffix: undefined,   // don't generate async (callback-style) wrappers
    promiseSuffix: undefined  // don't generate promise wrappers
}

java.classpath.push('/Users/henridf/work/apache-spark-node/');

module.exports = java;
