---
title: "Versioning your API contract"
description: ""
layout: "guide"
icon: "flash"
weight: 3
---




<article id="1">

## Versions

Every API defines a contract that the clients depend on. The contract may be composed of URLs, HTTP methods, error codes, message types, input params and much more. If the contract changes in a backwards incompatible way it is likely that consumers will break. What’s the best way to deal with that situation?

The most evolvable way is by making your contract small enough and solid enough that you will never need to break backwards compatibility. This may sound too idealistic for people who are used to API contracts which very large surface areas such as a large list of resource URLs with careful documentation for what can be done with each of them, the input and output formats, error codes, etc. But by applying the recipes from this website you will find ways to reduce the size of the API contract, and then, not breaking backwards compatibility suddenly doesn’t seem so difficult.

However, in some cases, it might be necessary to make backwards incompatible changes. In that case versioning is the least bad option. But there are many ways of doing versioning, what is the best way of doing it? Here are some suggestions:

- Don’t version upfront unless you know for sure that you will need to break backwards compatibility.
- Avoid versioning the whole API if only certain parts of it will have to change in a backwards incompatible way.
- Isolate the areas of the API that might have to be changed. Try to find a way to not make them part of the contract and use some discoverability features instead. For that areas where it’s not possible find a way to version only the bare minimum, for example through MIME type versioning.

{call DocsList.render}
	{param section: $page /}
{/call}

</article>
