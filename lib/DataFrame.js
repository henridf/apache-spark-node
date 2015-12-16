"use strict";

var DataFrameWriter = require("./DataFrameWriter");
var GroupedData = require("./GroupedData");
var Row = require("./Row");
var java = require("./java");

/**
 * A distributed collection of data organized into named columns.
 *
 * DataFrames can be created using various functions in {@link SQLContext}.
 * They can be manipulated using the various domain-specific-language (DSL)
 * functions defined in: {@link DataFrame} (this class), {@link Column}, and
 * {@link Functions}.
 *
 * @example <caption>To select a column from the data frame, use the <code>col</code> method.</caption>
 *   var ageCol = people.col("age");
 *
 * @example <caption>Note that the {@link Column} type can also be manipulated through its various functions.</caption>
 *   // The following creates a new column that increases everybody's age by 10.
 *   people.col("age").plus(10);
 *
 * @example <caption>A more complete example.</caption>
 *   var people = sqlContext.read().json("...");
 *   var department = sqlContext.read().json("...");
 *
 *   people.filter("age > 30")
 *     .join(department, people.col("deptId").eq(department.col("id")))
 *     .groupBy(department.col("name"), people.col("gender"))
 *     .agg(F.avg(people.col("salary")), F.max(people.col("age")));
 *
 * @since 1.3.0
 */
class DataFrame {

    /**
     * **Note:** Do not use directly (see above).
     */
    constructor(jvm_obj) {
        this.jvm_obj = jvm_obj;
    }

    /**
     * Returns a new {@link DataFrame} with new specified column names.
     * @param colNames Array of new column names.
     * @since 1.3.0
     */
    toDF(...colNames /*: String* */) /*: DataFrame*/ {
        var new_jvm_obj = this.jvm_obj.toDF(...colNames);
        return new DataFrame(new_jvm_obj);
    }

    /**
     * Returns all column names as an array.
     * @since 1.3.0
     */
    columns() /*: Array[String]*/ {
        return this.jvm_obj.columns();
    }

    /**
     * Prints the schema to the console in a nice tree format.
     * @since 1.3.0
     */
    printSchema() /*: Unit */ {
        this.jvm_obj.printSchema();
    }

    /**
     * Prints the plans (logical and physical) to the console for debugging purposes.
     * @param {string} [extended=false]
     * @since 1.3.0
     */
    explain(extended=false /*: Boolean */) /*: Unit */ {
        this.jvm_obj.explain(extended);
    }

    /**
     * Returns true if the `collect` and `take` methods can be run locally
     * (without any Spark executors).
     * @since 1.3.0
     */
    isLocal() /*: Boolean*/ {
        return this.jvm_obj.isLocal();
    }

    /**
     * Displays the {@link DataFrame} in a tabular form. Strings more than 20 characters will be
     * truncated, and all cells will be aligned right.
     *
     * @param {Number} [numRows=20] Number of rows to show.
     *
     * @param {Boolean} [truncate=true] If true, strings more than 20 characters will
     *              be truncated and all cells will be aligned right.
     *
     * @since 1.3.0
     */
    show(numRows=20 /*: Int */, truncate=true /*: Boolean */) /*: Unit */ {
        this.jvm_obj.show(numRows, truncate);
    }


    /**
     * Join with another {@link DataFrame}.
     *
     * If no `col` is provided, does a Cartesian join. (Note that cartesian
     * joins are very expensive without an extra filter that can be pushed
     * down).
     *
     * If a column name (string) is provided, does an equi-join.
     *
     * If a column expression is provided, uses that as a join expression.
     *
     * @example <caption>perform a full outer join between <code>df1</code> and <code>df2</code></caption>
     * df1.join(df2, col("df1Key").equalTo(col("df2Key")), "outer");
     *
     * @param right Right side of the join.
     * @param [col=null] Column name or join expression.
     * @param [joinType="inner"] One of: `inner`, `outer`, `left_outer`, `right_outer`, `leftsemi`.
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
     * Returns a new {@link DataFrame} sorted by the specified column, all in ascending order.
     * @param col {@link Column}
     * @param cols Array of additional column names or expressions to sort by.
     * @since 1.3.0
     */
    sort(col /*: (Column | String) */, ...cols /*: (Column* | String*) */) /*: DataFrame */ {
        return new DataFrame(this.jvm_obj.sort(col, ...cols));
    }

    /**
     * Selects column based on the column name and return it as a {@link Column}.
     * Note that the column name can also reference to a nested column like `a.b`.
     * @param colName
     * @since 1.3.0
     */
    col(colName /*: String */) /*: Column */ {
        return this.jvm_obj.col(colName);
    }

    /**
     * Selects a set of column based expressions.
     *
     * @param cols Array of column names or expressions.
            If one of the column names is '*', that column is expanded to include all columns
            in the current DataFrame.
     * @since 1.3.0
     */
    select(...cols /*: (Column* | String*) */) /*: DataFrame */ {
        return new DataFrame(this.jvm_obj.select(...cols));
    }

    /**
     * Selects a set of SQL expressions. This is a variant of `select` that accepts
     * SQL expressions.
     *
     * @param exprs Array of SQL expressions.
     * @since 1.3.0
     */
    selectExpr(...exprs /*: String* */) /*: DataFrame */ {
        return new DataFrame(this.jvm_obj.selectExpr(...exprs));
    }

    /**
     * Filters rows using the given column expression or SQL expression.
     * @example <caption>The following are equivalent:</caption>
     *   peopleDf.filter(peopleDf.col("age").gt(15));
     *   peopleDf.filter("age > 15");
     * @param condition A {@link Column} of booleans or a string containing a SQL expression.
     * @since 1.3.0
     */
    filter(condition /*: Column|String */) /*: DataFrame */ {
        return new DataFrame(this.jvm_obj.filter(condition));
    }

    /**
     * Filters rows using the given condition. This is an alias for `filter`.
     * @param condition
     * @since 1.3.0
     */
    where(condition /*: Column|String */) /*: DataFrame */ {
        return new DataFrame(this.jvm_obj.filter(condition));
    }

    /**
     * Groups the {@link DataFrame} using the specified columns, so we can run aggregations on them.
     * See {@link GroupedData} for all the available aggregation functions.
     *
     * @example <caption>Compute the average for all numeric columns grouped by department.</caption>
     *   df.groupBy("department").avg();
     *
     * @param cols Array of column names or expressions to group by.
     * @since 1.3.0
     */
    groupBy(...cols /*: (Column* | String*) */) /*: GroupedData */ {
        return new GroupedData(this.jvm_obj.groupBy(...cols));
    }

    /**
     * Create a multi-dimensional rollup for the current {@link DataFrame} using the specified columns,
     * so we can run aggregations on them.
     * See {@link GroupedData} for all the available aggregation functions.
     *
     * @example
     * // Compute the average for all numeric columns rolluped by department and group
     *   df.rollup(df.col("department"), df.col("group")).avg();
     *
     * @param cols Array of column names or expressions.
     * @since 1.4.0
     */
    rollup(...cols /*: (Column* | String*) */) /*: GroupedData */ {
        return new GroupedData(this.jvm_obj.rollup(...cols));
    }

    /**
     * Create a multi-dimensional cube for the current {@link DataFrame} using the specified columns,
     * so we can run aggregation on them.
     * See {@link GroupedData} for all the available aggregation functions.
     *
     * @example
     *   // Compute the average for all numeric columns cubed by department and group.
     *   df.cube("department", "group").avg();
     *
     * @param cols Array of column names or expressions.
     * @since 1.4.0
     */
    cube(...cols /*: (Column*|String*) */) /*: GroupedData */ {
        return new GroupedData(this.jvm_obj.cube(...cols));
    }

    /**
     * Aggregates on the entire {@link DataFrame} without groups.
     * @example
     *   // df.agg(...) is a shorthand for df.groupBy().agg(...)
     *   df.agg(F.max(df.col("age")), F.avg(df.col("salary")));
     *   df.groupBy().agg(F.max(df.col("age")), F.avg(df.col("salary")));
     *
     * @param cols Array of column names or expressions.
     * @since 1.3.0
     */
    agg(...cols /*: Column* */) /*: DataFrame */ {
        return new DataFrame(this.jvm_obj.agg(...cols));
    }

    /**
     * Returns a new {@link DataFrame} by taking the first `n` rows. The difference between this function
     * and `head` is that `head` returns an array while `limit` returns a new {@link DataFrame}.
     * @param n Number of rows.
     * @since 1.3.0
     */
    limit(n /*: Int */) /*: DataFrame */ {
        return new DataFrame(this.jvm_obj.limit(n));
    }

    /**
     * Returns a new {@link DataFrame} containing union of rows in this frame and another frame.
     * This is equivalent to `UNION ALL` in SQL.
     * @param other {@link DataFrame}
     * @since 1.3.0
     */
    unionAll(other /*: DataFrame */) /*: DataFrame */ {
        return new DataFrame(this.jvm_obj.unionAll(other));
    }

    /**
     * Returns a new {@link DataFrame} containing rows only in both this frame and another frame.
     * This is equivalent to `INTERSECT` in SQL.
     * @param other {@link DataFrame}
     * @since 1.3.0
     */
    intersect(other /*: DataFrame */) /*: DataFrame */ {
        return new DataFrame(this.jvm_obj.intersect(other));
    }

    /**
     * Returns a new {@link DataFrame} containing rows in this frame but not in another frame.
     * This is equivalent to `EXCEPT` in SQL.
     * @param other {@link DataFrame}
     * @since 1.3.0
     */
    except(other /*: DataFrame */) /*: DataFrame */ {
        return new DataFrame(this.jvm_obj.except(other));
    }

    /**
     * Returns a new {@link DataFrame} by sampling a fraction of rows, using a random seed.
     *
     * @param withReplacement Sample with replacement or not.
     * @param fraction Fraction of rows to generate.
     * @since 1.3.0
     */
    sample(withReplacement /*: Boolean */, fraction /*: Double */) /*: DataFrame */ {
        return new DataFrame(this.jvm_obj.sample(withReplacement, fraction));
    }

    /**
     * Randomly splits this {@link DataFrame} with the provided weights.
     *
     * @param weights Weights for splits, will be normalized if they don't sum to 1.
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
     * Returns a new {@link DataFrame} by adding a column or replacing the existing column that has
     * the same name.
     * @param colName Name of the new column.
     * @param col {@link Column} Expression for the new column.
     * @since 1.3.0
     */
    withColumn(colName /*: String */, col /*: Column */) /*: DataFrame */ {
        return new DataFrame(this.jvm_obj.withColumn(colName, col));
    }


    /**
     * Returns a new {@link DataFrame} with a column dropped.
     * This is a no-op if schema doesn't contain column name.
     * @param col {@link Column}
     * @since 1.4.0
     */
    drop(col /*: String|Column */) /*: DataFrame */ {
        return new DataFrame(this.jvm_obj.drop(col));
    }


    /**
     * Returns a new {@link DataFrame} that contains only the unique rows from this {@link DataFrame}.
     * This is an alias for `distinct`.
     * If column names are passed in, rows are only compared in those columns.
     *
     * @param colNames Array of column names.
     * @since 1.4.0
     */
    dropDuplicates(...colNames /*: String* */) /*: DataFrame */ {
        return new DataFrame(this.jvm_obj.drop(...colNames));
    }

    /**
     * Returns a new {@link DataFrame} that contains only the unique rows from this {@link DataFrame}.
     * This is an alias for `dropDuplicates`.
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
     * backward compatibility of the schema of the resulting {@link DataFrame}. If you want to
     * programmatically compute summary statistics, use the `agg` method instead.
     *
     * @example
     *   df.describe("age", "height").show();
     *
     *   // output:
     *   // summary age   height
     *   // count   10.0  10.0
     *   // mean    53.3  178.05
     *   // stddev  11.6  15.7
     *   // min     18.0  163.0
     *   // max     92.0  192.0
     *
     * @param cols Array of column names.
     *
     * @since 1.3.1
     */
    describe(...cols /*: String* */) /*: DataFrame */ {
        return new DataFrame(this.jvm_obj.describe(...cols));
    }

    /**
     * Returns the first `n` rows.
     *
     * Running take requires moving data into the application's driver process, and doing so with
     * a very large `n` can crash the driver process with OutOfMemoryError.
     *
     * @param {Number} [n=1] Number of rows to return.
     *
     * @since 1.3.0
     */
    head(n=1 /*: Int */) /*: Array[Object]*/ {
        return this.jvm_obj.head(n)
            .map(row => new Row(row).values());
    }

    /**
     * Returns an array that contains all of {@link Row}s in this {@link DataFrame}.
     *
     * Running collect requires moving all the data into the application's driver process, and
     * doing so on a very large dataset can crash the driver process with OutOfMemoryError.
     *
     * @since 1.3.0
     */
    collect() /*: Array[Object]*/ {
        return this.jvm_obj.collect()
            .map(row => new Row(row).values());
    }

    /**
     * Returns the number of rows in the {@link DataFrame}.
     * @since 1.3.0
     */
    count() /*: Number */ {
        return this.jvm_obj.count().valueOf();
    }

    /**
     * Returns a partitioned {@link DataFrame}.
     *
     * If partition expressions are provided, partition by the given
     * partitioning expressions into `numPartitions`. The resulting DataFrame
     * is hash partitioned. (This is the same operation as "DISTRIBUTE BY" in
     * SQL (Hive QL).)
     *
     * @param {Number} [numPartitions] Number of partitions.
     * @param partitionExprs Partitioning expressions.
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
     * Registers this {@link DataFrame} as a temporary table using the given name.  The lifetime of this
     * temporary table is tied to the {@link SQLContext} that was used to create this DataFrame.
     *
     * @param tableName Table name.
     * @since 1.3.0
     */
    registerTempTable(tableName /*: String */) /*: Unit */ {
        this.jvm_obj.registerTempTable(tableName);
    }

    /**
     * Interface for saving the content of the {@link DataFrame} out into external storage.
     * @since 1.4.0
     */
    write() /*: DataFrameWriter*/ {
        return new DataFrameWriter(this);
    }
}

module.exports = DataFrame;
