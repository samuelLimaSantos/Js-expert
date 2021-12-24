class Fibonacci {
  *execute(input, current = 0, next = 1) {
    if (input === 0) {
      return 0;
    };

    // Retornar o valor
    yield current;

    // delega a função, mas não retorna a função
    yield* this.execute(input - 1, next, current + next);
  };
};

module.exports = Fibonacci;