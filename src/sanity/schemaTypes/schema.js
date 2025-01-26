import product from './product';


export default createSchema({
  name: 'default',
  types: schemaTypes.concat([product]),
});
