Ext.define("CoomuceMovil.view.DemandaInducida.Purisu", {
    extend: "Ext.form.Panel",
    xtype: "purisu",
    requires: [
    "Ext.grid.Grid",
    'Ext.grid.plugin.Editable',
    'Ext.grid.plugin.ViewOptions',
    'Ext.grid.plugin.ColumnResizing',
    'Ext.grid.plugin.MultiSelection',
    "CoomuceMovil.view.DemandaInducida.PurisuController",
    "CoomuceMovil.view.DemandaInducida.PurisuModel",
    "CoomuceMovil.view.main.MainModel"
    ],
    controller: "demandainducida-purisu",
    viewModel: { type: "demandainducida-purisu" },
    id: "Form-Purisu-Principal",
    bodyPadding: 10,
    defaults: { anchor: "100%" },
    fullscreen: true,
    items: [
    {
        layout: 'hbox',
        items: [
        { xtype: "button", minWidth: 80, text: "Eliminar Datos", iconCls: "fa fa-trash", handler: "onBotonDeleteLCClick", ui: "action", reference: "botonEliminar", width: 200 },
        { xtype: "button", minWidth: 80, text: "Sincronizar Datos", iconCls: "fa fa-cloud-upload", handler: "onBotonSincronizarClick", ui: "action", reference: "botonSincronizar", width: 200 },
        { xtype: "button", minWidth: 80, text: "Nueva Planilla", iconCls: "x-fa fa-file-o", handler: "onBotonNuevaPlanillaClick", ui: "action", reference: "botonNuevaPlanilla", width: 200 }        
        ]
    },
    {
        xtype: "fieldset",
        style: {
            "background-color": "#FFFFFF"
        },
        title: "Planilla única de registro de información y<br />servicios al usuario",
        items: [
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
        }
        ],
        flex: 1
    },
    {
        xtype: "fieldset",
        title: "",
        style: {
            "background-color": "#FFFFFF"
        },
        items: [
        {
            xtype: "button",
            combos: [
            "idTipoVisitaDomiciliaria", "idProgramaResolucion412", "idGrupoInteres", "idSeguimientoProgramasIntervencionRiesgo",
            "idGruposFocales", "idEje", "idUnidad", "idModulo", "idEje1", "idUnidad1", "idModulo1"
            ],
            campos: [
            "compTipoVisitaDomiciliaria", "compProgramaResolucion412", "compGrupoInteres", "compSeguimientoProgramasIntervencionRiesgo",
            "compGruposFocales", "compEje", "compUnidad", "compModulo", "compEje1", "compUnidad1", "compModulo1"
            ],
            disabled: true,
            handler: "onBotonGridAdicionarClick",
            iconCls: "x-fa fa-plus-circle",
            ui: "action",
            reference: "botonGridAdicionar",
            text: "Agregar datos a lista"        
        },
        { xtype: "numberfield", hidden: true, name: "idFuanAfiliado", id: "idFuanAfiliado", reference: "idFuanAfiliado" },
        {
            xtype: "textfield",
            label: "2. No. Carné",
            name: "numCarnetFuanAfiliado",
            id: "numCarnetFuanAfiliado",
            readOnly: true,
            reference: "numCarnetFuanAfiliado"
        },
        {
            xtype: "textfield",
            label: "3. Tipo Identificación del Usuario",
            name: "codigoTipoIdentificacion",
            id: "codigoTipoIdentificacion",
            readOnly: true,
            reference: "codigoTipoIdentificacion"       
        },
        { xtype: "textfield", label: "4. No. Documento de Identidad", name: "identificacionFuanAfiliado", value: "0", id: "identificacionFuanAfiliado", readOnly: true, flex: 3 },
        {
            xtype: "button",
            disabled: true,
            componentReference: [
            "idFuanAfiliado", "codigoTipoIdentificacion", "identificacionFuanAfiliado",
            "edadFuanAfiliado", "nombreTipoSexo", "numCarnetFuanAfiliado"
            ],
            handler: Coomuce.Util.buscarAfiliadoPurisu,
            iconCls: "x-fa fa-binoculars",
            ui: "action",
            reference: "botonBuscarAfiliado",
            tooltip: "Lista de Afiliados",
        }
        ],
        flex: 1
    },
    {
        xtype: "fieldset",
        defaults: {
            xtype: "checkboxfield"
        },
        items: [
        {
            xtype: "selectfield",
            bind: {
                store: "{getTipoVisitaDomiciliaria}"
            },
            displayField: "compTipoVisitaDomiciliaria",
            editable: false,
            label: "5. Visita Domiciliaria",
            name: "idTipoVisitaDomiciliaria",
            queryMode: "local",
            reference: "idTipoVisitaDomiciliaria",
            valueField: "idTipoVisitaDomiciliaria"
        },
        {
            label: "6. USIS (Oficina Municipal)",
            name: "usisPurisu",
            id: "usisPurisu"
        },
        {
            label: "7. IPS Primaria",
            name: "ipsPrimariaPurisu",
            id: "ipsPrimariaPurisu"
        },
        {
            label: "8. Telefonica",
            name: "telefonicaPurisu",
            id: "telefonicaPurisu"
        },
        {
            label: "9. CAU (Defensor del Usuario)",
            name: "cauPurisu",
            id: "cauPurisu"
        },
        {
            label: "10. Actividades Extramurales",
            name: "actividadExtramuralPurisu",
            id: "actividadExtramuralPurisu"
        }
        ],
        title: "UBICACIÓN",
        flex: 1
    },
    {
        xtype: "fieldset",
        items: [
        {
            xtype: "numberfield",
            label: "11. Edad",
            name: "edadFuanAfiliado",
            id: "edadFuanAfiliado",
            readOnly: true,
            reference: "edadFuanAfiliado"
        },
        {
            xtype: "textfield",
            label: "12. Genero",
            name: "nombreTipoSexo",
            id: "nombreTipoSexo",
            readOnly: true,
            reference: "nombreTipoSexo"
        }
        ],
        title: "DATOS GENERALES",
        flex: 1
    },
    {
        xtype: "fieldset",
        title: "Finalidad de la Canalización",
        items: [
        {
            xtype: "selectfield",
            bind: {
                store: "{getProgramaResolucion412}"
            },
            displayField: "compProgramaResolucion412",
            editable: false,
            label: "13. Programas Res. 412",
            name: "idProgramaResolucion412",
            queryMode: "local",
            reference: "idProgramaResolucion412",
            valueField: "idProgramaResolucion412"
        },
        {
            xtype: "selectfield",
            bind: {
                store: "{getGrupoInteres}"
            },
            displayField: "compGrupoInteres",
            editable: false,
            label: "14. Programas Grupos de Interés en Salud",
            name: "idGrupoInteres",
            queryMode: "local",
            reference: "idGrupoInteres",
            valueField: "idGrupoInteres"
        },
        {
            xtype: "selectfield",
            bind: {
                store: "{getSeguimientoProgramasIntervencionRiesgo}"
            },
            displayField: "compSeguimientoProgramasIntervencionRiesgo",
            editable: false,
            label: "15. Seguimiento Prog. Intervención del Riesgo",
            name: "idSeguimientoProgramasIntervencionRiesgo",
            queryMode: "local",
            reference: "idSeguimientoProgramasIntervencionRiesgo",
            valueField: "idSeguimientoProgramasIntervencionRiesgo"
        }
        ],
        flex: 1
    },
    {
        xtype: "fieldset",
        items: [
        { xtype: "textfield", name: "idMotivoConsulta", hidden: true, reference: "idMotivoConsulta" },
        { xtype: "textfield", name: "compMotivoConsulta", hidden: true, reference: "compMotivoConsulta" },
        {
            xtype: "grid",
            bind: {
                store: "{getMotivoConsulta}"
            },
            border: true,
            columns: [
            { dataIndex: "idMotivoConsulta", text: "Id", hidden: true },
            {
                xtype: "booleancolumn", dataIndex: "seleccionado", text: "Selección", width: 120, trueText: "Si", falseText: "No", editable: true, editor: {
                    xtype: "checkboxfield"
                }
            },
            {
                dataIndex: "codigoMotivoConsulta", text: "Código", width: 100
            },
            {
                dataIndex: "descripcionMotivoConsulta", text: "Descripción", width: 300
            }
            ],
            height: 200,
            id: "Grid-MotivosConsulta",
            loadMask: true,
            plugins: [
            { 
                type: 'grideditable', 
                enableDeleteButton: false,
                triggerEvent: 'doubletap', 
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
                        text: 'Enviar',
                        align: 'right',
                        action: 'submit'
                    }]
                }
            },
            { type: 'gridviewoptions' },
            { type: 'gridcolumnresizing' }
            ],
            title: "16. Motivo de Consulta (Afiliado)"
        }
        ],
        title: "INFORMACIÓN Y ORIENTACIÓN",
        flex: 1
    },
    {
        xtype: "fieldset",
        items: [
        { xtype: "textfield", name: "idMotivoContacto", hidden: true, reference: "idMotivoContacto" },
        { xtype: "textfield", name: "compMotivoContacto", hidden: true, reference: "compMotivoContacto" },
        {
            xtype: "grid",
            bind: {
                store: "{getMotivoContacto}"
            },
            border: true,
            columns: [
            { dataIndex: "idMotivoContacto", text: "Id", hidden: true },
            {
                xtype: "booleancolumn", dataIndex: "seleccionado", text: "Selección", width: 120, trueText: "Si", falseText: "No", editable: true, editor: {
                    xtype: "checkboxfield"
                }
            },
            {
                dataIndex: "codigoMotivoContacto", text: "Código", width: 100
            },
            {
                dataIndex: "descripcionMotivoContacto", text: "Descripción", width: 300
            }
            ],
            height: 200,
            id: "Grid-MotivosContacto",
            loadMask: true,
            plugins: [
            { 
                type: 'grideditable', 
                enableDeleteButton: false,
                triggerEvent: 'doubletap', 
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
                        text: 'Enviar',
                        align: 'right',
                        action: 'submit'
                    }]
                }
            },
            { type: 'gridviewoptions' },
            { type: 'gridcolumnresizing' }
            ],
            title: "17. Motivo de Contacto (EPS-S)"
        }
        ],
        title: "",
        flex: 1
    },
    {
        xtype: "fieldset",
        
        items: [
        {
            xtype: "numberfield",
            label: "18. No. de Autorización",
            name: "numAutorizacionPurisu"
        }
        ],
        flex: 1
    },
    {
        xtype: "fieldset",
        
        items: [
        {
            xtype: "selectfield",
            bind: {
                store: "{getGruposFocales}"
            },
            displayField: "compGruposFocales",
            editable: false,
            label: "19. Código del Grupo Focal",
            name: "idGruposFocales",
            queryMode: "local",
            reference: "idGruposFocales",
            valueField: "idGruposFocales"
        },
        {
            xtype: "fieldset",
            
            items: [
            {
                xtype: "selectfield",
                allowBlank: false,
                bind: {
                    store: "{getEjePurisu}"
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
                valueField: "idEje"
            },
            {
                xtype: "selectfield",
                allowBlank: false,
                bind: {
                    store: "{getUnidadPurisu}"
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
                valueField: "idUnidad"
            },
            {
                xtype: "selectfield",
                allowBlank: false,
                bind: {
                    store: "{getModuloPurisu}"
                },
                displayField: "compModulo",
                editable: false,
                label: "M",
                name: "idModulo",
                id: "idModulo",
                queryMode: "local",
                reference: "idModulo",
                valueField: "idModulo"            
            },
            {
                xtype: "selectfield",
                allowBlank: false,
                bind: {
                    store: "{getEjePurisu1}"
                },
                campoDependent: "idUnidad1",
                dependent: true,
                displayField: "compEje",
                editable: false,
                label: "ET",
                listeners: {
                    change: "onSelectEje1"
                },
                name: "idEje1",
                id: "idEje1",
                queryMode: "local",
                reference: "idEje1",
                valueField: "idEje",
                
            },
            {
                xtype: "selectfield",
                allowBlank: false,
                bind: {
                    store: "{getUnidadPurisu1}"
                },
                campoDependent: "idModulo1",
                dependent: true,
                displayField: "compUnidad",
                label: "U",
                editable: false,
                listeners: {
                    change: "onSelectUnidad1"
                },
                name: "idUnidad1",
                id: "idUnidad1",
                queryMode: "local",
                reference: "idUnidad1",
                valueField: "idUnidad",
            },
            {
                xtype: "selectfield",
                allowBlank: false,
                bind: {
                    store: "{getModuloPurisu1}"
                },
                displayField: "compModulo",
                editable: false,
                label: "M",
                name: "idModulo1",
                id: "idModulo1",
                queryMode: "local",
                reference: "idModulo1",
                valueField: "idModulo",
            }
            ],
            title: "PIEFI"
        }
        ],
        title: "EDUCACIÓN Y FORMACIÓN INTEGRAL",
        flex: 1
    },
    {
        xtype: "fieldset",
        
        items: [
        { xtype: "textfield", name: "idPiezasInformativas", hidden: true, reference: "idPiezasInformativas" },
        { xtype: "textfield", name: "compPiezasInformativas", hidden: true, reference: "compPiezasInformativas" },
        {
            xtype: "grid",
            bind: {
                store: "{getPiezasInformativas}"
            },
            border: true,
            columns: [
            { dataIndex: "idPiezasInformativas", text: "Id", hidden: true },
            {
                xtype: "booleancolumn", dataIndex: "seleccionado", text: "Selección", trueText: "Si", falseText: "No", width: 120, editable: true, editor: {
                    xtype: "checkboxfield"
                }
            },
            {
                dataIndex: "codigoPiezasInformativas", text: "Código", width: 100
            },
            {
                dataIndex: "descripcionPiezasInformativas", text: "Descripción", width: 300
            }
            ],
            height: 200,
            id: "Grid-PiezasInformativas",
            loadMask: true,
            plugins: [
            { 
                type: 'grideditable', 
                enableDeleteButton: false,
                triggerEvent: 'doubletap', 
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
                        text: 'Enviar',
                        align: 'right',
                        action: 'submit'
                    }]
                }
            },
            { type: 'gridviewoptions' },
            { type: 'gridcolumnresizing' }
            ],
            title: "20. Código de Piezas Informátivas Entregadas al Usuario"
        }
        ],
        flex: 1
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
                var purisuStore = Ext.getStore('itemsPurisuStore');
                if(purisuStore.data.items[0].data.numCarnetFuanAfiliado == "0" || purisuStore.data.items.length == 0) {
                    Ext.Msg.alert('Atención', 'Debe Cargar un Afiliado para continuar.');
                }else {
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
                                var infoForm = form.getValues();
                                if(infoForm.idDepartamento == 0){
                                    Ext.Msg.alert('Advertencia', "Debe seleccionar el departamento al Guardar. Por favor verifique", Ext.emptyFn);
                                    return false;
                                }
                                if(infoForm.idCiudad == null){
                                    Ext.Msg.alert('Advertencia', "Debe seleccionar la ciudad al Guardar. Por favor verifique", Ext.emptyFn);
                                    return false;
                                }
                                var ciudad = infoForm.idCiudad;
                                var departamento = infoForm.idDepartamento;
                                var listaPurisuModel = [];
                                Ext.each(purisuStore.data.items, function (ob, index, all) {
                                    var dato = ob.data;
                                    dato.idMotivoConsulta = (dato.idMotivoConsulta == "") ? "" : dato.idMotivoConsulta.split(",");
                                    dato.idMotivoContacto = (dato.idMotivoContacto == "") ? "" : dato.idMotivoContacto.split(",");
                                    dato.idPiezasInformativas = (dato.idPiezasInformativas == "") ? "" : dato.idPiezasInformativas.split(",");
                                    listaPurisuModel.push(dato);
                                });

                                var infoPurisu = {
                                    idInfoPurisu: 0,
                                    idDepartamento: departamento,
                                    idCiudad: ciudad,
                                    idUsuario: Coomuce.Util.DatosUsuario.idUsuario,
                                    fechaAtencionPurisu: new Date()
                                };

                                var purisu = {
                                    infoPurisu: infoPurisu,
                                    listaPurisuModel: listaPurisuModel
                                };

                                console.log(purisu);
                                var randomNumber = Math.floor(Math.random() * 1000000);
                                localStorage.setItem("purisu-" + randomNumber, JSON.stringify(purisu));
                                Ext.Msg.alert('Señor Usuario', 'La información ha sido guardada exitosamente.');
                                Ext.getCmp("Form-Purisu-Principal").destroy();
                            }
                        }
                    });
                }
            }
        },
        { 
            minWidth: 80, 
            text: 'Cancelar', 
            reference: "botonCancelar", 
            width: 120,
            handler: function(btn, e) {
                Ext.getCmp("Form-Purisu-Principal").destroy();
            }
        }
        ],
        flex: 1
    },
    {
        xtype: "fieldset",
        fullscreen: false,
        items: [
        {
            xtype: "grid",
            autoScroll: false,
            bind: {
                store: "{setItemsPurisu}"
            },
            border: true,
            columns: [
            {
                dataIndex: "numCarnetFuanAfiliado", text: "2. No. Carné", value: "", width: 150
            },
            {
                dataIndex: "codigoTipoIdentificacion", text: "3. Tipo Identificación del Usuario", value: "", width: 150
            },
            {
                dataIndex: "identificacionFuanAfiliado", text: "4. No. Documento de Identidad", value: "", width: 150
            },
            {
                dataIndex: "compTipoVisitaDomiciliaria", text: "5. Visita Domiciliaria", width: 150, tdCls: 'y-grid-cell-inner'
            },
            {
                xtype: "booleancolumn", dataIndex: "usisPurisu", text: "6. USIS (Oficina Municipal)", width: 110, trueText: "Si", falseText: "No"
            },
            {
                xtype: "booleancolumn", dataIndex: "ipsPrimariaPurisu", text: "7. IPS Primaria", width: 110, trueText: "Si", falseText: "No"
            },
            {
                xtype: "booleancolumn", dataIndex: "telefonicaPurisu", text: "8. Telefonica", width: 110, trueText: "Si", falseText: "No"
            },
            {
                xtype: "booleancolumn", dataIndex: "cauPurisu", text: "9. CAU (Defensor del Usuario)", width: 110, trueText: "Si", falseText: "No"
            },
            {
                xtype: "booleancolumn", dataIndex: "actividadExtramuralPurisu", text: "10. Actividades Extramurales", width: 110, trueText: "Si", falseText: "No"
            },
            {
                dataIndex: "edadFuanAfiliado", text: "11. Edad", width: 150
            },
            {
                dataIndex: "nombreTipoSexo", text: "12. Genero", width: 150
            },
            {
                dataIndex: "compProgramaResolucion412", text: "13. Programas Res. 412", width: 250, tdCls: 'y-grid-cell-inner'
            },
            {
                dataIndex: "compGrupoInteres", text: "14. Programas Grupos de Interés en Salud", width: 250, tdCls: 'y-grid-cell-inner'
            },
            {
                dataIndex: "compSeguimientoProgramasIntervencionRiesgo", text: "15. Seguimiento Prog. Intervención del Riesgo", width: 250, tdCls: 'y-grid-cell-inner'
            },
            {
                cellWrap: true, dataIndex: "compMotivoConsulta", text: "16. Motivo de Consulta (Afiliado)", width: 250, tdCls: 'y-grid-cell-inner'
            },
            {
                cellWrap: true, dataIndex: "compMotivoContacto", text: "17. Motivo de Contacto (EPS-S)", width: 250, tdCls: 'y-grid-cell-inner'
            },
            {
                dataIndex: "numAutorizacionPurisu", text: "18. No. de Autorización", width: 150
            },
            {
                dataIndex: "compGruposFocales", text: "19. Código del Grupo Focal", width: 150, tdCls: 'y-grid-cell-inner'
            },
            {
                dataIndex: "compEje", text: "ET", width: 200, tdCls: 'y-grid-cell-inner'
            },
            {
                dataIndex: "compUnidad", text: "U", width: 200, tdCls: 'y-grid-cell-inner'
            },
            {
                dataIndex: "compModulo", text: "M", width: 200, tdCls: 'y-grid-cell-inner'
            },
            {
                dataIndex: "compEje1", text: "ET", width: 200, tdCls: 'y-grid-cell-inner'
            },
            {
                dataIndex: "compUnidad1", text: "U", width: 200, tdCls: 'y-grid-cell-inner'
            },
            {
                dataIndex: "compModulo1", text: "M", width: 200, tdCls: 'y-grid-cell-inner'
            }
            ],
            columnLines: true,
            height: 350,
            id: "Grid-Purisu-Principal",
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
            sortableColumns: false,
            flex: 1
        }
        ],
        width: 1024
    }
    ]
});