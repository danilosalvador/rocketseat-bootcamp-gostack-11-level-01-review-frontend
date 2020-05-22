import React, { useState, useEffect } from 'react';

import './App.css';

import Reader from './components/Header';
import api from './services/api';

function App() {

  const [ registers, setRegisters ] = useState([]);

  useEffect(() => {
    api.get('register').then(response => {
      setRegisters(response.data);
    });
  }, []);
 
  async function handleAddRegister() {
    const response = await api.post('register', {
      name:`Danilo Salvador ${registers.length}`,
      email:"danilo.salvador@smartlogic.com.br"
    });

    const register = response.data;

    setRegisters([...registers, register]);
  }

  async function handleRemoveRegister(id) {
    await api.delete(`register/${id}`)
    setRegisters(registers.filter(r => r.id !== id));
  }

  return (
    <>
      <Reader title="Revisão">
        <h3>ReactJS</h3>
      </Reader>
      <div>
        <p>Cadastro:</p>
        <ul>
          {registers.map(r => {
            return (
              <li key={r.id}>
                {r.name} ({r.email}) 
                <button type="button" onClick={() => handleRemoveRegister(r.id)}>REMOVER</button>
              </li>
            );
          })}
        </ul>
        <button type="button" onClick={handleAddRegister}>Novo</button>
      </div>
    </>
  );
}

export default App;