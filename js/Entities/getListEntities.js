function loadEquipments() {
    var request = getInstance();

    var infoEntities = {
        type: 'GET',
        rute: '/lite/customerData/entities'
    }
    getDateActual();
    $('#contenedor').show();
    $('#equipmentList').hide();
    request.sendRequest(infoEntities, function (err, data) {
        if (err) {
            console.log("An error was ocurred, please try again in few minutes");
        } else {
            for (var i = 0; i < data.length; i++) {
                if (data[i].description.split('/')[0] != "Ghost Entity") {
                    var name = "1"+data[i].name;
                    $("#equipment").append("<tr class='rowColor' onclick = 'sendIdEquipment(" + data[i]._id + ",\"" + data[i].name + "\")'><td>" + data[i].name + "</td></tr>");
                }
            }
            $('#contenedor').hide();
            $('#equipmentList').show();
            $('#equipment').DataTable();
        }
    });
}