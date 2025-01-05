// packages
import { TbArrowAutofitContent, TbArrowRotaryRight, TbArrowsDoubleSwNe, TbArrowsRight, TbCircleOff, TbDoorExit, TbQuestionMark, TbStairs } from 'react-icons/tb';

export const TRANSFER_METHODS = [
	{ name: 'tba', icon: <TbQuestionMark />, text: 'To be available (under construction)' },
	{ name: 'cross platform', icon: <TbArrowsDoubleSwNe />, text: 'Walk across platform to cross transfer' },
	{ name: 'parallel platform', icon: <TbArrowsRight />, text: 'Walk across platform to parallel transfer' },
	{ name: 'concourse', icon: <TbStairs />, text: 'Go to concourse to transfer' },
	{ name: 'node', icon: <TbArrowRotaryRight />, text: 'Use elevator / escalator / stairs to a concourse to transfer' },
	{ name: 'channel', icon: <TbArrowAutofitContent />, text: 'Walk the designated channel passageway to transfer' },
	{ name: 'exit', icon: <TbDoorExit />, text: 'Exit station to transfer' },
	{ name: 'termination', icon: <TbCircleOff />, text: 'The transfer line is the terminal, go to other direction to transfer' },
];