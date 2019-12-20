const ipify = require('ipify');
const cloudflare = require('./dns/cloudflare');

const {
  ZONE_ID,
  RECORD_NAME,
} = process.env;

async function main() {
  const publicIp = await ipify({useIPv6: false});

  return cloudflare.addOrUpdateDNSRecord({zoneId: ZONE_ID, recordType: 'A', recordName: RECORD_NAME, recordValue: publicIp});
}

main()
  .then((result) => {console.log(result);})
  .catch(err => console.log(JSON.stringify(err)));