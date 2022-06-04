import { spawn } from 'child_process';

export function execute_js(cmd, args) {
    return new Promise((resolve, reject) => {
        const child = spawn(cmd, args);
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
