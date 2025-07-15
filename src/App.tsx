import { Route, Routes } from 'react-router-dom';

import { AppRoute } from './AppRoute.ts';
import { ToDoList } from './views/toDoList/ToDoList.tsx';

import './App.css';
import { DashboardLayout } from './components/dashboardLayout/DashboardLayout.tsx';

function App() {
  return (
    <Routes>
      <Route element={<DashboardLayout />}>
        <Route path={AppRoute.toDoList} element={<ToDoList />} />
      </Route>
    </Routes>
  );
}

export default App;
