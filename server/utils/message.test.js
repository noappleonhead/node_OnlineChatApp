var expect = require('expect');
var {generateMessage,generateLocationMessage} = require('./message');

describe('generateMessage', () => {
    it('should generate correct message object', () => {
      var from = 'Jen';
      var text = 'Some message';
      var message = generateMessage(from, text);
  
      expect(message.createdAt).toBeA('number');
      expect(message).toInclude({from, text});
    });
  });

describe('generateLocationMessage', () => {
  it('should generate correct location object', ()=>{
    var longitude = '1';
    var latitude = '1';
    var from = 'test';
    var url = `https://www.google.com/maps?q=${latitude},${longitude}`
    var message = generateLocationMessage(from, latitude,longitude);

    expect(message).toInclude({from, url})
  })
})


  