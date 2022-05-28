import React, {userRef, useEffect, useState, useRef} from "react"
import {Button} from "@chakra-ui/react";
import axios from "axios"

function Webcam() {

    const videoRef = useRef(null);
    const photoRef = useRef(null);
    const ImageNameRef = useRef(null);
    const [hasPhoto, setHasPhoto] = useState(false)
    const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjUzMjE4OTcyLCJpYXQiOjE2NTMxMzI1NzIsImp0aSI6Ijg5MDZlNDFmMGU5MDRjNDFiNTNhNjZkNzM4MTY0MTRlIiwidXNlcl9pZCI6MTB9.z2FJSCIcu1FowCABMfufvX2EFQpKutsoh4s1zUPWAsc'
    const file = true;

    const getVideo = () => {
        navigator.mediaDevices
            .getUserMedia({
                video: { width: 1280, height: 720}
        })
        .then(stream => {
            let video = videoRef.current;
            video.srcObject = stream;
            video.play()
        })
        .catch(err => {
            console.error(err);
        })
    }

    const takePhoto = () => {
        const width = 414;
        const height = width / (16/9);
        let video = videoRef.current;
        let photo = photoRef.current;

        photo.width = width;
        photo.height = height;
        
        var image = new Image();
        image.src = photo.toDataURL();
        localStorage.setItem('myPic', image);

        // var formData = new FormData();
        // formData.append("query_image_url", image);
        // if(file){
        //     try{
        //       axios.post("http://localhost:8000/api/criminal-image-detection/",formData, {headers: {
        //       'content-type': 'multipart/form-data', 'Authorization': `Bearer ${token}`
        //     }})
        //       .then(res => {
        //         console.log(res.json())
        //       })
        //       .catch(err => console.log(err))
        //     }catch(err){console.log(err);};
        //   };
        
        // const dataURLtoFile = (dataurl, filename) => {
        //     const arr = dataurl.split(',')
        //     const mime = arr[0].match(/:(.*?);/)[1]
        //     const bstr = atob(arr[1])
        //     let n = bstr.length
        //     const u8arr = new Uint8Array(n)
        //     while (n) {
        //       u8arr[n - 1] = bstr.charCodeAt(n - 1)
        //       n -= 1 // to make eslint happy
        //     }
        //     return new File([u8arr], filename, { type: mime })
        //   }
          
          // generate file from base64 string
        //   const file = dataURLtoFile(image)
          // put file into form data
          var data = new FormData()
          data.append('query_image_url', photoRef.current, photoRef.current.name)
          
          // now upload
          const config = {
            headers: { 'content-Type': 'multipart/form-data', 'Authorization': `Bearer ${token}` }
          }
          axios.post("http://localhost:8000/api/criminal-image-detection/", data, config).then(response => {
            console.log(response.data)
          })

        // function b64toBlob(b64Data, contentType, sliceSize) {
        //     contentType = contentType || '';
        //     sliceSize = sliceSize || 512;
        
        //     var byteCharacters = atob(b64Data); // window.atob(b64Data)
        //     var byteArrays = [];
        
        //     for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        //         var slice = byteCharacters.slice(offset, offset + sliceSize);
        
        //         var byteNumbers = new Array(slice.length);
        //         for (var i = 0; i < slice.length; i++) {
        //             byteNumbers[i] = slice.charCodeAt(i);
        //         }
        
        //         var byteArray = new Uint8Array(byteNumbers);
        
        //         byteArrays.push(byteArray);
        //     }
        
        //     var blob = new Blob(byteArrays, {type: contentType});
        //     return blob;
        // }

        // var ImageURL = image; // 'photo' is your base64 image
        // // Split the base64 string in data and contentType
        // var block = ImageURL.split(";");
        // // Get the content type of the image
        // var contentType = block[0].split(":")[1];// In this case "image/gif"
        // // get the real base64 content of the file
        // var realData = block[1].split(",")[1];

        // // Convert it to a blob to upload
        // var blob = b64toBlob(realData, contentType);

        // // Create a FormData and append the file with "image" as parameter name
        // var formDataToUpload = new FormData();
        // formDataToUpload.append("query_image_url", blob);

        // const config = {
        //   headers: { 'content-Type': 'multipart/form-data', 'Authorization': `Bearer ${token}` }
        // }
        // axios.post("http://localhost:8000/api/criminal-image-detection/", formDataToUpload, config).then(response => {
        //   console.log(response.data)
        // })


        let ctx = photo.getContext('2d');
        ctx.drawImage(video, 0, 0, width, height);
        setHasPhoto(true);
    }

    // const uploadImages = () => {
    //     var formData = new FormData();
    //     var imagefile = document.querySelector('#file');
    //     formData.append("image", imagefile.files[0]);
    //     axios.post('upload_file', formData, {
    //         headers: {
    //         'Content-Type': 'multipart/form-data'
    //         }
    //     })
    //     form_data.append("query_image_url", {
    //         uri: photoRef.current['assets'][0].uri,
    //         name: ImageNameRef.current,
    //         path: photoRef.current['assets'][0].uri,
    //         newName: '123456',
    //         type: photoRef.current['assets'][0].type
    //     });

    //     const file = true;
    //     if(file){
    //       try{
    //         axios.post("http://localhost:8000/api/criminal-image-detection/",form_data, {headers: {
    //         'content-type': 'multipart/form-data', 'Authorization': `Bearer ${token}`
    //       }})
    //         .then(res => {
    //           console.log(res.json())
    //         })
    //         .catch(err => console.log(err))
    //       }catch(err){console.log(err);};
    //     };
    // }

    const closePhoto = () => {
        let photo = photoRef.current;
        let ctx = photo.getContext('2d');
        ctx.clearRect(0, 0, photo.width, photo.height);
        setHasPhoto(false);
    }

    useEffect(() => {
        getVideo();
    }, [videoRef]);

    return(
        <div className="App">
            <div className="camera">
                <video ref = {videoRef}></video>
                <Button onClick={takePhoto}>SNAP</Button>
            </div>
            <div className={'result ' + (hasPhoto ? 'hasPhoto' : '')}>
                <canvas ref = {photoRef} variant='brand'
                  fontSize='10px'
                  type='submit'
                  w='100%'
                  maxW='350px'
                  h='45'
                  mb='20px'
                  mt='20px'></canvas>
                <Button onClick={closePhoto} variant='brand'
                  fontSize='10px'
                  type='submit'
                  w='100%'
                  maxW='350px'
                  h='45'
                  mb='20px'
                  mt='20px'>CLOSE</Button>
            </div>
        </div>
        
    );

}
export default Webcam;