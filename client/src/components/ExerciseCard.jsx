import { useDrag, useDrop } from 'react-dnd';
import { Card } from 'antd';

export default function ExerciseCard({ exercise, index, moveCard }) {
    const [, ref] = useDrag({
      type: 'EXERCISE',
      item: { index },
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
      <div ref={(node) => ref(drop(node))}>
        <Card title={exercise.name} style={{ margin: '8px 0' }}>
          {/* Additional exercise details can be added here */}
        </Card>
      </div>
    );
}
  