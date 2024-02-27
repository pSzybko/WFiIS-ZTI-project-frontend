import { useContext, useState } from 'react'

import { useNavigate } from 'react-router-dom'

import axios from 'axios'

import { authContext, TauthContext } from '../Context/AuthContext'

export default function Login() {
  const navigate = useNavigate()
  const { setAccessToken, setUsername, setUserId } = useContext(
    authContext
  ) as TauthContext

  const [username, setUsernameLocal] = useState('')
  const [password, setPassword] = useState('')

  const logInUser = async () => {
    const dataJson = JSON.stringify({
      username: username,
      password: password
    })

    try {
      const res = await axios.post(
        (import.meta.env.VITE_APP_BASE_URL || 'http://localhost:8188') +
          '/api/auth/signin',
        dataJson,
        {
          headers: { 'Content-Type': 'application/json' }
        }
      )

      if (res) {
        setAccessToken(res.data.accessToken)
        setUsername(res.data.username)
        setUserId(res.data.id)
        localStorage.setItem('token', res.data.accessToken)
        localStorage.setItem('id', res.data.id)
        navigate('/landing')
      }
    } catch (err) {
      alert('Wrong login or password!')
      console.log(err)
    }
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    logInUser()
  }
  const handleRegister = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    navigate('/register')
  }

  return (
    <form autoComplete="off" onSubmit={handleSubmit}>
      <div className="absolute top-1/2 left-1/2 grid gap-5 -translate-x-1/2 -translate-y-1/2 place-items-center align-middle">
        <h1 className="text-[#bbd5d8] text-xl">LOGOWANIE</h1>
        <div>
          <p>Username</p>
          <input
            className="p-1.5"
            onChange={(e) => {
              setUsernameLocal(e.target.value)
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
        <button type="submit" className="bg-[#bbd5d8] p-2.5 mb-10 rounded">
          Zaloguj
        </button>
        <>Jesteś tu pierwszy raz?</>
        <button
          type="button"
          className="bg-[#eee3e2] p-2.5 rounded"
          onClick={handleRegister}
        >
          Zarejestruj się
        </button>
      </div>
    </form>
  )
}
