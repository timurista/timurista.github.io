const request = require('request')
var url = 'https://www.googleapis.com/books/v1/volumes?q=isbn:0747532699'

request(url, (error, response, body)=> {
  if (!error && response.statusCode === 200) {
    const response = JSON.parse(body)

    console.log("volume info: ", response.items[0].volumeInfo)


    console.log("Got a response: ", response)

  } else {
    console.log("Got an error: ", error, ", status code: ", response.statusCode)
  }
})
