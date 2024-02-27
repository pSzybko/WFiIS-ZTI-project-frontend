import { Box } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { User, Announcement } from './User/List/List'

import axios from 'axios'

import { Layout } from '../Components/Layout'
export default function Edit() {
  const navigate = useNavigate()
  const { id } = useParams()

  const types = ['OFFER', 'INFORMATION', 'JOB']
  const locations = [
    'DOLNOSLASKIE',
    'KUJAWSKO_POMORSKIE',
    'LUBELSKIE',
    'LUBUSKIE',
    'LODZKIE',
    'MALOPOLSKIE',
    'MAZOWIECKIE',
    'OPOLSKIE',
    'PODKARPACKIE',
    'PODLASKIE',
    'POMORSKIE',
    'SLASKIE',
    'SWIETOKRZYSKIE',
    'WARMIŃSKO_MAZURSKIE',
    'WIELKOPOLSKIE',
    'ZACHODNIOPOMORSKIE'
  ]

  const [announcement, setAnnouncement] = useState<Announcement | null>()

  const [title, setTitle] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [type, setType] = useState<string>('')
  const [location, setLocation] = useState<string>('')
  const [createdAt, setcreatedAt] = useState<string>('')
  const [user, setUser] = useState<User | null>()

  const handleClick = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    editAnnouncement()
  }

  const getAnnouncement = async () => {
    try {
      const accessToken = localStorage.getItem('token')

      const res = await axios.get(
        (import.meta.env.VITE_APP_BASE_URL || 'http://localhost:8188') +
          '/api/announcements/' +
          id,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        }
      )
      if (res) {
        setAnnouncement(res.data)
      }
    } catch (err) {
      console.log(err)
      navigate('/results')
    }
  }

  const editAnnouncement = async () => {
    const dataJson = user
      ? JSON.stringify({
          user: { id: user.id },
          title: title,
          description: description,
          type: type,
          location: location,
          createdAt: createdAt
        })
      : {}

    try {
      const accessToken = localStorage.getItem('token')

      const res = await axios.put(
        (import.meta.env.VITE_APP_BASE_URL || 'http://localhost:8188') +
          '/api/announcements/' +
          id,
        dataJson,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`
          }
        }
      )

      if (res) {
        console.log(res)
        navigate('/user/list')
      }
    } catch (err) {
      alert('Wrong login or password!')
      console.log(err)
    }
  }

  const handleCancel = () => {
    navigate('/user/list')
  }

  useEffect(() => {
    getAnnouncement()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (announcement) {
      setTitle(announcement.title)
      setDescription(announcement.description)
      console.log(announcement.type)
      setType(announcement.type)
      setLocation(announcement.location)
      setcreatedAt(announcement.createdAt)
      setUser(announcement.user)
    }
  }, [announcement])

  return (
    <Box
      display="flex"
      sx={{ flexGrow: 1 }}
      height="100vh"
      overflow="hidden"
      flexDirection="row"
    >
      <Layout>
        <Box
          sx={{
            p: '2vh',
            fontSize: 20,
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <form autoComplete="off" onSubmit={handleClick}>
            <div className="grid gap-5 place-items-center ">
              <h1 className="text-[#bbd5d8] text-[40px]">Edytuj ogłoszenie</h1>
              <div>
                <p>Tytuł</p>
                <input
                  type="text"
                  defaultValue={title}
                  size={50}
                  className="p-1.5"
                  onChange={(e) => {
                    setTitle(e.target.value)
                  }}
                  required
                ></input>
              </div>
              <div>
                <p>Opis</p>
                <textarea
                  defaultValue={description}
                  className="p-1.5"
                  rows={10}
                  cols={50}
                  onChange={(e) => {
                    setDescription(e.target.value)
                  }}
                  required
                ></textarea>
              </div>
              <div>
                <p>Typ</p>
                <select
                  className="block w-[20rem] p-2.5"
                  value={type}
                  onChange={(e) => {
                    setType(e.target.value)
                  }}
                  required
                >
                  <option value="">---wybierz typ---</option>
                  {types.map((t, index) => (
                    <option key={index} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <p>Lokalizacja</p>
                <select
                  className="block w-[20rem] p-2.5"
                  value={location}
                  onChange={(e) => {
                    setLocation(e.target.value)
                  }}
                  required
                >
                  <option value="">---wybierz lokalizację---</option>
                  {locations.map((t, index) => (
                    <option key={index} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>
              <div className="grid gap-6 grid-cols-2 ">
                <button
                  type="button"
                  className="bg-[#bbd5d8] p-2.5 mb-10 rounded"
                  onClick={handleCancel}
                >
                  Anuluj
                </button>
                <button
                  type="submit"
                  className="bg-[#bbd5d8] p-2.5 mb-10 rounded"
                >
                  Edytuj
                </button>
              </div>
            </div>
          </form>
        </Box>
      </Layout>
    </Box>
  )
}
