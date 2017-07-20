import { safe } from '../src';


test.skip('Example', () => {
  const run = (props, btn) =>
    safe(props).$('callbacks').$(btn)
      .ensureFunc(safe(props).$('callbacks').$('default'))
      .ensureFunc(() => console.error('No callback provided'))
      .call();

  const props = {
    callbacks: {
      default: () => console.log('Hello World'),
      btnCancel: () => console.warn('Cancel Button clicked'),
      btnOk: () => console.info('Ok Clicked -- everything is good')
    }
  };

  run(props, 'btnOk'); // prints: Ok Clicked -- everything is good
  run(props, 'btnCancel'); // prints: Warning: Cancel Button clicked
  run(props, 'btnOtherOne'); // prints: Hello World
  run(props); // prints: Hello World
  run({}, 'btnOk'); // prints: Error: No callback provided
  run(); // prints: Error: No callback provided
});
