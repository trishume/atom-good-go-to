# good-go-to package

Fast and good "go to" for Atom. Goes to the file in any pane that it is open in.

## Sublime Plugin

```python
class SyncCodeCommand(sublime_plugin.TextCommand):
    def run(self, edit):
        file_name = self.view.file_name()
        if not file_name:
            return
        pt = self.view.sel()[0].a
        row, col = self.view.rowcol(pt)

        req = urllib.request.Request('http://localhost:7143/')
        req.add_header('x-file', file_name)
        req.add_header('x-row', str(row))
        req.add_header('x-col', str(col))
        # Uncomment below to focus window on run
        # req.add_header('x-focus', "blah")
        with urllib.request.urlopen(req) as f:
            pass
```

## Curl command

```bash
curl localhost:7143 -H "x-file: $(realpath package.json)" -H "x-row: 0" -H "x-col: 0" -H "x-focus: anything"
```
