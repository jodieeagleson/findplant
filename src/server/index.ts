import express from 'express';
import axios from 'axios';
import path from 'path';
console.log(`this is some text and i am writing it and you are reading it `);

const app = express();

// app.get('/', function (req, res) {
//     res.send('Hello World');
// });

app.use(express.static(path.join(__dirname, '../client')));

app.get('/plantfacts', (req, res) => {
    axios
        .get('https://trefle.io/api/plants?page_size=5', {
            headers: {
                Authorization: 'Bearer aWFOWk16VWdEbWJ4WDQ1UGRBLy9iQT09',
            },
        })
        .then((afact) => {
            const listOfFacts = afact.data.map((fact: PlantFact) => {
                return `this is a ${fact.common_name} known also as ${fact.scientific_name}`;
            });
            res.send(`<h1>Hello, plant friends!</h1> <br> <br> ${listOfFacts}`);
        })
        .catch((err) => {
            console.log(err);
        });

    setTimeout(() => {
        if (res.headersSent === false) {
            res.sendStatus(408);
        }
    }, 30000);
});

app.listen(3000);

interface PlantFact {
    scientific_name: string;
    common_name: string;
}

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
