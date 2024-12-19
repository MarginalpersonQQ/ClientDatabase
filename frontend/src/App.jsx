import React, { useState } from 'react';
import LoginPage from './loginpage.jsx'
import DataBasePage  from './databasepage.jsx'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true); // 初始值設為 false
  return (
      <div>
        {isLoggedIn ? <DataBasePage /> : <LoginPage setIsLoggedIn={setIsLoggedIn} />}
      </div>
  );
}

export default App;