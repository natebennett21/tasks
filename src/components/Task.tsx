import React from 'react';
import styled from 'styled-components';
import TaskProps from '../types/Task';

const ColorSwatch = styled.div<{ background: string }>`
  height: 25px;
  width: 25px;
  background: ${(props) => props.background};
  border-radius: 5px;
`;
function Task({ title, description, frequency, rule, color }: TaskProps) {
  return (
    <tr>
      <td>{title}</td>
      <td>{description}</td>
      <td>{frequency}</td>
      <td>{rule}</td>
      <td>
        <ColorSwatch background={color} />
      </td>
    </tr>
  );
}

export default Task;
