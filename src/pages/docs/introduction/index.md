---
title: "Introduction to Evolvable APIs"
description: "Evolvable REST APIs are specially useful in contexts where the consumers are not written by the same development team as the server side API. Even more so, when the deployment and update of the consumers is specially challenging, as happens with native mobile applications and even more so, consumers present in IoT devices."
layout: "guide"
icon: "streams"
weight: 1
---

{$page.description}

<article id="1">

## What makes an API Evolvable?

Long story short, an evolvable APIs is an API that has been decided to facilitate seamless evolution. This is achieved through set of characteristics, design principles and capabilities that confer the API the capability of evolving and adapting to changes without breaking any client that is already consuming it. And at the same time they allow clients to use them in a way that can discover and enhance its behaviour automatically when that evolution happens.

This could sound like an chasing "El Dorado", like an impossible goal to reach, but in fact it is not.

The web is almost 30 years old. If something has been proven key, is the capability of the Web to evolve gracefully over the years.

Can we learn something from the web? Can we reuse any of its design principles for our own Web APIs? Can we prepare them to evolve as seamlessly as the Web?

If we take a look at how some APIs are built today, we could think that unfortunately we can’t. It’s common in these days to be forced to update clients because a minor feature has been removed, changed or added in the server side.  Any API can become more evolvable and it’s our goal to show how.

But we think that, when necessary, we can bring some of those design principles and characteristics into the way we design and build Web APIs and take most of the benefits of Evolvability.

</article>

<article id="2">

## Should your API be evolvable?

The quick answer is "It depends". This is not a matter of black and white, of what is right and what is wrong. We are not trying to establish what is better in absolute terms.

Whenever it comes to designing your Web API, the first question you should ask yourself is What are your -or your customer’s- needs?

Don’t get this wrong, Evolvable APIs are not so difficult, but any API design decision must take into account costs and benefits

To create an Evolvable API, there are some design principles, techniques and tools that you need to consider when crafting your Web APIs. For each of those you take into account, it will probably add a little extra complexity or require specific work to be added to the contract, the construction process or the service consumption instructions.

Again, this is a balance game, maybe you don’t need all the features of a full Evolvable API, but still, you will probably want to benefit from one or more characteristics that they can bring to your API.

Our best advice is that you read through the following sections and decide what fits and what does not apply to your case or foreseeable near future.

Maybe you will discover that some solutions or techniques are a great fit for your API while others are not. That’s perfectly fine, nobody knows better than you what your API needs.

If you are interested in learning more about  Evolvable APIs, or how any of those features can affect or benefic your case, maybe you can go through our Use Cases sections in which we gather up some real cases in which Evolvable APIs have proved to release a serious pain for others.


{call DocsList.render}
	{param section: $page /}
{/call}
</article>
