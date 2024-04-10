import * as fs from "fs"
import * as os from "os"

// Sync... it is a blocking request
// fs.writeFileSync('./text.txt', 'Hey world');

// Async... it is a non-blocking request
// fs.writeFile("./text.txt", "Hello world", (err) => {})

// reading file..
// it returns the result
// const result = fs.readFileSync("./text.txt", "utf-8");
// console.log(result);

// it dosen't returns result
// fs.readFile("./text.txt", "utf-8", (err, result) => {
//     if(err){
//         console.log("Error", err);
//     }else{
//         console.log(result);
//     }
// });

// it adds new data, not override old text
// fs.appendFileSync("./text.txt", new Date().getDate().toLocaleString());
// fs.readFile("./text.txt", "utf-8", (err, result) => {
//     if(err){
//         console.log("Error", err);
//     }else{
//         console.log(result);
//     }
// });

// to make a copy file
// fs.cpSync("./text.txt", "./copy.txt");


// to delete a file
// fs.unlinkSync("./copy.txt");

// console.log(fs.statSync("./text.txt"));
// console.log(fs.statSync("./text.txt").isFile());

console.log(os.cpus().length);