# streammer
Using stream method for reading and writing file into readable string/array. 



- # Application:
```js
const stmr = require("streammer") 

data = stmr.read(path,option) // to read as json file from stream method into readable string/array

//your code here   

stmr.write(path,data,option)// to write string/array to json file 

```