import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  console.error('putDb not implemented');

  //create connection
  const db = await openDB('jate', 1);

  //create new transaction
  const tx = db.transaction('jate', 'readwrite');

  //open stor
  const store = tx.objectStore('jate');

  //update data in store
  const request = store.put({ id: 1, content: content });

  //confirm
  const result = await request;
  console.log('database updated', result);
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  console.error('getDb not implemented');

  //create connection
  const db = await openDB('jate', 1);

  //create new tx
  const tx = db.transaction('jate', 'readonly');

  //open store
  const store = tx.objectStore('jate');

  //get data
  const request = store.getAll();

  //get information
  const result = await request;
  console.log('result', result);
  return result;
};

initdb();
