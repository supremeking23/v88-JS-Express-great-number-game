const EXPRESS = require("express");
const APP = EXPRESS();
const PORT = 8080;
const { random } = require("./user_defined_module/mathlib")();

let bodyParser = require("body-parser");
let session = require("express-session");
APP.use(bodyParser.urlencoded({ extended: true }));

APP.use(
	session({
		secret: "secret",
		resave: false,
		saveUninitialized: true,
		cookie: { maxAge: 600000 },
	})
);

// let random_number = random(1, 100);

// for image/js/css
APP.use(EXPRESS.static(__dirname + "/static"));
// This sets the location where express will look for the ejs views
APP.set("views", __dirname + "/views");
// Now lets set the view engine itself so that express knows that we are using ejs as opposed to another templating engine like jade
APP.set("view engine", "ejs");
// use app.get method and pass it the base route '/' and a callback

APP.get("/", (req, res) => {
	let result = {
		isMatched: req.session.isMatch,
		message: req.session.message,
	};

	if (req.session.random_number == undefined) {
		req.session.random_number = random(1, 100);
	} else {
		req.session.random_number;
	}

	console.log(req.session.random_number);
	console.log(result.isMath);
	res.render("index", { result: result });
});

APP.post("/process_form", (req, res) => {
	if (req.session.random_number == req.body.guess_number) {
		req.session.isMatch = true;
		req.session.message = `${req.session.random_number} was the number!`;
	} else {
		req.session.isMatch = false;
		if (req.session.random_number > req.body.guess_number) {
			req.session.message = "Too Low";
		} else {
			req.session.message = "Too High";
		}
	}

	res.redirect("/");
});

APP.post("/restart_process", (req, res) => {
	req.session.destroy(function (err) {
		console.log(err);
	});

	res.redirect("/");
});

// APP.get("/result", (req, res) => {
// 	if (req.session.survey_information === undefined) res.redirect("/");
// 	res.render("result", { user: req.session.survey_information });
// });

APP.listen(PORT, (req, res) => {
	console.log(`Server is listening to ${PORT}`);
});
