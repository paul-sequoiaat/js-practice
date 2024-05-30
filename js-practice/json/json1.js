var myCar = {
    make: 'Bugatti',
    model: 'Bugatti La Voiture Noire',
    year: 2019,
    accidents: [
    {
        date: '3/15/2019',
        damage_points: '5000',
        atFaultForAccident: true
    },
    {
        date: '7/4/2022',
        damage_points: '2200',
        atFaultForAccident: true
    },
    {
        date: '6/22/2021',
        damage_points: '7900',
        atFaultForAccident: true
    },
    ]
}

console.log(myCar.accidents.flat());

console.log(myCar);

//updating atFaultForAccident to false for all accident objects
myCar.accidents.forEach((accident) => {
    accident.atFaultForAccident = false;
})
console.log(myCar);

//printing date of all accidents
let dates = [];
myCar.accidents.forEach((accident) => dates.push(accident.date));
console.log(dates);