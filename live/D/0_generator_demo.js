function* gen() {
    yield 1;
    yield 2;
    return 3;
}

var g = gen();

console.log(g.next()); // 1

// console.log(g.next()); // 2

// console.log(g.next()); // 3
