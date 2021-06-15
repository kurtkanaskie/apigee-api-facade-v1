/* globals context */
/* Response is 
[
  "bigquery-token-v1",
  "demo",
  "gcp-sa-devrel",
  "pingstatus-v1",
  "test-and-delete2"
]

// This doesnt work
var kvms = JSON.parse(context.getVariable("kvm_get_response"));
var kvm_name = context.getVariable("kvm_name");
print ("kvm_get_response " + JSON.stringify(kvms) + " kvm_name " + kvm_name);
// Cannot find function includes in object
context.setVariable( "kvm_found", obj.kvms.includes(kvm_name) );
*/

var kvms = context.getVariable("kvm_get_response");
var kvm_name = '"' + context.getVariable("kvm_name") + '"';
// print ("kvm_get_response " + kvms + " kvm_name " + kvm_name);
context.setVariable( "kvm_found", kvms.includes(kvm_name) );

