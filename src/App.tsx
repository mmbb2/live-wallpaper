import WeatherWidget from "./components/WeatherWidget/WeatherWidget.tsx";

function App() {
  return (
    <div className="h-screen bg-[url('/bg.jpg')] bg-cover bg-center bg-no-repeat pt-8  flex justify-center">
      <WeatherWidget />
    </div>
  );
}

export default App;
