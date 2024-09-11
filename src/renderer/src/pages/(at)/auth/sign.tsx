/* eslint-disable prettier/prettier */
import { useState, useEffect } from "react";
import Users from '../../../public/authorizedUsers.json'
import './styles.css'

export function Sign(): JSX.Element {
  const [login, setLogin] = useState("");
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);

  const handleLogin = (): void => {
    try {
      const users = Users as { login: string }[];

      const isValidUser = users.some((user) => user.login === login);

      setIsAuthorized(isValidUser);
      
    } catch (error) {
      console.error("Erro ao carregar os usuários autorizados:", error)
      setIsAuthorized(false)
    }
  }

  useEffect(() => {
    if (isAuthorized === true && window.electron && window.electron.ipcRenderer) {
      window.electron.ipcRenderer.send('pong')
    }
  }, [isAuthorized])

  return (
    <div>
      <h1>Login para o Raio-X</h1>
      <h4>Somente Técnicos autorizados</h4>
      <div className="form">
        <input
          type="number"
          className="inputs"
          placeholder="Login"
          required
          value={login}
          onChange={(e) => setLogin(e.target.value)}
        />
        <button onClick={handleLogin} className="btn">Entrar</button>
      </div>
        <div>
          {isAuthorized === false && <p className="no_access">Sem acesso</p>}
          {isAuthorized === true && <p className="yes_access">Acesso permitido.</p>}
        </div>
    </div>
  )
}