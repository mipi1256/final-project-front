import { useContext, useEffect } from 'react';
import {
  useNavigate,
  useSearchParams,
} from 'react-router-dom';
import { PaymentContext } from '../../contexts/PaymentContext';

export function Success() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { setPaymentSuccess } = useContext(PaymentContext);

  const handleCloseWindow = () => {
    window.close();
  };

  useEffect(() => {
    // 쿼리 파라미터 값이 결제 요청할 때 보낸 데이터와 동일한지 반드시 확인하세요.
    // 클라이언트에서 결제 금액을 조작하는 행위를 방지할 수 있습니다.
    const requestData = {
      orderId: searchParams.get('orderId'),
      amount: searchParams.get('amount'),
      paymentKey: searchParams.get('paymentKey'),
    };

    async function confirm() {
      const response = await fetch(
        'http://localhost:8181/confirm',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestData),
        },
      );

      const json = await response.json();

      if (!response.ok) {
        // 결제 실패 비즈니스 로직을 구현하세요.
        navigate(
          `/fail?message=${json.message}&code=${json.code}`,
        );
      } else {
        // 결제 성공 비즈니스 로직을 구현하세요.
        setPaymentSuccess(true);
        console.log('결제 성공 로직 들어감');
      }
    }
    confirm();
  }, [searchParams, setPaymentSuccess, navigate]);

  return (
    <div className='result-wrapper'>
      <div className='box_section'>
        <h2 className='pay-head'>결제 성공</h2>
        <p className='pay-body'>{`주문번호: ${searchParams.get('orderId')}`}</p>
        <p className='pay-body'>{`결제 금액: ${Number(
          searchParams.get('amount'),
        ).toLocaleString()}원`}</p>
        <p className='pay-body'>{`paymentKey: ${searchParams.get('paymentKey')}`}</p>
        <p
          className='public-btn pay-button'
          onClick={handleCloseWindow}
        >
          창 닫기
        </p>
      </div>
    </div>
  );
}
