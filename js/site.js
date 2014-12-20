/***** MPS Demo - NBC News.com waterfall *****/
// Build graph.
function buildGraph(d) {

  var data = d;
  var miscTot = data.flash + data.font + data.html + data.misc + data.text;

  // Total perentages per category.
  var percJs = (data.js / data.total) * 100;
  var percCss = (data.css / data.total) * 100;
  var percImages = (data.image / data.total) * 100;
  var percMisc = (miscTot / data.total) * 100;

  // JS and MPS percentages.
  var percAllJs = data.js - data.mps;
  percAllJs = (percAllJs / data.js) * percJs;
  var percMps = (data.mps / data.js) * percJs;

  // Misc percentages.
  var percFlash = (data.flash / miscTot) * percMisc;
  var percFont = (data.font / miscTot) * percMisc;
  var percHtml = (data.html / miscTot) * percMisc;
  var percText = (data.text / miscTot) * percMisc;
  var percMiscOther = (data.misc / miscTot) * percMisc;

  percJs = percJs.toFixed(2) / 1;
  percCss = percCss.toFixed(2) / 1;
  percImages = percImages.toFixed(2) / 1;
  percMisc = percMisc.toFixed(2) / 1;
  percAllJs = percAllJs.toFixed(2) / 1;
  percMps = percMps.toFixed(2) / 1;
  percFlash = percFlash.toFixed(2) / 1;
  percFont = percFont.toFixed(2) / 1;
  percHtml = percHtml.toFixed(2) / 1;
  percText = percText.toFixed(2) / 1;
  percMiscOther = percMiscOther.toFixed(2) / 1;

  var colors = Highcharts.getOptions().colors,
  categories = ['Javascript', 'CSS', 'Images', 'Misc.'],
  data = [{
      y: percJs,
      color: colors[0],
      drilldown: {
          name: 'Javascript',
          categories: ['All Javasript', 'MPS Javascript'],
          data: [percAllJs, percMps],
          color: colors[0]
      }
  }, {
      y: percCss,
      color: colors[1],
      drilldown: {
          name: 'CSS',
          categories: ['CSS'],
          data: [percCss],
          color: colors[1]
      }
  }, {
      y: percImages,
      color: colors[2],
      drilldown: {
          name: 'Images',
          categories: ['Images'],
          data: [percImages],
          color: colors[2]
      }
  }, {
      y: percMisc,
      color: colors[4],
      drilldown: {
          name: 'Misc',
          categories: ['Text', 'Font', 'HTML', 'Flash', 'Other'],
          data: [ percFlash, percFont, percHtml, percText, percMiscOther],
          color: colors[3]
      }
  }],
  browserData = [],
  versionsData = [],
  i,
  j,
  dataLen = data.length,
  drillDataLen,
  brightness;


// Build the data arrays
for (i = 0; i < dataLen; i += 1) {

  // add browser data
  browserData.push({
      name: categories[i],
      y: data[i].y,
      color: data[i].color
  });

  // add version data
  drillDataLen = data[i].drilldown.data.length;
  for (j = 0; j < drillDataLen; j += 1) {
      brightness = 0.2 - (j / drillDataLen) / 5;
      versionsData.push({
          name: data[i].drilldown.categories[j],
          y: data[i].drilldown.data[j],
          color: Highcharts.Color(data[i].color).brighten(brightness).get()
      });
  }
}
// Graph.
$('#graph').highcharts({
  chart: {
      type: 'pie'
  },
  title: {
      text: 'NBC News Site Waterfall Load Times'
  },
  plotOptions: {
      pie: {
          shadow: false,
          center: ['50%', '50%']
      }
  },
  tooltip: {
      valueSuffix: '%'
  },
  series: [{
      name: 'Category',
      data: browserData,
      size: '60%',
      dataLabels: {
          formatter: function () {
              return this.y > 5 ? this.point.name : null;
          },
          color: 'white',
          distance: -30
      }
  }, {
      name: 'Sub Category',
      data: versionsData,
      size: '80%',
      innerSize: '60%',
      dataLabels: {
          formatter: function () {
              // display only if larger than 1
              return this.y > .5 ? '<b>' + this.point.name + ':</b> ' + this.y + '%'  : null;
          }
      }
  }]
});
}

// Parse harp file.
function onInputData(data) {
  var mpsFlag;
  var totalMPSLoad = 0;
  var totalJSLoad = 0;
  var totalCSSLoad = 0;
  var totalXMLLoad = 0;
  var totalImageLoad = 0;
  var totalFontLoad = 0;
  var totalHtmlLoad = 0;
  var totalFlashLoad = 0;
  var totalTextLoad = 0;
  var totalMiscLoad = 0;
  var totalVal = 0;
  var d = data.log;
  var tbody = $('#chart tbody');
  for(var i=0; i<d.entries.length; i++) {
    var _this = data.log.entries[i];
    var _thisUrl = _this.request.url;
    var _thisMimeType = _this.response.content.mimeType;
    // Increment execution time for javascript/css/mps files.
    if(_thisUrl.indexOf('mps') > -1) {
      $(tbody).append('<tr><td width="705" class="alert loadUrl"><span class="hoverUrl none">' + _thisUrl + '</span>' + _thisUrl + '</td><td width="250" class="alert">' + _thisMimeType + '</td><td width="200" align="right" class="alert loadTime"><span>' + _this.time + '</span></td></tr>');
      totalMPSLoad = totalMPSLoad + _this.time;
    } else {
      $(tbody).append('<tr><td width="705" class="loadUrl"><span class="hoverUrl none">' + _thisUrl + '</span>' + _thisUrl + '</td><td width="250">' + _thisMimeType + '</td><td width="200" align="right" class="loadTime"><span>' + _this.time + '</span></td></tr>');
    }
    // Increment total values based on file type, used for graph.
    totalVal = totalVal + _this.time;
    switch(_thisMimeType) {
      case 'text/javascript':
        totalJSLoad = totalJSLoad + _this.time;
        break;
      case 'application/x-javascript':
        totalJSLoad = totalJSLoad + _this.time;
        break;
      case 'application/javascript':
        totalJSLoad = totalJSLoad + _this.time;
        break;
      case 'text/css':
        totalCSSLoad = totalCSSLoad + _this.time;
        break;
      case 'text/xml':
        totalXMLLoad = totalXMLLoad + _this.time;
        break;
      case 'text/plain':
        totalTextLoad = totalTextLoad + _this.time;
        break;
      case 'text/html':
        totalHtmlLoad = totalHtmlLoad + _this.time;
        break;
      case 'text/html':
        totalHtmlLoad = totalHtmlLoad + _this.time;
        break;
      case 'application/x-shockwave-flash':
        totalFlashLoad = totalFlashLoad + _this.time;
        break;
      case 'application/font-woff':
        totalFontLoad = totalFontLoad + _this.time;
        break;
      default:
        if(_thisMimeType.indexOf('image') > -1) {
          totalImageLoad = totalImageLoad + _this.time;
        } else {
          totalMiscLoad = totalMiscLoad + _this.time;
        }
    }
  }
  // Sort table.
  $("#chart").tablesorter({ 
    sortList: [[2,1]] 
  });
  // Show Table.
  $('#graph').removeClass('loading');
  $('#chart').removeClass('none');
  // Build graph.
  var graph = {
    mps: totalMPSLoad,
    js: totalJSLoad,
    css: totalCSSLoad,
    image: totalImageLoad,
    font: totalFontLoad,
    html: totalHtmlLoad,
    image: totalImageLoad,
    flash: totalFlashLoad,
    text: totalTextLoad,
    misc: totalMiscLoad,
    total: totalVal
  }
  buildGraph(graph);
}
/*
$(document).ready(function() {
  $('#chart .loadUrl').on('hover', function() {
    $(this + ' .hoverUrl').show();
  }).function() {
    $(this + ' .hoverUrl').show();
  });
});*/

/***** Google Page Speed API
var API_KEY = 'AIzaSyB3UqVfUuWfpv_ij5ukSpirv8SaVsvZeqs';
var URL_TO_GET_RESULTS_FOR = 'http://www.nbcnews.com';

var API_URL = 'https://www.googleapis.com/pagespeedonline/v1/runPagespeed?';
var CHART_API_URL = 'http://chart.apis.google.com/chart?';

var callbacks = {}

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

function runPagespeedCallbacks(result) {
	console.log('result',result,'/result');
  if (result.error) {
    var errors = result.error.errors;
    for (var i = 0, len = errors.length; i < len; ++i) {
      if (errors[i].reason == 'badRequest' && API_KEY == 'yourAPIKey') {
        alert('Please specify your Google API key in the API_KEY variable.');
      } else {
        alert(errors[i].message);
      }
    }
    return;
  }

  for (var fn in callbacks) {
    var f = callbacks[fn];
    if (typeof f == 'function') {
      callbacks[fn](result);
    }
  }

}

setTimeout(runPagespeed, 0);*****/