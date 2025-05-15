import './header.css';

export function Header() {
  return (
    <header>
      <div>
        <a href='https://github.com/woochanleee/project-tree-generator' target='_blank'>
          <div>
            <h1>Project Tree Generator</h1>
          </div>
        </a>
        <a href='https://myhits.vercel.app'>
          <img
            alt='Hits'
            src='https://myhits.vercel.app/api/hit/https%3A%2F%2Fwoochanleee.github.io%2Fproject-tree-generator%2F?color=green&label=hits&size=small'
          />
        </a>
        <a href='https://github.com/woochanleee/project-tree-generator/stargazers'>
          <img src='https://img.shields.io/github/stars/woochanleee/project-tree-generator?logo=Github' alt='stars' />
        </a>
      </div>
    </header>
  );
}
