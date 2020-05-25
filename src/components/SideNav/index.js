import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Box, Button, Heading, Text } from 'grommet';
import { Twitter, Youtube } from 'grommet-icons';

const getNavColor = (active, hover) => {
  if (active) return 'white';
  if (hover) return 'green';
  return 'brand';
};

const NavButton = ({ active, to, history, children }) => {
  const [hover, setHover] = useState(false);
  return (
    <Button
      plain
      onClick={() => {
        history.push(to);
      }}
      onMouseOver={() => setHover(true)}
      onFocus={() => setHover(true)}
      onMouseOut={() => setHover(false)}
      onBlur={() => setHover(false)}
    >
      <Heading
        margin="none"
        textAlign="start"
        size="small"
        color={getNavColor(active, hover)}
      >
        {children}
      </Heading>
    </Button>
  );
};

NavButton.propTypes = {
  active: PropTypes.bool.isRequired,
  to: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export const SideNav = ({ location, history }) => (
  <Box align="start" width="medium" gap="xsmall">
    <NavButton history={history} active={location.pathname === '/'} to="/">
      HOME
    </NavButton>
    <NavButton
      history={history}
      active={location.pathname === '/schedule'}
      to="/schedule"
    >
      SCHEDULE
    </NavButton>
    <NavButton history={history} active={location.pathname === '/#'} to="#">
      HPE EZMERAL
    </NavButton>
    <NavButton
      history={history}
      active={location.pathname === '/replays'}
      to="/replays"
    >
      REPLAYS
    </NavButton>
    <NavButton
      history={history}
      active={location.pathname === '/community'}
      to="/community"
    >
      COMMUNITY
    </NavButton>
    <NavButton
      history={history}
      active={
        location.pathname === '/arcade' || location.pathname === '/stickerwall'
      }
      to="/arcade"
    >
      ARCADE
    </NavButton>
    <Box margin={{ top: 'large' }}>
      <Button>
        <Box direction="row" gap="xsmall">
          <Twitter color="brand" />{' '}
          <Text weight="normal" color="white">
            Twitter
          </Text>
        </Box>
      </Button>
      <Button>
        <Box direction="row" gap="xsmall">
          <Youtube color="brand" />{' '}
          <Text weight="normal" color="white">
            YouTube Channel
          </Text>
        </Box>
      </Button>
    </Box>
  </Box>
);

SideNav.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default withRouter(SideNav);
