import React, {useEffect} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import IState from '../../../domain/interfaces/presentation/IState';
import ResponseHome from '../../../domain/home/model/responseHome';
import {homePageBegin} from '../../redux/home/reducers';
import Layout from '../../layout/index';
import styles from './style';

const Home: React.FC = () => {
  const dispatch = useDispatch();
  const data = useSelector<IState, ResponseHome>(state => state.home.data);
  const loading = useSelector<IState, boolean>(state => state.home.loading);

  useEffect(() => {
    if (data.count === 0) {
      dispatch(homePageBegin());
    }
  }, [dispatch]);

  return (
    <Layout title="lista de data">
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        {loading ? (
          <Text style={styles.loadingStyle}>Loading....</Text>
        ) : (
          <View style={styles.container}>
            <FlatList
              keyExtractor={item => item.name}
              data={data.cards}
              renderItem={({item}) => (
                <Text style={styles.item}>{item.name}</Text>
              )}
            />
          </View>
        )}
      </View>
    </Layout>
  );
};

export default Home;
