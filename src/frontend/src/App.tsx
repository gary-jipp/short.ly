import ApiProvider from './providers/ApiProvider';
import HomeRoute from './routes/HomeRoute';

function App() {

  return (
    <ApiProvider>
      <HomeRoute />
    </ApiProvider>
  );
}

export default App;
