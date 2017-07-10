var request = getInstance();
var totalEntities;
var totalDocuments;

function loadDocuments() {
    var infoEntities = {
        type: 'GET',
        rute: '/lite/customerData/entities'
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
                        rute: '/documentation/documents/entity' // category/entity/type:2 para entidad
                    }
                    infoDocumentsCategories.rute += "/" + data[i]._id + "/2";
                    console.log(data[i]._id + " " + data[i].name);
                    (function (name) {
                        request.sendRequest(infoDocumentsCategories, function (error, documentsCategories) {
                            if (error) {
                                console.log("An error was ocurred");
                            } else {
                                aux++;
                                var count = 0;
                                if (documentsCategories.length != 0) {
                                    for (var h = 0; h < documentsCategories.length; h++) {
                                        count += documentsCategories[h].documents.length;
                                        for (var i = 0; i < documentsCategories[h].documents.length; i++) {
                                            totalDocuments++;
                                            $("#documents").append("<tr><td>" + name + "</td><td>" + documentsCategories[h].category.name + "</td><td>" + documentsCategories[h].documents[i].name + "</td></tr>");
                                            $("#documentsPrint").append("<tr><td>" + name + "</td><td>" + documentsCategories[h].category.name + "</td><td>" + documentsCategories[h].documents[i].name + "</td></tr>");
                                        }
                                    }

                                    //if (aux == data.length) {
                                    //    var infoOtherDocuments = {
                                    //        type: 'GET',
                                    //        rute: '/documentation/folder/entity' // category/entity/type:2 para entidad
                                    //    }
                                        //infoOtherDocuments.rute += "/" + data[i]._id + "/type/2";
                                    //}
                                }
                                $('#documentsForEntity').append("<tr><td>" + name + "</td><td>" + count + "</td></tr>");
                                $('#documentsForEntityPrint').append("<tr><td>" + name + "</td><td>" + count + "</td></tr>");
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

//function loadDocuments() {
//    var infoEntities = {
//        type: 'GET',
//        rute: '/lite/customerData/entities'
//    }

//    request.sendRequest(infoEntities, function (err, data) {
//        if (err) {
//            alert("An error was ocurred, please try again in few minutes");
//        } else {
//            for (var i = 0; i < data.length; i++) {
//                if (data[i].description.split('/')[0] != "Ghost Entity") {
//                    var infoDocumentsCategories = {
//                        type: 'GET',
//                        rute: '/documentation/documents/entity' // category/entity/type:2 para entidad
//                    }
//                    infoDocumentsCategories.rute += "/" + data[i]._id + "/2";
//                    request.sendRequest(infoDocumentsCategories, function (error, documentsCategories) {
//                        if (error) {
//                            alert("An error was ocurred");
//                        } else {
//                            if (documentsCategories.length != 0) {
//                                for (var h = 0; h < documentsCategories.length; h++) {
//                                    for (var i = 0; i < documentsCategories[h].documents.length; i++) {
//                                        $("#documents").append("<tr><td>" + documentsCategories[h].documents[i].name + "</td><td>" + documentsCategories[h].category.name + "</td><td>" + "Prueba" + "</td></tr>");
//                                    }
//                                }
//                            }
//                        }
//                    });
//                }
//            }
//        }
//    });
//}

//var app = angular.module('documents', []);
//app.controller('returnPetition', function ($scope) {
//    request.sendRequest(infoEntities, function (err, data) {
//        if (err) {
//            alert("An error was ocurred, please try again in few minutes");
//        } else {
//            for (var i = 0; i < data.length; i++) {
//                if (data[i].description.split('/')[0] != "Ghost Entity") {
//                    var infoDocumentsCategories = {
//                        type: 'GET',
//                        rute: '/documentation/documents/entity' // category/entity/type:2 para entidad
//                    }
//                    infoDocumentsCategories.rute += "/" + data._id + "/2";
//                    request.sendRequest(infoDocumentsCategories, function (error, documentsCategories) {
//                        $scope.name = data.name;
//                        $scope.returnDocumentsByCategories = documentsCategories;
//                    });
//                }
//            }
//        }
//    });
//});