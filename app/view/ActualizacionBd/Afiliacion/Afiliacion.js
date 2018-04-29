Ext.define("CoomuceMovil.view.ActualizacionBd.Afiliacion", {
    extend: "Ext.form.Panel",

    xtype: "afiliacion",

    requires: [
        "Ext.grid.Grid",
        'Ext.grid.plugin.Editable',
        'Ext.grid.plugin.ViewOptions',
        'Ext.grid.plugin.ColumnResizing',
        'Ext.grid.plugin.MultiSelection',

        "CoomuceMovil.view.ActualizacionBd.AfiliacionController",
        "CoomuceMovil.view.ActualizacionBd.AfiliacionModel"
    ],

    controller: "actualizacionbd-afiliacion",
    viewModel: { type: "actualizacionbd-afiliacion" },

    bodyPadding: 10,
    id: "Form-Afiliacion",

    items: [
        {
            xtype: "fieldset",
            defaults: {
                allowBlank: false,
                anchor: "100%",
                labelWidth: 150
            },
            items: [
                { xtype: "numberfield", hidden: true, name: "idTipoTramite", value: 1 },
                {
                    xtype: "selectfield",
                    bind: { store: "{getTipoAfiliacion}" },
                    displayField: "compTipoAfiliacion",
                    editable: false,
                    label: "Tipo de Afiliación",
                    name: "idTipoAfiliacion",
                    valueField: "idTipoAfiliacion"
                },
                {
                    xtype: "selectfield",
                    bind: { store: "{getTipoRegimen}" },
                    displayField: "compTipoRegimen",
                    editable: false,
                    label: "Régimen",
                    name: "idTipoRegimen",
                    valueField: "idTipoRegimen"
                },
                {
                    xtype: "selectfield",
                    bind: { store: "{getTipoAfiliado}" },
                    displayField: "compTipoAfiliado",
                    editable: false,
                    label: "Tipo de Afiliado",
                    name: "idTipoAfiliado",
                    valueField: "idTipoAfiliado"
                },
                {
                    xtype: "selectfield",
                    bind: { store: "{getTipoCotizante}" },
                    displayField: "compTipoCotizante",
                    editable: false,
                    label: "Tipo de Cotizante",
                    name: "idTipoCotizante",
                    valueField: "idTipoCotizante"
                },
                {
                    xtype: "textfield",
                    label: "Código<br />(A registrar por la EPS)",
                    name: "codigoCotizanteFuan"
                }
            ],
            title: "I. DATOS DEL TRAMITE"
        },
        {
            xtype: "fieldset",
            defaults: {
                allowBlank: false,
                anchor: "100%",
                labelWidth: 150
            },
            items: [
                {
                    xtype: "textfield",
                    label: "Primer apellido",
                    name: "primerApellidoFuanAfiliado"
                },
                {
                    xtype: "textfield",
                    allowBlank: true,
                    label: "Segundo apellido",
                    name: "segundoApellidoFuanAfiliado"
                },
                {
                    xtype: "textfield",
                    label: "Primer nombre",
                    name: "primerNombreFuanAfiliado"
                },
                {
                    xtype: "textfield",
                    allowBlank: true,
                    label: "Segundo nombre",
                    name: "segundoNombreFuanAfiliado"
                },
                {
                    xtype: "selectfield",
                    bind: { store: "{getTipoIdentificacion}" },
                    displayField: "compTipoIdentificacion",
                    editable: false,
                    label: "Tipo documento de identidad",
                    name: "idTipoIdentificacionII",
                    valueField: "idTipoIdentificacion"
                },
                {
                    xtype: "textfield",
                    label: "Número de documento de identidad",
                    name: "identificacionFuanAfiliado"
                },
                {
                    xtype: "selectfield",
                    bind: { store: "{getTipoSexo}" },
                    displayField: "compTipoSexo",
                    editable: false,
                    label: "Sexo",
                    name: "idTipoSexoII",
                    valueField: "idTipoSexo"
                },
                {
                    xtype: "datepickerfield",
                    label: "Fecha de nacimiento",
                    name: "fechaNacimientoFuanAfiliado"
                }
            ],
            title: "II. DATOS BÁSICOS DE IDENTIFICACIÓN<br />(del cotizante o cabeza de familia)"
        },
        {
            xtype: "fieldset",
            defaults: {
                allowBlank: false,
                anchor: "100%",
                labelWidth: 150
            },
            items: [
                {
                    xtype: "label",
                    html: "<b>Datos Personales</b>"
                },
                {
                    xtype: "selectfield",
                    bind: { store: "{getTipoEtnia}" },
                    displayField: "compTipoEtnia",
                    editable: false,
                    label: "Etnia",
                    name: "idTipoEtnia",
                    queryMode: "local",
                    valueField: "idTipoEtnia"
                },
                {
                    xtype: "selectfield",
                    allowBlank: true,
                    bind: { store: "{getTipoDiscapacidad}" },
                    displayField: "compTipoDiscapacidad",
                    editable: false,
                    label: "Tipo discapacidad",
                    name: "idTipoDiscapacidad",
                    valueField: "idTipoDiscapacidad"
                },
                {
                    xtype: "selectfield",
                    allowBlank: true,
                    bind: { store: "{getCondicionDiscapacidad}" },
                    displayField: "compCondicionDiscapacidad",
                    editable: false,
                    label: "Condición discapacidad",
                    name: "idCondicionDiscapacidad",
                    valueField: "idCondicionDiscapacidad"
                },
                {
                    xtype: "numberfield",
                    label: "Puntaje SISBEN",
                    name: "puntajeSisbenFuanAfiliado"
                },
                {
                    xtype: "numberfield",
                    label: "No. Carnet",
                    name: "numCarnetFuanAfiliado"
                },
                {
                    xtype: "selectfield",
                    bind: { store: "{getGrupoPoblacional}" },
                    displayField: "compGrupoPoblacional",
                    editable: false,
                    label: "Grupo de población especial",
                    name: "idGrupoPoblacional",
                    valueField: "idGrupoPoblacional"
                },
                {
                    xtype: "textfield",
                    allowBlank: true,
                    label: "Administradora de Riesgos Laborales - ARL",
                    name: "arlFuanAfiliado"
                },
                {
                    xtype: "textfield",
                    allowBlank: true,
                    label: "Administradora de Pensiones",
                    name: "pensionFuanAfiliado"
                },
                {
                    xtype: "numberfield",
                    allowBlank: true,
                    label: "Ingreso Base de Cotización - IBC",
                    hideTrigger: true,
                    name: "ibcFuanAfiliado"
                },
                {
                    xtype: "textfield",
                    label: "Dirección residencia",
                    name: "direccionFuanAfiliado"
                },
                {
                    xtype: "textfield",
                    allowBlank: true,
                    label: "Teléfono Fijo",
                    name: "telefonoFuanAfiliado"
                },
                {
                    xtype: "textfield",
                    allowBlank: true,
                    label: "Teléfono Celular",
                    name: "celularFuanAfiliado"
                },
                {
                    xtype: "textfield",
                    allowBlank: true,
                    label: "Correo Electrónico",
                    name: "emailFuanAfiliado",
                    vtype: "email"
                },
                {
                    xtype: "selectfield",
                    bind: { store: "{getDepartamento}" },
                    ciudadReference: "idCiudadfIII",
                    displayField: "compDepartamento",
                    editable: false,
                    label: "Departamento",
                    listeners: {
                        select: "onSelectCombo"
                    },
                    name: "idDepartamento",
                    ubicacion: true,
                    valueField: "idDepartamento"
                },
                {
                    xtype: "selectfield",
                    bind: { store: "{getCiudad}" },
                    displayField: "compCiudad",
                    editable: false,
                    label: "Municipio/Distrito",
                    name: "idCiudadIII",
                    reference: "idCiudadfIII",
                    valueField: "idCiudad"
                },
                {
                    xtype: "selectfield",
                    bind: { store: "{getTipoZona}" },
                    displayField: "compTipoZona",
                    editable: false,
                    label: "Zona",
                    name: "idTipoZona",
                    valueField: "idTipoZona"
                },
                {
                    xtype: "textfield",
                    allowBlank: true,
                    label: "Localidad / Comuna",
                    name: "barrioFuanAfiliado"
                }
            ],
            title: "III. DATOS COMPLEMENTARIOS"
        },
        {
            xtype: "fieldset",
            defaults: {
                allowBlank: true,
                anchor: "100%",
                labelWidth: 150
            },
            items: [
                {
                    xtype: "label",
                    html: "<b>Datos básicos de Identificación del cónyuge o compañero(a) permanente cotizante</b>"
                },
                {
                    xtype: "textfield",
                    label: "Primer apellido",
                    name: "primerApellidoConyugueFuanAfiliado"
                },
                {
                    xtype: "textfield",
                    label: "Segundo apellido",
                    name: "segundoApellidoConyugueFuanAfiliado"
                },
                {
                    xtype: "textfield",
                    label: "Primer nombre",
                    name: "primerNombreConyugueFuanAfiliado"
                },
                {
                    xtype: "textfield",
                    label: "Segundo nombre",
                    name: "segundoNombreConyugueFuanAfiliado"
                },
                {
                    xtype: "selectfield",
                    bind: { store: "{getTipoIdentificacion}" },
                    displayField: "compTipoIdentificacion",
                    editable: false,
                    label: "Tipo documento de identidad",
                    name: "idTipoIdentificacionConyugue",
                    valueField: "idTipoIdentificacion"
                },
                {
                    xtype: "textfield",
                    label: "Número de documento de identidad",
                    name: "identificacionConyugueFuanAfiliado"
                },
                {
                    xtype: "selectfield",
                    bind: { store: "{getTipoSexo}" },
                    displayField: "compTipoSexo",
                    editable: false,
                    label: "Sexo",
                    name: "idTipoSexoConyugueFuanAfiliado",
                    valueField: "idTipoSexo"
                },
                {
                    xtype: "datepickerfield",
                    label: "Fecha de nacimiento",
                    name: "fechaNacimientoConyugueFuanAfiliado"
                },
                {
                    xtype: "grid",
                    border: true,
                    columns: [
                        {
                            dataIndex: "primerApellidoFuanAfiliado", text: "Primer apellido", editable: true, editor: {
                                xtype: "textfield",
                                allowBlank: false
                            }
                        },
                        {
                            dataIndex: "segundoApellidoFuanAfiliado", text: "Segundo apellido", editable: true, editor: {
                                xtype: "textfield",
                                allowBlank: true
                            }
                        },
                        {
                            dataIndex: "primerNombreFuanAfiliado", text: "Primer nombre", editable: true, editor: {
                                xtype: "textfield",
                                allowBlank: false
                            }
                        },
                        {
                            dataIndex: "segundoNombreFuanAfiliado", text: "Segundo nombre", editable: true, editor: {
                                xtype: "textfield",
                                allowBlank: true
                            }
                        },
                        {
                            dataIndex: "idTipoIdentificacion", text: "Id Identificación", hidden: true
                        },
                        {
                            dataIndex: "compTipoIdentificacion", text: "Tipo de documento de identidad", editable: true, editor: {
                                xtype: "selectfield",
                                displayField: "compTipoIdentificacion",
                                editable: false,
                                idCampo: "idTipoIdentificacion",
                                listeners: {
                                    select: "onSelectCombo"
                                },
                                bind: { store: "{getTipoIdentificacion}" },
                                valueField: "compTipoIdentificacion"
                            }
                        },
                        {
                            dataIndex: "identificacionFuanAfiliado", text: "Número de documento de identidad", editable: true, editor: {
                                xtype: "textfield",
                                allowBlank: true
                            }
                        },
                        {
                            dataIndex: "idTipoSexo", text: "Id Tipo Sexo", hidden: true
                        },
                        {
                            dataIndex: "compTipoSexo", text: "Sexo", editable: true, editor: {
                                xtype: "selectfield",
                                displayField: "compTipoSexo",
                                editable: false,
                                idCampo: "idTipoSexo",
                                listeners: {
                                    select: "onSelectCombo"
                                },
                                bind: { store: "{getTipoSexo}" },
                                valueField: "compTipoSexo"
                            }
                        },
                        {
                            dataIndex: "fechaNacimientoFuanAfiliado", text: "Fecha de nacimiento", editable: true, editor: {
                                xtype: "datepickerfield",
                                format: "d/m/Y"
                            }
                        },
                        {
                            text: "DATOS COMPLEMENTARIOS",
                            columns: [
                                { dataIndex: "numCarnetFuanAfiliado", text: "No. Carnet" },
                                {
                                    dataIndex: "idTipoParentesco", text: "Id Tipo Parentesco", hidden: true
                                },
                                {
                                    dataIndex: "compTipoParentesco", text: "Parentesco", editable: true, editor: {
                                        xtype: "selectfield",
                                        displayField: "compTipoParentesco",
                                        editable: false,
                                        idCampo: "idTipoParentesco",
                                        listeners: {
                                            select: "onSelectCombo"
                                        },
                                        bind: { store: "{getTipoParentesco}" },
                                        valueField: "compTipoParentesco"
                                    }
                                },
                                {
                                    dataIndex: "idTipoEtnia", text: "Id Tipo Etnia", hidden: true
                                },
                                {
                                    dataIndex: "compTipoEtnia", text: "Etnia", editable: true, editor: {
                                        xtype: "selectfield",
                                        displayField: "compTipoEtnia",
                                        editable: false,
                                        idCampo: "idTipoEtnia",
                                        listeners: {
                                            select: "onSelectCombo"
                                        },
                                        bind: { store: "{getTipoEtnia}" },
                                        valueField: "compTipoEtnia"
                                    }
                                },
                                {
                                    text: "Discapacidad",
                                    columns: [
                                        {
                                            dataIndex: "idTipoDiscapacidad", text: "Id Tipo Discapacidad", hidden: true
                                        },
                                        {
                                            dataIndex: "compTipoDiscapacidad", text: "Tipo", editable: true, editor: {
                                                xtype: "selectfield",
                                                displayField: "compTipoDiscapacidad",
                                                editable: false,
                                                idCampo: "idTipoDiscapacidad",
                                                listeners: {
                                                    select: "onSelectCombo"
                                                },
                                                bind: { store: "{getTipoDiscapacidad}" },
                                                valueField: "compTipoDiscapacidad"
                                            }
                                        },
                                        {
                                            dataIndex: "idCondicionDiscapacidad", text: "Id Condición Discapacidad", hidden: true
                                        },
                                        {
                                            dataIndex: "compCondicionDiscapacidad", text: "Condición", editable: true, editor: {
                                                xtype: "selectfield",
                                                displayField: "compCondicionDiscapacidad",
                                                editable: false,
                                                idCampo: "idCondicionDiscapacidad",
                                                listeners: {
                                                    select: "onSelectCombo"
                                                },
                                                bind: { store: "{getCondicionDiscapacidad}" },
                                                valueField: "compCondicionDiscapacidad"
                                            }
                                        }
                                    ]
                                },
                                {
                                    text: "Datos de Residencia",
                                    columns: [
                                        {
                                            dataIndex: "idDepartamento", text: "Id Departamento", hidden: true
                                        },
                                        {
                                            dataIndex: "compDepartamento", text: "Departamento", editable: true, editor: {
                                                xtype: "selectfield",
                                                displayField: "compDepartamento",
                                                editable: false,
                                                idCampo: "idDepartamento",
                                                listeners: {
                                                    select: "onSelectCombo"
                                                },
                                                bind: { store: "{getDepartamento}" },
                                                valueField: "compDepartamento"
                                            }
                                        },
                                        {
                                            dataIndex: "idCiudad", text: "Id Ciudad", hidden: true
                                        },
                                        {
                                            dataIndex: "compCiudad", text: "Municipio/Distrito", editable: true, editor: {
                                                xtype: 'selectfield',
                                                allowBlank: false,
                                                displayField: 'compCiudad',
                                                editable: false,
                                                idCampo: "idCiudad",
                                                listeners: {
                                                    focus: "onFocusCombo",
                                                    select: "onSelectCombo"
                                                },
                                                bind: { store: "{getCiudad}" },
                                                valueField: 'compCiudad'
                                            }
                                        },
                                        {
                                            dataIndex: "idTipoZona", text: "Id Tipo Zona", hidden: true
                                        },
                                        {
                                            dataIndex: "compTipoZona", text: "Zona", editable: true, editor: {
                                                xtype: "selectfield",
                                                displayField: "compTipoZona",
                                                editable: false,
                                                idCampo: "idTipoZona",
                                                listeners: {
                                                    select: "onSelectCombo"
                                                },
                                                bind: { store: "{getTipoZona}" },
                                                valueField: "compTipoZona"
                                            }
                                        },
                                        {
                                            dataIndex: "telefonoFuanAfiliado", text: "Teléfono Fijo y/o Celular", editable: true, editor: {
                                                allowBlank: true
                                            }
                                        },
                                        {
                                            dataIndex: "upcFuanAfiliado", text: "Valor de la UPC del afiliado adicional", editable: true, editor: {
                                                xtype: "numberfield",
                                                decimalPrecision: 0
                                            }
                                        }
                                    ]
                                }
                            ]
                        }
                    ],
                    columnLines: true,
                    height: 250,
                    id: "Grid-Beneficiarios",
                    plugins: [
                        { type: 'grideditable', enableDeleteButton: true },
                        { type: 'gridviewoptions' },
                        { type: 'gridcolumnresizing' }
                    ],
                    sortableColumns: false,
                    bind: { store: "{setFuanBeneficiario}" },
                    title: "Datos básicos de identificación de los beneficiarios y los afiliados adicionales",
                    tools: [
                        { handler: "onToolBeneficiarioAdicionarClick", tooltip: "Adicionar beneficiario", type: "plus" },
                        { handler: "onToolBeneficiarioRemoverClick", tooltip: "Remover beneficiario", type: "minus" }
                    ]
                },
                { xtype: "container", html: "&nbsp;" },
                {
                    xtype: "grid",
                    bind: { store: "{setFuanIpsPrimaria}" },
                    border: true,
                    columns: [
                        {
                            text: "Nombre de la Institución Prestadora de Servicios de Salud - IPS",
                            columns: [
                                {
                                    dataIndex: "tipoFuanIpsPrimariaAfiliado", text: "Tipo", editable: true, editor: {
                                        xtype: "selectfield",
                                        displayField: "nombre",
                                        editable: false,
                                        bind: { store: "{getTipoIps}" },
                                        valueField: "nombre"
                                    }
                                },
                                {
                                    dataIndex: "nombreFuanIpsPrimariaAfiliado", text: "", width: 400, editable: true, editor: {
                                        xtype: "textfield",
                                        allowBlank: false
                                    }
                                }
                            ]
                        },
                        {
                            dataIndex: "codigoFuanIpsPrimariaAfiliado", text: "Código de la IPS<br />(A registrar por la EPS)", editable: true, editor: {
                                xtype: "textfield",
                                allowBlank: false
                            }
                        }
                    ],
                    columnLines: true,
                    height: 200,
                    id: "Grid-IpsPrimaria",
                    plugins: [
                        { type: 'grideditable', enableDeleteButton: true },
                        { type: 'gridviewoptions' },
                        { type: 'gridcolumnresizing' }
                    ],
                    sortableColumns: false,
                    title: "Selección de la EPS primaria",
                    tools: [
                        { handler: "onToolIpsPrimariaAdicionarClick", tooltip: "Adicionar IPS", type: "plus" },
                        { handler: "onToolIpsPrimariaRemoverClick", tooltip: "Remover IPS", type: "minus" }
                    ]
                }
            ],
            title: "IV. DATOS DE IDENTIIFICACIÓN <br />DE LOS MIEMBROS DEL NÚCLEO FAMILIAR"
        },
        {
            xtype: "fieldset",
            defaults: {
                allowBlank: true,
                anchor: "100%",
                labelWidth: 150
            },
            items: [
                {
                    xtype: "textfield",
                    label: "Nombre o Razón Social",
                    name: "nombreFuanEmpleadorAfiliado"
                },
                {
                    xtype: "selectfield",
                    bind: {
                        store: "{getTipoIdentificacion}"
                    },
                    displayField: "compTipoIdentificacion",
                    editable: false,
                    label: "Tipo documento de identidad",
                    name: "idTipoIdentificacion",
                    queryMode: "local",
                    valueField: "idTipoIdentificacion"
                },
                {
                    xtype: "textfield",
                    label: "Número de documento de identidad",
                    name: "identificacionFuanEmpleadorAfiliado"
                },
                {
                    xtype: "textfield",
                    label: "Tipo de aportante o pagador pensiones (A registrar por la EPS)",
                    name: "tipoPagadorFuanEmpleadorAfiliado"
                },
                {
                    xtype: "textfield",
                    label: "Dirección",
                    name: "direccionFuanEmpleadorAfiliado"
                },
                {
                    xtype: "textfield",
                    label: "Teléfono",
                    name: "telefonoFuanEmpleadorAfiliado"
                },
                {
                    xtype: "textfield",
                    label: "Correo Electrónico",
                    name: "emailFuanEmpleadorAfiliado",
                    vtype: "email"
                },
                {
                    xtype: "selectfield",
                    bind: {
                        store: "{getDepartamento}"
                    },
                    ciudadReference: "idCiudadfV",
                    displayField: "compDepartamento",
                    editable: false,
                    label: "Departamento",
                    listeners: {
                        select: "onSelectCombo"
                    },
                    name: "idDepartamento",
                    queryMode: "local",
                    ubicacion: true,
                    valueField: "idDepartamento"
                },
                {
                    xtype: "selectfield",
                    bind: {
                        store: "{getCiudad}"
                    },
                    displayField: "compCiudad",
                    editable: false,
                    label: "Municipio/Distrito",
                    name: "idCiudadV",
                    queryMode: "local",
                    reference: "idCiudadfV",
                    valueField: "idCiudad"
                }
            ],
            title: "V. DATOS DE IDENTIFICACIÓN DEL EMPLEADOR Y OTROS APORTANTES <br />DE LAS ENTIDADES RESPONSABLES DE LA AFILIACIÓN COLECTIVA, INSTITUCIONAL O DE OFICIO"
        },
        {
            xtype: "fieldset",
            defaults: {
                anchor: "100%"
            },
            items: [
                {
                    xtype: "grid",
                    bind: { store: "{getDeclaracionAutorizacion}" },
                    columns: [
                        {
                            xtype: "booleancolumn", dataIndex: "valorFuanDeclaracionAutorizacion", text: "Selección", width: 60, editable: true, editor: {
                                xtype: "checkboxfield"
                            }
                        },
                        { dataIndex: "compDeclaracionAutorizacion", text: "Descripción", width: 700 }
                    ],
                    columnLines: true,
                    height: 300,
                    hideHeaders: true,
                    plugins: [
                        { type: 'grideditable', enableDeleteButton: true },
                        { type: 'gridviewoptions' },
                        { type: 'gridcolumnresizing' }
                    ],
                    id: "Grid-DeclaracionAutorizacion"
                }
            ],
            title: "VII. DECLARACION Y AUTORIZACIONES"
        },
        {
            xtype: "fieldset",
            defaults: {
                allowBlank: false,
                anchor: "100%"
            },
            items: [
                {
                    xtype: "label",
                    html: "<b>Identificación de la entidad territorial</b>"
                },
                {
                    xtype: "selectfield",
                    bind: { store: "{getDepartamento}" },
                    ciudadReference: "idCiudadfX",
                    displayField: "compDepartamento",
                    editable: false,
                    label: "Departamento",
                    listeners: {
                        select: "onSelectCombo"
                    },
                    name: "idDepartamento",
                    ubicacion: true,
                    valueField: "idDepartamento"
                },
                {
                    xtype: "selectfield",
                    bind: { store: "{getCiudad}" },
                    displayField: "compCiudad",
                    editable: false,
                    label: "Municipio",
                    name: "idCiudadX",
                    reference: "idCiudadfX",
                    valueField: "idCiudad"
                },
                {
                    xtype: "label",
                    html: "<b>Datos del SISBEN</b>"
                },
                {
                    xtype: "textfield",
                    label: "Número de Ficha",
                    name: "numFichaSisbenFuanEntidadTerritorial"
                },
                {
                    xtype: "numberfield",
                    label: "Puntaje",
                    name: "puntajeSisbenFuanEntidadTerritorial"
                },
                {
                    xtype: "numberfield",
                    label: "Nivel",
                    name: "nivelSisbenFuanEntidadTerritorial"
                },
                {
                    xtype: "datepickerfield",
                    label: "Fecha radicación",
                    name: "fechaRadicacionFuanEntidadTerritorial"
                },
                {
                    xtype: "datepickerfield",
                    label: "Fecha de validación",
                    name: "fechaValidacionFuanEntidadTerritorial"
                },
                { xtype: "numberfield", hidden: true, name: "idUsuario", value: Coomuce.Util.DatosUsuario.idUsuario },
                {
                    xtype: "textareafield",
                    label: "Observaciones",
                    name: "observacionFuanEntidadTerritorial"
                }
            ],
            title: "X. DATOS A SER DILIGENCIADOS POR LA ENTIDAD TERRITORIAL"
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
                { minWidth: 80, text: 'Guardar', handler: 'onBotonGuardarClick', reference: "botonGuardar", width: 120 },
                { minWidth: 80, text: 'Cancelar', handler: 'onBotonCancelarClick', reference: "botonCancelar", width: 120 }
            ]
        }
    ]

});