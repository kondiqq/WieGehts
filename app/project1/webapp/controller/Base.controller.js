sap.ui.define(
    ["sap/ui/core/mvc/Controller",
    "../model/formatter"],

    /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   */


    function (Controller, Formatter) {
        "use strict";
    
        return Controller.extend("libka.project1.controller.Base", {
            formatter: Formatter,
            onInit: function () {},
    
        getRouter: function () {
            return this.getOwnerComponent().getRouter();
        },
    
        getI18nText: function () {
            return this.getView().getModel("i18n").getResourceBundle().getText(
            ...arguments
            ); //spread operator used for passing optional values for i18n placeholders
            },
        });
    }
);