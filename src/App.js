import { ThemeProvider } from "styled-components";
import logo from "./logo.svg";
import "./App.css";
import GlobalStyle from "./styles/global";
import theme from "./styles/theme";
import Main from "./pages/main/Main";
import { RouterProvider } from "react-router-dom";
import Router from "./routes/router";
import Header from "./components/layout/header/Header";
import PopUpTest from "./components/popUp/PopUpTest";
import HeaderTest from "./components/layout/header/HeaderTest";
import 'react-datepicker/dist/react-datepicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';
import 'react-time-picker/dist/TimePicker.css';


function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <RouterProvider router={Router} />
      </ThemeProvider>
    </>
  );
}

export default App;
