import React from 'react'
import Resize from "react-image-file-resizer"
import { useSelector } from 'react-redux'
function FileUpload() {
    return (
        <div className="form-group" >
            <label>เลือกรูปภาพ...
                <input className="form-control" type="file" name="image" />
            </label>
        </div>
    )
}

export default FileUpload