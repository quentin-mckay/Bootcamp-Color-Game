console.log('hello');

function myRandom(max) {
  return Math.floor(Math.random() * max)
}


for (let i = 0; i < 10; i++) {
  console.log(myRandom(5));
}
