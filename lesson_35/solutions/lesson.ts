// С ниже приведенным массивом решить следующие задачи. Все функции и данные должны быть протипизированы:
//     1. Создать строку из названий стран через запятую
//     2. Посчитать общее количество людей в данном массиве стран.
//     3. Создать функцию, которая бы принимала массив стран и сортировала бы их по названию.
//     4. Получить массив валют.
//     5. Получить массив городов, отсортированных в алвавитном порядке.
//     6. Создать функцию, которая бы принимала массив стран и отдавала бы среднее количество людей в этих странах.

type Country = "United Arab Emirates" | "Poland" | "Russian Federation"

type Abbreviation = "AE" | "PL" | "RU"

type CurrencyName = "Arab Emirates Dirham" | "Polish Zloty" | "Russian Ruble"

type City = "Abu Dhabi" | "Warszawa" | "Moscow"

type CountryInfo = {
    country: Country
    abbreviation: Abbreviation
    city: City
    currency_name: CurrencyName
    population: number
}

const countries: CountryInfo[] = [
    {
        country: "United Arab Emirates",
        abbreviation: "AE",
        city: "Abu Dhabi",
        currency_name: "Arab Emirates Dirham",
        population: 9630959
    },
    {
        country: "Poland",
        abbreviation: "PL",
        city: "Warszawa",
        currency_name: "Polish Zloty",
        population: 37974750
    },
    {
        country: "Russian Federation",
        abbreviation: "RU",
        city: "Moscow",
        currency_name: "Russian Ruble",
        population: 144478050
    }
]

// #1
const getStringWithCounties = (countries: CountryInfo[]): string =>
    countries
        .map(({country}) => country)
        .join(', ')

console.log(getStringWithCounties(countries))

// #2
const getTotalPopulation = (countries: CountryInfo[]): number =>
    countries
        .reduce((total, {population}) => total + population, 0)

console.log(getTotalPopulation(countries))

// #3
const sortCountries = (countries: CountryInfo[]): CountryInfo[] =>
    countries
        .sort((a, b) => a.country.localeCompare(b.country))

console.log(sortCountries(countries))

// #4
const getCountryCurrencies = (countries: CountryInfo[]): CurrencyName[] =>
    countries
        .map(({currency_name}) => currency_name)

console.log(getCountryCurrencies(countries))

// #5
const getSortedCities = (countries: CountryInfo[]): City[] =>
    countries
        .map(({city}) => city)
        .sort((a, b) => a.localeCompare(b))

// #6
const getAveragePopulation = (countries: CountryInfo[]): number =>
    countries
        .reduce((averagePopulation, { population}, _, array) => {
            const averagePopulationInCity = population / array.length
            return Math.round(averagePopulation + averagePopulationInCity)
        }, 0)

console.log(getAveragePopulation(countries))