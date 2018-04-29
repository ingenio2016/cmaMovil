Ext.define("CoomuceMovil.view.ParticipacionSocial.ListadoAsistenciaGeneralModel", {
    extend: "Ext.app.ViewModel",
    alias: "viewmodel.participacionsocial-listadoasistenciageneral",

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
        getGruposFocales: {
            autoLoad: true,
            fields: [
            { name: "idGruposFocales", type: "int" },
            { name: 'codigoGruposFocales', type: 'string' },
            { name: 'nombreGruposFocales', type: 'string' },
            {
                name: "compGruposFocales", convert: function (v, record) {
                    return "(" + record.get("codigoGruposFocales") + ") " + record.get("nombreGruposFocales");
                }
            }
            ],
            proxy: {
                timeout: 600000,
                useDefaultXhrHeader: false,
                type: 'ajax',
                url: "resources/data/GruposFocales.json", // Coomuce.Url.Parametros + "GetGruposFocalesAll",
                reader: {
                    type: 'json',
                    rootProperty: 'data',
                    totalProperty: "total"
                }
            }
        },

        getDepartamento: {
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

        getCiudad: {
            storeId: 'getCiudadStore',
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
            data: []
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

        getEje: {
            autoLoad: true,
            fields: [
            { name: "idEje", type: "int" },
            { name: "codigoEje", type: "string" },
            { name: 'nombreEje', type: 'string' },
            {
                name: "compEje", convert: function (v, record) {
                    return "(" + record.get("codigoEje") + ") " + record.get("nombreEje");
                }
            }
            ],
            proxy: {
                timeout: 600000,
                useDefaultXhrHeader: false,
                type: 'ajax',
                url: "resources/data/Eje.json", // Coomuce.Url.Parametros + "GetEjeAll",
                reader: {
                    type: 'json',
                    rootProperty: 'data',
                    totalProperty: "total"
                }
            }
        },

        getUnidad: {
            storeId: 'getUnidadStore',
            autoLoad: true,
            fields: [
            { name: "idEje", type: "int" },
            { name: "idUnidad", type: "int" },
            { name: "codigoUnidad", type: "string" },
            { name: 'nombreUnidad', type: 'string' },
            {
                name: "compUnidad", convert: function (v, record) {
                    return "(" + record.get("codigoUnidad") + ") " + record.get("nombreUnidad");
                }
            }
            ],
            data: []
        },

        getUnity: {
            storeId: 'getUnityStore',
            autoLoad: true,
            fields: [
            { name: "idEje", type: "int" },
            { name: "idUnidad", type: "int" },
            { name: "codigoUnidad", type: "string" },
            { name: 'nombreUnidad', type: 'string' },
            {
                name: "compUnidad", convert: function (v, record) {
                    return "(" + record.get("codigoUnidad") + ") " + record.get("nombreUnidad");
                }
            }
            ],
            proxy: {
                timeout: 600000,
                useDefaultXhrHeader: false,
                type: 'ajax',
                url: "resources/data/Unidad.json", // Coomuce.Url.Parametros + "GetUnidadAll",
                reader: {
                    type: 'json',
                    rootProperty: 'data',
                    totalProperty: "total"
                }
            }
        },

        getModulo: {
            storeId: 'getModuloStore',
            autoLoad: true,
            fields: [
            { name: "idUnidad", type: "int" },
            { name: "idModulo", type: "int" },
            { name: "codigoModulo", type: "string" },
            { name: 'nombreModulo', type: 'string' },
            {
                name: "compModulo", convert: function (v, record) {
                    return "(" + record.get("codigoModulo") + ") " + record.get("nombreModulo");
                }
            }
            ],
            data: []
        },

        getModule: {
            storeId: 'getModuleStore',
            autoLoad: true,
            fields: [
            { name: "idUnidad", type: "int" },
            { name: "idModulo", type: "int" },
            { name: "codigoModulo", type: "string" },
            { name: 'nombreModulo', type: 'string' },
            {
                name: "compModulo", convert: function (v, record) {
                    return "(" + record.get("codigoModulo") + ") " + record.get("nombreModulo");
                }
            }
            ],
            proxy: {
                timeout: 600000,
                useDefaultXhrHeader: false,
                type: 'ajax',
                url: "resources/data/Modulo.json", // Coomuce.Url.Parametros + "GetModuloAll",
                reader: {
                    type: 'json',
                    rootProperty: 'data',
                    totalProperty: "total"
                }
            }
        },

        setListadoAsistencia: {
            storeId: 'getListadoAsistencia',
            fields: [
            { name: "idListaAsistenciaGeneral", type: "int" },
            { name: "idFuanAfiliado", type: "int" },
            { name: "nombreCompletoAfiliado", type: "string" },
            { name: "codigoTipoIdentificacion", type: "string" },
            { name: "identificacionFuanAfiliado", type: "string" }
            ],
            data: [
            { 
                'idListaAsistenciaGeneral':'1',
                'idFuanAfiliado': '0',
                'nombreCompletoAfiliado':'',
                'codigoTipoIdentificacion':'',
                'identificacionFuanAfiliado':'0'
            }
            ]
        },

        getAsistenciaGeneral: {
            autoLoad: false,
            fields: [
            "idAsistenciaGeneral", { name: "fechaAsistenciaGeneral", convert: Coomuce.Util.parseDate },
            "idDepartamento", "compDepartamento", "idCiudad", "compCiudad",
            "idGruposFocales", "idEje", "idUnidad", "idModulo", "temaAsistenciaGeneral", "formadorAsistenciaGeneral", "listaAsistencia"
            ],
            proxy: {
                timeout: 600000,
                useDefaultXhrHeader: false,
                type: 'ajax',
                url: "resources/data/AsistenciaGeneral.json", // Coomuce.Url.Funciones + "GetAsistenciaGeneralAll",
                reader: {
                    type: 'json',
                    rootProperty: 'data',
                    totalProperty: "total"
                }
            }
        }
    }

});