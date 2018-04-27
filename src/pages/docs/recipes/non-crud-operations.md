---
title: "Non-CRUD operations"
description: ""
layout: "guide"
icon: "flash"
weight: 3
---

<article id="1">

## Context

Once that we model our API to represent resources and accept operations on that resources, we will probably end with a set of resources (Nouns) that can be Created, Retrieved, Updated and Deleted. But then we can probably find ourselves in situation in which we want to model an operation which is going to trigger some unknown set of operations (from the point of view of the API customer) that will eventually change the state of the resource that we have model.

For example, let’s say that we have modelled our Members can be promoted to a different role (like site admins), and that will probably assign them new roles or modify some status.

For example you have your:

```
GET /api/member/15
```

That returns the following representation:

```javascript
{
      "gender": "female",
      "alias": "Sophie",
      "name": "Sophia Hart",
      "birthDate": "1975-04-12T00:00Z",
      "email": "sophia.hart@example.com",
      "memberOf": "regularUser"
}
```

</article>

<article id="2">

## Need

If you want to allow the possibility of clients adding the user to a new role, or group, you could argue that you could use a PUT updating the info of the member attribute to have the new desired role also.

But if that state change need to be approved by a supervisor, or implies that the user needs to confirm some of the step (like reading and accepting an agreement that is going to be sent on his email)?

In that case, what we are trying to add to our API is an action, an update that needs to trigger a set of actions, and maybe is going to take some time to update.

</article>

<article id="3">

## Solution

In this case, we need to rethink about that request in terms of intermediate state, and requests that can be referenced in time or, by the API consumers, in terms of *something* related to the *resource* we are modeling

That resource, in our case, it’s the original member, and that *‘something’* implies that the process of changing the state of our original resource (the member) is, in fact, also a noun (another resource) with a relationship with the member.

In this case, we could design our API to accept to post a new **MembershipRequest** linked to a **member** for  a particular **Role**. (Nouns, or resources, are marked in bold).

So, the original problem can be addressed by providing an endpoint to which we can make a POST

```
POST /api/member/15/membership-request
```

Modelling the state change as a request that will start a process (the review and approval) which eventually will end updating the attribute of our member has several different benefits:

* The request, as now is another noun, can be referenced

* We can track the status of the process, as long the request is linked to our original resource (the member)

* When the process is finished, if the API implementor decides to not delete the request once it is approved or rejected, we can have an historical record of what caused the change.

{call DocsList.render}
	{param section: $page /}
{/call}


</article>
