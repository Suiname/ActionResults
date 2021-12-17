import {
	Menu,
	MenuButton,
	MenuList,
	MenuItem,
	IconButton,
	Box,
	useColorModeValue,
	Flex,
	Text
} from '@chakra-ui/react'

import { HamburgerIcon, SearchIcon, SettingsIcon } from '@chakra-ui/icons'

const MenuComponent = () => <Box bg={useColorModeValue('gray.100', 'gray.900')} borderWidth='1px' borderRadius='lg'>
	<Flex h={16} alignItems={'center'} justifyContent={'left'}>
		<Menu>
			<MenuButton
				as={IconButton}
				aria-label='Options'
				icon={<HamburgerIcon />}
				variant='outline'
				padding={2}
				margin={2}
			/>
			<MenuList>
				<MenuItem icon={<SettingsIcon />} command='⌘T'>
					Stats
				</MenuItem>
				<MenuItem icon={<SearchIcon />} command='⌘N'>
					Filters
				</MenuItem>
			</MenuList>
		</Menu>
		<Text>
			Gambling Results
		</Text>
	</Flex>
</Box>

export default MenuComponent