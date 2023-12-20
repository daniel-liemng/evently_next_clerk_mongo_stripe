import { OurFileRouter } from '@/app/api/uploadthing/core';
import { UploadDropzone } from '@/lib/uploadthing';
import { FileWithPath } from '@uploadthing/react';
import { Dispatch, SetStateAction, useCallback } from 'react';
import { useDropzone } from '@uploadthing/react/hooks';
import { generateClientDropzoneAccept } from 'uploadthing/client';
import { convertFileToUrl } from '@/lib/helpers';
import Image from 'next/image';
import { Button } from '../ui/button';

interface FileUploadProps {
  imageUrl: string;
  onFieldChange: (url: string) => void;
  setFiles: Dispatch<SetStateAction<File[]>>;
}

const FileUpload = ({ imageUrl, onFieldChange, setFiles }: FileUploadProps) => {
  const onDrop = useCallback(
    (acceptedFiles: FileWithPath[]) => {
      setFiles(acceptedFiles);
      onFieldChange(convertFileToUrl(acceptedFiles[0]));
    },
    [setFiles, onFieldChange]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: 'image/*' ? generateClientDropzoneAccept(['image/*']) : undefined,
  });

  return (
    <div>
      {/* Way 1 */}
      {/* {imageUrl ? (
        <div className='flex h-full w-full flex-1 justify-center '>
          <Image
            src={imageUrl}
            alt='image'
            width={250}
            height={250}
            className='w-full object-cover object-center'
          />
        </div>
      ) : (
        <UploadDropzone endpoint='imageUploader' />
      )} */}

      {/* Way 2 - More Customized */}
      <div
        {...getRootProps()}
        className='flex-center bg-dark-3 flex h-52 cursor-pointer flex-col overflow-hidden rounded-xl bg-grey-50'
      >
        <input {...getInputProps()} className='cursor-pointer' />

        {imageUrl ? (
          <div className='flex h-full w-full flex-1 justify-center '>
            <Image
              src={imageUrl}
              alt='image'
              width={250}
              height={250}
              className='w-full object-cover object-center'
            />
          </div>
        ) : (
          <div className='flex-center flex-col py-5 text-grey-500'>
            <Image
              src='/assets/icons/upload.svg'
              width={65}
              height={65}
              alt='file upload'
            />
            <h3 className='mb-2 mt-2'>Drag photo here</h3>
            <p className='p-medium-12 mb-4'>SVG, PNG, JPG</p>
            <Button type='button' className='rounded-full'>
              Select from computer
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FileUpload;
