// src/pages/dbti/resultStyle.js
import styled from 'styled-components';
import Text from '../../components/text/size';
import BasicButton from '../../components/button/BasicButton';
import { spacingProps } from '../../styles/spacingProps';
import { flexCenter } from '../../styles/common';

const S = {};

// Spacer for header–content gap
S.HeaderSpacer = styled.div`
  height: ${({ theme }) => theme.SPACING['70']};
`;

// Main container
S.Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.SPACING['20']};
`;

// Grid layout for left/right sections
S.Content = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${({ theme }) => theme.SPACING['40']};
  align-items: start;
`;

// Left side: title, code, image, hashtags
S.Left = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.SPACING['24']};
`;

// Right side: feature grid, divider, share/nav buttons
S.Right = styled.div`
  display: grid;
  grid-template-rows: auto auto;
  gap: ${({ theme }) => theme.SPACING['32']};
`;

// Title and code styling using Text components
S.Title = styled(Text.H5)`
  ${spacingProps};
  text-align: center;
  color: ${({ theme }) => theme.PALLETE.primary.main};
`;

S.Code = styled(Text.H6)`
  ${spacingProps};
  text-align: center;
  color: ${({ theme }) => theme.PALLETE.primary.main};
`;

// Image styling
S.Image = styled.img`
  display: block;
  width: 100%;
  max-width: 400px;
`;

// Hashtags list
S.Hashtags = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: ${({ theme }) => theme.SPACING['8']};

  li {
    background: ${({ theme }) => theme.PALLETE.primary.light};
    padding: ${({ theme }) => `${theme.SPACING['4']} ${theme.SPACING['8']}`};
    border-radius: 16px;
    font-size: ${({ theme }) => theme.FONT_SIZE['body3']};
  }
`;

// Features grid
S.Features = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  row-gap: ${({ theme }) => theme.SPACING['40']};
  column-gap: ${({ theme }) => theme.SPACING['60']};
  justify-items: center;
  align-items: center;

  .feature {
    ${flexCenter};
    flex-direction: column;
    gap: ${({ theme }) => theme.SPACING['12']};
    text-align: center;
    font-size: ${({ theme }) => theme.FONT_SIZE['body2']};
    color: ${({ theme }) => theme.PALLETE.text.primary};
  }
`;

// Divider line
S.Divider = styled.hr`
  border: none;
  border-top: 1px solid ${({ theme }) => theme.PALLETE.background.gray200};
  margin: ${({ theme }) => theme.SPACING['32']} 0;
`;

// Bottom section: share and nav
S.Bottom = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);  
  gap: ${({ theme }) => theme.SPACING['40']};
`;

S.Share = styled.div`
  display: flex;
  flex-direction: column;

  .share-title {
    ${spacingProps};
    font-size: ${({ theme }) => theme.FONT_SIZE['body2']};
    color: ${({ theme }) => theme.PALLETE.primary.main};
    margin-bottom: 24px;
    margin-left: 40px;  /* 오른쪽으로 20px 이동 */
  }

  .share-icons {
    padding: 0%;
    display: flex;
    gap: ${({ theme }) => theme.SPACING['16']};
  }

  .share-btn {
    border: 1px solid ${({ theme }) => theme.PALLETE.background.gray200};
    border-radius: 12px;
    background: #fff;
    padding: ${({ theme }) => theme.SPACING['8']};
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    transition: transform .06s ease, box-shadow .2s ease;
  }
  .share-btn:hover { box-shadow: 0 4px 12px rgba(0,0,0,.06); }
  .share-btn:active { transform: translateY(1px); }
  .share-btn img {
    width: 50px;
    height: 50px;
    border-radius: 24px;
    display: block;
  }
`;


// Navigation buttons
S.Nav = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.SPACING['12']};
`;

// // Footer section
// S.Footer = styled.footer`
//   text-align: center;
//   padding: ${({ theme }) => theme.SPACING['24']} 0;
//   font-size: ${({ theme }) => theme.FONT_SIZE['caption']};
//   color: ${({ theme }) => theme.PALLETE.text.disabled.strong};
// `;

export default S;
