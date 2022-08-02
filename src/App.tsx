import { Route, Routes } from 'react-router-dom';

import CalculatorPage from './pages/CalculatorPage';

function App() {
  return (
    <Routes>
      <Route
        path='/calculator'
        element={<CalculatorPage />}
      />
    </Routes>
  );
}

export default App;
