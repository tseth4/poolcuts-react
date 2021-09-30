import React, { useState } from "react";
import "./App.scss";
import FooterContainer from "./components/Footer/FooterContainer";
import NavContainer from "./components/Nav/NavContainer";
import AppRouter from "./routes";
import {
  MessageContext
} from "./store/contexts/testContext";
import { getAuth } from "./store/selectors/index";


interface AppTSProps {}
interface AppTSState {}

type Props = AppTSProps & AppTSState;
const App: React.FC<Props> = ({}: Props) => {
  const [exampleValue, setExampleValue] = useState("test");

  return (
    <MessageContext.Provider value={{ exampleValue, setExampleValue }}>
      <div className="main-container">
        <NavContainer />
        <AppRouter />
        <FooterContainer />
      </div>
    </MessageContext.Provider>
  );
};

export default App;
