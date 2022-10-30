import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
    let notesIntial = [
        {
            "_id": "635d2d0b38ae1096345f72f4",
            "user": "635c040b171bf86fe56ab3fd",
            "title": "f",
            "description": "testing purpose updated",
            "tag": "general",
            "date": "2022-10-29T13:39:23.742Z",
            "__v": 0
        },
        {
            "_id": "635e11e08dde2f4a128dcfa4",
            "user": "635c040b171bf86fe56ab3fd",
            "title": "testing",
            "description": "testing description",
            "tag": "general",
            "date": "2022-10-30T05:55:44.036Z",
            "__v": 0
        },
        {
            "_id": "635e11e58dde2f4a128dcfa6",
            "user": "635c040b171bf86fe56ab3fd",
            "title": "testing",
            "description": "testing description",
            "tag": "general",
            "date": "2022-10-30T05:55:49.275Z",
            "__v": 0
        },
        {
            "_id": "635d2d0b38ae1096345f72f4",
            "user": "635c040b171bf86fe56ab3fd",
            "title": "f",
            "description": "testing purpose updated",
            "tag": "general",
            "date": "2022-10-29T13:39:23.742Z",
            "__v": 0
        },
        {
            "_id": "635e11e08dde2f4a128dcfa4",
            "user": "635c040b171bf86fe56ab3fd",
            "title": "testing",
            "description": "testing description",
            "tag": "general",
            "date": "2022-10-30T05:55:44.036Z",
            "__v": 0
        },
        {
            "_id": "635e11e58dde2f4a128dcfa6",
            "user": "635c040b171bf86fe56ab3fd",
            "title": "testing",
            "description": "testing description",
            "tag": "general",
            "date": "2022-10-30T05:55:49.275Z",
            "__v": 0
        },

    ];
    const [notes, setNotes] = useState(notesIntial)
    return (
        <NoteContext.Provider value={{ notes, setNotes }}>
            {props.children}
        </NoteContext.Provider>)
}

export default NoteState