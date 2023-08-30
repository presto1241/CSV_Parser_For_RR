<sub> I bring you...
# CSV_Parser_For_RR
# !!!
Creating a CSV parser from scratch... Small project, but I wanted to do it since it seemed fun :)

# How do I run this?

Its very simple! All you need is to have [Node.js](https://nodejs.org/en/download/current) and [npm](https://www.npmjs.com/)! *I currently use Node.js version* [19.0.0](https://nodejs.org/download/release/v19.0.0/)


- Next you need to go to your terminal, and go into the directory/folder you want to install this repository at.
- When you do that, you can now run the command `git clone https://github.com/presto1241/CSV_Parser_For_RR/main`. *Optionaly you can install the .zip if you don't have git*
- When that installs/clones, you can now navigate until you're in the same folder as `index.js`. *tip: You can use* `ls` *to list all the directorys in your current file. linux should be similar.*
- Then, you can run `npm install` to install all the packages that this repository uses. *I promise im not using insanely high file size packages.*
- When thats all done now you can use `node index.js` and run the program. **Read below before actually doing it if its your first time running it.**

# How do I actually use the program?

There should be two text files.
- Schema.txt
- Data.txt

These two files are **exactly** what to input into the text fields in rec room.


---
When starting up the program. You are prompted if you want to generate a schema.txt file.

This prompt is just asking if the script should override what is currently in the schema.txt or if it should just leave it be.

---
The script **should** now open up a file explorer window for you to select your csv file from. *If it doesn't please send an issue ticket. If you know how to write javascript and know how to fix it, make a pull request!*

When you select the file, it should automatically generate all the data needed to update `Data.txt` and `Schema.txt`(*If you have it updating it*). Then it will let you know when it finishes!

Then you can copy+paste the data into rec room and call it a day!
