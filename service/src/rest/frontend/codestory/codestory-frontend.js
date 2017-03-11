// See: http://nicholascbradley.com:4321/codestory/623e244d5
(function() {
	var REST_URL = 'http://nicholascbradley.com:4321/codestory/rest/';

	var TEST_HASH = '2f6a3220b';

	var source = $("#codestory-template").html();
	var template = Handlebars.compile(source);

	function onLoad(data) {

		var context = {
			questionUrl: data.questionUrl,
			questionTitle: data.questionTitle,
			questionVotes: data.questionVotes,
			accessTime: moment(parseInt(data.accessTime, 10)).format('MMMM Do YYYY, h:mm:ss a'),
			accepted: data.accepted,
			answerUrl: data.answerUrl,
			answerVotes: data.answerVotes,
			originalSelection: data.originalSelection,
			questionContent: data.questionContentWithHtml,
			answerContent: data.answerContentWithHtml,
			extra: {
				copiedFromAnswer: data.copiedFrom === 'answer'
			}
		};

		var html = template(context);
		$(document.body).append(html);
	}

	var href = window.location.href;
	var hash, hrefSplit;
	if (href.indexOf('dev=true')+1) {
		hash = TEST_HASH;
	} else {
		hrefSplit = window.location.href.split("/");
		if (hrefSplit.length > 1) {
			hash = hrefSplit.pop();
		}
	}

	$.ajax({
		method: 'get',
		url: REST_URL+hash,
		dataType: 'json',
		contentType: 'application/json'
	}).done(function(data) {
		console.log("CodeStory GET success");
		onLoad(data);
	}).fail(function(data) {
		console.log("CodeStory GET failure");
	});

}());
