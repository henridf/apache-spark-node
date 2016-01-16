"use strict";

var DataFrameReader = require("./DataFrameReader");
var DataFrame = require("./DataFrame");
var java = require("./java");
var sqlc;


/**
 * The entry point for working with structured data (rows and columns) in Spark.  Allows the
 * creation of {@link DataFrame} objects as well as the execution of SQL queries.
 *
 */
class SQLContext {

    /**
     * **Note:** Do not use directly. Access via {@link sqlContext}.
     */
    constructor(jvm_sqlContext, jvm_javaSparkContext) {
        this.jvm_obj = jvm_sqlContext;
        this.jvm_jsc = jvm_javaSparkContext;
        this.jvm_DataFrame = java.import("org.apache.spark.sql.DataFrame");
    }

    /**
     * Returns a {@link DataFrame} with no rows or columns.
     *
     * @since 1.3.0
     */
    emptyDataFrame() {
        return new DataFrame(this.jvm_obj.emptyDataFrame());
    }

    /**
     * Returns a {@link DataFrameReader} that can be used to read data in as a {@link DataFrame}.
     *
     * @since 1.4.0
     */
    read() {
        return new DataFrameReader(this);
    }


    /**
     * Creates a {@link DataFrame} with a single {@link LongType} column named `id`,
     * containing elements in a range with step value 1. If end is provided, the
     * range is from `start_or_end` to `end`. Otherwise it is from `0` to
     * `start_or_end`.
     *
     * @param start_or_end Start (if end is provided) or end of range.
     * @param [end=null] End of range.
     * @param [step=1] Step.
     * @since 1.4.1
     */
    range(start_or_end /*: Number */ , end=null /*: Number */, step=1 /*: Number */) /*: DataFrame */{
        var start, par;
        if (end === null) {
            end = start_or_end;
            start = 0;
        } else {
            start = start_or_end;
        }

        if (step === 1) {
            return new DataFrame(this.jvm_obj.range(start, end));
        } else {
            par = this.jvm_obj.sparkContext().defaultParallelism();
            return new DataFrame(this.jvm_obj.range(start, end, step, par));
        }
    }

    /**
     * Executes a SQL query using Spark, returning the result as a {@link
     * DataFrame}. The dialect that is used for SQL parsing can be configured
     * with 'spark.sql.dialect'.
     *
     * @param sqlText SQL query.
     * @since 1.3.0
     */
    sql(sqlText /*: String*/) /*: DataFrame*/ {
        var logicalPlan = this.jvm_obj.parseSql(sqlText);
        var jvm_df = new this.jvm_DataFrame(this.jvm_obj, logicalPlan);
        return new DataFrame(jvm_df);
    }

    /**
     * Creates a DataFrame from an array of rows, represented as javascript
     * objects. These objects should be serializable and deserializable
     * to/from json. This function goes through the input once to determine
     * the input schema.
     *
     * @param jsonArray Array of JSON objects.
     * @since 1.3.0
     */
    createDataFrame(jsonArray /*: Array[Object] */) /*: DataFrame*/ {
        var Arrays = java.import("java.util.Arrays");
        var strings = jsonArray.map(JSON.stringify);
        var jvm_List = Arrays.asList(...strings);
        var jvm_javaStringRDD = this.jvm_jsc.parallelize(jvm_List);

        return this.read().jsonRDD_(jvm_javaStringRDD);
    }
}

function sqlContext(sc, jsc) {
    if (sqlc) return sqlc;

    var jvm_SQLContext = java.import("org.apache.spark.sql.SQLContext");

    var jvm_obj = new jvm_SQLContext(sc);

    sqlc = new SQLContext(jvm_obj, jsc);
    return sqlc;
}

module.exports = sqlContext;
