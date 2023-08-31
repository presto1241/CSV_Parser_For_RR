const { execSync } = require('child_process');
const os = require('os');
const fs = require('fs');

// Example:
const args = process.argv.slice(2);
const args_parsed = removeHyphens(args);



//I love non standards!
const boolVariants = ["true","false","yes","no","1","0","y","n","enabled","disabled","enable","disable","t","f","on","off","high","low"];

const dataTypes = ["bool","int","float","string"];
var lastSequence = "";
var parsedHeaders = [];
var textState = 0;
var dataOutput="";

//ChatGPT wrote the file prompt stuff. I know what it does I just cant be bothered to do it manually :P
//If it looks malicious thats why. I promise its not. 
function selectFileWindows() {
    try {
        //If this looks malicious you can look at the code in fileDialog.ps1
        //ChatGPT wrote it so I doubt its bad.
        let filePath = execSync('powershell.exe -ExecutionPolicy Bypass -NoLogo -NonInteractive -NoProfile -File ./fileDialog.ps1').toString().trim();
        return filePath;
    } catch (err) {
        console.error("File selection was cancelled or an error occurred.");
        return null;
    }
}

function selectFileMac() {
    try {
        let script = `osascript -e 'choose file with prompt "Select a file"'`;
        let filePath = execSync(script).toString().trim();
        return filePath;
    } catch (err) {
        console.error("File selection was cancelled or an error occurred.");
        return null;
    }
}

const platform = os.platform();

//Unless I use something like electron I have to do platform detection. Apparently not much people do this stuff.
let selectedFile;
if (platform === 'win32') {
    selectedFile = selectFileWindows();
} else if (platform === 'darwin') {
    selectedFile = selectFileMac();
} else {
    console.error("Unsupported OS platform.");
}

if (selectedFile) {
    //Literally just splits the directory to get the file name.
    selectedFileDirSplit = selectedFile.split("\\");
    console.log(`Found file: "${selectedFileDirSplit[selectedFileDirSplit.length-1]}"`);
    //Probably could be a better method... But idk for right now so im keeping it like this.
    //Keep crying over it :)
    let file_buffer = fs.readFileSync(selectedFile).toString();
    let file_buffer_array = file_buffer.split("\n");
    Start_CSV_Parse(file_buffer_array[0],file_buffer_array);
}else{
    console.log("Please select your file!");
    process.exit();
}


//Where the fun starts :)))))))
function Start_CSV_Parse(Header,Data){
    //I'm defining stuff here cause I need to reference some variables for both functions.
    
    for (i=0;i<Header.length;i++) {
        let currentChar = Header.substring(i,i+1);
        let lastChar = Header.substring(i-1,i);
        
        //Rip never nesters... I'm sorry for your loss.
        //Think of text state as a state machine. If it's currently in an inclosed string... Then it's at state 1
        switch(textState){
            case 0:
                if(currentChar=="\"")
                {
                    textState=1;
                    break;
                }
                if(currentChar==",")
                {
                    parsedHeaders.push(lastSequence+",");
                    lastSequence="";
                    break;
                }else
                {
                    lastSequence += currentChar;
                }
                
                break;
                
                //When it's in state 1, check if the current character and last character is , and ". If it is, then treat it as an element end. If not. Ignore the comma and continue the element name.
                case 1:
                    
                    if ((currentChar==",")&&(lastChar=="\"")) {
                        lastSequence = lastSequence.substring(0,lastSequence.length-1);
                        parsedHeaders.push(lastSequence+",");
                        lastSequence = "";
                textState = 0;
                break;
            }
            if(currentChar!=",")
            {
                lastSequence += currentChar;
            }
            break;
        }
        
    }
    if (lastSequence.length>0) {
        if(Header.substring(Header.length-1,Header.length)=="\""){
            lastSequence = lastSequence.substring(0,lastSequence.length-1);
        }
        parsedHeaders.push(lastSequence);
    }
    
    
    
    
    lastSequence="";
    textState=0;
    console.log("Finished parsing headers.");
    //console.log(parsedHeaders);
    //process.exit();
    originalHeaders = parsedHeaders;
    let CurrentElement=0;
    console.log("Now parsing data... This can take some time depending on file size.");
    for (i=1; i<Data.length; i++) {
        //console.log(Data[i]);
        
        //My eyes. Basically... Data is a list<String>. I'm iterating each element. Then iterating every character.
        
        //Simple reminder for myself... ic is indexCharacter. To get the current character of the element. You grab Data[index].
        for (ic=0; ic<Data[i].length; ic++) {
            let currentChar = Data[i].substring(ic,ic+1);
            let lastChar = Data[i].substring(ic-1,ic);
            
            //process.exit();
            //Again... Rip never nesters... I'm sorry for your loss.
            switch(textState){
                case 0:
                    if (currentChar=="\"")
                    {
                        //console.log("Found \" at state 0. Setting to one.");
                        textState=1;
                        break;
                    }
                    if (currentChar==",")
                    {
                        //console.log("Found comma at state 0");
                        Find_Datatype(lastSequence,CurrentElement);
                        CurrentElement ++;
                        break;
                    }else
                    {
                        lastSequence += currentChar;
                    }
                    
                    break;
                    
                    //When it's in state 1, check if the current character and last character is , and ". If it is, then treat it as an element end. If not. Ignore the comma and continue the element name.
                    case 1:
                        //console.log("In state 1");
                        
                        if ((currentChar==",")&&(lastChar=="\"")) {
                            lastSequence = lastSequence.substring(0,lastSequence.length-1);
                            Find_Datatype(lastSequence,CurrentElement);
                            CurrentElement ++;
                            break;
                        }
                        if(currentChar!=",")
                        {
                            lastSequence += currentChar;
                        }
                        break;
                    }
                    
                    
            }
            
            
            if (lastSequence.length > 0) {
                //console.log("Hit!");
                if(Data[i].substring(Data[i].length-1,Data[i].length)=="\""){
                    //console.log("Hit here too!");
                    lastSequence = lastSequence.substring(0,lastSequence.length-1);
                    //console.log("Last sequnce updated to "+lastSequence);
                    Find_Datatype(lastSequence,CurrentElement);
                }
            }
            dataOutput+="\n";
            lastSequence="";
            CurrentElement=0;
            textState = 0;
            
            //if(i == 3){console.log(dataOutput); process.exit();}
        }
        // console.log(parsedHeaders);
        // console.log(dataOutput);
        if (args_parsed[0] == "y"){
        fs.writeFileSync(process.cwd() + "\\schema.txt", parsedHeaders.join("\n"));
        }
        fs.writeFileSync(process.cwd() + "\\data.txt", dataOutput);
        console.log("Completed! Output written to text files.");
        setTimeout(() => {process.exit();},3000);
    }
    
    
    //Datatypes!!! Basically. All you need is a header line then the data after. This script shoud be smart enough to autogenerate types.
    function Find_Datatype(Sequence,Current_Element){
        
        //We first lower it then trim it to make parsing easier.
        let SequenceParse = Sequence.toLowerCase().trim();
        //console.log(SequenceParse);
        //This is basically the priority system. 0 is bool, 1 is int, 2 is float, 3 is string but isn't here as it isn't treated as a primary. Its treaded as a perminate backup.
        let parseList = [boolVariants.indexOf(SequenceParse)>-1,!isNaN(strictParseInt(SequenceParse)),!isNaN(strictParseFloat(SequenceParse))&&SequenceParse.includes(".")==true];
        let parseIndex = parseList.lastIndexOf(true);
        
        if (parseIndex==-1||textState==1) {parseIndex=3;}
        //console.log(headers);
        //console.log(parsedHeaders[Current_Element]);
        let currentHeader = parsedHeaders[Current_Element].split(",");
        
        //if (Current_Element==1){console.log(parseList, parseList.lastIndexOf(true),parseInt(SequenceParse))}
        
        //This checks if the current datatype is an equal or higher priority to the saved version.
        if (parseIndex >= dataTypes.indexOf(currentHeader[1])){
            parsedHeaders[Current_Element] = currentHeader[0]+","+dataTypes[parseIndex];
        }
        
        //This is to convert any variant of boolean state to a simple `true`,`false`. This is to make it easier for rec room to understand.
        if (parseIndex==0) {
            
            switch(Math.floor(parseIndex%2))
            {
                case 0:
                    Sequence = "true";
                    break;
                    case 1:
                        Sequence = "false";
                        break;
                    }
                }
                
                //Simple check if we are at element 0 before inserting a comma.
                if (Current_Element != 0)
                {
                    dataOutput += ","+Sequence.trim();
                }else{
                    dataOutput+=Sequence.trim();
                }
                
                textState = 0;
                //console.log("Text state should now be zero: "+textState);
                lastSequence = "";
                
                //console.log(output);
            }
            
            
            
            function strictParseInt(str) {
                
                if (str == ""){
                    return 0;
                }
                // Using a regular expression to test if the entire string represents an integer
                if (/^[-+]?\d+$/.test(str)) {
                    return parseInt(str, 10);
    } else {
      return NaN;
    }
}

function strictParseFloat(str) {
    
    if (str == ""){
        return 0;
    }
    // Using a regular expression to test if the entire string represents a float
    if (/^[-+]?[0-9]*\.?[0-9]+([eE][-+]?[0-9]+)?$/.test(str.trim())) {
        return parseFloat(str);
    } else {
        return NaN;
    }
}

function removeHyphens(arr) {
    return arr.map(str => str.replace(/-/g, ''));
  }