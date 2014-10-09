/**
 * SettingsController
 *
 * @description :: Server-side logic for managing settings
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
    index: function(req, res){
        res.locals.styles = [
            "vendor/slider/css/slider.css",
            "vendor/chosen/chosen.min.css",
            "vendor/datetimepicker/css/bootstrap-datetimepicker.min.css",
            "vendor/codemirror/lib/codemirror.css",
            "vendor/tagsinput/bootstrap-tagsinput.css",
            "styles/style.css",
        ];
        res.locals.scripts = [
            "vendor/formwizard/js/bwizard.min.js",
            "vendor/codemirror/lib/codemirror.js",
            "vendor/codemirror/addon/mode/overlay.js",
            "vendor/codemirror/mode/markdown/markdown.js",
            "vendor/codemirror/mode/xml/xml.js",
            "vendor/codemirror/mode/gfm/gfm.js",
            "vendor/marked/marked.js",
            "vendor/parsley/parsley.min.js",
            "vendor/moment/min/moment-with-langs.min.js",
            "vendor/datetimepicker/js/bootstrap-datetimepicker.min.js",
            "vendor/tagsinput/bootstrap-tagsinput.min.js",
            "vendor/inputmask/jquery.inputmask.bundle.min.js",
            "vendor/validation/jquery.validate.js",
            "controlScript/settingsIndex.js"
        ];

        async.waterfall([
                function(callback){
                    AutoMake.find().sort('name').exec(callback);
                },
                function(makes, callback){
                    AutoYear.findOneByYear(2014,function(err, year){
                        callback(null, makes, year);
                    });
                },
                function(makes, year, callback){
                    console.log(year);
                    AutoModel.find({id_make: makes[0].id, idYear: year.id}).sort('name').exec(function(err, res){
                        callback(null, makes, unique(res));
                    });
                }
            ],
            function(err, makes, models) {
                res.view('settings/index', {makes : makes, models: models});
            });
    },
    getVin: function(req, res) {
        //var code = "1N4AL3AP4DC295509";
        var code = req.query.vin;
        Car.getInfoVin(code, function(result){
            //console.log(result, res);
            res.json(result);
        });
    }
};

function unique(arr) {
    var obj = {},
        objs = [];
    var k = 0;
    for(var i=0; i<arr.length; i++) {
        var str = arr[i].name;
        if(obj[str]==undefined) {
            objs[k] = arr[i];
            k++;
        }
        obj[str] = true; // запомнить строку в виде свойства объекта
    }
    return objs; // или собрать ключи перебором для IE<9
}

