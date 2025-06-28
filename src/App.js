import {ThemeProvider} from "styled-components";
import logo from './logo.svg';
import './App.css';
import GlobalStyle from "./styles/global";
import theme from "./styles/theme";
import Main from "./pages/main/Main";
import {RouterProvider} from "react-router-dom";
import Router from "./routes/router";
import Header from "./components/layout/Header";

function App() {
  return (
    <>
        <ThemeProvider theme={theme}>
            <GlobalStyle />
            <RouterProvider router={Router}/>
            <Header />
        </ThemeProvider>
    </>
  );
}

export default App;
