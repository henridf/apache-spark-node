var expect = require('chai').expect;
var spark = require('../');

var DataFrame = require('../js/DataFrame');
var Row = require('../js/Row');


describe('Smoke test', function() {
    var df, sqlContext;

    this.timeout(10000);

    before(function(done) {
        sqlContext= spark.sqlContext([], process.env.ASSEMBLY_JAR);
        done();
    });

    it('sqlContext.read().json() returns DataFrame', function(done) {
        var df = sqlContext.read().json("./data/people.json")
        expect(df).to.be.an.instanceof(DataFrame);
        done();
    })

    it('sqlContext.read().collect() returns array of Rows with correct values', function(done) {
        var rows = sqlContext.read().json("./data/people.json").collect();

        expect(rows).to.be.an.instanceof(Array);

        rows.forEach(function (row) { expect(row).to.be.an.instanceof(Row);})

        var values = rows.map(function(row) { return row.values(); });
        expect(values).to.deep.equal([[null, 'Michael'], [30, 'Andy'], [19, 'Justin']]);

        done();
    })

});

