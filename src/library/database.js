const dbName = "fontkeeper";
const defaultStore = "fonts";
const configStore = "config";
let db = null;

async function getDB() {
  if (!db) {
    db = new Promise((resolve, reject) => {
      const openreq = indexedDB.open(dbName, 1);

      openreq.onerror = () => {
        reject(openreq.error);
      };

      openreq.onupgradeneeded = (event) => {
        // First time setup: create an empty object store
        event.target.result.createObjectStore(configStore);
        event.target.result.createObjectStore(defaultStore, { keyPath: "id" });
      };

      openreq.onsuccess = () => {
        resolve(openreq.result);
      };
    });
  }
  return await db;
}

async function getAll(storeName) {
  return await tx("getAll", storeName, "readonly");
}

async function add(value, key, storeName) {
  return await tx("add", storeName, "readwrite", storeName, value, key);
}

async function put(value, key, storeName) {
  return await tx("put", storeName, "readwrite", value, key);
}

async function del(key, storeName) {
  return await tx("delete", storeName, "readwrite", key);
}

async function get(key, storeName) {
  return await tx("get", storeName, "readonly", key);
}

async function getAllKeys(storeName) {
  let request;
  await withStore(storeName, "readonly", (store) => {
    request = store.getAllKeys();
  });
  return request.result;
}

async function tx(method, storeName, permission, input, key) {
  let isMulti = Array.isArray(input);
  let request = isMulti ? [] : null;
  await withStore(storeName, permission, (store) => {
    if (isMulti) {
      input.forEach((val) => request.push(store[method](val)));
    } else {
      request = key ? store[method](input, key) : store[method](input);
    }
  });
  return isMulti ? request.map((r) => r.result) : request.result;
}

async function withStore(storeName = defaultStore, type, callback) {
  const db = await getDB(storeName);
  return await new Promise((resolve, reject) => {
    const transaction = db.transaction(storeName, type);
    transaction.oncomplete = function (e) {
      resolve(transaction.result);
    };
    transaction.onerror = function () {
      reject(transaction.error);
    };
    callback(transaction.objectStore(storeName));
  });
}

export default {
  getDB,
  get,
  add,
  del,
  put,
  getAll,
  getAllKeys,
};
