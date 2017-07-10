var request = getInstance();
var totalEntities;
var totalReports;

function loadReport() {
    var infoEntities = {
        type: 'GET',
        rute: '/lite/customerData/entities'
    }
    getDateActual();
    $('#contenedor').show();
    $('#ReportList').hide();
    $('#Stadistics').hide();
    $('#Stadistics2').hide();
    $('#PrintView').hide();

    request.sendRequest(infoEntities, function (err, data) {
        if (err) {
            console.log("An error was ocurred, please try again in few minutes");
        } else {
            var aux = 0;
            totalEntities = 0;
            totalReports = 0;
            for (var i = 0; i < data.length; i++) {
                if (data[i].description.split('/')[0] != "Ghost Entity") {
                    totalEntities++;
                    var infoDocumentsCategories = {
                        type: 'GET',
                        rute: '/customerData/reports' // category/entity/type:2 para entidad
                    }
                    infoDocumentsCategories.rute += "/" + data[i]._id;
                    (function (name) {
                        request.sendRequest(infoDocumentsCategories, function (error, reports) {
                            if (error) {
                                console.log("An error was ocurred");
                            } else {
                                aux++;
                                if (reports.length != 0) {
                                    totalReports++;
                                    for (var h = 0; h < reports.length; h++) {
                                        $("#reports").append("<tr><td>" + name + "</td><td>" + reports[h].Rep_name + "</td></tr>");
                                        $("#reportPrint").append("<tr><td>" + name + "</td><td>" + reports[h].Rep_name + "</td></tr>");
                                    }
                                }
                                $('#reportsForEntity').append("<tr><td>" + name + "</td><td>" + reports.length + "</td></tr>");
                                $('#reportsForEntityPrint').append("<tr><td>" + name + "</td><td>" + reports.length + "</td></tr>");
                                if (aux == data.length) {                                    
                                    $('#contenedor').hide();
                                    $('#ReportList').show();
                                    $('#Stadistics').show();
                                    $('#Stadistics2').show();
                                    $('#reports').DataTable();
                                    $('#reportsForEntity').DataTable();
                                    $('#TotalReportes').append(totalReports);
                                }
                            }
                        });
                    }(data[i].name));

                } else {
                    aux++;
                }
            }
            $('#TotalEquipos').append(totalEntities);
        }
    });
}
function printWindow() {
    $('#ReportList').hide();
    $('#Stadistics2').hide();
    $('#LineBar').hide();
    $('#PrintView').show();
    window.print();
    $('#ReportList').show();
    $('#Stadistics2').show();
    $('#LineBar').show();
    $('#PrintView').hide();
}