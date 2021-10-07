# Apigee API Facade for Apigee X - KVMs

This API proxy provides a solution to KVM entry creation for CI/CD and allows existing KVM representations to be used the same as they were in the Edge API (Previous Gen Apigee). It is a facade API that intercepts Apigee API requests and executes KVM policies on the fly, to update KVM entries. The proxy is deployed to the environment in which the KVM entries are to be created.

The URL where `apigee-facade-api` proxy was deployed is used within Maven as the `apigee.hosturl` in the environment profile [pom](test/maven-kvms/pom.xl).
```
<apigee.hosturl>https://napi-test.kurtkanaskie.net/apigee-api-facade</apigee.hosturl>
```

## Solution Overview
The proxy implements KVM entry creation by executing KVM policies using the values of entries from a complete KVM request as per Edge API. The POST request to create the KVM includes all the entries. After a successful request to the Apigee API to create the KVM, a JavaScript policy iterates through the entries and recursively calls this proxy with entry creation requests. Each of these subsequent entry requests uses a `GET keyvaluemap` request to the Apigee API to ensure the KVM exists and is accessable. Then in the response flow, a KVM policy is executed to set the key value.

Security is a pass through of credentials provided to the originating API request.

For example:
```
[
    {
        "name": "test-and-delete",
        "encrypted": true,
        "entry": [
            {
                "name": "name1",
                "value": "DevMaven1"
            },
            {
                "name": "name2",
                "value": "DevMaven2"
            },
            {
                "name": "name3",
                "value": "DevMaven3"
            }
        ]
    }
]
```

### KVM and Entries Creation
* POST `keyvaluemaps`, saves then removes the `entry` from the request and creates a POST `keyvaluemaps` create request that proceeds to the Apigee API target. 
* Upon successful response, a JavaScript policy creates POST requests for each of the entries to  `keyvaluemaps/MAP_NAME/entries/ENTRY_NAME` which in turn executes the KVM policies to create the entry.

### KVM and Entries Update
* PUT `keyvaluemaps` is similar to POST, it saves then removes the `entry` from the request and creates a GET `keyvaluemaps` request that proceeds to the Apigee API target. 
* Upon successful response, a JavaScript policy determines if the KVM exists.
* If the KVM exists, a JavaScript policy creates POST requests for each of the entries to `keyvaluemaps/MAP_NAME/entries/ENTRY_NAME` which in turn executes the KVM policies to update the entry.

### KVM Entry Operations
KVM entries requests follow the same pattern:
* Create a GET `keyvaluemaps` request that proceeds to the Apigee API target
* Verifies the KVM exists
* If the KVM exists, execute KVM policies for
  * GET `keyvaluemaps/MAP_NAME/entries/ENTRY_NAME`
  * POST `keyvaluemaps/MAP_NAME/entries/ENTRY_NAME` 
  * DELETE `keyvaluemaps/MAP_NAME/entries/ENTRY_NAME`

### KVM Entries Operations
* POST `keyvaluemaps/MAP_NAME/entries` request does the same as the POST `keyvaluemaps/MAP_NAME/entries/ENTRY_NAME`, it's provided to mimic behavior in Edge API.

## Usage
* git clone
* Specify your profile parameters
* Install
```
mvn -P your_env_profile install -Dapigee.serviceaccount.file=/path/to/your/SA.json
```

## Test

### Maven config
A simple Maven config example is provided, see the [README](test/maven-kvms/README.md). It uses the URL where `apigee-facade-api` proxy was deployed for the `apigee.hosturl`.

The option `apigee.config.options=update` does not work, need to use `apigee.config.options=sync` to delete and re-create KVM.

### Postmand and Newman

Ad hoc tests can be done using the proviced Postman Collection.

Newman can be used to run the collection for an end-to-end test, see the [README](test/newman-postman/README.md).

## Disclaimer

This example is not an official Google product, nor is it part of an official Google product.

## License

This material is copyright 2019, Google LLC. and is licensed under the Apache 2.0 license.
See the [LICENSE](LICENSE) file included.

This code is open source.


