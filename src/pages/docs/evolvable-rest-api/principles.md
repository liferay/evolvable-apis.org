---
title: "Principles"
description: "Web APIs are a key enabler of the ability to offer consistent experiences across every channel. This is achieved by facilitating the reuse of a common core of data and business logic from a wide variety of devices, including mobile phones, watches, IoT devices, etc. Web APIs are also a fundamental piece in the construction of microservice architectures, allowing for efficient communication of independent microservices while maintaining loose coupling."
layout: "guide"
icon: "flash"
weight: 2
---

<article id="1">

## Principles

###### {$page.description}

The following principles guide all the rules in the Evolvable REST API Guidelines and make them very appropriate for each of these scenarios.

</article>

<article id="2">

## Simplicity
One of the goals of any API is to attract as many developers as possible. It is therefore critical that the API be self-describing and simple, helping developers intuitively learn how to use without without relying on documentation. The API must suggest its own usage.

</article>

<article id="3">

## Loose Coupling
When services are loosely coupled, a change to one service should not require a change to another. When designing distributed systems, this general principle becomes of even greater importance. Evolvable REST APIs must embrace it, favouring API designs that decouple the provider of an API from any of its consumers, be it a microservice, mobile device, IoT device or any other.

APIs must also be designed to be able to evolve gracefully, without introducing backwards incompatible changes. This allows introducing new capabilities over time without requiring consumers to be changed until those capabilities are needed for them.

</article>

<article id="4">

## Consistency
Consistency is a key ingredient of software that is built for the long run, even more so for distributed software. Consistency not only can speed up development and reduce the learning curve but also reduces the maintenance cost. Evolvable REST APIs must be consistent with one another, adopting the same principles and recommendations, including those described in this guide.

</article>

<article id="5">

## Efficiency
For consumers that access an API across a low-bandwidth channel, it’s critical that the amount of data transmitted can be reduced. When the consumer is being executed in a device with reduced processing power or battery, the format of the the data received should be cheap to parse. In distributed software environments, such as in microservice architectures, reducing the latency when invoking APIs is specially important.
APIs should be designed with this efficiency constraints in mind. For example, consumers must be provided with mechanisms to control the format and amount of data returned from a request.


{call DocsList.render}
	{param section: $page /}
{/call}

</article>
