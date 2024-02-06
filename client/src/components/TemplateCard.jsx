import { useDrag, useDrop } from 'react-dnd';
import { Row, Col, Button, Input, Card, Table } from 'antd';
import { useState } from 'react';
import { DeleteFilled, CloseOutlined } from "@ant-design/icons"

export default function TemplateCard({ setExerciseList, item }) {
  return(
    <div style={{ height: '100%' }}>
          {item.map((data) => {
              return (
                  <>{data.name}<br /></>);
          })}
    </div>
  )
}