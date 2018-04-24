var pageComponent=webpackJsonppageComponent([3],{282:function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{default:e}}function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function a(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var s=n(1),l=o(s),u=n(2),p=o(u);n(6),n(7),n(8),n(9),n(10),n(11),n(12),n(13),n(14),n(15),n(16),n(17),n(18),n(19),n(20);var h=n(283),c=o(h),d=function(e){function t(){return r(this,t),i(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return a(t,e),t}(l.default);p.default.register(d,c.default),t.default=d},283:function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{default:e}}function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function a(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0}),t.templates=t.gbRwm=void 0;var s,l=n(1),u=o(l),p=n(2),h=o(p);goog.loadModule(function(e){function t(e,t,o){var s=function(){r("article",null,null,"id","1"),r("h2"),a("Context"),i("h2"),r("p"),a("Sometimes our API returns a representation for a resource which includes a lot of information that the API provider keeps on the information, but if you think on the different kind of consumers that you will serve and, more specifically, the possible constraints that they have, maybe it’s useful if your API allows them to specify a shorter list of attributes that they want to retrieve (instead of the whole representation of the resource)."),i("p"),i("article"),r("article",null,null,"id","2"),r("h2"),a("Need"),i("h2"),r("p"),a("For example, think on an IoT device, which is interested in using just a single property (or a few information) of the resource for which is requesting a representation. If you also take into account that maybe the device is sending the request (and retrieving the response) using a connection that does not has very good bandwidth, it makes more sense to allow to send back just 1Kb of data, that corresponds to the information that the consumer really is interested in, instead of -let’s say- the 14kb of data used for the represent the resource in its full extend."),i("p"),r("p"),a("Another scenario in which filtering this feature for your API could be useful is when a mobile application is retrieving a representation of a resource, but, because the space constraints of the screen in which that information will be displayed, some of the attributes will not be rendered. Here, the mobile app -your API customer in this case- will benefit of a more effective bandwidth usage if they can just inform your API which information they are interested in."),i("p"),r("p"),a("So, how the API provider can allow the customer to specify the specific information that they want in the response?"),i("p"),r("p"),a("Let’s start from our service that returns the information for a member (a person) of our site:"),i("p"),u({code:"GET /api/member/15",mode:"text"},null,o),r("p"),a("And the server’s response includes the following representation of the requested person:"),i("p"),u({code:'{\n  "gender": "female",\n  "alias": "Sophie",\n  "name": "Sophia Hart",\n  "jobTitle" : "Senior Executive",\n  "birthDate": "1975-04-12T00:00Z",\n  "birthPlace" : {\n    "@type": "Place",\n    "address": {\n      "@type": "PostalAddress",\n      "addressLocality": "Philadelphia",\n      "addressRegion": "PA"\n    }\n  },\n  "email": "sophia.hart@example.com",\n  "telephone": "555-984-394"\n}',mode:"javascript"},null,o),r("p"),a("Let’s say that the customer is just going to show the contact data for the user: the name, the job title and email and phone if they are present."),i("p"),i("article"),r("article",null,null,"id","3"),r("h2"),a("Solution"),i("h2"),r("p"),a("We can prepare the API so that the list of requested fields can be specified in the URL of the request, using the fields param with a comma separated list of the attributes."),i("p"),u({code:"GET /api/member/15?fields=name,jobTitle,email,telephone",mode:"text"},null,o),r("p"),a("And the API provider will reply with a partial response like the following one:"),i("p"),u({code:'{\n  "name": "Sophia Hart",\n  "jobTitle" : "Senior Executive",\n  "email": "sophia.hart@example.com",\n  "telephone": "555-984-394"\n}',mode:"javascript"},null,o),r("p"),a("For this feature, it’s really useful the use of Shared Vocabularies (i.e resources represented following the definition in "),r("a",null,null,"href","http://schema.org/"),a("schema.org"),i("a"),a(") it will allow the client to know beforehand the list of fields that wants in the response, even without doing any initial request to examine the structure of the response."),i("p"),r("p"),a("The usefulness of this feature can be even better when we add this support to collections. For example compare:"),i("p"),u({code:"GET api/members",mode:"text"},null,o),r("p"),a("And the subsequent response with all the information:"),i("p"),u({code:'{\n   "members" : [\n      {\n        "gender": "female",\n        "alias": "Sophie",\n        "name": "Sophia Hart",\n        "jobTitle" : "Senior Executive",\n        "birthDate": "1975-04-12T00:00Z",\n        "birthPlace" : {\n          "@type": "Place",\n          "address": {\n            "@type": "PostalAddress",\n            "addressLocality": "Philadelphia",\n            "addressRegion": "PA"\n          }\n        },\n        "email": "sophia.hart@example.com",\n        "telephone": "555-984-394"\n      },\n      {\n        "gender": "male",\n        "alias": "jdoe",\n        "name": "John Doe",\n        "jobTitle": "Sales Manager",\n        "birthDate": "1977-03-15T00:00Z",\n        "birthPlace" : {\n          "@type": "Place",\n          "address": {\n            "@type": "PostalAddress",\n            "addressLocality": "Los Angeles",\n            "addressRegion": "LA"\n          }\n        },\n        "email": "john.doe@email.com",\n        "telephone": "555-984-394"\n      }     \n   ]\n}',mode:"javascript"},null,o),r("p"),a("With a request in which your customer is asking just for the specific information that it’s going to show or use on a table to the user:"),i("p"),u({code:"GET api/members?fields=name,jobTitle",mode:"text"},null,o),u({code:'{\n   "members" : [\n      {\n        "name": "Sophia Hart",\n        "jobTitle" : "Senior Executive"\n      },\n      {\n        "name": "John Doe",\n        "jobTitle": "Sales Manager"\n      }     \n   ]\n}',mode:"javascript"},null,o),r("p"),l({section:e.page},null,o),i("p"),i("article"),r("input",null,null,"type","hidden","value",e.page.title),i("input"),r("input",null,null,"type","hidden","value",e.site.title),i("input")};p(n.$$assignDefaults({content:s},e),null,o)}goog.module("gbRwm.incrementaldom");var n=goog.require("soy");goog.require("soydata");goog.require("goog.asserts"),goog.require("soy.asserts"),goog.require("goog.i18n.bidi"),goog.require("goog.string");var o=goog.require("incrementaldom"),r=o.elementOpen,i=o.elementClose,a=(o.elementVoid,o.elementOpenStart,o.elementOpenEnd,o.text),l=(o.attr,h.default.getTemplate("DocsList.incrementaldom","render")),u=h.default.getTemplate("ElectricCode.incrementaldom","render"),p=h.default.getTemplate("guide.incrementaldom","render");return e.render=t,goog.DEBUG&&(t.soyTemplateName="gbRwm.render"),e.render.params=["page","site"],e.render.types={page:"?",site:"?"},e.templates=s=e,e});var c=function(e){function t(){return r(this,t),i(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return a(t,e),t}(u.default);h.default.register(c,s),t.gbRwm=c,t.templates=s,t.default=s}},[282]);