Ext.define('CoomuceMovil.view.CaracterizacionPoblacional.IfppirController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.caracterizacionpoblacional-ifppir',
    statusComponent: false,
    components: [
    "nombreCompletoAfiliado", "codigoTipoIdentificacion", "identificacionFuanAfiliado", "numCarnetFuanAfiliado", "fechaNacimientoFuanAfiliado",
    "compDepartamento", "compCiudad", "direccionFuanAfiliado", "telefonoFuanAfiliado", "celularFuanAfiliado", "ipsPrimariaIfppir", "edadFuanAfiliado",
    "puntajeSisbenFuanAfiliado", "razaIfppir", "escolaridadIfppir", "nombreTipoZona", "nombreTipoSexo", "familiarCercanoIfppir", "telefonoFamiliarIfppir",
    "gestanteIfppir", "fechaAplicacionIfppir", "pesoIfppir", "tallaIfppir", "masaCorporalIfppir", "perimetroAbdominalIfppir",
    "sistolicaIfppir", "diastolicaIfppir", "nacidoVivoIfppir", "furIfppir", "fppIfppir", "colesterolTotalIfppir", "colesterolLdlIfppir", "colesterolHdlIfppir",
    "glicemiaIfppir", "gIfppir", "pIfppir", "cIfppir", "aIfppir", "observacionIfppir", "botonGuardar", "botonCancelar"
    ],

    getTitleView: function () {
        return this.getView().getTitle();
    },

    fnLimpiarDatos: function () {
        var form = Ext.getCmp("Form-Ifppir-Principal");
        form.reset();

        var storeGrid = Ext.getCmp('Grid-Ifppir-Principal').getStore();
        storeGrid.removeAll();
    },

    fnEnableDisableComponent: function () {
        var me = this;

        for (var i = 0; i < me.components.length; i++) {
            var obj = me.lookupReference(me.components[i]);

            if (me.statusComponent) {
                obj.disable();
            }
            else {
                obj.enable();
            }
        }

        var botonNuevaFicha = me.lookupReference("botonNuevaFicha");
        var botonBuscarAfiliado = me.lookupReference("botonBuscarAfiliado");

        if (me.statusComponent) {
            botonNuevaFicha.enable();
            botonBuscarAfiliado.disable();

            me.statusComponent = false;
        }
        else {
            botonNuevaFicha.disable();
            botonBuscarAfiliado.enable();

            me.fnLimpiarDatos();

            me.statusComponent = true;
        }
    },

    onBotonNuevaFichaClick: function (btn) {
        var me = this;

        me.fnEnableDisableComponent();
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
                        if(_.includes(sKey, "ifppir")) {
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
                    var form = Ext.getCmp("Form-Ifppir-Principal");
                    var i = 0,
                    dataKeys = [],
                    sKey;
                    for (; sKey = window.localStorage.key(i); i++) {
                        if(_.includes(sKey, "ifppir")) {
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
                                url: Coomuce.Url.Funciones + "IfppirGuardar",
                                data: {
                                    infoIfppir: data.infoIfppir,
                                    listaIfppirModel: data.listaIfppirModel
                                },
                                targetMask: form,
                                msgMask: "Guardando datos...",
                                fnSuccess: function (response) {
                                    console.log(response);
                                    cont ++;
                                    window.localStorage.removeItem(item);
                                    if(cont == 20){
                                        callback("Limite Superado");
                                    }
                                    callback();
                                },
                                fnFailure: function (resp) {
                                    if(resp == "Bad Request"){
                                        errorData += data.infoIfppir.identificacionFuanAfiliado + " ";
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
                                                    Ext.Msg.alert('ATENCION', "Se encontraron inconsistencias en las fichas de los afiliados con documento de idendificación " + errorData + " estas fichas se han tenido que descartar", Ext.emptyFn);
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
                                                    Ext.Msg.alert('ATENCION', "Se encontraron inconsistencias en las fichas de los afiliados con documento de idendificación " + errorData + " Estas fichas se han tenido que descartar", Ext.emptyFn);
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

    onBotonCancelarClick: function () {
        var me = this;

        Ext.Msg.confirm(this.getTitleView(), "Desea cancelar las modificaciones?", function (btn) {
            if (btn === "yes") {
                me.fnLimpiarDatos();
                me.fnEnableDisableComponent();
            }
        });
    },

    onBotonGuardarClick: function () {
        var me = this;
        var titleView = me.getTitleView();
        Ext.Msg.show({
            title: "Guardar Datos",
            message: 'Desea guardar las modificaciones?',
            width: 300,
            buttons: [
            {text: 'Si', itemId: 'yes', ui: 'action'},
            {text: 'No', itemId: 'no'}
            ],
            fn: function (buttonId) {
                if (buttonId === "yes") {
                    var form = Ext.getCmp("Form-Ifppir-Principal");
                    var infoIfppir = form.getValues();
                    console.log(infoIfppir);
                                /*infoIfppir.idInfoIfppir = 0; // inicializo este campo que no se captura en pantalla
                                infoIfppir.gestanteIfppir = (infoIfppir.gestanteIfppir === "on" ? true : false);
                                infoIfppir.pesoIfppir = parseFloat(infoIfppir.pesoIfppir);
                                infoIfppir.tallaIfppir = parseInt(infoIfppir.tallaIfppir);
                                infoIfppir.masaCorporalIfppir = parseFloat(infoIfppir.masaCorporalIfppir);
                                infoIfppir.perimetroAbdominalIfppir = parseInt(infoIfppir.perimetroAbdominalIfppir);
                                infoIfppir.sistolicaIfppir = parseInt(infoIfppir.sistolicaIfppir);
                                infoIfppir.diastolicaIfppir = parseInt(infoIfppir.diastolicaIfppir);
                                infoIfppir.idUsuario = Coomuce.Util.DatosUsuario.idUsuario;

                                var grid = Ext.getCmp('Grid-Ifppir-Principal');
                                var storeGrid = grid.getStore();

                                var listaIfppirModel = [];
                                //var itemsValidar = [];

                                Ext.each(storeGrid.data.items, function (ob, index, all) {
                                    //if (ob.dirty) {
                                        //if (ob.phantom) {
                                            listaIfppirModel.push(ob.data);
                                        //}
                                        //else {
                                        //    viejos.push(ob.data);
                                        //}

                                        //itemsValidar.push(ob);
                                    //}
                                });
                                */
                                
                                // solo validar cuando se edita o adiciona registros
                                //if (itemsValidar.length > 0) {
                                //    var validator = Coomuce.Util.dataValidate(itemsValidar);

                                //    if (!validator.success) {
                                //        Coomuce.Util.ShowMessage({ type: "ERROR", title: titleView, msg: validator.msg });

                                //        return false;
                                //    }
                                //}

                                /*var ifppir = {
                                    infoIfppir: infoIfppir,
                                    listaIfppirModel: listaIfppirModel
                                };*/

                                //localStorage.setItem("ifppir", JSON.stringify(ifppir));

                                //var conf = {
                                //    url: Coomuce.Url.Funciones + "IfppirGuardar",
                                //    data: {
                                //        infoIfppir: infoIfppir,
                                //        listaIfppirModel: listaIfppirModel
                                //    },
                                //    targetMask: form,
                                //    msgMask: "Guardando datos...",
                                //    fnSuccess: function (response) {
                                //        me.fnLimpiarDatos();
                                //        me.fnEnableDisableComponent();
                                //    }
                                //};

                                //Coomuce.Util.EnviarPost(conf);
                            }
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
            if (record.get("nombreTipoSexo") != "Femenino") {
                for (var i = 0; i < combo.disabledBySexo.length; i++) {
                    var ob = me.lookupReference(combo.disabledBySexo[i]);
                    ob.setDisabled(true);
                }
            }
            var storeGrid = Ext.getCmp('Grid-Ifppir-Principal').getStore();
            storeGrid.load({ params: { edad: record.get("edadFuanAfiliado") } });
        }
    },

    onChangeNumber: function (field, value) {
        var me = this;
        var peso = me.lookupReference("pesoIfppir");
        var talla = me.lookupReference("tallaIfppir");
        var masa = me.lookupReference("masaCorporalIfppir");
        var estatura = parseFloat(talla.getValue()/100);

        var imc = parseFloat(peso.getValue()) / Math.pow(estatura, 2);

        imc = imc.toFixed(2);
        masa.setValue(imc);
    },

    onSelectDate: function (field, value, eOpts) {
        var me = this;

        var fpp = me.lookupReference("fppIfppir");

        var dat = new Date(value.valueOf());
        dat.setDate((dat.getDate() + 280) - 7);

        fpp.setValue(dat);
    },

    onChangeCheck: function(field, newValue, oldValue, eOpts) {
        var me = this;

        var fur = me.lookupReference("furIfppir");
        var nacidoVivoIfppir = me.lookupReference("nacidoVivoIfppir");

        fur.setReadOnly(!newValue);
        nacidoVivoIfppir.setReadOnly(!newValue);
    },

    onGridColumnCheckChange: function (check, rowIndex, checked, eOpts) {
        var grid = Ext.getCmp("Grid-Ifppir-Principal");
        console.log(grid);
        console.log(check);
        console.log(rowIndex);
        console.log(checked);
        // selecciono la fila
        grid.selModel.select(rowIndex);

        var record = grid.selModel.getSelection()[0];

        if (check.dataIndex === "respuestaSiPregunta") {
            record.set("respuestaNoPregunta", !checked);
        }
        else {
            record.set("respuestaSiPregunta", !checked);
        }
    },

    onUploadDataComplete: function (source, file) {
        var titleView = this.getTitleView();

        var record = source.getWidgetRecord();

        record.set("archivoAudioIfppir", file.data);

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

        record.set("archivoAudioIfppir", "");
    },

    onBotonImportarArchivoClick: function () {
        var me = this;

        var store = Ext.create("Ext.data.Store", {
            autoLoad: true,
            fields: [
            "idInfoIfppir", "tipoDiligenciamientoIfppir", "codigoTipoIdentificacion", "identificacionFuanAfiliado", "compAfiliado", "archivoAudioIfppir"
            ],
            proxy: {
                timeout: 600000,
                useDefaultXhrHeader: false,
                type: 'ajax',
                url: Coomuce.Url.Funciones + "GetFunIfppirAll",
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
            { dataIndex: "idInfoIfppir", header: "No. Plantilla" },
            { dataIndex: "tipoDiligenciamientoIfppir", header: "Tipo Diligenciamiento" },
            { dataIndex: "codigoTipoIdentificacion", header: "Tipo Identificación" },
            { dataIndex: "identificacionFuanAfiliado", header: "Identificación" },
            { dataIndex: "compAfiliado", header: "Afiliado" },
            {
                xtype: "widgetcolumn", header: "", width: 60, widget: {
                    xtype: 'uploader',
                    uploadConfig: {
                        uploadUrl: Coomuce.Url.Funciones + "ImportarAudioIfppir",
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
                xtype: "widgetcolumn", dataIndex: "archivoAudioIfppir", header: "Archivo de audio", width: 200, widget: {
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
                            idInfoIfppir: ob.data.idInfoIfppir,
                            archivoAudioIfppir: ob.data.archivoAudioIfppir
                        });
                    }
                }
            });

            Ext.Msg.confirm(titleView, "Desea guardar las modificaciones?", function (btn) {
                if (btn === "yes") {
                    var conf = {
                        url: Coomuce.Url.Funciones + "IfppirGuardarCambios",
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
        var firmaIfppir = this.lookupReference("firmaIfppir");

        botonEliminar.setText(file.data);
        firmaIfppir.setValue(file.data);

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

        var firmaIfppir = this.lookupReference("firmaIfppir");
        firmaIfppir.setValue("");
    }

});