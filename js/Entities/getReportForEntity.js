var params = getParamsUrl();

function loadReportEntities() {
    getDateActual();
    $('#tableList').hide();
    $('#Stadistics').hide();
    $('#PrintView').hide();
    $('#contenedor').show();
    $('#nameEquipmentd').append(params.entityName);
    getLibraryByEntity(params.entityId);
}

function sendIdEquipment(id, name) {
    location.href = 'VistaEntidad.html?entityId=' + id + '&entityName=' + name;
}

function getParamsUrl() {
    var paramstr = window.location.search.substr(1);
    var paramarr = paramstr.split("&");
    var params = {};
    for (var i = 0; i < paramarr.length; i++) {
        var tmparr = paramarr[i].split("=");
        params[tmparr[0]] = tmparr[1];
    }
    console.log(params);
    return params;
}

function getLibraryByEntity(id) {
    var totalDocuments = 0;
    var request2 = getInstance();
    var infoDocumentsCategories = {
        type: 'GET',
        rute: '/documentation/documents/entity'
    }
    infoDocumentsCategories.rute += "/" + id + "/2";

    request2.sendRequest(infoDocumentsCategories, function (error, documentsCategories) {
        if (error) {
            console.log("An error was ocurred");
        } else {
            if (documentsCategories.length != 0) {
                for (var h = 0; h < documentsCategories.length; h++) {
                    for (var i = 0; i < documentsCategories[h].documents.length; i++) {
                        totalDocuments++;
                        $("#documents").append("<tr><td>" + documentsCategories[h].category.name + "</td><td>" + documentsCategories[h].documents[i].name + "</td></tr>");
                        $("#documentsPrint").append("<tr><td>" + documentsCategories[h].category.name + "</td><td>" + documentsCategories[h].documents[i].name + "</td></tr>");
                    }
                }
            }

            $('#TotalDocumentos').append(totalDocuments);
            $('#documents').DataTable();
            $('#tableList').show();

            getReportsByEntity(params.entityId);
        }
    });

}

function getReportsByEntity(id) {
    totalReports = 0;
    var infoDocumentsCategories = {
        type: 'GET',
        rute: '/customerData/reports'
    }
    infoDocumentsCategories.rute += "/" + id;
    request.sendRequest(infoDocumentsCategories, function (error, reports) {
        if (error) {
            console.log("An error was ocurred");
        } else {

            if (reports.length != 0) {
                totalReports++;
                for (var h = 0; h < reports.length; h++) {
                    $("#reports").append("<tr><td>" + reports[h].Rep_name + "</td></tr>");
                    $("#reportsPrint").append("<tr><td>" + reports[h].Rep_name + "</td></tr>");
                }
            }
            $('#reports').DataTable();
            $('#TotalReportes').append(totalReports);

            getRercursosByEntity(params.entityId);
        }
    });
}

function getRercursosByEntity(id) {
    var request = getSecondInstance();
    var infoDocumentsCategories = {
        type: 'GET',
        rute: '/baseDocument/resources/entity'
    }
    infoDocumentsCategories.rute += "/" + id;

    request.sendRequest(infoDocumentsCategories, function (error, documentsCategories) {
        if (error) {
            console.log(error);
        } else {
            var countImg = 0;
            var countVideo = 0;
            var countLider = 0;
            if (documentsCategories.length != 0) {
                for (var h = 0; h < documentsCategories.length; h++) {
                    if (documentsCategories[h].type == "imagen") countImg++;
                    if (documentsCategories[h].type == "video") countVideo++;

                    $("#resources").append("<tr><td>" + documentsCategories[h].type + "</td><td>" + documentsCategories[h].name + "</td></tr>");
                    $("#resourcesPrint").append("<tr><td>" + documentsCategories[h].type + "</td><td>" + documentsCategories[h].name + "</td></tr>");
                }
            }

            $('#TotalFotos').append(countImg);
            $('#TotalVideos').append(countVideo);
            $('#resources').DataTable();

            getStatusQr(params.entityId);
        }
    });
}

function getStatusQr(id) {
    var request2 = getSecondInstance();
    var infoEntities = {
        type: 'GET',
        rute: '/baseDocument/entities'
    }
    infoEntities.rute += "/" + id;

    request2.sendRequest(infoEntities, function (err, data) {
        if (err) {
            console.log("An error was ocurred, please try again in few minutes");
        } else {
            if (data.entity.description.split('/')[0] != "Ghost Entity") {
                if (data.entity.qrImage != undefined && data.entity.qrImage != null && data.entity.qrImage != "" && data.entity.qrImage == "SI") {
                    $('#ExisteQr').append("Si");
                } else {
                    $('#ExisteQr').append("No");
                }
                if (data.entity.sendQr != undefined && data.entity.sendQr != null && data.entity.sendQr != "" && data.entity.sendQr == "SI") {
                    $('#EstaEntregado').append("Si");
                } else {
                    $('#EstaEntregado').append("No");
                }
                if (data.entity.qrPosition != undefined && data.entity.qrPosition != null && data.entity.qrPosition != "" && data.entity.qrPosition == "SI") {
                    $('#CercaMaquina').append("Si");
                } else {
                    $('#CercaMaquina').append("No");
                }
                if (data.entity.hexagono != undefined && data.entity.hexagono != null && data.entity.hexagono != "" && data.entity.hexagono == "SI") {
                    $('#TagLegible').append("Si");
                } else {
                    $('#TagLegible').append("No");
                }
                if (data.entity.description != undefined && data.entity.description != null && data.entity.description != "") {
                    $('#Ubicacion').append(data.entity.description);
                } else {
                    $('#Ubicacion').append("No Ubication");
                }
                if (data.equipment.detailScene.length != 0) {
                    $('#EscenaDetalle').append("Si");
                } else {
                    $('#EscenaDetalle').append("No");
                }
                if (data.equipment.model.length != 0) {
                    $('#Modelado').append("Si");
                } else {
                    $('#Modelado').append("No");
                }
            }

            $('#Stadistics').show();
            $('#contenedor').hide();
        }
    });
}

function printWindow() {
    $('#tableList').hide();
    $('#LineBar').hide();
    $('#PrintView').show();
    window.print();
    $('#tableList').show();
    $('#LineBar').show();
    $('#PrintView').hide();
}