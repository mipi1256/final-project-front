import React from 'react';
import styles from '../scss/ReservationCharge.module.scss';
import ReservationList from './ReservationList';
import { StationProvider } from '../../../../contexts/StationContext';
import { SecondMapProvider } from '../../../../contexts/SecondMapContext';
import styled from 'styled-components';
import Frame from '../../Mainpage/Frame';

const ReservationCharge = () => {
  return (
    <>
      <StationProvider>
        <SecondMapProvider>
          <Frame>
            <div
              style={{
                width: '840px',
                padding: '20px 15px 0px 15px',
                textAlign: 'right',
              }}
            >
              가격 단위 : 1kWh
            </div>
            <ReservationList />
          </Frame>
        </SecondMapProvider>
      </StationProvider>
    </>
  );
};

export default ReservationCharge;

const ReserveHeader = styled.div`
  width: 850px;
  padding: 20px;
  display: flex;
  justify-content: space-between;
`;

const BigSpan = styled.span`
  font-size: 1.5rem;
`;
