import { useDrag, useDrop } from 'react-dnd';
import { Row, Col, Button, Input, Card, Table } from 'antd';
import { useState } from 'react';
import { DeleteFilled, CloseOutlined } from "@ant-design/icons"
export default function ExerciseCard({ exercise, index, moveCard, setExerciseList }) {
  const [set, setSet] = useState([
    // Your initial data
    { key: '1', set: 1, weight: '', repetitions: '' },
  ]);

  //Add a set to an exercise
  const handleAddSet = () => {
    const newItem = {
      key: String(set.length + 1),
      set: set.length + 1,
      weight: '',
      repetitions: '',
    };

    setSet([...set, newItem]);
  };

  //delete set from exercise
  const handleDeleteSet = (key) => {
    //update set to render on screen
    //if not more set delete the whole exercise
    if(key == 1) {
      handleDeleteExercise()
    } else {
      setSet((prevSet) => prevSet.filter((item) => item.key !== key));
    }

    //update exerciseList to delete set of exercise by id
    setExerciseList((prevList)=> {
      const updatedList = prevList.map((prevExercise) => {
        if(prevExercise._id === exercise._id) {
          if (prevExercise.sets) {
            let updateSets = prevExercise.sets.filter((set) => {
              set.key !== key;
            })
            return {...prevExercise, sets: updateSets}
          }
        }
        return prevExercise
      })
      return updatedList
    })
  }

  //delete the exercise from exerciseList
  const handleDeleteExercise = () => {
    // Remove the entire exercise from the state
    setExerciseList((prevList) => prevList.filter((item) => item._id !== exercise._id));
  };

  //table-like design for inputing workout details
  const columns = [
    {
      title: 'Set',
      dataIndex: 'set',
      key: 'set',
      render: (text) => <strong>{text}</strong>,
    },
    {
      title: 'Kg',
      dataIndex: 'weight',
      key: 'weight',
      render: (text, record) => (
        <Input type='number'
          value={text}
          onChange={(e) => handleInputChange(record.key, 'weight', e.target.value)}
          inputMode="numeric"
          pattern="\d*"
        />
      ),
    },
    {
      title: 'Reps',
      dataIndex: 'repetitions',
      key: 'repetitions',
      render: (text, record) => (
        <Input type='number'
          value={text}
          onChange={(e) => handleInputChange(record.key, 'repetitions', e.target.value)}
          inputMode="numeric"
          pattern="\d*"
        />
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => (
        <div style={{display: 'flex', justifyContent: 'flex-start', alignItems: 'center'}}>
          <Button danger onClick={() => handleDeleteSet(record.key)}>
          <DeleteFilled />
          </Button>
        </div>
      ),
    },
  ];

  const validateInput = (field, value) => {
    // Implement your validation criteria here
    if (field === 'weight') {
      // Example: Ensure weight is a positive number
      return value && !isNaN(value) && parseFloat(value) >= 0;
    } else if (field === 'repetitions') {
      // Example: Ensure repetitions is a positive integer
      return value && !isNaN(value) && parseInt(value) > 0;
    }
    return true; // Default to true if no specific validation for the field
  };

  const handleInputChange = (key, field, value) => {
    const isValidInput = validateInput(field, value);

    if(isValidInput) {
      const updatedData = set.map((item) =>
      item.key === key ? { ...item, [field]: value } : item
      );

      setSet(updatedData);
      let setData = updatedData.map((s) => {return {repetitions: parseInt(s.repetitions), weight: parseFloat(s.weight)}})
      // Pass the data data to the parent component
      setExerciseList((prevList) => {
        const updatedList = prevList.map((prevExercise) =>
          prevExercise._id === exercise._id ? { ...prevExercise, sets: setData } : prevExercise
        );
        return updatedList;
      });
    }
  };
    
  const [{ isDragging }, drag, dragPreview] = useDrag({
      type: 'EXERCISE',
      item: { index },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    });
  
    const [, drop] = useDrop({
      accept: 'EXERCISE',
      hover: (draggedItem) => {
        if (draggedItem.index !== index) {
          moveCard(draggedItem.index, index);
          draggedItem.index = index;
        }
      },
    });
    return (
      
      <div ref={(node) => drop(drag(node))}>
        <Card key={exercise._id} title={<div style={{display: 'flex', justifyContent: 'space-between'}}>{exercise.name}<Button onClick={handleDeleteExercise}><CloseOutlined /></Button></div>} style={{ margin: '8px 0', background: 0 }}>
        <Table columns={columns} dataSource={set} pagination={false} />
        <Button type="link" onClick={handleAddSet}>
            Add Set
        </Button>
        </Card>
      </div>
    );
}
  