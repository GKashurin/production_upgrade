import { useTranslation } from 'react-i18next';
import { Button } from '@/shared/ui/Button';
import { UseCounterActions } from '../model/slice/counterSlice';
import { useCounterValue } from '../model/selectors/getCounterValue/getCounterValue';

export const Counter = () => {
  const counterValue = useCounterValue();
  const { t } = useTranslation();

  const { increment, decrement } = UseCounterActions();

  const handleIncrement = () => {
    increment();
  };

  const handleDecrement = () => {
    decrement();
  };

  return (
    <div>
      <h1 data-testid="value-title">{counterValue}</h1>
      <Button onClick={handleIncrement} data-testid="increment-btn">
        {t('increment')}
      </Button>
      <Button data-testid="decrement-btn" onClick={handleDecrement}>
        {t('decrement')}
      </Button>
    </div>
  );
};
