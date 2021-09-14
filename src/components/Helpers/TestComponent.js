import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import store from '../../redux/store';

const TestComponent = ({ children }) => {
    return (
        <Provider store={store}>
            <Router>
                {children}
            </Router>
        </Provider>
    );
}

export default TestComponent;
