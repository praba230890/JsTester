import { execute_js } from "./utils.js";

describe('Delay', function () {
    describe('python script',  ()=> {
        
      it('should run python script', () => {
          const verify = (data) => {
                console.log(data.toString());
            }
            execute_js('python3', ['./delay.py']).then(
                (data) => verify(data)
            );
      });
    });
  });