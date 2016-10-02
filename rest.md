---
layout: default
title: REST & RESTful Conversations
---

# REST & RESTful Conversations

Using RESTful web services requires interacting and exchanging multiple messages with them, as part of the conversations. When such interactions comprise sequences of HTTP request-response messages, we call them RESTful conversations. 

RESTful conversations are heavily affected by the [REST architectural style constraints](https://www.ics.uci.edu/~fielding/pubs/dissertation/top.htm){:target="_blank"}, i.e., client-server, statelessness, uniform interface, cacheable, layered system, and code on demand. The statelessness and uniform interface constraints particularly influence the client-server communication encapsulated in RESTful conversations.

The statelessness principle requires client’s requests to be self-contained, so that the server does not need to remember previous interactions. This implies that every interaction is always initiated by the client, who sends a new request whenever it is ready to advance in the state of the conversation. The client starts the conversation aiming at a certain goal and it can end it at any time by simply not sending further requests.
However, the responsibility for steering conversation's direction does not lie solely with the client. Namely, the server determines which links to related resources to send, if any, depending on requested resource's state. No link is sent if the request is not authorized, or if there are no links to discover (e.g., after a `DELETE` request). The client decides whether and which hyperlink(s) to follow. Hyperlinks refer to Uniform Resource Identifiers (URIs) which are used to uniquely identify resources. These references can be annotated with the link relation or other constructs to label its semantics. 

HATEOAS (Hypermedia As The Engine of Application State), as part of the uniform interface constraint, requires the client to be unaware of URIs structure. 
All the client needs to know is the entry URI, while all remaining URIs are discovered dynamically during the conversation. Thus, the client is decoupled from the server which prevents the client from breaking with application's evolution.

Given the synchronous nature of RESTful interactions, requests are always followed by a response. Only in case of failures, when the server is unavailable or the request message gets lost, the client might resend the request after a given timeout. 
When resending requests, the idempotency of the HTTP method is important. It refers to the effect of multiple executions of the HTTP method on the called resource. 
If the resent request is not idempotent, e.g., a `POST` request, the API needs to be designed to deal with the consequences of such an action. On the other hand, resources bare no consequences from resending idempotent requests, e.g., `GET`, `PUT`, `DELETE`.

