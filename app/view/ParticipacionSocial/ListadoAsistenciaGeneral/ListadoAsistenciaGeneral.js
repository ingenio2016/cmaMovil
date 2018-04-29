Ext.define("CoomuceMovil.view.ParticipacionSocial.ListadoAsistenciaGeneral", {
    extend: "Ext.form.Panel",
    xtype: "listadoasistenciageneral",
    requires: [
    "Ext.grid.Grid",
    'Ext.grid.plugin.Editable',
    'Ext.grid.plugin.ViewOptions',
    'Ext.grid.plugin.ColumnResizing',
    'Ext.grid.plugin.MultiSelection',
    "CoomuceMovil.view.ParticipacionSocial.ListadoAsistenciaGeneralController",
    "CoomuceMovil.view.ParticipacionSocial.ListadoAsistenciaGeneralModel",
    "CoomuceMovil.view.main.MainModel"
    ],
    controller: "participacionsocial-listadoasistenciageneral",
    viewModel: { type: "participacionsocial-listadoasistenciageneral" },
    bodyPadding: 10,
    scrollable: true,
    id: "Form-ListadoAsistenciaGeneral-Principal",
    items: [
    {
        xtype: "fieldset",
        style: {
            "background-color": "#FFFFFF"
        },
        items: [
        { xtype: "button", minWidth: 80, text: "Eliminar Datos", iconCls: "fa fa-trash", handler: "onBotonDeleteLCClick", ui: "action", reference: "botonEliminar", width: 200 },
        { xtype: "button", minWidth: 80, text: "Sincronizar Datos", iconCls: "fa fa-cloud-upload", handler: "onBotonSincronizarClick", ui: "action", reference: "botonSincronizar", width: 200 }
        ]
    },
    {
        xtype: "fieldset",
        title: "Listado General de Asistencia",
        style: {
            "background-color": "#FFFFFF"
        },
        items: [
        { xtype: "numberfield", hidden: true, name: "idAsistenciaGeneral", reference: "idAsistenciaGeneral" },
        {
            xtype: "selectfield",
            allowBlank: false,
            bind: {
                store: "{getDepartamento}"
            },
            campoDependent: "idCiudad",
            dependent: true,
            displayField: "compDepartamento",
            editable: false,
            label: "Departamento",
            name: "idDepartamento",
            id: "idDepartamento",
            queryMode: "local",
            reference: "idDepartamento",
            valueField: "idDepartamento",
            flex: 1,
            listeners: {
                change: "onSelectDepartment"
            }
        },
        {
            xtype: "selectfield",
            allowBlank: false,
            bind: {
                store: "{getCiudad}"
            },
            displayField: "compCiudad",
            editable: false,
            label: "Municipio",
            name: "idCiudad",
            id: "idCiudad",
            queryMode: "local",
            reference: "idCiudad",
            valueField: "idCiudad",
            flex: 1
        },
        {
            xtype: "selectfield",
            allowBlank: false,
            bind: {
                store: "{getGruposFocales}"
            },
            displayField: "compGruposFocales",
            editable: false,
            label: "Grupo Focal",
            name: "idGruposFocales",
            id: "idGruposFocales",
            queryMode: "local",
            valueField: "idGruposFocales",
            flex: 1
        },
        {
            xtype: "selectfield",
            allowBlank: false,
            bind: {
                store: "{getEje}"
            },
            campoDependent: "idUnidad",
            dependent: true,
            displayField: "compEje",
            editable: false,
            label: "Eje",
            listeners: {
                change: "onSelectEje"
            },
            name: "idEje",
            id: "idEje",
            queryMode: "local",
            reference: "idEje",
            valueField: "idEje",
            flex: 1
        },
        {
            xtype: "selectfield",
            allowBlank: false,
            bind: {
                store: "{getUnidad}"
            },
            campoDependent: "idModulo",
            dependent: true,
            displayField: "compUnidad",
            editable: false,
            label: "Unidad",
            listeners: {
                change: "onSelectUnidad"
            },
            name: "idUnidad",
            id: "idUnidad",
            queryMode: "local",
            reference: "idUnidad",
            valueField: "idUnidad",
            flex: 1
        },
        {
            xtype: "selectfield",
            allowBlank: false,
            bind: {
                store: "{getModulo}"
            },
            campo: "nombreModulo",
            campoReference: "temaAsistenciaGeneral",
            dependent: true,
            displayField: "codigoModulo",
            editable: false,
            label: "Modulo",
            listeners: {
                change: "onSelectModulo"
            },
            name: "idModulo",
            id: "idModulo",
            queryMode: "local",
            reference: "idModulo",
            valueField: "idModulo",
            flex: 1
        },
        {
            xtype: "textfield",
            allowBlank: false,
            label: "Tema",
            name: "temaAsistenciaGeneral",
            id: "temaAsistenciaGeneral",
            readOnly: true,
            reference: "temaAsistenciaGeneral",
            flex: 1
        },
        {
            xtype: "textfield",
            allowBlank: false,
            label: "Formador",
            name: "formadorAsistenciaGeneral",
            id: "formadorAsistenciaGeneral",
            value: Coomuce.Util.DatosUsuario.nombreUsuario,
            flex: 1
        }
        ]
    },
    {
        xtype: "fieldset",
        title: "",
        style: {
            "background-color": "#FFFFFF"
        },
        items: [
        {
            xtype: 'container',
            defaults: {
                xtype: "button",
                ui: "action",
                flex: 1
            },
            layout: {
                type: 'hbox'
            },
            items: [
            { 
                iconCls: "x-fa fa-plus-circle", 
                text: "Adicionar",
                listeners:{
                    tap:function() {
                        var myStore = Ext.getStore('getListadoAsistencia');
                        var ndx = myStore.getCount() + 1;
                        myStore.add({ 
                            'idListaAsistenciaGeneral':ndx,
                            'idFuanAfiliado': '0',
                            'nombreCompletoAfiliado':'',
                            'codigoTipoIdentificacion':'',
                            'identificacionFuanAfiliado':''
                        })
                    }
                } 
            }
            ]
        },
        {
            xtype: "grid",
            bind: {
                store: "{setListadoAsistencia}"
            },
            border: true,
            columns: [
            {
                dataIndex: "idListaAsistenciaGeneral", text: "ID", flex:0.1
            },
            {
                dataIndex: "identificacionFuanAfiliado", text: "Documento de Identidad", value: "0", flex: 1, editable: true, editor: {
                    xtype: "textfield",
                    allowBlank: false
                }
            },
            {
                dataIndex: "codigoTipoIdentificacion", value: "", text: "Tipo Documento", flex:1
            },
            {
                dataIndex: "nombreCompletoAfiliado", value: "", text: "Nombre y Apellido", flex:2
            }
            ],
            columnLines: true,
            height: 350,
            id: "Grid-ListadoAsistenciaGeneral",
            plugins: [
            {
                type: 'grideditable',
                triggerEvent: 'doubletap', 
                enableDeleteButton: true,
                toolbarConfig: {
                    xtype: 'titlebar',
                    docked: 'top',
                    items: [{
                        xtype: 'button',
                        ui: 'decline',
                        text: 'Cancelar',
                        align: 'left',
                        action: 'cancel'
                    }, {
                        xtype: 'button',
                        ui: 'confirm',
                        text: 'Buscar',
                        align: 'right',
                        action: 'submit',
                        handler: function(btn, e) {
                            $('body').loading({
                                theme: 'dark',
                                message: 'Consultando...'
                            });
                            var storeGrid = Ext.getCmp('Grid-ListadoAsistenciaGeneral').getStore();
                            var index = storeGrid.data.items.length - 1;
                            var gridRow = storeGrid.data.items[index].data;
                            //Get sfiliates Store
                            var afiliadoStore = Ext.getStore('getAfiliadoMainStore');
                            var selectedAfiliado = [];
                            var cont = 0;
                            async.each(afiliadoStore.data.items, function(item, callback) {
                                setTimeout(function() {
                                    if(item.data.identificacionFuanAfiliado != gridRow.identificacionFuanAfiliado){
                                        callback();
                                    }else {
                                        selectedAfiliado.push(item.data);
                                        cont ++;
                                        callback('Se Encontro');
                                    }    
                                },0);                            
                            }, function(err) {
                                if(err){
                                    var gridStore = Ext.getStore('getListadoAsistencia');
                                    if(gridStore.data.items.length) {
                                        var afiliadoGrid = gridStore.data.items[index].data;
                                        // Tipo Identificacion
                                        var tipoIdentificacionStore = Ext.getStore('getTipoIdentificacion');
                                        _.forEach(tipoIdentificacionStore.data.items, function(item) {
                                            if(selectedAfiliado[0].idTipoIdentificacion == item.data.idTipoIdentificacion){
                                                afiliadoGrid.codigoTipoIdentificacion = item.data.codigoTipoIdentificacion;
                                            }
                                        });
                                        
                                        afiliadoGrid.idFuanAfiliado = selectedAfiliado[0].idFuanAfiliado;
                                        afiliadoGrid.nombreCompletoAfiliado = selectedAfiliado[0].nombreCompletoAfiliado
                                        gridStore.remove(index);
                                        gridStore.add(afiliadoGrid);
                                    }                                    
                                }else{
                                    if(cont == 0) {
                                        Ext.Msg.alert('ATENCION', "No existe ningún afiliado con ese Documento", Ext.emptyFn);
                                    }else{
                                        Ext.Msg.alert('ATENCION', "El afiliado se consulto correctamente", Ext.emptyFn);
                                    }
                                }
                            });
                            $('body').loading('stop');
                        }
                    }]
                },
                defaultFormConfig: {
                    xtype: 'formpanel',
                    modal: true,
                    scrollable: true,
                    items: {
                        xtype: 'fieldset'
                    }
                }
            },
            { type: 'gridviewoptions' },
            { type: 'gridcolumnresizing' }
            ],
            sortableColumns: false
        },
        {
            xtype: 'container',
            defaults: {
                xtype: "button",
                ui: "action"
            },
            layout: {
                type: 'hbox'
            },
            items: [
            { 
                minWidth: 80, 
                text: 'Guardar',
                reference: "botonGuardar", 
                width: 120,
                handler: function(btn, e) {
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
                                var form = btn.up('formpanel');
                                var listadoForm = form.getValues();
                                var date = new Date();
                                if(listadoForm.idCiudad === 0 || listadoForm.idEje === 0 || listadoForm.formadorAsistenciaGeneral === "") {
                                    Ext.Msg.alert('Advertencia', "El formulario no está completo. Por favor verifique", Ext.emptyFn);
                                    return false;
                                }
                                var gridListado = Ext.getCmp('Grid-ListadoAsistenciaGeneral');
                                var storeGridListado = gridListado.getStore();
                                if(storeGridListado.data.items.length == 0 || storeGridListado.data.items[0].data.identificacionFuanAfiliado == "" || storeGridListado.data.items[0].data.identificacionFuanAfiliado == "0" || storeGridListado.data.items[0].data.nombreCompletoAfiliado == "") {
                                    Ext.Msg.alert('Advertencia', "Debe agregar por lo menos un afiliado al Listado", Ext.emptyFn);
                                    return false;
                                }
                                // Completo el Formulario para Enviar
                                var infoListadoGeneral = {
                                    idAsistenciaGeneral : Ext.isEmpty(listadoForm.idAsistenciaGeneral) ? 0 : parseInt(infoAsistencia.idAsistenciaGeneral),
                                    idCiudad: listadoForm.idCiudad,
                                    idDepartamento: listadoForm.idDepartamento,
                                    idEje: listadoForm.idEje,
                                    idGruposFocales: listadoForm.idGruposFocales,
                                    idModulo: listadoForm.idModulo,
                                    IdUnidad: listadoForm.idUnidad,
                                    temaAsistenciaGeneral: listadoForm.temaAsistenciaGeneral,
                                    formadorAsistenciaGeneral: listadoForm.formadorAsistenciaGeneral,
                                    idUsuario: Coomuce.Util.DatosUsuario.idUsuario
                                }                                
                                var listaAsistencia = [];

                                Ext.each(storeGridListado.data.items, function (ob, index, all) {
                                    if (ob.data.nombreCompletoAfiliado !== "") {
                                        listaAsistencia.push(ob.data);
                                    }
                                });
                                var asistencia = {
                                    infoAsistencia: infoListadoGeneral,
                                    listaAsistencia: listaAsistencia
                                };
                                console.log(asistencia);
                                var randomNumber = Math.floor(Math.random() * 1000000);
                                localStorage.setItem("listado-" + randomNumber, JSON.stringify(asistencia));
                                Ext.Msg.alert('Señor Usuario', "La información ha sido guardada exitosamente", Ext.emptyFn);
                                
                                
                                var gridRow = storeGridListado.data.items[0].data;
                                gridRow.codigoTipoIdentificacion = "";
                                gridRow.identificacionFuanAfiliado = "0";
                                gridRow.nombreCompletoAfiliado = "";
                                storeGridListado.remove(0);
                                storeGridListado.add(gridRow);
                                Ext.getCmp("Form-ListadoAsistenciaGeneral-Principal").destroy();

                            }
                        }
                    });
                    }
            },
            { 
                minWidth: 80, 
                text: 'Cancelar', 
                handler: 'onBotonCancelarClick', 
                reference: "botonCancelar", 
                width: 120 
            }
            ]
        }
        ]
    }
    ]
});