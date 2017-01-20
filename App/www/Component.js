sap.ui.define([
    "sap/ui/core/UIComponent",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/resource/ResourceModel"
], function (UIComponent, JSONModel, ResourceModel) {
    "use strict";
    return UIComponent.extend("sap.ui.ksilence.Component", {
        metadata : {
            manifest: "json"
        },
        init : function () {
            // call the init function of the parent
            UIComponent.prototype.init.apply(this, arguments);

            // set default settings
            var oData = {
                lang : "en",        // Default language
                messageText : "",
                url : "http://dgf-frontend.azurewebsites.net/api/v1/"
            };
            var oModel = new JSONModel(oData);
            sap.ui.getCore().setModel(oModel, "gSettings");
           
            
            // set default settings for snooze
            var snoozeTime = {
            	snooze_time : ""        // default time
            };
            var oSnoozeTime = new JSONModel(snoozeTime);
            sap.ui.getCore().setModel(oSnoozeTime, "gLocalSnoozeTime");
            
         // set default settings for snooze
            var snoozeMessage = {
                message : ""			   // default message
            };
            var oSnoozeMessage = new JSONModel(snoozeMessage);
            sap.ui.getCore().setModel(oSnoozeMessage, "gLocalSnoozeMessage");
            
      
            // set local contact informations
            var oLocalContact = {
                id : "",
                name : "",
                registrationToken : "123123",
                os : "ANDROID",
                available : "true"
            };

            if (navigator.userAgent.match(/(iPhone|iPod|iPad|Android)/)) {
                // Settings for Push Notifications
                var push = PushNotification.init({
                    "android": {
                        "senderID": "231391399021",
                        "forceShow": "true",
                        "icon": "notificationicon",
                        "iconColor": "darkgray"
                    },
                    "ios": {
                        "alert": "true",
                        "badge": "true",
                        "sound": "true",
                        "categories": {
                            "actions": {
                                "inprocess": {
                                    "callback": "app.inprocess", "title": "IN PROCESS", "foreground": true, "destructive": false
                                },
                                "done": {
                                    "callback": "app.done", "title": "DONE", "foreground": true, "destructive": false
                                }
                            }
                        }
                    },
                    "windows": {}
                });

                // Save Registration Token from GCM in oData
                push.on('registration', function (data) {
                    oLocalContact['registrationToken'] = data.registrationId;
                });

                // Check os and save into oData
                if (navigator.userAgent.match(/(Android)/)) {
                    oLocalContact['os'] = "ANDROID";
                } else {
                    oLocalContact['os'] = "IOS";
                }
            }

            var oLocalContactModel = new JSONModel(oLocalContact);
            sap.ui.getCore().setModel(oLocalContactModel, "gLocalContact");

            // Set initial contacts
            var oContactModel = new sap.ui.model.json.JSONModel();
            oContactModel.loadData(oData.url + "contacts");
            sap.ui.getCore().setModel(oContactModel, "gRemoteContacts");

            // Create empty available contacts model
            var oAvailableContacts = new sap.ui.model.json.JSONModel();
            sap.ui.getCore().setModel(oAvailableContacts, "gAvailableContacts");

            // Set departments
            var oDepartmentModel = new sap.ui.model.json.JSONModel();
            oDepartmentModel.loadData(oData.url + "departments");
            sap.ui.getCore().setModel(oDepartmentModel, "gRemoteDepartments");

            // set i18n model
            var i18nModel = new ResourceModel({
                bundleName : "sap.ui.ksilence.i18n.i18n_" + oData['lang']
            });
            sap.ui.getCore().setModel(i18nModel, "i18n");

            // create the views based on the url
            this.getRouter().initialize();
        }
    });
});