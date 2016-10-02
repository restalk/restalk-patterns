---
layout: default
title: "Pattern: Long Running Operation with Polling"
---

# Long Running Operation with Polling


Summary:

: Use polling to avoid client timeouts when waiting long running operation results
{:.pattern-summary}

{::options parse_block_html="true" /}

<div class="pattern">
## Context:

Processing complex or data intensive operations (e.g., big data processing, back-up jobs) might require a long time.

## Problem:

How can a client retrieve the result of such an operation without keeping the HTTP connection open for a too long time? Especially, as there normally will be a timeout for HTTP connections because every open connection allocates a certain amount of memory at the server and the client. How can we avoid wasting resources for open connections and for computations whose result will not be received by the client in case of a timeout?

## Forces:

As the network is not reliable, the client may loose the connection before the server has completed processing the result. The longer the server takes to respond to the client, the higher the chances that the client may no longer be available to receive the result or interested to retrieve it. The server may need to perform expensive computations to process client requests and these would be repeated every time the client resends the request in case the connection on the previous one is dropped. Performing computations and delivering their results are two concerns that make completely different demands on the server infrastructure. 

## Solution:

The long running operation itself is turned into a resource, created using the original request with a response telling the client where to find the results. ese will be available once the operation running in the background completes. The client may poll the resource to `GET` its current progress, and will eventually  redirected to another resource representing the result, once the long running operation has completed. Since the output has its own URI, it becomes possible `GET` it multiple times, as long as it has not been deleted. Additionally, the long running operation can be cancelled with a `DELETE` request, thus implicitly opping the operation on the server, or deleting its output if it had already completed in the meanwhile. A visualization of the solution is provided in the llowing [RESTalk](dsl.html) diagram:

{% include lrr-figure.md %}

## Consequences:

Benefits:

: * *Scalability:* The client does not need to keep the connection open with the server for the entire duration of the request. This has a positive impact on the number of clients that the server can handle concurrently.
  * *Shared results:* The link to the result can be shared among multiple clients that can retrieve it without needing the server to recompute it again for each client.
  * *Request cancellation:* An explicit mechanism consistent with the REST uniform interface is provided for cancelling requests and thus avoiding to waste server resources to perform computations whose results the client is no longer interested in.
  {:.benefits}

Liabilites:

: * *Polling:* The client needs to implement polling, which if done too frequently, may put an additional burden on the server and consume unnecessary bandwidth. To mitigate this problem, it is possible that the server can provide the client with progress information while it is polling so that the number of `GET` requests can be reduced. 
  * *Server storage consumption:* Depending on the type and size of the result, storage space will be consumed if clients forget to delete the job results and these are not deleted automatically after a certain period of time. 
  {:.liabilites}


## Variants:

To avoid polling, the client could become a server as well if possible, providing a callback link when starting the job, indicating where it wants to be notified when the result is available. Queuing requests, processing them and delivering the corresponding results may be assigned to separate physical servers, so that the polling by a large number of clients can be directed to a dedicated server.
  
If the first step of this conversations needs to be reliable in case of lost responses, and to avoid creating the same job multiple times, this pattern can be combined with the *POST Once Exactly* or the *POST-PUT Creation* pattern where the job is started with the `POST` or the `PUT` respectively.

## Known uses:

The [AWS Glacier REST API](http://docs.aws.amazon.com/amazonglacier/latest/dev/job-operations.html){:target="_blank"} as well as an [API for handling Virtual Machines](http://dl.acm.org/citation.cfm?id=2307825){:target="_blank"}.

## Related Patterns:

If the creation of the job resource needs to be reliable the [*POST-PUT Creation* pattern](post-put.html) may help.
</div>
