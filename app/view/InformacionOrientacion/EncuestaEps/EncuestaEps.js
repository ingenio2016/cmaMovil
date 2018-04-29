Ext.define("CoomuceMovil.view.InformacionOrientacion.EncuestaEps", {
    extend: "Ext.form.Panel",

    xtype: "encuestaeps",

    requires: [
    "CoomuceMovil.view.InformacionOrientacion.EncuestaEpsController",
    "CoomuceMovil.view.InformacionOrientacion.EncuestaEpsModel"
    ],

    controller: "informacionorientacion-encuestaeps",
    viewModel: { type: "informacionorientacion-encuestaeps" },

    listeners: {
        activate: "onActivate"
    },

    bodyPadding: 10,
    defaults: {
        anchor: "100%",
        labelWidth: 150
    },
    scrollable: true,
    id: "Form-EncuestaEps",

    items: [
    { xtype: "button", minWidth: 80, text: "Sincronizar Datos", iconCls: "fa fa-cloud-upload", handler: "onBotonSincronizarClick", ui: "action", reference: "botonSincronizar", width: 200 },
    { xtype: "button", minWidth: 80, text: "Eliminar Datos", iconCls: "fa fa-trash", handler: "onBotonDeleteLCClick", ui: "action", reference: "botonEliminar", width: 200 },
    { xtype: "container", html: "ENCUESTA DE SATISFACCION DE USUARIO DE LA EPS-S" },
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
                labelWidth: 150,
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
                label: "Punto de Atención",
                labelWidth: 150,
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
    { xtype: "container", html: "Esta encuesta tiene por objeto conocer su opinion  sobre los servicios prestados por la ARS." },
    { xtype: "container", html: "Su opinión es muy importante para nosotros porque nos permite organizar nuestros servicios para poder satisfacer sus expectativas, por eso le solicitamos que responda con sinceridad marcando (X) y solo una respuesta por pregunta." },
    {
        bodyPadding: 10,
        height: 400,
        id: "ContenidoEncuestaEps",
        scrollable: true,
        style: "border: 1px solid;"
    },
    {
        xtype: "textareafield",
        label: "Observaciones",
        name: "observacionEncuestaEps"
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

                            var encuestaEps = {};
                            var resPre = [];
                            var resLit = [];

                            for (var key in datos) {
                                if (key === 'length' || !datos.hasOwnProperty(key)) continue;

                                var value = datos[key];
                                switch (key.substring(0, 6)) {
                                    case "id_pre":
                                    resPre.push({
                                idEncuestaEps: 0, // inicializo este campo que no se captura en pantalla
                                idEncuestaPregunta: parseInt(key.substring(7)),
                                valorEncuestaEpsRespPregunta: value
                            });
                                    break;
                                    case "id_lit":
                                    resLit.push({
                                idEncuestaEps: 0, // inicializo este campo que no se captura en pantalla
                                idEncuestaLiteral: parseInt(key.substring(7)),
                                valorEncuestaEpsRespLiteral: value
                            });
                                    break;
                                    default:
                                    encuestaEps[key] = value;
                                    break;
                                }
                            }

                            //Completo la Encuesta
                            encuestaEps.idEncuestaEps = 0;
                            encuestaEps.fechaHoraEncuestaEps = new Date();
                            encuestaEps.idUsuario = Coomuce.Util.DatosUsuario.idUsuario;

                            var encuesta = {
                                encuestaEps: encuestaEps,
                                respPregunta: resPre,
                                respLiteral: resLit
                            };

                            console.log(encuesta);

                            var randomNumber = Math.floor(Math.random() * 1000000);
                            localStorage.setItem("encuestaEps-" + randomNumber, JSON.stringify(encuesta));
                            Ext.Msg.alert('Señor Usuario', "La información ha sido guardada exitosamente", Ext.emptyFn);
                            Ext.getCmp("Form-EncuestaEps").destroy();
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
                Ext.getCmp("Form-EncuestaEps").destroy();
            }
        }
        ]
    }
    ]
});