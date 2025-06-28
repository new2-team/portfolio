import styled, { css } from 'styled-components';

const S = {};

S.Wrapper = styled.div`
  background: #fff;
  border-radius: 32px;
  padding: 40px 24px;
  width: 360px;
  text-align: center;
  box-shadow: 0 4px 4px rgba(0,0,0,0.1);
`;

S.Title = styled.h2`
  font-size: 20px;
  font-weight: 700;
  color: ${({ theme }) => theme.PALLETE.primary.main};
  margin-bottom: 16px;
`;

S.Description = styled.p`
  font-size: 14px;
  color: ${({ theme }) => theme.PALLETE.text.sub};
  margin-bottom: 32px;
`;

S.ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  justify-content: center;
  flex-direction: ${({ $count }) => ($count > 1 ? 'row' : 'column')};
`;

S.Button = styled.button`
  flex: 1;
  padding: 14px 0;
  border-radius: 999px;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  border: none;

  ${({ $type, theme }) => {
    switch ($type) {
        case 'gray':
            return css`
          background: #f0f0f0;
          color: #222;
        `;
        case 'primary':
        default:
            return css`
          background: ${theme.PALLETE.primary.main};
          color: #fff;
        `;
    }
}}
`;

export default S;