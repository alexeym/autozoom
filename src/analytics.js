window._gaq = [];
window._gaq.push(['_setAccount', 'UA-80287209-1']);
window._gaq.push(['_trackPageview']);

(function() {
  var ga = document.createElement('script');
  ga.type = 'text/javascript';
  ga.async = false;
  ga.src = 'https://ssl.google-analytics.com/ga.js';
  var s = document.getElementsByTagName('script')[0];
  s.parentNode.appendChild(ga, s);
})();

module.exports = {
  trackEnabled: () => window._gaq.push(['_trackEvent', 'autozoom', 'enabled']),
  trackDisabled: () => window._gaq.push(['_trackEvent', 'autozoom', 'disabled']),
  trackZoomFactor: (zoomFactor) => {
    let action = 'unchanged';
    if ( zoomFactor ) {
      action = (+zoomFactor.toFixed(2)).toString();
    }
    window._gaq.push(['_trackEvent', 'zoomfactor', action])
  }
};