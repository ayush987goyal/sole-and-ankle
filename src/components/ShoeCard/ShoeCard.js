import React from 'react';
import styled from 'styled-components/macro';

import { COLORS, WEIGHTS } from '../../constants';
import { formatPrice, pluralize, isNewShoe } from '../../utils';
import Spacer from '../Spacer';

const FLAG_VARIANTS = {
  'on-sale': {
    title: 'Sale',
    backgroundColor: COLORS.primary,
  },
  'new-release': {
    title: 'Just Released!',
    backgroundColor: COLORS.secondary,
  },
};

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

  const flagDetails = FLAG_VARIANTS[variant];
  const isOnSale = variant === 'on-sale';

  return (
    <Link href={`/shoe/${slug}`}>
      <Wrapper>
        <ImageWrapper>
          <Image alt="" src={imageSrc} />
          {flagDetails && (
            <Flag style={{ '--background-color': flagDetails.backgroundColor }}>
              {flagDetails.title}
            </Flag>
          )}
        </ImageWrapper>
        <Spacer size={12} />
        <Row>
          <Name>{name}</Name>
          <Price isOnSale={isOnSale}>{formatPrice(price)}</Price>
        </Row>
        <Row>
          <ColorInfo>{pluralize('Color', numOfColors)}</ColorInfo>
          {isOnSale && <SalePrice>{formatPrice(salePrice)}</SalePrice>}
        </Row>
      </Wrapper>
    </Link>
  );
};

const Link = styled.a`
  text-decoration: none;
  color: inherit;
`;

const Wrapper = styled.article`
  display: flex;
  flex-direction: column;
`;

const ImageWrapper = styled.div`
  position: relative;
`;

const Image = styled.img`
  width: 100%;
`;

const Flag = styled.div`
  position: absolute;
  top: 12px;
  right: -4px;
  height: 32px;
  line-height: 32px;
  background-color: var(--background-color);
  border-radius: 2px;
  color: ${COLORS.white};
  padding: 0 10px;
  font-size: 14px;
  font-weight: ${WEIGHTS.bold};
`;

const Row = styled.div`
  font-size: 1rem;
  display: flex;
  justify-content: space-between;
`;

const Name = styled.h3`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.gray[900]};
`;

const Price = styled.span`
  color: ${(p) => p.isOnSale && COLORS.gray[700]};
  text-decoration: ${(p) => p.isOnSale && 'line-through'};
`;

const ColorInfo = styled.p`
  color: ${COLORS.gray[700]};
`;

const SalePrice = styled.span`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.primary};
`;

export default ShoeCard;
