import Auth from '../utils/auth'
import { useQuery } from '@apollo/client';
import { GET_EXERCISES } from '../utils/queries';
import { FilterFilled } from '@ant-design/icons'
import ExerciseList from '../components/ExerciseList';
import { Button, Checkbox, Modal } from 'antd';
import { useState } from 'react';

export default function Exercises() {
    const listOfMuscles = [
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

    const options = listOfMuscles.map(muscle => ({
        label: muscle
            .split('_')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' '),
        value: muscle
        }));

    const [musclesModal, setMusclesModal] = useState(false);
    const [selectedMuscles, setSelectedMuscles] = useState([]);

    const groupedExercises = (exercises) => {
        const newExerciseList = [...exercises]
            const sortedExercises = newExerciseList.sort((a, b) => a.name.localeCompare(b.name));
            const groupedExercises = sortedExercises.reduce((acc, exercise) => {
                const firstLetter = exercise.name[0].toUpperCase();
                acc[firstLetter] = acc[firstLetter] || [];
                acc[firstLetter].push(exercise);
                return acc
            }, {})
        return groupedExercises;
    }

    const filterExercises = (muscles, exercises) => {
        if(muscles.length == 0) return exercises;
        const filtered = exercises.filter((exercise) => {
            return muscles.includes(exercise.muscle);
        });
        return filtered;
    }

    const {loading, data} = useQuery(GET_EXERCISES);
    let exercisesList;
    if (Auth.loggedIn()) {
        if(loading) {
            return <h2>LOADING...</h2>
        } else {
            exercisesList = data.getExercises;  
            let newList = groupedExercises(filterExercises(selectedMuscles, exercisesList));
            return (
                <>
                <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <h1>Exercises</h1>
                        <Button type='primary' className='icon-size' onClick={() => {
                            setMusclesModal(true)
                        }}><FilterFilled /></Button>
                    </div>
                    <ExerciseList groupedExercises={newList} />
                </div>
                <Modal
                    title="Set muscle groups"
                    centered
                    open={musclesModal}
                    onOk={() => setMusclesModal(false)}
                    cancelButtonProps={{ style: { display: 'none' } }} 
                >
                        <Checkbox.Group options={options} onChange={values => setSelectedMuscles(values)}/>
                </Modal>
                </>
                )
        }
    }
    else {
        window.location.assign('/');
    }
}