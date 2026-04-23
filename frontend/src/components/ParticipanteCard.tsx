import { useParticipantes } from '../context/ParticipantesContext';
import { Participante } from '../models/Participante';

export const ParticipanteCard = ({ id, nombre, email, edad, ciudad }: Participante) => {
  const { eliminar } = useParticipantes();

  const handleEliminar = async () => {
    if (window.confirm(`¿Estás seguro de que deseas eliminar a ${nombre}?`)) {
      try {
        await eliminar(id);
      } catch (error) {
        console.error('Error al eliminar:', error);
      }
    }
  };

  return (
    <div style={styles.card}>
      <h3 style={styles.title}>{nombre}</h3>
      <p style={styles.text}><strong>Email:</strong> {email}</p>
      <p style={styles.text}><strong>Edad:</strong> {edad}</p>
      <p style={styles.text}><strong>Ciudad:</strong> {ciudad}</p>
      <button onClick={handleEliminar} style={styles.deleteButton}>
        Eliminar
      </button>
    </div>
  );
};

const styles = {
  card: {
    padding: '12px',
    backgroundColor: '#ffffff',
    border: '2px solid #4CAF50',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    minHeight: '200px',
    display: 'flex',
    flexDirection: 'column' as const,
    justifyContent: 'space-between',
  },
  title: {
    color: '#1a1a1a',
    fontSize: '16px',
    marginTop: '0',
    marginBottom: '8px',
    fontWeight: 'bold',
  },
  text: {
    color: '#333',
    fontSize: '13px',
    margin: '4px 0',
  },
  deleteButton: {
    padding: '8px 12px',
    backgroundColor: '#f44336',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    marginTop: '10px',
    fontWeight: 'bold',
    fontSize: '12px',
    transition: 'background-color 0.3s',
  },
};
