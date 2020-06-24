import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Box, Image, Stack, ResponsiveContext } from 'grommet';
import { Row1, Row2, Row3, Row4, Row5, Row6, Row7, Row8 } from './stickers';
import { StyledSmallAnchor, StyledLargeAnchor } from './styles';
import { Layout, SubPageHeader } from '../../components/index';

// Image wrapper
const ImageWrapper = ({ children, ...props }) => (
  <Box
    pad={{ horizontal: 'small', bottom: 'small', top: 'medium' }}
    margin={{ right: 'medium', bottom: 'medium' }}
    border
    style={{ borderRadius: '12px' }}
    {...props}
  >
    {children}
  </Box>
);

ImageWrapper.propTypes = {
  children: PropTypes.node.isRequired,
};

// Create box for each sticker
const BoxImage = ({
  icon,
  stickers,
  backgroundColor,
  backgroundImage,
  img,
  size,
  height,
  ...props
}) => {
  return (
    <Box>
      {size && (
        <StyledLargeAnchor href={stickers} download>
          <ImageWrapper
            background={backgroundColor || backgroundImage}
            height={height}
            id={stickers}
            key={stickers}
            {...props}
          >
            {img && (
              <Box fill>
                <Image fit="contain" src={img} />
                <Stack alignSelf="end">{icon}</Stack>
              </Box>
            )}
            {!img && (
              <Box justify="end" fill="vertical" alignSelf="end">
                {icon}
              </Box>
            )}
          </ImageWrapper>
        </StyledLargeAnchor>
      )}
      {!size && (
        <StyledSmallAnchor href={stickers} download>
          <ImageWrapper
            background={backgroundColor || backgroundImage}
            height={height}
            id={stickers}
            key={stickers}
            {...props}
          >
            {img && (
              <Box fill>
                <Image fit="contain" src={img} />
                <Stack alignSelf="end">{icon}</Stack>
              </Box>
            )}
            {!img && (
              <Box justify="end" fill="vertical" alignSelf="end">
                {icon}
              </Box>
            )}
          </ImageWrapper>
        </StyledSmallAnchor>
      )}
    </Box>
  );
};

BoxImage.propTypes = {
  size: PropTypes.string,
  icon: PropTypes.object,
  backgroundColor: PropTypes.string,
  stickers: PropTypes.string,
  img: PropTypes.string,
  backgroundImage: PropTypes.string,
  height: PropTypes.string,
};

const StickerRow = (row, size) => {
  return row.map((stickers, index) => {
    return (
      <BoxImage
        key={index}
        height={size !== 'small' ? '150px' : '80px'}
        img={stickers.img}
        background={stickers.backgroundColor || stickers.backgroundImage}
        icon={stickers.icon}
        size={stickers.size}
        stickers={stickers.img || stickers.download}
      />
    );
  });
};

const StickerWall = () => {
  const mobileRow1 = [Row7[2], Row1[3]];
  const mobileRow2 = [Row2[2], Row8[0]];
  const mobileRow3 = [Row4[2], Row5[2]];
  const size = useContext(ResponsiveContext);
  return (
    <Layout background="/img/BackgroundImages/stickers-background.jpg">
      <SubPageHeader title="STICKERS AND ART">
        <Box
          background={{ color: '#263040' }}
          pad="large"
          round="small"
          alignSelf={size === 'small' ? 'center' : undefined}
          width={size !== 'small' ? { min: '680px' } : { min: '280px' }}
        >
          {size !== 'small' && (
            <Box>
              <Box direction="row">{StickerRow(Row1, size)}</Box>
              <Box direction="row">{StickerRow(Row2, size)}</Box>
              <Box direction="row">{StickerRow(Row3, size)}</Box>
              <Box direction="row">{StickerRow(Row4, size)}</Box>
              <Box direction="row">{StickerRow(Row5, size)}</Box>
              <Box direction="row">{StickerRow(Row6, size)}</Box>
            </Box>
          )}
          {size === 'small' && (
            <Box align="center">
              <Box direction="row">{StickerRow(Row1.slice(0, 3), size)}</Box>
              <Box direction="row">{StickerRow(Row2.slice(0, 2), size)}</Box>
              <Box direction="row">{StickerRow(Row3.slice(0, 2), size)}</Box>
              <Box direction="row">{StickerRow(Row4.slice(0, 2), size)}</Box>
              <Box direction="row">{StickerRow(Row5.slice(0, 2), size)}</Box>
              <Box direction="row">{StickerRow(Row6.slice(0, 2), size)}</Box>
              <Box direction="row">{StickerRow(mobileRow1, size)}</Box>
              <Box direction="row">{StickerRow(mobileRow2, size)}</Box>
              <Box direction="row">{StickerRow(mobileRow3, size)}</Box>
              <Box direction="row" alignSelf="start">
                {StickerRow(Row7.slice(0, 2), size)}
              </Box>
            </Box>
          )}
        </Box>
      </SubPageHeader>
    </Layout>
  );
};

export default StickerWall;
