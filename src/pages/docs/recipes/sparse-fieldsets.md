---
title: "Sparse Fieldsets"
description: ""
layout: "guide"
icon: "flash"
weight: 3
---

<article id="1">

Sometimes our API returns a representation for a resource which includes a lot of information that the API provider keeps on the information, but if you think on the different kind of consumers that you will serve and, more specifically, the possible constraints that they have, maybe it’s useful if your API allows them to specify a shorter list of attributes that they want to retrieve (instead of the whole representation of the resource).

For example, think on an IoT device, which is interested in using just a single property (or a few information) of the resource for which is requesting a representation. If you also take into account that maybe the device is sending the request (and retrieving the response) using a connection that does not has very good bandwidth, it makes more sense to allow to send back just 1Kb of data, that corresponds to the information that the consumer really is interested in, instead of -let’s say- the 14kb of data used for the represent the resource in its full extend.

Another scenario in which filtering this feature for your API could be useful is when a mobile application is retrieving a representation of a resource, but, because the space constraints of the screen in which that information will be displayed, some of the attributes will not be rendered. Here, the mobile app -your API customer in this case- will benefit of a more effective bandwidth usage if they can just inform your API which information they are interested in.

So, how the API provider can allow the customer to specify the specific information that they want in the response?

Let’s start from our service that returns the information for a member (a person) of our site:

```
GET /api/member/15
```
And the server’s response includes the following representation of the requested person:

```
{
  **"gender"**: "female",
  **"alias"**: "Sophie",
  **"name"**: "Sophia Hart",
  **"jobTitle"** : "Senior Executive",
  **"birthDate"**: "1975-04-12T00:00Z",
  **"birthPlace"** : {
    **"@type"**: "Place",
    **"address"**: {
      **"@type"**: "PostalAddress",
      **"addressLocality"**: "Philadelphia",
      **"addressRegion"**: "PA"
    }
  },
  **"email"**: "sophia.hart@example.com",
  **"telephone"**: "555-984-394"
}
```

Let’s say that the customer is just going to show the contact data for the user: the name, the job title and email and phone if they are present.

We can prepare the API so that the list of requested fields can be specified in the URL of the request, using the fields param with a comma separated list of the attributes.

```
GET /api/member/15?fields=name,jobTitle,email,telephone
```

And the API provider will reply with a partial response like the following one:

```
{
  **"name"**: "Sophia Hart",
  **"jobTitle"** : "Senior Executive",
  **"email"**: "sophia.hart@example.com",
  **"telephone"**: "555-984-394"
}
```

For this feature, it’s really useful the use of Shared Vocabularies (i.e resources represented following the definition in [schema.org](http://schema.org/)) it will allow the client to know beforehand the list of fields that wants in the response, even without doing any initial request to examine the structure of the response.

The usefulness of this feature can be even better when we add this support to collections. For example compare:

```
GET api/members
```

And the subsequent response with all the information:

```
{
   **"members"** : [
      {
        **"gender"**: "female",
        **"alias"**: "Sophie",
        **"name"**: "Sophia Hart",
        **"jobTitle"** : "Senior Executive",
        **"birthDate"**: "1975-04-12T00:00Z",
        **"birthPlace"** : {
          **"@type"**: "Place",
          **"address"**: {
            **"@type"**: "PostalAddress",
            **"addressLocality"**: "Philadelphia",
            **"addressRegion"**: "PA"
          }
        },
        **"email"**: "sophia.hart@example.com",
        **"telephone"**: "555-984-394"
      },
      {
        **"gender"**: "male",
        **"alias"**: "jdoe",
        **"name"**: "John Doe",
        **"jobTitle"**: "Sales Manager",
        **"birthDate"**: "1977-03-15T00:00Z",
        **"birthPlace"** : {
          **"@type"**: "Place",
          **"address"**: {
            **"@type"**: "PostalAddress",
            **"addressLocality"**: "Los Angeles",
            **"addressRegion"**: "LA"
          }
        },
        **"email"**: "john.doe@email.com",
        **"telephone"**: "555-984-394"
      }     
   ]
}
```

With a request in which your customer is asking just for the specific information that it’s going to show or use on a table to the user:

```
GET api/members?fields=name,jobTitle
```

```
{
   **"members"** : [
      {
        **"name"**: "Sophia Hart",
        **"jobTitle"** : "Senior Executive"
      },
      {
        **"name"**: "John Doe",
        **"jobTitle"**: "Sales Manager"
      }     
   ]
}
```
{call DocsList.render}
	{param section: $page /}
{/call}


</article>
