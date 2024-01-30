const url = 'https://exercises-by-api-ninjas.p.rapidapi.com/v1/exercises?muscle=triceps';
const option = {
    method: "GET",
    headers: {
      "X-RapidAPI-Host": "exercises-by-api-ninjas.p.rapidapi.com",
      "X-RapidAPI-Key": '0fc72b6fd9msh10f38f5b4072e80p1a8c5djsnf085b2d91bc5',
    },
};

const seed = async () => {
    try {
        const response = await fetch(url, option);
        const result = await response.json();
        console.log(result);
    } catch (err) {
        console.error(err);
    }
}


