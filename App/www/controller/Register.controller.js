sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast"
], function (Controller, MessageToast) {
    "use strict";
    return Controller.extend("sap.ui.ksilence.controller.Register", {
        onInit : function(){
            var gLocalContact = sap.ui.getCore().getModel("gLocalContact");
            this.getView().setModel(gLocalContact, "localContact");
        },
        registerDevice : function (oEvent) {
            // Read from i18n model
            var oBundle = sap.ui.getCore().getModel("i18n").getResourceBundle();
            var viewLocalContact = this.getView().getModel("localContact");

            // Show message
            if (viewLocalContact.getProperty("/name") == ""){
                MessageToast.show(oBundle.getText("invalidName"));
            } 
            else {
                // Update global Model
                var gLocalContact = sap.ui.getCore().getModel("gLocalContact");
 
                // Check if registrationToken already exists in remote contacts
                var remoteContacts = sap.ui.getCore().getModel("gRemoteContacts");
                //var contactFound = false;
                for(var i = 0; i < remoteContacts.oData.length; i++){
                    
                	if(remoteContacts.oData[i].name == gLocalContact.getProperty("/name")){
                        gLocalContact.setProperty("/id", remoteContacts.oData[i].id);
                        break;
                    }
                }
                
                
                    if (gLocalContact.getProperty("/id") == ""){
                    	MessageToast.show(oBundle.getText("notFoundName"));
                    }
                    else{
                	
                    
                    	
                	/*
                	if(remoteContacts.oData[i].registrationToken == gLocalContact.getProperty("/registrationToken")){
                        gLocalContact.setProperty("/id", remoteContacts.oData[i].id);
                        break;
                    }      
                	 */
                
                // Set contact to available
                gLocalContact.setProperty("/available", "true");
                
                /*
                if(gLocalContact.getProperty("/id") == ""){
                    // create new contact
                    $.ajax({
                        type: "POST",
                        url: sap.ui.getCore().getModel("gSettings").oData.url + "contacts",
                        data: JSON.stringify(gLocalContact.oData),
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        success : function(data){
                            gLocalContact.setProperty("/id", data.id);
                        }
                    });
                } else { */
                
                    // update existing contact
                    $.ajax({
                        type: "PUT",
                        url: sap.ui.getCore().getModel("gSettings").oData.url + "contacts/" + gLocalContact.getProperty("/id"),
                        data: JSON.stringify(gLocalContact.oData),
                        contentType: "application/json; charset=utf-8",
                        dataType: "json"
                    });
              /*  }*/

                // Redirect to messages view if name not empty
                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.navTo("message");
             }
           }
        }
    });
});