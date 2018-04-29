Ext.define('CoomuceMovil.view.main.MainController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.main',
    init: function() {
        $('body').loading({
            theme: 'dark',
            message: 'Cargando...'
        });
        setTimeout(function() {
            $('body').loading('stop');
        },5000);
    },
    onItemClick: function (obj, node, eOpts) {
        var me = this;

        try {
            if (Ext.get(obj.target.id).component === undefined) {
                return false;
            }
            var item = Ext.get(obj.target.id).component;

            if (item._node === undefined) {
                return false;
            }

            if (!item._expandable) {
                var ifpr = Ext.getCmp("Form-Ifppir-Principal");
                var hfdr = Ext.getCmp("Form-Hfdfr-Principal");
                var asistencia = Ext.getCmp("Form-ListadoAsistenciaGeneral-Principal");
                var encuestaIPS = Ext.getCmp("Form-EncuestaIps");
                var encuestaEPS = Ext.getCmp("Form-EncuestaEps");
                var purisu = Ext.getCmp("Form-Purisu-Principal");
                if(ifpr != undefined) {
                    ifpr.destroy();
                }
                if(hfdr != undefined) {
                    hfdr.destroy();
                }
                if(asistencia != undefined) {
                    asistencia.destroy();
                }
                if(encuestaIPS != undefined) {
                    encuestaIPS.destroy();
                }
                if(encuestaEPS != undefined) {
                    encuestaEPS.destroy();
                }
                if(purisu != undefined) {
                    purisu.destroy();
                }
                var mod = Ext.create({ xtype: item._node.data.vista });

                Ext.getCmp("ContenedorModulo").removeAll();
                Ext.getCmp("ContenedorModulo").add(mod);
            }
        } catch (err) {
            console.log(err);
            Coomuce.Util.ShowMessage({ type: "ERROR", title: "COOMUCE", msg: err.message });
        }
    }

});
