import 'antd/dist/antd.css';
import './App.css';

import { Registration } from './components/registration/Registration'
import { Auth } from './components/auth/Auth'

function App() {
  return (
    <div className="App">
      <Registration />
      <Auth />
    </div>
  );
}

export default App;
