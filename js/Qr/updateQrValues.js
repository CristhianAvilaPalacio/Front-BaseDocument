var request = getSecondInstance();
var printContent;

function loadEntities() {
    var infoEntities = {
        type: 'GET',
        rute: '/baseDocument/entities'
    }

    getDateActual();
    $('#qr').hide();
    $('#contenedor').show();
    request.sendRequest(infoEntities, function (err, data) {
        if (err) {
            console.log("An error was ocurred, please try again in few minutes");
        } else {
     
            printContent = "<table>";
            for (var i = 0; i < data.length; i++) {
                var lineTable = "";
                if (data[i].description.split('/')[0] != "Ghost Entity") {               
                    lineTable +="<tr><td>" + data[i]._id + "</td><td>" + data[i].name + "</td>";
                    if (data[i].qrImage != undefined && data[i].qrImage != null && data[i].qrImage != "") {
                        lineTable += "<td><input type='checkbox' name='qrImage' value='qrImage' checked disabled> </td>";            
                    } else {
                        lineTable += "<td><input type='checkbox' name='qrImage' value='qrImage' disabled> </td>"; 
                    }
                    if (data[i].sendQr != undefined && data[i].sendQr != null && data[i].sendQr != "NO") {
                        lineTable += "<td><input type='checkbox' name='sendQr' value='sendQr' checked> </td>";                         
                    } else {
                        lineTable += "<td><input type='checkbox' name='sendQr' value='sendQr'> </td>"; 
                    }
                    if (data[i].qrPosition != undefined && data[i].qrPosition != null && data[i].qrPosition != "NO") {
                        lineTable += "<td><input type='checkbox' name='qrPosition' value='qrPosition' checked> </td>";                       
                    } else {
                        lineTable += "<td><input type='checkbox' name='qrPosition' value='qrPosition'> </td>"; 
                    }
                    if (data[i].hexagono != undefined && data[i].hexagono != null && data[i].hexagono != "NO") {
                        lineTable += "<td><input type='checkbox' name='hexagono' value='hexagono' checked> </td>";                     
                    } else {
                        lineTable += "<td><input type='checkbox' name='hexagono' value='hexagono'> </td>";  
                    }
                    $("#qr").append(lineTable + "</tr>");
                    printContent += lineTable + "</tr>";
                }
            }
             
            $('#qr').DataTable({
                paging: false,                         
            });

            $('#contenedor').hide();
            $('#qr').show();
            
            $('#Stadistics').show();
        }
    });
}

function guardarDatos(){

    
    $('#qr tbody tr').each(function(index){
        var td1,td2,td3,td4,td5,td6;
        var entidad ={            
                name:"",               
                sendQr:"",
                qrPosition:"",
                hexagono:""
    }
         $(this).children("td").each(function (index2) {
             switch (index2) 
                {                    
                    case 0: td1 = $(this).text();                          
                            break;
                    case 1:td2=$(this).text();   
                            entidad.name=td2;           
                            break;                 
                    case 3: td4 = $($(this).children("input[type=checkbox]")[0]).prop('checked');  
                            if(td4)entidad.sendQr="SI";
                            else entidad.sendQr="NO";                        
                            break;
                    case 4: td5 = $($(this).children("input[type=checkbox]")[0]).prop('checked');  
                            if(td5)entidad.qrPosition="SI";
                            else entidad.qrPosition="NO"; 
                            break;
                    case 5: td6 = $($(this).children("input[type=checkbox]")[0]).prop('checked'); 
                            if(td6)entidad.hexagono="SI";
                            else entidad.hexagono="NO";  
                            break;          
                }
         });       
         sendEditEntity(entidad,td1);
    });
}

function sendEditEntity(createEntity, idEdicion){	
	var info = {
		type: 'PUT',
		rute: '/baseDocument/entities/' + idEdicion,
		data: createEntity
	}
	
	request.sendRequest(info,function(error, data){
		
		if(error){
			swal("Unedited Entity", "", "error"); 
			$(location).attr('href','projects.html');
		}
		else{	
            console.log("si la edito");
		}
	});	
}