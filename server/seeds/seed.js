// const listOfMuscle = ["abs","quads","lats","calves","pectorals",
// "glutes","hamstrings","adductors","triceps", "biceps","delts","forearms","traps","abductors"];

// const url = 'https://zylalabs.com/api/392/exercise+database+api/312/list+by+target+muscle?target=';
// const option = {
//     method: "GET",
//     headers: {
//         Authorization: 'Bearer 3352|gIxnMr7ubt4usVjHuNORBb2xaGWBZr8ED4EUGajV'
//     }
// };

const db = require('../config/connection');
const { Exercises } = require('../models/Exercises');
const Workout = require('../models/Workout');

const listOfMuscle = [
    "abdominals",
    "abductors",
    "adductors",
    "biceps",
    "calves",
    "chest",
    "forearms",
    "glutes",
    "hamstrings",
    "lats",
    "lower_back",
    "middle_back",
    "neck",
    "quadriceps",
    "traps",
    "triceps"];

const url = 'https://exercises-by-api-ninjas.p.rapidapi.com/v1/exercises?muscle=';
const option = {
    method: "GET",
    headers: {
		'X-RapidAPI-Key': '0fc72b6fd9msh10f38f5b4072e80p1a8c5djsnf085b2d91bc5',
		'X-RapidAPI-Host': 'exercises-by-api-ninjas.p.rapidapi.com'
	}
};

db.once('open', async () => {
    // clean database
    // await cleanDB("Workouts", "workouts");
    // await cleanDB("Exercises", "exercises");
    
    // Create an array of promises for each fetch call
    const fetchPromises = listOfMuscle.map(muscle => {
        return fetch(url + muscle, option)
            .then(res => res.json())
            .then(result => {
                return result.map(item => ({
                    name: item.name,
                    muscle: item.muscle,
                    equipment: item.equipment,
                    instructions: item.instructions,
                    difficulty: item.difficulty
                }));
            });
    });

    // Use Promise.all to wait for all fetch promises to resolve
    Promise.all(fetchPromises)
        .then(async dataArray => {
            await Exercises.insertMany([].concat(...dataArray));
        }).then(() => {
            console.log('all done!');
            process.exit(0);
        })
        .catch(error => {
            console.error('Error seeding data:', error);
        });
  });


