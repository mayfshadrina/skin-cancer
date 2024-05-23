const tf = require('@tensorflow/tfjs-node');
const ClientError = require('../exceptions/ClientError');
 
async function predictClassification(model, image) {
    try {
        const tensor = tf.node
            .decodeJpeg(image)
            .resizeNearestNeighbor([224, 224])
            .expandDims()
            .toFloat()
            
        const prediction = model.predict(tensor);
        const score = await prediction.data();
        const confidenceScore = Math.max(...score) * 100;

        const isCancer = confidenceScore > 50;
        const classes = ['Cancer', 'Non-cancer'];
    
        const label = classes[isCancer ? 0 : 1];

        let suggestion;
    
        if (label === 'Cancer') {
            suggestion = "Segera periksa ke dokter!"
        }
        
        if (label === 'Non-cancer') {
            suggestion = "Tetap jaga pola hidup sehat!"
        }

        return { label, suggestion };
    } catch (error) {
        throw new ClientError('Terjadi kesalahan dalam melakukan prediksi')
    }
  }

  module.exports = predictClassification;