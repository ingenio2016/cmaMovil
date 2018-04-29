Ext.define("CoomuceMovil.view.InformacionOrientacion.EncuestaIps", {
    extend: "Ext.form.Panel",

    xtype: "encuestaips",

    requires: [
    "CoomuceMovil.view.InformacionOrientacion.EncuestaIpsController",
    "CoomuceMovil.view.InformacionOrientacion.EncuestaIpsModel"
    ],

    controller: "informacionorientacion-encuestaips",
    viewModel: { type: "informacionorientacion-encuestaips" },

    bodyPadding: 10,
    defaults: {
        anchor: "100%",
        labelWidth: 150
    },
    scrollable: true,
    id: "Form-EncuestaIps",

    listeners: {
        activate: "onActivate"
    },

    items: [
    { xtype: "button", minWidth: 80, text: "Sincronizar Datos", iconCls: "fa fa-cloud-upload", handler: "onBotonSincronizarClick", ui: "action", reference: "botonSincronizar", width: 200 },
    { xtype: "button", minWidth: 80, text: "Eliminar Datos", iconCls: "fa fa-trash", handler: "onBotonDeleteLCClick", ui: "action", reference: "botonEliminar", width: 200 },
    { xtype: "container", html: "ENCUESTA DE SATISFACCION DE USUARIO DE LA  I.P.S DE I NIVEL" },
    { xtype: "container", html: "ESTIMADO USUARIO SI USTED HA RECIBIDO EN ESTE MES LOS SERVICIOS DE INSTITUCIONES DE SALUD ( HOSPITAL, CENTRO DE SALUD, IPS) LO INVITAMOS A RESPONDER LAS SIGUIENTES PREGUNTAS SOBRE LA ATENCION" },
    {
        layout: {
            type: "hbox"
        },
        items: [
        {
            items: [
            { xtype: "numberfield", hidden: true, name: "idFuanAfiliado", id: "idFuanAfiliado" },
            {
                xtype: "textfield",
                label: "No. de identificación",
                labelWidth: 300,
                name: "compAfiliado",
                id: "compAfiliado",
                readOnly: true,
                reference: "compAfiliado",
                width: 700
            }
            ]
        },
        {
            items: [
            {
                xtype: "button",
                componentReference: [
                "idFuanAfiliado", "compAfiliado"
                ],
                handler: Coomuce.Util.buscarAfiliadoEncuesta1,
                iconCls: "x-fa fa-list-alt",
                ui: "action",
                reference: "botonBuscarAfiliado",
                tooltip: "Lista de Afiliados",
                width: 30
            }
            ]
        }
        ]
    },
    {
        layout: {
            type: "hbox"
        },
        items: [
        {
            items: [
            { xtype: "numberfield", hidden: true, name: "idIps", id: "idIps" },
            {
                xtype: "textfield",
                label: "Nombre de la institución donde fue atendido",
                labelWidth: 300,
                name: "nombreCompletoIps",
                id: "nombreCompletoIps",
                readOnly: true,
                reference: "nombreCompletoIps",
                width: 700
            }
            ]
        },
        {
            items: [
            {
                xtype: "button",
                componentReference: [
                "idIps", "nombreCompletoIps"
                ],
                handler: Coomuce.Util.buscarNuevaIps,
                iconCls: "x-fa fa-list-alt",
                ui: "action",
                reference: "botonBuscarIps",
                tooltip: "Lista de Ips",
                width: 30
            }
            ]
        }
        ]
    },
    { xtype: "container", html: "Su opinión es muy importante para nosotros porque nos permite organizar nuestros servicios para poder satisfacer sus expectativas por esto le solicitamos que responda con sinceridad marcando con una (X) solo una respuesta por pregunta" },
    {
        bodyPadding: 10,
        height: 400,
        id: "ContenidoEncuestaIps",
        scrollable: true,
        style: "border: 1px solid;"
    },
    {
        xtype: "textareafield",
        label: "Observaciones",
        name: "observacionEncuestaIps"
    },
    {
        xtype: 'container',
        defaults: {
            xtype: "button",
            ui: "action"
        },
        layout: {
            type: 'hbox'
        },
        items: [
        { 
            minWidth: 80, 
            text: 'Guardar', 
            reference: "botonGuardar", 
            width: 120,
            handler: function(btn, e) {
                Ext.Msg.show({
                    title: "Guardar Datos",
                    message: 'Desea guardar las modificaciones realizadas?',
                    width: 300,
                    buttons: [
                    {text: 'Si', itemId: 'yes', ui: 'action'},
                    {text: 'No', itemId: 'no'}
                    ],
                    fn: function (buttonId) {
                        if (buttonId === "yes") {
                            var form = btn.up('formpanel');
                            var datos = form.getValues();
                            var date = new Date();

                            if(datos.idFuanAfiliado == 0 || datos.idFuanAfiliado == undefined){
                                Ext.Msg.alert('Advertencia', "El campo N° de identificación es requerido. Por favor verifique", Ext.emptyFn);
                                return false;
                            }

                            if(datos.idIps == 0 || datos.idIps == undefined){
                                Ext.Msg.alert('Advertencia', "El ID de IPS es requerido. Por favor verifique", Ext.emptyFn);
                                return false;
                            }

                            var encuestaIps = {};
                            var resPre = [];
                            var resLit = [];

                            for (var key in datos) {
                                console.log(key);
                                if (key === 'length' || !datos.hasOwnProperty(key)) continue;

                                var value = datos[key];
                                switch (key.substring(0, 6)) {
                                    case "id_pre":
                                    resPre.push({
                                        idEncuestaIps: 0, // inicializo este campo que no se captura en pantalla
                                        idEncuestaPregunta: parseInt(key.substring(7)),
                                        valorEncuestaIpsRespPregunta: value
                                    });
                                    break;
                                    case "id_lit":
                                    resLit.push({
                                        idEncuestaIps: 0, // inicializo este campo que no se captura en pantalla
                                        idEncuestaLiteral: parseInt(key.substring(7)),
                                        valorEncuestaIpsRespLiteral: value
                                    });
                                    break;
                                    default:
                                    encuestaIps[key] = value;
                                    break;
                                }
                            }

                            //Completo la Encuesta
                            encuestaIps.idEncuestaIps = 0;
                            encuestaIps.fechaHoraEncuestaIps = new Date();
                            encuestaIps.idUsuario = Coomuce.Util.DatosUsuario.idUsuario;

                            var encuesta = {
                                encuestaIps: encuestaIps,
                                respPregunta: resPre,
                                respLiteral: resLit
                            };

                            var randomNumber = Math.floor(Math.random() * 1000000);
                            localStorage.setItem("encuestaIps-" + randomNumber, JSON.stringify(encuesta));
                            Ext.Msg.alert('Señor Usuario', "La información ha sido guardada exitosamente", Ext.emptyFn);
                            Ext.getCmp("Form-EncuestaIps").destroy();
                        }
                    }
                });
            }
        },
        { 
            minWidth: 80, 
            text: 'Cancelar', 
            reference: "botonCancelar", 
            width: 120,
            handler: function(btn, e) {
                Ext.getCmp("Form-EncuestaIps").destroy();
            }
        }
        ]
    }
    ]
});