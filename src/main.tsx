import ReactDOM from 'react-dom/client';
import App from './components/App.tsx';
import './index.css';
import { Provider } from 'react-redux';
import store from './redux-modules/index';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
        <App/>
    </Provider>
);
