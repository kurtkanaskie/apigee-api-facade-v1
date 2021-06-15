# Test for apigee-api using Maven

## Intitial Creation
```
mvn -P ngsaas-dev-1 apigee-config:keyvaluemaps -Dapigee.config.options=create -Dskip.clean=true -Dapigee.config.dir=resources/edge
```

### Test and Verify
```
AUTH="Authorization: Bearer $(gcloud auth print-access-token)"
curl -H "$AUTH" 'https://napi-dev.kurtkanaskie.net/apigee-api-facade/v1/organizations/ngsaas-5g-kurt/environments/dev-1/keyvaluemaps/test-and-delete/entries/name1'
{
    "name": "name1",
    "value": "DevMaven1"
}
```

## Update Requires Sync
Since the maven config plugin only creates the KVM, it skips if the KVM already exists, therefore need to use sync
```
mvn -P ngsaas-dev-1 apigee-config:keyvaluemaps -Dapigee.config.options=sync -Dskip.clean=true -Dapigee.config.dir=resources/edge
```

## Delete
```
mvn -P ngsaas-dev-1 apigee-config:keyvaluemaps -Dapigee.config.options=delete -Dskip.clean=true -Dapigee.config.dir=resources/edge
```
