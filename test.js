import { assert } from "chai";
import cli from "./cli.js";

describe('Delay', function () {
    describe('python script',  ()=> {
        
      it('should run python script to fail test', async () => {
          const verify = (data) => {
                assert.equal(data.toString(), 'Hello,world!\r\n');
                console.log(data.toString());
                
            }
            const data = await cli.exec_cmd('python3', ['./delay.py']);
            verify(data);
      }).timeout(500000);

      it('should run python int script', async () => {
        const verify = (data) => {
              console.log("");
              console.log("final output: \n"+ data.toString());
          }
            const data = await cli.exec_cmd_with_prompt('python3', ['./delay_in.py'], "input", "whatever");
            verify(data);
        }).timeout(500000);
    });
  });