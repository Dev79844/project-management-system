import React from 'react'
import { useMutation } from '@apollo/client'
import { GET_PROJECT } from '../queries/projectQueries'
import {UPDATE_PROJECT} from '../mutations/projectMutation'

const EditProjectForm = ({project}) => {

    const [name,setName] = React.useState(project.name)
    const [description,setDescription] = React.useState(project.description)
    const [status,setStatus] = React.useState('')

    const [updateProject] = useMutation(UPDATE_PROJECT,{
        variables:{id: project.id, name, description, status},
        refetchQueries:[{query: GET_PROJECT,variables:{id: project.id}}]
    })

    const onSubmit = (e)=>{
        e.preventDefault()

        if(!name || !description || !status){
            alert('Please fill all the fields')
        }

        updateProject(name,description,status)
    }

  return (
    <div className='mt-5'>
        <h3>Update project details</h3>
        <form onSubmit={onSubmit}>
            <div className="mb-3">
                <label htmlFor="name" className="form-label">Name</label>
                <input type="text" name="name" id="name" className='form-control' value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="mb-3">
                <label htmlFor="description" className="form-label">Description</label>
                <textarea id="description" className='form-control' value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
            </div>
            <div className="mb-3">
                <label htmlFor="status" className="form-label">Status</label>
                    <select id="status" className="form-select" value={status} onChange={(e) => setStatus(e.target.value)}>
                        <option value="new">Not Started</option>
                        <option value="progress">In Progress</option>
                        <option value="completed">Completed</option>
                    </select>
            </div>
            <button className="btn btn-primary" type='submit'>Submit</button>
        </form>
    </div>
  )
}

export default EditProjectForm