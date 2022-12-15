import RoutePage from "./routes/Routes";
import Footer from "./components/Footer";

const App = () => {
	return (
		<div className="flex flex-col min-h-screen">
			<RoutePage />
			<Footer />
		</div>
	);
};

export default App;
