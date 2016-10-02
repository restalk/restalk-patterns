---
layout: default
title: A Pattern Collection for RESTful Conversations
---

# RESTalk Pattern Language

## Patterns for RESTful Conversations

Resources exposed as part of RESTful APIs are discovered by clients that interact with them over [conversations](rest.html), composed of sets of basic HTTP interactions, to achieve different goals, such as for example: the (reliable) creation of additional resources, the discovery of related resources, the enumeration of the items found within a collection. Given the goal of each conversation, the designer of the API chooses the corresponding conversation patterns which form the basis for the API design. These patterns will thus help the client developer to understand API's features and to build upon them clients that will perform the complex conversation to achieve their goals.


## What are patterns?

<blockquote>
    <p>
        Each pattern describes a problem which occurs over and over again in our environment, and then describes the core of the solution to that problem, in such a way that you can use this solution a million times over, without ever doing it the same way twice. 
    </p>
    <footer>Christopher Alexander et al. in <cite title="A Pattern Language: Towns, Buildings, Construction">A Pattern Language: Towns, Buildings, Construction</cite> (1977)</footer>
</blockquote>

You can find an explanation what patterns are and how they are described on the [website of the EuroPlop conference](http://europlop.net/content/introduction){:target="_blank"}.

## RESTalk Patterns

An overview over the patterns of this language and their relationships is provided in the following figure.

<div class="text-center">
    <figure>
        {% include_relative img/language_overview.svg %}
        <figcaption>Pattern Language Overview</figcaption>
    </figure>
</div>

The patterns are grouped by the problem they are solving into the following groups.
The missing patterns will be published soon.

### Resource Creation Patterns

While HTTP offers the POST and PUT methods for creating resources in a single request-response round, these patterns deal with resource creation under certain constraints or failure scenarios.

* POST new Collection Item
* POST Once Exactly
* [POST-PUT Creation](post-put.html)
* [Long Running Operation with Polling](long-running-operation-polling.html)

### Resource Discovery Patterns

The [HATEOAS (*Hypermedia as the engine of application state*) constraint](rest.html), promotes the design of APIs featuring a single entry point URI, and the dynamic resource discovery based on hypermedia. However, the entry point URI might not lead directly to the resource needed by the client, due to access rights, or the resource being moved to a different location, or the resource being part of a collection of resources. Therefore, these patterns help to discover resources in such situations. 

* Server-side Redirection with Status Codes
* Client-side Navigation following Hyperlinks
* Incremental Collection Traversal

### Resource Editing Patterns

The read-only Web is long gone and editing resources has become a common operation which can be performed using these patterns.  

* (Partial) Resource Editing
* Conditional Update for Large Resources

Depending on the resource's content, some or all of the CRUD (Create, Read, Update, Delete) operations might be available only to a restricted group of clients. Client's access rights can be controlled using these patterns.

### Resource Protection Patterns

* Basic Resource Authentication
* Cookies-based Authentication


## License

We plan to publish this content under a non-commercial Creative Commons license. But until the clarification of some legal issues, the copyright stays with the authors.

