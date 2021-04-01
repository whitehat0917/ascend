import styled from 'styled-components';
import DropzoneBorderImage from '../../../assets/img/dropzone-border.svg';
import DropzoneInvalidateImage from '../../../assets/img/dropzone-invalidate.svg';
import DropzoneValidateImage from '../../../assets/img/dropzone-validate.svg';

export const DropzoneComponentWrapper = styled.div`
  position: relative;
  margin: 10px 8px;
  border-radius: 10px;
  box-shadow: 0 3px 6px #00000016;
  background-color: white;
  div.container {
    div:last-child:focus { 
      border: none;
      outline: none;
      background: #2196f3;
    } 
  }
  .dropzone-info {
    margin-top: 1rem;
    padding: 5px 15px 0 15px;
    .custom-radio{
      border: none;
      padding: 0 0 0 40px;
      min-height: 25px;
    }
    ul {
      font-size: 12px;
      text-align: left;
      li {
        font-size: 14px;
      }
    }
  }
  &.is-valid{
    border: 2px solid #60BB7D;
  }
  &.is-invalid{
    border: 2px solid #F73757;
  }
  &.is-valid::before{
    content: ' ';
    background-image: url(${DropzoneValidateImage});
    width: 48px;
    height: 48px;
    display: block;
    position: absolute;
    top: -1.3rem;
    left: -1.3rem;
  }
  &.is-invalid::before{
    content: ' ';
    background-image: url(${DropzoneInvalidateImage});
    width: 48px;
    height: 48px;
    display: block;
    position: absolute;
    top: -1.3rem;
    left: -1.3rem;
  }
  &.bank-valid::before{
    right: -1.3rem;
    left: auto;
  }
`;

export const DropzoneWrapper = styled.div`
  cursor: pointer;
  min-height: 10rem !important;
  width: 17rem !important;
  padding: 1.5rem .5rem .75rem .5rem;
  height: auto !important;
  .img-thumbnail {
      height: 58px !important;
      width: 100% !important;
      object-fit: cover !important;
  }
  
  div.dropzone-badge {
    position: absolute;
    
  }
  
  .dropzone-badge-bank {
    right: -1.3rem;
    top: -1.3rem;
  }
  
  .dropzone-badge-id {
    left: -1.3rem;
    top: -1.3rem;
  }
`;

export const SkipButton = styled.div`
  margin-top: 1rem;
  a {
    text-decoration: underline;
  }
`;

export const DropzoneBaseStyle = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '1rem .25rem 1rem .25rem',
  backgroundImage: `url(${DropzoneBorderImage})`,
  backgroundColor: 'white',
  transition: 'backgroundColor .24s ease-in-out',
};

export const DropZoneActiveStyle = {
  backgroundColor: '#2196f3'
};

export const DropzoneAcceptStyle = {
  backgroundColor: '#F8F8F8'
};

export const DropzoneRejectStyle = {
  backgroundColor: '#F8F8F8'
};
