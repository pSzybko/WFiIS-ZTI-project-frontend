import { useState } from 'react'

import { useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function Register() {
  const navigate = useNavigate()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [passwordRepeat, setPasswordRepeat] = useState('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (password !== passwordRepeat) {
      alert('Podane hasła nie są identyczne!')
      return
    }
    const dataJson = JSON.stringify({
      username: username,
      password: password
    })
    try {
      const res = await axios.post(
        (import.meta.env.VITE_APP_BASE_URL || 'http://localhost:8188') +
          '/api/auth/signup',
        dataJson,
        {
          headers: { 'Content-Type': 'application/json' }
        }
      )

      if (res) {
        alert('Pomyślnie dodano użytkownika')
        navigate('/login')
      }
    } catch (err: any) {
      if (err.response.data.message === 'Error: Username is already taken!')
        alert('Podany Username jest zajęty! Wybierz inną nazwę użytkownika.')
      if (
        err.response.data.message ===
        'Full authentication is required to access this resource'
      )
        alert('Niepoprawne hasło - wpisz minimum 6 znaków.')
      console.log('TUTAJ: ' + err.response.data.message)
    }
  }

  const handleLogin = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    navigate('/login')
  }

  return (
    <form autoComplete="off" onSubmit={handleSubmit}>
      <div className="absolute top-1/2 left-1/2 grid gap-5 -translate-x-1/2 -translate-y-1/2 place-items-center align-middle">
        <h1 className="text-[#bbd5d8] text-xl">REJESTRACJA</h1>
        <div>
          <p>Username</p>
          <input
            className="p-1.5"
            onChange={(e) => {
              setUsername(e.target.value)
            }}
            required
          ></input>
        </div>
        <div>
          <p>Password</p>
          <input
            type="password"
            className="p-1.5"
            onChange={(e) => {
              setPassword(e.target.value)
            }}
            required
          ></input>
        </div>
        <div>
          <p>Powtórz hasło</p>
          <input
            type="password"
            className="p-1.5"
            onChange={(e) => {
              setPasswordRepeat(e.target.value)
            }}
            required
          ></input>
        </div>
        <button type="submit" className="bg-[#bbd5d8] p-2.5 mb-10 rounded">
          Zarejestruj
        </button>
        <>Masz już konto?</>
        <button
          type="button"
          className="bg-[#eee3e2] p-2.5 rounded"
          onClick={handleLogin}
        >
          Zaloguj się
        </button>
      </div>
    </form>
  )
}
