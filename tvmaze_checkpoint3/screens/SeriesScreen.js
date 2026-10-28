import { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';

export default function SeriesScreen({ navigation }) {
  const [series, setSeries] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    async function buscarSeries() {
      try {
        const resposta = await fetch('https://api.tvmaze.com/shows');
        if (!resposta.ok) {
          throw new Error('Erro ' + resposta.status);
        }
        const dados = await resposta.json();
        setSeries(dados);
      } catch (e) {
        setErro('Não foi possível carregar as séries. Verifique sua conexão.');
      } finally {
        setCarregando(false);
      }
    }

    buscarSeries();
  }, []);

  if (carregando) {
    return (
      <View style={styles.centro}>
        <ActivityIndicator size="large" color="#3c948b" />
        <Text style={styles.aviso}>Carregando séries...</Text>
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
      <FlatList
        data={series}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.item}
            onPress={() =>
              navigation.navigate('Episodios', { id: item.id, nome: item.name })
            }
          >
            {item.image ? (
              <Image source={{ uri: item.image.medium }} style={styles.poster} />
            ) : (
              <View style={[styles.poster, styles.semImagem]}>
                <Text style={styles.semImagemTexto}>Sem imagem</Text>
              </View>
            )}
            <Text style={styles.nome}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  centro: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24, backgroundColor: '#fff' },
  aviso: { marginTop: 12, color: '#666' },
  erro: { fontSize: 16, color: '#c0392b', textAlign: 'center' },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  poster: { width: 60, height: 85, borderRadius: 4 },
  semImagem: { backgroundColor: '#ddd', alignItems: 'center', justifyContent: 'center' },
  semImagemTexto: { fontSize: 10, color: '#666', textAlign: 'center' },
  nome: { flex: 1, fontSize: 16, fontWeight: 'bold', marginLeft: 12 },
});
