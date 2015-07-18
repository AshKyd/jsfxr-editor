var props = require('./properties');

function Effect(string){
    if(string){
        this.loadString(string);
    }
    this.audio = new Audio();
}

Effect.prototype.reset = function(){
    // this.loadString(',,,,,,,,,,,,,,,,,,,,,,,0.5');
	this.p_type.value = 0;
	this.p_base_freq.value = 0.3;
	this.p_freq_limit.value = 0.0;
	this.p_freq_ramp.value = 0.0;
	this.p_freq_dramp.value = 0.0;
	this.p_duty.value = 0.0;
	this.p_duty_ramp.value = 0.0;

	this.p_vib_strength.value = 0.0;
	this.p_vib_speed.value = 0.0;

	this.p_env_attack.value = 0.0;
	this.p_env_sustain.value = 0.3;
	this.p_env_punch.value = 0.4;
	this.p_env_decay.value = 0.0;

	this.p_lpf_resonance.value = 0.0;
	this.p_lpf_freq.value = 1.0;
	this.p_lpf_ramp.value = 0.0;
	this.p_hpf_freq.value = 0.0;
	this.p_hpf_ramp.value = 0.0;

	this.p_repeat_speed.value = 0.0;
	this.p_pha_offset.value = 0.0;
	this.p_pha_ramp.value = 0.0;

	this.p_arp_speed.value = 0.0;
	this.p_arp_mod.value = 0.0;
};

Effect.prototype.toArray = function(){
    var _this = this;
    var arr = [];
    props.forEach(function(prop, i){
        var propVal = _this[prop.name].value;
        arr.push(propVal);
    });
    return arr;
};

Effect.prototype.toString = function(){
    return this.toArray().join(',');
};

Effect.prototype.loadString = function(string){
    var _this = this;
    var str = _this.parseString(string);
    if(str){
        props.forEach(function(prop, i){
            _this[prop.name] = {
                meta: prop,
                value: str[i]
            };
        });
    }
};

Effect.prototype.parseString = function(str){
    try{
        var a = str.split(',').map(function(item){
            if(item === ''){
                return undefined;
            } else {
                return Number(item);
            }
        });
        if(a.length === 24){
            return a;
        } else {
            return false;
        }
    }catch(e){
        return false;
    }
};

Effect.prototype.play = function(){
    var playString = this.toArray();
    this.audio.src = jsfxr(playString);
    this.audio.play();
};

Effect.prototype.generateBlipSelect = function(){
	this.reset();

	this.p_type.value = Math.round(Math.random() * 2);
	if(this.p_type.value === 0) {
        this.p_duty.value = Math.random() * 0.6;
    }

	this.p_base_freq.value = 0.2 + Math.random() * 0.4;

	this.p_env_sustain.value = 0.1 + Math.random() * 0.1;
	this.p_env_decay.value = Math.random() * 0.2;
	this.p_hpf_freq.value = 0.1;
};

Effect.prototype.generateJump = function(){
    this.reset();
	this.p_type.value = 0;
	this.p_duty.value = Math.random() * 0.6;
	this.p_base_freq.value = 0.3 + Math.random() * 0.3;
	this.p_freq_ramp.value = 0.1 + Math.random() * 0.2;

	this.p_env_sustain.value = 0.1 + Math.random() * 0.3;
	this.p_env_decay.value = 0.1 + Math.random() * 0.2;

	if(Math.random() < 0.5) this.p_hpf_freq.value = Math.random() * 0.3;
	if(Math.random() < 0.5) this.p_lpf_freq.value = 1.0 - Math.random() * 0.6;
};

Effect.prototype.generatePickupCoin = function(){
    this.reset();
    this.p_base_freq.value = 0.4 + Math.random() * 0.5;

    this.p_env_sustain.value = Math.random() * 0.1;
    this.p_env_decay.value = 0.1 + Math.random() * 0.4;
    this.p_env_punch.value = 0.3 + Math.random() * 0.3;

    if(Math.random() < 0.5){
        this.p_arp_speed.value = 0.5 + Math.random() * 0.2;
        this.p_arp_mod.value = 0.2 + Math.random() * 0.4;
    }
};

Effect.prototype.generateLaserShoot = function(){
    this.reset();
    this.p_type.value = Math.round(Math.random() * 3);
    if(this.p_type.value == 2 && Math.random() < 0.5){
        this.p_type.value = Math.round(Math.random() * 2);
    }

    this.p_base_freq.value = 0.5 + Math.random() * 0.5;
    this.p_freq_limit.value = this.p_base_freq.value - 0.2 - Math.random() * 0.6;
    if(this.p_freq_limit.value < 0.2){
        this.p_freq_limit.value = 0.2;
    }

    this.p_freq_ramp.value = -0.15 - Math.random() * 0.2;

    if(Math.random() < 0.33){
        this.p_base_freq.value = 0.3 + Math.random() * 0.6;
        this.p_freq_limit.value = Math.random() * 0.1;
        this.p_freq_ramp.value = -0.35 - Math.random() * 0.3;
    }

    if(Math.random() < 0.5){
        this.p_duty.value = Math.random() * 0.5;
        this.p_duty_ramp.value = Math.random() * 0.2;
    } else {
        this.p_duty.value = 0.4 + Math.random() * 0.5;
        this.p_duty_ramp.value =- Math.random() * 0.7;
    }

    this.p_env_sustain.value = 0.1 + Math.random() * 0.2;
    this.p_env_decay.value = Math.random() * 0.4;
    if(Math.random() < 0.5){
        this.p_env_punch.value = Math.random() * 0.3;
    }

    if(Math.random() < 0.33){
        this.p_pha_offset.value = Math.random() * 0.2;
        this.p_pha_ramp.value = -Math.random() * 0.2;
    }

    if(Math.random() < 0.5){
        this.p_hpf_freq.value = Math.random() * 0.3;
    }
};

Effect.prototype.generateExplosion = function(){
    this.reset();
    this.p_type.value = 3;

    if(Math.random() < 0.5){
        this.p_base_freq.value = 0.1 + Math.random() * 0.4;
        this.p_freq_ramp.value = -0.1 + Math.random() * 0.4;
    }else{
        this.p_base_freq.value = 0.2 + Math.random() * 0.7;
        this.p_freq_ramp.value = -0.2 - Math.random() * 0.2;
    }

    this.p_base_freq.value *= this.p_base_freq.value;

    if(Math.random() < 0.2){
        this.p_freq_ramp.value = 0.0;
    }
    if(Math.random() < 0.33){
        _repeatSpeed = 0.3 + Math.random() * 0.5;
    }

    this.p_env_sustain.value = 0.1 + Math.random() * 0.3;
    this.p_env_decay.value = Math.random() * 0.5;
    this.p_env_punch.value = 0.2 + Math.random() * 0.6;

    if(Math.random() < 0.5){
        this.p_pha_offset.value = -0.3 + Math.random() * 0.9;
        this.p_pha_ramp.value = -Math.random() * 0.3;
    }

    if(Math.random() < 0.33){
        this.p_arp_speed.value = 0.6 + Math.random() * 0.3;
        this.p_arp_mod.value = 0.8 - Math.random() * 1.6;
    }
};

Effect.prototype.generateHit = function(){
    this.reset();
	var waveType = Math.round(Math.random() * 3);
	this.p_type.value = waveType;
	if(this.p_type.value == 2){
        this.p_type.value = 3;
    } else if(waveType === 0){
        this.p_duty.value = Math.random() * 0.6;
    }

	this.p_base_freq.value = 0.2 + Math.random() * 0.6;
	this.p_freq_ramp.value = -0.3 - Math.random() * 0.4;

	this.p_env_sustain.value = Math.random() * 0.1;
	this.p_env_decay.value = 0.1 + Math.random() * 0.2;

	if(Math.random() < 0.5){
        this.p_hpf_freq.value = Math.random() * 0.3;
    }
};

Effect.prototype.generatePowerup = function(){
    this.reset();
    if(Math.random() < 0.5){
        this.p_type.value = 1;
    } else {
        this.p_duty.value = Math.random() * 0.6;
    }

    if(Math.random() < 0.5){
        this.p_base_freq.value = 0.2 + Math.random() * 0.3;
        this.p_freq_ramp.value = 0.1 + Math.random() * 0.4;
        this.p_repeat_speed.value = 0.4 + Math.random() * 0.4;
    } else {
        this.p_base_freq.value = 0.2 + Math.random() * 0.3;
        this.p_freq_ramp.value = 0.05 + Math.random() * 0.2;

        if(Math.random() < 0.5){
            this.p_vib_strength.value = Math.random() * 0.7;
            this.p_vib_speed.value = Math.random() * 0.6;
        }
    }

    this.p_env_sustain.value = Math.random() * 0.4;
    this.p_env_decay.value = 0.1 + Math.random() * 0.4;
};


module.exports = Effect;
