"use strict";
var java = require("./java");

/**
 * Interface used to write a {@link DataFrame} to external storage systems
 * (e.g. file systems, key-value stores, etc). Use {@link DataFrame#write} to
 * access instances of this class.
 *
 * @since 1.4.0
 */
class DataFrameWriter {

    /**
     * **Note:** Do not use directly (see above).
     */
    constructor(df /*: DataFrame */) {
        var jvm_DataFrameWriter = java.import("org.apache.spark.sql.DataFrameWriter");
        this.jvm_obj = new jvm_DataFrameWriter(df.jvm_obj);
    }

    /**
     * Specifies the behavior when data or table already exists. Options
     * include:
     *   - `"overwrite"`: overwrite the existing data.
     *   - `"append"`: append the data.
     *   - `"ignore"`: ignore the operation (i.e. no-op).
     *   - `"error"`: default option, throw an exception at runtime.
     *
     * @param saveMode
     * @since 1.4.0
     */
    mode(saveMode /*: String */) /*: DataFrameWriter*/ {
        this.jvm_obj.mode(saveMode);
        return this;
    }

    /**
     * Not documenting this for now, redundant with json() and text()
     *
     * @private
     * @param source
     * @since 1.4.0
     */
    format(source /*: String */) /*: DataFrameWriter */ {
        this.jvm_obj.format(source);
        return this;
    }

    /**
     * Adds an input option for the underlying data source.
     *
     * @param key
     * @param value
     * @since 1.4.0
     */
    option(key /*: String */, value /*: String */) /*: DataFrameWriter */ {
        this.jvm_obj.option(key, value);
        return this;
    }


    /**
     * Not documenting this for now, as we don't expose Parquet yet
     *
     * Partitions the output by the given columns on the file system. If
     * specified, the output is laid out on the file system similar to Hive's
     * partitioning scheme.
     *
     * This is only applicable for Parquet at the moment.
     *
     * @private
     * @param colNames
     * @since 1.4.0
     */
    partitionBy(...colNames /*: String* */) /*: DataFrameWriter */ {
        this.jvm_obj.partitionBy(...colNames);
        return this;
    }

    /**
     * Not documenting this for now, redundant with json() and text()
     *
     * Saves the content of the {@link DataFrame} at the specified path.
     *
     * @private
     * @param [path=null]
     * @since 1.4.0
     */
    save(path=null /*: String */) /*: Unit */ { //
        if (path === null) {
            this.jvm_obj.save();
        } else {
            this.option("path", path);
            this.save();
        }
    }

    /**
     * Inserts the content of the {@link DataFrame} to the specified table. It
     * requires that the schema of the {@link DataFrame} is the same as the schema
     * of the table.
     *
     * Because it inserts data to an existing table, format or options will be
     * ignored.
     *
     * @param tableName
     * @since 1.4.0
     */
    insertInto(tableName /*: String */) /*: Unit */ { //
        this.jvm_obj.insertInto(tableName);
    }

    /**
     * Saves the content of the {@link DataFrame} as the specified table.
     *
     * In the case the table already exists, behavior of this function depends
     * on the save mode, specified by the `mode` function (default to throwing
     * an exception).  When `mode` is `Overwrite`, the schema of the
     * {@link DataFrame} does not need to be the same as that of the existing table.
     * When `mode` is `Append`, the schema of the {@link DataFrame} need to be the
     * same as that of the existing table, and format or options will be
     * ignored.
     *
     * When the DataFrame is created from a non-partitioned {@link HadoopFsRelation}
     * with a single input path, and the data source provider can be mapped to
     * an existing Hive builtin SerDe (i.e. ORC and Parquet), the table is
     * persisted in a Hive compatible format, which means other systems like
     * Hive will be able to read this table. Otherwise, the table is persisted
     * in a Spark SQL specific format.
     *
     * @param tableName
     * @since 1.4.0
     */
    saveAsTable(tableName /*: String */) /*: Unit */ { //
        this.jvm_obj.saveAsTable(tableName);
    }

    /**
     * Not exposing for now - need to provide a way to defined Properties first.
     *
     * Saves the content of the {@link DataFrame} to a external database table via
     * JDBC. In the case the table already exists in the external database,
     * behavior of this function depends on the save mode, specified by the
     * `mode` function (default to throwing an exception).
     *
     * Don't create too many partitions in parallel on a large cluster;
     * otherwise Spark might crash your external database systems.
     *
     * @param url JDBC database url of the form `jdbc:subprotocol:subname`
     * @param table Name of the table in the external database.
     * @param connectionProperties JDBC database connection arguments, a list of arbitrary string
     *                             tag/value. Normally at least a "user" and
     *                             "password" property should be included.
     *
     * @private
     * @since 1.4.0
     */
    jdbc(url /*: String */, table /*: String */, connectionProperties /*: Properties */) /*: Unit */ {
        this.jvm_obj(url, table, connectionProperties);
    }

    /**
     * Saves the content of the {@link DataFrame} in JSON format at the specified
     * path.
     *
     * @since 1.4.0
     */
    json(path /*: String */) /*: Unit */ { //
        this.jvm_obj.format("json").save(path);
    }

    /**
     * Saves the content of the {@link DataFrame} in a text file at the specified
     * path.  The DataFrame must have only one column that is of string type.
     * Each row becomes a new line in the output file.
     *
     *
     * @example
     * df.write().text("/path/to/output")
     * @since 1.6.0
     */
    text(path /*: String */) /*: Unit */ {//
        this.jvm_obj.format("text").save(path);
    }

}

module.exports = DataFrameWriter;
