sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/routing/History",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/m/MessageToast"
], function (Controller, History, Filter, FilterOperator, MessageToast) {
    "use strict";
    return Controller.extend("sap.ui.ksilence.controller.Contact", {
        onInit : function(){
            this.getView().setModel(sap.ui.getCore().getModel("gRemoteDepartments"), "remoteDepartments");
            this.getView().setModel(sap.ui.getCore().getModel("gAvailableContacts"), "availableContacts");
            this.getView().setModel(sap.ui.getCore().getModel("gLocalContact"), "localContact");
            this.getView().setModel(sap.ui.getCore().getModel("gSettings"), "settings");
        },
        onPressContact : function(oEvent){
            var oBundle = this.getView().getModel("i18n").getResourceBundle();
            var oItem = oEvent.getSource().getBindingContext("availableContacts").getObject();
            var gRemoteContacts = sap.ui.getCore().getModel("gRemoteContacts");
            var gSettingsModel = sap.ui.getCore().getModel("gSettings");

            // Check if placeholder in message is not empty
            var paramFilled = true;

            // Number
            if(gSettingsModel.getProperty("/messageText").indexOf("{number}") > -1){
                if(this.getView().byId("inputNumber").getValue() != ""){
                    var msg = gSettingsModel.getProperty("/messageText").replace("{number}", this.getView().byId("inputNumber").getValue());
                    gSettingsModel.setProperty("/messageText", msg);
                } else {
                    paramFilled = false;
                }
            }
            // Contact
            if (gSettingsModel.getProperty("/messageText").indexOf("{contact}") > -1){
                var msg = gSettingsModel.getProperty("/messageText").replace("{contact}", this.getView().byId("selectContacts").getSelectedItem().getText());
                gSettingsModel.setProperty("/messageText", msg);
            }
            // Department
            if (gSettingsModel.getProperty("/messageText").indexOf("{department}") > -1){
                var msg = gSettingsModel.getProperty("/messageText").replace("{department}", this.getView().byId("selectDepartment").getSelectedItem().getText());
                gSettingsModel.setProperty("/messageText", msg);
            }

            if(!paramFilled){
                MessageToast.show("{i18n>fillAllFields}");
            } else {
                // Send message to appserver
                var message = {
                    toContactId: oItem['id'],
                    fromContactName: sap.ui.getCore().getModel("gLocalContact").getProperty("/name"),
                    fromContactId: sap.ui.getCore().getModel("gLocalContact").getProperty("/id"),
                    body: gSettingsModel.getProperty("/messageText"),
                    state: "OPEN"
                };

                $.ajax({
                    type: "POST",
                    url: sap.ui.getCore().getModel("gSettings").oData.url + "notifications",
                    data: JSON.stringify(message),
                    contentType: "application/json",
                    dataType: "json",
                    success: function(){
                        MessageToast.show(oBundle.getText("notificationSend"));
                    }
                });

                // Clear local storage
                sap.ui.getCore().getModel("gSettings").setProperty("/messageText", "");

                // Redirect to message view
                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.navTo("message", true);
            }
        },
        onFilterContacts: function(oEvent){
            // build filter array
            var aFilter = [];
            var sQuery = oEvent.getParameter("query");
            if (sQuery) {
                aFilter.push(new Filter("name", FilterOperator.Contains, sQuery));
            }

            // filter binding
            var oList = this.getView().byId("contactList");
            var oBinding = oList.getBinding("items");
            oBinding.filter(aFilter);
        },
        onNavBack: function(){
            var oHistory = History.getInstance();
            var sPreviousHash = oHistory.getPreviousHash();

            if (sPreviousHash !== undefined) {
                window.history.go(-1);
            } else {
                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.navTo("message", true);
            }
        },
        changeMessageNumber: function(){
            var gSettingsModel = sap.ui.getCore().getModel("gSettings");
            var msgText = gSettingsModel.getProperty("/messageText");

            var viewNumber = this.getView().byId("inputNumber");
        }
    });
});