Ext.define('CoomuceMovil.view.CaracterizacionPoblacional.HfdfrController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.caracterizacionpoblacional-hfdfr',

    getTitleView: function () {
        return this.getView().getTitle();
    },

    onBotonCancelarClick: function () {
        var me = this;

        Ext.Msg.confirm(this.getTitleView(), "Desea cancelar las modificaciones?", function (btn) {
            if (btn === "yes") {
                var form = Ext.getCmp("Form-Hfdfr-Principal");
                form.getForm().reset();
            }
        });
    },

    onBotonDeleteLCClick: function (btn) {
        Ext.Msg.show({
            title: "Eliminar Datos",
            message: 'Desea eliminar los Datos?',
            width: 300,
            buttons: [
            {text: 'Si', itemId: 'yes', ui: 'action'},
            {text: 'No', itemId: 'no'}
            ],
            fn: function (buttonId) {
                if (buttonId === "yes") {
                    var i = 0;
                    var sKey;
                    for (; sKey = window.localStorage.key(i); i++) {
                        if(_.includes(sKey, "hfdfr")) {
                            window.localStorage.removeItem(sKey);
                        }            
                    }
                    Ext.Msg.alert('Información', "Los Datos se han eliminado", Ext.emptyFn);
                }
            }
        });
    },

    onBotonSincronizarClick: function (btn) {
        Ext.Msg.show({
            title: "Sincronizar Datos",
            message: 'Desea sincronizar los Datos?',
            width: 300,
            buttons: [
            {text: 'Si', itemId: 'yes', ui: 'action'},
            {text: 'No', itemId: 'no'}
            ],
            fn: function (buttonId) {
                if (buttonId === "yes") {
                    $('body').loading({
                        theme: 'dark',
                        message: 'Sincronizando Datos...'
                    });
                    me = this;
                    var form = Ext.getCmp("Form-Hfdfr-Principal");
                    var i = 0,
                    dataKeys = [],
                    sKey;
                    for (; sKey = window.localStorage.key(i); i++) {
                        if(_.includes(sKey, "hfdfr")) {
                            dataKeys.push(sKey);
                        }
                    }        
                    if(dataKeys.length == 0){
                        Ext.Msg.alert('Información', "Los Datos están sincronizados", Ext.emptyFn);
                        $('body').loading('stop');
                        return false;
                    }else{
                        var cont = 0;
                        var errorData = "";
                        async.eachSeries(dataKeys, function(item, callback) {
                            var data = JSON.parse(window.localStorage.getItem(item));
                            var conf = {
                                url: Coomuce.Url.Funciones + "HfdfrGuardar",
                                data: {
                                    info: data.info,
                                    historia: data.historia
                                },
                                targetMask: form,
                                msgMask: "Guardando datos...",
                                fnSuccess: function (response) {
                                    cont ++;
                                    window.localStorage.removeItem(item);
                                    if(cont == 20){
                                        callback("Limite Superado");
                                    }
                                    callback();
                                },
                                fnFailure: function (resp) {
                                    console.log(resp);
                                    if(resp == "Bad Request"){
                                        errorData += data.info.identificacionFuanAfiliado + " ";
                                        window.localStorage.removeItem(item);
                                        callback();
                                    }else{
                                        window.localStorage.removeItem(item);
                                        callback();
                                    }
                                }
                            };                    
                            Coomuce.Util.EnviarPost(conf);                            
                        }, function(err) {
                            if(err){
                                if(err == "Limite Superado"){
                                    $('body').loading('stop');
                                    Ext.Msg.show({
                                        title: "ATENCION",
                                        message: "Se han sincronizado correctamente " + cont + " elementos",
                                        width: 300,
                                        buttons: [
                                        {text: 'Aceptar', itemId: 'yes', ui: 'action'}
                                        ],
                                        fn: function (buttonId) {
                                            console.log(buttonId);
                                            if (buttonId === "yes") {
                                                if(errorData != ""){
                                                    Ext.Msg.alert('ATENCION', "Se encontraron inconsistencias en la historia de los afiliados con documento de idendificación " + errorData + " estas historias se han tenido que descartar", Ext.emptyFn);
                                                }
                                            }
                                        }
                                    });
                                }else{
                                    $('body').loading('stop');
                                    Ext.Msg.alert('ATENCION', "Ocurrió un error al sincronizar los Datos. Por favor verifique e intente nuevamente", Ext.emptyFn);
                                }
                            }else{
                                if(cont == 0) {
                                    $('body').loading('stop');
                                    Ext.Msg.show({
                                        title: "ATENCION",
                                        message: "No se logró sincronizar ningún dato. Por favor verifique e intente nuevamente",
                                        width: 300,
                                        buttons: [
                                        {text: 'Aceptar', itemId: 'yes', ui: 'action'}
                                        ],
                                        fn: function (buttonId) {
                                            if (buttonId === "yes") {
                                                console.log(errorData);
                                                if(errorData != ""){
                                                    Ext.Msg.alert('ATENCION', "Se encontraron inconsistencias en la historia de los afiliados con documento de idendificación " + errorData + " Estas historias se han tenido que descartar", Ext.emptyFn);
                                                }
                                            }
                                        }
                                    });
                                }else{
                                    $('body').loading('stop');
                                    Ext.Msg.show({
                                        title: "ATENCION",
                                        message: "Se han sincronizado correctamente " + cont + " elementos",
                                        width: 300,
                                        buttons: [
                                        {text: 'Aceptar', itemId: 'yes', ui: 'action'}
                                        ],
                                        fn: function (buttonId) {
                                            if (buttonId === "yes") {
                                                if(errorData != ""){
                                                    Ext.Msg.alert('ATENCION', "Se encontraron inconsistencias en las fichas de los afiliados " + errorData + " Estas fichas se han tenido que descartar", Ext.emptyFn);
                                                }
                                            }
                                        }
                                    });
                                }
                            }
                        });
                    }
                }
            }
        });       
    },

    onBotonGuardarClick: function () {
        var me = this;
        var titleView = me.getTitleView();

        Ext.Msg.confirm(titleView, "Desea guardar las modificaciones?", function (btn) {
            if (btn === "yes") {
                var date = new Date();

                var form = Ext.getCmp("Form-Hfdfr-Principal");
                var df = form.getForm().getValues();
                var info = {
                    idInfoHfdfr: 0,
                    tipoDiligenciamientoHfdfr: df["tipoDiligenciamientoHfdfr"],
                    fechaVisitaHfdfr: date.getFullYear() + "-" +
                    (date.getMonth() < 10 ? "0" + date.getMonth() : date.getMonth()) + "-" +
                    (date.getDate() < 10 ? "0" + date.getDate() : date.getDate()),
                    horaInicioHfdfr: "",
                    horaFinHfdfr: "",
                    idFuanAfiliado: parseInt(df["idFuanAfiliado"]),
                    idCiudad: df["idCiudad"],
                    veredaInfoHfdfr: df["veredaInfoHfdfr"],
                    barrioInfoHfdfr: df["barrioInfoHfdfr"],
                    telefonoInfoHfdfr: df["telefonoInfoHfdfr"],
                    firmaHfdfr: df["firmaHfdfr"],
                    idUsuario: Coomuce.Util.DatosUsuario.idUsuario
                };
                var historia = {
                    pregunta1: df["pregunta1"],
                    pregunta2: df["pregunta2"],
                    pregunta3: df["pregunta3"],
                    pregunta4: df["pregunta4"],
                    pregunta5: df["pregunta5"],
                    pregunta6: df["pregunta6"],
                    pregunta7: df["pregunta7"],
                    pregunta8: {
                        opcionMadre: (df["pregunta8opcionMadre"] == "on" ? true : false),
                        opcionPadre: (df["pregunta8opcionPadre"] == "on" ? true : false),
                        opcionHijos: (df["pregunta8opcionHijos"] == "on" ? true : false),
                        opcionOtros: (df["pregunta8opcionOtros"] == "on" ? true : false)
                    },
                    pregunta9: df["pregunta9"],
                    pregunta10: df["pregunta10"],
                    pregunta11: df["pregunta11"],
                    pregunta12: df["pregunta12"],
                    pregunta13: df["pregunta13"],
                    pregunta14: [], /// es listado
                    pregunta15: {
                        opcionA: df["pregunta15opcionA"],
                        opcionB: df["pregunta15opcionB"],
                        opcionC: df["pregunta15opcionC"],
                        opcionD: df["pregunta15opcionD"],
                        opcionE: df["pregunta15opcionE"],
                        opcionF: df["pregunta15opcionF"],
                        opcionG: df["pregunta15opcionG"]
                    }, 
                    pregunta16: df["pregunta16"],
                    pregunta17: df["pregunta17"],
                    pregunta18: df["pregunta18"],
                    pregunta19: df["pregunta19"],
                    pregunta20: {
                        opcionA: (df["pregunta20opcionA"] == "on" ? true : false),
                        opcionB: (df["pregunta20opcionB"] == "on" ? true : false),
                        opcionC: (df["pregunta20opcionC"] == "on" ? true : false),
                        opcionD: (df["pregunta20opcionD"] == "on" ? true : false),
                        opcionE: (df["pregunta20opcionE"] == "on" ? true : false),
                        opcionF: (df["pregunta20opcionF"] == "on" ? true : false)
                    }, 
                    pregunta21: df["pregunta21"],
                    pregunta22: df["pregunta22"],
                    pregunta23: df["pregunta23"],
                    pregunta24: {
                        opcionA: (df["pregunta24opcionA"] == "on" ? true : false),
                        opcionB: (df["pregunta24opcionB"] == "on" ? true : false),
                        opcionC: (df["pregunta24opcionC"] == "on" ? true : false),
                        opcionD: (df["pregunta24opcionD"] == "on" ? true : false),
                        opcionE: (df["pregunta24opcionE"] == "on" ? true : false),
                        opcionF1: (df["pregunta24opcionF1"] == "on" ? true : false),
                        opcionF2: (df["pregunta24opcionF2"] == "on" ? true : false),
                        opcionG: (df["pregunta24opcionG"] == "on" ? true : false),
                        opcionH: (df["pregunta24opcionH"] == "on" ? true : false),
                        opcionI: (df["pregunta24opcionI"] == "on" ? true : false),
                        opcionJ: (df["pregunta24opcionJ"] == "on" ? true : false),
                        opcionK: (df["pregunta24opcionK"] == "on" ? true : false),
                        opcionL: (df["pregunta24opcionL"] == "on" ? true : false),
                        opcionM: (df["pregunta24opcionM"] == "on" ? true : false),
                        opcionN: (df["pregunta24opcionN"] == "on" ? true : false),
                        opcionO: (df["pregunta24opcionO"] == "on" ? true : false)
                    },
                    pregunta25: df["pregunta25"],
                    pregunta26: [], // lista
                    pregunta27: {
                        opcionA: (df["pregunta27opcionA"] == "on" ? true : false),
                        opcionB: (df["pregunta27opcionB"] == "on" ? true : false),
                        opcionC: (df["pregunta27opcionC"] == "on" ? true : false),
                        opcionD: (df["pregunta27opcionD"] == "on" ? true : false),
                        opcionE: (df["pregunta27opcionE"] == "on" ? true : false),
                        opcionF: (df["pregunta27opcionF"] == "on" ? true : false)
                    },
                    pregunta28: [], // lista
                    pregunta29: df["pregunta29"],
                    pregunta30: {
                        personasF: df["pregunta30personasF"],
                        personasM: df["pregunta30personasM"],
                        personasNA: df["pregunta30personasNA"]
                    },
                    pregunta31: [], // lista
                    pregunta32: [], // lista
                    pregunta33: [], // lista
                    pregunta34: {
                        opcionA: (df["pregunta34opcionA"] == "on" ? true : false),
                        opcionB: (df["pregunta34opcionB"] == "on" ? true : false),
                        opcionC: (df["pregunta34opcionC"] == "on" ? true : false),
                        opcionD: (df["pregunta34opcionD"] == "on" ? true : false),
                        opcionE: (df["pregunta34opcionE"] == "on" ? true : false),
                        opcionF: (df["pregunta34opcionF"] == "on" ? true : false),
                        opcionG: (df["pregunta34opcionG"] == "on" ? true : false),
                        opcionH: (df["pregunta34opcionH"] == "on" ? true : false)
                    },
                    pregunta35: df["pregunta35"],
                    pregunta36: {
                        opcionA: (df["pregunta36opcionA"] == "on" ? true : false),
                        opcionB: (df["pregunta36opcionB"] == "on" ? true : false),
                        opcionC: (df["pregunta36opcionC"] == "on" ? true : false),
                        opcionD: (df["pregunta36opcionD"] == "on" ? true : false),
                        opcionE: (df["pregunta36opcionE"] == "on" ? true : false),
                        opcionF: (df["pregunta36opcionF"] == "on" ? true : false),
                        opcionG: (df["pregunta36opcionG"] == "on" ? true : false),
                        opcionH: (df["pregunta36opcionH"] == "on" ? true : false)
                    }, 
                    pregunta37: df["pregunta37"],
                    pregunta38: {
                        opcionA: (df["pregunta38opcionA"] == "on" ? true : false),
                        opcionB: (df["pregunta38opcionB"] == "on" ? true : false),
                        opcionC: (df["pregunta38opcionC"] == "on" ? true : false),
                        opcionD: (df["pregunta38opcionD"] == "on" ? true : false),
                        opcionE: (df["pregunta38opcionE"] == "on" ? true : false),
                        opcionF: (df["pregunta38opcionF"] == "on" ? true : false)
                    },
                    pregunta39: {
                        opcionA: (df["pregunta39opcionA"] == "on" ? true : false),
                        opcionB: (df["pregunta39opcionB"] == "on" ? true : false),
                        opcionC: (df["pregunta39opcionC"] == "on" ? true : false),
                        opcionD: (df["pregunta39opcionD"] == "on" ? true : false),
                        opcionE: (df["pregunta39opcionE"] == "on" ? true : false),
                        opcionF: (df["pregunta39opcionF"] == "on" ? true : false)
                    },
                    pregunta40: {
                        opcionA: (df["pregunta40opcionA"] == "on" ? true : false),
                        opcionB: (df["pregunta40opcionB"] == "on" ? true : false),
                        opcionC: (df["pregunta40opcionC"] == "on" ? true : false),
                        opcionD: (df["pregunta40opcionD"] == "on" ? true : false),
                        opcionE: (df["pregunta40opcionE"] == "on" ? true : false),
                        opcionF: (df["pregunta40opcionF"] == "on" ? true : false)
                    },
                    pregunta41: {
                        ninguno: (df["pregunta41opcionNinguno"] == "on" ? true : false),
                        opcionMama: df["pregunta41opcionMama"],
                        opcionPapa: df["pregunta41opcionPapa"],
                        opcionOtro: df["pregunta41opcionOtro"]
                    },
                    pregunta42: {
                        opcionA: (df["pregunta42opcionA"] == "on" ? true : false),
                        opcionB: (df["pregunta42opcionB"] == "on" ? true : false),
                        opcionC: (df["pregunta42opcionC"] == "on" ? true : false),
                        opcionD: (df["pregunta42opcionD"] == "on" ? true : false),
                        opcionE: (df["pregunta42opcionE"] == "on" ? true : false)
                    }, 
                    pregunta43: df["pregunta43"],
                    pregunta44: {
                        opcionA: (df["pregunta44opcionA"] == "on" ? true : false),
                        opcionB: (df["pregunta44opcionB"] == "on" ? true : false),
                        opcionC: (df["pregunta44opcionC"] == "on" ? true : false)
                    },
                    pregunta45: {
                        edad: df["pregunta45edad"],
                        opcionA: (df["pregunta45opcionA"] == "on" ? true : false),
                        opcionB: (df["pregunta45opcionB"] == "on" ? true : false),
                        opcionC: (df["pregunta45opcionC"] == "on" ? true : false),
                        opcionD: (df["pregunta45opcionD"] == "on" ? true : false)
                    }
                };

                var grid14 = Ext.getCmp("Grid-Pregunta14");
                Ext.each(grid14.getStore().data.items, function (item, index, allItems) {
                    historia.pregunta14.push({
                        nivel: item.get("compNivelEducativo"),
                        madre: item.get("madreNivelEducativo"),
                        padre: item.get("padreNivelEducativo")
                    });
                });

                var grid26 = Ext.getCmp("Grid-Pregunta26");
                Ext.each(grid26.getStore().data.items, function (item, index, allItems) {
                    historia.pregunta26.push({
                        nombreAnimal: item.get("compTipoAnimal"),
                        seleccion: item.get("activarTipoAnimal"),
                        numero: item.get("numeroTipoAnimal")
                    });
                });
                var grid28 = Ext.getCmp("Grid-Pregunta28");
                Ext.each(grid28.getStore().data.items, function (item, index, allItems) {
                    historia.pregunta28.push({
                        nombreAfiliado: item.get("nombre"),
                        carnet: item.get("numCarnet"),
                        edad: item.get("edad"),
                        discapacidad: item.get("codDiscapacidad")
                    });
                });
                var grid31 = Ext.getCmp("Grid-Pregunta31");
                Ext.each(grid31.getStore().data.items, function (item, index, allItems) {
                    historia.pregunta28.push({
                        nombreFamiliar: item.get("nombre"),
                        carnet: item.get("numCarnet")
                    });
                });
                var grid32 = Ext.getCmp("Grid-Pregunta32");
                Ext.each(grid32.getStore().data.items, function (item, index, allItems) {
                    historia.pregunta28.push({
                        nombreFamiliar: item.get("nombre"),
                        carnet: item.get("numCarnet")
                    });
                });
                var grid33 = Ext.getCmp("Grid-Pregunta33");
                Ext.each(grid33.getStore().data.items, function (item, index, allItems) {
                    historia.pregunta28.push({
                        nombreFamiliar: item.get("nombre"),
                        carnet: item.get("numCarnet")
                    });
                });
                //var itemsValidar = [];

                // solo validar cuando se edita o adiciona registros
                //if (itemsValidar.length > 0) {
                //    var validator = Coomuce.Util.dataValidate(itemsValidar);

                //    if (!validator.success) {
                //        Coomuce.Util.ShowMessage({ type: "ERROR", title: titleView, msg: validator.msg });

                //        return false;
                //    }
                //}

                var hfdfr = {
                    info: info,
                    historia: historia
                };

                localStorage.setItem("hfdfr", JSON.stringify(hfdfr));

                //var conf = {
                //    url: Coomuce.Url.Funciones + "HfdfrGuardar",
                //    data: {
                //        info: info,
                //        historia: historia
                //    },
                //    targetMask: form,
                //    msgMask: "Guardando datos...",
                //    fnSuccess: function (response) {
                //        form.getForm().reset();
                //        grid28.removeAll();
                //        grid31.removeAll();
                //        grid32.removeAll();
                //        grid33.removeAll();
                //    }
                //};

                //Coomuce.Util.EnviarPost(conf);
            }
        });
},

onSelectCombo: function (combo, record, eOpts) {
    var me = this;

    if (combo.dependent) {
        var idCiudad = me.lookupReference("idCiudad");

        idCiudad.getStore().load({ params: { idDepartamento: record.get("idDepartamento") } });
    }
    else {
        for (var i = 0; i < combo.componentReference.length; i++) {
            var o = me.lookupReference(combo.componentReference[i]);

            o.setValue(record.get(combo.componentReference[i]));
        }
    }
},

onChangeCheckNinguno: function (check, newValue, oldValue, eOpts) {
    var me = this;
    var pregunta41opcionMama = me.lookupReference("pregunta41opcionMama");
    var pregunta41opcionPapa = me.lookupReference("pregunta41opcionPapa");
    var pregunta41opcionOtro = me.lookupReference("pregunta41opcionOtro");

    if (newValue) {
        pregunta41opcionMama.setValue("");
        pregunta41opcionPapa.setValue("");
        pregunta41opcionOtro.setValue("");
    }
    else {
        pregunta41opcionMama.setValue("NO");
        pregunta41opcionPapa.setValue("NO");
        pregunta41opcionOtro.setValue("NO");
    }

    pregunta41opcionMama.setDisabled(newValue);
    pregunta41opcionPapa.setDisabled(newValue);
    pregunta41opcionOtro.setDisabled(newValue);
},

onBotonAdicionarGrid28Click: function () {
        // Create a record instance
        var myStore = Ext.getStore('mystore28');
        var ndx = myStore.getCount() + 1;
        myStore.add({
            id: ndx,
            numCarnet: '',
            nombre: '',
            edad: '',
            codDiscapacidad: ''
        });
        console.log(myStore);
    },

    onBotonRemoverGrid28Click: function () {
        var storeGrid = Ext.getCmp('Grid-Pregunta28');
        storeGrid.getStore().remove(storeGrid.selModel.getSelection());
    },

    onBotonAdicionarGrid31Click: function () {
        var me = this;
        var numeroIntegrantes = me.lookupReference("numeroIntegrantes");

        // Create a record instance
        var storeGrid = Ext.getCmp('Grid-Pregunta31').getStore();

        for (var i = 0; i < numeroIntegrantes.getValue() ; i++) {
            var row = [
            {
                numCarnet: "",
                nombre: ""
            }
            ];

            storeGrid.insert(0, row);
        }
    },

    onBotonRemoverGrid31Click: function () {
        var storeGrid = Ext.getCmp('Grid-Pregunta31');
        storeGrid.getStore().remove(storeGrid.selModel.getSelection());
    },

    onBotonAdicionarGrid32Click: function () {
        // Create a record instance
        var storeGrid = Ext.getCmp('Grid-Pregunta32').getStore();

        var row = [
        {
            numCarnet: "",
            nombre: ""
        }
        ];

        storeGrid.insert(0, row);
    },

    onBotonRemoverGrid32Click: function () {
        var storeGrid = Ext.getCmp('Grid-Pregunta32');
        storeGrid.getStore().remove(storeGrid.selModel.getSelection());
    },
    
    onBotonAdicionarGrid33Click: function () {
        // Create a record instance
        var storeGrid = Ext.getCmp('Grid-Pregunta33').getStore();

        var row = [
        {
            numCarnet: "",
            nombre: ""
        }
        ];

        storeGrid.insert(0, row);
    },

    onBotonRemoverGrid33Click: function () {
        var storeGrid = Ext.getCmp('Grid-Pregunta33');
        storeGrid.getStore().remove(storeGrid.selModel.getSelection());
    },

    onUploadDataComplete: function (source, file) {
        var titleView = this.getTitleView();

        var record = source.getWidgetRecord();

        record.set("archivoAudioHfdfr", file.data);

        Coomuce.Util.ShowMessage({ type: "INFO", title: titleView, msg: "Archivo de audio importado correctamente." });
    },

    onUploadError: function (src, data) {
        var me = this;
        var titleView = me.getTitleView();

        var msg = 'ErrorType: ' + data.errorType;

        switch (data.errorType) {
            case 'FileSize':
            msg = 'Este archivo es demasiado grande: ' + Ext.util.Format.fileSize(data.fileSize) +
            '. El tamaño máximo de subida es ' + Ext.util.Format.fileSize(data.maxFileSize) + '.';
            break;

            case 'QueueLength':
            msg = 'La longitud de la cola es demasiado larga: ' + data.queueLength +
            '. La longitud máxima de la cola es ' + data.maxQueueLength + '.';
            break;
        }

        Coomuce.Util.ShowMessage({ type: "ERROR", title: titleView, msg: msg });
    },

    onBotonEliminarArchivoClick: function (btn) {
        var record = btn.getWidgetRecord();

        record.set("archivoAudioHfdfr", "");
    },

    onBotonImportarArchivoClick: function () {
        var me = this;

        var store = Ext.create("Ext.data.Store", {
            autoLoad: true,
            fields: [
            "idInfoHfdfr", "tipoDiligenciamientoHfdfr", { name: "fechaVisitaHfdfr", convert: Coomuce.Util.parseDate },
            "codigoTipoIdentificacion", "identificacionFuanAfiliado", "compAfiliado", "archivoAudioHfdfr"
            ],
            proxy: {
                timeout: 600000,
                useDefaultXhrHeader: false,
                type: 'ajax',
                url: Coomuce.Url.Funciones + "GetFunHfdfrAll",
                reader: {
                    type: 'json',
                    rootProperty: 'data',
                    totalProperty: "total"
                }
            }
        });

        var pagingBar = Ext.widget("pagingtoolbar", {
            store: store,
            displayInfo: true,
            displayMsg: "Registros {0} - {1} de {2}"
        });

        var grid = Ext.create("Ext.grid.Panel", {
            bbar: pagingBar,
            columns: [
            { dataIndex: "idInfoHfdfr", header: "No. Plantilla" },
            { dataIndex: "tipoDiligenciamientoHfdfr", header: "Tipo Diligenciamiento" },
            { xtype: "datecolumn", dataIndex: "fechaVisitaHfdfr", format: "d/m/Y", header: "Fecha" },
            { dataIndex: "codigoTipoIdentificacion", header: "Tipo Identificación" },
            { dataIndex: "identificacionFuanAfiliado", header: "Identificación" },
            { dataIndex: "compAfiliado", header: "Afiliado" },
            {
                xtype: "widgetcolumn", header: "", width: 60, widget: {
                    xtype: 'uploader',
                    uploadConfig: {
                        uploadUrl: Coomuce.Url.Funciones + "ImportarAudioHfdfr",
                        maxFileSize: 10 * 1024 * 1024
                    },
                    inputAttrTpl: "data-qtip='Seleccione el archivo.'",
                    listeners: {
                        'uploaddatacomplete': me.onUploadDataComplete,
                        'uploaderror': me.onUploadError
                    }
                }
            },
            {
                xtype: "widgetcolumn", dataIndex: "archivoAudioHfdfr", header: "Archivo de audio", width: 200, widget: {
                    xtype: "button",
                    iconCls: "x-fa fa-minus-circle",
                    textAlign: "left",
                    handler: me.onBotonEliminarArchivoClick
                }
            }
            ],
            columnLines: true,
            loadMask: true,
            store: store
        });

        var fnGuardarCambios = function () {
            var datos = [];

            Ext.each(store.data.items, function (ob, index, all) {
                if (ob.dirty) {
                    if (!ob.phantom) {
                        datos.push({
                            idInfoHfdfr: ob.data.idInfoHfdfr,
                            archivoAudioHfdfr: ob.data.archivoAudioHfdfr
                        });
                    }
                }
            });

            Ext.Msg.confirm(titleView, "Desea guardar las modificaciones?", function (btn) {
                if (btn === "yes") {
                    var conf = {
                        url: Coomuce.Url.Funciones + "HfdfrGuardarCambios",
                        data: {
                            datos: datos
                        },
                        targetMask: grid,
                        msgMask: "Guardando datos...",
                        fnSuccess: function (response) {
                            store.load();
                        }
                    };

                    Coomuce.Util.EnviarPost(conf);
                }
            });
        };

        var window = Ext.create("Ext.window.Window", {
            height: 500,
            items: grid,
            layout: "fit",
            modal: true,
            tbar: {
                items: [
                { text: "Guardar cambios", handler: fnGuardarCambios }
                ]
            },
            title: "Importar archivo de audio",
            width: 500
        });

        window.show();
    },

    onUploadFirmaDataComplete: function (source, file) {
        var titleView = this.getTitleView();
        var botonEliminar = this.lookupReference("botonEliminarFirma");
        var firmaHfdfr = this.lookupReference("firmaHfdfr");

        botonEliminar.setText(file.data);
        firmaHfdfr.setValue(file.data);

        Coomuce.Util.ShowMessage({ type: "INFO", title: titleView, msg: "Archivo de firma importado correctamente." });
    },

    onUploadFirmaError: function (src, data) {
        var me = this;
        var titleView = me.getTitleView();

        var msg = 'ErrorType: ' + data.errorType;

        switch (data.errorType) {
            case 'FileSize':
            msg = 'Este archivo es demasiado grande: ' + Ext.util.Format.fileSize(data.fileSize) +
            '. El tamaño máximo de subida es ' + Ext.util.Format.fileSize(data.maxFileSize) + '.';
            break;

            case 'QueueLength':
            msg = 'La longitud de la cola es demasiado larga: ' + data.queueLength +
            '. La longitud máxima de la cola es ' + data.maxQueueLength + '.';
            break;
        }

        Coomuce.Util.ShowMessage({ type: "ERROR", title: titleView, msg: msg });
    },

    onBotonEliminarFirmaClick: function (btn) {
        btn.setText("");

        var firmaHfdfr = this.lookupReference("firmaHfdfr");
        firmaHfdfr.setValue("");
    }

});