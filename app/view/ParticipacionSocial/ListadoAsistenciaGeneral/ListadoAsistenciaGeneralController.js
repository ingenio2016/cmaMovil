Ext.define("CoomuceMovil.view.ParticipacionSocial.ListadoAsistenciaGeneralController", {
    extend: "Ext.app.ViewController",
    alias: "controller.participacionsocial-listadoasistenciageneral",

    getTitleView: function () {
        return this.getView().getTitle();
    },

    onBotonDeleteLCClick: function(btn) {
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
                        if(_.includes(sKey, "listado")) {
                            window.localStorage.removeItem(sKey);
                        }            
                    }
                    Ext.Msg.alert('Información', "Los Datos se han eliminado", Ext.emptyFn);
                }
            }
        });
    },

    onBotonSincronizarClick: function() {
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
                    var form = Ext.getCmp("Form-ListadoAsistenciaGeneral-Principal");
                    var i = 0,
                    dataKeys = [],
                    sKey;
                    for (; sKey = window.localStorage.key(i); i++) {
                        if(_.includes(sKey,"listado")) {
                            dataKeys.push(sKey);
                        }
                    }        
                    if(dataKeys.length == 0){
                        Ext.Msg.alert('Información', "Los Datos están sincronizados", Ext.emptyFn);
                        $('body').loading('stop');
                        return false;
                    }else{
                        var cont = 0;
                        async.eachSeries(dataKeys, function(item, callback) {
                            var data = JSON.parse(window.localStorage.getItem(item));
                            var conf = {
                                url: Coomuce.Url.Funciones + "ListaAsistenciaGeneralGuardar",
                                data: {
                                    infoAsistencia: data.infoAsistencia,
                                    listaAsistencia: data.listaAsistencia
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
                                        //errorData += data.infoPurisu.identificacionFuanAfiliado + " ";
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
                                                    Ext.Msg.alert('ATENCION', "Se encontraron inconsistencias en algunos listados de asistencia y se han tenido que descartar. Por favor verifique", Ext.emptyFn);
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
                                                    Ext.Msg.alert('ATENCION', "Se encontraron inconsistencias en algunos listados de asistencia y se han tenido que descartar. Por favor verifique", Ext.emptyFn);
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
                                                    Ext.Msg.alert('ATENCION', "Se encontraron inconsistencias en algunos listados de asistencia y se han tenido que descartar. Por favor verifique", Ext.emptyFn);
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

    Ext.Msg.show({
        title: "Cancelar",
        message: 'Desea cancelar el formulario?',
        width: 300,
        buttons: [
        {text: 'Si', itemId: 'yes', ui: 'action'},
        {text: 'No', itemId: 'no'}
        ],
        fn: function (btn) {
            if (btn === "yes") {
                var gridStore = Ext.getStore('getListadoAsistencia');
                var gridRow = gridStore.data.items[0].data;
                gridRow.codigoTipoIdentificacion = "";
                gridRow.identificacionFuanAfiliado = "0";
                gridRow.nombreCompletoAfiliado = "";
                gridStore.remove(0);
                gridStore.add(gridRow);

                Ext.getCmp("Form-ListadoAsistenciaGeneral-Principal").destroy();
            }
        }});
},

onBotonConsultarClick: function () {
    var me = this;

    var store = me.getViewModel().getStore("getAsistenciaGeneral");

    var grid = Ext.create("Ext.grid.Panel", {
        columns: [
        { dataIndex: "idAsistenciaGeneral", header: "No. Formato", width: 100 },
        { xtype: "datecolumn", dataIndex: "fechaAsistenciaGeneral", format: "d/m/Y", header: "Fecha", width: 100 },
        { dataIndex: "formadorAsistenciaGeneral", header: "Formador", width: 200 }
        ],
        columnLines: true,
        listeners: {
            rowdblclick: function (grd, record, tr, rowIndex, e, eOpts) {
                var obCiudad = me.lookupReference("idCiudad");
                var obUnidad = me.lookupReference("idUnidad");
                var obModulo = me.lookupReference("idModulo");

                obCiudad.getStore().load({
                    params: {
                        idDepartamento: record.get("idDepartamento")
                    }
                });
                obUnidad.getStore().load({
                    params: {
                        idEje: record.get("idEje")
                    }
                });
                obModulo.getStore().load({
                    params: {
                        idUnidad: record.get("idUnidad")
                    }
                });

                var form = Ext.getCmp("Form-ListadoAsistenciaGeneral-Principal");
                var storeGrid = Ext.getCmp('Grid-ListadoAsistenciaGeneral').getStore();

                form.loadRecord(record);
                storeGrid.add(record.data.listaAsistencia);

                win.close();
            }
        },
        store: store
    });

    var win = Ext.create("Ext.window.Window", {
        height: 400,
        items: [grid],
        layout: "fit",
        modal: true,
        title: "Consulta Asistencia General",
        width: 500
    });

    win.show();
    store.load();
},


onBotonGridRemoverClick: function () {
    var storeGrid = Ext.getCmp('Grid-ListadoAsistenciaGeneral');
    storeGrid.getStore().remove(storeGrid.selModel.getSelection());
},

onSelectDepartment: function (combo, record, eOpts) {
    var departmentId = combo._value.data.idDepartamento;
    var store = Ext.getStore("getCityStore");
    var data = [];
    store.data.items.forEach(function(item, index) {
        if(item.data.idDepartamento == departmentId) {
            data.push(item.data);
        }
    });
    var myStore = Ext.getStore('getCiudadStore');
    myStore.removeAll();
    myStore.add(data);
},

onSelectEje: function (combo, record, eOpts) {
    var ejeId = combo._value.data.idEje;
    var store = Ext.getStore("getUnityStore");
    var data = [];
    store.data.items.forEach(function(item, index) {
        if(item.data.idEje == ejeId) {
            data.push(item.data);
        }
    });
    var myStore = Ext.getStore('getUnidadStore');
    myStore.removeAll();
    myStore.add(data);
},

onSelectUnidad: function (combo, record, eOpts) {
    var unidadId = combo._value.data.idUnidad;
    var store = Ext.getStore("getModuleStore");
    var data = [];
    store.data.items.forEach(function(item, index) {
        if(item.data.idUnidad == unidadId) {
            data.push(item.data);
        }
    });
    var myStore = Ext.getStore('getModuloStore');
    myStore.removeAll();
    myStore.add(data);
},

onSelectModulo: function (combo, record, eOpts) {
    var moduloId = combo._value.data.idModulo;
    var store = Ext.getStore("getModuloStore");
    store.data.items.forEach(function(item, index) {
        if(item.data.idModulo == moduloId) {
            Ext.getCmp('temaAsistenciaGeneral').setValue(item.data.nombreModulo);
        }
    });
},

onUploadDataComplete: function (source, file) {
    var titleView = this.getTitleView();

    var record = source.getWidgetRecord();

    record.set("firmaListaAsistenciaGeneral", file.data);

    Coomuce.Util.ShowMessage({ type: "INFO", title: titleView, msg: "Archivo de firma importado correctamente." });
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

    record.set("firmaListaAsistenciaGeneral", "");
}

});