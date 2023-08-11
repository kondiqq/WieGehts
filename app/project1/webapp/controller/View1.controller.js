sap.ui.define([
    "./Base.controller",
    "sap/m/MessageBox",
    "../model/formatter"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, MessageBox, Formatter) {
        "use strict";

        return Controller.extend("libka.project1.controller.View1", {
            formatter: Formatter,
            onInit: function (){
                const oRouter = this.getRouter();
                oRouter.getRoute("View1")
                .attachPatternMatched(this._onPatternMatched, this);
            },

            _onPatternMatched : function(oEvent){
                debugger;
                let oPropertiesModel = this.getView().getModel('tableViewModel');
                let oModel = this.getView().getModel();
                oModel.callFunction("/getTheOldestAuthor", {
                    method: "GET",
                    success: function(oData) {
                        const oOldestAuthor = JSON.parse(oData);
                        console.log('OK', oData);
                        oPropertiesModel.setProperty("/NoBook", oOldestAuthor);
                        MessageBox.info(`That's work`);
                    },
                    error: function(err){
                        MessageBox.error(`It's something wrong`);
                        console.log('No OK', err);
                        console.error(err);
                    }
                });
            },

            extendLibrary : function(){

            },
        });
    });
