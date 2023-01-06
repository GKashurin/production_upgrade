import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

// для нормальной работы типизации надо из библиотек вывести типы typeof import('library name').
type SpringType = typeof import('@react-spring/web');
type GestureType = typeof import('@use-gesture/react');

interface AnimationContextPayload {
  Gesture?: GestureType;
  Spring?: SpringType;
  isLoaded?: boolean;
}

const AnimationContext = createContext<AnimationContextPayload>({});

// асинхронно подгружаю либы
const getAsyncAnimationModules = async () =>
  Promise.all([import('@react-spring/web'), import('@use-gesture/react')]);

export const useAnimationLibs = () =>
  useContext(AnimationContext) as Required<AnimationContextPayload>;

// с помощью этого компонента я буду получать доступ к библиотекам
export const AnimationProvider = ({ children }: { children: ReactNode }) => {
  // Внутрь этих рефов буду складывать сами библиотеки
  const SpringRef = useRef<SpringType>();
  const GestureRef = useRef<GestureType>();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    getAsyncAnimationModules().then(([Spring, Gesture]) => {
      SpringRef.current = Spring;
      GestureRef.current = Gesture;
      setIsLoaded(true);
    });
  }, []);

  const value = useMemo(
    () => ({
      isLoaded,
      Spring: SpringRef.current,
      Gesture: GestureRef.current,
    }),
    [isLoaded],
  );

  return (
    <AnimationContext.Provider value={value}>
      {children}
    </AnimationContext.Provider>
  );
};
