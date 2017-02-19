atom.commands.add 'atom-text-editor', 'custom:codestory-paste', ->
  return unless editor = atom.workspace.getActiveTextEditor()

  fetch 'http://nicholascbradley.com:4321/so/123' 
  .then (response) ->
    return response.json()
  .then (resJson) ->
    console.log(resJson)

    # TODO Need to figure out how to insert as a comment (probably in the API)
    editor.insertText("// Pasted from #{resJson.questionUrl}\n")
    editor.insertText("#{atom.clipboard.read()}")
