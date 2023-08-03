import { Route } from 'react-router-dom';

import Navigation from './components/Nav/Navigation';
import ProductsPage from './containers/Products';
import FavoritesPage from './containers/Favorites';
import Counter from './containers/Counter';

const App = props => {
    return (
        <>
            <Navigation />
            <main>
                <Route path="/" component={ProductsPage} exact />
                <Route path="/favorites" component={FavoritesPage} />
                <Counter />
            </main>
        </>
    );
};

export default App;
