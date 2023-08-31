<sub> I bring you...
# CSV_Parser_For_RR
# !!!
Creating a CSV parser from scratch... Small project, but I wanted to do it since it seemed fun :)

---
<br>

# How do I install this?

Its very simple! All you need is to have [Node.js](https://nodejs.org/en/download/current) and [npm](https://www.npmjs.com/)! *I currently use Node.js version* [19.0.0](https://nodejs.org/download/release/v19.0.0/)


- Next you need to go to your terminal, and go into the directory/folder you want to install this repository at.
- When you do that, you can now run the command `git clone https://github.com/presto1241/CSV_Parser_For_RR/main`. *Optionaly you can install the .zip if you don't have git*
---
<br>

# How do I actually use the program?

1. After you install it. There should be two folders, "Bash" and "Windows". <br>
  \- If you have bash on windows installed, you can use Bash or whatever of your choice. <br>
  \- If you have macos, you are limited to Bash. <br>
  \- I currently don't have support for linux. If you really want to use it on linux, change line 54 to `selectedFile =` then a string to the hardcoded directory your file is in. <br>

2. You might see 2 bash scripts in each folder <br>
   \- YesSchema. <br>
   \- NoSchema. <br>
   \- These control wether you want to change the schema file for leave it to how it last was. <br>

3. The script **should** launch a file explorer window waiting for you to select a file from. *If it doesn't please send an issue ticket. If you know how to write javascript and know how to fix it, make a pull request!*

4. When you select the file, it should automatically generate all the data needed to update `Data.txt` and `Schema.txt`. Then it will let you know when it finishes!

5. Then you can copy+paste the data into rec room and call it a day!

---
<br>

# What should the csv file look like?

The file should follow something like this
- First line should be the header. Its fine to not have the actual datatype. But the names or number of collums is needed.
- After, should be all the data. This can stay true to a normal csv file. You don't need to change anything here :)

The start of a file would typically look like this:

```
"userId","MessageType","MessageContent","Extra"
25123,2,"Hi! How is your day?",""
```
---
<br>

# What I plan to change in the future

1. First of all I want to split the script into different scrips, and better organize when processes.

2. Next I want to optimize the actual script/function that does parse the whole thing. I agree, it could be a lot better.

3. Maybe, big grain of salt. Make a gui instead of running a bunch of powershell/bash stuff.

