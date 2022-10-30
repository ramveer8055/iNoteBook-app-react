import React from 'react'

const NoteItem = (props) => {
    const {note} =props;
  return (
    <div className='col-md-3'>
          <div class="card my-3" >
                  <div class="card-body">
                      <h5 class="card-title">{note.title}</h5>
                      <p class="card-text">{note.description} Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quod autem, quisquam minima animi rerum quos itaque nemo facilis nulla delectus quasi? Optio perspiciatis atque explicabo pariatur aperiam molestiae maxime tempore ducimus vitae, sit ipsum.</p>
                  </div>
          </div>
    </div>
  )
}

export default NoteItem