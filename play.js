import {spawn} from 'child_process';

//kick off process of listing files
var child = spawn('python3', ['./delay.py']);

//spit stdout to screen
child.stdout.on('data', function (data) {   process.stdout.write(data.toString());  });

//spit stderr to screen
child.stderr.on('data', function (data) {   process.stdout.write(data.toString());  });

child.on('close', function (code) { 
    console.log("Finished with code " + code);
});