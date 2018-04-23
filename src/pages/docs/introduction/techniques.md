---
title: "Useful techniques to make your APIs evolvable"
description: ""
layout: "guide"
icon: "flash"
weight: 2
---


As stated in the previous sections, there is several different facets that help to build Evolvable APIs.

There are some which can be considered as techniques that can be implemented in different ways (like Hypermedia, which is a concept but can several different implementations), other are a set of guidelines, patterns or standards. We can consider it as the **building blocks** that make possible Evolvable APIs.

<article id="1">

## Hypermedia

Consumers, like mobile apps, should not hardcode the navigation from one user interface (let it be a screen, a web page or a panel) to another. It should neither specify directly the actions that the user can take in each screen.

Then, how can consumers of an API face the navigation of the application through all the different unknown possibilities that hide behind the API contract?

To enable this, each API response should provide a list of possible operation as either read-only links or actions. Each operation has a type (e.g., IANA link relations) that the consumer knows how to deal with (e.g., follow a link automatically, present an action to a user, etc...). APIs using hypermedia let the API provider control the available operations, which simplifies the consumer and decouples it from the server.

To support a wide variety of functionality provided by an API, a consumer only needs to support one standard hypermedia format, and follow standard link types (e.g., IANA link relations).

That way, Hypermedia, can be seen as the mechanism that enables the autodiscovering (or scouting) of all the different resources, and actions that the server can provide.

</article>

<article id="2">

## Shared Vocabularies

Use the language that everyone understands.

It’s useful to speak a language that will result familiar to the developers of clients for your APIs. Using the same language means less misunderstandings, and it eases other participants to start talking to your APIhelps new participants to join the conversation with you. Using your own slang or assigning specific meanings you only know, will make more difficult to others to understand what you are saying.

Any organization, group or individual has a different way to communicate depending on the context in which they are. For example: you can refer to things with an informal name when you are talking to your kids, or you can use slang when talking with your friends, or you can have specific aliases or specific names for certain concepts inside your company, even specific properties….

But when you need to communicate with the external world, let’s say you need to write an article for the press, negotiate something with someone that does not belong to your inner circle, or prepare some marketing messages, in that case, you will probably switch to a common standard way of expressing things to ensure that your partner understands the same thing you are expressing.

That is: when you get out of your inner group, organization or ambient, you won’t want to use your specific words that maybe you only understand, you will use the concepts and words that you know everyone out there will assign the same meaning that you.

With your API the same rule applies: Your internal model, your concrete naming, your specific attributes should be kept for your inner realm. Instead, you should expose the resources, attributes and concepts with not only a naming, also a structure, typing and possible constraint rules on its values that are of common use.

That way you can leverage your API to be well used by a broad set of consumers, that will be understanding and using your contract with a common meaning.

For that matter, there are some already agreed standard vocabularies (e.g, schema.org) that you can use and even extend if you need to. But the key point here is that you are using a common way to name and structure the model you expose.

Of course, that will mean that you need to find a way to ‘translate’ between your internal model and the public model using that standard vocabularies. But you can use the Representor pattern to accomplish that and decouple the internal model and external contract.

The main benefit of leveraging standard vocabularies  is that API developers can make internal changes freely. Consumer developers therefore benefit from much more reuse across applications.

</article>

<article id="3">

## Standards

Part of the key to succeed in any environment is the ability to do the things in the same way that everyone does, that is sticking to the standards.

And that’s what also made the Web succeed, scale and adapt to the evolution.

For your API, you will find useful to use Standards whenever they are available and they address one of your needs. For example:

* HTTP as communication protocol (not just transport protocol), with their methods, headers, response codes and all the semantincs that are already defined in it. Have I heard anyone thinking in REST? ;)

* Hypermedia MIME types. Choose at least one (or more) of the defined standards to communicate the navigation and options that the client can take. There are several different ones: HAL, Siren, JSON-LD, Collection+JSON… Read of them and chose whichever best fits your needs.

* IANA Link Relations. If you need to add links between resources. (some Hypermedia Types are already using IANA Link Relations.

</article>

<article id="4">

## Representor Pattern

The representor pattern is a technique that allows you to decouple the internal model from the shared vocabulary you will expose in your contract

The representor pattern means that will will add a component that will handle the resource that you want to serve as part of your API and will build a Representation of that resource adapted to what the customer needs or is allowed to receive.

That means that you will convert your model to the shared vocabulary, but, also this is the component in which you could filter out specific information that one client should not see based on any security constraint or linked to an authorization process in your API.

[The Representor pattern can be used both in API producers and consumers.](https://github.com/the-hypermedia-project/charter#representor-pattern)

</article>

<article id="5">

## Versioning your API Contract

Every API defines a contract that the API clients depend on. The contract may be composed of URLs, HTTP methods, error codes, message types, input params and much more. If the contract changes in a backwards incompatible way it is likely that consumers will break. What’s the best way to deal with that situation?

The most evolvable way is by making your contract small enough and solid enough that you will never need to break backwards compatibility. This may sound too idealistic for people who are used to API contracts which very large surface areas such as a large list of resource URLs with careful documentation for what can be done with each of them, the input and output formats, error codes, etc. But by applying the recipes from this website you will find ways to reduce the size of the API contract, and then, not breaking backwards compatibility suddenly doesn’t seem so difficult.

However, in some cases, it might be necessary to make backwards incompatible changes. In that case versioning is the least bad option. But there are many ways of doing versioning, what is the best way of doing it? Here are some suggestions:

* Don’t version upfront unless you know for sure that you will need to break backwards compatibility.

* Avoid versioning the whole API if only certain parts of it will have to change in a backwards incompatible way.

* Isolate the areas of the API that might have to be changed. Try to find a way to not make them part of the contract and use some discoverability features instead. For that areas where it’s not possible find a way to version only the bare minimum, for example through MIME type versioning.

{call DocsList.render}
	{param section: $page /}
{/call}

</article>
