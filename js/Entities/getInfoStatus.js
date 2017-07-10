var request = getSecondInstance();
var totalEntities;
var totalDetailsScene;
var totalLocation;
var totalNearToMachine;
function loadInfo() {
    var infoEntities = {
        type: 'GET',
        rute: '/baseDocument/entitiesLite/equipment'
    }
    getDateActual();
    $('#contenedor').show();
    $('#ReportList').hide();
    $('#Stadistics').hide();
    $('#PrintView').hide();
    request.sendRequest(infoEntities, function (err, data) {
        if (err) {
            console.log("An error was ocurred, please try again in few minutes");
        } else {
            totalEntities = 0;
            totalDetailsScene = 0;
            totalModels = 0;
            totalLocation = 0;
            for (var i = 0; i < data.length; i++) {
                var lineTable = "";
                if (data[i].entity.description.split('/')[0] != "Ghost Entity") {
                    totalEntities++;
                    lineTable += "<tr><td>" + data[i].entity.name + "</td>";
                    if (data[i].equipment.detailScene.length != 0) {
                        lineTable += "<td>Si</td>";
                        totalDetailsScene++;
                    } else {
                        lineTable += "<td>No</td>";
                    }
                    if (data[i].equipment.model.length != 0) {
                        lineTable += "<td>Si</td>";
                        totalModels++;
                    } else {
                        lineTable += "<td>No</td>";
                    }
                    if (data[i].entity.description != "" && data[i].entity.description != null && data[i].entity.description != undefined) {
                        lineTable += "<td>" + data[i].entity.description + "</td>";
                        totalLocation++;
                    } else {
                        lineTable += "<td>No</td>";
                    }
                    $("#report").append(lineTable + "</tr></body>");
                    $("#reportPrint").append(lineTable + "</tr></body>");
                }
            }
            $('#TotalEquipos').append(totalEntities);
            $('#TotalEscenaDetalle').append(totalDetailsScene);
            $('#TotalModelado').append(totalModels);
            $('#TotalLocalizacion').append(totalLocation);

            $('#contenedor').hide();
            $('#ReportList').show();
            $('#Stadistics').show();
            $('#report').DataTable();
        }
    });
}

function printWindow() {
    $('#ReportList').hide();
    $('#LineBar').hide();
    $('#PrintView').show();
    window.print();
    $('#ReportList').show();
    $('#LineBar').show();
    $('#PrintView').hide();
}