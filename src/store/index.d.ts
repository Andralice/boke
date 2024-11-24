// src/store/index.d.ts
import { Store } from 'vuex';

declare module './index' {
  const store: Store<any>;
  export default store;
}