import React from 'react'
import { BsXLg } from "react-icons/bs";
import Resize from "react-image-file-resizer"
import { useSelector } from 'react-redux'
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
function FileUpload({ values, setValues, loading, setLoad }) {
    const user = useSelector((state) => ({ ...state }));
    const handleChangeFile = (e) => {
        const files = e.target.files;
        if (files) {
            let allfileUpload = values.images; //[]
            setLoad(true)
            for (let i = 0; i < files.length; i++) {
                Resize.imageFileResizer(
                    files[i],
                    720,
                    720,
                    "JPEG",
                    100,
                    0,
                    (uri) => {
                        axios
                            .post(
                                process.env.REACT_APP_API + "/images",
                                {
                                    image: uri,
                                },
                                {
                                    headers: {
                                        authtoken: user.userStore.user.token,
                                    },
                                }
                            ).then((res) => {
                                setLoad(false)
                                allfileUpload.push(res.data)
                                console.log("allfileupload in then", allfileUpload);
                                setValues({ ...values, images: allfileUpload });
                            })
                            .catch((err) => {
                                console.log(err);
                            });
                    },
                    "base64"
                );
            }
        }
    };
    const handleRemove = (public_id) => {
        setLoad(true)
    console.log(public_id);
    // const img = values.images
    const {images}  = values;
    console.log(images);
    axios
      .post(
        process.env.REACT_APP_API + "/removeimages",
        { public_id },
        {
          headers: {
            authtoken: user.userStore.user.token,
          },
        }
      )
      .then((res) => {
        setLoad(false)
        let filterImages = images.filter((item) => {
          return item.public_id !== public_id;
        });
        console.log(filterImages);
        values.images = filterImages
      })
      .catch((err) => {
        //err
        setLoad(false)
        console.log(err);
      });

    };

    return (
        <>
            {values.images &&
                values.images.map((c) => (
                    <span style={{color:"red",cursor:"pointer"}} className="badge" onClick={() => handleRemove(c.public_id)}>
                        <BsXLg />
                        <img src={c.url} className='img-thumbnail' width="100" height="300" />
                    </span>
                ))}

            <div className="form-group" >
                <label>Choose Image...
                    <input className="form-control" type="file" name="image" accept='image/*' multiple onChange={handleChangeFile} />
                </label>
            </div>
        </>
    )

}
export default FileUpload