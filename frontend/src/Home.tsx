import { useParticipantes } from './context/ParticipantesContext';
import { Formulario } from './components/Formulario';
import { ParticipanteCard } from './components/ParticipanteCard';
import { useState } from 'react';

function Home() {
  const { participantes, loading } = useParticipantes();
  const [filtro, setFiltro] = useState('');

  const participantesFiltrados = participantes.filter(p =>
    p.nombre.toLowerCase().includes(filtro.toLowerCase()) ||
    p.email.toLowerCase().includes(filtro.toLowerCase()) ||
    p.ciudad.toLowerCase().includes(filtro.toLowerCase()) ||
    p.edad.toString().includes(filtro)
  );

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1>Gestor de Participantes</h1>
        <p>Administra los participantes de tu evento</p>
      </header>

      <div style={styles.content}>
        <Formulario />

        <div style={styles.searchSection}>
          <input
            type="text"
            placeholder="Buscar por nombre, email, ciudad o edad..."
            value={filtro}
            onChange={(e) => setFiltro(e.target.value)}
            style={styles.searchInput}
          />
          <p style={styles.resultCount}>
            Mostrando {participantesFiltrados.length} de {participantes.length} participantes
          </p>
        </div>

        {loading ? (
          <p style={styles.loading}>Cargando participantes...</p>
        ) : participantesFiltrados.length === 0 ? (
          <p style={styles.noResults}>
            {participantes.length === 0 ? 'No hay participantes aún' : 'No se encontraron resultados'}
          </p>
        ) : (
          <div style={styles.cardContainer}>
            {participantesFiltrados.map(participante => (
              <ParticipanteCard
                key={participante.id}
                {...participante}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#2196F3',
    color: 'white',
    padding: '30px',
    textAlign: 'center' as const,
  },
  content: {
    maxWidth: '1000px',
    margin: '0 auto',
    padding: '20px',
  },
  searchSection: {
    marginBottom: '20px',
  },
  searchInput: {
    width: '100%',
    padding: '12px',
    fontSize: '14px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    boxSizing: 'border-box' as const,
    backgroundColor: '#ffffff',
    color: '#333',
  },
  resultCount: {
    fontSize: '14px',
    color: '#555',
    marginTop: '10px',
    fontWeight: '500',
  },
  cardContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '15px',
  },
  loading: {
    textAlign: 'center' as const,
    padding: '40px',
    fontSize: '16px',
    color: '#666',
  },
  noResults: {
    textAlign: 'center' as const,
    padding: '40px',
    fontSize: '16px',
    color: '#999',
  },
};

export default Home;
