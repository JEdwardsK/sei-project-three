# PubHub API Documentation
## PUBS
### Schema
All of the pub objects have the following data structure:

```javascript
{
  nameOfPub: { type: String, required: true }, \br
  address: {
    line1: { type: String, required: true },
    line2: { type: String },
    town: { type: String },
    city: { type: String, required: true },
    postCode: { type: String, required: true, maxlength: 10 }
  },
  description: { type: String },
  isOutsideSeating: { type: Boolean, required: true },
  isPetFriendly: { type: Boolean, required: true },
  isFoodServed: { type: Boolean, required: true },
  isLiveSports: { type: Boolean, required: true },
  image: { type: String, required: true }
}
```
### Get all Pubs( Index Route)
  - request type: get
  - url: _localhost:4000/api/pubs_
  - data target: list of all pubs

### Get single Pub (Show Route)
  - request type: get
  - url: _localhost:4000/api/pubs/:id_
  - data target: shows pub with matching id from _id

example:

localhost:4000/api/pubs/605b83662d9baa3672c1dede

```javascript
{
  _id: 605b83662d9baa3672c1dede,
  nameOfPub: Southampton Arms,
  address: {
    line1: 139 Highgate Rd,
    city: London,
    postCode: NW5 1LE
  },
  description: ’The sign outside announces ‘ale, cider, meat’, and that pretty much sums up what’s on offer at the best pub in Gospel Oak. The interior might make you think it’s still 1936, as would the cash-only policy. The addition of cheese and charcuterie boards to the offering of meaty bar snacks is about as modern as it gets here. The roster of lovingly tended ales and ciders, all from small independent producers, changes regularly. There’s also mulled cider. One of the many great things about the Southampton is that it retains its mixed clientele, long-time residents and newcomers alike – and of all ages. There’s also a pub dog. This is a true local hero.’,
  isOutsideSeating: false,
  isPetFriendly: true,
  isFoodServed: true,
  isLiveSports: false,
  image: https://beersmanchester.files.wordpress.com/2013/05/southampton-arms4.jpg,
  __v: 0
}
```
### Add One Pub (Create Route)
	- request type: post
	- url: _localhost:4000/api/pubs/_
	- data target: adds new pub to database

Must meet the minimum required structure above to create correctly.

### Edit Pub (Update Route)
	- request type: put
	- url: _localhost:4000/api/pubs/:id_ 
	- data target: update with specific id

Must meet the minimum required structure above to edit correctly.


### Delete Pub (Delete Route)
	  - request type: delete
	  - url: localhost:4000/api/pubs/:id
	  - data target: deletes pub with matching id


## USERS
Users have the following data structure:

There are two types of users:
  1. Regular users
  2. Landlords
This is dependant on whether the 

### Schema
All of the user objects have the following data structure:

```javascript
{
  username: { type: String, required: true, unique: true, maxlength: 40 },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  passwordConfirmation: { must match password }
  profileImage: { type: String },
  isLandlord: { type: Boolean },
  isFirstTime: { type: Boolean }
}
```
  
### Get all User( Index Route)
  - request type: get
  - url: _localhost:4000/api/users_
  - data target: list of all user

### Get single User (Show Route)
  - request type: get
  - url: _localhost:4000/api/users/:id_
  - data target: shows user with matching id from _id

example:

localhost:4000/api/pubs/605d259727a418b61ac9e8c2

``` javascript
{
  _id: 605d264f1902e3b6dc9b041d,
  username: wehwje,
  email: test@test,
  profileImage: image,
  isLandlord: true,
}
```
 

### Add One Show (Create Route)
	- request type: post
	- url: _localhost:4000/api/shows/_
	- data target: adds new show to database

Must meet the minimum required structure above to create correctly.

### Edit Show (Update Route)
	- request type: put
	- url: _localhost:4000/api/shows/:id_ 
	- data target: update with specific id

Must meet the minimum required structure above to edit correctly.


### Delete Show (Delete Route)
	  - request type: delete
	  - url: localhost:4000/api/shows/:id
	  - data target: deletes show with matching id



