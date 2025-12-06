import "./App.css";
import Layout from "./pages/Layout.tsx";
import { CompareProvider } from "./store/compareSlice.tsx";

function App() {
  return (
      <CompareProvider>
        <Layout />
      </CompareProvider>
  );
}

export default App;
