import { Empty, List, Modal, Tabs } from "antd";
import { Divider, Typography } from 'antd';
const { Title, Paragraph, Text, Link } = Typography;
import { useState } from 'react'

export default function ExerciseDetails(props) {
    const [exerciseDetailsModal, setExerciseDetailsModal] = useState(false);

    const handleItemClick = () => {
        setExerciseDetailsModal(true)
    }

    const handleCancel = () => {
        setExerciseDetailsModal(false)
    }

    const items = [
        {
            key: '1',
            label: 'About',
            children: (
                <>
                <Text strong>Exercise name: <span>{props.name}</span>
                <br />
                </Text>
                <Text strong>Target muscle: <span>{props.muscle
                    .split('_')
                    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(' ')}</span>
                </Text>
                <br />
                {!props.difficulty ? null : <Text strong>Difficulty: {props.difficulty.charAt(0).toUpperCase() + props.difficulty.slice(1)}</Text>}
                <Divider />
                {!props.instructions ? <><Text strong>Instructions: </Text><Empty description='No instructions for custom exercises'/></> : <><Text strong>Instructions: </Text><br /><Text>
                        {props.instructions}
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
        <List.Item className="hoverable-item" style={{
            paddingLeft: '1.5rem'
        }} onClick={handleItemClick}
        >{props.name}</List.Item>
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