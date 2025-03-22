import React, { useRef, useState } from 'react';
import './Toast.css';

const Toast = () => {

  const [toast, setToast] = useState([]);
  const timerRef = useRef({});

  const showToast = (message, type) => {
    const id = new Date().getTime();
    const newToast = [...toast, { id, message, type }];
    setToast(newToast);
    timerRef.current[id] = setTimeout(() => closeToast(id), 5000);
  }

  const closeToast = (id) => {
    clearTimeout(timerRef.current[id]);
    delete timerRef.current[id];
    setToast((prevToast) => {
      const filteredArray = prevToast.filter((toast) => { return toast.id !== id });
      return filteredArray;
    })

  }

  return (
    <div className='container'>
      <div className="toast-container">
        {toast?.map(({ message, id, type }) => {
          return <div key={id} className={`toast ${type}`}>
            {message} <span onClick={() => closeToast(id)}>X</span>
          </div>
        })}
      </div>
      <div className='btn-container'>
        <button className='button' onClick={() => showToast('Success', 'success')}>Success Toast</button>
        <button className='button' onClick={() => showToast('Warning', 'warning')}>Warning Toast</button>
        <button className='button' onClick={() => showToast('Info', 'info')}>Info toast</button>
        <button className='button' onClick={() => showToast('Error', 'error')}>Error Toast</button>
      </div>
    </div>
  )
}

export default Toast;