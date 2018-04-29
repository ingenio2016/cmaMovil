Ext.define('CoomuceMovil.view.main.Main', {
    extend: 'Ext.Panel',
    xtype: 'main-main',
    requires: [
    'Ext.list.Tree',
    'Ext.list.TreeItem',
    'CoomuceMovil.view.main.MainController',
    'CoomuceMovil.view.main.MainModel',
    "CoomuceMovil.view.ActualizacionBd.Afiliacion",
    "CoomuceMovil.view.CaracterizacionPoblacional.Ifppir",
    "CoomuceMovil.view.CaracterizacionPoblacional.Hfdfr",
    "CoomuceMovil.view.DemandaInducida.Purisu",
    "CoomuceMovil.view.InformacionOrientacion.EncuestaIps",
    "CoomuceMovil.view.InformacionOrientacion.EncuestaEps",
    "CoomuceMovil.view.login.Login",
    "CoomuceMovil.view.ParticipacionSocial.ListadoAsistenciaGeneral"
    ],
    controller: 'main',
    viewModel: { type: 'main' },
    layout: "hbox",
    id: "Form-Main",
    items: [
    {
        items: [
        {
            xtype: 'treelist',
            reference: 'treelist',
            bind: '{navItems}',
            listeners: {
                click: {
                    element: 'element',
                    fn: function (obj, node, eOpts) {
                        var me = this;
                        try {
                            if (Ext.get(obj.target.id).component === undefined) {
                                return false;
                            }
                            var item = Ext.get(obj.target.id).component;
                            if (item._node === undefined) {
                                return false;
                            }
                            //Si se cierra sesión hace reload para llevar a login
                            if(item._node.data.vista != "main-login") {
                                if (!item._expandable) {
                                    var ifpr = Ext.getCmp("Form-Ifppir-Principal");
                                    var hfdr = Ext.getCmp("Form-Hfdfr-Principal");
                                    var asistencia = Ext.getCmp("Form-ListadoAsistenciaGeneral-Principal");
                                    var encuestaIPS = Ext.getCmp("Form-EncuestaIps");
                                    var encuestaEPS = Ext.getCmp("Form-EncuestaEps");
                                    var purisu = Ext.getCmp("Form-Purisu-Principal");
                                    if(ifpr != undefined) {
                                        ifpr.destroy();
                                    }
                                    if(hfdr != undefined) {
                                        hfdr.destroy();
                                    }
                                    if(asistencia != undefined) {
                                        asistencia.destroy();
                                    }
                                    if(encuestaIPS != undefined) {
                                        encuestaIPS.destroy();
                                    }
                                    if(encuestaEPS != undefined) {
                                        encuestaEPS.destroy();
                                    }
                                    if(purisu != undefined) {
                                        purisu.destroy();
                                    }
                                    var mod = Ext.create({ xtype: item._node.data.vista });

                                    Ext.getCmp("ContenedorModulo").removeAll();
                                    Ext.getCmp("ContenedorModulo").add(mod);
                                }
                            }else {
                                window.location.reload();
                            }
                        } catch (err) {
                            console.log(err);
                            Coomuce.Util.ShowMessage({ type: "ERROR", title: "COOMUCE", msg: err.message });
                        }
                    }
                }
            },
        }
        ],
        style: "border-right: 1px solid #E9E9E9;",
        flex: 1
    },
    {
        flex: 4,
        layout: "fit",
        layoutConfig: {
            scrollOffset: 19
        },

            //html: "Contenido modulos",
            id: "ContenedorModulo",
            scrollable: "y"
        }
        ]
    });
