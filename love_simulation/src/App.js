import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import Home from './pages/home/home';
import Credit from './pages/credit/credit';
import End from './pages/end/end';
import Main from './pages/main/main';
import ScenarioSelect from './pages/scenario_select/scenario_select';
import BGM from './components/BGM';

const App = () => (
  <BrowserRouter>
    <BGM />
    <main>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/main" element={<Main />} />
        <Route path="/scenario_select" element={<ScenarioSelect />} />
        <Route path="/credit" element={<Credit />} />
        <Route path="/end" element={<End />} />
      </Routes>
    </main>
  </BrowserRouter>
);

export default App;
