Ext.define("CoomuceMovil.view.CaracterizacionPoblacional.Hfdfr", {
    extend: "Ext.form.Panel",
    id: "Form-Hfdfr-Principal",
    xtype: "hfdfr",
    requires: [
    "Ext.grid.Grid",
    'Ext.grid.plugin.Editable',
    'Ext.grid.plugin.ViewOptions',
    'Ext.grid.plugin.ColumnResizing',
    'Ext.grid.plugin.MultiSelection',

    "CoomuceMovil.view.CaracterizacionPoblacional.HfdfrController",
    "CoomuceMovil.view.CaracterizacionPoblacional.HfdfrModel"
    ],
    controller: "caracterizacionpoblacional-hfdfr",
    viewModel: { type: "caracterizacionpoblacional-hfdfr" },
    items: [
    {
        xtype: "fieldset",
        style: {
            "background-color": "#FFFFFF"
        },
        items: [
        { xtype: "button", minWidth: 80, text: "Sincronizar Datos", iconCls: "fa fa-cloud-upload", handler: "onBotonSincronizarClick", ui: "action", reference: "botonSincronizar", width: 200 },
        { xtype: "button", minWidth: 80, text: "Eliminar Datos", iconCls: "fa fa-trash", handler: "onBotonDeleteLCClick", ui: "action", reference: "botonEliminar", width: 200 }
        ]
    },
    {
        xtype: "fieldset",
        style: {
            "background-color": "#FFFFFF"
        },
        items: [
        {
            xtype: "button",
            componentReference: [
            "idFuanAfiliado", "codigoTipoIdentificacion", "identificacionFuanAfiliado",
            "nombreCompletoAfiliado", "puntajeSisbenFuanAfiliado", "numCarnetFuanAfiliado",
            "idDepartamento", "compDepartamento", "idCiudad", "compCiudad"
            ],
            handler: Coomuce.Util.buscarAfiliadoHistoria,
            iconCls: "x-fa fa-binoculars",
            ui: "action",
            tooltip: "Lista de Afiliados",
            flex: 1
        },
        {
            xtype: "textfield",
            label: "Tipo Diligenciamiento",
            name: "tipoDiligenciamientoHfdfr",
            readOnly: true,
            value: "Personal",
            id: "tipoDiligenciamientoHfdfr"
        },
        { 
            xtype: "numberfield", 
            name: "idDepartamento", 
            hidden: true, 
            reference: "idDepartamento",
            id: "idDepartamento" 
        },
        { 
            xtype: "textfield", 
            label: "Departamento", 
            name: "compDepartamento", 
            readOnly: true, 
            reference: "compDepartamento",
            id: "compDepartamento" 
        },
        { 
            xtype: "textfield", 
            label: "Barrio", 
            name: "barrioInfoHfdfr",
            reference: "barrioInfoHfdfr",
            id: "barrioInfoHfdfr",
            value: "",
            readOnly: true
        },
        { 
            xtype: "numberfield", 
            name: "idCiudad", 
            hidden: true, 
            reference: "idCiudad",
            id: "idCiudad" 
        },
        { 
            xtype: "textfield", 
            label: "Municipio", 
            name: "compCiudad", 
            readOnly: true, 
            reference: "compCiudad",
            id: "compCiudad" 
        },
        { 
            xtype: "textfield", 
            label: "Teléfono", 
            name: "telefonoInfoHfdfr",
            reference: "telefonoInfoHfdfr",
            id: "telefonoInfoHfdfr",
            value: "",
            readOnly: true 
        },
        { 
            xtype: "textfield", 
            label: "Vereda", 
            name: "veredaInfoHfdfr",
            reference: "veredaInfoHfdfr",
            id: "veredaInfoHfdfr",
            value: "",
            readOnly: true 
        }
        ]
    },
    {
        xtype: "fieldset",
        style: {
            "background-color": "#FFFFFF"
        },
        title: "Información Familiar",
        items: [
        {
            xtype: "textfield",
            label: "Entrevista A",
            name: "nombreCompletoAfiliado",
            readOnly: true,
            reference: "nombreCompletoAfiliado",
            id: "nombreCompletoAfiliado"
        },
        {
            xtype: "textfield",
            label: "Tipo documento de identidad",
            name: "codigoTipoIdentificacion",
            readOnly: true,
            reference: "codigoTipoIdentificacion",
            id: "codigoTipoIdentificacion"
        },
        {
            xtype: "textfield",
            label: "Carnet",
            name: "numCarnetFuanAfiliado",
            reference: "numCarnetFuanAfiliado",
            readOnly: true,
            id: "numCarnetFuanAfiliado"
        },
        { 
            xtype: "numberfield", 
            hidden: true, 
            name: "idFuanAfiliado",
            reference: "idFuanAfiliado",
            id: "idFuanAfiliado" 
        },
        { 
            xtype: "textfield", 
            label: "Documento No.", 
            name: "identificacionFuanAfiliado", 
            readOnly: true,
            reference: "identificacionFuanAfiliado",
            id: "identificacionFuanAfiliado" 
        },
        {
            xtype: "textfield",
            label: "Sisben",
            name: "puntajeSisbenFuanAfiliado",
            readOnly: true,
            reference: "puntajeSisbenFuanAfiliado",
            id: "puntajeSisbenFuanAfiliado",
            value: ""
        },
        {
            xtype: "selectfield",
            bind: {
                store: "{getProcedencia}"
            },
            displayField: "compProcedencia",
            editable: false,
            label: "1. PROCEDENCIA DE LA FAMILIA",
            name: "pregunta1",
            queryMode: "local",
            reference: "idProcedencia",
            id: "pregunta1",
            valueField: "compProcedencia"
        },
        {
            xtype: "selectfield",
            bind: {
                store: "{getTipoZona}"
            },
            displayField: "compTipoZona",
            editable: false,
            label: "2. UBICACIÓN ACTUAL DE LA FAMILIA",
            name: "pregunta2",
            queryMode: "local",
            reference: "idTipoZona",
            id: "pregunta2",
            valueField: "compTipoZona"
        },
        {
            xtype: "numberfield",
            label: "3. NUMERO DE PERSONAS QUE VIVEN EN EL DOMICILIO",
            name: "pregunta3",
            reference: "pregunta3",
            id: "pregunta3",
            value: 0
        },
        {
            xtype: "numberfield",
            label: "4. NUMERO DE PERSONAS DE 6 A 18 AÑOS: ",
            name: "pregunta4",
            reference: "pregunta4",
            id: "pregunta4",
            value: 0
        },
        {
            xtype: "numberfield",
            label: "5. NUMERO DE PERSONAS DE 6 A 18 AÑOS QUE ESTUDIAN",
            name: "pregunta5",
            reference: "pregunta5",
            id: "pregunta5",
            value: 0
        },
        {
            xtype: "numberfield",
            label: "6. NUMERO DE PERSONAS DE 6 A 14 AÑOS",
            name: "pregunta6",
            reference: "pregunta6",
            id: "pregunta6",
            value: 0
        },
        {
            xtype: "numberfield",
            label: "7. NUMERO DE PERSONAS DE 6 A 14 AÑOS QUE TRABAJAN",
            name: "pregunta7",
            reference: "pregunta7",
            id: "pregunta7",
            value: 0
        },
        {
            xtype: 'fieldset',
            defaults: { xtype: "checkboxfield" },
            title: '8. QUIEN APORTA ECONOMICAMENTE EN LA FAMILIA',
            items: [
            { label: 'MADRE', name: 'pregunta8opcionMadre' },
            { label: 'PADRE', name: 'pregunta8opcionPadre' },
            { label: 'HIJOS', name: 'pregunta8opcionHijos' },
            { label: 'OTRO', name: 'pregunta8opcionOtros' }
            ]
        },
        {
            xtype: "textfield",
            label: "9. NUMEROS DE PERSONAS MAYORES DE 65 AÑOS",
            name: "pregunta9",
            reference: "pregunta9",
            id: "pregunta9",
            value: "0"
        },
        {
            xtype: "textfield",
            label: "10. NUMERO DE PERSONAS MAYORES DE 65 AÑOS QUE TRABAJAN",
            name: "pregunta10",
            reference: "pregunta10",
            id: "pregunta10",
            value: "0"
        },
        {
            xtype: "textfield",
            label: "11. NUMERO DE PERSONAS DE 15 A 65 AÑOS",
            name: "pregunta11",
            reference: "pregunta11",
            id: "pregunta11",
            value: "0"
        },
        {
            xtype: "textfield",
            label: "12. NUMERO DE PERSONAS DE 15 A 65 AÑOS QUE TRABAJAN",
            name: "pregunta12",
            reference: "pregunta12",
            id: "pregunta12",
            value: "0"
        },
        {
            xtype: "textfield",
            label: "13. TOTAL DE INGRESOS MENSUALES EN LA FAMILIA",
            name: "pregunta13",
            reference: "pregunta13",
            id: "pregunta13",
            value: "0"
        },
        {
            xtype: "grid",
            bind: { store: "{getNivelEducativo}" },
            border: true,
            columns: [
            { dataIndex: "compNivelEducativo", text: "", flex: 3 },
            {
                xtype: "booleancolumn", dataIndex: "madreNivelEducativo", text: "Madre", trueText: "Si", falseText: "No", editable: true, editor: {
                    xtype: "checkboxfield"
                },
                flex: 1
            },
            {
                xtype: "booleancolumn", dataIndex: "padreNivelEducativo", text: "Padre", trueText: "Si", falseText: "No", editable: true, editor: {
                    xtype: "checkboxfield"
                },
                flex: 1
            }
            ],
            columnLines: true,
            height: 300,
            flex: 1,
            id: "Grid-Pregunta14",
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
                }
            },
            { type: 'gridviewoptions' },
            { type: 'gridcolumnresizing' }
            ],

            title: "14. NIVEL EDUCATIVO PADRES"
        }
        ]
    },
    {
        xtype: "fieldset",
        style: {
            "background-color": "#FFFFFF"
        },
        html: "<b>15. CONDICIONES DE LA VIVIENDA</b><br />SEÑALE UNA OPCION",
        items: [
        {
            xtype: "selectfield",
            bind: { store: "{getCondicionVivienda}" },
            displayField: "nombreCondicionVivienda",
            editable: false,
            label: "A - EL PISO DE LA VIVIENDA ESTA CONSTRUIDO EN SU MAYOR PORCENTAJE EN",
            name: "pregunta15opcionA",
            queryMode: "local",
            valueField: "nombreCondicionVivienda",
            id: "pregunta15opcionA"
        },
        {
            xtype: "selectfield",
            bind: { store: "{getCondicionVivienda}" },
            displayField: "nombreCondicionVivienda",
            editable: false,
            label: "B - EL TECHO DE LA VIVIENDA ESTA CONSTRUIDO EN SU MAYOR PORCENTAJE EN",
            name: "pregunta15opcionB",
            queryMode: "local",
            valueField: "nombreCondicionVivienda",
            id: "pregunta15opcionB"
        },
        {
            xtype: "selectfield",
            bind: { store: "{getCondicionVivienda}" },
            displayField: "nombreCondicionVivienda",
            editable: false,
            label: "C - LAS PAREDES DE LA VIVIENDA ESTAN CONSTRUIDAS EN SU MAYOR PORCENTAJE EN",
            name: "pregunta15opcionC",
            queryMode: "local",
            valueField: "nombreCondicionVivienda",
            id: "pregunta15opcionC"
        },
        {
            xtype: "numberfield",
            label: "D - NUMERO DE HABITACIONES DEL DOMICILIO",
            name: "pregunta15opcionD",
            id: "pregunta15opcionD",
            value: "0"
        },
        {
            xtype: "numberfield",
            label: "E - NUMERO DE CAMAS EN EL DOMICILIO",
            name: "pregunta15opcionE",
            id: "pregunta15opcionE",
            value: "0"
        },
        {
            xtype: "selectfield",
            bind: { store: "{getTipoVivienda}" },
            displayField: "compTipoVivienda",
            editable: false,
            label: "F - TIPO DE VIVIENDA",
            name: "pregunta15opcionF",
            queryMode: "local",
            valueField: "compTipoVivienda",
            id: "pregunta15opcionF"
        },
        {
            xtype: "selectfield",
            bind: { store: "{getTenencia}" },
            displayField: "compTenencia",
            editable: false,
            label: "G - TENENCIA",
            name: "pregunta15opcionG",
            queryMode: "local",
            valueField: "compTenencia",
            id: "pregunta15opcionG"
        }
        ]
    },
    {
        xtype: 'fieldset',
        defaults: { xtype: "radiofield" },
        title: '16. LA FAMILIA COCINA EN EL MISMO SITIO DONDE DUERME',
        items: [
        { label: 'A - SI', name: "pregunta16", inputValue: "SI", value: "SI" },
        { label: 'B - NO', name: "pregunta16", inputValue: "NO", value: "NO" },
        { label: 'C - N.A', name: "pregunta16", inputValue: "N.A", value: "N.A", checked: true }
        ]
    },
    {
        xtype: 'fieldset',
        defaults: { xtype: "radiofield" },
        items: [
        {
            xtype: "selectfield",
            bind: { store: "{getTipoCombustible}" },
            displayField: "compTipoCombustible",
            editable: false,
            label: "17. EL TIPO DE COMBUSTIBLE UTILIZADO PARA COCINAR ES",
            name: "pregunta17",
            queryMode: "local",
            valueField: "compTipoCombustible",
            id: "pregunta17"
        },
        {
            xtype: "selectfield",
            bind: { store: "{getTratamientoAgua}" },
            displayField: "compTratamientoAgua",
            editable: false,
            label: "18. TIPO DE TRATAMIENTO CASERO DEL AGUA",
            name: "pregunta18",
            queryMode: "local",
            valueField: "compTratamientoAgua",
            id: "pregunta18"
        }
        ]
    },
    {
        xtype: 'fieldset',
        defaults: { xtype: "radiofield" },
        title: '19. LOS RECIPIENTES UTILIZADOS PARA EL ALMACENAMIENTO SE DESINFECTAN PERIODICAMENTE',
        items: [
        { label: 'A - SI', name: "pregunta19", inputValue: "SI", value: "SI" },
        { label: 'B - NO', name: "pregunta19", inputValue: "NO", value: "NO" },
        { label: 'C - N.A', name: "pregunta19", inputValue: "N.A", value: "N.A", checked: true }
        ]
    },
    {
        xtype: 'fieldset',
        defaults: { xtype: "checkboxfield" },
        title: '20. LA VIVIENDA CUENTA CON SERVICIOS DE',
        items: [
        { label: 'A - LUZ', name: "pregunta20opcionA" },
        { label: 'B - AGUA', name: "pregunta20opcionB" },
        { label: 'C - TELEFONO', name: "pregunta20opcionC" },
        { label: 'D - ALCANTARILLADO', name: "pregunta20opcionD" },
        { label: 'E - RECOLECCION BASURAS', name: "pregunta20opcionE" },
        { label: 'F - NO APLICA', name: "pregunta20opcionF" }
        ]
    },
    {
        xtype: 'fieldset',
        defaults: { xtype: "radiofield" },
        items: [
        {
            xtype: "selectfield",
            bind: { store: "{getDisposicionExcreta}" },
            displayField: "compDisposicionExcreta",
            editable: false,
            label: "21. LA DISPOSICION DE EXCRETAS SE REALIZA",
            name: "pregunta21",
            queryMode: "local",
            valueField: "compDisposicionExcreta",
            id: "pregunta21"
        }
        ]
    },
    {
        xtype: 'fieldset',
        defaults: { xtype: "radiofield" },
        title: '22. EL MANEJO DE BASURAS EN EL HOGAR ES',
        items: [
        { label: 'A - ADECUADO', name: "pregunta22", inputValue: "ADECUADO", value: "ADECUADO" },
        { label: 'B - INADECUADO', name: "pregunta22", inputValue: "INADECUADO", value: "INADECUADO" },
        { label: 'C - NO APLICA', name: "pregunta22", inputValue: "N.A", value: "N.A", checked: true }
        ]
    },
    {
        xtype: 'fieldset',
        items: [
        {
            xtype: "selectfield",
            bind: { store: "{getDisposicionBasura}" },
            displayField: "compDisposicionBasura",
            editable: false,
            label: "23. LA DISPOSICION FINAL DE LA BASURA SE REALIZA EN",
            name: "pregunta23",
            queryMode: "local",
            valueField: "compDisposicionBasura"
        }
        ]
    },
    { xtype: "container", html: "<b>CONDICIONES SOCIOAMBIENTALES</b>" },
    {
        xtype: 'fieldset',
        defaults: { 
            xtype: "checkboxfield"
        },
        title: '24. SEÑALE CUALES FACTORES DE RIESGO AFECTAN A SU FAMILIA EN LA LOCALIDAD, VEREDA, BARRIO EN DONDE VIVE. (SEÑALE UNA O VARIAS)',
        items: [
        { label: 'A - DISPOSICION INADECUADA DE BASURAS', name: "pregunta24opcionA" },
        { label: 'B - CAÑOS, RIOS, LAGUNAS,CONTAMINADAS', name: "pregunta24opcionB" },
        { label: 'C - DESLIZAMIENTO DE TIERRA', name: "pregunta24opcionC" },
        { label: 'D - ARENERAS', name: "pregunta24opcionD" },
        { label: 'E - CARBONERAS', name: "pregunta24opcionE" },
        { label: 'F - VECTORES (F1-  ROEDORES)', name: "pregunta24opcionF1" },
        { label: 'F - VECTORES (F2-  INSECTOS)', name: "pregunta24opcionF2" },
        { label: 'G - INUNDACIONES', name: "pregunta24opcionG" },
        { label: 'H - INSEGURIDAD', name: "pregunta24opcionH" },
        { label: 'I - PROSTITUCION', name: "pregunta24opcionI" },
        { label: 'J - PANDILLISMO', name: "pregunta24opcionJ" },
        { label: 'K - DROGADICCION', name: "pregunta24opcionK" },
        { label: 'L - ALCOHOLISMO', name: "pregunta24opcionL" },
        { label: 'M - VIOLENCIA', name: "pregunta24opcionM" },
        { label: 'N - OTRO', name: "pregunta24opcionN" },
        { label: 'O - NINGUNA', name: "pregunta24opcionO" }
        ]
    },
    {
        xtype: 'fieldset',
        defaults: { xtype: "radiofield" },
        title: '25. TIENE LA FAMILIA ANIMALES?',
        items: [
        { label: 'A - SI', name: "pregunta25", inputValue: "SI", value: "SI" },
        { label: 'B - NO', name: "pregunta25", inputValue: "NO", value: "NO", checked: true }
        ]
    },
    {
        xtype: 'fieldset',
        defaults: { xtype: "radiofield" },
        title: '26. SEÑALE CUANTOS: (PUEDE SEÑALAR UNA O VARIAS CON EL NUMERO)',
        items: [
        {
            xtype: "grid",
            bind: { store: "{getTipoAnimal}" },
            border: true,
            columns: [
            {
                xtype: 'gridheadergroup',
                columns: [
                { dataIndex: "idTipoAnimal", text: "Id Tipo Animal", hidden: true, flex: 1 },
                { dataIndex: "compTipoAnimal", text: "Tipo de animal", flex: 2 },
                ],
                flex: 3
            },
            {
                xtype: 'gridheadergroup',
                columns: [
                {
                    xtype: "booleancolumn", dataIndex: "activarTipoAnimal", text: "Seleccionar", trueText: "X", falseText: " ", editable: true, editor: {
                        xtype: "checkboxfield"
                    },
                    flex: 1
                },
                {
                    dataIndex: "numeroTipoAnimal", text: "Número", editable: true, flex: 1, editor: {
                        xtype: "numberfield",
                        minValue: 0,
                        maxValue: 250,
                        allowBlank: false
                    }
                }
                ],
                flex: 2
            }
            ],
            columnLines: true,
            height: 200,
            id: "Grid-Pregunta26",
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
                }
            },
            { type: 'gridviewoptions' },
            { type: 'gridcolumnresizing' }
            ]
        }
        ]
    },
    {
        xtype: 'fieldset',
        defaults: { xtype: "checkboxfield" },
        title: '27. REGISTRE SI SE ENCUENTRAN VACUNADOS (PUEDE SEÑALAR UNA O VARIAS)',
        items: [
        { label: 'A - CANINOS', name: "pregunta27opcionA" },
        { label: 'B - AVES', name: "pregunta27opcionB" },
        { label: 'C - PORCINOS', name: "pregunta27opcionC" },
        { label: 'D - OVINOS', name: "pregunta27opcionD" },
        { label: 'E - EQUINOS', name: "pregunta27opcionE" },
        { label: 'F - FELINOS', name: "pregunta27opcionF" }
        ]
    },
    {
        xtype: 'fieldset',
        title: '28. REGISTRE LOS AFILIADOS DISCAPACITADOS DE LA FAMILIA (S:SENSORIAL, M:MENTAL, F: FISICA)',
        items: [
        { 
            xtype: "button", 
            text: "Agregar", 
            iconCls: "x-fa fa-plus-square", 
            listeners:{
                tap:function() {
                    var myStore = Ext.getStore('pregunta28');
                    myStore.add({
                        numCarnet:'0',
                        nombre: '',
                        edad: 0,
                        codDiscapacidad: ''
                    })
                }
            },
            ui: "action", 
            reference: "botonNuevaFicha" 
        },
        {
            xtype: "grid",
            bind: { store: "{setPregunta28}" },
            border: true,
            columns: [
            {
                dataIndex: "nombre", text: "Nombre", flex: 1, editable: true, editor: {
                    xtype: "textfield",
                    allowBlank: false
                }
            },
            {
                dataIndex: "numCarnet", text: "Carnet", flex: 1, editable: true, editor: {
                    xtype: "numberfield",
                    allowBlank: false
                }
            },
            {
                dataIndex: "edad", text: "Edad", flex: 1, editable: true, editor: {
                    xtype: "numberfield",
                    minValue: 0,
                    maxValue: 250,
                    allowBlank: false
                }
            },
            {
                dataIndex: "codDiscapacidad", text: "Cód. Discapacidad", flex: 1, editable: true, editor: {
                    xtype: "selectfield",
                    allowBlank: false,
                    label: 'SELECCIONE',
                    options: [{
                        text: 'S. SENSORIAL',
                        value: 'S'
                    }, {
                        text: 'M. MENTAL',
                        value: 'M'
                    }, {
                        text: 'F. FISICA',
                        value: 'F'
                    }]
                }
            }
            ],
            columnLines: true,
            height: 250,
            id: "Grid-Pregunta28",
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
                }
            },
            { type: 'gridviewoptions' },
            { type: 'gridcolumnresizing' }
            ]
        }]
    },
    {
        xtype: 'fieldset',
        title: "29. REGISTRE CUANTOS INTEGRANTES DE LA FAMILIA NO HAN ASISTIDO A CONTROL ODONTOLOGICO EN EL ULTIMO AÑO",
        items: [
        {
            xtype: "numberfield",
            label: "",
            name: "pregunta29",
            value: 0
        }
        ]
    },
    {
        xtype: "fieldset",
        defaults: { xtype: "numberfield" },
        title: "30. REGISTRE LAS PERSONAS  MAYORES DE 60 AÑOS QUE NO HAN RECIBIDO CONTROL MEDICO EN EL ULTIMO AÑO",
        items: [
        {
            label: "F",
            labelWidth: 50,
            name: "pregunta30personasF",
            value: 0
        },
        {
            label: "M",
            labelWidth: 50,
            name: "pregunta30personasM",
            value: 0
        },
        {
            label: "N/A",
            labelWidth: 50,
            name: "pregunta30personasNA",
            value: 0
        }
        ]
    },
    {
        xtype: "fieldset",
        title: "31. REGISTRE EL NUMERO DE INTEGRANTES DE LA FAMILIA QUE TENGAN TOS CON ESPECTORACION POR MAS DE 15 DIAS?",
        items: [
        { 
            xtype: "button", 
            text: "Agregar", 
            iconCls: "x-fa fa-plus-square", 
            listeners:{
                tap:function() {
                    var myStore = Ext.getStore('pregunta31');
                    myStore.add({
                        numCarnet:'0',
                        nombre: ''
                    })
                }
            },
            ui: "action", 
            reference: "botonNuevaFicha" },
            {
                xtype: "grid",
                bind: { store: "{setPregunta31}" },
                border: true,
                columns: [
                {
                    dataIndex: "nombre", text: "Nombre", flex: 1, editable: true, editor: {
                        xtype: "textfield",
                        allowBlank: false
                    }
                },
                {
                    dataIndex: "numCarnet", text: "Carnet", flex: 1, editable: true, editor: {
                        xtype: "numberfield",
                        allowBlank: false
                    }
                }
                ],
                columnLines: true,
                height: 200,
                id: "Grid-Pregunta31",
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
                    }
                },
                { type: 'gridviewoptions' },
                { type: 'gridcolumnresizing' }
                ]
            }
            ]
        },
        {
            xtype: "fieldset",
            title: "32. REGISTRE LOS  INTEGRANTES DE LA FAMILIA QUE PRESENTAN  MANCHAS, LESIONES, <br />NODULOS O ULCERAS  EN LA PIEL CON O SIN SENSIBILIDAD EN ALGUNA PARTE DEL CUERPO",
            items: [
            { 
                xtype: "button", 
                text: "Agregar", 
                iconCls: "x-fa fa-plus-square", 
                listeners:{
                    tap:function() {
                        var myStore = Ext.getStore('pregunta32');
                        myStore.add({
                            numCarnet:'0',
                            nombre: ''
                        })
                    }
                },
                ui: "action", 
                reference: "botonNuevaFicha" 
            },
            {
                xtype: "grid",
                bind: { store: "{setPregunta32}" },
                border: true,
                columns: [
                {
                    dataIndex: "nombre", text: "Nombre", flex: 1, editable: true, editor: {
                        xtype: "textfield",
                        allowBlank: false
                    }
                },
                {
                    dataIndex: "numCarnet", text: "Carnet", flex: 1, editable: true, editor: {
                        xtype: "numberfield",
                        allowBlank: false
                    }
                }
                ],
                columnLines: true,
                height: 200,
                id: "Grid-Pregunta32",
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
                    }
                },
                { type: 'gridviewoptions' },
                { type: 'gridcolumnresizing' }
                ]
            }
            ]
        },
        {
            xtype: "fieldset",
            title: "33. ALGUN MIEMBRO DE LA FAMILIA SE ENCUENTRA ENFERMO EN EL MOMENTO DE LA VISITA?",
            items: [
            { 
                xtype: "button", 
                text: "Agregar", 
                iconCls: "x-fa fa-plus-square", 
                listeners:{
                    tap:function() {
                        var myStore = Ext.getStore('pregunta33');
                        myStore.add({
                            numCarnet:'0',
                            nombre: ''
                        })
                    }
                }, 
                ui: "action", 
                reference: "botonNuevaFicha" 
            },
            {
                xtype: "grid",
                bind: { store: "{setPregunta33}" },
                border: true,
                columns: [
                {
                    dataIndex: "nombre", text: "Nombre", flex: 1, editable: true, editor: {
                        xtype: "textfield",
                        allowBlank: false
                    }
                },
                {
                    dataIndex: "numCarnet", text: "Carnet", flex: 1, editable: true, editor: {
                        xtype: "numberfield",
                        allowBlank: false
                    }
                }
                ],
                columnLines: true,
                height: 200,
                id: "Grid-Pregunta33",
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
                    }
                },
                { type: 'gridviewoptions' },
                { type: 'gridcolumnresizing' }
                ]
            }
            ]
        },
        {
            xtype: 'fieldset',
            defaults: { xtype: "checkboxfield" },
            title: '34. COMO CORRIGE EL MAL COMPORTAMIENTO DE  SUS HIJOS',
            items: [
            { label: 'A - CASTIGO FISICO', name: "pregunta34opcionA" },
            { label: 'B - REGAÑO', name: "pregunta34opcionB" },
            { label: 'C - ENCIERRO', name: "pregunta34opcionC" },
            { label: 'D - ZARANDEO', name: "pregunta34opcionD" },
            { label: 'E - PRIVACION', name: "pregunta34opcionE" },
            { label: 'F - DIALOGO', name: "pregunta34opcionF" },
            { label: 'G - AISLAMIENTO', name: "pregunta34opcionG" },
            { label: 'H - OTRO', name: "pregunta34opcionH" }
            ]
        },
        {
            xtype: 'fieldset',
            defaults: { xtype: "radiofield" },
            title: '35. HAY NIÑOS MENORES DE 12 AÑOS QUE COCINAN EN LA CASA?',
            items: [
            { label: 'A - SI', name: "pregunta35", inputValue: "SI", value: "SI" },
            { label: 'B - NO', name: "pregunta35", inputValue: "NO", value: "NO", checked: true }
            ]
        },
        {
            xtype: 'fieldset',
            defaults: { xtype: "checkboxfield" },
            title: '36. COMO SOLUCIONAN LOS CONFLICTOS DE PAREJA?',
            items: [
            { label: 'A - DIALOGANDO', name: "pregunta36opcionA" },
            { label: 'B - AGRESION FISICA', name: "pregunta36opcionB" },
            { label: 'C - PRIVACION ECONOMICA', name: "pregunta36opcionC" },
            { label: 'D - AGRESION VERBAL', name: "pregunta36opcionD" },
            { label: 'E - PRIVACION', name: "pregunta36opcionE" },
            { label: 'F - AGRESION SEXUAL', name: "pregunta36opcionF" },
            { label: 'G - OTRO', name: "pregunta36opcionG" },
            { label: 'H - SIN DATO', name: "pregunta36opcionH" }
            ]
        },
        {
            xtype: 'fieldset',
            defaults: { xtype: "radiofield" },
            title: '37. HA TENIDO CONFLICTOS EN EL HOGAR LLEGANDO A LA AGRESION FISICA O VERBAL',
            items: [
            { label: 'A - SI', name: "pregunta37", inputValue: "SI", value: "SI" },
            { label: 'B - NO', name: "pregunta37", inputValue: "NO", value: "NO", checked: true }
            ]
        },
        {
            xtype: 'fieldset',
            defaults: { xtype: "checkboxfield" },
            title: '38. QUIEN(ES) NORMALMENTE ES EL QUE AGREDE FISICA O SICOLOGICAMENTE EN LA FAMILIA',
            items: [
            { label: 'A - PADRE', name: "pregunta38opcionA" },
            { label: 'B - MADRE', name: "pregunta38opcionB" },
            { label: 'C - HIJOS', name: "pregunta38opcionC" },
            { label: 'D - PADRASTRO', name: "pregunta38opcionD" },
            { label: 'E - NO ES CLARO', name: "pregunta38opcionE" },
            { label: 'F - NO APLICA', name: "pregunta38opcionF" }
            ]
        },
        {
            xtype: 'fieldset',
            defaults: { xtype: "checkboxfield" },
            title: '39. CUAL(ES) ACTIVIDADES REALIZA LA FAMILIA EN EL TIEMPO LIBRE?',
            items: [
            { label: 'A - ACTIVIDADES DEPORTIVAS', name: "pregunt39opcionA" },
            { label: 'B - ACTIVIDADES  RECREATIVAS(LEER, TV)', name: "pregunt39opcionB" },
            { label: 'C - ACTIVIDADES ESPIRITUALES', name: "pregunt39opcionC" },
            { label: 'D - ACTIVIDADES SOCIALES', name: "pregunt39opcionD" },
            { label: 'E - NO REALIZA NINGUNA', name: "pregunt39opcionE" },
            { label: 'F - OTRAS', name: "pregunt39opcionF" }
            ]
        },
        {
            xtype: 'fieldset',
            defaults: { xtype: "checkboxfield" },
            title: '40. CUALES ACTIVIDADES RECREATIVAS REALIZAN LAS PERSONAS MAYORES DE 60 AÑOS EN SU FAMILIA?',
            items: [
            { label: 'A - ACTIVIDADES DEPORTIVAS', name: "pregunta40opcionA" },
            { label: 'B - ACTIVIDADES  RECREATIVAS(LEER, TV)', name: "pregunta40opcionB" },
            { label: 'C - ACTIVIDADES ESPIRITUALES', name: "pregunta40opcionC" },
            { label: 'D - ACTIVIDADES MANUALES', name: "pregunta40opcionD" },
            { label: 'E - OTRAS', name: "pregunta40opcionE" },
            { label: 'F - NO REALIZAN NINGUNA', name: "pregunta40opcionF" }
            ]
        },
        {
            xtype: 'fieldset',
            layout: "hbox",
            title: '41. QUIEN COMPARTE EL TIEMPO LIBRE CON SUS HIJOS',
            items: [
            {
                xtype: "container",
                items: [
                {
                    xtype: 'checkboxfield',
                    label: 'NINGUNO',
                    listeners: {
                        change: "onChangeCheckNinguno"
                    },
                    name: "pregunta41opcionNinguno",
                    flex: 2
                }
                ],
                flex: 2
            },
            {
                xtype: "container",
                flex: 4,
                items: [
                {
                    xtype: "selectfield",
                    bind: { store: "{getOpciones}" },
                    displayField: "nombre",
                    editable: false,
                    label: "MAMA",
                    name: "pregunta41opcionMama",
                    queryMode: "local",
                    reference: "pregunta41opcionMama",
                    valueField: "id",
                    value: "NO"
                },
                {
                    xtype: "selectfield",
                    bind: { store: "{getOpciones}" },
                    displayField: "nombre",
                    editable: false,
                    label: "PAPA",
                    name: "pregunta41opcionPapa",
                    queryMode: "local",
                    reference: "pregunta41opcionPapa",
                    valueField: "id",
                    value: "NO"
                },
                {
                    xtype: "selectfield",
                    bind: { store: "{getOpciones}" },
                    displayField: "nombre",
                    editable: false,
                    label: "OTRO",
                    name: "pregunta41opcionOtro",
                    queryMode: "local",
                    reference: "pregunta41opcionOtro",
                    valueField: "id",
                    value: "NO"
                }
                ]
            }
            ]
        },
        {
            xtype: 'fieldset',
            defaults: { xtype: "checkboxfield" },
            title: '42. CAUSAS POR LAS CUALES NO COMPARTEN PADRES E HIJOS EL TIEMPO LIBRE',
            items: [
            { label: 'A - NO LO COMPARTEN POR EXCESO DE TRABAJO', name: "pregunta42opcionA" },
            { label: 'B - NO LO COMPARTEN POR QUE DESCANSAN EL EL TIEMPO LIBRE', name: "pregunta42opcionB" },
            { label: 'C - PREFIEREN QUE LOS NIÑOS JUEGUEN SOLOS', name: "pregunta42opcionC" },
            { label: 'D - NO APLICA', name: "pregunta42opcionD" },
            { label: 'E - OTRAS', name: "pregunta42opcionE" }
            ]
        },
        {
            xtype: 'fieldset',
            defaults: { xtype: "radiofield" },
            title: '43. HA BRINDADO ORIENTACION SEXUAL A SUS HIJOS?',
            items: [
            { label: 'A - SI', name: "pregunta43", inputValue: "SI", value: "SI" },
            { label: 'B - NO', name: "pregunta43", inputValue: "NO", value: "NO", checked: true }
            ]
        },
        {
            xtype: 'fieldset',
            defaults: { xtype: "checkboxfield" },
            title: '44. COMO?',
            items: [
            { label: 'A - DIALOGO ENTRE PADRES E HIJOS', name: "pregunta44opcionA" },
            { label: 'B - LO REALIZAN EN EL COLEGIO', name: "pregunta44opcionB" },
            { label: 'C - NO LO REALIZA', name: "pregunta44opcionC" }
            ]
        },
        {
            xtype: 'fieldset',
            defaults: { xtype: "checkboxfield" },
            title: '45. CADA CUANTO TIEMPO HACE EJERCICIO LA PERSONA ENTREVISTADA MAYOR DE 18 AÑOS',
            items: [
            { xtype: "numberfield", label: "Edad", name: "pregunta45edad", labelWidth: 80, value: 18, minValue: 0, maxValue: 250 },
            { label: 'A - TODOS LOS DIAS 30 MINUTOS O MENOS', name: "pregunta45opcionA" },
            { label: 'C - MENOS DE 5 DÍAS A LA SEMANA  30 MINUTOS', name: "pregunta45opcionC" },
            { label: 'B - 5 DÍAS A LA SEMANA MAS O MENOS 30 MINUTOS', name: "pregunta45opcionB" },
            { label: 'D - EN EL TIEMPO LIBRE NO HA REALIZADO EJERCICIO EN EL ULTIMO MES', name: "pregunta45opcionD" }
            ]
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
                                var infoHfdfr = form.getValues();
                                console.log(infoHfdfr);
                                var date = new Date();
                                if(infoHfdfr.idFuanAfiliado == 0 || infoHfdfr.idFuanAfiliado == undefined || infoHfdfr.nombreCompletoAfiliado == ""){
                                    Ext.Msg.alert('Advertencia', "Los datos del Usuario estan incompletos. Por favor verifique", Ext.emptyFn);
                                    return false;
                                }
                                //Obtengo el codigo de la ciudad del form ya que no viene con el afiliado al consultar
                                if(infoHfdfr.compCiudad != "" || infoHfdfr.compCiudad != null){
                                    var splitCity = infoHfdfr.compCiudad.split(" ");
                                    var cityId = splitCity[0].substring(1, (splitCity[0].length - 1));
                                }else{
                                    Ext.Msg.alert('Advertencia', "El campo ciudad es requerido. Por favor verifique", Ext.emptyFn);
                                    return false;
                                }
                                var info = {
                                    idInfoHfdfr: 0,
                                    tipoDiligenciamientoHfdfr: "Personal",
                                    fechaVisitaHfdfr: date.getFullYear() + "-" +
                                    (date.getMonth() < 10 ? "0" + date.getMonth() : date.getMonth()) + "-" +
                                    (date.getDate() < 10 ? "0" + date.getDate() : date.getDate()),
                                    horaInicioHfdfr: "",
                                    horaFinHfdfr: "",
                                    idFuanAfiliado: parseInt(infoHfdfr.idFuanAfiliado),
                                    idCiudad: parseInt(cityId),
                                    veredaInfoHfdfr: (infoHfdfr.veredaInfoHfdfr != null)?infoHfdfr.veredaInfoHfdfr:"",
                                    barrioInfoHfdfr: (infoHfdfr.barrioInfoHfdfr != null)?infoHfdfr.barrioInfoHfdfr:"",
                                    telefonoInfoHfdfr: (infoHfdfr.telefonoInfoHfdfr != null)?infoHfdfr.telefonoInfoHfdfr:"",
                                    firmaHfdfr: "",
                                    idUsuario: Coomuce.Util.DatosUsuario.idUsuario,
                                    identificacionFuanAfiliado: infoHfdfr.identificacionFuanAfiliado
                                };
                                var historia = {
                                    pregunta1: (infoHfdfr.pregunta1 != null)?infoHfdfr.pregunta1:"",
                                    pregunta2: (infoHfdfr.pregunta2 != null)?infoHfdfr.pregunta2:"",
                                    pregunta3: (infoHfdfr.pregunta3 > 0)?String(infoHfdfr.pregunta3):"0",
                                    pregunta4: (infoHfdfr.pregunta4 > 0)?String(infoHfdfr.pregunta4):"0",
                                    pregunta5: (infoHfdfr.pregunta5 > 0)?String(infoHfdfr.pregunta5):"0",
                                    pregunta6: (infoHfdfr.pregunta6 > 0)?String(infoHfdfr.pregunta6):"0",
                                    pregunta7: (infoHfdfr.pregunta7 > 0)?String(infoHfdfr.pregunta7):"0",
                                    pregunta8: {
                                        opcionMadre: (infoHfdfr.pregunta8opcionMadre == null ? false : infoHfdfr.pregunta8opcionMadre),
                                        opcionPadre: (infoHfdfr.pregunta8opcionPadre == null ? false : infoHfdfr.pregunta8opcionPadre),
                                        opcionHijos: (infoHfdfr.pregunta8opcionHijos == null ? false : infoHfdfr.pregunta8opcionHijos),
                                        opcionOtros: (infoHfdfr.pregunta8opcionOtros == null ? false : infoHfdfr.pregunta8opcionOtros)
                                    },
                                    pregunta9: (infoHfdfr.pregunta9 > 0)?String(infoHfdfr.pregunta9):"0",
                                    pregunta10: (infoHfdfr.pregunta10 > 0)?String(infoHfdfr.pregunta10):"0",
                                    pregunta11: (infoHfdfr.pregunta11 > 0)?String(infoHfdfr.pregunta11):"0",
                                    pregunta12: (infoHfdfr.pregunta12 > 0)?String(infoHfdfr.pregunta12):"0",
                                    pregunta13: (infoHfdfr.pregunta13 > 0)?String(infoHfdfr.pregunta13):"0",
                                    pregunta14: [],
                                    pregunta15: {
                                        opcionA: infoHfdfr.pregunta15opcionA,
                                        opcionB: infoHfdfr.pregunta15opcionB,
                                        opcionC: infoHfdfr.pregunta15opcionC,
                                        opcionD: String(infoHfdfr.pregunta15opcionD),
                                        opcionE: String(infoHfdfr.pregunta15opcionE),
                                        opcionF: infoHfdfr.pregunta15opcionF,
                                        opcionG: infoHfdfr.pregunta15opcionG
                                    }, 
                                    pregunta16: (infoHfdfr.pregunta16 != null)?infoHfdfr.pregunta16:"",
                                    pregunta17: (infoHfdfr.pregunta17 != null)?infoHfdfr.pregunta17:"",
                                    pregunta18: (infoHfdfr.pregunta18 != null)?infoHfdfr.pregunta18:"",
                                    pregunta19: (infoHfdfr.pregunta19 != null)?infoHfdfr.pregunta19:"",
                                    pregunta20: {
                                        opcionA: (infoHfdfr.pregunta20opcionA == null ? false : infoHfdfr.pregunta20opcionA),
                                        opcionB: (infoHfdfr.pregunta20opcionB == null ? false : infoHfdfr.pregunta20opcionB),
                                        opcionC: (infoHfdfr.pregunta20opcionC == null ? false : infoHfdfr.pregunta20opcionC),
                                        opcionD: (infoHfdfr.pregunta20opcionD == null ? false : infoHfdfr.pregunta20opcionD),
                                        opcionE: (infoHfdfr.pregunta20opcionE == null ? false : infoHfdfr.pregunta20opcionE),
                                        opcionF: (infoHfdfr.pregunta20opcionF == null ? false : infoHfdfr.pregunta20opcionF)
                                    }, 
                                    pregunta21: (infoHfdfr.pregunta21 != null)?infoHfdfr.pregunta21:"",
                                    pregunta22: (infoHfdfr.pregunta22 != null)?infoHfdfr.pregunta22:"",
                                    pregunta23: (infoHfdfr.pregunta23 != null)?infoHfdfr.pregunta23:"",
                                    pregunta24: {
                                        opcionA: (infoHfdfr.pregunta24opcionA == null ? false : infoHfdfr.pregunta24opcionA),
                                        opcionB: (infoHfdfr.pregunta24opcionB == null ? false : infoHfdfr.pregunta24opcionB),
                                        opcionC: (infoHfdfr.pregunta24opcionC == null ? false : infoHfdfr.pregunta24opcionC),
                                        opcionD: (infoHfdfr.pregunta24opcionD == null ? false : infoHfdfr.pregunta24opcionD),
                                        opcionE: (infoHfdfr.pregunta24opcionE == null ? false : infoHfdfr.pregunta24opcionE),
                                        opcionF1: (infoHfdfr.pregunta24opcionF1 == null ? false : infoHfdfr.pregunta24opcionF1),
                                        opcionF2: (infoHfdfr.pregunta24opcionF2 == null ? false : infoHfdfr.pregunta24opcionF2),
                                        opcionG: (infoHfdfr.pregunta24opcionG == null ? false : infoHfdfr.pregunta24opcionG),
                                        opcionH: (infoHfdfr.pregunta24opcionH == null ? false : infoHfdfr.pregunta24opcionH),
                                        opcionI: (infoHfdfr.pregunta24opcionI == null ? false : infoHfdfr.pregunta24opcionI),
                                        opcionJ: (infoHfdfr.pregunta24opcionJ == null ? false : infoHfdfr.pregunta24opcionJ),
                                        opcionK: (infoHfdfr.pregunta24opcionK == null ? false : infoHfdfr.pregunta24opcionK),
                                        opcionL: (infoHfdfr.pregunta24opcionL == null ? false : infoHfdfr.pregunta24opcionL),
                                        opcionM: (infoHfdfr.pregunta24opcionM == null ? false : infoHfdfr.pregunta24opcionM),
                                        opcionN: (infoHfdfr.pregunta24opcionN == null ? false : infoHfdfr.pregunta24opcionN),
                                        opcionO: (infoHfdfr.pregunta24opcionO == null ? false : infoHfdfr.pregunta24opcionO)
                                    },
                                    pregunta25: (infoHfdfr.pregunta25 != null)?infoHfdfr.pregunta25:"",
                                    pregunta26: [],
                                    pregunta27: {
                                        opcionA: (infoHfdfr.pregunta27opcionA == null ? false : infoHfdfr.pregunta27opcionA),
                                        opcionB: (infoHfdfr.pregunta27opcionB == null ? false : infoHfdfr.pregunta27opcionB),
                                        opcionC: (infoHfdfr.pregunta27opcionC == null ? false : infoHfdfr.pregunta27opcionC),
                                        opcionD: (infoHfdfr.pregunta27opcionD == null ? false : infoHfdfr.pregunta27opcionD),
                                        opcionE: (infoHfdfr.pregunta27opcionE == null ? false : infoHfdfr.pregunta27opcionE),
                                        opcionF: (infoHfdfr.pregunta27opcionF == null ? false : infoHfdfr.pregunta27opcionF)
                                    },
                                    pregunta28: [],
                                    pregunta29: (infoHfdfr.pregunta29 != null)?String(infoHfdfr.pregunta29):"",
                                    pregunta30: {
                                        personasF: infoHfdfr.pregunta30personasF,
                                        personasM: infoHfdfr.pregunta30personasM,
                                        personasNA: infoHfdfr.pregunta30personasNA
                                    },
                                    pregunta31: [],
                                    pregunta32: [],
                                    pregunta33: [],
                                    pregunta34: {
                                        opcionA: (infoHfdfr.pregunta34opcionA == null ? false : infoHfdfr.pregunta34opcionA),
                                        opcionB: (infoHfdfr.pregunta34opcionB == null ? false : infoHfdfr.pregunta34opcionB),
                                        opcionC: (infoHfdfr.pregunta34opcionC == null ? false : infoHfdfr.pregunta34opcionC),
                                        opcionD: (infoHfdfr.pregunta34opcionD == null ? false : infoHfdfr.pregunta34opcionD),
                                        opcionE: (infoHfdfr.pregunta34opcionE == null ? false : infoHfdfr.pregunta34opcionE),
                                        opcionF: (infoHfdfr.pregunta34opcionF == null ? false : infoHfdfr.pregunta34opcionF),
                                        opcionG: (infoHfdfr.pregunta34opcionG == null ? false : infoHfdfr.pregunta34opcionG),
                                        opcionH: (infoHfdfr.pregunta34opcionH == null ? false : infoHfdfr.pregunta34opcionH)
                                    },
                                    pregunta35: (infoHfdfr.pregunta35 != null)?infoHfdfr.pregunta35:"",
                                    pregunta36: {
                                        opcionA: (infoHfdfr.pregunta36opcionA == null ? false : infoHfdfr.pregunta36opcionA),
                                        opcionB: (infoHfdfr.pregunta36opcionB == null ? false : infoHfdfr.pregunta36opcionB),
                                        opcionC: (infoHfdfr.pregunta36opcionC == null ? false : infoHfdfr.pregunta36opcionC),
                                        opcionD: (infoHfdfr.pregunta36opcionD == null ? false : infoHfdfr.pregunta36opcionD),
                                        opcionE: (infoHfdfr.pregunta36opcionE == null ? false : infoHfdfr.pregunta36opcionE),
                                        opcionF: (infoHfdfr.pregunta36opcionF == null ? false : infoHfdfr.pregunta36opcionF),
                                        opcionG: (infoHfdfr.pregunta36opcionG == null ? false : infoHfdfr.pregunta36opcionG),
                                        opcionH: (infoHfdfr.pregunta36opcionH == null ? false : infoHfdfr.pregunta36opcionH)
                                    }, 
                                    pregunta37: (infoHfdfr.pregunta37 != null)?infoHfdfr.pregunta37:"",
                                    pregunta38: {
                                        opcionA: (infoHfdfr.pregunta38opcionA == null ? false : infoHfdfr.pregunta38opcionA),
                                        opcionB: (infoHfdfr.pregunta38opcionB == null ? false : infoHfdfr.pregunta38opcionB),
                                        opcionC: (infoHfdfr.pregunta38opcionC == null ? false : infoHfdfr.pregunta38opcionC),
                                        opcionD: (infoHfdfr.pregunta38opcionD == null ? false : infoHfdfr.pregunta38opcionD),
                                        opcionE: (infoHfdfr.pregunta38opcionE == null ? false : infoHfdfr.pregunta38opcionE),
                                        opcionF: (infoHfdfr.pregunta38opcionF == null ? false : infoHfdfr.pregunta38opcionF)
                                    },
                                    pregunta39: {
                                        opcionA: (infoHfdfr.pregunta39opcionA == null ? false : infoHfdfr.pregunta39opcionA),
                                        opcionB: (infoHfdfr.pregunta39opcionB == null ? false : infoHfdfr.pregunta39opcionB),
                                        opcionC: (infoHfdfr.pregunta39opcionC == null ? false : infoHfdfr.pregunta39opcionC),
                                        opcionD: (infoHfdfr.pregunta39opcionD == null ? false : infoHfdfr.pregunta39opcionD),
                                        opcionE: (infoHfdfr.pregunta39opcionE == null ? false : infoHfdfr.pregunta39opcionE),
                                        opcionF: (infoHfdfr.pregunta39opcionF == null ? false : infoHfdfr.pregunta39opcionF)
                                    },
                                    pregunta40: {
                                        opcionA: (infoHfdfr.pregunta40opcionA == null ? false : infoHfdfr.pregunta40opcionA),
                                        opcionB: (infoHfdfr.pregunta40opcionB == null ? false : infoHfdfr.pregunta40opcionB),
                                        opcionC: (infoHfdfr.pregunta40opcionC == null ? false : infoHfdfr.pregunta40opcionC),
                                        opcionD: (infoHfdfr.pregunta40opcionD == null ? false : infoHfdfr.pregunta40opcionD),
                                        opcionE: (infoHfdfr.pregunta40opcionE == null ? false : infoHfdfr.pregunta40opcionE),
                                        opcionF: (infoHfdfr.pregunta40opcionF == null ? false : infoHfdfr.pregunta40opcionF)
                                    },
                                    pregunta41: {
                                        ninguno: (infoHfdfr.pregunta41opcionNinguno == null ? false : infoHfdfr.pregunta41opcionNinguno),
                                        opcionMama: infoHfdfr.pregunta41opcionMama,
                                        opcionPapa: infoHfdfr.pregunta41opcionPapa,
                                        opcionOtro: infoHfdfr.pregunta41opcionOtro
                                    },
                                    pregunta42: {
                                        opcionA: (infoHfdfr.pregunta42opcionA == null ? false : infoHfdfr.pregunta42opcionA),
                                        opcionB: (infoHfdfr.pregunta42opcionB == null ? false : infoHfdfr.pregunta42opcionB),
                                        opcionC: (infoHfdfr.pregunta42opcionC == null ? false : infoHfdfr.pregunta42opcionC),
                                        opcionD: (infoHfdfr.pregunta42opcionD == null ? false : infoHfdfr.pregunta42opcionD),
                                        opcionE: (infoHfdfr.pregunta42opcionE == null ? false : infoHfdfr.pregunta42opcionE)
                                    }, 
                                    pregunta43: infoHfdfr.pregunta43,
                                    pregunta44: {
                                        opcionA: (infoHfdfr.pregunta44opcionA == null ? false : infoHfdfr.pregunta44opcionA),
                                        opcionB: (infoHfdfr.pregunta44opcionB == null ? false : infoHfdfr.pregunta44opcionB),
                                        opcionC: (infoHfdfr.pregunta44opcionC == null ? false : infoHfdfr.pregunta44opcionC)
                                    },
                                    pregunta45: {
                                        edad: (infoHfdfr.pregunta45edad < 254)?infoHfdfr.pregunta45edad:18,
                                        opcionA: (infoHfdfr.pregunta45opcionA == null ? false : infoHfdfr.pregunta45opcionA),
                                        opcionB: (infoHfdfr.pregunta45opcionB == null ? false : infoHfdfr.pregunta45opcionB),
                                        opcionC: (infoHfdfr.pregunta45opcionC == null ? false : infoHfdfr.pregunta45opcionC),
                                        opcionD: (infoHfdfr.pregunta45opcionD == null ? false : infoHfdfr.pregunta45opcionD)
                                    }
                                };
                                console.log(historia);
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
                                            numero: (item.get("numeroTipoAnimal") < 254)?item.get("numeroTipoAnimal"):0
                                        });
                                    
                                });
                                var grid28 = Ext.getCmp("Grid-Pregunta28");
                                Ext.each(grid28.getStore().data.items, function (item, index, allItems) {
                                    if(item.get("numCarnet") != '0'){
                                        if(item.get("nombre") == "" || item.get("nombre") == null || item.get("edad") > 250){
                                            Ext.Msg.alert('Advertencia', "Hay inconsistencias en la pregunta 28. Por favor verifique", Ext.emptyFn);
                                            return false;
                                        }else{
                                            historia.pregunta28.push({
                                                nombreAfiliado: item.get("nombre"),
                                                carnet: String(item.get("numCarnet")),
                                                edad: (item.get("edad") < 254)?item.get("edad"):18,
                                                discapacidad: item.get("codDiscapacidad")
                                            });
                                        }
                                    }                                    
                                });
                                var grid31 = Ext.getCmp("Grid-Pregunta31");
                                Ext.each(grid31.getStore().data.items, function (item, index, allItems) {
                                    if(item.get("numCarnet") != '0'){
                                        if(item.get("nombre") == "" || item.get("numCarnet") == ""){
                                            Ext.Msg.alert('Advertencia', "Hay inconsistencias en la pregunta 28. Por favor verifique", Ext.emptyFn);
                                            return false;
                                        }else{
                                            historia.pregunta31.push({
                                                nombreFamiliar: item.get("nombre"),
                                                carnet: String(item.get("numCarnet"))
                                            });
                                        }
                                    }
                                });
                                var grid32 = Ext.getCmp("Grid-Pregunta32");
                                Ext.each(grid32.getStore().data.items, function (item, index, allItems) {
                                    if(item.get("numCarnet") != '0'){
                                        if(item.get("nombre") == "" || item.get("numCarnet") == ""){
                                            Ext.Msg.alert('Advertencia', "Hay inconsistencias en la pregunta 32. Por favor verifique", Ext.emptyFn);
                                            return false;
                                        }else{
                                            historia.pregunta32.push({
                                                nombreFamiliar: item.get("nombre"),
                                                carnet: String(item.get("numCarnet"))
                                            });
                                        }
                                    }
                                });
                                var grid33 = Ext.getCmp("Grid-Pregunta33");
                                Ext.each(grid33.getStore().data.items, function (item, index, allItems) {
                                    if(item.get("numCarnet") != '0'){
                                        if(item.get("nombre") == "" || item.get("numCarnet") == ""){
                                            Ext.Msg.alert('Advertencia', "Hay inconsistencias en la pregunta 33. Por favor verifique", Ext.emptyFn);
                                            return false;
                                        }else{
                                            historia.pregunta33.push({
                                                nombreFamiliar: item.get("nombre"),
                                                carnet: String(item.get("numCarnet"))
                                            });
                                        }
                                    }
                                });
                                var hfdfr = {
                                    info: info,
                                    historia: historia
                                };
                                console.log(hfdfr);
                                localStorage.setItem("hfdfr-" + infoHfdfr.idFuanAfiliado, JSON.stringify(hfdfr));
                                Ext.Msg.alert('Señor Usuario', "La información ha sido guardada exitosamente", Ext.emptyFn);
                                Ext.getCmp("Form-Hfdfr-Principal").destroy();
                            }
                        }
                    });
}
},
{ 
    minWidth: 80, 
    text: 'Cancelar', 
    handler: function(btn, e) {
        Ext.getCmp("Form-Hfdfr-Principal").destroy();
    }, 
    reference: "botonCancelar",
    width: 120 
}
]
}    
]
});