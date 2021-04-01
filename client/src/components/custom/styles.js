import styled from "styled-components";

export const FlexLayout = styled.div`
    width: ${props => props.width || "100%"};
    display: flex;
    flex-direction: ${props => props.direction || "row"};
    justify-content: ${props => props.justify || "center"};
    align-items: ${props => props.align || "center"};
    padding: ${props => props.padding || "0"};
    margin: ${props => props.margin || "0"};
    border-bottom: ${props => props.borderBottom || "0"};
    background-color: ${props => props.backgroundColor || "transparent"};
`;

export const Alert = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    width: 100%;
    position: relative;
    margin-top: -15vh;
    background-color: white;
    padding: 15px 35px;
    box-shadow: 0px 1px 10px 5px rgba(0, 0, 0, 0.1);
    @media (max-width: 600px){
        margin-top: -20px;
    }
`;

export const CloseAlertButton = styled.img`
    cursor: pointer;
    position: absolute;
    top: 7px;
    right: 7px;
    width: 15px;
`;

export const Text = styled.p`
    margin: ${props => props.margin || "0"};
    padding: ${props => props.padding || "0"};
    font-family: ${props => props.fontFamily || "Montserrat"};
    font-size: ${props => props.fontSize || "1rem"};
    font-weight: ${props => props.fontWeight || "normal"};
    line-height: ${props => props.lineHeight || "1.3rem"};
    color: ${props => props.color || "#909090"};
    max-width: ${props => props.maxWidth || "auto"};
    text-align: ${props => props.align || "center"};
    white-space: ${props => props.whiteSpace || "none"};
    text-overflow: ${props => props.textOverflow || "none"};
    overflow: ${props => props.overflow || "none"};
`;

export const SpanText = styled.span`
    display: inline-block;
    margin: ${props => props.margin || "0"};
    padding: ${props => props.padding || "0"};
    font-family: ${props => props.fontFamily || "Montserrat"};
    font-size: ${props => props.fontSize || "1rem"};
    font-weight: ${props => props.fontWeight || "normal"};
    line-height: ${props => props.lineHeight || "1.3rem"};
    color: ${props => props.color || "#909090"};
    max-width: ${props => props.maxWidth || "auto"};
    text-align: ${props => props.align || "center"};
    white-space: ${props => props.whiteSpace || "none"};
    text-overflow: ${props => props.textOverflow || "none"};
    overflow: ${props => props.overflow || "none"};
`;

export const Card = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: ${props => props.maxWidth || "300px"};
    border-radius: 0.75rem;
    background-color: white;
    box-shadow: 0 1px 15px rgba(0, 0, 0, 0.04), 0 1px 6px rgba(0, 0, 0, 0.04);
    padding: 20px 30px;
    position: relative;
`;

export const ProgressBackground = styled.div`
    display: flex;
    justify-content: flex-end;
    background-image: linear-gradient(to right, #5FBB80 , #23A5D6);
    width: calc(100% - 60px);
    height: 5px;
    border-radius: 15px;
    position: absolute;
    top: 0;
`;

export const ProgressBar = styled.div`
    width: ${props => props.width || "100%"};
    display: flex;
    justify-content: flex-end;
    background-color: #D5D5D5;
    border-radius: 0 15px 15px 0;
`;

export const CardHeader = styled.div`
    width: 100%;
    min-height: 80px;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const AlertButton = styled.button`
    display: flex;
    background-color: #23A5D6;
    color: white;
    font-size: 12px;
    text-transform: uppercase;
    align-items: center;
    padding: 8px 12px;
    width: 190px;
    justify-content: center;
    margin: 5px;
    border-radius: 6px;
    border: none;
    &:hover{
        color: white;
    }
    img{
        height: 18px;
        margin-right: 8px;
    }
`;

export const DepositWrapper = styled.div`
    display: flex;
    width: 100%;
    box-shadow: 0px 0px 5px 2px rgba(0, 0, 0, 0.1);
    padding: 10px;
    margin: 10px 0;
    cursor: pointer;
    height: 45px;
    img{
        max-width: 100%;
        max-height: 28px;
    }
`;