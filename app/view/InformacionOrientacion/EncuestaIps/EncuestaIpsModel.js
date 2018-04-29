Ext.define("CoomuceMovil.view.InformacionOrientacion.EncuestaIpsModel", {
    extend: "Ext.app.ViewModel",
    alias: "viewmodel.informacionorientacion-encuestaips",

    stores: {
        getIPSStore : {
            storeId: 'ipsMainStore',
            autoLoad: true,
            fields: [
                { name: "idIps", type: "int" },
                { name: 'codigoIps', type: 'string' },
                { name: 'identificacionIps', type: 'string' },
                { name: 'razonIps', type: 'string' },
                { name: 'nombreCompletoIps', type: 'string' }
            ],
            proxy: {
                timeout: 600000,
                useDefaultXhrHeader: false,
                type: 'ajax',
                url: "resources/data/Ips.json", //Coomuce.Url.Funciones + "GetIpsAll",
                reader: {
                    type: 'json',
                    rootProperty: 'data',
                    totalProperty: "total"
                }
            }
        },
        getTipoIdentificacion: {
            storeId: 'getTipoIdentificacion',
            autoLoad: true,
            fields: [
                { name: "idTipoIdentificacion", type: "int" },
                { name: 'codigoTipoIdentificacion', type: 'string' },
                { name: 'nombreTipoIdentificacion', type: 'string' },
                {
                    name: "compTipoIdentificacion", convert: function (v, record) {
                        return "(" + record.get("codigoTipoIdentificacion") + ") " + record.get("nombreTipoIdentificacion");
                    }
                }
            ],
            proxy: {
                timeout: 600000,
                useDefaultXhrHeader: false,
                type: 'ajax',
                url: "resources/data/TipoIdentificacion.json", // Coomuce.Url.Parametros + "GetTipoIdentificacionAll",
                reader: {
                    type: 'json',
                    rootProperty: 'data',
                    totalProperty: "total"
                }
            }
        },
        getIps: {
            autoLoad: true,
            fields: ["idIps", "nombreCompletoIps"],
            proxy: {
                timeout: 600000,
                useDefaultXhrHeader: false,
                type: 'ajax',
                url: "resources/data/Ips.json", // Coomuce.Url.Funciones + "GetIpsAll",
                reader: {
                    type: 'json',
                    rootProperty: 'data',
                    totalProperty: "total"
                }
            }
        },

        getEncuesta: {
            autoLoad: false,
            fields: [
                "idEncuestaCategoria", "nombreEncuestaCategoria", "preguntas"
            ],
            proxy: {
                timeout: 600000,
                useDefaultXhrHeader: false,
                type: 'ajax',
                url: "resources/data/EncuestaIps.json", // Coomuce.Url.Funciones + "GetEncuestaAll",
                reader: {
                    type: 'json',
                    rootProperty: 'data',
                    totalProperty: "total"
                }
            }
        }
    }

});