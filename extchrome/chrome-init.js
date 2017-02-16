(function() {

	function onCopy(copyEvent) {
		var storyData = CodeStory.fromStackoverflow(copyEvent);
		var hash = md5(new Date().getTime() + storyData.originalSelection);
		hash = hash.substring(1, 10);
		CodeStory.send(hash, storyData);
	}

	$(document).on('copy', '.post-text', onCopy);

}());