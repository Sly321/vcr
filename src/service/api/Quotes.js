const quotes = [
    {quote: "Never forget what you are, for surely the world will not. Make it your strength. Then it can never be your weakness. Armor yourself in it, and it will never be used to hurt you.", character: "Tyrion"},
    {quote: "Let them see that their words can cut you, and you’ll never be free of the mockery. If they want to give you a name, take it, make it your own. Then they can’t hurt you with it anymore.", character: "Tyrion"},
    {quote: "When you play the game of thrones, you win or you die. There is no middle ground.", character: "Cersei Lannister"},
    {quote: "If you would take a man’s life, you owe it to him to look into his eyes and hear his final words. And if you cannot bear to do that, then perhaps the man does not deserve to die.", character: "Bran"},
    {quote: "Sorcery is the sauce fools spoon over failure to hide the flavor of their own incompetence.", character: "Tyrion"},
    {quote: "Power resides where men believe it resides. No more and no less.", character: "Varys"},
    {quote: "There’s no shame in fear, my father told me, what matters is how we face it.", character: "Jon Snow"},
    {quote: "Love is poison. A sweet poison, yes, but it will kill you all the same.", character: "Cersei Lannister"},
    {quote: "What good is this, I ask you? He who hurries through life hurries to his grave.", character: "Davos"},
    {quote: "Old stories are like old friends, she used to say. You have to visit them from time to time.", character: "Bran"},
    {quote: "The greatest fools are ofttimes more clever than the men who laugh at them", character: "Tyrion"},
    {quote: "Everyone wants something, Alayne. And when you know what a man wants you know who he is, and how to move him.", character: "Sansa"},
    {quote: "Always keep your foes confused. If they are never certain who you are or what you want, they cannot know what you are like to do next. Sometimes the best way to baffle them is to make moves that have no purpose, or even seem to work against you.", character: "Sansa"},
    {quote: "One voice may speak you false, but in many there is always truth to be found.", character: "Daenerys"},
    {quote: "History is a wheel, for the nature of man is fundamentally unchanging.", character: "Lord Rodrik"},
    {quote: "Knowledge is a weapon, Jon. Arm yourself well before you ride forth to battle.", character: "Samwell"},
    {quote: "I prefer my history dead. Dead history is writ in ink, the living sort in blood.", character: "Lord Rodrik"},
    {quote: "In the game of thrones, even the humblest pieces can have wills of their own. Sometimes they refuse to make the moves you’ve planned for them. Mark that well, Alayne. It’s a lesson that Cersei Lannister still has yet to learn.", character: "Alayne"},
    {quote: "Every man should lose a battle in his youth, so he does not lose a war when he is old.", character: "Victarion Greyjoy"},
    {quote: "The fisherman drowned, but his daughter got Stark to the Sisters before the boat went down. They say he left her with a bag of silver and a bastard in her belly. Jon Snow, she named him, after Arryn.", character: "Davos"},
    {quote: "You could make a poultice out of mud to cool a fever. You could plant seeds in mud and grow a crop to feed your children. Mud would nourish you, where fire would only consume you, but fools and children and young girls would choose fire every time.", character: "The Discarded Knight"},
    {quote: "Men live their lives trapped in an eternal present, between the mists of memory and the sea of shadow that is all we know of the days to come.", character: "Bran"},
    {quote: "No. Hear me, Daenerys Targaryen. The glass candles are burning. Soon comes the pale mare, and after her the others. Kraken and dark flame, lion and griffin, the sun’s son and the mummer’s dragon. Trust none of them. Remember the Undying. Beware the perfumed seneschal.", character: "Quaithe"},
    {quote: "When I was twelve, I milked my eel into a pot of turtle stew. I flogged the one-eyed snake, I skinned my sausage, I made the bald man cry, into the turtle stew! Which I do believe my sister ate, at least I hope she did.", character: "Tyrion"},
    {quote: "There's no cure for being a cunt.", character: "Bronn"},
    {quote: "The man is as useless as nipples on a breastplate.", character: "Cersei Lannister"},
    {quote: "I've seen wet sh*ts I liked better than Walder Frey.", character: "Brynden Tully"},
    {quote: "Born amidst salt and smoke... is he a ham?", character: "Renly Baratheon"},
    {quote: "The whores are walking bowlegged.", character: "Littlefinger"},
    {quote: "Do you lie awake at night fearing my gash?", character: "Varys"},
    {quote: "'It's all fallen on me..', 'As has Jaime repeatedly, according to Stannis Baratheon.'", character: "Cersei and Tyrion"},
    {quote: "Grand Maester Pycelle made that same joke. You must be proud to be as funny as a man whose balls brush his knees.", character: "Tyrion"},
    {quote: "What happens when the non-existent bumps against the decrepit?", character: "Olenna Tyrell"},
    {quote: "A sword swallower, through and through.", character: "Olenna Tyrell"},
    {quote: "It's a shame the throne isn't made out of cocks, they'd have never got him off it.", character: "Jaime Lannister"},
    {quote: "You love your children. It's your one redeeming quality - that, and your cheekbones.", character: "Tyrion"},
    {quote: "I understand that if anymore words come pouring out your cunt mouth, I'm going to have to eat every fucking chicken in this room.", character: "The Hound"},
    {quote: "Yes, all Lannisters are lions. And when a Tyrell farts, it smells like a rose. But how kind is he? How clever? Has he a good heart, a gentle hand?", character: "Olenna Tyrell"},
    {quote: "It's not easy being drunk all the time. If it were easy, everyone would do it.", character: "Tyrion"},
    {quote: "Why are all the gods such vicious cunts? Where's the god of tits and wine?", character: "Tyrion"}
];

function getRandomQuote() {
	const quote = quotes[parseInt(Math.random() * quotes.length, 10)];
	return `"${quote.quote}" - ${quote.character}`;
}

let quote = getRandomQuote();

function getQuote() {
	return quote;
}

// FIXME test the fixme

export default getQuote;