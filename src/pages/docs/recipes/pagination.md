---
title: "Pagination"
description: ""
layout: "guide"
icon: "flash"
weight: 2
---

<article id="1">

Let’s say that you have created a service that returns the list of members (persons) of your site. Initially, you modeled the list to contain the basic information for each of those persons:

```
GET api/members
```

And the service returns that list, for example with the following structure:

```javascript
{
   "members" : [
     {
      "gender": "female",
      "name": "Sophia Hart",
      "birthDate": "1975-04-12T00:00Z",
      "email": "sophia.hart@example.com",
     },
     {
      "gender": "male",
      "name": "John Doe",
      "birthDate": "1977-03-15T00:00Z",
      "email": "john.doe@email.com",
     }     
   ]
}
```

And it seems right at first, it serves it purpose. But soon new members start to register to your site, and the list starts growing, and growing until it reaches for example 1.000 users.

That’s a big amount of information to retrieve at once, and, on top of that, probably your API consumer is not going to show to its user all that information at once (the user probably won’t go through a 1.000 items list in any case).

At that point you decide that you need to add some pagination mechanism (you will also add want to add filtering mechanisms to your API, but you still will benefit from pagination in the case the request does not include any filtering criteria).

So, let’s start with an outline of which information is important to handle the pagination:

1. The first, of course is the list of contents (in this case, the members). That does not change

2. Adding information on the page in which you are, the number of elements contained on the page, optionally the total number of elements (or approximation) or the total number of pages.

3. Some links to navigate to

    * The next page of the search (if there is one)s

    * The previous page (if you are not returning the first one)

    * The very first page.

    * Optionally the very last page.

So, the first change to our response design will be to wrap, or embed the list of items in an specific property which contains that list:

```javascript
{
  "_embedded" : {
    "members" : [

        /*...*/
     ]
  }
}
```

Now we can add the information of the number of elements, and how many elements we are returning as part of the current page:

```javascript
{
  "count" : 20,
  "total" : 1017,
  "_embedded" : {
    "members" : [
        /*...*/
     ]
  }
}
```

Now, the last step is adding, information to allow to navigate to the first, previous and/or next pages, depending on the page that your are returning. In order to add those links, we are going to stick to the standards, and there is one that addresses specifically how to add links: The [IANA Link relations](https://www.iana.org/assignments/link-relations/link-relations.xml). We will group all those navigation links under the same attribute:

```javascript
{
  "_links": {
      "self": {
          "href": "http://example.org/api/members?page=3"
      },
      "first": {
          "href": "http://example.org/api/members"
      },
      "prev": {
          "href": "http://example.org/api/members?page=2"
      },
      "next": {
          "href": "http://example.org/api/members?page=4"
      },
      "last": {
          "href": "http://example.org/api/members?page=51"
      }
  },
  "count" : 20,
  "total" : 1017,
  "_embedded" : {
    "members" : [
       {
        "gender": "female",
        "name": "Sophia Hart",
        "birthDate": "1975-04-12T00:00Z",
        "email": "sophia.hart@example.com",
       },
       {
        "gender": "male",
        "name": "John Doe",
        "birthDate": "1977-03-15T00:00Z",
        "email": "john.doe@email.com",
       }     
     ]
  }
}
```

In this example, we have used the structure and attribute names that [HAL](https://en.wikipedia.org/wiki/Hypertext_Application_Language) proposes. There are some other alternatives based on Collection+JSON, Siren, or others.


{call DocsList.render}
	{param section: $page /}
{/call}


</article>
