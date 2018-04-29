Ext.define("CoomuceMovil.view.login.LoginController", {
    extend: "Ext.app.ViewController",
    alias: "controller.main-login",

    onBotonIniciarClick: function () {
        var me = this;

        var form = me.getView().lookupReference("formAutenticacion");

        var df = form.getValues();

        $.getJSON("resources/data/Usuario.json", function (data) {
            Ext.each(data.data, function (item, index, allItems) {
                if (item.identificacionUsuario === df.username) {
                    Coomuce.Util.DatosUsuario = item;

                    //localStorage.setItem("CoomuceLoggedIn", true);

                    // Remove Login Window
                    me.getView().destroy();

                    // Add the main view to the viewport
                    Ext.Viewport.add([
                        { xtype: "main-main" }
                    ]);
                }
            });
        });

    }

});