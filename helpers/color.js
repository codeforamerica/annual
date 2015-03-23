// =====
// Tints colors to produce darker shades for our headers
// =====

var f,
    darkColor;

exports.shade = function(color, percent, callback) {
  f=parseInt(color.slice(1),16),t=percent<0?0:255,p=percent<0?percent*-1:percent,R=f>>16,G=f>>8&0x00FF,B=f&0x0000FF;
  darkColor="#"+(0x1000000+(Math.round((t-R)*p)+R)*0x10000+(Math.round((t-G)*p)+G)*0x100+(Math.round((t-B)*p)+B)).toString(16).slice(1);
  callback(null,darkColor);
}