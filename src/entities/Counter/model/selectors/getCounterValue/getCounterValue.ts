import { buildSelector } from '@/shared/lib/store';

// export const getCounterValue = createSelector(
//     getCounter,
//     (counter: CounterSchema) => counter.value,
// );

export const [
  useCounterValue, // хук можно использовать внутри компонентов
  getCounterValue, // эту ф-цию можно использовать в асинхронных экшенах
] = buildSelector((state) => state.counter.value);
