# dynip-dns-sync
The purpose of this tool is used to sync public ip of home which is randomly assigned by internet service provider. At the moment it only support Cloudflare DNS

# Installation
- Clone from git: `git clone ....`
- Go to app folder
- Install dependencies: `npm install`

# Install cronjob
- Notes: I have only tested it on debian (10).
- You need to replace CF_ACCOUNT_EMAIL, CF_ACCESS_KEY, '/path/to/app/' with your values in this statement before running it: 
  - in terminal: `echo "0 * * * * root CF_ACCOUNT_EMAIL='your-email' CF_ACCESS_KEY='global-access-key' ZONE_ID='zone-id' RECORD_NAME='record-name' node /path/to/app/src/index.js" | sudo tee -a /etc/crontab > /dev/null`
  - the cron job will run every hour at minute 00: ex: 10:00 AM, 11:00 AM..
