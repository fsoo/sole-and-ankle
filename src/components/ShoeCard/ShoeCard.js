import React from 'react';
import styled from 'styled-components/macro';

import { COLORS, WEIGHTS } from '../../constants';
import { formatPrice, pluralize, isNewShoe } from '../../utils';
import Spacer from '../Spacer';

const ShoeCard = ({
  slug,
  name,
  imageSrc,
  price,
  salePrice,
  releaseDate,
  numOfColors,
}) => {
  // There are 3 variants possible, based on the props:
  //   - new-release
  //   - on-sale
  //   - default
  //
  // Any shoe released in the last month will be considered
  // `new-release`. Any shoe with a `salePrice` will be
  // on-sale. In theory, it is possible for a shoe to be
  // both on-sale and new-release, but in this case, `on-sale`
  // will triumph and be the variant used.
  // prettier-ignore
  const variant = typeof salePrice === 'number'
    ? 'on-sale'
    : isNewShoe(releaseDate)
      ? 'new-release'
      : 'default'

  const flagText = variant=='on-sale' ? "Sale" : variant=='new-release' ? 'Just released!' : "";


  return (
    <Link href={`/shoe/${slug}`}>
      <Wrapper>
        <ImageWrapper>
          <Image alt="" src={imageSrc} />
        </ImageWrapper>
        <Spacer size={12} />
        <Row>
          <Name>{name}</Name>
          <Price>{formatPrice(price)}</Price>
        </Row>
        <Row>
          <ColorInfo>{pluralize('Color', numOfColors)}</ColorInfo>
        </Row>
        <Flag className={variant}>{flagText}</Flag>
     
      </Wrapper>
    </Link>
  );
};

const Flag = styled.div`
  position: absolute;
  font-weight: ${WEIGHTS.light};
  font-size: 1rem;
  top: 20px;
  right: 0px;
  color: white;
  padding: 4px 6px 4px 6px;
  border-radius: 4px;
  width: fit-content;
  background-color: green;
  &.new-release {
    background-color: blue;

  }
  &.on-sale {
    background-color: red;

  }
  &.default {
    display:none;
  }
  

`;

const Link = styled.a`
  text-decoration: none;
  color: inherit;
`;

const Wrapper = styled.article`
position:relative;
  width: 400px;
  `;

const ImageWrapper = styled.div`
  position: relative;
`;

const Image = styled.img`
  width:100%`;

const Row = styled.div`
  font-size: 1rem;
`;

const Name = styled.h3`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.gray[900]};
`;

const Price = styled.span``;

const ColorInfo = styled.p`
  color: ${COLORS.gray[700]};
`;

const SalePrice = styled.span`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.primary};
`;

export default ShoeCard;
