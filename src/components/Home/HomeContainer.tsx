import React from "react";
import Home from "./Home";

interface HomeContainerProps {}
interface HomeContainerState {}

type Props = HomeContainerProps & HomeContainerState;
const HomeContainer = ({}: Props) => {
  return (
    <React.Fragment>
      <Home />
    </React.Fragment>
  );
};

export default HomeContainer;
