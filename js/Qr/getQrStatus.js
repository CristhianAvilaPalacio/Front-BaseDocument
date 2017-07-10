var request = getSecondInstance();
var totalEntities;
var totalExistQr;
var totalIsDelivered;
var totalNearToMachine;
var totalTagLegible;
var printContent;

function loadQr() {
    var infoEntities = {
        type: 'GET',
        rute: '/baseDocument/entities'
    }

    getDateActual();
    $('#contenedor').show();
    $('#QrList').hide();
    $('#Stadistics').hide();
    $('#PrintView').hide();
    request.sendRequest(infoEntities, function (err, data) {
        if (err) {
            console.log("An error was ocurred, please try again in few minutes");
        } else {
            totalEntities = 0;
            totalExistQr = 0;
            totalIsDelivered = 0;
            totalNearToMachine = 0;
            totalTagLegible = 0;
            for (var i = 0; i < data.length; i++) {
                var lineTable = "";
                if (data[i].description.split('/')[0] != "Ghost Entity") {
                    totalEntities++;
                    lineTable +="<tr><td>" + data[i].name + "</td>";
                     console.log(data[i]);
                    if (data[i].qrImage != undefined && data[i].qrImage != null && data[i].qrImage != "") {
                        lineTable += "<td>SI</td>";
                        totalExistQr++;
                    } else {
                        lineTable += "<td>NO</td>";
                    }
                    if (data[i].sendQr != undefined && data[i].sendQr != null && data[i].sendQr != "") {
                        lineTable += "<td>" + data[i].sendQr + "</td>";
                        if (data[i].sendQr == "SI") {
                            totalIsDelivered++;
                        }
                    } else {
                        lineTable += "<td>No</td>";
                    }
                    if (data[i].qrPosition != undefined && data[i].qrPosition != null && data[i].qrPosition != "") {
                        lineTable += "<td>" + data[i].qrPosition + "</td>";
                        if (data[i].qrPosition == "SI") {
                            totalNearToMachine++;
                        }
                    } else {
                        lineTable += "<td>No</td>";
                    }
                    if (data[i].hexagono != undefined && data[i].hexagono != null && data[i].hexagono != "") {
                        lineTable += "<td>" + data[i].hexagono + "</td>";
                        if (data[i].hexagono == "SI") {
                            totalTagLegible++;
                        }
                    } else {
                        lineTable += "<td>No</td>";
                    }
                    $("#qr").append(lineTable + "</tr>");
                    $("#qrPrint").append(lineTable + "</tr>");
                }
            }
            $('#TotalEquipos').append(totalEntities);
            $('#TotalExisteQR').append(totalExistQr);
            $('#TotalDelivered').append(totalIsDelivered);
            $('#TotalNearToMachine').append(totalNearToMachine);
            $('#TotalTagLegible').append(totalTagLegible);

            $('#contenedor').hide();
            $('#QrList').show();
            $('#Stadistics').show();
            $('#qr').DataTable();
        }
    });
}

function printWindow() {
    $('#QrList').hide();
    $('#LineBar').hide();
    $('#PrintView').show();
    window.print();
    $('#QrList').show();
    $('#LineBar').show();
    $('PrintView').hide();
}