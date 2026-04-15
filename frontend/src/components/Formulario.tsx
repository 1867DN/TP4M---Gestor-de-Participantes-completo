import { useState } from 'react';
import { useParticipantes } from '../context/ParticipantesContext';

export const Formulario = () => {
  const { agregar } = useParticipantes();
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    edad: '',
    ciudad: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!formData.nombre || !formData.email || !formData.edad || !formData.ciudad) {
      setError('Todos los campos son requeridos');
      return;
    }

    try {
      await agregar({
        id: 0, // El backend asignará el ID
        nombre: formData.nombre,
        email: formData.email,
        edad: parseInt(formData.edad),
        ciudad: formData.ciudad,
      });
      setFormData({
        nombre: '',
        email: '',
        edad: '',
        ciudad: '',
      });
    } catch (err) {
      setError('Error al agregar participante');
    }
  };

  return (
    <div style={styles.formularioContainer}>
      <h2 style={styles.title}>Agregar Participante</h2>
      {error && <div style={styles.error}>{error}</div>}
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          name="nombre"
          placeholder="Nombre"
          value={formData.nombre}
          onChange={handleChange}
          style={styles.input}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          style={styles.input}
        />
        <input
          type="number"
          name="edad"
          placeholder="Edad"
          value={formData.edad}
          onChange={handleChange}
          style={styles.input}
        />
        <input
          type="text"
          name="ciudad"
          placeholder="Ciudad"
          value={formData.ciudad}
          onChange={handleChange}
          style={styles.input}
        />
        <button type="submit" style={styles.button}>
          Agregar
        </button>
      </form>
    </div>
  );
};

const styles = {
  formularioContainer: {
    padding: '20px',
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    marginBottom: '30px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    border: '1px solid #e0e0e0',
  },
  title: {
    color: '#1a1a1a',
    fontSize: '20px',
    marginTop: 0,
    marginBottom: '15px',
    fontWeight: 'bold',
  },
  form: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '10px',
  },
  input: {
    padding: '12px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    fontSize: '14px',
    fontFamily: 'inherit',
    backgroundColor: '#ffffff',
    color: '#333',
  },
  button: {
    padding: '12px 20px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: 'bold',
    transition: 'background-color 0.3s',
  },
  error: {
    color: '#d32f2f',
    marginBottom: '10px',
    padding: '12px',
    backgroundColor: '#ffebee',
    borderRadius: '4px',
    border: '1px solid #ef5350',
  },
};
