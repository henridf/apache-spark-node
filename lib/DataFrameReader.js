'use strict';

var DataFrame = require('./DataFrame.js');


/**
 * :: Experimental ::
 * Interface used to load a [[DataFrame]] from external storage systems (e.g. file systems,
 * key-value stores, etc). Use [[SQLContext.read]] to access this.
 *
 * @since 1.4.0
 * @Experimental
 */
class DataFrameReader {

    constructor (sqlContext /*: SQLContext*/, java) {
        var jvm_DataFrameReader = java.import("org.apache.spark.sql.DataFrameReader");
        this.sqlContext = sqlContext;
        this.jvm_obj = new jvm_DataFrameReader(sqlContext.jvm_obj);
        this.java = java;
    }

    /**
     * Specifies the input data source format.
     *
     * @since 1.4.0
     */
    format(source /*: String */)/*: DataFrameReader */ {
        this.jvm_obj.format(source);
        return this;
    }

    /**
     * Loads data from a data source and returns it as a [[DataFrame]].
     *
     * @param path - optional string for file-system backed data sources.
     * @since 1.4.0
     */
    load(path=null /*: String */)/*: DataFrame */ {
        if (path === null) {
            return new DataFrame(this.jvm_obj.load(), this.java);
        } else {
            this.option("path", path);
            return this.load();
        }
    }

    /**
     * Adds an input option for the underlying data source.
     *
     * @since 1.4.0
     */
    option(key /*: String */, value /*: String */) {
        this.jvm_obj.option(key, value);
        return this;
    }

    /**
     * Loads a JSON file (one object per line) and returns the result as a [[DataFrame]].
     *
     * This function goes through the input once to determine the input schema. If you know the
     * schema in advance, use the version that specifies the schema to avoid the extra scan.
     *
     * You can set the following JSON-specific options to deal with non-standard JSON files:
     * <li>`primitivesAsString` (default `false`): infers all primitive values as a string type</li>
     * <li>`allowComments` (default `false`): ignores Java/C++ style comment in JSON records</li>
     * <li>`allowUnquotedFieldNames` (default `false`): allows unquoted JSON field names</li>
     * <li>`allowSingleQuotes` (default `true`): allows single quotes in addition to double quotes
     * </li>
     * <li>`allowNumericLeadingZeros` (default `false`): allows leading zeros in numbers
     * (e.g. 00012)</li>
     *
     * @param path input path
     * @since 1.4.0
     */
    json(path /*: String */)/*: DataFrame */ {
        return this.format("json").load(path);
    }

    /**
     * Loads a text file and returns a [[DataFrame]] with a single string column named "text".
     * Each line in the text file is a new row in the resulting DataFrame.
     *
     * @param path input path
     * @since 1.6.0
     */
    text(path /*: String */)/*: DataFrame */ {
        return this.format("text").load(path);
    }
}

module.exports = DataFrameReader;
