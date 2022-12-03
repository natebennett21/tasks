import React, { useState } from 'react';
import styled from 'styled-components';
import Calendar from './components/Calendar';
import Header from './components/Header';
import TaskManager from './components/TaskManager';
import ViewToggle from './components/ViewToggle';
import View from './types/View';

const Container = styled.div`
  background-color: #1a1d23;
  color: #f1f0ea;
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Main = styled.main`
  max-width: 800px;
  padding: 20px;
`;

function App() {
  const [view, setView] = useState<View>(View.Calendar);

  return (
    <Container>
      <Header>
        <h1>Tasks ✅</h1>
        <ViewToggle view={view} setView={setView} />
      </Header>
      <Main>{view === View.Calendar ? <Calendar /> : <TaskManager />}</Main>
    </Container>
  );
}

export default App;
