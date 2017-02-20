var CodeStory = (function() {

	var pageAccessTime;

	var $getAnswer = function(e) {
		var $postText = $(e.target).closest('.post-text');
		return $postText.closest('.answer');
	};

	var collectors = {
		origin: function(e) {
			return "stackoverflow";
		},
		copiedFrom: function(e) {
			var ret = null;
			var $container = $(e.target).closest('.question, .answer');
			if ($container.length) {
				if ($container.hasClass('question')) {
					ret = 'question';
				} else {
					ret = 'answer';
				}
			}
			return ret;
		},
		type: function(e) {
			var type = 'text';
			var startNode, range;
			var selection = window.getSelection();
			if (selection) {
				range = selection.getRangeAt(0);
				if (range && range.commonAncestorContainer && $(range.commonAncestorContainer).is('code')) {
					type = 'code';
				}
			}
			return type;
		},
		originalSelection: function(e) {
			return window.getSelection().toString();
		},
		questionUrl: function(e) {
			return window.location.href;
		},
		questionContent: function(e) {
			return $('#question .post-text').text();
		},
		answerUrl: function(e) {
			var fullUrl = null;
			var baseUrl = 'http://stackoverflow.com';
			var relativeUrl;
			var $answer = $getAnswer(e);
			if ($answer.length) {
				relativeUrl = $answer.find('.short-link').attr('href');
				if (relativeUrl) {
					fullUrl = baseUrl + relativeUrl;
				}
			}
			return fullUrl;
		},
		accessTime: function(e) {
			return pageAccessTime;
		},
		fullCodeSnippet: function(e) {
			var snippet = null;
			var $pre = $(e.target).closest('pre.prettyprint');
			if ($pre.length) {
				snippet = $pre.text();
			}
			return snippet;
		},
		answerContent: function(e) {
			var content = null;
			var $answer = $getAnswer(e);
			if ($answer.length) {
				content = $answer.find('.post-text').text();
			}
			return content;
		},
		votes: function(e) {
			var votes = null;
			var $container = $(e.target).closest('.question, .answer');
			if ($container.length) {
				try {
					votes = parseInt($container.find('.vote-count-post').text(), 10);
				} catch (e) {
					// leave null
				}
			}
			return votes;
		},
		accepted: function(e) {
			var accepted = null;
			var $answer = $getAnswer(e);
			if ($answer.length) {
				accepted = $answer.find('.vote-accepted-on').length > 0;
			}
			return accepted;
		}

	};

	function fromStackoverflow(copyEvent) {
		var collectedValues = {};
		pageAccessTime = new Date().getTime();
		$.each(collectors, function(collectorKey, collectorFn) {
			collectedValues[collectorKey] = collectorFn(copyEvent);
		});
		return collectedValues;
	}

	function send(hash, storyData) {
		console.log("CodeStory: " + hash);
		$.ajax({
			method: 'post',
			url: 'http://nicholascbradley.com:4321/codestory',
			data: JSON.stringify({ hash: hash, story: storyData }),
			dataType: 'json',
			contentType: 'application/json'
		}).done(function(data) {
			console.log("CodeStory POST success");
		}).fail(function(data) {
			console.log("CodeStory POST failure");
		});
	}

	return {
		fromStackoverflow: fromStackoverflow,
		send: send
	};

}());