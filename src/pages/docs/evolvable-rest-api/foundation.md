---
title: "Foundation"
description: ""
layout: "guide"
icon: "flash"
weight: 3
---

<article id="1">

## HTTP Methods
Evolvable REST APIs MUST use the HTTP methods strictly according to the semantics are defined by [RFC 2616](https://www.w3.org/Protocols/rfc2616/rfc2616.html).

### Use HTTP Methods Strictly

The following table provides a summary of the key characteristics of the most frequently used HTTP methods:


|Method|Safe|Idempotent|Body|Common usage|
|------|----|----------|----|------------|
|GET|X|X| |Get the representation of a resource.|
|POST| | |X|Create a resource / Start an operation.|
|PUT| |X|X|Full update of a resource. Can also be used to create a resource when the client defines the identifier (URI).|
|DELETE| |X| |Delete a resource.|
|PATCH| | |X|Partial update of a resource.|
|OPTIONS|X|X| |Get the methods supported by a resource, through the “Allow” HTTP Header in the response, and optionally more detailed information in the body.|
|HEAD|X|X| |Obtain the same behavior as GET but the without the response body. Often used to save bandwidth when the consumer is unsure whether the body will be needed.|


### Leverage Idempotency

GET, PUT, HEAD, OPTIONS MUST be treated as idempotent actions.

API consumers SHOULD leverage idempotency, retrying failed requests using these methods, instead of directly escalating an error.

</article>

<article id="2">

## Resource Design

### Use URIs a resource identifiers
Each resource returned by the Evolvable REST API MUST be identified by a unique URI. Some identifiers MAY be also reachable in the form of HTTP URLs, but  not all of them. These identifiers will be included in the response following the rules of the specific format used (e.g. @id attribute in HAL)

### Consumers must not interpret the URI format
Evolvable REST APIs treat URIs as opaque resource identifiers. Because of that the design of the URL format is irrelevant. API developers should not spend time designing URL format and instead follow simple and consistent patterns that are easy to implement.

URL Templates can be provided to inform the consumers of how to construct URLs for specific purposes.

Consumer developers should never try to infer the structure of a URL or build URLs via code unless it’s guided by a URL template provided in an API response.

API designers MAY design URLs taking into consideration guidelines for search engine optimization (SEO). This may be particularly useful when the API is used to build Web Applications and there is a desire for the application and its content to be indexed by search engines.

### Stable URLs

Evolvable REST APIs SHOULD not change URLs that is used as an identifier of a resource. In cases when the URL changes, the old URL MUST still work and respond to a GET operation with a permanent redirect (response code 301) to the new URL.

URLs used to perform searches, filters, or in general operations that can be repeated using the provided affordances MAY be changed.

### Limit the length of URIs

The HTTP protocol does not place any a priori limit on the length of a URI, however the software that process them do sometimes have limits. In particular some proxies, search engines and browsers are known to be able to handle URI up to a certain number of characters.

To correctly render in all scenarios, URIs SHOULD be shorter than 2,083 characters.

### Leverage common resource patterns

Evolvable REST APIs are resource oriented, based on defining named resources that can be manipulated using a limited set of predefined methods. In HTTP the resources are identified by unique URIs. Access to resources must always be done in a stateless way.

The following subsections define the most common type of resource patterns and the guidelines that API developers must follow for each of them.

#### Collection resources

A common pattern in resource oriented design is a set of resources that represent a collection and the elements within the collection. Some operations are common in this kind of resources, such as Pagination or Filtering, so all Collection Resources MUST support the same set of operations.

Collections Resources MUST be named with a plural noun.

#### Single resources

Single resources represent an entity exposed by the API, including relationships to other resources. Single resources MAY support all CRUD operations or just some of them.

Single resources MUST be named with a singular noun.

#### Operation resources

Operation Resources are resources whose only purpose is to provide the ability for a consumer to perform an operation. This type of resources only response to one HTTP method: POST.

API developers SHOULD only use Operation Resources as a last resort, for cases when the other types of resources do not apply. In particular, whenever idempotent behaviour is possible, using PUT is preferred to allow consumers (or intermediaries) to retry in those cases when the response is not received.

#### Long running operations

One specific case of Operation Resources are those operations that are run in an asynchronous way. In this operations, the initial POST requests signals the beginning of the task (or the enqueue) and the API will return

- `202 Accepted` if the operation could be enqueued successfully. The operation identifier URL will be included in the payload
- `302 See other` if the operation is already enqueued. The operation identifier URL will be included in the Location header.
- `409 Conflict` if the operation couldn’t be enqueued. The payload will include error details in a standard format (such as problem+json)

</article>

<article id="3">

## Security

### Require Secure Connections

Access to APIs SHOULD be provided via TLS/SSL exclusively. Any non-SSL request must be ignored or, when not possible, responded with the `403 Forbidden`.

### Support Cross Origin Resources

Evolvable REST API’s SHOULD support Cross Origin Resource Sharing (CORS) for AJAX requests from any origin. APIs supporting CORS must follow the [CORS W3C Recommendation](http://www.w3.org/TR/cors/). The [Guide to Secure Implementation of HTML5's Cross Origin Requests](https://code.google.com/archive/p/html5security/wikis/CrossOriginRequestSecurity.wiki) is a recommended resource for API developers and consumer developers new to CORS.

### Authentication and Authorization

Evolvable REST APIs MAY have resources protected by authentication and authorization mechanisms.
Requests that require authentication MAY return `404 Not Found`, instead of `403 Forbidden` for security reasons.

</article>

<article id="4">

## Versioning

Evolvable REST APIs are designed from the ground up for evolvability, avoiding the need for backwards incompatible changes in most scenarios.
Introducing a backwards incompatible change could still happen and needs to be accounted for. However, because it won’t happen often APIs MUST not use versioning in any way that complicates development of the consumer. Specifically, Evolvable REST APIs MUST never introduce version numbers or any other version identifier in URLs.

Evolvable REST API implementations can specify the implementation version as an HTTP header to be used for debugging purposes.

### Don't break the API contract

### Don't include version information in URIs

Evolvable REST APIs MUST NOT include version information in the URIs. Doing so would go against using URIs as resource identifiers.

Evolvable REST APIs MAY provide version information in some other ways, such as HTTP Headers or in the body of the responses for informative or debugging purposes. Evolvable REST API Consumers SHOULD NOT use version information automatically to change its behavior.

</article>

<article id="5">

## API Profile

Evolvable REST APIs MUST provide an API profile that describes the following elements of the API:

- Types that might be included in API responses. Each type MUST have:
  - A human readable description of the type
  - URL identifier of the type (e.g. http://schema.org/Person), which MAY be resolvable to obtain a full description.
  - A list of attributes that describe the type. Evolvable REST API developers MAY use attributes defined by schema.org. Each attribute MUST have:
    - A human readable description of the attribute
    - URL identifier of the attribute (e.g. http://schema.org/givenName), which MAY be resolvable to obtain a full description.

- Hypermedia controls that might be included in API responses. APIs SHOULD use standard link relation names as defined by IANA Link Relations. APIs MAY use custom link relation names for needs not covered by existing standards.
  - Hypermedia controls can be of two types:
    - Links: Using URLs as defined by RFC3986
    - URI Templates as defined by RFC6570
  - The profile should specify, for each Hypermedia control, whether it represents a “safe” (e.g. GET, HEAD), an “idempotent” (e.g. PUT, DELETE) or an “unsafe” (e.g. POST) operation.

The API Profile SHOULD be published using the Application-Level Profile Semantics (ALPS) format. Additional API profile formats MAY also be used.

A link to the profile must be provided in the response to the root endpoint using the “profile” link relation.

The API Profile MUST act as a complete contract for the API. No additional documentation should be necessary to build consumers of the API.

{call DocsList.render}
	{param section: $page /}
{/call}

</article>
