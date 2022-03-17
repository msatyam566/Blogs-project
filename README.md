# Promise has typically 3 states
- Pending : not awaited and hence has not completed yet ( e.g. typically when you dont await an axios or db call)
- Rejected: When promise failed ( wrong url | server down etc)
- Fulfilled: Promise completed succesfully (e.g. db call has completed and returned a result succesfully)
// - settled : referes to a combination of either rejhected or fulfilled


# What is a promise:
- layman's definition: It is something in JS that tells us whether an operation has completed or not (pending)
- technical definition: it is a JS object that represents whether an asynchronous operation(like db or axios call) is completed or not





// GIT link..go thourgh this code thoroughly..it will result in a confusion when you are going though the code- postman se hit kar rhe hai and same axios se bhi hit kar rhe hai ..why?
// a short video ..4-5 mins  summary on what we covered today
// An asignment :
1.  WRITE A GET API TO GET THE LIST OF ALL THE "vaccination sessions by district id" for any given district id and for any given date
2.  GOTO  http://api.openweathermap.org => “subscribe” current weather data ==> get api key for Free version ==> create new account and Verify your emailId( Must verify to avoid issues) => go to My APi keys under your account name(top right corner) or https://home.openweathermap.org/api_keys => save the key/appid somewhere. Now proceed further
Create API's to do each of the following:
                    - get weather of London from http://api.openweathermap.org/data/2.5/weather?q=London&appid=<useYourOwnAppId>  (NOTE: must use HTTP infront of the url else axios will attempt to hit localhost and give error  ..also use HTTP only and not HTTPS)
                    - then change the above to get the temperature only( of London)
                    - Sort the cities  ["Bengaluru","Mumbai", "Delhi", "Kolkata", "Chennai", "London", "Moscow"] in order of their increasing temperature
                    result should look something like this
                    [
                    {city:"London", temp: 280},
                    {city:"Moscow", temp: 290},
                    {city:"Bangalore", temp: 301.2},
                    .......
                    ]

3. Axios POST request assignment

            1. Get all the memes at Postman (https://api.imgflip.com/get_memes)
            2. Pick a memeId you want (Eg 129242436) for the POST request
            3. Create a Post request (https://api.imgflip.com/caption_image) with only query params. Following are the params (copy username and password exactly as given below):
            template_id <meme_id>
            text0 <text you want as a caption>
            text1 <optional>
            username chewie12345
            password meme@123

            4. Return a response with a body like this
            "data": {
                    "url": "https://i.imgflip.com/5mvxax.jpg",
                    "page_url": "https://imgflip.com/i/5mvxax"
                }

--------------------------------------------------------Project details------------------------------------------------------------

Repository for backend cohort - Thorium

Blogging Site Mini Project Requirement
Phase I
Models
Author Model
{ fname: { mandatory}, lname: {mandatory}, title: {mandatory, enum[Mr, Mrs, Miss]}, email: {mandatory, valid email, unique}, password: {mandatory} }
Blogs Model
{ title: {mandatory}, body: {mandatory}, authorId: {mandatory, refs to author model}, tags: {array of string}, category: {string, mandatory, examples: [technology, entertainment, life style, food, fashion]}, subcategory: {array of string, examples[technology-[web development, mobile development, AI, ML etc]] }, createdAt, updatedAt, deletedAt: {when the document is deleted}, isDeleted: {boolean, default: false}, publishedAt: {when the blog is published}, isPublished: {boolean, default: false}}
Author APIs /authors
Create an author - atleast 5 authors
Create a author document from request body. Endpoint: BASE_URL/authors
POST /blogs
Create a blog document from request body. Get authorId in request body only.

Make sure the authorId is a valid authorId by checking the author exist in the authors collection.

Return HTTP status 201 on a succesful blog creation. Also return the blog document. The response should be a JSON object like this

Create atleast 5 blogs for each author

Return HTTP status 400 for an invalid request with a response body like this

GET /blogs
Returns all blogs in the collection that aren't deleted and are published
Return the HTTP status 200 if any documents are found. The response structure should be like this
If no documents are found then return an HTTP status 404 with a response like this
Filter blogs list by applying filters. Query param can have any combination of below filters.
By author Id
By category
List of blogs that have a specific tag
List of blogs that have a specific subcategory example of a query url: blogs?filtername=filtervalue&f2=fv2
PUT /blogs/:blogId
Updates a blog by changing the its title, body, adding tags, adding a subcategory. (Assuming tag and subcategory received in body is need to be added)
Updates a blog by changing its publish status i.e. adds publishedAt date and set published to true
Check if the blogId exists (must have isDeleted false). If it doesn't, return an HTTP status 404 with a response body like this
Return an HTTP status 200 if updated successfully with a body like this
Also make sure in the response you return the updated blog document.
DELETE /blogs/:blogId
Check if the blogId exists( and is not deleted). If it does, mark it deleted and return an HTTP status 200 without any response body.
If the blog document doesn't exist then return an HTTP status of 404 with a body like this
DELETE /blogs?queryParams
Delete blog documents by category, authorid, tag name, subcategory name, unpublished
If the blog document doesn't exist then return an HTTP status of 404 with a body like this
Phase II
Add authentication and authroisation feature
POST /login
Allow an author to login with their email and password. On a successful login attempt return a JWT token contatining the authorId
If the credentials are incorrect return a suitable error message with a valid HTTP status code
Authentication
Add an authorisation implementation for the JWT token that validates the token before every protected endpoint is called. If the validation fails, return a suitable error message with a corresponding HTTP status code
Protected routes are create a blog, edit a blog, get the list of blogs, delete a blog(s)
Set the token, once validated, in the request - x-api-key
Use a middleware for authentication purpose.
Authorisation
Make sure that only the owner of the blogs is able to edit or delete the blog.
In case of unauthorized access return an appropirate error message.
Testing
To test these apis create a new collection in Postman named Project 1 Blogging
Each api should have a new request in this collection
Each request in the collection should be rightly named. Eg Create author, Create blog, Get blogs etc
Each member of each team should have their tests in running state
Refer below sample

A Postman collection and request sample

Response
Successful Response structure
{
  status: true,
  data: {

  }
}
Error Response structure
{
  status: false,
  msg: ""
}
Collections
Blogs
{
  "title": "How to win friends",
  "body": "Blog body",
  "tags": ["Book", "Friends", "Self help"],
  "category": "Book",
  "subcategory": ["Non fiction", "Self Help"],
  "published": false,
  "publishedAt": "", // if published is true publishedAt will have a date 2021-09-17T04:25:07.803Z
  "deleted": false,
  "deletedAt": "", // if deleted is true deletedAt will have a date 2021-09-17T04:25:07.803Z,
  "createdAt": "2021-09-17T04:25:07.803Z",
  "updatedAt": "2021-09-17T04:25:07.803Z",
}
Refer https://jsonplaceholder.typicode.com/guide/ for some fake blogs data.
Note: Create a group database and use the same database in connection string by replacing `groupXDatabase