////// definición de utilidades para funciones y variables globales
Ext.define("Coomuce.Util", {
    DatosUsuario: {},
    singleton: true,

    BaseUrl: "", //baseServiceUrl, 

    ShowMessage: function (cfg) {
        var icon;

        switch (cfg.type) {
            case "ERROR": icon = Ext.MessageBox.ERROR; break;
            case "INFO": icon = Ext.MessageBox.INFO; break;
            case "WARNING": icon = Ext.MessageBox.WARNING; break;
        }

        Ext.Msg.show({
            title: cfg.title || "COOMUCE",
            msg: cfg.msg,
            buttons: Ext.MessageBox.OK,
            icon: icon,
            fn: cfg.fn || null
        });
    },

    EnviarPost: function (conf) {
        var swMask = false;
        if (conf.targetMask !== undefined) {
            swMask = true;
            var mask = new Ext.LoadMask({
                msg: conf.msgMask,
                target: conf.targetMask
            });
            mask.show();
        }

        // si no esta viajando la confirmación del mensaje, entonces por defecto lo presento
        if (conf.showMsgConfirm === undefined) {
            conf.showMsgConfirm = true;
        }

        Ext.Ajax.request({
            url: conf.url,
            jsonData: conf.data,
            params: conf.params,
            timeout: conf.timeout || 20000,
            useDefaultXhrHeader: false,
            method: conf.method || "POST",
            headers: { "Content-Type": "application/json" },
            success: conf.success || function (response) {
                var res = Ext.decode(response.responseText);

                if (swMask) {
                    mask.hide();
                }

                if (res.success) {//Si el Resultado fué exitoso
                    conf.fnSuccess(res);
                }
            },
            failure: function (response) {
                var msg = 'Error: ' + (response.statusText || "Posible Falla en la Comunicación con El Servidor.") + ". <br />Por favor intente nuevamente. Si el problema persiste comuniquese con soporte.";
                Ext.Msg.alert('ATENCION', msg, Ext.emptyFn);
                $('body').loading('stop');
                if (swMask) {
                    mask.hide();
                }

                if (conf.fnFailure !== undefined) {
                    conf.fnFailure(response.statusText);
                }
            }
        });
    },

    dataValidate: function (items) {
        var msg = "";

        Ext.each(items, function (item, index, allItems) {
            if (item.data.respuestaNoPregunta == item.data.respuestaSiPregunta) {
                msg += "<b>La pregunta " + item.data.codigoPregunta + "</b> tiene varias o ninguna respuesta seleccionada.<br />";
            }
        });

        return {
            msg: msg,
            success: Ext.isEmpty(msg)
        };
    },

    parseDate: function (v) {
        if (v != null) {
            var input = v;
            input = input.replace(new RegExp('/Date\\((-?[0-9]+)(?:[a-zA-Z]|(?:\\+|-)[0-9]{4})?\\)/', 'g'), '(new Date($1))');
            v = eval(input);
        }
        return v;
    },

    lanzarReporte: function (panel, cfg) {
        cfg.condicion = encodeURIComponent(cfg.condicion);

        var frame = '<iframe src="' + Coomuce.Util.LanzadorReporteUrl +
        'idReporte=' + cfg.idReporte +
        (cfg.optional != undefined ? cfg.optional : "") +
        '&condicion=' + cfg.condicion + '" style="width:100%;height:100%;border:none;"></iframe>';

        // {modulo} se refiere al modulo de la aplicación que en este caso es calibración
        // {idReporte} se refiere al reporte que se va a presentar
        panel.setHtml(frame);
    },

    barraFiltroReportes: function (dataFiltro, view, paramReport) {
        var onAddClick = function () {
            var row = [
            {
                criterio: "",
                nombreCriterio: "",
                operador: "",
                condicion: "",
                funcionesLogicas: ""
            }
            ];

            storeListaFiltros.insert(0, row);
        };

        var onEliminarClick = function () {
            storeListaFiltros.remove(grid.selModel.getSelection());
        };

        var storeListaFiltros = Ext.create("Ext.data.Store", {
            fields: [
            "tipoDatoCriterio", "criterio", "nombreCriterio", "operador", "condicion", "idFuncionesLogicas", "funcionesLogicas"
            ]
        });

        var grid = Ext.create("Ext.grid.Panel", {
            columns: [
            {
                dataIndex: "nombreCriterio", header: "Criterio", width: 150, editor: {
                    xtype: 'combo',
                    allowBlank: false,
                    displayField: 'nombreCriterio',
                    editable: false,
                    listeners: {
                        select: function (combo, record, eOpts) {
                            var rec = grid.selModel.getSelection();

                            rec[0].set("criterio", record.data.criterio);
                            rec[0].set("tipoDatoCriterio", record.data.tipoDato);
                        }
                    },
                    queryMode: 'local',
                    store: Ext.create("Ext.data.ArrayStore", {
                        fields: ["criterio", "nombreCriterio", "tipoDato"],
                        data: dataFiltro
                    }),
                    valueField: 'nombreCriterio'
                }
            },
            {
                dataIndex: "operador", header: "Operador", width: 60, editor: {
                    xtype: "combo",
                    allowBlank: false,
                    displayField: "operador",
                    editable: false,
                    queryMode: "local",
                    store: Ext.create("Ext.data.ArrayStore", {
                        fields: ["operador"],
                        data: [
                        ["="], ["<>"], ["<"], [">"], [">="], ["<="], ["like"]
                        ]
                    }),
                    valueField: "operador"
                }
            },
            {
                dataIndex: "condicion", header: "Condición", width: 200, editor: {
                    allowBlank: false
                }
            },
            {
                dataIndex: "funcionesLogicas", header: "Func. Lógica", width: 50, editor: {
                    xtype: "combo",
                    displayField: "funcionesLogicas",
                    editable: false,
                    listeners: {
                        select: function (combo, record, eOpts) {
                            var rec = grid.selModel.getSelection();

                            rec[0].set("idFuncionesLogicas", record.data.idFuncionesLogicas);
                        }
                    },
                    queryMode: "local",
                    store: Ext.create("Ext.data.ArrayStore", {
                        fields: ["idFuncionesLogicas", "funcionesLogicas"],
                        data: [
                        ["", ""], ["and", "Y"], ["or", "O"]
                        ]
                    }),
                    valueField: "funcionesLogicas"
                }
            }
            ],
            columnLines: true,

            plugins: {
                ptype: 'cellediting',
                clicksToEdit: 1
            },
            selModel: {
                type: 'checkboxmodel',
                checkOnly: false //Hacer esto para seleccionar elementos de un grid sólo cuando se checken
            },
            sortableColumns: false,
            store: storeListaFiltros
        });

        var windowFiltros = Ext.create("Ext.window.Window", {
            bodyPadding: 10,
            closeAction: "hide",
            closeToolText: "Cerrar",
            height: 300,
            items: [
            { html: "Agregue los filtros deseados para el reporte" },
            { frame: true, height: 200, items: grid, layout: "fit" }
            ],
            modal: true,
            title: "Filtros",
            tools: [
            { type: "plus", tooltip: "Agregar nuevo filtro", handler: onAddClick },
            { type: "minus", tooltip: "Eliminar filtros seleccionados", handler: onEliminarClick }
            ],
            width: 540
        });

        return {
            items: [
            {
                iconCls: "x-fa fa-filter", text: "Filtros", handler: function () {
                    windowFiltros.show();
                }
            }, "->",
            {
                text: "Generar", handler: function () {
                    var condicion = "";

                    Ext.each(storeListaFiltros.getData().items, function (item, index, allItems) {
                        if (item.data.tipoDatoCriterio === "string") {
                            condicion += "(" + item.data.criterio + " " +
                            (item.data.operador === "like" ? item.data.operador + " '%" + item.data.condicion + "%') " : item.data.operador + " '" + item.data.condicion + "') ") +
                            (item.data.idFuncionesLogicas != undefined ? item.data.idFuncionesLogicas : "") + " ";
                        }
                        else if (item.data.tipoDatoCriterio === "int") {
                            condicion += "(" + item.data.criterio + " " +
                            item.data.operador + " " + item.data.condicion + ") " +
                            (item.data.idFuncionesLogicas != undefined ? item.data.idFuncionesLogicas : "") + " ";
                        }
                        else if (item.data.tipoDatoCriterio === "date") {
                            condicion += "(cast(" + item.data.criterio + " as date) " +
                            item.data.operador + " '" + item.data.condicion + "') " +
                            (item.data.idFuncionesLogicas != undefined ? item.data.idFuncionesLogicas : "") + " ";
                        }
                    });

                    Coomuce.Util.lanzarReporte(view.getView(), { idReporte: paramReport.idReporte, condicion: condicion });
                }
            }
            ],
            storeFiltro: storeListaFiltros
        };
    },

    buscarAfiliado: function (btn) {
        var me = this;
        me.overlay = Ext.Viewport.add({
            xtype: 'panel',
            modal: true,
            hideOnMaskTap: false,
            showAnimation: {
                type: 'popIn',
                duration: 250,
                easing: 'ease-out'
            },
            hideAnimation: {
                type: 'popOut',
                duration: 250,
                easing: 'ease-out'
            },
            centered: true,
            style: "width: 60%",
            styleHtmlContent: true,
            items: [
            {
                xtype: "button",
                text: "Cerrar",
                ui: "action",
                width: 70,
                style: "position: relative; top: 0; left: 91%",
                handler: function () {
                    me.overlay.destroy();
                }
            },
            { html: '<p style="text-align: center">Seleccione los criterios de búsqueda para filtrar los afiliados.</p><br />' },
            {
                docked: 'top',
                xtype: 'toolbar',
                title: '<p style="text-align: center"><b>Listado de Afiliados</b></p>'
            },
            {
                layout: {
                    type: "hbox"
                },
                items: [
                {
                    items: [
                    {
                        xtype: "selectfield",
                        displayField: "nombre",
                        label: "Campo",
                        queryMode: "local",
                        id: "campoBusqueda",
                        store: Ext.create("Ext.data.ArrayStore", {
                            fields: ["id", "nombre"],
                            data: [
                            ["identificacionFuanAfiliado", "Identificación"],
                            ["numCarnetFuanAfiliado", "Carnet Afiliado"]
                            ]
                        }),
                        valueField: "id"
                    },
                    {
                        xtype: "textfield",
                        label: "Criterio",
                        id: "criterioBusqueda",
                        flex: 1
                    }
                    ],
                    flex: 1
                },
                {
                    items: [
                    {
                        xtype: "button",
                        text: "Buscar",
                        ui: "action",
                        flex: 1,
                        handler: function () {
                            var campo = Ext.getCmp("campoBusqueda").getValue();
                            var criterio = Ext.getCmp("criterioBusqueda").getValue();
                            var myStore = Ext.getStore('ListadoGeneralStore');
                            var afiliadoStore = Ext.getStore('getAfiliadoMainStore');
                            $('body').loading({
                                theme: 'dark',
                                message: 'Consultando...'
                            });
                            var cont = 0;
                            async.each(afiliadoStore.data.items, function(item, callback) {
                                setTimeout(function() {
                                    if(campo == "identificacionFuanAfiliado"){
                                        if(item.data.identificacionFuanAfiliado != criterio){
                                            callback()
                                        }else{
                                            myStore.add(item.data);
                                            cont++;
                                            callback("Se encontro");
                                        }
                                    }
                                    if(campo == "numCarnetFuanAfiliado"){
                                        if(item.data.numCarnetFuanAfiliado != criterio){
                                            callback()
                                        }else{
                                            myStore.add(item.data);
                                            cont++;
                                            callback("Se encontro");
                                        }
                                    }
                                },0);                            
                            }, function(err) {
                                if(err){
                                    console.log(err);                                   
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
                    }
                    ]
                }
                ]
            },
            {
                xtype: "grid",
                columns: [
                { dataIndex: "identificacionFuanAfiliado", text: "Identificación", flex: 1 },
                { dataIndex: "primerApellidoFuanAfiliado", text: "Primer Apellido", flex: 1 },
                { dataIndex: "segundoApellidoFuanAfiliado", text: "Segundo Apellido", flex: 1 },
                { dataIndex: "primerNombreFuanAfiliado", text: "Primer Nombre", flex: 1 },
                { dataIndex: "segundoNombreFuanAfiliado", text: "Segundo Nombre", flex: 1 }
                ],
                id: "Grid-ListaAfiliados",
                itemHeight: 34,
                height: 200,
                listeners: {
                    itemtap: function (grd, index, target, record, e, eOpts) {
                        if (btn.inGrid === true) {
                        }
                        else {
                            for (var i = 0; i < btn.componentReference.length; i++) {
                                var o = Ext.ComponentQuery.query('[name=' + btn.componentReference[i] + ']')[0];
                                var name = Ext.getCmp(btn.componentReference[i]).setValue(record.get(btn.componentReference[i]));

                            }
                            if(record.get('fechaNacimientoFuanAfiliado') != "" && (Ext.getCmp('fechaNacimientoFuanAfiliado') != undefined)){
                                var dateBirth = new Date(record.get('fechaNacimientoFuanAfiliado'));
                                var month = (1 + dateBirth.getMonth()).toString();
                                month = month.length > 1 ? month : '0' + month;

                                var day = dateBirth.getDate().toString();
                                day = day.length > 1 ? day : '0' + day;
                                var year = dateBirth.getFullYear();
                                var dt = month + '/' + day + '/' + year;
                                Ext.getCmp('fechaNacimientoFuanAfiliado').setValue(dt);
                            }

                            // esto es en el caso que se requiera inhabilitar componentes
                            if (record.get("nombreTipoSexo") != "Femenino") {
                                if (btn.disabledBySexo != undefined) {
                                    for (var i = 0; i < btn.disabledBySexo.length; i++) {
                                        var ob = Ext.ComponentQuery.query('[name=' + btn.disabledBySexo[i] + ']')[0];
                                        ob.setDisabled(true);
                                    }
                                }
                            }

                            // Tipo Identificacion
                            var tipoIdentificacionStore = Ext.getStore('getTipoIdentificacion');
                            _.forEach(tipoIdentificacionStore.data.items, function(item) {
                                if(record.get('idTipoIdentificacion') == item.data.idTipoIdentificacion){
                                    Ext.getCmp('codigoTipoIdentificacion').setValue(item.data.codigoTipoIdentificacion);
                                }
                            });

                            //Ciudad y Departamento
                            var cityStore = Ext.getStore('getCityStore');
                            var departmentStore = Ext.getStore('getDepartamentoStore');
                            _.forEach(cityStore.data.items, function(city) {
                                if(record.get('idCiudad') == city.data.idCiudad){
                                    _.forEach(departmentStore.data.items, function(department) {
                                        if(city.data.idDepartamento == department.data.idDepartamento){
                                            Ext.getCmp('compDepartamento').setValue("(" + department.data.codigoDepartamento + ") " + department.data.nombreDepartamento);
                                        }
                                    });
                                    Ext.getCmp('compCiudad').setValue("(" + city.data.codigoCiudad + ") " + city.data.nombreCiudad);
                                }
                            });
                            //Celular Afiliado
                            Ext.getCmp('celularFuanAfiliado').setValue(record.get('telefonoFuanAfiliado'));

                            //Zona
                            var zonaStore = Ext.getStore('getZonaStore');
                            _.forEach(zonaStore.data.items, function(zona) {
                                if(record.get('idTipoZona') == zona.data.idTipoZona){
                                    Ext.getCmp('nombreTipoZona').setValue(zona.data.nombreTipoZona);
                                }
                            });

                            //Sexo
                            var sexoStore = Ext.getStore('getSexoStore');
                            _.forEach(sexoStore.data.items, function(sexo) {
                                if(record.get('idTipoSexo') == sexo.data.idTipoSexo){
                                    Ext.getCmp('nombreTipoSexo').setValue(sexo.data.nombreTipoSexo);
                                }
                            });

                            //Edad
                            var age = 0;
                            if(record.get('fechaNacimientoFuanAfiliado')) {
                                var today = new Date();
                                var birthDate = new Date(record.get('fechaNacimientoFuanAfiliado'));
                                age = today.getFullYear() - birthDate.getFullYear();
                                var m = today.getMonth() - birthDate.getMonth();
                                if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
                                    age--;
                                }

                                Ext.getCmp('edadFuanAfiliado').setValue(age);
                            }
                            
                            
                            if (btn.preguntasIdentificacion != undefined) {
                                var idCiclo = 0;
                                if (age >= 0 && age <= 5) {
                                    idCiclo = 1;
                                }
                                else if (age >= 6 && age <= 11) {
                                    idCiclo = 2;
                                }
                                else if (age >= 12 && age <= 17) {
                                    idCiclo = 3;
                                }
                                else if (age >= 18 && age <= 28) {
                                    idCiclo = 4;
                                }
                                else if (age >= 29 && age <= 59) {
                                    idCiclo = 5;
                                }
                                else if (age >= 60 && age <= 150) {
                                    idCiclo = 6;
                                }
                                var storeGrid = Ext.getCmp('Grid-Ifppir-Principal').getStore();
                                storeGrid.proxy.setUrl("resources/data/PreguntasFactor" + idCiclo + record.get("idTipoSexo") + ".json");
                                storeGrid.load();

                                        //storeGrid.load({ params: { edad: record.get("edadFuanAfiliado"), sexo: record.get("idTipoSexo") } });
                                    }
                                }
                                me.overlay.destroy();
                            }
                        },
                        store: {
                            storeId: "ListadoGeneralStore",
                            autoLoad: false,
                            fields: [
                            "idFuanAfiliado", "primerApellidoFuanAfiliado", 'segundoApellidoFuanAfiliado',
                            'primerNombreFuanAfiliado', "segundoNombreFuanAfiliado", "codigoTipoIdentificacion",
                            "identificacionFuanAfiliado", "nombreTipoSexo",
                            {
                                name: "compAfiliado", convert: function (v, record) {
                                    var primerNombre = (record.get("primerNombreFuanAfiliado"))?record.get("primerNombreFuanAfiliado"):"";
                                    var segundoNombre = (record.get("segundoNombreFuanAfiliado"))?record.get("segundoNombreFuanAfiliado"):"";
                                    var primerApellido = (record.get("primerApellidoFuanAfiliado"))?record.get("primerApellidoFuanAfiliado"):"";
                                    var segundoApellido = (record.get("segundoApellidoFuanAfiliado"))?record.get("segundoApellidoFuanAfiliado"):"";
                                    
                                    return record.get("identificacionFuanAfiliado") + " - " +
                                    primerApellido + " " +
                                    segundoApellido + " " +
                                    primerNombre + " " +
                                    segundoNombre;
                                }
                            },
                            {
                                name: "nombreCompletoAfiliado", convert: function (v, record) {
                                    var primerNombre = (record.get("primerNombreFuanAfiliado"))?record.get("primerNombreFuanAfiliado"):"";
                                    var segundoNombre = (record.get("segundoNombreFuanAfiliado"))?record.get("segundoNombreFuanAfiliado"):"";
                                    var primerApellido = (record.get("primerApellidoFuanAfiliado"))?record.get("primerApellidoFuanAfiliado"):"";
                                    var segundoApellido = (record.get("segundoApellidoFuanAfiliado"))?record.get("segundoApellidoFuanAfiliado"):"";
                                    return primerApellido + " " +
                                    segundoApellido + " " +
                                    primerNombre + " " +
                                    segundoNombre;
                                }
                            }
                            ],
                            pageSize: 5,
                            data: []
                        },
                        flex: 5
                    }
                    ],
                    scrollable: true,
                });
},

buscarAfiliadoHistoria: function (btn) {
    var me = this;
    me.overlay = Ext.Viewport.add({
        xtype: 'panel',
        modal: true,
        hideOnMaskTap: false,
        showAnimation: {
            type: 'popIn',
            duration: 250,
            easing: 'ease-out'
        },
        hideAnimation: {
            type: 'popOut',
            duration: 250,
            easing: 'ease-out'
        },
        centered: true,
        style: "width: 60%",
        styleHtmlContent: true,
        items: [
        {
            xtype: "button",
            text: "Cerrar",
            ui: "action",
            width: 70,
            style: "position: relative; top: 0; left: 91%",
            handler: function () {
                me.overlay.destroy();
            }
        },
        { html: '<p style="text-align: center">Seleccione los criterios de búsqueda para filtrar los afiliados.</p><br />' },
        {
            docked: 'top',
            xtype: 'toolbar',
            title: '<p style="text-align: center"><b>Listado de Afiliados</b></p>'
        },
        {
            layout: {
                type: "hbox"
            },
            items: [
            {
                items: [
                {
                    xtype: "selectfield",
                    displayField: "nombre",
                    label: "Campo",
                    queryMode: "local",
                    id: "campoBusqueda",
                    store: Ext.create("Ext.data.ArrayStore", {
                        fields: ["id", "nombre"],
                        data: [
                        ["identificacionFuanAfiliado", "Identificación"],
                        ["numCarnetFuanAfiliado", "Carnet Afiliado"]
                        ]
                    }),
                    valueField: "id"
                },
                {
                    xtype: "textfield",
                    label: "Criterio",
                    id: "criterioBusqueda",
                    flex: 1
                }
                ],
                flex: 1
            },
            {
                items: [
                {
                    xtype: "button",
                    text: "Buscar",
                    ui: "action",
                    flex: 1,
                    handler: function () {
                        var campo = Ext.getCmp("campoBusqueda").getValue();
                        var criterio = Ext.getCmp("criterioBusqueda").getValue();
                        var myStore = Ext.getStore('ListadoGeneralStore');
                        var afiliadoStore = Ext.getStore('getAfiliadoMainStore');
                        $('body').loading({
                            theme: 'dark',
                            message: 'Consultando...'
                        });
                        var cont = 0;
                        async.each(afiliadoStore.data.items, function(item, callback) {
                            setTimeout(function() {
                                if(campo == "identificacionFuanAfiliado"){
                                    if(item.data.identificacionFuanAfiliado != criterio){
                                        callback()
                                    }else{
                                        myStore.add(item.data);
                                        cont++;
                                        callback("Se encontro");
                                    }
                                }
                                if(campo == "numCarnetFuanAfiliado"){
                                    if(item.data.numCarnetFuanAfiliado != criterio){
                                        callback()
                                    }else{
                                        myStore.add(item.data);
                                        cont++;
                                        callback("Se encontro");
                                    }
                                }
                            },0);                            
                        }, function(err) {
                            if(err){
                                console.log(err);                                   
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
                }
                ]
            }
            ]
        },
        {
            xtype: "grid",
            columns: [
            { dataIndex: "identificacionFuanAfiliado", text: "Identificación", flex: 1 },
            { dataIndex: "primerApellidoFuanAfiliado", text: "Primer Apellido", flex: 1 },
            { dataIndex: "segundoApellidoFuanAfiliado", text: "Segundo Apellido", flex: 1 },
            { dataIndex: "primerNombreFuanAfiliado", text: "Primer Nombre", flex: 1 },
            { dataIndex: "segundoNombreFuanAfiliado", text: "Segundo Nombre", flex: 1 }
            ],
            id: "Grid-ListaAfiliados",
            itemHeight: 34,
            height: 200,
            listeners: {
                itemtap: function (grd, index, target, record, e, eOpts) {
                    if (btn.inGrid === true) {
                    }
                    else {
                        for (var i = 0; i < btn.componentReference.length; i++) {
                            var o = Ext.ComponentQuery.query('[name=' + btn.componentReference[i] + ']')[0];
                            var name = Ext.getCmp(btn.componentReference[i]).setValue(record.get(btn.componentReference[i]));

                        }
                        if(record.get('fechaNacimientoFuanAfiliado') != "" && (Ext.getCmp('fechaNacimientoFuanAfiliado') != undefined)){
                            var dateBirth = new Date(record.get('fechaNacimientoFuanAfiliado'));
                            var month = (1 + dateBirth.getMonth()).toString();
                            month = month.length > 1 ? month : '0' + month;

                            var day = dateBirth.getDate().toString();
                            day = day.length > 1 ? day : '0' + day;
                            var year = dateBirth.getFullYear();
                            var dt = month + '/' + day + '/' + year;
                            Ext.getCmp('fechaNacimientoFuanAfiliado').setValue(dt);
                        }

                            // esto es en el caso que se requiera inhabilitar componentes
                            if (record.get("nombreTipoSexo") != "Femenino") {
                                if (btn.disabledBySexo != undefined) {
                                    for (var i = 0; i < btn.disabledBySexo.length; i++) {
                                        var ob = Ext.ComponentQuery.query('[name=' + btn.disabledBySexo[i] + ']')[0];
                                        ob.setDisabled(true);
                                    }
                                }
                            }

                            // Tipo Identificacion
                            var tipoIdentificacionStore = Ext.getStore('getTipoIdentificacion');
                            _.forEach(tipoIdentificacionStore.data.items, function(item) {
                                if(record.get('idTipoIdentificacion') == item.data.idTipoIdentificacion){
                                    Ext.getCmp('codigoTipoIdentificacion').setValue(item.data.codigoTipoIdentificacion);
                                }
                            });

                            //Ciudad y Departamento
                            var cityStore = Ext.getStore('getCityStore');
                            var departmentStore = Ext.getStore('getDepartamentoStore');
                            _.forEach(cityStore.data.items, function(city) {
                                if(record.get('idCiudad') == city.data.idCiudad){
                                    _.forEach(departmentStore.data.items, function(department) {
                                        if(city.data.idDepartamento == department.data.idDepartamento){
                                            Ext.getCmp('compDepartamento').setValue("(" + department.data.codigoDepartamento + ") " + department.data.nombreDepartamento);
                                        }
                                    });
                                    Ext.getCmp('compCiudad').setValue("(" + city.data.codigoCiudad + ") " + city.data.nombreCiudad);
                                }
                            });

                            Ext.getCmp('telefonoInfoHfdfr').setValue(record.get('telefonoFuanAfiliado'));
                            
                            if (btn.preguntasIdentificacion != undefined) {
                                var idCiclo = 0;
                                if (record.get("edadFuanAfiliado") >= 0 && record.get("edadFuanAfiliado") <= 5) {
                                    idCiclo = 1;
                                }
                                else if (record.get("edadFuanAfiliado") >= 6 && record.get("edadFuanAfiliado") <= 11) {
                                    idCiclo = 2;
                                }
                                else if (record.get("edadFuanAfiliado") >= 12 && record.get("edadFuanAfiliado") <= 17) {
                                    idCiclo = 3;
                                }
                                else if (record.get("edadFuanAfiliado") >= 18 && record.get("edadFuanAfiliado") <= 28) {
                                    idCiclo = 4;
                                }
                                else if (record.get("edadFuanAfiliado") >= 29 && record.get("edadFuanAfiliado") <= 59) {
                                    idCiclo = 5;
                                }
                                else if (record.get("edadFuanAfiliado") >= 60 && record.get("edadFuanAfiliado") <= 150) {
                                    idCiclo = 6;
                                }
                                var storeGrid = Ext.getCmp('Grid-Ifppir-Principal').getStore();
                                storeGrid.proxy.setUrl("resources/data/PreguntasFactor" + idCiclo + record.get("idTipoSexo") + ".json");
                                storeGrid.load();

                                        //storeGrid.load({ params: { edad: record.get("edadFuanAfiliado"), sexo: record.get("idTipoSexo") } });
                                    }
                                }
                                me.overlay.destroy();
                            }
                        },
                        store: {
                            storeId: "ListadoGeneralStore",
                            autoLoad: false,
                            fields: [
                            "idFuanAfiliado", "primerApellidoFuanAfiliado", 'segundoApellidoFuanAfiliado',
                            'primerNombreFuanAfiliado', "segundoNombreFuanAfiliado", "codigoTipoIdentificacion",
                            "identificacionFuanAfiliado", "nombreTipoSexo",
                            {
                                name: "compAfiliado", convert: function (v, record) {
                                    var primerNombre = (record.get("primerNombreFuanAfiliado"))?record.get("primerNombreFuanAfiliado"):"";
                                    var segundoNombre = (record.get("segundoNombreFuanAfiliado"))?record.get("segundoNombreFuanAfiliado"):"";
                                    var primerApellido = (record.get("primerApellidoFuanAfiliado"))?record.get("primerApellidoFuanAfiliado"):"";
                                    var segundoApellido = (record.get("segundoApellidoFuanAfiliado"))?record.get("segundoApellidoFuanAfiliado"):"";
                                    
                                    return record.get("identificacionFuanAfiliado") + " - " +
                                    primerApellido + " " +
                                    segundoApellido + " " +
                                    primerNombre + " " +
                                    segundoNombre;
                                }
                            },
                            {
                                name: "nombreCompletoAfiliado", convert: function (v, record) {
                                    var primerNombre = (record.get("primerNombreFuanAfiliado"))?record.get("primerNombreFuanAfiliado"):"";
                                    var segundoNombre = (record.get("segundoNombreFuanAfiliado"))?record.get("segundoNombreFuanAfiliado"):"";
                                    var primerApellido = (record.get("primerApellidoFuanAfiliado"))?record.get("primerApellidoFuanAfiliado"):"";
                                    var segundoApellido = (record.get("segundoApellidoFuanAfiliado"))?record.get("segundoApellidoFuanAfiliado"):"";
                                    return primerApellido + " " +
                                    segundoApellido + " " +
                                    primerNombre + " " +
                                    segundoNombre;
                                }
                            }
                            ],
                            pageSize: 5,
                            data: []
                        },
                        flex: 5
                    }
                    ],
                    scrollable: true,
                });
},

buscarAfiliadoEncuesta1: function (btn) {
    var me = this;
    me.overlay = Ext.Viewport.add({
        xtype: 'panel',
        modal: true,
        hideOnMaskTap: false,
        showAnimation: {
            type: 'popIn',
            duration: 250,
            easing: 'ease-out'
        },
        hideAnimation: {
            type: 'popOut',
            duration: 250,
            easing: 'ease-out'
        },
        centered: true,
        style: "width: 60%",
        styleHtmlContent: true,
        items: [
        {
            xtype: "button",
            text: "Cerrar",
            ui: "action",
            width: 70,
            style: "position: relative; top: 0; left: 91%",
            handler: function () {
                me.overlay.destroy();
            }
        },
        { html: '<p style="text-align: center">Seleccione los criterios de búsqueda para filtrar los afiliados.</p><br />' },
        {
            docked: 'top',
            xtype: 'toolbar',
            title: '<p style="text-align: center"><b>Listado de Afiliados</b></p>'
        },
        {
            layout: {
                type: "hbox"
            },
            items: [
            {
                items: [
                {
                    xtype: "selectfield",
                    displayField: "nombre",
                    label: "Campo",
                    queryMode: "local",
                    id: "campoBusqueda",
                    store: Ext.create("Ext.data.ArrayStore", {
                        fields: ["id", "nombre"],
                        data: [
                        ["identificacionFuanAfiliado", "Identificación"],
                        ["numCarnetFuanAfiliado", "Carnet Afiliado"]
                        ]
                    }),
                    valueField: "id"
                },
                {
                    xtype: "textfield",
                    label: "Criterio",
                    id: "criterioBusqueda",
                    flex: 1
                }
                ],
                flex: 1
            },
            {
                items: [
                {
                    xtype: "button",
                    text: "Buscar",
                    ui: "action",
                    flex: 1,
                    handler: function () {
                        var campo = Ext.getCmp("campoBusqueda").getValue();
                        var criterio = Ext.getCmp("criterioBusqueda").getValue();
                        var myStore = Ext.getStore('ListadoGeneralStore');
                        var afiliadoStore = Ext.getStore('getAfiliadoMainStore');
                        $('body').loading({
                            theme: 'dark',
                            message: 'Consultando...'
                        });
                        var cont = 0;
                        async.each(afiliadoStore.data.items, function(item, callback) {
                            setTimeout(function() {
                                if(campo == "identificacionFuanAfiliado"){
                                    if(item.data.identificacionFuanAfiliado != criterio){
                                        callback()
                                    }else{
                                        myStore.add(item.data);
                                        cont++;
                                        callback("Se encontro");
                                    }
                                }
                                if(campo == "numCarnetFuanAfiliado"){
                                    if(item.data.numCarnetFuanAfiliado != criterio){
                                        callback()
                                    }else{
                                        myStore.add(item.data);
                                        cont++;
                                        callback("Se encontro");
                                    }
                                }
                            },0);                            
                        }, function(err) {
                            if(err){
                                console.log(err);                                   
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
                }
                ]
            }
            ]
        },
        {
            xtype: "grid",
            columns: [
            { dataIndex: "identificacionFuanAfiliado", text: "Identificación", flex: 1 },
            { dataIndex: "primerApellidoFuanAfiliado", text: "Primer Apellido", flex: 1 },
            { dataIndex: "segundoApellidoFuanAfiliado", text: "Segundo Apellido", flex: 1 },
            { dataIndex: "primerNombreFuanAfiliado", text: "Primer Nombre", flex: 1 },
            { dataIndex: "segundoNombreFuanAfiliado", text: "Segundo Nombre", flex: 1 }
            ],
            id: "Grid-ListaAfiliados",
            itemHeight: 34,
            height: 200,
            listeners: {
                itemtap: function (grd, index, target, record, e, eOpts) {
                    if (btn.inGrid === true) {
                    }
                    else {
                        var identificacion = record.get("identificacionFuanAfiliado");
                        
                        var primerNombre = (record.get("primerNombreFuanAfiliado"))?record.get("primerNombreFuanAfiliado"):"";
                        var segundoNombre = (record.get("segundoNombreFuanAfiliado"))?record.get("segundoNombreFuanAfiliado"):"";
                        var primerApellido = (record.get("primerApellidoFuanAfiliado"))?record.get("primerApellidoFuanAfiliado"):"";
                        var segundoApellido = (record.get("segundoApellidoFuanAfiliado"))?record.get("segundoApellidoFuanAfiliado"):"";

                        Ext.getCmp("idFuanAfiliado").setValue(record.get('idFuanAfiliado'));
                        Ext.getCmp("compAfiliado").setValue(identificacion + " - " + primerApellido + " " + segundoApellido + " " + primerNombre + " " + segundoNombre);

                    }
                    me.overlay.destroy();
                }
            },
            store: {
                storeId: "ListadoGeneralStore",
                autoLoad: false,
                fields: [
                "idFuanAfiliado", "primerApellidoFuanAfiliado", 'segundoApellidoFuanAfiliado',
                'primerNombreFuanAfiliado', "segundoNombreFuanAfiliado", "codigoTipoIdentificacion",
                "identificacionFuanAfiliado", "nombreTipoSexo",
                {
                    name: "compAfiliado", convert: function (v, record) {
                        var primerNombre = (record.get("primerNombreFuanAfiliado"))?record.get("primerNombreFuanAfiliado"):"";
                        var segundoNombre = (record.get("segundoNombreFuanAfiliado"))?record.get("segundoNombreFuanAfiliado"):"";
                        var primerApellido = (record.get("primerApellidoFuanAfiliado"))?record.get("primerApellidoFuanAfiliado"):"";
                        var segundoApellido = (record.get("segundoApellidoFuanAfiliado"))?record.get("segundoApellidoFuanAfiliado"):"";

                        return record.get("identificacionFuanAfiliado") + " - " +
                        primerApellido + " " +
                        segundoApellido + " " +
                        primerNombre + " " +
                        segundoNombre;
                    }
                },
                {
                    name: "nombreCompletoAfiliado", convert: function (v, record) {
                        var primerNombre = (record.get("primerNombreFuanAfiliado"))?record.get("primerNombreFuanAfiliado"):"";
                        var segundoNombre = (record.get("segundoNombreFuanAfiliado"))?record.get("segundoNombreFuanAfiliado"):"";
                        var primerApellido = (record.get("primerApellidoFuanAfiliado"))?record.get("primerApellidoFuanAfiliado"):"";
                        var segundoApellido = (record.get("segundoApellidoFuanAfiliado"))?record.get("segundoApellidoFuanAfiliado"):"";
                        return primerApellido + " " +
                        segundoApellido + " " +
                        primerNombre + " " +
                        segundoNombre;
                    }
                }
                ],
                pageSize: 5,
                data: []
            },
            flex: 5
        }
        ],
        scrollable: true,
    });
},

buscarAfiliadoPurisu: function (btn) {
    var me = this;
    me.overlay = Ext.Viewport.add({
        xtype: 'panel',
        modal: true,
        hideOnMaskTap: false,
        showAnimation: {
            type: 'popIn',
            duration: 250,
            easing: 'ease-out'
        },
        hideAnimation: {
            type: 'popOut',
            duration: 250,
            easing: 'ease-out'
        },
        centered: true,
        style: "width: 60%",
        styleHtmlContent: true,
        items: [
        {
            xtype: "button",
            text: "Cerrar",
            ui: "action",
            width: 70,
            style: "position: relative; top: 0; left: 91%",
            handler: function () {
                me.overlay.destroy();
            }
        },
        { html: '<p style="text-align: center">Seleccione los criterios de búsqueda para filtrar los afiliados.</p><br />' },
        {
            docked: 'top',
            xtype: 'toolbar',
            title: '<p style="text-align: center"><b>Listado de Afiliados</b></p>'
        },
        {
            layout: {
                type: "hbox"
            },
            items: [
            {
                items: [
                {
                    xtype: "selectfield",
                    displayField: "nombre",
                    label: "Campo",
                    queryMode: "local",
                    id: "campoBusqueda",
                    store: Ext.create("Ext.data.ArrayStore", {
                        fields: ["id", "nombre"],
                        data: [
                        ["identificacionFuanAfiliado", "Identificación"],
                        ["numCarnetFuanAfiliado", "Carnet Afiliado"]
                        ]
                    }),
                    valueField: "id"
                },
                {
                    xtype: "textfield",
                    label: "Criterio",
                    id: "criterioBusqueda",
                    flex: 1
                }
                ],
                flex: 1
            },
            {
                items: [
                {
                    xtype: "button",
                    text: "Buscar",
                    ui: "action",
                    flex: 1,
                    handler: function () {
                        var campo = Ext.getCmp("campoBusqueda").getValue();
                        var criterio = Ext.getCmp("criterioBusqueda").getValue();
                        var myStore = Ext.getStore('ListadoGeneralStore');
                        myStore.removeAll();
                        var afiliadoStore = Ext.getStore('getAfiliadoMainStore');
                        $('body').loading({
                            theme: 'dark',
                            message: 'Consultando...'
                        });
                        var cont = 0;
                        async.each(afiliadoStore.data.items, function(item, callback) {
                            setTimeout(function() {
                                if(campo == "identificacionFuanAfiliado"){
                                    if(item.data.identificacionFuanAfiliado != criterio){
                                        callback()
                                    }else{
                                        myStore.add(item.data);
                                        cont++;
                                        callback("Se encontro");
                                    }
                                }
                                if(campo == "numCarnetFuanAfiliado"){
                                    if(item.data.numCarnetFuanAfiliado != criterio){
                                        callback()
                                    }else{
                                        myStore.add(item.data);
                                        cont++;
                                        callback("Se encontro");
                                    }
                                }
                            },0);                            
                        }, function(err) {
                            if(err){
                                console.log(err);                                   
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
                }
                ]
            }
            ]
        },
        {
            xtype: "grid",
            columns: [
            { dataIndex: "identificacionFuanAfiliado", text: "Identificación", flex: 1 },
            { dataIndex: "primerApellidoFuanAfiliado", text: "Primer Apellido", flex: 1 },
            { dataIndex: "segundoApellidoFuanAfiliado", text: "Segundo Apellido", flex: 1 },
            { dataIndex: "primerNombreFuanAfiliado", text: "Primer Nombre", flex: 1 },
            { dataIndex: "segundoNombreFuanAfiliado", text: "Segundo Nombre", flex: 1 }
            ],
            id: "Grid-ListaAfiliados",
            itemHeight: 34,
            height: 200,
            listeners: {
                itemtap: function (grd, index, target, record, e, eOpts) {
                    Ext.getCmp('codigoTipoIdentificacion').setValue("");
                    Ext.getCmp('nombreTipoSexo').setValue("");
                    Ext.getCmp('idFuanAfiliado').setValue(0);
                    Ext.getCmp('numCarnetFuanAfiliado').setValue("");
                    if (btn.inGrid === true) {
                    }
                    else {
                        Ext.getCmp('idFuanAfiliado').setValue(record.get('idFuanAfiliado'));
                        Ext.getCmp('numCarnetFuanAfiliado').setValue(record.get("numCarnetFuanAfiliado"));
                        // Tipo Identificacion
                        var tipoIdentificacionStore = Ext.getStore('getTipoIdentificacion');
                        _.forEach(tipoIdentificacionStore.data.items, function(item) {
                            if(record.get('idTipoIdentificacion') == item.data.idTipoIdentificacion){
                                console.log(item.data);
                                Ext.getCmp('codigoTipoIdentificacion').setValue(item.data.codigoTipoIdentificacion);
                            }
                        });
                        Ext.getCmp('identificacionFuanAfiliado').setValue(record.get('identificacionFuanAfiliado'));
                        var age = 0;
                        if(record.get('fechaNacimientoFuanAfiliado')) {
                            var today = new Date();
                            var birthDate = new Date(record.get('fechaNacimientoFuanAfiliado'));
                            age = today.getFullYear() - birthDate.getFullYear();
                            var m = today.getMonth() - birthDate.getMonth();
                            if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
                                age--;
                            }

                            Ext.getCmp('edadFuanAfiliado').setValue(String(age));
                            //Sexo
                            var sexoStore = Ext.getStore('getSexoStore');
                            _.forEach(sexoStore.data.items, function(sexo) {
                                if(record.get('idTipoSexo') == sexo.data.idTipoSexo){
                                    Ext.getCmp('nombreTipoSexo').setValue(sexo.data.nombreTipoSexo);
                                }
                            });
                        }
                    }
                    me.overlay.destroy();
                }
            },
            store: {
                storeId: "ListadoGeneralStore",
                autoLoad: false,
                fields: [
                "idFuanAfiliado", "primerApellidoFuanAfiliado", 'segundoApellidoFuanAfiliado',
                'primerNombreFuanAfiliado', "segundoNombreFuanAfiliado", "codigoTipoIdentificacion",
                "identificacionFuanAfiliado", "nombreTipoSexo",
                {
                    name: "compAfiliado", convert: function (v, record) {
                        var primerNombre = (record.get("primerNombreFuanAfiliado"))?record.get("primerNombreFuanAfiliado"):"";
                        var segundoNombre = (record.get("segundoNombreFuanAfiliado"))?record.get("segundoNombreFuanAfiliado"):"";
                        var primerApellido = (record.get("primerApellidoFuanAfiliado"))?record.get("primerApellidoFuanAfiliado"):"";
                        var segundoApellido = (record.get("segundoApellidoFuanAfiliado"))?record.get("segundoApellidoFuanAfiliado"):"";

                        return record.get("identificacionFuanAfiliado") + " - " +
                        primerApellido + " " +
                        segundoApellido + " " +
                        primerNombre + " " +
                        segundoNombre;
                    }
                },
                {
                    name: "nombreCompletoAfiliado", convert: function (v, record) {
                        var primerNombre = (record.get("primerNombreFuanAfiliado"))?record.get("primerNombreFuanAfiliado"):"";
                        var segundoNombre = (record.get("segundoNombreFuanAfiliado"))?record.get("segundoNombreFuanAfiliado"):"";
                        var primerApellido = (record.get("primerApellidoFuanAfiliado"))?record.get("primerApellidoFuanAfiliado"):"";
                        var segundoApellido = (record.get("segundoApellidoFuanAfiliado"))?record.get("segundoApellidoFuanAfiliado"):"";
                        return primerApellido + " " +
                        segundoApellido + " " +
                        primerNombre + " " +
                        segundoNombre;
                    }
                }
                ],
                pageSize: 5,
                data: []
            },
            flex: 5
        }
        ],
        scrollable: true,
    });
},

buscarNuevaIps: function(btn) {
    var me = this;
    me.overlay = Ext.Viewport.add({
        xtype: 'panel',
        modal: true,
        hideOnMaskTap: false,
        showAnimation: {
            type: 'popIn',
            duration: 250,
            easing: 'ease-out'
        },
        hideAnimation: {
            type: 'popOut',
            duration: 250,
            easing: 'ease-out'
        },
        centered: true,
        style: "width: 60%",
        styleHtmlContent: true,
        items: [
        {
            xtype: "button",
            text: "Cerrar",
            ui: "action",
            width: 70,
            style: "position: relative; top: 0; left: 91%",
            handler: function () {
                me.overlay.destroy();
            }
        },
        { html: '<p style="text-align: center">Seleccione los criterios de búsqueda para filtrar las IPS.</p><br />' },
        {
            docked: 'top',
            xtype: 'toolbar',
            title: '<p style="text-align: center"><b>Listado de IPS</b></p>'
        },
        {
            layout: {
                type: "hbox"
            },
            items: [
            {
                items: [
                {
                    xtype: "selectfield",
                    displayField: "nombre",
                    label: "Campo",
                    queryMode: "local",
                    id: "campoBusqueda",
                    store: Ext.create("Ext.data.ArrayStore", {
                        fields: ["id", "nombre"],
                        data: [
                        ["codigoIps", "Código IPS"]
                        ]
                    }),
                    valueField: "id"
                },
                {
                    xtype: "textfield",
                    label: "Criterio",
                    id: "criterioBusqueda",
                    flex: 1
                }
                ],
                flex: 1
            },
            {
                items: [
                {
                    xtype: "button",
                    text: "Buscar",
                    ui: "action",
                    flex: 1,
                    handler: function () {
                        var campo = Ext.getCmp("campoBusqueda").getValue();
                        var criterio = Ext.getCmp("criterioBusqueda").getValue();
                        var myStore = Ext.getStore('ListadoIpsStore');
                        var ipsStore = Ext.getStore('ipsMainStore');
                        $('body').loading({
                            theme: 'dark',
                            message: 'Consultando...'
                        });
                        var cont = 0;
                        async.each(ipsStore.data.items, function(item, callback) {
                            setTimeout(function() {
                                if(campo == "codigoIps"){
                                    if(item.data.codigoIps != criterio){
                                        callback()
                                    }else{
                                        myStore.add(item.data);
                                        cont++;
                                        callback("Se encontro");
                                    }
                                }
                            },0);                            
                        }, function(err) {
                            if(err){
                                console.log(err);                                   
                            }else{
                                if(cont == 0) {
                                    Ext.Msg.alert('ATENCION', "No existe ninguna IPS con ese Código", Ext.emptyFn);
                                }else{
                                    Ext.Msg.alert('ATENCION', "La IPS se consulto correctamente", Ext.emptyFn);
                                }
                            }
                        });
                        $('body').loading('stop');

                    }
                }
                ]
            }
            ]
        },
        {
            xtype: "grid",
            columns: [
            { dataIndex: "idIps", text: "Identificación", flex: 1 },
            { dataIndex: "codigoIps", text: "Primer Apellido", flex: 1 },
            { dataIndex: "razonIps", text: "Segundo Apellido", flex: 3 }
            ],
            id: "Grid-ListaIPS",
            itemHeight: 34,
            height: 200,
            listeners: {
                itemtap: function (grd, index, target, record, e, eOpts) {
                    if (btn.inGrid === true) {
                    }
                    else {
                        Ext.getCmp("idIps").setValue(record.get('idIps'));
                        Ext.getCmp("nombreCompletoIps").setValue(record.get('nombreCompletoIps'));
                    }
                    me.overlay.destroy();
                }
            },
            store: {
                storeId: "ListadoIpsStore",
                autoLoad: false,
                fields: [
                "idIps", "codigoIps", "identificacionIps", "razonIps", "nombreCompletoIps"
                ],
                pageSize: 5,
                data: []
            },
            flex: 5
        }
        ],
        scrollable: true,
    });
},

Menu: null,
reloj: null

});

// definición de url de servicios
Ext.define("Coomuce.Url", {
    singleton: true,
    //PRODUCTION

    //Seguridad: "http://181.50.98.80:82/" + "CoomuceSeguridad.svc/",
    //Administracion: "http://181.50.98.80:82/" + "CoomuceAdministracion.svc/",
    //Parametros: "http://181.50.98.80:82/" + "CoomuceParametros.svc/",
    //Funciones: "http://181.50.98.80:82/" + "CoomuceFunciones.svc/"

    //Seguridad: "http://192.168.1.113:82/" + "CoomuceSeguridad.svc/",
    //Administracion: "http://192.168.1.113:82/" + "CoomuceAdministracion.svc/",
    //Parametros: "http://192.168.1.113:82/" + "CoomuceParametros.svc/",
    //Funciones: "http://192.168.1.113:82/" + "CoomuceFunciones.svc/"

    //DEVELOP
    Seguridad: "http://localhost:60871/" + "CoomuceSeguridad.svc/",
    Administracion: "http://localhost:60871/" + "CoomuceAdministracion.svc/",
    Parametros: "http://localhost:60871/" + "CoomuceParametros.svc/",
    Funciones: "http://localhost:60871/" + "CoomuceFunciones.svc/"
});

/**
 * The main application class. An instance of this class is created by app.js when it
 * calls Ext.application(). This is the ideal place to handle application launch and
 * initialization details.
 */
 Ext.define('CoomuceMovil.Application', {
    extend: 'Ext.app.Application',
    
    name: 'CoomuceMovil',
    requires: [
    "Ext.MessageBox"
    ],

    stores: [
        // TODO: add global / shared stores here
        ],

        launch: function () {
            Ext.Date.monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
        },

        onAppUpdate: function () {
            Ext.Msg.confirm("COOMUCE", 'Esta aplicación ha sido actualizada, ¿Desea recargarla?',
                function (choice) {
                    if (choice === 'yes') {
                        window.location.reload();
                    }
                }
                );
        }
    });
