import GameCard from './GameCard';

// Grid component for displaying fetched games
const GamesGrid = ({ games }) => {

    return (
        
        <div className="games" style={{width:'100%', marginRight:'1%', marginLeft:'1%', marginTop:'10px', paddingTop:'10px',display: 'flex', flexDirection: 'column', overflow:'auto'}}>
            
            <h1 className="text-2xl font-bold" style={{fontSize:'28px', marginBottom:'-5px'}}>Game Library</h1>

            
            {/*Display all games from user state*/}
            {!games ? (
                // Placeholder component
                <div style={{height: '250px'}}></div>
            ) : (
                <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '10px'}}>
                    {games && games.results ? games.results.map((game) => (
                            <div>
                            <GameCard key={game.id} game={game} />
                        </div>
                    )) : null}
                    </div>
                )}
        </div>
        
        
    );
};

export default GamesGrid;