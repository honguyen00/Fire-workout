import Auth from '../utils/auth'
import { useMutation, useQuery } from '@apollo/client';
import { GET_EXERCISES } from '../utils/queries';
import { FilterFilled, PlusOutlined, FilterTwoTone, FilterOutlined } from '@ant-design/icons'
import ExerciseList from '../components/ExerciseList';
import { Button, Checkbox, Modal, FloatButton, Tooltip, Input, Dropdown, Form, Select, message } from 'antd';
import { useState } from 'react';
import { CREATE_EXERCISE } from '../utils/mutation';

export default function Exercises() {
    const [musclesModal, setMusclesModal] = useState(false);
    const [exerciseModal, setExerciseModal] = useState(false);
    const [selectedMuscles, setSelectedMuscles] = useState([]);
    const {loading, data} = useQuery(GET_EXERCISES);
    const [exerciseForm] = Form.useForm();
    const [createdExercise, {error, data2}] = useMutation(CREATE_EXERCISE);
    const [messageAPI, contextHolder] = message.useMessage();
    
    //list of muscle
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
    //turn listofMuscles to options array for checkbox
    const options = listOfMuscles.map(muscle => ({
        label: muscle
            .split('_')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' '),
        value: muscle
        }));
    //function to groupExercises by their initial letter
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

    //filter exercise by muscles groups
    const filterExercises = (muscles, exercises) => {
        if(muscles.length == 0 || !muscles) return exercises;
        const filtered = exercises.filter((exercise) => {
            return muscles.includes(exercise.muscle);
        });
        return filtered;
    }
    // validate dropdown body part
    const validateDropdown = (_, value) => {
        // Add your custom validation logic here
        if (!value) {
          return Promise.reject('Please select an item from the dropdown');
        }
        return Promise.resolve();
    };

    //create new exercise in database
    const onFinish = async (values) => {
        try {
            const { data } = await createdExercise({
                variables: {exerciseName: values.exerciseName, muscle: values.bodyPart}
            })
            if (data) {
                messageAPI.open({
                    type: 'success',
                    content: 'Create new exercise successfully!'
                })
                exerciseForm.resetFields();
                setExerciseModal(false)
            } 
        } catch (error) {
            exerciseForm.setFields([{name: 'bodyPart', errors: ['Unable to create new exercise']}, {
                name: 'exerciseName', errors: ['']
            }]);
        }
    }

    let exercisesList;
    //authentication
    if (Auth.loggedIn()) {
        if(loading) {
            return <h2>LOADING...</h2>
        } else {
            exercisesList = data.getExercises;  
            let newList = groupedExercises(filterExercises(selectedMuscles, exercisesList));
            return (
                <>
                {contextHolder}
                <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <h1>Exercises</h1>
                        <Button type='primary' className='icon-size' onClick={() => {
                            setMusclesModal(true)
                        }}><FilterOutlined /></Button>
                    </div>
                    <ExerciseList groupedExercises={newList} />
                    <FloatButton style={{
                        position: 'absolute',
                        bottom: '12%'
                    }} className='float-button' type='primary' icon={<PlusOutlined />} 
                    tooltip={<><div>Missing your favourite exercise?</div><div>Add now!</div></>}
                    onClick={() => {
                        setExerciseModal(true)
                    }}
                    />
                </div>
                <Modal
                // filter exercises modal
                    title="Set muscle groups"
                    centered
                    open={musclesModal}
                    onOk={() => setMusclesModal(false)}
                    onCancel={() => setMusclesModal(false)}
                    cancelButtonProps={{ style: { display: 'none' } }} 
                >
                        <Checkbox.Group options={options} onChange={values => setSelectedMuscles(values)}/>
                </Modal>
                <Modal
                // create new exercise
                    title="Create new exercise"
                    top
                    open={exerciseModal}
                    onOk={() => setExerciseModal(false)}
                    onCancel={()=> setExerciseModal(false)}
                    footer={null}
                >
                    <Form form={exerciseForm} onFinish={onFinish}>
                    <Form.Item name='exerciseName' required rules={[{required: true, message: 'Must enter exercise name!'}]}>
                        <Input placeholder='Exercise Name'/>
                    </Form.Item>
                    <Form.Item name='bodyPart' rules={[{validator: validateDropdown}]}>
                    <Select options={options} placeholder='Select a body part' dropdownStyle={{scrollbarWidth: 'thin', scrollbarColor: 'transparent transparent', height: '200px'}} showSearch virtual={false}
                    />
                    </Form.Item>
                    <Form.Item style={{textAlign: 'right'}}>
                        <Button onClick={() => {
                            exerciseForm.resetFields();
                            setExerciseModal(false);
                        }}>Cancel</Button>
                        <Button type='primary' htmlType='submit'>Create</Button>
                    </Form.Item>
                    </Form>
                </Modal>
                </>
                )
        }
    }
    else {
        window.location.assign('/');
    }
}