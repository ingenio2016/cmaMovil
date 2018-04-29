Ext.define('CoomuceMovil.view.CaracterizacionPoblacional.IfppirModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.caracterizacionpoblacional-ifppir',

    stores: {
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

        getDepartamento: {
            storeId: 'getDepartamentoStore',
            autoLoad: true,
            fields: [
                { name: "idDepartamento", type: "int" },
                { name: 'codigoDepartamento', type: 'string' },
                { name: 'nombreDepartamento', type: 'string' },
                {
                    name: "compDepartamento", convert: function (v, record) {
                        return "(" + record.get("codigoDepartamento") + ") " + record.get("nombreDepartamento");
                    }
                }
            ],
            proxy: {
                timeout: 600000,
                useDefaultXhrHeader: false,
                type: 'ajax',
                url: "resources/data/Departamento.json", // Coomuce.Url.Administracion + "GetDepartamentoAll",
                reader: {
                    type: 'json',
                    rootProperty: 'data',
                    totalProperty: "total"
                }
            }
        },

        getCity: {
            storeId: 'getCityStore',
            autoLoad: true,
            fields: [
                { name: "idDepartamento", type: "int" },
                { name: "idCiudad", type: "int" },
                { name: 'codigoCiudad', type: 'string' },
                { name: 'nombreCiudad', type: 'string' },
                {
                    name: "compCiudad", convert: function (v, record) {
                        return "(" + record.get("codigoCiudad") + ") " + record.get("nombreCiudad");
                    }
                }
            ],
            proxy: {
                timeout: 600000,
                useDefaultXhrHeader: false,
                type: 'ajax',
                url: "resources/data/Ciudad.json", // Coomuce.Url.Administracion + "GetCiudadAll",
                reader: {
                    type: 'json',
                    rootProperty: 'data',
                    totalProperty: "total"
                }
            }
        },

        getCiudad: {
            autoLoad: false,
            fields: [
                { name: "idDepartamento", type: "int" },
                { name: "idCiudad", type: "int" },
                { name: 'codigoCiudad', type: 'string' },
                { name: 'nombreCiudad', type: 'string' },
                {
                    name: "compCiudad", convert: function (v, record) {
                        return "(" + record.get("codigoCiudad") + ") " + record.get("nombreCiudad");
                    }
                }
            ],
            proxy: {
                timeout: 600000,
                useDefaultXhrHeader: false,
                type: 'ajax',
                url: "resources/data/Ciudad.json", // Coomuce.Url.Administracion + "GetCiudadAll",
                reader: {
                    type: 'json',
                    rootProperty: 'data',
                    totalProperty: "total"
                }
            }
        },

        getTipoZona: {
            storeId: 'getZonaStore',
            autoLoad: true,
            fields: [
                { name: "idTipoZona", type: "int" },
                { name: 'codigoTipoZona', type: 'string' },
                { name: 'nombreTipoZona', type: 'string' },
                {
                    name: "compTipoZona", convert: function (v, record) {
                        return "(" + record.get("codigoTipoZona") + ") " + record.get("nombreTipoZona");
                    }
                }
            ],
            proxy: {
                timeout: 600000,
                useDefaultXhrHeader: false,
                type: 'ajax',
                url: "resources/data/TipoZona.json", // Coomuce.Url.Parametros + "GetTipoZonaAll",
                reader: {
                    type: 'json',
                    rootProperty: 'data',
                    totalProperty: "total"
                }
            }
        },

        getTipoSexo: {
            storeId: 'getSexoStore',
            autoLoad: true,
            fields: [
                { name: "idTipoSexo", type: "int" },
                { name: 'codigoTipoSexo', type: 'string' },
                { name: 'nombreTipoSexo', type: 'string' },
                {
                    name: "compTipoSexo", convert: function (v, record) {
                        return "(" + record.get("codigoTipoSexo") + ") " + record.get("nombreTipoSexo");
                    }
                }
            ],
            proxy: {
                timeout: 600000,
                useDefaultXhrHeader: false,
                type: 'ajax',
                url: "resources/data/TipoSexo.json", // Coomuce.Url.Parametros + "GetTipoSexoAll",
                reader: {
                    type: 'json',
                    rootProperty: 'data',
                    totalProperty: "total"
                }
            }
        },

        getPreguntasFactor: {
            autoLoad: false,
            fields: [
                { name: "idPregunta", type: "int" },
                { name: "factor", type: "string" },
                { name: "subfactor", type: "string" },
                { name: "codigoPregunta", type: "string" },
                { name: "descripcionPregunta", type: "string" },
                { name: "respuestaSiPregunta", type: "bool" },
                { name: "respuestaNoPregunta", type: "bool" }
            ],
            listeners: {
                load: function (store, records, successful, operation, eOpts) {
                    Ext.each(records, function (item, index, allItems) {
                        item.data.respuestaNoPregunta = true;
                        item.commit();
                    });
                }
            },
            proxy: {
                timeout: 600000,
                useDefaultXhrHeader: false,
                type: 'ajax',
                url: "resources/data/PreguntasFactorPorCiclo.json", // Coomuce.Url.Funciones + "GetPreguntasFactorPorCicloAll",
                reader: {
                    type: 'json',
                    rootProperty: 'data',
                    totalProperty: "total"
                }
            }
        }

    }
});
