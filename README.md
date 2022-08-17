# dynip-dns-sync
The purpose of this tool is used to sync public ip of home which is randomly assigned by internet service provider. At the moment it only support Cloudflare DNS

# Installation
- Clone from git: `git clone ....`
- Go to app folder
- Install dependencies: `npm install`

# Setup cronjob
## for NodeJS app
- Notes: I have only tested it on debian (10).
- You need to replace CF_ACCOUNT_EMAIL, CF_ACCESS_KEY, '/path/to/node' and '/path/to/app/' with your values in this statement before running it:
  - edit cron job of current user: `crontab -e`
  - insert the following statement: `0 * * * * CF_ACCOUNT_EMAIL='your-email' CF_ACCESS_KEY='global-access-key' ZONE_ID='zone-id' RECORD_NAME='record-name' /path/to/node /path/to/app/src/index.js > /dev/null`
  - the cron job will run every hour at minute 00: ex: 10:00 AM, 11:00 AM.., we can change it to appropriate value.

## for Shellscript
- Notes: I have only tested it on debian (10).
- You need to replace '/path/to/node' and '/path/to/app/' with your values in this statement before running it:
  - edit cron job of current user: `crontab -e`
  - insert the following statement: `0 * * * * CF_ZONE_ID='zone-id' && CF_RECORD_ID='record-id' && CF_TOKEN='api-token' && CF_RECORD_NAME='record-name' /bin/bash /path/to/script.sh > /dev/null`
  - the cron job will run every hour at minute 00: ex: 10:00 AM, 11:00 AM.., we can change it to appropriate value.
