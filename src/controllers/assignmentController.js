/*2.  GOTO  http://api.openweathermap.org => “subscribe” current weather data ==> get api key for Free version ==> create new account and Verify your emailId( Must verify to avoid issues) => go to My APi keys under your account name(top right corner) or https://home.openweathermap.org/api_keys => save the key/appid somewhere. Now proceed further
Create API's to do each of the following:
    - get weather of London from http://api.openweathermap.org/data/2.5/weather?q=London&appid=<useYourOwnAppId>  (NOTE: must use HTTP infront of the url else axios will attempt to hit localhost and give error  ..also use HTTP only and not HTTPS)
- then change the above to get the temperature only(of London)
    - Sort the cities["Bengaluru", "Mumbai", "Delhi", "Kolkata", "Chennai", "London", "Moscow"] in order of their increasing temperature
                    result should look something like this
[
    { city: "London", temp: 280 },
    { city: "Moscow", temp: 290 },
    { city: "Bangalore", temp: 301.2 },
                    .......
*/
let axios = require("axios")

let getweather = async function (req, res) {
    try {
        let we = req.query.cities
        let options = {
            method: "get",
            url: `http://api.openweathermap.org/data/2.5/weather?q=${cities}&appid=${appid}`
        }
                let result = await axios(options);
                console.log(result)
                let data = result.data
                res.status(200).send({ msg: result.data })
            }
            catch (err) {
                console.log(err)
                res.status(500).send({ msg: err.message })
            }
        }



let getSortedcities = async function (req, res) {
    try {
        let cities = ["Bengalru", "Mumbai", "delhi", "kolkatta", "chennai", "london", "moscow"]
        let cityobjArray = []
        for (i = 0; i < cities.length; i++) {
            let obj = { city: cities[i] }

            let resp = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${(cities)}&appid=c727e936c27ae85d8ad9315aacd3ed71`)
            console.log(resp.data.main.temp)

            obj.temp = resp.data.main.temp
            cityobjArray.push(obj)
        }
        let sorted = cityobjArray.sort(function (a, b) { return a.temp - b.temp } )
        console.log(sorted)
        res.status(200).send({ status: true, data: sorted })

    } catch (err) {
        console.log(err)
        res.status(500).send({ msg: err.message })
    }
}

module.exports.getSortedcities = getSortedcities
module.exports.getweather=getweather
