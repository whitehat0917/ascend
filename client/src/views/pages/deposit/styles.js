import styled from 'styled-components';

export const DepositStepHeader = styled.p`
    font-size: 11px;
    margin: 0;
    padding: 10px 10px 15px 10px;
    color: #909090;
    &.active{
        color: #23A5D6;
        border-bottom: 3px solid #23A5D6;
        font-weight: bold;
    }
`;