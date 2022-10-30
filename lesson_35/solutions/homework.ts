// С ниже приведенным массивом решить следующие задачи:
// 1. Все функции и данные должны быть протипизированы
// 2. Создать строку из имен пользователей через запятую
// 3. Посчитать общее количество машин у пользователей
// 4. Создать функцию, которая бы принимала массив пользователей и отфильтровывала
// пользователей на наличие образования
// 5. Создать функцию, которая бы принимала массив пользователей и отфильтровывала
// пользователей на наличие животных
// 6. Создать функцию, которая бы принимала массив пользователей и отдавала бы  строку с
// названиями марок автомобилей через запятую

type Animal = 'cat'

type Car = 'bmw' | 'audi'

type User = {
    name: string
    phone: string
    email: string
    animals?: Animal[]
    cars?: Car[]
    hasChildren: boolean
    hasEducation: boolean
}

const users: User[] = [
    {
        name: "Harry Felton",
        phone: "(09) 897 33 33",
        email: "felton@gmail.com",
        animals: ["cat"],
        cars: ["bmw"],
        hasChildren: false,
        hasEducation: true
    },
    {
        name: "May Sender",
        phone: "(09) 117 33 33",
        email: "sender22@gmail.com",
        hasChildren: true,
        hasEducation: true
    },
    {
        name: "Henry Ford",
        phone: "(09) 999 93 23",
        email: "ford0@gmail.com",
        cars: ["bmw", "audi"],
        hasChildren: true,
        hasEducation: false
    }
]

// #2
const getStringWithUserNames = (users: User[]): string =>
    users
        .map(({name}) => name)
        .join(', ')

console.log(getStringWithUserNames(users))

// #3
const getTotalCarsCount = (users: User[]): number =>
    users
        .reduce((total, user) => {
            if ('cars' in user) {
                return total + user.cars.length
            }

            return total
        }, 0)


console.log(getTotalCarsCount(users))

// #4
const getUsersWithEducation = (users: User[]): User[] =>
    users.filter(({hasEducation}) => hasEducation)


console.log(getUsersWithEducation(users))

// #5
const getUsersWithAnimals = (users: User[]): User[] =>
    users.filter(({animals}) => animals?.length > 0)


console.log(getUsersWithAnimals(users))

// #6
const getStringWithCars = (users: User[]): any =>
    users
        .map(({cars}) => cars)
        .filter(Boolean)
        .flat()
        .join(', ')

console.log(getStringWithCars(users))