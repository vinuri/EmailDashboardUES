function processData(dbResult,timeSeries,dbLabelResults) {

    var result = [];
    var output = {};
    var labels={};
    var sender={};
    var subject={};
    var timestamp={};
    var idledays={};
    
    for (var i = 0; i < dbResult.length; i++) {
            	result[i] = dbResult[i]["emailcount"];
            	//sender array
            	sender[i]= dbResult[i]["sender"];
            	//subject array
            	subject[i]= dbResult[i]["subject"];
            	//receive Date array
            	timestamp[i]= dbResult[i]["timestamp"];
            	//idle days array
            	idledays[i]= dbResult[i]["idledays"];
    }

    for (var i = 0; i <	dbLabelResults.length; i++) {
    	//labels array
    	labels[i]= dbLabelResults[i]["labels"];
    }

    return {1 : labels,2 : sender,3 : subject,4 : timestamp,5 : idledays};
}

