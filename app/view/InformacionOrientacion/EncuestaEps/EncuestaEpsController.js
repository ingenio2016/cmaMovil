Ext.define("CoomuceMovil.view.InformacionOrientacion.EncuestaEpsController", {
    extend: "Ext.app.ViewController",
    alias: "controller.informacionorientacion-encuestaeps",

    getTitleView: function () {
        return this.getView().getTitle();
    },

    fnGenerarPlantilla: function (data) {
        var contenedorEncuesta = Ext.getCmp("ContenidoEncuestaEps");

        Ext.Array.each(data, function (itemCat) {
            var fs = Ext.create("Ext.form.FieldSet", {
                //anchor: "100%",
                defaults: { anchor: "100%" },
                //layout: "anchor",
                style: "padding-top: 5px;padding-bottom: 5px;",
                title: itemCat.nombreEncuestaCategoria
            });

            Ext.Array.each(itemCat.preguntas, function (itemPre) {
                var obj = [], label;

                label = Ext.create("Ext.Container", {
                    html: itemPre.textoEncuestaPregunta
                });

                fs.add(label);

                switch (itemPre.tipoPreEncuestaPregunta) {
                    case 1: // "ÚNICA RESPUESTA"
                        //obj = Ext.create("Ext.form.RadioGroup", {
                        //    allowBlank: false,
                        //    columns: 1,
                        //    name: "id_pre_" + itemPre.idEncuestaPregunta,
                        //    vertical: false
                        //});

                        for (var i = 0; i < itemPre.literales.length; i++) {
                            obj.push({
                                xtype: "radiofield",
                                label: itemPre.literales[i].textoEncuestaLiteral,
                                value: itemPre.literales[i].valorEncuestaLiteral,
                                name: "id_pre_" + itemPre.idEncuestaPregunta,
                                checked: itemPre.literales[i].checkedEncuestaLiteral
                            });

                            //obj.add({
                            //    boxLabel: itemPre.literales[i].textoEncuestaLiteral,
                            //    inputValue: itemPre.literales[i].valorEncuestaLiteral,
                            //    checked: itemPre.literales[i].checkedEncuestaLiteral
                            //});
                        }

                        //for (var i = 0; i < itemPre.literales.length; i++) {
                        //    obj.add({
                        //        boxLabel: itemPre.literales[i].textoEncuestaLiteral,
                        //        inputValue: itemPre.literales[i].valorEncuestaLiteral,
                        //        checked: itemPre.literales[i].checkedEncuestaLiteral
                        //    });
                        //}

                        //obj = Ext.create("Ext.form.RadioGroup", {
                        //    name: "id_pre_" + itemPre.idEncuestaPregunta,
                        //    items: [
                        //        { boxLabel: "SI", inputValue: itemPre.valorEncuestaPregunta },
                        //        { boxLabel: "NO", inputValue: 0, checked: true }
                        //    ],
                        //    vertical: true
                        //});

                        break;
                    case 2: // "MÚLTIPLES RESPUESTAS"
                        //obj = Ext.create("Ext.form.CheckboxGroup", {
                        //    allowBlank: false,
                        //    columns: 1,
                        //    vertical: false
                        //});

                        for (var i = 0; i < itemPre.literales.length; i++) {
                            obj.push({
                                xtype: "checkboxfield",
                                label: itemPre.literales[i].textoEncuestaLiteral,
                                //boxLabel: itemPre.literales[i].textoEncuestaLiteral,
                                name: "id_lit_" + itemPre.literales[i].idEncuestaLiteral,
                                value: itemPre.literales[i].valorEncuestaLiteral
                                //inputValue: itemPre.literales[i].valorEncuestaLiteral
                            });
                        }

                        //for (var i = 0; i < itemPre.literales.length; i++) {
                        //    obj.add({
                        //        boxLabel: itemPre.literales[i].textoEncuestaLiteral,
                        //        name: "id_lit_" + itemPre.literales[i].idEncuestaLiteral,
                        //        inputValue: itemPre.literales[i].valorEncuestaLiteral
                        //    });
                        //}

                        break;
                    case 3: //"SELECCIONE UNA"
                        //obj = Ext.create("Ext.form.RadioGroup", {
                        //    allowBlank: false,
                        //    columns: 1,
                        //    vertical: false
                        //});

                        for (var i = 0; i < itemPre.literales.length; i++) {
                            obj.add({
                                xtype: "radiofield",
                                label: itemPre.literales[i].textoEncuestaLiteral,
                                name: "id_lit_" + itemPre.literales[i].idEncuestaLiteral,
                                value: itemPre.literales[i].valorEncuestaLiteral
                            });
                            //obj.add({
                            //    boxLabel: itemPre.literales[i].textoEncuestaLiteral,
                            //    name: "id_lit_" + itemPre.literales[i].idEncuestaLiteral,
                            //    inputValue: itemPre.literales[i].valorEncuestaLiteral
                            //});
                        }

                        //for (var i = 0; i < itemPre.literales.length; i++) {
                        //    obj.add({
                        //        boxLabel: itemPre.literales[i].textoEncuestaLiteral,
                        //        name: "id_lit_" + itemPre.literales[i].idEncuestaLiteral,
                        //        inputValue: itemPre.literales[i].valorEncuestaLiteral
                        //    });
                        //}

                        break;
                    }

                    fs.add(obj);
                });

contenedorEncuesta.add(fs);
});
},

onActivate: function (newActiveItem, view, oldActiveItem, eOpts) {
    var me = this;

    var store = me.getViewModel().getStore("getEncuesta");

    store.on("load", function (store, records, successful, operation, eOpts) {
        var res = Ext.decode(operation._response.responseText);

        me.fnGenerarPlantilla(res.data);
    });
    store.load();
},

onBotonGuardarClick: function () {
    var me = this;
    var titleView = me.getTitleView();

    Ext.Msg.confirm(titleView, "Desea guardar las modificaciones?", function (btn) {
        if (btn === "yes") {
            var form = Ext.getCmp("Form-EncuestaEps");

            if (!form.isValid()) {
                Coomuce.Util.ShowMessage({ type: "ERROR", title: titleView, msg: "Hay campos obligatorios que deben ser diligenciados." });
                return false;
            }
            var datos = form.getValues();

            var encuestaEps = {};
            var resPre = [];
            var resLit = [];

            for (var key in datos) {
                if (key === 'length' || !datos.hasOwnProperty(key)) continue;

                var value = datos[key];
                switch (key.substring(0, 6)) {
                    case "id_pre":
                    resPre.push({
                                idEncuestaEps: 0, // inicializo este campo que no se captura en pantalla
                                idEncuestaPregunta: parseInt(key.substring(7)),
                                valorEncuestaEpsRespPregunta: value
                            });
                    break;
                    case "id_lit":
                    resLit.push({
                                idEncuestaEps: 0, // inicializo este campo que no se captura en pantalla
                                idEncuestaLiteral: parseInt(key.substring(7)),
                                valorEncuestaEpsRespLiteral: value
                            });
                    break;
                    default:
                    encuestaEps[key] = value;
                    break;
                }
            }

            var encuesta = {
                encuestaEps: encuestaEps,
                respPregunta: resPre,
                respLiteral: resLit
            };

            localStorage.setItem("encuestaEps", JSON.stringify(encuesta));
        }
    });
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
                    if(_.includes(sKey, "encuestaEps")) {
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
                var form = Ext.getCmp("Form-EncuestaEps");
                var i = 0,
                dataKeys = [],
                sKey;
                for (; sKey = window.localStorage.key(i); i++) {
                    if(_.includes(sKey, "encuestaEps")) {
                        dataKeys.push(sKey);
                    }            
                }
                if(dataKeys.length == 0){
                    Ext.Msg.alert('Información', "Los Datos están sincronizados", Ext.emptyFn);
                    $('body').loading('stop');
                    return false;
                }

                var cont = 0;
                async.eachSeries(dataKeys, function(item, callback) {
                    var data = JSON.parse(window.localStorage.getItem(item));
                    var conf = {
                        url: Coomuce.Url.Funciones + "EncuestaEpsGuardar",
                        data: {
                            encuestaEps: data.encuestaEps,
                            respPregunta: data.respPregunta,
                            respLiteral: data.respLiteral
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
                                errorData += data.encuestaEps.compAfiliado + " ";
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
                                                    Ext.Msg.alert('ATENCION', "Se encontraron inconsistencias en las encuestas de los afiliados con documento de idendificación " + errorData + " estas encuestas se han tenido que descartar", Ext.emptyFn);
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
                                                    Ext.Msg.alert('ATENCION', "Se encontraron inconsistencias en las encuestas de los afiliados con documento de idendificación " + errorData + " Estas encuestas se han tenido que descartar", Ext.emptyFn);
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
                                                    Ext.Msg.alert('ATENCION', "Se encontraron inconsistencias en las encuestas de los afiliados con documento de idendificación " + errorData + " Estas encuestas se han tenido que descartar", Ext.emptyFn);
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

onBotonCancelarClick: function () {
    var me = this;

    Ext.Msg.confirm(me.getTitleView(), "Desea cancelar las modificaciones?", function (btn) {
        if (btn === "yes") {
            var form = Ext.getCmp("Form-EncuestaEps");

            form.reset();
        }
    });
}

});