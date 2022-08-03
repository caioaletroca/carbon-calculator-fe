import { Route, Routes } from 'react-router-dom';

import CalculatorPage from './pages/CalculatorPage';
import CalculatorPageContent from 'pages/CalculatorPage/Content';
import ReportPage from 'pages/ReportPage';

function App() {
  return (
    <Routes>
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
