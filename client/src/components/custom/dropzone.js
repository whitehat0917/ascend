import React, { useMemo } from 'react';
import { useDropzone } from 'react-dropzone';
import DropzoneLogoImage from '../../assets/img/dropzone-logo.svg';

import { Text } from './styles';
import {
  DropzoneAcceptStyle,
  DropzoneBaseStyle,
  DropzoneWrapper
} from '../../views/pages/verification/verification.style';

const StyledDropzone = (props) => {
  const {
    getRootProps,
    getInputProps,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    accept: '.jpg, .png, .doc, .docx, .pdf',
    onDropAccepted: files => {
      props.setVerification(files[0], true);
    },
    onDropRejected: (files) => {
      props.setVerification(files[0].file, false);
    }
  });

  const style = useMemo(() => ({
    ...DropzoneBaseStyle,
    // ...(isDragActive ? DropZoneActiveStyle : {}),
    ...((isDragAccept || isDragReject || props.verificationFile.file) ? DropzoneAcceptStyle : {}),
    // ...(isDragReject ? DropzoneRejectStyle : {})
  }), [
    isDragReject,
    isDragAccept,
    props.verificationFile.file
  ]);
  return (
    <DropzoneWrapper>
      <div className="container">
        <div {...getRootProps({ style })}>
          <input {...getInputProps()} />
          {
            props.type === 'id-front' && 
            <Text color="#23A5D6" fontSize="9px">Swipe to Upload the Back Side</Text>
          }
          {
            props.type === 'id-back' && 
            <Text color="#23A5D6" fontSize="9px">Swipe to Upload the Front Side</Text>
          }
          <img src={DropzoneLogoImage} alt="dropzone-logo" style={{marginTop: props.type === 'bank' ? "23px" : '0'}} />
          {!props.verificationFile.file ?
            (
              props.type === 'id-front' ? (
                <>
                  <Text padding="1rem 0 0 0" fontSize="12px">Drag or click file to upload</Text>
                  <Text fontSize="14px">Front Side</Text>
                </>
              ) : 
              props.type === 'id-back' ? (
                <>
                  <Text padding="1rem 0 0 0" fontSize="12px">Drag or click file to upload</Text>
                  <Text fontSize="14px">Back Side</Text>
                </>
              ) : 
              props.type === 'bank' && (
                <>
                  <Text padding="1rem 0 0 0" fontSize="12px">Drag or click file to upload</Text>
                </>
              )
            )
            :
            (<Text padding="1rem 0 0 0" maxWidth="90%" fontSize="12px" whiteSpace="nowrap" overflow="hidden" textOverflow="ellipsis">{props.verificationFile?.file?.name}</Text>)}
        </div>
      </div>
    </DropzoneWrapper>
  );
};

export default StyledDropzone;
