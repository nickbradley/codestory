'use babel';

import CodestoryView from './codestory-view';
import { CompositeDisposable } from 'atom';

export default {

  codestoryView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.codestoryView = new CodestoryView(state.codestoryViewState);
    // this.modalPanel = atom.workspace.addModalPanel({
    //   item: this.codestoryView.getElement(),
    //   visible: false
    // });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'codestory:paste-with-link': () => this.pasteWithLink()
    }));
  },

  deactivate() {
    // this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.codestoryView.destroy();
  },

  serialize() {
    return {
      codestoryViewState: this.codestoryView.serialize()
    };
  },

  pasteWithLink() {
    if (editor = atom.workspace.getActiveTextEditor()) {
      cb = atom.clipboard.read()
      hashPos = cb.lastIndexOf('CodeStory:')
      if (hashPos > 1) {
        commentChars = atom.config.get('editor.commentStart', {scope: editor.getRootScopeDescriptor()})
        hash = cb.substring(hashPos+10).trim()
        cb = cb.substring(0, hashPos)
        cb = commentChars + ' View code story: http://nicholascbradley.com:4321/codestory/' + hash + '\n' + cb
      }
      editor.insertText(cb)
    }
  }
};
