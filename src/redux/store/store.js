// import { combineReducers, createStore, applyMiddleware } from "redux";
// import thunk from "redux-thunk"; // Import Redux Thunk middleware
// import { reducer1 } from "../reducer/reducer1";
// import { reducer2 } from "../reducer/reducer2";
// import { reducer3 } from "../reducer/reducer3";
// const combo = combineReducers({
//   reducer1,
//   reducer2,
//   reducer3,
// });

// // Apply Redux Thunk middleware when creating the store
// export const myStore = createStore(combo, applyMiddleware(thunk));


import { createStore, applyMiddleware } from "redux"; // Import applyMiddleware here
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import { combineReducers } from "redux";
import thunk from "redux-thunk"; 
import { reducer1 } from "../reducer/reducer1";
import { reducer2 } from "../reducer/reducer2";
import { reducer3 } from "../reducer/reducer3";

const persistConfig = {
  key: 'root',
  storage,
};

const rootReducer = combineReducers({
  reducer1,
  reducer2,
  reducer3,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Apply middleware and create store
export const myStore = createStore(persistedReducer, applyMiddleware(thunk));
export const persistor = persistStore(myStore);
