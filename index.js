"use strict";

var spark = require("./js");
var functions = require("./js/functions");


module.exports = function (args, assembly_jar) {
    return {
        // don't expose sparkcontext until/if we support RDD's
        // sparkContext: spark.sparkContext(args, assembly_jar),
        sqlContext: spark.sqlContext(args, assembly_jar),
        sqlFunctions: functions()
    };
};
