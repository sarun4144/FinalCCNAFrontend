import React from 'react'
import Resize from "react-image-file-resizer"
import { useSelector } from 'react-redux'
function FileUpload() {

    function handleChangeFile (e){
        const files = e.target.files;
    }

    return (
        <div className="form-group" >
            <label>เลือกรูปภาพ...
                <input className="form-control" type="file" name="image" accept='image/*' onClick={handleChangeFile} />
            </label>
        </div>
    )
}

export default FileUpload