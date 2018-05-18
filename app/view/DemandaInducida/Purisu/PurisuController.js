Ext.define("CoomuceMovil.view.DemandaInducida.PurisuController", {
    extend: "Ext.app.ViewController",
    alias: "controller.demandainducida-purisu",

    statusComponent: false,
    components: [
    "idDepartamento", "idCiudad", "botonGuardar", "botonCancelar",
        "botonGridAdicionar"//, "botonGridRemover"
        ],

        getTitleView: function () {
            return this.getView().getTitle();
        },

        fnLimpiarDatos: function () {
            var form = Ext.getCmp("Form-Purisu-Principal");
            form.reset();

            //var storeGrid = Ext.getCmp('Grid-Purisu-Principal').getStore();
            //storeGrid.removeAll();
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

            var botonNuevaPlanilla = me.lookupReference("botonNuevaPlanilla");
            var botonBuscarAfiliado = me.lookupReference("botonBuscarAfiliado");

            if (me.statusComponent) {
                botonNuevaPlanilla.enable();
                botonBuscarAfiliado.disable();

                me.statusComponent = false;
            }
            else {
                botonNuevaPlanilla.disable();
                botonBuscarAfiliado.enable();

                me.fnLimpiarDatos();
                me.statusComponent = true;
            }
        },

        onBotonNuevaPlanillaClick: function (btn) {
            var me = this;

            me.fnEnableDisableComponent();
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
            var purisuStore = Ext.getStore('itemsPurisuStore');
            if(purisuStore.data.items.length == 0) {
                Ext.Msg.alert('Atención', 'Debe Cargar un Afiliado para continuar.');
            }else {
                Ext.Msg.confirm(titleView, "Desea guardar las modificaciones?", function (btn) {
                    if (btn === "yes") {
                        var form = Ext.getCmp("Form-Purisu-Principal");
                        var infoForm = form.getValues();
                        var infoPurisu = {
                    idInfoPurisu: 0, // inicializo este campo que no se captura en pantalla
                    idDepartamento: infoForm.idDepartamento,
                    idCiudad: infoForm.idCiudad,
                    idUsuario: Coomuce.Util.DatosUsuario.idUsuario
                };

                
                var listaPurisuModel = [];
                
                Ext.each(purisuStore.data.items, function (ob, index, all) {
                    var dato = ob.data;
                    dato.idMotivoConsulta = dato.idMotivoConsulta.split(",");
                    dato.idMotivoContacto = dato.idMotivoContacto.split(",");
                    dato.idPiezasInformativas = dato.idPiezasInformativas.split(",");
                    //dato.numCarnePurisu = dato.numCarnetFuanAfiliado;
                    //if (ob.dirty) {
                        //if (ob.phantom) {
                            listaPurisuModel.push(dato);
                        //}
                        //else {
                        //    viejos.push(ob.data);
                        //}

                        //itemsValidar.push(ob);
                    //}
                });

                // solo validar cuando se edita o adiciona registros
                //if (itemsValidar.length > 0) {
                //    var validator = Coomuce.Util.dataValidate(itemsValidar);

                //    if (!validator.success) {
                //        Coomuce.Util.ShowMessage({ type: "ERROR", title: titleView, msg: validator.msg });

                //        return false;
                //    }
                //}

                var purisu = {
                    infoPurisu: infoPurisu,
                    listaPurisuModel: listaPurisuModel
                };


                //localStorage.setItem("purisu", JSON.stringify(purisu));

                //var conf = {
                //    url: Coomuce.Url.Funciones + "PurisuGuardar",
                //    data: {
                //        infoPurisu: infoPurisu,
                //        listaPurisuModel: listaPurisuModel
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
        });
            }
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
            console.log(myStore);
        },

        onSelectCombo: function (combo, record, eOpts) {
            var me = this;

            if (combo.dependent) {
            //var rec = Ext.getCmp("Grid-Purisu-Principal").selModel.getSelection();

        //    if (combo.updateRecords !== undefined) {
        //        for (var i = 0; i < combo.campos.length; i++) {
        //            var ob = me.lookupReference(combo.campos[i]);
        //            ob.setValue(record.get(combo.campos[i]));
        //        }
        //    }
        //    else {
        //        rec[0].set(combo.idCampo, record.get(combo.idCampo));
        //    }
        //}
        //else {
            var ob = me.lookupReference(combo.campoDependent);

            var name = "";
            if (combo.name === "idEje1" || combo.name === "idUnidad1" || combo.name === "idModulo1") {
                name = combo.name.substring(0, combo.name.length - 1);
            }
            else {
                name = combo.name;
            }
            //var params = {};
            //params[name] = record.get(name);

            //ob.getStore().load({ params: params });
            ob.getStore().clearFilter();
            ob.getStore().filter(name, record.get(name));
        }
    },

    onSelectionChange: function (sm, selected, eOpts) {
        var me = this;

        if (selected.length > sm.maxSelection) {
            for (var i = sm.maxSelection; i < selected.length; i++) {
                var rec = selected[i];
                sm.deselect(rec, true); // deseleccionar registros que sobrepasan el limite
            }
            return false;
        }

        var valueId = selected.map(function (item) {
            return item.data[sm.idCampo];
        });

        var valueComp = selected.map(function (item) {
            return item.data[sm.compCampo];
        })

        var ob = me.lookupReference(sm.idCampo);
        ob.setValue(valueId);

        ob = me.lookupReference(sm.compCampo);
        ob.setValue(valueComp);
    },

    onSelectEje: function (combo, record, eOpts) {
        var ejeId = combo._value.data.idEje;
        var store = Ext.getStore("getUnityStorePurisu");
        var data = [];
        store.data.items.forEach(function(item, index) {
            if(item.data.idEje == ejeId) {
                data.push(item.data);
            }
        });
        var myStore = Ext.getStore('getUnidadStorePurisu');
        myStore.removeAll();
        myStore.add(data);
    },

    onSelectUnidad: function (combo, record, eOpts) {
        var unidadId = 0;
        if(combo._value){
            unidadId = combo._value.data.idUnidad;
        }        
        var store = Ext.getStore("getModuleStorePurisu");
        var data = [];
        store.data.items.forEach(function(item, index) {
            if(item.data.idUnidad == unidadId) {
                data.push(item.data);
            }
        });
        var myStore = Ext.getStore('getModuloStorePurisu');
        myStore.removeAll();
        myStore.add(data);
    },

    onSelectEje1: function (combo, record, eOpts) {
        var ejeId = combo._value.data.idEje;
        var store = Ext.getStore("getUnityStorePurisu1");
        var data = [];
        store.data.items.forEach(function(item, index) {
            if(item.data.idEje == ejeId) {
                data.push(item.data);
            }
        });
        var myStore = Ext.getStore('getUnidadStorePurisu1');
        myStore.removeAll();
        myStore.add(data);
    },

    onSelectUnidad1: function (combo, record, eOpts) {
        var unidadId = 0;
        if(combo._value){
            unidadId = combo._value.data.idUnidad;
        }  
        var store = Ext.getStore("getModuleStorePurisu1");
        var data = [];
        store.data.items.forEach(function(item, index) {
            if(item.data.idUnidad == unidadId) {
                data.push(item.data);
            }
        });
        var myStore = Ext.getStore('getModuloStorePurisu1');
        myStore.removeAll();
        myStore.add(data);
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
                        if(_.includes(sKey, "purisu")) {
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
                    var form = Ext.getCmp("Form-Purisu-Principal");
                    var i = 0,
                    dataKeys = [],
                    sKey;
                    for (; sKey = window.localStorage.key(i); i++) {
                        if(_.includes(sKey, "purisu")) {
                            dataKeys.push(sKey);
                        }            
                    }
                    if(dataKeys.length == 0){
                        Ext.Msg.alert('Información', "Los Datos están sincronizados", Ext.emptyFn);
                        $('body').loading('stop');
                        return false;
                    }

                    var cont = 0;
                    var errorData = "";
                    async.eachSeries(dataKeys, function(item, callback) {
                        var data = JSON.parse(window.localStorage.getItem(item));
                        console.log(data);
                        var conf = {
                            url: Coomuce.Url.Funciones + "PurisuGuardar",
                            data: {
                                infoPurisu: data.infoPurisu,
                                listaPurisuModel: data.listaPurisuModel
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
                                    errorData += data.infoPurisu.identificacionFuanAfiliado + " ";
                                    window.localStorage.removeItem(item);
                                    callback();
                                }else{
                                    window.localStorage.removeItem(item);
                                    callback();
                                }
                            }
                        };
                        console.log(conf);
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
                                                Ext.Msg.alert('ATENCION', "Se encontraron inconsistencias en la Planilla Unica. Se ha tenido que descartar", Ext.emptyFn);
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
                                                Ext.Msg.alert('ATENCION', "Se encontraron inconsistencias en la Planilla Unica. Se ha tenido que descartar", Ext.emptyFn);
                                            }
                                        }
                                    }
                                });
                            }
                        }
                    });
}
}
});

},


onBotonGridAdicionarClick: function (btn) {
    var me = this;
    var firmaPurisu = me.lookupReference("firmaPurisu");
    var form = Ext.getCmp("Form-Purisu-Principal");
    console.log(form);
    var datos = form.getValues();
    if(datos.identificacionFuanAfiliado == "0") {
        Ext.Msg.alert('Atención', 'Debe Cargar un Afiliado para continuar.');
    } else 
    {
        var purisuStore = Ext.getStore('itemsPurisuStore');
        datos.idInfoPurisu = 0;
        datos.numCarnePurisu = datos.numCarnetFuanAfiliado;
            // VisitaDomiciliaria
            var visita = me.lookupReference("idTipoVisitaDomiciliaria");
            datos.idTipoVisitaDomiciliaria = null
            datos.compTipoVisitaDomiciliaria = "";
            if(visita._value) {
                if(visita._value.data.idTipoVisitaDomiciliaria != "0") {
                    datos.idTipoVisitaDomiciliaria = visita._value.data.idTipoVisitaDomiciliaria;
                    datos.compTipoVisitaDomiciliaria = visita._value.data.compTipoVisitaDomiciliaria;
                }
            }            

            // Programa Resolucion 412
            var programa = me.lookupReference("idProgramaResolucion412");
            datos.idProgramaResolucion412 = null;
            datos.compProgramaResolucion412 = "";
            if(programa._value) {
                if(programa._value.data.idProgramaResolucion412 != "0"){
                    datos.idProgramaResolucion412 = programa._value.data.idProgramaResolucion412;
                    datos.compProgramaResolucion412 = programa._value.data.compProgramaResolucion412;
                }
            }            

            // Grupo de Interes
            var interes = me.lookupReference("idGrupoInteres");
            datos.idGrupoInteres = null;
            datos.compGrupoInteres = "";
            if(interes._value) {
                if(interes._value.data.idGrupoInteres != "0"){
                    datos.idGrupoInteres = interes._value.data.idGrupoInteres;
                    datos.compGrupoInteres = interes._value.data.compGrupoInteres;
                }
            }
            

            // Seguimiento Programas Intervencion Riesgo
            var seguimiento = me.lookupReference("idSeguimientoProgramasIntervencionRiesgo");
            datos.idSeguimientoProgramasIntervencionRiesgo = null;
            datos.compSeguimientoProgramasIntervencionRiesgo = "";
            if(seguimiento._value) {
                if(seguimiento._value.data.idSeguimientoProgramasIntervencionRiesgo != "0"){
                    datos.idSeguimientoProgramasIntervencionRiesgo = seguimiento._value.data.idSeguimientoProgramasIntervencionRiesgo;
                    datos.compSeguimientoProgramasIntervencionRiesgo = seguimiento._value.data.compSeguimientoProgramasIntervencionRiesgo;
                }
            }
            

            // Grupos Focales
            var focales = me.lookupReference("idGruposFocales");
            datos.idGruposFocales = null;
            datos.compGruposFocales = "";
            if(focales._value) {
                if(focales._value.data.idGruposFocales != "0"){
                    datos.idGruposFocales = focales._value.data.idGruposFocales;
                    datos.compGruposFocales = focales._value.data.compGruposFocales;
                }
            }
            

            // Eje
            var eje = me.lookupReference("idEje");
            datos.idEje = null;
            datos.compEje = "";
            if(eje._value) {
                if(eje._value.data.idEje != "0"){
                    datos.idEje = eje._value.data.idEje;
                    datos.compEje = eje._value.data.compEje;
                }
            }
            

            // Eje1
            var eje1 = me.lookupReference("idEje1");
            console.log(eje1);
            datos.idEje1 = null;
            datos.compEje1 = "";
            if(eje1._value) {
                if(eje1._value.data.idEje != "0"){
                    datos.idEje1 = eje1._value.data.idEje;
                    datos.compEje1 = eje1._value.data.compEje;
                }
            }
            

            // Unidad
            var unidad = me.lookupReference("idUnidad");
            datos.idUnidad = null;
            datos.compUnidad = "";            
            if(unidad._value) {
                if(unidad._value.data.idUnidad != "0"){
                    datos.idUnidad = unidad._value.data.idUnidad;
                    datos.compUnidad = unidad._value.data.compUnidad;
                }
            }
            

            // Unidad1
            var unidad1 = me.lookupReference("idUnidad1");
            datos.idUnidad1 = null;
            datos.compUnidad1 = "";
            if(unidad1._value) {
                if(unidad1._value.data.idUnidad1 != "0"){
                    datos.idUnidad1 = unidad1._value.data.idUnidad;
                    datos.compUnidad1 = unidad1._value.data.compUnidad;
                }
            }
            

            // Modulo
            var modulo = me.lookupReference("idModulo");
            datos.idModulo = null;
            datos.compModulo = "";
            if(modulo._value) {
                if(modulo._value.data.idModulo != "0"){
                    datos.idModulo = modulo._value.data.idModulo;
                    datos.compModulo = modulo._value.data.compModulo;
                }
            }
            

            // Modulo1
            var modulo1 = me.lookupReference("idModulo1");
            datos.idModulo1 = null;
            datos.compModulo1 = "";
            if(modulo1._value) {
                if(modulo1._value.data.idModulo1 != "0"){
                    datos.idModulo1 = modulo1._value.data.idModulo;
                    datos.compModulo1 = modulo1._value.data.compModulo;
                }
            }

            
            datos.idFuanAfiliado = parseInt(datos.idFuanAfiliado);
            datos.firmaPurisu = "";

            // Motivo Consulta
            datos.idMotivoConsulta = "";
            datos.compMotivoConsulta = "";
            var gridMotivoConsulta = Ext.getStore('motivoConsultaStore');
            _.forEach(gridMotivoConsulta.data.items, function(motivoConsulta) {
                if(motivoConsulta.data.seleccionado == true){
                    datos.idMotivoConsulta += motivoConsulta.data.idMotivoConsulta + ",";
                    datos.compMotivoConsulta += motivoConsulta.data.compMotivoConsulta + ",";
                }            
            })
            datos.idMotivoConsulta = datos.idMotivoConsulta.substring(0, datos.idMotivoConsulta.length - 1);
            datos.compMotivoConsulta = datos.compMotivoConsulta.substring(0, datos.compMotivoConsulta.length - 1);

            // Motivo Contacto
            datos.idMotivoContacto = "";
            datos.compMotivoContacto = "";
            var gridMotivoContacto = Ext.getStore('motivoContactoStore');
            _.forEach(gridMotivoContacto.data.items, function(motivoContacto) {
                if(motivoContacto.data.seleccionado == true){
                    datos.idMotivoContacto += motivoContacto.data.idMotivoContacto + ",";
                    datos.compMotivoContacto += motivoContacto.data.compMotivoContacto + ",";
                }            
            })
            datos.idMotivoContacto = datos.idMotivoContacto.substring(0, datos.idMotivoContacto.length - 1);
            datos.compMotivoContacto = datos.compMotivoContacto.substring(0, datos.compMotivoContacto.length - 1);

            // Piezas Informativas
            datos.idPiezasInformativas = "";
            datos.compPiezasInformativas = "";
            var gridPiezasInformativas = Ext.getStore('motivoPiezasStore');
            _.forEach(gridPiezasInformativas.data.items, function(piezas) {
                if(piezas.data.seleccionado == true){
                    datos.idPiezasInformativas += piezas.data.idPiezasInformativas + ",";
                    datos.compPiezasInformativas += piezas.data.compPiezasInformativas + ",";
                }            
            })
            datos.idPiezasInformativas = datos.idPiezasInformativas.substring(0, datos.idPiezasInformativas.length - 1);
            datos.compPiezasInformativas = datos.compPiezasInformativas.substring(0, datos.compPiezasInformativas.length - 1);

            //valido los Checkbox
            datos.actividadExtramuralPurisu = (datos.actividadExtramuralPurisu == null) ? false : datos.actividadExtramuralPurisu;
            datos.cauPurisu = (datos.cauPurisu == null) ? false : datos.cauPurisu;
            datos.ipsPrimariaPurisu = (datos.ipsPrimariaPurisu == null) ? false : datos.ipsPrimariaPurisu;
            datos.telefonicaPurisu = (datos.telefonicaPurisu == null) ? false : datos.telefonicaPurisu;
            datos.usisPurisu = (datos.usisPurisu == null) ? false : datos.usisPurisu;


            /*//Reglas de Validacion
            if(datos.idTipoVisitaDomiciliaria == 0){
                Ext.Msg.alert('Atención', 'Debe seleccionar un tipo de Visita Domiciliaria.');
                return false;
            }
            if(datos.idProgramaResolucion412 == 0){
                Ext.Msg.alert('Atención', 'Debe seleccionar un Programa Res. 412.');
                return false;
            }
            if(datos.idGrupoInteres == 0){
                Ext.Msg.alert('Atención', 'Debe seleccionar un Grupo de Interés.');
                return false;
            }
            if(datos.idSeguimientoProgramasIntervencionRiesgo == 0){
                Ext.Msg.alert('Atención', 'Debe seleccionar una opción en seguimiento Prog. Intervención del Riesgo');
                return false;
            }
            if(datos.idGruposFocales == 0){
                Ext.Msg.alert('Atención', 'Debe seleccionar un Grupo Focal.');
                return false;
            }
            if(datos.idEje == 0){
                Ext.Msg.alert('Atención', 'Debe seleccionar un Eje.');
                return false;
            }
            if(datos.idEje1 == 0){
                Ext.Msg.alert('Atención', 'Debe seleccionar un Eje.');
                return false;
            }
            if(datos.idMotivoConsulta == ""){
                Ext.Msg.alert('Atención', 'Debe seleccionar al menos un motivo de consulta.');
                return false;
            }
            if(datos.idMotivoContacto == ""){
                Ext.Msg.alert('Atención', 'Debe seleccionar al menos un motivo de contacto.');
                return false;
            }
            if(datos.idPiezasInformativas == ""){
                Ext.Msg.alert('Atención', 'Debe seleccionar al menos una pieza informativa.');
                return false;
            }
            */
            if(purisuStore.data.items[0].data.numCarnetFuanAfiliado == "0") {
                purisuStore.removeAll();
            }  

            var nextId = purisuStore.getCount() + 1;
            datos.idPurisu = nextId;

            console.log(datos);

            purisuStore.add(datos);

            //Pregunto si se desea agregar mas canalizaciones
            Ext.Msg.show({
                title: "Atención",
                message: 'Desea agregar una nueva Canalización a este Afiliado?',
                width: 300,
                buttons: [
                {text: 'Si', itemId: 'yes', ui: 'action'},
                {text: 'No', itemId: 'no'}
                ],
                fn: function (buttonId) {
                    if (buttonId === "yes") {
                    } else {
                        form.reset();        
                        
                        _.forEach(gridMotivoConsulta.data.items, function(motivoConsulta) {
                            if(motivoConsulta.data.seleccionado == true){
                                motivoConsulta.data.seleccionado = false;
                            }            
                        })

                        gridMotivoConsulta.reload();

                        
                        _.forEach(gridMotivoContacto.data.items, function(motivoContacto) {
                            if(motivoContacto.data.seleccionado == true){
                                motivoContacto.data.seleccionado = false;
                            }            
                        })

                        gridMotivoContacto.reload();
                        
                        _.forEach(gridPiezasInformativas.data.items, function(piezas) {
                            if(piezas.data.seleccionado == true){
                                piezas.data.seleccionado = false;
                            }            
                        })

                        gridPiezasInformativas.reload();
                    }
                }
            });
        }
    },

    onBotonGridRemoverClick: function () {
        var storeGrid = Ext.getCmp('Grid-Purisu-Principal');
        storeGrid.getStore().remove(storeGrid.selModel.getSelection());
    },

    onUploadDataComplete: function (source, file) {
        var titleView = this.getTitleView();
        var botonEliminar = this.lookupReference("botonEliminar");
        var firmaPurisu = this.lookupReference("firmaPurisu");

        botonEliminar.setText(file.data);
        firmaPurisu.setValue(file.data);

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
        btn.setText("");

        var firmaPurisu = this.lookupReference("firmaPurisu");
        firmaPurisu.setValue("");
    }

});