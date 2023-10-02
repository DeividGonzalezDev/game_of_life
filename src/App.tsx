
import GameContainer from './components/GameContainer';

function App() {

  return (
    <section className="app  flex flex-col gap-5 justify-center items-center py-10 relative">
      <h1 className='text-4xl font-bold text-white'>Game of Life | Deivid González</h1>
      <img src="/preview_user.png" alt="Developer profile" className='w-[50px] rounded-full mb-10'/>
      <iframe className='rounded-md' width="560" height="315" src="https://www.youtube.com/embed/2ssnMkJFqbA?si=aqmaGN0BGMjTR9dB" title="YouTube video player"  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" ></iframe>
      <GameContainer />
      <div className='bg-shape'></div>
    </section>
  );
}

export default App;
