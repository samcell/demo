// Minimal local Amplitude shim for GitHub Pages (logs events to console only)
(function(){
  if (window.amplitude && typeof window.amplitude.getInstance === 'function') return;
  function Identify() {
    this._properties = {};
    this.set = function(key, value) { this._properties[key] = value; return this; };
    this.setOnce = function(key, value){ if (!(key in this._properties)) this._properties[key]=value; return this; };
    this.append = function(key, value){ if (!this._properties[key]) this._properties[key]=[]; this._properties[key].push(value); return this; };
  }
  function createInstance() {
    return {
      init: function(apiKey, userId, options){ console.info('Amplitude.init', apiKey, options); },
      logEvent: function(eventName, eventProps){ console.info('Amplitude.logEvent', eventName, eventProps||{}); },
      identify: function(identifyObj){ console.info('Amplitude.identify', identifyObj && identifyObj._properties ? identifyObj._properties : identifyObj); },
      setUserId: function(id){ console.info('Amplitude.setUserId', id); },
      setDeviceId: function(id){ console.info('Amplitude.setDeviceId', id); }
    };
  }
  var _instance = createInstance();
  window.amplitude = {
    getInstance: function(){ return _instance; },
    Identify: Identify,
    _q: []
  };
})();