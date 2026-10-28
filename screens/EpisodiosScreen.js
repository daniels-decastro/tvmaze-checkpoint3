import { useState, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet } from 'react-native';

export default function EpisodiosScreen({ route }) {
  const { id, nome } = route.params;

  const [episodios, setEpisodios] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    async function buscarEpisodios() {
      try {
        const resposta = await fetch(`https://api.tvmaze.com/shows/${id}/episodes`);
        if (!resposta.ok) {
          throw new Error('Erro ' + resposta.status);
        }
        const dados = await resposta.json();
        setEpisodios(dados);
      } catch (e) {
        setErro('Não foi possível carregar os episódios.');
      } finally {
        setCarregando(false);
      }
    }

    buscarEpisodios();
  }, [id]);

  if (carregando) {
    return (
      <View style={styles.centro}>
        <ActivityIndicator size="large" color="#3c948b" />
        <Text style={styles.aviso}>Carregando episódios...</Text>
      </View>
    );
  }

  if (erro) {
    return (
      <View style={styles.centro}>
        <Text style={styles.erro}>{erro}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>{nome}</Text>
      <FlatList
        data={episodios}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.numero}>
              T{item.season} E{item.number}
            </Text>
            <Text style={styles.nome}>{item.name}</Text>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.aviso}>Nenhum episódio encontrado.</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  centro: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24, backgroundColor: '#fff' },
  aviso: { marginTop: 12, color: '#666', textAlign: 'center' },
  erro: { fontSize: 16, color: '#c0392b', textAlign: 'center' },
  titulo: { fontSize: 22, fontWeight: 'bold', padding: 16 },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  numero: { width: 70, fontWeight: 'bold', color: '#3c948b' },
  nome: { flex: 1, fontSize: 15 },
});
