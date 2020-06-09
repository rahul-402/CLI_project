let fs = require("fs");
let path = require("path");
module.exports.treefy = function () {
    let src = arguments[0];
    let dest = arguments[1];
    let buffer = fs.readFileSync(path.join(src,"metadata.json"));
    let cElem = JSON.parse(buffer);
    treefyFn(src,dest,cElem);
}
function treefyFn(src,dest,cElem){
    if(cElem.isFile == true){
        let srcPath = path.join(src,cElem.newName);
        let destPath = path.join(dest,cElem.oldName);
        fs.copyFileSync(srcPath,destPath);
        console.log(`${cElem.oldName} copied to dest`)
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