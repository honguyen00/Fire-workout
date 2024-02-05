import { Empty, List, Modal, Tabs } from "antd";
import { Divider, Typography } from 'antd';
const { Title, Paragraph, Text, Link } = Typography;
import { useState } from 'react'
import { CheckOutlined } from '@ant-design/icons'

export default function ExerciseDetails({exercise, isExerciseModalOpen, exerciseList, setExerciseList, isTemplateOpen}) {
    const [exerciseDetailsModal, setExerciseDetailsModal] = useState(false);

    const handleItemClick = () => {
        setExerciseDetailsModal(true)
    }

    const handleCancel = () => {
        setExerciseDetailsModal(false)
    }

    const handleItemChosen = () => {
        // Toggle selection
        if(exerciseList.length != 0 && exerciseList.some((element) => element._id == exercise._id))
        {
            setExerciseList((prevList) =>
              prevList.filter((item) => item._id !== exercise._id)
            );
        } else {
            setExerciseList((prevList) => [...prevList, exercise])
        }
    };

    const items = [
        {
            key: '1',
            label: 'About',
            children: (
                <>
                <Text strong>Exercise name: <span>{exercise.name}</span>
                <br />
                </Text>
                <Text strong>Target muscle: <span>{exercise.muscle
                    .split('_')
                    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(' ')}</span>
                </Text>
                <br />
                {!exercise.difficulty ? null : <Text strong>Difficulty: {exercise.difficulty.charAt(0).toUpperCase() + exercise.difficulty.slice(1)}</Text>}
                <Divider />
                {!exercise.instructions ? <><Text strong>Instructions: </Text><Empty description='No instructions for custom exercises'/></> : <><Text strong>Instructions: </Text><br /><Text>
                        {exercise.instructions}
                    </Text></>}
                </>
            )
        },
    ]


    return (
        <>
        <List.Item key={exercise._id} className="hoverable-item" style={{
            paddingLeft: '1.5rem'
        }} onClick={(!isExerciseModalOpen && !isTemplateOpen) ? handleItemClick : handleItemChosen}
        >{<div style={{display: 'flex', justifyContent: 'space-between', width: '100%'}}>{exercise.name}<div>{(exerciseList && exerciseList.some((element) => element._id == exercise._id)) ? <CheckOutlined /> : null}</div></div>}</List.Item>
        <Modal
        // exercise details modal
            title="Exercise Details"
            centered
            open={exerciseDetailsModal}
            footer={null}
            onCancel={handleCancel}
        >
            <Tabs defaultActiveKey="1" items={items} />
        </Modal>
        </>
        
    )
}