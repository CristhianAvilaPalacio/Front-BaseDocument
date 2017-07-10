function getDateActual() {
    var date = new Date();
    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();
    $('#date').append(day + "/" + month + "/" + year);
}

function report() {
    document.getElementById("Reportes").classList.toggle("show");
    if (document.getElementById("Administrar").classList.contains('show')) {
        document.getElementById("Administrar").classList.remove('show');
    }
}

function administrar() {
    document.getElementById("Administrar").classList.toggle("show");
    if (document.getElementById("Reportes").classList.contains('show')) {
        document.getElementById("Reportes").classList.remove('show');
    }
}

window.onclick = function (e) {
    if (!e.target.matches('.dropbtn')) {
        var myDropdown = document.getElementById("myDropdown");
        if(myDropdown != null){
            if (myDropdown.classList.contains('show')) {
                myDropdown.classList.remove('show');
            }
        }
    }
}