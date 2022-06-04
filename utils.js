import { spawn } from 'child_process';

export function execute_js(cmd) {
    return new Promise((resolve, reject) => {
        const child = spawn('python3', ['./delay.py']);
        child.stdout.on('data', (data)=>resolve(data));
        child.on('error', reject);
        child.on('exit', (code) => {
            if (code !== 0) {
                reject(new Error(`Command ${cmd} exited with code ${code}`));
            } else {
                resolve();
            }
        });
    });
}
