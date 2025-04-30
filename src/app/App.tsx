import { BrowserRouter as Router } from 'react-router-dom';

import { PostsManager } from '@/pages/postManager';
import Footer from '@/widgets/ui/Footer.tsx';
import Header from '@/widgets/ui/Header.tsx';

const App = () => {
  return (
    <Router>
      <div className='flex flex-col min-h-screen'>
        <Header />
        <PostsManager />
        <Footer />
      </div>
    </Router>
  );
};

export default App;
