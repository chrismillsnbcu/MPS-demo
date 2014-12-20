/***** MPS Demo - NBC News.com waterfall *****/
$.ajax({
	type: 'GET',
	url: 'https://www.googleapis.com/pagespeedonline/v1/runPagespeed?url=http://nbcnews.com&key=AIzaSyDi67W8JBn2RGPFTKH97Cin0Jm_9frKB-0',
	success:function(d) {
		console.log(d);
	}
})