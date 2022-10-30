// C массивом данных пользователей users сделать следующий
// задачи, используя map/reduce вместо for, forEach:
//
// 1. Получить строку с именами и фамилиями всех пользователей через
// запятую.
// 2. Создать массив из emails по алфавиту.
// 3. Создать новый массив пользователей, где объект пользователя должен
// содержать только id и поле, отвечающее за имя пользователя(например
// username), которое должно содержать имя и фамилию.
// 4. Создать массив юзеров, где они отсортированы по возрасту по
// возрастанию и все пользователи младше 40 лет.
// 5. Получить объект, где были бы
// a) данные о среднем возрасте пользователей
// b) количество пользователей старше 30
// c) количество пользователей старше 40
// d) количество пользователей старше 18
// 6. Создать объект, где ключ, это первая буква фамилии, а значение -
// массив из фамилий пользователей начинающихся на эту букву. Объект
// должен состоять только из ключей существующих фамилий в этом
// массиве. Например в этом массиве нет фамилии с буквой Y, а значит и
// такого поля не должно быть в объекте. Пример того, что надо получить,
// когда пользователи имеют следующие фамилии Snow, Felton , Ford, Ferdinand:
// { s: [‘Snow’], f: ['Felton', 'Ford', 'Ferdinand' }

type User = {
    id: number
    email: string
    first_name: string
    last_name: string
    avatar: string
    age: number
}

type FormattedUser = Pick<User, 'id'> & {
    fullName: string
}

type UserAgeData = {
    averageAge: number
    usersCountOlder30: number
    usersCountOlder40: number
    usersCountOlder18: number
}

type UsersLastNameInfo = (users: User[]) => {
    [prop: string]: string[]
}

const users: User[] = [
    {
        "id": 7,
        "email": "michael.lawson@reqres.in",
        "first_name": "Michael",
        "last_name": "Lawson",
        "avatar": "https://reqres.in/img/faces/7-image.jpg",
        "age": 23
    },
    {
        "id": 8,
        "email": "lindsay.ferguson@reqres.in",
        "first_name": "Lindsay",
        "last_name": "Ferguson",
        "avatar": "https://reqres.in/img/faces/8-image.jpg",
        "age": 20
    },
    {
        "id": 9,
        "email": "tobias.funke@reqres.in",
        "first_name": "Tobias",
        "last_name": "Funke",
        "avatar": "https://reqres.in/img/faces/9-image.jpg",
        "age": 40
    },
    {
        "id": 10,
        "email": "byron.fields@reqres.in",
        "first_name": "Byron",
        "last_name": "Fields",
        "avatar": "https://reqres.in/img/faces/10-image.jpg",
        "age": 36
    },
    {
        "id": 11,
        "email": "george.edwards@reqres.in",
        "first_name": "George",
        "last_name": "Edwards",
        "avatar": "https://reqres.in/img/faces/11-image.jpg",
        "age": 70
    },
    {
        "id": 12,
        "email": "rachel.howell@reqres.in",
        "first_name": "Rachel",
        "last_name": "Howell",
        "avatar": "https://reqres.in/img/faces/12-image.jpg",
        "age": 45
    }
]

// #1
const getFullNames = (users: User[]): string =>
    users
        .map(({first_name, last_name}) => `${first_name} ${last_name}`)
        .join(', ')

console.log(getFullNames(users))

// #2
const getEmailsInAlphabetOrder = (users: User[]): string[] =>
    users
        .map(({email}) => email)
        .sort((a,b) => a.localeCompare(b))

console.log(getEmailsInAlphabetOrder(users))

// #3
const formatUsers = (users: User[]): FormattedUser[] =>
    users
        .map(({id, first_name, last_name}) => ({
            id,
            fullName: `${first_name} ${last_name}`
        }))

console.log(formatUsers(users))

// #4
const getSortedUsersYounger40 = (users: User[]): User[] =>
    users
        .filter(({age}) => age < 40)
        .sort((a, b) => a.age - b.age)

console.log(getSortedUsersYounger40(users))

// #5
const getUsersAgeData = (users: User[]): UserAgeData => {
    const averageAge = getUserAverageAge(users)

    const usersCountOlder30 = getUsersCountOlderThanAge(users, 30)
    const usersCountOlder40 = getUsersCountOlderThanAge(users, 40)
    const usersCountOlder18 = getUsersCountOlderThanAge(users, 18)

    return {
        averageAge,
        usersCountOlder30,
        usersCountOlder40,
        usersCountOlder18,
    }
}

// utils for #5 task
const getUserAverageAge = (users: User[]): number =>
    users
        .reduce((average, {age}, _, array) => {
            return average + age / array.length
        }, 0)

const getUsersCountOlderThanAge = (users: User[], age: number): number =>
    users
    .filter(({ age: userAge}) => userAge > age)
    .length

console.log(getUsersAgeData(users))

// #6
const getUsersLastNameInfo: UsersLastNameInfo = (users) =>
    users
        .map(({ last_name}) => last_name)
        .reduce((info, last_name) => {
            const firstLetter = last_name[0].toLowerCase()

            if (!!info[firstLetter]) {
                info[firstLetter].push(last_name)
            } else {
                info[firstLetter] = [last_name]
            }

            return info
        }, {})

console.log(getUsersLastNameInfo(users))