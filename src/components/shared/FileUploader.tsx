import {useCallback, useState} from 'react'
import { FileWithPath, useDropzone} from 'react-dropzone'
import { Button } from '../ui/button';

type FileUploaderProps = {
  fieldChange: (FILES: File[]) => void;
  mediaUrl: string;
}

const FileUploader = ({ fieldChange, mediaUrl }: FileUploaderProps) => {
  const [file, setFile] = useState<File[]>([]);
  const [fileUrl, setFileUrl] = useState(mediaUrl || '');

  const onDrop = useCallback(
    (acceptedFiles: FileWithPath[]) => {
      setFile(acceptedFiles);
      fieldChange(acceptedFiles)
      setFileUrl(URL.createObjectURL(acceptedFiles[0]));
    }, [file])

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.png', '.jpg', '.svg']
    }
  })
  
  
  return (
    <div {...getRootProps()}
     className='flex flex-col flex-center bg-dark-3
     rounded-2xl cursor-pointer'>
      <input {...getInputProps()} 
      className='cursor-pointer '/>
      {
        fileUrl ? (
          <>
            <div className='flex flex-1 w-full justify-center
            p-5 lg:p-10'>
              <img 
                src={fileUrl}
                className='file_uploader-img'
                alt='image'
              />
            </div>
            <p className='file_uploader-label'>Click or drag photo to replace</p>
          </>
        ) : (
          <div className='file_uploader-box gap-2'>
            <img
              src='/assets/icons/file-upload.svg'
              alt='file-upload'
            />
            <p className='small-medium'>Drag photo here</p>
            <p className='small-medium text-light-4'>SVG PNG JPEG JPG</p>
            <Button className='shad-button_dark_4'>Select from computer</Button>
          </div>
        )
      }
    </div>
  )
}

export default FileUploader