import { Divider, Typography, Button, Drawer, Input, List, Modal} from 'antd';
const { Title } = Typography;
import { PlusOutlined, DownOutlined, UpOutlined } from '@ant-design/icons'
import { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import ExerciseCard  from '../components/ExerciseCard'
import Exercises from './Exercises';
import { useMutation } from '@apollo/client';
import {ADD_WORKOUT } from '../utils/mutation'

export default function Workout() {
    const [open, setOpen] = useState(false);
    const [collapsed, setCollapsed] = useState(false);
    const [exerciseList, setExerciseList] = useState([]);
    const [isExerciseModalOpen, setIsModalOpen] = useState(false);
    const [workoutName, setWorkoutName] = useState('Default Workout Name');
    const [addWorkout, {error}] = useMutation(ADD_WORKOUT)
    const showWorkout = () => {
        setOpen(true);
    }
    const onHide = () => {
        setExerciseList([]);
        setOpen(false)
    }
    //handle drag and drop
    const moveCard = (fromIndex, toIndex) => {
        const updatedList = [...exerciseList];
        const [movedItem] = updatedList.splice(fromIndex, 1);
        updatedList.splice(toIndex, 0, movedItem);
        setExerciseList(updatedList);
    };

    const addExerciseToWorkout = () => {
        setIsModalOpen(true);
    }

    const handleInputChange = (e) => {
        const value = e.target.value;
        setWorkoutName(value);
    };

    const handleFinishButtonClick = async () => {
        // Access set data from all ExerciseCards
        const allSetData = exerciseList.map((exercise) => {return {
            exerciseId: exercise._id,
            sets: exercise.sets
        }
        });
        const workoutData = {
            title: document.getElementById('workout-name').value || 'Default Workout Name',
            date: new Date().toDateString(),
            exercises: allSetData
        }
        console.log('All Set Data:', workoutData);
        try {
            const newWorkout = await addWorkout({
                variables: {...workoutData}
            });
            if (newWorkout) {
                console.log(newWorkout)
                onHide();

            }
        } catch (error) {
            console.error(error)
        }
    };
    

    return (
    <div id='workout-landing'>
    <h1>Workout</h1>
    <Title level={2}>Quick Start</Title>
    <div style={{width: '100%', display: 'flex', justifyContent: 'center'}}>
    <Button type='primary' className='responsive-button' style={{textAlign: 'center'}}
    onClick={showWorkout}>START AN EMPTY WORKOUT</Button>
    </div>
    <Divider />
    <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <Title level={2}>My Templates</Title>
        <Button><PlusOutlined /></Button>
    </div>
    <Drawer
        title={
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <div style={{display: 'flex', alignItems: 'center'}}>
                <Button onClick={() => {setCollapsed(!collapsed)}}>{collapsed ? <UpOutlined /> : <DownOutlined />}</Button>
                <Input inputMode='text' value={workoutName} onChange={handleInputChange} id='workout-name'/>
                </div>
            <Button type="primary" onClick={handleFinishButtonClick}>
                Finish
            </Button>
            </div>
        }
        placement="bottom"
        closable={false}
        onClose={onHide}
        open={open}
        height={collapsed ? '10%' :'100%'}
        styles={collapsed ? {header: {minHeight: '100%'}, content: {overflowY: 'none'}} : null}
        style={collapsed ? {overflowY: 'none !important'} : null}
        maskClosable={false}
        >
            {/* Drag and drop list */}
            <DndProvider backend={HTML5Backend}>
            <List
            dataSource={exerciseList}
            renderItem={(exercise, index) => (
                <ExerciseCard key={exercise._id}
                exercise={exercise}
                index={index}
                moveCard={moveCard}
                setExerciseList={setExerciseList}
                />
            )}
            />
            </DndProvider>
        <div style={{display: 'flex', flexDirection: 'column', justifyItems: 'center', alignItems: 'center'}}>
            <Button type='primary' style={{marginBottom: '5px'}} onClick={addExerciseToWorkout}>Add Exercises</Button>
            <Button danger onClick={onHide}>Cancel Workout</Button>
        </div>
    </Drawer>
    <Modal top title="Add Exercises To Workout" open={isExerciseModalOpen} onOk={() => {setIsModalOpen(false)}} onCancel={() => {setIsModalOpen(false)}}
        style={{height: '70%', overflowY: 'auto', scrollbarWidth: 'none',
        scrollbarColor: 'transparent transparent'}}
        cancelButtonProps={{ style: { display: 'none' } }}
    >
        <Exercises isExerciseModalOpen={isExerciseModalOpen} exerciseList={exerciseList} setExerciseList={setExerciseList}/>
    </Modal>
    </div>
    )
}