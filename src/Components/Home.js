import React, { useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table'
import { Button } from 'react-bootstrap'
import { urlBase } from '../Helpers/Url'
import { createEstudiante, deleteEstudiante, updateEstudiante } from '../Helpers/Estudent'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import { useForm } from '../Hooks/useForm'

const Home = () => {

    const [estudiante, setEstudiante] = useState([])
    const [materia, setMateria] = useState([])

    const [ctrlEstduiante, handleChangeEstudiante, setCtrlEstduiante] = useForm({
        nombre: '',
        documento: '',
        celular: '',
        accion: ''
    })

    const { nombre, documento, celular, accion } = ctrlEstduiante

    const [modal1, setModal1] = useState(false);
    const handleClose = () => setModal1(false);
    const handleShow = () => setModal1(true);

    const getEstdiante = async () => {
        const response = await fetch(urlBase + 'student')
        const data = await response.json()
        setEstudiante(data)
    }

    const getMateria = async () => {
        const response = await fetch(urlBase + 'materia')
        const data = await response.json()
        setMateria(data)
    }

    useEffect(() => {
        getEstdiante()
        getMateria()
    }, [])

    const ctrlEstudianteSubmit = async (data) => {
        if (data.accion === undefined) {
            setCtrlEstduiante({
                id_estudiante: data.id_estudiante,
                nombre: data.nombre,
                documento: data.documento,
                celular: data.celular,
                accion: 'editar'
            })
            handleShow()
        } else if (data.accion === 'editar') {
            updateEstudiante(data)
        } else if (data.accion === '') {
            setCtrlEstduiante({
                nombre: "",
                documento: "",
                celular: "",
                accion: 'crear'
            })
            handleShow()
        } else if (data.accion === 'crear') {
            createEstudiante(data)
        } else if (data.accion === 'eliminar') {
            deleteEstudiante(data.id_estudiante)
        }
    }

    return (
        <div>
            <div className='Tables'>
                <span className='d-flex justify-content-between'>Estudiante
                    <Button variant="dark" className='m-2' onClick={() => ctrlEstudianteSubmit(ctrlEstduiante)}>Nuevo Estudiante</Button>
                </span>
                <Table striped bordered hover variant="dark">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Nombre</th>
                            <th>Documento</th>
                            <th>Celular</th>
                            <th>Accion</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            estudiante.map(estudiante => (
                                <tr key={estudiante.id_estudiante}>
                                    <td>{estudiante.id_estudiante}</td>
                                    <td>{estudiante.nombre}</td>
                                    <td>{estudiante.documento}</td>
                                    <td>{estudiante.celular}</td>
                                    <td>
                                        <Button variant="primary" className='m-2' onClick={() => ctrlEstudianteSubmit(estudiante)}>Editar</Button>
                                        <Button variant="danger" className='m-2' onClick={() => ctrlEstudianteSubmit({ "accion": "eliminar", id_estudiante: estudiante.id_estudiante })}>Eliminar</Button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </Table>
            </div>
            <div className='Tables'>
                <span className='d-flex justify-content-between'>Materia
                </span>
                <Table striped bordered hover variant="dark">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Nombre</th>
                            <th>Creditos</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            materia.map(materia => (
                                <tr key={materia.id_materia}>
                                    <td>{materia.id_materia}</td>
                                    <td>{materia.nombre_materia}</td>
                                    <td>{materia.creditos}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </Table>
            </div>
            <div className='Modal'>
                <Modal
                    show={modal1}
                    onHide={handleClose}
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Actualizar o crear</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group className="mb-3" controlId="formName">
                                <Form.Label>Nombre</Form.Label>
                                <Form.Control type="text" name="nombre" value={nombre} onChange={handleChangeEstudiante} placeholder="Ingrese el nombre" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formName">
                                <Form.Label>Documento</Form.Label>
                                <Form.Control type="text" name="documento" value={documento} onChange={handleChangeEstudiante} placeholder="Ingrese el documento" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formName">
                                <Form.Label>Celular</Form.Label>
                                <Form.Control type="text" name="celular" value={celular} onChange={handleChangeEstudiante} placeholder="Ingrese el celular" />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" type="submit" onClick={() => ctrlEstudianteSubmit(ctrlEstduiante)}>Enviar</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </div >
    )
}

export default Home