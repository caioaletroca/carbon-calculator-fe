import { Route, Routes } from 'react-router-dom';

import CalculatorPage from './pages/CalculatorPage';
import CalculatorPageContent from 'pages/CalculatorPage/Content';
import ReportPage from 'pages/ReportPage';
import HomePage from 'pages/HomePage';

function App() {
  return (
    <Routes>
      <Route
        path='/'
        element={<HomePage />}
      />
      <Route
        path='/calculator'
        element={<CalculatorPage />}>
        <Route
          path=':category'
          element={<CalculatorPageContent />}
        />
      </Route>
      <Route
        path='/report'
        element={<ReportPage />}
      />
    </Routes>
  );
}

export default App;
