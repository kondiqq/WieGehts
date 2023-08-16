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

            _onPatternMatched : function(){
                let oPropertiesModel =  this.getOwnerComponent().getModel('tableViewModel');
                let oModel = this.getView().getModel();
                this.getTheOldest(oModel, oPropertiesModel);
                this.getTheOldest(oModel, oPropertiesModel);
                this.getNoBook(oModel, oPropertiesModel);
                this.getNoAuthor(oModel, oPropertiesModel);
                console.log(123);
            },

            convert2GalacticCredits: function(sCurrency, iValue) {
                let oModel = this.getView().getModel();
                oModel.callFunction("", {
                    method: "GET",
                    urlParameters: {},
                    success: function(oData) {},
                    error: function(err) {}
                });
            },

            getTheOldest: function(oModel, oSavedModel) {
                oModel.callFunction("/getTheOldestAuthor", {
                    method: "GET",
                    success: function(oData) {
                        const oOldestAuthor = oData.getTheOldestAuthorta;
                        console.log('OK', oData);
                        oSavedModel.setProperty("/Authors/OldestAuthor", oOldestAuthor);
                    },
                    error: function(err){
                        MessageBox.error(`It's something wrong`);
                        console.log('No OK', err);
                        console.error(err);
                    }
                });
            },

            getTheYounger: function(oModel, oSavedModel) {
                oModel.callFunction("/getTheYoungestAuthor", {
                    method: "GET",
                    success: function(oData) {
                        const oYoungestAuthor = oData.getTheYoungestAuthor;
                        console.log('OK', oData);
                        oSavedModel.setProperty("/Authors/YoungestAuthor", oYoungestAuthor);
                    },
                    error: function(err){
                        MessageBox.error(`It's something wrong`);
                        console.log('No OK', err);
                        console.error(err);
                    }
                });
            },

            getNoBook: function(oModel, oSavedModel) {
                oModel.callFunction("/getNoBook", {
                    method: "GET",
                    success: function(oData) {
                        const iNoBook = oData.getNoBook;
                        console.log('OK', oData);
                        oSavedModel.setProperty("/Numbers/NoBook", iNoBook);
                    },
                    error: function(err){
                        MessageBox.error(`It's something wrong`);
                        console.log('No OK', err);
                        console.error(err);
                    }
                });
            },

            getNoAuthor: function(oModel, oSavedModel) {
                oModel.callFunction("/getNoAuthor", {
                    method: "GET",
                    success: function(oData) {
                        const iNoAuthor = oData.getNoAuthor;
                        console.log('OK', oData);
                        oSavedModel.setProperty("/Numbers/NoAuthor", iNoAuthor);
                    },
                    error: function(err){
                        MessageBox.error(`It's something wrong`);
                        console.log('No OK', err);
                        console.error(err);
                    }
                });
            },
        });
    });
