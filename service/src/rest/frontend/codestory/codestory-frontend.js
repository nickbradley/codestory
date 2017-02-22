(function() {
	var REST_URL = 'http://nicholascbradley.com:4321/codestory/rest/';

	var source = $("#codestory-template").html();
	var template = Handlebars.compile(source);

	function onLoad(data) {

		var context = {
			origin: 'StackOverflow',
			originalSelection: data.originalSelection,
			questionUrl: data.questionUrl,
			questionContentWithHtml: data.questionContentWithHtml,
			accessTime: new Date(parseInt(data.accessTime, 10)),
			answerUrl: data.answerUrl,
			answerContent: data.answerContentWithHtml,
			accepted: data.accepted ? "Yes" : "No",
			votes: data.votes,
			extra: {
				copiedFromAnswer: data.copiedFrom === 'answer'
			}
		};

		var html = template(context);
		$(document.body).append(html);
	}

	var hrefSplit = window.location.href.split("/");
	var hash;
	if (hrefSplit.length > 1) {
		hash = hrefSplit.pop();
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
