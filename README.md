# production_upgrade

Памятка по тестированию jest:
expect - ожидаемое значение параметра, например expect(validateValue(50)).toBe(true).
describe - обертка над несколькими тестами
ToBe ожидаемый результат
ToEqual ожидаемый результат для ссылочных данных(содержимое)
beforeEach - функция, которая отрабатывает перед тестами, обернутыми в describe. Вызывается перед каждым тестом
beforeAll - вызывается один раз перед всеми тестами
afterEach, afterAll работают аналогично
toBeCalled, toBeCalledTimes..., проверяет, что функция вызывается.

spyOn - мокирование данных
Пример:
const spyMathPow = jest.spyOn(Math, 'pow'); Первый аргумент - объект Math, второй - его метод 'pow'
functionName(2);
expect(spyMathPow).toBeCalledTimes(1) // ожидается вызов один раз

jest.clearAllMocks - очищает все моки
Пример (очищает моки после каждого теста):
afterEach(() => {
jest.clearAllMocks()
})

jest.mock() - мокирование сторонних модулей
Пример: jest.mock('axios')

axios.get.mockReturnValue - указание, что ожидается в результате
Пример:
test('Имя теста', async () => {
axios.get.mockReturnValue(response)
const data = await functionFetcher()
expect(...)
expect(...)
})
toMatchSnapshot() - показывает снэпшоты
