import { Button, ConfigProvider } from 'antd';
import './App.less';
import { Site } from "./Site";

function App() {
  return (
    <ConfigProvider componentSize={'middle'}>
      <div className="App">
        <Button >123</Button>
        <Site />
      </div>
    </ConfigProvider>
  );
}

export default App;
