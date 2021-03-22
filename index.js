module.exports = () => {
  // ...
};



const suma = (a, b) => new Promise((resolve, reject) => {
  if (typeof a === 'number' && typeof b === 'number') {
  const sum = a + b;
  resolve(sum);
  }
  reject(new Error('A y B tienen que ser de tipo number'))
  });
  
  suma(3, 4)
  .then(result => console.log(result))
  .catch(err => console.log(err)); 