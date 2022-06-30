import { assert } from "chai";
import cli from "./cli.js";
import * as crypto from "crypto";


async function sha256(message) {
  console.log(message, " message")
  return crypto.createHash('sha256').update(message).digest('hex');
}
describe('Delay', function () {
    describe('python script',  ()=> {
      it('test sha', async () => {
        const a = await sha256("test");
        console.log(a);
      }).timeout(5000000);
        
      it('should run python script to fail test', async () => {
          const verify = (out) => {
                assert.equal(out, 'Hello,world!\r\n');
                console.log(out);
                
            }
            const data = await cli.exec_cmd('python3', ['./delay.py']);
            verify(data);
      }).timeout(500000);

      it('should run python int script', async () => {
        const verify = (out) => {
              console.log("");
              console.log("final output: \n"+ out);
          }
            const data = await cli.exec_cmd_with_prompt('python3', ['./delay_in.py'], "input", "whatever");
            verify(data);
        }).timeout(500000);
    });
  });