function processData(dbResult, mapping, dataColumns,dataLabels,timeSeries,sum) {

    var result = [];
    var output = {};

    for (var i = 0; i <	dbResult.length; i++) {
        
     //   if (!result[i]) {
          result[i] = dbResult[i]["mail"];
       // }
    }		
    result[result.length] = sum;
    for (var j = 0; j < mapping.length; j++) {
        var tmpObj = {};
        tmpObj["label"] = mapping[j]["Series Label"];
        tmpObj["data"] = result[j];
        output["series" + j] = tmpObj;
    }
    var chartOptions = require("chart-options.json");

    return {0: output, 1: chartOptions};
}

