import Ancients from '../assets/Ancients/index'

const ancientsData = [
	{
		id: 'azathoth',
		name: 'azathoth',
		cardFace: Ancients.azathoth,
		stages: [
			{
				green: 1,
				blue: 1,
				brown: 2,
			},
			{
				green: 2,
				blue: 1,
				brown: 3,
			},
			{
				green: 2,
				blue: 0,
				brown: 4,
			},
		],
		firstStage: {
			green: 1,
			blue: 1,
			brown: 2,
		},
		secondStage: {
			green: 2,
			blue: 1,
			brown: 3,
		},
		thirdStage: {
			green: 2,
			blue: 0,
			brown: 4,
		},
	},
	{
		id: 'cthulhu',
		name: 'cthulhu',
		cardFace: Ancients.cthulhu,
		stages: [
			{
				green: 0,
				blue: 2,
				brown: 2,
			},
			{
				green: 1,
				blue: 0,
				brown: 3,
			},
			{
				green: 3,
				blue: 0,
				brown: 4,
			},
		],
		firstStage: {
			green: 0,
			blue: 2,
			brown: 2,
		},
		secondStage: {
			green: 1,
			blue: 0,
			brown: 3,
		},
		thirdStage: {
			green: 3,
			blue: 0,
			brown: 4,
		},
	},
	{
		id: 'iogSothoth',
		name: 'iogSothoth',
		cardFace: Ancients.iogSothoth,
		stages: [
			{
				green: 0,
				blue: 1,
				brown: 2,
			},
			{
				green: 2,
				blue: 1,
				brown: 3,
			},
			{
				green: 3,
				blue: 0,
				brown: 4,
			},
		],
		firstStage: {
			green: 0,
			blue: 1,
			brown: 2,
		},
		secondStage: {
			green: 2,
			blue: 1,
			brown: 3,
		},
		thirdStage: {
			green: 3,
			blue: 0,
			brown: 4,
		},
	},
	{
		id: 'shubNiggurath',
		name: 'shubNiggurath',
		cardFace: Ancients.shubNiggurath,
		stages: [
			{
				green: 1,
				blue: 1,
				brown: 2,
			},
			{
				green: 3,
				blue: 1,
				brown: 2,
			},
			{
				green: 2,
				blue: 0,
				brown: 4,
			},
		],
		firstStage: {
			green: 1,
			blue: 1,
			brown: 2,
		},
		secondStage: {
			green: 3,
			blue: 1,
			brown: 2,
		},
		thirdStage: {
			green: 2,
			blue: 0,
			brown: 4,
		},
	},
]

export default ancientsData