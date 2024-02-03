import { Divider, Typography, Button, Drawer, Space, Input, List, Modal} from 'antd';
const { Title, Paragraph, Text, Link } = Typography;
import { PlusOutlined, DownOutlined, UpOutlined } from '@ant-design/icons'
import { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import ExerciseCard  from '../components/ExerciseCard'
import ExerciseList from '../components/ExerciseList';
import Exercises from './Exercises';
 export default function Workout() {
    const [startWorkout, setStartWorkout] = useState(false);
    const [open, setOpen] = useState(false);
    const [collapsed, setCollapsed] = useState(false);
    const [exerciseList, setExerciseList] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showWorkout = () => {
        setOpen(true);
    }
    const onHide = () => {
        setOpen(false)
    }

    const moveCard = (fromIndex, toIndex) => {
        const updatedList = [...exerciseList];
        const [movedItem] = updatedList.splice(fromIndex, 1);
        updatedList.splice(toIndex, 0, movedItem);
        setExerciseList(updatedList);
    };

    const addExerciseToWorkout = () => {
        setIsModalOpen(true);
          
    }

    return (
    <div id='workout-landing'>
    <h1>Workout</h1>
    <Title level={2}>Quick Start</Title>
    <div style={{width: '100%', display: 'flex', justifyContent: 'center'}}>
    <Button type='primary' className='responsive-button' style={{textAlign: 'center'}}
    onClick={() => {showWorkout()}}>START AN EMPTY WORKOUT</Button>
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
                {/* <Title level={3} style={{marginBottom: 0, marginLeft: '5px'}}>Workout</Title> */}
                <Input inputMode='text' value='Workout name'/>
                </div>
            <Button type="primary" onClick={onHide}>
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
         <DndProvider backend={HTML5Backend}>
          <List
            dataSource={exerciseList}
            renderItem={(exercise, index) => (
              <ExerciseCard
                exercise={exercise}
                index={index}
                moveCard={moveCard}
              />
            )}
          />
          </DndProvider>
        <div style={{display: 'flex', flexDirection: 'column', justifyItems: 'center', alignItems: 'center'}}>
            <Button type='link' style={{marginBottom: '5px'}} onClick={addExerciseToWorkout}>Add exercise</Button>
            <Button danger onClick={onHide}>Cancel Workout</Button>
        </div>
    </Drawer>
    <Modal centered title="Add Exercises To Workout" open={isModalOpen} onOk={() => {setIsModalOpen(false)}}
        style={{height: 5-}}
    >
        <Exercises />
    </Modal>
    </div>
    )
}