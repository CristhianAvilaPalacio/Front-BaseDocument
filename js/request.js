var request;
var secondRequest;

var RequestServer = function (info) {
    this.host = info.host;
    //this.timeOut = timeOut;
    this.authorization = info.authorization || "";
    //this.refreshToken = info.refreshToken || "";
    //this.token_type = info.token_type || "";
    //this.expires_in = info.expires_in || "";
}

RequestServer.prototype.sendRequest = function (info, callback) {

    var dataType;
    var data = (info.data) ? info.data : null;
    if (data != null || info.type == 'DELETE') {
        dataType = 'json';
    }
    else {
        dataType = 'jsonp';
    }

    $.ajax(
   	{
   	    url: this.host + info.rute,
   	    type: info.type,
   	    //dataType: dataType,
   	    data: data,
   	    //timeout: this.timeOut,
   	    /*headers: {
			"Authorization" : this.authorization
		},*/
   	    success: function (result) {
   	        callback(null, result);
   	    },
   	    error: function (jqXHR, textStatus, error) {
   	        error = {
   	            jqXHR: jqXHR,
   	            textStatus: textStatus,
   	            error: error
   	        };
   	        callback(error, null);
   	    }
   	});
}

//RequestServer.prototype.loggin = function (loggin, callback) {

//    var info = {
//        "rute": '/token/',
//        "type": 'POST',
//        "data": {
//            "grant_type": "password",
//            "username": loggin.username,
//            "password": loggin.password
//        }
//    }
//    this.authorization = "Basic dW5pdHlJZENsaWVudDozRFZlc1VuaXR5Q2xpZW50U2VjcmV0";
//    var object = this;
//    this.sendRequest(info, function (error, result) {
//        if (!error) {
//            object.refreshToken = result.refresh_token;
//            object.expires_in = result.expires_in;
//            object.authorization = result.token_type + ' ' + result.access_token;
//            callback(null, true);
//        } else {
//            callback(error, null);
//        }
//    });
//}

getInstance = function () {
    if (!request) {
        var flag = false;
        var url = window.location.pathname.split("/");

        //var token = getCookie("token");

        //if (token != "")
        //    request = new RequestServer(JSON.parse(token));
        //else {

            /*if(flag) //loggin*/
            request = new RequestServer({ host: 'http://192.168.100.101:3000/3dves' }); //52.26.96.57:3000 //200.116.52.128:3000
            /*else
				$(location).attr('href','index.html');*/
        //}
    }
    return request;
}

getSecondInstance = function () {
    if (!secondRequest) {
        var flag = false;
        var url = window.location.pathname.split("/");

        //var token = getCookie("token");

        //if (token != "")
        //    request = new RequestServer(JSON.parse(token));
        //else {

        /*if(flag) //loggin*/
        secondRequest = new RequestServer({ host: 'http://192.168.100.101:3100/3dves' }); //52.26.96.57:3000 //200.116.52.128:3000
        /*else
            $(location).attr('href','index.html');*/
        //}
    }
    return secondRequest;
}