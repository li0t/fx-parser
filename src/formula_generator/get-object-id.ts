/**
 * Builds a MongoDb valid ObjectId
 * @returns {String} A random id
 */
export default function getObjectId(): string {
  const timestamp = ((new Date().getTime() / 1000) | 0).toString(16); //eslint-disable-line

  return (
    timestamp +
    'xxxxxxxxxxxxxxxx'
      .replace(/[x]/g, () => {
        return ((Math.random() * 16) | 0).toString(16); //eslint-disable-line
      })
      .toLowerCase()
  );
}
