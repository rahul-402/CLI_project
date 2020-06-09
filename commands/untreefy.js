module.exports.untreefyFn = function () {
    let src = arguments[0];
    let dest = arguments[1];
    let root = {};
    untreefy(src,dest,root);
    fs.writeFileSync(path.join(dest,"metadata.json"),JSON.stringify(root));
}

let fs = require("fs"); // requires the "fs" module
let path = require("path"); //requires the "path" module
let uniqid = require("uniqid"); //requires for uniuqeName of copy file 
// checkwhether file or directory
function checkWhetherFile(src) {
    return fs.lstatSync(src).isFile()
}

//To getContent of any folder
function getContent(src){
    return fs.readdirSync(src);
}

// function for untreefy
function untreefy(src,dest,obj){
    //checkwhether file or directory
    //file
    if(checkWhetherFile(src)==true){
        let oldName = path.basename(src);
        let newName = uniqid();
        obj.newName = newName;
        obj.oldName = oldName;
        obj.isFile = true;
        let destpath = path.join(dest,newName);
        fs.copyFileSync(src,destpath);
        console.log(`File ${oldName} from src to copied to ${destpath}`);
    }else{
        //directory print
        //get childrens
        obj.isFile = false;
        obj.name = path.basename(src);
        obj.children = [];
        let childNames = getContent(src);
        for(let i=0;i<childNames.length;i++){
            let childPath = path.join(src,childNames[i]);
            let chobj = {};
            untreefy(childPath,dest,chobj);
            obj.children.push(chobj);
        }
    }
}