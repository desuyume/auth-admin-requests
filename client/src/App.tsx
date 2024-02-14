import { BrowserRouter } from 'react-router-dom'
import './App.css'
import AppRouter from './AppRouter'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App() {
	return (
		<BrowserRouter>
			<AppRouter />
			<ToastContainer theme='dark' />
		</BrowserRouter>
	)
}

export default App
