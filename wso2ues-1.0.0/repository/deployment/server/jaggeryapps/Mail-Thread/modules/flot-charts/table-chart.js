function processData(dbResult,timeSeries,dbLabelResults) {

    var labels={};
    var sender={};
    var subject={};
    var timestamp={};
    var emailcount={};

    for (var i = 0; i < dbResult.length; i++) {
    	//mail thread count
    	emailcount[i] = dbResult[i]["emailcount"];
    	//sender array
    	sender[i]= dbResult[i]["sender"];
    	//subject array
    	subject[i]= dbResult[i]["subject"];
    	//receive Date array
    	timestamp[i]= dbResult[i]["timestamp"];
    }
    
	labels[0]= "ALL";
	for (var i = 1; i <=dbLabelResults.length; i++) {
		//labels array
		labels[i]= dbLabelResults[i-1]["labels"];
	
	}

return {1 : labels,2 : sender,3 : subject,4 : timestamp,5 : emailcount};
}
