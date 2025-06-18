import SplashCursor from './ui-components/SplashCursor';
import MusicPlayer from './components/Music/MusicPlayer';
import Contact from './components/Contact/Contact';
import CollageGallery from './components/collages/CollageGallery';
function App() {
  return (
    <>
      <SplashCursor></SplashCursor>
      <CollageGallery></CollageGallery>
      <MusicPlayer></MusicPlayer>
      <Contact></Contact>
    </>
  );
}

export default App;
