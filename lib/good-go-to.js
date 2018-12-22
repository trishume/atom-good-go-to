'use babel';

import GoodGoToView from './good-go-to-view';
import { CompositeDisposable } from 'atom';
import * as http from 'http';

export default {

  goodGoToView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.goodGoToView = new GoodGoToView(state.goodGoToViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.goodGoToView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'good-go-to:toggle': () => this.toggle()
    }));

    var that = this;
    http.createServer(function(request, response){
        response.writeHead(200, {'Content-type':'text/plan'});
        if(request.headers["x-file"]) {
            var fileName = request.headers["x-file"];
            var row = parseInt(request.headers["x-row"]);
            var col = parseInt(request.headers["x-col"]);
            that.goTo(fileName, row, col);
            // vscode.window.showTextDocument(Uri.file(fileName)).then(editor => cursorTo(editor, row, col));
            response.write('good');
        }
        response.end( );
    }).listen(7143);
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.goodGoToView.destroy();
  },

  goTo(fileName, row, col) {
    console.log([fileName, row, col]);
    atom.workspace.open(fileName);
  },

  serialize() {
    return {
      goodGoToViewState: this.goodGoToView.serialize()
    };
  },

  toggle() {
    console.log('GoodGoTo was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
