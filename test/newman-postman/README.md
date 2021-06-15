# Test for apigee-api using Newman

## Run with delay

NOTE: Be sure to keep both the HOST and ENV values aligned.

```
newman run --delay-request 3000 \
	--env-var "HOST=https://YOUR_HOST_NAME" \
	--env-var "ORG=YOUR_ORG_NAME" \
	--env-var "ENV=YOUR_ENV_NAME" \
	--env-var="GCPAccessToken=$(gcloud auth print-access-token)" \
	apigee-api-facade.postman_collection.json 

ApigeeX - KVMS via apigee-api facade

→ Get KVMs
  GET https://YOUR_HOST_NAME/apigee-api-facade/v1/organizations/YOUR_ORG_NAME/environments/YOUR_ENV_NAME/keyvaluemaps [200 OK, 438B, 424ms]
  ✓  200 OK

→ Create KVM test-and-delete
  POST https://YOUR_HOST_NAME/apigee-api-facade/v1/organizations/YOUR_ORG_NAME/environments/YOUR_ENV_NAME/keyvaluemaps [201 Created, 534B, 598ms]
  ✓  201 Created

→ /test-and-delete/entries/name1 (CreateValue1)
  GET https://YOUR_HOST_NAME/apigee-api-facade/v1/organizations/YOUR_ORG_NAME/environments/YOUR_ENV_NAME/keyvaluemaps/test-and-delete/entries/name1 [200 OK, 211B, 270ms]
  ✓  200 OK
  ✓  CreateValue1 == CreateValue1

→ Create KVM test-and-delete
  PUT https://YOUR_HOST_NAME/apigee-api-facade/v1/organizations/YOUR_ORG_NAME/environments/YOUR_ENV_NAME/keyvaluemaps/test-and-delete [200 OK, 520B, 493ms]
  ✓  200 OK
  ✓  entries === 3

→ /test-and-delete/entries/name1 (PutValue1)
  GET https://YOUR_HOST_NAME/apigee-api-facade/v1/organizations/YOUR_ORG_NAME/environments/YOUR_ENV_NAME/keyvaluemaps/test-and-delete/entries/name1 [200 OK, 208B, 235ms]
  ✓  200 OK
  ✓  PutValue1 == PutValue1

→ /test-and-delete/entries (EntitiesValue1)
  POST https://YOUR_HOST_NAME/apigee-api-facade/v1/organizations/YOUR_ORG_NAME/environments/YOUR_ENV_NAME/keyvaluemaps/test-and-delete/entries [200 OK, 213B, 236ms]
  ✓  200 OK
  ✓  EntitiesValue1

→ /test-and-delete/entries/name1 (EntitiesValue1)
  GET https://YOUR_HOST_NAME/apigee-api-facade/v1/organizations/YOUR_ORG_NAME/environments/YOUR_ENV_NAME/keyvaluemaps/test-and-delete/entries/name1 [200 OK, 213B, 232ms]
  ✓  200 OK
  ✓  EntitiesValue1 == EntitiesValue1

→ /test-and-delete/entries/name1 (PostValue1)
  POST https://YOUR_HOST_NAME/apigee-api-facade/v1/organizations/YOUR_ORG_NAME/environments/YOUR_ENV_NAME/keyvaluemaps/test-and-delete/entries/name1 [200 OK, 209B, 242ms]
  ✓  200 OK
  ✓  PostValue1 == PostValue1

→ /test-and-delete/entries/name1 (PostValue1)
  GET https://YOUR_HOST_NAME/apigee-api-facade/v1/organizations/YOUR_ORG_NAME/environments/YOUR_ENV_NAME/keyvaluemaps/test-and-delete/entries/name1 [200 OK, 209B, 208ms]
  ✓  200 OK
  ✓  PostValue1 == PostValue1

→ /test-and-delete/entries/name1
  DELETE https://YOUR_HOST_NAME/apigee-api-facade/v1/organizations/YOUR_ORG_NAME/environments/YOUR_ENV_NAME/keyvaluemaps/test-and-delete/entries/name1 [200 OK, 342B, 245ms]
  ✓  200 OK

→ /test-and-delete/entries/name1 ("")
  GET https://YOUR_HOST_NAME/apigee-api-facade/v1/organizations/YOUR_ORG_NAME/environments/YOUR_ENV_NAME/keyvaluemaps/test-and-delete/entries/name1 [200 OK, 199B, 274ms]
  ✓  200 OK
  ✓  "" == 

→ KVM test-and-delete
  DELETE https://YOUR_HOST_NAME/apigee-api-facade/v1/organizations/YOUR_ORG_NAME/environments/YOUR_ENV_NAME/keyvaluemaps/test-and-delete [200 OK, 395B, 235ms]
  ✓  200 OK

┌─────────────────────────┬─────────────────────┬────────────────────┐
│                         │            executed │             failed │
├─────────────────────────┼─────────────────────┼────────────────────┤
│              iterations │                   1 │                  0 │
├─────────────────────────┼─────────────────────┼────────────────────┤
│                requests │                  12 │                  0 │
├─────────────────────────┼─────────────────────┼────────────────────┤
│            test-scripts │                  24 │                  0 │
├─────────────────────────┼─────────────────────┼────────────────────┤
│      prerequest-scripts │                  12 │                  0 │
├─────────────────────────┼─────────────────────┼────────────────────┤
│              assertions │                  20 │                  0 │
├─────────────────────────┴─────────────────────┴────────────────────┤
│ total run duration: 40.1s                                          │
├────────────────────────────────────────────────────────────────────┤
│ total data received: 877B (approx)                                 │
├────────────────────────────────────────────────────────────────────┤
│ average response time: 307ms [min: 208ms, max: 598ms, s.d.: 120ms] │
└────────────────────────────────────────────────────────────────────┘
```
