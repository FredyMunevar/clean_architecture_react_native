import React, {useEffect, useState} from 'react';
import {Keyboard, Platform} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import IState from '../../../domain/interfaces/presentation/IState';
import ResponseHome from '../../../domain/home/model/responseHome';
import {homePageBegin} from '../../redux/home/reducers';
import {SafeAreaView} from 'react-native-safe-area-context';
import RichTextEditor from '../../components/RichTextEditor/RichTextEditor';

const RichTextPage: React.FC = () => {
  const dispatch = useDispatch();
  const data = useSelector<IState, ResponseHome>(state => state.home.data);
  const loading = useSelector<IState, boolean>(state => state.home.loading);

  useEffect(() => {
    if (data.count === 0) {
      dispatch(homePageBegin());
    }
  }, [dispatch]);

  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true); // or some other action
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false); // or some other action
      },
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#FFFFFF'}} edges={['top']}>
      <RichTextEditor showToolbar={isKeyboardVisible} />
    </SafeAreaView>
  );
};

export default RichTextPage;
