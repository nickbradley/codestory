(function() {

	var host = window.location.host;

	function onCopy(copyEvent) {
		var storyData = CodeStory.fromStackoverflow(copyEvent);
		var hash = md5(new Date().getTime() + storyData.originalSelection);
		var clipboardData;
		copyEvent.preventDefault();
		hash = hash.substring(1, 10);
		clipboardData = storyData.originalSelection + "\n" + "CodeStory: " + hash;
		copyEvent.originalEvent.clipboardData.setData('text/plain', clipboardData);
		CodeStory.send(hash, storyData);
	}

	if (host.indexOf('github') >= 0) {
		$(document).ready(CodeStory.addLinksToGithub);
	} else {
		$(document).on('copy', '.post-text', onCopy);
	}

}());