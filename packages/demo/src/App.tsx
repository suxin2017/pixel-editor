import { Button, ConfigProvider } from 'antd';
import './App.less';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { RouterSwitch } from './routes';
import PageLayout from './layout';

function App() {
  return (
    <ConfigProvider componentSize={'middle'}>
      <Router>
        <div className="App">
          <PageLayout/>
        </div>
      </Router>
    </ConfigProvider>
  );
}

export default App;
