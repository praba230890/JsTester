import { execute_js, interactive_execute_js } from "./utils.js";

describe('Delay', function () {
    describe('python script',  ()=> {
        
      it('should run python script', () => {
          const verify = (data) => {
                console.log(data.toString());
            }
            execute_js('python3', ['./delay.py']).then(
                (data) => verify(data)
            ).catch(
                (data) => console.log("Error running command: " + data)
            );
      });

      it('should run python int script', () => {
        const verify = (data) => {
              console.log("");
              console.log("final output: \n"+ data.toString());
          }
          interactive_execute_js('python3', ['./delay_in.py'], "input", "whatever").then(
              (data) => verify(data)
          ).catch(
              (data) => console.log("Error running command: " + data)
          );
    });
    });
  });