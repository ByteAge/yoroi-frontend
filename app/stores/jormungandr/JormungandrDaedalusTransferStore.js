// @flow

import Store from '../base/Store';
import {
  daedalusTransferTxFromAddresses,
} from '../../api/jormungandr/lib/transactions/transfer/legacyDaedalus';
import type { BuildTxFunc } from '../toplevel/DaedalusTransferStore';

export default class JormungandrDaedalusTransferStore extends Store {

  buildTx: BuildTxFunc = async (request) => {
    const selectedNetwork = this.stores.profile.selectedNetwork;
    if (selectedNetwork == null) throw new Error(`${nameof(JormungandrDaedalusTransferStore)} transfer tx no selected network`);
    return await daedalusTransferTxFromAddresses({
      addressKeys: request.addressKeys,
      outputAddr: request.outputAddr,
      getUTXOsForAddresses:
        this.stores.substores.ada.stateFetchStore.fetcher.getUTXOsForAddresses,
    });
  }
}
