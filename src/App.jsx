import './styles/app.css';
import logo from '@/assets/logo.svg';
import { useState } from 'react';
function App() {
  const [content, setContent] = useState('Hello React with Webpack');
  const handleClick = () => {
    setContent('Hello World');
  };
  return (
    <div className="app">
      <div className="wrapper">
        <img className="logo" src={logo} alt="Logo" />
        <h1 className="title">{content}</h1>
        <button onClick={handleClick}>修改文案</button>
      </div>
    </div>
  );
}
export default App;
