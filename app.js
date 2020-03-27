const express = require("express");
const morgan = require("morgan");

const app = express();
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.send("Hello Express");
});

app.get("/burgers", (req, res) => {
  res.send("We have juicy cheese burgers!");
});

app.get("/pizza/pepperoni", (req, res) => {
  res.send("Your pepperoni pizza is on the way");
});

app.get("/pizza/pineapple", (req, res) => {
  res.send("yum yum");
});

app.get("/echo", (req, res) => {
  const responseText = `Here are some details of your request:
    Base URL: ${req.baseUrl}
    Host: ${req.hostname}
    Path: ${req.path}
    Fresh: ${req.fresh}
    ip: ${req.ip}
    Params: ${req.params}
  `;
  res.send(responseText);
});

app.get("/queryViewer", (req, res) => {
  console.log(req.query);
  res.end(); //do not send any data back to the client
});

app.get("/greetings", (req, res) => {
  const name = req.query.name;
  const race = req.query.race;
  if (!name) {
    return res.status(400).send("Please provide a name");
  }

  if (!race) {
    return res.status(400).send("Please provide a race");
  }
  const greeting = `Greetings ${name} the ${race}, welcome to our kingdom.`;
  res.send(greeting);
});

app.get("/sum", (req, res) => {
  const a = req.query.a;
  const b = req.query.b;
  if (!a) {
    return res.status(400).send("Please provide input a");
  }

  if (!b) {
    return res.status(400).send("Please provide input b");
  }

  const aRefined = parseInt(a, 10);
  const bRefined = parseInt(b, 10);

  if (isNaN(aRefined) || isNaN(bRefined)) {
    return res.status(400).send("Please provide a number for both inputs");
  }
  const greeting = `The sum of ${a} and ${b} is ${aRefined + bRefined}`;
  res.send(greeting);
});

app.get("/cipher", (req, res) => {
  const text = req.query.text;
  const shift = req.query.shift;

  if (!text) {
    return res.status(400).send("Please provide input text to be ciphered");
  }

  if (!shift) {
    return res
      .status(400)
      .send("Please provide the amount you want your code to be shifted by");
  }

  const shiftN = parseInt(shift, 10);
  if (isNaN(shiftN)) {
    return res.status(400).send("Shift must be a number");
  }

  const textUTF = [];
  for (i = 0; i < text.length; i++) {
    textUTF[i] = String.fromCharCode(text.charCodeAt(i) + shiftN);
  }
  const greeting = textUTF.join("");
  res.send(greeting);
});

app.get("/lotto", (req, res) => {
  const arr = req.query.arr;

  if (arr.length != 6) {
    return res.status(400).send("Exactly 6 numbers are required");
  }

  for (i = 0; i < arr.length; i++) {
    if (isNaN(arr[i])) {
      return res.status(400).send("All inputs must be numbers");
    } else if (arr[i] > 20) {
      return res.status(400).send("All inputs must be smaller than 20");
    }
  }
  const lottoArray = [];
  for (i = 0; i < arr.length; i++) {
    lottoArray[i] = Math.floor(Math.random() * Math.floor(20));
  }

  let lottoCount = 0;

  for (i = 0; i < arr.length; i++) {
    for (y = 0; y < lottoArray.length; y++) {
      if (arr[i] == lottoArray[y]) {
        lottoCount++;
      }
    }
  }

  let greeting = "did not work";

  if (lottoCount < 4) {
    greeting = "Sorry, you lost!";
  } else if (lottoCount == 4) {
    greeting = "Congratulations you win a free ticket!";
  } else if (lottoCount == 5) {
    greeting = "Congratulations you win $100!";
  }
  if (lottoCount == 6) {
    greeting = "Wow! Unbelievable! You could have won the mega millions!";
  }

  res.send(greeting);
});

app.listen(8000, () => {
  console.log("Express server is listening on port 8000");
});
