sap.ui.define([
    "./Base.controller",
    "sap/m/MessageBox",
    "../model/formatter",
    "sap/ui/core/Fragment"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, MessageBox, Formatter, Fragment) {
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
            },

            onAddBookPress: function(oEvent) {
                if (!this.pDialog) {
                    this.pDialog = this.loadFragment({
                        name: "libka.project1.view.fragments.bookCreator"
                    });
                } 
                this.pDialog.then(function(oDialog) {
                    oDialog.open();
                });
            },

            onPressOK:function() {
                debugger;
                let oModel = this.getView().getModel();
                const sTitle = this.byId("idTitleInput").getValue();
                const dPickDate = this.byId("bookReleasePicker").getDateValue();
                const sAuthorID = this.byId("idFragmentCombobox").getSelectedKey();
                const sDescription = this.byId("idTitleDescription").getValue();
                const sPath = `/Author`;
                let oAuthor = oModel.read(sPath, {
                    success: function(oData, oResp) {
                        console.log(oData);
                        return oData;
                    },
                    error: function(err){
                        console.error(err);
                        MessageBox.error(this.getI18nText("txtError"));
                    }
                })
                const oPayload = {
                    title: sTitle,
                    publishDate: dPickDate,
                    // author: oAuthor,
                    description: sDescription
                };
                oModel.create("/Book", oPayload, {
                    success: function() {
                        MessageBox.confirm('Success confrimed');
                    },
                    error: function(err) {
                        console.error(err);
                        MessageBox.error("Something went wrong");
                    }
                });
                this.clearFragmentInputs();
                this.byId("idFragmentBook").close();
            },

            onPressCancel:function() {
                const sTitle = this.byId("idTitleInput").getValue();
                const dPickDate = this.byId("bookReleasePicker").getDateValue();
                const sAuthorID = this.byId("idFragmentCombobox").getSelectedKey();
                const sDescription = this.byId("idTitleDescription").getValue();
                sTitle || dPickDate || sAuthorID || sDescription ? this.messageDirtFlag() : this.byId("idFragmentBook").close();
                this.clearFragmentInputs();
                this.byId("idFragmentBook").close();
            },

            messageDirtFlag: function() {
                MessageBox.warning(
                    this.getI18nText("txtDirtFlag"),
                    {
                        icon: MessageBox.Icon.WARNING,
                        title: this.getI18nText("hdrDirtyFlag"),
                        actions: [MessageBox.Action.OK, MessageBox.Action.CANCEL],
                        emphasizedAction: MessageBox.Action.OK,
                        onClose: function() {
                            this.clearFragmentInputs();
                            this.byId("idFragmentBook").close();
                        },
                        initialFocus: MessageBox.Action.CANCEL,
                    }
                );
            },

            clearFragmentInputs: function() {
                this.byId("idTitleInput").setValue(null);
                this.byId("bookReleasePicker").setValue(null);;
                this.byId("idFragmentCombobox").setValue(null);;
                this.byId("idTitleDescription").setValue(null);
            },

            convert2GalacticCredits: function(sCurrency, iValue) {
                let oModel = this.getView().getModel();
                oModel.callFunction("", {
                    method: "GET",
                    urlParameters: {
                        quantity: iValue,
                        currType: sCurrency
                    },
                    success: function(oData) {
                        console.log("Exchanged");
                    },
                    error: function(err) {
                        MessageBox.error("It's something wrong\n Please contact with administrator");
                        console.error("It's something wrong", err);
                    }
                });
            },

            getTheOldest: function(oModel, oSavedModel) {
                oModel.callFunction("/getTheOldestAuthor", {
                    method: "GET",
                    success: function(oData) {
                        const oOldestAuthor = oData.getTheOldestAuthor;
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
