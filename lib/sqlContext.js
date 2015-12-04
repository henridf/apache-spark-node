"use strict";

var DataFrameReader = require("./DataFrameReader");
var DataFrame = require("./DataFrame");
var java = require("./java");
var sqlc;


class SQLContext {

    constructor(jvm_sqlContext, jvm_javaSparkContext) {
        this.jvm_obj = jvm_sqlContext;
        this.jvm_jsc = jvm_javaSparkContext;
        this.jvm_DataFrame = java.import("org.apache.spark.sql.DataFrame");
    }

    /**
     * :: Experimental ::
     * Returns a [[DataFrame]] with no rows or columns.
     *
     * @group basic
     * @since 1.3.0
     */
    emptyDataFrame() {
        return this.jvm_obj.emptyDataFrame();
    }

    /**
     * :: Experimental ::
     * Returns a [[DataFrameReader]] that can be used to read data in as a [[DataFrame]].
     * {{{
     *   sqlContext.read.parquet("/path/to/file.parquet")
     *   sqlContext.read.schema(schema).json("/path/to/file.json")
     * }}}
     *
     * @group genericdata
     * @since 1.4.0
     */
    /* @Experimental */
    read() {
        return new DataFrameReader(this);
    }


    /**
     * :: Experimental ::
     * Creates a [[DataFrame]] with a single [[LongType]] column named `id`,
     * containing elements in a range with step value 1. If end is provided, the
     * range is from `start_or_end` to `end`. Otherwise it is from `0` to
     * `start_or_end`.
     *
     * @since 1.4.1
     * @group dataframe
     */
    /* @Experimental */
    range (start_or_end, end=null, step=null) {
        var start;
        if (end === null) {
            end = start_or_end;
            start = 0;
        } else {
            start = start_or_end;
        }

        if (step === null) {
            return this.jvm_obj.range(start, end);
        } else {
            return this.jvm_obj.range(start, end, step);
        }
    }

    /**
     * Executes a SQL query using Spark, returning the result as a [[DataFrame]]. The dialect that is
     * used for SQL parsing can be configured with 'spark.sql.dialect'.
     *
     * @group basic
     * @since 1.3.0
     */
    sql(sqlText /*: String*/) /*: DataFrame*/ {
        var logicalPlan = this.jvm_obj.parseSql(sqlText);
        var jvm_df = new this.jvm_DataFrame(this.jvm_obj, logicalPlan);
        return new DataFrame(jvm_df);
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
