var request = getSecondInstance();
var totalEntities;
var totalDocuments;

function loadMultimedia() {
    var infoEntities = {
        type: 'GET',
        rute: '/baseDocument/entities'
    }
    getDateActual();
    $('#documentsList').hide();
    $('#Stadistics2').hide();
    $('#Stadistics').hide();
    $('#PrintView').hide();
    $('#contenedor').show();
    request.sendRequest(infoEntities, function (err, data) {
        if (err) {
            console.log("An error was ocurred, please try again in few minutes");
        } else {
            var aux = 0;
            totalEntities = 0;
            totalDocuments = 0;
            for (var i = 0; i < data.length; i++) {
                if (data[i].description.split('/')[0] != "Ghost Entity") {
                    totalEntities++;
                    var infoDocumentsCategories = {
                        type: 'GET',
                        rute: '/baseDocument/resources/entity' // category/entity/type:2 para entidad
                    }
                    infoDocumentsCategories.rute += "/" + data[i]._id;
                    (function (name) {
                        request.sendRequest(infoDocumentsCategories, function (error, documentsCategories) {
                            if (error) {
                                console.log(error);
                            } else {
                                aux++;
                                var countImg = 0;
                                var countVideo=0;
                                var countLider=0;                                
                                if (documentsCategories.length != 0) {
                                    for (var h = 0; h < documentsCategories.length; h++) {
                                        totalDocuments++;
                                        if(documentsCategories[h].type=="imagen")countImg++;
                                        if(documentsCategories[h].type=="video") countVideo++;                                
                                       
                                            console.log(documentsCategories[h]);
                                            $("#documents").append("<tr><td>" + name + "</td><td>" + documentsCategories[h].type + "</td><td>" + documentsCategories[h].name+ "</td></tr>");
                                            $("#documentsPrint").append("<tr><td>" + name + "</td><td>" + documentsCategories[h].type + "</td><td>" + documentsCategories[h].name+ "</td></tr>");
                                        
                                    }

                                }
                                $('#documentsForEntity').append("<tr><td>" + name + "</td><td>" + countImg + "</td><td>" + countVideo + "</td></tr>");
                                $('#documentsForEntityPrint').append("<tr><td>" + name + "</td><td>" + countImg + "</td><td>" + countVideo + "</td></tr>");
                                if (aux == data.length) {
                                    $('#contenedor').hide();
                                    $('#documentsList').show();
                                    $('#Stadistics').show();
                                    $('#Stadistics2').show();
                                    $('#TotalDocumentos').append(totalDocuments);
                                    $('#documents').DataTable();
                                    $('#documentsForEntity').DataTable();
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
    $('#documentsList').hide();
    $('#Stadistics2').hide();
    $('#LineBar').hide();
    $('#PrintView').show();
    window.print();
    $('#documentsList').show();
    $('#Stadistics2').show();
    $('#LineBar').show();
    $('#PrintView').hide();
}
