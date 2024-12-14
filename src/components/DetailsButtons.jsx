import { useNavigate } from 'react-router-dom';
import useWakeLock from '../hooksUser/useWakeLock';

const DetailsButtons = ({ setIsModalOpen, setIsEditOpen }) => {
  const { requestWakeLock, releaseWakeLock } = useWakeLock();

  const navigate = useNavigate();
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'nowrap',
        justifyContent: 'center',
      }}
    >
      <button
        onClick={() => {
          releaseWakeLock();
          navigate(-1);
        }}
        style={{
          marginTop: '10px',
          padding: '10px 15px',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          marginRight: '10px',
          width: '50px',
        }}
      >
        ↩
      </button>

      <button
        onClick={() => setIsModalOpen(true)}
        style={{
          marginTop: '10px',
          padding: '10px 15px',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          marginRight: '10px',
          width: '50px',
        }}
      >
        ✖
      </button>

      <button
        onClick={() => setIsEditOpen(true)}
        style={{
          marginTop: '10px',
          padding: '10px 15px',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          width: '50px',
        }}
      >
        ✍
      </button>
    </div>
  );
};

export default DetailsButtons;
