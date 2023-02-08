import { createContext, useContext } from "react";

const ListContext = createContext({
  //data
  //function
});

const ListProvider = (props) => {
  //data

  //function

  return <ListContext.Provider value={{}} {...props} />;
};
function useList() {
  return useContext(ListContext);
}

export { ListProvider, useList };
