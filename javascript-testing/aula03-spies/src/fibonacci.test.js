const Fibonacci = require('./fibonacci');
const sinon = require('sinon');
const {deepStrictEqual} = require('assert');

(async () => {

  {
    const fibonacci = new Fibonacci(); 

    const spy = sinon.spy(fibonacci, fibonacci.execute.name);

    // Todos os generators sempre retornam uma função next() que chama o próximo valor da função
    // Existem 3 formas de ler os dados
    // Usar as funções next(), for await e rest/spread

    const generator = fibonacci.execute(3);

    for await(const index of generator) {};

    const expectedCallCount = 4;

    deepStrictEqual(spy.callCount, expectedCallCount);
  }

  {
    const fibonacci = new Fibonacci(); 

    const spy = sinon.spy(fibonacci, fibonacci.execute.name);

    const [...results] = fibonacci.execute(5);
    // [0] input = 5, current = 0, next = 1
    // [1] input = 4, current = 1, next = 1
    // [2] input = 3, current = 1, next = 2
    // [3] input = 2, current = 2, next = 3
    // [4] input = 1, current = 3, next = 5
    // [5] input = 0, PARA

    const expectedResults = [0, 1, 1, 2, 3];

    // O Object.values retornar um array com apenas os valores do objeto
    const expectedParams = Object.values({
      input: 3,
      current: 1,
      next: 2
    });

    const { args } = spy.getCall(2);

    deepStrictEqual(args, expectedParams);
    deepStrictEqual(results, expectedResults);
  }
})()