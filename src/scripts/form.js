var fs = require('fs');
var Effect = require('./effect');
var tb = require('throttle-debounce');
var template = fs.readFileSync(__dirname + '/../template/sliders.html', 'utf8');
function Form(opts){
    var _this = this;
    this.data = new Effect(opts.effect);
    this.data.string_val = this.data.toString();
    this.ractive = new Ractive({
        el: opts.el,
        template: template,
        data: this.data
    });
    var onChange = tb.throttle(200,true,function(e,f,g){
        var keys = Object.keys(e);
        console.log('doing things', e);
        if(e.string_val){
            _this.data.loadString(_this.data.string_val);
        } else {
            _this.ractive.set('string_val', _this.data.toString());
        }
        _this.data.play();
    });
    this.ractive.on('change', onChange);

    this.ractive.on('action', function(e){
        var action = e.node.dataset.action;
        if(_this.data[action]){
            _this.data[action]();
        }
        _this.ractive.set('string_val', _this.data.toString());
        _this.ractive.update();
    });
}

module.exports = Form;
