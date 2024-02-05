import { List, Collapse } from 'antd';
import ExerciseDetails from './ExerciseDetails';

const ExerciseList = ({ groupedExercises, isExerciseModalOpen, exerciseList, setExerciseList }) => {
  return (
    <Collapse accordion>
      {Object.entries(groupedExercises).map(([letter, exercises]) => (
        <Collapse.Panel header={letter} key={letter}>
          <List
            dataSource={exercises}
            renderItem={(exercise) => (
              <ExerciseDetails exercise={exercise} isExerciseModalOpen={isExerciseModalOpen} exerciseList={exerciseList} setExerciseList={setExerciseList}/>
            )}
          />
        </Collapse.Panel>
      ))}
    </Collapse>
  );
};


export default ExerciseList;