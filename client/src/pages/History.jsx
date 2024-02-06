import { GET_WORKOUT } from "../utils/queries";
import { useMutation, useQuery } from '@apollo/client';
import Auth from '../utils/auth'
import { Card, Col, Empty, Row, Typography } from 'antd';
const { Text } = Typography;

export default function History() {
    const {loading, data} = useQuery(GET_WORKOUT);
    const findPR = (array) => {
        let highestIndex = -1;
        let highestRepetitions = -1;
        let highestWeight = -1;
        array.forEach((set, index) => {
        if (set.repetitions > highestRepetitions || (set.repetitions === highestRepetitions && set.weight > highestWeight)) {
            highestRepetitions = set.repetitions;
            highestWeight = set.weight;
            highestIndex = index;
        }
        });
        return highestIndex
    }
    if(Auth.loggedIn()) {
        if(loading) {
            return <h2>LOADING...</h2>
        }
        else {
            const workoutHistory = [...data.getWorkoutHistory].reverse();
            <h1>History</h1>
            if(workoutHistory.length == 0) {
                return(
                    <>
                    <h1>History</h1>
                    <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                        <Empty description='Finish a workout to see history.' />
                    </div></>
                )
            }
            else {
                return (
                    <>
                    <h1>History</h1>
                    <Row gutter={[16, 16]}>
                        {workoutHistory.map((workout) => {
                            return (
                                <Col xs={24} md={12} lg={8} key={workout._id}>
                                    <Card bordered={false} key={workout._id}
                                    title={
                                    <div style={{display: 'flex', flexDirection: 'column'}}>
                                        {workout.title}
                                        <Text style={{fontSize: 'small', fontWeight: 'lighter'}}>{workout.date}</Text>
                                    </div>} style={{borderRadius: '1rem'}}>
                                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                                                <Text style={{fontWeight: 'bold'}}>Exercise</Text>
                                                <Text style={{fontWeight: 'bold'}}>Best Set</Text>
                                    </div>
                                    {workout.exercises.map((exercise) => {
                                        return (
                                            <>
                                            <div style={{display: 'flex', justifyContent: 'space-between'}}>                                         
                                                <div style={{overflowX: 'hidden', width: '70%'}}>
                                                    {exercise.sets.length + ' x ' + exercise.exerciseId.name}
                                                </div>
                                                <div>
                                                    {exercise.sets[findPR(exercise.sets)].weight + 'kg x ' + exercise.sets[findPR(exercise.sets)].repetitions}  
                                                </div>
                                            </div>
                                            </>
                                        )
                                    })}
                                    </Card>
                                </Col>
                            )
                        })}
                    </Row>
                    </>
                )
            }
        }
    } else {
        window.location.assign('/');
    }
}