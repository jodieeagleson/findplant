"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var axios_1 = __importDefault(require("axios"));
console.log("this is some text and i am writing it and you are reading it ");
var app = express_1.default();
app.get('/', function (req, res) {
    res.send('Hello World');
});
app.get('/plantfacts', function (req, res) {
    axios_1.default
        .get('https://trefle.io/api/plants?page_size=5', {
        headers: {
            Authorization: 'Bearer aWFOWk16VWdEbWJ4WDQ1UGRBLy9iQT09',
        },
    })
        .then(function (afact) {
        var listOfFacts = afact.data.map(function (fact) {
            return "this is a " + fact.common_name + " known also as " + fact.scientific_name;
        });
        res.send("<h1>Hello, plant friends!</h1> <br> <br> " + listOfFacts);
    })
        .catch(function (err) {
        console.log(err);
    });
    setTimeout(function () {
        if (res.headersSent === false) {
            res.sendStatus(408);
        }
    }, 30000);
});
app.listen(3000);
// headers: {'X-Requested-With': 'XMLHttpRequest'},
// axios
//     .get('https://trefle.io/api/plants?page_size=5', {
//         headers: {
//             Authorization: 'Bearer aWFOWk16VWdEbWJ4WDQ1UGRBLy9iQT09',
//         },
//     })
//     .then((afact) => {
//         console.log(
//             afact.data.map((fact: PlantFact) => {
//                 return `this is a ${fact.common_name} known also as ${fact.scientific_name}`;
//             })
//         );
//     })
//     .catch((err) => {
//         console.log(err);
//     });
//
// const aString: string = `this is a string`;
// const lamp = new Promise<string>((resolve, reject) => {
//     setTimeout(() => {
//         resolve(`The light is BROKENNENONNEN`);
//     }, 4000);
//     setTimeout(() => {
//         reject('The light is BROKENNEN');
//     }, 2500);
// });
// lamp.then((light) => {
//     console.log(light);
// })
//     .catch((err) => {
//         console.log(err);
//     })
//     .finally(() => {
//         console.log(`And that's just the way it is`);
//     });
