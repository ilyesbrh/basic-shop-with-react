import { Link, Outlet } from 'react-router-dom';
import './App.scss';

function App() {
  return (
    <>
      <div className="navbar">
        <Link to={'/products'}>products</Link>
        <Link to={'/cart'} >cart</Link>
      </div>

      <div className="row">

        <div className="main">
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default App;
