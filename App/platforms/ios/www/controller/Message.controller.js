sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast"
], function (Controller, MessageToast) {
    "use strict";
    return Controller.extend("sap.ui.ksilence.controller.Message", {
        onInit: function() {
            // Load Messages from appserver
            var oMessageModel = new sap.ui.model.json.JSONModel();
            oMessageModel.loadData(sap.ui.getCore().getModel("gSettings").oData.url + "messages");
            this.getView().setModel(oMessageModel, "remoteMessages");

            // set initial notifications
            var oAllNotifications = new sap.ui.model.json.JSONModel();
            oAllNotifications.loadData(sap.ui.getCore().getModel("gSettings").oData.url + "notifications");
            this.getView().setModel(oAllNotifications, "allNotifications");

            this.getView().setModel(sap.ui.getCore().getModel("gSettings"), "settings");
        },
        onPressButton : function (oEvent) {
            // Read from i18n model
            var oBundle = this.getView().getModel("i18n").getResourceBundle();

            // Check if input is empty
            var sMessage = this.getView().getModel("settings").getProperty("/messageText");
            if (sMessage == "") {
                // Show error message
                MessageToast.show(oBundle.getText("emptyMessage"));
            } else {
                // Update global model
                sap.ui.getCore().getModel("gSettings").setProperty("/messageText", sMessage);

                this.updateContacts();

                // Redirect to contact page
                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.navTo("contact");
            }
        },
        onPressMessageList: function (oEvent){
            // Save text of message in settings
            var oItem = oEvent.getSource().getBindingContext("remoteMessages").getObject();
            var oSettingsModel = sap.ui.getCore().getModel("gSettings").setProperty("/messageText", oItem['text']);

            this.updateContacts();

            // Redirect to contact page
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("contact");
        },
        changeRouteNavigationMyTasks : function(oEvent) {
            this.updateNotifications();

            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("mytasks");
        },
        changeRouteNavigationNewMessage : function(){
            this.updateNotifications();

            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("message");
        },
        updateNotifications: function(){
            // Update notification-model
            var allNotifications = this.getView().getModel("allNotifications");
            allNotifications.setData(null);

            $.ajax({
                dataType: "json",
                url: sap.ui.getCore().getModel("gSettings").oData.url + "notifications",
                success: function(data){
                    allNotifications.setData(data);
                    allNotifications.refresh(true);
                }
            });
        },
        updateContacts: function(){
            var gRemoteContacts = sap.ui.getCore().getModel("gRemoteContacts");
            var gLocalContact = sap.ui.getCore().getModel("gLocalContact");

            $.ajax({
                dataType: "json",
                url: sap.ui.getCore().getModel("gSettings").oData.url + "contacts",
                success: function(data){
                    gRemoteContacts.setData(null);
                    gRemoteContacts.setData(data);
                    gRemoteContacts.refresh(true);

                    var aContacts = [];
                    var oldAvailableContacts = sap.ui.getCore().getModel("gAvailableContacts");

                    for(var i = 0; i < gRemoteContacts.oData.length; i++){
                        if(gRemoteContacts.oData[i].available){ // && gRemoteContacts.oData[i].registrationToken != gLocalContact.oData.registrationToken){
                            aContacts.push(gRemoteContacts.oData[i]);
                            console.log(gRemoteContacts.oData[i]);
                        }
                    }

                    oldAvailableContacts.setData(aContacts);
                    oldAvailableContacts.refresh(true);
                }
            });
        }
    });
});