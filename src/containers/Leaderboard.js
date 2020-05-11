/* (C) Copyright 2020 Hewlett Packard Enterprise Development LP. */
import React, { useState, useEffect } from 'react';
import { Box, Text } from 'grommet';
import { Config } from '../config';
import { StyledImage } from '../components/Shared/style';
import { LeaderboardLayout } from '../components/Leaderboard/style';

const Leaderboard = () => {
  const [hiScores, setHiScores] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const ranks = [
    '1st',
    '2nd',
    '3rd',
    '4th',
    '5th',
    '6th',
    '7th',
    '8th',
    '9th',
    '10th',
  ];
  const colors = [
    '#FFFFFF',
    '#FFAA15',
    '#FD6FFF',
    '#9060EB',
    '#A2423D',
    '#FF4040',
    '#00739D',
    '#00C781',
    '#2AD2C9',
    '#777777',
  ];

  const getLeaderboardData = () => {
    fetch(`${Config.apiUrl}/user/leaderboard`)
      .then(res => res.json())
      .then(data => {
        const sortedHiScores = data.sort((a, b) => b.score - a.score);
        const len = sortedHiScores.length;
        if (len < 10) {
          for (let i = len + 1; i <= 10; i += 1) {
            sortedHiScores.push({ score: '------', name: '------' });
          }
        }
        const hiScoresTop10 = sortedHiScores.slice(0, 10);
        setHiScores(hiScoresTop10);
        setIsLoaded(true);
      })
      .catch(err => console.log(err));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      getLeaderboardData();
    }, 40000);
    getLeaderboardData();

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <Box className="outer">
      {isLoaded && (
        <LeaderboardLayout
          justify="between"
          className="leaderboard-container, middle"
          background="#000000"
          direction="column"
          pad={{
            top: 'large',
            bottom: 'none',
            left: 'large',
            right: 'large',
          }}
        >
          <Box className="inner">
            {/* HackShack Attack title and HighScore text */}
            <Box align="center">
              <Box>
                <StyledImage src="../img/hackshackattack.png" />
              </Box>
              <Box
                className="title-container"
                margin={{ top: 'large', bottom: 'xlarge' }}
              >
                <Text color="#FEDE32" className="highscore-title">
                  High Scores
                </Text>
              </Box>
            </Box>
            {/* Rank/Name/Score columns */}
            <Box className="highscore-container" direction="row">
              <Box
                align="start"
                basis="1/4"
                direction="column"
                className="rank-column"
              >
                <Text color="dark-3" className="highscore-text">
                  Rank
                </Text>
                {ranks.map((rank, index) => (
                  <Text
                    key={index}
                    margin={{ top: 'large', bottom: 'medium' }}
                    color={colors[index]}
                    className="highscore-text"
                  >
                    {rank}
                  </Text>
                ))}
              </Box>
              <Box
                align="start"
                basis="1/2"
                direction="column"
                className="name-column"
              >
                <Text color="dark-3" className="highscore-text">
                  Name
                </Text>
                {hiScores.map((hiScore, index) => (
                  <Text
                    key={index}
                    margin={{ top: 'large', bottom: 'medium' }}
                    color={colors[index]}
                    className="highscore-text"
                  >
                    {hiScore.name}
                  </Text>
                ))}
              </Box>
              <Box
                align="end"
                basis="1/4"
                direction="column"
                className="score-column"
              >
                <Text color="dark-3" className="highscore-text">
                  Score
                </Text>
                {hiScores.map((hiScore, index) => (
                  <Text
                    key={index}
                    margin={{ top: 'large', bottom: 'medium' }}
                    color={colors[index]}
                    className="highscore-text"
                  >
                    {hiScore.score}
                  </Text>
                ))}
              </Box>
            </Box>
            {/* ItMonster image */}
            <Box
              align="end"
              alignSelf="end"
              margin={{ top: 'large' }}
              width="large"
            >
              <StyledImage className="it-monster" src="./img/itmonster.png" />
            </Box>
          </Box>
        </LeaderboardLayout>
      )}
    </Box>
  );
};

export default Leaderboard;
