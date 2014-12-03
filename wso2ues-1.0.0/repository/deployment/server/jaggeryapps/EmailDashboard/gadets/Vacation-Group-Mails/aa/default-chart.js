function processData(dbResult, mapping, dataColumns,dataLabels,timeSeries) {


    var result=[];
    var ticks = [];
    var tickTmp = [];
    var output = {};

    var count=[0,0,0,0,0];
    
    
    var tmpResult=["000","WFH","MHD","EHD","On Leave"];
    for (var i = 0; i < dbResult.length; i++){
    
    	switch(true){
    	case /ooo/ig.test(dbResult[i]["subject"]):
    		count[0] =count[0]+1;
            break;
    	case /WFH/ig.test(dbResult[i]["subject"]):
    		count[1] =count[1]+1;
            break;
    	case /Half.day/ig.test(dbResult[i]["subject"]):
    		switch(true){
	    		case /morning/ig.test(dbResult[i]["subject"]):
	    		count[2] =count[2]+1;
	            	break;
	    		default:
	    		count[3] =count[3]+1;
    		}
    		break;
    	default :
    		count[4] =count[4]+1;
    		
    	}

    }
    result[0]=[];
    for (var i = 0; i < 5; i++){
    	  result[0].push([i+1, count[i]]);
    	  ticks.push([i+1,tmpResult[i]]);
    	  
    	}

    for (var j = 0; j < mapping.length; j++) {

        var tmpObj = {};
        tmpObj["label"] = mapping[j]["Series Label"];
        tmpObj["data"] = result[0];
        output["series" + j] = tmpObj;
    }

    var chartOptions = require("chart-options.json");
    if(timeSeries){
        chartOptions["xaxis"]["timeformat"]= "%d/%m/%y";
        chartOptions["xaxis"]["mode"]= "time";
    } else{
        chartOptions["xaxis"]["ticks"]= ticks;
    }

    chartOptions.xaxis.axisLabel= dataLabels["X-Axis Label"]
    chartOptions.yaxis.axisLabel= dataLabels["Y-Axis Label"]

    return {0: output, 1: chartOptions};
}

function ct(time) {
    return new Date(time * 1000).getTime();   //convert unix time to mili-seconds
}