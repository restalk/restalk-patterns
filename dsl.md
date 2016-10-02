---
layout: default
title: RESTalk DSL
---

# RESTalk – a DSL for RESTful Conversations

RESTalk is a Domain Specific Modeling Language for visual representation of [RESTful conversations](rest.html). It is implemented as an extension of the [Business Process Modeling Notation (BPMN) Choreography Diagrams](http://blog.maxconsilium.com/2013/09/bpmn-20-models-part-2.html){:target="_blank"} with REST specific details. At its current version RESTalk only supports modelling of one to one RESTful conversations. Multiparty conversations will be supported in the future. 

A legend of RESTalk is provided in the following figure:

<div class="text-center">
    <figure>
        {% include_relative img/notation_horizontal.svg %}
        <figcaption>Language elements of the RESTalk notation</figcaption>
    </figure>
</div>

The message content to be included in the **client-server interaction** shall contain, but is not limited to, the following details: HTTP method, URI, response status code and, where applicable, links. 

A **start** and an **end event** are used to depict the beginning and the end of the conversation, while the **timer event** is used to model the response timeout due to server’s response taking too long, followed by the client resending the request. The timer can only be used attached to the request band, since it interrupts the normal request-response flow. 

The **sequence flow** shows the flow of the conversation, while the **hyperlink flow** models URIs’ discovery nd usage by the client.


The **gateways** are used to diverge or converge different plausible conversation paths. They can be of different kind: parallel when concurrent paths are necessary, exclusive when only one of n paths is possible, and inclusive when any combination of the paths can occur. 

The following figure shows an example of a generic conversation using RESTalk.

<div class="img-small text-center">
    <figure>
        {% include_relative img/notation_example.svg %}
        <figcaption>Example of a RESTalk conversation</figcaption>
    </figure>
</div>

The client starts the conversation **(1)** by sending a request to which the server responds **(2)** with two hyperlinks which can be followed by the client **(3)** and which are related to the requested resource. The client can decide to follow just the first hyperlink or just the second hyperlink or both of them **(4)**. If the server does not respond in time **(6)** to client’s request for the first hyperlink, the client can resend the request **(5)**. The server can respond with one of the two alternatives **(7)** depending on the state of the requested resource. Once the response is received the conversation finishes **(8)**.

## RESTalk optional simplifications

To provide for the understandability of diagrams represented using RESTalk, the following simplifications and abstractions can be introduced.

1. Although the client can end the conversation at any time, by simply not sending further requests, we use end events to model only the paths that result in the success or failure of the initial intent of the conversation.
1. We only show the hyperlink flow of the last received response, while in reality the link could have been obtained earlier in the conversation as well.
1. Due to the absence of consequences when resending idempotent requests, we only model the re- sending of non-idempotent requests (`POST`, `PATCH`) without emphasizing the fact that the client can eventually give up and stop resending the request.
1. We also refrain from modeling alternative responses with 5xx status (server error) codes since they can occur after any request. 

## Getting started

As there is currently no editor or other tooling available, you can use this <a href="img/notation_horizontal.svg" download>SVG file</a> as starting point for modeling your own RESTful conversations.