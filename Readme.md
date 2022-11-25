# alten-load-file

This package was created to make downloading files easy.

## Examples

### Download and save

It's possible to pass a fetch request directly to the download function.
The file that is saved to the pc will be named: test.json.
If an error occurs, the last optional argument is a callback function that receives the thrown error.

If the download is successful, result will be true, otherwise false.

```ts
import {downloadFileAndSave} from "alten-load-file";

const result = await downloadFileAndSave(
    fetch("https://jsonplaceholder.typicode.com/todos/1"),
    "test",
    "json",
    (e) => console.log(e)
);
console.log(result);
```

### Pass blob to be saved.

It's also possible to pass a blob to be saved to a users pc.
The file that is saved to the pc will be named: test.json.
If an error occurs, the last optional argument is a callback function that receives the thrown error.

```ts
import {saveToPc} from "alten-load-file";

const f = await fetch("https://jsonplaceholder.typicode.com/todo/1");
const b = await f.blob();

const result = saveToPc(b, "test", "json", (e) => console.log(e));
```
