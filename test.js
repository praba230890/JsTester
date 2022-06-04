import { execute_js } from "./utils.js";

describe('Delay', function () {
    describe('python script',  ()=> {
        
      it('should run python script', () => {
        //   this.timeout(50000000);
          const verify = (data) => {
                console.log(data.toString());
            }
            execute_js("").then(
                (data) => verify(data)
            );
      });
    });
  });