sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/resource/ResourceModel",
    "sap/m/MessageToast"
], function (Controller, ResourceModel, MessageToast) {
    "use strict";
    return Controller.extend("sap.ui.ksilence.controller.HeaderButtons", {
        onInit : function() {
            this.getView().setModel(sap.ui.getCore().getModel("gLocalContact"), "localContact");
            this.getView().setModel(sap.ui.getCore().getModel("gSettings"), "settings");
        },
        _getDialog : function () {
            if (!this._oDialog) {
                this._oDialog = sap.ui.xmlfragment("sap.ui.ksilence.view.HeaderButtons", this);
                this.getView().addDependent(this._oDialog);
            }
            return this._oDialog;
        },
        onOpenDialog : function () {
            this._getDialog().open();
        },
        onLogoutPress : function () {
            var oBundle = this.getView().getModel("i18n").getResourceBundle();

            // Save contact on app server as not available
            var gLocalContact = sap.ui.getCore().getModel("gLocalContact");
            gLocalContact.setProperty("/available", "false");

            // Update contact
            $.ajax({
                type: "PUT",
                url: sap.ui.getCore().getModel("gSettings").oData.url + "contacts/" + gLocalContact.oData.id,
                data: JSON.stringify(gLocalContact.oData),
                contentType: "application/json; charset=utf-8",
                dataType: "json"
            });

            // Show success message
            MessageToast.show(oBundle.getText("successfulLogout"));
            gLocalContact.setProperty("/id", "");
            gLocalContact.setProperty("/name", "");
            gLocalContact.setProperty("/registration_token", "");

            // Redirect to register page
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("register");

        },
        onCloseDialog : function () {
            var oBundle = this.getView().getModel("i18n").getResourceBundle();

            // Save changed settings
            var viewLocalContact = this.getView().getModel("localContact");
            var gLocalContact = sap.ui.getCore().getModel("gLocalContact");

            if(viewLocalContact.getProperty("/name") != ""){
                gLocalContact.setProperty("/name", viewLocalContact.getProperty("/name"));

                $.ajax({
                    type: "PUT",
                    url: sap.ui.getCore().getModel("gSettings").oData.url + "contacts/" + gLocalContact.getProperty("/id"),
                    data: JSON.stringify(gLocalContact.oData),
                    contentType: "application/json; charset=utf-8",
                    dataType: "json"
                });
            }

            var viewSettings = this.getView().getModel("settings");
            var gSettings = sap.ui.getCore().getModel("gSettings");
            if(viewSettings.getProperty("/lang") != ""){
                gSettings.setProperty("/lang", viewSettings.getProperty("/lang"));
            }

            // Settings / Contact saved
            MessageToast.show(oBundle.getText("settingsSaved"));

            this._getDialog().close();
        }
    });
});