import { createClient } from '@sanity/client';


const client = createClient({
  projectId: 'w7jrqpfv', // Replace with your Sanity project ID
  dataset: 'production', // Replace with your dataset name
  useCdn: false,
  token: 'skzJhWOKxJJZyLnvaEDe8GNUg0USs7DCkii7RpEJll80Ch9KDSjhSAfTa57t24BUn2Z8TDQOdj2Q6GaM4i9456vsfP7aqAmv2o73uNoFSJa7v04PNRjG8uMX4Zs2GwRX3t4Exrcrxk50iMqTtRZrwkHrfPyJLNiyA52kNQPEeZJlTiIOeh1W', // Replace with your Sanity API token
});

export default client;