/**
 * This class is the view model for the Main view of the application.
 */
 Ext.define('CoomuceMovil.view.main.MainModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.main',
    stores: {
        afiliados: {
            storeId: 'getAfiliadoMainStore',
            autoLoad: true,
            fields: [
            "idFuanAfiliado", "primerApellidoFuanAfiliado", 'segundoApellidoFuanAfiliado',
            'primerNombreFuanAfiliado', "segundoNombreFuanAfiliado", "codigoTipoIdentificacion",
            "identificacionFuanAfiliado", "nombreTipoSexo",
            {
                name: "compAfiliado", convert: function (v, record) {
                    return record.get("identificacionFuanAfiliado") + " - " +
                    record.get("primerApellidoFuanAfiliado") + " " +
                    record.get("segundoApellidoFuanAfiliado") + " " +
                    record.get("primerNombreFuanAfiliado") + " " +
                    record.get("segundoNombreFuanAfiliado");
                }
            },
            {
                name: "nombreCompletoAfiliado", convert: function (v, record) {
                    return record.get("primerApellidoFuanAfiliado") + " " +
                    record.get("segundoApellidoFuanAfiliado") + " " +
                    record.get("primerNombreFuanAfiliado") + " " +
                    record.get("segundoNombreFuanAfiliado");
                }
            }
            ],
            proxy: {
                type: 'ajax',
                url: "resources/data/FuanAfiliado.json", 
                reader: {
                    type: 'json',
                    rootProperty: 'data',
                    totalProperty: "total"
                }
            }
        },
        navItems: {
            type: 'tree',
            rootVisible: true,
            root: {
                expanded: true,
                text: 'ALL',
                children: [
                {
                    text: 'ACTUALIZACIÓN BD',
                    iconCls: 'x-fa fa-folder-open',
                    children: [
                    {
                        text: 'Afiliación',
                        iconCls: "x-fa fa-tasks",
                        leaf: true,
                        vista: "afiliacion"
                    },
                    {
                        text: 'Novedades',
                        iconCls: "x-fa fa-tasks",
                        leaf: true,
                        vista: "novedades"
                    }
                    ]
                },
                {
                    text: 'CARACTERIZACIÓN POBLACIONAL',
                    iconCls: 'fa fa-users',
                    children: [
                    {
                        text: 'Historia Familiar para Detección de <br/>Factores de Riesgo',
                        iconCls: 'fa fa-thumb-tack',
                        leaf: true,
                        vista: "hfdfr"
                    },
                    {
                        text: 'Identificación y Focalización de pacientes<br/>para programas de intervención del riesgo',
                        iconCls: 'fa fa-thumb-tack',
                        leaf: true,
                        vista: "ifppir"
                    }
                    ]
                },
                {
                    text: 'DEMANDA INDUCIDA',
                    iconCls: 'x-fa fa-folder-open',
                    children: [
                    {
                        text: "Planilla única de registro de información y<br />servicios al usuario",
                        iconCls: 'fa fa-thumb-tack',
                        leaf: true,
                        vista: "purisu"
                    }
                    ]
                },
                {
                    text: 'INFORMACIÓN - ORIENTACIÓN',
                    iconCls: 'fa fa-info-circle',
                    children: [
                    {
                        text: 'Encuesta de Satisfacción de usuario de la<br />I.P.S de primer nivel',
                        iconCls: 'fa fa-thumb-tack',
                        leaf: true,
                        vista: "encuestaips"
                    },
                    {
                        text: 'Encuesta de satisfacción de usuario de la EPS-S',
                        iconCls: 'fa fa-thumb-tack',
                        leaf: true,
                        vista: "encuestaeps"
                    }
                    ]
                },
                {
                    text: "PARTICIPACIÓN SOCIAL",
                    iconCls: 'fa fa-hand-rock-o',
                    children: [
                    {
                        text: "Listado asistencia general",
                        iconCls: 'fa fa-thumb-tack',
                        leaf: true,
                        vista: "listadoasistenciageneral"
                    }
                    ]
                },
                {
                    text: "SALIR DEL SISTEMA",
                    iconCls: 'fa fa-sign-out',
                    children: [
                    {
                        text: 'Cerrar sesión',
                        iconCls: 'fa fa-sign-out',
                        leaf: true,
                        vista: "main-login"
                    }
                    ]
                }
                ]
            }
        }
    }

});
