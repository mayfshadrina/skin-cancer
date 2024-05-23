const { Firestore } = require('@google-cloud/firestore');

async function getData() {
    const db = new Firestore();
    const predictCollection = db.collection('predictions');

    try {
        const snapshot = await predictCollection.get();
        const result = [];

        snapshot.forEach(doc => {
            result.push({ id: doc.id, data: doc.data() });
        });

        return result;
    } catch (error) {
        throw new ClientError('Terjadi kesalahan dalam melakukan prediksi')
    }
}

module.exports = getData;