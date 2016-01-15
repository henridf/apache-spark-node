"use strict";

var DataFrame = require("./DataFrame.js");
var java = require("./java");

/**
 * Interface used to load a {@link DataFrame} from external storage systems (e.g. file systems,
 * key-value stores, etc). Use {@link SQLContext#read} to access this.
 *
 * @since 1.4.0
 */
class DataFrameReader {

    /**
     * **Note:** Do not use directly (see above).
     */
    constructor (sqlContext /*: SQLContext*/) {
        var jvm_DataFrameReader = java.import("org.apache.spark.sql.DataFrameReader");
        this.sqlContext = sqlContext;
        this.jvm_obj = new jvm_DataFrameReader(sqlContext.jvm_obj);
    }

    /**
     * Not documenting this for now, redundant with json() and text()
     *
     * Specifies the input data source format.
     *
     * @private
     * @since 1.4.0
     */
    format(source /*: String */)/*: DataFrameReader */ {
        this.jvm_obj.format(source);
        return this;
    }

    /**
     * Not documenting this for now, redundant with json() and text()
     *
     * Loads data from a data source and returns it as a {@link DataFrame}.
     *
     * @private
     * @param [path=null] Optional path for file-system backed data sources.
     * @since 1.4.0
     */
    load(path=null /*: String */)/*: DataFrame */ { //
        if (path === null) {
            return new DataFrame(this.jvm_obj.load());
        } else {
            this.option("path", path);
            return this.load();
        }
    }

    loadAsync(cb)/*: DataFrame */ {
        this.jvm_obj.loadAsync((err, jvm_df) => {
            cb(new DataFrame(jvm_df))
        });
    }

    /**
     * Adds an input option for the underlying data source.
     *
     * @param key
     * @param value
     * @since 1.4.0
     */
    option(key /*: String */, value /*: String */) {
        this.jvm_obj.option(key, value);
        return this;
    }

    /**
     * Loads a JSON file (one object per line) and returns the result as a {@link DataFrame}.
     *
     * This function goes through the input once to determine the input schema.
     *
     * You can set the following JSON-specific options using {@link DataFrameReader#option} to deal with non-standard JSON files:
     * <li>`primitivesAsString` (default `false`): infers all primitive values as a string type</li>
     * <li>`allowComments` (default `false`): ignores Java/C++ style comment in JSON records</li>
     * <li>`allowUnquotedFieldNames` (default `false`): allows unquoted JSON field names</li>
     * <li>`allowSingleQuotes` (default `true`): allows single quotes in addition to double quotes
     * </li>
     * <li>`allowNumericLeadingZeros` (default `false`): allows leading zeros in numbers
     * (e.g. 00012)</li>
     *
     * @param path
     * @since 1.4.0
     */
    json(path /*: String */)/*: DataFrame */ { //
        return this.format("json").load(path);
    }

    jsonRDD_(jrdd /*: javaRDD[String] */) /*: DataFrame */ {
        return new DataFrame(this.jvm_obj.json(jrdd));
    }

    /**
     * Loads a text file and returns a {@link DataFrame} with a single string
     * column named "text". Each line in the text file is a new row in the
     * resulting DataFrame.
     *
     * @param path
     * @since 1.6.0
     */
    text(path /*: String */)/*: DataFrame */ { //
        return this.format("text").load(path);
    }
}

module.exports = DataFrameReader;
