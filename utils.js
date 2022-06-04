import { spawn } from 'child_process';

export function execute_js(cmd, args) {
    return new Promise((resolve, reject) => {
        const child = spawn(cmd, args);
        child.stdout.on('data', (data)=>resolve(data));
        child.stderr.on('data', (data)=>reject(data));
        child.on('exit', (code) => {
            if (code !== 0) {
                reject(new Error(`Command ${cmd} exited with code ${code}`));
            } else {
                resolve();
            }
        });
    });
}

export function interactive_execute_js(cmd, args, input, in_data) {
    return new Promise((resolve, reject) => {
        const child = spawn(cmd, args);
        child.stdout.on('data', (data)=>{
            const prompt = data.toString().replace(/\s/g, "");
            if(prompt === input){
                console.log(`about to send the data '${in_data}' for prompt:  ${prompt}`);
                child.stdin.write(in_data);
                child.stdin.end();
            } else{
                resolve(data);
            }
        });
        child.stderr.on('data', (data)=>reject(data));
        child.on('exit', (code) => {
            if (code !== 0) {
                reject(new Error(`Command ${cmd} exited with code ${code}`));
            } else {
                resolve();
            }
        });
    });
}



