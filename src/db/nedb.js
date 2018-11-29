import DataStore from 'nedb';
const DB = new DataStore({
  filename: 'path/db',
  autoload: true,
});
export default DB
