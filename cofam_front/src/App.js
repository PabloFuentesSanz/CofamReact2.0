import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PresupuestosList from './components/PresupuestosList';
import PresupuestoForm from './components/PresupuestoForm';
import Presupuesto from './components/Presupuesto';
import { useTheme } from './ThemeContext';
import Navbar from './components/Navbar';
import { Toaster } from 'react-hot-toast';
function App() {
  const { darkMode } = useTheme();

  return (
    <div className={`App${darkMode ? ' dark-mode' : ''}`}>
      <Router>
        <div>
          <Toaster position="bottom-right" reverseOrder={false} />
        </div>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<PresupuestosList />} />
          <Route path="/new" element={<PresupuestoForm />} />
          <Route path="/presupuesto/:id" element={<Presupuesto />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
