
import { createClient } from '@sanity/client';
import {projectId, dataset, token} from './env';

const client = createClient({
  projectId,
  dataset,
  useCdn: false,
  token
});

// Function to save an order
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

export { client, saveOrder };