import React,{useContext, useState} from 'react'
import noteContext from '../context/notes/noteContext'

const AddNote = (props) => {
    const context = useContext(noteContext);
    const { addNote } = context
    const [note, setNote] = useState({ title: "", description: "", tag: "" })
    const handleClick = (e) => {
        e.preventDefault();
        if(!note.title || !note.description){
            props.showAlerts("please add note !", "danger")
        }else{
            addNote(note.title, note.description, note.tag)
            setNote({ title: "", description: "", tag: "" })
            props.showAlerts("added note successfully !", "success")
        }
    }
    const onchange = (e)=>{
        setNote({...note, [e.target.name]: e.target.value})
    }
    return (
        <div className='container my-3'>
            <h2>Add a Note</h2>
            <form className='my-3'>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" name='title' value={note.title} aria-describedby="emailHelp" onChange={onchange} minLength={5} required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" className="form-control" id="description" name='description' value={note.description} onChange={onchange} minLength={10} required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input type="text" className="form-control" id="tag" name='tag' value={note.tag} onChange={onchange} minLength={5} required/>
                </div>
                
                <button type="submit" className="btn btn-primary" onClick={handleClick}>Add Note</button>
            </form>
        </div>
    )
}

export default AddNote