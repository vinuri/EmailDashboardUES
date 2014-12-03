var pref = new gadgets.Prefs();
var Labels= [];
var sender= [];
var subject= [];
var timestamp=[];
var idledays=[];
var dropDownId =0;
$(function () {

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
    idledays=series[5];

    addSeriesDropDowns(Labels);
    drawTable(sender,subject,timestamp,idledays);
}

function addSeriesDropDowns(data) {
    // insert DropDown
    var seriesContainer = $("#listData .dropDownList");
    seriesContainer.html("");
    var objCount = 0;
    for (var key in data) {
        if (data.hasOwnProperty(key)) {
            objCount++;
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
        	    	cell1.innerHTML = "SUBJECT";
            	    cell2.innerHTML = "SENDER";
            	    cell3.innerHTML = "RECEIVED DATE";
            	    cell4.innerHTML = "NO OF IDLE DAYS";
        	    }else{
        	    	cell1.innerHTML = subject[i-1];
        	    	cell2.innerHTML = sender[i-1];
        	    	cell3.innerHTML = timestamp[i-1];
        	    	cell4.innerHTML = idledays[i-1];
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
