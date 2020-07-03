import express from 'express';
import axios from 'axios';
import path from 'path';
console.log(`this is some text and i am writing it and you are reading it `);

interface PlantFact {
    scientific_name: string;
    common_name: string;
    id: number;
}

interface PlantImage {
    url: string;
}

interface PlantFactComplete {
    images: Array<PlantImage>;
}

const app = express();

// app.get('/', function (req, res) {
//     res.send('Hello World');
// });

app.use(express.static(path.join(__dirname, '../client')));

app.get('/plantfacts', (req, res) => {
    console.log(req.query.plantname);
    const userPlant = req.query.plantname;
    axios
        .get(`https://trefle.io/api/plants?page_size=5&q=${userPlant}`, {
            headers: {
                Authorization: 'Bearer aWFOWk16VWdEbWJ4WDQ1UGRBLy9iQT09',
            },
        })
        .then((axiosresponse) => {
            // const listOfFacts = axiosresponse.data.map((fact: PlantFact) => {
            //     if (fact.common_name === null) {
            //         return `this is a  ${fact.scientific_name}. we don't know what it's called in plain english.`;
            //     }
            //     return `This is a  "${fact.scientific_name}" known also as "${fact.common_name}, which has an id of "${fact.id}".`;
            // });
            res.send(axiosresponse.data);
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
