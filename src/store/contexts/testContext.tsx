import { createContext, Dispatch, SetStateAction } from "react";

export interface TempContextInterface {
  exampleValue: string;
  setExampleValue: Function;
}

const initialContextValue = {
  exampleValue: "some value from context",
  setExampleValue: () => null
};

export const MessageContext = createContext<TempContextInterface>(
  initialContextValue
);
