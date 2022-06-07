import { spawn } from 'child_process';


/**
* function to run cli commands - a wrapper on spawn
* @param {string} cmd - command to run
* @param {string} args - arguments to pass to command
*/
export function exec_cmd(cmd, args) {
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

/**
* function to run commands interactively - a wrapper on spawn
* @param {string} cmd - command to run
* @param {string} args - arguments to pass to command
* @param {string} expected_prompt - input prompt text to expect
* @param {string} in_data - input data to the prompt
*/
export function exec_cmd_with_prompt(cmd, args, expected_prompt, in_data) {
    return new Promise((resolve, reject) => {
        const child = spawn(cmd, args);
        child.stdout.on('data', (stdout_data)=>{
            const prompt = stdout_data.toString().replace(/\s/g, "");
            if(prompt === expected_prompt){
                console.log(`about to send the data '${in_data}' for prompt:  ${prompt}`);
                child.stdin.write(in_data);
                child.stdin.end();
            } else{
                resolve(stdout_data);
            }
        });
        child.stderr.on('data', (stderr_data)=>reject(stderr_data));
        child.on('exit', (exit_code) => {
            if (exit_code !== 0) {
                reject(new Error(`Command ${cmd} exited with code ${exit_code}`));
            } else {
                resolve();
            }
        });
    });
}


export default { exec_cmd, exec_cmd_with_prompt };