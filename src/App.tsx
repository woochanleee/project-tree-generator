import './app.css';

import { Editor } from './Editor.tsx';
import { Footer } from './Footer.tsx';
import { Header } from './Header.tsx';

export function App() {
  return (
    <main>
      <Header />
      <Editor />
      <Footer />
    </main>
  );
}
