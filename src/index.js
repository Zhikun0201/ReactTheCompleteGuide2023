import ReactDOM from "react-dom/client";

import "./index.css";
import App from "./App";

// 获得 index.html 中的 root 标签
const root = ReactDOM.createRoot(document.getElementById("root"));
// 在 root 标签中渲染 App.js 中的 App 函数
// Q：为什么要用 <> 括起来呢？
root.render(<App />);
