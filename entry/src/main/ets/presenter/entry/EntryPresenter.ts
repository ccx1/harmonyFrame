import BasePresenter from '../../base/BasePresenter';
import { rq } from '../../utils/HttpManager';
import Logger from '../../utils/Logger';


export default class EntryPresenter extends BasePresenter {
  init(): void {
    rq({
      url: 'https://app.wzmtr.com:6443/inner-service/ad/banner'
    }).then((result) => {
      Logger.log(result)
    }).catch((e) => {
      Logger.log(e)
    })
  }
}