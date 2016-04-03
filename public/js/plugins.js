//!function(){var a={},b=null,c=null,d=null,e=null,f={},g={color:"#ff0084",background:"#fff",shadow:"transparent",fallback:!1},h=window.devicePixelRatio>1,i=function(){var a=navigator.userAgent.toLowerCase();return function(b){return-1!==a.indexOf(b)}}(),j={ie:i("msie"),chrome:i("chrome"),webkit:i("chrome")||i("safari"),safari:i("safari")&&!i("chrome"),mozilla:i("mozilla")&&!i("chrome")&&!i("safari")},k=function(){for(var a=document.getElementsByTagName("link"),b=0,c=a.length;c>b;b++)if("icon"===a[b].getAttribute("rel")||"shortcut icon"===a[b].getAttribute("rel"))return a[b];return!1},l=function(){for(var a=document.getElementsByTagName("link"),b=document.getElementsByTagName("head")[0],c=0,d=a.length;d>c;c++)("icon"===a[c].getAttribute("rel")||"shortcut icon"===a[c].getAttribute("rel"))&&b.removeChild(a[c])},m=function(a){l();var b=document.createElement("link");b.type="image/x-icon",b.rel="icon",b.href=a,document.getElementsByTagName("head")[0].appendChild(b)},n=function(){return e||(e=document.createElement("canvas"),h?(e.width=32,e.height=32):(e.width=16,e.height=16)),e},o=function(a){var b=n(),c=b.getContext("2d");a=a||0,c&&(c.clearRect(0,0,b.width,b.height),c.beginPath(),c.moveTo(b.width/2,b.height/2),c.arc(b.width/2,b.height/2,Math.min(b.width/2,b.height/2),0,2*Math.PI,!1),c.fillStyle=f.shadow,c.fill(),c.beginPath(),c.moveTo(b.width/2,b.height/2),c.arc(b.width/2,b.height/2,Math.min(b.width/2,b.height/2)-2,0,2*Math.PI,!1),c.fillStyle=f.background,c.fill(),a>0&&(c.beginPath(),c.moveTo(b.width/2,b.height/2),c.arc(b.width/2,b.height/2,Math.min(b.width/2,b.height/2)-2,-.5*Math.PI,(-.5+2*a/100)*Math.PI,!1),c.lineTo(b.width/2,b.height/2),c.fillStyle=f.color,c.fill()),m(b.toDataURL()))},p=function(a){document.title=a>0?"("+a+"%) "+d:d};a.setOptions=function(a){f={};for(var b in g)f[b]=a.hasOwnProperty(b)?a[b]:g[b];return this},a.setProgress=function(a){if(d||(d=document.title),!c||!b){var e=k();c=b=e?e.getAttribute("href"):"/favicon.ico"}return!isNaN(parseFloat(a))&&isFinite(a)?!n().getContext||j.ie||j.safari||f.fallback===!0?p(a):("force"===f.fallback&&p(a),o(a)):!1},a.reset=function(){d&&(document.title=d),c&&(b=c,m(b))},a.setOptions(g),window.Piecon=a}();
!function(){var t={},e=null,i=null,n=null,o=null,a={},r={color:"#0000ff",background:"#fff",shadow:"transparent",fallback:!1},h=window.devicePixelRatio>1,l=function(){var t=navigator.userAgent.toLowerCase();return function(e){return-1!==t.indexOf(e)}}(),c={ie:l("msie"),chrome:l("chrome"),webkit:l("chrome")||l("safari"),safari:l("safari")&&!l("chrome"),mozilla:l("mozilla")&&!l("chrome")&&!l("safari")},f=function(){for(var t=document.getElementsByTagName("link"),e=0,i=t.length;i>e;e++)if("icon"===t[e].getAttribute("rel")||"shortcut icon"===t[e].getAttribute("rel"))return t[e];return!1},u=function(){for(var t=Array.prototype.slice.call(document.getElementsByTagName("link"),0),e=document.getElementsByTagName("head")[0],i=0,n=t.length;n>i;i++)("icon"===t[i].getAttribute("rel")||"shortcut icon"===t[i].getAttribute("rel"))&&e.removeChild(t[i])},d=function(t){u();var e=document.createElement("link");e.type="image/x-icon",e.rel="icon",e.href=t,document.getElementsByTagName("head")[0].appendChild(e)},g=function(){return o||(o=document.createElement("canvas"),h?(o.width=32,o.height=32):(o.width=16,o.height=16)),o},m=function(t){var e=g(),i=e.getContext("2d");t=t||0,i&&(i.clearRect(0,0,e.width,e.height),i.beginPath(),i.moveTo(e.width/2,e.height/2),i.arc(e.width/2,e.height/2,Math.min(e.width/2,e.height/2),0,2*Math.PI,!1),i.fillStyle=a.shadow,i.fill(),i.beginPath(),i.moveTo(e.width/2,e.height/2),i.arc(e.width/2,e.height/2,Math.min(e.width/2,e.height/2)-2,0,2*Math.PI,!1),i.fillStyle=a.background,i.fill(),t>0&&(i.beginPath(),i.moveTo(e.width/2,e.height/2),i.arc(e.width/2,e.height/2,Math.min(e.width/2,e.height/2)-2,-.5*Math.PI,(-.5+2*t/100)*Math.PI,!1),i.lineTo(e.width/2,e.height/2),i.fillStyle=a.color,i.fill()),d(e.toDataURL()))},s=function(t){document.title=t>0?"("+t+"%) "+n:n};t.setOptions=function(t){a={};for(var e in r)a[e]=t.hasOwnProperty(e)?t[e]:r[e];return this},t.setProgress=function(t){if(n||(n=document.title),!i||!e){var o=f();i=e=o?o.getAttribute("href"):"/favicon.ico"}return!isNaN(parseFloat(t))&&isFinite(t)?!g().getContext||c.ie||c.safari||a.fallback===!0?s(t):("force"===a.fallback&&s(t),m(t)):!1},t.reset=function(){n&&(document.title=n),i&&(e=i,d(e))},t.setOptions(r),"function"==typeof define&&define.amd?define(t):"undefined"!=typeof module?module.exports=t:window.Piecon=t}();


//Function to convert hex format to a rgb color
function rgb2hex(rgb){
 rgb = rgb.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);
 return (rgb && rgb.length === 4) ? "#" +
  ("0" + parseInt(rgb[1],10).toString(16)).slice(-2) +
  ("0" + parseInt(rgb[2],10).toString(16)).slice(-2) +
  ("0" + parseInt(rgb[3],10).toString(16)).slice(-2) : '';
}

function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}


/**
 * Convert an image 
 * to a base64 string
 * @param  {String}   url         
 * @param  {Function} callback    
 * @param  {String}   [outputFormat=image/png]           
 */
function convertImgToBase64(url, callback, outputFormat){
    var canvas = document.createElement('CANVAS'),
        ctx = canvas.getContext('2d'),
        img = new Image;
    img.crossOrigin = 'Anonymous';
    img.onload = function(){
        var dataURL;
        canvas.height = img.height;
        canvas.width = img.width;
        ctx.drawImage(img, 0, 0);
        dataURL = canvas.toDataURL(outputFormat);
        callback.call(this, dataURL);
        canvas = null; 
    };
    img.src = url;
}

function getImageDataUriFromUrl(url) {
    var deferred = $.Deferred();
    // create image to load from url
    var img = new Image();
    img.setAttribute('crossOrigin', 'anonymous');
    img.onload = function () {
        // create canvas and draw image
        var canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        canvas.getContext('2d').drawImage(img, 0, 0);
        // get data uri from canvas
        try {
            var data = canvas.toDataURL('image/jpeg');
            deferred.resolve(data);
        } catch (e) {
            deferred.reject(e);
        }
    }
    // load image
    try {
        img.src = url;
    } catch (e) {
        deferred.reject(e);
    }
    return deferred.promise();
}


function convert_time(duration) {
    var a = duration.match(/\d+/g);

    if (duration.indexOf('M') >= 0 && duration.indexOf('H') == -1 && duration.indexOf('S') == -1) {
        a = [0, a[0], 0];
    }

    if (duration.indexOf('H') >= 0 && duration.indexOf('M') == -1) {
        a = [a[0], 0, a[1]];
    }
    if (duration.indexOf('H') >= 0 && duration.indexOf('M') == -1 && duration.indexOf('S') == -1) {
        a = [a[0], 0, 0];
    }

    duration = 0;

    if (a.length == 3) {
        duration = duration + parseInt(a[0]) * 3600;
        duration = duration + parseInt(a[1]) * 60;
        duration = duration + parseInt(a[2]);
    }

    if (a.length == 2) {
        duration = duration + parseInt(a[0]) * 60;
        duration = duration + parseInt(a[1]);
    }

    if (a.length == 1) {
        duration = duration + parseInt(a[0]);
    }
    return duration
}

function secondsToHms(d) {
    d = Number(d);
    var h = Math.floor(d / 3600);
    var m = Math.floor(d % 3600 / 60);
    var s = Math.floor(d % 3600 % 60);
    return ((h > 0 ? h + ":" + (m < 10 ? "0" : "") : "") + m + ":" + (s < 10 ? "0" : "") + s); 
}

function getFbUrl(url, title){
    var fbUrl = 'http://www.facebook.com/sharer.php?s=100';
        fbUrl += '&p[title]='+encodeURIComponent(title);
        //fbUrl += '&p[summary]=' + encodeURIComponent(liste);
        fbUrl += '&p[url]=' + encodeURIComponent(url);
        fbUrl += '&p[images][0]=' + '';

    return fbUrl;
}

function getTwUrl(url, title){
    var twUrl = 'https://twitter.com/intent/tweet';
        twUrl += '?url='+ encodeURIComponent(url);
        twUrl += '&text=' +encodeURIComponent(title);
        twUrl +=  '&via=Bounews&lang=fr&hashtags=nowplaying,tsbst';

    return twUrl;
}

function getMailUrl(url, title){
    var mailUrl = 'mailto:';
        mailUrl += '?subject=nowplaying on '+ encodeURIComponent(title);
        mailUrl += '&body=nowplaying on '+SITE_NAME+' ' +encodeURIComponent(title)+ ' : '+encodeURIComponent(url);

    return mailUrl;
}

function popupwindow(url, title, w, h) {
    var left = (screen.width/2)-(w/2);
    var top = (screen.height/2)-(h/2);
    return window.open(url, title, 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width='+w+', height='+h+', top='+top+', left='+left);
} 

function l(l){
    console.log(l);
}
