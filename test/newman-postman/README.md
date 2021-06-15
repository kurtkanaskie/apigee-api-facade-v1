# Test for apigee-api using Newman

## Run with delay

NOTE: Be sure to change both the HOST and ENV values aligned.

```
newman run --delay-request 3000 \
	--env-var "HOST=https://napi-dev.kurtkanaskie.net" \
	--env-var "ORG=ngsaas-5g-kurt" \
  --env-var "ENV=dev-1" \
	--env-var="GCPAccessToken=$(gcloud auth print-access-token)" \
	apigee-api-facade.postman_collection.json 

ApigeeX - KVMS via apigee-api facade

→ Get KVMs
  GET https://napi-dev.kurtkanaskie.net/apigee-api-facade/v1/organizations/ngsaas-5g-kurt/environments/dev-1/keyvaluemaps [200 OK, 438B, 424ms]
  ✓  200 OK

→ Create KVM test-and-delete
  POST https://napi-dev.kurtkanaskie.net/apigee-api-facade/v1/organizations/ngsaas-5g-kurt/environments/dev-1/keyvaluemaps [201 Created, 534B, 598ms]
  ✓  201 Created

→ /test-and-delete/entries/name1 (CreateValue1)
  GET https://napi-dev.kurtkanaskie.net/apigee-api-facade/v1/organizations/ngsaas-5g-kurt/environments/dev-1/keyvaluemaps/test-and-delete/entries/name1 [200 OK, 211B, 270ms]
  ✓  200 OK
  ✓  CreateValue1 == CreateValue1

→ Create KVM test-and-delete
  PUT https://napi-dev.kurtkanaskie.net/apigee-api-facade/v1/organizations/ngsaas-5g-kurt/environments/dev-1/keyvaluemaps/test-and-delete [200 OK, 520B, 493ms]
  ✓  200 OK
  ✓  entries === 3

→ /test-and-delete/entries/name1 (PutValue1)
  GET https://napi-dev.kurtkanaskie.net/apigee-api-facade/v1/organizations/ngsaas-5g-kurt/environments/dev-1/keyvaluemaps/test-and-delete/entries/name1 [200 OK, 208B, 235ms]
  ✓  200 OK
  ✓  PutValue1 == PutValue1

→ /test-and-delete/entries (EntitiesValue1)
  POST https://napi-dev.kurtkanaskie.net/apigee-api-facade/v1/organizations/ngsaas-5g-kurt/environments/dev-1/keyvaluemaps/test-and-delete/entries [200 OK, 213B, 236ms]
  ✓  200 OK
  ✓  EntitiesValue1

→ /test-and-delete/entries/name1 (EntitiesValue1)
  GET https://napi-dev.kurtkanaskie.net/apigee-api-facade/v1/organizations/ngsaas-5g-kurt/environments/dev-1/keyvaluemaps/test-and-delete/entries/name1 [200 OK, 213B, 232ms]
  ✓  200 OK
  ✓  EntitiesValue1 == EntitiesValue1

→ /test-and-delete/entries/name1 (PostValue1)
  POST https://napi-dev.kurtkanaskie.net/apigee-api-facade/v1/organizations/ngsaas-5g-kurt/environments/dev-1/keyvaluemaps/test-and-delete/entries/name1 [200 OK, 209B, 242ms]
  ✓  200 OK
  ✓  PostValue1 == PostValue1

→ /test-and-delete/entries/name1 (PostValue1)
  GET https://napi-dev.kurtkanaskie.net/apigee-api-facade/v1/organizations/ngsaas-5g-kurt/environments/dev-1/keyvaluemaps/test-and-delete/entries/name1 [200 OK, 209B, 208ms]
  ✓  200 OK
  ✓  PostValue1 == PostValue1

→ /test-and-delete/entries/name1
  DELETE https://napi-dev.kurtkanaskie.net/apigee-api-facade/v1/organizations/ngsaas-5g-kurt/environments/dev-1/keyvaluemaps/test-and-delete/entries/name1 [200 OK, 342B, 245ms]
  ✓  200 OK

→ /test-and-delete/entries/name1 ("")
  GET https://napi-dev.kurtkanaskie.net/apigee-api-facade/v1/organizations/ngsaas-5g-kurt/environments/dev-1/keyvaluemaps/test-and-delete/entries/name1 [200 OK, 199B, 274ms]
  ✓  200 OK
  ✓  "" == 

→ KVM test-and-delete
  DELETE https://napi-dev.kurtkanaskie.net/apigee-api-facade/v1/organizations/ngsaas-5g-kurt/environments/dev-1/keyvaluemaps/test-and-delete [200 OK, 395B, 235ms]
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
