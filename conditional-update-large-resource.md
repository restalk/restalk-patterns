---
layout: default
title: "Pattern: Conditional Update for Large Resources"
---

# Conditional Update for Large Resources

Summary:

: Declare client expectations to validate if intended resource update is possible
{:.pattern-summary}

{::options parse_block_html="true" /}

<div class="pattern">
## Context:

Updates of certain resources might require sending a lot of data, which could be represented in an incompatible format or simply too large for the server to process.

## Problem:

How can a client avoid sending a large representation which cannot be processed by the server?

## Forces:

Sending large files can be pricey in terms of bandwidth and/or response time and might potentially lead to a network/connection error. If the client is not sure about the size limit imposed by the server, if any, or about the accepted media types or authorization requirements, sending a large file, which will eventually be rejected, would result in wasted resources.

## Solution:

Before sending the actual data, the client sends an empty body with an `Expect` and `Content-Length`, or `Content-Type` or `Accept` header, which the server uses to control the appropriateness of the request to be sent. If the request is appropriate, evidenced by a 100 Continue server response, the client makes a `PUT` request with the same headers, except the `Expect` header, and the actual content. If retrieving another 4xx status code, the client can try with another content length or media type, suitable authorization, or end the conversation. A visualization of the solution is provided in the following [RESTalk](dsl.html) diagram:

{% include conditional-update-large-resource-figure.md %}

Consequences:

Benefits:

: * *Efficiency:* This pattern can avoid sending large representations, which are too large to be processed by the server, and can therefore save bandwidth and processing resources on the server. But at the same time it requires a conversation instead of a single update request. This pattern can be combined with the *(Partial) Resource Editing* pattern. 
  {:.benefits}

Liabilites:

: * *HTTP/1.1 support required:* As this feature is not supported in HTTP/1.0, the inbound server needs to support HTTP/1.1; otherwise the client would retrieve a 417 Expectation Failed status code which would mean it should send the original request without the `Expect` header and would not be able to take advantage of the conditional update.
  * *Increased response time:* This conversation introduces an additional roundtrip which can be avoided if enough bandwidth and server capacity is available and an out-of-band agreement on the accepted representation media type has been established between the client and the server.
  {:.liabilites}

## Known uses:

This conversation is described as Look Before You Leap in chapter 8 of [“RESTful Web Services”](http://shop.oreilly.com/product/9780596529260.do) and used in the [Amazon S3 API](http://docs.aws.amazon.com/AmazonS3/latest/API/RESTObjectPUT.html){:target="_blank"}.

## Related patterns:

If discovery for the editing is needed, the *(Partial) Resource Editing* pattern may help.
</div>