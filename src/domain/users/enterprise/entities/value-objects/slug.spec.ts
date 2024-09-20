import { Slug } from './slug';

test('it should be able to create a new slug from text', () => {
  const { value: props } = Slug.transform({ value: 'Example value text' });

  expect(props.value).toEqual('example-value-text');
});
