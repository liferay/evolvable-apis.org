---
title: "Evolvable REST API Guidelines"
description: "The Evolvable REST API Guidelines provide a well defined set of mandatory and recommended rules for REST APIs designed to achieve a high degree of decoupling of API providers and all of its consumers. This decoupling allows the API to evolve over time without breaking any of the consumers."
layout: "guide"
icon: "code-file"
weight: 1
---
<article id="1">

## Introduction

###### {$page.description}

Evolvable REST APIs are specially useful in contexts where the consumers are not written by the same development team as the server side API. Even more so, when the deployment and update of the consumers is specially challenging, as happens with native mobile applications and even more so, consumers present in IoT devices.

These guidelines aim to achieve the following goals:
- Provide a set of rules that any developer can follow to develop their own highly decoupled Web APIs and consumers.
- Define a standard that developers can use as the basis for creating server-side or consumer-side libraries that facilitate the creation of Evolvable REST APIs.

These guidelines embrace the REST architectural style, with a special emphasis on using hypermedia as the engine of application state.
</article>

<article id="2">

## Conventions used in this document

This guide is a living document and additions to it will be made over time as new style and design patterns are adopted and approved. In that spirit, it is never going to be complete. The requirement level keywords `MUST`, `MUST NOT`, `REQUIRED`, `SHALL`, `SHALL NOT`, `SHOULD`, `SHOULD NOT`, `RECOMMENDED`, `MAY`, and `OPTIONAL` used in this document are to be interpreted as described in [RFC 2119](https://www.ietf.org/rfc/rfc2119.txt).


{call DocsList.render}
	{param section: $page /}
{/call}
</article>
