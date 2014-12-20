/***** MPS Demo - NBC News.com waterfall *****/
var API_KEY = 'AIzaSyB3UqVfUuWfpv_ij5ukSpirv8SaVsvZeqs';
var URL_TO_GET_RESULTS_FOR = 'http://www.nbcnews.com';

var API_URL = 'https://www.googleapis.com/pagespeedonline/v1/runPagespeed?';
var CHART_API_URL = 'http://chart.apis.google.com/chart?';

// Object that will hold the callbacks that process results from the
// PageSpeed Insights API.
/*var callbacks = {}

// Invokes the PageSpeed Insights API. The response will contain
// JavaScript that invokes our callback with the PageSpeed results.
function runPagespeed() {
  var s = document.createElement('script');
  s.type = 'text/javascript';
  s.async = true;
  var query = [
    'url=' + URL_TO_GET_RESULTS_FOR,
    'callback=runPagespeedCallbacks',
    'key=' + API_KEY,
  ].join('&');
  s.src = API_URL + query;
  document.head.insertBefore(s, null);
}

// Our JSONP callback. Checks for errors, then invokes our callback handlers.
function runPagespeedCallbacks(result) {
	console.log('result',result,'/result');
  if (result.error) {
    var errors = result.error.errors;
    for (var i = 0, len = errors.length; i < len; ++i) {
      if (errors[i].reason == 'badRequest' && API_KEY == 'yourAPIKey') {
        alert('Please specify your Google API key in the API_KEY variable.');
      } else {
        // NOTE: your real production app should use a better
        // mechanism than alert() to communicate the error to the user.
        alert(errors[i].message);
      }
    }
    return;
  }

  // Dispatch to each function on the callbacks object.
  for (var fn in callbacks) {
    var f = callbacks[fn];
    if (typeof f == 'function') {
      callbacks[fn](result);
    }
  }

}
*/
$(document).ready(function() {
	$.ajax({
		type: 'GET',
		//url: 'https://www.googleapis.com/pagespeedonline/v1/runPagespeed?url=http://www.nbcnews.com&callback=runPagespeedCallbacks&key=AIzaSyB-guPk6KtXj4a1k4ePyIh4CWVZJxLaaDo',
		url: 'https://www.googleapis.com/pagespeedonline/v1/runPagespeed?url=http://www.nbcnews.com/&key=AIzaSyB-guPk6KtXj4a1k4ePyIh4CWVZJxLaaDo',
		dataType: 'json',
		success: function(data) {
			console.log(data);
			console.log($('body'));
			$('body').append(data);
		}
	});
});
