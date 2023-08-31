<sub> I bring you...
# CSV_Parser_For_RR
# !!!
Creating a CSV parser from scratch... Small project, but I wanted to do it since it seemed fun :)

# How do I install this?

Its very simple! All you need is to have [Node.js](https://nodejs.org/en/download/current) and [npm](https://www.npmjs.com/)! *I currently use Node.js version* [19.0.0](https://nodejs.org/download/release/v19.0.0/)


- Next you need to go to your terminal, and go into the directory/folder you want to install this repository at.
- When you do that, you can now run the command `git clone https://github.com/presto1241/CSV_Parser_For_RR/main`. *Optionaly you can install the .zip if you don't have git*

# How do I actually use the program?

After you install it. There should be two folders, "Bash" and "Windows".
- If you have bash on windows installed, you can use Bash or whatever of your choice.
- If you have macos, you are limited to Bash.
- I currently don't have support for linux. If you really want to use it on linux, change line 54 to `selectedFile =` then a string to the hardcoded directory your file is in.

You might see 2 bash scripts in each folder
- YesSchema.
- NoSchema.
These control wether you want to change the schema file for leave it to how it last was.

---

The script **should** launch a file explorer window waiting for you to select a file from. *If it doesn't please send an issue ticket. If you know how to write javascript and know how to fix it, make a pull request!*

When you select the file, it should automatically generate all the data needed to update `Data.txt` and `Schema.txt`. Then it will let you know when it finishes!

Then you can copy+paste the data into rec room and call it a day!

---

# What should the csv file look like?

The file should follow something like this
- First line should be the header. Its fine to not have the actual datatype. But the names or number of collums is needed.
- After, should be all the data. This can stay true to a normal csv file. You don't need to change anything here :)

The start of a file would typically look like this:

```
"userId","MessageType","MessageContent","Extra"
25123,2,"Hi! How is your day?",""
```
