Ext.define("CoomuceMovil.view.ActualizacionBd.Afiliacion", {
    extend: "Ext.form.Panel",
    id: "Form-Afiliacion",
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
            name: "codigoCotizanteFuan",
            allowBlank: true,
            value: ""
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
            name: "primerApellidoFuanAfiliado",
            value: ""
        },
        {
            xtype: "textfield",
            allowBlank: true,
            label: "Segundo apellido",
            name: "segundoApellidoFuanAfiliado",
            value: ""
        },
        {
            xtype: "textfield",
            label: "Primer nombre",
            name: "primerNombreFuanAfiliado",
            value: ""
        },
        {
            xtype: "textfield",
            allowBlank: true,
            label: "Segundo nombre",
            name: "segundoNombreFuanAfiliado",
            value: ""
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
            name: "identificacionFuanAfiliado",
            value: ""
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
            name: "fechaNacimientoFuanAfiliado",
            format: "d/m/Y"
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
            xtype: "textfield",
            label: "Puntaje SISBEN",
            listeners: {
                blur: "onDecimalNumber"
            },
            name: "puntajeSisbenFuanAfiliado",
            id: "puntajeSisbenFuanAfiliado",
            value: ""
        },
        {
            xtype: "numberfield",
            label: "No. Carnet",
            name: "numCarnetFuanAfiliado",
            value: 0
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
            xtype: "selectfield",
            allowBlank: true,
            bind: { store: "{getListadoAfp}" },
            displayField: "compNombreAfp",
            editable: false,
            label: "Administradora de Riesgos Laborales - ARL",
            name: "arlFuanAfiliado",
            valueField: "compNombreAfp"
        },
        {
            xtype: "selectfield",
            allowBlank: true,
            bind: { store: "{getListadoArl}" },
            displayField: "compNombreArl",
            editable: false,
            label: "Administradora de Pensiones",
            name: "pensionFuanAfiliado",
            valueField: "compNombreArl"
        },
        {
            xtype: "textfield",
            allowBlank: true,
            label: "Ingreso Base de Cotización - IBC",
            listeners: {
                blur: "onFormatNumber"
            },
            hideTrigger: true,
            name: "ibcFuanAfiliado",
            id: "ibcFuanAfiliado",
            value: "781242"
        },
        {
            xtype: "textfield",
            label: "Dirección residencia",
            name: "direccionFuanAfiliado",
            value: ""
        },
        {
            xtype: "textfield",
            allowBlank: true,
            label: "Teléfono Fijo",
            name: "telefonoFuanAfiliado",
            value: ""
        },
        {
            xtype: "textfield",
            allowBlank: true,
            label: "Teléfono Celular",
            name: "celularFuanAfiliado",
            value: ""
        },
        {
            xtype: "textfield",
            allowBlank: true,
            label: "Correo Electrónico",
            name: "emailFuanAfiliado",
            vtype: "email",
            value: ""
        },
        {
            xtype: "selectfield",
            allowBlank: false,
            bind: { store: "{getDepartamento}" },
            campoDependent: "idCiudadIII",
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
            name: "idCiudadIII",
            id: "idCiudadIII",
            queryMode: "local",
            reference: "idCiudadIII",
            valueField: "idCiudad",
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
            name: "barrioFuanAfiliado",
            value: ""
        }
        ],
        title: "III. DATOS COMPLEMENTARIOS"
    },
    {
        xtype: "fieldset",
        title: "IV. DATOS DE IDENTIIFICACIÓN <br />DE LOS MIEMBROS DEL NÚCLEO FAMILIAR",
        items: [
        {
            xtype: "label",
            html: "<b>Datos básicos de Identificación del cónyuge o compañero(a) permanente cotizante</b>"
        },
        {
            xtype: "textfield",
            label: "Primer apellido",
            name: "primerApellidoConyugueFuanAfiliado",
            value: ""
        },
        {
            xtype: "textfield",
            label: "Segundo apellido",
            name: "segundoApellidoConyugueFuanAfiliado",
            value: ""
        },
        {
            xtype: "textfield",
            label: "Primer nombre",
            name: "primerNombreConyugueFuanAfiliado",
            value: ""
        },
        {
            xtype: "textfield",
            label: "Segundo nombre",
            name: "segundoNombreConyugueFuanAfiliado",
            value: ""
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
            name: "identificacionConyugueFuanAfiliado",
            value: ""
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
            name: "fechaNacimientoConyugueFuanAfiliado",
            format: "d/m/Y"
        }
        ]
    },
    {
        xtype: "fieldset",
        title: "Agregar Nuevo Beneficiario",
        items: [
        {
            xtype: "textfield",
            label: "Primer Apellido Beneficiario",
            name: "primerApellidoFuanBeneficiariosAfiliado",
            value: "",
            id: "primerApellidoFuanBeneficiariosAfiliado"
        },
        {
            xtype: "textfield",
            label: "Segundo Apellido Beneficiario",
            name: "segundoApellidoFuanBeneficiariosAfiliado",
            value: "",
            id: "segundoApellidoFuanBeneficiariosAfiliado"
        },
        {
            xtype: "textfield",
            label: "Primer Nombre Beneficiario",
            name: "primerNombreFuanBeneficiariosAfiliado",
            value: "",
            id: "primerNombreFuanBeneficiariosAfiliado"
        },
        {
            xtype: "textfield",
            label: "Segundo Nombre Beneficiario",
            name: "segundoNombreFuanBeneficiariosAfiliado",
            value: "",
            id: "segundoNombreFuanBeneficiariosAfiliado"
        },
        {
            xtype: "textfield",
            id: "compTipoIdentificacionBeneficiario",
            name: "compTipoIdentificacionBeneficiario",
            hidden: true
        },
        {
            xtype: "selectfield",
            bind: { store: "{getTipoIdentificacion}" },
            displayField: "compTipoIdentificacion",
            editable: false,
            label: "Tipo documento de identidad",
            name: "idTipoIdentificacionBeneficiario",
            id: "idTipoIdentificacionBeneficiario",
            valueField: "idTipoIdentificacion",
            listeners: {
                change: "onSelectTipoIdentificacionBeneficiario"
            }
        },
        {
            xtype: "textfield",
            label: "Num Identificación Beneficiario",
            name: "IdentificacionBeneficiario",
            value: "0",
            id: "IdentificacionBeneficiario"
        },
        {
            xtype: "textfield",
            name: "compTipoSexoBeneficiario",
            id: "compTipoSexoBeneficiario",
            hidden: true
        },
        {
            xtype: "selectfield",
            bind: { store: "{getTipoSexo}" },
            displayField: "compTipoSexo",
            editable: false,
            label: "Sexo",
            name: "idTipoSexoBeneficiario",
            id: "idTipoSexoBeneficiario",
            valueField: "idTipoSexo",
            listeners: {
                change: "onSelectTipoSexoBeneficiario"
            }
        },
        {
            xtype: "datepickerfield",
            label: "Fecha de nacimiento Beneficiario",
            name: "fechaNacimientoFuanBeneficiariosAfiliado",
            id: "fechaNacimientoFuanBeneficiariosAfiliado",
            format: "d/m/Y"
        },
        {
            xtype: "textfield",
            label: "Num Carnet Beneficiario",
            name: "numCarnetBeneficiario",
            value: "",
            id: "numCarnetBeneficiario"
        },
        {
            xtype: "textfield",
            name: "compTipoParentescoBeneficiario",
            id: "compTipoParentescoBeneficiario",
            hidden: true
        },
        {
            xtype: "selectfield",
            bind: { store: "{getTipoParentesco}" },
            displayField: "compTipoParentesco",
            editable: false,
            label: "Parentesco",
            name: "idTipoParentescoBeneficiario",
            id: "idTipoParentescoBeneficiario",
            valueField: "idTipoParentesco",
            listeners: {
                change: "onSelectTipoParentescoBeneficiario"
            }
        },
        {
            xtype: "textfield",
            name: "compTipoEtniaBeneficiario",
            id: "compTipoEtniaBeneficiario",
            hidden: true
        },
        {
            xtype: "selectfield",
            bind: { store: "{getTipoEtnia}" },
            displayField: "compTipoEtnia",
            editable: false,
            label: "Tipo Etnia",
            name: "idTipoEtniaBeneficiario",
            id: "idTipoEtniaBeneficiario",
            valueField: "idTipoEtnia",
            listeners: {
                change: "onSelectTipoEtniaBeneficiario"
            }
        },
        {
            xtype: "textfield",
            name: "compTipoDiscapacidadBeneficiario",
            id: "compTipoDiscapacidadBeneficiario",
            hidden: true
        },
        {
            xtype: "selectfield",
            bind: { store: "{getTipoDiscapacidad}" },
            displayField: "compTipoDiscapacidad",
            editable: false,
            label: "Tipo Discapacidad",
            name: "idTipoDiscapacidadBeneficiario",
            id: "idTipoDiscapacidadBeneficiario",
            valueField: "idTipoDiscapacidad",
            listeners: {
                change: "onSelectTipoDiscapacidadBeneficiario"
            }
        },
        {
            xtype: "textfield",
            name: "compCondicionDiscapacidadBeneficiario",
            id: "compCondicionDiscapacidadBeneficiario",
            hidden: true
        },
        {
            xtype: "selectfield",
            bind: { store: "{getCondicionDiscapacidad}" },
            displayField: "compCondicionDiscapacidad",
            editable: false,
            label: "Condición Discapacidad",
            name: "idCondicionDiscapacidadBeneficiario",
            id: "idCondicionDiscapacidadBeneficiario",
            valueField: "idCondicionDiscapacidad",
            listeners: {
                change: "onSelectCondDiscapacidadBeneficiario"
            }
        },
        {
            xtype: "textfield",
            name: "compDepartamentoBeneficiario",
            id: "compDepartamentoBeneficiario",
            hidden: true
        },
        {
            xtype: "textfield",
            name: "compCiudadBeneficiario",
            id: "compCiudadBeneficiario",
            hidden: true
        },
        {
            xtype: "selectfield",
            allowBlank: false,
            bind: { store: "{getDepartamento}" },
            campoDependent: "idCiudadBeneficiario",
            dependent: true,
            displayField: "compDepartamento",
            editable: false,
            label: "Departamento",
            name: "idDepartamentoBeneficiario",
            id: "idDepartamentoBeneficiario",
            queryMode: "local",
            reference: "idDepartamentoBeneficiario",
            valueField: "idDepartamento",
            listeners: {
                change: "onSelectDepartmentBeneficiario"
            }
        },
        {
            xtype: "selectfield",
            allowBlank: false,
            bind: {
                store: "{getCiudadBeneficiario}"
            },
            displayField: "compCiudad",
            editable: false,
            label: "Municipio",
            name: "idCiudadBeneficiario",
            id: "idCiudadBeneficiario",
            queryMode: "local",
            reference: "idCiudadBeneficiario",
            valueField: "idCiudad",
            listeners: {
                change: "onSelectCiudadBeneficiario"
            }
        },

        {
            xtype: "textfield",
            name: "compTipoZonaBeneficiario",
            id: "compTipoZonaBeneficiario",
            hidden: true
        },
        {
            xtype: "selectfield",
            bind: { store: "{getTipoZona}" },
            displayField: "compTipoZona",
            editable: false,
            label: "Zona",
            name: "idTipoZonaBeneficiario",
            id: "idTipoZonaBeneficiario",
            valueField: "idTipoZona",
            listeners: {
                change: "onSelectZonaBeneficiario"
            }
        },
        {
            xtype: "textfield",
            label: "Teléfono",
            name: "telefonoFuanBeneficiariosAfiliado",
            id: "telefonoFuanBeneficiariosAfiliado",
            value: ""
        },
        {
            xtype: "textfield",
            label: "Valor UPC Afiliado",
            name: "upcFuanBeneficiariosAfiliado",
            id: "upcFuanBeneficiariosAfiliado",
            value: ""
        },
        {
            xtype: "textfield",
            name: "firmaBeneficiario",
            value: "",
            id: "firmaBeneficiario",
            hidden: true
        }
        ]
    },
    {
        xtype: "fieldset",
        fullscreen: false,
        items: [
        { 
            xtype: "button", 
            text: "Agregar", 
            iconCls: "x-fa fa-plus-square", 
            listeners:{
                tap:function(btn, e) {

                    var storeBeneficiarios = Ext.getStore("fuanBeneficiarioStore");
                    if(storeBeneficiarios.data.items.length > 0){
                        var item = storeBeneficiarios.data.items[0].data;
                        if(item.identificacionFuanAfiliado == "0"){
                            storeBeneficiarios.removeAll();
                        }
                    }

                    //Tomo los Valores del Formulario
                    var formBeneficiario = btn.up('formpanel');
                    var infoFormBeneficiario = formBeneficiario.getValues();

                    if(infoFormBeneficiario.IdentificacionBeneficiario != ""){
                        //realizo las validaciones correspondientes
                        if(infoFormBeneficiario.primerApellidoFuanBeneficiariosAfiliado == "" || infoFormBeneficiario.primerNombreFuanBeneficiariosAfiliado == "" || infoFormBeneficiario.idTipoIdentificacionBeneficiario == "0" || infoFormBeneficiario.IdentificacionBeneficiario == "" || infoFormBeneficiario.idTipoSexoBeneficiario == "0" || infoFormBeneficiario.fechaNacimientoFuanBeneficiariosAfiliado == null){
                            Ext.Msg.alert('Advertencia', "Débe completar correctamente formulario para continuar", Ext.emptyFn);
                            return false;
                        }

                        //Tercera Linea de Validacion
                        if(infoFormBeneficiario.idTipoEtniaBeneficiario == "0" || infoFormBeneficiario.idTipoDiscapacidadBeneficiario == "0" || infoFormBeneficiario.idCondicionDiscapacidadBeneficiario == "0" || infoFormBeneficiario.idTipoZonaBeneficiario == "0" || infoFormBeneficiario.idDepartamentoBeneficiario == "0" || infoFormBeneficiario.idCiudadBeneficiario == "0"){
                            Ext.Msg.alert('Advertencia', "Débe completar correctamente formulario para continuar", Ext.emptyFn);
                            return false;
                        }

                        //Convierto le fecha que me esta dando problemas
                        var newD = null;
                        if(infoFormBeneficiario.fechaNacimientoFuanBeneficiariosAfiliado != "") {
                            var d = new Date(infoFormBeneficiario.fechaNacimientoFuanBeneficiariosAfiliado);
                            newD = ((d.getDate() < 10)?("0"+d.getDate()):d.getDate())+"/"+(((d.getMonth()+1) < 10)?("0"+(d.getMonth()+1)):(d.getMonth()+1))+"/"+d.getFullYear();
                            console.log(newD);
                        }else{
                            var d = new Date();
                            newD = ((d.getDate() < 10)?("0"+d.getDate()):d.getDate())+"/"+(((d.getMonth()+1) < 10)?("0"+(d.getMonth()+1)):(d.getMonth()+1))+"/"+d.getFullYear();
                            console.log(newD);
                        }

                        storeBeneficiarios.add({
                            idFuanAfiliado: 0,
                            idFuan: 0,
                            tipoFuanAfiliado: "Beneficiario",
                            primerApellidoFuanAfiliado: infoFormBeneficiario.primerApellidoFuanBeneficiariosAfiliado,
                            segundoApellidoFuanAfiliado: infoFormBeneficiario.segundoApellidoFuanBeneficiariosAfiliado,
                            primerNombreFuanAfiliado: infoFormBeneficiario.primerNombreFuanBeneficiariosAfiliado, 
                            segundoNombreFuanAfiliado: infoFormBeneficiario.segundoNombreFuanBeneficiariosAfiliado, 
                            idTipoIdentificacion: infoFormBeneficiario.idTipoIdentificacionBeneficiario,
                            compTipoIdentificacion: infoFormBeneficiario.compTipoIdentificacionBeneficiario,
                            identificacionFuanAfiliado: infoFormBeneficiario.IdentificacionBeneficiario, 
                            idTipoSexo: infoFormBeneficiario.idTipoSexoBeneficiario, 
                            compTipoSexo: infoFormBeneficiario.compTipoSexoBeneficiario,
                            fechaNacimientoFuanAfiliado: newD, 
                            idTipoEtnia: infoFormBeneficiario.idTipoEtniaBeneficiario, 
                            compTipoEtnia: infoFormBeneficiario.compTipoEtniaBeneficiario,
                            idTipoDiscapacidad: infoFormBeneficiario.idTipoDiscapacidadBeneficiario, 
                            compTipoDiscapacidad: infoFormBeneficiario.compTipoDiscapacidadBeneficiario,
                            idCondicionDiscapacidad: infoFormBeneficiario.idCondicionDiscapacidadBeneficiario, 
                            compCondicionDiscapacidad: infoFormBeneficiario.compCondicionDiscapacidadBeneficiario,
                            puntajeSisbenFuanAfiliado: 0,
                            numCarnetFuanAfiliado: infoFormBeneficiario.numCarnetBeneficiario,
                            idTipoParentesco: (infoFormBeneficiario.idTipoParentescoBeneficiario)?infoFormBeneficiario.idTipoParentescoBeneficiario:0,
                            compTipoParentesco: infoFormBeneficiario.compTipoParentescoBeneficiario, 
                            idGrupoPoblacional: 1, 
                            arlFuanAfiliado: "", 
                            pensionFuanAfiliado: "", 
                            ibcFuanAfiliado: 0, 
                            direccionFuanAfiliado: "", 
                            telefonoFuanAfiliado: infoFormBeneficiario.telefonoFuanBeneficiariosAfiliado, 
                            celularFuanAfiliado: "", 
                            emailFuanAfiliado: "", 
                            idDepartamento: infoFormBeneficiario.idDepartamentoBeneficiario,
                            compDepartamento: infoFormBeneficiario.compDepartamentoBeneficiario,
                            idCiudad: infoFormBeneficiario.idCiudadBeneficiario,
                            compCiudad: infoFormBeneficiario.compCiudadBeneficiario,
                            idTipoZona: infoFormBeneficiario.idTipoZonaBeneficiario, 
                            compTipoZona: infoFormBeneficiario.compTipoZonaBeneficiario,
                            barrioFuanAfiliado: "", 
                            primerApellidoConyugueFuanAfiliado: "", 
                            segundoApellidoConyugueFuanAfiliado: "", 
                            primerNombreConyugueFuanAfiliado: "", 
                            segundoNombreConyugueFuanAfiliado: "", 
                            idTipoIdentificacionConyugue: 4, 
                            identificacionConyugueFuanAfiliado: "", 
                            idTipoSexoConyugue: 1, 
                            fechaNacimientoConyugueFuanAfiliado: "",
                            upcFuanAfiliado: (infoFormBeneficiario.upcFuanBeneficiariosAfiliado)?parseFloat(infoFormBeneficiario.upcFuanBeneficiariosAfiliado):0,
                            firmaFuanAfiliado: infoFormBeneficiario.firmaBeneficiario,
                            cabezafamilia: 0,
                            grupofamiliar: infoFormBeneficiario.identificacionFuanAfiliado,
                            identificacionAnexo: ""
                        });
                        console.log(storeBeneficiarios.data.items);
                    //BORRO LOS CONTROLES
                    Ext.getCmp("primerApellidoFuanBeneficiariosAfiliado").setValue("");
                    Ext.getCmp("segundoApellidoFuanBeneficiariosAfiliado").setValue("");
                    Ext.getCmp("primerNombreFuanBeneficiariosAfiliado").setValue("");
                    Ext.getCmp("segundoNombreFuanBeneficiariosAfiliado").setValue("");
                    Ext.getCmp("compTipoIdentificacionBeneficiario").setValue("");
                    Ext.getCmp("IdentificacionBeneficiario").setValue("");
                    Ext.getCmp("compTipoSexoBeneficiario").setValue("");
                    Ext.getCmp("numCarnetBeneficiario").setValue("");
                    Ext.getCmp("compTipoParentescoBeneficiario").setValue("");
                    Ext.getCmp("compTipoEtniaBeneficiario").setValue("");
                    Ext.getCmp("compTipoDiscapacidadBeneficiario").setValue("");
                    Ext.getCmp("compCondicionDiscapacidadBeneficiario").setValue("");
                    Ext.getCmp("compDepartamentoBeneficiario").setValue("");
                    Ext.getCmp("compCiudadBeneficiario").setValue("");
                    Ext.getCmp("telefonoFuanBeneficiariosAfiliado").setValue("");
                    Ext.getCmp("compTipoZonaBeneficiario").setValue("");
                    Ext.getCmp("upcFuanBeneficiariosAfiliado").setValue("");
                    Ext.getCmp("firmaBeneficiario").setValue("");

                    Ext.getCmp("idTipoIdentificacionBeneficiario").setValue(0);
                    Ext.getCmp("idTipoSexoBeneficiario").setValue(0);
                    Ext.getCmp("idTipoParentescoBeneficiario").setValue(0);
                    Ext.getCmp("idTipoEtniaBeneficiario").setValue(0);
                    Ext.getCmp("idTipoDiscapacidadBeneficiario").setValue(0);
                    Ext.getCmp("idCondicionDiscapacidadBeneficiario").setValue(0);
                    Ext.getCmp("idDepartamentoBeneficiario").setValue(0);
                    Ext.getCmp("idCiudadBeneficiario").setValue(0);
                    Ext.getCmp("idTipoZonaBeneficiario").setValue(0);
                    Ext.getCmp("fechaNacimientoFuanBeneficiariosAfiliado").setValue(null);
                }
            }
        },
        ui: "action", 
        reference: "botonNuevaFicha" 
    },
    {
        xtype: "grid",
        bind: { store: "{setFuanBeneficiario}" },
        autoScroll: false,
        border: true,            
        columns: [
        {
            dataIndex: "primerApellidoFuanAfiliado", text: "Primer Nombre", width: 200, editable: true, editor: {
                xtype: "textfield",
                allowBlank: false
            }
        },
        {
            dataIndex: "segundoApellidoFuanAfiliado", width: 200, text: "Segundo apellido", editable: true, editor: {
                xtype: "textfield",
                allowBlank: true
            }
        },
        {
            dataIndex: "primerNombreFuanAfiliado", width: 200, text: "Primer nombre", editable: true, editor: {
                xtype: "textfield",
                allowBlank: false
            }
        },
        {
            dataIndex: "segundoNombreFuanAfiliado", width: 200, text: "Segundo nombre", editable: true, editor: {
                xtype: "textfield",
                allowBlank: true
            }
        },
        {
            dataIndex: "idTipoIdentificacion", text: "Id Identificación", hidden: true
        },
        {
            dataIndex: "compTipoIdentificacion", width: 200, text: "Tipo de documento de identidad", editable: true, editor: {
                xtype: "textfield",
                allowBlank: true
            }
        },
        {
            dataIndex: "identificacionFuanAfiliado", width: 200, text: "Número de documento de identidad", editable: true, editor: {
                xtype: "textfield",
                allowBlank: true
            }
        },
        {
            dataIndex: "idTipoSexo", text: "Id Tipo Sexo", hidden: true
        },
        {
            dataIndex: "compTipoSexo", width: 200, text: "Sexo", editable: true, editor: {
                xtype: "textfield",
                allowBlank: true
            }
        },
        {
            dataIndex: "fechaNacimientoFuanAfiliado", width: 200, text: "Fecha de nacimiento", editable: true, editor: {
                xtype: "textfield",
                allowBlank: true
            }
        },
        { 
            dataIndex: "numCarnetFuanAfiliado", width: 200, text: "No. Carnet", editor: {
                xtype: "textfield",
                allowBlank: true
            } 
        },
        {
            dataIndex: "idTipoParentesco", text: "Id Tipo Parentesco", hidden: true
        },
        {
            dataIndex: "compTipoParentesco", width: 200, text: "Parentesco", editable: true, editor: {
                xtype: "textfield",
                allowBlank: true
            }
        },
        {
            dataIndex: "idTipoEtnia", text: "Id Tipo Etnia", hidden: true
        },
        {
            dataIndex: "compTipoEtnia", width: 200, text: "Etnia", editable: true, editor: {
                xtype: "textfield",
                allowBlank: true
            }
        },
        {
            dataIndex: "idTipoDiscapacidad", text: "Id Tipo Discapacidad", hidden: true
        },
        {
            dataIndex: "compTipoDiscapacidad", width: 200, text: "Tipo", editable: true, editor: {
                xtype: "textfield",
                allowBlank: true
            }
        },
        {
            dataIndex: "idCondicionDiscapacidad", text: "Id Condición Discapacidad", hidden: true
        },
        {
            dataIndex: "compCondicionDiscapacidad", width: 200, text: "Condición", editable: true, editor: {
                xtype: "textfield",
                allowBlank: true
            }
        },
        {
            dataIndex: "idDepartamento", text: "Id Departamento", hidden: true
        },
        {
            dataIndex: "compDepartamento", width: 200, text: "Departamento", editable: true, editor: {
                xtype: "textfield",
                allowBlank: true
            }
        },
        {
            dataIndex: "idCiudad", text: "Id Ciudad", hidden: true
        },
        {
            dataIndex: "compCiudad", width: 200, text: "Municipio/Distrito", editable: true, editor: {
                xtype: "textfield",
                allowBlank: true
            }
        },
        {
            dataIndex: "idTipoZona", text: "Id Tipo Zona", hidden: true
        },
        {
            dataIndex: "compTipoZona", width: 200, text: "Zona", editable: true, editor: {
                xtype: "textfield",
                allowBlank: true
            }
        },
        {
            dataIndex: "telefonoFuanAfiliado", width: 200, text: "Teléfono Fijo y/o Celular", editable: true, editor: {
                xtype: "textfield",
                allowBlank: true
            }
        },
        {
            dataIndex: "upcFuanAfiliado", width: 200, text: "Valor de la UPC del afiliado adicional", editable: true, editor: {
                xtype: "numberfield",
                decimalPrecision: 0
            }
        }                
        ],
        columnLines: true,
        height: 350,
        id: "Grid-Beneficiarios",
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
        sortableColumns: false,
        width: 1024,       
        title: "Datos básicos de identificación de los beneficiarios y los afiliados adicionales"
    }
    ],
    width: 1024
},
{
    xtype: "fieldset",
    title: "Agregar Nuevo Beneficiario",
    items: [
    {
        xtype: "selectfield",
        bind: { store: "{getTipoIps}" },
        displayField: "nombre",
        editable: false,
        label: "Tipo de IPS",
        name: "tipoFuanIpsPrimariaAfiliado",
        id: "tipoFuanIpsPrimariaAfiliado",
        valueField: "nombre"
    },
    {
        xtype: "textfield",
        label: "Nombre IPS",
        name: "nombreCompletoIps",
        id: "nombreCompletoIps",
        value: ""
    },
    {
        xtype: "button",
        componentReference: [
        "nombreCompletoIps"
        ],
        handler: Coomuce.Util.buscarAfiliacionIps,
        iconCls: "x-fa fa-list-alt",
        ui: "action",
        reference: "botonBuscarIps",
        tooltip: "Lista de Ips",
        width: 30
    },
    {
        xtype: "textfield",
        label: "Código de la IPS (A registrar por la EPS)",
        name: "codigoFuanIpsPrimariaAfiliado",
        id: "codigoFuanIpsPrimariaAfiliado",
        value: ""
    }
    ]
},
{
    xtype: "fieldset",
    fullscreen: false,
    items: [
    { 
        xtype: "button", 
        text: "Agregar", 
        iconCls: "x-fa fa-plus-square", 
        listeners:{
            tap:function(btn, e) {

                var storeIps = Ext.getStore("fuanIpsPrimariaStore");
                if(storeIps.data.items.length > 0){
                    var item = storeIps.data.items[0].data;
                    if(item.nombreFuanIpsPrimariaAfiliado == ""){
                        storeIps.removeAll();
                    }
                }

                    //Tomo los Valores del Formulario
                    var formIps = btn.up('formpanel');
                    var infoFormIps = formIps.getValues();

                    storeIps.add({
                        idFuanIpsPrimariaAfiliado: 0,
                        idFuanAfiliado: 0,
                        tipoFuanIpsPrimariaAfiliado: infoFormIps.tipoFuanIpsPrimariaAfiliado,
                        nombreFuanIpsPrimariaAfiliado: infoFormIps.nombreCompletoIps,
                        codigoFuanIpsPrimariaAfiliado: infoFormIps.codigoFuanIpsPrimariaAfiliado
                    });


                    //BORRO LOS CONTROLES
                    Ext.getCmp("tipoFuanIpsPrimariaAfiliado").setValue("Seleccione");
                    Ext.getCmp("nombreCompletoIps").setValue("");
                    Ext.getCmp("codigoFuanIpsPrimariaAfiliado").setValue("");

                }
            },
            ui: "action", 
            reference: "botonNuevaFicha" 
        },
        {
            xtype: "grid",
            bind: { store: "{setFuanIpsPrimaria}" },
            autoScroll: false,
            border: true, 
            columns: [
            {
                dataIndex: "tipoFuanIpsPrimariaAfiliado", text: "Tipo", width: 100, editable: false, editor: {
                    xtype: "textfield",
                    allowBlank: true
                }
            },
            {
                dataIndex: "nombreFuanIpsPrimariaAfiliado", text: "Razón Social", width: 400, editable: false, editor: {
                    xtype: "textfield",
                    allowBlank: true
                }
            },
            {
                dataIndex: "codigoFuanIpsPrimariaAfiliado", text: "Código de la IPS", width: 100, editable: false, editor: {
                    xtype: "textfield",
                    allowBlank: true
                }
            }
            ],
            columnLines: true,
            height: 350,
            id: "Grid-IpsPrimaria",
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
            sortableColumns: false,
            width: 1024
        }
        ]
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
            name: "nombreFuanEmpleadorAfiliado",
            value: ""
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
            name: "identificacionFuanEmpleadorAfiliado",
            value: ""
        },
        {
            xtype: "textfield",
            label: "Tipo de aportante o pagador pensiones (A registrar por la EPS)",
            name: "tipoPagadorFuanEmpleadorAfiliado",
            value: ""
        },
        {
            xtype: "textfield",
            label: "Dirección",
            name: "direccionFuanEmpleadorAfiliado",
            value: ""
        },
        {
            xtype: "textfield",
            label: "Teléfono",
            name: "telefonoFuanEmpleadorAfiliado",
            value: ""
        },
        {
            xtype: "textfield",
            label: "Correo Electrónico",
            name: "emailFuanEmpleadorAfiliado",
            vtype: "email",
            value: ""
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
                            var infoForm = form.getValues();
                            var date = new Date();

                            var infoFuan = {
                                    idFuan: 0, // inicializo este campo que no se captura en pantalla
                                    idTipoTramite: parseInt(infoForm.idTipoTramite),
                                    idTipoAfiliacion: infoForm.idTipoAfiliacion,
                                    idTipoRegimen: infoForm.idTipoRegimen,
                                    idTipoAfiliado: infoForm.idTipoAfiliado,
                                    idTipoCotizante: infoForm.idTipoCotizante,
                                    codigoCotizanteFuan: infoForm.codigoCotizanteFuan,
                                    idUsuario: Coomuce.Util.DatosUsuario.idUsuario,
                                    firmaAfiliado: ""
                                };

                                //Primera Linea de Validacion
                                if(infoFuan.idTipoAfiliacion == "0" || infoFuan.idTipoAfiliado == "0" || infoFuan.idTipoCotizante == "0" || infoFuan.idTipoRegimen == "0"){
                                    Ext.Msg.alert('Advertencia', "Débe completar correctamente la sección 1. DATOS DEL TRAMITE para continuar", Ext.emptyFn);
                                    return false;
                                }

                                //Segunda Linea de Validacion
                                if(infoForm.primerApellidoFuanAfiliado == "" || infoForm.primerNombreFuanAfiliado == "" || infoForm.idTipoIdentificacionII == "0" || infoForm.identificacionFuanAfiliado == "" || infoForm.idTipoSexoII == "0" || infoForm.fechaNacimientoFuanAfiliado == null){
                                    Ext.Msg.alert('Advertencia', "Débe completar correctamente la sección 2. DATOS BÁSICOS DE IDENTIFICACIÓN para continuar", Ext.emptyFn);
                                    return false;
                                }

                                //Tercera Linea de Validacion
                                if(infoForm.idTipoEtnia == "0" || infoForm.idTipoDiscapacidad == "0" || infoForm.idCondicionDiscapacidad == "0" || infoForm.idTipoZona == "0" || infoForm.idGrupoPoblacional == "0" || infoForm.idDepartamento == "0" || infoForm.idCiudadIII == "0"){
                                    Ext.Msg.alert('Advertencia', "Débe completar correctamente la sección 3. DATOS COMPLEMENTARIOS para continuar", Ext.emptyFn);
                                    return false;
                                }

                                var afiliados = [];

                                afiliados.push({
                                    idFuanAfiliado: 0, 
                                    idFuan: 0, 
                                    tipoFuanAfiliado: "Cotizante", 
                                    primerApellidoFuanAfiliado: infoForm.primerApellidoFuanAfiliado, 
                                    segundoApellidoFuanAfiliado: infoForm.segundoApellidoFuanAfiliado, 
                                    primerNombreFuanAfiliado: infoForm.primerNombreFuanAfiliado, 
                                    segundoNombreFuanAfiliado: infoForm.segundoNombreFuanAfiliado, 
                                    idTipoIdentificacion: infoForm.idTipoIdentificacionII, 
                                    identificacionFuanAfiliado: infoForm.identificacionFuanAfiliado, 
                                    idTipoSexo: infoForm.idTipoSexoII, 
                                    fechaNacimientoFuanAfiliado: infoForm.fechaNacimientoFuanAfiliado, 
                                    idTipoEtnia: infoForm.idTipoEtnia, 
                                    idTipoDiscapacidad: (infoForm.idTipoDiscapacidad != null) ? infoForm.idTipoDiscapacidad : null, 
                                    idCondicionDiscapacidad: (infoForm.idCondicionDiscapacidad != null) ? infoForm.idCondicionDiscapacidad : null,
                                    puntajeSisbenFuanAfiliado: (infoForm.puntajeSisbenFuanAfiliado)?parseFloat(infoForm.puntajeSisbenFuanAfiliado):0,
                                    numCarnetFuanAfiliado: infoForm.numCarnetFuanAfiliado, 
                                    idGrupoPoblacional: (infoForm.idGrupoPoblacional != null) ? infoForm.idGrupoPoblacional : null, 
                                    arlFuanAfiliado: infoForm.arlFuanAfiliado, 
                                    pensionFuanAfiliado: infoForm.pensionFuanAfiliado, 
                                    ibcFuanAfiliado: (infoForm.ibcFuanAfiliado != null) ? infoForm.ibcFuanAfiliado : null, 
                                    direccionFuanAfiliado: infoForm.direccionFuanAfiliado, 
                                    telefonoFuanAfiliado: infoForm.telefonoFuanAfiliado, 
                                    celularFuanAfiliado: infoForm.celularFuanAfiliado, 
                                    emailFuanAfiliado: infoForm.emailFuanAfiliado, 
                                    idCiudad: (infoForm.idCiudadIII != null) ? infoForm.idCiudadIII : null, 
                                    idTipoZona: infoForm.idTipoZona, 
                                    barrioFuanAfiliado: infoForm.barrioFuanAfiliado, 
                                    primerApellidoConyugueFuanAfiliado: infoForm.primerApellidoConyugueFuanAfiliado, 
                                    segundoApellidoConyugueFuanAfiliado: infoForm.segundoApellidoConyugueFuanAfiliado,
                                    primerNombreConyugueFuanAfiliado: infoForm.primerNombreConyugueFuanAfiliado,
                                    segundoNombreConyugueFuanAfiliado: infoForm.segundoNombreConyugueFuanAfiliado,
                                    idTipoIdentificacionConyugue: (infoForm.idTipoIdentificacionConyugue != "0") ? infoForm.idTipoIdentificacionConyugue : 4,
                                    identificacionConyugueFuanAfiliado: infoForm.identificacionConyugueFuanAfiliado,
                                    idTipoSexoConyugue: (infoForm.idTipoSexoConyugueFuanAfiliado != "0") ? infoForm.idTipoSexoConyugueFuanAfiliado : 2,
                                    fechaNacimientoConyugueFuanAfiliado: (infoForm.fechaNacimientoConyugueFuanAfiliado != null) ? infoForm.fechaNacimientoConyugueFuanAfiliado : new Date(),
                                    upcFuanAfiliado: 0,
                                    cabezafamilia: 1,
                                    grupofamiliar: infoForm.identificacionFuanAfiliado,
                                    identificacionAnexo: "",
                                    firmaFuanAfiliado: ""
                                });

                                var empleador = {
                                    idFuanEmpleadorAfiliado: 0, 
                                    idFuanAfiliado: 0, 
                                    nombreFuanEmpleadorAfiliado: infoForm.nombreFuanEmpleadorAfiliado,
                                    idTipoIdentificacion: (infoForm.idTipoIdentificacion != "")?infoForm.idTipoIdentificacion:4, 
                                    identificacionFuanEmpleadorAfiliado: infoForm.identificacionFuanEmpleadorAfiliado, 
                                    tipoPagadorFuanEmpleadorAfiliado: infoForm.tipoPagadorFuanEmpleadorAfiliado, 
                                    direccionFuanEmpleadorAfiliado: infoForm.direccionFuanEmpleadorAfiliado,
                                    telefonoFuanEmpleadorAfiliado: infoForm.telefonoFuanEmpleadorAfiliado, 
                                    emailFuanEmpleadorAfiliado: infoForm.emailFuanEmpleadorAfiliado, 
                                    idCiudad: (infoForm.idCiudadV != "")?infoForm.idCiudadV:1
                                };

                                var gridBeneficiarios = Ext.getCmp("Grid-Beneficiarios");
                                var gridIps = Ext.getCmp("Grid-IpsPrimaria");
                                var gridDeclaracion = Ext.getCmp("Grid-DeclaracionAutorizacion");
                                console.log(gridBeneficiarios.getStore().data.items);
                                Ext.each(gridBeneficiarios.getStore().data.items, function (ob, index, all) {
                                    var dato = ob.data;
                                    console.log(dato);
                                    dato.cabezafamilia = 0;
                                    dato.fechaNacimientoConyugueFuanAfiliado = "";
                                    dato.grupofamiliar =  infoForm.identificacionFuanAfiliado;
                                    if(dato.identificacionFuanAfiliado != "0"){
                                        afiliados.push(dato);
                                    }
                                });

                                var ips = [];
                                Ext.each(gridIps.getStore().data.items, function (ob, index, all) {
                                    var dato = ob.data;
                                    ips.push(dato);
                                });

                                var declaracion = [];
                                Ext.each(gridDeclaracion.getStore().data.items, function (ob, index, all) {
                                    var dato = ob.data;
                                    declaracion.push(dato);
                                });

                                var afiliacion = {
                                    infoFuan: infoFuan,
                                    afiliado: afiliados,
                                    ips: ips,
                                    declaracion: declaracion,
                                    empleador: empleador
                                };
                                console.log(afiliacion);
                                var xId = Math.floor((Math.random() * 10000000) + 1);
                                localStorage.setItem("afiliacion-" + xId, JSON.stringify(afiliacion));
                                Ext.Msg.alert('Señor Usuario', "La información ha sido guardada exitosamente", Ext.emptyFn);
                                Ext.getCmp("Form-Afiliacion").destroy();
                            }
                        }
                    });
}
},
{ 
    minWidth: 80, 
    text: 'Cancelar', 
    handler: function(btn, e) {
        Ext.getCmp("Form-Afiliacion").destroy();
    }, 
    reference: "botonCancelar",
    width: 120 
}
]
}
]

});