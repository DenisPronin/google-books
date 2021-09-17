import { useDispatch, useSelector } from 'react-redux';
import { increment, decrement, incrementByAmount, getCount } from '../../redux/modules/counter';

function Counter () {
  const dispatch = useDispatch();
  const count = useSelector(getCount);
  
  return (
    <div>
      {count}
      <button type='button' onClick={() => dispatch(increment())}>Increment</button>
      <button type='button' onClick={() => dispatch(decrement())}>Decrement</button>
      <button type='button' onClick={() => dispatch(incrementByAmount(5))}>+5</button>
    </div>
  );
}

export default Counter;
