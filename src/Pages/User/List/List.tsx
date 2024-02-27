import React from 'react'

import { Box, Divider, Avatar, Paper } from '@mui/material'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'
import WorkIcon from '@mui/icons-material/Work'
import LocalOfferIcon from '@mui/icons-material/LocalOffer'
import InfoIcon from '@mui/icons-material/Info'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import { Layout } from '../../../Components/Layout'
import { useEffect, useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'

import axios from 'axios'

export interface User {
  username: string
  id: number
}

export interface Announcement {
  id: number
  location: string
  title: string
  user: User
  type: string
  description: string
  createdAt: string
}

export const List = () => {
  const navigate = useNavigate()
  const [results, setResults] = useState([])

  const [selectedId, setSelectedId] = useState<number>(-1)

  const [page, setPage] = useState<number>(0)
  const [rowsPerPage, setRowsPerPage] = useState<number>(5)
  const [count, setCount] = useState<number>(0)

  const [open, setOpen] = useState<boolean>(false)

  const getAllResults = async () => {
    try {
      const userId = localStorage.getItem('id')
      const accessToken = localStorage.getItem('token')

      const res = await axios.get(
        (import.meta.env.VITE_APP_BASE_URL || 'http://localhost:8188') +
          '/api/announcements/user/' +
          userId,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        }
      )
      if (res) {
        setResults(res.data)
      }
    } catch (err) {
      console.log(err)
    }
  }

  const deleteOne = async (announcementId: number) => {
    try {
      const accessToken = localStorage.getItem('token')

      const res = await axios.delete(
        (import.meta.env.VITE_APP_BASE_URL || 'http://localhost:8188') +
          '/api/announcements/' +
          announcementId,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        }
      )
      if (res) {
        window.location.reload()
      }
    } catch (err) {
      console.log(err)
    }
  }

  const handleDeleteAlert = (id: number) => {
    setSelectedId(id)
    setOpen(true)
  }

  const handleCloseDelete = () => {
    deleteOne(selectedId)
    setOpen(false)
  }

  const handleCloseCancel = () => {
    setOpen(false)
  }

  useEffect(() => {
    getAllResults()
  }, [])

  useEffect(() => {
    if (results) {
      setCount(results.length)
    }
  }, [results])

  const visibleRows = useMemo(
    () => results?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [page, rowsPerPage, results]
  )

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const editOne = (announcementId: number) => {
    navigate('/edit/' + announcementId)
  }

  return (
    <Layout>
      <Box sx={{ p: '2vh', fontSize: 40, color: '#9f50ff' }}>
        <h2 className="tracking-wider text-[#bbd5d8]">Lista twoich ogłoszeń</h2>
        <Divider orientation="horizontal" sx={{ mt: '4px' }} />

        <Paper>
          <TableContainer>
            <Table sx={{ minWidth: 650 }}>
              <TableBody>
                {visibleRows?.map((row: Announcement, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <Avatar>
                        {
                          {
                            JOB: <WorkIcon />,
                            INFORMATION: <InfoIcon />,
                            OFFER: <LocalOfferIcon />
                          }[row.type]
                        }
                      </Avatar>
                    </TableCell>
                    <TableCell>{row.title}</TableCell>
                    <TableCell>
                      <button
                        onClick={() => editOne(row.id)}
                        className="hover:text-[#bbd5d8] "
                      >
                        <EditIcon sx={{ fontSize: 35 }} />
                      </button>
                    </TableCell>
                    <TableCell>
                      <button
                        onClick={() => handleDeleteAlert(row.id)}
                        className="hover:text-[#bbd5d8] "
                      >
                        <DeleteIcon sx={{ fontSize: 35 }} />
                      </button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 20]}
            component="div"
            count={count || 0}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </Box>
      <Dialog
        open={open}
        onClose={handleDeleteAlert}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {'Czy na pewno chcesz usunąć wskazane ogłoszenie?'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Usunięte dane zostaną utracone!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDelete}>Usuń</Button>
          <Button onClick={handleCloseCancel} autoFocus>
            Anuluj
          </Button>
        </DialogActions>
      </Dialog>
    </Layout>
  )
}
