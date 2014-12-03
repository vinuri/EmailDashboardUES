var pref = new gadgets.Prefs();
var Labels= [];
var sender= [];
var subject= [];
var timestamp=[];
var emailcount=[];
var dropDownId =0;
var dropDownSize =0;

$(function () {
	setInterval(function () {dropDownAutoSelect()}, 20000);
    $("#dropDownList").change(function(e){
        dropDownId = $(this).val();
        fetchDataPost(dropDownId);
        deleteRow("tableIdle");
    });
    fetchData();

});

function fetchData() {
    var url = pref.getString("dataSource");

    $.ajax({
        url: url,
        type: "GET",
        dataType: "json",
        success: onDataReceived
    });
}

function fetchDataPost(data) {
    var url = pref.getString("dataSource");

    $.ajax({
        url: url,
        type: "POST",
        dataType: "json",
        ContentType: "json",
        data:data,
        success: onDataReceived
    });

}

function onDataReceived(series) {
    Labels = series[1];
    sender= series[2];
    subject= series[3];
    timestamp=series[4];
    emailcount=series[5];

    addSeriesDropDowns(Labels);
    drawTable(sender,subject,timestamp,emailcount);
}
function dropDownAutoSelect(){
	
	if(dropDownId>=dropDownSize-1){
		dropDownId=-1;
	}
	else{
		 dropDownId++;
		deleteRow("tableIdle");
		fetchDataPost(String(dropDownId));
		 
	}
}
function addSeriesDropDowns(data) {
    // insert DropDown
    var seriesContainer = $("#listData .dropDownList");
    seriesContainer.html("");
    var objCount = 0;
    for (var key in data) {
        if (data.hasOwnProperty(key)) {
            objCount++;
            dropDownSize =objCount;
        }
    }
  
    if (objCount > 1) {
        $.each(data, function (key, val) {
        	if(dropDownId == key){
            seriesContainer.append("<option value="+key+" selected>"+data[key]+"</option>"); 
        	}
        	else{
        		 seriesContainer.append("<option value="+key+" >"+data[key]+"</option>"); 
        	}
        });
    }
}

function drawTable(sender,subject,timestamp,idledays) {
    var seriesContainer = $("#tableDataDiv .tableIdle");
    seriesContainer.html("");
    var objCount = 0;
    for (var key in sender) {
        if (sender.hasOwnProperty(key)) {
            objCount++;
        }
    }
 
    if(objCount!=0 ){
        for (var i = 0; i <=objCount; i++) {
        	var table = document.getElementById("tableIdle");
        	    var row = table.insertRow(i);
        	    var cell1 = row.insertCell(0);
        	    var cell2 = row.insertCell(1);
        	    var cell3 = row.insertCell(2);
        	    var cell4 = row.insertCell(3);
        	    
        	    if(i==0){
        	    	cell1.innerHTML = "Subject";
            	    cell2.innerHTML = "Sender";
            	    cell3.innerHTML = "Thread CountT";
            	    cell4.innerHTML = "Date";
        	    }else{
        	    	cell1.innerHTML = subject[i-1];
        	    	cell2.innerHTML = sender[i-1];
        	    	cell3.innerHTML = emailcount[i-1];
        	    	cell4.innerHTML = timestamp[i-1];
        	    }
        }
        }
  
}
//delete table rows
function deleteRow(tableID) {
    try {
    var table = document.getElementById(tableID);
    var rowCount = table.rows.length;
    for(var i=0; i<rowCount; i++) {
        var row = table.rows[i];
            table.deleteRow(i);
            rowCount--;
            i--;        
    }
    }catch(e) {
        alert(e);
    }
}

function isNumber(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}
