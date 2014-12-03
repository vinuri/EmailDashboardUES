function processData(dbResult, mapping, dataColumns,dataLabels,timeSeries,dbLabelResults) {

    var result = [];
    var output = {};
    var labels={};
    for (var i = 0; i <	dbResult.length; i++) {
    
            if (!result[i]) {
              result[i] = dbResult[i]["mailcount"];
            }
    }
    labels[0]= "ALL";
    for (var i = 1; i <	dbLabelResults.length; i++) {
    	labels[i]= dbLabelResults[i-1]["labels"];
    }

    for (var j = 0; j < mapping.length; j++) {
        var tmpObj = {};
        tmpObj["label"] = mapping[j]["Series Label"];
        tmpObj["data"] = result[j];
        output["series" + j] = tmpObj;
    }

    var chartOptions = require("chart-options.json");

    return {0: output, 1: chartOptions,2 : labels};
}
