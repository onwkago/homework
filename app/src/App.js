import React, { useEffect }  from 'react';
import './styles/main.css';
import PageLayout from './components/PageLayout/PageLayout';


const App = () => {

    // useEffect(() => {
    //     document.title = "Movie search"
    // }, []);


    return (
    <div className="App">
      <header className="App-header kibir">

        <PageLayout />

      </header>
    </div>
  );
}

export default App;
