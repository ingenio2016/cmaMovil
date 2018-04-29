Ext.define("CoomuceMovil.view.DemandaInducida.PurisuModel", {
    extend: "Ext.app.ViewModel",
    alias: "viewmodel.demandainducida-purisu",

    stores: {
        getEjePurisu: {
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

        getUnidadPurisu: {
            storeId: 'getUnidadStorePurisu',
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

        getUnityPurisu: {
            storeId: 'getUnityStorePurisu',
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

        getModuloPurisu: {
            storeId: 'getModuloStorePurisu',
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

        getModulePurisu: {
            storeId: 'getModuleStorePurisu',
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
        getEjePurisu1: {
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

        getUnidadPurisu1: {
            storeId: 'getUnidadStorePurisu1',
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

        getUnityPurisu1: {
            storeId: 'getUnityStorePurisu1',
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

        getModuloPurisu1: {
            storeId: 'getModuloStorePurisu1',
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

        getModulePurisu1: {
            storeId: 'getModuleStorePurisu1',
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

        getTipoVisitaDomiciliaria: {
            autoLoad: true,
            fields: [
                { name: "idTipoVisitaDomiciliaria", type: "int" },
                { name: 'codigoTipoVisitaDomiciliaria', type: 'string' },
                { name: 'nombreTipoVisitaDomiciliaria', type: 'string' },
                {
                    name: "compTipoVisitaDomiciliaria", convert: function (v, record) {
                        return "(" + record.get("codigoTipoVisitaDomiciliaria") + ") " + record.get("nombreTipoVisitaDomiciliaria");
                    }
                }
            ],
            proxy: {
                timeout: 600000,
                useDefaultXhrHeader: false,
                type: 'ajax',
                url: "resources/data/TipoVisitaDomiciliaria.json", // Coomuce.Url.Parametros + "GetTipoVisitaDomiciliariaAll",
                reader: {
                    type: 'json',
                    rootProperty: 'data',
                    totalProperty: "total"
                }
            }
        },

        getProgramaResolucion412: {
            autoLoad: true,
            fields: [
                { name: "idProgramaResolucion412", type: "int" },
                { name: 'codigoProgramaResolucion412', type: 'string' },
                { name: 'descripcionProgramaResolucion412', type: 'string' },
                {
                    name: "compProgramaResolucion412", convert: function (v, record) {
                        return "(" + record.get("codigoProgramaResolucion412") + ") " + record.get("descripcionProgramaResolucion412");
                    }
                }
            ],
            proxy: {
                timeout: 600000,
                useDefaultXhrHeader: false,
                type: 'ajax',
                url: "resources/data/ProgramaResolucion412.json", // Coomuce.Url.Parametros + "GetProgramaResolucion412All",
                reader: {
                    type: 'json',
                    rootProperty: 'data',
                    totalProperty: "total"
                }
            }
        },

        getGrupoInteres: {
            autoLoad: true,
            fields: [
                { name: "idGrupoInteres", type: "int" },
                { name: 'codigoGrupoInteres', type: 'string' },
                { name: 'descripcionGrupoInteres', type: 'string' },
                {
                    name: "compGrupoInteres", convert: function (v, record) {
                        return "(" + record.get("codigoGrupoInteres") + ") " + record.get("descripcionGrupoInteres");
                    }
                }
            ],
            proxy: {
                timeout: 600000,
                useDefaultXhrHeader: false,
                type: 'ajax',
                url: "resources/data/GrupoInteres.json", // Coomuce.Url.Parametros + "GetGrupoInteresAll",
                reader: {
                    type: 'json',
                    rootProperty: 'data',
                    totalProperty: "total"
                }
            }
        },

        getSeguimientoProgramasIntervencionRiesgo: {
            autoLoad: true,
            fields: [
                { name: "idSeguimientoProgramasIntervencionRiesgo", type: "int" },
                { name: 'codigoSeguimientoProgramasIntervencionRiesgo', type: 'string' },
                { name: 'nombreSeguimientoProgramasIntervencionRiesgo', type: 'string' },
                {
                    name: "compSeguimientoProgramasIntervencionRiesgo", convert: function (v, record) {
                        return "(" + record.get("codigoSeguimientoProgramasIntervencionRiesgo") + ") " + record.get("nombreSeguimientoProgramasIntervencionRiesgo");
                    }
                }
            ],
            proxy: {
                timeout: 600000,
                useDefaultXhrHeader: false,
                type: 'ajax',
                url: "resources/data/SeguimientoProgramasIntervencionRiesgo.json", // Coomuce.Url.Parametros + "GetSeguimientoProgramasIntervencionRiesgoAll",
                reader: {
                    type: 'json',
                    rootProperty: 'data',
                    totalProperty: "total"
                }
            }
        },

        getMotivoConsulta: {
            storeId: 'motivoConsultaStore',
            autoLoad: true,
            fields: [
                { name: "idMotivoConsulta", type: "int" },
                { name: 'codigoMotivoConsulta', type: 'string' },
                { name: 'descripcionMotivoConsulta', type: 'string' },
                {
                    name: "compMotivoConsulta", convert: function (v, record) {
                        return "(" + record.get("codigoMotivoConsulta") + ") " + record.get("descripcionMotivoConsulta");
                    }
                },
                {
                    name: "seleccionado", type: "bool"
                }
            ],
            listeners: {
                load: function (store, records, successful, operation, eOpts) {
                    Ext.each(records, function (item, index, allItems) {
                        item.data.seleccionado = false;
                        item.commit();
                    });
                }
            },
            proxy: {
                timeout: 600000,
                useDefaultXhrHeader: false,
                type: 'ajax',
                url: "resources/data/MotivoConsulta.json", // Coomuce.Url.Parametros + "GetMotivoConsultaAll",
                reader: {
                    type: 'json',
                    rootProperty: 'data',
                    totalProperty: "total"
                }
            }
        },

        getMotivoContacto: {
            storeId: 'motivoContactoStore',
            autoLoad: true,
            fields: [
                { name: "idMotivoContacto", type: "int" },
                { name: 'codigoMotivoContacto', type: 'string' },
                { name: 'descripcionMotivoContacto', type: 'string' },
                {
                    name: "compMotivoContacto", convert: function (v, record) {
                        return "(" + record.get("codigoMotivoContacto") + ") " + record.get("descripcionMotivoContacto");
                    }
                },
                {
                    name: "seleccionado", type: "bool"
                }
            ],
            listeners: {
                load: function (store, records, successful, operation, eOpts) {
                    Ext.each(records, function (item, index, allItems) {
                        item.data.seleccionado = false;
                        item.commit();
                    });
                }
            },
            proxy: {
                timeout: 600000,
                useDefaultXhrHeader: false,
                type: 'ajax',
                url: "resources/data/MotivoContacto.json", // Coomuce.Url.Parametros + "GetMotivoContactoAll",
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

        getPiezasInformativas: {
            storeId: 'motivoPiezasStore',
            autoLoad: true,
            fields: [
                { name: "idPiezasInformativas", type: "int" },
                { name: 'codigoPiezasInformativas', type: 'string' },
                { name: 'descripcionPiezasInformativas', type: 'string' },
                {
                    name: "compPiezasInformativas", convert: function (v, record) {
                        return "(" + record.get("codigoPiezasInformativas") + ") " + record.get("descripcionPiezasInformativas");
                    }
                },
                {
                    name: "seleccionado", type: "bool"
                }
            ],
            listeners: {
                load: function (store, records, successful, operation, eOpts) {
                    Ext.each(records, function (item, index, allItems) {
                        item.data.seleccionado = false;
                        item.commit();
                    });
                }
            },
            proxy: {
                timeout: 600000,
                useDefaultXhrHeader: false,
                type: 'ajax',
                url: "resources/data/PiezasInformativas.json", // Coomuce.Url.Parametros + "GetPiezasInformativasAll",
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
            autoLoad: false,
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
            autoLoad: false,
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

        setItemsPurisu: {
            storeId: 'itemsPurisuStore',
            fields: [
            "idInfoPurisu", "idPurisu", "idFuanAfiliado", "codigoTipoIdentificacion",
                "identificacionFuanAfiliado", "idTipoVisitaDomiciliaria", "compTipoVisitaDomiciliaria", "usisPurisu", "ipsPrimariaPurisu",
                "telefonicaPurisu", "cauPurisu", "actividadExtramuralPurisu", "edadFuanAfiliado", "nombreTipoSexo",
                "idProgramaResolucion412", "compProgramaResolucion412", "idGrupoInteres", "compGrupoInteres", "idSeguimientoProgramasIntervencionRiesgo",
                "compSeguimientoProgramasIntervencionRiesgo", "idMotivoConsulta", "compMotivoConsulta", "idMotivoContacto", "compMotivoContacto",
                "numAutorizacionPurisu", "idGruposFocales", "compGruposFocales", "idEje", "compEje", "idUnidad", "compUnidad", "idModulo", "compModulo",
                "idEje1", "compEje1", "idUnidad1", "compUnidad1", "idModulo1", "compModulo1", "idPiezasInformativas", "compPiezasInformativas", "firmaPurisu"
            ],
            data: [
            {
            "actividadExtramuralPurisu": false,
            "cauPurisu": false,
            "codigoTipoIdentificacion": "",
            "idEje": "",
            "idEje1": "",
            "compGrupoInteres": "",
            "compGruposFocales": "",
            "compModulo": "",
            "compUnidad1": "",
            "compMotivoConsulta": "",
            "compMotivoContacto": "",
            "compPiezasInformativas": "",
            "compProgramaResolucion412": "",
            "compSeguimientoProgramasIntervencionRiesgo": "",
            "compTipoVisitaDomiciliaria": "",
            "compUnidad": "",
            "compUnidad1": "",
            "edadFuanAfiliado": 0,
            "firmaPurisu": "",
            "idFuanAfiliado": 0,
            "idGrupoInteres": "",
            "idGruposFocales": "",
            "idInfoPurisu": 0,
            "idModulo": "",
            "idModulo1": "",
            "idMotivoConsulta": "",
            "idMotivoContacto": "",
            "idPiezasInformativas": "",
            "idProgramaResolucion412": "",            
            "idPurisu": 0,
            "idSeguimientoProgramasIntervencionRiesgo": "",
            "idTipoVisitaDomiciliaria": "",
            "idUnidad": "",
            "idUnidad1": "",
            "identificacionFuanAfiliado": "",
            "ipsPrimariaPurisu": false,
            "nombreTipoSexo": "",
            "numAutorizacionPurisu": 0,
            "numCarnetFuanAfiliado": "0",
            "telefonicaPurisu": false,
            "usisPurisu": false
            }
            ]
        }
    }

});