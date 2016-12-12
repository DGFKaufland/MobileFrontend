sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast"
], function (Controller, MessageToast) {
    "use strict";
    return Controller.extend("sap.ui.ksilence.controller.MyTasks", {
        onInit: function() {
            var allNotifications = new sap.ui.model.json.JSONModel();
            allNotifications.loadData(sap.ui.getCore().getModel("gSettings").oData.url + "notifications");
            this.getView().setModel(allNotifications, "allNotifications");
            this.getView().setModel(sap.ui.getCore().getModel("gLocalContact"), "localContact");
        },
        inProcessTask : function(oEvent) {
            var oItem = oEvent.getSource().getBindingContext("allNotifications").getObject();
            this.changeStatusTask(oItem, "INPROCESS");
        },
        closeTask: function(oEvent){
            var oItem = oEvent.getSource().getBindingContext("allNotifications").getObject();
            this.changeStatusTask(oItem, "CLOSED");
        },
        changeStatusTask : function(oItem, newState){
            var allNotifications = this.getView().getModel("allNotifications");

            var index = -1;
            for(var i = 0; i < allNotifications.oData.length; i++){
                if(allNotifications.oData[i].id == oItem.id){
                    index = i;
                    allNotifications.oData[i].state = newState;
                    break;
                }
            }

            $.ajax({
                type: "PUT",
                url: sap.ui.getCore().getModel("gSettings").oData.url + "notifications/" + oItem.id,
                data: JSON.stringify(allNotifications.oData[index]),
                contentType: "application/json; charset=utf-8",
                dataType: "json"
            });

            allNotifications.refresh(true);
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
        }
    });
});