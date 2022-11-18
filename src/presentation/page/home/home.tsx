import React, {useEffect} from 'react';
import {FlatList, Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import IState from '../../../domain/interfaces/presentation/IState';
import ResponseHome from '../../../domain/home/model/responseHome';
import {homePageBegin} from '../../redux/home/reducers';
import styles from './style';

const Home = () => {
  const dispatch = useDispatch();
  const data = useSelector<IState, ResponseHome>(state => state.home.data);
  const loading = useSelector<IState, boolean>(state => state.home.loading);

  useEffect(() => {
    if (data.count === 0) {
      dispatch(homePageBegin());
    }
  }, [data.count, dispatch]);

  // console.log('===============> data', data);

  return (
    <View style={styles.container}>
      {loading ? (
        <Text style={styles.loadingStyle}>Loading....</Text>
      ) : (
        <View style={styles.contentContainer}>
          <FlatList
            keyExtractor={item => item.name}
            data={data.cards}
            renderItem={({item}) => {
              console.log(item);
              return (
                <View style={styles.itemContainer}>
                  <Text style={styles.item}>{item.name}</Text>
                  <Text style={styles.itemKind}>{item.dataKind}</Text>
                </View>
              );
            }}
          />
        </View>
      )}
    </View>
  );
};

export default Home;
