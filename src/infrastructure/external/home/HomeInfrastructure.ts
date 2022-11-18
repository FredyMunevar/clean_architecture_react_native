import RequestHome from '../../../domain/home/model/requestHome';
import ResponseHome from '../../../domain/home/model/responseHome';
import {IHomeInfrastructure} from '../../../domain/interfaces/infrastructure/iHomeInfrastructure';
import axios from 'axios';
import Card from '../../../domain/home/model/card';
import {MMKV} from 'react-native-mmkv';

export default class HomeInfrastructure implements IHomeInfrastructure {
  public async getHomeServer(request: RequestHome): Promise<ResponseHome> {
    request.customer = '1';

    const storage = new MMKV();

    const responseServer = await axios.get(
      'https://db.ygoprodeck.com/api/v7/cardinfo.php?fname=Magician',
    );

    storage.set('persistedData', JSON.stringify(responseServer.data));
    const jsonDataPersisted = storage.getString('persistedData');
    let dataPersistedObject;

    if (jsonDataPersisted !== undefined) {
      dataPersistedObject = JSON.parse(jsonDataPersisted);
    }

    // const cards = responseServer.data;
    const cards = dataPersistedObject;
    const response: Card[] = [];
    const dataKind =
      cards === dataPersistedObject ? 'persisted' : 'non persisted';

    for (const cardItem of cards.data) {
      const item: Card = new Card();
      item.name = cardItem.name;
      item.type = cardItem.type;
      item.attribute = cardItem.attribute;
      item.dataKind = dataKind;
      response.push(item);
    }
    console.log('===============> responseServer.data', responseServer.data);
    console.log('===============> dataObject.data', dataPersistedObject);

    return {count: response.length, cards: response, error: ''};
  }
}
