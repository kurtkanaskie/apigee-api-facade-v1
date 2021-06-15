/* globals print, context */
/* globals Request, httpClient */
var org_name = context.getVariable("org_name");
var env_name = context.getVariable("env_name");
var kvm_name = context.getVariable("kvm_name");
var kvm_entries = JSON.parse(context.getVariable("kvm_entries"));
var host = context.getVariable("request_host");
var auth = context.getVariable("request.header.authorization");
var proxy_basepath = context.getVariable("proxy.basepath");

var messageid = context.getVariable("messageid");
// TODO: determine if I need to qualify entries_length and entries_count by messageid
print( "messageid " + messageid + " entries_length " + kvm_entries.length);
context.setVariable("entries_length",kvm_entries.length);
context.setVariable("entries_count",0);

function onComplete( response, error ) {
    var entries_count = Number(context.getVariable("entries_count")) + 1;
    var entries_length = Number(context.getVariable("entries_length"));
    context.setVariable("entries_count", entries_count);
    var final_response = {};
    // Check if the HTTP request was successful
    if ( response ) {
        // print ( "Entry response: " + response.status + " " + response.content);
        var resp_obj = JSON.parse( response.content );
        
        if( entries_count === 1 ) {
            // Create initial response content
            final_response = { "meta":"kurt","name":kvm_name,"encrypted":true, "entry":[resp_obj] };
        } else {
            // Push each new entry onto the final response
            final_response = JSON.parse(context.getVariable("final_response"));
            final_response.entry.push(resp_obj);
        }
    } else {
        context.setVariable( "javascript_error", true);
        print ( "Error response: " + error.status + " " + error);
    }
    
    if( entries_count === entries_length) {
        // Done, set the response.content
        context.setVariable("response.content",JSON.stringify(final_response));
    } else if ( entries_count < entries_length ) {
        // Not done yet, store the built up final response
        context.setVariable("final_response",JSON.stringify(final_response));
    }
}

kvm_entries.forEach( entry => {
    var headers = {'Authorization':auth,'Content-Type':'application/json'};
    var url = "https://" + host + proxy_basepath + "/v1/organizations/" + org_name + "/environments/" + env_name + "/keyvaluemaps/" + kvm_name + "/entries/" + entry.name; 
    // print( "URL: " + url + " entry: " + entry.name + " = " + entry.value);
    var req = new Request(url, "POST", headers, JSON.stringify(entry));
    httpClient.send(req,onComplete);
} );
