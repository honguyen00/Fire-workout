import Auth from '../utils/auth'
import { useQuery } from '@apollo/client';
import { GET_EXERCISES } from '../utils/queries';
import NavBar from '../components/Navbar'

export default function Excercises() {
    let exercisesList;
    const {loading, data} = useQuery(GET_EXERCISES);
    if (Auth.loggedIn()) {
        if(loading) {
            return <h2>LOADING...</h2>
        } else {
            exercisesList = data.getExercises;
            return (
                <>
                    <h1>Exercises</h1>
                    {exercisesList.map((exercise) => {
                        return (
                            <a>{exercise.name}</a>
                        );
                    })}
                </>
                )
        }
    }
    else {
        window.location.assign('/');
    }
}