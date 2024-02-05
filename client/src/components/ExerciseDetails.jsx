import { Empty, List, Modal, Tabs } from "antd";
import { Divider, Typography } from 'antd';
const { Title, Paragraph, Text, Link } = Typography;
import { useState } from 'react'

export default function ExerciseDetails({exercise, isExerciseModalOpen, exerciseList, setExerciseList}) {
    const [exerciseDetailsModal, setExerciseDetailsModal] = useState(false);

    const handleItemClick = () => {
        setExerciseDetailsModal(true)
    }

    const handleCancel = () => {
        setExerciseDetailsModal(false)
    }

    const handleItemChosen = () => {
        setExerciseList([...exerciseList, exercise]);
    }

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
        {
            key: '2',
            label: 'History'
        }
    ]


    return (
        <>
        <List.Item key={exercise._id} className="hoverable-item" style={{
            paddingLeft: '1.5rem'
        }} onClick={!isExerciseModalOpen ? handleItemClick : handleItemChosen}
        >{exercise.name}</List.Item>
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