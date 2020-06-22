import React, { useContext, useState } from 'react';
import {
  Box,
  Text,
  Image,
  ResponsiveContext,
  Anchor,
  Button,
  Stack,
  Video,
} from 'grommet';
import { Close } from 'grommet-icons';
import GremlinWave from '../../components/GremlinWave';
import { Layout, ButtonSplit, Card } from '../../components/index';
import {
  ButtonWrapper,
  CardWrapper,
  LogoWrapper,
  MainWrapper,
  TextWrapper,
  StyledLayer,
  StyledStack,
  StyledBubble,
  StyledGremlin,
  StyledCard,
  StyledTextBox,
  StyledBoxText,
  StyledPlayButton,
} from './styles';

const Content = () => {
  const size = useContext(ResponsiveContext);
  const fontSize = size === 'small' ? '4vw' : '2.2vw';
  return (
    <TextWrapper>
      <Text size={fontSize} color="#FFFFFF">
        Welcome to the Hack Shack. Come in to
      </Text>
      <Text size={fontSize} color="#FFFFFF">
        collaborate and learn from others in Technology
      </Text>
      <Text size={fontSize} color="#FFFFFF">
        Workshops and Sessions or compete for elite
      </Text>
      <Text size={fontSize} color="#FFFFFF">
        gaming status playing Hack Shack Attack!
      </Text>
    </TextWrapper>
  );
};

const Home = () => {
  const size = useContext(ResponsiveContext);
  const [open, setOpen] = useState();
  const onOpen = () => setOpen(true);
  const onClose = () => setOpen(undefined);

  return (
    <Layout background="/img/BackgroundImages/hack-shack-home-background.png">
      <Box height="100%" width="100%">
        {open && (
          <StyledLayer
            full
            animation="fadeIn"
            onClickOutside={onClose}
            onEsc={onClose}
          >
            <Box alignSelf="center" width="960px" pad={{ top: 'large' }}>
              <Button
                alignSelf="end"
                label={
                  <Text weight="normal" color="white" size="xlarge">
                    Close
                  </Text>
                }
                reverse
                icon={<Close size="medium" />}
                onClick={onClose}
              />
            </Box>
            <Box alignSelf="center">
              <Video controls="over" autoPlay fit="cover">
                <source
                  key="video"
                  src={
                    size !== 'small'
                      ? 'https://player.vimeo.com/external/430776646.sd.mp4?s=658b900014c931a8ace4fee90658d61fa5b7a133&profile_id=165&download=1'
                      : 'https://player.vimeo.com/external/430776646.sd.mp4?s=658b900014c931a8ace4fee90658d61fa5b7a133&profile_id=164&download=1'
                  }
                  type="video/mp4"
                />
                <track
                  key="cc"
                  label="English"
                  kind="subtitles"
                  srcLang="en"
                  src="/assets/small-en.vtt"
                  default
                />
              </Video>
            </Box>
          </StyledLayer>
        )}
        <MainWrapper align="center">
          <LogoWrapper>
            <Image
              width="100%"
              fit="cover"
              src="/img/hack-shack-dve-logo.png"
              alt="Hack Shack"
            />
          </LogoWrapper>
          <Content />
          <ButtonWrapper>
            <ButtonSplit to="https://developer.hpe.com">
              Visit HPE Developer
            </ButtonSplit>
          </ButtonWrapper>
        </MainWrapper>
        <StyledStack>
          <Stack anchor="bottom" alignSelf="start">
            <StyledGremlin>
              <GremlinWave />
            </StyledGremlin>
            <StyledBubble>
              <Image src="/img/quotebubble.png" />
            </StyledBubble>
            <StyledTextBox gap="small">
              <StyledBoxText width="medium">
                <Text size="large" color="#000000">
                  New to the HPE DEV Hack Shack?
                </Text>
                <Text size="large" color="#000000">
                  Watch This Week in the Hack Shack!
                </Text>
              </StyledBoxText>
            </StyledTextBox>
            <StyledPlayButton
              gap="small"
              alignSelf="end"
              direction="row"
              onClick={onOpen}
            >
              <Anchor
                alignSelf="center"
                color="#000000"
                size="large"
                label={
                  <Box gap="xsmall" direction="row">
                    <Text style={{ whiteSpace: 'nowrap' }} size="large">
                      Watch Now
                    </Text>
                  </Box>
                }
              />
              <Image
                style={{ width: '38px', height: '38px' }}
                src="/img/play-button.png"
                margin={{ bottom: '4px' }}
              />
            </StyledPlayButton>
          </Stack>
        </StyledStack>
        <CardWrapper gap="large">
          <StyledCard>
            <Card
              // logo="/img/StickerPage/gremlinrockin.png"
              title="New to the HPE DEV Hack Shack?"
              desc="Watch This Week in the Hack Shack!"
              background="rgba(0, 86, 122, 0.8);"
              label="Watch Now"
              link="https://vimeo.com/429478014"
              margin={
                size === 'small' ? { bottom: 'none' } : { bottom: 'xlarge' }
              }
            />
          </StyledCard>
          <Card
            // image="/img/Arcade/score.png"
            title="PLAY HACK SHACK ATTACK CONTEST AND WIN PRIZES"
            desc="Learn more about the rules and requirements to the contest."
            path="/competition"
            background="background"
            label="Join the Contest"
            margin={
              size === 'small'
                ? { top: '0px', right: '0px' }
                : { top: 'xlarge', right: 'large' }
            }
          />
          {/* <Card
            // logo="/img/StickerPage/ezmeral.png"
            title="INTRODUCING HPE EZMERAL"
            desc="Run, manage, control and secure the apps, data and IT that run your business - from edge to cloud"
            link="https://www.hpe.com/us/en/software/ezmeral.html"
            background="rgba(0, 86, 122, 0.8);"
            label="Learn more"
            margin={
              size === 'small' ? { bottom: 'none' } : { bottom: 'xlarge' }
            }
          /> */}
          <Card
            // logo="/img/Community/dev-thumb.png"
            title="GET THE HPE DEVELOPER NEWSLETTER"
            desc="Want to read more about industry trends for developers?"
            link="https://developer.hpe.com/event/hpe-discover-us-2020?listid=11647678"
            background="rgba(0, 86, 122, 0.8);"
            label="Get the Newsletter"
            margin={
              size === 'small' ? { bottom: 'none' } : { bottom: 'xlarge' }
            }
          />
        </CardWrapper>
      </Box>
    </Layout>
  );
};

export default Home;
