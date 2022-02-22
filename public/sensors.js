var projectName = window.location.hostname.split('.')[0];

// sensorsdata version 1.15.11
var options = {
    sdk_url: 'https://cdn.aqara.com/cdn/common/mainland/statics/sensors/web/latest/sensorsdata.min.js',
    server_url: 'https://datasink.aqara.cn/up?project=' + projectName,
    name: 'sensors',
    // 如有跨域问题，不配置此参数
    send_type: 'ajax',
    is_track_single_page: true,
    heatmap: {},
};

(function(para) {
    const p = para.sdk_url;
    const n = para.name;
    const w = window;
    const d = document;
    const s = 'script';
    let x = null;
    let y = null;
    if (typeof w.sensorsDataAnalytic201505 !== 'undefined') {
        return false;
    }
    w.sensorsDataAnalytic201505 = n;
    w[n] =
        w[n] ||
        function(a) {
            return function() {
                (w[n]._q = w[n]._q || []).push([a, arguments]);
            };
        };
    const ifs = [
        'track',
        'quick',
        'register',
        'registerPage',
        'registerOnce',
        'trackSignup',
        'trackAbtest',
        'setProfile',
        'setOnceProfile',
        'appendProfile',
        'incrementProfile',
        'deleteProfile',
        'unsetProfile',
        'identify',
        'login',
        'logout',
        'trackLink',
        'clearAllRegister',
        'getAppStatus',
    ];
    for (let i = 0; i < ifs.length; i++) {
        w[n][ifs[i]] = w[n].call(null, ifs[i]);
    }
    if (!w[n]._t) {
        (x = d.createElement(s)), (y = d.getElementsByTagName(s)[0]);
        x.async = 1;
        x.src = p;
        x.setAttribute('charset', 'UTF-8');
        w[n].para = para;
        y.parentNode.insertBefore(x, y);
    }
})(options);

sensors.quick('autoTrack');
