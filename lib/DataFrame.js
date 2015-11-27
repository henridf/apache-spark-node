"use strict";

//var DataFrameWriter = require('./DataFrameWriter');
var GroupedData = require("./GroupedData");
var Row = require("./Row");
var java = require("./java");

class DataFrame {

    constructor(jvm_obj) {
        this.jvm_obj = jvm_obj;
    }

    /**
     * Returns a new [[DataFrame]] with with new specified column names.
     * @param colNames - array of new column names
     * @group basic
     * @since 1.3.0
     */
    /* @scala.annotation.varargs */
    toDF(...colNames /*: String* */) /*: DataFrame*/ {
        var new_jvm_obj = this.jvm_obj.toDF(...colNames);
        return new DataFrame(new_jvm_obj);
    }

    /**
     * Returns all column names as an array.
     * @group basic
     * @since 1.3.0
     */
    columns() /*: Array[String]*/ {
        return this.jvm_obj.columns();
    }

    /**
     * Prints the schema to the console in a nice tree format.
     * @group basic
     * @since 1.3.0
     */
    printSchema() /*: Unit */ {
        this.jvm_obj.printSchema();
    }

    /**
     * Prints the plans (logical and physical) to the console for debugging purposes.
     * @group basic
     * @since 1.3.0
     */
    explain(extended=false /*: Boolean */) /*: Unit */ {
        this.jvm_obj.explain(extended);
    }

    /**
     * Returns true if the `collect` and `take` methods can be run locally
     * (without any Spark executors).
     * @group basic
     * @since 1.3.0
     */
    isLocal() /*: Boolean*/ {
        return this.jvm_obj.isLocal();
    }

    /**
     * Displays the [[DataFrame]] in a tabular form. Strings more than 20 characters will be
     * truncated, and all cells will be aligned right. For example:
     * {{{
     *   year  month AVG('Adj Close) MAX('Adj Close)
     *   1980  12    0.503218        0.595103
     *   1981  01    0.523289        0.570307
     *   1982  02    0.436504        0.475256
     *   1983  03    0.410516        0.442194
     *   1984  04    0.450090        0.483521
     * }}}
     *
     * @param numRows Number of rows to show
     *
     * @param truncate If true, strings more than 20 characters will
     *              be truncated and all cells will be aligned right
     *
     * @group action
     * @since 1.3.0
     */
    show(numRows=20 /*: Int */, truncate=true /*: Boolean */) /*: Unit */ {
        this.jvm_obj.show(numRows, truncate);
    }


    /**
     * Join with another [[DataFrame]].
     *
     * If no `col` is provided, does a Cartesian join. (Note that cartesian
     * joins are very expensive without an extra filter that can be pushed
     * down).
     * If a column name (string) is provided, does an equi-join.
     * If a column expression is provided, uses that as a join expression.
     *
     * The following performs
     * a full outer join between `df1` and `df2`.
     *   df1.join(df2, col("df1Key").equalTo(col("df2Key")), "outer");
     *
     * @param right Right side of the join.
     * @param col Column name or join expression.
     * @param joinType One of: `inner`, `outer`, `left_outer`, `right_outer`, `leftsemi`.
     * @group dfops
     * @since 1.3.0
     */
    join(right /*: DataFrame */, col=null /*: Column|String */, joinType="inner" /*: String*/) /*: DataFrame */ {
        if (col === null) {
            return new DataFrame(this.jvm_obj.join(right));
        } else {
            return new DataFrame(this.jvm_obj.join(right, col, joinType));
        }
    }

    /**
     * Returns a new [[DataFrame]] sorted by the specified column, all in ascending order.
     * @group dfops
     * @since 1.3.0
     */
    /* @scala.annotation.varargs */
    sort(col /*: (Column | String) */, ...cols /*: (Column* | String*) */) /*: DataFrame */ {
        return new DataFrame(this.jvm_obj.sort(col, ...cols));
    }

    /**
     * Selects column based on the column name and return it as a [[Column]].
     * Note that the column name can also reference to a nested column like `a.b`.
     * @group dfops
     * @since 1.3.0
     */
    col(colName /*: String */) /*: Column */ {
        return this.jvm_obj.col(colName);
    }

    /**
     * Selects a set of column based expressions.
     *
     * @group dfops
     * @since 1.3.0
     */
    /* @scala.annotation.varargs */
    select(...cols /*: (Column* | String*) */) /*: DataFrame */ {
        return new DataFrame(this.jvm_obj.select(...cols));
    }

    /**
     * Selects a set of SQL expressions. This is a variant of `select` that accepts
     * SQL expressions.
     *
     * @group dfops
     * @since 1.3.0
     */
    /* @scala.annotation.varargs */
    selectExpr(...exprs /*: String* */) /*: DataFrame */ {
        return new DataFrame(this.jvm_obj.selectExpr(...exprs));
    }

    /**
     * Filters rows using the given column expression or SQL expression.
     * {{{
     *   // The following are equivalent:
     *   peopleDf.filter(peopleDf.col("age").gt(15))
     *   peopleDf.filter("age > 15")
     * }}}
     * @group dfops
     * @since 1.3.0
     */
    filter(condition /*: Column|String */) /*: DataFrame */ {
        return new DataFrame(this.jvm_obj.filter(condition));
    }

    /**
     * Filters rows using the given condition. This is an alias for `filter`.
     * @group dfops
     * @since 1.3.0
     */
    where(condition /*: Column */) /*: DataFrame */ {
        return new DataFrame(this.jvm_obj.filter(condition));
    }

    /**
     * Groups the [[DataFrame]] using the specified columns, so we can run aggregation on them.
     * See [[GroupedData]] for all the available aggregate functions.
     *
     * {{{
     *   // Compute the average for all numeric columns grouped by department.
     *   df.groupBy("department").avg()
     *
     * }}}
     * @group dfops
     * @since 1.3.0
     */
    /* @scala.annotation.varargs */
    groupBy(...cols /*: (Column* | String*) */) /*: GroupedData */ {
        return new GroupedData(this.jvm_obj.groupBy(...cols));
    }

    /**
     * Create a multi-dimensional rollup for the current [[DataFrame]] using the specified columns,
     * so we can run aggregation on them.
     * See [[GroupedData]] for all the available aggregate functions.
     *
     * {{{
     *   // Compute the average for all numeric columns rolluped by department and group.
     *   df.rollup($"department", $"group").avg()
     *
     * }}}
     * @group dfops
     * @since 1.4.0
     */
    /* @scala.annotation.varargs */
    rollup(...cols /*: (Column* | String*) */) /*: GroupedData */ {
        return new GroupedData(this.jvm_obj.rollup(...cols));
    }

    /**
     * Create a multi-dimensional cube for the current [[DataFrame]] using the specified columns,
     * so we can run aggregation on them.
     * See [[GroupedData]] for all the available aggregate functions.
     *
     * {{{
     *   // Compute the average for all numeric columns cubed by department and group.
     *   df.cube("department", "group").avg()
     * }}}
     * @group dfops
     * @since 1.4.0
     */
    /* @scala.annotation.varargs */
    cube(...cols /*: (Column*|String*) */) /*: GroupedData */ {
        return new GroupedData(this.jvm_obj.cube(...cols));
    }

    /**
     * Aggregates on the entire [[DataFrame]] without groups.
     * {{{
     *   // df.agg(...) is a shorthand for df.groupBy().agg(...)
     *   df.agg(max("age"), avg("salary"))
     *   df.groupBy().agg(max("age"), avg("salary"))
     * }}}
     * @group dfops
     * @since 1.3.0
     */
    /* @scala.annotation.varargs */
    agg(...cols /*: Column* */) /*: DataFrame */ {
        return new DataFrame(this.jvm_obj.agg(...cols));
    }

    /**
     * Returns a new [[DataFrame]] by taking the first `n` rows. The difference between this function
     * and `head` is that `head` returns an array while `limit` returns a new [[DataFrame]].
     * @group dfops
     * @since 1.3.0
     */
    limit(n /*: Int */) /*: DataFrame */ {
        return new DataFrame(this.jvm_obj.limit(n));
    }

    /**
     * Returns a new [[DataFrame]] containing union of rows in this frame and another frame.
     * This is equivalent to `UNION ALL` in SQL.
     * @group dfops
     * @since 1.3.0
     */
    unionAll(other /*: DataFrame */) /*: DataFrame */ {
        return new DataFrame(this.jvm_obj.unionAll(other));
    }

    /**
     * Returns a new [[DataFrame]] containing rows only in both this frame and another frame.
     * This is equivalent to `INTERSECT` in SQL.
     * @group dfops
     * @since 1.3.0
     */
    intersect(other /*: DataFrame */) /*: DataFrame */ {
        return new DataFrame(this.jvm_obj.intersect(other));
    }

    /**
     * Returns a new [[DataFrame]] containing rows in this frame but not in another frame.
     * This is equivalent to `EXCEPT` in SQL.
     * @group dfops
     * @since 1.3.0
     */
    except(other /*: DataFrame */) /*: DataFrame */ {
        return new DataFrame(this.jvm_obj.except(other));
    }

    /**
     * Returns a new [[DataFrame]] by sampling a fraction of rows, using a random seed.
     *
     * @param withReplacement Sample with replacement or not.
     * @param fraction Fraction of rows to generate.
     * @group dfops
     * @since 1.3.0
     */
    sample(withReplacement /*: Boolean */, fraction /*: Double */) /*: DataFrame */ {
        return new DataFrame(this.jvm_obj.sample(withReplacement, fraction));
    }

    /**
     * Randomly splits this [[DataFrame]] with the provided weights.
     *
     * @param weights weights for splits, will be normalized if they don't sum to 1.
     * @param seed Seed for sampling.
     * @group dfops
     * @since 1.4.0
     */
    randomSplit(...weights /*: Double* */) /*: Array[DataFrame]*/ {

        throw new Error("Not implemented");

        // for some reason, this crashes the jvm. yet constructing the array
        // in the shell and passing it directly works. haven't dug into the
        // node-java code yet.

        /*eslint-disable no-unreachable*/
        var weightsArray = java.newArray("double", weights);

        return this.jvm_obj.randomSplit(weightsArray);
        /*eslint-enable no-unreachable*/

    }


    /**
     * Returns a new [[DataFrame]] by adding a column or replacing the existing column that has
     * the same name.
     * @group dfops
     * @since 1.3.0
     */
    withColumn(colName /*: String */, col /*: Column */) /*: DataFrame */ {
        return new DataFrame(this.jvm_obj.withColumn(colName, col));
    }


    /**
     * Returns a new [[DataFrame]] with a column dropped.
     * This is a no-op if schema doesn't contain column name.
     * @group dfops
     * @since 1.4.0
     */
    drop(col /*: String|Column */) /*: DataFrame */ {
        return new DataFrame(this.jvm_obj.drop(col));
    }


    /**
     * Returns a new [[DataFrame]] that contains only the unique rows from this [[DataFrame]].
     * This is an alias for `distinct`.
     * If column names are passed in, Rows are only compared in those columns.
     *
     * @group dfops
     * @since 1.4.0
     */
    dropDuplicates(...colNames /*: String* */) /*: DataFrame */ {
        return new DataFrame(this.jvm_obj.drop(...colNames));
    }

    /**
     * Returns a new [[DataFrame]] that contains only the unique rows from this [[DataFrame]].
     * This is an alias for `dropDuplicates`.
     * @group dfops
     * @since 1.3.0
     */
    distinct() /*: DataFrame */ {
        return new DataFrame(this.jvm_obj.drop());
    }

    /**
     * Computes statistics for numeric columns, including count, mean, stddev, min, and max.
     * If no columns are given, this computes statistics for all numerical columns.
     *
     * This is meant for exploratory data analysis, as we make no guarantee about the
     * backward compatibility of the schema of the resulting [[DataFrame]]. If you want to
     * programmatically compute summary statistics, use the `agg` instead.
     *
     * {{{
     *   df.describe("age", "height").show()
     *
     *   // output:
     *   // summary age   height
     *   // count   10.0  10.0
     *   // mean    53.3  178.05
     *   // stddev  11.6  15.7
     *   // min     18.0  163.0
     *   // max     92.0  192.0
     * }}}
     *
     * @group action
     * @since 1.3.1
     */
    /* @scala.annotation.varargs */
    describe(...cols /*: String* */) /*: DataFrame */ {
        return new DataFrame(this.jvm_obj.describe(...cols));

    }

    /**
     * Returns the first `n` rows.
     * @group action
     * @since 1.3.0
     *
     * Running take requires moving data into the application's driver process, and doing so with
     * a very large `n` can crash the driver process with OutOfMemoryError.
     */
    head(n=1 /*: Int */) /*: Array[Row]*/ {
        return this.jvm_obj.head(n)
            .map(row => new Row(row));
    }

    /**
     * Returns an array that contains all of [[Row]]s in this [[DataFrame]].
     *
     * Running collect requires moving all the data into the application's driver process, and
     * doing so on a very large dataset can crash the driver process with OutOfMemoryError.
     *
     * For Java API, use [[collectAsList]].
     *
     * @group action
     * @since 1.3.0
     */
    collect() /*: Array[Row]*/ {
        return this.jvm_obj.collect()
            .map(row => new Row(row));
    }

    /**
     * Returns the number of rows in the [[DataFrame]].
     * @group action
     * @since 1.3.0
     */
    count() /*: Long */ {
        return this.jvm_obj.count();
    }

    /**
     * Returns a partitioned [[DataFrame]].
     *
     * If partition expresions are provided, partitioned by the given partitioning expressions into
     * `numPartitions`. The resulting DataFrame is hash partitioned. (This is the same operation as "DISTRIBUTE BY" in SQL (Hive QL).)
     *
     * @group dfops
     * @since 1.3.0
     */
    repartition(numPartitions /*: Int */, ...partitionExprs /*: Column* */) /*: DataFrame */ {
        if (partitionExprs.length===0) {
            return new DataFrame(this.jvm_obj.repartition(numPartitions));
        } else {
            return new DataFrame(this.jvm_obj.repartition(numPartitions, partitionExprs /*: Column* */));
        }
    }



    /**
     * Registers this [[DataFrame]] as a temporary table using the given name.  The lifetime of this
     * temporary table is tied to the [[SQLContext]] that was used to create this DataFrame.
     *
     * @group basic
     * @since 1.3.0
     */
    registerTempTable(tableName /*: String */) /*: Unit */ {
        this.jvm_obj.registerTempTable(tableName);
    }

    /**
     * :: Experimental ::
     * Interface for saving the content of the [[DataFrame]] out into external storage.
     *
     * @group output
     * @since 1.4.0
     */
    write() /*: DataFrameWriter*/ {
        // xxx
    }
}

module.exports = DataFrame;
