import { List, Collapse } from 'antd';

const ExerciseList = ({ groupedExercises }) => {
  return (
    <Collapse accordion>
      {Object.entries(groupedExercises).map(([letter, exercises]) => (
        <Collapse.Panel header={letter} key={letter}>
          <List
            dataSource={exercises}
            renderItem={(exercise) => (
              <List.Item>{exercise.name}</List.Item>
            )}
          />
        </Collapse.Panel>
      ))}
    </Collapse>
  );
};


export default ExerciseList;