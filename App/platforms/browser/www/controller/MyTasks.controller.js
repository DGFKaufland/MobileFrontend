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
            
            this.getView().setModel(sap.ui.getCore().getModel("gLocalSnoozeTime"), "snoozeTime");
            this.getView().setModel(sap.ui.getCore().getModel("gLocalSnoozeMessage"), "snoozeMessage");
            
       
            this.oItem = {snooze_time : "",
      			  message: "",
      			  state: ""};
          
            /*
        	var snoozeInformation = {snooze_time : "", 
					 message: ""};
            this.getView().setModel(snoozeInformation, "snoozeInformation");
            
            this.snoozeInformation = {snooze_time : "", 
					 message: ""};
            */
    
        },
        inProcessTask : function(oEvent) {
            var oItem = oEvent.getSource().getBindingContext("allNotifications").getObject();
            this.changeStatusTask(oItem, "INPROCESS");
        },
        closeTask: function(oEvent){
            var oItem = oEvent.getSource().getBindingContext("allNotifications").getObject();
            this.changeStatusTask(oItem, "CLOSED");
        },
        _getDialogSnooze : function () {
            if (!this._oDialog) {
                this._oDialog = sap.ui.xmlfragment("sap.ui.ksilence.view.HeaderSnooze", this);
                this.getView().addDependent(this._oDialog);
            }
            return this._oDialog;
        },
        onOpenDialogSnooze : function (oEvent) {
        	this.oItem = oEvent.getSource().getBindingContext("allNotifications").getObject();
            this._getDialogSnooze().open();
        },
        saveSnooze: function(){        	
        	      	
        	 var viewLocalSnoozeTime = this.getView().getModel("snoozeTime");
             var gLocalSnoozeTime = sap.ui.getCore().getModel("gLocalSnoozeTime");
             
             

             if(viewLocalSnoozeTime.getProperty("/snooze_time") != ""){
            	 gLocalSnoozeTime.setProperty("/snooze_time", viewLocalSnoozeTime.getProperty("/snooze_time"));
             }
             
             console.log(gLocalSnoozeTime);
             
             var viewLocalSnoozeMessage = this.getView().getModel("snoozeMessage");
             var gLocalSnoozeMessage = sap.ui.getCore().getModel("gLocalSnoozeMessage");

             
             
             if(viewLocalSnoozeMessage.getProperty("/message") != ""){
            	 gLocalSnoozeMessage.setProperty("/message", viewLocalSnoozeMessage.getProperty("/message"));
             }
             
             console.log(gLocalSnoozeMessage);
        	   	
             this.oItem.snooze_time =  gLocalSnoozeTime.oData.snooze_time;
             this.oItem.message = gLocalSnoozeMessage.oData.message;
             this.changeStatusTask(this.oItem, "INPROCESS");
            this.oItem.state = "INPROCESS";
            console.log(this.oItem);
            
            $.ajax({
                type: "PUT",
                url: sap.ui.getCore().getModel("gSettings").oData.url + "notifications/" + this.oItem.id,
                data: JSON.stringify(this.oItem),
                contentType: "application/json; charset=utf-8",
                dataType: "json"
            });
            
            this._getDialogSnooze().close();
            
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