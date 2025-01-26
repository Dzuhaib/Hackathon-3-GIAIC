import { createClient } from '@sanity/client';

const saveOrder = async (orderData) => {
  try {
    const result = await client.create({
      _type: 'order',
      orderId: orderData.orderId,
      userDetails: orderData.userDetails,
      items: orderData.items,
      totalAmount: orderData.totalAmount,
      status: 'pending',
    });
    console.log('Order saved:', result);
  } catch (error) {
    console.error('Error saving order:', error);
  }
};

const client = createClient({
  projectId: 'w7jrqpfv', // Replace with your Sanity project ID
  dataset: 'production', // Replace with your dataset name
  useCdn: false,
  token: 'skRGLARE3YJyma0snm0rMTTpuHC2aRJTrT1YFImbGmQvQOo8e8B1Fco0lzNqrm282jpODTNfXbdiZDwgRGOkcpcEe5xT1NrqjQhPgPARuF5LRAkMKW8dtTUbjH5rDsA9nGCCfBTMhvr6zu1ijQxSPPyNscAk7mphmHs8NPYGWkvyIkiPVnn9', // Replace with your Sanity API token
});

export default client;
