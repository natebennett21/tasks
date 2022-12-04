import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Calendar from './components/Calendar';
import Header from './components/Header';
import TaskManager from './components/TaskManager';
import ViewToggle from './components/ViewToggle';
import View from './types/View';

const Container = styled.div`
  background-color: #1a1d23;
  color: #f1f0ea;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Main = styled.main`
  width: 100%;
  padding: 20px;
  font-size: 1.2rem;
`;

function App() {
  const [view, setView] = useState<View>(View.Calendar);

  useEffect(() => {
    document.body.style.background = '#1a1d23';
  }, []);
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
