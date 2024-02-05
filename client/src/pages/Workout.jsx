import { Divider, Typography, Button, Drawer, Input, List, Modal, message} from 'antd';
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

    //Error submit workout
    const [messageApi, contextHolder] = message.useMessage()
    const errorSubmitWorkout = () => {
        messageApi.open({
          type: 'error',
          content: 'Please provide valid values for reps and weight',
        });
    };

    const successSubmitWorkout = () => {
        messageApi
          .open({
            type: 'loading',
            content: 'Loading..',
            duration: 2,
          })
          .then(() => message.success('Workout Submitted', 1))
          .then(() => window.location.replace('/history'));
      };

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

    //set workout name
    const handleInputChange = (e) => {
        const value = e.target.value;
        setWorkoutName(value);
    };

    //validate numbers
    const validateInput = (field, value) => {
        if (field === 'weight') {
          return value && !isNaN(value) && parseFloat(value) >= 0;
        } else if (field === 'repetitions') {
          return value && !isNaN(value) && parseInt(value) > 0;
        }
        return true; // Default to true if no specific validation for the field
    };

    //check if all inputs from user are valid
    const isExerciseListValid = () => {
        // Iterate over each exercise in exerciseList
        for (const exercise of exerciseList) {
          // Check if the exercise has sets
          if (exercise.sets) {
            // Iterate over each set in the exercise
            for (const set of exercise.sets) {
              // Validate weight and repetitions
              if (!validateInput('weight', set.weight) || !validateInput('repetitions', set.repetitions)) {
                return false; // Invalid input found
              }
            }
          } else {
            return false;
          }
        }
        return true; // All sets are valid
    };
      

    const handleFinishButtonClick = async () => {
        // Access set data from all ExerciseCards
        if(exerciseList.length == 0) {
            return
        }
        if(isExerciseListValid()) {
            const allSetData = exerciseList.map((exercise) => {
                return {
                    exerciseId: exercise._id,
                    sets: exercise.sets
                }
            });
            const workoutData = {
                title: document.getElementById('workout-name').value || 'Default Workout Name',
                date: new Date().toDateString(),
                exercises: allSetData
            }
            try {
                const newWorkout = await addWorkout({
                    variables: {...workoutData}
                });
                if (newWorkout) {      
                    onHide();
                    successSubmitWorkout();
                }
            } catch (error) {
                console.error(error)
            }
        } else {
            errorSubmitWorkout();
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
            {contextHolder}
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