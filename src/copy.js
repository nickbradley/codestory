// ==UserScript==
// @name         CodeStory
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Copy more stuff from StackOverflow
// @author       Nick & Felix
// @match        *://*stackoverflow.com/*
// @grant        none
// ==/UserScript==
(function() {

	var NAME = "CodeStory";

	var pageAccessTime;

	var $getAnswer = function(e) {
		var $postText = $(e.target).closest('.post-text');
		return $postText.closest('.answer');
	};

	var collectors = {
		origin: function(e) {
			return NAME;
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
			var baseUrl = 'http://stackoverflow.com/';
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
			var $answer = $getAnswer(e);
			if ($answer.length) {
				try {
					votes = parseInt($answer.find('.vote-count-post').text(), 10);
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

	function onCopy(e) {
		var collectedValues = {};
		var clipboard = e.originalEvent.clipboardData;
		$.each(collectors, function(collectorKey, collectorFn) {
			collectedValues[collectorKey] = collectorFn(e);
		});
		e.preventDefault();
		clipboard.setData('text/plain', JSON.stringify(collectedValues));
	}

	$(document).on('copy', '.post-text', onCopy);

	$(document).ready(function() {
		pageAccessTime = new Date().getTime();
	});

}());