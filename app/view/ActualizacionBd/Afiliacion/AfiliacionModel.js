Ext.define("CoomuceMovil.view.ActualizacionBd.AfiliacionModel", {
    extend: "Ext.app.ViewModel",
    alias: "viewmodel.actualizacionbd-afiliacion",

    stores: {
        getTipoTramite: {
            autoLoad: true,
            fields: [
                { name: "idTipoTramite", type: "int" },
                { name: 'codigoTipoTramite', type: 'string' },
                { name: 'nombreTipoTramite', type: 'string' },
                {
                    name: "compTipoTramite", convert: function (v, record) {
                        return "(" + record.get("codigoTipoTramite") + ") " + record.get("nombreTipoTramite");
                    }
                }
            ],
            proxy: {
                timeout: 600000,
                useDefaultXhrHeader: false,
                type: 'ajax',
                url: "resources/data/TipoTramite.json", // Coomuce.Url.Parametros + "GetTipoTramiteAll",
                reader: {
                    type: 'json',
                    rootProperty: 'data',
                    totalProperty: "total"
                }
            }
        },

        getTipoAfiliacion: {
            autoLoad: true,
            fields: [
                { name: "idTipoAfiliacion", type: "int" },
                { name: 'codigoTipoAfiliacion', type: 'string' },
                { name: 'nombreTipoAfiliacion', type: 'string' },
                {
                    name: "compTipoAfiliacion", convert: function (v, record) {
                        return "(" + record.get("codigoTipoAfiliacion") + ") " + record.get("nombreTipoAfiliacion");
                    }
                }
            ],
            proxy: {
                timeout: 600000,
                useDefaultXhrHeader: false,
                type: 'ajax',
                url: "resources/data/TipoAfiliacion.json", // Coomuce.Url.Parametros + "GetTipoAfiliacionAll",
                reader: {
                    type: 'json',
                    rootProperty: 'data',
                    totalProperty: "total"
                }
            }
        },

        getTipoRegimen: {
            autoLoad: true,
            fields: [
                { name: "idTipoRegimen", type: "int" },
                { name: 'codigoTipoRegimen', type: 'string' },
                { name: 'nombreTipoRegimen', type: 'string' },
                {
                    name: "compTipoRegimen", convert: function (v, record) {
                        return "(" + record.get("codigoTipoRegimen") + ") " + record.get("nombreTipoRegimen");
                    }
                }
            ],
            proxy: {
                timeout: 600000,
                useDefaultXhrHeader: false,
                type: 'ajax',
                url: "resources/data/TipoRegimen.json", // Coomuce.Url.Parametros + "GetTipoRegimenAll",
                reader: {
                    type: 'json',
                    rootProperty: 'data',
                    totalProperty: "total"
                }
            }
        },

        getTipoAfiliado: {
            autoLoad: true,
            fields: [
                { name: "idTipoAfiliado", type: "int" },
                { name: 'codigoTipoAfiliado', type: 'string' },
                { name: 'nombreTipoAfiliado', type: 'string' },
                {
                    name: "compTipoAfiliado", convert: function (v, record) {
                        return "(" + record.get("codigoTipoAfiliado") + ") " + record.get("nombreTipoAfiliado");
                    }
                }
            ],
            proxy: {
                timeout: 600000,
                useDefaultXhrHeader: false,
                type: 'ajax',
                url: "resources/data/TipoAfiliado.json", // Coomuce.Url.Parametros + "GetTipoAfiliadoAll",
                reader: {
                    type: 'json',
                    rootProperty: 'data',
                    totalProperty: "total"
                }
            }
        },

        getTipoCotizante: {
            autoLoad: true,
            fields: [
                { name: "idTipoCotizante", type: "int" },
                { name: 'codigoTipoCotizante', type: 'string' },
                { name: 'nombreTipoCotizante', type: 'string' },
                {
                    name: "compTipoCotizante", convert: function (v, record) {
                        return "(" + record.get("codigoTipoCotizante") + ") " + record.get("nombreTipoCotizante");
                    }
                }
            ],
            proxy: {
                timeout: 600000,
                useDefaultXhrHeader: false,
                type: 'ajax',
                url: "resources/data/TipoCotizante.json", // Coomuce.Url.Parametros + "GetTipoCotizanteAll",
                reader: {
                    type: 'json',
                    rootProperty: 'data',
                    totalProperty: "total"
                }
            }
        },

        getTipoIdentificacion: {
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

        getTipoEtnia: {
            autoLoad: true,
            fields: [
                { name: "idTipoEtnia", type: "int" },
                { name: 'codigoTipoEtnia', type: 'string' },
                { name: 'nombreTipoEtnia', type: 'string' },
                {
                    name: "compTipoEtnia", convert: function (v, record) {
                        return "(" + record.get("codigoTipoEtnia") + ") " + record.get("nombreTipoEtnia");
                    }
                }
            ],
            proxy: {
                timeout: 600000,
                useDefaultXhrHeader: false,
                type: 'ajax',
                url: "resources/data/TipoEtnia.json", // Coomuce.Url.Parametros + "GetTipoEtniaAll",
                reader: {
                    type: 'json',
                    rootProperty: 'data',
                    totalProperty: "total"
                }
            }
        },

        getTipoDiscapacidad: {
            autoLoad: true,
            fields: [
                { name: "idTipoDiscapacidad", type: "int" },
                { name: 'codigoTipoDiscapacidad', type: 'string' },
                { name: 'nombreTipoDiscapacidad', type: 'string' },
                {
                    name: "compTipoDiscapacidad", convert: function (v, record) {
                        return "(" + record.get("codigoTipoDiscapacidad") + ") " + record.get("nombreTipoDiscapacidad");
                    }
                }
            ],
            proxy: {
                timeout: 600000,
                useDefaultXhrHeader: false,
                type: 'ajax',
                url: "resources/data/TipoDiscapacidad.json", // Coomuce.Url.Parametros + "GetTipoDiscapacidadAll",
                reader: {
                    type: 'json',
                    rootProperty: 'data',
                    totalProperty: "total"
                }
            }
        },

        getCondicionDiscapacidad: {
            autoLoad: true,
            fields: [
                { name: "idCondicionDiscapacidad", type: "int" },
                { name: 'codigoCondicionDiscapacidad', type: 'string' },
                { name: 'nombreCondicionDiscapacidad', type: 'string' },
                {
                    name: "compCondicionDiscapacidad", convert: function (v, record) {
                        return "(" + record.get("codigoCondicionDiscapacidad") + ") " + record.get("nombreCondicionDiscapacidad");
                    }
                }
            ],
            proxy: {
                timeout: 600000,
                useDefaultXhrHeader: false,
                type: 'ajax',
                url: "resources/data/CondicionDiscapacidad.json", // Coomuce.Url.Parametros + "GetCondicionDiscapacidadAll",
                reader: {
                    type: 'json',
                    rootProperty: 'data',
                    totalProperty: "total"
                }
            }
        },

        getListadoAfp: {
            autoLoad: true,
            fields: [
                { name: "Id", type: "int" },
                { name: 'codigo', type: 'string' },
                { name: 'nit', type: 'string' },
                { name: 'nombre', type: 'string' },
                {
                    name: "compNombreAfp", convert: function (v, record) {
                        return "(" + record.get("codigo") + ") " + record.get("nombre");
                    }
                }
            ],
            proxy: {
                timeout: 600000,
                useDefaultXhrHeader: false,
                type: 'ajax',
                url: "resources/data/ListadoAfp.json", // Coomuce.Url.Parametros + "GetCondicionDiscapacidadAll",
                reader: {
                    type: 'json',
                    rootProperty: 'data',
                    totalProperty: "total"
                }
            }
        },

        getListadoArl: {
            autoLoad: true,
            fields: [
                { name: "Id", type: "int" },
                { name: 'codigo', type: 'string' },
                { name: 'nit', type: 'string' },
                { name: 'nombre', type: 'string' },
                {
                    name: "compNombreArl", convert: function (v, record) {
                        return "(" + record.get("codigo") + ") " + record.get("nombre");
                    }
                }
            ],
            proxy: {
                timeout: 600000,
                useDefaultXhrHeader: false,
                type: 'ajax',
                url: "resources/data/ListadoArl.json", // Coomuce.Url.Parametros + "GetCondicionDiscapacidadAll",
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

        getCiudadBeneficiario: {
            storeId: 'getCiudadStoreBeneficiarioStore',
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

        getGrupoPoblacional: {
            autoLoad: true,
            fields: [
                { name: "idGrupoPoblacional", type: "int" },
                { name: 'codigoGrupoPoblacional', type: 'string' },
                { name: 'nombreGrupoPoblacional', type: 'string' },
                {
                    name: "compGrupoPoblacional", convert: function (v, record) {
                        return "(" + record.get("codigoGrupoPoblacional") + ") " + record.get("nombreGrupoPoblacional");
                    }
                }
            ],
            proxy: {
                timeout: 600000,
                useDefaultXhrHeader: false,
                type: 'ajax',
                url: "resources/data/GrupoPoblacional.json", // Coomuce.Url.Parametros + "GetGrupoPoblacionalAll",
                reader: {
                    type: 'json',
                    rootProperty: 'data',
                    totalProperty: "total"
                }
            }
        },

        /*getCiudad: {
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
                url: "resources/data/Ciudad.json", //Coomuce.Url.Administracion + "GetCiudadAll",
                reader: {
                    type: 'json',
                    rootProperty: 'data',
                    totalProperty: "total"
                }
            }
        },*/

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

        getTipoZona: {
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

        getTipoParentesco: {
            autoLoad: true,
            fields: [
                { name: "idTipoParentesco", type: "int" },
                { name: 'codigoTipoParentesco', type: 'string' },
                { name: 'nombreTipoParentesco', type: 'string' },
                { name: "descripcionTipoParentesco", type: "string" },
                {
                    name: "compTipoParentesco", convert: function (v, record) {
                        return "(" + record.get("codigoTipoParentesco") + ") " + record.get("nombreTipoParentesco");
                    }
                }
            ],
            proxy: {
                timeout: 600000,
                useDefaultXhrHeader: false,
                type: 'ajax',
                url: "resources/data/TipoParentesco.json", // Coomuce.Url.Parametros + "GetTipoParentescoAll",
                reader: {
                    type: 'json',
                    rootProperty: 'data',
                    totalProperty: "total"
                }
            }
        },

        getTipoNovedad: {
            autoLoad: true,
            fields: [
                "idFuan", "idTipoNovedad", "compTipoNovedad", "tipoValorCampoTipoNovedad", "valorCampoTipoNovedad",
                "selFuanTipoNovedad", "valorFuanTipoNovedad"
            ],
            proxy: {
                timeout: 600000,
                useDefaultXhrHeader: false,
                type: 'ajax',
                url: "resources/data/TipoNovedad.json", // Coomuce.Url.Funciones + "GetTipoNovedadAll",
                reader: {
                    type: 'json',
                    rootProperty: 'data',
                    totalProperty: "total"
                }
            }
        },

        getMotivoTraslado: {
            autoLoad: true,
            fields: [
                { name: "idMotivoTraslado", type: "int" },
                { name: 'codigoMotivoTraslado', type: 'string' },
                { name: 'descripcionMotivoTraslado', type: 'string' },
                {
                    name: "compMotivoTraslado", convert: function (v, record) {
                        return "(" + record.get("codigoMotivoTraslado") + ") " + record.get("descripcionMotivoTraslado");
                    }
                }
            ],
            proxy: {
                timeout: 600000,
                useDefaultXhrHeader: false,
                type: 'ajax',
                url: "resources/data/MotivoTraslado.json", // Coomuce.Url.Parametros + "GetMotivoTrasladoAll",
                reader: {
                    type: 'json',
                    rootProperty: 'data',
                    totalProperty: "total"
                }
            }
        },

        getDeclaracionAutorizacion: {
            autoLoad: true,
            fields: [
                "idFuan", "idDeclaracionAutorizacion", "compDeclaracionAutorizacion", "valorFuanDeclaracionAutorizacion"
            ],
            proxy: {
                timeout: 600000,
                useDefaultXhrHeader: false,
                type: 'ajax',
                url: "resources/data/DeclaracionAutorizacion.json", // Coomuce.Url.Funciones + "GetDeclaracionAutorizacionAll",
                reader: {
                    type: 'json',
                    rootProperty: 'data',
                    totalProperty: "total"
                }
            }
        },

        setFuanBeneficiario: {
            storeId: 'fuanBeneficiarioStore',
            fields: [
            { name: 'primerApellidoFuanAfiliado', type: 'string' },
            { name: 'segundoApellidoFuanAfiliado', type: 'string' },
            { name: 'primerNombreFuanAfiliado', type: 'string' },
            { name: 'segundoNombreFuanAfiliado', type: 'string' },
            { name: 'idTipoIdentificacion', type: 'int' },
            { name: 'compTipoIdentificacion', type: 'string' },
            { name: 'identificacionFuanAfiliado', type: 'string' },
            { name: 'idTipoSexo', type: 'int' },
            { name: 'compTipoSexo', type: 'string' },
            { name: 'fechaNacimientoFuanAfiliado', type: 'string' },
            { name: 'numCarnetFuanAfiliado', type: 'string' },
            { name: 'idTipoParentesco', type: 'int' },
            { name: 'compTipoParentesco', type: 'string' },
            { name: 'idTipoEtnia', type: 'int' },
            { name: 'compTipoEtnia', type: 'string' },
            { name: 'idTipoDiscapacidad', type: 'int' },
            { name: 'compTipoDiscapacidad', type: 'string' },
            { name: 'idCondicionDiscapacidad', type: 'int' },
            { name: 'compCondicionDiscapacidad', type: 'string' },     
            { name: 'idDepartamento', type: 'int' },
            { name: 'compDepartamento', type: 'string' },
            { name: 'idCiudad', type: 'int' },
            { name: 'compCiudad', type: 'string' },
            { name: 'idTipoZona', type: 'int' },
            { name: 'compTipoZona', type: 'string' },
            { name: 'telefonoFuanAfiliado', type: 'string' },
            { name: 'upcFuanAfiliado', type: 'string' },
            { name: 'firmaFuanAfiliado', type: 'string' }
            ],
            data: [
                {
                    "primerApellidoFuanAfiliado": "",
                    "segundoApellidoFuanAfiliado": "",
                    "primerNombreFuanAfiliado": "",
                    "segundoNombreFuanAfiliado": "",
                    "idTipoIdentificacion": 0,
                    "compTipoIdentificacion": "",
                    "identificacionFuanAfiliado": "0",
                    "idTipoSexo": 0,
                    "compTipoSexo": "",
                    "fechaNacimientoFuanAfiliado": null,
                    "numCarnetFuanAfiliado": "",
                    "idTipoParentesco": 0,
                    "compTipoParentesco": "",
                    "idTipoEtnia": 0,
                    "compTipoEtnia": "",
                    "idTipoDiscapacidad": 0,
                    "compTipoDiscapacidad": "",
                    "idCondicionDiscapacidad": 0,
                    "compCondicionDiscapacidad": "",
                    "idDepartamento": 0,
                    "compDepartamento": "",
                    "idCiudad": 0,
                    "compCiudad": "",
                    "idTipoZona": 0,
                    "compTipoZona": "",
                    "telefonoFuanAfiliado": "",
                    "upcFuanAfiliado": "0",
                    "firmaFuanAfiliado": ""
                }
            ]
        },

        setFuanIpsPrimaria: {
            storeId: "fuanIpsPrimariaStore",
            fields: [
                { name: 'tipoFuanIpsPrimariaAfiliado', type: 'string' },
                { name: 'nombreFuanIpsPrimariaAfiliado', type: 'string' },
                { name: 'codigoFuanIpsPrimariaAfiliado', type: 'string' }                
            ],
            data: [
                {
                    "tipoFuanIpsPrimariaAfiliado": "C",
                    "nombreFuanIpsPrimariaAfiliado": "",
                    "codigoFuanIpsPrimariaAfiliado": ""
                }
            ]
        },

         getTipoIps: {
            storeId: "getTipoIpsStore",
            fields: [
                { name: 'nombre', type: 'string' }               
            ],
            data: [
                {
                    "nombre": "Seleccione"
                },
                {
                    "nombre": "C"
                },
                {
                    "nombre": "B"
                }
            ]
        },

        getIpsAfiliacionStore : {
            storeId: 'ipsAfiliacionStore',
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

    }

});