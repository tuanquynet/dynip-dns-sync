const fetch = require('node-fetch');

const {
  CF_ACCOUNT_EMAIL,
  CF_ACCESS_KEY,
} = process.env;

class Cloudflare {
  constructor({email, accessKey} = {}) {
    this.email = email || CF_ACCOUNT_EMAIL;
    this.accessKey = accessKey || CF_ACCESS_KEY;
  }
  
  updateConfig({email, accessKey}) {
    this.email = email,
    this.accessKey = accessKey;
  }

  async getDNSRecord({zoneId, recordName}) {
    console.log('getDNSRecord');
    if (!recordName) {
      throw new Error('Missing recordName');
    }

    const url = `https://api.cloudflare.com/client/v4/zones/${zoneId}/dns_records?order=type&page=1&per_page=1&name=${recordName}`;

    const result = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-Auth-Email': this.email,
        'X-Auth-Key': this.accessKey,
      },
    })
      .then(res => res.json())
      .then(res => res.result);

    return result && result[0];
  }

  async updateDNSRecord({zoneId, recordType, recordName, recordValue, ttl = 1, recordId}) {
    console.log('updateDNSRecord');
    const url = `https://api.cloudflare.com/client/v4/zones/${zoneId}/dns_records/${recordId}`;

    return fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'X-Auth-Email': this.email,
        'X-Auth-Key': this.accessKey,
      },
      body: JSON.stringify({
        type: recordType,
        name: recordName,
        content: recordValue,
        ttl,
      }),
    })
      .then(res => res.json())
      .then(res => {
        if (res.errors) {
          throw new Error(result.errors[0]);
        }

        return res.result;
      });
    ;
  }

  async addDNSRecord({zoneId, recordType, recordName, recordValue, ttl = 1, priority = 10}) {
    console.log('addDNSRecord');
    const url = `https://api.cloudflare.com/client/v4/zones/${zoneId}/dns_records`;
    const data = {
      type: recordType,
      name: recordName,
      content: recordValue,
      ttl,
      priority,
      proxied: false,
    };

    return fetch(url, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'X-Auth-Email': this.email,
        'X-Auth-Key': this.accessKey,
      },
      body: JSON.stringify(data),
    })
      .then(res => res.json())
      .then(res => {
        if (res.errors) {
          throw new Error(result.errors[0]);
        }

        return res.result;
      });
  }

  async addOrUpdateDNSRecord({zoneId, recordType, recordName, recordValue, ttl = 1, priority = 10}) {
    const record = await this.getDNSRecord({zoneId, recordName});
    let result = record;

    if (record) {
      if (record.content !== recordValue) {
        result = await this.updateDNSRecord({zoneId, recordType, recordName, recordValue, ttl, recordId: record.id});
      }
    } else {
      result = await this.addDNSRecord({zoneId, recordType, recordName, recordValue, ttl, priority})
    }

    return result;
  }
}

module.exports = new Cloudflare();