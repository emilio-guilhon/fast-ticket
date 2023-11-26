import React, { useState } from 'react';
import "./login.css";
import Navbar_LoginCadastro from "../../User/Navbar_LoginCadastro/Navbar_LoginCadastro";
import { Link , useHistory } from "react-router-dom";
import axios from "axios";

let idUser = 0 // variável auxliar que ajudará na referência do user

function Login() {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user,setUser] = useState(null);
  

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/login', {
        email: email,
        password: password,
      });

      if (response.status === 200) {
        // Login bem-sucedido, armazene o token
        const token = response.data.token;
        localStorage.setItem('authToken', token);
        
        const response2 = await axios.get(`http://localhost:5000/user`);
        setUser(response2.data);
        const param = response2.data.items.length;
        
        // Redirecione para a página principal
        console.log('Sucesso');
        const emails = response2.data.items.map(user => user.email);
       let idTest = 0;
        for (let i = 0; i < param; i++) {
          if (email === emails[i]) {
            idTest = i + 1;
            idUser = idTest;
            history.push('/homecliente');
          }
        }        
       } 
      }
     catch (error) {
      console.error('Erro ao realizar o login:', error);
      alert('Erro ao realizar login');
      console.log(email , password);  
    }
  };
 

  return (
    <div className="container">
      <div className="wrap-login">
        <header className="header">
          <Navbar_LoginCadastro />
          <span>Login</span>
        </header>
        <form onSubmit={handleLogin}>
          <div className="inputContainer">
            <label htmlFor="email">E-mail:</label>
            <input
              className="input"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              id="email"
              placeholder="exemplo@email.com"
            />
          </div>
          <div className="inputContainer">
            <label htmlFor="password">Senha:</label>
            <input
              className="input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              id="password"
              placeholder="**********"
            />
          </div>
          <button className="Button" type="submit">Entrar</button>
          <div className="underbutton">
            <p>Esqueceu a senha?</p>
            <a>Clique Aqui!</a>
          </div>
          <div className="footer">
            <p>Não possui conta?</p>
            <Link to="/cadastro">
              <a>Cadastre-se</a>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
  
}

export { idUser }; //exporta a variável para ser usada em outro arquivo
export default Login;
