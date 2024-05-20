import distributedKVStore from '@ohos.data.distributedKVStore';
import { getApplicationContext } from '../manager/AppManager';


const AppContext = getApplicationContext()
const kvManagerConfig = {
  context: AppContext,
  bundleName: AppContext.applicationInfo.name
};

const kvManager = distributedKVStore.createKVManager(kvManagerConfig);


const options = {
  createIfMissing: true,
  encrypt: false,
  backup: false,
  autoSync: true,
  kvStoreType: distributedKVStore.KVStoreType.SINGLE_VERSION,
  securityLevel: distributedKVStore.SecurityLevel.S2,
};

export interface KVStore {
  name: string,
  store: distributedKVStore.SingleKVStore
}

const stores: Array<KVStore> = [];

export async function initStore(storeIds: string[]) {
  for (let index = 0; index < storeIds.length; index++) {
    const storeId = storeIds[index];
    const store: distributedKVStore.SingleKVStore = await kvManager.getKVStore<distributedKVStore.SingleKVStore>(storeId, options)
    stores.push({
      name: storeId,
      store
    })
  }

}

export function put(name:string, key:string, value:boolean | string | number | Uint8Array): Promise<boolean> {
  const find = stores.find(n => n.name === name)
  find?.store.put(key, value)
  return Promise.reject(!!find)
}


export async  function get(name:string, key:string, defValue:boolean | string | number | Uint8Array): Promise<boolean | string | number | Uint8Array> {
  const find = stores.find(n => n.name === name)
  const value = await find?.store.get(key)
  return value || defValue
}