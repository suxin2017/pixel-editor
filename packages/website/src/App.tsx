//@ts-ignore
// const RemoteButton = React.lazy(() => import(""));
//@ts-ignore
import './App.less';
import { Site } from "./pages/editor";

//@ts-ignore
// const RemoteButton = React.lazy(() => import("remote/Button"));

function App() {
  return (
    <div className="App">
      <Site />
    </div>
  );
}

export default App;
