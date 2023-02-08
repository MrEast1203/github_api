import styled from "styled-components";
import Body from "./Body";
import { Paper } from "@mui/material";
import Header from "./Header";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import IssuePage from "./IssuePage";

const Wrapper = styled.div`
  margin: auto;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const StyledPaper = styled(Paper)`
  padding: 2em;
`;
function App() {
  return (
    <Router>
      <Wrapper>
        <Routes>
          <Route
            path="/"
            element={
              <StyledPaper elevation={6}>
                <Header />
                <Body />
              </StyledPaper>
            }
          />
          <Route path="/issue" element={<IssuePage />} />
        </Routes>
      </Wrapper>
    </Router>
  );
}

export default App;
