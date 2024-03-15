/* const os = require('os');
const networkInterfaces = os.networkInterfaces();

for (let interfaceName in networkInterfaces) {
  let interface = networkInterfaces[interfaceName];

  for (let i = 0; i < interface.length; i++) {
    let address = interface[i];

    if (address.family === 'IPv4' && !address.internal) {
      console.log(interfaceName, address.address);
    }
  }
}
 */

const backendUrl = 'http://172.16.0.2:3000';

export default backendUrl;
