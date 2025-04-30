import { BrowserRouter as Router } from 'react-router-dom';

import { PostsManager } from '@/pages/postManager';
import { Footer } from '@/widgets/footer';
import { Header } from '@/widgets/header';

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
