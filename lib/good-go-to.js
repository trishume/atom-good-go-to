'use babel';

import GoodGoToView from './good-go-to-view';
import { CompositeDisposable } from 'atom';
import * as http from 'http';

export default {

  goodGoToView: null,
  modalPanel: null,
  subscriptions: null,
  server: null,

  activate(state) {
    // this.goodGoToView = new GoodGoToView(state.goodGoToViewState);
    // this.modalPanel = atom.workspace.addModalPanel({
    //   item: this.goodGoToView.getElement(),
    //   visible: false
    // });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    // this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    // this.subscriptions.add(atom.commands.add('atom-workspace', {
    //   'good-go-to:toggle': () => this.toggle()
    // }));

    var that = this;
    this.server = http.createServer(function(request, response){
        response.writeHead(200, {'Content-type':'text/plain'});
        if(request.headers["x-file"]) {
            var fileName = request.headers["x-file"];
            var row = parseInt(request.headers["x-row"]);
            var col = parseInt(request.headers["x-col"]);
            var focus = request.headers["x-focus"] !== undefined;
            that.goTo(fileName, row, col, focus);
            // vscode.window.showTextDocument(Uri.file(fileName)).then(editor => cursorTo(editor, row, col));
            response.write('good');
        }
        response.end( );
    }).on('error', console.log).listen(7143, "127.0.0.1");
    console.log("Server started");
  },

  deactivate() {
    // this.modalPanel.destroy();
    // this.subscriptions.dispose();
    // this.goodGoToView.destroy();
  },

  goTo(fileName, row, col, focus) {
    // console.log([fileName, row, col]);
    atom.workspace.open(fileName, {
      initialLine: row,
      initialColumn: col,
      searchAllPanes: true
    });
    if(focus) atom.focus();
  },

  serialize() {
    return {
      // goodGoToViewState: this.goodGoToView.serialize()
    };
  },
};
