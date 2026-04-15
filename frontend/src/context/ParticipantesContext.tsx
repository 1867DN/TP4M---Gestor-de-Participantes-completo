import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';
import { Participante } from '../models/Participante';

interface ContextType {
  participantes: Participante[];
  agregar: (p: Participante) => Promise<void>;
  eliminar: (id: number) => Promise<void>;
  resetear: () => void;
  loading: boolean;
}

const ParticipantesContext = createContext<ContextType | undefined>(undefined);

const API_URL = 'http://localhost:8000';

export const ParticipantesProvider = ({ children }: { children: ReactNode }) => {
  const [participantes, setParticipantes] = useState<Participante[]>([]);
  const [loading, setLoading] = useState(false);

  // Cargar participantes al montar el componente
  useEffect(() => {
    cargarParticipantes();
  }, []);

  const cargarParticipantes = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/participantes`);
      setParticipantes(response.data);
    } catch (error) {
      console.error('Error al cargar participantes:', error);
    } finally {
      setLoading(false);
    }
  };

  const agregar = async (participante: Omit<Participante, 'id'>) => {
    try {
      const response = await axios.post(`${API_URL}/participantes`, participante);
      setParticipantes([...participantes, response.data]);
    } catch (error) {
      console.error('Error al agregar participante:', error);
      throw error;
    }
  };

  const eliminar = async (id: number) => {
    try {
      await axios.delete(`${API_URL}/participantes/${id}`);
      setParticipantes(participantes.filter(p => p.id !== id));
    } catch (error) {
      console.error('Error al eliminar participante:', error);
      throw error;
    }
  };

  const resetear = () => {
    setParticipantes([]);
  };

  return (
    <ParticipantesContext.Provider
      value={{
        participantes,
        agregar,
        eliminar,
        resetear,
        loading,
      }}
    >
      {children}
    </ParticipantesContext.Provider>
  );
};

export const useParticipantes = () => {
  const context = useContext(ParticipantesContext);
  if (context === undefined) {
    throw new Error('useParticipantes debe ser usado dentro de ParticipantesProvider');
  }
  return context;
};
