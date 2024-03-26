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
const ipAddress = '192.168.181.109';
const backendUrl = `http://${ipAddress}:3000`;

export default backendUrl;
