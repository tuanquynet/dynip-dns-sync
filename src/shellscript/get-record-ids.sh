# environment vars
# CF_ZONE_ID=
# CF_RECORD_NAME=myhome.youdomain.abc
# CF_TOKEN=
# # get records
curl -X GET "https://api.cloudflare.com/client/v4/zones/$CF_ZONE_ID/dns_records?name=$CF_RECORD_NAME" \
     -H "Authorization: Bearer $CF_TOKEN" \
     -H "Content-Type: application/json"
