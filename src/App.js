import React from 'react';
import {
	ChakraProvider,
	Box,
	Text,
	HStack,
	theme,
	Avatar,
	Flex,
	SimpleGrid,
	Badge,
} from '@chakra-ui/react';
import * as picks from './picks.json';
import Menu from './Components/Menu'

const teamCard = (team) => {
	return (
		<React.Fragment>
			<Flex>
				<HStack align='center'>
					<Avatar src={team.logo} alt={team.full_name} /><Box ml='3'><Text align='center' verticalAlign='center'>{team.display_name}</Text></Box>
				</HStack>
			</Flex>
		</React.Fragment>
	)
}

const displayPickType = (pick) => {
	if(!!pick.play){
		return pick.play
	}
	let display = null
	switch (pick.type.toLowerCase()) {
		case 'spread_home':
			const [home_team] = pick.game.teams.filter((team) => team.id === pick.game.home_team_id)
			display = `${home_team.display_name} ${pick.value}`
			break;
		case 'spread_away':
			const [away_team] = pick.game.teams.filter((team) => team.id === pick.game.away_team_id)
			display = `${away_team.display_name} ${pick.value}`
			break;
		case 'over':
			display = `Over ${pick.value}`
			break;
		case 'under':
			display = `Under ${pick.value}`
			break;
		default:
			break;
	}
	return display
}

const pickCard = (pick) => <React.Fragment>
		<Text>Date: {new Date(pick.starts_at).toDateString()}</Text>
		<Text>Pick: {displayPickType(pick)}</Text>
		<Text>Odds: {pick.odds}</Text>
		<Text>Wager: {pick.money}</Text>
		{pick.result !== 'pending' && <Text>Profit: {pick.money_net}</Text>}
	</React.Fragment>

const makeBadge = (result) => {
	let badge = <Badge align='right'>{result}</Badge>
	switch (result) {
		case 'win':
			badge = <Badge align='right' colorScheme='green'>{result}</Badge>
			break;
		case 'loss':
			badge = <Badge align='right' colorScheme='red'>{result}</Badge>
			break;
		default:
			break;
	}
	return badge
}

const mapPickType = (pick) => {
	const picktype = pick.type
	const customName = pick.custom_pick_name
	let formattedPick;
	switch (picktype.toLowerCase()) {
		case 'spread_away':
		case 'spread_home':
			formattedPick = 'Spread'
			break;
		case 'custom':
			formattedPick = !!customName ? customName : 'Custom';
			break;
		case 'over':
			formattedPick = 'Over'
			break;
		case 'under':
			formattedPick = 'Under'
			break;
		case 'ml_home':
		case 'ml_away':
			formattedPick = 'Money Line';
			break;
		default:
			break;
	}
	return formattedPick;
}

const makeTags = (pick) => {
	const pickType = mapPickType(pick);
	return(
		<Flex padding='2' borderWidth='1px' borderRadius='lg' display='flex' flexWrap='wrap' align="center" justify="left" marginTop={2}>
			<Text fontSize='sm'>Tags:</Text>
			<Badge marginLeft={2} variant='solid'>
				{pick.league_name}
			</Badge>
			{
				!!pickType &&
				<Badge marginLeft={2} variant='solid'>
					{pickType}
				</Badge>
			}
			{
				!!pick.tag &&
				<Badge marginLeft={2} variant='solid'>
					{pick.tag}
				</Badge>
			}
		</Flex>
	)
}

const makeCard = (pick) => {
	const team1 = pick.game.teams[0]
	const team2 = pick.game.teams[1]
	return (
		<Box padding='4' maxW='sm' borderWidth='1px' borderRadius='lg' overflow='hidden' key={pick.id}>
			<Box padding='2' maxW='sm' align='right' overflow='hidden'>{makeBadge(pick.result)}</Box>
			<HStack marginBottom={2}>
				{teamCard(team1)}
				<Text fontSize='sm'>vs</Text>
				{teamCard(team2)}
			</HStack>
			<Box padding='2' maxW='sm' overflow='hidden'>
				{pickCard(pick)}
			</Box>
			{makeTags(pick)}
		</Box>
	)
}

function App() {
  return (
    <ChakraProvider theme={theme}>
		<Menu/>
		<SimpleGrid columns={4} spacing={4}>
			{picks.picks.slice(0,100).map((pick) => makeCard(pick))}
		</SimpleGrid>
    </ChakraProvider>
  );
}

export default App;
