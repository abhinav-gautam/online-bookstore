import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import store from '../../redux/store';

export const renderWithContainer = (children) => {
    render(
        <Provider store={store}>
            <Router>
                {children}
            </Router>
        </Provider>
    );
}


