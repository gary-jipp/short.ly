import RecordProvider from './providers/RecordProvider';
import HomeRoute from './routes/HomeRoute';

function App() {

  return (
    <RecordProvider>
      <HomeRoute />
    </RecordProvider>
  );
}

export default App;
