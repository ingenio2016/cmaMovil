Ext.define("CoomuceMovil.view.CaracterizacionPoblacional.Ifppir", {
    extend: "Ext.form.Panel",
    id: "Form-Ifppir-Principal",
    xtype: "ifppir",
    requires: [
    "Ext.grid.Grid",
    'Ext.grid.plugin.Editable',
    'Ext.grid.plugin.ViewOptions',
    'Ext.grid.plugin.ColumnResizing',
    'Ext.grid.plugin.MultiSelection',

    "CoomuceMovil.view.CaracterizacionPoblacional.IfppirController",
    "CoomuceMovil.view.CaracterizacionPoblacional.IfppirModel"
    ],
    controller: "caracterizacionpoblacional-ifppir",
    viewModel: { type: "caracterizacionpoblacional-ifppir" },
    bodyPadding: 10,
    defaults: { anchor: "100%" },
    fullscreen: true,
    items: [
    {
        layout: 'hbox',
        items: [
        { xtype: "button", minWidth: 80, text: "Nueva Ficha", iconCls: "x-fa fa-file-o", handler: "onBotonNuevaFichaClick", ui: "action", reference: "botonNuevaFicha", width: 200 },
        { xtype: "button", minWidth: 80, text: "Sincronizar Datos", iconCls: "fa fa-cloud-upload", handler: "onBotonSincronizarClick", ui: "action", reference: "botonSincronizar", width: 200 },
        { xtype: "button", minWidth: 80, text: "Eliminar Datos", iconCls: "fa fa-trash", handler: "onBotonDeleteLCClick", ui: "action", reference: "botonEliminar", width: 200 }        
        ]},
        {
            xtype: "fieldset",
            style: {
                "background-color": "#FFFFFF"
            },
            title: "Familiar Más Cercano",
            items: [
            {
                xtype: "button",
                componentReference: [
                "idFuanAfiliado", "codigoTipoIdentificacion", "identificacionFuanAfiliado", "nombreCompletoAfiliado", "fechaNacimientoFuanAfiliado",
                "compDepartamento", "compCiudad", "direccionFuanAfiliado", "telefonoFuanAfiliado",
                "celularFuanAfiliado", "puntajeSisbenFuanAfiliado", "edadFuanAfiliado", "nombreTipoZona", "nombreTipoSexo", "numCarnetFuanAfiliado"
                ],
                disabled: true,
                disabledBySexo: ["gestanteIfppir", "furIfppir", "fppIfppir", "gIfppir", "pIfppir", "cIfppir", "aIfppir", "nacidoVivoIfppir"],
                handler: Coomuce.Util.buscarAfiliado,
                iconCls: "x-fa fa-binoculars",
                preguntasIdentificacion: true,
                reference: "botonBuscarAfiliado",
                ui: "action",
                tooltip: "Lista de Afiliados",
                flex: 1
            },
            {
                xtype: "textfield",
                label: "Tipo Diligenciamiento",
                name: "tipoDiligenciamientoIfppir",
                disabled: true,
                readOnly: true,
                value: "Personal",
                id: "tipoDiligenciamientoIfppir"
            },
            {
                xtype: "textfield",
                label: "Nombre del Afiliado",
                name: "nombreCompletoAfiliado",
                disabled: true,
                readOnly: true,
                reference: "nombreCompletoAfiliado",
                id: "nombreCompletoAfiliado"
            },
            {
                xtype: "textfield",
                label: "Tipo documento <br />de identidad",
                disabled: true,
                name: "codigoTipoIdentificacion",
                readOnly: true,
                reference: "codigoTipoIdentificacion",
                id: "codigoTipoIdentificacion"                  
            },
            { xtype: "numberfield", hidden: true, name: "idFuanAfiliado", id: "idFuanAfiliado" },
            {
                xtype: "textfield",
                label: "Documento No.",
                disabled: true,
                name: "identificacionFuanAfiliado",
                readOnly: true,
                reference: "identificacionFuanAfiliado",
                id: "identificacionFuanAfiliado"
            },
            {
                xtype: "textfield",
                label: "Carné",
                disabled: true,
                name: "numCarnetFuanAfiliado",
                readOnly: true,
                reference: "numCarnetFuanAfiliado",
                id: "numCarnetFuanAfiliado"
            },
            {
                xtype: "textfield",
                label: "Departamento",
                disabled: true,
                name: "compDepartamento",
                readOnly: true,
                reference: "compDepartamento",
                id: "compDepartamento"
            },
            {
                xtype: "datepickerfield",
                label: "Fecha de nacimiento",
                disabled: true,
                format: "d/m/Y",
                name: "fechaNacimientoFuanAfiliado",
                readOnly: true,
                reference: "fechaNacimientoFuanAfiliado",
                id: "fechaNacimientoFuanAfiliado"
            },
            {
                xtype: "textfield",
                disabled: true,
                label: "Municipio",
                name: "compCiudad",
                readOnly: true,
                reference: "compCiudad",
                id: "compCiudad"
            },
            {
                xtype: "textfield",
                label: "Dirección",
                disabled: true,
                name: "direccionFuanAfiliado",
                readOnly: true,
                reference: "direccionFuanAfiliado",
                id: "direccionFuanAfiliado"
            },
            {
                xtype: "textfield",
                disabled: true,
                label: "Teléfono",
                name: "telefonoFuanAfiliado",
                readOnly: true,
                reference: "telefonoFuanAfiliado",
                id: "telefonoFuanAfiliado"
            },
            {
                xtype: "textfield",
                disabled: true,
                label: "Celular",
                name: "celularFuanAfiliado",
                readOnly: true,
                reference: "celularFuanAfiliado",
                id: "celularFuanAfiliado"
            },
            {
                xtype: "textfield",
                disabled: true,
                label: "Ips Primaria",
                name: "ipsPrimariaIfppir",
                reference: "ipsPrimariaIfppir",
                id: "ipsPrimariaIfppir"
            },
            {
                xtype: "numberfield",
                disabled: true,
                label: "Edad",
                hideTrigger: true,
                name: "edadFuanAfiliado",
                readOnly: true,
                reference: "edadFuanAfiliado",
                id: "edadFuanAfiliado"
            },
            {
                xtype: "textfield",
                disabled: true,
                label: "Sisben",
                name: "puntajeSisbenFuanAfiliado",
                readOnly: true,
                reference: "puntajeSisbenFuanAfiliado",
                id: "puntajeSisbenFuanAfiliado"
            },
            {
                xtype: "textfield",
                disabled: true,
                label: "Raza",
                name: "razaIfppir",
                reference: "razaIfppir",
                id: "razaIfppir"                
            },
            {
                xtype: "textfield",
                disabled: true,
                label: "Escolaridad",
                name: "escolaridadIfppir",
                reference: "escolaridadIfppir",
                id: "escolaridadIfppir"
            },
            {
                xtype: "textfield",
                disabled: true,
                label: "Zona",
                name: "nombreTipoZona",
                readOnly: true,
                reference: "nombreTipoZona",
                id: "nombreTipoZona"
            },
            {
                xtype: "textfield",
                disabled: true,
                label: "Sexo",
                name: "nombreTipoSexo",
                readOnly: true,
                reference: "nombreTipoSexo",
                id: "nombreTipoSexo"
            }
            ]
        },
        {
            xtype: "fieldset",
            style: {
                "background-color": "#FFFFFF"
            },
            title: "Familiar Más Cercano",
            items: [
            {
                xtype: "textfield",
                disabled: true,
                label: "Nombre",
                name: "familiarCercanoIfppir",
                reference: "familiarCercanoIfppir",
                id: "familiarCercanoIfppir"
            },
            {
                xtype: "textfield",
                disabled: true,
                label: "Teléfono",
                name: "telefonoFamiliarIfppir",
                reference: "telefonoFamiliarIfppir",
                id: "telefonoFamiliarIfppir"
            }
            ]
        },
        {
            xtype: "fieldset",
            style: {
                "background-color": "#FFFFFF"
            },
            title: "Otros Datos",
            items: [
            {
                xtype: "checkboxfield",
                disabled: true,
                label: "Gestante",
                listeners: {
                    change: "onChangeCheck"
                },
                name: "gestanteIfppir",
                reference: "gestanteIfppir",
                value: false,
                id: "gestanteIfppir"
            },
            {
                xtype: "datepickerfield",
                disabled: true,
                format: "d/m/Y",
                label: "Fecha Última Menstruación",
                listeners: {
                    select: "onSelectDate"
                },
                name: "furIfppir",
                readOnly: true,
                reference: "furIfppir",
                id: "furIfppir"
            },
            {
                xtype: "datepickerfield",
                disabled: true,
                format: "d/m/Y",
                label: "Fecha Probable de Parto",
                name: "fppIfppir",
                readOnly: true,
                reference: "fppIfppir",
                id: "fppIfppir"
            },
            {
                xtype: "textfield",
                disabled: true,
                label: "Gestaciones",
                name: "gIfppir",
                reference: "gIfppir",
                id: "gIfppir"
            },
            {
                xtype: "textfield",
                disabled: true,
                label: "Partos",
                name: "pIfppir",
                reference: "pIfppir",
                id: "pIfppir"
            },
            {
                xtype: "textfield",
                disabled: true,
                label: "Cesáreas",
                name: "cIfppir",
                reference: "cIfppir",
                id: "cIfppir"
            },
            {
                xtype: "textfield",
                disabled: true,
                label: "Abortos",
                name: "aIfppir",
                reference: "aIfppir",
                id: "aIfppir"
            },
            {
                xtype: "numberfield",
                allowDecimals: false,
                disabled: false,
                label: "Nacido Vivo",
                name: "nacidoVivoIfppir",
                reference: "nacidoVivoIfppir",
                id: "nacidoVivoIfppir"
            }
            ]
        },
        {
            xtype: "fieldset",
            style: {
                "background-color": "#FFFFFF"
            },
            items: [
            {
                xtype: "datepickerfield",
                disabled: true,
                format: "d/m/Y",
                label: "Fecha de aplicación de <br/>toma de datos en salud",
                name: "fechaAplicacionIfppir",
                reference: "fechaAplicacionIfppir",
                id: "fechaAplicacionIfppir"
            },
            {
                xtype: "numberfield",
                allowDecimals: true,
                decimalPrecision: 2,
                disabled: true,
                label: "Peso (kg)",
                hideTrigger: true,
                listeners: {
                    change: "onChangeNumber"
                },
                name: "pesoIfppir",
                reference: "pesoIfppir",
                id: "pesoIfppir",
                value: 0
            },
            {
                xtype: "numberfield",
                allowDecimals: false,
                disabled: true,
                label: "Altura (cm)",
                listeners: {
                    change: "onChangeNumber"
                },
                name: "tallaIfppir",
                reference: "tallaIfppir",
                id: "tallaIfppir",
                value: 0
            },
            {
                xtype: "numberfield",
                allowDecimals: true,
                decimalPrecision: 2,
                disabled: true,
                label: "Indice de masa corporal",
                name: "masaCorporalIfppir",
                readOnly: true,
                reference: "masaCorporalIfppir",
                id: "masaCorporalIfppir"
            },
            {
                xtype: "numberfield",
                allowDecimals: false,
                disabled: true,
                label: "Perímetro Abdominal (cm)",
                name: "perimetroAbdominalIfppir",
                reference: "perimetroAbdominalIfppir",
                id: "perimetroAbdominalIfppir",
                value: 0
            }
            ]
        },
        {
            xtype: "fieldset",
            style: {
                "background-color": "#FFFFFF"
            },
            title: "Tensión Arterial",
            items: [
            {
                xtype: "numberfield",
                allowDecimals: false,
                disabled: true,
                label: "Sistólica (mm Hg)",
                minValue: 100,
                maxValue: 230,
                name: "sistolicaIfppir",
                reference: "sistolicaIfppir",
                id: "sistolicaIfppir",
                value: 0
            },
            {
                xtype: "numberfield",
                allowDecimals: false,
                disabled: true,
                label: "Diastólica (mm Hg)",
                minValue: 50,
                maxValue: 140,
                name: "diastolicaIfppir",
                reference: "diastolicaIfppir",
                id: "diastolicaIfppir",
                value: 0
            }
            ]
        },
        {
            xtype: "fieldset",
            style: {
                "background-color": "#FFFFFF"
            },
            title: "Colesterol y Glicemia",
            items: [
            {
                xtype: "numberfield",
                disabled: true,
                label: "Colesterol Total",
                name: "colesterolTotalIfppir",
                reference: "colesterolTotalIfppir",
                id: "colesterolTotalIfppir",
                value: 0
            },
            {
                xtype: "numberfield",
                disabled: true,
                label: "Colesterol LDL",
                name: "colesterolLdlIfppir",
                reference: "colesterolLdlIfppir",
                id: "colesterolLdlIfppir",
                value: 0
            },
            {
                xtype: "numberfield",
                disabled: true,
                label: "Colesterol HDL",
                name: "colesterolHdlIfppir",
                reference: "colesterolHdlIfppir",
                id: "colesterolHdlIfppir",
                value: 0                        
            },
            {
                xtype: "textfield",
                disabled: true,
                label: "Glicemia",
                name: "glicemiaIfppir",
                reference: "glicemiaIfppir",
                id: "glicemiaIfppir"                        
            }
            ]
        },
        {
            xtype: "fieldset",
            style: {
                "background-color": "#FFFFFF"
            },
            title: "Sección de Preguntas",
            items: [
            {
                xtype: "grid",
                bind: {
                    store: "{getPreguntasFactor}"
                },
                border: true,
                columns: [
                {
                    xtype: 'gridheadergroup',
                    text: "Factor de Riesgo",
                    columns: [
                    { dataIndex: "idPregunta", text: "Id Pregunta", hidden: true },
                    { dataIndex: "codigoPregunta", text: "Código", flex: 1 },
                    { dataIndex: "descripcionPregunta", text: "Pregunta", flex: 9 }
                    ],
                    flex: 10
                },
                {
                    xtype: 'gridheadergroup',
                    text: "Respuesta",
                    columns: [
                    {
                        xtype: "booleancolumn", dataIndex: "respuestaSiPregunta", text: "Si", trueText: "X", falseText: " ", editable: true, editor: {
                            xtype: "checkboxfield"
                        },
                        flex: 1
                    },
                    {
                        xtype: "booleancolumn", dataIndex: "respuestaNoPregunta", text: "No", trueText: "X", falseText: " ", editable: true, editor: {
                            xtype: "checkboxfield"
                        },
                        flex: 1
                    }
                    ],
                    flex: 2
                }
                ],

                grouped: true,
                height: 400,
                id: "Grid-Ifppir-Principal",
                plugins: [
                {
                    type: 'grideditable',
                    triggerEvent: 'doubletap', 
                    enableDeleteButton: false,
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
                    },
                    defaultFormConfig: {
                        xtype: 'formpanel',
                        modal: true,
                        scrollable: true,
                        items: {
                            xtype: 'fieldset'
                        }
                    },
                    formConfig: {
                       items: [{
                        xtype: 'checkboxfield',
                        name : 'respuestaNoPregunta',
                        value: true,
                        label: 'No',
                        checked: true
                    },
                    {
                        xtype: 'checkboxfield',
                        name : 'respuestaSiPregunta',
                        value: true,
                        label: 'Sí'
                    }]
                }
            },
            {
                type: 'gridmultiselection'
            }
            ]
        }
        ]
    },
    {
        xtype: "fieldset",
        style: {
            "background-color": "#FFFFFF"
        },
        title: "Observaciones",
        items: [
        {
            xtype: "textareafield",
            disabled: true,
            label: "Observaciones",
            name: "observacionIfppir",
            reference: "observacionIfppir",
            id: "observacionIfppir"
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
            disabled: false, 
            minWidth: 80, 
            text: 'Guardar', 
            handler: 'onBotonGuardarClick', 
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
                            var infoIfppir = form.getValues();
                            if(infoIfppir.idFuanAfiliado == 0 || infoIfppir.idFuanAfiliado == undefined || infoIfppir.nombreCompletoAfiliado == ""){
                                Ext.Msg.alert('Advertencia', "Los datos del Usuario estan incompletos. Por favor verifique", Ext.emptyFn);
                                return false;
                            }
                            if(infoIfppir.pesoIfppir == "" || infoIfppir.pesoIfppir == null) {
                                Ext.Msg.alert('Advertencia', "El campo peso es requerido", Ext.emptyFn);
                                return false;
                            }
                            if(infoIfppir.tallaIfppir == "" || infoIfppir.tallaIfppir == null) {
                                Ext.Msg.alert('Advertencia', "El campo altura es requerido", Ext.emptyFn);
                                return false;
                            }
                            if(infoIfppir.perimetroAbdominalIfppir == "" || infoIfppir.perimetroAbdominalIfppir == null) {
                                Ext.Msg.alert('Advertencia', "El campo perimetro abdominal es requerido", Ext.emptyFn);
                                return false;
                            }
                            if(infoIfppir.sistolicaIfppir < 100 || infoIfppir.sistolicaIfppir > 230) {
                                Ext.Msg.alert('Advertencia', "El campo sistólica debe ser mayor a 100 y menor a 230", Ext.emptyFn);
                                return false;
                            }
                            if(infoIfppir.diastolicaIfppir < 50 || infoIfppir.diastolicaIfppir > 140) {
                                Ext.Msg.alert('Advertencia', "El campo diastólica debe ser mayor a 50 y menor a 140", Ext.emptyFn);
                                return false;
                            }
                            if(infoIfppir.gestanteIfppir){
                                if(infoIfppir.gestanteIfppir == "on"){
                                    if(infoIfppir.furIfppir == "") {
                                        Ext.Msg.alert('Advertencia', "El campo fecha ultima menstruación es requerido", Ext.emptyFn);
                                        return false;
                                    }
                                    if(infoIfppir.gIfppir == "") {
                                        Ext.Msg.alert('Advertencia', "El campo gestaciones es requerido", Ext.emptyFn);
                                        return false;
                                    }
                                    if(infoIfppir.pIfppir == "") {
                                        Ext.Msg.alert('Advertencia', "El campo partos es requerido", Ext.emptyFn);
                                        return false;
                                    }
                                    if(infoIfppir.cIfppir == "") {
                                        Ext.Msg.alert('Advertencia', "El campo cesareas es requerido", Ext.emptyFn);
                                        return false;
                                    }
                                    if(infoIfppir.aIfppir == "") {
                                        Ext.Msg.alert('Advertencia', "El campo abortos es requerido", Ext.emptyFn);
                                        return false;
                                    }
                                    if(infoIfppir.nacidoVivoIfppir == "") {
                                        Ext.Msg.alert('Advertencia', "El campo nacido vivo es requerido", Ext.emptyFn);
                                        return false;
                                    }
                                }
                            }
                            infoIfppir.numCarneIfppir = infoIfppir.numCarnetFuanAfiliado;
                            infoIfppir.idInfoIfppir = 0; // inicializo este campo que no se captura en pantalla
                            infoIfppir.gestanteIfppir = (infoIfppir.gestanteIfppir === "on" ? true : false);
                            infoIfppir.pesoIfppir = parseFloat(infoIfppir.pesoIfppir).toFixed(2);;
                            infoIfppir.tallaIfppir = parseInt(infoIfppir.tallaIfppir);
                            infoIfppir.masaCorporalIfppir = parseFloat(infoIfppir.masaCorporalIfppir).toFixed(2);
                            infoIfppir.perimetroAbdominalIfppir = parseInt(infoIfppir.perimetroAbdominalIfppir);
                            infoIfppir.sistolicaIfppir = parseInt(infoIfppir.sistolicaIfppir);
                            infoIfppir.diastolicaIfppir = parseInt(infoIfppir.diastolicaIfppir);
                            infoIfppir.colesterolLdlIfppir = (infoIfppir.colesterolLdlIfppir)?String(infoIfppir.colesterolLdlIfppir):"0";
                            infoIfppir.colesterolHdlIfppir = (infoIfppir.colesterolHdlIfppir)?String(infoIfppir.colesterolHdlIfppir):"0";
                            infoIfppir.colesterolTotalIfppir = (infoIfppir.colesterolTotalIfppir)?String(infoIfppir.colesterolTotalIfppir):"0";
                            infoIfppir.idUsuario = Coomuce.Util.DatosUsuario.idUsuario;
                            infoIfppir.firmaIfppir = "";
                            
                            console.log(infoIfppir);

                            var grid = Ext.getCmp('Grid-Ifppir-Principal');
                            var storeGrid = grid.getStore();

                            var listaIfppirModel = [];
                            var itemsValidar = [];

                            Ext.each(storeGrid.data.items, function (ob, index, all) {
                            //if (ob.dirty) {
                                //if (ob.phantom) {
                                    listaIfppirModel.push(ob.data);
                                    itemsValidar.push(ob);
                                //}
                                //else {
                                //    viejos.push(ob.data);
                                //}

                                //itemsValidar.push(ob);
                            //}
                        });
                            
                        // solo validar cuando se edita o adiciona registros
                        if (itemsValidar.length > 0) {
                            var validator = Coomuce.Util.dataValidate(itemsValidar);

                            if (!validator.success) {
                                Ext.Msg.alert('Advertencia', validator.msg, Ext.emptyFn);
                                return false;
                            }
                        }

                        var ifppir = {
                            infoIfppir: infoIfppir,
                            listaIfppirModel: listaIfppirModel
                        };

                        localStorage.setItem("ifppir-" + infoIfppir.idFuanAfiliado, JSON.stringify(ifppir));
                        Ext.Msg.alert('Señor Usuario', "La información ha sido guardada exitosamente", Ext.emptyFn);
                        Ext.getCmp("Form-Ifppir-Principal").destroy();
                    }
                }
            });
}
},
{ 
    disabled: false, 
    minWidth: 80, 
    text: 'Cancelar', 
    reference: "botonCancelar", 
    width: 120,
    handler: function(btn, e) {
        Ext.getCmp("Form-Ifppir-Principal").destroy();
    }
}
]
}
]
});