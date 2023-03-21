const arr = [1, 2, 3, 4, 5, 6, 7];

console.log(arr);
console.log(...arr);

const obj = {
  name: '김민정',
  status: '집',
};

console.log(obj);
console.log({ ...obj });

const mjData = {
  name: '김민정',
  age: 25,
};
const mjInfo = {
  nickName: 'head',
  status: '집',
};

const mj = {
  //   mjData,
  //   mjInfo,
  ...mjData,
  ...mjInfo,
};

console.log(mj);

const arr1 = [1, 2, 3];
const arr2 = ['4', '5', '6'];
const merge = [...arr1, ...arr2];
console.log(merge);

const test = 'test';
console.log([...test]);

const mj2 = {
  name: '김민정',
  gender: 'F',
  age: 25,
  email: 'kimmj1827@naver.com',
};

// restInfro 나머지 연산자
const { name, ...restInfo } = mj2;
console.log(name, restInfo);

const arr3 = [1, 2, 3, 4, 5, 6, 7];
const [first, ...rest] = arr3;
console.log(first, rest);

function spread(first, second, ...rest) {
  console.log(first);
  console.log(second);
  console.log(rest);
}

spread(1, 2, 3, 4, 5, 6, 7, 8);
