const http = require("http");

const responseData = () => {
  let data = {}
  const flag = Math.floor(Math.random()*2);

  if (flag) {
    data = {
      success: true,
      message: 'success',
      estimated_data: {
        class: Math.floor(Math.random()*11),
        confidence: Math.floor(Math.random() * 10000) / 10000
      }
    }
  } else {
    data = {
      success: false,
      message: "Error:E50012",
      estimated_data: {}
    }
  }

  return JSON.stringify(data)
}
var server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(responseData());
});

var port = process.env.PORT || 9999;
server.listen(port, () => {
  console.log("To view your app, open this link in your browser: http://localhost:" + port);
});

