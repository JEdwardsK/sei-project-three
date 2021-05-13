
<img src="./images/logo.sample.png" alt="Logo of the project" align="right">

# PubHub
> SEI Project 3 - full stack express app

A brief description of your project, what it is used for.

Team Members
- Harry Warwick [<img src="./readme/github.png" width="25">](http://github.com/hfrwarwick) [<img src="./readme/linkedin.png" width="31.5">](http://linkedin.com/in/harrywarwick)
- Atilla Arlsan [<img src="./readme/github.png" width="25">](https://github.com/Atilla-Arslan) [<img src="./readme/linkedin.png" width="31.5">](https://www.linkedin.com/in/atilla-arslan7)
- Olivia Flynn [<img src="./readme/github.png" width="25">](http://github.com/oliviafpersonal) [<img src="./readme/linkedin.png" width="31.5">](http://bit.ly/oliviaflynn)

[<img width="1423" alt="Screenshot 2021-05-07 at 14 19 11" src="./readme/pubHubLink.png">](https://pubhub-new.herokuapp.com/)
><small>Click the image for a link to the deployed project</small>

## Installing / Getting started

he initial setup for the front end is handled by `create-react-app` using the GA London template
```shell
$ yarn create react-app client --template cra-template-ga-ldn
```
Packages used
- axios
- bulma
- react-router-dom
- fontawesome
- animate.css
- bulma-carousel
- http-proxy-middleware
- mapbox
- jsonwebtoken
- moment

When forking/cloning the repo, a yarn and yarn start should start up the app

```shell
$ yarn; yarn start
```

## Technologies/Packages Used

## Process
### Idea Stage
<img width="1423" alt="Screenshot 2021-05-07 at 14 19 11" src="./readme/airbnb.png">

We decided to make a clone of AirBnb, with pubs as the subject. We started by splitting up the tasks required, using Trello for project management.

A style guide was created through screenshots of the onboarding experience on AirBnb. We then determined our MVP and any stretch goals.

MVP Goals:
- Users can view pubs whilst unregistered
- Users can register an account to add reviews to pubs
- Users can register as a Landlord to add pubs to the database
- Users can update and delete their accounts
- Landlords can update and delete their pubs

Stretch Goals:
- Light/Dark Mode
- Implement Map to display pub locations
- Allow registered user to save pubs
- Allow registered user to make a pub crawl out of their saved pubs

### Functionality
#### CRUD

create
- users can register an account to access extra functions on the website
- registered users can add their own pubs
- registered users can add comments to a pub

read
- requests are sent to get data from the database to render on the site

Update
- users can update their own accounts
- landlords can update their pubs information

delete
- users can delete their accounts
- landlords can delete pubs
- users can delete their reviews to pubs

#### Personal Responsibilities
I was tasked with handling the backend creation, user models and requests. the following data structures were used:

for the user:
```javascript
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true, maxlength: 40 },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profileImage: {
    type: String,
    default:
      'https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg'
  },
  isLandlord: { type: Boolean, default: false },
  isUser: { type: Boolean, default: true },
  isFirstTime: { type: Boolean, default: true },
  favouritePubs: { type: Array },
  allReviews: [reviewSchema]
}, {
  timestamps: true
})
```

for the pubs
```javascript
const pubSchema = new mongoose.Schema(
  {
    nameOfPub: { type: String, required: true },
    address: {
      line1: { type: String, required: true },
      line2: { type: String },
      town: { type: String },
      city: { type: String, required: true },
      postCode: { type: String, required: true, maxlength: 10 },
    },
    description: { type: String },
    isOutsideSeating: { type: Boolean, required: true },
    isPetFriendly: { type: Boolean, required: true },
    isFoodServed: { type: Boolean, required: true },
    isLiveSports: { type: Boolean, required: true },
    image: { type: String, default: 'no image provided' },
    pubOwner: { type: mongoose.Schema.Types.ObjectID, ref: 'User' },
    reviews: [reviewSchema]
  },
  { timestamps: true }
)
```

### Design
### Added Functionality Attempts
### Known Errors
- images do not upload correctly depending on file size, works for some users.
### Future Improvements

There are a number of possible improvements or added features to be potentially looked at in the future.
#### Additional Features
- Implementing the stretch goals that weren't achieved
  - adding pub crawl functionality
  - adding dark mode
  - linking sign in processes from FaceBook, Google, LinkedIn(for landlords?) and Outlook
- Completing remove from pub favourites
- Adding localisation languages toggle
- Using external API for address autocomplete in forms
- Utilising the isFirstLogin field to onboard the user through the site
-
#### Edits and Updates/Fixes
- Refining form validation
- Fixes to location data

In general, I would also like to go back to refine the code, for readability, and to be able to make extractable components or features that can be reused or repurposed in future projects.

## Learning Outcomes

### Wins/ Challenges

On submitting the request to update the pub on the database, we found that an error occurred due to our nested object data structure. Any nested fields in `formData` was flattened during the submission.

To combat this the controller had to be modified in the backend. Initially, it was the following
```javascript
export const addReviewtoPub = async (req, res) => {
  try {
    const userID = req.currentUser._id
    const userName = req.currentUser.username
    const userImage = req.currentUser.profileImage
    const findUser = await User.findById(userID)
    if (findUser.isLandlord && !findUser.isUser) throw new  Error('user is a Landlord, Landlords cannot review pubs')
    const { id } = req.params
    const pub = await Pub.findById(id)
    if (!pub) throw new Error('Cannot find pub')
    if (isEqual(pub.pubOwner, userID)) {
      throw new Error('user is pub owner - cannot review your own pubs')
    } else {
      const newReview = { ...req.body, reviewOwner: userID, reviewOwnerName: userName, reviewOwnerImage: userImage, pubName: pub.nameOfPub }
      pub.reviews.push(newReview)
      findUser.allReviews.push(newReview)
      await pub.save()
      await findUser.save()
      return res.status(200).json(pub)
    }
  } catch (err) {
    return res.status(404).json({ message: err.message })
  }
}
```
Instead of `...req.body`, we changed `const newPub` to the following:
```javascript
 // spreading in the data changed as react doesn't like state of nested objects
const newReview = {
  subRating: {
  availability: req.body.availability,
  comfortability: req.body.comfortability,
  price: req.body.price
  },
  reviewOwner: userID,
  reviewOwnerName: userName,
  reviewOwnerImage: userImage,
  pubName: pub.nameOfPub,
  pubID: pub._id,
  text: req.body.text
}
```
Another challenge we faced was implementing the location data for the maps. A virtual field defining the longitude and latitude data would make a call to an external API

```javascript
pubSchema.virtual('locationCoordinates').get(async function () {
  const input = this.address.postCode
  if (!input) return null
  const externalData = async () => {
    const { data } = await axios.get(
      `http://api.getthedata.com/postcode/${input}`
    )
    const lat = data.data.latitude
    const long = data.data.longitude
    console.log(lat, long)
    return { longitude: Number(long), latitude: Number(lat) }
  }
  const coordinateObject = await externalData()
  console.log(
    '🚀 ~ file: pub.js ~ line 100 ~ coordinateObject',
    coordinateObject
  )
  return coordinateObject
})
```
I couldn't get the field working, so we cheated by having an array of longitudes and latitudes to populate the map for the seeded data. This is something that I would return to to fix at a later date if possible for improvements


Working in a team environment was good as it helped combat individual weaknesses. For example, I was not as confident with regards to CSS and styling elements, but could rely on other members to pick up these tasks and walk me through their process or code. Similarly, being able to jump in and pair code through Live Share or over a Zoom screen share was helpful when another team member was struggling with their tasks. Even just having someone to talk your process through makes a difference when working towards a solution.

### Wallkthrough
#### Pubs
From the homepage the user can navigate to either:
- list all pubs on the database
- search for a pub by location or pub name
- register or login
<img width="1423" alt="Screenshot 2021-05-07 at 14 19 11" src="./readme/pubHubLink.png">

The page also displays three popular cities to filter pubs by, and a link to register as a landlord

<img width="1423" alt="Screenshot 2021-05-07 at 14 19 11" src="./readme/popcities.png">



should the user search for a pub or location that does not exist they are directed to an error page that links them to the index page.

<img width="1423" alt="Screenshot 2021-05-07 at 14 19 11" src="./readme/searcherror.png">

On the index page, the user can filter by listed variables. The map displays the pubs, and a user can click the icon to navigate to the pubs show page. alternatively, the user can click on the pubs image

<img width="1423" alt="Screenshot 2021-05-07 at 14 19 11" src="./readme/pubindex.png">

<img width="1423" alt="Screenshot 2021-05-07 at 14 19 11" src="./readme/filterpubs.png">

the pub profile displays information.

<img width="1423" alt="Screenshot 2021-05-07 at 14 19 11" src="./readme/pubshow.png">
<img width="1423" alt="Screenshot 2021-05-07 at 14 19 11" src="./readme/pubshow2.png">

conditional to the user signing in they can post reviews and save to pubs.
<img width="1423" alt="Screenshot 2021-05-07 at 14 19 11" src="./readme/signedpubshow.png">
<img width="1423" alt="Screenshot 2021-05-07 at 14 19 11" src="./readme/signedpubshow2.png">


user can submit a review
<img width="1423" alt="Screenshot 2021-05-07 at 14 19 11" src="./readme/review.png">

this updates on the pubs page
<img width="1423" alt="Screenshot 2021-05-07 at 14 19 11" src="./readme/reviewupdate.png">

The page adjusts the average rating based on the submitted reviews. (the average for bruce wayne was 4s, jokers was 1s). The Comment section in the review submission is optional
<img width="1423" alt="Screenshot 2021-05-07 at 14 19 11" src="./readme/updatedrating.png">

Saving a pub will add it to a list of favourites, which is accessed through the drop down menu.
<img width="1423" alt="Screenshot 2021-05-07 at 14 19 11" src="./readme/savedpubs.png">

#### Users

users can login or register through the dropdown menu which opens a modal form.
<img width="1423" alt="Screenshot 2021-05-07 at 14 19 11" src="./readme/login.png">
<img width="1423" alt="Screenshot 2021-05-07 at 14 19 11" src="./readme/loginconfirm.png">

after registering the user is redirected to a login page
<img width="1423" alt="Screenshot 2021-05-07 at 14 19 11" src="./readme/register.png">
<img width="1423" alt="Screenshot 2021-05-07 at 14 19 11" src="./readme/loginregister.png">


users can navigate either through the header or through become a landlord page. if the user is the button text will either say 'login to get started' or 'get started' depending on whether the user is logged in.
<img width="1423" alt="Screenshot 2021-05-07 at 14 19 11" src="./readme/becomelandlord.png">

running through the prompts to submit the pub:
<img width="1423" alt="Screenshot 2021-05-07 at 14 19 11" src="./readme/profile.png">
<img width="1423" alt="Screenshot 2021-05-07 at 14 19 11" src="./readme/profile.png">
<img width="1423" alt="Screenshot 2021-05-07 at 14 19 11" src="./readme/profile.png">
<img width="1423" alt="Screenshot 2021-05-07 at 14 19 11" src="./readme/profile.png">

the user is then directed to the pubshow page to view their pub

a user has both a landlord and a personal profile page
<img width="1423" alt="Screenshot 2021-05-07 at 14 19 11" src="./readme/profile.png">
<img width="1423" alt="Screenshot 2021-05-07 at 14 19 11" src="./readme/register.png">