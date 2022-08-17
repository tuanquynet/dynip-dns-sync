# prerequisite
# curl,

IP=`curl api.ipify.org`
# environment vars
# CF_ZONE_ID=
# CF_RECORD_ID=
# CF_TOKEN=
# CF_RECORD_NAME=
curl -X PUT "https://api.cloudflare.com/client/v4/zones/$CF_ZONE_ID/dns_records/$CF_RECORD_ID" \
     -H "Authorization: Bearer $CF_TOKEN" \
     -H "Content-Type: application/json" \
		 --data "$(cat <<EOF
	{
		"type":"A",
		"name":"$CF_RECORD_NAME",
		"content":"$IP",
		"ttl": 1,
		"proxied":false
	}
EOF
)"
