---
layout: default
title: "Pattern: POST-PUT Creation"
---

# POST-PUT Creation

Summary:

: Prevent creation of duplicate resources in case of errors
{:.pattern-summary}

{::options parse_block_html="true" /}

<div class="pattern">
## Context:

If a client wants to create a resource whose URI it does not know, it has to use a `POST` request. If the response does not reach it, the client does not know if the server did not receive the request, and thus the resource has not been created, or the resource has been created, but the response got lost.

## Problem:

As all networks are not reliable, a client cannot know the reason for a missing response. This is not a problem if the request was using an idempotent HTTP verb like `GET`, `PUT` or, `DELETE`. However, if a client uses a `POST` request because it wants to create a resource whose URI will be determined by the server, how can the creation be repeated without resulting in multiple resources being created?

## Forces:

The creation of the resource consists of the technical part where a new identifier is chosen and the part where all kinds of consequences and side-effects related to the application domain are executed. While resource identifiers are relatively inexpensive to mint, it often turns out that the application domain logic triggered by resource creation should not be executed multiple times.

## Solution:

To use the *POST-PUT Creation* conversation pattern, it should be possible to distinguish between the technical creation, i.e. the creation of a new URI, and the execution of the application domain specific creation behavior. The resource creation is split into two steps, the technical creation of its identifier and the actions that are required by the application domain. So the client sends first an empty `POST` request, which results in the creation of an empty resource resulting in no side-effect relevant for the application domain. Server's response contains a link to the URI of the created empty resource to which the client can add domain-specific content using a `PUT` request. The first `PUT` request will then trigger the consequences of the creation in the domain. Since the `PUT` is idempotent, resending it multiple times will not have side effects. A visualization of the solution is provided in the following [RESTalk](dsl.html) diagram:

{% include post-put-figure.md %}

Consequences:

Benefits:

: * *Simplified garbage collection:* The created resources have no content and their creation only has technical side-effects. The resources are not initialized until the `PUT` request is received, thus the server can be set to destroy the empty resources at certain intervals. 
 * *Idempotent initialization:* After the client receives the resource identifier, the actual initialization of the resource is carried out using an idempotent `PUT` request.
  {:.benefits}

Liabilites:

: * *Duplicate empty resources:* This solution does not prevent from duplicate resources being created and thus may consume the set of available resource identifiers.
  {:.liabilites}

## Variants:

To enable the server to identify that the `PUT` request is used for creation and not for a normal update of the resource an `If-None-Match` header with a `*` as value can be added to the `PUT` request. 

This pattern can also be applied when a `POST` request is not used for creation but for performing any non-idempotent operation.

## Known uses:

For example, the [DayTrader REST API](http://bitworking.org/news/201/RESTify-DayTrader#orders-should-be-reliable){:target="_blank"}.

## Related patterns:

If the creation takes a long time the [*Long Running Operation with Polling* pattern](long-running-operation-polling.html) may help.
</div>