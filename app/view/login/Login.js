Ext.define("CoomuceMovil.view.login.Login", {
    extend: "Ext.Panel",
    xtype: "main-login",
    requires: [
        "CoomuceMovil.view.login.LoginController",
        "CoomuceMovil.view.login.LoginModel",
        "Ext.form.Panel"    ],

    controller: "main-login",
    viewModel: { type: "main-login" },
    id: "Form-Login",
    defaults: {
        styleHtmlContent: true
    },

    layout: {
        type: "vbox",
        align: "center",
        pack: "center"
    },

    items: [
        { html: '<div style="padding-top: 30%"><img style="position: relative; left: 20%" src="resources/images/Logo-Coomuce.png" width="60%" /></div>' },
        {
            xtype: 'formpanel',
            bodyPadding: 10,
            border: true,
            items: [
                { style: "color:#03A397;font-size:22px;padding-top:20px;padding-bottom:10px;text-align:center;", html: "Iniciar Sesión" },
                { style: "color:#03A397;font-size:15px;padding-bottom:10px;text-align:center;", html: "para acceder al sistema" },
                {
                    style: "padding:50px 60px 10px 80px;text-align:center;", items: [
                        {
                            xtype: "textfield",
                            allowBlank: false,
                            emptyText: "Usuario",
                            label: "<div class='x-fa fa-user' style='color:#03A397;font-size:18px;'></div>",
                            labelSeparator: "",
                            labelWidth: 30,
                            name: "username",
                            value: "1234546"
                        }
                    ]
                },
                {
                    style: "text-align:center;",
                    items: [
                        {
                            xtype: "button",
                            handler: "onBotonIniciarClick",
                            iconCls: "x-fa fa-arrow-right",
                            iconAlign: "right",
                            text: "<b>Iniciar Sesión</b>"
                        }
                    ]
                }
            ],
            flex: 1,
            reference: "formAutenticacion"
        }
    ]

});
