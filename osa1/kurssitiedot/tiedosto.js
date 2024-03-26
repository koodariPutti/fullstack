const x = 1
let y = 5

console.log(x, y)   // tulostuu 1, 5
y += 10
console.log(x, y)   // tulostuu 1, 15
y = 'teksti'
console.log(x, y)   // tulostuu 1, teksti

const t = [1, -1, 3]

console.log(t.length) // tulostuu 3
console.log(t[1])     // tulostuu -1

t.push(5)             // lisätään taulukkoon luku 5   EI KÄYTETÄ REACTISSA TÄTÄ

const t2 = t.concat(5) // VAAN KÄYTETÄN CONCAT JOKA LUO UUDEN TAULUKON KOSKA PIDETÄÄN MUUTTUMATTOMINA

console.log(t.length) // tulostuu 4

console.log(t2)

t.forEach(value => {
  console.log(value)  // tulostuu 1, -1, 3, 5 omille riveilleen
})                    

const m3 = t.map(value => value * 2)
console.log(m3) // Tulostuu [2,4,6]

const m2 = t.map(value => '<li>' + value + '</li>')
console.log(m2)  
// tulostuu [ '<li>1</li>', '<li>2</li>', '<li>3</li>' ]

const t4 = [1, 2, 3, 4, 5]

const [first, second, ...rest] = t4

console.log(first, second)  // tulostuu 1, 2
console.log(rest)          // tulostuu [3, 4 ,5]

// FUNKTIO

// kaksi parametria
const sum = (p1, p2) => {
    console.log(p1)
    console.log(p2)
    return p1 + p2
  }

  const result = sum(1, 5)
console.log(result)

// yksi parametri
/*
const square = p => {
    console.log(p)
    return p * p
  }
*/
