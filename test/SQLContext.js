var expect = require("chai").expect;

var spark = require("..");

var DataFrame = require("../js/DataFrame");
var DataFrameReader = require("../js/DataFrameReader");

describe("SQLContext", function() {
    var sqlContext;
    this.timeout(10000);
    it("create sqlContext", function(done) {
        var args = ["--class", "org.apache.spark.repl.Main",
                    "shark-shell"];

        sqlContext = spark(args, process.env.ASSEMBLY_JAR).sqlContext;
        done();
    });

    it("emptyDataFrame() returns df with 0 rows", function(done) {
        var df = sqlContext.emptyDataFrame();
        expect(df).to.be.an.instanceof(DataFrame);
        expect(df.count()).to.equal(0);
        done();
    });

    it("read() returns a DataFrameReader", function(done) {
        var read = sqlContext.read();
        expect(read).to.be.an.instanceof(DataFrameReader);
        done();
    });

    it("range(3) returns a DataFrame with 0..2", function(done) {
        var df = sqlContext.range(3);
        var values = df.collect();

        expect(values).to.deep.equal([[0], [1], [2]]);
        done();
    });

    it("range(1, 4, 2) returns a DataFrame with 1,3", function(done) {
        var df = sqlContext.range(1, 4, 2);
        var values = df.collect();

        expect(values).to.deep.equal([[1], [3]]);
        done();
    });

    it("createDataFrame([{a: 1}, {b: 2}])", function(done) {
        var df = sqlContext.createDataFrame([{a: 1}, {b: 2}]);
        var values = df.collect();

        expect(values).to.deep.equal([[ 1, null ], [ null, 2 ]]);
        done();
    });

    it("sql(..) with simple SELECT statement", function(done) {
        var people = [{"name":"Michael"},
                      {"name":"Andy", "age":30},
                      {"name":"Justin", "age":19}];

        var df = sqlContext.createDataFrame(people);
        df.registerTempTable("people");
        var values = sqlContext.sql("SELECT name FROM people WHERE age >= 13 AND age <= 19").collect();

        expect(values).to.deep.equal([["Justin"]]);
        done();
    });


});
