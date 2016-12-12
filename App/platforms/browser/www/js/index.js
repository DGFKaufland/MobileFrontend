var appServerUrl = "http://dgf-mbe.azurewebsites.net/api/v1/";

// Cordova onDeviceReady
var app = {
    initialize: function() {
        this.bindEvents();
    },
    bindEvents: function() {

        if (navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry)/)) {
            document.addEventListener('deviceready', this.onDeviceReady, false);
        } else {
            this.onDeviceReady();
        }

    },
    onDeviceReady: function() {

        // Integrate sapui5 when device ready
        sap.ui.getCore().attachInit(function () {
            new sap.ui.core.ComponentContainer({
                name : "sap.ui.ksilence"
            }).placeAt("content");
        });

    },
    done: function(oEvent){
        this.changeState(oEvent.additionalData.notId, "CLOSED");
    },
    inprocess : function(oEvent){
        this.changeState(oEvent.additionalData.notId, "INPROCESS");
    },
    changeState: function(notificationId, newState){
        // Get old Data
        $.ajax({
            type: "GET",
            url: appServerUrl + "notifications/" + notificationId,
            data: "",
            contentType: "application/json",
            dataType: "json",
            success: function(data){
                // Change state
                data.state = newState;

                // Save updated notification
                $.ajax({
                    type: "PUT",
                    url: appServerUrl + "notifications/" + notificationId,
                    data: JSON.stringify(data),
                    contentType: "application/json",
                    dataType: "json"
                });
            }
        });
    }
};

app.initialize();