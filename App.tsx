/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import {Provider} from 'react-redux';
import {store} from './src/presentation/redux/store';
import {RootNavigator} from './src/presentation/navegation/RootNavigator';
import DependencyInjectionDomain from './src/domain/dependencyInjectionDomain';
import DependencyInjectionInfrastructure from './src/infrastructure/dependencyInfrastructure';
import DependencyInjectionApplication from './src/application/dependencyInjectionApplication';
import DependencyInjectionPresentation from './src/presentation/dependencyPresentation';
import EStyleSheet from 'react-native-extended-stylesheet';

EStyleSheet.build();

DependencyInjectionDomain();
DependencyInjectionInfrastructure();
DependencyInjectionApplication();
DependencyInjectionPresentation();

const App = () => {
  return (
    <Provider store={store}>
      <RootNavigator />
    </Provider>
  );
};
export default App;
