import Swal from 'sweetalert2'
import { urlBase } from './Url'

export const createEstudiante = async (estudiante) => {
    const resp = await fetch(urlBase + 'student', {
        method: 'POST',
        body: JSON.stringify({
            nombre: estudiante.nombre,
            documento: estudiante.documento,
            celular: estudiante.celular
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    })

    const data = await resp.json()

    if (data.message === "Student created successfully") {
        Swal.fire(
            'Estudiante Creado',
            'El estudiante se ha creado correctamente',
            'success'
        ).then(() => {
            window.location.reload()
        })
    } else {
        Swal.fire(
            'Error',
            'El estudiante no se ha creado',
            'error'
        )
    }
}

export const updateEstudiante = async (estudiante) => {
    const resp = await fetch(urlBase + 'student/' + estudiante.id_estudiante, {
        method: 'PUT',
        body: JSON.stringify({
            nombre: estudiante.nombre,
            documento: estudiante.documento,
            celular: estudiante.celular
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    const data = await resp.json()
    if (data.message === 'Student updated successfully') {
        Swal.fire({
            title: 'Estudiante Actualizado',
            text: 'Estudiante Actualizado Exitosamente',
            icon: 'success',
        }).then(() => {
            window.location.reload()
        })
    } else {
        Swal.fire({
            title: 'Error',
            text: 'Error al Actualizar Estudiante',
            icon: 'error',
        })
    }
}

export const deleteEstudiante = async (id_estudiante) => {
    const resp = await fetch(urlBase + 'student/' + id_estudiante, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    const data = await resp.json()
    if (data.message === 'Student deleted successfully') {
        Swal.fire({
            title: 'Estudiante Eliminado',
            text: 'Estudiante Eliminado Exitosamente',
            icon: 'success',
        }).then(() => {
            window.location.reload()
        })
    } else {
        Swal.fire({
            title: 'Error',
            text: 'Error al Eliminar Estudiante',
            icon: 'error',
        })
    }
}