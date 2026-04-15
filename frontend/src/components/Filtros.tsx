import { useState } from 'react';
import { useParticipantes } from '../context/ParticipantesContext';

export const Filtros = () => {
  const { participantes } = useParticipantes();
  const [filtro, setFiltro] = useState('');

  const participantesFiltrados = participantes.filter(p =>
    p.nombre.toLowerCase().includes(filtro.toLowerCase()) ||
    p.email.toLowerCase().includes(filtro.toLowerCase()) ||
    p.ciudad.toLowerCase().includes(filtro.toLowerCase())
  );

  return (
    <div style={styles.container}>
      <input
        type="text"
        placeholder="Buscar por nombre, email o ciudad..."
        value={filtro}
        onChange={(e) => setFiltro(e.target.value)}
        style={styles.searchInput}
      />
      <p style={styles.resultCount}>
        Resultados: {participantesFiltrados.length} de {participantes.length}
      </p>
    </div>
  );
};

const styles = {
  container: {
    marginBottom: '20px',
  },
  searchInput: {
    width: '100%',
    padding: '10px',
    fontSize: '14px',
    border: '1px solid #ddd',
    borderRadius: '4px',
  },
  resultCount: {
    fontSize: '14px',
    color: '#666',
    marginTop: '10px',
  },
};
