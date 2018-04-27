---
title: "Resource embedding"
description: ""
layout: "guide"
icon: "flash"
weight: 4
---

<article id="1">

## Context

Most of the times, an API models not only a single resource, but a bigger or smaller bunch of them. Thus, there will probably be different endpoints in the API to retrieve or operate with different kind of resources.

For example, if there is an Endpoint to retrieve information about a member:

```
GET /api/member/15
```

that will return

```javascript
{
      "gender": "female",
      "alias": "Sophie",
      "name": "Sophia Hart",
      "birthDate": "1975-04-12T00:00Z",
      "email": "sophia.hart@example.com"
}
```

Let’s suppose that the API provider, also keeps the articles, or blog posts, or short publications (aka micro-posts) that members can write. So, let’s say in this case that there is  another endpoint to return an specific published micro-message:

```
GET /api/posts/42
```

```javascript
{
	"articleBody" : "Creating Evolvable APIs is possible. See http://evolvable-apis.org",
	"dateCreated" : "2018-04-12T19:57Z",
	"author" : "15"
}
```

So, in this case there are two different resources that have some kind of relationship between them: the members create posts, and the posts are authored by a member.

</article>

<article id="2">

## Need

The most probable situation for customers consuming this API will be that they want to show, not only the post content, but also some information about the author (at least the name).

With the current API design, those customers, will need to make two requests: one for the post and, once the author_id is parsed, another one to retrieve the author name and any other member information useful to show together with the micro-post (i.e the user profile picture).

The situation gets worse in the case that the endpoint used returns a collection with the latest 50 messages, because you will (in worst case) increase the number of request to 51: one for the collection of messages and then, one for each of the authors of the messages. (You could cache the information of authors in case some messages are written by the same member, but if you have too many different members, you could end up again doing 51 requests to the server).

</article>

<article id="3">

## Solution

We need to address a couple of changes in this context.

### Step one: Declare relationships between resources.

The first task that we should deal with is how we express that the author is a relationship with another entity.

With the approach shown, there is no way to know that the value of the "author" attribute is an id for another resource represented under other URL. There is no specific info that helps the customer to know if that “15” value is the id, or the name, or an alias, (or any other attribute) from the author. On top of that, there is no specific information on how to access the rest of the information of the author.

A first idea could be changing the name of the attribute name from "author" to “author_id” to express that this is, in fact, an Id of another resource. But this still does not completely give semantic information on how a client should deal with author Id.

Instead, we should declare specifically in our contract, that the author is, in fact, a relationship with another resource. For example, [HAL](https://tools.ietf.org/html/draft-kelly-json-hal-08#page-4) specification for \_links, reserves the attribute "\_links" to add all the attributes that are relation types.

That way, our representation could have this structure:

```javascript
{
  "_links" : {
    "author" : { "href" : "http://example.org/api/member/15"}
  },
  "articleBody" : "Creating Evolvable APIs is possible. See http://evolvable-apis.org",
  "dateCreated" : "2018-04-12T19:57Z",
}
```

Once that the response format includes the specific links, it is also a good practice to introduce a special link, under the attribute of "\_self",  which contains the URL to the resource described in the document:

```javascript
{
  "_links" : {
    "self" : { "href" : "http://example.org/api/posts/42" },
    "author" : { "href" : "http://example.org/api/member/15" }
  },
  "articleBody" : "Creating Evolvable APIs is possible. See http://evolvable-apis.org",
  "dateCreated" : "2018-04-12T19:57Z",
}
```

This structure is one possible solution to express relationships between resources as specified by HAL. There are other alternatives following JSON-API, Siren, … follow the format that best fits your needs.

#### Step two: Embed the related resource

With the previous step, the relationship for the attribute "author" is more clearly defined and the semantic of how to use that is already defined by the fact that is marked as a link. But, still, the client will need to make a second request to retrieve the details of the member who wrote the message as it is specified in the related URL.

In order to avoid that second request the API should provide a way to allow the customer to specify the nested information that they are interested in the very first request.

For that purpose the API implementor should check the query string and look if a ‘includes’ parameter is present. The value of that parameter should be handled by the API provider as a comma-separated list of the different relationships that should be included on the response.

In the case of the example, to get the message with id 42 including all the information about the author, the customer will simply send the following request:

```
GET /api/posts/42?includes=author
```

This way, the API provider will know that it needs to also retrieve and return the embedded data for the author. Following the JSON-API format, the provider should add the author data o a new "included" attribute of the Json returned:

```javascript
{
  "_links" : {
    "self" : { "href" : "http://example.org/api/posts/42" },
    "author" : { "href" : "http://example.org/api/member/15" }
  },
  "articleBody" : "Creating Evolvable APIs is possible. See http://evolvable-apis.org",
  "dateCreated" : "2018-04-12T19:57Z",
  "_embedded" : {
    "author" : {
      "_links" : {
        "self" :  { "href" : "http://example.org/api/member/15" }
      },
      "id" : "15",
      "gender": "female",
      "alias": "Sophie",
      "name": "Sophia Hart",
      "birthDate": "1975-04-12T00:00Z",
      "email": "sophia.hart@example.com"
    }
  }
}
```

#### Step three: Specifying which attributes of the embedded resource should be included

We could go further to allow the customer to specify which fields (attributes) of the embedded resource should be included.

Combining the embedding with the sparse-fieldset feature, the customer could combine the include and fields param in the query string to whitelist the attributes that should be included in the response.

By default, as it is explained on the sparse-fieldsets recipe, the values specified in the fields param refers to the main resource requested in the URL, but whe can refer to the embedded resource by adding the entity type between brackets.

So, a request like

```
GET /api/posts/42?include=author&fields[person]=name
```

Instructs the API provider to simply add the name of the embedded resource:

```javascript
{
  "_links" : {
    "self" : { "href" : "http://example.org/api/posts/42" },
    "author" : { "href" : "http://example.org/api/member/15" }
  },
  "articleBody" : "Creating Evolvable APIs is possible. See http://evolvable-apis.org",
  "dateCreated" : "2018-04-12T19:57Z",
  "_embedded" : {
    "author" : {
      "_links" : {
        "self" :  { "href" : "http://example.org/api/member/15" }
      },
      "name": "Sophia Hart"
    }
  }
}
```

{call DocsList.render}
	{param section: $page /}
{/call}

</article>
