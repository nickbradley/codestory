var CodeStory = (function() {

	var pageAccessTime;

	var REST_URL = 'http://nicholascbradley.com:4321/codestory/rest';

	var GITHUB_SEARCHURL = 'http://nicholascbradley.com:4321/codestory';
	var GITHUB_REGEX = /http:\/\/nicholascbradley.com:4321\/codestory\/[^\s\t\r]*/g;

	var $getAnswer = function(e) {
		var $postText = $(e.target).closest('.post-text');
		return $postText.closest('.answer');
	};

	var $getQuestion = function(e) {
		return $('#question .post-text');
	};

	var getVotes = function($container) {
		var votes = null;
		if ($container.length) {
			try {
				votes = parseInt($container.find('.vote-count-post').text(), 10);
			} catch (e) {
				// leave null
			}
		}
		return votes;
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
		questionTitle: function(e) {
			return $('#question-header a').text();
		},
		questionUrl: function(e) {
			return window.location.href;
		},
		questionContent: function(e) {
			return $getQuestion(e).text() || null;
		},
		questionContentWithHtml: function(e) {
			return $getQuestion(e).html() || null;
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
			return $getAnswer(e).find('.post-text').text() || null;
		},
		answerContentWithHtml: function(e) {
			return $getAnswer(e).find('.post-text').html() || null;
		},
		answerVotes: function(e) {
			return getVotes($getAnswer(e));
		},
		questionVotes: function(e) {
			return getVotes($('#question'));
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

	function addLinksToGithub() {
		$('.pl-c:contains('+GITHUB_SEARCHURL+')').html(function(index, oldHtml) {
			return oldHtml.replace(GITHUB_REGEX, function(fullMatch) {
				var $a = $('<a></a>').attr({href: fullMatch, target: '_blank'}).html(fullMatch);
				return $a.prop('outerHTML');
			});
		});
	}

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
		console.log(storyData);
		$.ajax({
			method: 'post',
			url: REST_URL,
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
		send: send,
		addLinksToGithub: addLinksToGithub
	};

}());
