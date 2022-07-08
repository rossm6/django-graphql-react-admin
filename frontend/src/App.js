/** @jsxImportSource theme-ui */
import { Box, ThemeProvider } from "theme-ui";
import theme from "./core/theme";
import ApolloManager from "./components/ApolloManager";
import AppProvider from "./components/AppProvider";
import { BrowserRouter, Link, Routes, Route } from "react-router-dom";
import List from "./pages/list";
import { gql, useQuery } from "@apollo/client";


const GET_DJANGO_MODELS = gql`
  query GET_DJANGO_MODELS {
    models
  }
`;

function Home () {

  const { data } = useQuery(GET_DJANGO_MODELS);

  if(!data){
    <Box>Loading django models ...</Box>
  }

  return (
    <Box>
      {data?.models.map(model => (
        <Box key={model}>
          <Link to={`/${model}`}>{model}</Link>
        </Box>
      ))}
    </Box>
  );

}

function App() {

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <AppProvider>
          <ApolloManager>
            <Routes>
              <Route path="/" element={<Home/>} /> 
              <Route path="/:model" element={<List />} />
            </Routes>
          </ApolloManager>
        </AppProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;