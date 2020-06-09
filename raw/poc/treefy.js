let fs = require("fs"); // requires the "fs" module
let path = require("path"); //requires the "path" module

//function for treefy 
function treefyFn(src,dest,cElem){
    if(cElem.isFile == true){
        let srcPath = path.join(src,cElem.newName);
        let destPath = path.join(dest,cElem.oldName);
        fs.copyFileSync(srcPath,destPath);
        console.log(`${cElem.oldName} copied to dest`);
    }else{
        let dirName = cElem.name;
        let dirPath = path.join(dest,dirName);
        fs.mkdirSync(dirPath);
        console.log(`directory ${cElem.name} created inside ${dest}`);
        //recursion 
        for(let i=0;i<cElem.children.length;i++){
            treefyFn(src,dirPath,cElem.children[i]);
        }
    }
}

let src = process.argv[2];;
    let dest = process.argv[3];
    //let buffer = fs.readFileSync(path.join(src,"metadata.json"));
    //let cElem = JSON.parse(buffer);
    //treefyFn(src,dest,cElem);