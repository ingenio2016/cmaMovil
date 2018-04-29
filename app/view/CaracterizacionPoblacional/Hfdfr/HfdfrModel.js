Ext.define('CoomuceMovil.view.CaracterizacionPoblacional.HfdfrModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.caracterizacionpoblacional-hfdfr',

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

        getProcedencia: {
            autoLoad: true,
            fields: [
                { name: "idProcedencia", type: "int" },
                { name: 'codigoProcedencia', type: 'string' },
                { name: 'nombreProcedencia', type: 'string' },
                {
                    name: "compProcedencia", convert: function (v, record) {
                        return "(" + record.get("codigoProcedencia") + ") " + record.get("nombreProcedencia");
                    }
                }
            ],
            proxy: {
                timeout: 600000,
                useDefaultXhrHeader: false,
                type: 'ajax',
                url: "resources/data/Procedencia.json", // Coomuce.Url.Parametros + "GetProcedenciaAll",
                reader: {
                    type: 'json',
                    rootProperty: 'data',
                    totalProperty: "total"
                }
            }
        },

        getNivelEducativo: {
            autoLoad: true,
            fields: [
                { name: "idNivelEducativo", type: "int" },
                { name: "compNivelEducativo", type: "string" },
                { name: "padreNivelEducativo", type: "bool" },
                { name: "madreNivelEducativo", type: "bool" }
            ],
            listeners: {
                load: function (store, records, successful, operation, eOpts) {
                    Ext.each(records, function (item, index, allItems) {
                        item.data.padreNivelEducativo = false;
                        item.data.madreNivelEducativo = false;
                        item.commit();
                    });
                }
            },
            proxy: {
                timeout: 600000,
                useDefaultXhrHeader: false,
                type: 'ajax',
                url: "resources/data/NivelEducativo.json", // Coomuce.Url.Funciones + "GetNivelEducativoAll",
                reader: {
                    type: 'json',
                    rootProperty: 'data',
                    totalProperty: "total"
                }
            }
        },

        getCondicionVivienda: {
            autoLoad: true,
            fields: [
                { name: "idCondicionVivienda", type: "int" },
                { name: 'nombreCondicionVivienda', type: 'string' }
            ],
            proxy: {
                timeout: 600000,
                useDefaultXhrHeader: false,
                type: 'ajax',
                url: "resources/data/CondicionVivienda.json", // Coomuce.Url.Parametros + "GetCondicionViviendaAll",
                reader: {
                    type: 'json',
                    rootProperty: 'data',
                    totalProperty: "total"
                }
            }
        },

        getTenencia: {
            autoLoad: true,
            fields: [
                { name: "idTenencia", type: "int" },
                { name: 'codigoTenencia', type: 'string' },
                { name: 'nombreTenencia', type: 'string' },
                {
                    name: "compTenencia", convert: function (v, record) {
                        return "(" + record.get("codigoTenencia") + ") " + record.get("nombreTenencia");
                    }
                }
            ],
            proxy: {
                timeout: 600000,
                useDefaultXhrHeader: false,
                type: 'ajax',
                url: "resources/data/Tenencia.json", // Coomuce.Url.Parametros + "GetTenenciaAll",
                reader: {
                    type: 'json',
                    rootProperty: 'data',
                    totalProperty: "total"
                }
            }
        },

        getTipoCombustible: {
            autoLoad: true,
            fields: [
                { name: "idTipoCombustible", type: "int" },
                { name: 'codigoTipoCombustible', type: 'string' },
                { name: 'nombreTipoCombustible', type: 'string' },
                {
                    name: "compTipoCombustible", convert: function (v, record) {
                        return "(" + record.get("codigoTipoCombustible") + ") " + record.get("nombreTipoCombustible");
                    }
                }
            ],
            proxy: {
                timeout: 600000,
                useDefaultXhrHeader: false,
                type: 'ajax',
                url: "resources/data/TipoCombustible.json", // Coomuce.Url.Parametros + "GetTipoCombustibleAll",
                reader: {
                    type: 'json',
                    rootProperty: 'data',
                    totalProperty: "total"
                }
            }
        },

        getTipoVivienda: {
            autoLoad: true,
            fields: [
                { name: "idTipoVivienda", type: "int" },
                { name: 'codigoTipoVivienda', type: 'string' },
                { name: 'nombreTipoVivienda', type: 'string' },
                {
                    name: "compTipoVivienda", convert: function (v, record) {
                        return "(" + record.get("codigoTipoVivienda") + ") " + record.get("nombreTipoVivienda");
                    }
                }
            ],
            proxy: {
                timeout: 600000,
                useDefaultXhrHeader: false,
                type: 'ajax',
                url: "resources/data/TipoVivienda.json", // Coomuce.Url.Parametros + "GetTipoViviendaAll",
                reader: {
                    type: 'json',
                    rootProperty: 'data',
                    totalProperty: "total"
                }
            }
        },

        getTratamientoAgua: {
            autoLoad: true,
            fields: [
                { name: "idTratamientoAgua", type: "int" },
                { name: 'codigoTratamientoAgua', type: 'string' },
                { name: 'nombreTratamientoAgua', type: 'string' },
                {
                    name: "compTratamientoAgua", convert: function (v, record) {
                        return "(" + record.get("codigoTratamientoAgua") + ") " + record.get("nombreTratamientoAgua");
                    }
                }
            ],
            proxy: {
                timeout: 600000,
                useDefaultXhrHeader: false,
                type: 'ajax',
                url: "resources/data/TratamientoAgua.json", // Coomuce.Url.Parametros + "GetTratamientoAguaAll",
                reader: {
                    type: 'json',
                    rootProperty: 'data',
                    totalProperty: "total"
                }
            }
        },

        getDisposicionExcreta: {
            autoLoad: true,
            fields: [
                { name: "idDisposicionExcreta", type: "int" },
                { name: 'codigoDisposicionExcreta', type: 'string' },
                { name: 'nombreDisposicionExcreta', type: 'string' },
                {
                    name: "compDisposicionExcreta", convert: function (v, record) {
                        return "(" + record.get("codigoDisposicionExcreta") + ") " + record.get("nombreDisposicionExcreta");
                    }
                }
            ],
            proxy: {
                timeout: 600000,
                useDefaultXhrHeader: false,
                type: 'ajax',
                url: "resources/data/DisposicionExcreta.json", // Coomuce.Url.Parametros + "GetDisposicionExcretaAll",
                reader: {
                    type: 'json',
                    rootProperty: 'data',
                    totalProperty: "total"
                }
            }
        },

        getDisposicionBasura: {
            autoLoad: true,
            fields: [
                { name: "idDisposicionBasura", type: "int" },
                { name: 'codigoDisposicionBasura', type: 'string' },
                { name: 'nombreDisposicionBasura', type: 'string' },
                {
                    name: "compDisposicionBasura", convert: function (v, record) {
                        return "(" + record.get("codigoDisposicionBasura") + ") " + record.get("nombreDisposicionBasura");
                    }
                }
            ],
            proxy: {
                timeout: 600000,
                useDefaultXhrHeader: false,
                type: 'ajax',
                url: "resources/data/DisposicionBasura.json", // Coomuce.Url.Parametros + "GetDisposicionBasuraAll",
                reader: {
                    type: 'json',
                    rootProperty: 'data',
                    totalProperty: "total"
                }
            }
        },

        getTipoAnimal: {
            autoLoad: true,
            fields: [
                { name: "idTipoAnimal", type: "int" },
                { name: "compTipoAnimal", type: "string" },
                { name: "activarTipoAnimal", type: "bool" },
                { name: "numeroTipoAnimal", type: "int" }
            ],
            listeners: {
                load: function (store, records, successful, operation, eOpts) {
                    Ext.each(records, function (item, index, allItems) {
                        item.data.activarTipoAnimal = false;
                        item.commit();
                    });
                }
            },
            proxy: {
                timeout: 600000,
                useDefaultXhrHeader: false,
                type: 'ajax',
                url: "resources/data/TipoAnimal.json", // Coomuce.Url.Funciones + "GetTipoAnimalAll",
                reader: {
                    type: 'json',
                    rootProperty: 'data',
                    totalProperty: "total"
                }
            }
        },

        getOpciones: {
            fields: [
                "id", "nombre"
            ],
            data: [
                ["SI", "A - SI"],
                ["NO", "B - NO"],
                ["AVECES", "C - A VECES"]
            ]
        },

        setPregunta28: {
            storeId: 'pregunta28',
            fields: [
                { name: 'numCarnet', type: 'string' },
                { name: 'nombre', type: 'string' },
                { name: 'edad', type: 'int' },
                { name: 'codDiscapacidad', type: 'string' }
            ],
            data: [
            { 'numCarnet': '0', 'nombre': '', 'edad': '0', 'codDiscapacidad': '' }
            ]
        },

        setPregunta31: {
            storeId: 'pregunta31',
            fields: [
                { name: 'numCarnet', type: 'string' },
                { name: 'nombre', type: 'string' }
            ],
             data: [
            { 'numCarnet': '0', 'nombre': '' }
            ]
        },

        setPregunta32: {
            storeId: 'pregunta32',
            fields: [
                { name: 'numCarnet', type: 'string' },
                { name: 'nombre', type: 'string' }
            ],
             data: [
            { 'numCarnet': '0', 'nombre': '' }
            ]
        },

        setPregunta33: {
            storeId: 'pregunta33',
            fields: [
                { name: 'numCarnet', type: 'string' },
                { name: 'nombre', type: 'string' }
            ],
             data: [
            { 'numCarnet': '0', 'nombre': '' }
            ]
        }

    }
});
